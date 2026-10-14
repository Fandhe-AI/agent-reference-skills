// main セッション環境の保護（Issue #590・#591）の回帰テスト。
//
// 背景:
//   #590: 一時ファイル規則が「scratchpad に置き、成否に関わらず削除する」としか書いておらず、
//     main セッションと共有の scratchpad の中身をエージェントが掃除してしまう（実測: ラン間で使う
//     契約・スクリプト 4 ファイルが 2 回消えた）。自分で作った専用ディレクトリの中だけで作成・削除
//     する規則へ改め、固定名・他者のファイルの削除/上書きを禁じる。
//   #591: 隔離 worktree を持たない計画エージェント（plan:#N）が調査のために
//     `git checkout --detach origin/main` を実行し、メイン worktree が detached HEAD のまま残った。
//     HEAD を動かす git 操作の禁止を隔離なしの全エージェントへ共通で課し、ラン開始時と終了時の
//     HEAD を比較して変化があれば警告する。
//
// 読み込み方式は他の回帰テストと同一: 駆動部マーカーより上（定義部）だけを一時ファイルへ切り出して
// import する。agent() / log() はグローバル注入前提のため、スタブを globalThis に置いて呼ぶ。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
const SKILL_MD_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'SKILL.md')
// マーカーはソース中に 1 回しか現れてはならない（g0-gates.test.mjs が出現回数を固定）ため分割して組み立てる。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

