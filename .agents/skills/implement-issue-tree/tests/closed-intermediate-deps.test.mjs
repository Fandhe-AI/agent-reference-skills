// closed 中間ノード配下の open 子孫を、祖先の verify-close が待つことの回帰テスト。
//
// 背景: ツリー取得は closed ノード配下の子孫も列挙し、verify-close の closePrompt は「全子孫が
// closed」を要求する。一方スケジューラは closed ノードをラン開始時に即 done へ入れ、depsMap は
// 直下の子だけで初期化していた。R(open) → P(open) → C(closed) → G(open) のとき P の待機先は
// {C} で C は done のため、G が未完了でも P の verify-close が ready になり、closed: false の
// 返却で failed（halt カウント）へ落ちていた。中間ノードが open なら G の失敗は P を blocked
// （halt 非カウント）にするため、closed のときだけ failed になる非対称もあった。
//
// 修正: 待機先を collectChildWaitTargets が求める（直下の子は従来どおり全件、closed の子は
// 貫通して最初に現れる open 子孫を加える）。貫通辺は木の辺ではないため、本文由来 dependsOn との
// 循環除去で削除されないよう保護集合へ加える。
//
// 検証の二層構造（phase-gate.test.mjs / dep-reeval.test.mjs と同じ方針）:
//   1. 純粋関数（collectChildWaitTargets / classifyDispatchReadiness / selectRemovableCycleEdge）
//      の契約を固定する。
//   2. 駆動部（マーカーより下）はハーネス依存で import 不能のため、ソース走査で配線を検証する。
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
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-closed-intermediate-')))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てないため、スライス側で
// export 文を付与して読み込む。
const SLICE_EXPORTS = ['collectChildWaitTargets', 'classifyDispatchReadiness', 'selectRemovableCycleEdge']
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const { collectChildWaitTargets, classifyDispatchReadiness, selectRemovableCycleEdge } = await import(pathToFileURL(slicePath).href)

// [number, parent, state] の配列から駆動部と同じ形の byParent（親番号 → siblingIndex 昇順の子ノード配列）を作る。
function buildByParent(rows) {
  const byParent = new Map()
  rows.forEach(([number, parent, state], i) => {
    const list = byParent.get(parent) ?? []
    list.push({ number, parent, state, siblingIndex: i })
    byParent.set(parent, list)
  })
  return byParent
}
const sorted = (set) => [...set].sort((a, b) => a - b)

// ---------------------------------------------------------------------------
// collectChildWaitTargets: 待機先の求め方
// ---------------------------------------------------------------------------

test('closed 中間ノード: R → P(open) → C(closed) → G(open) で P の待機先に C と G が入る', () => {
  const byParent = buildByParent([[10, 1, 'open'], [11, 10, 'closed'], [12, 11, 'open']])
  assert.deepEqual(sorted(collectChildWaitTargets(10, byParent)), [11, 12])
})

test('closed が 2 段以上連なっても最初に現れる open 子孫まで届く', () => {
  const byParent = buildByParent([[10, 1, 'open'], [11, 10, 'closed'], [12, 11, 'closed'], [13, 12, 'open']])
  assert.deepEqual(sorted(collectChildWaitTargets(10, byParent)), [11, 13])
})

test('closed 中間の下に open 中間がある場合、P は D を待ち G は D 経由（P の待機先に G は入らない）', () => {
  const byParent = buildByParent([[10, 1, 'open'], [11, 10, 'closed'], [12, 11, 'open'], [13, 12, 'open']])
  assert.deepEqual(sorted(collectChildWaitTargets(10, byParent)), [11, 12])
})

test('closed 中間が複数の枝を持つ場合、各枝の最初の open 子孫をすべて拾う', () => {
  const byParent = buildByParent([
    [10, 1, 'open'],
    [11, 10, 'closed'],
    [12, 11, 'open'],
    [13, 11, 'closed'],
    [14, 13, 'open'],
    [15, 10, 'open'],
  ])
  assert.deepEqual(sorted(collectChildWaitTargets(10, byParent)), [11, 12, 14, 15])
})

test('中間ノードがすべて open のとき、待機先は従来どおり直下の子だけ（挙動不変）', () => {
  const byParent = buildByParent([[10, 1, 'open'], [11, 10, 'open'], [12, 11, 'open'], [13, 10, 'open']])
  assert.deepEqual(sorted(collectChildWaitTargets(10, byParent)), [11, 13])
})

test('配下がすべて closed のとき、待機先は closed の子だけで従来どおり即 ready になる', () => {
  const byParent = buildByParent([[10, 1, 'open'], [11, 10, 'closed'], [12, 11, 'closed']])
  const targets = collectChildWaitTargets(10, byParent)
  assert.deepEqual(sorted(targets), [11])
  assert.equal(classifyDispatchReadiness(targets, new Set([11]), new Set()), 'ready')
})

test('子を持たないノードの待機先は空', () => {
  const byParent = buildByParent([[10, 1, 'open']])
  assert.equal(collectChildWaitTargets(10, byParent).size, 0)
  assert.equal(collectChildWaitTargets(99, byParent).size, 0)
})

