#!/usr/bin/env node
// implement-issue-tree の Codex 版ランナーの起動口。
//
//   node <skillDir>/runner/run.mjs --tool codex --args <args.json> [--config <config.json>] [--max-parallel N] [--dry-run] [--no-build-check]
//
// 役割: 生成物（scripts/implement-issue-tree.js）を無変更のまま評価し、agent 引数に agent-host（lib/agent-host.mjs）が
// 作った関数を渡して、Workflow 版と同じホスト判断を Codex のエージェントで動かす。起動前の拒否
// （引数・設定・gh 認証・アダプタの有無・生成物の鮮度）と、結果の保存・アダプタの後片づけ・明示の exit を担う。
//
// 終了コード（計画 C の仕様）:
//   0 ホストが return した（--help / -h で使い方を stdout に出したときも 0）
//   1 ホストが例外で終わった
//   2 引数の誤り（CLI・args.json・設定ファイル。autoMerge で args.repo がメイン worktree のリポジトリと違う場合を含む）
//   3 前提の不足（gh 認証・アダプタの不在・生成物の鮮度・必要なスキルの不在・autoMerge のときの repo の解決・
//     args.repo が無い autoMerge で継いだ GH_REPO が解決先と違う・アダプタの start() 失敗）
// 2 / 3 の経路（アダプタの生成・start() の失敗を除く）は _/iit-runner/<runId>/ を作る前に抜ける（何も書かない）。
//
// 出力の形（通し確認の判定器が読む。変えるときは判定器とそろえる）:
//   <mainRoot>/_/iit-runner/<runId>/result.json と stdout（同じ JSON を 1 つ。stdout は 1 行）:
//     { runId, tool, exitCode, workflowSha256, startedAt, endedAt, result, error? }
//     result はホストの return 値そのまま（dryRun なら startable・blocked などの見積りがそのまま入る）。
//     exitCode が 0 以外のとき result は null で、error に理由を入れる。アダプタの生成・start() の失敗（3）でも書く。
//   <mainRoot>/_/iit-runner/<runId>/agents/<seq 4 桁>-<label>/meta.json（agent() 1 回につき 1 つ。lib/agent-host.mjs）:
//     { label, seq, sessionRef, outcome, kind?, startedAt, endedAt, ... }
//     outcome は ok（schema に適合した値を返した。修復ターン後も ok）/ null（未返却）/ exec-spec（実行仕様で
//     直接実行した段と、ホストが直接実行・直接読んだ段〔direct: host-cleanup・host-state-read〕。sessionRef は null）/ throw（呼び出しの不備・worktree 作成失敗で例外）。kind は AdapterError の kind。
//     sessionRef は最後に使った会話の参照（修復ターンで同じ値ならそのまま）。status・reason は詳細。
//   <mainRoot>/_/iit-runner/<runId>/host.log はホストの log() と phase()。
//
// 明示の exit: 生成物は setTimeout があれば 5 分の tick を動かす（phase0 0-5）。ホストの return 後もイベントループが
// 残るため、結果を書き切ってから process.exit する。
//
// 鮮度: 生成物の SHA-256 を必ず記録する。開発用チェックアウト（<repo>/dev/implement-issue-tree/scripts/build-workflow.mjs が
// ある）では `build-workflow.mjs --check` も実行する（約 100 秒かかる。--no-build-check で省ける）。配布先には
// ビルダーが無いので SHA-256 の記録だけになる。
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createAgentHost, killScriptsSync } from './lib/agent-host.mjs'
import { isAdapterError } from './lib/adapter-error.mjs'
import { codexRules } from './lib/guard.mjs'
import { loadWorkflow } from './lib/load-workflow.mjs'
import { loadConfig, TOOLS } from './lib/models.mjs'
import { isRepoSlug } from './lib/merge-target.mjs'
import { pinFiles, pinPathsFor } from './lib/pins.mjs'
import { missingSkills, missingSkillsMessage } from './lib/skills-prereq.mjs'
import { createWorktree, gitLocationFreeEnv, killGitSync, newRunId, resolveMainRoot } from './lib/worktree.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
export const SKILL_DIR = dirname(HERE)
export const ADAPTERS_DIR = join(HERE, 'adapters')
const USAGE = '使い方: node run.mjs --tool codex --args <args.json> [--config <config.json>] [--max-parallel N] [--dry-run] [--no-build-check]'