// 'main' 以外の base 名にして、origin/main の直書きを検出できるようにする。
globalThis.args = { parent: 1, branch: 'develop' }
const logged = []
globalThis.log = (m) => { logged.push(String(m)) }
let agentStub = async () => { throw new Error('agentStub 未設定') }
globalThis.agent = (...a) => agentStub(...a)

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-main-session-protection-')))
const slicePath = join(sliceDir, 'defs.mjs')
const SLICE_EXPORTS = [
  'TEMP_FILE_POLICY',
  'COMMON',
  'MERGE_CONTEXT_COMMON',
  'BASE_MERGE_CONTEXT_COMMON',
  'planPrompt',
  'MAIN_HEAD_SCHEMA',
  'scanMainWorktreeHead',
  'diffMainWorktreeHead',
  'formatMainWorktreeHeadWarning',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const mod = await import(pathToFileURL(slicePath).href)
const {
  TEMP_FILE_POLICY, COMMON, MERGE_CONTEXT_COMMON, BASE_MERGE_CONTEXT_COMMON, planPrompt,
  MAIN_HEAD_SCHEMA, scanMainWorktreeHead, diffMainWorktreeHead, formatMainWorktreeHeadWarning,
} = mod

// ---------------------------------------------------------------------------
// #590: TEMP_FILE_POLICY の文面
// ---------------------------------------------------------------------------

test('#590: TEMP_FILE_POLICY は scratchpad が main セッションと共有であり、自分専用ディレクトリ（mktemp -d）の中に置くことを要求する', () => {
  assert.match(TEMP_FILE_POLICY, /scratchpad/)
  assert.match(TEMP_FILE_POLICY, /main セッションと共有/)
  assert.match(TEMP_FILE_POLICY, /mktemp -d で作った自分専用ディレクトリ/)
})

test('#590: TEMP_FILE_POLICY は scratchpad 直下に固定名のファイルを作ることを禁じる', () => {
  assert.match(TEMP_FILE_POLICY, /scratchpad 直下に固定名のファイルを作らない/)
})

test('#590: TEMP_FILE_POLICY は自分が作ったもの以外（scratchpad 本体・既存の兄弟）の削除・上書きと rm -rf を禁じる', () => {
  assert.match(TEMP_FILE_POLICY, /削除は自分が作ったファイル・ディレクトリだけに限り/)
  assert.match(TEMP_FILE_POLICY, /scratchpad 本体/)
  assert.match(TEMP_FILE_POLICY, /既存の兄弟/)
  assert.match(TEMP_FILE_POLICY, /自分が作っていないものは削除も上書きもしない/)
  assert.match(TEMP_FILE_POLICY, /rm -rf の対象にしない/)
})

test('#590: TEMP_FILE_POLICY は「一時ファイルは成否に関わらず削除する」を無条件の指示として残さない（自作に限定する）', () => {
  assert.doesNotMatch(TEMP_FILE_POLICY, /。一時ファイルは成否に関わらず削除する/)
  assert.match(TEMP_FILE_POLICY, /自分が作った一時ファイルは成否に関わらず削除する/)
})

test('#590 / #497: メイン worktree 直下へ作らない規則・相対パスリダイレクト禁止・同一 Bash 呼び出し規則は維持される', () => {
  assert.match(TEMP_FILE_POLICY, /メイン worktree（リポジトリルート）とカレントディレクトリへは、ファイル・ディレクトリを作成しない/)
  assert.match(TEMP_FILE_POLICY, /相対パスへのリダイレクト/)
  assert.match(TEMP_FILE_POLICY, /同一の Bash 呼び出しで完結/)
})

test('#590: SKILL.md に scratchpad 共有の注意とラン間ファイルの置き場所の指針がある', () => {
  const md = readFileSync(SKILL_MD_PATH, 'utf8')
  assert.match(md, /scratchpad を共有/)
  assert.match(md, /~\/\.cache\//)
})

// ---------------------------------------------------------------------------
// #591: HEAD を動かす git 操作の禁止（共通規則）
// ---------------------------------------------------------------------------

test('#591: TEMP_FILE_POLICY（共通規則）は HEAD を動かす git サブコマンドを列挙して禁じる', () => {
  for (const cmd of ['checkout', 'switch', 'reset', 'merge', 'rebase', 'stash', 'pull', 'commit', 'clean']) {
    assert.match(TEMP_FILE_POLICY, new RegExp(`\\b${cmd}\\b`), `${cmd} を禁止列挙に含むこと`)
  }
  assert.match(TEMP_FILE_POLICY, /メイン worktree の HEAD・インデックス・作業ツリー/)
})

test('#591: 共通規則は HEAD を動かさない読み取り手段（git show / diff / ls-tree / log）を案内する', () => {
  for (const cmd of ['git show', 'git diff', 'git ls-tree', 'git log']) {
    assert.ok(TEMP_FILE_POLICY.includes(cmd), `${cmd} を案内すること`)
  }
})

test('#591: 共通規則は役割上の例外（別 worktree への git -C・worktree 削除・ブランチ削除）を許し、隔離 worktree 内の操作を妨げない', () => {
  assert.match(TEMP_FILE_POLICY, /git -C/)
  assert.match(TEMP_FILE_POLICY, /git worktree remove/)
  assert.match(TEMP_FILE_POLICY, /隔離 worktree 内/)
})

test('#591: COMMON・MERGE_CONTEXT_COMMON・BASE_MERGE_CONTEXT_COMMON はいずれも共通規則を含む', () => {
  for (const [name, text] of [['COMMON', COMMON], ['MERGE_CONTEXT_COMMON', MERGE_CONTEXT_COMMON], ['BASE_MERGE_CONTEXT_COMMON', BASE_MERGE_CONTEXT_COMMON]]) {
    assert.ok(text.includes(TEMP_FILE_POLICY), `${name} が TEMP_FILE_POLICY を含むこと`)
  }
})

test('#591: planPrompt は共通規則を含み、origin/<base> は git show / ls-tree / diff / log で読むよう明記する（base を直書きしない）', () => {
  const out = planPrompt({ number: 591, title: 't' })
  assert.ok(out.includes(TEMP_FILE_POLICY))
  assert.match(out, /git show origin\/develop:<path>/)
  assert.match(out, /git ls-tree/)
  assert.match(out, /git diff/)
  assert.match(out, /git log/)
  assert.match(out, /HEAD を動かす/)
  assert.doesNotMatch(out, /git show origin\/main:/)
})

// 全 agent 呼び出しの走査: 隔離の有無によらず、どの agent / runStateAgent の呼び出しも
// プロンプトに共通規則（TEMP_FILE_POLICY を内包する定数）が届くことを固定する。挿入漏れの検出用。
const POLICY_TOKENS = ['TEMP_FILE_POLICY', 'COMMON', 'MERGE_CONTEXT_COMMON', 'BASE_MERGE_CONTEXT_COMMON']
const hasPolicyToken = (text) => POLICY_TOKENS.some((t) => new RegExp(`(^|[^A-Z_])${t}([^A-Z_]|$)`).test(text))

function functionBody(name) {
  const m = new RegExp(`^(?:async )?function ${name}\\(`, 'm').exec(source)
  assert.ok(m, `関数 ${name} を特定できること`)
  const rest = source.slice(m.index)
  const end = rest.indexOf('\n}\n')
  return end < 0 ? rest : rest.slice(0, end)
}

function collectAgentCallSites() {
  const lines = source.split('\n')
  const sites = []
  let offset = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trimStart()
    const lineStart = offset
    offset += line.length + 1
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue
    if (/^(?:async )?function /.test(trimmed)) continue
    const re = /\b(?:await\s+)?(agent|runStateAgent|agentRetryOnce)\(/g
    let m
    while ((m = re.exec(line)) !== null) {
      const callIdx = lineStart + m.index
      const after = source.slice(callIdx + m[0].length)
      if (after.startsWith(')')) continue
      sites.push({ line: i + 1, fn: m[1], callIdx, after })
    }
  }
  return sites
}

function enclosingHeader(callIdx) {
  const head = source.slice(0, callIdx)
  const idx = Math.max(head.lastIndexOf('\nasync function '), head.lastIndexOf('\nfunction '))
  return source.slice(idx + 1, source.indexOf('\n', idx + 1))
}

test('#591: 全 agent / runStateAgent 呼び出しのプロンプトに共通規則（TEMP_FILE_POLICY 系）が届く（挿入漏れの走査）', () => {
  const sites = collectAgentCallSites()
  assert.ok(sites.length >= 25, `走査対象の呼び出しを十分に検出できること（実際: ${sites.length}）`)
  const missing = []
  let checked = 0
  for (const s of sites) {
    // 第 1 引数の形で解決方法を決める。
    const callHead = s.after.trimStart()
    const labelIdx = callHead.indexOf('label:')
    let region
    const fnCall = /^([A-Za-z_]\w*)\(/.exec(callHead)
    const ident = /^([A-Za-z_]\w*)\s*[,+)]/.exec(callHead)
    if (fnCall) {
      region = functionBody(fnCall[1])
    } else if (ident) {
      // 呼び出し元関数の引数（ヘルパー）は呼び出し側で検査されるため対象外。
      const header = enclosingHeader(s.callIdx)
      if (new RegExp(`\\b${ident[1]}\\b`).test(header) || (/prompt/.test(header) && /^prompt/.test(ident[1]))) continue
      const before = source.slice(0, s.callIdx)
      const defIdx = before.lastIndexOf(`const ${ident[1]} =`)
      assert.ok(defIdx >= 0, `${s.line} 行: 変数 ${ident[1]} の定義を特定できること`)
      region = source.slice(defIdx, s.callIdx)
    } else {
      assert.ok(labelIdx > 0, `${s.line} 行: label を特定できること`)
      region = callHead.slice(0, labelIdx)
    }
    checked += 1
    if (!hasPolicyToken(region)) missing.push(`${s.line} 行 ${s.fn}(`)
  }
  assert.ok(checked >= 20, `実際に検査した呼び出しが十分あること（実際: ${checked}）`)
  assert.deepEqual(missing, [], `共通規則が届いていない agent 呼び出し: ${missing.join(', ')}`)
})

test('#591: plan:#N の起動は隔離しない（isolation 追加は worktree 作成コストと容量ゲートに影響する）', () => {
  const idx = driverPart.indexOf('agent(planPrompt(item), {')
  assert.ok(idx >= 0)
  const block = driverPart.slice(idx, driverPart.indexOf('})', idx))
  assert.doesNotMatch(block, /isolation/)
})

// ---------------------------------------------------------------------------
// #591: メイン worktree の HEAD 観測と比較
// ---------------------------------------------------------------------------

const SHA_A = 'a'.repeat(40)
const SHA_B = 'b'.repeat(40)
const obs = (ref, sha) => ({ observed: true, ref, sha })

test('diffMainWorktreeHead: ブランチ名が変わったら changed（開始 main → 終了 detached）', () => {
  const d = diffMainWorktreeHead(obs('refs/heads/main', SHA_A), obs('', SHA_A))
  assert.equal(d.observed, true)
  assert.equal(d.changed, true)
})

test('diffMainWorktreeHead: 別ブランチへ切り替わっても changed', () => {
  const d = diffMainWorktreeHead(obs('refs/heads/main', SHA_A), obs('refs/heads/other', SHA_A))
  assert.equal(d.changed, true)
})

test('diffMainWorktreeHead: 同じブランチで先端 sha だけ進んだ場合は changed ではなく shaChanged（正規の push/pull で起こり得る）', () => {
  const d = diffMainWorktreeHead(obs('refs/heads/main', SHA_A), obs('refs/heads/main', SHA_B))
  assert.equal(d.changed, false)
  assert.equal(d.shaChanged, true)
})

test('diffMainWorktreeHead: 開始時から detached の場合は sha が動いたら changed', () => {
  assert.equal(diffMainWorktreeHead(obs('', SHA_A), obs('', SHA_B)).changed, true)
  assert.equal(diffMainWorktreeHead(obs('', SHA_A), obs('', SHA_A)).changed, false)
})

test('diffMainWorktreeHead: 変化なしなら changed:false', () => {
  const d = diffMainWorktreeHead(obs('refs/heads/main', SHA_A), obs('refs/heads/main', SHA_A))
  assert.deepEqual([d.observed, d.changed, d.shaChanged], [true, false, false])
})

test('diffMainWorktreeHead: どちらかが未観測なら observed:false（変化なしと断定しない）', () => {
  assert.equal(diffMainWorktreeHead({ observed: false }, obs('refs/heads/main', SHA_A)).observed, false)
  assert.equal(diffMainWorktreeHead(obs('refs/heads/main', SHA_A), { observed: false }).observed, false)
  assert.equal(diffMainWorktreeHead(undefined, undefined).observed, false)
})

test('formatMainWorktreeHeadWarning: 変化ありのときだけ警告文を返し、自動では戻していないことを明記する', () => {
  const warn = formatMainWorktreeHeadWarning(diffMainWorktreeHead(obs('refs/heads/main', SHA_A), obs('', SHA_B)))
  assert.match(warn, /メイン worktree の HEAD/)
  assert.match(warn, /refs\/heads\/main/)
  assert.match(warn, /detached/)
  assert.match(warn, /自動では戻していない/)
  assert.equal(formatMainWorktreeHeadWarning(diffMainWorktreeHead(obs('refs/heads/main', SHA_A), obs('refs/heads/main', SHA_A))), '')
  assert.equal(formatMainWorktreeHeadWarning({ observed: false }), '')
})

test('formatMainWorktreeHeadWarning: ref は sanitize され、未信頼値由来のコマンド置換記号が生で残らない', () => {
  const warn = formatMainWorktreeHeadWarning(diffMainWorktreeHead(obs('refs/heads/$(id)', SHA_A), obs('', SHA_A)))
  assert.doesNotMatch(warn, /[^\\]\$\(/)
  assert.doesNotMatch(warn, /`/)
})

test('MAIN_HEAD_SCHEMA は ref と sha だけを required に持ち、自由文フィールドを持たない', () => {
  assert.deepEqual([...MAIN_HEAD_SCHEMA.required].sort(), ['ref', 'sha'])
  assert.deepEqual(Object.keys(MAIN_HEAD_SCHEMA.properties).sort(), ['ref', 'sha'])
})

test('scanMainWorktreeHead: 正常応答は observed:true（detached は ref 空文字）', async () => {
  let seenPrompt = ''
  agentStub = async (p, opts) => { seenPrompt = p; assert.equal(opts.label, 'worktree:head-scan'); return { ref: 'refs/heads/main', sha: SHA_A } }
  assert.deepEqual(await scanMainWorktreeHead('baseline'), { observed: true, ref: 'refs/heads/main', sha: SHA_A })
  assert.match(seenPrompt, /symbolic-ref -q HEAD/)
  assert.match(seenPrompt, /rev-parse HEAD/)
  assert.ok(seenPrompt.includes(TEMP_FILE_POLICY))
  agentStub = async () => ({ ref: '', sha: SHA_B })
  assert.deepEqual(await scanMainWorktreeHead('end'), { observed: true, ref: '', sha: SHA_B })
})

test('scanMainWorktreeHead: 不正な応答（sha 形式不正・ref 形式不正・型不正・null）は observed:false', async () => {
  for (const bad of [{ ref: 'refs/heads/main', sha: 'xyz' }, { ref: 'main', sha: SHA_A }, { ref: 'refs/heads/a b', sha: SHA_A }, { ref: 1, sha: SHA_A }, null, {}]) {
    agentStub = async () => bad
    assert.deepEqual(await scanMainWorktreeHead('baseline'), { observed: false }, JSON.stringify(bad))
  }
})

test('scanMainWorktreeHead: agent 例外は throw せず observed:false（本処理を止めない）', async () => {
  agentStub = async () => { throw new Error('boom') }
  assert.deepEqual(await scanMainWorktreeHead('end'), { observed: false })
})

test('スタブ統合: 開始 main → 終了 detached の観測列から警告ログ相当の文面が得られる', async () => {
  const seq = [{ ref: 'refs/heads/main', sha: SHA_A }, { ref: '', sha: SHA_A }]
  agentStub = async () => seq.shift()
  const base = await scanMainWorktreeHead('baseline')
  const end = await scanMainWorktreeHead('end')
  assert.notEqual(formatMainWorktreeHeadWarning(diffMainWorktreeHead(base, end)), '')
})

// 駆動部の配線固定（dead code 化防止）
test('駆動部: HEAD の開始時観測は ensureBoundaryNonceSeed・loadState より前、終了時観測は未追跡検査（終了）の後に行い、警告を出す', () => {
  const baseIdx = driverPart.indexOf("scanMainWorktreeHead('baseline')")
  const nonceIdx = driverPart.indexOf('await ensureBoundaryNonceSeed()')
  const loadIdx = driverPart.indexOf('await loadState()')
  const untrackedEndIdx = driverPart.indexOf("scanMainWorktreeUntracked('end')")
  const endIdx = driverPart.indexOf("scanMainWorktreeHead('end')")
  assert.ok(baseIdx >= 0 && endIdx >= 0)
  assert.ok(baseIdx < nonceIdx && baseIdx < loadIdx, '開始時観測が最初のエージェント呼び出しより前')
  assert.ok(endIdx > untrackedEndIdx, '終了時観測は最後（未追跡検査の後）')
  assert.match(driverPart, /diffMainWorktreeHead\(mainHeadBaseline, mainHeadEnd\)/)
  assert.match(driverPart, /formatMainWorktreeHeadWarning\(mainHeadDiff\)/)
})

test('駆動部: 返却値に mainWorktreeHead が含まれ、HEAD を元に戻す操作は発行しない（警告のみ）', () => {
  assert.match(driverPart, /mainWorktreeHead:\s*\{\s*observed:/)
  const s = driverPart.indexOf('mainHeadDiff')
  const section = driverPart.slice(s, driverPart.indexOf('return { parent, baseBranch'))
  assert.doesNotMatch(section, /git checkout|git switch|git reset/)
})
