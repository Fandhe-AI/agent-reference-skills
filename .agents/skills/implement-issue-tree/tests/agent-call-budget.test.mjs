// Issue #592: Workflow ランタイムは 1 ラン 1,000 エージェントで打ち切り、打ち切りは completed として返る。
// 予算を持たないと PR 作成直後の未監視のままランが終わる。是正後の契約を固定する:
//   1. 駆動部が agent を数える関数へ差し替え、全 agent() 呼び出し（リトライ・フォールバック含む）を数える。
//   2. 残り呼び出し数が「実行中 × 目安 + 候補の目安 + 終了処理の予備」を下回ったら新規着手を止め、
//      実行中の issue は完了まで進める。止めた分は未着手（not-started）として理由付きで返す。
//   3. 上限が十分大きければ従来どおり全件着手する。
//   4. 上限での打ち切りで監視に進めなかった PR を返却値 unmonitoredPrs とログに出す。
//   5. args.agentCallLimit は新規着手を止める判断に使う想定値で、呼び出し自体は止めない。下限（81）未満と
//      1000 超は受理しない。超過時は最初の 1 回だけ警告し、呼び出しは続行する。
//
// 検証の二層構造: 定義部をスライス import して純粋関数を直接実行（単体）し、実装スクリプト全体を
// Workflow ランタイムと同じ評価形態（AsyncFunction。agent は引数）で stub agent に対して実行する（結合）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'
import { hashPrecheckReply, signedReply, wrapTreeReply } from './lib/signed-output.mjs'

const SCRIPT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.src.js')
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)

globalThis.args = { parent: 1 }
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-agent-budget-')))
const slicePath = join(sliceDir, 'implement-issue-tree-agent-budget-defs.mjs')
// 旧実装（修正前）にはこれらの宣言が無い。RED 確認用に typeof ガードで存在しない名前を undefined にする。
const SLICE_EXPORTS = [
  'AGENT_RUN_LIMIT', 'AGENT_CALLS_START', 'AGENT_CALLS_PER_ISSUE', 'AGENT_CALLS_TERMINAL_BASE', 'BLOCKED_STATE_CHUNK_SIZE',
  'parseAgentCallLimit', 'wrapAgentCounting', 'agentBudgetHold', 'sha256Hex', 'canonicalJson',
  'declaredDepsChecksum', 'outOfTreeStateChecksum', 'stopReasons', 'stopNote',
]
const optionalExports = SLICE_EXPORTS.map((n) => `const __opt_${n} = typeof ${n} === 'undefined' ? undefined : ${n}`).join('\n')
const exportList = SLICE_EXPORTS.map((n) => `__opt_${n} as ${n}`).join(', ')
globalThis.agent = async () => null
globalThis.log = () => {}
writeFileSync(slicePath, `${definitionPart}\n${optionalExports}\nexport { ${exportList} }\n`)
const mod = await import(pathToFileURL(slicePath).href)
const {
  AGENT_RUN_LIMIT, AGENT_CALLS_START, AGENT_CALLS_PER_ISSUE, AGENT_CALLS_TERMINAL_BASE, BLOCKED_STATE_CHUNK_SIZE,
  parseAgentCallLimit, wrapAgentCounting, agentBudgetHold, declaredDepsChecksum, outOfTreeStateChecksum, sha256Hex, canonicalJson,
  stopReasons, stopNote,
} = mod

// ---------------------------------------------------------------------------
// 単体
// ---------------------------------------------------------------------------

test('単体: 既定はランタイムの 1,000 件で、agentCallLimit は下限（開始処理 + 終了処理の予備 + 1 issue の目安 + 1）〜1000 に限る', () => {
  assert.equal(AGENT_RUN_LIMIT, 1000)
  const min = AGENT_CALLS_START + AGENT_CALLS_TERMINAL_BASE + AGENT_CALLS_PER_ISSUE.implement + 1
  assert.equal(min, 81)
  assert.equal(parseAgentCallLimit(undefined), 1000)
  assert.equal(parseAgentCallLimit(null), 1000)
  assert.equal(parseAgentCallLimit(min), min)
  assert.equal(parseAgentCallLimit(1000), 1000)
  for (const bad of [1, 0, -1, min - 1, 1001, 1.5, '100', true, NaN]) {
    assert.throws(() => parseAgentCallLimit(bad), /agentCallLimit/, String(bad))
  }
  assert.throws(() => parseAgentCallLimit(1), /81〜1000/, 'エラーメッセージに範囲を示す')
})

test('単体: wrapAgentCounting は呼び出す前に数え、null 返却・例外・引数をそのまま通す', async () => {
  const budget = { used: 0 }
  const seen = []
  const wrapped = wrapAgentCounting(async (p, o) => {
    seen.push([p, o])
    if (o.label === 'boom') throw new Error('x')
    return o.label === 'nil' ? null : { ok: true }
  }, budget)
  assert.deepEqual(await wrapped('p1', { label: 'a' }), { ok: true })
  assert.equal(await wrapped('p2', { label: 'nil' }), null)
  await assert.rejects(() => wrapped('p3', { label: 'boom' }), /x/)
  assert.equal(budget.used, 3, 'null 返却・例外も起動した 1 件として数える')
  assert.deepEqual(seen.map((s) => s[0]), ['p1', 'p2', 'p3'])
})

test('単体: 上限を超えると警告を最初の 1 回だけ出し、呼び出しは止めない', async () => {
  const budget = { limit: 3, used: 0 }
  const warns = []
  const wrapped = wrapAgentCounting(async () => 'ran', budget, (m) => warns.push(m))
  for (let i = 0; i < 3; i++) assert.equal(await wrapped('p', {}), 'ran')
  assert.deepEqual(warns, [], '上限ちょうどまでは警告しない')
  for (let i = 0; i < 4; i++) assert.equal(await wrapped('p', {}), 'ran', '超過後も呼び出しは実行される')
  assert.equal(warns.length, 1, '警告は 1 回だけ')
  assert.match(warns[0], /想定上限 3/)
  assert.equal(budget.used, 7)
})

test('単体: agentBudgetHold の式は「実行中 × 目安 + 候補の目安 + 終了処理の予備」', () => {
  const impl = AGENT_CALLS_PER_ISSUE.implement
  const base = { limit: 1000, used: 0 }
  // 未完了 100 件以下なら chunks は 1
  const need = (running, kind) => impl * running + AGENT_CALLS_PER_ISSUE[kind] + AGENT_CALLS_TERMINAL_BASE + 1
  assert.equal(agentBudgetHold(base, { running: 0, kind: 'implement', pending: 10 }), null)
  const exact = need(5, 'implement')
  assert.equal(agentBudgetHold({ limit: 1000, used: 1000 - exact }, { running: 5, kind: 'implement', pending: 100 }), null, '残りがちょうど必要量なら通る')
  const held = agentBudgetHold({ limit: 1000, used: 1000 - exact + 1 }, { running: 5, kind: 'implement', pending: 100 })
  assert.deepEqual(held, { remaining: exact - 1, required: exact, chunks: 1, needed: 1001 })
  // 実行中が減れば同じ使用量でも通る（非ラッチ）
  assert.equal(agentBudgetHold({ limit: 1000, used: 1000 - exact + 1 }, { running: 4, kind: 'implement', pending: 100 }), null)
  // 小さい種別（close / resume）は implement が通らない残りでも通り得る
  const tight = { limit: 1000, used: 1000 - need(0, 'close') }
  assert.equal(agentBudgetHold(tight, { running: 0, kind: 'close', pending: 100 }), null)
  assert.ok(agentBudgetHold(tight, { running: 0, kind: 'implement', pending: 100 }))
  // 未完了ノードが多いほど終了処理（blocked 一括記録の chunks）の予備が増える
  const many = agentBudgetHold({ limit: 1000, used: 0 }, { running: 0, kind: 'implement', pending: 1100 })
  assert.equal(many, null)
  const manyReq = agentBudgetHold({ limit: 1, used: 0, starts: 1 }, { running: 0, kind: 'implement', pending: 1100 }).required
  assert.equal(manyReq, impl + AGENT_CALLS_TERMINAL_BASE + Math.ceil(1100 / BLOCKED_STATE_CHUNK_SIZE))
})