export class UsageError extends Error {}

/** CLI 引数を読む。誤りは UsageError（終了コード 2）。 */
export function parseCli(argv) {
  const out = { tool: null, argsPath: null, configPath: null, maxParallel: null, dryRun: false, buildCheck: true }
  const value = (i, name) => {
    const v = argv[i + 1]
    if (v === undefined || v.startsWith('--')) throw new UsageError(`${name} に値が無い`)
    return v
  }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--tool') out.tool = value(i++, a)
    else if (a === '--args') out.argsPath = value(i++, a)
    else if (a === '--config') out.configPath = value(i++, a)
    else if (a === '--max-parallel') {
      const v = value(i++, a)
      if (!/^[1-9][0-9]{0,2}$/.test(v)) throw new UsageError('--max-parallel は 1〜999 の整数')
      out.maxParallel = Number(v)
    } else if (a === '--dry-run') out.dryRun = true
    else if (a === '--no-build-check') out.buildCheck = false
    else throw new UsageError(`未知の引数: ${String(a).slice(0, 40)}`)
  }
  // 名前の形だけを見る。対応していないツール（opencode を含む）は、アダプタが無い経路（前提の不足・終了コード 3）で止める
  if (typeof out.tool !== 'string' || !/^[a-z][a-z0-9-]{0,30}$/.test(out.tool)) throw new UsageError(`--tool は ${TOOLS.join(' / ')}`)
  if (out.argsPath === null) throw new UsageError('--args が無い')
  return out
}

/** args.json を読む。パース済みのオブジェクトで返す（生成物は文字列の args を別の分岐で扱うため）。 */
export function readArgsFile(path) {
  let parsed
  try {
    parsed = JSON.parse(readFileSync(path, 'utf8'))
  } catch (e) {
    throw new UsageError(`args.json を読めない: ${String(e?.message ?? e).slice(0, 160)}`)
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) throw new UsageError('args.json の最上位はオブジェクト')
  return parsed
}

/** gh の認証確認。失敗は終了コード 3。 */
export function checkGhAuth() {
  const r = spawnSync('gh', ['auth', 'status'], { encoding: 'utf8', timeout: 60_000 })
  return r.status === 0 ? { ok: true } : { ok: false, reason: r.error ? `gh を起動できない（${r.error.code ?? r.error.message}）` : `gh auth status が終了コード ${r.status}` }
}

/**
 * メイン worktree の owner/repo を gh repo view で 1 回だけ決める（GET のみ。契約の req.merge.repo。MEDIUM-8）。
 * 継いだ GH_REPO は外す（メイン worktree の remote から決め、利用者の env の別リポジトリを拾わない）。
 * 継いだ GIT_DIR 等（gitLocationFreeEnv）も外す（gh は remote を git で読むため、別のリポジトリの remote を拾わない）。
 */
export function resolveRepo(mainRoot, env = process.env) {
  const { GH_REPO: _ignored, ...rest } = gitLocationFreeEnv(env)
  const r = spawnSync('gh', ['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner'], { cwd: mainRoot, env: rest, encoding: 'utf8', timeout: 60_000 })
  if (r.error || r.status !== 0) return { ok: false, reason: r.error ? `gh を起動できない（${r.error.code ?? r.error.message}）` : `gh repo view が終了コード ${r.status}` }
  return { ok: true, repo: r.stdout.trim() }
}

/** 開発用チェックアウトなら build-workflow.mjs --check を実行する。ビルダーが無ければ照合なし（ok）。 */
export function checkBuild(skillDir) {
  const builder = join(skillDir, '..', '..', 'dev', 'implement-issue-tree', 'scripts', 'build-workflow.mjs')
  if (!existsSync(builder)) return { ok: true, checked: false }
  const r = spawnSync(process.execPath, [builder, '--check'], { encoding: 'utf8', timeout: 600_000 })
  return r.status === 0 ? { ok: true, checked: true } : { ok: false, checked: true, reason: `build-workflow.mjs --check が終了コード ${r.status}` }
}

/** アダプタを読み込む。無い・形が違うときは null（終了コード 3）。 */
export async function importAdapter(tool, dir = ADAPTERS_DIR) {
  const path = join(dir, `${tool}.mjs`)
  if (!existsSync(path)) return null
  const mod = await import(pathToFileURL(path).href)
  return typeof mod.createAdapter === 'function' ? mod : null
}

