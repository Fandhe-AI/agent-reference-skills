// 生成物（implement-issue-tree.js）の `agent(prompt, opts)` を、Codex のアダプタで実装する境界。
//
// 役割: Workflow ランタイムが agent() で担っていたこと（StructuredOutput の強制・隔離 worktree・並列・時間切れ）を、
// ツールに依存しない形でここに集める。アダプタ（runner/adapters/<tool>.mjs）は「完成形のプロンプトを 1 回流して
// 最終テキストを得る」だけを担い、schema 検証・修復・並列制限・worktree 作成はしない
// （契約: _/local-plans/iit-runner-adapter-contract.md の「agent-host の契約」1〜5）。
//
// 返り値の規則（Phase 0-5 の決定。ホストの既存の備え — runStateAgent のモデル切り替え・agentRetryOnce・
// fail-closed — がそのまま働く値にそろえる）:
//   - schema に適合した値か null だけを返す。不適合な値は 1 件もホストへ渡さない（受入基準 4）。undefined は返さない。
//   - null: 修復 1 回の後も不適合・JSON を取り出せない・AdapterError（kind を問わない）・アダプタの想定外の例外・
//     保険の時間切れ・エージェント数の上限超過。
//   - throw: 呼び出し自体の不備（schema が対応範囲外・label が文字列でない・未知の model / effort / isolation）と、
//     隔離 worktree の作成失敗だけ。どれも副作用（worktree・プロセス）を起こす前に投げる。
//
// 実行仕様（Phase P6）: プロンプトの 0 行目が `<!-- iit-exec v1 {json} -->` なら、モデルを介さずに
// `bash <skillDir>/scripts/run-verified.sh <sha256> <script> ...argv` を shell なしで起動して結果を返す
// （仕様の正本は references/script-trust-model.md の「機械的な段の実行仕様」）。label ごとの許可表
// （EXEC_RULES）に合わない仕様は実行せず失敗値を返す。封筒の照合（nonce・sha256・入力の束縛）は従来どおり
// ホストが行い、ここは標準出力の最終行を解釈せずに返すだけである。
//
// 内容の固定（PR #851 の P0。lib/pins.mjs）: 作成時に launcher（scripts/run-verified.sh）と照合より前に source される
// scripts/lib/signed-output.sh の sha256 を固定し、run.mjs がエージェントの起動前に固定した cfg.pins（ガード・hook・plugin）と
// 合わせて、実行仕様の段の起動前・モデルの段の隔離 worktree の作成前と各ターンの前後に照合する。1 度でも食い違えば、以降の段は
// すべて実行しない（実行仕様は exec-refused で失敗値、モデルの段は worktree を作らずに null。reason は pin-mismatch）。照合から起動までの差し替え（TOCTOU）は防がない。
//
// ログ: cfg.runDir があれば、呼び出しごとに <runDir>/agents/<seq 4 桁>-<label>/ へ meta.json（通し確認の判定器が読む。
// 形は run.mjs 冒頭の「出力の形」）・request.json・prompt.txt（モデルへ回した段）・exec.json / stdout.txt / stderr.txt
// （直接実行した段）を書く。アダプタ自身のログ（stderr・JSONL・最終テキスト）は req.logDir の同じ場所に置かれる。
//
// worktree 掃除の複合段（PR #851 の codex P1。lib/cleanup-host.mjs）: label が state:cleanup:#N（と :fallback-<model>）で 0 行目が
// 実行仕様でない呼び出しは、モデルへ回さず、プロンプトの worktree-remove.sh と state.sh の行をホストが検証して順に直接実行する
// （読めない・対象を確かめられないときは何も実行せず失敗値。読み取りの profile のモデルでは削除も状態の書き込みもできないため）。
//
// ランナー自身の lock（Phase 4 の通し確認で、旧 worktree が retained-locked で残った）: 隔離 worktree は作成時に
// `claude agent <runId>-<n> (pid <ランナーの pid>)` で lock され、worktree-remove.sh を起動するのも同じプロセスなので、スクリプトからは
// lock が常に生存と見える。worktree-remove.sh を直接実行する段（掃除の複合段・state:cleanup:#N の remove・worktree:sweep）の前に、
// 対象のうち「このホストが makeWorktree で作り、いま隔離の段が使っていない」worktree だけ、lock の理由が作成時と一致するときに unlock し、
// スクリプトが消さなかったものは同じ理由で lock し直す。集合はプロセス内だけに持ち、label やプロンプトからは足さない。--require-missing
// （スクリプトも lock を外さない結びつけ）では外さない。汚れ・submodule の判定はスクリプトに任せる。
//
// マージを許す段の cwd（Phase 4 の通し確認で、リモートのマージは済んだのに `gh pr merge --delete-branch` がローカルのブランチ削除で
// sandbox に拒まれ merge-failed を返した）: req.merge を決めた merge-exec は、リポジトリの外の空ディレクトリ（os.tmpdir() の下）を
// cwd にする。gh は -R 無し（GH_REPO は flag と数えない）でもローカルにブランチがあるときだけローカル削除を試みるので、git リポジトリの
// 外ではローカル削除を試みず、リモートのブランチ削除まで進む。置き場がリポジトリの中になってしまうときはマージを許さない（fail-closed）。
//
// 状態ファイルの読み込みの段（lib/state-read.mjs）: label が state:load・state:load-fill（と :fallback-<model>）で 0 行目が実行仕様でない
// 隔離なしの呼び出しは、モデルへ回さず、args の parent から決めた状態ファイル（_/issue-trees/<parent>.json）をホストが読んで、
// 渡された schema の形（items は番号 → 項目のオブジェクト）で返す（モデルが長い値を書き写し損ねて state:load-verify との照合が
// 不成立になった）。キーは決めず items を丸ごと返す。状態ファイルがあるのに読めない・形が違う・置き場の外のときは、モデルの段が
// 返すのと同じ照合不成立に倒れる値（state:load は ok: false・fileExisted: true、state:load-fill は items: {}）を返し、読む対象を
// 決められないときは null。状態ファイルが無いときの state:load（初回の初期化）だけは従来どおりモデルの段へ回す。
//
// 呼び出し元: runner/run.mjs（生成物の agent 引数に渡す）と dev/implement-issue-tree/tests/runner-*.test.mjs。
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { isAbsolute, join, resolve } from 'node:path'
import { isDeepStrictEqual } from 'node:util'
import { isAdapterError } from './adapter-error.mjs'
import { extractJsonObject } from './extract-json.mjs'
import { resolveModel, resolveTimeoutMs } from './models.mjs'
import { buildRepairPrompt, composePrompt } from './preamble.mjs'
import { assertSupportedSchema, sanitizeErrorLine, validate } from './schema-validate.mjs'
import { isRepoSlug, mergeNumberKinds, mergePrNumberOf } from './merge-target.mjs'
import { checkPins, launcherPinPaths, mergePins, pinFiles } from './pins.mjs'
import { recoverGitFor } from './recover-git.mjs'
import { CLEANUP_LABEL, CLEAR_WORDS, checkCleanupTarget, parseCleanupPrompt } from './cleanup-host.mjs'
import { STATE_READ_LABEL, readStateFile, stateDirOf, stateFileOf, stateParentOf } from './state-read.mjs'
import { createSequencer, createWorktree, gitLocationFreeEnv, relockOwnWorktree, runExclusive, unlockOwnWorktree, verifyWorktreeGitdir } from './worktree.mjs'

