// fetch-tree.sh の失敗理由がホストのログと最終例外に届くことの回帰テスト（Issue #676）。
//
// 偽 gh で実 fetch-tree.sh を走らせて本物の終了コードと標準エラーを得て、それを「正直なエージェントの返却」
// （failure: { exitCode, stderr }・nodes 空・封筒なし）に変換し、stub agent でホスト全体を実行してログと例外を検査する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { runScript, BASE_ARGS } from './lib/stub-run.mjs'
import { treeFetchReply, availableBashes } from './lib/signed-output.mjs'
import { makeGhTreeStub, issue } from './lib/gh-tree-stub.mjs'
import { SCRIPT } from './lib/fetch-tree-suite.mjs'

const P = 'repos/o/r'
const ARGS = { ...BASE_ARGS, repo: 'o/r' }
const bash = availableBashes()[0]
const isTree = (label) => label === 'plan:issue-tree' || label === 'plan:issue-tree-retry'
const baseNodes = () => [
  { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 2 },
  { number: 2, title: 'a', state: 'open', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
  { number: 3, title: 'b', state: 'open', parent: 1, siblingIndex: 1, dependsOn: [], subIssuesTotal: 0 },
]

// 実スクリプトを走らせ、非 0 なら正直な failure 返却にする
function honestAgent(stub) {
  return (prompt) => {
    const nonce = /--nonce ([0-9a-z]+)/.exec(prompt)[1]
    const r = spawnSync(bash, [SCRIPT, '--nonce', nonce, '--root', '1', '--repo', 'o/r'], { env: stub.env(), encoding: 'utf8' })
    if (r.status !== 0) return treeFetchReply(prompt, [], { failure: { exitCode: r.status, stderr: r.stderr.slice(0, 300) } })
    return treeFetchReply(prompt, baseNodes())
  }
}

// 2 回とも実スクリプトが失敗するケース。最終例外とラベルを返す
async function failRun(stub) {
  let err = null
  const labels = []
  const agent = honestAgent(stub)
  await runScript({
    args: ARGS,
    leaves: [2, 3],
    override: (label, _o, prompt) => {
      labels.push(label)
      return isTree(label) ? agent(prompt) : undefined
    },
  }).catch((e) => { err = e })
  return { err, labels }
}

test('exit 5（gh の失敗）: 最終例外に終了コード・意味が出て、取り直し後の失敗だと分かる', async () => {
  const { err, labels } = await failRun(makeGhTreeStub({}))
  assert.ok(err, '停止する')
  assert.match(err.message, /exit 5/)
  assert.match(err.message, /gh の失敗/)
  assert.match(err.message, /取り直しても解消しなかった/)
  assert.doesNotMatch(err.message, /検査値が一致しない/)
  assert.deepEqual(labels.filter(isTree), ['plan:issue-tree', 'plan:issue-tree-retry'])
})

test('exit 6（子の件数不一致）: 終了コード・意味・該当番号が出る', async () => {
  const stub = makeGhTreeStub({
    [`${P}/issues/1`]: issue(1, { total: 3 }),
    [`${P}/issues/1/sub_issues`]: { pages: [[issue(2), issue(3)]] },
  })
  const { err } = await failRun(stub)
  assert.match(err.message, /exit 6/)
  assert.match(err.message, /不完全/)
  assert.match(err.message, /#1\b/)
})

test('exit 6（番号の重複）でも終了コードと意味が出る', async () => {
  const stub = makeGhTreeStub({
    [`${P}/issues/1`]: issue(1, { total: 2 }),
    [`${P}/issues/1/sub_issues`]: { pages: [[issue(2), issue(2)]] },
  })
  const { err } = await failRun(stub)
  assert.match(err.message, /exit 6/)
  assert.match(err.message, /#2\b/)
})

test('exit 7（出力過大）: 終了コードと意味が出る', async () => {
  const kids = Array.from({ length: 2600 }, (_, i) => issue(100 + i, { title: 'x'.repeat(300) }))
  const stub = makeGhTreeStub({ [`${P}/issues/1`]: issue(1, { total: 2600 }), [`${P}/issues/1/sub_issues`]: { pages: [kids] } })
  const { err } = await failRun(stub)
  assert.match(err.message, /exit 7/)
  assert.match(err.message, /出力過大/)
})

// 例外にならない「1 回目の応答が first・2 回目が second」でログを見る
async function logsOf(first, second) {
  let i = 0
  const replies = [first, second]
  return runScript({
    args: ARGS,
    leaves: [2, 3],
    override: (label, _o, prompt) => (isTree(label) ? replies[Math.min(i++, 1)](prompt) : undefined),
  })
}
const failReply = (failure) => (p) => treeFetchReply(p, [], { failure })
const honest = (p) => treeFetchReply(p, baseNodes())

test('1 回目の failure ログは「取り直す」旨で「解消しなかった」を含まず、2 回目が正常なら続行する', async () => {
  const { logs, result } = await logsOf(failReply({ exitCode: 5, stderr: 'fetch-tree: gh の失敗 (#1)' }), honest)
  assert.equal(result.treeFetch.attempts, 2)
  const line = logs.find((l) => l.includes('exit 5'))
  assert.ok(line, logs.join('\n'))
  assert.match(line, /試行 1/)
  assert.match(line, /取り直す/)
  assert.doesNotMatch(line, /解消しなかった/)
  assert.doesNotMatch(line, /検査値が一致しない/)
})

test('検査値の不一致・完全性検査の失敗も、1 回目のログに「解消しなかった」を出さない', async () => {
  const mismatch = (p) => treeFetchReply(p, baseNodes().map((n) => (n.number === 2 ? { ...n, title: 'x' } : n)), { digestNodes: baseNodes() })
  const short = (p) => treeFetchReply(p, baseNodes().slice(0, 2))
  for (const bad of [mismatch, short]) {
    const { logs } = await logsOf(bad, honest)
    const line = logs.find((l) => l.includes('試行 1'))
    assert.ok(line)
    assert.doesNotMatch(line, /解消しなかった/)
    assert.match(line, /取り直す/)
  }
})

test('封筒なし・nodes なしの failure でも「封筒の欠落」「nodes が無い」に化けず failure 理由が出る', async () => {
  const noNodes = (p) => { const r = treeFetchReply(p, [], { failure: { exitCode: 7, stderr: '' } }); delete r.nodes; return r }
  const { logs } = await logsOf(noNodes, honest)
  const line = logs.find((l) => l.includes('試行 1'))
  assert.match(line, /exit 7/)
  assert.doesNotMatch(line, /nodes 配列が無い|missing/)
})

test('未信頼値: stderr は sanitize・切り詰め、exitCode が範囲外・非整数なら「不明」、旧形式の文字列でも落ちない', async () => {
  const evil = 'a`b\n$(c)\\' + 'z'.repeat(1000)
  let { logs } = await logsOf(failReply({ exitCode: 5, stderr: evil }), honest)
  let line = logs.find((l) => l.includes('exit 5'))
  assert.ok(line)
  assert.ok(!line.includes('`') && !line.includes('\n'))
  assert.ok(line.length < 700)
  for (const bad of [9999, -1, '5', 1.5, null]) {
    ;({ logs } = await logsOf(failReply({ exitCode: bad, stderr: '' }), honest))
    line = logs.find((l) => l.includes('試行 1'))
    assert.match(line, /終了コード不明/)
    assert.doesNotMatch(line, /exit \d/)
  }
  ;({ logs } = await logsOf(failReply('fetch-tree 失敗'), honest))
  assert.ok(logs.some((l) => l.includes('旧形式')))
})

test('schema とプロンプト: 封筒は任意・failure は構造化・oneOf を使わず、失敗時に封筒を書かせない', async () => {
  let schema = null
  let prompt = ''
  await runScript({
    args: ARGS,
    leaves: [2, 3],
    override: (label, opts, p) => {
      if (label === 'plan:issue-tree') { schema = opts.schema; prompt = p }
      return undefined
    },
  })
  assert.deepEqual(schema.required, ['nodes'])
  assert.equal(schema.properties.failure.type, 'object')
  assert.deepEqual(schema.properties.failure.required, ['exitCode'])
  assert.ok(!('oneOf' in schema) && !('anyOf' in schema) && !('allOf' in schema))
  assert.match(prompt, /exitCode/)
  assert.match(prompt, /nonce・payload・sha256 は書かない/)
})
