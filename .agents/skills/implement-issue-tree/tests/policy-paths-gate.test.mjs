// 方針パスのゲート（Issue #760）のホスト側の回帰テスト。
//
// 背景: fix が指摘に応えるうちに、CI の timeout 延長・ジョブ追加のような方針（計画にない変更）を断りなく入れた。
// 検証する契約:
//   - 計画の policyPaths は sanitizePolicyPaths で厳格に検証される（コマンド行に載るため）
//   - 封筒の照合（nonce・入力・sha256）に通った観測だけを使う。unplanned > 0 / truncated は止め、OPEN でなければ通す（classifyPolicyPaths）
//   - 観測コマンドと入力の定義がスクリプトの定義と一致する（--allow・allow の行）
//   - fix のプロンプトに範囲の固定文が UNTRUSTED 境界の外側にある。plan のプロンプトに policyPaths の指示がある
//   - fixCount > 0 の ready のときだけ、added-files ゲートとマージ実行より前に観測し、計画外・観測不能は blocked（結合）
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BASE_ARGS, definitionPart, driverPart, importDefinitions, runScript } from './lib/stub-run.mjs'
import { inputSha256, makeEnvelope, nonceOf, policyPathsReply } from './lib/signed-output.mjs'

const { sanitizePolicyPaths, classifyPolicyPaths, policyPathsBlockedReason, observeInputText, observeCommand, planPrompt, PLAN_SCHEMA } = await importDefinitions(
  ['sanitizePolicyPaths', 'classifyPolicyPaths', 'policyPathsBlockedReason', 'observeInputText', 'observeCommand', 'planPrompt', 'PLAN_SCHEMA'],
  'policy-paths-gate',
)

const NONCE = 'pg1n2o3n4c5e'
const inputOf = (pr, allow = []) => ['observe-pr', 'policy-paths', String(pr), '', '', '', '', '', '', allow.join(',')].join('\n')
const payloadOf = (pr, allow, over = {}) => ({
  mode: 'policy-paths', inputSha256: inputSha256(inputOf(pr, allow)), outcome: 'observed', err: 0, state: 'OPEN', files: 3, policy: 0, unplanned: 0, truncated: 0, ...over,
})

test('sanitizePolicyPaths: 安全な文字集合だけを通し、重複を除き、20 件に切る。通らない要素は捨てる', () => {
  assert.deepEqual(sanitizePolicyPaths(['.github/workflows/', '.github/workflows/ci.yml', 'CODEOWNERS', 'CODEOWNERS']), ['.github/workflows/', '.github/workflows/ci.yml', 'CODEOWNERS'])
  for (const bad of ['', '-x', '/abs', 'a/../b', '..', 'a//b', 'a b', 'a;b', '$(x)', 'a\nb', 'a,b', 'x'.repeat(201), 1, null, {}, '日本語']) {
    assert.deepEqual(sanitizePolicyPaths([bad]), [], JSON.stringify(bad))
  }
  assert.equal(sanitizePolicyPaths(Array.from({ length: 30 }, (_, i) => `d${i}/`)).length, 20)
  for (const v of [undefined, null, 'a', {}, 5]) assert.deepEqual(sanitizePolicyPaths(v), [])
})

test('observeInputText / observeCommand: policy-paths は allow の行を足し、--allow と一致させる。他のモードの入力は変えない', () => {
  const f = { mode: 'policy-paths', pr: 1003, allow: ['.github/workflows/', 'CODEOWNERS'] }
  assert.equal(observeInputText(f), inputOf(1003, f.allow))
  assert.equal(observeInputText({ ...f, allow: undefined }), inputOf(1003, []))
  assert.equal(observeInputText({ mode: 'threads', pr: 1 }).split('\n').length, 9)
  assert.match(observeCommand(NONCE, f), /observe-pr\.sh --nonce pg1n2o3n4c5e --mode policy-paths --pr 1003 --allow \.github\/workflows\/,CODEOWNERS$/)
  assert.doesNotMatch(observeCommand(NONCE, { ...f, allow: [] }), /--allow/)
  for (const allow of [['a b'], ['a;b'], ['x', 'x'], ['..'], [1], 'a', Array.from({ length: 21 }, (_, i) => `d${i}`)]) {
    assert.throws(() => observeCommand(NONCE, { ...f, allow }), /allow/, JSON.stringify(allow))
  }
})