test('単体: 生成元は agent() の呼び出し箇所を変えず、pipeline() も使わない（数え方が 1:1 で成り立つ前提）', () => {
  const dist = readFileSync(join(dirname(SCRIPT_PATH), 'implement-issue-tree.js'), 'utf8')
  assert.doesNotMatch(dist, /\bpipeline\(/, 'pipeline() が増えると agent() 呼び出し数とランタイムの数がずれる（コメント除去済みの生成物で検査）')
  assert.ok(driverPart.includes('agent = countedAgent'), '駆動部で agent を再束縛する')
  assert.ok(driverPart.includes('wrapAgentCounting(agent, agentBudget, log)'), '超過の警告をラン中のログへ出す')
  assert.ok(!definitionPart.includes('agent = countedAgent'), '定義部に置くとスライス import のテストが ReferenceError になる')
})

test('単体: 差し替えより前に agent() が呼ばれない（定義部にトップレベル await が無く、駆動部で差し替えが最初の await より前）', () => {
  assert.doesNotMatch(definitionPart, /^(await |(const|let|var) [^=\n]*= await |for await )/m, '定義部のトップレベルで agent() を呼ぶと数え漏れになる')
  const swap = driverPart.indexOf('agent = countedAgent')
  assert.ok(swap > 0)
  assert.ok(!/\bawait\b/.test(driverPart.slice(0, swap).replace(/\/\/.*$/gm, '')), '差し替えより前の駆動部に await が無い')
  // extractDeclaredDeps（定義部の関数。レート制限時に待って再試行する）も呼び出し時に束縛を解決するため、差し替え後の呼び出しは数えられる
  assert.ok(driverPart.indexOf('extractDeclaredDeps(chunks') > swap)
})

// ---------------------------------------------------------------------------
// 結合
// ---------------------------------------------------------------------------

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const scriptBody = stripMetaExport(source)

function buildTree(leaves) {
  const nodes = [{ number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: leaves.length }]
  leaves.forEach((n, i) => nodes.push({ number: n, title: `issue ${n}`, state: 'open', parent: 1, siblingIndex: i, dependsOn: [], subIssuesTotal: 0 }))
  return nodes
}

// 1 issue が plan → impl → review → pr-create → PR 照合 → monitor まで進む stub。monitor は blocked(quality)
// で終端させる（マージまで進める必要はなく、1 issue あたり約 10 回のエージェント呼び出しになる）。
// cutoffAfter: ランタイムの打ち切りを模して、この回数を超えた agent() は null を返す。
// 保存済み状態（照合用のハッシュ付き）。monitoring 再開の候補を作るために使う。
function stateVerifyFor(items) {
  const keys = Object.keys(items).sort()
  return {
    fileExists: true,
    hashes: Object.fromEntries(keys.map((k) => [k, sha256Hex(canonicalJson(items[k]))])),
    keysSha256: sha256Hex(canonicalJson(keys)),
    keysCount: keys.length,
    highWaterBytes: 0,
    highWaterVersion: 0,
  }
}
async function runScript({ args, leaves, cutoffAfter = Infinity, override = () => undefined, constAgent = false, saved = null, tree = null }) {
  const nodes = tree ?? buildTree(leaves)
  const calls = []
  const logs = []
  const inFlight = new Set()
  let peak = 0
  const handler = (prompt, opts) => {
    const label = opts.label
    const overridden = override(label, opts, prompt)
    if (overridden !== undefined) return overridden
    const n = Number(/#(\d+)/.exec(label)?.[1])
    if (label === 'nonce:seed') return { seedHex: 'b'.repeat(64) }
    if (label === 'script-hash-precheck') return hashPrecheckReply(prompt)
    if (label === 'worktree:untracked-scan') return { count: 0, paths: [] }
    if (label === 'state:load') return { ok: true, fileExisted: saved !== null, items: saved ?? {}, highWaterBytes: 0, highWaterVersion: saved ? 2 : 0 }
    if (label === 'state:load-verify') return saved === null ? { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 } : { ...stateVerifyFor(saved), highWaterVersion: 2 }
    if (label === 'plan:issue-tree') return wrapTreeReply(prompt, { nodes: structuredClone(nodes) })
    if (label === 'detect:external-checks') return { apps: [] }
    if (label.startsWith('plan:declared-deps')) {
      const m = /for n in ([0-9 ]+); do/.exec(prompt)
      return { entries: m[1].trim().split(' ').map(Number).map((x) => ({ number: x, deps: [], sig: declaredDepsChecksum(x, []) })) }
    }
    if (label.startsWith('plan:root-ancestors')) return { fetched: true, chain: [{ number: args.parent, parent: 0 }] }
    if (label.startsWith('plan:out-of-tree-deps')) {
      const m = /for n in ([0-9 ]+); do/.exec(prompt)
      return { entries: m[1].trim().split(' ').map(Number).map((x) => ({ number: x, state: 'OPEN', sig: outOfTreeStateChecksum(x, 'OPEN') })) }
    }
    if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }] }
    if (label === 'worktree:record-count') return { count: 1 }
    if (label.startsWith('plan:#')) { inFlight.add(n); peak = Math.max(peak, inFlight.size); return { plan: 'p', summary: 's' } }
    if (label.startsWith('impl:#')) return { branch: `feat/${n}-x`, summary: 's', worktreePath: `/repo/wt/${n}` }
    if (label.startsWith('review:#')) return { state: 'ok', highestSeverity: 'none', summary: 's', worktreePath: `/repo/wt/r${n}` }
    if (label.startsWith('pr-create:#')) return { prNumber: 1000 + n, summary: 's', worktreePath: `/repo/wt/p${n}`, checksStarted: true, mergeableAfterPush: 'MERGEABLE' }
    if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: 'a'.repeat(40), headRefName: `feat/${n}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [n] }
    if (label.startsWith('merge:#')) { inFlight.delete(n); return { state: 'blocked', blockedReason: 'quality', summary: '監視中断', unresolvedComments: [] } }
    if (label.startsWith('state:')) return { ok: true }
    return null
  }
  const agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    await Promise.resolve()
    if (calls.length > cutoffAfter) return null
    return handler(prompt, opts)
  }
  // constAgent: agent を再束縛できない実行環境（const 宣言）を模す。差し替えは TypeError になり enforced: false へ倒れる。
  const fn = constAgent
    ? new AsyncFunction('args', '__agent', 'log', 'phase', `const agent = __agent\n${scriptBody}`)
    : new AsyncFunction('args', 'agent', 'log', 'phase', scriptBody)
  const result = await fn(args, agent, (m) => { logs.push(m) }, () => {})
  return { result, calls, logs, peak }
}

const BASE_ARGS = { parent: 1, parallel: 1, maxResidualWorktrees: 0, maxResidualWorktreeBytes: 0, skillDir: '/opt/skills/implement-issue-tree' }
const LEAVES = [2, 3, 4, 5, 6, 7, 8, 9]

test('結合: 上限が十分大きければ従来どおり全件に着手し、予算による停止は起きない', async () => {
  const { result, calls } = await runScript({ args: BASE_ARGS, leaves: LEAVES })
  const planned = calls.filter((c) => c.opts.label.startsWith('plan:#')).map((c) => c.opts.label)
  assert.equal(planned.length, LEAVES.length, `全 ${LEAVES.length} 件が着手される: ${planned.join(',')}`)
  assert.equal(result.agentBudget.limit, 1000)
  assert.equal(result.agentBudget.enforced, true)
  assert.equal(result.agentBudget.stoppedDispatchAt, null)
  assert.equal(result.agentBudget.reached, false)
  assert.equal(result.agentBudget.used, calls.length, '返却値の used は stub が観測した起動数と一致する（数え方の 1:1）')
  assert.equal(result.notStarted.length, 0)
})

test('結合: 上限を小さくすると新規着手が止まり、着手済みの issue は完了まで進み、残りは理由付きの未着手になる', async () => {
  const { result, calls, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 120 }, leaves: LEAVES })
  const planned = calls.filter((c) => c.opts.label.startsWith('plan:#')).map((c) => Number(c.opts.label.slice(6)))
  const prCreated = calls.filter((c) => c.opts.label.startsWith('pr-create:#')).map((c) => Number(c.opts.label.slice(11)))
  assert.ok(planned.length >= 1 && planned.length < LEAVES.length, `一部だけ着手される: ${planned}`)
  assert.deepEqual(prCreated, planned, '着手した issue はすべて PR 作成まで進む（途中で止めない）')
  const monitored = calls.filter((c) => /^merge:#\d+$/.test(c.opts.label)).map((c) => Number(c.opts.label.slice(7)))
  assert.deepEqual(monitored, planned, '着手した issue はすべて監視まで進む')
  assert.deepEqual(result.unmonitoredPrs, [], '打ち切りではないので未監視の PR は無い')
  assert.equal(result.notStarted.length, LEAVES.length - planned.length + 1, '未着手 = 着手しなかった葉 + 子が終わらないため verify-close に進めない親 #1')
  assert.ok(result.agentBudget.stoppedDispatchAt !== null && result.agentBudget.stoppedDispatchAt <= 120)
  assert.equal(result.agentBudget.reached, false, '上限に達する前に止める')
  assert.ok(result.agentBudget.used <= 120, `使用 ${result.agentBudget.used} が上限 120 以内`)
  const notStartedEntries = result.done.filter((d) => d.status === 'not-started' && d.issue !== 1)
  assert.equal(notStartedEntries.length, LEAVES.length - planned.length)
  assert.ok(notStartedEntries.every((d) => d.note.includes('エージェント呼び出し数の予算不足')), '未着手の理由が予算不足と分かる')
  assert.ok(logs.some((l) => l.includes('新規着手を停止する') && l.includes('120')), '停止をログに出す')
  // 状態の一括記録（blocked）に予備を回せている: 打ち切られていれば最後の記録が欠ける
  assert.equal(result.blockedStateWrite.unwritten, 0)
})

test('結合: parallel の既存挙動を維持する（同時に実行中の issue は parallel 件まで。予算が十分なら全件着手）', async () => {
  const { result, peak, calls } = await runScript({ args: { ...BASE_ARGS, parallel: 3 }, leaves: LEAVES })
  assert.equal(result.parallel, 3)
  assert.equal(peak, 3, '3 件が同時に実行中になり、それを超えない')
  assert.equal(calls.filter((c) => c.opts.label.startsWith('plan:#')).length, LEAVES.length)
  assert.equal(result.agentBudget.stoppedDispatchAt, null)
})

test('結合: parallel 3 でも小さい上限では着手を絞り、実行中の分は完了させる', async () => {
  const { result, calls, peak } = await runScript({ args: { ...BASE_ARGS, parallel: 3, agentCallLimit: 130 }, leaves: LEAVES })
  const planned = calls.filter((c) => c.opts.label.startsWith('plan:#')).length
  const monitored = calls.filter((c) => /^merge:#\d+$/.test(c.opts.label)).length
  assert.ok(planned >= 3 && planned < LEAVES.length, `最初は 3 件並列で着手し、その後は絞られる: ${planned}`)
  assert.equal(monitored, planned, '着手した分はすべて監視まで進む')
  assert.ok(result.agentBudget.used <= 130 && !result.agentBudget.reached)
  assert.equal(peak, 3)
  assert.deepEqual(result.unmonitoredPrs, [])
})

test('結合: 上限で打ち切られ PR 作成後に監視へ進めなかった場合、未監視の PR 一覧が返却値とログに出る', async () => {
  // 1 つ目の issue が pr-create を返した直後に打ち切る: pr-create の呼び出し位置を先に測る。
  const probe = await runScript({ args: BASE_ARGS, leaves: [2] })
  const prCreateIndex = probe.calls.findIndex((c) => c.opts.label === 'pr-create:#2')
  assert.ok(prCreateIndex > 0)
  // 見積りが外れて予算ゲートをすり抜けた場合（実行中の issue が目安を超えて呼び出した場合）の打ち切りを模す。
  const { result, logs } = await runScript({ args: BASE_ARGS, leaves: [2], cutoffAfter: prCreateIndex + 1 })
  assert.deepEqual(result.unmonitoredPrs, [{ issue: 2, pr: 1002, resumable: false }], '状態の保存前に打ち切られた PR は再開できない')
  assert.ok(logs.some((l) => l.includes('未監視（状態ファイルに pr が無い／照合未了）') && l.includes('#2→PR #1002') && l.includes('手動確認')), '再開できない旨の案内を終了ログに出す')
  assert.ok(!logs.some((l) => l.includes('pr 保存済み')), '再開できる案内は出さない')
  assert.ok(logs.some((l) => l.includes('エージェント呼び出し数:')))
})

test('結合: 監視まで進んだ PR は未監視に載らない', async () => {
  const { result } = await runScript({ args: BASE_ARGS, leaves: [2, 3] })
  assert.deepEqual(result.unmonitoredPrs, [])
})

test('結合: 状態保存・照合が済んだ PR は resumable: true で「再実行で monitor から再開」と案内し、未了の PR とは案内が分かれる', async () => {
  // #2: monitor の直前で打ち切り(pr 保存済み) / #3: PR 照合が不成立 / #4: pr-create 直後の状態保存が失敗
  const probe = await runScript({ args: BASE_ARGS, leaves: [2] })
  const mergeIndex = probe.calls.findIndex((c) => c.opts.label === 'merge:#2')
  const saved = await runScript({ args: BASE_ARGS, leaves: [2], cutoffAfter: mergeIndex })
  assert.deepEqual(saved.result.unmonitoredPrs, [{ issue: 2, pr: 1002, resumable: true }], 'pr の保存まで済んでいれば再開できる')
  assert.ok(saved.logs.some((l) => l.includes('状態ファイルに pr 保存済み') && l.includes('#2→PR #1002') && l.includes('再実行すると monitor からの再開を試みる') && l.includes('状態ファイルに再開情報がある')) && !saved.logs.some((l) => /同じ引数で再実行すると *monitor/.test(l)))
  assert.ok(!saved.logs.some((l) => l.includes('pr が無い／照合未了')))

  const unbound = await runScript({
    args: BASE_ARGS,
    leaves: [3],
    override: (label) => (label.startsWith('pr-bind:#') ? { state: 'OPEN', headRefOid: 'a'.repeat(40), headRefName: 'other/branch', baseRefName: 'main', isCrossRepository: false, closingIssues: [] } : undefined),
  })
  assert.deepEqual(unbound.result.unmonitoredPrs, [{ issue: 3, pr: 1003, resumable: false }], '照合不成立の PR は再開できない')
  assert.ok(unbound.logs.some((l) => l.includes('pr が無い／照合未了') && l.includes('#3→PR #1003')))
  assert.ok(!unbound.logs.some((l) => l.includes('pr 保存済み')))

  let prCreated = false
  const unsaved = await runScript({
    args: BASE_ARGS,
    leaves: [4],
    override: (label) => {
      if (label.startsWith('pr-create:#')) { prCreated = true; return undefined }
      return prCreated && label.startsWith('state:update:#') ? { ok: false } : undefined
    },
  })
  assert.deepEqual(unsaved.result.unmonitoredPrs, [{ issue: 4, pr: 1004, resumable: false }], '保存に失敗した PR は再開できない')
  assert.ok(unsaved.logs.some((l) => l.includes('pr が無い／照合未了') && l.includes('#4→PR #1004')))
})

test('結合: monitoring 保存が失敗しても blocked の退避保存で pr を書けたら resumable: true、退避も失敗なら false のまま', async () => {
  // monitoring 遷移（status: monitoring）の書き込みだけを失敗させ、退避の blocked + pr 保存の成否を切り替える。
  // 次回ランの isActiveMonitoring は status が monitoring / blocked かつ pr > 0 かつ branch が issue の命名で再開する。
  const run = (fallbackOk) => {
    let prCreated = false
    return runScript({
      args: BASE_ARGS,
      leaves: [2],
      override: (label, _opts, prompt) => {
        if (label.startsWith('pr-create:#')) { prCreated = true; return undefined }
        if (!prCreated || !label.startsWith('state:update:#')) return undefined
        if (prompt.includes('"status":"monitoring"')) return { ok: false }
        if (prompt.includes('"pr":1002') && prompt.includes('"status":"blocked"')) return fallbackOk ? undefined : { ok: false }
        return undefined
      },
    })
  }
  const saved = await run(true)
  assert.deepEqual(saved.result.unmonitoredPrs, [{ issue: 2, pr: 1002, resumable: true }], '退避保存で pr を書けたので次回は再開できる')
  assert.ok(saved.logs.some((l) => l.includes('状態ファイルに pr 保存済み') && l.includes('#2→PR #1002')))
  assert.ok(!saved.logs.some((l) => l.includes('pr が無い／照合未了')))
  assert.ok(saved.logs.some((l) => l.includes('monitoring 遷移') || l.includes('マージ監視へ進まず停止')), '前提: monitoring 保存の失敗経路を通っている')

  const unsaved = await run(false)
  assert.deepEqual(unsaved.result.unmonitoredPrs, [{ issue: 2, pr: 1002, resumable: false }], '退避保存も失敗なら再開できない')
  assert.ok(unsaved.logs.some((l) => l.includes('pr が無い／照合未了') && l.includes('#2→PR #1002')))
  assert.ok(!unsaved.logs.some((l) => l.includes('pr 保存済み')))
})

test('結合: agent を再束縛できない（enforced: false）ときは予算ゲートを適用せず、上限が小さくても全件に着手する', async () => {
  const { result, calls, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, leaves: LEAVES, constAgent: true })
  assert.equal(result.agentBudget.enforced, false)
  assert.equal(result.agentBudget.used, 0, '数えられていない')
  assert.equal(result.agentBudget.stoppedDispatchAt, null)
  assert.equal(calls.filter((c) => c.opts.label.startsWith('plan:#')).length, LEAVES.length, '全件着手される')
  assert.equal(result.notStarted.length, 0)
  assert.ok(logs.some((l) => l.includes('予算ゲートは無効')))
})

test('単体: 最初の 1 件は blocked 一括記録の chunks 分を課されず、2 件目以降は課される（未完了が多くても前進できる）', () => {
  const budget = { limit: 81, used: 20, starts: 0 }
  const first = agentBudgetHold(budget, { running: 0, kind: 'implement', pending: 3101 })
  assert.equal(first, null, '実行中 0・未着手の最初の 1 件は chunks 32 を課さず着手できる（30 + 20 = 50 <= 残り 61）')
  const second = agentBudgetHold({ ...budget, starts: 1 }, { running: 0, kind: 'implement', pending: 3101 })
  assert.deepEqual(second, { remaining: 61, required: 30 + 20 + 32, chunks: 32, needed: 20 + 30 + 20 + 32 }, '1 件着手した後は chunks 分を課す（観測値 needed には 1 回だけ含む）')
  assert.ok(agentBudgetHold({ ...budget, used: 40 }, { running: 0, kind: 'implement', pending: 3101 }), '残りが最初の 1 件の目安にも足りなければ止める')
})

test('結合: 未完了ノードが多く limit が下限に近いときも、最初の 1 件は着手して完了まで進め、残りは未着手になる', async () => {
  const many = Array.from({ length: 400 }, (_, i) => 2 + i)
  const { result, calls } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, leaves: many })
  const planned = calls.filter((c) => c.opts.label.startsWith('plan:#')).length
  const monitored = calls.filter((c) => /^merge:#\d+$/.test(c.opts.label)).length
  assert.equal(planned, 1, `前進保証で 1 件だけ着手する: ${planned}`)
  assert.equal(monitored, 1, '着手した 1 件は監視まで進む')
  assert.equal(result.notStarted.length, many.length - 1 + 1, '残りの葉と親 #1 は未着手')
  assert.ok(result.agentBudget.stoppedDispatchAt !== null)
})

// ---------------------------------------------------------------------------
// Bugbot 指摘の是正（Issue #592 の followup）
// ---------------------------------------------------------------------------

// agentCallLimit を掃引して、予算ゲートが実際に効いた（新規着手停止のログが出た）ランだけを検査対象にする。
// 単一の limit を決め打ちすると、開始処理の呼び出し数が変わっただけで検査が空振りするため。
async function sweepLimits(limits, makeRun) {
  const hit = []
  for (const limit of limits) {
    const run = await makeRun(limit)
    if (run.logs.some((l) => l.includes('新規着手を停止する'))) hit.push({ limit, ...run })
  }
  return hit
}
const EXTRA_WORKTREES = [
  { path: '/repo', branch: 'main', isMain: true },
  { path: '/repo/wt/x1', branch: 'misc/a', isMain: false },
  { path: '/repo/wt/x2', branch: 'misc/b', isMain: false },
]
const MANY = Array.from({ length: 1000 }, (_, i) => 2 + i)

test('結合: 残置 worktree 上限の新規着手抑止があるとき、予算の not-started note で本当の理由を上書きしない (Bugbot A)', async () => {
  // 1,000 件のツリーは開始処理だけで約 35 回使う（ループ開始時点の使用量。最初の保留ログの「使用 N」で実測。依存宣言のチャンク分）ため、下限付近の limit では最初の候補から予算で止まる。
  const hit = await sweepLimits([81, 90, 100], (limit) => runScript({
    args: { ...BASE_ARGS, maxResidualWorktrees: 1, agentCallLimit: limit },
    leaves: MANY,
    override: (label) => (label === 'worktree:orphan-scan' ? { entries: EXTRA_WORKTREES } : undefined),
  }))
  assert.ok(hit.length > 0, '予算ゲートが効いたランが 1 つ以上ある（検査が空振りしていない）')
  for (const { limit, result } of hit) {
    const notes = result.done.filter((d) => d.status === 'not-started').map((d) => d.note)
    assert.ok(notes.length > 0, `limit ${limit}: 未着手がある`)
    assert.ok(notes.every((t) => t.startsWith('残置 worktree 上限ゲートにより新規着手を抑止')), `limit ${limit}: 抑止の理由が先頭に残る（予算の断片は後ろに併記される）: ${notes[0]}`)
    assert.ok(notes.every((t) => !soleBudget(t)), `limit ${limit}: 再実行しても解けない抑止を、予算だけが理由の保留として案内しない: ${notes[0]}`)
  }
})

// ---------------------------------------------------------------------------
// 予算枯渇は「ループ前」ではなく「ランの終了時点」で判定する（#596 の Bugbot 指摘 3 件）
// ---------------------------------------------------------------------------
// ループ前の検査は、ループ中にしか分からない着手可否（monitoring 再開の worktree ゲート、ラン中に ready に
// なる前提解消後のノード）を断定して throw していた。終了時に「このランで 1 件も着手せず（starts === 0）、
// 予算だけが理由の保留ノードがある」を starved として判定し、throw せずに必要な最小値を返す。

const OOT = 9999
const batchCalls = (calls) => calls.filter((c) => /^state:update-batch:\d+$/.test(c.opts.label))
// blocked 一括記録のプロンプトから { 番号 → patch } を復元する（状態ファイルへ保存される note の文言を確かめる）。
function patchesFromBatchCalls(calls) {
  const out = {}
  for (const c of batchCalls(calls)) {
    for (const g of JSON.parse(c.prompt.split('\n').find((l) => l.startsWith('[{"numbers"')))) {
      for (const n of g.numbers) out[n] = g.patch
    }
  }
  return out
}
const notStartedNotes = (result) => result.done.filter((d) => d.status === 'not-started').map((d) => d.note)
const noteOf = (result, issue) => result.done.find((d) => d.issue === issue)?.note ?? ''
// 保存済みの monitoring 状態（PR #1000+n・ブランチ feat/n-x）。monitoring 再開の候補になる。
const resumeSaved = (n) => ({ type: 'implement', status: 'monitoring', pr: 1000 + n, branch: `feat/${n}-x`, worktree: '', fixCount: 0 })
// 保存済みの merged だが再開情報（pr）が無い葉。GitHub 上は open のため failedSet に入り、完了を検証できない前提として扱われる。
const mergedNoResume = { type: 'implement', status: 'merged', pr: 0, branch: '', worktree: '', fixCount: 0 }
// 残置 worktree が上限ちょうど（1 件）。新規着手は latch されないが、予約込みの projected が上限を超えるため monitoring 再開は defer される。
const ONE_EXTRA_WORKTREE = [
  { path: '/repo', branch: 'main', isMain: true },
  { path: '/repo/wt/x1', branch: 'misc/a', isMain: false },
]
const withOneExtraWorktree = (label) => {
  if (label === 'worktree:orphan-scan') return { entries: ONE_EXTRA_WORKTREE }
  if (label === 'worktree:record-count') return { count: ONE_EXTRA_WORKTREE.length }
  return undefined
}
// 親 #1 の配下: 着手できる葉（ready）、ツリー外前提待ちの葉（pad。開始処理の呼び出し数を増やすだけで着手しない）、
// #10（verify-close）とその子 #11。#11 を mergedNoResume にすると #11 が failedSet に入り、#10 は前提プローブの対象になる。
function budgetTree({ ready = [], pad = 1000 }) {
  const kids = [
    ...ready.map((number) => ({ number, parent: 1, dependsOn: [] })),
    ...Array.from({ length: pad }, (_, i) => ({ number: 100 + i, parent: 1, dependsOn: [OOT] })),
    { number: 10, parent: 1, dependsOn: [] },
  ]
  const node = (number, parent, siblingIndex, dependsOn, subIssuesTotal) => ({ number, title: number === 1 ? 'root' : `issue ${number}`, state: 'open', parent, siblingIndex, dependsOn, subIssuesTotal })
  return [
    node(1, 0, 0, [], kids.length),
    ...kids.map((k, i) => node(k.number, 1, i, k.dependsOn, k.number === 10 ? 1 : 0)),
    node(11, 10, 0, [], 0),
  ]
}
const closedProbe = (label) => (label === 'prereq:probe'
  ? { results: [{ issue: 11, issueState: 'CLOSED', prState: 'NONE', pr: 0, headRefName: '', baseRefName: '', isCrossRepository: true, closingIssues: [-1] }] }
  : undefined)
const callsBefore = (calls, pred) => calls.findIndex((c) => pred(c.opts.label))
// 予算保留の note は、次ランの挙動を予測せず、保留した時点についての事実だけを書く（Issue #600 の追加是正）。
//   「エージェント呼び出し数の予算不足で保留（保留時の使用 U/L、必要量 R。このランの着手 K 件）。保留した時点では args.agentCallLimit が N 以上なら
//    予算検査を通った（次ランの必要量は、開始処理・先に着手するノード・ゲート実測で変わる）」
// N = 保留時の使用量 U + 必要量 R（ゲートが実際に使ったしきい値。上乗せしない）。N が 1000 を超えるときは「（指定できる上限 1000 を超える）」を添える。
const BUDGET_MARK = 'エージェント呼び出し数の予算不足で保留'
const heldN = (note) => {
  const m = /args\.agentCallLimit が (\d+) 以上なら予算検査を通った/.exec(note)
  return m ? Number(m[1]) : null
}
const heldUsed = (note) => {
  const m = /保留時の使用 (\d+)\//.exec(note)
  return m ? Number(m[1]) : null
}
const heldRequired = (note) => {
  const m = /必要量 (\d+)。/.exec(note)
  return m ? Number(m[1]) : null
}
// 予算だけが理由の note: 予算の断片があり、halt・ラッチ・前提待ち・ゲート（前回の評価）の断片が無い。
const soleBudget = (t) => t.includes(BUDGET_MARK) && !/halted により|halt のため|残置 worktree 上限ゲートにより|が未完了のため待機|は完了していない（失敗|前回の評価/.test(t)
// 次ランの予測・言い切り・下限・上乗せの語を使わない（生成される全 note・終了ログの回帰検査に使う）。
const PREDICTION = /同じ引数で再実行すると *(着手|再開|monitor)|分割|下限値|少なくとも|余裕を見た|にして再実行/
const LEGACY_PHRASE = /同じ引数で再実行すると *(着手|再開|monitor)|余裕を見た|下限値|にして再実行/
function assertNoPrediction(text, where) {
  assert.doesNotMatch(text, PREDICTION, `${where}: 次ランの予測・言い切りを書かない: ${text}`)
}
// 予算の断片（併記形でも最後に置かれる）が、保留した時点の事実だけで書かれていること。
function assertBudgetFragment(note, limit, where) {
  assert.ok(note.includes(BUDGET_MARK), `${where}: 予算の断片がある: ${note}`)
  const frag = note.slice(note.indexOf(BUDGET_MARK))
  assertNoPrediction(frag, where)
  const n = heldN(note)
  assert.ok(Number.isInteger(n) && n > limit, `${where}: 保留である限りしきい値 N は limit より大きい（N ${n} / limit ${limit}）: ${frag}`)
  assert.ok(frag.includes(`args.agentCallLimit が ${n} 以上なら予算検査を通った`) && frag.includes('必要量 ') && frag.includes('このランの着手 '), `${where}: ${frag}`)
  assert.equal(frag.includes('（指定できる上限 1000 を超える）'), n > AGENT_RUN_LIMIT, `${where}: 1000 超の事実の添え: ${frag}`)
  assert.equal(n, heldUsed(frag) + heldRequired(frag), `${where}: N = 保留時の使用量 + 必要量（上乗せしない）: ${frag}`)
}
const planned = (run, n) => run.calls.some((c) => c.opts.label.startsWith(`plan:#${n}`))
// 閉じた状態にしたノード（再実行では完了済みの verify-close とその子）。
const withClosed = (tree, numbers) => tree.map((nd) => (numbers.includes(nd.number) ? { ...nd, state: 'closed' } : nd))

test('結合: 開始処理で予算を使い切り最初の 1 件も着手できなくても throw せず、starved と観測値を返し、保存される note も保留時の観測値を報告する (Bugbot D → 終了時判定)', async () => {
  const { result, calls, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, leaves: MANY })
  const a = result.agentBudget
  assert.equal(a.starved, true)
  assert.equal(a.starts, 0, '1 件も着手していない')
  assert.ok(!calls.some((c) => c.opts.label.startsWith('plan:#')), '何も着手していない')
  const notes = notStartedNotes(result).filter(soleBudget)
  assert.ok(notes.length >= MANY.length, `予算で保留した葉 ${MANY.length} 件が対象（子待ちの親 #1 は予算の保留ではない）: ${notes.length}`)
  for (const t of notes) assertBudgetFragment(t, 81, '未着手の note')
  // (a) N は保留時の記録から導かれる: N = 保留時の使用 + required。最初の 1 件（first）は required から chunks 項を免除され、ゲートが実際に使った
  // 必要量は 実装の目安 + 終了処理の予備 = 50。N にはこれに上乗せしない（chunks 項は観測値 held[].chunks として別に返す）。
  for (const t of notes) assert.equal(heldN(t) - heldUsed(t), AGENT_CALLS_PER_ISSUE.implement + AGENT_CALLS_TERMINAL_BASE, `N = 保留時の使用 + ゲートが使った必要量（上乗せしない）: ${t}`)
  assert.equal(a.held[0].chunks, Math.ceil((MANY.length + 1) / BLOCKED_STATE_CHUNK_SIZE), 'chunks は観測値として返す（未完了 = 葉 1000 + 親 #1 = 1001 件）')
  const startUsed = heldUsed(notes[0])
  assert.ok(startUsed > AGENT_CALLS_START, `開始処理の見積り ${AGENT_CALLS_START} を超えて使っている（${startUsed}）ことが前提`)
  assert.equal(logs.find((l) => l.includes('新規着手を停止する')).match(/使用 (\d+)/)[1], String(startUsed), '保留 note の使用量は保留時の記録（最初の保留ログの使用量と一致）')
  assert.equal(a.neededLimit, heldN(notes[0]), 'neededLimit = 予算だけが理由の保留ノードの観測値 N の最小値')
  // 次ランの予測は書かない。保存される blocked の note も同じ報告にする。
  const saved = Object.values(patchesFromBatchCalls(calls)).filter((p) => soleBudget(p.note))
  assert.ok(saved.length >= MANY.length && saved.every((p) => heldN(p.note) === a.neededLimit), '保存される blocked の note も同じ観測値')
  assertStarvedConsistent(result, '開始処理で使い切る', logs)
  // しきい値の事実（同じ状態・同じ周回についての検査。次ランの予測ではない）: limit が N なら最初の 1 件は予算検査を通り、N - 1 では保留される。
  const pass = await runScript({ args: { ...BASE_ARGS, agentCallLimit: a.neededLimit }, leaves: MANY })
  assert.ok(planned(pass, 2) && pass.result.agentBudget.starts === 1, `limit ${a.neededLimit}（N）では最初の 1 件が予算検査を通る`)
  const below = await runScript({ args: { ...BASE_ARGS, agentCallLimit: a.neededLimit - 1 }, leaves: MANY })
  assert.ok(!planned(below, 2) && below.result.agentBudget.starved, `limit ${a.neededLimit - 1}（N - 1）では保留される`)
})
test('結合: 開始処理が小さいツリーでは starved にならず従来どおり着手する (Bugbot D 対照)', async () => {
  const { result, calls } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, leaves: LEAVES })
  assert.ok(calls.some((c) => c.opts.label.startsWith('plan:#')))
  assert.equal(result.agentBudget.starved, false)
  assertStarvedConsistent(result, '開始処理が小さいツリー')
})

