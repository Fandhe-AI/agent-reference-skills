// 掃除で消えたと確認できなかった（保持・結果なし・例外）worktree を残置の台帳（ephemeralWorktrees）へ載せる配線の回帰テスト
// （Issue #603 第 7 弾・PR #623 の codex P1）。
//
// 背景: fix の旧 worktree は「置換され純増しない」前提で台帳に記録しない。worktree-remove.sh が lock や submodule の未記録の変更で
// 保持すると、そのパスが件数・バイトの両軸から漏れ、上限を超えても新規着手を許し得た（旧実装は --force で必ず消していた）。
//
// 二層:
//   1. 定義部（updateStateDetailed・sweepClosedWorktrees）: 登録の条件・重複排除・開始時観測との二重計上の回避・fail-closed。
//   2. 実装スクリプト全体（stub agent）: 2 回目の fix の旧 worktree が保持されると、件数軸の新規着手の閾値が上がり、
//      バイト軸の測定対象に入って上限判定に効く。
//
// 台帳の不変条件（PR #623 の Bugbot High）: 台帳（+ 開始時観測）は物理的に存在しうる worktree を重複なく 1 件ずつ数える。fix のような置換で
// 旧 worktree が保持されると物理的には 2 本になるので、旧（載っていなければ kind retained）に加えて新しい worktree（kind replacement）も載せる。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { importDefinitions, runScript, BASE_ARGS, source } from './lib/stub-run.mjs'
import { signedReply, commandInputOf } from './lib/signed-output.mjs'

globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }

function stub(behavior) {
  const calls = []
  const logs = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    return behavior(opts, prompt)
  }
  globalThis.log = (msg) => { logs.push(msg) }
  return { calls, logs }
}

// 台帳・開始時観測・削除確認済みの集合はモジュール内に溜まるので、テストごとに新しいモジュールを読み込む
async function fresh(tag) {
  globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
  globalThis.log = () => {}
  const mod = await importDefinitions(
    ['updateStateDetailed', 'sweepClosedWorktrees', 'confirmedRemovedPaths', 'ephemeralWorktrees', 'residualStartPathSet', 'recordEphemeralWorktree', 'ensureBoundaryNonceSeed', 'planReplacementAccounting', 'slotInheritedPaths', 'slotUnknownLiveCount', 'slotRetainedPaths', 'sweepEligiblePaths', 'sweepHeldPaths', 'recordReplacementWorktree', 'applyReplacementAccounting', 'recordRetainedWorktree', 'reviveAfterCleanup'],
    tag,
  )
  await mod.ensureBoundaryNonceSeed()
  return mod
}

const retainedEntries = (f) => f.ephemeralWorktrees.filter((e) => e.kind === 'retained')
const cleanupOf = (reply) => (opts) => (opts.label.startsWith('state:cleanup') ? reply : { ok: true })
const KEPT = { ok: true, retained: true }
const GONE = { ok: true, retained: false }

// ---- 1. 定義部 ----

test('fix の旧 worktree（superseded）が保持されると台帳に kind retained で載る。消えた（retained:false）ものは載らない', async () => {
  const f = await fresh('ledger-1')
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(40, { fixCount: 1, worktree: '/tmp/new-40' }, { cleanupWorktree: '/tmp/old-40' })
  assert.deepEqual(retainedEntries(f), [{ issue: 40, kind: 'retained', path: '/tmp/old-40' }])
  assert.ok(!f.confirmedRemovedPaths.has('/tmp/old-40'))

  stub(cleanupOf(GONE))
  await f.updateStateDetailed(41, { fixCount: 1, worktree: '/tmp/new-41' }, { cleanupWorktree: '/tmp/old-41' })
  assert.equal(retainedEntries(f).length, 1, '消えたパスは台帳に載せない')
  assert.ok(f.confirmedRemovedPaths.has('/tmp/old-41'))
})

