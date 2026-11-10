// 残置観測の「一覧 + 独立カウント」の組の取り直し（Issue #735）の回帰テスト。
// 並行ランの worktree 作成・削除で 2 回の観測が食い違っても、一致した組を採用して新規着手を止めない。
// 転記ミス（実在しない行の追加・行の欠落）が続く場合は従来どおり fail-closed に倒す。
// 判定は純関数の表で、取り直しの配線は stub agent の応答列で検査する（実時間を待たない）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { importDefinitions, runScript, BASE_ARGS } from './lib/stub-run.mjs'

const MAIN = { path: '/repo', branch: 'main', isMain: true }
const wt = (k) => ({ path: `/repo/wt-x${k}`, branch: `other/${k}`, isMain: false })
const list = (n) => [MAIN, ...Array.from({ length: n - 1 }, (_, i) => wt(i + 1))]
const ARGS = { ...BASE_ARGS, maxResidualWorktrees: 10 }

/** label ごとの応答キュー。尽きたら最後の応答を繰り返す。 */
function seq(scan, count) {
  let si = 0
  let ci = 0
  return (label) => {
    if (label === 'worktree:orphan-scan') return { entries: scan[Math.min(si++, scan.length - 1)] }
    if (label === 'worktree:record-count') {
      const c = count[Math.min(ci++, count.length - 1)]
      return c === null ? null : { count: c }
    }
    return undefined
  }
}

const { worktreeCountsDiffer, observeWorktreeList } = await importDefinitions(
  ['worktreeCountsDiffer', 'observeWorktreeList'],
  'observe-retry',
)

test('単体: worktreeCountsDiffer は非空の一覧と整数カウントが食い違うときだけ true', () => {
  const rows = [
    [list(3), 3, false],
    [list(3), 2, true],
    [list(2), 3, true],
    [[], 1, false],
    [list(2), null, false],
    [list(2), 1.5, false],
  ]
  for (const [e, c, want] of rows) assert.equal(worktreeCountsDiffer(e, c), want, `${e.length} vs ${c}`)
})

async function withAgent(handler, fn) {
  const calls = []
  globalThis.agent = async (_p, opts) => {
    calls.push(opts.label)
    return handler(opts.label)
  }
  globalThis.log = () => {}
  try {
    return [await fn(), calls]
  } finally {
    delete globalThis.agent
    delete globalThis.log
  }
}
const countOf = (labels, l) => labels.filter((c) => c === l).length

test('単体: 1 組目が不一致で 2 組目が一致なら 2 組目を返す', async () => {
  const [r, calls] = await withAgent(seq([list(3), list(2)], [2, 2]), observeWorktreeList)
  assert.equal(r[0].length, 2)
  assert.equal(r[1], 2)
  assert.equal(r[2], 2)
  assert.equal(countOf(calls, 'worktree:orphan-scan'), 2)
  assert.equal(countOf(calls, 'worktree:record-count'), 2)
})

test('単体: 3 組とも不一致なら 3 組で止めて最後の組を返す', async () => {
  const [r, calls] = await withAgent(seq([list(3)], [2]), observeWorktreeList)
  assert.equal(r[2], 3)
  assert.equal(countOf(calls, 'worktree:orphan-scan'), 3)
})

test('単体: 1 組目で一致、またはカウント取得失敗なら 1 組で止める', async () => {
  const [a, ca] = await withAgent(seq([list(2)], [2]), observeWorktreeList)
  assert.equal(a[2], 1)
  assert.equal(countOf(ca, 'worktree:orphan-scan'), 1)
  const [b, cb] = await withAgent(seq([list(2)], [null]), observeWorktreeList)
  assert.equal(b[1], null)
  assert.equal(countOf(cb, 'worktree:record-count'), 1)
})

test('結合: 並行ランの削除で 1 組目だけ食い違っても止めず、2 組目の観測値を採る', async () => {
  const { result, calls } = await runScript({ args: ARGS, override: seq([list(3), list(2)], [2, 2]) })
  assert.equal(result.residualWorktrees.observed, true)
  assert.equal(result.residualWorktrees.suppressed, false)
  assert.equal(result.residualWorktrees.observedAtStart, 1)
  assert.ok(calls.some((c) => c.opts.label.startsWith('impl:#')), 'イシューが着手される')
})

test('結合: 並行ランの作成で 1 組目だけ食い違っても止めない', async () => {
  const { result } = await runScript({ args: { ...ARGS, maxResidualWorktrees: 30 }, override: seq([list(2), list(3)], [3, 3]) })
  assert.equal(result.residualWorktrees.suppressed, false)
  assert.equal(result.residualWorktrees.observedAtStart, 2)
})

test('結合: 実在しない行の追加が続けば 3 組で止めて新規着手を抑止し、理由に並行ランの疑いを含める', async () => {
  const { result, calls, logs } = await runScript({ args: ARGS, override: seq([list(3)], [2]) })
  assert.equal(result.residualWorktrees.suppressed, true)
  assert.equal(result.residualWorktrees.observed, false)
  assert.equal(countOf(calls.map((c) => c.opts.label), 'worktree:orphan-scan') >= 3, true)
  const text = logs.join('\n') + JSON.stringify(result.notStarted)
  assert.match(text, /3 組観測しても不一致/)
  assert.match(text, /並行ラン/)
  assert.equal(calls.some((c) => c.opts.label.startsWith('impl:#')), false, '着手しない')
})

test('結合: 行の欠落が続いても止まる', async () => {
  const { result } = await runScript({ args: ARGS, override: seq([list(2)], [3]) })
  assert.equal(result.residualWorktrees.suppressed, true)
})

test('結合: カウント取得失敗は取り直さず抑止する', async () => {
  const { result, calls } = await runScript({ args: ARGS, override: seq([list(2)], [null]) })
  assert.equal(result.residualWorktrees.suppressed, true)
  assert.equal(calls.filter((c) => c.opts.label === 'worktree:record-count').length, 1)
})

test('結合: ゲート無効では独立カウントを呼ばない', async () => {
  const { calls } = await runScript({ args: BASE_ARGS })
  assert.equal(calls.filter((c) => c.opts.label === 'worktree:record-count').length, 0)
})

test('結合: 開始時の独立カウントは孤立記録の状態書き込みより前に呼ばれる', async () => {
  const orphan = { path: '/repo/wt-orphan', branch: 'feat/2-x', isMain: false }
  const { calls } = await runScript({ args: ARGS, override: seq([[MAIN, orphan]], [2]) })
  const labels = calls.map((c) => c.opts.label)
  const countAt = labels.indexOf('worktree:record-count')
  const scanAt = labels.indexOf('worktree:orphan-scan')
  const firstWrite = labels.findIndex((l, i) => i > scanAt && l.startsWith('state:') && !l.startsWith('state:load'))
  assert.ok(countAt > scanAt)
  assert.ok(firstWrite < 0 || countAt < firstWrite, `count=${countAt} write=${firstWrite}`)
})