// 再開（目安 12 + 予備 20 = 32）は収まり、実装（30 + 20 = 50）は収まらない残りになる limit だけを集める
// （開始処理の呼び出し数が変わっても検査が空振りしないよう掃引する。空振りは呼び出し側が失敗にする）。
const deferredResumeRuns = async () => {
  const hits = []
  for (let limit = 81; limit <= 100; limit++) {
    const run = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktrees: 1, agentCallLimit: limit },
      leaves: MANY,
      saved: { 2: resumeSaved(2) },
      override: withOneExtraWorktree,
    })
    if (run.logs.some((l) => l.includes('#2:') && l.includes('monitoring 再開を defer')) && run.logs.some((l) => l.includes('新規着手を停止する'))) hits.push({ limit, ...run })
  }
  return hits
}

test('結合: 中断した monitor ノードの終了ログは再開可否を断定せず、同じノードの note・集計ログと矛盾しない (Bugbot Low 指摘)', async () => {
  const hits = await deferredResumeRuns()
  assert.ok(hits.length > 0, '再開が defer されて中断として残るランが 1 つ以上ある')
  for (const { limit, result, logs } of hits) {
    const own = logs.filter((l) => l.startsWith('#2: ') && l.includes('再開情報を保持'))
    assert.equal(own.length, 1, `limit ${limit}: 中断ノードの終了ログは 1 行: ${JSON.stringify(own)}`)
    assert.ok(own[0].includes('monitor 中断のまま'), `limit ${limit}: 事実（monitor 中断のまま終了）を書く: ${own[0]}`)
    assert.ok(!own[0].includes('再開できない'), `limit ${limit}: 再開不可を断定しない: ${own[0]}`)
    assert.ok(logs.some((l) => l.startsWith('monitor 再開可能な中断:') && l.includes('#2')), `limit ${limit}: 集計ログは再開可能な中断として #2 を数える`)
    const note = noteOf(result, 2)
    assert.ok(!note.includes('再開できない'), `limit ${limit}: note も再開不可を断定しない: ${note}`)
  }
})

