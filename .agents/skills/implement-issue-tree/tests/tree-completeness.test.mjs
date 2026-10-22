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
import { trackTmp } from './lib/tmp-track.mjs'
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
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-tree-completeness-')))
const slicePath = join(sliceDir, 'implement-issue-tree-defs.mjs')
writeFileSync(slicePath, `${definitionPart}\nexport { findIncompleteTreeNodes, dedupeIdenticalTreeNodes, closePrompt, TREE_SCHEMA }\n`)
const { findIncompleteTreeNodes, dedupeIdenticalTreeNodes, closePrompt, TREE_SCHEMA } = await import(pathToFileURL(slicePath).href)

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

// 取得手順（closed の貫通・total 0 のみ leaf・ページ送り・件数の自己点検）は scripts/fetch-tree.sh へ移った（Issue #668）。
// その挙動は tests/fetch-tree.test.mjs が実スクリプトで固定する。ここではプロンプトがスクリプト起動と書き写しの規則を持つことを確かめる
test('(f) Tree 取得プロンプトは fetch-tree.sh を launcher 経由で 1 回実行させ、全行の書き写しと封筒の転記を求める', async () => {
  const { runScript: rs, BASE_ARGS: BA } = await import('./lib/stub-run.mjs')
  const { calls } = await rs({ args: { ...BA, repo: 'o/r' }, leaves: [2, 3] })
  const p = calls.find((c) => c.opts.label === 'plan:issue-tree').prompt
  assert.match(p, /bash '[^']+\/scripts\/run-verified\.sh' [0-9a-f]{0,64}\S* fetch-tree\.sh --nonce [0-9a-z]{28} --root 1 --repo o\/r\n/)
  assert.match(p, /一字一句そのまま/)
  assert.match(p, /欠落・追加・並べ替え・加工なしで nodes へ写す/)
  assert.match(p, /同じノードを 2 回書かない/)
  assert.match(p, /観測値のまま StructuredOutput へ転記する/)
  assert.match(p, /failure/)
  // 大きなツリーのページ読み（Issue #673）: --page / --release を launcher 経由で、プレースホルダのまま渡す
  assert.match(p, /fetch-tree\.sh --page <P> --dir <DIR>\n/)
  assert.match(p, /fetch-tree\.sh --release --dir <DIR>/)
  assert.match(p, /FETCH_TREE_DIR=/)
  assert.match(p, /payload\.pages が 2 以上/)
  assert.ok(!/--paginate/.test(p), '取得手順そのものはプロンプトに書かない')
  assert.match(p, /dependsOn/)
  assert.match(p, /optin-tests/)
})

test('(g) クローズ検証プロンプトは直下だけでなく子孫を再帰確認する', () => {
  const p = closePrompt({ number: 10, title: 'parent' })
  assert.match(p, /再帰的に辿り/)
  assert.match(p, /孫・ひ孫以下を最下層まで/)
  assert.match(p, /sub_issues_summary\.total/)
  assert.match(p, /closed: false/)
})