/** 止めるシグナル（SIGHUP は端末を閉じたとき）。終了コードは 128 + 番号。 */
const SIGNAL_CODES = Object.freeze({ SIGINT: 130, SIGTERM: 143, SIGHUP: 129 })

/** SIGINT・SIGTERM・SIGHUP を 1 回ずつ登録し、受けたシグナル名でハンドラを呼ぶ（2 回目は既定の動作で即終了する）。 */
export function registerSignals(handler, proc = process) {
  for (const sig of Object.keys(SIGNAL_CODES)) proc.once(sig, () => handler(sig))
}

/**
 * 起動から終了コードまで。テストは deps で外部とのやりとり（gh・アダプタ・生成物・メイン worktree）を差し替える。
 * @returns {Promise<number>} 終了コード
 */
export async function main(argv, deps = {}) {
  const {
    stdout = (s) => new Promise((r) => process.stdout.write(s, () => r())),
    stderr = (s) => { process.stderr.write(s) },
    cwd = process.cwd(),
    ghAuth = checkGhAuth,
    // autoMerge のときだけ使う owner/repo の解決（{ ok, repo } | { ok: false, reason }）。テストが偽の値へ差し替える
    repoOf = resolveRepo,
    build = checkBuild,
    loadAdapter = importAdapter,
    load = loadWorkflow,
    mainRootOf = resolveMainRoot,
    makeRunId = newRunId,
    env = process.env,
    onSignal = registerSignals,
    // process の exit 時に同期で呼ぶ関数の登録（想定外の例外で落ちたときも呼ばれる）と、シグナル時の exit
    onExit = (fn) => { process.once('exit', fn) },
    exit = (code) => process.exit(code),
    // 実行仕様の段の起動（agent-host の cfg.spawnScript）。テストが偽の launcher へ差し替える。省略時は agent-host の実物
    spawnScript,
    // 生成物が名指しするスキルの存在確認（lib/skills-prereq.mjs）。見つからない名前の配列を返す
    skillsMissing = missingSkills,
    // 隔離 worktree の作成（agent-host の cfg.createWorktree。設定の timeoutsSec.worktree を重ねて渡す）。テストが差し替える
    createWorktree: makeWorktree = createWorktree,
  } = deps
  const err = (msg) => stderr(`${msg}\n`)

  // 使い方の表示は他の引数より先に見る（何も読まず・書かずに 0 で終わる。詳細は runner/README.md）
  if (argv.includes('--help') || argv.includes('-h')) {
    await stdout(`${USAGE}\n詳細: ${join(HERE, 'README.md')}\n`)
    return 0
  }

  // ---- 2: 引数・設定 ----
  let cli, args, config
  try {
    cli = parseCli(argv)
    args = readArgsFile(resolve(cwd, cli.argsPath))
    try {
      config = cli.configPath === null ? loadConfig() : loadConfig(resolve(cwd, cli.configPath))
    } catch (e) {
      throw new UsageError(`設定を読めない: ${String(e?.message ?? e).slice(0, 200)}`)
    }
  } catch (e) {
    if (e instanceof UsageError) {
      err(`ランナー: ${e.message}\n${USAGE}`)
      return 2
    }
    throw e
  }
  if (args.skillDir === undefined) args.skillDir = SKILL_DIR
  if (typeof args.skillDir !== 'string' || !isAbsolute(args.skillDir)) {
    err('ランナー: args.skillDir は絶対パス')
    return 2
  }
  // 実行仕様の段は <skillDir>/scripts/run-verified.sh を直接起動するため、生成物・許可表と同じスキルの写しに限る
  // （監査 e670648 の LOW-15。別の場所の run-verified.sh を args から指せないようにする）
  const realOr = (p) => { try { return realpathSync(p) } catch { return null } }
  if (realOr(args.skillDir) === null || realOr(args.skillDir) !== realOr(SKILL_DIR)) {
    err(`ランナー: args.skillDir はこのランナーのスキル（${SKILL_DIR}）と同じ場所でなければならない`)
    return 2
  }
  if (cli.dryRun) args.dryRun = true

  // ---- 3: 前提（安い順。どれも _/iit-runner を作る前） ----
  const prereq = (msg) => { err(`ランナー: 前提の不足: ${msg}`); return 3 }
  const gh = ghAuth()
  if (!gh.ok) return prereq(gh.reason ?? 'gh の認証を確認できない')
  let mod
  try {
    mod = await loadAdapter(cli.tool)
  } catch (e) {
    return prereq(`アダプタ ${cli.tool} を読み込めない: ${String(e?.message ?? e).slice(0, 160)}`)
  }
  if (!mod) return prereq(`アダプタ adapters/${cli.tool}.mjs が無い${cli.tool === 'opencode' ? '（OpenCode は未対応）' : `（対応しているツール: ${TOOLS.join(' / ')}）`}`)
  let workflow
  try {
    workflow = load()
  } catch (e) {
    return prereq(`生成物を読み込めない: ${String(e?.message ?? e).slice(0, 160)}`)
  }
  if (cli.buildCheck) {
    const b = build(SKILL_DIR)
    if (!b.ok) return prereq(`生成物が開発ファイルと一致しない（${b.reason}）`)
  }
  let mainRoot
  try {
    mainRoot = realpathSync(mainRootOf(cwd))
  } catch (e) {
    return prereq(`メイン worktree を特定できない: ${String(e?.message ?? e).slice(0, 160)}`)
  }
  const missing = skillsMissing({ tool: cli.tool, root: mainRoot })
  if (missing.length > 0) return prereq(missingSkillsMessage(cli.tool, missing))
  // マージ対象のリポジトリ（MEDIUM-8）と、生成物が使うリポジトリの照合（PR #851 の codex P0）。autoMerge のときだけ行う。
  // メイン worktree の repo（gh repo view）は merge-exec の段の GH_REPO に固定する値で、merge-gate.sh も gh pr merge もその段の
  // 中で走る。生成物は merge-gate・push・観測の --repo / -R に args.repo を使い、無ければ gh の既定の解決（継いだ GH_REPO が最優先）
  // に任せる。ずれると次の取り違えになる:
  //   - args.repo が解決先と違う: G0・チェックは args.repo で検証され、gh pr merge は解決先で実行される → 引数の誤り（2）。
  //     owner/repo は大文字小文字を区別しない（GitHub と生成物の照合と同じ）。args.repo は書き換えずに渡す（形の検証は生成物の
  //     parseRepoArg。未指定を解決先で埋めると、未指定なら base 取り込みを起動しないという生成物の契約が変わる）
  //   - args.repo が無く、継いだ GH_REPO が解決先と違う: 観測・PR 作成は GH_REPO のリポジトリで、マージ（と merge-exec の段の
  //     検証）は解決先で行われ、PR 番号を別のリポジトリへ当てることになる → 前提の不足（3）
  // autoMerge でないランは照合しない（gh も呼ばない）。解決先をどこにも使わず、push は pr-push.sh の routing ガード（origin の URL と
  // --repo の照合）が fail-closed で止める。gh repo view の解決は remote の名前の優先（upstream が origin より先）に従うと見ており（fork の構成の実機では未確認）、
  // fork の構成（origin が fork・upstream が親）で args.repo に fork を指定した、これまで動いていたランを拒否し得る。
  // 決められなければ前提の不足（3）で止める（自動マージを黙って無効にしたままランを進めない）
  // 子（gh repo view・アダプタが起動するツール）へ渡す env。継いだ GIT_DIR 等を外す（残すと git の対象が cwd でなく
  // その変数の指すリポジトリになる。lib/worktree.mjs の gitLocationFreeEnv）。GH_REPO の照合は env のまま行う
  const childEnv = gitLocationFreeEnv(env)
  let repo = null
  if (args.autoMerge === true) {
    const r = repoOf(mainRoot, childEnv)
    if (!r.ok) return prereq(`マージ対象のリポジトリを決められない: ${String(r.reason ?? '').slice(0, 160)}`)
    if (!isRepoSlug(r.repo)) return prereq('gh repo view の nameWithOwner が owner/repo の形でない')
    const same = (x) => typeof x === 'string' && x.toLowerCase() === r.repo.toLowerCase()
    const argRepo = args.repo ?? null // 生成物の parseRepoArg と同じく null・undefined は未指定
    if (argRepo !== null && !same(argRepo)) {
      err(`ランナー: args.repo（${String(argRepo).slice(0, 120)}）がメイン worktree のリポジトリ（${r.repo}。マージ先）と一致しない。マージの検証と実行の対象がずれるため起動しない`)
      return 2
    }
    if (argRepo === null && typeof env.GH_REPO === 'string' && env.GH_REPO !== '' && !same(env.GH_REPO)) {
      return prereq(`環境変数 GH_REPO（${env.GH_REPO.slice(0, 120)}）がメイン worktree のリポジトリ（${r.repo}。マージ先）と一致しない。args.repo が無いとき生成物の観測・PR 作成は GH_REPO のリポジトリで行われ、マージ先と PR 番号がずれる。GH_REPO を外すか args.repo を指定する`)
    }
    repo = r.repo
  }

  // ---- ラン ----
  const runId = makeRunId()
  const startedAt = new Date().toISOString()
  const runDir = join(mainRoot, '_', 'iit-runner', runId)
  mkdirSync(join(runDir, 'agents'), { recursive: true })
  const hostLog = join(runDir, 'host.log')
  const log = (m) => {
    const line = `${String(m)}\n`
    try { writeFileSync(hostLog, line, { flag: 'a' }) } catch { /* ログの失敗でホストを止めない */ }
    stderr(line)
  }
  const phase = (name) => log(`== phase: ${String(name)}`)
  log(`ランナー: tool=${cli.tool} runId=${runId} workflow=${workflow.sha256} (${workflow.bytes} B)`)

  // finish は result.json と stdout に同じ JSON を書く（形はファイル冒頭の「出力の形」）
  const finish = async (exitCode, result, error) => {
    const body = { runId, tool: cli.tool, exitCode, workflowSha256: workflow.sha256, startedAt, endedAt: new Date().toISOString(), result: result ?? null }
    if (error !== undefined) body.error = error
    try { writeFileSync(join(runDir, 'result.json'), `${JSON.stringify(body, null, 2)}\n`) } catch (e) { log(`⚠️ ランナー: result.json を書けない: ${e?.message ?? e}`) }
    await stdout(`${JSON.stringify(body)}\n`)
    return exitCode
  }
  // 設定ファイルの toolConfig.<tool>（codexBin・command・guardScript 等。キーは adapters/<tool>.mjs 冒頭）に、
  // ツール共通の値を重ねる。共通の値と同名のキーは validateConfig が拒否するので、上書きの順序には依存しない
  const toolConfig = { ...(config.toolConfig?.[cli.tool] ?? {}), deleteSessions: config.cleanup.deleteSessions, models: config.models[cli.tool], timeoutsSec: config.timeoutsSec }
  // 内容の固定（PR #851 の P0。lib/pins.mjs）。アダプタを作る前・エージェントを 1 つも起動する前に、ホストが直接起動する
  // launcher（と照合より前に source される signed-output.sh）と、ツールが実行中に遅延で読むガード（agent-guard.sh。
  // アダプタと同じ入力で探す）・Codex の hook を固定する。照合は agent-host が段ごとに行う
  const pins = pinFiles(pinPathsFor({ tool: cli.tool, skillDir: args.skillDir, mainRoot, toolConfig, adaptersDir: ADAPTERS_DIR }))
  log(`ランナー: 内容を固定したファイル ${pins.length} 件（${pins.map((p) => `${p.path.split('/').pop()}=${p.sha256 === null ? 'absent' : p.sha256.slice(0, 12)}`).join(' ')}）`)
  let adapter
  try {
    adapter = mod.createAdapter({
      skillDir: args.skillDir,
      mainRoot,
      runDir,
      toolConfig,
      guard: { codexRules },
      env: childEnv,
    })
  } catch (e) {
    const why = isAdapterError(e) ? `${e.kind}: ${e.message}` : String(e?.message ?? e)
    prereq(`アダプタを作れない: ${why.slice(0, 400)}`)
    return finish(3, null, `アダプタを作れない: ${why.slice(0, 400)}`)
  }
  // 後片づけは 1 回だけ走らせ、2 回目以降の呼び出しにも同じ Promise を返す（シグナルの close が進行中に本流が close を
  // 呼んでも、セッションの削除が終わる前に戻って exit しないように）
  let closing = null
  const close = () => {
    closing ??= (async () => {
      try {
        await adapter.close()
      } catch (e) {
        log(`⚠️ ランナー: アダプタの後片づけが失敗した: ${String(e?.message ?? e).slice(0, 200)}`)
      }
    })()
    return closing
  }
  // 中断・終了時の後片づけ（監査 e670648 の LOW-11）。start() より前に登録する（start 中の中断でも子を残さない）。
  //   - 同期の kill: アダプタの killSync（任意。契約への追加）と実行仕様の子（spawnScript）のプロセスグループを
  //     SIGKILL する。process の exit（想定外の例外で落ちた場合を含む）でも呼ぶ。close を待てない経路の保険
  //   - シグナル: 同期の kill の後に close（セッションの削除）を待って 128 + 番号で exit する
  const killSync = () => {
    try { adapter.killSync?.() } catch { /* 片づけの失敗で止めない */ }
    try { killScriptsSync() } catch { /* 同上 */ }
    try { killGitSync() } catch { /* 同上（隔離 worktree の作成中の git。detached で端末の Ctrl-C が届かない） */ }
  }
  onExit(killSync)
  onSignal((sig) => {
    log(`ランナー: ${sig} を受けたので後片づけして終了する`)
    killSync()
    return close().finally(() => exit(SIGNAL_CODES[sig] ?? 130))
  })

  try {
    await adapter.start()
  } catch (e) {
    await close()
    const why = isAdapterError(e) ? `${e.kind}: ${e.message}` : String(e?.message ?? e)
    prereq(`アダプタの起動に失敗: ${why.slice(0, 400)}`)
    return finish(3, null, `アダプタの起動に失敗: ${why.slice(0, 400)}`)
  }
  // 隔離 worktree の git の上限（設定の timeoutsSec.worktree。秒）。無ければ作成関数の既定（fetch 5 分・ほか 2 分）
  const wtSec = config.timeoutsSec.worktree ?? {}
  const wtTimeouts = {
    ...(wtSec.fetch !== undefined ? { fetchTimeoutMs: wtSec.fetch * 1000 } : {}),
    ...(wtSec.git !== undefined ? { gitTimeoutMs: wtSec.git * 1000 } : {}),
  }
  // 以降の想定外の例外（ホストの組み立て・結果の書き出しの失敗等）でもアダプタを片づける。close は 1 回だけ
  try {
    const agent = createAgentHost({
      adapter,
      cfg: {
        config, skillDir: args.skillDir, mainRoot, runId, runDir, args, repo, maxParallel: cli.maxParallel ?? undefined, log, pins,
        createWorktree: (p) => makeWorktree({ ...p, ...wtTimeouts }),
        ...(spawnScript ? { spawnScript } : {}),
      },
    })
    let code
    let result = null
    let error
    try {
      result = await workflow.run(args, agent, log, phase)
      code = 0
    } catch (e) {
      code = 1
      error = String(e?.stack ?? e?.message ?? e).slice(0, 4000)
      log(`ランナー: ホストが例外で終わった: ${String(e?.message ?? e).slice(0, 400)}`)
    }
    log(`ランナー: agent() ${agent.stats.calls} 回（アダプタ ${agent.stats.adapterCalls} 回）`)
    await close()
    return await finish(code, result, error)
  } finally {
    await close()
  }
}