test('循環したデータでも停止する（seen による打ち切り）', () => {
  const byParent = new Map([
    [10, [{ number: 11, parent: 10, state: 'closed', siblingIndex: 0 }]],
    [11, [{ number: 12, parent: 11, state: 'closed', siblingIndex: 0 }]],
    [12, [{ number: 11, parent: 12, state: 'closed', siblingIndex: 0 }]],
  ])
  assert.deepEqual(sorted(collectChildWaitTargets(10, byParent)), [11])
})

// ---------------------------------------------------------------------------
// classifyDispatchReadiness との組み合わせ: G の状態で P の verify-close が待つ・止まる
// ---------------------------------------------------------------------------

test('P(open) → C(closed) → G(open): G 未完了なら wait、done なら ready、failed なら dep-blocked', () => {
  const byParent = buildByParent([[10, 1, 'open'], [11, 10, 'closed'], [12, 11, 'open']])
  const targets = collectChildWaitTargets(10, byParent)
  // C は closed のためラン開始時に done へ入る。G が未完了のうちは待つ（旧実装は ready だった）。
  assert.equal(classifyDispatchReadiness(targets, new Set([11]), new Set()), 'wait')
  assert.equal(classifyDispatchReadiness(targets, new Set([11, 12]), new Set()), 'ready')
  assert.equal(classifyDispatchReadiness(targets, new Set([11]), new Set([12])), 'dep-blocked')
})

// ---------------------------------------------------------------------------
// 貫通辺は循環除去で削除対象に選ばれない
// ---------------------------------------------------------------------------

test('貫通辺 P→G は保護集合に入れれば selectRemovableCycleEdge の削除対象にならない', () => {
  // 木: 10(P) → 11(C closed) → 12(G)。G が本文で兄弟 20 に依存し、20 が P に依存する循環:
  // 10 → 12（貫通辺）→ 20（dependsOn）→ 10（dependsOn）。
  const byParent = buildByParent([[10, 1, 'open'], [11, 10, 'closed'], [12, 11, 'open']])
  const depsMap = new Map([
    [10, new Set([11, 12])],
    [11, new Set([12])],
    [12, new Set([20])],
    [20, new Set([10])],
  ])
  const cycle = [10, 12, 20]
  // 保護なし: 貫通辺は木の辺ではないため最初の辺 10→12 が削除対象に選ばれてしまう（バグの再発経路）。
  assert.deepEqual(selectRemovableCycleEdge(cycle, byParent, depsMap, new Set()), { from: 10, to: 12 })
  // 保護あり: 本文由来の 12→20 が選ばれ、貫通辺は残る。
  assert.deepEqual(selectRemovableCycleEdge(cycle, byParent, depsMap, new Set(['10->12'])), { from: 12, to: 20 })
})

// ---------------------------------------------------------------------------
// 駆動部の配線（ソース走査）
// ---------------------------------------------------------------------------

test('駆動部: depsMap の初期化が collectChildWaitTargets を使い、直下の子だけの列挙に戻っていない', () => {
  const m = driverPart.match(/const depsMap = new Map\(\)\n([\s\S]*?)\nconst parentNumOf/)
  assert.ok(m, 'depsMap 初期化ブロックが見つからない')
  assert.match(m[1], /collectChildWaitTargets\(item\.number, byParent\)/)
  assert.doesNotMatch(m[1], /for \(const c of byParent\.get\(item\.number\)/)
})

test('駆動部: 貫通辺のキーを記録し、循環除去の保護集合へ合成している', () => {
  assert.match(driverPart, /closedPierceEdgeKeys\.add\(`\$\{item\.number\}->\$\{t\}`\)/)
  const m = driverPart.match(/selectRemovableCycleEdge\(cycle, byParent, depsMap, ([^)]*)\)/)
  assert.ok(m, '循環除去の selectRemovableCycleEdge 呼び出しが見つからない')
  assert.match(m[1], /closedPierceEdgeKeys/)
  assert.match(m[1], /phaseGateEdgeKeys/)
})

test('駆動部: markBlockedByDeps の子イシュー判定が待機先集合を使う（貫通先を前提イシューと誤表示しない）', () => {
  const m = driverPart.match(/async function markBlockedByDeps[\s\S]*?const failedChildren/)
  assert.ok(m, 'markBlockedByDeps の子イシュー判定が見つからない')
  assert.match(m[0], /childWaitTargets\.get\(item\.number\)/)
  assert.doesNotMatch(m[0], /byParent\.get\(item\.number\)/)
})

test('駆動部: closed ノードを done へ入れる既存処理は変えない（status: skipped・done 入りは後始末の前に確定し、後始末の成否に左右されない）', () => {
  assert.match(driverPart, /if \(item\.state !== 'open'\) \{\n    const skipEntry = \{ issue: item\.number, status: 'skipped', note: 'すでに closed' \}\n    results\.push\(skipEntry\)\n    done\.add\(item\.number\)\n/)
  // 後始末（Issue #632）は done 入りのあとで、候補は closedCleanupCandidate で絞る。failedSet には触れない
  const m = driverPart.match(/const skipEntry = [\s\S]*?\n  \} else \{/)
  assert.ok(m, '後始末の分岐が見つからない')
  assert.match(m[0], /closedCleanupCandidate\(item, savedItems/)
  assert.doesNotMatch(m[0].replace(/^\s*\/\/.*$/gm, ''), /failedSet|done\.delete/)
})