test('種別を問わず載る: merged・discard（保持は ok:false）・ブランチ削除の失敗を伴わない保持。ブランチ削除だけが失敗して worktree は消えたものは載らない', async () => {
  const f = await fresh('ledger-2')
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(42, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-42' })
  stub(cleanupOf({ ok: false, retained: true }))
  await f.updateStateDetailed(43, { branch: 'feat/43-x', worktree: '' }, { cleanupWorktree: '/tmp/wt-43', cleanupMode: 'discard', deleteBranch: true })
  assert.deepEqual(retainedEntries(f).map((e) => e.path), ['/tmp/wt-42', '/tmp/wt-43'])

  stub(cleanupOf({ ok: false, retained: false }))
  await f.updateStateDetailed(44, { branch: 'feat/44-x' }, { cleanupWorktree: '/tmp/wt-44', cleanupMode: 'discard', deleteBranch: true })
  assert.equal(retainedEntries(f).length, 2, 'worktree は消えている（ブランチの削除だけが失敗）ので件数に数えない')
})

test('結果なし・無効な結果・例外・状態マージの失敗でも、消えたと確認できないので載せる（fail-closed）', async () => {
  const cases = [
    ['結果なし', (opts) => (opts.label.startsWith('state:cleanup') ? null : { ok: true })],
    ['無効な結果', (opts) => (opts.label.startsWith('state:cleanup') ? { ok: true } : { ok: true })],
    ['掃除が例外', (opts) => { if (opts.label.startsWith('state:cleanup')) throw new Error('boom'); return { ok: true } }],
    ['マージ段が失敗', () => ({ ok: false })],
  ]
  for (const [name, behavior] of cases) {
    const f = await fresh(`ledger-3-${name}`)
    stub(behavior)
    await f.updateStateDetailed(45, { status: 'merged' }, { cleanupWorktree: '/tmp/wt-45' }).catch(() => {})
    assert.deepEqual(retainedEntries(f).map((e) => e.path), ['/tmp/wt-45'], name)
  }
})

test('同じパスを 2 回保持しても 1 件。台帳に既にあるパス・開始時観測に含まれていたパスは二重計上しない。検証を通らないパスは載せない', async () => {
  const f = await fresh('ledger-4')
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(46, { fixCount: 1 }, { cleanupWorktree: '/tmp/wt-46' })
  await f.updateStateDetailed(46, { fixCount: 2 }, { cleanupWorktree: '/tmp/wt-46' })
  assert.equal(retainedEntries(f).length, 1, '同じパスの 2 回目は載せない')

  // 本ランで記録済みの実装 worktree（kind implement）が保持されても、件数・バイトとも既に数えている
  f.recordEphemeralWorktree(47, '/tmp/impl-47', 'implement')
  await f.updateStateDetailed(47, { fixCount: 1 }, { cleanupWorktree: '/tmp/impl-47' })
  assert.equal(f.ephemeralWorktrees.filter((e) => e.path === '/tmp/impl-47').length, 1)

  // 開始時の観測（residualPathsAtStart）に含まれるパスは「開始時観測 + 本ラン積み増し」の前者で数えている
  f.residualStartPathSet.add('/tmp/start-48')
  await f.updateStateDetailed(48, { fixCount: 1 }, { cleanupWorktree: '/tmp/start-48' })
  assert.ok(!f.ephemeralWorktrees.some((e) => e.path === '/tmp/start-48'))

  const before = f.ephemeralWorktrees.length
  await f.updateStateDetailed(49, { fixCount: 1 }, { cleanupWorktree: "/tmp/a'b" })
  assert.equal(f.ephemeralWorktrees.length, before)
})

test('最終スイープ: 消せた候補は削除確認済みへ、消えたと確認できない候補（保持・結果なし・例外）は台帳へ載せる。既に削除確認済みの候補は載せない', async () => {
  const f = await fresh('ledger-5')
  f.confirmedRemovedPaths.add('/tmp/orph-gone')
  stub(() => ({ removed: ['/tmp/orph-1'] }))
  assert.deepEqual(await f.sweepClosedWorktrees(['/tmp/orph-1', '/tmp/orph-2', '/tmp/orph-gone']), ['/tmp/orph-1'])
  assert.ok(f.confirmedRemovedPaths.has('/tmp/orph-1'))
  assert.deepEqual(retainedEntries(f).map((e) => e.path), ['/tmp/orph-2'])
  assert.equal(retainedEntries(f)[0].issue, 0, 'スイープ由来は issue 0')

  stub(() => null)
  await f.sweepClosedWorktrees(['/tmp/orph-3'])
  stub(() => { throw new Error('boom') })
  await f.sweepClosedWorktrees(['/tmp/orph-4'])
  assert.deepEqual(retainedEntries(f).map((e) => e.path), ['/tmp/orph-2', '/tmp/orph-3', '/tmp/orph-4'])
})

const replacementEntries = (f) => f.ephemeralWorktrees.filter((e) => e.kind === 'replacement')

test('置換: 旧 worktree が保持されると、旧（台帳に無ければ retained）に加えて新しい worktree が kind replacement で載る。旧が消えたら新は載せない', async () => {
  const f = await fresh('ledger-r1')
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(60, { fixCount: 1, worktree: '/tmp/new-60' }, { cleanupWorktree: '/tmp/old-60', replacementWorktree: '/tmp/new-60' })
  assert.deepEqual(retainedEntries(f), [{ issue: 60, kind: 'retained', path: '/tmp/old-60' }])
  assert.deepEqual(replacementEntries(f), [{ issue: 60, kind: 'replacement', path: '/tmp/new-60' }])

  f.recordEphemeralWorktree(61, '/tmp/old-61', 'implement')
  stub(cleanupOf(GONE))
  await f.updateStateDetailed(61, { fixCount: 1, worktree: '/tmp/new-61' }, { cleanupWorktree: '/tmp/old-61', replacementWorktree: '/tmp/new-61' })
  assert.equal(replacementEntries(f).length, 1, '旧（台帳にある実装 worktree）が消えたなら台帳の 1 件が新へ引き継がれる（純増しない）')
})

test('置換: 旧が台帳にある実装 worktree なら旧は二重に載せず、新だけが載る（物理 2 本 = 台帳 2 件）', async () => {
  const f = await fresh('ledger-r2')
  f.recordEphemeralWorktree(62, '/tmp/impl-62', 'implement')
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(62, { fixCount: 1, worktree: '/tmp/fix-62' }, { cleanupWorktree: '/tmp/impl-62', replacementWorktree: '/tmp/fix-62' })
  assert.deepEqual(f.ephemeralWorktrees.map((e) => [e.kind, e.path]), [['implement', '/tmp/impl-62'], ['replacement', '/tmp/fix-62']])
  // 2 回目の fix でも旧（1 回目の新）は台帳にあるので載せず、新だけが増える
  await f.updateStateDetailed(62, { fixCount: 2, worktree: '/tmp/fix-62b' }, { cleanupWorktree: '/tmp/fix-62', replacementWorktree: '/tmp/fix-62b' })
  assert.deepEqual(f.ephemeralWorktrees.map((e) => e.path), ['/tmp/impl-62', '/tmp/fix-62', '/tmp/fix-62b'])
  // 新が台帳・開始時観測に既にあるパスなら二重に数えない
  await f.updateStateDetailed(62, { fixCount: 3, worktree: '/tmp/impl-62' }, { cleanupWorktree: '/tmp/fix-62b', replacementWorktree: '/tmp/impl-62' })
  f.residualStartPathSet.add('/tmp/start-62')
  await f.updateStateDetailed(62, { fixCount: 4, worktree: '/tmp/start-62' }, { cleanupWorktree: '/tmp/fix-62b', replacementWorktree: '/tmp/start-62' })
  assert.deepEqual(f.ephemeralWorktrees.map((e) => e.path), ['/tmp/impl-62', '/tmp/fix-62', '/tmp/fix-62b'])
})

test('置換: 新パスが不明（空文字）でも旧が保持されたら件数を 1 増やす（path 空のプレースホルダー）。結果なし・例外でも同じ。指定しない呼び出し（merged など）は旧だけ。新旧が同じでも二重に数えない', async () => {
  const f = await fresh('ledger-r3')
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(63, { fixCount: 1, worktree: '' }, { cleanupWorktree: '/tmp/old-63', replacementWorktree: '' })
  assert.deepEqual(replacementEntries(f), [{ issue: 63, kind: 'replacement', path: '' }])
  await f.updateStateDetailed(63, { fixCount: 2, worktree: '' }, { cleanupWorktree: '/tmp/old-63b', replacementWorktree: '' })
  assert.equal(replacementEntries(f).length, 2, '空パスは重複排除できないので呼び出しごとに 1 件')

  stub(() => null)
  await f.updateStateDetailed(64, { fixCount: 1 }, { cleanupWorktree: '/tmp/old-64', replacementWorktree: '/tmp/new-64' })
  assert.ok(replacementEntries(f).some((e) => e.path === '/tmp/new-64'), '結果なしは消えたと確認できないので新も載せる')

  stub(cleanupOf(KEPT))
  const before = f.ephemeralWorktrees.length
  await f.updateStateDetailed(65, { status: 'merged' }, { cleanupWorktree: '/tmp/old-65' })
  assert.equal(f.ephemeralWorktrees.length, before + 1, 'replacementWorktree を渡さない呼び出し（merged など）は旧だけ')
  await f.updateStateDetailed(66, { fixCount: 1 }, { cleanupWorktree: '/tmp/same-66', replacementWorktree: '/tmp/same-66' })
  assert.equal(f.ephemeralWorktrees.filter((e) => e.path === '/tmp/same-66').length, 1, '新旧が同じパスでも二重に数えない')
})

test('予約の差し引き（recordedByIssue）は retained・replacement を数えない: 事後に載せた分は予約済みの枠を食わない', () => {
  const guarded = source.split('if (!LEDGER_ONLY_KINDS.has(e.kind)) recordedByIssue.set(').length - 1
  const all = source.split('recordedByIssue.set(').length - 1
  assert.equal(all, 4)
  assert.equal(guarded, 4)
  assert.match(source, /const LEDGER_ONLY_KINDS = new Set\(\['retained', 'replacement'\]\)/)
  assert.doesNotMatch(source, /EPHEMERAL_KIND_MAX = Object\.freeze\(\{[^}]*(retained|replacement)/, 'retained・replacement は予約（EPHEMERAL_KIND_MAX）に含めない')
})

test('置換を渡す呼び出しは fix の 2 経路（Review ループ・Merge ループ）と fallback の 2 経路だけ', () => {
  assert.equal(source.split('replacementWorktree: currentWorktreePath').length - 1, 2)
  assert.equal(source.split('replacementWorktree: impl.worktreePath').length - 1, 2)
})

// ---- 2. 実装スクリプト全体 ----

const FIX_A = '/repo/wt/fix-a'
const FIX_B = '/repo/wt/fix-b'

// #2: Review が 2 回指摘 → fix を 2 回（旧 worktree は 1 回目が実装 worktree、2 回目が FIX_A）→ 3 回目の Review で通過。
// 2 回目の掃除（旧 = FIX_A。台帳には載っていない）の結果を oldFixResult で切り替える。#3 は既定の流れ
function overrides({ oldFixResult, firstFixResult = GONE, fixRounds = 2, fixPaths = [FIX_A, FIX_B], extra = () => undefined }) {
  const seen = { review: 0, fix: 0, cleanup: 0 }
  return (label, opts, prompt) => {
    if (label === 'review:#2') {
      seen.review += 1
      return seen.review <= fixRounds
        ? { state: 'needs-fix', highestSeverity: 'medium', summary: 's', worktreePath: '/repo/wt/r2' }
        : { state: 'ok', highestSeverity: 'none', summary: 's', worktreePath: '/repo/wt/r2' }
    }
    if (label === 'fix:#2') {
      seen.fix += 1
      return { pushed: false, summary: 'fixed', worktreePath: fixPaths[seen.fix - 1] ?? FIX_B }
    }
    if (label === 'state:cleanup:#2') {
      seen.cleanup += 1
      return seen.cleanup === 1 ? firstFixResult : oldFixResult
    }
    return extra(label, opts, prompt)
  }
}

const started3 = (calls) => calls.some((c) => /^(plan|impl):#3$/.test(c.opts.label))

// #3 が着手できる最小の maxResidualWorktrees
async function minLimitStarting3(oldFixResult, firstFixResult = GONE, fixPaths) {
  for (let limit = 1; limit <= 60; limit++) {
    const { calls } = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktrees: limit },
      leaves: [2, 3],
      override: overrides({ oldFixResult, firstFixResult, ...(fixPaths ? { fixPaths } : {}) }),
    })
    if (started3(calls)) return limit
  }
  return null
}

