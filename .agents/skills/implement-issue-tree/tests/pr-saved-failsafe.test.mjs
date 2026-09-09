// Issue #465: Merge ループ内のエージェント呼び出し（monitor / merge-exec / merge-verify /
// base-merge / fix）が StructuredOutput を返さず終了した（例外・null 返却いずれも）場合の
// fail-safe 分類の決定的回帰テスト。
//
// Merge ループ突入時点で対象イシューの PR は必ず作成済み（impl.prNumber は runImplement が
// PR 作成成功後にのみ runMergeLoop を呼ぶため、ループ内では常に truthy）。この不変条件に基づき、
// これらの呼び出しが結果を返せなかった場合は systemic failure（'failed'・halt カウント対象・
// 次回 Recover→再実装で重複 PR を作りうる）ではなく 'blocked'（次回実行の monitoring 再開）へ
// 倒す。ルートノード（verify-close）は pr/worktree 概念を持たないため同じ理由で 'blocked'
// （halt 非カウント）へ倒すが、意味は「冪等な再実行」であり「既存 PR の再開」ではない。
//
// 検証の二層構造（merge-loop-rescan.test.mjs と同型）:
//   1. 純粋関数（classifyMergeTerminalStatus / classifyVerifyCloseStatus /
//      classifyMergeExecDispatch の agentOutputMissing 引数）の入出力表を固定する。
//   2. runMergeLoop / runVerifyClose / recordEphemeralWorktree は Workflow ハーネス依存
//      （注入グローバル agent / log）でテスト境界マーカーより下にあり import できないため、
//      ソース走査で「各エージェント呼び出しが try/catch で例外を捕捉し合流させていること」
//      「新設分岐が 'blocked' で終端すること」を機械検証する。この層がないと純粋関数テストは
//      配線なしでもグリーンになり、本 Issue の回帰検知にならない。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
// マーカー行の行頭までを定義部として切り出す（マーカー行自体は含めない）。
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
// マーカー以降（runMergeLoop・runVerifyClose 本体を含む駆動部）はソース走査（文字列探索）で
// 配線を検証する。import はできない（Workflow ハーネス依存のため）。
const driverPart = source.slice(markerIndex)

const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-failsafe-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
const SLICE_EXPORTS = [
  'classifyMergeExecDispatch',
  'classifyMergeTerminalStatus',
  'classifyVerifyCloseStatus',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

// args 未注入の import。駆動部の副作用がマーカーより上に混入していればここで失敗する。
const mod = await import(pathToFileURL(slicePath).href)
const { classifyMergeExecDispatch, classifyMergeTerminalStatus, classifyVerifyCloseStatus } = mod

test('駆動部マーカーは 1 か所のみ存在し、定義部の import は副作用なく成功する', () => {
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  assert.equal(typeof classifyMergeTerminalStatus, 'function')
  assert.equal(typeof classifyVerifyCloseStatus, 'function')
})

// ---------------------------------------------------------------------------
// classifyMergeTerminalStatus（runMergeLoop 終端の status 判定・純粋関数）
// ---------------------------------------------------------------------------

test('classifyMergeTerminalStatus: agent-output-missing は blocked（Issue #465 の新規ケース）', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'agent-output-missing',
      lastBlockedReason: 'unrecoverable',
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      rescueTimeoutQualityBlock: false,
    }),
    'blocked',
  )
})

test('classifyMergeTerminalStatus: blocked + quality は blocked（既存契約の固定）', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'blocked',
      lastBlockedReason: 'quality',
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      rescueTimeoutQualityBlock: false,
    }),
    'blocked',
  )
})

test('classifyMergeTerminalStatus: blocked + unrecoverable は failed（既存契約の固定）', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'blocked',
      lastBlockedReason: 'unrecoverable',
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      rescueTimeoutQualityBlock: false,
    }),
    'failed',
  )
})

test('classifyMergeTerminalStatus: unresolved-comments は blocked（既存契約の固定）', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'unresolved-comments',
      lastBlockedReason: 'unrecoverable',
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      rescueTimeoutQualityBlock: false,
    }),
    'blocked',
  )
})

test('classifyMergeTerminalStatus: mergedButIssueOpen は blocked（既存契約の固定）', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'timeout',
      lastBlockedReason: 'unrecoverable',
      routingErrorDetected: false,
      mergedButIssueOpen: true,
      rescueTimeoutQualityBlock: false,
    }),
    'blocked',
  )
})

test('classifyMergeTerminalStatus: rescueTimeoutQualityBlock は blocked（既存契約の固定）', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'timeout',
      lastBlockedReason: 'unrecoverable',
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      rescueTimeoutQualityBlock: true,
    }),
    'blocked',
  )
})

test('classifyMergeTerminalStatus: routingErrorDetected は他の全条件より優先して failed に固定する（worktree 誤配置は再監視で解消しない）', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'agent-output-missing',
      lastBlockedReason: 'unrecoverable',
      routingErrorDetected: true,
      mergedButIssueOpen: false,
      rescueTimeoutQualityBlock: false,
    }),
    'failed',
  )
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'blocked',
      lastBlockedReason: 'quality',
      routingErrorDetected: true,
      mergedButIssueOpen: true,
      rescueTimeoutQualityBlock: true,
    }),
    'failed',
  )
})

