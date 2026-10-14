// 判断を伴う agent のモデルを段階ごとに上書きする任意引数 args.models の回帰テスト。
//
// 契約:
//   1. 未指定なら今と同じモデル（plan は model を渡さずセッションのモデルを継ぐ、implement / review / fix /
//      prCreate / baseMerge は sonnet）。
//   2. 指定した段階だけが変わり、同じ段階の agent が複数あればすべてに効く（Review ループと Merge ループの
//      fix、通常の Implement と回復の Implement）。
//   3. 機械的な agent（state / worktree 走査 / Tree / monitor / merge-exec / merge-verify / pr-bind 等）の
//      モデルは変わらない。
//   4. オブジェクト以外・未知のキー・許可外の値は起動時に throw し、agent を 1 回も呼ばない（fail-closed）。
//   5. 返却値 models に正規化した値（段階の定義順）が載る。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'
import { runScript, BASE_ARGS, driverPart, importDefinitions } from './lib/stub-run.mjs'

const { parseAgentModels, AGENT_MODEL_STAGES, AGENT_MODEL_NAMES } = await importDefinitions(
  ['parseAgentModels', 'AGENT_MODEL_STAGES', 'AGENT_MODEL_NAMES'],
  'agent-models',
)

// ---------------------------------------------------------------------------
// 単体: parseAgentModels
// ---------------------------------------------------------------------------

test('parseAgentModels: undefined / null / {} は空オブジェクト（既定のモデル）', () => {
  assert.deepEqual(parseAgentModels(undefined), {})
  assert.deepEqual(parseAgentModels(null), {})
  assert.deepEqual(parseAgentModels({}), {})
})

test('parseAgentModels: 対象の段階と許可する値', () => {
  assert.deepEqual(AGENT_MODEL_STAGES, ['plan', 'implement', 'review', 'securityReview', 'fix', 'prCreate', 'baseMerge'])
  assert.deepEqual(AGENT_MODEL_NAMES, ['haiku', 'sonnet', 'opus', 'fable'])
})

test('parseAgentModels: 段階の定義順に正規化する（入力のキー順に依存しない）', () => {
  const r = parseAgentModels({ fix: 'opus', plan: 'fable', implement: 'haiku' })
  assert.deepEqual(Object.keys(r), ['plan', 'implement', 'fix'])
  assert.deepEqual(r, { plan: 'fable', implement: 'haiku', fix: 'opus' })
})

test('parseAgentModels: オブジェクト以外は throw', () => {
  for (const bad of ['opus', 1, true, [], ['plan']]) {
    assert.throws(() => parseAgentModels(bad), /args\.models はオブジェクト/, JSON.stringify(bad))
  }
})

test('parseAgentModels: 未知のキー（機械的な agent の段階を含む）は throw', () => {
  for (const key of ['merge', 'monitor', 'state', 'tree', 'mergeExec', 'Plan', '__proto__x', 'recover']) {
    assert.throws(() => parseAgentModels({ [key]: 'opus' }), /args\.models のキー/, key)
  }
  // JSON.parse 由来の __proto__ は自身のプロパティになるため未知のキーとして拒否される
  assert.throws(() => parseAgentModels(JSON.parse('{"__proto__": "opus"}')), /args\.models のキー/)
})

test('parseAgentModels: 許可外の値は throw', () => {
  for (const bad of ['gpt-4', 'Opus', 'claude-opus-5-5', '', 'inherit', null, 1, {}]) {
    assert.throws(() => parseAgentModels({ implement: bad }), /args\.models\.implement は/, JSON.stringify(bad))
  }
})

// ---------------------------------------------------------------------------
// 結合: 実装スクリプト全体を stub agent で実行し、agent() に渡った model を見る
// ---------------------------------------------------------------------------

// 1 回目の Review を needs-fix にして Review ループの fix を通す（2 回目は既定の ok）。
function reviewNeedsFixOnce() {
  let reviews = 0
  return (label) => {
    if (!label.startsWith('review:#')) return undefined
    reviews++
    return reviews === 1 ? { state: 'needs-fix', highestSeverity: 'medium', summary: '指摘 A', worktreePath: '/repo/wt/r' } : undefined
  }
}