test('件数軸: 1 回目の fix で旧が消えたあと 2 回目の fix の旧（1 回目の新）が保持されても、台帳は +1 だけ（旧は引き継ぎ済みの 1 件が数える。保持されなければ上がらない）', async () => {
  const removed = await minLimitStarting3(GONE)
  const kept = await minLimitStarting3(KEPT)
  assert.ok(removed !== null && kept !== null, `着手できる上限が見つかる: ${removed} / ${kept}`)
  // 物理: 保持された FIX_A と現行の FIX_B の 2 本。台帳: 実装の 1 件（1 回目の fix の新 FIX_A を引き継ぐ）+ FIX_B の replacement で、removed 比 +1（Issue #624 の 3 つ目。旧実装は +2 の過大計上）
  assert.equal(kept, removed + 1)
})

test('件数軸: 1 回目の fix で実装 worktree が保持されると台帳は 2 件・閾値は +1。2 回目の fix でも保持されると +1 ずつ（Bugbot High）', async () => {
  const base = await minLimitStarting3(GONE, GONE)
  const first = await minLimitStarting3(GONE, KEPT)
  const both = await minLimitStarting3(KEPT, KEPT)
  assert.equal(first, base + 1, '1 回目: 実装 worktree が残り、FIX_A が増える')
  assert.equal(both, base + 2, '2 回目: FIX_A が残り、FIX_B が増える')

  const ledger = async (firstFixResult, oldFixResult) => {
    const { result } = await runScript({ args: { ...BASE_ARGS, maxResidualWorktrees: 100 }, leaves: [2], override: overrides({ oldFixResult, firstFixResult }) })
    return result.residualWorktrees.addedThisRun
  }
  const n0 = await ledger(GONE, GONE)
  assert.equal(await ledger(KEPT, GONE), n0 + 1)
  assert.equal(await ledger(KEPT, KEPT), n0 + 2)
})

test('件数軸: 保持を結果なし（null）で返しても同じ（消えたと確認できない）', async () => {
  const removed = await minLimitStarting3(GONE)
  const none = await minLimitStarting3(null)
  assert.equal(none, removed + 1)
  assert.equal(await minLimitStarting3(GONE, null), removed + 1)
})

test('ラン終了時の報告: 保持した worktree は使い捨てと別の見出しで出し、返却値は retainedWorktrees に分ける。置換後の現行 worktree は案内に出さない', async () => {
  const { result, logs } = await runScript({ args: { ...BASE_ARGS, maxResidualWorktrees: 100 }, leaves: [2], override: overrides({ oldFixResult: KEPT }) })
  assert.ok(result.retainedWorktrees.some((e) => e.kind === 'retained' && e.path === FIX_A))
  assert.ok(!result.ephemeralWorktrees.some((e) => e.kind === 'retained' || e.kind === 'replacement'))

  const disposableHead = logs.findIndex((l) => l.startsWith('使い捨て worktree（review'))
  const retainedHead = logs.findIndex((l) => l.startsWith('削除せず保持した worktree'))
  assert.ok(disposableHead >= 0 && retainedHead >= 0, '見出しが 2 つ出る')
  assert.match(logs[retainedHead], /retained-dirty/)
  assert.match(logs[retainedHead], /retained-locked/)
  assert.match(logs[retainedHead], /retained-submodule/)
  assert.match(logs[retainedHead], /中身を確認してから手動で対処/)
  assert.doesNotMatch(logs[retainedHead], /不要であれば git worktree remove で手動削除/)
  const listed = (from, to) => logs.slice(from + 1, to).filter((l) => /^ {2}(#|\()/.test(l))
  const disposableLines = listed(disposableHead, retainedHead > disposableHead ? retainedHead : logs.length)
  assert.ok(disposableLines.length > 0)
  assert.ok(!disposableLines.some((l) => l.includes('(retained)') || l.includes(FIX_A)), '保持した worktree は使い捨ての一覧に出ない')
  const retainedLines = listed(retainedHead, logs.length).filter((l) => l.includes('(retained)'))
  assert.equal(retainedLines.length, 1)
  assert.ok(retainedLines[0].includes(FIX_A))
  assert.ok(!logs.some((l) => /^ {2}.*\(replacement\)/.test(l)), '置換後の現行 worktree は案内に出さない')
})

test('保持が無いラン: 保持の見出しは出ない', async () => {
  const { logs, result } = await runScript({ args: { ...BASE_ARGS, maxResidualWorktrees: 100 }, leaves: [2], override: overrides({ oldFixResult: GONE }) })
  assert.ok(!logs.some((l) => l.startsWith('削除せず保持した worktree')))
  assert.deepEqual(result.retainedWorktrees, [])
})

const GIB_KIB = 1024 * 1024
// du の応答: 入力のパス列に FIX_A が含まれていれば 1 GiB、なければ 1 MiB（測定の対象に保持したパスが入るかを見る）
function bytesExtra(measured) {
  return (label, opts, prompt) => {
    if (label === 'worktree:residual-bytes') {
      const input = commandInputOf(prompt) ?? ''
      measured.push(input.split('\n'))
      const count = input === '' ? 0 : input.split('\n').length
      return signedReply(prompt, { kib: input.includes(FIX_A) ? GIB_KIB : 1024, err: 0, missing: 0, count })
    }
    if (label === 'worktree:free-disk-bytes') return signedReply(prompt, { freeKib: 1e10, err: 0 })
    return undefined
  }
}

test('バイト軸: 保持したパスが測定の対象に入り、上限を超えると新規着手が止まる。消えたパスは対象に入らず止まらない', async () => {
  const run = async (oldFixResult) => {
    const measured = []
    const { calls } = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktreeBytes: 512 * 1024 * 1024, maxResidualWorktrees: 100 },
      leaves: [2, 3],
      override: overrides({ oldFixResult, extra: bytesExtra(measured) }),
    })
    return { measured, started: started3(calls) }
  }
  const gone = await run(GONE)
  assert.ok(!gone.measured.some((paths) => paths.includes(FIX_A)), '消えたパスは測定の対象に入らない')
  assert.equal(gone.started, true, '上限内なので #3 は着手する')

  const kept = await run(KEPT)
  assert.ok(kept.measured.some((paths) => paths.includes(FIX_A)), '保持したパスが測定の対象に入る')
  assert.equal(kept.started, false, '保持したパスの実測が上限を超えるので #3 は着手しない')
})