test('結合: 予算に収まる monitoring 再開が worktree ゲートで defer されて 1 件も着手しないランも throw せず starved になる (Bugbot 指摘 1)', async () => {
  const hits = await deferredResumeRuns()
  assert.ok(hits.length > 0, '再開は予算を通って worktree ゲートで defer され、実装は予算で保留されるランが 1 つ以上ある')
  for (const { limit, result, calls, logs } of hits) {
    assert.ok(logs.some((l) => l.includes('#2: monitor 中断のまま終了（状態 monitoring')) && !logs.some((l) => l.includes('halt 時も')), `limit ${limit}: halt していないランの終了ログに「halt 時も」と書かない（理由は note にある）`)
    const a = result.agentBudget
    assert.equal(a.starts, 0, `limit ${limit}: 再開は defer され、実装は予算で保留され、1 件も着手しない`)
    assert.equal(a.starved, true, `limit ${limit}`)
    const notes = notStartedNotes(result).filter(soleBudget)
    assert.ok(notes.length > 0 && notes.every((t) => heldN(t) === a.neededLimit), `limit ${limit}: 実装の保留は同じ観測値 N を報告する: ${notes[0]}`)
    for (const t of notes) assertBudgetFragment(t, limit, `limit ${limit}`)
    assert.equal(a.neededLimit - heldUsed(notes[0]), AGENT_CALLS_PER_ISSUE.implement + AGENT_CALLS_TERMINAL_BASE, `limit ${limit}: 観測値 = 保留時の使用 + 実装 1 件に要る量（予算で保留されていない再開 #2 は数えない）`)
    assert.ok(result.interrupted.includes(2), `limit ${limit}: 再開 #2 は中断として残る`)
    assert.ok(noteOf(result, 2).includes('worktree') && !noteOf(result, 2).includes('予算'), `limit ${limit}: 再開 #2 の note は worktree ゲートの理由のまま: ${noteOf(result, 2)}`)
    const saved = Object.values(patchesFromBatchCalls(calls)).filter((p) => soleBudget(p.note))
    assert.ok(saved.length > 0 && saved.every((p) => heldN(p.note) === a.neededLimit), `limit ${limit}: 保存される note も同じ観測値`)
    assertStarvedConsistent(result, `limit ${limit}`, logs)
  }
})

test('結合: ラン中に ready になった安価な verify-close は、開始時に実装が予算で保留されていても着手できる（ループ前で止まらない）(Bugbot 指摘 2)', async () => {
  // 実装（50）は収まらず verify-close（6 + 20 = 26）は収まる残りになる limit だけを検査対象にする（掃引。空振りは失敗）。
  const hits = []
  for (let limit = 81; limit <= 100; limit++) {
    const run = await runScript({
      args: { ...BASE_ARGS, agentCallLimit: limit },
      tree: budgetTree({ ready: [3, 4, 5] }),
      saved: { 11: mergedNoResume },
      override: closedProbe,
    })
    if (run.logs.some((l) => l.includes('新規着手を停止する')) && !run.calls.some((c) => c.opts.label.startsWith('plan:#'))) hits.push({ limit, ...run })
  }
  assert.ok(hits.length > 0, '実装が予算で一度も着手されないランが 1 つ以上ある')
  for (const { limit, result, calls, logs } of hits) {
    assert.ok(!calls.some((c) => c.opts.label.startsWith('plan:#')), `limit ${limit}: 実装は予算で着手されない`)
    assert.ok(logs.some((l) => l.includes('#10 を開始')), `limit ${limit}: プローブで前提が解消された後に #10（verify-close）が着手される`)
    assert.equal(result.agentBudget.starts, 1, `limit ${limit}`)
    assert.equal(result.agentBudget.starved, false, `limit ${limit}: 1 件でも着手したランは starved ではない`)
    const notes = notStartedNotes(result).filter(soleBudget)
    assert.ok(notes.length > 0, `limit ${limit}: 予算で保留した実装がある`)
    for (const t of notes) assertBudgetFragment(t, limit, `limit ${limit}`)
    assertStarvedConsistent(result, `limit ${limit}`, logs)
    // 経路 A: 別のノード（#10）が着手して starts = 1 になっても、保留した実装の note は「同じ引数で進む」と言わない。
    // 次ラン（#10 は closed）の消費は予測せず、保留時の観測だけを報告する。
    assert.ok(!noteOf(result, 3).includes('同じ引数'), `limit ${limit}: ${noteOf(result, 3)}`)
  }
})

test('結合: 再開と実装が同時に予算保留のとき、各ノードの note は自ノードの保留時の観測値を言う（種別をまたいだ最小値を言わない）(Issue #600 追加是正)', async () => {
  // 開始処理で使い切って再開 #2（目安 12）も実装 #3（目安 30）も保留される。neededLimit は #2 の観測値（予算だけが理由の保留の最小値）。
  const tree = budgetTree({ ready: [2, 3], pad: 1600 })
  const { result, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, tree, saved: { 2: resumeSaved(2) } })
  const a = result.agentBudget
  assert.equal(a.starved, true, '前提: 1 件も着手しない')
  const n2 = noteOf(result, 2)
  const n3 = noteOf(result, 3)
  assert.ok(soleBudget(n2) && soleBudget(n3), `${n2} / ${n3}`)
  assert.deepEqual(a.held.filter((h) => h.issue <= 3).map((h) => [h.issue, h.resume]), [[2, true], [3, false]], '種別は held の行が持つ（note は動詞を使わず、保留時の事実だけを書く）')
  assert.equal(heldUsed(n2), heldUsed(n3), '両方とも first の評価（実行中 0・着手 0）で、使用量は同じ')
  assert.equal(heldN(n3) - heldN(n2), AGENT_CALLS_PER_ISSUE.implement - AGENT_CALLS_PER_ISSUE.resume, '#3 の観測値は #2 より実装と再開の目安の差だけ大きい')
  assert.equal(a.neededLimit, heldN(n2), 'neededLimit は予算だけが理由の保留ノードの観測値の最小値（= #2）')
  assert.ok(logs.some((l) => l.includes('予算不足で 1 件も着手していない') && l.includes(`args.agentCallLimit が ${a.neededLimit} 以上なら予算検査を通った`)), '終了ログは neededLimit の行（#2）と同じ断片を出す')
  assertStarvedConsistent(result, '再開と実装の同時保留', logs)
})
test('結合: 予算で保留した monitoring 再開の note は、前回評価したゲートの理由を消さず、予算の不足と併記する (Issue #598 指摘 3。#596 の「ゲート理由を消す」を反転)', async () => {
  const mk = (limit) => ({
    args: { ...BASE_ARGS, maxResidualWorktrees: 1, agentCallLimit: limit },
    tree: budgetTree({ ready: [2], pad: 1600 }),
    saved: { 2: resumeSaved(2), 11: mergedNoResume },
    override: (label, ...rest) => withOneExtraWorktree(label) ?? closedProbe(label, ...rest),
  })
  // 較正: 周回 1 の時点（前提プローブの直前）の使用量。残りが再開 #2（目安 12 + 予備 20 = 32）にちょうど足りる limit にする。
  // 周回 1: #2 は予算を通り worktree ゲートで defer される（理由を記録）。#10 は前提待ち。続く前提プローブと状態更新で残りが 32 を割り、
  // 周回 2: #2 は予算で保留される。#10（verify-close）はプローブで ready になり 26 に収まるので着手する。
  const probe = await runScript(mk(1000))
  const loopUsed = callsBefore(probe.calls, (l) => l === 'prereq:probe')
  assert.ok(loopUsed > 0)
  const limit = loopUsed + AGENT_CALLS_PER_ISSUE.resume + AGENT_CALLS_TERMINAL_BASE
  assert.ok(limit >= 81, `limit ${limit} は下限以上（パディングの葉を増やして開始処理の使用量を上げる）`)
  const { result, logs } = await runScript(mk(limit))
  assert.ok(logs.some((l) => l.includes('#2:') && l.includes('monitoring 再開を defer')), '前提: 周回 1 で worktree ゲートの理由が記録される')
  assert.ok(logs.some((l) => l.includes('新規着手を停止する')), '前提: 周回 2 で #2 は予算で保留される')
  assert.equal(result.agentBudget.starts, 1, '#10 は着手する')
  assert.ok(result.interrupted.includes(2))
  const note = noteOf(result, 2)
  // 周回 2 のゲートは予算が足りないため評価されない（ゲートの実測 du・df は自身がエージェントを呼ぶ）。残るのは周回 1 の観測。
  assert.ok(note.includes('monitoring 再開を defer した'), `前回評価したゲートの理由を残す: ${note}`)
  assert.ok(note.includes('前回の評価') && note.includes('再評価していない'), `ゲートが今回未評価と分かる: ${note}`)
  assert.ok(note.includes(BUDGET_MARK) && !soleBudget(note), `予算の保留も併記する（予算だけが理由とは扱わない）: ${note}`)
  assertBudgetFragment(note, limit, '前回のゲート + 予算')
})

