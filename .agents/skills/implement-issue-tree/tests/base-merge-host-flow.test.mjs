// base 取り込みエージェントの返却をホストが受け取る経路を、実装スクリプト全体を stub agent に対して走らせて確かめる結合テスト
// （Issue #603 第 3 弾）。agent-call-budget.test.mjs / observe-pr-monitor-flow.test.mjs の runScript と同じ評価形態
// （AsyncFunction。agent は引数）。
//
// 契約:
//   - スクリプトを実行できなかった（run-verified.sh の exit 3 / 4・スクリプトの exit 2 など、BASE_MERGE_RESULT の行が無い）ときの
//     fallback（pushed: false・commitFailed: true）は、ホストが失敗終端する。conflict / hookRejected は付かないので fix 経路へ
//     回さず、取り込み直しの再試行もしない（base 取り込みは 1 回しか起動しない）
//   - スクリプトが結果を返した場合の写像は従来どおり: conflict / hookRejected は fix 経路へ、routingError は halt 対象の失敗、
//     pushed: true は進捗として次ラウンドの monitor へ
//   - StructuredOutput が返らない・例外は、従来どおり blocked（次回実行の monitoring 再開で継続）
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'
import { hashPrecheckReply } from './lib/signed-output.mjs'

const SCRIPT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.src.js')
const rawSource = readFileSync(SCRIPT_PATH, 'utf8')
const scriptBody = stripMetaExport(rawSource)
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')
const definitionPart = rawSource.slice(0, rawSource.lastIndexOf('\n', rawSource.indexOf(DRIVER_MARKER)))
globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
globalThis.agent = async () => null
globalThis.log = () => {}
const slicePath = join(trackTmp(mkdtempSync(join(tmpdir(), 'iit-base-merge-flow-'))), 'defs.mjs')
writeFileSync(slicePath, `${definitionPart}\nexport { declaredDepsChecksum, outOfTreeStateChecksum }\n`)
const { declaredDepsChecksum, outOfTreeStateChecksum } = await import(pathToFileURL(slicePath).href)
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const PR = 1002
const SHA = 'a'.repeat(40)
const REPO = 'Fandhe-AI/agent-cli-skills'
const ARGS = { parent: 1, parallel: 1, maxResidualWorktrees: 0, maxResidualWorktreeBytes: 0, skillDir: '/opt/skills/implement-issue-tree', repo: REPO }

// 葉 #2 が PR 作成（#1002）まで進み、monitor が conflicting を返し、base 取り込みの応答を baseMergeReply(prompt, n) に任せる最小の stub
async function run(baseMergeReply, { monitorReply = () => ({ state: 'conflicting', summary: 'mergeable: CONFLICTING', headSha: SHA, unresolvedComments: [] }), fixReply = () => null, args = ARGS } = {}) {
  const nodes = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 1 },
    { number: 2, title: 'issue 2', state: 'open', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
  ]
  const calls = []
  const logs = []
  let baseMergeCalls = 0
  let monitorCalls = 0
  const handler = (prompt, opts) => {
    const label = opts.label
    if (label === 'nonce:seed') return { seedHex: 'b'.repeat(64) }
    if (label === 'script-hash-precheck') return hashPrecheckReply(prompt)
    if (label === 'worktree:untracked-scan') return { count: 0, paths: [] }
    if (label === 'state:load') return { ok: true, fileExisted: false, items: {}, highWaterBytes: 0, highWaterVersion: 0 }
    if (label === 'state:load-verify') return { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 }
    if (label === 'plan:issue-tree') return { nodes: structuredClone(nodes) }
    if (label === 'detect:external-checks') return { apps: [] }
    if (label.startsWith('plan:declared-deps')) {
      const nums = /for n in ([0-9 ]+); do/.exec(prompt)[1].trim().split(' ').map(Number)
      return { entries: nums.map((x) => ({ number: x, deps: [], sig: declaredDepsChecksum(x, []) })) }
    }
    if (label.startsWith('plan:root-ancestors')) return { fetched: true, chain: [{ number: 1, parent: 0 }] }
    if (label.startsWith('plan:out-of-tree-deps')) {
      const nums = /for n in ([0-9 ]+); do/.exec(prompt)[1].trim().split(' ').map(Number)
      return { entries: nums.map((x) => ({ number: x, state: 'OPEN', sig: outOfTreeStateChecksum(x, 'OPEN') })) }
    }
    if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }] }
    if (label === 'worktree:record-count') return { count: 1 }
    if (label.startsWith('plan:#')) return { plan: 'p', summary: 's' }
    if (label.startsWith('impl:#')) return { branch: 'feat/2-x', summary: 's', worktreePath: '/repo/wt/2' }
    if (label.startsWith('review:#')) return { state: 'ok', highestSeverity: 'none', summary: 's', worktreePath: '/repo/wt/r2' }
    if (label.startsWith('pr-create:#')) return { prNumber: PR, summary: 's', worktreePath: '/repo/wt/p2', checksStarted: true, mergeableAfterPush: 'MERGEABLE' }
    if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: SHA, headRefName: 'feat/2-x', baseRefName: 'main', isCrossRepository: false, closingIssues: [2] }
    if (label.startsWith('merge:#')) return monitorReply(prompt, (monitorCalls += 1))
    if (label.startsWith('base-merge:#')) return baseMergeReply(prompt, (baseMergeCalls += 1))
    if (label.startsWith('fix:#')) return fixReply(prompt)
    if (label.startsWith('state:')) return { ok: true }
    return null
  }
  const agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    await Promise.resolve()
    const v = handler(prompt, opts)
    if (v instanceof Error) throw v
    return v
  }
  const result = await new AsyncFunction('args', 'agent', 'log', 'phase', scriptBody)(args, agent, (m) => { logs.push(m) }, () => {})
  return { result, calls, logs }
}
const labelsOf = (calls, prefix) => calls.filter((c) => c.opts.label.startsWith(prefix))