test('classifyMergeTerminalStatus: invalid-monitor-result（enum 外）は failed のまま変更しない', () => {
  assert.equal(
    classifyMergeTerminalStatus({
      lastState: 'invalid-monitor-result',
      lastBlockedReason: 'unrecoverable',
      routingErrorDetected: false,
      mergedButIssueOpen: false,
      rescueTimeoutQualityBlock: false,
    }),
    'failed',
  )
})

// ---------------------------------------------------------------------------
// classifyVerifyCloseStatus（runVerifyClose 終端の status 判定・純粋関数）
// ---------------------------------------------------------------------------

test('classifyVerifyCloseStatus: null は blocked（StructuredOutput 未返却・例外いずれも合流済み）', () => {
  assert.equal(classifyVerifyCloseStatus(null), 'blocked')
})

test('classifyVerifyCloseStatus: undefined も blocked', () => {
  assert.equal(classifyVerifyCloseStatus(undefined), 'blocked')
})

test('classifyVerifyCloseStatus: closed:false（agent が応答した上での未クローズ判定）は failed', () => {
  assert.equal(classifyVerifyCloseStatus({ closed: false, summary: 'まだ子イシューが残っている' }), 'failed')
})

// ---------------------------------------------------------------------------
// classifyMergeExecDispatch の agentOutputMissing 引数（クロスチェック。g0-gates.test.mjs にも
// 同種ケースを追加済みだが、本ファイルは Issue #465 専用の集約先として重複して固定する）。
// ---------------------------------------------------------------------------

test('classifyMergeExecDispatch: agentOutputMissing=true は agent-output-missing へ遷移する', () => {
  assert.deepEqual(classifyMergeExecDispatch('', 'unrecoverable', true), {
    lastState: 'agent-output-missing',
    lastBlockedReason: 'unrecoverable',
  })
})

// ---------------------------------------------------------------------------
// 配線の構造アサーション（ソース走査。runMergeLoop / runVerifyClose は import 不能なため）
// ---------------------------------------------------------------------------