test('バイト軸: fix が 1 回だけのとき、実装 worktree が保持されても消えても、置換後の worktree（FIX_A）が測定の対象に入り、上限を超えると新規着手が止まる', async () => {
  const run = async (firstFixResult) => {
    const measured = []
    const { calls } = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktreeBytes: 512 * 1024 * 1024, maxResidualWorktrees: 100 },
      leaves: [2, 3],
      override: overrides({ firstFixResult, oldFixResult: GONE, fixRounds: 1, extra: bytesExtra(measured) }),
    })
    return { measured, started: started3(calls) }
  }
  const kept = await run(KEPT)
  assert.ok(kept.measured.some((paths) => paths.includes(FIX_A)), '置換後の worktree が測定の対象に入る')
  assert.equal(kept.started, false, '実測が上限を超えるので #3 は着手しない')
  const gone = await run(GONE)
  assert.ok(gone.measured.some((paths) => paths.includes(FIX_A)), '旧が消えても置換後の worktree は実在するので測定の対象に入る（Issue #624 の 2 つ目。台帳の 1 件が引き継ぐが、バイトは新のパスで測る）')
  assert.equal(gone.started, false, '置換後の worktree の実測が上限を超えるので #3 は着手しない')
})

// ---- 3. 計上規則（Issue #624）----

test('planReplacementAccounting の表: 旧が消えたら件数は動かず新を引き継ぐ。消えなければ旧（未計上のときだけ）と新を載せる。旧のパスが空でも新は載せる', async () => {
  const f = (await fresh('ledger-plan')).planReplacementAccounting
  const P = (o) => f({ oldPath: '/o', oldRemoved: false, newPath: '/n', oldCounted: false, newCounted: false, ...o })
  const none = { addRetainedOld: false, addReplacement: false, inheritPath: '', inheritUnknown: false }
  const rows = [
    ['消えた・旧が計上済みなら件数は動かず新を引き継ぐ', { oldRemoved: true, oldCounted: true }, { ...none, inheritPath: '/n' }],
    ['消えた・旧が計上済み・新が不明', { oldRemoved: true, oldCounted: true, newPath: '' }, { ...none, inheritUnknown: true }],
    ['消えた・旧が未計上なら引き継ぎ先が無いので新を 1 件載せる', { oldRemoved: true, oldCounted: false }, { ...none, addReplacement: true }],
    ['消えた・旧が未計上・新が不明', { oldRemoved: true, oldCounted: false, newPath: '' }, { ...none, addReplacement: true }],
    ['消えた・旧が未計上・新が計上済み', { oldRemoved: true, oldCounted: false, newCounted: true }, none],
    ['保持・旧が未計上・新あり', {}, { ...none, addRetainedOld: true, addReplacement: true }],
    ['保持・旧が計上済み・新あり', { oldCounted: true }, { ...none, addReplacement: true }],
    ['保持・旧が計上済み・新も計上済み', { oldCounted: true, newCounted: true }, none],
    ['保持・新が不明は重複排除できず毎回 1 件', { oldCounted: true, newPath: '', newCounted: false }, { ...none, addReplacement: true }],
    ['旧のパスが空（掃除を試みていない）・新あり', { oldPath: '', oldRemoved: false }, { ...none, addReplacement: true }],
    ['旧のパスが空・新も不明', { oldPath: '', newPath: '' }, { ...none, addReplacement: true }],
    ['旧が空で消えたと渡されても消えた扱いにしない', { oldPath: '', oldRemoved: true }, { ...none, addReplacement: true }],
    ['新旧が同じパス', { newPath: '/o' }, { ...none, addRetainedOld: true }],
  ]
  for (const [name, over, want] of rows) assert.deepEqual(P(over), want, name)
})
// 物理の本数を数える小さなモデル: 台帳（+ 開始時観測）の件数が、実在する worktree の本数以上で、かつ過大にならないことを手順ごとに確かめる
test('連続した置換の台帳: 消えた→保持、パスなしの fix の次の fix、消えた→消えたが、物理の本数と一致する（過小にも過大にもならない）', async () => {
  // 1) 実装 → fix1（旧が消えた）→ fix2（旧 = fix1 の新が保持）: 物理は fix1 の新と fix2 の新の 2 本 = 台帳 2 件（実装の 1 件 + fix2 の新）
  const f = await fresh('ledger-seq1')
  f.recordEphemeralWorktree(70, '/tmp/impl-70', 'implement')
  stub(cleanupOf(GONE))
  await f.updateStateDetailed(70, { fixCount: 1, worktree: '/tmp/fix1-70' }, { cleanupWorktree: '/tmp/impl-70', replacementWorktree: '/tmp/fix1-70' })
  assert.equal(f.ephemeralWorktrees.length, 1, '旧が消えたので純増しない')
  assert.ok(f.slotInheritedPaths.has('/tmp/fix1-70'), '新はバイトの測定対象として引き継ぐ')
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(70, { fixCount: 2, worktree: '/tmp/fix2-70' }, { cleanupWorktree: '/tmp/fix1-70', replacementWorktree: '/tmp/fix2-70' })
  assert.deepEqual(f.ephemeralWorktrees.map((e) => [e.kind, e.path]), [['implement', '/tmp/impl-70'], ['replacement', '/tmp/fix2-70']], '引き継ぎ済みの旧は retained で二重に載せない')
  assert.equal(retainedEntries(f).length, 0)

  // 2) パスを返さない fix（旧は消えた）→ 次の fix（旧のパスが空）: 物理は不明の 1 本と次の新の 2 本 = 台帳 2 件
  const g = await fresh('ledger-seq2')
  g.recordEphemeralWorktree(71, '/tmp/impl-71', 'implement')
  stub(cleanupOf(GONE))
  await g.updateStateDetailed(71, { fixCount: 1, worktree: '' }, { cleanupWorktree: '/tmp/impl-71', replacementWorktree: '' })
  assert.equal(g.ephemeralWorktrees.length, 1)
  assert.equal(g.slotUnknownLiveCount, 1, '不明なパスの新は件数を引き継ぎ、バイトは物理一覧で測る')
  await g.updateStateDetailed(71, { fixCount: 2, worktree: '/tmp/fix2-71' }, { cleanupWorktree: '', replacementWorktree: '/tmp/fix2-71' })
  assert.deepEqual(g.ephemeralWorktrees.map((e) => [e.kind, e.path]), [['implement', '/tmp/impl-71'], ['replacement', '/tmp/fix2-71']], '旧のパスが空でも新は載せる（Issue #624 の 1 つ目）')
  assert.equal(g.slotUnknownLiveCount, 1, '不明の 1 本は残り続ける')

  // 3) 消えた→消えた: 純増しない。バイトの測定対象は現行の 1 本（消えた旧は削除確認済みで外れる）
  const h = await fresh('ledger-seq3')
  h.recordEphemeralWorktree(72, '/tmp/impl-72', 'implement')
  stub(cleanupOf(GONE))
  await h.updateStateDetailed(72, { fixCount: 1 }, { cleanupWorktree: '/tmp/impl-72', replacementWorktree: '/tmp/fix1-72' })
  await h.updateStateDetailed(72, { fixCount: 2 }, { cleanupWorktree: '/tmp/fix1-72', replacementWorktree: '/tmp/fix2-72' })
  assert.equal(h.ephemeralWorktrees.length, 1)
  assert.ok(h.confirmedRemovedPaths.has('/tmp/fix1-72') && h.slotInheritedPaths.has('/tmp/fix2-72'))
})