test('配線: 駆動部に旧位置の検査は無く、fetchTree が依存宣言の抽出などの agent より前にある', () => {
  assert.ok(!driverPart.includes('findIncompleteTreeNodes(tree.nodes)'))
  const f = driverPart.indexOf('await fetchTree()')
  assert.ok(f >= 0)
  assert.ok(f < driverPart.indexOf("label: 'detect:external-checks'"))
  assert.ok(f < driverPart.indexOf('extractDeclaredDeps('))
  assert.ok(f < driverPart.indexOf('const byParent = new Map()'))
  const fn = definitionPart.slice(definitionPart.indexOf('async function fetchTree()'))
  assert.match(fn.slice(0, 2500), /dedupeIdenticalTreeNodes\(/)
  assert.match(fn.slice(0, 2500), /findIncompleteTreeNodes\(/)
})

// ---- 畳み込み（単体） ----
const full = (number, parent, total, extra = {}) => ({ ...node(number, parent, total), ...extra })

test('全欄一致の重複は 1 件に畳まれ folded に記録され、畳んだ後の検査は 0 件', () => {
  const nodes = [full(1, 0, 2), full(2, 1, 0, { siblingIndex: 0 }), full(3, 1, 0, { siblingIndex: 1 }), full(3, 1, 0, { siblingIndex: 1 })]
  const r = dedupeIdenticalTreeNodes(nodes)
  assert.equal(r.nodes.length, 3)
  assert.deepEqual(r.folded, [{ number: 3, extra: 1 }])
  assert.deepEqual(findIncompleteTreeNodes(r.nodes), [])
})

test('キー順だけ違う同内容・同じ配列欄のノードも畳まれる', () => {
  const a = { number: 2, title: 't', state: 'open', parent: 1, siblingIndex: 0, dependsOn: [5, 6], subIssuesTotal: 0, optinTests: ['x'] }
  const b = { optinTests: ['x'], subIssuesTotal: 0, dependsOn: [5, 6], siblingIndex: 0, parent: 1, state: 'open', title: 't', number: 2 }
  assert.equal(dedupeIdenticalTreeNodes([a, b]).nodes.length, 1)
})

test('1 欄でも違う重複は畳まれず、検査が従来どおり重複を返す', () => {
  const base = full(2, 1, 0)
  const variants = [{ siblingIndex: 1 }, { parent: 9 }, { title: 'other' }, { state: 'closed' }, { subIssuesTotal: 1 }, { dependsOn: [3] }, { optinTests: ['y'] }]
  for (const v of variants) {
    const r = dedupeIdenticalTreeNodes([full(1, 0, 1), base, { ...base, ...v }])
    assert.equal(r.nodes.length, 3, JSON.stringify(v))
    assert.deepEqual(r.folded, [], JSON.stringify(v))
    assert.ok(findIncompleteTreeNodes(r.nodes).some((x) => x.number === 2), JSON.stringify(v))
  }
})

test('3 重複は extra 2、複数番号の重複と元の順序を保つ', () => {
  const nodes = [full(1, 0, 2), full(3, 1, 0), full(2, 1, 0), full(3, 1, 0), full(2, 1, 0), full(3, 1, 0)]
  const r = dedupeIdenticalTreeNodes(nodes)
  assert.deepEqual(r.nodes.map((n) => n.number), [1, 3, 2])
  assert.deepEqual(r.folded, [{ number: 3, extra: 2 }, { number: 2, extra: 1 }])
})

test('子の欠け・subIssuesTotal 不正は畳み込みの影響を受けず検出される', () => {
  assert.equal(findIncompleteTreeNodes(dedupeIdenticalTreeNodes([full(1, 0, 3), full(2, 1, 0), full(2, 1, 0)]).nodes).length, 1)
  assert.equal(findIncompleteTreeNodes(dedupeIdenticalTreeNodes([full(1, 0, undefined)]).nodes).length, 1)
})

test('非配列・非オブジェクト要素でも例外にならず畳まずに返す', () => {
  assert.equal(dedupeIdenticalTreeNodes(undefined).nodes, undefined)
  assert.deepEqual(dedupeIdenticalTreeNodes('x').folded, [])
  const r = dedupeIdenticalTreeNodes([null, null, [1], 'a', 3, full(1, 0, 0)])
  assert.equal(r.nodes.length, 6)
  assert.deepEqual(r.folded, [])
})

// ---- 結合（スクリプト全体） ----
const { runScript, BASE_ARGS } = await import('./lib/stub-run.mjs')
const treeNodes = (extra = []) => [
  { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 2 },
  { number: 2, title: 'a', state: 'open', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
  { number: 3, title: 'b', state: 'open', parent: 1, siblingIndex: 1, dependsOn: [], subIssuesTotal: 0 },
  ...extra,
]
const POST = /^(detect:external-checks|plan:declared-deps|plan:root-ancestors|plan:out-of-tree-deps)/
const names = (calls) => calls.map((c) => c.opts.label)

function run(responses) {
  let i = 0
  return runScript({
    args: BASE_ARGS,
    leaves: [2, 3],
    override: (label) => {
      if (label === 'plan:issue-tree' || label === 'plan:issue-tree-retry') {
        const r = responses[i++]
        if (r instanceof Error) throw r
        return r
      }
      return undefined
    },
  })
}

test('結合: 全欄一致の重複を含んでも止まらず、畳んだ記録が結果に残り取り直しは 0 回', async () => {
  const { result, calls } = await run([{ nodes: treeNodes([{ ...treeNodes()[2] }]) }])
  assert.equal(result.treeFetch.attempts, 1)
  assert.deepEqual(result.treeFetch.foldedDuplicates, [{ number: 3, extra: 1 }])
  assert.ok(!names(calls).includes('plan:issue-tree-retry'))
})

test('結合: 成功時、依存宣言などの agent は tree 取得の最後の呼び出しより後', async () => {
  const { calls } = await run([{ nodes: treeNodes() }])
  const n = names(calls)
  const lastTree = Math.max(...n.map((l, i) => (l.startsWith('plan:issue-tree') ? i : -1)))
  const firstPost = n.findIndex((l) => POST.test(l))
  assert.ok(firstPost > lastTree)
})

test('結合: 内容違いの重複は 1 回取り直した後に止まり、後続 agent は 1 件も起動しない', async () => {
  const bad = { nodes: treeNodes([{ ...treeNodes()[2], title: 'other' }]) }
  await assert.rejects(run([bad, bad]), /ツリー取得が不完全/)
  const { calls } = await run([bad, { nodes: treeNodes() }])
  assert.deepEqual(names(calls).filter((l) => l.startsWith('plan:issue-tree')), ['plan:issue-tree', 'plan:issue-tree-retry'])
})

test('結合: 失敗時は plan:issue-tree 1 回 + retry 1 回の計 2 回で、後続 agent を起動しない', async () => {
  const seen = []
  const bad = { nodes: treeNodes().slice(0, 2) }
  await assert.rejects(runScript({
    args: BASE_ARGS,
    leaves: [2, 3],
    override: (label) => {
      seen.push(label)
      if (label.startsWith('plan:issue-tree')) return bad
      return undefined
    },
  }), /取り直しても解消しなかった/)
  assert.deepEqual(seen.filter((l) => l.startsWith('plan:issue-tree')), ['plan:issue-tree', 'plan:issue-tree-retry'])
  assert.ok(!seen.some((l) => POST.test(l)))
})

test('結合: 子の欠けは 1 回だけ取り直して続行し、予算に 1 回分が載る', async () => {
  const one = await run([{ nodes: treeNodes() }])
  const { result, calls } = await run([{ nodes: treeNodes().slice(0, 2) }, { nodes: treeNodes() }])
  assert.equal(result.treeFetch.attempts, 2)
  assert.equal(names(calls).filter((l) => l.startsWith('plan:issue-tree')).length, 2)
  assert.equal(result.agentBudget.used, one.result.agentBudget.used + 1)
})

test('結合: agent 例外・null 返却の 1 回目は取り直しに回り、2 回目が正しければ続行する', async () => {
  for (const first of [new Error('boom'), null, { nodes: null }, { nodes: [null] }]) {
    const { result } = await run([first, { nodes: treeNodes() }])
    assert.equal(result.treeFetch.attempts, 2)
  }
  await assert.rejects(run([new Error('boom'), null]), /nodes 配列が無い/)
  await assert.rejects(run([null, new Error('boom2')]), /ツリー取得 agent が失敗/)
})
