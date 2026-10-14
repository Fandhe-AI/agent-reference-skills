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
    ['updateStateDetailed', 'sweepClosedWorktrees', 'confirmedRemovedPaths', 'ephemeralWorktrees', 'residualStartPathSet', 'recordEphemeralWorktree', 'ensureBoundaryNonceSeed'],
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

  stub(cleanupOf(GONE))
  await f.updateStateDetailed(61, { fixCount: 1, worktree: '/tmp/new-61' }, { cleanupWorktree: '/tmp/old-61', replacementWorktree: '/tmp/new-61' })
  assert.equal(replacementEntries(f).length, 1, '旧が消えたなら台帳の 1 件が新へ引き継がれる（純増しない）')
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
function overrides({ oldFixResult, firstFixResult = GONE, fixRounds = 2, extra = () => undefined }) {
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
      return { pushed: false, summary: 'fixed', worktreePath: seen.fix === 1 ? FIX_A : FIX_B }
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
async function minLimitStarting3(oldFixResult, firstFixResult = GONE) {
  for (let limit = 1; limit <= 60; limit++) {
    const { calls } = await runScript({
      args: { ...BASE_ARGS, maxResidualWorktrees: limit },
      leaves: [2, 3],
      override: overrides({ oldFixResult, firstFixResult }),
    })
    if (started3(calls)) return limit
  }
  return null
}

test('件数軸: 2 回目の fix の旧 worktree（台帳に無い）が保持されると、旧と新の 2 件が載り、新規着手の閾値が 2 件分上がる（保持されなければ上がらない）', async () => {
  const removed = await minLimitStarting3(GONE)
  const kept = await minLimitStarting3(KEPT)
  assert.ok(removed !== null && kept !== null, `着手できる上限が見つかる: ${removed} / ${kept}`)
  // 1 回目の fix の旧（実装 worktree）は消えたので台帳の実装の 1 件は残ったまま（過大側）。保持された FIX_A と現行の FIX_B で +2
  assert.equal(kept, removed + 2)
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
  assert.equal(none, removed + 2)
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

test('バイト軸: fix が 1 回だけで実装 worktree が保持されたとき、置換後の worktree（FIX_A）が測定の対象に入り、上限を超えると新規着手が止まる', async () => {
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
  assert.ok(!gone.measured.some((paths) => paths.includes(FIX_A)), '旧が消えたなら新は台帳に載らず（実装の 1 件が引き継ぐ）、ここでは測定の対象に入らない')
  assert.equal(gone.started, true)
})