test('結合: ゲートの理由が残る monitoring 再開は予算だけが理由ではないため、1 件も着手しないランでも starved / neededLimit に数えない (Issue #598 指摘 3)', async () => {
  // #2 は周回 1 で予算を通り worktree ゲートで defer される。前提プローブで使用量が増えた周回 2 では予算で保留される。
  // #10 は ツリー外前提待ちのままなので着手せず、ラン全体で 1 件も着手しない。保留は #2 だけ（実装の葉は居ない）。
  const kid = (number, dependsOn, subIssuesTotal = 0, parent = 1, siblingIndex = 0) => ({ number, title: `issue ${number}`, state: 'open', parent, siblingIndex, dependsOn, subIssuesTotal })
  const tree = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 1602 },
    kid(2, [], 0, 1, 0),
    ...Array.from({ length: 1600 }, (_, i) => kid(100 + i, [OOT], 0, 1, 1 + i)),
    kid(10, [OOT], 1, 1, 1601),
    kid(11, [], 0, 10, 0),
  ]
  const mk = (limit) => ({
    args: { ...BASE_ARGS, maxResidualWorktrees: 1, agentCallLimit: limit },
    tree,
    saved: { 2: resumeSaved(2), 11: mergedNoResume },
    override: (label, ...rest) => withOneExtraWorktree(label) ?? closedProbe(label, ...rest),
  })
  const probe = await runScript(mk(1000))
  const limit = callsBefore(probe.calls, (l) => l === 'prereq:probe') + AGENT_CALLS_PER_ISSUE.resume + AGENT_CALLS_TERMINAL_BASE
  assert.ok(limit >= 81)
  const { result, logs } = await runScript(mk(limit))
  assert.ok(logs.some((l) => l.includes('#2:') && l.includes('monitoring 再開を defer')), '前提: 周回 1 でゲートの理由が記録される')
  assert.ok(logs.some((l) => l.includes('新規着手を停止する')), '前提: 周回 2 で #2 は予算で保留される')
  assert.equal(result.agentBudget.starts, 0, '前提: 1 件も着手しない')
  assert.ok(result.interrupted.includes(2))
  assert.equal(result.agentBudget.starved, false, '上限を上げても worktree ゲートで止まり得るため、予算だけが理由の停滞ではない')
  assert.equal(result.agentBudget.neededLimit, null)
  const note = noteOf(result, 2)
  assert.ok(note.includes(BUDGET_MARK) && note.includes('monitoring 再開を defer した') && !soleBudget(note), note)
  assertBudgetFragment(note, limit, '前回のゲート + 予算')
})

test('結合: halt が立ったあとも、予算で保留した monitoring 再開の note から予算の事実を落とさず、「同じ引数で再実行すれば再開する」とだけは書かない (Issue #598 指摘 2)', async () => {
  // #9 は保存済みの monitoring。実装 3 件（#2〜#4）の着手中に評価されて予算で保留され、その後 3 件の実装が失敗して halt し、
  // 再評価されないまま残る。失敗する実装の呼び出し数を増やすため、状態書込みも未返却（sonnet へフォールバック = 2 回）にする。
  const hits = []
  for (let limit = 100; limit <= 140; limit++) {
    const run = await runScript({
      args: { ...BASE_ARGS, parallel: 3, agentCallLimit: limit },
      leaves: LEAVES,
      saved: { 9: resumeSaved(9) },
      override: (label) => (label.startsWith('impl:#') || label.startsWith('state:update:#') ? null : undefined),
    })
    if (run.result.halted && run.result.interrupted.includes(9) && noteOf(run.result, 9).includes(BUDGET_MARK)) hits.push({ limit, ...run })
  }
  assert.ok(hits.length > 0, 'halt と monitoring 再開の予算保留が同じランで起きる limit が 1 つ以上ある')
  for (const { limit, result } of hits) {
    const note = noteOf(result, 9)
    assert.ok(note.includes('halt のため再開しなかった'), `limit ${limit}: halt の文言を残す: ${note}`)
    assert.match(note, /保留時の使用 \d+\/\d+、必要量 \d+。このランの着手 \d+ 件）。保留した時点では args\.agentCallLimit が \d+ 以上なら予算検査を通った/, `limit ${limit}: 予算の観測値を示す: ${note}`)
    assertBudgetFragment(note, limit, `limit ${limit}`)
    assert.ok(!note.includes('同じ引数で再実行すると monitor から再開する'), `limit ${limit}: 同じ引数で再開するとだけは書かない: ${note}`)
  }
})

test('単体: monitoring 再開の予算保留はゲートの理由を消さず、予算の文言でゲートの理由を上書きしない (Issue #598)', () => {
  // 結合で再現するには保存済みの monitoring 状態と照合用ハッシュが要るため、書き込み経路を構造で固定する。
  assert.doesNotMatch(driverPart, /monitoringResumeGateDeferred\.set\([^)]*予算/, '予算の文言でゲートの理由を上書きしない')
  const hold = driverPart.slice(driverPart.indexOf('if (budgetHold) {'), driverPart.indexOf('agentBudgetHeld.delete(n)'))
  assert.ok(hold.length > 0 && !hold.includes('monitoringResumeGateDeferred.delete'), '予算保留の分岐でゲートの理由を消さない（消すとゲートが未評価のまま予算だけを理由と案内する）')
  // 旧: budgetOnly の式に `!monitoringResumeGateDeferred.has(n)` が含まれることを文字列で固定していた。#600 で note と budgetOnly を
  // 同じ理由の集合（stopReasons）から導く構造へ変えたため、式の文字列ではなく導出元を固定する。ゲートが残る再開を数えない振る舞いは
  // 下の「全組み合わせ」の表（budget だけの行以外は budgetOnly でない）と、上の結合テスト（starved: false）が検査する。
  assert.ok(driverPart.includes('const budgetOnly = (n) => { const r = stopReasons(stopFacts(n)); return r.length === 1 && r[0] === \'budget\' }'), 'budgetOnly（starved / neededLimit の対象）は note と同じ理由の集合から導く')
  assert.equal((driverPart.match(/stopNote\(stopFacts\(n\), agentBudget\)/g) ?? []).length, 2, '未着手（保存する blocked の note を含む）と中断の note は同じ合成関数を通る')
  assert.ok(!/monitoringResumeGateDeferred\.get\(n\)\s*\?/.test(driverPart) && !driverPart.includes('deferredReason'), '理由を選ぶ三項・if/else を note の組み立てに残さない')
})

test('結合: starved の note・終了ログは保留時の観測値を報告し、「下限値」「少なくとも N にして再実行」「同じ引数」と次ランを予測しない (Issue #600 追加是正)', async () => {
  const { result, logs, calls } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, leaves: MANY })
  assert.equal(result.agentBudget.starved, true)
  const notes = notStartedNotes(result).filter(soleBudget)
  const saved = Object.values(patchesFromBatchCalls(calls)).filter((p) => soleBudget(p.note)).map((p) => p.note)
  assert.ok(notes.length > 0 && saved.length > 0)
  for (const t of [...notes, ...saved]) assertBudgetFragment(t, 81, 'starved の note')
  const warn = logs.filter((l) => l.includes('1 件も着手していない'))
  assert.equal(warn.length, 1)
  assertBudgetFragment(warn[0], 81, '終了ログ')
  assert.ok(warn[0].includes(`args.agentCallLimit が ${result.agentBudget.neededLimit} 以上なら予算検査を通った`) && warn[0].includes('予算不足で 1 件も着手していない'), '終了ログは neededLimit のノードと同じ断片')
})
test('結合: 新規着手抑止（ラッチ）が効いていても、予算で保留された monitoring 再開は予算だけが理由なので starved になる（再開はラッチの対象外）', async () => {
  const hits = []
  for (let limit = 81; limit <= 100; limit++) {
    const run = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktrees: 1, agentCallLimit: limit },
      tree: budgetTree({ ready: [2], pad: 1600 }),
      saved: { 2: resumeSaved(2) },
      override: (label) => (label === 'worktree:orphan-scan' ? { entries: EXTRA_WORKTREES } : undefined),
    })
    if (run.logs.some((l) => l.includes('新規着手を停止する')) && noteOf(run.result, 2).includes(BUDGET_MARK)) hits.push({ limit, ...run })
  }
  assert.ok(hits.length > 0, '再開 #2 が予算で保留されるランが 1 つ以上ある')
  for (const { limit, result } of hits) {
    const a = result.agentBudget
    assert.equal(a.starts, 0, `limit ${limit}`)
    assert.equal(a.starved, true, `limit ${limit}: 実装の保留はラッチが理由だが、再開 #2 は予算だけが理由`)
    assert.equal(a.neededLimit, heldN(noteOf(result, 2)), `limit ${limit}: 観測値は再開 #2 の保留時の記録`)
    assert.equal(a.neededLimit - heldUsed(noteOf(result, 2)), AGENT_CALLS_PER_ISSUE.resume + AGENT_CALLS_TERMINAL_BASE, `limit ${limit}: 観測値 = 保留時の使用 + 再開 1 件に要る量`)
    assertBudgetFragment(noteOf(result, 2), limit, `limit ${limit}`)
    const impl = notStartedNotes(result).filter((t) => t.includes('残置 worktree 上限ゲート'))
    assert.ok(impl.length > 0 && impl.every((t) => t.startsWith('残置 worktree 上限ゲートにより') && !soleBudget(t)), `limit ${limit}: ラッチが理由の実装の note は抑止の理由が先頭`)
    assertStarvedConsistent(result, `limit ${limit}`)
  }
})

test('単体: ループ前に着手可否を断定して throw する検査を持たない（着手可否はループ中にしか分からない）', () => {
  assert.doesNotMatch(driverPart, /予算が開始処理で足りなくなった/)
  const loopStart = driverPart.indexOf('while (true) {\n  dispatchIterationSeq += 1')
  assert.ok(loopStart > 0)
  assert.ok(!/agentBudgetHold\(/.test(driverPart.slice(0, loopStart)), 'ループより前に agentBudgetHold の判定を置かない')
})

test('結合: 予算だけが理由の未着手は、予算で保留した事実を報告する (Bugbot A 対照)', async () => {
  const { result, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 120 }, leaves: LEAVES })
  assert.ok(logs.some((l) => l.includes('新規着手を停止する')))
  assert.equal(result.agentBudget.starved, false, '1 件以上着手したランは starved ではない')
  const notes = result.done.filter((d) => d.status === 'not-started' && d.issue !== 1).map((d) => d.note)
  assert.ok(notes.length > 0 && notes.every(soleBudget), notes[0])
  for (const t of notes) assertBudgetFragment(t, 120, 'Bugbot A 対照')
  // chunks 項は required に入っている（first ではない）ので二重に足さない: N = 保留時の使用 + 30 × 実行中 + 実装の目安 + 予備 + chunks 項（未完了 9 件 → 1）。
  for (const t of notes) assert.equal((heldN(t) - heldUsed(t) - AGENT_CALLS_PER_ISSUE.implement - AGENT_CALLS_TERMINAL_BASE - 1) % AGENT_CALLS_PER_ISSUE.implement, 0, `N - 使用 = 30k + 51: ${t}`)
  assertStarvedConsistent(result, 'Bugbot A 対照', logs)
})

test('結合: halt しているとき、予算の not-started note で halt の理由を上書きしない (Bugbot A)', async () => {
  const hit = await sweepLimits([81, 90, 100, 110, 120, 130, 140, 160, 200], (limit) => runScript({
    args: { ...BASE_ARGS, parallel: 3, agentCallLimit: limit },
    leaves: LEAVES,
    // 実装が毎回失敗して 3 連続で halt する
    override: (label) => (label.startsWith('impl:#') ? { branch: '', summary: '', worktreePath: '' } : undefined),
  }))
  const halted = hit.filter((h) => h.result.halted)
  assert.ok(halted.length > 0, 'halt と予算の停止が同じランで起きる limit が 1 つ以上ある')
  for (const { limit, result } of halted) {
    const notes = result.done.filter((d) => d.status === 'not-started' && d.issue !== 1).map((d) => d.note)
    assert.ok(notes.length > 0, `limit ${limit}`)
    assert.ok(notes.every((t) => t.startsWith('halted により未着手') && !soleBudget(t)), `limit ${limit}: halt の理由が先頭に残り、予算だけが理由とは書かない: ${notes[0]}`)
  }
})

