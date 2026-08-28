// implement-issue-tree の「fix エージェントによるレビュースレッド resolve」の前提条件を
// 「同一ラウンド内の push 成功」から「修正がリモート head に反映済み」へ是正する回帰テスト
// （PR #424 で導入した resolve 機構への cursor(Bugbot) 指摘 2 件）。
//
// 対象バグ1（Medium・Fandhe-AI/ideas PR #281 reviewThread PRRT_kwDOR4fG9M6a_73F）:
// 旧手順 5 は「手順 4 の push が成功した場合のみ」resolve を許可し「push しなかった場合は
// この手順を実行しない」と明記していた。前ラウンドで修正 push 済みだが resolve 未了の
// スレッドは、次ラウンドの fix が「修正済み・push 不要」（pushed: false）を返すため resolve が
// 二度と走らず、noPushRounds >= 2 で blocked 終端 → required_review_thread_resolution により
// 自動マージが恒久ブロックされる（この方針転換が解消しようとした失敗モードそのものの再発）。
// 是正後の前提条件は「対象指摘の修正がリモート head（origin/<branch>）に反映済みであること」:
// (a) 当該ラウンドの push 成功、または (b) push なしラウンドでホストが決定的に算出した許可
// リスト（permittedNoPushResolveIds）に含まれる場合のみ resolve を許可する。
//
// 追記（Issue #430。AGENTS.md 例外(b)契約）: (b) の反映確認を fix 自身の git fetch +
// merge-base --is-ancestor 実行と自己申告に委ねる旧設計は、fix 申告 sha を信頼境界に置いて
// しまうため撤回した。現在は resolveProof（ホストが monitor の compareStatus 観測から
// applyResolveProofObservation で決定的に積み上げる状態）と computePermittedNoPushResolveIds
// が算出した許可リストのみを fix へ渡し、fix は自前確認で対象を広げられない。未 push
// （未コミット・ローカルのみ）の修正は許可リストに現れないため resolve 対象にならない。
//
// 対象バグ2（Low・Fandhe-AI/baby-tasks-app PR #27 reviewThread PRRT_kwDOTqyUz86a_8bW）:
// runMergeLoop の fix 結果処理が f.pushed を確認せず resolvedThreadIds を一律
// 「resolve した」とログ記録していたため、どの前提条件で resolve が実行されたかが記録から
// 読み取れず、偽りの成功報告と区別できなかった。是正後は純粋関数 resolvedThreadsLogLine が
// pushed の真偽で実行条件（push 成功直後 / 過去ラウンド push 済みの反映確認後）を明示した
// ログ行を組み立て、runMergeLoop はそれを経由して記録する。
//
// 検証の二層構造（merge-loop-rescan.test.mjs と同じ方針）:
//   1. fixPrompt の文言と resolvedThreadsLogLine の純粋関数テストで契約を固定する。
//   2. runMergeLoop はハーネス依存で import 不能のため、ソース走査で「resolvedTids の
//      ログ分岐が f.pushed を参照し resolvedThreadsLogLine を経由する」配線を機械検証する。
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
// マーカー文字列はソース中に 1 回しか現れてはならない（g0-gates.test.mjs が出現回数を固定して
// いる）ため、リテラルを直接書かず分割して組み立てる。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-resolve-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
// 実装スクリプトは Workflow ランタイムの制約により `export const meta` 以外の top-level export を
// 持てない。定義部は非 export のまま置き、テスト側でスライスへ export 文を付与して読み込む。
const SLICE_EXPORTS = ['fixPrompt', 'resolvedThreadsLogLine']
// fixPrompt は boundaryNonce() を内部で使うため、テスト専用 setter で seed を注入する
// （本番では ensureBoundaryNonceSeed() がラン開始時に 1 回だけ行う。g0-gates.test.mjs と同じ）。
const TEST_ONLY_SETTER =
  'export function __setBoundaryNonceSeedForTest(v) { boundaryNonceSeed = v }\n'
writeFileSync(
  slicePath,
  `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n${TEST_ONLY_SETTER}`,
)

const mod = await import(pathToFileURL(slicePath).href)
const { fixPrompt, resolvedThreadsLogLine } = mod

const item = { number: 42, title: 'テスト用イシュー' }
const impl = { prNumber: 7, branch: 'fix/42-noop' }
const finding = { summary: 'テスト用の指摘', unresolvedComments: [{ threadId: 'PRRT_abc123', text: '指摘テキスト' }] }

function mergeLoopFixPrompt() {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  return fixPrompt(item, impl, finding, true)
}

// ---------------------------------------------------------------------------
// 指摘 1: push なしラウンド（過去ラウンドで修正 push 済み）でも resolve が許可されること
// ---------------------------------------------------------------------------

