// Issue #493: state 系エージェント（state:update / state:cleanup / state:init-all /
// state:high-water / state:load）を担う haiku エージェントが StructuredOutput を一度も返さず
// 終了する（例外・null 返却いずれも）ケースが下流の複数ランで常態化していた。#465 の fail-safe は
// Merge ループ内のエージェント（monitor / merge-exec / base-merge / fix）の未返却だけを対象にして
// おり、state 書込みエージェント自身の未返却は救えず、実装済み・PR 作成済みの item まで catch-all
// の 'failed'（halt カウント対象）へ落ちていた。
//
// 検証の三層構造（pr-saved-failsafe.test.mjs・merge-loop-rescan.test.mjs と同型）:
//   1. スタブ agent による振る舞いテスト（runStateAgent のモデルフォールバック契約・
//      updateState/updateStateDetailed/initAllPending/persistPerWorktreeByteReserveHighWater/
//      loadState の non-throw 契約）。
//   2. 純粋関数（classifyStateWriteFailureStatus / classifyUncaughtFailureStatus）の入出力表。
//   3. ソース走査（配線検証）。runOne・reviewing/monitoring 遷移・掃除ゲートが新設分類関数を
//      参照していること、state 系呼び出しが STATE_AGENT_MODEL_CHAIN 以外で model を直書きして
//      いないこと。
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
const DIST_SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.js',
)
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない（削除・改名は回帰テストを無効化する）`)
}
// マーカー行の行頭までを定義部として切り出す（マーカー行自体は含めない）。
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
// マーカー以降（runOne・runImplement・reviewing/monitoring 遷移・掃除ゲート本体を含む駆動部）は
// Workflow ハーネス依存（注入グローバル args / agent / log / phase）のため import できず、
// ソース走査（文字列探索）で配線を検証する。
const driverPart = source.slice(markerIndex)

// globalThis.args を先に注入してから import する（review-diff-base.test.mjs と同じ前例）。
globalThis.args = { parent: 1 }

const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-state-fallback-'))
const slicePath = join(sliceDir, 'implement-issue-tree-state-defs.mjs')
// 実装スクリプトは `export const meta` 以外の top-level export を持てない（Workflow 起動制約）
// ため、定義部は非 export のまま置き、切り出したスライス側で export 文を付与する。
const SLICE_EXPORTS = [
  'runStateAgent',
  'updateState',
  'updateStateDetailed',
  'initAllPending',
  'loadState',
  'persistPerWorktreeByteReserveHighWater',
  'classifyStateWriteFailureStatus',
  'classifyUncaughtFailureStatus',
  'STATE_AGENT_MODEL_CHAIN',
  'ensureBoundaryNonceSeed',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)

// agent 未注入の import。駆動部の副作用がマーカーより上に混入していればここで失敗する。
const mod = await import(pathToFileURL(slicePath).href)
const {
  runStateAgent,
  updateState,
  updateStateDetailed,
  initAllPending,
  loadState,
  persistPerWorktreeByteReserveHighWater,
  classifyStateWriteFailureStatus,
  classifyUncaughtFailureStatus,
  STATE_AGENT_MODEL_CHAIN,
  ensureBoundaryNonceSeed,
} = mod

// updateState/updateStateDetailed は patch を nonce 境界化するために boundaryNonce を使う
// （本体の未信頼データ対策。テスト対象ではない）。ensureBoundaryNonceSeed を 1 回だけ実行して
// seed を確定させてから、各テストで agent スタブを張り替える。
globalThis.agent = async (_prompt, opts) =>
  (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
globalThis.log = () => {}
await ensureBoundaryNonceSeed()

test('駆動部マーカーは 1 か所のみ存在し、定義部の import は副作用なく成功する', () => {
  assert.equal(source.split(DRIVER_MARKER).length - 1, 1)
  assert.equal(typeof runStateAgent, 'function')
  assert.equal(typeof updateStateDetailed, 'function')
  assert.deepEqual(STATE_AGENT_MODEL_CHAIN, ['haiku', 'sonnet'])
})

// ---------------------------------------------------------------------------
// 層 1: スタブ agent による振る舞いテスト
// ---------------------------------------------------------------------------

// 各テストで globalThis.agent / globalThis.log を張り替える。呼び出し履歴は calls に集約する。
function installAgentStub(behavior) {
  const calls = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    return behavior(opts, calls.length)
  }
  const logs = []
  globalThis.log = (msg) => { logs.push(msg) }
  return { calls, logs }
}

test('(a) haiku が例外 → sonnet へフォールバックしプロンプトはバイト一致・呼び出しは 2 回', async () => {
  const { calls } = installAgentStub((opts) => {
    if (opts.model === 'haiku') throw new Error('subagent completed without calling StructuredOutput')
    return { ok: true }
  })
  const ok = await updateState(101, { status: 'reviewing' })
  assert.equal(ok, true)
  assert.equal(calls.length, 2)
  assert.equal(calls[0].opts.model, 'haiku')
  assert.equal(calls[1].opts.model, 'sonnet')
  assert.equal(calls[0].prompt, calls[1].prompt, 'フォールバック呼び出しはプロンプト文字列がバイト一致でなければならない')
  assert.match(calls[1].opts.label, /:fallback-sonnet$/)
  assert.equal(calls[0].opts.label, 'state:update:#101')
})

test('(b) haiku が null → sonnet へフォールバックして成功する', async () => {
  const { calls } = installAgentStub((opts) => (opts.model === 'haiku' ? null : { ok: true }))
  const ok = await updateState(102, { status: 'reviewing' })
  assert.equal(ok, true)
  assert.equal(calls.length, 2)
})

test('(c) haiku が shape 不正（ok 欠落）→ sonnet へフォールバックする', async () => {
  const { calls } = installAgentStub((opts) => (opts.model === 'haiku' ? {} : { ok: true }))
  const ok = await updateState(103, { status: 'reviewing' })
  assert.equal(ok, true)
  assert.equal(calls.length, 2)
})

test('(d) haiku が ok:true → フォールバックせず呼び出しは 1 回', async () => {
  const { calls } = installAgentStub(() => ({ ok: true }))
  const ok = await updateState(104, { status: 'reviewing' })
  assert.equal(ok, true)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].opts.model, 'haiku')
})

test('(e) haiku が ok:false（応答した上での失敗）→ フォールバックせず outputMissing:false', async () => {
  const { calls } = installAgentStub(() => ({ ok: false }))
  const detail = await updateStateDetailed(105, { status: 'reviewing' })
  assert.equal(calls.length, 1, 'ok:false は StructuredOutput 未返却相当ではないためフォールバックしない')
  assert.equal(detail.ok, false)
  assert.equal(detail.mergeOk, false)
  assert.equal(detail.outputMissing, false)
})

test('(f) haiku・sonnet とも例外 → updateState は reject せず false、掃除エージェントは起動しない', async () => {
  const { calls } = installAgentStub(() => { throw new Error('boom') })
  const detail = await updateStateDetailed(
    106,
    { status: 'failed', worktree: '/tmp/wt-106' },
    { cleanupWorktree: '/tmp/wt-106' },
  )
  assert.equal(detail.ok, false)
  assert.equal(detail.mergeOk, false)
  assert.equal(detail.cleanupOk, false)
  assert.equal(detail.outputMissing, true)
  // マージ段の haiku + sonnet の 2 回のみ。マージ失敗時は掃除段（state:cleanup）を起動しない
  // （回復情報未永続化のまま削除するとデータ損失に直結するため）。
  assert.equal(calls.length, 2)
  assert.ok(calls.every((c) => c.opts.label.startsWith('state:update:#106')))
})

test('(g) マージは成功、掃除段の haiku が例外 → 掃除段だけ sonnet へフォールバックし、掃除プロンプトに patch の自由文が混入しない', async () => {
  const untrustedMarker = 'UNTRUSTED_MARKER_MUST_NOT_LEAK_INTO_CLEANUP'
  const { calls } = installAgentStub((opts) => {
    if (opts.label?.startsWith?.('state:update')) return { ok: true }
    if (opts.model === 'haiku') throw new Error('cleanup agent crashed')
    return { ok: true }
  })
  const ok = await updateState(
    107,
    { status: 'failed', note: untrustedMarker, worktree: '/tmp/wt-107-new' },
    { cleanupWorktree: '/tmp/wt-107-old' },
  )
  assert.equal(ok, true)
  const mergeCalls = calls.filter((c) => c.opts.label.startsWith('state:update:#107'))
  const cleanupCalls = calls.filter((c) => c.opts.label.startsWith('state:cleanup:#107'))
  assert.equal(mergeCalls.length, 1, 'マージ段は 1 回目で ok:true のためフォールバックしない')
  assert.equal(cleanupCalls.length, 2, '掃除段は haiku 例外により sonnet へフォールバックする')
  assert.match(cleanupCalls[1].opts.label, /:fallback-sonnet$/)
  for (const c of cleanupCalls) {
    assert.ok(!c.prompt.includes(untrustedMarker), '掃除プロンプトに patch 由来の自由文が混入してはならない（Issue #144 のコンテキスト分離）')
  }
})

test('(h) initAllPending は haiku・sonnet とも失敗しても reject しない', async () => {
  installAgentStub(() => { throw new Error('boom') })
  await assert.doesNotReject(() => initAllPending([{ number: 1, kind: 'implement' }]))
})

test('(h) persistPerWorktreeByteReserveHighWater は haiku・sonnet とも失敗しても reject せず ok:false を返す', async () => {
  installAgentStub(() => null)
  const result = await persistPerWorktreeByteReserveHighWater(1024 * 1024)
  assert.equal(result.ok, false)
})

test('(i) loadState は haiku・sonnet とも失敗すると throw し、メッセージは未返却専用（「初期化に失敗」ではない）', async () => {
  installAgentStub(() => undefined)
  await assert.rejects(() => loadState(), (err) => {
    assert.match(err.message, /StructuredOutput/)
    assert.doesNotMatch(err.message, /初期化に失敗/)
    return true
  })
})

test('(j) 並列呼び出しでも state:cleanup / state:update の呼び出しは全体として直列化される（enqueueStateWrite）', async () => {
  const order = []
  globalThis.agent = async (prompt, opts) => {
    order.push(opts.label)
    // 直列化されていれば、issue #108 のマージ 1 回 + issue #109 のマージ 1 回のみで割り込まない
    // （いずれも 1 回目で ok:true のためフォールバックは発生しない）。
    return { ok: true }
  }
  globalThis.log = () => {}
  const [ok1, ok2] = await Promise.all([
    updateState(108, { status: 'reviewing' }),
    updateState(109, { status: 'reviewing' }),
  ])
  assert.equal(ok1, true)
  assert.equal(ok2, true)
  assert.equal(order.length, 2)
  // 呼び出し全体が完了しているため順序は 108→109 または 109→108 のいずれかだが、
  // インターリーブ（他方の呼び出しが割り込んで交互に現れる）は起きない 2 者択一であること自体が
  // enqueueStateWrite の直列化契約（各呼び出しはちょうど 1 回で完結する）の検証になる。
  assert.deepEqual(new Set(order), new Set(['state:update:#108', 'state:update:#109']))
})

// ---------------------------------------------------------------------------
// 層 2: 純粋関数の入出力表
// ---------------------------------------------------------------------------

test('classifyStateWriteFailureStatus: outputMissing:true, pr:0 は terminalSaved によらず blocked（PR 未作成のため重複 PR リスクなし）', () => {
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: true, terminalSaved: false, prNumber: 0 }), 'blocked')
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: true, terminalSaved: true, prNumber: 0 }), 'blocked')
})

test('classifyStateWriteFailureStatus: outputMissing:true, pr>0, terminalSaved:true は blocked（この blocked 遷移自体は永続化済み）', () => {
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: true, terminalSaved: true, prNumber: 42 }), 'blocked')
})

test('classifyStateWriteFailureStatus: outputMissing:true, pr>0, terminalSaved:false は failed（Issue #493 codex 指摘。永続化未確認のまま blocked にすると次回 monitoring を再開できず重複実装・重複 PR に繋がり得る）', () => {
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: true, terminalSaved: false, prNumber: 42 }), 'failed')
})

test('classifyStateWriteFailureStatus: outputMissing:false, pr>0, terminalSaved:true は blocked（monitoring 遷移の既存契約）', () => {
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: false, terminalSaved: true, prNumber: 7 }), 'blocked')
})

test('classifyStateWriteFailureStatus: outputMissing:false, pr>0, terminalSaved:false は failed', () => {
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: false, terminalSaved: false, prNumber: 7 }), 'failed')
})

test('classifyStateWriteFailureStatus: outputMissing:false, pr:0 は terminalSaved によらず failed（push 前）', () => {
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: false, terminalSaved: false, prNumber: 0 }), 'failed')
  assert.equal(classifyStateWriteFailureStatus({ outputMissing: false, terminalSaved: true, prNumber: 0 }), 'failed')
})

test('classifyUncaughtFailureStatus: knownPr が正の整数かつ terminalSaved:true なら blocked', () => {
  assert.equal(classifyUncaughtFailureStatus({ knownPr: 1, terminalSaved: true }), 'blocked')
  assert.equal(classifyUncaughtFailureStatus({ knownPr: 999999, terminalSaved: true }), 'blocked')
})

test('classifyUncaughtFailureStatus: knownPr が正の整数でも terminalSaved が true でなければ failed（blocked 保存の永続化未確認。Issue #493 codex 指摘）', () => {
  assert.equal(classifyUncaughtFailureStatus({ knownPr: 1, terminalSaved: false }), 'failed')
  assert.equal(classifyUncaughtFailureStatus({ knownPr: 1, terminalSaved: undefined }), 'failed')
})

test('classifyUncaughtFailureStatus: knownPr が 0・undefined・負数・非整数なら terminalSaved によらず failed', () => {
  assert.equal(classifyUncaughtFailureStatus({ knownPr: 0, terminalSaved: true }), 'failed')
  assert.equal(classifyUncaughtFailureStatus({ knownPr: undefined, terminalSaved: true }), 'failed')
  assert.equal(classifyUncaughtFailureStatus({ knownPr: -1, terminalSaved: true }), 'failed')
  assert.equal(classifyUncaughtFailureStatus({ knownPr: 1.5, terminalSaved: true }), 'failed')
})

// ---------------------------------------------------------------------------
// 層 3: ソース走査（配線検証）
// ---------------------------------------------------------------------------

test('定義部・駆動部とも、STATE_AGENT_MODEL_CHAIN 以外に phase: \'State\', model: \'haiku\' の state:* 直書きが無い', () => {
  // state:update / state:cleanup / state:init-all / state:high-water / state:load の 5 ラベルは
  // すべて runStateAgent 経由になっている必要がある（worktree:orphan-scan 等の他の phase:'State'
  // ラベルは対象外・Issue #493 の適用範囲表参照）。
  const stateLabelRe = /label:\s*['"`](state:(update|cleanup|init-all|high-water|load))/g
  let match
  let found = 0
  while ((match = stateLabelRe.exec(source)) !== null) {
    found++
    // 直前 200 文字に `agent(` の直接呼び出し形（`await agent(` の直後の options に
    // label: 'state:...' が現れる形）が無いことを、`schema: STATE_WRITE_SCHEMA` /
    // `schema: STATE_LOAD_SCHEMA` の直前に runStateAgent 呼び出しの結果分解代入
    // （`const { result`）が存在するかで機械検証する。
    const windowStart = Math.max(0, match.index - 2500)
    const window = source.slice(windowStart, match.index + 200)
    assert.match(
      window,
      /runStateAgent\(/,
      `${match[1]} 呼び出しが runStateAgent 経由になっていない（agent() 直呼びが残っている）`,
    )
  }
  assert.ok(found >= 5, `state 系ラベルが期待より少ない（見つかった数: ${found}）`)
})

