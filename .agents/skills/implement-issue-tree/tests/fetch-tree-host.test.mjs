// ツリー取得の検査値の照合（ホスト側。Issue #668）を、stub agent で実装スクリプト全体を走らせて確かめる回帰テスト。
//
// scripts/fetch-tree.sh が出した封筒（nonce・payload・sha256）を、エージェントが nodes と一緒に転記してくる。ホストは nodes の 6 欄
// （number / parent / siblingIndex / state / subIssuesTotal / title）から nodesSha256 を計算し直して照合し、不一致なら 1 回だけ
// 取り直す。期待する封筒は tests/lib/signed-output.mjs が node:crypto で独立に計算する（ホストの実装と共有しない）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runScript, BASE_ARGS } from './lib/stub-run.mjs'
import { treeFetchReply } from './lib/signed-output.mjs'

const baseNodes = () => [
  { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 2 },
  { number: 2, title: 'a', state: 'open', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
  { number: 3, title: 'b', state: 'open', parent: 1, siblingIndex: 1, dependsOn: [], subIssuesTotal: 0 },
]
const POST = /^(detect:external-checks|plan:declared-deps|plan:root-ancestors|plan:out-of-tree-deps)/
const isTree = (label) => label === 'plan:issue-tree' || label === 'plan:issue-tree-retry'
const names = (calls) => calls.map((c) => c.opts.label)

// replies[i] は i 回目のツリー取得の応答（関数なら (prompt) => 応答）
function run(replies, args = BASE_ARGS) {
  let i = 0
  return runScript({
    args,
    leaves: [2, 3],
    override: (label, _opts, prompt) => {
      if (!isTree(label)) return undefined
      const r = replies[Math.min(i++, replies.length - 1)]
      if (r instanceof Error) throw r
      return typeof r === 'function' ? r(prompt) : r
    },
  })
}
const honest = (prompt) => treeFetchReply(prompt, baseNodes())

const MUTATIONS = {
  number: (n) => ({ ...n, number: 9 }),
  parent: (n) => ({ ...n, parent: 2 }),
  siblingIndex: (n) => ({ ...n, siblingIndex: 5 }),
  state: (n) => ({ ...n, state: 'closed' }),
  subIssuesTotal: (n) => ({ ...n, subIssuesTotal: 1 }),
  title: (n) => ({ ...n, title: 'b ' }),
}

for (const [field, mutate] of Object.entries(MUTATIONS)) {
  test(`書き写しで ${field} が 1 欄だけ変わると検査値の不一致になり、1 回だけ取り直して続行する`, async () => {
    const copied = (prompt) => {
      const nodes = baseNodes()
      nodes[2] = mutate(nodes[2])
      return treeFetchReply(prompt, nodes, { digestNodes: baseNodes() })
    }
    const { result, calls, logs } = await run([copied, honest])
    assert.equal(result.treeFetch.attempts, 2)
    assert.equal(names(calls).filter(isTree).length, 2)
    assert.ok(logs.some((l) => l.includes('検査値が一致しない')))
  })
}

test('2 回とも不一致なら後続 agent を 1 件も起動せず、メッセージに「検査値」が入る', async () => {
  const seen = []
  const bad = (prompt) => treeFetchReply(prompt, baseNodes().map((n) => (n.number === 2 ? { ...n, title: 'x' } : n)), { digestNodes: baseNodes() })
  await assert.rejects(
    runScript({
      args: BASE_ARGS,
      leaves: [2, 3],
      override: (label, _o, prompt) => {
        seen.push(label)
        return isTree(label) ? bad(prompt) : undefined
      },
    }),
    /検査値/,
  )
  assert.deepEqual(seen.filter((l) => l.startsWith('plan:issue-tree')), ['plan:issue-tree', 'plan:issue-tree-retry'])
  assert.ok(!seen.some((l) => POST.test(l)))
})

const BROKEN = {
  '封筒の欠落（nonce 無し）': (p) => treeFetchReply(p, baseNodes(), { omit: ['nonce'] }),
  '封筒の欠落（payload 無し）': (p) => treeFetchReply(p, baseNodes(), { omit: ['payload'] }),
  '封筒の欠落（sha256 無し）': (p) => treeFetchReply(p, baseNodes(), { omit: ['sha256'] }),
  'nonce 不一致（別呼び出しの流用）': (p) => treeFetchReply(p, baseNodes(), { nonce: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzz' }),
  'sha256 不一致': (p) => treeFetchReply(p, baseNodes(), { sha256: 'f'.repeat(64) }),
  '入力（root）違い': (p) => treeFetchReply(p, baseNodes(), { payload: { inputSha256: 'e'.repeat(64) } }),
  '件数違い': (p) => treeFetchReply(p, baseNodes(), { payload: { count: 9 } }),
  'failure 申告': (p) => treeFetchReply(p, [], { failure: 'fetch-tree 失敗' }),
  'null 返却': () => null,
  'agent 例外': new Error('boom'),
}
for (const [name, bad] of Object.entries(BROKEN)) {
  test(`${name}は 1 回取り直し、2 回目が正しければ続行する`, async () => {
    const { result, calls } = await run([bad, honest])
    assert.equal(result.treeFetch.attempts, 2)
    assert.equal(names(calls).filter(isTree).length, 2)
  })
}

test('入力（repo）違いの封筒も拒否される', async () => {
  const wrongRepo = (p) => treeFetchReply(p.replace('--repo o/r', '--repo o/other'), baseNodes())
  // 封筒の nonce は同じ呼び出しのものを使うため、repo だけが違う inputSha256 になる
  const withRepo = { ...BASE_ARGS, repo: 'o/r' }
  const { result } = await run([wrongRepo, (p) => treeFetchReply(p, baseNodes())], withRepo)
  assert.equal(result.treeFetch.attempts, 2)
})

test('nonce は試行ごとに異なり、プロンプトに launcher のコマンド・--root・--repo が入る', async () => {
  const prompts = []
  await run([(p) => { prompts.push(p); return null }, (p) => { prompts.push(p); return honest(p) }], { ...BASE_ARGS, repo: 'o/r' })
  assert.equal(prompts.length, 2)
  const nonces = prompts.map((p) => /--nonce ([0-9a-z]+)/.exec(p)?.[1])
  assert.ok(nonces[0] && nonces[1] && nonces[0] !== nonces[1])
  for (const p of prompts) {
    assert.match(p, /run-verified\.sh' \S+ fetch-tree\.sh --nonce [0-9a-z]+ --root 1 --repo o\/r/)
    assert.match(p, /dependsOn/)
    assert.match(p, /optinTests/)
  }
})

test('全欄一致の重複は畳まれ、検査値は通る（foldedDuplicates に記録）', async () => {
  const dup = (p) => treeFetchReply(p, [...baseNodes(), { ...baseNodes()[2] }], { digestNodes: baseNodes() })
  const { result } = await run([dup])
  assert.equal(result.treeFetch.attempts, 1)
  assert.deepEqual(result.treeFetch.foldedDuplicates, [{ number: 3, extra: 1 }])
})

test('検査値は通るが完全性検査が落ちる返却（子の件数不一致）は従来どおり止まる', async () => {
  const short = (p) => treeFetchReply(p, baseNodes().slice(0, 2))
  await assert.rejects(run([short, short]), /ツリー取得が不完全/)
})

test('型・値域が不正な書き写し（state が open / closed でない等）は形式の不一致として取り直す', async () => {
  const badState = (p) => treeFetchReply(p, baseNodes().map((n) => (n.number === 3 ? { ...n, state: 'OPEN' } : n)))
  const { result } = await run([badState, honest])
  assert.equal(result.treeFetch.attempts, 2)
})

test('dryRun: true でも skillDir が無ければ、エージェントを 1 回も呼ぶ前に起動時エラーで停止する', async () => {
  const { skillDir, ...noDir } = BASE_ARGS
  assert.ok(skillDir)
  const seen = []
  await assert.rejects(
    runScript({ args: { ...noDir, dryRun: true }, override: (label) => { seen.push(label); return undefined } }),
    /args\.skillDir にはスキルディレクトリ/,
  )
  assert.deepEqual(seen, [])
})
