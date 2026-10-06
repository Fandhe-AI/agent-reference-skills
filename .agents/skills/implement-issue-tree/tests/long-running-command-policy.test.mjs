// 長時間コマンドのバックグラウンド化による StructuredOutput 未返却（Issue #531）の回帰テスト。
//
// 契約: (A) COMMON へ前景実行・Monitor 禁止・StructuredOutput 義務の共通指示を入れる、
// (B) monitor のみ agentRetryOnce 経由で 1 回だけ再試行する（fix は push 済みの可能性があり再実行しない）（最大 2 回で有界）、
// (C) review の worktreePath は schema で required のまま、プロンプトで必須性を明記する。
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
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-long-running-'))
const slicePath = join(sliceDir, 'defs.mjs')
const SLICE_EXPORTS = [
  'LONG_RUNNING_POLICY', 'COMMON_LINES', 'COMMON', 'MERGE_CONTEXT_COMMON',
  'BASE_MERGE_CONTEXT_COMMON', 'agentRetryOnce', 'MONITOR_RETRY_OBSERVE_ONLY', 'reviewPrompt', 'REVIEW_SCHEMA',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const m = await import(pathToFileURL(slicePath).href)

test('A: COMMON は 600000・前景・Monitor 禁止・StructuredOutput 義務を含み末尾に置かれる', () => {
  assert.equal(m.COMMON_LINES.at(-1), m.LONG_RUNNING_POLICY)
  for (const word of ['600000', '前景', 'run_in_background', 'Monitor', 'StructuredOutput', 'echo / sleep']) {
    assert.ok(m.COMMON.includes(word), word)
  }
})

test('A: MERGE_CONTEXT_COMMON の最小指示は増やさない', () => {
  assert.ok(!m.MERGE_CONTEXT_COMMON.includes(m.LONG_RUNNING_POLICY))
})

let calls
function stub(results) {
  calls = []
  const queue = [...results]
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    const r = queue.shift()
    if (r instanceof Error) throw r
    return r
  }
  globalThis.log = () => {}
}

test('B: 1 回目成功なら 1 回だけ呼ぶ', async () => {
  stub([{ ok: 1 }])
  assert.deepEqual(await m.agentRetryOnce('p', { label: 'x' }), { ok: 1 })
  assert.equal(calls.length, 1)
})

test('B: 1 回目 null・2 回目成功なら成功値（呼び出し 2 回・同一プロンプト・label に :retry）', async () => {
  stub([null, { ok: 2 }])
  assert.deepEqual(await m.agentRetryOnce('same-prompt', { label: 'x', model: 's' }), { ok: 2 })
  assert.equal(calls.length, 2)
  assert.equal(calls[0].prompt, 'same-prompt')
  assert.equal(calls[1].prompt, 'same-prompt')
  assert.equal(calls[1].opts.label, 'x:retry')
  assert.equal(calls[1].opts.model, 's')
})

test('B: retrySuffix 指定時は 2 回目のみプロンプトへ付加される', async () => {
  stub([null, { ok: 5 }])
  assert.deepEqual(await m.agentRetryOnce('p', { label: 'x' }, '[S]'), { ok: 5 })
  assert.equal(calls[0].prompt, 'p')
  assert.equal(calls[1].prompt, 'p[S]')
})

test('B: monitor 再試行は観測専用 suffix 付きで書き込みを禁止する', () => {
  assert.ok(driverPart.includes('MONITOR_RETRY_OBSERVE_ONLY)'))
  assert.ok(m.MONITOR_RETRY_OBSERVE_ONLY.includes('gh run rerun'))
  assert.ok(m.MONITOR_RETRY_OBSERVE_ONLY.includes('@cursor review'))
})

test('B: 1 回目例外・2 回目成功なら成功値', async () => {
  stub([new Error('boom'), { ok: 3 }])
  assert.deepEqual(await m.agentRetryOnce('p', { label: 'x' }), { ok: 3 })
  assert.equal(calls.length, 2)
})

test('B: 2 回とも null なら null で 3 回目へ進まない', async () => {
  stub([null, null, { ok: 9 }])
  assert.equal(await m.agentRetryOnce('p', { label: 'x' }), null)
  assert.equal(calls.length, 2)
})

test('B: 2 回目が例外ならその例外を throw する', async () => {
  stub([null, new Error('second')])
  await assert.rejects(() => m.agentRetryOnce('p', { label: 'x' }), /second/)
  assert.equal(calls.length, 2)
})

test('B: monitor のみ agentRetryOnce 経由（fix は再実行しない）で、後段の null 分岐が残る', () => {
  assert.ok(driverPart.includes('m = await agentRetryOnce(monitorPrompt('))
  assert.ok(driverPart.includes('f = await agent(fixPrompt('))
  assert.ok(!driverPart.includes('agentRetryOnce(fixPrompt('))
  assert.ok(!driverPart.includes('m = await agent(monitorPrompt('))
  assert.ok(driverPart.includes("'agent-output-missing'"))
  assert.ok(driverPart.includes('fix エージェントが StructuredOutput を返さなかった'))
})

test('C: review プロンプトは worktreePath 必須を明記し schema の required も維持する', () => {
  const prompt = m.reviewPrompt({ number: 42, title: 't', optinTests: [] }, { prNumber: 1, branch: 'fix/42-x', worktreePath: '/tmp/wt', summary: 's' })
  assert.ok(prompt.includes('worktreePath（pwd の結果。必須。'))
  assert.ok(m.REVIEW_SCHEMA.required.includes('worktreePath'))
})