// ---- 実行仕様 ----

const SPEC_PREFIX = '<!-- iit-exec v1 '
const SPEC_SUFFIX = ' -->'
// src の guardExecSpecPrompt と同じ判定（先頭の空白・BOM・大小文字の揺れを含む）。これに当たるのに厳密な形で
// 読めない 0 行目は、偽物か壊れた仕様なので実行しない
const SPEC_LEAD_RE = /^[\s﻿]*<!--\s*iit-exec/i
const SPEC_KEYS = new Set(['v', 'script', 'sha256', 'argv', 'ret', 'stdinHex', 'fail'])
const RETS = Object.freeze(['envelope', 'exit-ok', 'line:STATE_RESULT', 'line:WORKTREE_REMOVE_RESULT'])
// 失敗値。src の EXEC_FAIL_BY_RET・EXEC_FAIL_SWEEP と同じ（仕様に fail が無い版の src でも同じ値を返すため、ここにも持つ）
const FAIL_WORKTREE = Object.freeze({ ok: false, retained: true, worktree: '' })
const FAIL_SWEEP = Object.freeze({ removed: [] })
const FAIL_BY_RET = Object.freeze({ envelope: null, 'exit-ok': { ok: false }, 'line:STATE_RESULT': { ok: false }, 'line:WORKTREE_REMOVE_RESULT': FAIL_WORKTREE })
const MAX_ARGV = 256
const MAX_ARG_BYTES = 64 * 1024
const MAX_STDIN_BYTES = 4 * 1024 * 1024
const MAX_STDOUT_BYTES = 16 * 1024 * 1024
const MAX_STDERR_BYTES = 1024 * 1024

// mode の取り出し方はスクリプトごとに違う（argv の形は src の execSpecLine の呼び出し側が決める）
const STATE_VALUE_OPTS = new Set(['--file', '--bytes', '--version', '--nonce', '--page'])
function stateMode(argv) {
  for (let i = 0; i < argv.length; i++) {
    if (STATE_VALUE_OPTS.has(argv[i])) { i++; continue }
    return argv[i].startsWith('-') ? null : argv[i]
  }
  return null
}
function optionMode(argv) {
  const at = argv.indexOf('--mode')
  if (at < 0 || argv.indexOf('--mode', at + 1) >= 0 || at + 1 >= argv.length) return null
  return argv[at + 1]
}
const firstWord = (argv) => (argv.length > 0 ? argv[0] : null)
const noMode = () => null
const MODE_OF = Object.freeze({
  'state.sh': stateMode,
  'worktree-remove.sh': firstWord,
  'fetch-tree.sh': firstWord,
  'run-verified.sh': firstWord,
  'recover-prep.sh': optionMode,
  'repo-scan.sh': optionMode,
  'observe-pr.sh': optionMode,
  'measure-residual-bytes.sh': noMode,
  'measure-free-disk.sh': noMode,
})

// label の接尾辞（ホストの再試行・モデル切り替えが付ける）。runStateAgent は `:fallback-<model>`、
// agentRetryOnce は `:retry`、skip-labels などは `-retry` を足す
const SUFFIX = '(?::fallback-[a-z0-9]+|:retry|-retry)*'
const rule = (head, script, modes, ret, fail) => Object.freeze({ re: new RegExp(`^${head}${SUFFIX}$`), script, modes, ret, fail })

/**
 * label ごとの許可表（上から最初に label が一致した行だけで判定する。一致した行の script・mode・ret・fail の
 * どれかが仕様と合わなければ実行しない）。対象の段は script-trust-model.md の「対象の段」と P6 src の
 * execSpecLine の呼び出し箇所から作った。表に無い label の仕様は実行しない（fail-closed）。
 */
export const EXEC_RULES = Object.freeze([
  rule('state:cleanup:#\\d+', 'worktree-remove.sh', ['remove'], 'line:WORKTREE_REMOVE_RESULT', FAIL_WORKTREE),
  rule('state:load-verify(?::p\\d+)?', 'state.sh', ['verify'], 'envelope', null),
  rule('state:(?:update:#\\d+|update-batch:\\d+|high-water|high-water-set|init-all)', 'state.sh', ['merge', 'init', 'hw-max', 'hw-set'], 'line:STATE_RESULT', FAIL_BY_RET['line:STATE_RESULT']),
  rule('script-hash-precheck', 'run-verified.sh', ['--verify-only'], 'envelope', null),
  rule('plan:issue-tree-release', 'fetch-tree.sh', ['--release'], 'exit-ok', FAIL_BY_RET['exit-ok']),
  rule('free:#\\d+', 'recover-prep.sh', ['free'], 'exit-ok', FAIL_BY_RET['exit-ok']),
  rule('worktree:absent:#\\d+', 'worktree-remove.sh', ['check-absent'], 'line:WORKTREE_REMOVE_RESULT', FAIL_WORKTREE),
  rule('worktree:sweep', 'worktree-remove.sh', ['sweep'], 'line:WORKTREE_REMOVE_RESULT', FAIL_SWEEP),
  rule('worktree:residual-bytes', 'measure-residual-bytes.sh', [null], 'envelope', null),
  rule('worktree:free-disk-bytes', 'measure-free-disk.sh', [null], 'envelope', null),
  rule('detect:external-checks', 'repo-scan.sh', ['external-checks'], 'envelope', null),
  rule('plan:skip-labels', 'repo-scan.sh', ['skip-labels'], 'envelope', null),
  rule('merge:added-files(?::#\\d+)?', 'observe-pr.sh', ['added-files'], 'envelope', null),
  rule('merge:policy-paths(?::#\\d+)?', 'observe-pr.sh', ['policy-paths'], 'envelope', null),
  // opt-in テスト記録ゲートは observeGate の extra.label でこの名前になる（src の observeOptinRecord）。observeGate の
  // 既定の label（merge:optin-record:#N）は使われないため表に置かない（runner-exec-rules.test.mjs が全行の到達を縛る）
  rule('optin-record-(?:verify|reverify):#\\d+', 'observe-pr.sh', ['optin-record'], 'envelope', null),
])

// 同じリポジトリの worktree 管理領域・ref・ブランチを書くスクリプト（git worktree remove・prune・branch -D・update-ref）。
// 隔離 worktree の作成（worktree.mjs の createWorktree）と並行すると packed-refs・worktrees/ の lock で競合するため、同じキューへ通す
const REPO_WRITING_SCRIPTS = new Set(['worktree-remove.sh', 'recover-prep.sh'])

const isPlainObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x)

/**
 * プロンプトの 0 行目から実行仕様を読む。
 * @returns {{ kind: 'none' } | { kind: 'bad', reason: string } | { kind: 'spec', spec: object }}
 *   none = 仕様ではない（モデルへ回す）/ bad = 仕様の形をしているのに厳密には読めない（実行しない）/ spec = 読めた
 */