test('classifyPolicyPaths: 照合に通った観測だけを unplanned / truncated / none に分け、失敗は skip にする', () => {
  const allow = ['CODEOWNERS']
  const c = (payload, nonce = NONCE) => classifyPolicyPaths(makeEnvelope(nonce, payload), NONCE, inputSha256(inputOf(1003, allow)))
  assert.equal(c(payloadOf(1003, allow)).kind, 'none')
  assert.equal(c(payloadOf(1003, allow, { policy: 2, unplanned: 0 })).kind, 'none', '宣言どおりの方針パスは通す')
  assert.deepEqual(c(payloadOf(1003, allow, { policy: 2, unplanned: 1 })), { kind: 'unplanned', unplanned: 1, reason: '' })
  assert.equal(c(payloadOf(1003, allow, { truncated: 1 })).kind, 'truncated')
  assert.equal(c(payloadOf(1003, allow, { state: 'MERGED', policy: 3, unplanned: 3 })).kind, 'none', 'OPEN でない PR は通す')
  assert.equal(c(payloadOf(1003, allow, { state: 'CLOSED', truncated: 1 })).reason, 'not-open')
  // 失敗は skip（ホストは止める側に倒す）
  assert.equal(c(payloadOf(1003, allow), 'other0nonce').kind, 'skip')
  assert.equal(c({ ...payloadOf(1003, allow), inputSha256: inputSha256(inputOf(1003, [])) }).kind, 'skip', '入力が違う')
  assert.equal(c(payloadOf(1003, allow, { err: 1, outcome: 'error' })).reason, 'fetch-error')
  assert.equal(c(payloadOf(1003, allow, { mode: 'added-files' })).reason, 'mode')
  for (const over of [{ unplanned: 5, policy: 1 }, { files: -1 }, { policy: 1.5 }, { state: 'X' }, { truncated: 'a' }]) {
    assert.equal(c(payloadOf(1003, allow, over)).reason, 'payload', JSON.stringify(over))
  }
  const env = makeEnvelope(NONCE, payloadOf(1003, allow))
  assert.equal(classifyPolicyPaths({ ...env, sha256: '0'.repeat(64) }, NONCE, inputSha256(inputOf(1003, allow))).kind, 'skip')
  assert.equal(classifyPolicyPaths(null, NONCE, 'x').kind, 'skip')
})

