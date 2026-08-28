// implement-issue-tree の merge-loop における「push なしラウンドの resolve 進捗の無視」の
// 回帰テスト（PR #426 マージ後の downstream 再同期で Fandhe-AI/ideas#281 に付いた cursor
// Medium 指摘「Push-none resolve progress ignored」・reviewThread PRRT_kwDOR4fG9M6bAa__）。
//
// 対象バグ: noPushRounds は f.pushed のみを見て pushed: false の fix をすべて「進捗なし」と
// 数え、2 連続で quality-blocked 終端する。しかし #426 で push なしラウンドでもリモート head
// 反映確認後のスレッド resolve（経路 (b)）が走るようになったため、2 連続 push-none の 2 回目で
// resolve が成功しても再監視されず、required_review_thread_resolution が直前に解消されたにも
// かかわらず run が blocked で停止する。
//
// 是正後の契約: push なしラウンドでも「新規スレッド resolve」を報告した場合は進捗ありとして
// noPushRounds をリセットし再監視へ継続する。resolve も push も無いラウンドのみを従来どおり
// no-progress と数える（blocked 終端の意図 = 進捗なしループの防止は維持）。進捗と認める
// resolve は「monitor が実際に未解決と報告した threadId（finding.unresolvedComments 由来）の
// うち、過去ラウンドで進捗として未計上の新規分」に限る — fix の自己申告を無条件に進捗と
// 数えると、同じ threadId の再申告や一覧外 threadId の捏造で noPushRounds 防御が形骸化する
// ため。ループ全体の停止性は monitorsLeft（7 + 救済 1）と fixCount（上限 6）が別途保証する。
//
// 検証の二層構造（merge-loop-rescan.test.mjs と同じ方針）:
//   1. 純粋関数（countNewlyResolvedThreads / advanceNoPushRounds）のテストで契約を固定する。
//   2. runMergeLoop はハーネス依存で import 不能のため、ソース走査で「resolvedThreadIds 分岐が
//      countNewlyResolvedThreads を呼び、noPushRounds 更新が advanceNoPushRounds を経由する」
//      配線を機械検証する。
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-nopush-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
// 実装スクリプトは Workflow ランタイムの制約により `export const meta` 以外の top-level export を
// 持てない。定義部は非 export のまま置き、テスト側でスライスへ export 文を付与して読み込む。
const SLICE_EXPORTS = ['countNewlyResolvedThreads', 'advanceNoPushRounds']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const { countNewlyResolvedThreads, advanceNoPushRounds } = mod

// ---------------------------------------------------------------------------
// countNewlyResolvedThreads: 進捗と認める resolve の判定
// ---------------------------------------------------------------------------

test('countNewlyResolvedThreads: monitor 報告済み・未計上の threadId のみを進捗として数え claimed へ記録する', () => {
  const claimed = new Set()
  const unresolved = [{ threadId: 'PRRT_abc123' }, { threadId: 'PRRT_def456' }]
  const n = countNewlyResolvedThreads(['PRRT_abc123', 'PRRT_def456'], unresolved, claimed)
  assert.equal(n, 2)
  assert.ok(claimed.has('PRRT_abc123') && claimed.has('PRRT_def456'), '計上済み threadId が claimed セットへ記録されない')
})

test('countNewlyResolvedThreads: 計上済み threadId の再申告は進捗と数えない（虚偽・重複申告での noPushRounds 防御迂回を防ぐ）', () => {
  const claimed = new Set(['PRRT_abc123'])
  const unresolved = [{ threadId: 'PRRT_abc123' }]
  assert.equal(countNewlyResolvedThreads(['PRRT_abc123'], unresolved, claimed), 0)
})