// スクリプトを実行できなかったときに、プロンプトの指示どおりエージェントが返す値（run-verified.sh の exit 3 / 4 などで BASE_MERGE_RESULT の行が無い）
const FALLBACK = { pushed: false, commitFailed: true, summary: 'base-merge.sh の失敗', worktreePath: '/repo/wt/bm' }

test('結合: fallback（pushed: false・commitFailed: true。スクリプトの実行失敗）は失敗終端し、fix 経路へ回さず、取り込み直しもしない', async () => {
  const { result, calls, logs } = await run(() => FALLBACK)
  const done = result.done.find((d) => d.issue === 2)
  assert.equal(done.status, 'failed', JSON.stringify(done))
  assert.match(done.note, /base 取り込みがコミットを作成できず未反映: base-merge\.sh の失敗/)
  assert.equal(labelsOf(calls, 'base-merge:#').length, 1, 'base 取り込みは 1 回だけ起動する（取り込み直さない）')
  assert.equal(labelsOf(calls, 'fix:#').length, 0, 'conflict / hookRejected が付かないので fix 経路へ委譲しない')
  assert.equal(labelsOf(calls, 'merge-exec:#').length, 0, 'マージは試みない')
  assert.ok(logs.some((l) => /base 取り込みがコミットを作成できず未反映/.test(l)))
})

test('結合: 起動コマンドを含む base-merge のプロンプトが渡り、期待リポジトリ・PR・ブランチは検証済みの値だけ', async () => {
  const { calls } = await run(() => FALLBACK)
  const [call] = labelsOf(calls, 'base-merge:#')
  assert.match(call.prompt, new RegExp(`bash '/opt/skills/implement-issue-tree/scripts/run-verified\\.sh' @@SCRIPT_SHA256:base-merge\\.sh@@ base-merge\\.sh --pr ${PR} --branch feat/2-x --base main --repo '${REPO.toLowerCase()}'`))
  assert.equal(call.opts.isolation, 'worktree')
  assert.equal(call.opts.model, 'sonnet')
})

test('結合: conflict（commitFailed + conflict）は fix 経路へ委譲し、hookRejected も同様。どちらも失敗終端しない', async () => {
  for (const flag of ['conflict', 'hookRejected']) {
    const { calls, result } = await run(() => ({ pushed: false, commitFailed: true, [flag]: true, summary: '固定語彙', worktreePath: '/repo/wt/bm' }))
    assert.equal(labelsOf(calls, 'fix:#').length >= 1, true, `${flag}: fix が起動する`)
    const done = result.done.find((d) => d.issue === 2)
    assert.ok(!/base 取り込みがコミットを作成できず未反映/.test(done?.note ?? ''), flag)
  }
})

test('結合: routingError は halt 対象の失敗終端（取り込み直しも fix もしない）', async () => {
  const { calls, result } = await run(() => ({ pushed: false, routingError: true, summary: 'worktree routing error: remote の host が許可ホストと不一致', worktreePath: '/repo/wt/bm' }))
  const done = result.done.find((d) => d.issue === 2)
  assert.equal(done.status, 'failed')
  assert.equal(labelsOf(calls, 'base-merge:#').length, 1)
  assert.equal(labelsOf(calls, 'fix:#').length, 0)
})

test('結合: pushed: true は進捗として次ラウンドの monitor へ進む（pushed の自己申告で merge・クローズへは進まない）', async () => {
  const { calls, logs } = await run(
    () => ({ pushed: true, summary: 'base を取り込み push した', worktreePath: '/repo/wt/bm' }),
    { monitorReply: (_p, n) => (n === 1 ? { state: 'conflicting', summary: 'CONFLICTING', headSha: SHA, unresolvedComments: [] } : { state: 'blocked', blockedReason: 'quality', summary: '打ち切り', unresolvedComments: [] }) },
  )
  assert.equal(labelsOf(calls, 'base-merge:#').length, 1)
  assert.ok(labelsOf(calls, 'merge:#').length >= 2, '取り込み後に monitor が実値を再観測する')
  assert.equal(labelsOf(calls, 'merge-exec:#').length, 0, 'pushed の申告だけではマージしない')
  assert.ok(!logs.some((l) => /ログ専用・判定には未使用/.test(l)), '廃止したログ専用 3 項目のログを出さない')
})

test('結合: StructuredOutput が返らない・例外は blocked（PR は既存のため次回実行の monitoring 再開で継続）', async () => {
  for (const reply of [() => null, () => new Error('agent boom')]) {
    const { result } = await run(reply)
    const done = result.done.find((d) => d.issue === 2)
    assert.equal(done.status, 'blocked', JSON.stringify(done))
  }
})

test('結合: 期待リポジトリ（args.repo）が未確定なら base-merge を起動せず blocked + quality で終端する', async () => {
  const { calls, result } = await run(() => FALLBACK, { args: { ...ARGS, repo: undefined } })
  assert.equal(labelsOf(calls, 'base-merge:#').length, 0)
  const done = result.done.find((d) => d.issue === 2)
  assert.equal(done.status, 'blocked')
})