test('policyPathsBlockedReason: 件数と固定文だけで理由を作り、パスの文字列を含めない。none は空', () => {
  assert.equal(policyPathsBlockedReason(7, { kind: 'none', reason: '' }), '')
  assert.match(policyPathsBlockedReason(7, { kind: 'unplanned', unplanned: 2 }), /PR #7 は fix を経ており.*方針パス.*2 件変更している.*戻して同じ args で再実行/)
  assert.match(policyPathsBlockedReason(7, { kind: 'truncated' }), /確かめられない/)
  assert.match(policyPathsBlockedReason(7, { kind: 'skip', reason: 'fetch-error' }), /観測できなかった（fetch-error）.*停止した/)
})

test('プロンプト: plan に policyPaths の指示がある。fix に範囲の固定文があり UNTRUSTED 境界より前（push / no-push 共通の 1 か所）', () => {
  const p = planPrompt({ number: 5, title: 't' })
  assert.match(p, /policyPaths/)
  assert.ok(PLAN_SCHEMA.properties.policyPaths && !PLAN_SCHEMA.required.includes('policyPaths'), '任意フィールド')
  const at = definitionPart.indexOf('fixScopePolicy(item),')
  assert.ok(at > 0)
  assert.ok(at < definitionPart.indexOf('`=== UNTRUSTED_${nonce}_BEGIN', at), '境界より前')
  assert.equal(definitionPart.split('fixScopePolicy(item),').length, 2, 'fixPrompt の共通部に 1 か所だけ')
})

test('許可の取り方: fix の固定文とゲートは同じ policyAllowOf を使う（再開で Plan を飛ばしても保存済みの宣言と食い違わない）', () => {
  assert.match(definitionPart, /const policyAllowOf = \(item\) => planPolicyPathsByIssue\.get\(item\.number\) \?\? \[\]/)
  assert.match(driverPart, /planPolicyPathsByIssue\.set\(Number\(k\), sanitizePolicyPaths\(v\.planPolicyPaths\)\)/)
  assert.match(definitionPart, /\(policyAllowOf\(item\)\.join\(','\) \|\| 'なし'\)/)
  assert.match(definitionPart, /const allow = policyAllowOf\(item\)\n/)
  assert.equal(definitionPart.split('planPolicyPathsByIssue.get(').length, 2, '直接参照は policyAllowOf の 1 か所だけ')
})

test('ゲートは ready の後・added-files ゲートと recoveryOnly とマージ実行より前に置き、fixCount > 0 に限る', () => {
  const gate = driverPart.indexOf('__POLICY_PATHS_GATE__')
  assert.ok(gate > 0)
  assert.equal(driverPart.split('__POLICY_PATHS_GATE__').length, 2)
  assert.ok(driverPart.indexOf('__ADDED_FILES_GATE__') > gate)
  assert.ok(driverPart.indexOf('const recoveryOnly = ') > gate)
  assert.ok(driverPart.indexOf('merge-exec:#${item.number}') > gate)
  assert.match(driverPart.slice(gate, gate + 200), /lastState === 'ready' && fixCount > 0/)
})

// ---- 結合: 2 件のツリーを parallel 1 で回す。#3 は 1 回目の監視が needs-fix（fix を 1 回経る）→ 2 回目が ready ----
const HEAD = 'a'.repeat(40)
async function runTree(policyReply, { fixFirst = true, plan = { plan: 'p', summary: 's' } } = {}) {
  const observed = []
  const monitorCalls = {}
  const out = await runScript({
    args: { ...BASE_ARGS },
    leaves: [2, 3],
    override: (label, opts, prompt) => {
      const n = Number(/#(\d+)/.exec(label)?.[1])
      if (label.startsWith('plan:#')) return plan
      if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: HEAD, headRefName: `feat/${n}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [n] }
      if (label.startsWith('merge:policy-paths:#')) {
        observed.push({ issue: n, model: opts.model, prompt })
        return policyReply({ prompt, issue: n, call: observed.filter((o) => o.issue === n).length })
      }
      if (label.startsWith('merge:added-files:#')) {
        const m = /--pr (\d+)/.exec(prompt)
        const input = ['observe-pr', 'added-files', m[1], '', 'main', '', '', '', '', ''].join('\n')
        return makeEnvelope(nonceOf(prompt), { mode: 'added-files', inputSha256: inputSha256(input), outcome: 'observed', err: 0, attempt: 0, maxAttempts: 0, state: 'OPEN', added: 0, numbered: 0, samePath: 0, seqPeer: 0, seqBase: 0, truncated: 0, pathPeers: [], seqPeers: [] })
      }
      if (label.startsWith('merge:#')) {
        monitorCalls[n] = (monitorCalls[n] ?? 0) + 1
        if (n === 3 && fixFirst && monitorCalls[n] === 1) return { state: 'needs-fix', summary: '指摘あり', unresolvedComments: [] }
        return { state: 'ready', summary: 'マージ条件充足', headSha: HEAD }
      }
      if (label.startsWith('fix:#')) return { pushed: true, summary: '直した', worktreePath: `/repo/wt/f${n}` }
      return undefined
    },
  })
  return { ...out, observed }
}
const honest = ({ prompt }, over = {}) => policyPathsReply(prompt, over)
const labelsOf = (calls, issue) => calls.map((c) => c.opts.label).filter((l) => l.endsWith(`#${issue}`))
const resultOf = (result, issue) => [...(result.done ?? []), ...(result.failed ?? []), ...(result.blocked ?? [])].find((d) => d.issue === issue)

test('結合: fix を経ていない PR は観測しない。fix を経た PR は added-files・マージ実行より前に観測して通す', async () => {
  const { calls, observed } = await runTree((ctx) => honest(ctx))
  assert.deepEqual([...new Set(observed.map((o) => o.issue))], [3], 'fixCount 0 の #2 は観測しない')
  assert.equal(observed[0].model, 'haiku')
  const labels = labelsOf(calls, 3)
  assert.ok(labels.indexOf('fix:#3') >= 0)
  assert.ok(labels.indexOf('merge:policy-paths:#3') > labels.indexOf('fix:#3'))
  assert.ok(labels.indexOf('merge:added-files:#3') > labels.indexOf('merge:policy-paths:#3'))
  assert.ok(labels.indexOf('merge-exec:#3') > labels.indexOf('merge:policy-paths:#3'))
  assert.ok(!labelsOf(calls, 2).includes('merge:policy-paths:#2'))
  const fixPrompt = calls.find((c) => c.opts.label === 'fix:#3').prompt
  assert.match(fixPrompt.slice(0, fixPrompt.indexOf('=== UNTRUSTED_')), /範囲: 指摘が直接求めた変更だけを行う.*policyPaths（なし）/)
})

test('結合: 計画外の方針パスの変更があれば blocked で止め、added-files もマージ実行も起動しない', async () => {
  const { calls, result } = await runTree((ctx) => honest(ctx, { policy: 2, unplanned: 1 }))
  const labels = labelsOf(calls, 3)
  assert.ok(!labels.includes('merge:added-files:#3'))
  assert.ok(!labels.includes('merge-exec:#3'))
  const r = resultOf(result, 3)
  assert.equal(r.status, 'blocked')
  assert.match(r.note, /計画で宣言していない方針パス.*1 件変更している/)
})

test('結合: 計画が宣言した方針パスだけなら通る。宣言は --allow として観測に渡り、fix の固定文にも出る', async () => {
  const { calls, observed } = await runTree((ctx) => honest(ctx, { policy: 1 }), { plan: { plan: 'p', summary: 's', policyPaths: ['.github/workflows/', 'bad path', '.github/workflows/'] } })
  assert.match(observed[0].prompt, / --allow \.github\/workflows\/\n/)
  assert.ok(labelsOf(calls, 3).includes('merge-exec:#3'))
  assert.match(calls.find((c) => c.opts.label === 'fix:#3').prompt, /policyPaths（\.github\/workflows\/）/)
})

test('結合: 観測できない（封筒の不一致・取得失敗・例外）ときは sonnet で 1 回だけ取り直し、なお駄目なら blocked（飛ばさない）', async () => {
  for (const bad of [
    (ctx) => ({ ...honest(ctx), sha256: '0'.repeat(64) }),
    (ctx) => honest(ctx, { err: 1, outcome: 'error' }),
    () => { throw new Error('boom') },
  ]) {
    const { calls, observed, result } = await runTree(bad)
    assert.deepEqual(observed.filter((o) => o.issue === 3).map((o) => o.model), ['haiku', 'sonnet'])
    assert.ok(!labelsOf(calls, 3).includes('merge-exec:#3'))
    const r = resultOf(result, 3)
    assert.equal(r.status, 'blocked')
    assert.match(r.note, /観測できなかった/)
  }
})

test('結合: 1 回目だけ失敗しても取り直しで通れば続行する。切り詰められた一覧は blocked', async () => {
  const flaky = await runTree((ctx) => (ctx.call === 1 ? { ...honest(ctx), sha256: '0'.repeat(64) } : honest(ctx)))
  assert.ok(labelsOf(flaky.calls, 3).includes('merge-exec:#3'))
  const trunc = await runTree((ctx) => honest(ctx, { truncated: 1 }))
  assert.equal(resultOf(trunc.result, 3).status, 'blocked')
  assert.match(resultOf(trunc.result, 3).note, /確かめられない/)
})