export function parseExecSpec(prompt) {
  if (typeof prompt !== 'string') return { kind: 'none' }
  const nl = prompt.indexOf('\n')
  const line0 = nl < 0 ? prompt : prompt.slice(0, nl)
  if (!SPEC_LEAD_RE.test(line0)) return { kind: 'none' }
  const bad = (reason) => ({ kind: 'bad', reason })
  if (!line0.startsWith(SPEC_PREFIX) || !line0.endsWith(SPEC_SUFFIX)) return bad('0 行目の区切りが規定の形でない')
  let spec
  try {
    spec = JSON.parse(line0.slice(SPEC_PREFIX.length, -SPEC_SUFFIX.length))
  } catch {
    return bad('0 行目の JSON を読めない')
  }
  if (!isPlainObject(spec)) return bad('仕様がオブジェクトでない')
  for (const k of Object.keys(spec)) if (!SPEC_KEYS.has(k)) return bad(`未知のキー ${k.slice(0, 40)}`)
  if (spec.v !== 1) return bad('v が 1 でない')
  if (typeof spec.script !== 'string' || !Object.hasOwn(MODE_OF, spec.script)) return bad('script が許可リストに無い')
  if (spec.script === 'run-verified.sh') {
    if ('sha256' in spec) return bad('run-verified.sh の仕様に sha256 がある')
  } else if (typeof spec.sha256 !== 'string' || !/^[0-9a-f]{64}$/.test(spec.sha256)) {
    return bad('sha256 が 64 桁の小文字 16 進でない')
  }
  if (!Array.isArray(spec.argv) || spec.argv.length > MAX_ARGV) return bad('argv が配列でない・多すぎる')
  let argBytes = 0
  for (const a of spec.argv) {
    if (typeof a !== 'string' || a.includes('\0')) return bad('argv に文字列以外・NUL がある')
    argBytes += Buffer.byteLength(a)
  }
  if (argBytes > MAX_ARG_BYTES) return bad('argv が長すぎる')
  if (!RETS.includes(spec.ret)) return bad('ret が未知')
  if ('stdinHex' in spec && (typeof spec.stdinHex !== 'string' || !/^(?:[0-9a-f]{2})*$/.test(spec.stdinHex) || spec.stdinHex.length > MAX_STDIN_BYTES * 2)) {
    return bad('stdinHex が小文字 16 進の偶数長でない・長すぎる')
  }
  return { kind: 'spec', spec }
}

/**
 * 仕様を label の許可表に照らす。fail は表の値を正とする（仕様に fail が無い版の src でも同じ値を返す）。
 * @returns {{ ok: true, rule: object } | { ok: false, reason: string, fail: any }}
 */
export function checkExecRule(label, spec) {
  const r = EXEC_RULES.find((x) => x.re.test(label))
  // 表に無い label: 失敗値は null（応答なし）。仕様の fail は表と照合できないため使わない（監査 e670648 の LOW-14。
  // 成功に見える値〔{ ok: true } 等〕を検証なしにホストへ返さない）。契約の「実行せず fail を返す」は、表にあって
  // script・mode・ret・fail が食い違う label の話で、その場合は下の no() が表の fail を返す
  if (!r) return { ok: false, reason: 'label が許可表に無い', fail: null }
  const no = (reason) => ({ ok: false, reason, fail: r.fail })
  if (spec.script !== r.script) return no(`script が label の許可と違う（${r.script} のみ）`)
  if (!r.modes.includes(MODE_OF[spec.script](spec.argv))) return no('mode が label の許可と違う')
  if (spec.ret !== r.ret) return no('ret が label の許可と違う')
  if ('fail' in spec && !isDeepStrictEqual(spec.fail, r.fail)) return no('fail が label の失敗値と違う')
  return { ok: true, rule: r }
}

// 実行中の spawnScript の子（プロセスグループの長）。ランナーの終了時に killScriptsSync が同期で止める（LOW-11）
const liveScripts = new Set()

/** 実行中の spawnScript の子のプロセスグループを同期で SIGKILL する（process の exit・シグナルの処理から呼ぶ）。 */
export function killScriptsSync() {
  for (const c of liveScripts) {
    try { process.kill(-c.pid, 'SIGKILL') } catch { try { c.kill('SIGKILL') } catch { /* 既に終了 */ } }
  }
  liveScripts.clear()
}

/**
 * スクリプトを shell なしで起動する既定の実装。detached でプロセスグループを作り、時間切れ・出力超過では
 * グループごと止める（gh などの孫プロセスを残さない）。時間切れはまず SIGTERM を送り（git は SIGTERM なら作りかけの
 * *.lock〔index.lock・refs の lock〕を消して終わる。SIGKILL では残り、後続の git が lock で失敗する。lib/worktree.mjs の
 * gitAsync と同じ）、killGraceMs（既定 2 秒）を過ぎてもプロセスグループが空にならなければ SIGKILL を送る。SIGTERM の後は、
 * 子（launcher の bash。trap を持たず先に終わる）の exit でも close でもグループを撃たず、グループが空になるのを待って決着する
 * （worktree-remove.sh 等の git は標準出力・標準エラーを /dev/null へ向けるため、close は git の片づけの完了を意味しない）。
 * 出力超過はその場で SIGKILL を送る。SIGKILL の後さらに killGraceMs を過ぎても close が来なければ
 * （新しいセッションへ抜けた孫が標準出力を握っている・子が D 状態にある等）、close を待たずに timedOut / overflow を
 * 立てたまま code: null で決着する（並列の枠を握り続けない）。子が終わったとき（正常終了を含む）は、その場で同じ
 * プロセスグループへ SIGKILL を送り、標準入出力を閉じて残った孫も止める（終了後は liveScripts から外れ、killScriptsSync の
 * 対象にならないため。adapters/codex.mjs と同じ。回収直後に送るので pid の再利用で別のグループは撃たない）。
 * 新しいセッションへ抜けた孫はグループの外にいるため止められない。
 * @returns {Promise<{ code: number|null, stdout: string, stderr: string, timedOut: boolean, overflow: boolean, error?: string }>}
 */
export function spawnScript(file, args, { cwd, input, timeoutMs, env = process.env, killGraceMs = 2000 }) {
  return new Promise((resolve) => {
    let child
    try {
      child = spawn(file, args, { cwd, env, stdio: ['pipe', 'pipe', 'pipe'], detached: true })
      if (child.pid !== undefined) liveScripts.add(child)
    } catch (e) {
      resolve({ code: null, stdout: '', stderr: '', timedOut: false, overflow: false, error: String(e?.message ?? e) })
      return
    }
    const out = []
    const err = []
    let outBytes = 0
    let errBytes = 0
    let timedOut = false
    let overflow = false
    let settled = false
    let forceTimer = null
    let termTimer = null
    let killed = false
    let drainTimer = null
    const signalGroup = (sig) => {
      try { process.kill(-child.pid, sig) } catch { try { child.kill(sig) } catch { /* 既に終了 */ } }
    }
    // SIGTERM を送ったが SIGKILL はまだ: 子の exit・close ではグループを撃たず、空になるか猶予の満了まで git の片づけを待つ
    const terminating = () => timedOut && !killed
    // グループに生きたプロセスが残るか（kill 0 が ESRCH なら空。メンバーが居る間は pgid は再利用されない）
    const groupAlive = () => { try { process.kill(-child.pid, 0); return true } catch (e) { return e?.code === 'EPERM' } }
    // 出力超過・SIGTERM の猶予切れ: グループを SIGKILL で止め、猶予の後は close を待たずに決着する（猶予のタイマーは 1 本だけ）
    const killGroup = () => {
      killed = true
      signalGroup('SIGKILL')
      if (forceTimer === null) forceTimer = setTimeout(() => finish(null, undefined, true), killGraceMs)
    }
    const timer = setTimeout(() => {
      timedOut = true
      signalGroup('SIGTERM')
      termTimer = setTimeout(killGroup, killGraceMs)
    }, timeoutMs)
    child.stdout.on('data', (b) => {
      if (overflow) return
      outBytes += b.length
      if (outBytes > MAX_STDOUT_BYTES) { overflow = true; killGroup(); return }
      out.push(b)
    })
    child.stderr.on('data', (b) => {
      if (errBytes < MAX_STDERR_BYTES) err.push(b.subarray(0, MAX_STDERR_BYTES - errBytes))
      errBytes += b.length
    })
    const finish = (code, error, forced = false) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      clearTimeout(termTimer)
      clearTimeout(forceTimer)
      clearInterval(drainTimer)
      liveScripts.delete(child)
      // close が来ていない: 抜けた孫が握る pipe の読み口を閉じる（イベントループを握らせず、決着後に溜め込まない）
      if (forced) { child.stdout.destroy(); child.stderr.destroy() }
      resolve({ code, stdout: Buffer.concat(out).toString('utf8'), stderr: Buffer.concat(err).toString('utf8'), timedOut, overflow, ...(error ? { error } : {}) })
    }
    child.on('error', (e) => finish(null, String(e?.message ?? e)))
    child.on('exit', () => { if (!terminating()) signalGroup('SIGKILL') })
    child.on('close', (code) => {
      // SIGTERM の後: グループが空になってから決着する（空にならなければ termTimer の SIGKILL と forceTimer が決着させる）
      if (terminating() && groupAlive()) {
        drainTimer = setInterval(() => { if (!groupAlive()) finish(code) }, 25)
        return
      }
      finish(code)
    })
    // 標準入力を読まないスクリプトが先に閉じても落ちないようにする
    child.stdin.on('error', () => {})
    child.stdin.end(input)
  })
}

