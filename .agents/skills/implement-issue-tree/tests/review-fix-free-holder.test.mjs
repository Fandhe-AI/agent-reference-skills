// Review fix の前の、作業ブランチを握ったままの使い捨て worktree の解放（Issue #755）のホスト配線テスト。
// 最初の fix の前に recover-prep.sh --mode free を 1 回だけ実行させ（隔離された fix は worktree の外へ触れないため非隔離の機械的 agent が行う）、
// 結果は助言的で、失敗・例外・null でも fix は起動される。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runScript, BASE_ARGS } from './lib/stub-run.mjs'

async function run({ needsFixCount = 1, args = BASE_ARGS, free = undefined } = {}) {
  let reviews = 0
  return runScript({
    args,
    override: (label) => {
      if (label === 'review:#2') {
        reviews++
        return reviews <= needsFixCount
          ? { state: 'needs-fix', highestSeverity: 'high', summary: '指摘あり', worktreePath: '/repo/wt/r2' }
          : { state: 'ok', highestSeverity: 'none', summary: 's', worktreePath: '/repo/wt/r2' }
      }
      if (label === 'free:#2' && free) return free()
      return undefined
    },
  })
}
const labels = (calls) => calls.map((c) => c.opts.label)

test('最初の fix の前に recover-prep.sh --mode free を含む agent が 1 回だけ起動される（ブランチ・base は引用）', async () => {
  const { calls } = await run()
  const l = labels(calls)
  const iFree = l.indexOf('free:#2')
  const iFix = l.indexOf('fix:#2')
  assert.ok(iFree >= 0 && iFix > iFree, `free が fix より前: ${l.filter((x) => /free|fix|review/.test(x)).join(',')}`)
  const p = calls[iFree].prompt
  assert.match(p, /recover-prep\.sh --mode free --base '?main'? --branch '?feat\/2-x'?/)
  assert.ok(p.includes('一字一句そのまま'))
  assert.deepEqual([calls[iFree].opts.phase, calls[iFree].opts.effort], ['Implement', 'low'])
})

test('2 回目以降の fix の前には起動されない', async () => {
  const { calls } = await run({ needsFixCount: 2 })
  const l = labels(calls)
  assert.equal(l.filter((x) => x === 'fix:#2').length, 2)
  assert.equal(l.filter((x) => x === 'free:#2').length, 1)
})

test('Review が通れば起動されない', async () => {
  const { calls } = await run({ needsFixCount: 0 })
  assert.equal(labels(calls).filter((x) => x === 'free:#2').length, 0)
})

test('free の agent が null を返しても例外を投げても、fix は起動されてループが続く', async () => {
  for (const free of [() => null, () => { throw new Error('boom') }]) {
    const { calls, logs } = await run({ free })
    const l = labels(calls)
    assert.ok(l.indexOf('fix:#2') > l.indexOf('free:#2'))
    if (free.toString().includes('boom')) assert.ok(logs.some((x) => x.includes('ブランチ解放')))
  }
})

test('dryRun では起動されない', async () => {
  const { calls } = await run({ args: { ...BASE_ARGS, dryRun: true } })
  assert.equal(labels(calls).filter((x) => x === 'free:#2').length, 0)
})