// ---------------------------------------------------------------------------
// 終了時 note の停止理由は「1 つ選ぶ」のではなく「成立しているものをすべて優先順に並べる」(Issue #600)
// ---------------------------------------------------------------------------
// #595 → #596 → #597 → #599 は note を「止めた理由を 1 つ選ぶ」if/else で組み、修正のたびに 1 つの組み合わせだけを塞いだため、
// 未テストの組み合わせが毎回残った。ここでは停止理由の軸（halt・新規着手抑止のラッチ・再開ゲート・予算保留）× ノード種別を
// 表で網羅し、到達可能な全行で note が「成立している理由の断片をすべて含み、成立していない理由の断片を含まない」ことを固定する。
//
// 到達可能性（コードから判断。到達不能な行は呼び出しだけを確認し、期待は課さない）:
//   - ゲート理由 (gate): monitoringResumeGateDeferred.set は isActiveMonitoring かつ item.kind === 'implement' の再開ブロック内にしか無い。
//     よって「再開 × implement」以外（新規着手、verify-close の再開）は常にゲート理由なし。
//   - ラッチ (latch): 新規着手抑止は再開ブロックの後に判定されるため、再開ノードには適用されない（再開はラッチの対象外）。
//     implementOnly のラッチ（空き容量起因）は implement にしか効かず、verify-close には適用されない。
//   - 予算保留 (held): 予算検査は種別を問わず走るため、どの種別にも付き得る。
//   - 「ゲートを今回再評価済み × 予算保留」は無い: 予算保留の分岐は agentBudgetHeld.delete よりも前で continue し、ゲート評価はその後。
//     よって held とゲート理由が併存するなら、ゲートは必ず「前回の評価」。
//   - halt はグローバル状態で、どの種別にも併存し得る（halt 後は dispatch が走らず、それ以前の held・gate が残る）。
const HALT = { reason: 'HALT_REASON_X', issues: [3] }
const LATCH = { reason: 'LATCH_REASON_X' }
const LATCH_IMPL_ONLY = { reason: 'LATCH_REASON_X', implementOnly: true }
const GATE = 'GATE_REASON_X のため monitoring 再開を defer した。'
// 予算保留の記録 { used: 保留時の使用量, required: 保留時にゲートが求めた必要量, needed }（limit 100 の想定）。needed = used + required
// （ゲートが実際に使ったしきい値。上乗せしない）。保留とは limit - used < required のことなので needed は常に limit より大きい。この不変条件に
// 反する行（needed <= limit）は作らない。needed == 1000 は指定できる上限ちょうど、1001 はそれを超える最小の値。
const HELDS = {
  normal: { used: 90, required: 32, needed: 122 },
  at1000: { used: 90, required: 910, needed: 1000 },
  at1001: { used: 90, required: 911, needed: 1001 },
  big: { used: 90, required: 1410, needed: 1500 },
}
// 前提は 2 種類に分けて書く: waiting = まだ決着していない前提（done にも failedSet にも無い。「待機」）、failedDeps = 既に failedSet に記録された前提
// （失敗・ブロック、ツリー外で open のままの前提を含む。待っているのではなく決着済みで、完了していない）。先頭 5 件 + 件数の表記も確かめる。
const DEPCASES = {
  none: { waiting: [], failedDeps: [] },
  pending: { waiting: [2], failedDeps: [] },
  pendingMany: { waiting: [2, 3, 4, 5, 6, 7, 8], failedDeps: [] },
  failed: { waiting: [], failedDeps: [9] },
  both: { waiting: [2, 3], failedDeps: [9, 10] },
}
const BUDGET_CTX = { limit: 100, starts: 3 }
for (const [k, h] of Object.entries(HELDS)) assert.ok(h.needed > BUDGET_CTX.limit && h.needed === h.used + h.required, `HELDS.${k} は保留の不変条件を満たす`)

function* stopRows() {
  for (const resume of [false, true]) {
    for (const kind of ['implement', 'verify-close']) {
      for (const halted of [null, HALT]) {
        for (const latch of [null, LATCH, LATCH_IMPL_ONLY]) {
          for (const waitCase of Object.keys(DEPCASES)) {
            for (const gate of [undefined, GATE]) {
              for (const heldCase of [undefined, ...Object.keys(HELDS)]) {
                yield { resume, kind, halted, latch, waitCase, ...DEPCASES[waitCase], gate, heldCase, held: heldCase && HELDS[heldCase] }
              }
            }
          }
        }
      }
    }
  }
}
// 到達不能: ゲート理由は implement の再開だけが持つ。ゲート評価・予算検査は前提を満たした（ready な）ノードにしか走らないので、
// 前提待ちのノードはゲート理由も予算保留も持たない（前提は後退しない）。
const reachable = (r) => !(r.gate && !(r.resume && r.kind === 'implement')) && !((r.waiting.length > 0 || r.failedDeps.length > 0) && (r.gate || r.held))
const expectedReasons = (r) => [
  r.halted && 'halt',
  !r.resume && r.latch && (!r.latch.implementOnly || r.kind === 'implement') && 'latch',
  (r.waiting.length > 0 || r.failedDeps.length > 0) && 'dep',
  r.gate && 'gate',
  r.held && 'budget',
].filter(Boolean)
// 予算の断片の期待文言（単独形・併記形で同一）。保留した時点の事実だけで、次ランの予測・分割の案内を含まない。
const expectedBudgetFragment = (r) => `${BUDGET_MARK}（保留時の使用 ${r.held.used}/100、必要量 ${r.held.required}。このランの着手 ${BUDGET_CTX.starts} 件）。保留した時点では args.agentCallLimit が ${r.held.needed} 以上なら予算検査を通った${r.held.needed > 1000 ? '（指定できる上限 1000 を超える）' : ''}（次ランの必要量は、開始処理・先に着手するノード・ゲート実測で変わる）`