test('monitor 呼び出しは try/catch で包まれ、例外は m = null として null 返却と同じ経路へ合流する', () => {
  const callIdx = driverPart.indexOf('m = await agent(monitorPrompt(')
  assert.notEqual(callIdx, -1, 'monitor 呼び出しが見つからない')
  const before = driverPart.slice(Math.max(0, callIdx - 300), callIdx)
  assert.match(before, /let m = null/, 'm の let 宣言が呼び出し直前にない')
  assert.match(before, /try\s*\{/, 'try ブロックで包まれていない')
  const after = driverPart.slice(callIdx, callIdx + 400)
  assert.match(after, /catch \(e\)/, 'catch 節が見つからない')
  // lastState の sentinel 分岐（m == null → 'agent-output-missing'）が捕捉直後にある。
  const lastStateIdx = driverPart.indexOf('lastState = m == null', callIdx)
  assert.notEqual(lastStateIdx, -1, 'm == null → agent-output-missing の分岐が見つからない')
  assert.match(driverPart.slice(lastStateIdx, lastStateIdx + 200), /agent-output-missing/)
})

test('merge-exec 呼び出しは try/catch で包まれ、例外は x = null として null 返却と同じ経路へ合流する', () => {
  const callIdx = driverPart.indexOf('x = await agent(mergeExecutePrompt(')
  assert.notEqual(callIdx, -1, 'merge-exec 呼び出しが見つからない')
  const before = driverPart.slice(Math.max(0, callIdx - 300), callIdx)
  assert.match(before, /let x = null/, 'x の let 宣言が呼び出し直前にない')
  assert.match(before, /try\s*\{/, 'try ブロックで包まれていない')
  const after = driverPart.slice(callIdx, callIdx + 400)
  assert.match(after, /catch \(e\)/, 'catch 節が見つからない')
  // 最終 else 分岐が classifyMergeExecDispatch へ x == null を渡す。
  const dispatchIdx = driverPart.indexOf('classifyMergeExecDispatch(execReason, lastBlockedReason, x == null)')
  assert.notEqual(dispatchIdx, -1, '最終 else 分岐で agentOutputMissing = (x == null) が渡されていない')
})

test('merge-verify 呼び出しは try/catch で包まれ、例外は v = null として既存の fail-closed 分岐へ合流する', () => {
  const callIdx = driverPart.indexOf('v = await agent(mergeVerifyPrompt(')
  assert.notEqual(callIdx, -1, 'merge-verify 呼び出しが見つからない')
  const before = driverPart.slice(Math.max(0, callIdx - 300), callIdx)
  assert.match(before, /let v = null/, 'v の let 宣言が呼び出し直前にない')
  assert.match(before, /try\s*\{/, 'try ブロックで包まれていない')
  const after = driverPart.slice(callIdx, callIdx + 400)
  assert.match(after, /catch \(e\)/, 'catch 節が見つからない')
})

test('base-merge の例外分岐は failMergeTerminal に blocked を明示する（Issue #465）', () => {
  const callIdx = driverPart.indexOf('b = await agent(baseMergePrompt(')
  assert.notEqual(callIdx, -1, 'base-merge 呼び出しが見つからない')
  const section = driverPart.slice(callIdx, callIdx + 2000)
  assert.match(section, /if \(baseMergeAgentError\) \{/, '例外分岐が見つからない')
  const errBranchIdx = section.indexOf('if (baseMergeAgentError) {')
  const errBranch = section.slice(errBranchIdx, errBranchIdx + 600)
  assert.match(errBranch, /failMergeTerminal\(baseMergeFailReason, 'blocked'\)/, '例外分岐が blocked を明示していない')
  // b == null（例外ではないが StructuredOutput 未返却）の新設分岐も blocked を明示する。
  assert.match(section, /if \(b == null\) \{/, 'b == null 分岐が見つからない')
  const nullBranchIdx = section.indexOf('if (b == null) {')
  const nullBranch = section.slice(nullBranchIdx, nullBranchIdx + 600)
  assert.match(nullBranch, /failMergeTerminal\(baseMergeFailReason, 'blocked'\)/, 'b == null 分岐が blocked を明示していない')
})

test('fix 呼び出しは base-merge と対称に try/catch で包まれ、例外・null 分岐が blocked を明示する（Issue #465）', () => {
  const callIdx = driverPart.indexOf('f = await agent(fixPrompt(item, impl, finding, true, permittedNoPushResolveIds)')
  assert.notEqual(callIdx, -1, 'Merge ループの fix 呼び出しが見つからない')
  const before = driverPart.slice(Math.max(0, callIdx - 300), callIdx)
  assert.match(before, /let f = null/, 'f の let 宣言が呼び出し直前にない')
  assert.match(before, /let fixAgentError = null/, 'fixAgentError の let 宣言がない')
  assert.match(before, /try\s*\{/, 'try ブロックで包まれていない')
  const section = driverPart.slice(callIdx, callIdx + 1500)
  assert.match(section, /catch \(e\) \{\s*fixAgentError = e/, 'catch 節で fixAgentError へ捕捉していない')
  assert.match(section, /if \(fixAgentError\) \{/, '例外分岐が見つからない')
  const errBranchIdx = section.indexOf('if (fixAgentError) {')
  const errBranch = section.slice(errBranchIdx, errBranchIdx + 700)
  assert.match(errBranch, /recordEphemeralWorktree\(item\.number, f\?\.worktreePath, 'fix-terminal'\)/, '例外分岐で台帳計上していない')
  assert.match(errBranch, /failMergeTerminal\(fixFailReason, 'blocked'\)/, '例外分岐が blocked を明示していない')
  assert.match(section, /if \(f == null\) \{/, 'f == null 分岐が見つからない')
  const nullBranchIdx = section.indexOf('if (f == null) {')
  const nullBranch = section.slice(nullBranchIdx, nullBranchIdx + 600)
  assert.match(nullBranch, /recordEphemeralWorktree\(item\.number, f\?\.worktreePath, 'fix-terminal'\)/, 'f == null 分岐で台帳計上していない')
  assert.match(nullBranch, /failMergeTerminal\(fixFailReason, 'blocked'\)/, 'f == null 分岐が blocked を明示していない')
})

test('runVerifyClose の close 呼び出しは try/catch で包まれ、v == null 分岐は status: blocked を書き込み recordFailure へ status: blocked を渡す', () => {
  const callIdx = driverPart.indexOf('v = await agent(closePrompt(item)')
  assert.notEqual(callIdx, -1, 'runVerifyClose の close 呼び出しが見つからない')
  const before = driverPart.slice(Math.max(0, callIdx - 300), callIdx)
  assert.match(before, /let v = null/, 'v の let 宣言が呼び出し直前にない')
  assert.match(before, /try\s*\{/, 'try ブロックで包まれていない')
  const after = driverPart.slice(callIdx, callIdx + 1200)
  assert.match(after, /catch \(e\)/, 'catch 節が見つからない')
  assert.match(after, /classifyVerifyCloseStatus\(v\)/, 'classifyVerifyCloseStatus の呼び出しが見つからない')
  assert.match(after, /status: verifyCloseStatus/, 'status への配線が見つからない')
  assert.match(after, /recordFailure\(\{ issue: item\.number, reason, status: verifyCloseStatus \}\)/, 'recordFailure への status 配線が見つからない')
})

test('__MERGE_MONITOR_LOOP_START__ / __MERGE_MONITOR_LOOP_END__ マーカーは引き続き 1 か所ずつ存在する（既存テストの前提を壊していないこと）', () => {
  assert.equal(source.split('__MERGE_MONITOR_LOOP_START__').length - 1, 1)
  assert.equal(source.split('__MERGE_MONITOR_LOOP_END__').length - 1, 1)
})