test('runOne の catch ブロックが classifyUncaughtFailureStatus に terminalSaved を渡し、recordFailure へ status を渡している（Issue #493 codex 指摘: blocked 降格は永続化成功時のみ）', () => {
  const catchIdx = driverPart.indexOf('async function runOne(item) {')
  assert.notEqual(catchIdx, -1, 'runOne が見つからない')
  const body = driverPart.slice(catchIdx, catchIdx + 1800)
  assert.match(body, /classifyUncaughtFailureStatus\(\{ knownPr, terminalSaved \}\)/)
  // 'blocked' patch（pr を含む）の保存成否を確認してから classify していること
  // （knownPrByIssue への in-memory 登録だけでは terminalSaved を保証しないため）。
  assert.match(body, /terminalSaved\s*=\s*await updateState\(/)
  assert.match(body, /status:\s*'blocked'/)
  assert.match(body, /recordFailure\(\{/)
  assert.match(body, /knownPrByIssue\.get\(item\.number\)/)
})

test('knownPrByIssue は PR 作成成功直後と monitoring 再開時の両方で set される', () => {
  const setCalls = driverPart.match(/knownPrByIssue\.set\(/g) ?? []
  assert.equal(setCalls.length, 2, 'knownPrByIssue.set の呼び出しは monitoring 再開時と PR 作成成功直後の 2 か所でなければならない')
})

test('reviewing 遷移（continue 経路・通常経路）はいずれも classifyStateWriteFailureStatus を参照する', () => {
  const continueIdx = driverPart.indexOf('const continueReviewingAttempt1 =')
  assert.notEqual(continueIdx, -1)
  assert.match(driverPart.slice(continueIdx, continueIdx + 1500), /classifyStateWriteFailureStatus\(/)

  const normalIdx = driverPart.indexOf('const reviewingAttempt1 =')
  assert.notEqual(normalIdx, -1)
  assert.match(driverPart.slice(normalIdx, normalIdx + 1500), /classifyStateWriteFailureStatus\(/)
})

test('monitoring 遷移は classifyStateWriteFailureStatus を参照し、outputMissing を渡している', () => {
  const idx = driverPart.indexOf('const monitoringAttempt1 =')
  assert.notEqual(idx, -1)
  const body = driverPart.slice(idx, idx + 1500)
  assert.match(body, /classifyStateWriteFailureStatus\(\{/)
  assert.match(body, /outputMissing:\s*monitoringAttempt\.outputMissing/)
})

test('Recover の掃除ゲート（continue / discard）はいずれも classifyStateWriteFailureStatus を参照する', () => {
  const continueCleanupIdx = driverPart.indexOf('const continueCleanupAttempt =')
  assert.notEqual(continueCleanupIdx, -1)
  assert.match(driverPart.slice(continueCleanupIdx, continueCleanupIdx + 1000), /classifyStateWriteFailureStatus\(/)

  const discardCleanupIdx = driverPart.indexOf('const discardCleanupAttempt =')
  assert.notEqual(discardCleanupIdx, -1)
  assert.match(driverPart.slice(discardCleanupIdx, discardCleanupIdx + 1000), /classifyStateWriteFailureStatus\(/)
})

test('生成物 implement-issue-tree.js にも runStateAgent と STATE_AGENT_MODEL_CHAIN が存在する（ビルド漏れ検知）', () => {
  const dist = readFileSync(DIST_SCRIPT_PATH, 'utf8')
  assert.match(dist, /function runStateAgent\(/)
  assert.match(dist, /STATE_AGENT_MODEL_CHAIN/)
  assert.match(dist, /classifyStateWriteFailureStatus/)
  assert.match(dist, /classifyUncaughtFailureStatus/)
})
