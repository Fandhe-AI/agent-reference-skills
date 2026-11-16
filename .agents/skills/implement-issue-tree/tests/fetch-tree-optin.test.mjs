// 第 7 欄 optinTests（本文の opt-in テスト宣言）が、実スクリプトの出力 → ホストの照合・承認一覧との照合まで通ることの結合テスト。
//
// 実 fetch-tree.sh（偽 gh）が出した本物の封筒と TSV を、ホストの verifyTreeFetchResult / treeNodeShapeProblem /
// parseOptinTestDeclarations（実ソースの定義部）へそのまま渡す。スクリプトの jq 定義とホストの JavaScript 定義が食い違うと、
// ここで digest 不一致・上限超過・invalid にならない値が出る。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { makeGhTreeStub, issue } from './lib/gh-tree-stub.mjs'
import { availableBashes } from './lib/signed-output.mjs'
import { importDefinitions } from './lib/stub-run.mjs'
import { run, parseOut } from './lib/fetch-tree-suite.mjs'

const host = await importDefinitions(
  ['verifyTreeFetchResult', 'treeNodeShapeProblem', 'parseOptinTestDeclarations', 'parseOptinTestCommands', 'treeFetchInputSha256', 'TREE_SCHEMA', 'OPTIN_TESTS_MAX'],
  'fetch-tree-optin',
)
const P = 'repos/o/r'
const NONCE = 'optinnonce1'
const ARGS = ['--nonce', NONCE, '--root', '1', '--repo', 'o/r']
const mark = (v) => `<!-- optin-tests: ${v} -->`
const SCHEMA_OPTIN = host.TREE_SCHEMA.properties.nodes.items.properties.optinTests
const APPROVED = host.parseOptinTestCommands(['make e2e', 'npm run e2e', 'cargo test -- --ignored'])

// 実スクリプトを走らせ、ホストへ渡す形（agent が写した返却に相当）を返す
function fetchAsHost(bash, bodies, { states = [] } = {}) {
  const kids = bodies.map((b, i) => issue(2 + i, { body: b, state: states[i] ?? 'open' }))
  const stub = makeGhTreeStub({
    [`${P}/issues/1`]: issue(1, { total: kids.length }),
    [`${P}/issues/1/sub_issues`]: { pages: [kids] },
  })
  const r = run(bash, stub, ARGS)
  assert.equal(r.status, 0, r.stderr)
  const { rows, envelope } = parseOut(r.stdout)
  const nodes = rows.map(({ optin: _o, ...n }) => ({ ...n, dependsOn: [] }))
  return { nodes, result: { nonce: envelope.nonce, payload: envelope.payload, sha256: envelope.sha256 }, rows }
}
const verify = (result, nodes) => host.verifyTreeFetchResult(result, NONCE, host.treeFetchInputSha256(1, 'o/r'), nodes)