test('旧が未計上のまま消えた置換（手動削除済みのパスを状態ファイルが指していた monitoring 再開）は新を 1 件載せる。引き継ぎ済みのパスは retained で二重に載せない（Issue #624 レビュー）', async () => {
  const f = await fresh('ledger-uncounted')
  stub(cleanupOf(GONE))
  await f.updateStateDetailed(74, { fixCount: 1 }, { cleanupWorktree: '/tmp/ghost-74', replacementWorktree: '/tmp/fix1-74' })
  assert.deepEqual(f.ephemeralWorktrees.map((e) => [e.kind, e.path]), [['replacement', '/tmp/fix1-74']], '物理は新の 1 本なので件数も 1')
  // 重複排除の集合は 1 つ: 引き継いだ新を replacementWorktree 無しの掃除（merged など）が保持しても二重に載せない
  const g = await fresh('ledger-inherit-dedup')
  g.recordEphemeralWorktree(75, '/tmp/impl-75', 'implement')
  stub(cleanupOf(GONE))
  await g.updateStateDetailed(75, { fixCount: 1 }, { cleanupWorktree: '/tmp/impl-75', replacementWorktree: '/tmp/fix1-75' })
  stub(cleanupOf(KEPT))
  await g.updateStateDetailed(75, { status: 'merged' }, { cleanupWorktree: '/tmp/fix1-75' })
  assert.equal(g.ephemeralWorktrees.length, 1, '引き継ぎ済みの新は 1 件が数えている')
  assert.equal(retainedEntries(g).length, 0)
  assert.equal(g.slotRetainedPaths.get('/tmp/fix1-75'), 75, '台帳には載せないが、ラン終了時の「保持した worktree」の案内には出す')
})

test('開始時観測にある旧を消して置換しても件数は動かない。保持したら新の 1 件だけ載る（旧は観測が数えている）', async () => {
  const f = await fresh('ledger-seq4')
  f.residualStartPathSet.add('/tmp/start-73')
  stub(cleanupOf(GONE))
  await f.updateStateDetailed(73, { fixCount: 1 }, { cleanupWorktree: '/tmp/start-73', replacementWorktree: '/tmp/fix1-73' })
  assert.equal(f.ephemeralWorktrees.length, 0)
  stub(cleanupOf(KEPT))
  await f.updateStateDetailed(73, { fixCount: 2 }, { cleanupWorktree: '/tmp/fix1-73', replacementWorktree: '/tmp/fix2-73' })
  assert.deepEqual(f.ephemeralWorktrees.map((e) => [e.kind, e.path]), [['replacement', '/tmp/fix2-73']])
})

test('件数軸（実装スクリプト全体）: fix がパスを返さず、次の fix の新が台帳に載る。パスを返す場合と閾値は同じ +0 → +1 の差で、旧実装は数え漏らした', async () => {
  const base = await minLimitStarting3(GONE, GONE)
  const noPathFirst = await minLimitStarting3(GONE, GONE, ['', FIX_B])
  assert.equal(noPathFirst, base + 1, '1 回目の fix の新が不明のまま 2 回目の fix が走ると、物理は不明の 1 本 + FIX_B の 2 本')
})

test('バイト軸（実装スクリプト全体）: fix がパスを返さず旧が消えたとき、新の実体は物理一覧へフォールバックして測り、上限を超えると新規着手が止まる', async () => {
  const PHYS = '/repo/wt/phys-unknown'
  const measured = []
  const wrapped = (inner) => (label, opts, prompt) => {
    if (label === 'fix:#2') physical = true
    return inner(label, opts, prompt)
  }
  let physical = false // fix が走った後にだけ実体が現れる（ラン開始時の観測には含まれない）
  const { calls } = await runScript({
    args: { ...BASE_ARGS, maxResidualWorktreeBytes: 512 * 1024 * 1024, maxResidualWorktrees: 100 },
    leaves: [2, 3],
    override: wrapped(overrides({
      oldFixResult: GONE,
      fixRounds: 1,
      fixPaths: [''],
      extra: (label, opts, prompt) => {
        if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }, ...(physical ? [{ path: PHYS, branch: 'x', isMain: false }] : [])] }
        if (label === 'worktree:record-count') return { count: physical ? 2 : 1 }
        if (label === 'worktree:residual-bytes') {
          const input = commandInputOf(prompt) ?? ''
          measured.push(input.split('\n'))
          return signedReply(prompt, { kib: input.includes(PHYS) ? GIB_KIB : 1024, err: 0, missing: 0, count: input === '' ? 0 : input.split('\n').length })
        }
        return bytesExtra([])(label, opts, prompt)
      },
    })),
  })
  assert.ok(measured.some((paths) => paths.includes(PHYS)), '新のパスが不明なので物理一覧へフォールバックして測る')
  assert.equal(started3(calls), false, '物理一覧の実測が上限を超えるので #3 は着手しない')
})

// ---- 4. 配線の振る舞い（Issue #624 のレビュー指摘）----

const MERGE_ARGS = { ...BASE_ARGS, maxResidualWorktreeBytes: 512 * 1024 * 1024, maxResidualWorktrees: 100 }
// 測定の呼び出しと fix の起動を時系列で記録する（fix より後の測定だけを見るため）
function timeline(events, pathBytes) {
  return (label, opts, prompt) => {
    if (label === 'fix:#2') events.push('fix')
    if (label === 'worktree:residual-bytes') {
      const input = commandInputOf(prompt) ?? ''
      events.push(`measure:${input}`)
      return signedReply(prompt, { kib: pathBytes(input), err: 0, missing: 0, count: input === '' ? 0 : input.split('\n').length })
    }
    if (label === 'worktree:free-disk-bytes') return signedReply(prompt, { freeKib: 1e10, err: 0 })
    return undefined
  }
}