/** 標準出力の最終行（末尾の改行を除いた最後の行）。 */
function lastLine(stdout) {
  const lines = stdout.replace(/\n+$/, '').split('\n')
  return lines[lines.length - 1]
}
function parseObjectLine(text) {
  try {
    const v = JSON.parse(text)
    return isPlainObject(v) ? v : undefined
  } catch {
    return undefined
  }
}

/**
 * 終了コードと標準出力から ret に従って値を作る。非 0 終了・結果の行なし・封筒なしは undefined（呼び出し側が失敗値にする）。
 * 非 0 終了なら標準出力は見ない（結果らしい行があっても読まない）。
 */
export function interpretExecResult(ret, { code, stdout, timedOut, overflow, error }) {
  if (code !== 0 || timedOut || overflow || error) return undefined
  if (ret === 'exit-ok') return { ok: true }
  const line = lastLine(stdout)
  if (ret === 'envelope') return parseObjectLine(line)
  const word = ret.slice('line:'.length)
  if (!line.startsWith(`${word} `)) return undefined
  return parseObjectLine(line.slice(word.length + 1))
}

// ---- 共通 ----

function createLimiter(max) {
  let active = 0
  let maxActive = 0
  const queue = []
  const release = () => {
    active--
    const next = queue.shift()
    if (next) next()
  }
  return {
    async acquire() {
      if (active >= max) await new Promise((r) => queue.push(r))
      active++
      if (active > maxActive) maxActive = active
      return release
    },
    get active() { return active },
    get maxActive() { return maxActive },
  }
}

// 状態ファイルの置き場（<main>/_/issue-trees）を追加の書き込み可にする段（契約の req.writablePaths。監査 e670648 の MEDIUM-4）。
// モデルの段で状態ファイルを書くのは state:load（無ければ初期化する）だけである。状態ファイルがあるときの state:load は
// ホストが読むので（lib/state-read.mjs）、モデルへ回るのは初期化のときだけになる。src の runStateAgent が付ける
// `:fallback-<model>` を含め、読み取り専用の state:load-fill・直接実行の state:load-verify には一致させない
const STATE_LOAD_LABEL = /^state:load(?::fallback-[a-z0-9]+)?$/

/** label ごとの追加の書き込み可パス（絶対パスの配列）。 */
export function writablePathsFor(label, mainRoot) {
  return STATE_LOAD_LABEL.test(label) ? [stateDirOf(mainRoot)] : []
}

// ツリーの取得（PR #851 の P1）: plan:issue-tree（と -retry）は fetch-tree.sh --root で自分の TMPDIR に
// iit-tree.XXXXXX/tree.tsv を作り、2 ページ以上なら plan:issue-tree-page-N（と -retry）が --page --dir でそれを読む。
// アダプタはエージェントごとに TMPDIR を分けて他の分を読ませない（Codex の LOW-13）ため、ページの段にだけ
// ツリーの段の logDir を req.readTmpOf（読んでよい前の段の TMPDIR。アダプタが自分の配置へ写す）として渡す。書き込みは足さない
const TREE_LABEL = /^plan:issue-tree(?:-retry)?$/
const TREE_PAGE_LABEL = /^plan:issue-tree-page-[1-9][0-9]*(?:-retry)?$/

const safeLabel = (label) => label.replace(/[^A-Za-z0-9._-]+/g, '_').slice(0, 80) || '_'

/**
 * @param {{ adapter: { name: string, run: Function }, cfg: {
 *   config: object,            // models.mjs の validateConfig を通したランナー設定
 *   skillDir: string,          // 実行仕様の run-verified.sh の置き場（<skillDir>/scripts/）
 *   mainRoot: string,          // メイン worktree（実行仕様の cwd・隔離 worktree の親）
 *   runId: string,             // wf_<16 進 8>-<16 進 3>
 *   runDir?: string,           // _/iit-runner/<runId>。無ければエージェント別のログを書かない
 *   args?: object,             // 生成物に渡す args（autoMerge を読む）
 *   repo?: string|null,        // owner/repo（run.mjs が autoMerge のとき gh repo view で決める。req.merge.repo になる）
 *   maxParallel?: number,      // --max-parallel。無ければ config.limits.maxParallel
 *   log?: (msg: string) => void,
 *   timeoutGraceMs?: number,   // アダプタが時間切れで止まらなかったときの保険の猶予（既定 30 秒）
 *   timers?: { setTimeout: Function, clearTimeout: Function }, // テスト用の差し替え（保険の時間切れのタイマー。既定は大域のもの）
 *   createWorktree?: Function, // テスト用の差し替え（既定は worktree.mjs の実物）
 *   spawnScript?: Function,    // テスト用の差し替え（既定は spawnScript）
 *   pins?: ReadonlyArray<{ path: string, sha256: string|null }>, // run.mjs がエージェントの起動前に取った固定（lib/pins.mjs）
 * } }} p
 * @returns {(prompt: string, opts: object) => Promise<object|null>} stats（calls・active・maxActive・adapterCalls）を持つ
 */