function modelsByLabel(calls) {
  const m = new Map()
  for (const c of calls) {
    const key = c.opts.label.replace(/#\d+.*$/, '#')
    if (!m.has(key)) m.set(key, [])
    m.get(key).push(Object.prototype.hasOwnProperty.call(c.opts, 'model') ? c.opts.model : '(なし)')
  }
  return m
}

test('結合: models 未指定なら plan は model を渡さず、implement / review / fix / pr-create は sonnet', async () => {
  const { result, calls } = await runScript({ args: BASE_ARGS, override: reviewNeedsFixOnce() })
  const m = modelsByLabel(calls)
  assert.deepEqual(m.get('plan:#'), ['(なし)'], 'plan はセッションのモデルを継ぐ（model キー自体を持たない）')
  assert.deepEqual(m.get('impl:#'), ['sonnet'])
  assert.deepEqual(m.get('review:#'), ['sonnet', 'sonnet'])
  assert.deepEqual(m.get('fix:#'), ['sonnet'])
  assert.deepEqual(m.get('pr-create:#'), ['sonnet'])
  assert.deepEqual(result.models, {}, '返却値の models は空（上書きなし）')
})

test('結合: 指定した段階だけが変わり、機械的な agent のモデルは変わらない', async () => {
  const base = await runScript({ args: BASE_ARGS, override: reviewNeedsFixOnce() })
  const models = { plan: 'fable', implement: 'opus', fix: 'haiku' }
  const { result, calls } = await runScript({ args: { ...BASE_ARGS, models }, override: reviewNeedsFixOnce() })
  const m = modelsByLabel(calls)
  assert.deepEqual(m.get('plan:#'), ['fable'])
  assert.deepEqual(m.get('impl:#'), ['opus'])
  assert.deepEqual(m.get('fix:#'), ['haiku'])
  assert.deepEqual(m.get('review:#'), ['sonnet', 'sonnet'], '指定していない review は既定のまま')
  assert.deepEqual(m.get('pr-create:#'), ['sonnet'], '指定していない prCreate は既定のまま')
  assert.deepEqual(result.models, models)

  // 判断を伴う段階以外は、呼び出し列（label と model）が未指定のランと完全に同じ。
  const judgment = /^(plan|impl|review|fix|pr-create|base-merge):#/
  const mech = (cs) => cs.filter((c) => !judgment.test(c.opts.label)).map((c) => [c.opts.label, c.opts.model])
  assert.deepEqual(mech(calls), mech(base.calls))
})

test('結合: 7 段階すべてに既定と異なるモデルを入れても、機械的な agent（monitor を含む）のモデルは未指定のランと同じ', async () => {
  // どの段階を指定しても monitor / merge-exec 等のモデルが引きずられないこと。monitor に stageModelOpt('review', …)
  // のような誤配線をすると、review に既定と異なる値を入れたこのランで値が変わって落ちる。
  const stages = { plan: 'fable', implement: 'opus', review: 'haiku', securityReview: 'fable', fix: 'opus', prCreate: 'haiku', baseMerge: 'opus' }
  assert.deepEqual(Object.keys(stages), AGENT_MODEL_STAGES, '7 段階すべてを網羅している')
  const judgment = /^(plan|impl|review|security-review|fix|pr-create|base-merge):#/
  const mech = (cs) => cs.filter((c) => !judgment.test(c.opts.label)).map((c) => [c.opts.label, Object.prototype.hasOwnProperty.call(c.opts, 'model') ? c.opts.model : '(なし)'])
  const run = (extra) => runScript({ args: { ...BASE_ARGS, securityReview: true, ...extra }, override: reviewNeedsFixOnce() })
  const base = await run({})
  const changed = await run({ models: stages })
  assert.ok(mech(base.calls).some(([l]) => l.startsWith('merge:#')), 'monitor（merge:#）が比較対象に入っている')
  assert.deepEqual(mech(changed.calls), mech(base.calls))
  // 判断を伴う段階は指定どおりに変わっている（比較が空振りしていない）。
  const m = modelsByLabel(changed.calls)
  assert.deepEqual([m.get('plan:#'), m.get('impl:#'), m.get('review:#')[0], m.get('security-review:#')[0], m.get('fix:#'), m.get('pr-create:#')], [['fable'], ['opus'], 'haiku', 'fable', ['opus'], ['haiku']])
})

test('結合: すべての段階を指定しても、呼び出しの順序と数は未指定のランと同じ（モデル以外は変えない）', async () => {
  const base = await runScript({ args: BASE_ARGS, override: reviewNeedsFixOnce() })
  // securityReview はセキュリティ専用の Review を有効にしたときだけ指定できる（security-review.test.mjs）。
  const all = Object.fromEntries(AGENT_MODEL_STAGES.filter((s) => s !== 'securityReview').map((s) => [s, 'opus']))
  const { calls } = await runScript({ args: { ...BASE_ARGS, models: all }, override: reviewNeedsFixOnce() })
  assert.deepEqual(calls.map((c) => c.opts.label), base.calls.map((c) => c.opts.label))
  const strip = (o) => { const { model, ...rest } = o; return rest }
  assert.deepEqual(calls.map((c) => strip(c.opts)), base.calls.map((c) => strip(c.opts)), 'model 以外の opts は同じ')
})

test('駆動部: 判断を伴う agent の呼び出しはすべて stageModelOpt を通し、sonnet の直書きが残らない', () => {
  // 同じ段階の agent が複数ある箇所（回復の Implement・Merge ループの fix・base 取り込み）は stub の
  // 結合テストで通らないため、ソース走査で配線を確かめる。
  const expect = [
    ['impl', 'implement', 2],
    ['review', 'review', 1],
    ['fix', 'fix', 2],
    ['pr-create', 'prCreate', 1],
    ['base-merge', 'baseMerge', 1],
  ]
  for (const [label, stage, n] of expect) {
    const re = new RegExp('label: `' + label + ':#\\$\\{item\\.number\\}`,\\s*phase: \'[A-Za-z]+\',\\s*\\.\\.\\.stageModelOpt\\(\'' + stage + '\', \'sonnet\'\\)', 'g')
    assert.equal((driverPart.match(re) ?? []).length, n, `${label} の呼び出し ${n} 件が stageModelOpt('${stage}', 'sonnet') を使う`)
    const hard = new RegExp('label: `' + label + ':#\\$\\{item\\.number\\}`,\\s*phase: \'[A-Za-z]+\',\\s*model:', 'g')
    assert.equal((driverPart.match(hard) ?? []).length, 0, `${label} に model の直書きが残っていない`)
  }
  assert.match(driverPart, /label: `plan:#\$\{item\.number\}`,\s*phase: 'Plan',\s*\.\.\.stageModelOpt\('plan'\),/, 'plan は既定なし（セッション継承）で stageModelOpt を使う')
})

test('結合: base 取り込みは既定で sonnet、models.baseMerge で変えられ、プロンプト（スクリプトの起動コマンド）と他の opts は変わらない', async () => {
  // #603 第 3 弾以降の base 取り込みは scripts/base-merge.sh を 1 回実行して結果を転記するだけの agent で、
  // 判断はスクリプトが行う。それでも models.baseMerge はモデルだけを変える（費用を下げる用途で残す）。
  const conflicting = (label) => (label.startsWith('merge:#')
    ? { state: 'conflicting', summary: 'mergeable: CONFLICTING', headSha: 'a'.repeat(40), unresolvedComments: [] }
    : undefined)
  const args = { ...BASE_ARGS, repo: 'Fandhe-AI/agent-cli-skills' }
  const base = await runScript({ args, override: conflicting })
  const low = await runScript({ args: { ...args, models: { baseMerge: 'haiku' } }, override: conflicting })
  const pick = (r) => r.calls.filter((c) => c.opts.label.startsWith('base-merge:#'))
  assert.equal(pick(base).length, 1)
  assert.equal(pick(base)[0].opts.model, 'sonnet')
  assert.equal(pick(low).length, 1)
  assert.equal(pick(low)[0].opts.model, 'haiku')
  assert.equal(pick(low)[0].prompt, pick(base)[0].prompt, 'モデルを変えてもプロンプトは同一')
  const { model: _a, ...baseRest } = pick(base)[0].opts
  const { model: _b, ...lowRest } = pick(low)[0].opts
  assert.deepEqual(lowRest, baseRest)
})

// ---------------------------------------------------------------------------
// 起動時の fail-closed（配布物 implement-issue-tree.js で検証）
// ---------------------------------------------------------------------------

const DIST = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.js'), 'utf8')
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

async function startup(args) {
  const calls = []
  const fn = new AsyncFunction('args', 'agent', 'log', 'phase', stripMetaExport(DIST))
  try {
    await fn(args, async (_p, opts) => { calls.push(opts.label); throw new Error('STOP') }, () => {}, () => {})
  } catch (e) {
    return { calls, message: e.message }
  }
  return { calls, message: 'returned' }
}

for (const [name, models] of [
  ['文字列', 'opus'],
  ['配列', ['opus']],
  ['未知のキー', { merge: 'opus' }],
  ['許可外の値', { plan: 'gpt-4' }],
]) {
  test(`起動時: models が${name}なら agent を呼ぶ前にエラーで止まる`, async () => {
    const r = await startup({ ...BASE_ARGS, models })
    assert.match(r.message, /args\.models/)
    assert.deepEqual(r.calls, [], 'agent を 1 回も呼ばない')
  })
}

test('起動時: 正しい models なら最初の agent 呼び出しまで進む', async () => {
  const r = await startup({ ...BASE_ARGS, models: { plan: 'fable', implement: 'opus', review: 'sonnet', fix: 'opus', prCreate: 'haiku', baseMerge: 'opus' } })
  assert.equal(r.message, 'STOP')
  assert.ok(r.calls.length >= 1)
})