test('ラン終了時の測定（実装スクリプト全体）: 旧が消えて引き継いだ新の worktree は終了時測定の対象に入る。パス不明の新があれば測定不成立へ倒す', async () => {
  const events = []
  const { result } = await runScript({
    args: MERGE_ARGS,
    leaves: [2],
    override: overrides({ oldFixResult: GONE, fixRounds: 1, extra: timeline(events, () => 1024) }),
  })
  const afterFix = events.slice(events.indexOf('fix') + 1).filter((e) => e.startsWith('measure:'))
  assert.ok(afterFix.length > 0, 'fix の後にも測定が走る（終了時測定）')
  assert.ok(afterFix[afterFix.length - 1].includes(FIX_A), '終了時測定の対象に引き継いだ新が入る')
  assert.equal(result.residualWorktrees.bytesEndObserved, true)

  // 新のパスが不明（slotUnknownLiveCount）でも、終了時はラン中の実測と同じく物理一覧へフォールバックして測る（Bugbot 指摘 N）。
  // 一覧で見つかった新の実体は終了時測定の対象に入り、上限を超えれば overLimit を報告する
  const PHYS = '/repo/wt/phys-end'
  const endEvents = []
  let physical = false
  const fallbackExtra = (label, opts, prompt) => {
    if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }, ...(physical ? [{ path: PHYS, branch: 'x', isMain: false }] : [])] }
    if (label === 'worktree:record-count') return { count: physical ? 2 : 1 }
    return timeline(endEvents, (input) => (input.includes(PHYS) ? GIB_KIB : 1024))(label, opts, prompt)
  }
  const unknown = await runScript({
    args: MERGE_ARGS,
    leaves: [2],
    override: ((inner) => (label, opts, prompt) => {
      if (label === 'fix:#2') physical = true
      return inner(label, opts, prompt)
    })(overrides({ oldFixResult: GONE, fixRounds: 1, fixPaths: [''], extra: fallbackExtra })),
  })
  const endMeasures = endEvents.slice(endEvents.indexOf('fix') + 1).filter((e) => e.startsWith('measure:'))
  assert.equal(unknown.result.residualWorktrees.bytesEndObserved, true, '新のパスが不明でも、物理一覧へのフォールバックが成立すれば終了時の測定は成立する')
  assert.ok(endMeasures[endMeasures.length - 1]?.includes(PHYS), '終了時測定の対象に物理一覧の新の実体が入る')
  assert.equal(unknown.result.residualWorktrees.overLimit, true, '物理一覧の実測が上限を超えるので overLimit を報告する')

  // フォールバックが成立しない（一覧が空・件数の不一致）ときだけ測定不能（fail-closed）
  // （ラン開始時の観測は成立させ、fix のあとの一覧だけ件数が食い違う = 転記脱落の疑いにする）
  let brokenAfterFix = false
  const brokenInner = overrides({
    oldFixResult: GONE,
    fixRounds: 1,
    fixPaths: [''],
    extra: (label, opts, prompt) => {
      if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }] }
      if (label === 'worktree:record-count') return { count: brokenAfterFix ? 5 : 1 }
      return timeline([], () => 1024)(label, opts, prompt)
    },
  })
  const broken = await runScript({
    args: MERGE_ARGS,
    leaves: [2],
    override: (label, opts, prompt) => {
      if (label === 'fix:#2') brokenAfterFix = true
      return brokenInner(label, opts, prompt)
    },
  })
  assert.equal(broken.result.residualWorktrees.bytesEndObserved, false, 'フォールバックも成立しなければ終了時の測定は成立させない（fail-closed）')
})

// Bugbot 指摘 R: 物理一覧フォールバックは台帳でパスが分かっている項目を置き換えず、和集合で測る。
// 台帳にあるが git に登録されていない実在ディレクトリ（retained-unregistered 等）が測定から漏れ、bytesEndObserved が true のまま上限判定が甘くなるのを防ぐ
test('ラン終了時の測定（実装スクリプト全体）: 新のパス不明で物理一覧へフォールバックしても、台帳にあるが未登録のパスは測定の対象に残る（物理一覧 ∪ 台帳）', async () => {
  const PHYS = '/repo/wt/phys-end-r'
  const UNREG = '/repo/wt/unregistered-r'
  const endEvents = []
  let physical = false
  const extra = (label, opts, prompt) => {
    if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }, ...(physical ? [{ path: PHYS, branch: 'x', isMain: false }] : [])] }
    if (label === 'worktree:record-count') return { count: physical ? 2 : 1 }
    return timeline(endEvents, (input) => (input.includes(UNREG) ? GIB_KIB : 1024))(label, opts, prompt)
  }
  const { result } = await runScript({
    args: MERGE_ARGS,
    leaves: [2],
    override: ((inner) => (label, opts, prompt) => {
      if (label === 'fix:#2') physical = true
      return inner(label, opts, prompt)
    })(overrides({ oldFixResult: GONE, firstFixResult: GONE, fixRounds: 2, fixPaths: ['', UNREG], extra })),
  })
  // 物理一覧フォールバックで測った呼び出しは、ラン中の測定（先頭側）とラン終了時の測定（末尾）の両方。どちらも台帳のパスを落とさない
  const fallbackMeasures = endEvents.filter((e) => e.startsWith('measure:') && e.includes(PHYS))
  assert.ok(fallbackMeasures.length >= 2, `ラン中とラン終了時の両方がフォールバックで測る: ${fallbackMeasures.length}`)
  for (const m of fallbackMeasures) assert.ok(m.includes(UNREG), '台帳にあるが物理一覧に無いパスも測る（置き換えない）')
  assert.equal(result.residualWorktrees.bytesEndObserved, true)
  assert.equal(result.residualWorktrees.overLimit, true, '未登録の実在ディレクトリの実測が上限を超えるので overLimit を報告する')
})

test('unionMeasurePaths: 物理一覧と台帳の和集合・連続／末尾スラッシュの正規化で重複除去・空要素と非文字列を捨てる・空同士は空', async () => {
  const f = await importDefinitions(['unionMeasurePaths'], 'union-measure')
  assert.deepEqual(f.unionMeasurePaths(['/a/b', '/c'], ['/a/b/', '/a//b', '/d']), ['/a/b', '/c', '/d'])
  assert.deepEqual(f.unionMeasurePaths([], ['/x']), ['/x'], '物理一覧が空でも台帳のパスを落とさない')
  assert.deepEqual(f.unionMeasurePaths(['/p'], []), ['/p'])
  assert.deepEqual(f.unionMeasurePaths(['', null, 5, '/p'], [undefined]), ['/p'])
  assert.deepEqual(f.unionMeasurePaths([], []), [])
  assert.deepEqual(f.unionMeasurePaths(null, undefined), [])
  assert.deepEqual(f.unionMeasurePaths(['/'], ['/']), ['/'], 'ルートだけは末尾スラッシュ除去で空にしない')
})

test('ラン中の測定も同じ形（和集合）: remeasureResidualBytesNow のフォールバックは targetPaths を置き換えない', () => {
  const fnStart = source.indexOf('async function remeasureResidualBytesNow()')
  const fnBody = source.slice(fnStart, source.indexOf('async function remeasureFreeDiskNow()', fnStart))
  assert.match(fnBody, /targetPaths = unionMeasurePaths\(fallback\.paths, targetPaths\)/)
  assert.doesNotMatch(fnBody, /targetPaths = fallback\.paths/)
})

// Merge ループで fix を 1 回走らせる: 監視が needs-fix を 1 回返し、その後は打ち切る
function mergeLoopFix({ saved, events, fixPath = FIX_A, bytes = () => 1024 }) {
  let monitors = 0
  return (label, opts, prompt) => {
    if (label === 'merge:#2') {
      monitors += 1
      return monitors === 1
        ? { state: 'needs-fix', summary: 'fix 要', unresolvedComments: [] }
        : { state: 'blocked', blockedReason: 'quality', summary: '打ち切り', unresolvedComments: [] }
    }
    if (label === 'fix:#2') { events.push('fix'); return { pushed: false, summary: 'fixed', worktreePath: fixPath } }
    if (label === 'state:cleanup:#2') return GONE
    if (saved && label === 'state:load') return { ok: true, fileExisted: true, items: { 2: saved }, highWaterBytes: 0, highWaterVersion: 0 }
    if (saved && label === 'state:load-verify') {
      const hashes = { 2: sha256Hex(canonicalJson(saved)) }
      return { fileExists: true, hashes, keysSha256: sha256Hex(canonicalJson(['2'])), keysCount: 1, highWaterBytes: 0, highWaterVersion: 0 }
    }
    return timeline(events, bytes)(label, opts, prompt)
  }
}
const { sha256Hex, canonicalJson } = await importDefinitions(['sha256Hex', 'canonicalJson'], 'ledger-state-hash')