export function createAgentHost({ adapter, cfg }) {
  if (!adapter || typeof adapter.run !== 'function') throw new TypeError('adapter.run が無い')
  const { config, skillDir, mainRoot, runId, runDir } = cfg
  if (typeof skillDir !== 'string' || !isAbsolute(skillDir)) throw new TypeError('cfg.skillDir は絶対パス')
  if (typeof mainRoot !== 'string' || !isAbsolute(mainRoot)) throw new TypeError('cfg.mainRoot は絶対パス')
  const tool = adapter.name
  const log = typeof cfg.log === 'function' ? cfg.log : () => {}
  const maxParallel = cfg.maxParallel ?? config.limits.maxParallel
  if (!Number.isInteger(maxParallel) || maxParallel < 1) throw new TypeError('maxParallel は正の整数')
  const repairAttempts = config.limits.repairAttempts
  const maxAgents = config.limits.maxAgents
  const graceMs = cfg.timeoutGraceMs ?? 30_000
  // 保険の時間切れのタイマー（テストが実時間で待たずに発火させるための差し替え口。既定は大域の setTimeout / clearTimeout）
  const timers = cfg.timers ?? { setTimeout, clearTimeout }
  if (typeof timers?.setTimeout !== 'function' || typeof timers?.clearTimeout !== 'function') throw new TypeError('cfg.timers は setTimeout・clearTimeout を持つ')
  const makeWorktree = cfg.createWorktree ?? createWorktree
  const runScript = cfg.spawnScript ?? spawnScript
  const autoMerge = cfg.args?.autoMerge === true
  const repo = cfg.repo ?? null
  if (repo !== null && !isRepoSlug(repo)) throw new TypeError('cfg.repo は owner/repo の形')
  const mergeCwdParent = cfg.mergeCwdParent ?? tmpdir()
  if (typeof mergeCwdParent !== 'string' || !isAbsolute(mergeCwdParent)) throw new TypeError('cfg.mergeCwdParent は絶対パス')
  const seq = createSequencer()
  const limiter = createLimiter(maxParallel)
  // このホストが makeWorktree で作った worktree（パス → 作成時の lock の理由）と、いま隔離の段が使っている worktree。
  // 入力（label・プロンプト）からは足さない
  const ownLocks = new Map()
  const busy = new Set()
  let adapterCalls = 0
  // ツリーの段（TREE_LABEL）の logDir。ページの段の req.readTmpOf になる（起動した順）
  const treeLogDirs = []
  // 内容の固定。run.mjs の固定（より早い時点）を優先し、launcher と signed-output.sh は無ければここで固定する
  const pins = mergePins(Array.isArray(cfg.pins) ? cfg.pins : [], pinFiles(launcherPinPaths(skillDir)))
  let tampered = ''
  /** 固定と照合する。食い違いは覚えておき、以降はファイルを読まずに同じ理由を返す（元に戻されても止めたまま）。 */
  const pinMismatch = () => {
    if (!tampered) {
      tampered = checkPins(pins)
      if (tampered) log(`⚠️ ランナー: 起動時に固定したファイルが書き換えられたため、以降の段を実行しない（${tampered}）`)
    }
    return tampered
  }

  // エージェント別のログ。書けなくても本処理は止めない（ログはラン後の調査用）
  const writeLog = (dir, name, data) => {
    if (!dir) return
    try {
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, name), typeof data === 'string' ? data : `${JSON.stringify(data, null, 2)}\n`)
    } catch (e) {
      log(`⚠️ ランナー: ログを書けない（${name}）: ${String(e?.message ?? e).slice(0, 120)}`)
    }
  }

  /** 自分が作った worktree のキー（作成時のパス）。集合に無ければ null。 */
  const ownKey = (p) => {
    if (typeof p !== 'string' || !isAbsolute(p)) return null
    const r = resolve(p)
    if (ownLocks.has(r)) return r
    try {
      const real = realpathSync(r)
      if (ownLocks.has(real)) return real
    } catch { /* 実体が無い */ }
    return null
  }
  /** worktree-remove.sh の前に、自分の lock だけを外す。外したキーの配列を返す（後で relockOwn に渡す）。 */
  async function unlockOwn(paths, label) {
    const done = []
    for (const p of paths) {
      const key = ownKey(p)
      if (key === null || done.includes(key)) continue
      if (busy.has(key)) {
        log(`⚠️ ${label}: 隔離の段が使用中の worktree なので lock を外さない（${key}）`)
        continue
      }
      const r = await unlockOwnWorktree({ mainRoot, path: key, reason: ownLocks.get(key) })
      if (r === 'unlocked') {
        log(`${label}: ランナーが作成時に付けた lock を外してから掃除する（${key}）`)
        done.push(key)
      } else if (r === 'other-lock' || r === 'error') {
        log(`⚠️ ${label}: lock を外さない（${r === 'other-lock' ? '作成時と違う理由の lock' : 'lock を確かめられない'}: ${key}）`)
      }
    }
    return done
  }
  /** スクリプトの後、まだ登録が残る（保持された）ものを作成時の理由で lock し直す。 */
  async function relockOwn(keys, label) {
    for (const key of keys) {
      const r = await relockOwnWorktree({ mainRoot, path: key, reason: ownLocks.get(key) })
      if (r === 'relocked') log(`${label}: 残った worktree を lock し直した（${key}）`)
      else if (r === 'error') log(`⚠️ ${label}: 残った worktree を lock し直せない（${key}）`)
    }
  }
  /** 直接実行する worktree-remove.sh の対象のパス（remove の --path・sweep の候補）。--require-missing は空（lock を外さない）。 */
  const removeTargets = (spec, input) => {
    if (spec.script !== 'worktree-remove.sh') return []
    const a = spec.argv
    if (a[0] === 'remove') {
      if (a.includes('--require-missing')) return []
      const i = a.indexOf('--path')
      return i >= 0 && typeof a[i + 1] === 'string' ? [a[i + 1]] : []
    }
    if (a[0] === 'sweep') {
      try {
        const list = JSON.parse(input.toString('utf8'))
        return Array.isArray(list) ? list.filter((x) => typeof x === 'string') : []
      } catch {
        return []
      }
    }
    return []
  }

  /**
   * マージを許す段の cwd を作る（リポジトリの外の空ディレクトリ）。git が work tree の中と判定する場所なら作った物を消して null。
   */
  const makeMergeCwd = (label) => {
    let dir = null
    try {
      dir = realpathSync(mkdtempSync(join(mergeCwdParent, 'iit-merge-')))
      // GIT_DIR・GIT_CEILING_DIRECTORIES 等を外した環境で、上へたどって git リポジトリが見つからないことを確かめる
      const r = spawnSync('git', ['rev-parse', '--git-dir'], { cwd: dir, env: gitLocationFreeEnv(), stdio: ['ignore', 'ignore', 'ignore'], timeout: 10_000 })
      if (r.status !== 128) throw new Error(r.status === 0 ? 'git リポジトリの中にある' : `判定できない（git の終了コード ${r.status}）`)
      return dir
    } catch (e) {
      log(`⚠️ ${label}: マージの段の cwd をリポジトリの外に用意できない（${sanitizeErrorLine(e?.message ?? e)}）。この段ではマージを許さない`)
      if (dir !== null) try { rmSync(dir, { recursive: true, force: true }) } catch { /* 消せなくても続ける */ }
      return null
    }
  }

  async function runDirect(spec, label, schema, prompt, logDir, timeoutMs, rec) {
    // 直接実行の段は会話が無い（sessionRef は null のまま）。成否は status に残す
    rec.outcome = 'exec-spec'
    const checked = checkExecRule(label, spec)
    if (!checked.ok) {
      log(`⚠️ ${label}: 実行仕様が許可表と合わないため実行しない（${checked.reason}）`)
      Object.assign(rec, { status: 'exec-refused', reason: checked.reason })
      return structuredClone(checked.fail)
    }
    const fail = () => structuredClone(checked.rule.fail)
    const mismatch = pinMismatch()
    if (mismatch) {
      Object.assign(rec, { status: 'exec-refused', reason: `pin-mismatch: ${mismatch}` })
      return fail()
    }
    const launcher = join(skillDir, 'scripts', 'run-verified.sh')
    const args = spec.script === 'run-verified.sh' ? [launcher, ...spec.argv] : [launcher, spec.sha256, spec.script, ...spec.argv]
    const input = spec.stdinHex === undefined ? Buffer.alloc(0) : Buffer.from(spec.stdinHex, 'hex')
    writeLog(logDir, 'exec.json', { script: spec.script, argv: spec.argv, ret: spec.ret, stdinBytes: input.length, cwd: mainRoot })
    const started = Date.now()
    const unlocked = await unlockOwn(removeTargets(spec, input), label)
    if (unlocked.length > 0) rec.unlocked = unlocked
    let r
    try {
      // リポジトリの管理領域・ref を書くスクリプトは createWorktree と同じキューで流す（キューの待ちは timeoutMs に含めない。時間切れはスクリプトの起動から数える）
      const go = () => runScript('bash', args, { cwd: mainRoot, input, timeoutMs }, { label, prompt, spec })
      r = await (REPO_WRITING_SCRIPTS.has(spec.script) ? runExclusive(mainRoot, go) : go())
    } finally {
      await relockOwn(unlocked, label)
    }
    writeLog(logDir, 'stdout.txt', r.stdout ?? '')
    writeLog(logDir, 'stderr.txt', r.stderr ?? '')
    const value = interpretExecResult(spec.ret, r)
    const base = { code: r.code, timedOut: r.timedOut, overflow: r.overflow, durationMs: Date.now() - started }
    if (value === undefined) {
      log(`⚠️ ${label}: スクリプトの直接実行が失敗した（終了コード ${r.code}${r.timedOut ? '・時間切れ' : ''}${r.overflow ? '・出力超過' : ''}${r.error ? '・起動失敗' : ''}）`)
      Object.assign(rec, { status: 'exec-fail', ...base })
      return fail()
    }
    const v = validate(schema, value)
    if (!v.ok) {
      log(`⚠️ ${label}: スクリプトの出力が schema に適合しないため失敗値を返す`)
      Object.assign(rec, { status: 'exec-invalid', errors: v.errors, ...base })
      return fail()
    }
    Object.assign(rec, { status: 'exec-ok', ...base })
    return value
  }

  // worktree 掃除の複合段（lib/cleanup-host.mjs）。1 段目（worktree-remove.sh remove）の語が removed / not-registered / skipped の
  // ときだけ 2 段目（state.sh merge で .items["N"].worktree を空にする）を起動する。2 段目の失敗は ok だけを false にする（プロンプトの
  // 手順 2 と同じ）。時間切れは 2 本で 1 つの予算。返す値は 1 段目の結果の行から ok・retained・branchSha・worktree の語だけを写したもの
  async function runHostCleanup(label, schema, prompt, logDir, timeoutMs, rec) {
    rec.outcome = 'exec-spec'
    // kind はアダプタの失敗種別に使うキーのため、直接実行の種類は別のキーに置く
    rec.direct = 'host-cleanup'
    const fail = () => structuredClone(FAIL_WORKTREE)
    const refuse = (reason) => {
      log(`⚠️ ${label}: worktree 掃除の段を実行しない（${reason}）`)
      Object.assign(rec, { status: 'exec-refused', reason })
      return fail()
    }
    const p = parseCleanupPrompt(label, prompt, { skillDir })
    if (!p.ok) return refuse(`プロンプトを読めない: ${p.reason}`)
    if (Number.isInteger(cfg.args?.parent) && cfg.args.parent !== p.parent) return refuse('状態ファイルの番号が args.parent と違う')
    const target = checkCleanupTarget({ mainRoot, path: p.path, parent: p.parent, issue: p.issue })
    if (!target.ok) return refuse(`対象を確かめられない: ${target.reason}`)
    const launcher = join(skillDir, 'scripts', 'run-verified.sh')
    const started = Date.now()
    // 2 段の共有予算の期限。1 段目がキュー（createWorktree 等）を抜けて実行を始めた時点で決める（キューの待ちは予算に数えない。runDirect と同じ）
    let deadline
    const step = async (name, sha256, argv, stdin) => {
      const mismatch = pinMismatch()
      if (mismatch) return { refused: `pin-mismatch: ${mismatch}` }
      const input = Buffer.from(stdin, 'utf8')
      writeLog(logDir, `exec-${name}.json`, { script: name, argv, stdinBytes: input.length, cwd: mainRoot })
      // worktree-remove.sh は createWorktree と同じキューで流す。期限は最初の段がキューを抜けた時点で決め、2 段目はその残りを使う
      const go = () => {
        deadline ??= Date.now() + timeoutMs
        return runScript('bash', [launcher, sha256, name, ...argv], { cwd: mainRoot, input, timeoutMs: Math.max(1, deadline - Date.now()) }, { label, prompt })
      }
      const r = await (REPO_WRITING_SCRIPTS.has(name) ? runExclusive(mainRoot, go) : go())
      writeLog(logDir, `stdout-${name}.txt`, r.stdout ?? '')
      writeLog(logDir, `stderr-${name}.txt`, r.stderr ?? '')
      return { r }
    }
    const unlocked = p.remove.argv.includes('--require-missing') ? [] : await unlockOwn([p.path], label)
    if (unlocked.length > 0) rec.unlocked = unlocked
    let s1
    try {
      s1 = await step('worktree-remove.sh', p.remove.sha256, p.remove.argv, '')
    } finally {
      await relockOwn(unlocked, label)
    }
    if (s1.refused) return refuse(s1.refused)
    const raw = interpretExecResult('line:WORKTREE_REMOVE_RESULT', s1.r)
    const base = { code: s1.r.code, timedOut: s1.r.timedOut, overflow: s1.r.overflow }
    if (raw === undefined || typeof raw.ok !== 'boolean' || typeof raw.retained !== 'boolean') {
      log(`⚠️ ${label}: worktree-remove.sh の直接実行が失敗した（終了コード ${s1.r.code}${s1.r.timedOut ? '・時間切れ' : ''}）`)
      Object.assign(rec, { status: 'exec-fail', step: 'worktree-remove.sh', ...base, durationMs: Date.now() - started })
      return fail()
    }
    const value = {
      ok: raw.ok,
      retained: raw.retained,
      branchSha: typeof raw.branchSha === 'string' && /^[0-9a-f]{40}$/.test(raw.branchSha) ? raw.branchSha : '',
      worktree: typeof raw.worktree === 'string' && /^[a-z-]{1,40}$/.test(raw.worktree) ? raw.worktree : '',
    }
    let cleared = false
    if (CLEAR_WORDS.includes(value.worktree)) {
      const s2 = await step('state.sh', p.state.sha256, p.state.argv, p.state.stdin)
      const st = s2.refused ? undefined : interpretExecResult('line:STATE_RESULT', s2.r)
      cleared = st?.ok === true
      if (!cleared) {
        log(`⚠️ ${label}: 状態ファイルの worktree を空にできなかった（${s2.refused ?? `終了コード ${s2.r.code}`}）`)
        value.ok = false
      }
    }
    const v = validate(schema, value)
    if (!v.ok) {
      Object.assign(rec, { status: 'exec-invalid', errors: v.errors, ...base, durationMs: Date.now() - started })
      return fail()
    }
    Object.assign(rec, { status: 'exec-ok', worktreeWord: value.worktree, stateCleared: cleared, ...base, durationMs: Date.now() - started })
    return value
  }

  // 状態ファイルの読み込みの段（lib/state-read.mjs）。値を返したら終わり、undefined ならモデルの段へ回す
  // （状態ファイルが無いときの state:load = 初回の初期化だけ）
  function runHostStateRead(label, schema, prompt, logDir, rec) {
    const fill = STATE_READ_LABEL.exec(label)[1] === '-fill'
    const started = Date.now()
    const direct = (status, extra = {}) => Object.assign(rec, { outcome: 'exec-spec', direct: 'host-state-read', status, durationMs: Date.now() - started }, extra)
    // 固定の食い違いの後は、モデルの段と同じく何もせず null
    const mismatch = pinMismatch()
    if (mismatch) {
      direct('exec-refused', { reason: `pin-mismatch: ${mismatch}` })
      return null
    }
    const parent = stateParentOf(cfg.args)
    const rel = parent === null ? null : stateFileOf(parent)
    // 読む対象を決められない・プロンプトが同じ状態ファイルを指さない: 何も読まない
    if (rel === null || !prompt.includes(rel)) {
      const reason = rel === null ? 'args の parent から状態ファイルを決められない' : 'プロンプトが args の parent の状態ファイルを指さない'
      log(`⚠️ ${label}: 状態ファイルを読まない（${reason}）`)
      direct('exec-refused', { reason })
      return null
    }
    const r = readStateFile({ mainRoot, parent })
    writeLog(logDir, 'state-read.json', { file: rel, kind: r.kind, ...(r.kind === 'bad' ? { reason: r.reason } : {}), ...(r.kind === 'ok' ? { keys: Object.keys(r.items).length } : {}) })
    if (r.kind === 'absent' && !fill) {
      log(`${label}: 状態ファイル（${rel}）が無いため、初期化をモデルの段へ回す`)
      return undefined
    }
    let value
    if (r.kind === 'ok') {
      value = fill ? { items: r.items } : { ok: true, fileExisted: true, items: r.items, highWaterBytes: r.highWaterBytes, highWaterVersion: r.highWaterVersion }
    } else {
      // モデルの段が返すのと同じ照合不成立に倒れる値（state:load は loadState が停止し、state:load-fill は項目が未照合のまま残る）
      if (r.kind === 'bad') log(`⚠️ ${label}: 状態ファイル（${rel}）を読めない（${r.reason}）`)
      value = fill ? { items: {} } : { ok: false, fileExisted: true, items: {}, highWaterBytes: 0, highWaterVersion: 0 }
    }
    const v = validate(schema, value)
    if (!v.ok) {
      log(`⚠️ ${label}: 状態ファイルから作った値が schema に適合しないため null を返す`)
      direct('exec-invalid', { errors: v.errors })
      return null
    }
    direct(r.kind === 'ok' ? 'exec-ok' : 'exec-fail', { stateFile: r.kind, ...(r.kind === 'bad' ? { reason: r.reason } : {}) })
    return value
  }

  // アダプタ 1 回分。保険の時間切れ（timeoutMs + 猶予）を過ぎたら待つのをやめる（アダプタの停止責務の取りこぼし対策）。
  // 時間切れでは settled（adapter.run の決着。reject も値に包むので reject しない）を一緒に返す。呼び出し元はこれが決着するまで
  // 隔離 worktree を使用中（busy）のままにする（モデルがまだ動いているかもしれない worktree の lock を掃除で外さない）
  async function callAdapter(req) {
    adapterCalls++
    let timer
    const settled = adapter.run(req).then((value) => ({ value }), (error) => ({ error }))
    const watchdog = new Promise((resolve) => {
      timer = timers.setTimeout(() => resolve({ watchdog: true, settled }), req.timeoutMs + graceMs)
    })
    try {
      return await Promise.race([settled, watchdog])
    } finally {
      timers.clearTimeout(timer)
    }
  }

  // 応答テキストを取り出し・検証する。適合なら { ok: true, value }、不適合なら { ok: false, errors }
  function check(schema, text) {
    const obj = typeof text === 'string' ? extractJsonObject(text) : undefined
    if (obj === undefined) return { ok: false, errors: [] }
    const v = validate(schema, obj)
    return v.ok ? { ok: true, value: obj } : { ok: false, errors: v.errors }
  }

  async function runModel({ prompt, opts, label, schema, n, logDir, timeoutMs, rec, using }) {
    // 固定の食い違いの後は、隔離 worktree も作らない（fetch・worktree add・lock の .git への書き込みを起こさない）
    if (pinMismatch()) {
      Object.assign(rec, { outcome: 'null', status: 'null', sessionRef: null, reason: 'pin-mismatch', detail: tampered })
      return null
    }
    const resolved = resolveModel(config, tool, { model: opts.model, effort: opts.effort })
    let cwd = mainRoot
    let worktreePath
    // 隔離 worktree の git ディレクトリ（契約の req.worktreeGitdir。HIGH-2）。作成直後に検証した値だけを渡し、
    // アダプタは worktree の .git ファイルを読まない。修復ターン（resume）も同じ req から作るので読み直さない。
    // 作成関数が gitdir を返さない（テストの差し替え）ときは null（アダプタは git の書き込みを足さない）
    let worktreeGitdir = null
    if (opts.isolation === 'worktree') {
      // 失敗は例外のまま上げる（契約で throw してよい 2 つのうちの 1 つ。gitdir の検証失敗も作成失敗として扱う）
      const wt = await makeWorktree({ mainRoot, runId, n })
      cwd = wt.path
      worktreePath = wt.path
      if (typeof wt.lockReason === 'string' && wt.lockReason !== '' && typeof wt.path === 'string') ownLocks.set(wt.path, wt.lockReason)
      busy.add(wt.path)
      using.path = wt.path
      if (wt.gitdir !== undefined) worktreeGitdir = verifyWorktreeGitdir(mainRoot, wt.gitdir)
    }
    // マージしてよい対象（契約の req.merge。MEDIUM-8）。PR 番号は前置きを足す前のホストのプロンプトから取る。
    // 決められなければ allowMerge も false にする（fail-closed）。プロンプトが gh pr merge <N> を 1 つも含まないのは
    // 回復専用の merge-exec（生成物が allowMerge=false の文面で呼ぶ。マージしない段）なので、警告を出さない
    let merge = null
    if (autoMerge && /^merge-exec(?::|$)/.test(label)) {
      const prNumber = mergePrNumberOf(prompt)
      const kinds = mergeNumberKinds(prompt)
      if (prNumber !== null && repo !== null) {
        const dir = makeMergeCwd(label)
        if (dir !== null) {
          merge = { prNumber, repo }
          cwd = dir
          using.mergeCwd = dir
        }
      } else if (prNumber === null && kinds === 0) { /* 回復専用の段: マージのコマンドを含まない */ }
      else log(`⚠️ ${label}: マージ対象を決められない（${prNumber === null ? `プロンプトの gh pr merge の PR 番号が ${kinds} 種類で、手順 3 の形の 1 種類に決まらない` : 'repo が未確定'}）。この段ではマージを許さない`)
    }
    const req = {
      prompt: composePrompt({ prompt, schema, worktreePath, merge: merge !== null }),
      schema,
      model: resolved.model,
      effort: resolved.effort,
      cwd,
      label,
      allowMerge: merge !== null,
      merge,
      timeoutMs,
      resume: null,
      logDir: logDir ?? '',
      worktreeGitdir,
      writablePaths: writablePathsFor(label, mainRoot),
      readTmpOf: TREE_PAGE_LABEL.test(label) ? [...treeLogDirs] : [],
      // 回復の段（recover:#N）の git の書き込み先（lib/recover-git.mjs。旧 worktree はホストのプロンプトの行から取って検証する）
      recoverGit: opts.isolation === 'worktree' ? null : recoverGitFor(label, prompt, { skillDir, mainRoot }),
    }
    if (TREE_LABEL.test(label) && logDir) treeLogDirs.push(logDir)
    writeLog(logDir, 'request.json', { seq: n, label, phase: opts.phase ?? null, iitModel: resolved.name, model: req.model, effort: req.effort, cwd, allowMerge: req.allowMerge, merge, timeoutMs, worktree: worktreePath ?? null, worktreeGitdir, writablePaths: req.writablePaths, readTmpOf: req.readTmpOf, recoverGit: req.recoverGit })
    writeLog(logDir, 'prompt.txt', req.prompt)
    // meta.json の outcome は ok / null の 2 値、詳細（修復の有無・失敗の理由）は status・reason に置く
    const outcome = (status, extra = {}) => Object.assign(rec, { outcome: status === 'ok' || status === 'repaired' ? 'ok' : 'null', status, sessionRef }, extra)

    let sessionRef = null
    let errors = []
    for (let turn = 0; turn <= repairAttempts; turn++) {
      if (pinMismatch()) {
        outcome('null', { reason: 'pin-mismatch', detail: tampered })
        return null
      }
      const r = await callAdapter(turn === 0 ? req : { ...req, resume: { sessionRef, message: buildRepairPrompt(errors) } })
      if (r.watchdog) {
        log(`⚠️ ${label}: アダプタが時間切れ（${timeoutMs} ms + 猶予）を過ぎても戻らないため未返却として扱う`)
        outcome('null', { reason: 'watchdog' })
        using.settled = r.settled
        return null
      }
      if (r.error !== undefined) {
        const kind = isAdapterError(r.error) ? r.error.kind : 'unexpected'
        log(`⚠️ ${label}: アダプタが失敗した（${kind}）: ${sanitizeErrorLine(r.error?.message ?? r.error)}`)
        outcome('null', { reason: kind, ...(isAdapterError(r.error) ? { kind } : {}), sessionRef: r.error?.sessionRef ?? sessionRef })
        return null
      }
      sessionRef = typeof r.value?.sessionRef === 'string' ? r.value.sessionRef : sessionRef
      // ターンの最中に書き換えられていたら、適合した応答でも返さない
      if (pinMismatch()) {
        outcome('null', { reason: 'pin-mismatch', detail: tampered })
        return null
      }
      const c = check(schema, r.value?.text)
      if (c.ok) {
        // 隔離の段の worktreePath は、モデルの書き写しでなくランナーが作ったパスを返す（Phase 4 の通し確認で、fix の段が
        // パスの後ろに語を足した値を返し、ホストの sanitizeWorktreePath が空にして追跡できなくなった）
        if (worktreePath !== undefined && isPlainObject(c.value) && Object.hasOwn(c.value, 'worktreePath') && c.value.worktreePath !== worktreePath) {
          log(`⚠️ ${label}: 返された worktreePath が作成したパスと違うため、作成したパスに置き換える（返された値: ${sanitizeErrorLine(String(c.value.worktreePath)).slice(0, 200)}）`)
          c.value.worktreePath = worktreePath
          rec.worktreePathReplaced = true
        }
        outcome(turn === 0 ? 'ok' : 'repaired', { usage: r.value?.usage ?? null })
        return c.value
      }
      errors = c.errors
      // 修復ターンは同じ会話へ追記する。会話の参照が無ければ続けられない
      if (sessionRef === null) break
    }
    log(`⚠️ ${label}: 応答が schema に適合しない（修復 ${repairAttempts} 回後）ため未返却として扱う`)
    outcome('null', { reason: 'schema', errors })
    return null
  }

  async function agent(prompt, opts) {
    // 通し番号は待ちに入る前に採る（呼び出し順 = 番号。隔離しない呼び出し・直接実行の段も数える）
    const n = seq.next()
    if (!isPlainObject(opts) || typeof opts.label !== 'string' || opts.label === '') throw new TypeError('agent(): opts.label は空でない文字列')
    const { label, schema } = opts
    const logDir = runDir ? join(runDir, 'agents', `${String(n).padStart(4, '0')}-${safeLabel(label)}`) : null
    // meta.json（通し確認の判定器が読む）。outcome は ok / null / exec-spec / throw
    const rec = { label, seq: n, sessionRef: null, outcome: null, startedAt: new Date().toISOString() }
    try {
      if (typeof prompt !== 'string') throw new TypeError('agent(): prompt は文字列')
      // schema 自体の不備は例外（契約で throw してよい 2 つのうちの 1 つ）
      assertSupportedSchema(schema)
      if (opts.isolation !== undefined && opts.isolation !== 'worktree') throw new TypeError(`agent(): 未知の isolation: ${String(opts.isolation).slice(0, 40)}`)
      // 未知の model / effort は副作用の前に例外にする（黙って別のモデルへ倒さない。models.mjs の方針）
      resolveModel(config, tool, { model: opts.model, effort: opts.effort })
      const timeoutMs = resolveTimeoutMs(config, { phase: opts.phase })
      if (n > maxAgents) {
        log(`⚠️ ${label}: エージェント数の上限（${maxAgents}）を超えたため起動しない`)
        Object.assign(rec, { outcome: 'null', reason: 'max-agents' })
        return null
      }
      const parsed = parseExecSpec(prompt)
      const release = await limiter.acquire()
      try {
        if (parsed.kind === 'bad') {
          log(`⚠️ ${label}: 0 行目が実行仕様の形をしているが読めないため実行しない（${parsed.reason}）`)
          Object.assign(rec, { outcome: 'null', status: 'exec-refused', reason: parsed.reason })
          return null
        }
        if (parsed.kind === 'spec') return await runDirect(parsed.spec, label, schema, prompt, logDir, timeoutMs, rec)
        if (CLEANUP_LABEL.test(label) && opts.isolation === undefined) return await runHostCleanup(label, schema, prompt, logDir, timeoutMs, rec)
        if (STATE_READ_LABEL.test(label) && opts.isolation === undefined) {
          const value = runHostStateRead(label, schema, prompt, logDir, rec)
          if (value !== undefined) return value
        }
        // settled: 保険の時間切れで待つのをやめたときの adapter.run の決着（callAdapter）。あれば決着まで busy を外さない
        const using = { path: null, mergeCwd: null, settled: null }
        try {
          return await runModel({ prompt, opts, label, schema, n, logDir, timeoutMs, rec, using })
        } finally {
          if (using.path !== null) {
            const p = using.path
            if (using.settled !== null) using.settled.then(() => busy.delete(p))
            else busy.delete(p)
          }
          if (using.mergeCwd !== null) {
            try { rmSync(using.mergeCwd, { recursive: true, force: true }) } catch (e) { log(`⚠️ ${label}: マージの段の cwd を消せない: ${sanitizeErrorLine(e?.message ?? e)}`) }
          }
        }
      } finally {
        release()
      }
    } catch (e) {
      Object.assign(rec, { outcome: 'throw', error: sanitizeErrorLine(e?.message ?? e) })
      throw e
    } finally {
      rec.endedAt = new Date().toISOString()
      writeLog(logDir, 'meta.json', rec)
    }
  }

  Object.defineProperty(agent, 'stats', {
    get: () => ({ calls: seq.count, active: limiter.active, maxActive: limiter.maxActive, adapterCalls }),
  })
  return agent
}
