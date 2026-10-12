// サブイシューツリー取得の完全性検証の回帰テスト。
//
// 対象バグ: Tree 取得は LLM エージェントへの自然文指示だけで、あるノードの子を取り損ねると
// そのノードがホスト側 visit() で leaf に化け、取り損ねた子孫が黙って実行キューから落ちた。
// 既存の unreachable 検査は「返却されたが辿れないノード」しか検出できない。
//
// 是正後の契約:
//   - TREE_SCHEMA の各ノードが subIssuesTotal（sub_issues_summary.total の転記）を持つ。
//   - findIncompleteTreeNodes が「nodes 内の直下の子の件数 == subIssuesTotal」を照合し、
//     不一致・不正値・番号重複を fail-closed で返す。ホストは 1 件でもあれば throw する。
//   - Tree 取得プロンプトは closed も辿る・total 0 のみ leaf・全ノードで sub_issues を呼ぶ手順を持ち、
//     クローズ検証プロンプトは子孫を再帰確認する。
//
// 検証の二層構造（phase-gate.test.mjs / out-of-tree-deps.test.mjs と同じ方針）: 純粋関数と
// closePrompt はスライス import、駆動部（マーカーより下）の Tree プロンプトと配線はソース走査。
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
// マーカーはソース中に 1 回しか現れてはならない（g0-gates.test.mjs が固定）ため分割して組み立てる。
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-tree-completeness-'))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
writeFileSync(slicePath, `${definitionPart}\nexport { findIncompleteTreeNodes, closePrompt, TREE_SCHEMA }\n`)
const { findIncompleteTreeNodes, closePrompt, TREE_SCHEMA } = await import(pathToFileURL(slicePath).href)

const node = (number, parent, subIssuesTotal, state = 'open') => (
  { number, title: `t${number}`, state, parent, siblingIndex: 0, dependsOn: [], subIssuesTotal }
)

test('(a) total 2 なのに子が 0 件（取得打ち切り）は不完全として検出される', () => {
  const r = findIncompleteTreeNodes([node(1, 0, 2)])
  assert.deepEqual(r.map(({ number, expected, actual }) => ({ number, expected, actual })), [{ number: 1, expected: 2, actual: 0 }])
})

test('(b) total 3 で子が 2 件（一部欠落）も検出される', () => {
  const r = findIncompleteTreeNodes([node(1, 0, 3), node(2, 1, 0), node(3, 1, 0)])
  assert.deepEqual(r.map(({ number, expected, actual }) => ({ number, expected, actual })), [{ number: 1, expected: 3, actual: 2 }])
})

test('(c) ルート→子→孫→ひ孫→玄孫の 5 段で件数が全て一致すれば不完全 0 件', () => {
  const nodes = [node(1, 0, 1), node(2, 1, 1), node(3, 2, 1), node(4, 3, 1), node(5, 4, 0)]
  assert.deepEqual(findIncompleteTreeNodes(nodes), [])
})

test('(c2) 5 段のうち最下層の子だけ欠落するとその親が検出される', () => {
  const r = findIncompleteTreeNodes([node(1, 0, 1), node(2, 1, 1), node(3, 2, 1), node(4, 3, 1)])
  assert.deepEqual(r.map((x) => x.number), [4])
})

test('(d) closed ノード配下に open の子孫があり total が一致すれば不完全 0 件', () => {
  const nodes = [node(1, 0, 1, 'closed'), node(2, 1, 1, 'closed'), node(3, 2, 0, 'open')]
  assert.deepEqual(findIncompleteTreeNodes(nodes), [])
})

test('(e) subIssuesTotal が欠落・非整数・負数のノードは不完全（0 扱いへ倒さない）', () => {
  for (const bad of [undefined, null, '0', 1.5, -1, NaN]) {
    const n = node(1, 0, bad)
    const r = findIncompleteTreeNodes([n])
    assert.equal(r.length, 1, `subIssuesTotal=${String(bad)}`)
    assert.equal(r[0].number, 1)
  }
  // 欠落キー自体が無い場合
  const { subIssuesTotal, ...noKey } = node(1, 0, 0)
  assert.equal(findIncompleteTreeNodes([noKey]).length, 1)
})

test('同一 number の重複は子数照合を狂わせるため検出される', () => {
  const r = findIncompleteTreeNodes([node(1, 0, 1), node(2, 1, 0), node(2, 1, 0)])
  assert.ok(r.some((x) => x.number === 2))
})

test('TREE_SCHEMA は subIssuesTotal を 0 以上の整数・required で宣言する', () => {
  const items = TREE_SCHEMA.properties.nodes.items
  assert.ok(items.required.includes('subIssuesTotal'))
  assert.equal(items.properties.subIssuesTotal.type, 'integer')
  assert.equal(items.properties.subIssuesTotal.minimum, 0)
})

function treePrompt() {
  const start = driverPart.indexOf('const tree = await agent([')
  const end = driverPart.indexOf("label: 'plan:issue-tree'")
  assert.ok(start >= 0 && end > start, 'Tree 取得の agent 呼び出しが見つからない')
  return driverPart.slice(start, end)
}

test('(f) Tree 取得プロンプトは closed も辿る・total 0 のみ leaf・全ノードで sub_issues を呼ぶ', () => {
  const p = treePrompt()
  assert.match(p, /closed のノードも必ず辿る/)
  assert.match(p, /`sub_issues_summary\.total` が 0 のノードだけ/)
  assert.match(p, /それ以外の全ノードで `sub_issues` を呼ぶ/)
  assert.match(p, /subIssuesTotal/)
  assert.match(p, /--paginate/)
  assert.match(p, /ホストも同照合し/)
})

test('(g) クローズ検証プロンプトは直下だけでなく子孫を再帰確認する', () => {
  const p = closePrompt({ number: 10, title: 'parent' })
  assert.match(p, /再帰的に辿り/)
  assert.match(p, /孫・ひ孫以下を最下層まで/)
  assert.match(p, /sub_issues_summary\.total/)
  assert.match(p, /closed: false/)
})

test('配線: 完全性検査は byParent 構築後・visit(root) より前で、旧 state 経路ではなく新規取得直後に置かれる', () => {
  const check = driverPart.indexOf('findIncompleteTreeNodes(tree.nodes)')
  assert.ok(check > driverPart.indexOf('const byParent = new Map()'))
  assert.ok(check < driverPart.indexOf('visit(root)'))
  assert.ok(check > driverPart.indexOf('const tree = await agent(['))
})