function checkNote(row, note) {
  const order = expectedReasons(row)
  const where = JSON.stringify({ ...row, halted: !!row.halted, latch: row.latch && (row.latch.implementOnly ? 'implementOnly' : 'all'), gate: !!row.gate, held: row.heldCase, waiting: row.waitCase })
  const has = (s) => note.includes(s)
  assert.equal(has('HALT_REASON_X'), order.includes('halt'), `halt の理由: ${where}\n${note}`)
  assert.equal(has(row.resume ? 'halt のため再開しなかった' : 'halted により未着手'), order.includes('halt'), `halt の文言: ${where}\n${note}`)
  assert.equal(has('LATCH_REASON_X'), order.includes('latch'), `ラッチの理由は適用される行にだけ: ${where}\n${note}`)
  assert.equal(has('残置 worktree 上限ゲートにより新規着手を抑止'), order.includes('latch'), `ラッチの文言: ${where}\n${note}`)
  assert.equal(has('前提 '), order.includes('dep'), `前提の理由: ${where}\n${note}`)
  const shownList = (list) => (list.length <= 5 ? list.map((n) => `#${n}`).join(', ') : `${list.length} 件（先頭 5 件: ${list.slice(0, 5).map((n) => `#${n}`).join(', ')}）`)
  const waitText = row.waiting.length > 0 ? `前提 ${shownList(row.waiting)} が未完了のため待機` : null
  const failedText = row.failedDeps.length > 0 ? `前提 ${shownList(row.failedDeps)} は完了していない（失敗・ブロックとして記録済み）` : null
  assert.equal(has('が未完了のため待機'), waitText !== null, `未決着の前提だけを「待機」と書く: ${where}\n${note}`)
  assert.equal(has('は完了していない（失敗・ブロックとして記録済み）'), failedText !== null, `決着済みの前提は待機とは書かず、完了していない事実として書く: ${where}\n${note}`)
  for (const n of row.failedDeps) assert.ok(!new RegExp(`前提[^。]*#${n}[^。]*が未完了のため待機`).test(note), `失敗済みの前提 #${n} を待機と書かない: ${where}\n${note}`)
  if (waitText) assert.ok(has(waitText), `未決着の前提は番号（多いときは先頭 5 件 + 件数）を示す: ${where}\n${note}`)
  if (failedText) assert.ok(has(failedText), `決着済みの前提は番号を示す: ${where}\n${note}`)
  if (waitText && failedText) assert.ok(note.indexOf(waitText) < note.indexOf(failedText), `未決着 → 決着済みの順: ${where}\n${note}`)
  assert.equal(has('GATE_REASON_X'), order.includes('gate'), `ゲートの理由: ${where}\n${note}`)
  assert.equal(has('前回の評価') && has('再評価していない'), order.includes('gate') && order.includes('budget'), `ゲートが前回の評価と分かるのは予算保留と併存するときだけ: ${where}\n${note}`)
  assert.equal(has(BUDGET_MARK), order.includes('budget'), `予算の断片は予算保留があるときだけ: ${where}\n${note}`)
  if (order.includes('budget')) {
    // 単独形・併記形で同じ断片を最後に置く。使用量・必要量・しきい値は保留時の記録だけから出す（終了時の使用量と混ぜない）。
    assert.equal(note.slice(note.indexOf(BUDGET_MARK)), expectedBudgetFragment(row), `予算の断片: ${where}\n${note}`)
    assertBudgetFragment(note, BUDGET_CTX.limit, where)
    assert.equal(soleBudget(note), order.length === 1, `予算だけが理由かどうかは理由の集合と一致する: ${where}\n${note}`)
  }
  assertNoPrediction(note, where)
  assert.equal(has('キュー未到達'), order.length === 0 && !row.resume, `理由なしの新規着手の既定文: ${where}\n${note}`)
  if (order.length === 0 && row.resume) assert.equal(note, '再実行すると monitor からの再開を試みる', `理由なしの再開の既定文は結果を言い切らない: ${where}\n${note}`)
  assert.ok(!has('。。'), `句点が重ならない: ${where}\n${note}`)
  // 優先順 halt → ラッチ → 前提待ち → ゲート → 予算。位置は予算断片に固有の文字列で取る（ゲートの注記にも「予算で保留した周回」が出る）。
  const at = [['halt', row.resume ? 'halt のため再開しなかった' : 'halted により未着手'], ['latch', '残置 worktree 上限ゲートにより'], ['dep', '前提 '], ['gate', 'GATE_REASON_X'], ['budget', BUDGET_MARK]]
    .filter(([k]) => order.includes(k)).map(([, s]) => note.indexOf(s))
  assert.ok(at.every((i) => i >= 0), `断片の位置を取れる: ${where}\n${note}`)
  assert.deepEqual(at, [...at].sort((a, b) => a - b), `優先順 halt → ラッチ → 前提待ち → ゲート → 予算: ${where}\n${note}`)
}

test('単体: 停止理由の全組み合わせ（軸 × 種別の表）で、note は成立している理由をすべて優先順に含み、成立していない理由を含まない (Issue #600)', () => {
  let reached = 0
  let unreachable = 0
  let multi = 0
  let budgetRows = 0
  let defaults = 0
  for (const row of stopRows()) {
    const facts = { resume: row.resume, kind: row.kind, halted: row.halted, latch: row.latch, waiting: row.waiting, failedDeps: row.failedDeps, gate: row.gate, held: row.held }
    const reasons = stopReasons(facts)
    assert.deepEqual(reasons, expectedReasons(row), `理由の集合と順序: ${JSON.stringify(row)}`)
    const note = stopNote(facts, BUDGET_CTX)
    // 到達不能の行は呼び出しが落ちないことだけ確認する（根拠は上の reachable）。
    if (!reachable(row)) { unreachable += 1; continue }
    reached += 1
    if (reasons.length >= 2) multi += 1
    if (reasons.length === 0) defaults += 1
    if (row.held) budgetRows += 1
    checkNote(row, note)
  }
  assert.ok(reached > 0 && unreachable > 0 && multi > 0 && budgetRows > 0 && defaults > 0, `表が空振りしていない: reached ${reached} / unreachable ${unreachable} / multi ${multi} / budget ${budgetRows} / default ${defaults}`)
})

test('単体: 名前付きの行 — #600（ゲートで defer → 予算保留 → halt）と #596 #597 #598 が指した組み合わせ、needed の境界 (1000 / 1001)、前提待ち', () => {
  const ctx = BUDGET_CTX
  const base = { resume: false, kind: 'implement', halted: null, latch: null, waiting: [], failedDeps: [], gate: undefined, held: undefined }
  // #600: ゲート（前回の評価）・予算・halt が併存。halt が落ちず、先頭に来る。
  const n600 = stopNote({ ...base, resume: true, halted: HALT, gate: GATE, held: HELDS.normal }, ctx)
  assert.match(n600, /^halt のため再開しなかった（理由: HALT_REASON_X）。GATE_REASON_X.*（この理由は前回の評価。予算で保留した周回では再評価していない）。エージェント呼び出し数の予算不足で保留/, n600)
  // #598 指摘 2: halt + 予算保留の再開。予算の事実を落とさず、再開するとは書かない。
  const n598b = stopNote({ ...base, resume: true, halted: HALT, held: HELDS.normal }, ctx)
  assert.match(n598b, /保留時の使用 90\/100、必要量 32。このランの着手 3 件）。保留した時点では args\.agentCallLimit が 122 以上なら予算検査を通った/)
  // #598 指摘 3: ゲート理由 + 予算保留。ゲートは前回の評価で、予算だけが理由とは扱わない。
  const n598c = stopNote({ ...base, resume: true, gate: GATE, held: HELDS.normal }, ctx)
  assert.ok(n598c.includes('前回の評価') && n598c.includes(BUDGET_MARK) && !soleBudget(n598c), n598c)
  // #596 の Bugbot A: ラッチ + 予算保留の新規着手は、ラッチの理由を残しつつ予算も併記する。
  const nA = stopNote({ ...base, latch: LATCH, held: HELDS.normal }, ctx)
  assert.match(nA, /^残置 worktree 上限ゲートにより新規着手を抑止（理由: LATCH_REASON_X）。エージェント呼び出し数の予算不足で保留/, nA)
  // #597: 再開はラッチの対象外。ラッチが立っていても、予算で保留した再開は予算だけが理由。
  const n597 = stopNote({ ...base, resume: true, latch: LATCH, held: HELDS.normal }, ctx)
  assert.ok(soleBudget(n597) && !n597.includes('LATCH_REASON_X') && n597.startsWith(BUDGET_MARK), n597)
  // 適用されないラッチ: 空き容量起因（implementOnly）のラッチは verify-close に効かない。前提待ちでない未着手の verify-close の理由にしない。
  assert.equal(stopNote({ ...base, kind: 'verify-close', latch: LATCH_IMPL_ONLY }, ctx), 'スケジューラ終了時に未着手（キュー未到達）')
  // halt のみの再開は halt の理由を残す。
  assert.equal(stopNote({ ...base, resume: true, halted: HALT }, ctx), 'halt のため再開しなかった（理由: HALT_REASON_X）')
  // 前提待ちの再開（#3 が #2 に依存し、#2 が予算保留）: 理由 0 件の既定文にせず、前提待ちを理由に挙げる。
  assert.equal(stopNote({ ...base, resume: true, waiting: [2] }, ctx), '前提 #2 が未完了のため待機')
  // 決着済み（failedSet）の前提は「待機」と書かない。未決着の前提と両方あるときは 未決着 → 決着済み の順に並べる。
  assert.equal(stopNote({ ...base, resume: true, failedDeps: [3] }, ctx), '前提 #3 は完了していない（失敗・ブロックとして記録済み）')
  assert.equal(stopNote({ ...base, resume: true, waiting: [2], failedDeps: [3] }, ctx), '前提 #2 が未完了のため待機。前提 #3 は完了していない（失敗・ブロックとして記録済み）')
  // 理由が 1 つも無い再開の既定文は、再開の結果を言い切らない。
  assert.equal(stopNote({ ...base, resume: true }, ctx), '再実行すると monitor からの再開を試みる')
  // needed の境界: 1000 は指定できる上限ちょうど、1001 から「指定できる上限を超える」という事実を添える。分割の案内は出さない。
  const n1000 = stopNote({ ...base, held: HELDS.at1000 }, ctx)
  assert.ok(n1000.includes('args.agentCallLimit が 1000 以上なら予算検査を通った（次ラン') && !n1000.includes('指定できる上限'), n1000)
  const n1001 = stopNote({ ...base, held: HELDS.at1001 }, ctx)
  assert.equal(n1001, 'エージェント呼び出し数の予算不足で保留（保留時の使用 90/100、必要量 911。このランの着手 3 件）。保留した時点では args.agentCallLimit が 1001 以上なら予算検査を通った（指定できる上限 1000 を超える）（次ランの必要量は、開始処理・先に着手するノード・ゲート実測で変わる）')
  const nBoth = stopNote({ ...base, halted: HALT, held: HELDS.big }, ctx)
  assert.ok(nBoth.startsWith('halted により未着手') && nBoth.includes('指定できる上限 1000 を超える') && !nBoth.includes('分割'), nBoth)
})

test('単体: agentBudgetHold の needed は保留時の使用量 + required（上乗せしない）で、chunks は観測値として返す (Issue #600 追加是正)', () => {
  const impl = AGENT_CALLS_PER_ISSUE.implement
  const chunks = Math.ceil(1100 / BLOCKED_STATE_CHUNK_SIZE)
  // first（実行中 0・着手 0）: required は chunks 項を免除される。ゲートが実際に使った値そのまま = needed（chunks を足さない）。
  const first = agentBudgetHold({ limit: 60, used: 40, starts: 0 }, { running: 0, kind: 'implement', pending: 1100 })
  assert.deepEqual(first, { remaining: 20, required: impl + AGENT_CALLS_TERMINAL_BASE, chunks, needed: 40 + impl + AGENT_CALLS_TERMINAL_BASE })
  // しきい値の事実: needed - 1 では保留、needed では通る（同じ状態についての検査）。
  assert.ok(agentBudgetHold({ limit: first.needed - 1, used: 40, starts: 0 }, { running: 0, kind: 'implement', pending: 1100 }))
  assert.equal(agentBudgetHold({ limit: first.needed, used: 40, starts: 0 }, { running: 0, kind: 'implement', pending: 1100 }), null)
  // first ではない（着手済み）: required に chunks 項が入る。
  const later = agentBudgetHold({ limit: 60, used: 40, starts: 1 }, { running: 0, kind: 'implement', pending: 1100 })
  assert.deepEqual(later, { remaining: 20, required: impl + AGENT_CALLS_TERMINAL_BASE + chunks, chunks, needed: 40 + impl + AGENT_CALLS_TERMINAL_BASE + chunks })
  assert.equal(agentBudgetHold({ limit: later.needed, used: 40, starts: 1 }, { running: 0, kind: 'implement', pending: 1100 }), null)
  // 実行中がいれば 30 × 実行中が required に入り、needed もそれを含む。
  const busy = agentBudgetHold({ limit: 60, used: 40, starts: 1 }, { running: 2, kind: 'close', pending: 1100 })
  assert.equal(busy.needed, 40 + busy.required)
  // 保留である限り needed は limit より大きい。
  for (const h of [first, later, busy]) assert.ok(h.needed > 60)
})

// ---------------------------------------------------------------------------
// 統合: 実際にその状態へ到達するランで、note と starved / neededLimit / budgetOnly が矛盾しないことを確かめる (Issue #600)
// ---------------------------------------------------------------------------
// starved / neededLimit / held / 各 note / 終了ログの整合（Issue #600 追加是正）:
//   - agentBudget.held は予算で保留した全ノード（併存を含む）の観測値の記録。note の数値は同じ行の needed と一致する。
//   - 予算だけが理由の行（budgetOnly: true）と、予算だけが理由の note（soleBudget）は同じ集合。neededLimit はその needed の最小値で、無ければ null。
//   - starved は着手 0 件で budgetOnly の行があるとき。終了ログ（「1 件も着手していない」）は starved のときだけ出て、neededLimit の行と同じ断片を載せる。
//   - 予算の断片を持つ全 note は、次ランの予測・同じ引数・下限の語を使わない（assertBudgetFragment）。
function assertStarvedConsistent(result, where, logs) {
  const a = result.agentBudget
  // 回帰: 生成される全 note・終了ログに、次ランの結果を言い切る言い回し・下限値・上乗せの語を出さない。
  for (const d of result.done) assert.doesNotMatch(d.note ?? '', LEGACY_PHRASE, `${where}: note #${d.issue}`)
  for (const l of logs ?? []) assert.doesNotMatch(l, LEGACY_PHRASE, `${where}: 終了ログ`)
  const notes = result.done.filter((d) => d.status === 'not-started' || d.status === 'monitoring' || d.status === 'blocked')
  const heldNotes = notes.filter((d) => d.note.includes(BUDGET_MARK))
  assert.deepEqual(a.held.map((h) => h.issue), [...a.held.map((h) => h.issue)].sort((x, y) => x - y), `${where}: held は issue 番号の昇順`)
  assert.deepEqual(heldNotes.map((d) => d.issue).sort((x, y) => x - y), a.held.map((h) => h.issue), `${where}: 予算の断片を持つ note と held の行は同じノード集合`)
  for (const h of a.held) {
    const note = notes.find((d) => d.issue === h.issue).note
    assert.deepEqual(Object.keys(h), ['issue', 'kind', 'resume', 'used', 'required', 'chunks', 'needed', 'budgetOnly'], `${where}: held の行のフィールド`)
    assert.equal(heldN(note), h.needed, `${where}: note の N は同じ行の needed（#${h.issue}）`)
    assert.equal(heldUsed(note), h.used, `${where}: note の使用量は同じ行の used（#${h.issue}）`)
    assert.equal(soleBudget(note), h.budgetOnly, `${where}: budgetOnly は note が予算だけが理由かどうかと一致（#${h.issue}）`)
    assert.equal(h.needed, h.used + h.required, `${where}: needed = used + required（ゲートが使った必要量そのまま。上乗せしない）`)
    assert.ok(h.needed > a.limit && h.chunks >= 1, `${where}: 保留である限り needed は limit より大きい`)
    assert.equal(h.resume, result.interrupted.includes(h.issue), `${where}: resume は中断（monitoring 再開候補）かどうかと一致（#${h.issue}）`)
    assert.equal(heldRequired(note), h.required, `${where}: note の必要量は同じ行の required（#${h.issue}）`)
    assert.ok(note.includes(`このランの着手 ${a.starts} 件`), `${where}: note の着手件数は終了時の starts（#${h.issue}）`)
  }
  const sole = a.held.filter((h) => h.budgetOnly)
  assert.equal(a.starved, a.starts === 0 && sole.length > 0, `${where}: starved は着手 0 件かつ budgetOnly の行があるとき`)
  if (sole.length === 0) assert.equal(a.neededLimit, null, `${where}: budgetOnly の行が無ければ neededLimit は null`)
  else assert.equal(a.neededLimit, Math.min(...sole.map((h) => h.needed)), `${where}: neededLimit は budgetOnly の行の needed の最小値`)
  for (const d of heldNotes) assertBudgetFragment(d.note, a.limit, where)
  if (logs) {
    const warn = logs.filter((l) => l.includes('1 件も着手していない'))
    assert.equal(warn.length, a.starved ? 1 : 0, `${where}: 終了ログの警告は starved のときだけ 1 回`)
    if (a.starved) {
      assertBudgetFragment(warn[0], a.limit, `${where}: 終了ログ`)
      assert.equal(heldN(warn[0]), a.neededLimit, `${where}: 終了ログは neededLimit と同じ観測値`)
    }
  }
}

// 親 #1 の配下: 保存済み monitoring の再開 #2、閉じた子を持つ verify-close #10 #20 #30（close の agent が closed: false を返して
// 'failed' で終わり、3 連続で halt する）、ツリー外前提待ちで着手しない葉 pad 件（未完了ノード数 = blocked 一括記録の chunks を増やし、
// 再開 #2（目安 12）が verify-close（目安 6）より多く要る窓を作る）。
function haltTree(pad = 1600) {
  const node = (number, parent, siblingIndex, state, subIssuesTotal, dependsOn = []) => ({ number, title: number === 1 ? 'root' : `issue ${number}`, state, parent, siblingIndex, dependsOn, subIssuesTotal })
  return [
    node(1, 0, 0, 'open', 4 + pad),
    node(2, 1, 0, 'open', 0),
    node(10, 1, 1, 'open', 1), node(11, 10, 0, 'closed', 0),
    node(20, 1, 2, 'open', 1), node(21, 20, 0, 'closed', 0),
    node(30, 1, 3, 'open', 1), node(31, 30, 0, 'closed', 0),
    ...Array.from({ length: pad }, (_, i) => node(100 + i, 1, 4 + i, 'open', 0, [OOT])),
  ]
}
const failClose = (label) => (label.startsWith('close:#') ? { closed: false, summary: '検証失敗' } : undefined)

test('結合: ゲートで defer した再開が、次の周回で予算保留になり、そのあと halt すると、note に halt・前回のゲート・予算の不足が優先順にすべて出る (Issue #600)', async () => {
  const hits = []
  for (let limit = 81; limit <= 140; limit++) {
    const run = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktrees: 1, agentCallLimit: limit },
      tree: haltTree(),
      saved: { 2: resumeSaved(2) },
      override: (label, ...rest) => withOneExtraWorktree(label) ?? failClose(label, ...rest),
    })
    const gateAt = run.logs.findIndex((l) => l.includes('#2:') && l.includes('monitoring 再開を defer'))
    const holdAt = run.logs.findIndex((l) => l.includes('新規着手を停止する') && l.includes('#2 '))
    if (run.result.halted && run.result.interrupted.includes(2) && gateAt >= 0 && holdAt > gateAt && noteOf(run.result, 2).includes(BUDGET_MARK)) hits.push({ limit, ...run })
  }
  assert.ok(hits.length > 0, 'ゲート defer → 予算保留 → halt の順に起きる limit が 1 つ以上ある')
  for (const { limit, result, logs } of hits) {
    const note = noteOf(result, 2)
    const at = ['halt のため再開しなかった', 'monitoring 再開を defer した', '前回の評価', BUDGET_MARK].map((s) => note.indexOf(s))
    assert.ok(at.every((i) => i >= 0), `limit ${limit}: halt・ゲート・前回の評価・予算がすべて出る: ${note}`)
    assert.deepEqual(at, [...at].sort((a, b) => a - b), `limit ${limit}: 優先順 halt → ゲート → 予算: ${note}`)
    assertBudgetFragment(note, limit, `limit ${limit}`)
    assert.equal(result.agentBudget.held.find((h) => h.issue === 2).budgetOnly, false, `limit ${limit}: halt・ゲートと併存する保留は held に入り budgetOnly: false`)
    assert.equal(result.agentBudget.starved, false, `limit ${limit}: halt とゲートが残るので予算だけが理由の停滞ではない`)
    assertStarvedConsistent(result, `limit ${limit}`, logs)
  }
})