test('fixPrompt(pushAfterFix=true): resolve (b) はホスト決定的照合済みの許可リストのみを対象とし、fix 自身の反映確認は行わない（Issue #430）', () => {
  const prompt = mergeLoopFixPrompt()
  // 旧文言（fix 自身が git fetch + merge-base --is-ancestor で反映確認する経路）が残っていないこと。
  // AGENTS.md の例外(b)契約により、fix 申告 sha を照合対象に使う経路は禁止されている。
  assert.ok(
    !prompt.includes('merge-base --is-ancestor'),
    'fix 自身が反映確認する旧経路（merge-base --is-ancestor）の指示が残っている（ホスト決定的照合への転換が未完了）',
  )
  assert.ok(
    !prompt.includes(`git fetch origin ${impl.branch}:refs/remotes/origin/${impl.branch}`),
    'resolve (b) の手順に fix 自身の fetch 指示が残っている（自前確認は禁止のはず）',
  )
  // 新しい前提条件: ホストが算出した許可リストのみを対象にする。
  assert.ok(prompt.includes('許可リスト'), 'resolve (b) の許可リストに関する文言がない')
  assert.ok(prompt.includes('自前確認'), '自前確認（git fetch・merge-base 等）の対象拡大禁止文言がない')
})

test('fixPrompt(pushAfterFix=true): 許可リストの内容がプロンプトへそのまま反映され、空なら (b) の resolve を禁止する', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const promptWithIds = fixPrompt(item, impl, finding, true, ['PRRT_permitted1', 'PRRT_permitted2'])
  assert.ok(promptWithIds.includes('PRRT_permitted1, PRRT_permitted2'), '許可リストの threadId がプロンプトに反映されていない')

  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const promptEmpty = fixPrompt(item, impl, finding, true, [])
  assert.ok(promptEmpty.includes('(空'), '許可リストが空のとき、その旨がプロンプトに明示されない')
})

test('fixPrompt(pushAfterFix=false): Review ループは引き続き resolve を一切行わない', () => {
  mod.__setBoundaryNonceSeedForTest('a'.repeat(64))
  const prompt = fixPrompt(item, impl, finding, false)
  assert.ok(!prompt.includes('resolveReviewThread'), 'push 前の Review ループ fix に resolve mutation の指示が混入している')
  assert.ok(prompt.includes('レビュースレッドの resolve は行わない'), 'Review ループの resolve 禁止文言がない')
})

// ---------------------------------------------------------------------------
// 指摘 2: resolvedThreadIds のログ記録が pushed の真偽で実行条件を明示すること
// ---------------------------------------------------------------------------

test('resolvedThreadsLogLine: pushed=true は「push 後の resolve」として記録する', () => {
  const line = resolvedThreadsLogLine(42, true, ['PRRT_abc123', 'PRRT_def456'])
  assert.ok(line.includes('#42'), 'イシュー番号がログ行に含まれない')
  assert.ok(line.includes('push 後'), 'push 成功直後の resolve であることがログ行から読み取れない')
  assert.ok(line.includes('PRRT_abc123, PRRT_def456'), 'threadId 一覧がログ行に含まれない')
})

test('resolvedThreadsLogLine: pushed=false は「過去ラウンド push 済み（リモート head 反映済み）」のホスト決定的照合済みとして記録する', () => {
  const line = resolvedThreadsLogLine(42, false, ['PRRT_abc123'])
  assert.ok(line.includes('#42'), 'イシュー番号がログ行に含まれない')
  assert.ok(line.includes('push なし'), 'push なしラウンドの resolve であることがログ行から読み取れない')
  assert.ok(line.includes('リモート head 反映済み'), 'リモート head 反映済み前提の resolve であることがログ行から読み取れない')
  assert.ok(line.includes('PRRT_abc123'), 'threadId 一覧がログ行に含まれない')
  // pushed の真偽で記録が区別されること（一律の成功記録に戻る回帰を防ぐ）。
  assert.notEqual(line, resolvedThreadsLogLine(42, true, ['PRRT_abc123']), 'pushed の真偽でログ行が区別されていない')
})

// ---------------------------------------------------------------------------
// 配線検証: runMergeLoop の resolvedTids ログ分岐が f.pushed を参照して
// resolvedThreadsLogLine を経由すること（純粋関数テストだけでは配線なしでもグリーンになる）
// ---------------------------------------------------------------------------

test('runMergeLoop: resolvedThreadIds のログ記録は f.pushed を渡して resolvedThreadsLogLine を経由する', () => {
  const branchStart = driverPart.indexOf('if (Array.isArray(f.resolvedThreadIds)) {')
  assert.ok(branchStart >= 0, 'runMergeLoop に resolvedThreadIds の処理分岐が見つからない')
  // 分岐から次の処理ブロック（outOfScopeComments）までを対象に配線を検証する。
  const branchEnd = driverPart.indexOf('f.outOfScopeComments', branchStart)
  assert.ok(branchEnd > branchStart, 'resolvedThreadIds 分岐の終端（outOfScopeComments 処理）が見つからない')
  const branchSource = driverPart.slice(branchStart, branchEnd)
  assert.ok(
    branchSource.includes('resolvedThreadsLogLine('),
    'resolvedThreadIds のログ記録が resolvedThreadsLogLine を経由していない（pushed 無視の一律記録に戻る回帰）',
  )
  assert.ok(
    branchSource.includes('f.pushed'),
    'resolvedThreadIds のログ記録が f.pushed を参照していない',
  )
})