test('countNewlyResolvedThreads: monitor の未解決一覧に無い threadId は進捗と数えない（一覧外の捏造申告を進捗にしない）', () => {
  const claimed = new Set()
  const unresolved = [{ threadId: 'PRRT_abc123' }]
  assert.equal(countNewlyResolvedThreads(['PRRT_zzz999'], unresolved, claimed), 0)
  assert.ok(!claimed.has('PRRT_zzz999'), '一覧外 threadId が claimed へ記録されている')
})

test('countNewlyResolvedThreads: unresolvedComments が欠落・非配列でも安全に 0 を返す', () => {
  assert.equal(countNewlyResolvedThreads(['PRRT_abc123'], undefined, new Set()), 0)
  assert.equal(countNewlyResolvedThreads(['PRRT_abc123'], null, new Set()), 0)
  assert.equal(countNewlyResolvedThreads([], [{ threadId: 'PRRT_abc123' }], new Set()), 0)
})

// ---------------------------------------------------------------------------
// advanceNoPushRounds: 指摘シナリオ（round N で fix+push、round N+1 で pushed:false +
// resolve 成功 → blocked ではなく進捗扱いで継続）の契約
// ---------------------------------------------------------------------------

test('advanceNoPushRounds: push ありは従来どおりリセットする', () => {
  assert.equal(advanceNoPushRounds(1, true, 0), 0)
})

test('advanceNoPushRounds: push なしでも新規 resolve があれば進捗ありとしてリセットする（指摘シナリオの本体）', () => {
  // round 1: push なし・resolve なし → 1 回目の no-progress。
  const afterRound1 = advanceNoPushRounds(0, false, 0)
  assert.equal(afterRound1, 1)
  // round 2: push なしだが新規スレッド resolve 成功 → 従来はここで 2 に達し blocked 終端して
  // いた（resolve で required_review_thread_resolution が解消された直後に停止する退行）。
  // 是正後は進捗ありとして 0 へリセットし、再監視で resolve の実効性をサーバー実値で確認する。
  assert.equal(advanceNoPushRounds(afterRound1, false, 1), 0)
})

test('advanceNoPushRounds: resolve も push も無いラウンドのみ no-progress と数える（blocked 終端の意図を維持）', () => {
  assert.equal(advanceNoPushRounds(0, false, 0), 1)
  assert.equal(advanceNoPushRounds(1, false, 0), 2, '2 連続 no-progress で blocked 閾値（>= 2）へ到達しない')
})

// ---------------------------------------------------------------------------
// 配線検証: runMergeLoop が両ヘルパーを実際に経由すること
// ---------------------------------------------------------------------------

test('runMergeLoop: resolvedThreadIds 分岐が countNewlyResolvedThreads を呼び、noPushRounds 更新が advanceNoPushRounds を経由する', () => {
  const branchStart = driverPart.indexOf('if (Array.isArray(f.resolvedThreadIds)) {')
  assert.ok(branchStart >= 0, 'runMergeLoop に resolvedThreadIds の処理分岐が見つからない')
  const pushBranch = driverPart.indexOf('if (!f.pushed) {', branchStart)
  assert.ok(pushBranch > branchStart, 'resolvedThreadIds 分岐より後の push 判定分岐が見つからない')
  const wiringSource = driverPart.slice(branchStart, driverPart.indexOf('\n', pushBranch + 1))
  assert.ok(
    wiringSource.includes('countNewlyResolvedThreads('),
    'resolvedThreadIds 分岐が countNewlyResolvedThreads を経由していない（push なし resolve が進捗として数えられない回帰）',
  )
  assert.ok(
    driverPart.includes('advanceNoPushRounds('),
    'noPushRounds の更新が advanceNoPushRounds を経由していない',
  )
  // 素朴なインクリメント（noPushRounds++）が残っていれば advanceNoPushRounds の結果を
  // 上書きし得るため、駆動部から消えていることも固定する。
  assert.ok(
    !driverPart.includes('noPushRounds++'),
    '素朴な noPushRounds++ が残っている（resolve 進捗を無視する旧ロジックの残存）',
  )
})