// CLI として起動されたときだけ実行する（テストは import して main を呼ぶ）
const invokedDirectly = (() => {
  try {
    return realpathSync(process.argv[1] ?? '') === realpathSync(fileURLToPath(import.meta.url))
  } catch {
    return false
  }
})()
if (invokedDirectly) {
  // 継いだ GIT_DIR 等（リポジトリの位置を変える git の変数）をプロセスの env から外す。gh の認証確認・実行仕様の段の
  // launcher（agent-host の spawnScript は既定で process.env を渡す）を含む、以降に起動するすべての子が継がないように
  const kept = new Set(Object.keys(gitLocationFreeEnv(process.env)))
  for (const k of Object.keys(process.env)) if (!kept.has(k)) delete process.env[k]
  // パイプ先では stdout / stderr の書き込みが非同期になり得るので、空の書き込みの完了（先行分の書き出し後）を待ってから exit する
  const flush = () => Promise.all([process.stdout, process.stderr].map((s) => new Promise((r) => s.write('', () => r()))))
  main(process.argv.slice(2)).then(
    (code) => flush().then(() => process.exit(code)),
    (e) => {
      process.stderr.write(`ランナー: 想定外の例外: ${String(e?.stack ?? e)}\n`)
      flush().then(() => process.exit(1))
    },
  )
}