test('Merge ループの fix（実装スクリプト全体）: 旧が消えても新のパスが測定の対象に入り、上限を超えると新規着手が止まる', async () => {
  const events = []
  const { calls } = await runScript({
    args: MERGE_ARGS,
    leaves: [2, 3],
    override: mergeLoopFix({ events, bytes: (input) => (input.includes(FIX_A) ? GIB_KIB : 1024) }),
  })
  assert.ok(events.indexOf('fix') >= 0, 'Merge ループの fix が走る')
  assert.ok(events.slice(events.indexOf('fix') + 1).some((e) => e.startsWith('measure:') && e.includes(FIX_A)), 'fix の後の測定に新のパスが入る（replacementWorktree に新のパスを渡す配線）')
  assert.equal(started3(calls), false, '新の実測が上限を超えるので #3 は着手しない')
})

test('monitoring 再開で旧 worktree が未登録（手動削除済み）のまま fix が走ると、物理は新の 1 本なので件数も 1 件増える', async () => {
  const saved = { type: 'implement', status: 'monitoring', pr: 1002, branch: 'feat/2-x', worktree: '/repo/wt/ghost', fixCount: 0 }
  const events = []
  const { result } = await runScript({ args: MERGE_ARGS, leaves: [2], override: mergeLoopFix({ saved, events }) })
  assert.ok(events.includes('fix'), 'monitoring 再開から fix が走る')
  assert.equal(result.residualWorktrees.addedThisRun, 1, '旧が台帳にも開始時観測にも無いので、新を 1 件計上する（引き継ぎ先が無い）')
})

// ---- Z: 削除済みと確認したパスに同じランで worktree が作り直されたとき ----
// 台帳へ新しい worktree を記録する入口（recordEphemeralWorktree・recordReplacementWorktree・置換で引き継ぐパス）は、そのパスを削除済み（バイト測定から外れる）と
// 最終スイープの削除候補から外す。外すのは『削除を試みた記録』だけなので、スイープが消す対象は増えない。
const REUSED = '/tmp/reused-wt'
async function removedPath(tag) {
  const f = await fresh(tag)
  stub(cleanupOf(GONE))
  await f.updateStateDetailed(50, { fixCount: 1 }, { cleanupWorktree: REUSED })
  assert.ok(f.confirmedRemovedPaths.has(REUSED), '前提: 削除済みと確認した')
  assert.ok(f.sweepEligiblePaths.has(REUSED), '前提: 削除を試みたのでスイープ候補')
  return f
}
const ENTRIES = [
  ['recordEphemeralWorktree', (f) => f.recordEphemeralWorktree(51, REUSED, 'implement')],
  ['置換の台帳記録（旧が保持された）', (f) => f.applyReplacementAccounting(51, '/tmp/old-51', REUSED, false)],
  ['置換で引き継ぐパス（旧が消えて計上済み）', (f) => {
    f.ephemeralWorktrees.push({ issue: 51, kind: 'implement', path: '/tmp/old-51' })
    f.applyReplacementAccounting(51, '/tmp/old-51', REUSED, true)
  }],
  ['置換の新パスが台帳に既にある（重複排除で載せない経路でも外す）', (f) => {
    f.ephemeralWorktrees.push({ issue: 51, kind: 'implement', path: REUSED })
    f.applyReplacementAccounting(51, '', REUSED, false)
  }],
]
for (const [name, enter] of ENTRIES) {
  test(`削除済みのパスに worktree が作り直された: ${name} → 削除済みと最終スイープ候補から外れ、バイト測定の対象になる`, async () => {
    const f = await removedPath(`z-${name.length}`)
    enter(f)
    assert.ok(!f.confirmedRemovedPaths.has(REUSED), '削除済みのままだと生きた実体がバイト測定から漏れる')
    assert.ok(!f.sweepEligiblePaths.has(REUSED), '最終スイープが --force で消し得る')
    const sw = stub(() => ({ removed: [] }))
    assert.deepEqual(await f.sweepClosedWorktrees([]), [])
    assert.ok(sw.calls.every((c) => !c.prompt.includes(REUSED)), 'スイープのエージェントにパスが渡らない')
  })
}

test('削除済みのパスを外すだけで他は動かない: 別パスの削除済み・候補は残り、保持の除外（sweepHeldPaths）は増減しない', async () => {
  const f = await removedPath('z-other')
  stub(cleanupOf(GONE))
  await f.updateStateDetailed(52, { fixCount: 1 }, { cleanupWorktree: '/tmp/other-wt' })
  f.sweepHeldPaths.add('/tmp/held-wt')
  f.recordEphemeralWorktree(51, REUSED, 'review')
  assert.ok(f.confirmedRemovedPaths.has('/tmp/other-wt'))
  assert.ok(f.sweepEligiblePaths.has('/tmp/other-wt'))
  assert.deepEqual([...f.sweepHeldPaths], ['/tmp/held-wt'])
})

test('スイープが渡す削除できなかった候補（削除済みと確認済み）は、recordRetainedWorktree で外れず残置に載らない', async () => {
  const f = await removedPath('z-retained-guard')
  assert.equal(f.recordRetainedWorktree(0, REUSED), false)
  assert.ok(f.confirmedRemovedPaths.has(REUSED))
  assert.equal(retainedEntries(f).length, 0)
})

// ---- AB: 同じ呼び出しで『削除を確認した』パスを、置換の新パスとして live に戻さない ----
// Review fix と post-push fix は cleanupWorktree と replacementWorktree に同じパスを渡し得る。削除の確認と同じ呼び出しの中で live に戻すと、
// 削除済みのパスが confirmedRemovedPaths と最終スイープの候補から外れ、バイト測定（1 件あたりの平均）とスイープの登録の片づけが狂う。
// 新旧が同じパスのときは、削除を確認したときに限り削除済み扱いを残す（作り直された実体かどうかは区別できない。Z より前の挙動 = 安全側。確認できないときは AD）。
const SAME = '/tmp/same-path-wt'
const SAME_CASES = [
  ['旧が台帳にある（引き継ぎ経路）', (f) => f.ephemeralWorktrees.push({ issue: 60, kind: 'implement', path: SAME })],
  ['旧がどこにも数えられていない（置換の台帳へ載せる経路）', () => {}],
]
for (const [name, setup] of SAME_CASES) {
  test(`同じパスを cleanup と replacement に渡して削除が確認された: ${name} → 削除済みと最終スイープ候補に残る`, async () => {
    const f = await fresh(`ab-same-${name.length}`)
    setup(f)
    stub(cleanupOf(GONE))
    await f.updateStateDetailed(60, { fixCount: 1, worktree: SAME }, { cleanupWorktree: SAME, replacementWorktree: SAME, preserveWorktreeField: true })
    assert.ok(f.confirmedRemovedPaths.has(SAME), '削除を確認したパスが live に戻され、バイト測定の対象になる')
    assert.ok(f.sweepEligiblePaths.has(SAME), '最終スイープの候補から外れ、登録の片づけが行われない')
    const sw = stub(() => ({ removed: [SAME] }))
    assert.deepEqual(await f.sweepClosedWorktrees([]), [SAME])
    assert.ok(sw.calls.some((c) => c.prompt.includes(SAME)), 'スイープのエージェントにパスが渡る')
  })
}