for (const bash of availableBashes()) {
  const tag = `[${bash}]`

  test(`${tag} 実スクリプトの封筒と TSV をホストが照合できる（optinSha256 一致・形の検査を通る・スキーマの上限内）`, () => {
    const { nodes, result } = fetchAsHost(bash, [
      [mark('make e2e'), mark('npm run e2e'), mark('make no;pe'), mark(`make ${'z'.repeat(400)}`)].join('\n'),
      null,
      Array.from({ length: 30 }, (_, i) => mark(`make t${i}`)).join('\n'),
    ])
    assert.equal(host.treeNodeShapeProblem(nodes), '')
    assert.deepEqual(verify(result, nodes), { ok: true, titleMismatch: false })
    for (const n of nodes) {
      assert.ok(n.optinTests.length <= SCHEMA_OPTIN.maxItems, `#${n.number} 件数`)
      for (const v of n.optinTests) assert.ok(v.length <= SCHEMA_OPTIN.items.maxLength, `#${n.number} 長さ ${v.length}`)
    }
  })

  test(`${tag} optinTests を 1 要素だけ書き換えた・足した・消した・並べ替えた返却は digest 不一致（titleMismatch で続行せず fail-closed）`, () => {
    const { nodes, result } = fetchAsHost(bash, [[mark('make e2e'), mark('npm run e2e')].join('\n'), mark('cargo test -- --ignored'), null])
    const at = (n, f) => nodes.map((x) => (x.number === n ? { ...x, optinTests: f(x.optinTests) } : x))
    const cases = {
      '1 要素を書き換え': at(2, (a) => [a[0], 'make deploy']),
      '1 要素を足す': at(3, (a) => [...a, 'make deploy']),
      '1 要素を消す': at(2, (a) => a.slice(0, 1)),
      '並べ替え': at(2, (a) => [...a].reverse()),
      '宣言の無いノードへ足す': at(4, () => ['make e2e']),
      '宣言のあるノードを空にする': at(3, () => []),
      '別ノードへ付け替え': at(3, () => []).map((x) => (x.number === 4 ? { ...x, optinTests: ['cargo test -- --ignored'] } : x)),
    }
    for (const [name, mutated] of Object.entries(cases)) {
      assert.equal(host.treeNodeShapeProblem(mutated), '', name)
      assert.deepEqual(verify(result, mutated), { ok: false, reason: 'digest' }, name)
    }
  })

  test(`${tag} optinSha256 の転記漏れ・書き換えは digest 不一致（sha256 が payload を束縛する）`, () => {
    const { nodes, result } = fetchAsHost(bash, [mark('make e2e')])
    const noField = { ...result, payload: Object.fromEntries(Object.entries(result.payload).filter(([k]) => k !== 'optinSha256')) }
    assert.equal(verify(noField, nodes).ok, false)
    assert.equal(verify({ ...result, payload: { ...result.payload, optinSha256: 'a'.repeat(64) } }, nodes).ok, false)
  })

  test(`${tag} optinTests が文字列の配列でないノードは形の問題として拒否する`, () => {
    const { nodes } = fetchAsHost(bash, [mark('make e2e')])
    for (const bad of [undefined, null, 'make e2e', [1], [null], [['make e2e']], { 0: 'make e2e' }]) {
      const mutated = nodes.map((x) => (x.number === 2 ? { ...x, optinTests: bad } : x))
      assert.match(host.treeNodeShapeProblem(mutated), /^形式（#2）/, JSON.stringify(bad))
    }
    const missing = nodes.map(({ optinTests: _o, ...x }) => x)
    assert.match(host.treeNodeShapeProblem(missing), /^形式/)
  })

  test(`${tag} 承認一覧との照合: 正規化で ? になった値・切り詰めた値・件数超過の ? はすべて invalid（blocked）に倒れ、承認済みの値だけが採用される`, () => {
    const { nodes } = fetchAsHost(bash, [
      [mark('make e2e'), mark('make e2e; rm -rf x'), mark('make e2e'), mark('npm run e2e')].join('\n'),
      mark(`make e2e${' '.repeat(5)}${'x'.repeat(400)}`),
      Array.from({ length: 25 }, () => mark('make e2e')).join('\n'), // 同じ承認済みコマンドが 25 回: 20 件を超えるので末尾が ? になる
      Array.from({ length: 12 }, (_, i) => mark(`make t${i}`)).join('\n'), // 承認一覧に無い 12 件
      [mark('make e2e'), mark('npm run e2e')].join('\n'),
    ])
    const parsed = nodes.slice(1).map((n) => host.parseOptinTestDeclarations(n.optinTests, APPROVED))
    // 1) 承認済み 2 件は採用、`;` と NBSP の値は ? を含むので invalid
    assert.deepEqual(parsed[0].commands, ['make e2e', 'npm run e2e'])
    assert.deepEqual(parsed[0].invalid, ['make e2e? rm -rf x', 'make?e2e'])
    // 2) 400 文字の値は切り詰められ ? で終わる → invalid（黙って valid にならない）
    assert.deepEqual(parsed[1].commands, [])
    assert.equal(parsed[1].invalid.length, 1)
    assert.ok(parsed[1].invalid[0].endsWith('?'))
    // 3) 件数超過: 先頭 19 件は承認済みの重複（1 件に畳まれる）、20 件目の ? が invalid
    assert.equal(nodes[3].optinTests.length, 20)
    assert.deepEqual(parsed[2].commands, ['make e2e'])
    assert.deepEqual(parsed[2].invalid, ['?'])
    // 4) 承認一覧に無い 12 件はすべて invalid
    assert.deepEqual(parsed[3].commands, [])
    assert.equal(parsed[3].invalid.length, 12)
    // 5) 宣言が揃っていれば invalid なし
    assert.deepEqual(parsed[4], { commands: ['make e2e', 'npm run e2e'], invalid: [] })
  })

  test(`${tag} 承認済みの宣言が OPTIN_TESTS_MAX（10）を超えるノードは invalid のまま（件数 11〜20 も fail-closed）`, () => {
    const many = host.parseOptinTestCommands(Array.from({ length: 15 }, (_, i) => `make t${i}`))
    const { nodes } = fetchAsHost(bash, [Array.from({ length: 15 }, (_, i) => mark(`make t${i}`)).join('\n')])
    assert.equal(nodes[1].optinTests.length, 15)
    const parsed = host.parseOptinTestDeclarations(nodes[1].optinTests, many)
    assert.deepEqual(parsed.commands, [])
    assert.equal(parsed.invalid.length, 15)
    assert.ok(15 > host.OPTIN_TESTS_MAX)
  })

  test(`${tag} 閉じない宣言（#802）・合計 1,000 文字超（#803）のノードは ["?"] で、ホストの照合（optinSha256）を通ったうえで承認一覧の有無によらず invalid（blocked）`, () => {
    const big = Array.from({ length: 4 }, () => mark('make e2e')).join('\n') + '\n' + Array.from({ length: 4 }, (_, i) => mark(`make ${String(i).repeat(295)}`)).join('\n')
    const { nodes, result } = fetchAsHost(bash, [
      `${mark('make e2e')}\n<!-- optin-tests: npm run e2e`,
      '宣言は `<!-- optin-tests:` で始める',
      big,
      mark('make e2e'),
    ])
    assert.deepEqual(nodes.slice(1).map((n) => n.optinTests), [['?'], ['?'], ['?'], ['make e2e']])
    assert.equal(host.treeNodeShapeProblem(nodes), '')
    assert.deepEqual(verify(result, nodes), { ok: true, titleMismatch: false })
    for (const approved of [APPROVED, host.parseOptinTestCommands([])]) {
      for (const n of nodes.slice(1, 4)) assert.deepEqual(host.parseOptinTestDeclarations(n.optinTests, approved), { commands: [], invalid: ['?'] }, `#${n.number}`)
    }
    assert.deepEqual(host.parseOptinTestDeclarations(nodes[4].optinTests, APPROVED), { commands: ['make e2e'], invalid: [] })
    // ["?"] を宣言なし（[]）や閉じた値へ書き換えた返却は digest 不一致
    for (const bad of [[], ['make e2e']]) {
      const mutated = nodes.map((x) => (x.number === 2 ? { ...x, optinTests: bad } : x))
      assert.deepEqual(verify(result, mutated), { ok: false, reason: 'digest' }, JSON.stringify(bad))
    }
  })

  test(`${tag} closed のノードの宣言は取り込まれない（[] のまま）`, () => {
    const { nodes, result } = fetchAsHost(bash, [mark('make e2e'), mark('npm run e2e')], { states: ['open', 'closed'] })
    assert.deepEqual(nodes.map((n) => n.optinTests), [[], ['make e2e'], []])
    assert.deepEqual(verify(result, nodes), { ok: true, titleMismatch: false })
  })
}
