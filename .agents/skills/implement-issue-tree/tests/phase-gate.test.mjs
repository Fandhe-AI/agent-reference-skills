// Phase 親単位のゲート（opt-in 引数 phaseGate。Issue #494）の回帰テスト。
//
// 背景: implement-issue-tree の実行順制御は post-order の優先度と本文由来の dependsOn だけで、
// ルート直下の Phase 親（feat(phase-N): 等）同士の順序は保証しない。parallel >= 2 では後続
// Phase の leaf が前 Phase 完了前に着手・マージされ得る（下流 vector-db #860 での実測）。
// phaseGate: true は、ルート直下の子を sub-issues リスト順（siblingIndex）に直列化する合成辺を
// depsMap へ追加し、既存の classifyDispatchReadiness / markBlockedByDeps / 前提プローブ /
// monitoring 再開ゲートにそのまま乗せる（新しいスケジューラ状態を作らない設計）。
//
// 検証の二層構造（dep-reeval.test.mjs と同じ方針）:
//   1. 純粋関数（parsePhaseGate / buildPhaseGateEdges / selectRemovableCycleEdge /
//      classifyDispatchReadiness）のテストで契約を固定する。
//   2. 駆動部（マーカーより下）はハーネス依存で import 不能のためソース走査で配線を機械検証する
//      — buildPhaseGateEdges の呼び出しが phaseGateEnabled ブロック内にあり最初の
//      findDependencyCycle() 呼び出しより前にあること、循環除去が phaseGateEdgeKeys を保護に
//      使っていること、返却オブジェクトに phaseGate が含まれること。
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
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-phase-gate-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
// 実装スクリプトは Workflow ランタイムの制約により `export const meta` 以外の top-level export を
// 持てない。定義部は非 export のまま置き、テスト側でスライスへ export 文を付与して読み込む。
// parsePhaseGate は typeof args === 'undefined' ガードより後、`const phaseGateEnabled =
// parsePhaseGate(...)` として即時呼び出しされる（他の *Enabled 系と同じ構成）が、args 未定義でも
// parsedArgs は undefined に倒れるため throw しない（g0-gates.test.mjs が同じ経路を既に固定
// 済み）。関数宣言自体は非 export のためスライス側で export を付与する。
const SLICE_EXPORTS = [
  'classifyDispatchReadiness',
  'buildPhaseGateEdges',
  'selectRemovableCycleEdge',
  'parsePhaseGate',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

const mod = await import(pathToFileURL(slicePath).href)
const { classifyDispatchReadiness, buildPhaseGateEdges, selectRemovableCycleEdge, parsePhaseGate } = mod

// ---------------------------------------------------------------------------
// parsePhaseGate: 厳格パース（autoMerge と同じ契約）
// ---------------------------------------------------------------------------

test('parsePhaseGate: undefined / null は false（既定動作）', () => {
  assert.equal(parsePhaseGate(undefined), false)
  assert.equal(parsePhaseGate(null), false)
})

test('parsePhaseGate: boolean はそのまま返す', () => {
  assert.equal(parsePhaseGate(true), true)
  assert.equal(parsePhaseGate(false), false)
})

test('parsePhaseGate: boolean 以外は throw（誤記を黙って読み替えない）', () => {
  assert.throws(() => parsePhaseGate('true'), /boolean で指定/)
  assert.throws(() => parsePhaseGate(1), /boolean で指定/)
  assert.throws(() => parsePhaseGate({}), /boolean で指定/)
  assert.throws(() => parsePhaseGate([]), /boolean で指定/)
})

// ---------------------------------------------------------------------------
// buildPhaseGateEdges: Phase 単位の直列化辺の組み立て
// ---------------------------------------------------------------------------

// テスト用ツリーヘルパー: byParent Map を { number, parent, siblingIndex } の配列から組み立てる。
function buildByParent(nodes) {
  const byParent = new Map()
  for (const n of nodes) {
    const list = byParent.get(n.parent) ?? []
    list.push(n)
    byParent.set(n.parent, list)
  }
  for (const [, children] of byParent) children.sort((a, b) => a.siblingIndex - b.siblingIndex)
  return byParent
}

// root(100) 直下: A(sib0, 子 a1, a2) / B(sib1, 子 b1 → 孫 b1x) / C(sib2, leaf)
function basicTreeNodes() {
  return [
    { number: 100, parent: 0, siblingIndex: 0 },
    { number: 1, parent: 100, siblingIndex: 0 }, // A
    { number: 11, parent: 1, siblingIndex: 0 }, // a1
    { number: 12, parent: 1, siblingIndex: 1 }, // a2
    { number: 2, parent: 100, siblingIndex: 1 }, // B
    { number: 21, parent: 2, siblingIndex: 0 }, // b1
    { number: 211, parent: 21, siblingIndex: 0 }, // b1x
    { number: 3, parent: 100, siblingIndex: 2 }, // C（leaf）
  ]
}

test('buildPhaseGateEdges: A 部分木は最初の Phase のため何にも依存しない（from が A 部分木の辺は 0 本）', () => {
  const byParent = buildByParent(basicTreeNodes())
  const { edges } = buildPhaseGateEdges(100, byParent)
  const fromA = edges.filter((e) => [1, 11, 12].includes(e.from))
  assert.equal(fromA.length, 0)
})

test('buildPhaseGateEdges: B・b1・b1x は {a1, a2} に依存し、A 自身には依存しない', () => {
  const byParent = buildByParent(basicTreeNodes())
  const { edges } = buildPhaseGateEdges(100, byParent)
  for (const node of [2, 21, 211]) {
    const deps = edges.filter((e) => e.from === node).map((e) => e.to).sort()
    assert.deepEqual(deps, [11, 12])
  }
})

test('buildPhaseGateEdges: C は {a1, a2, b1, b1x} に依存し、B 自身には依存しない', () => {
  const byParent = buildByParent(basicTreeNodes())
  const { edges } = buildPhaseGateEdges(100, byParent)
  const deps = edges.filter((e) => e.from === 3).map((e) => e.to).sort((a, b) => a - b)
  assert.deepEqual(deps, [11, 12, 21, 211])
})

test('buildPhaseGateEdges: order は siblingIndex 順（A, B, C）', () => {
  const byParent = buildByParent(basicTreeNodes())
  const { order } = buildPhaseGateEdges(100, byParent)
  assert.deepEqual(order, [1, 2, 3])
})

test('buildPhaseGateEdges: byParent の挿入順を逆にしても siblingIndex で order が決まる', () => {
  const nodes = [...basicTreeNodes()].reverse()
  const byParent = buildByParent(nodes)
  const { order } = buildPhaseGateEdges(100, byParent)
  assert.deepEqual(order, [1, 2, 3])
})

test('buildPhaseGateEdges: ルートの子が 0 件なら edges は空', () => {
  const byParent = buildByParent([{ number: 100, parent: 0, siblingIndex: 0 }])
  const { order, edges } = buildPhaseGateEdges(100, byParent)
  assert.deepEqual(order, [])
  assert.deepEqual(edges, [])
})

test('buildPhaseGateEdges: ルートの子が 1 件なら edges は空', () => {
  const byParent = buildByParent([
    { number: 100, parent: 0, siblingIndex: 0 },
    { number: 1, parent: 100, siblingIndex: 0 },
  ])
  const { order, edges } = buildPhaseGateEdges(100, byParent)
  assert.deepEqual(order, [1])
  assert.deepEqual(edges, [])
})

test('buildPhaseGateEdges: ルート直下が leaf だけでも直列化する（leaf が前提として使われる）', () => {
  const byParent = buildByParent([
    { number: 100, parent: 0, siblingIndex: 0 },
    { number: 1, parent: 100, siblingIndex: 0 },
    { number: 2, parent: 100, siblingIndex: 1 },
  ])
  const { order, edges } = buildPhaseGateEdges(100, byParent)
  assert.deepEqual(order, [1, 2])
  assert.deepEqual(edges, [{ from: 2, to: 1 }])
})

test('buildPhaseGateEdges: 推移漏れがない（B の子孫が全 done でも A が未完了なら C は wait）', () => {
  const byParent = buildByParent(basicTreeNodes())
  const { edges } = buildPhaseGateEdges(100, byParent)
  const depsMap = new Map()
  for (const { from, to } of edges) {
    if (!depsMap.has(from)) depsMap.set(from, new Set())
    depsMap.get(from).add(to)
  }
  // B の子孫（2, 21, 211）はすべて done、A の子孫（11, 12）は未完了。
  const done = new Set([2, 21, 211])
  const failedSet = new Set()
  const cDeps = [...(depsMap.get(3) ?? new Set())]
  // 直前 Phase だけに辺を張る誤設計では、B が done のため C は誤って ready になる。
  // 子孫全部を前提にする設計では、A の子孫（11, 12）が未完了のため wait のまま。
  assert.equal(classifyDispatchReadiness(cDeps, done, failedSet), 'wait')
})

test('buildPhaseGateEdges: 全 Phase 完了後は次 Phase が ready になる', () => {
  const byParent = buildByParent(basicTreeNodes())
  const { edges } = buildPhaseGateEdges(100, byParent)
  const depsMap = new Map()
  for (const { from, to } of edges) {
    if (!depsMap.has(from)) depsMap.set(from, new Set())
    depsMap.get(from).add(to)
  }
  const done = new Set([11, 12, 2, 21, 211])
  const cDeps = [...(depsMap.get(3) ?? new Set())]
  assert.equal(classifyDispatchReadiness(cDeps, done, new Set()), 'ready')
})

test('buildPhaseGateEdges: どの辺の to も from の祖先ではない（祖先辺を生まない）', () => {
  const nodes = basicTreeNodes()
  const parentOf = new Map(nodes.map((n) => [n.number, n.parent]))
  function isAncestor(anc, n) {
    let cur = parentOf.get(n)
    while (Number.isInteger(cur) && cur !== 0) {
      if (cur === anc) return true
      cur = parentOf.get(cur)
    }
    return false
  }
  const byParent = buildByParent(nodes)
  const { edges } = buildPhaseGateEdges(100, byParent)
  for (const { from, to } of edges) {
    assert.equal(isAncestor(to, from), false, `#${to} は #${from} の祖先であってはならない`)
  }
})

// ---------------------------------------------------------------------------
// selectRemovableCycleEdge: 循環除去は dependsOn 辺のみを削除し、木の辺・ゲート辺を保護する
// ---------------------------------------------------------------------------

test('selectRemovableCycleEdge: 木の辺は削除しない', () => {
  const byParent = new Map([[1, [{ number: 2 }]]]) // 1 → 2 が木の親子辺
  const depsMap = new Map([[1, new Set([2])], [2, new Set([1])]]) // 2 → 1 は dependsOn
  const cycle = [1, 2]
  const edge = selectRemovableCycleEdge(cycle, byParent, depsMap, new Set())
  assert.deepEqual(edge, { from: 2, to: 1 })
})

test('selectRemovableCycleEdge: Phase ゲート辺は削除せず、逆向き dependsOn を削除する', () => {
  // ゲート辺 b1 → a1（前 Phase 未完了ゲート）と、本文由来の逆向き dependsOn a1 → b1 が循環を作る。
  const byParent = new Map() // 木の親子関係なし（同一 Phase 内ではない）
  const depsMap = new Map([
    ['a1', new Set(['b1'])], // dependsOn（非信頼データ由来。逆向き）
    ['b1', new Set(['a1'])], // ゲート辺（保護対象）
  ])
  const protectedKeys = new Set(['b1->a1'])
  const cycle = ['a1', 'b1']
  const edge = selectRemovableCycleEdge(cycle, byParent, depsMap, protectedKeys)
  assert.deepEqual(edge, { from: 'a1', to: 'b1' })
})

test('selectRemovableCycleEdge: 削除できる辺がなければ null（呼び出し側が throw する）', () => {
  const byParent = new Map([[1, [{ number: 2 }]], [2, [{ number: 1 }]]]) // 両方向とも木の辺（異常データ）
  const depsMap = new Map([[1, new Set([2])], [2, new Set([1])]])
  const edge = selectRemovableCycleEdge([1, 2], byParent, depsMap, new Set())
  assert.equal(edge, null)
})

// ---------------------------------------------------------------------------
// 駆動部配線（ソース走査。ハーネス依存で import 不能なためマーカー以下の文字列を直接検証する）
// ---------------------------------------------------------------------------

test('駆動部: buildPhaseGateEdges の呼び出しは phaseGateEnabled ブロック内で、最初の findDependencyCycle() 呼び出しより前にある', () => {
  const buildCallIdx = driverPart.indexOf('buildPhaseGateEdges(parent, byParent)')
  assert.ok(buildCallIdx >= 0, 'buildPhaseGateEdges(parent, byParent) の呼び出しが駆動部に見つからない')
  const ifBlockIdx = driverPart.lastIndexOf('if (phaseGateEnabled) {', buildCallIdx)
  assert.ok(ifBlockIdx >= 0 && ifBlockIdx < buildCallIdx, 'buildPhaseGateEdges の呼び出しが if (phaseGateEnabled) ブロック内にない')
  const firstCycleCallIdx = driverPart.indexOf('let cycle = findDependencyCycle()')
  assert.ok(firstCycleCallIdx >= 0, 'findDependencyCycle() の初回呼び出しが見つからない')
  assert.ok(buildCallIdx < firstCycleCallIdx, 'buildPhaseGateEdges の呼び出しが findDependencyCycle() の初回呼び出しより後になっている（循環除去がゲート辺を保護できない）')
})

test('駆動部: 循環除去は selectRemovableCycleEdge 経由で phaseGateEdgeKeys を渡す', () => {
  assert.ok(
    driverPart.includes('selectRemovableCycleEdge(cycle, byParent, depsMap, phaseGateEdgeKeys)'),
    '循環除去ループが selectRemovableCycleEdge(cycle, byParent, depsMap, phaseGateEdgeKeys) を呼んでいない',
  )
})

test('駆動部: markBlockedByDeps が phaseGateEdgeKeys を参照してゲート由来の前提失敗を区別する', () => {
  const fnStart = driverPart.indexOf('async function markBlockedByDeps(')
  assert.ok(fnStart >= 0, 'markBlockedByDeps の定義が見つからない')
  const fnEnd = driverPart.indexOf('\nconst running = new Map()', fnStart)
  assert.ok(fnEnd > fnStart, 'markBlockedByDeps の終端が見つからない')
  const fnBody = driverPart.slice(fnStart, fnEnd)
  assert.ok(fnBody.includes('phaseGateEdgeKeys.has'), 'markBlockedByDeps が phaseGateEdgeKeys を参照していない')
  assert.ok(fnBody.includes('前 Phase 未完了（phaseGate）'), 'phaseGate 由来の blocked note 文言が見つからない')
})

test('駆動部: 最終返却オブジェクトに phaseGate と phaseOrder が含まれる', () => {
  const returnIdx = driverPart.indexOf('return { parent, baseBranch, parallel: concurrency,')
  assert.ok(returnIdx >= 0, '最終返却オブジェクトが見つからない')
  const returnLineEnd = driverPart.indexOf('\n', returnIdx)
  const returnLine = driverPart.slice(returnIdx, returnLineEnd < 0 ? undefined : returnLineEnd)
  assert.ok(returnLine.includes('phaseGate: phaseGateEnabled'), '返却オブジェクトに phaseGate が含まれていない')
  assert.ok(returnLine.includes('phaseOrder'), '返却オブジェクトに phaseOrder が含まれていない')
})

test('駆動部: phaseGateEnabled が false のときログを出さない（既定動作のログを変えない）', () => {
  const ifBlockStart = driverPart.indexOf('if (phaseGateEnabled) {')
  const ifBlockEnd = driverPart.indexOf('\n}', ifBlockStart)
  const ifBlockBody = driverPart.slice(ifBlockStart, ifBlockEnd)
  assert.ok(ifBlockBody.includes('Phase ゲート有効'), 'Phase ゲート有効ログが if (phaseGateEnabled) ブロック内にない（無効時にもログが出る回帰）')
})