// ---- AD: 同じパスでも『削除を確認できなかった』（保持・掃除せず・失敗）なら実体は生きている → live に戻す ----
// 不変条件: パスは『この呼び出しの流れで削除が確認された（confirmedRemovedPaths に入った）』場合に限り live に戻さない。それ以外は戻す。
// 戻さないと superseded の最終スイープが --force で消し得る（reviewing は保持リストに無い）。
const SAME_UNCONFIRMED = [
  ['旧が保持された（retained: true）', (opts) => (opts.label.startsWith('state:cleanup') ? KEPT : { ok: true })],
  ['掃除の結果なし', (opts) => (opts.label.startsWith('state:cleanup') ? null : { ok: true })],
  ['掃除が例外', (opts) => { if (opts.label.startsWith('state:cleanup')) throw new Error('boom'); return { ok: true } }],
  ['状態マージの失敗で掃除せず', () => ({ ok: false })],
  ['worktree は消えたがブランチ削除が失敗（ok: false, retained: false）', (opts) => (opts.label.startsWith('state:cleanup') ? { ok: false, retained: false } : { ok: true })],
]
for (const [name, behavior] of SAME_UNCONFIRMED) {
  test(`同じパスで削除を確認できない: ${name} → 最終スイープ候補と削除済みから外れる`, async () => {
    const f = await fresh(`ad-same-${name.length}`)
    stub(behavior)
    await f.updateStateDetailed(61, { fixCount: 1, worktree: SAME }, { cleanupWorktree: SAME, replacementWorktree: SAME, preserveWorktreeField: true }).catch(() => {})
    assert.ok(!f.confirmedRemovedPaths.has(SAME))
    assert.ok(!f.sweepEligiblePaths.has(SAME), '生きた実体を最終スイープの候補に残さない（--force で消され得る）')
    const sw = stub(() => ({ removed: [] }))
    await f.sweepClosedWorktrees([])
    assert.ok(sw.calls.every((c) => !c.prompt.includes(SAME)), 'スイープのエージェントにパスが渡らない')
  })
}

test('applyReplacementAccounting: 新旧が同じパスは oldConfirmedRemoved が真のときだけ削除済みを残す（件数軸の oldRemoved とは独立）', async () => {
  const f = await removedPath('ad-unit')
  f.applyReplacementAccounting(70, REUSED, REUSED, true, true)
  assert.ok(f.confirmedRemovedPaths.has(REUSED) && f.sweepEligiblePaths.has(REUSED), '削除を確認したので残る')
  f.applyReplacementAccounting(70, REUSED, REUSED, true, false)
  assert.ok(!f.confirmedRemovedPaths.has(REUSED) && !f.sweepEligiblePaths.has(REUSED), '確認していなければ戻す')
})

test('新旧が別のパスなら従来どおり: 新パスは live（削除済みと候補から外れ）、旧パスは削除済みと候補に残る', async () => {
  const f = await fresh('ab-diff')
  stub(cleanupOf(GONE))
  await f.updateStateDetailed(62, { fixCount: 1 }, { cleanupWorktree: '/tmp/ab-old' })
  await f.updateStateDetailed(62, { fixCount: 1 }, { cleanupWorktree: '/tmp/ab-old2' })
  f.confirmedRemovedPaths.add('/tmp/ab-new')
  f.sweepEligiblePaths.add('/tmp/ab-new')
  await f.updateStateDetailed(62, { fixCount: 2, worktree: '/tmp/ab-new' }, { cleanupWorktree: '/tmp/ab-old2', replacementWorktree: '/tmp/ab-new' })
  assert.ok(!f.confirmedRemovedPaths.has('/tmp/ab-new'))
  assert.ok(!f.sweepEligiblePaths.has('/tmp/ab-new'))
  assert.ok(f.confirmedRemovedPaths.has('/tmp/ab-old2'))
  assert.ok(f.sweepEligiblePaths.has('/tmp/ab-old2'))
})

// ---- AC: 同じ呼び出しの流れで削除を確認したパスを fix-terminal として記録しても live に戻さない ----
// post-push fix の optinFixState 再試行失敗の終端は、updateState（cleanupWorktree: 旧）が削除を確認した直後に fix の worktreePath を記録する。
// fix が旧と同じパスを返すと、revive の既定では削除済みが live に戻る。{ revive: false } なら削除済み・スイープ候補の記録が残り、台帳には載る。
test('revive: false で記録すると、削除を確認したパスが削除済みとスイープ候補に残り、台帳には載る', async () => {
  const f = await removedPath('ac-norevive')
  f.recordEphemeralWorktree(53, REUSED, 'fix-terminal', { revive: false })
  assert.ok(f.confirmedRemovedPaths.has(REUSED), '削除を確認したパスが live に戻される')
  assert.ok(f.sweepEligiblePaths.has(REUSED), '最終スイープの候補から外れる')
  assert.ok(f.ephemeralWorktrees.some((e) => e.path === REUSED && e.kind === 'fix-terminal'), '台帳には載せる')
})

test('revive の指定なしは従来どおり live に戻す（Z）', async () => {
  const f = await removedPath('ac-default')
  f.recordEphemeralWorktree(53, REUSED, 'fix-terminal')
  assert.ok(!f.confirmedRemovedPaths.has(REUSED))
  assert.ok(!f.sweepEligiblePaths.has(REUSED))
})

// ---- AE: revive は固定の false にしない。直前の updateState が同じパスの削除を確認したときだけ false ----
test('reviveAfterCleanup: 別のパスは戻す（true）・同じパスで削除を確認したときだけ戻さない（false）・同じパスでも確認できなければ戻す', async () => {
  const f = await removedPath('ae-revive')
  assert.equal(f.reviveAfterCleanup(REUSED, REUSED), false, '同じパスで削除を確認')
  assert.equal(f.reviveAfterCleanup('/tmp/other-new', REUSED), true, '別のパス')
  assert.equal(f.reviveAfterCleanup(undefined, REUSED), true, 'パス不明')
  assert.equal(f.reviveAfterCleanup(REUSED, ''), true, '旧が不明')
  f.confirmedRemovedPaths.delete(REUSED)
  assert.equal(f.reviveAfterCleanup(REUSED, REUSED), true, '同じパスでも削除を確認していない')
})

test('AE 結合: 別のパスを fix-terminal として記録すると live に戻り、同じパスで削除確認済みなら戻らない', async () => {
  const f = await removedPath('ae-integration')
  f.confirmedRemovedPaths.add('/tmp/ae-other')
  f.sweepEligiblePaths.add('/tmp/ae-other')
  f.recordEphemeralWorktree(54, '/tmp/ae-other', 'fix-terminal', { revive: f.reviveAfterCleanup('/tmp/ae-other', REUSED) })
  assert.ok(!f.confirmedRemovedPaths.has('/tmp/ae-other') && !f.sweepEligiblePaths.has('/tmp/ae-other'), '別パスは live')
  f.recordEphemeralWorktree(54, REUSED, 'fix-terminal', { revive: f.reviveAfterCleanup(REUSED, REUSED) })
  assert.ok(f.confirmedRemovedPaths.has(REUSED) && f.sweepEligiblePaths.has(REUSED), '同じパスで削除確認は残る')
})

test('post-push fix の optinFixState 再試行失敗の終端は、revive を reviveAfterCleanup で決めて記録する（固定の false にしない。配線）', () => {
  const start = source.indexOf('const retryOk = await updateState(item.number, optinFixPatchArgs)')
  assert.ok(start > 0, '再試行の呼び出しが見つかる')
  const branch = source.slice(start, source.indexOf('failMergeTerminal(reason', start))
  assert.match(branch, /recordEphemeralWorktree\(item\.number, f\?\.worktreePath, 'fix-terminal', \{ revive: reviveAfterCleanup\(f\?\.worktreePath, oldWorktreePath\) \}\)/)
  assert.doesNotMatch(branch, /revive: false/)
})