test('結合: 新規着手抑止（ラッチ）と予算保留が併存する未着手の note は、ラッチの理由に予算の不足を併記する (Issue #600)', async () => {
  const hit = await sweepLimits([81, 90, 100], (limit) => runScript({
    args: { ...BASE_ARGS, maxResidualWorktrees: 1, agentCallLimit: limit },
    leaves: MANY,
    override: (label) => (label === 'worktree:orphan-scan' ? { entries: EXTRA_WORKTREES } : undefined),
  }))
  assert.ok(hit.length > 0, '予算ゲートが効いたランが 1 つ以上ある')
  for (const { limit, result, calls } of hit) {
    const both = notStartedNotes(result).filter((t) => t.includes('残置 worktree 上限ゲート') && t.includes(BUDGET_MARK))
    assert.ok(both.length > 0, `limit ${limit}: 予算で保留したノードの note はラッチと予算の両方を示す`)
    assert.ok(both.every((t) => t.indexOf('残置 worktree 上限ゲート') < t.indexOf(BUDGET_MARK) && !soleBudget(t)), `limit ${limit}: ラッチ → 予算の順で、予算だけが理由とは扱わない: ${both[0]}`)
    const saved = Object.values(patchesFromBatchCalls(calls)).map((p) => p.note)
    assert.ok(saved.some((t) => t.includes('残置 worktree 上限ゲート') && t.includes(BUDGET_MARK)), `limit ${limit}: 状態ファイルへ保存する note も同じ合成`)
    assert.ok(result.agentBudget.held.some((h) => !h.budgetOnly) && notStartedNotes(result).filter((t) => t.startsWith('残置 worktree 上限ゲート') && t.includes(BUDGET_MARK)).length === result.agentBudget.held.filter((h) => !h.budgetOnly && !h.resume).length, `limit ${limit}: ラッチと併存する保留は held に入り budgetOnly: false`)
    assertStarvedConsistent(result, `limit ${limit}`)
  }
})

test('結合: halt と予算保留が併存する未着手の note は、halt の理由に予算の不足を併記する (Issue #600)', async () => {
  const hit = await sweepLimits([81, 90, 100, 110, 120, 130, 140, 160, 200], (limit) => runScript({
    args: { ...BASE_ARGS, parallel: 3, agentCallLimit: limit },
    leaves: LEAVES,
    override: (label) => (label.startsWith('impl:#') ? { branch: '', summary: '', worktreePath: '' } : undefined),
  }))
  const halted = hit.filter((h) => h.result.halted)
  assert.ok(halted.length > 0, 'halt と予算の保留が同じランで起きる limit が 1 つ以上ある')
  let both = 0
  for (const { limit, result } of halted) {
    for (const t of notStartedNotes(result).filter((x) => x.includes(BUDGET_MARK))) {
      both += 1
      assert.ok(t.startsWith('halted により未着手') && !soleBudget(t), `limit ${limit}: halt が先頭で、予算だけが理由とは扱わない: ${t}`)
    }
    assertStarvedConsistent(result, `limit ${limit}`)
  }
  assert.ok(both > 0, '予算で保留したあとに halt したノードの note が 1 件以上ある')
})

test('結合: halt だけが理由の monitoring 再開は halt の理由を残し、「同じ引数で再実行すると再開する」とは書かない (Issue #600)', async () => {
  // #9 は保存済みの monitoring。予算は十分で、実装 3 件（#2〜#4）が失敗して halt し、#9 は評価されないまま残る。
  const { result } = await runScript({
    args: { ...BASE_ARGS, parallel: 3, agentCallLimit: 1000 },
    leaves: LEAVES,
    saved: { 9: resumeSaved(9) },
    override: (label) => (label.startsWith('impl:#') ? { branch: '', summary: '', worktreePath: '' } : undefined),
  })
  assert.ok(result.halted && result.interrupted.includes(9))
  const note = noteOf(result, 9)
  assert.ok(note.includes('halt のため再開しなかった') && note.includes('3 イシュー連続で完了できなかった'), `halt の理由を残す: ${note}`)
  assert.ok(!note.includes('同じ引数で再実行すると monitor から再開する') && !note.includes('予算'), `halt は再実行で解けるとは限らない。予算は無関係: ${note}`)
  assertStarvedConsistent(result, 'halt のみ')
})

test('結合: ループ内のゲート実測が着手なしに呼び出しを消費して starved になるランも、「同じ引数で足りる」と書かず保留時の観測値を報告する (Issue #600 追加是正。独立レビューの再現)', async () => {
  // バイト軸のゲート（maxResidualWorktreeBytes）を有効にし、du が上限超過を返す。再開 #2 は予算を通ってゲート実測（du）で消費して defer され、
  // 続く再開 #3 は消費後の使用量で予算保留になる。着手は 0 件のまま。開始時点の使用量だけで必要量を言うと、必要量が limit に収まって
  // 「同じ引数で足りる」ように見えてしまう窓がここにある（以前の need = startUsed + required）。
  const leaves = Array.from({ length: 1500 }, (_, i) => 2 + i)
  const hits = []
  for (let limit = 81; limit <= 90; limit++) {
    const run = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktreeBytes: 1073741824, agentCallLimit: limit, skillDir: '/opt/skills/implement-issue-tree' },
      leaves,
      saved: { 2: resumeSaved(2), 3: resumeSaved(3) },
      // 測定は封筒（nonce・payload・sha256）で返す。プロンプトのコマンドから nonce を取り出して作る
      override: (label, ...rest) => {
        if (label === 'worktree:residual-bytes') return signedReply(rest[1], { kib: 2 * 1024 * 1024, err: 0, missing: 0, count: 1 })
        if (label === 'worktree:free-disk-bytes') return signedReply(rest[1], { freeKib: 1e10, err: 0 })
        return withOneExtraWorktree(label, ...rest)
      },
    })
    const rows = run.result.agentBudget.held
    const gateThenHold = run.logs.some((l) => l.includes('#2:') && l.includes('monitoring 再開を defer')) && !rows.some((h) => h.issue === 2) && rows.some((h) => h.issue === 3 && h.budgetOnly)
    if (run.result.agentBudget.starved && gateThenHold) hits.push({ limit, ...run })
  }
  assert.ok(hits.length > 0, 'ゲート実測が呼び出しを消費したあとに再開 #3 が予算保留になり、1 件も着手しないランが 1 つ以上ある')
  for (const { limit, result, logs } of hits) {
    const a = result.agentBudget
    const row3 = a.held.find((h) => h.issue === 3)
    assert.equal(a.starts, 0, `limit ${limit}`)
    assert.ok(row3.resume && row3.used + row3.required > limit, `limit ${limit}: #3 は予算だけが理由の再開で、保留である限り used + required > limit`)
    const note = noteOf(result, 3)
    assert.ok(!note.includes('同じ引数') && heldN(note) === row3.needed && row3.needed > limit, `limit ${limit}: ${note}`)
    assertStarvedConsistent(result, `limit ${limit}`, logs)
  }
})

test('結合: held は予算で保留した全ノード（併存を含む）の観測値で、note・終了ログ・neededLimit と同じ値を持つ。保留なし・enforced: false では空配列 (Issue #600 追加是正)', async () => {
  // 保留なし: 上限が十分大きい。
  const none = await runScript({ args: { ...BASE_ARGS }, leaves: LEAVES })
  assert.deepEqual(none.result.agentBudget.held, [])
  assert.equal(none.result.agentBudget.neededLimit, null)
  // enforced: false: 予算ゲートを適用しないので保留は起きない。
  const off = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, leaves: LEAVES, constAgent: true })
  assert.equal(off.result.agentBudget.enforced, false)
  assert.deepEqual(off.result.agentBudget.held, [])
  // 保留あり（再開 #2・実装 #3 が同時に保留）: 行のフィールド・昇順・note との一致。
  const tree = budgetTree({ ready: [2, 3], pad: 1600 })
  const { result, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, tree, saved: { 2: resumeSaved(2) } })
  const a = result.agentBudget
  const [r2, r3] = a.held
  assert.deepEqual([r2.issue, r3.issue], [2, 3])
  assert.deepEqual([r2.kind, r2.resume, r2.budgetOnly], ['implement', true, true])
  assert.deepEqual([r3.kind, r3.resume, r3.budgetOnly], ['implement', false, true])
  const chunks = Math.ceil(1604 / BLOCKED_STATE_CHUNK_SIZE)
  assert.equal(r2.chunks, chunks)
  assert.equal(r2.required, AGENT_CALLS_PER_ISSUE.resume + AGENT_CALLS_TERMINAL_BASE, '最初の 1 件（first）の required は chunks 項を含まない')
  assert.equal(r2.needed, r2.used + r2.required, 'needed はゲートが使った必要量そのまま（免除された chunks 項を足さない）')
  assert.equal(r3.needed, r3.used + AGENT_CALLS_PER_ISSUE.implement + AGENT_CALLS_TERMINAL_BASE)
  assert.equal(r3.chunks, chunks)
  assert.equal(a.neededLimit, Math.min(...a.held.filter((h) => h.budgetOnly).map((h) => h.needed)))
  assertStarvedConsistent(result, '保留の記録', logs)
})

test('結合: 既定の agentCallLimit（1000）で保留に至る普通のランでも、note・終了ログは分割を案内しない。しきい値が指定できる上限を超えている事実だけを添える (Issue #600 追加是正)', async () => {
  // 完了分は次ランの対象から外れる普通の状況でも、保留は used + required > limit のときにしか起きないので、既定の上限 1000 では needed >= 1001 が常に成り立つ。
  // それを理由に「分割を検討する」と案内すると、同じ引数で続きに進める普通のランでも分割を勧めてしまう。
  const leaves = Array.from({ length: 200 }, (_, i) => 2 + i)
  const { result, logs } = await runScript({ args: { ...BASE_ARGS, parallel: 5 }, leaves })
  const a = result.agentBudget
  assert.equal(a.limit, 1000, '前提: 既定の上限')
  assert.ok(a.starts > 0 && a.held.length > 0, `前提: 着手したあとに予算で保留するラン（着手 ${a.starts} 件・保留 ${a.held.length} 件）`)
  assert.ok(a.held.every((h) => h.needed > AGENT_RUN_LIMIT), '既定の上限での保留は、しきい値が常に指定できる上限を超える')
  const notes = notStartedNotes(result).filter((t) => t.includes(BUDGET_MARK))
  assert.equal(notes.length, a.held.length)
  for (const t of notes) {
    assert.ok(t.includes('（指定できる上限 1000 を超える）') && !t.includes('分割'), t)
    assertBudgetFragment(t, 1000, '既定の上限')
  }
  assert.ok(!logs.some((l) => l.includes('分割')), '終了ログにも分割の案内を出さない')
  assertStarvedConsistent(result, '既定の上限', logs)
})

test('結合: 前提ノードが予算保留で再開できないとき、前提待ちの再開は理由 0 件の既定文にせず、前提待ちを理由に挙げ、再開すると言い切らない (Issue #600 追加是正)', async () => {
  // 保存済み monitoring の #3 は #2 に依存し、#2 は開始処理で使い切った残りでは予算保留になる。#3 は前提待ちで予算検査に届かない。
  const tree = budgetTree({ ready: [2, 3], pad: 1600 }).map((nd) => (nd.number === 3 ? { ...nd, dependsOn: [2] } : nd))
  const { result, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, tree, saved: { 2: resumeSaved(2), 3: resumeSaved(3) } })
  assert.ok(result.interrupted.includes(2) && result.interrupted.includes(3))
  assert.ok(result.agentBudget.held.some((h) => h.issue === 2) && !result.agentBudget.held.some((h) => h.issue === 3), '#2 は予算保留、#3 は前提待ちで予算検査に届かない')
  const n3 = noteOf(result, 3)
  assert.ok(n3.includes('前提 #2 が未完了のため待機'), n3)
  assert.doesNotMatch(n3, /再開する|再開に乗る|同じ引数/, `前提が未完了の再開について、再実行すれば再開すると言い切らない: ${n3}`)
  assertStarvedConsistent(result, '前提待ちの再開', logs)
})

test('結合: 未決着の前提と失敗済みの前提を両方持つ再開は、失敗済みの前提を「待機」と書かず、完了していない事実として書く (Issue #600 追加是正。上流 Bugbot の指摘)', async () => {
  // 保存済み monitoring の #4 は #2（未決着。開始処理で使い切った残りでは予算保留）と #3（保存済みの merged だが再開情報なしで failedSet 入り）に依存する。
  // 別の未決着の依存で 'wait' に留まるため、失敗済みの #3 も unmet に入る。以前は両方を「未完了のため待機」と書いていた。
  const tree = budgetTree({ ready: [2, 3, 4], pad: 1600 }).map((nd) => (nd.number === 4 ? { ...nd, dependsOn: [2, 3] } : nd))
  const { result, logs } = await runScript({ args: { ...BASE_ARGS, agentCallLimit: 81 }, tree, saved: { 2: resumeSaved(2), 3: mergedNoResume, 4: resumeSaved(4) } })
  assert.ok(result.interrupted.includes(2) && result.interrupted.includes(4))
  assert.ok(result.agentBudget.held.some((h) => h.issue === 2) && !result.agentBudget.held.some((h) => h.issue === 4), '#2 は予算保留（未決着）、#4 は前提待ちで予算検査に届かない')
  const n4 = noteOf(result, 4)
  assert.ok(n4.includes('前提 #2 が未完了のため待機。前提 #3 は完了していない（失敗・ブロックとして記録済み）'), n4)
  assert.doesNotMatch(n4, /#3[^。]*が未完了のため待機/, `失敗済みの #3 を待機と書かない: ${n4}`)
  assertStarvedConsistent(result, '未決着 + 失敗済みの前提', logs)
})
