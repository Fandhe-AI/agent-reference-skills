// observe-pr.sh の時間上限・取得失敗の区別・複数ページ・本文の扱いの回帰テスト（PR #612 の codex・独立レビュー指摘）。
//
//   - 個々の gh 呼び出しに時間制限があり、ハングした gh と、その孫プロセスを残さない。1 回の起動の壁時計上限を保証し、
//     次の観測を始める前に残り時間が 1 観測分に満たなければ始めずに pending を返す
//   - 取得失敗時の bound は「不明」（-1）で、unbound（0）と区別できる
//   - 複数ページの応答を合算する（gh api --slurp に依存しない = ページごとの出力を jq 側で合算する）
//   - threads-detail は本文を十分な長さで返し、切ったときは元の長さを示し、全文を取れる。非信頼データは nonce 付きの区切りで囲む
//   - reviews の件数は DISMISSED を含まない。--repo の '.' '..' 要素は拒否する
//
// 偽 gh は tests/lib/gh-observe-stub.mjs（GH_STUB_DELAY・GH_STUB_HANG で遅い・ハングする gh を模す）。
//
// 速度: 実時間を待つケース（遅い gh・ハングする gh・壁時計の窓の判定。縮尺は壁時計 1〜8 秒）は、縮尺を変えずに非同期で走らせ、
// describe の concurrency で同時に待つ（旧: spawnSync で順に待ち、ファイル全体で約 54 秒。今: 最長の 1 本分 + 数秒）。
// 同時に走るケースの sleep を取り違えないよう、ハングする gh の sleep 秒数はケース・bash・プロセスごとに一意にする（hangSeconds）。
import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import { hangSeconds, spawnAsync } from './lib/run-async.mjs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, toolExists } from './lib/signed-output.mjs'
import { createObserveStub } from './lib/gh-observe-stub.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'observe-pr.sh')
const NONCE = 'k3x9a0b1c2d4e5f6g7h8i9j0k1l2'
const SHA = 'a1'.repeat(20)
const BASHES = availableBashes()
const jqAvailable = toolExists('jq')
const FAST = { OBSERVE_PR_POLLS: '3', OBSERVE_PR_SLEEP_SEC: '0', OBSERVE_PR_SETTLE_SEC: '0' }
const prJson = (over = {}) =>
  JSON.stringify({ headRefOid: SHA, state: 'OPEN', mergeable: 'MERGEABLE', headRefName: 'fix/7-x', baseRefName: 'main', isCrossRepository: false, closingIssuesReferences: [{ number: 7 }], ...over })
const ERR_BODY = { out: '{"message":"Not Found","status":"404"}', exit: 1 }
const lines = (...pages) => `${pages.map((p) => JSON.stringify(p)).join('\n')}\n`

function run(bash, stub, args, env = {}) {
  return spawnSync(bash, [SCRIPT, '--nonce', NONCE, ...args], { encoding: 'utf8', env: stub.env({ ...FAST, ...env }) })
}
const runA = (bash, stub, args, env = {}) => spawnAsync(bash, [SCRIPT, '--nonce', NONCE, ...args], { env: stub.env({ ...FAST, ...env }) })
function payloadOf(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  return JSON.parse(r.stdout).payload
}
// 指定の継続時間（秒）の sleep が残っているか（ps が無い環境では null = 判定できない）
function sleepersOf(seconds) {
  const r = spawnSync('ps', ['-axo', 'command'], { encoding: 'utf8' })
  if (r.status !== 0) return null
  return r.stdout.split('\n').filter((l) => new RegExp(`\\bsleep ${seconds}\\b`).test(l)).length
}

describe('時間上限（実時間を待つケースは同時に走る）', { concurrency: 24 }, () => {
BASHES.forEach((bash, bi) => {
  const t = (name, fn) => test(`[${bash}] ${name}`, { skip: !jqAvailable }, fn)

  // --- 時間上限 ---

  t('遅い gh（呼び出しごとの時間制限を超える）は取得失敗（err=1）として返し、制限を超えて待たない', async () => {
    const stub = createObserveStub({ prview: { out: prJson() } })
    const t0 = Date.now()
    const p = payloadOf(await runA(bash, stub, ['--mode', 'checks', '--pr', '12'], { GH_STUB_DELAY: '3', OBSERVE_PR_GH_TIMEOUT_SEC: '1', OBSERVE_PR_WALL_SEC: '20' }))
    const elapsed = (Date.now() - t0) / 1000
    assert.deepEqual({ err: p.err, o: p.outcome, total: p.total }, { err: 1, o: 'error', total: 0 })
    assert.ok(elapsed < 2.9, `1 回目の gh が時間制限（1 秒）で打ち切られ、遅延（3 秒）を待たない: ${elapsed}s`)
  })

  t('ハングする gh は時間制限で kill され、gh の孫プロセスも残さない。壁時計上限（WALL）を超えない', async () => {
    const hang = hangSeconds(0, bi)
    const stub = createObserveStub({ prview: { out: prJson() } })
    const t0 = Date.now()
    const r = await runA(bash, stub, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '1'], {
      GH_STUB_HANG: hang, OBSERVE_PR_GH_TIMEOUT_SEC: '1', OBSERVE_PR_WALL_SEC: '4', OBSERVE_PR_POLLS: '10',
    })
    const elapsed = (Date.now() - t0) / 1000
    const p = payloadOf(r)
    assert.deepEqual({ err: p.err, o: p.outcome }, { err: 1, o: 'error' })
    assert.ok(elapsed <= 4 + 3, `壁時計上限 4 秒 + 後始末の猶予に収まる: ${elapsed}s`)
    const left = sleepersOf(hang)
    if (left !== null) assert.equal(left, 0, 'gh の子・孫の sleep が残っていない')
  })

  t('次の観測を始める前に残り時間が 1 観測分に満たなければ、始めずに pending を返す（窓の判定）', async () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      'check-runs-total': { out: '{"total_count":0,"check_runs":[]}' },
      status: { out: '{"statuses":[]}' },
    })
    // 1 観測 = gh 3 回 × 遅延 1 秒 ≒ 3 秒。壁時計 5 秒では 2 回目の観測を始められない
    const p = payloadOf(await runA(bash, stub, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '1'], {
      GH_STUB_DELAY: '1', OBSERVE_PR_GH_TIMEOUT_SEC: '5', OBSERVE_PR_WALL_SEC: '5', OBSERVE_PR_POLLS: '10',
    }))
    assert.equal(p.outcome, 'pending')
    assert.equal(p.err, 0, '観測は成功しており、取得失敗ではない')
    assert.equal(stub.countOf('prview'), 1, '2 回目の観測を始めていない')
  })
})
})

// 同期のテスト（spawnSync）はイベントループを塞ぐ。上の describe の中に置くと、同時に待っているケースの経過時間の測定（子の終了を
// このプロセスが受け取るまで）が塞いだ時間だけ延びて上限の検査が偽の赤になるので、describe の外（上の後）に置く
for (const bash of BASHES) {
  const t = (name, fn) => test(`[${bash}] ${name}`, { skip: !jqAvailable }, fn)

  t('既定の壁時計上限は Bash ツールの既定タイムアウト 120 秒に余裕を持たせた値で、環境変数でも 120 秒以上にできない', () => {
    const sh = spawnSync('grep', ['-E', 'env_int "\\$\\{OBSERVE_PR_(WALL_SEC|GH_TIMEOUT_SEC):-\\}"', SCRIPT], { encoding: 'utf8' }).stdout
    const wall = Number(/OBSERVE_PR_WALL_SEC:-\}" (\d+) (\d+)/.exec(sh)?.[1])
    const wallMax = Number(/OBSERVE_PR_WALL_SEC:-\}" (\d+) (\d+)/.exec(sh)?.[2])
    assert.ok(wall >= 60 && wall <= 100, `既定 ${wall}`)
    assert.ok(wallMax <= 100, `最大 ${wallMax}`)
  })

  // --- bound と err ---

  t('取得失敗時の bound は -1（不明）で、unbound（0）と区別できる。想定外の PR は bound=0', () => {
    for (const out of [ERR_BODY, { out: 'not json' }, { out: prJson({ state: 'WEIRD' }) }]) {
      const stub = createObserveStub({ prview: out })
      const p = payloadOf(run(bash, stub, ['--mode', 'pr', '--pr', '12', '--base', 'main', '--branch', 'fix/7-x', '--issue', '7']))
      assert.deepEqual({ err: p.err, bound: p.bound, state: p.state }, { err: 1, bound: -1, state: '' })
    }
    const mismatch = createObserveStub({ prview: { out: prJson({ headRefName: 'other' }) } })
    assert.equal(payloadOf(run(bash, mismatch, ['--mode', 'pr', '--pr', '12', '--base', 'main', '--branch', 'fix/7-x', '--issue', '7'])).bound, 0)
  })

  // --- 複数ページ（--slurp に依存しない）---

  const reqRule = (...ctx) => [{ type: 'required_status_checks', parameters: { required_status_checks: ctx.map((context) => ({ context })) } }]

  t('required: rules・check-run・statuses が複数ページでも全ページを合算する。gh api --slurp を使わない', () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      rules: { out: lines(reqRule('a'), reqRule('b', 'c'), [{ type: 'pull_request' }]) },
      'check-runs': { out: lines({ total_count: 3, check_runs: [{ name: 'a' }] }, { total_count: 3, check_runs: [{ name: 'b' }, { name: 'x' }] }) },
      statuses: { out: lines([{ context: 's1' }], [{ context: 'c' }]) },
    })
    const p = payloadOf(run(bash, stub, ['--mode', 'required', '--pr', '12', '--base', 'main']))
    assert.deepEqual({ missing: p.missing, total: p.requiredTotal, err: p.err }, { missing: 0, total: 3, err: 0 })
    assert.ok(stub.calls().every((c) => !c.includes('--slurp')), stub.calls().join('\n'))
    const lacking = createObserveStub({
      prview: { out: prJson() },
      rules: { out: lines(reqRule('a'), reqRule('b', 'c')) },
      'check-runs': { out: lines({ check_runs: [{ name: 'a' }] }, { check_runs: [{ name: 'b' }] }) },
      statuses: { out: lines([], []) },
    })
    assert.equal(payloadOf(run(bash, lacking, ['--mode', 'required', '--pr', '12', '--base', 'main'])).missing, 1, '2 ページ目の c だけが不足')
  })

  const review = (login, commit, state) => ({ user: { login }, commit_id: commit, state })

  t('reviews: レビューと check-run が 2 ページ目にあっても数える（1 ページ目だけを見ない）', () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      reviews: { out: lines([review('someone', SHA, 'APPROVED')], [review('cursor[bot]', SHA, 'COMMENTED')]) },
      'check-runs': { out: lines({ check_runs: [{ app: { slug: 'other' }, status: 'completed', conclusion: 'failure' }] }, { check_runs: [{ app: { slug: 'cursor' }, status: 'completed', conclusion: 'success' }, { app: { slug: 'cursor' }, status: 'in_progress', conclusion: null }] }) },
    })
    const p = payloadOf(run(bash, stub, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor']))
    assert.deepEqual({ rv: p.reviews, co: p.commented, ct: p.checkRuns, cp: p.checkRunsPassed, cr: p.checkRunsRunning, cf: p.checkRunsFailed }, { rv: 1, co: 1, ct: 2, cp: 1, cr: 1, cf: 0 })
    assert.ok(stub.calls().every((c) => !c.includes('--slurp')))
  })

  t('reviews: DISMISSED は reviews（到着件数）に含めない（dismissed に別掲）。DISMISSED だけなら到着していない', () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      reviews: { out: lines([review('cursor[bot]', SHA, 'DISMISSED'), review('cursor[bot]', SHA, 'COMMENTED')]) },
      'check-runs': { out: lines({ check_runs: [] }) },
    })
    const p = payloadOf(run(bash, stub, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor']))
    assert.deepEqual({ rv: p.reviews, co: p.commented, di: p.dismissed }, { rv: 1, co: 1, di: 1 })
    const only = createObserveStub({ prview: { out: prJson() }, reviews: { out: lines([review('cursor[bot]', SHA, 'DISMISSED')]) }, 'check-runs': { out: lines({ check_runs: [] }) } })
    const q = payloadOf(run(bash, only, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor', '--wait', '--until', 'review', '--attempt', '1']))
    assert.deepEqual({ rv: q.reviews, di: q.dismissed, o: q.outcome }, { rv: 0, di: 1, o: 'pending' })
  })

  // --- threads-detail ---

  const th = (id, body, resolved = false) => ({ id, isResolved: resolved, path: 'a.js', comments: { nodes: [{ body, url: `https://github.com/o/r/pull/12#discussion_r${id}`, author: { login: 'cursor' } }] } })
  const gql = (nodes) => JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes, pageInfo: { hasNextPage: false, endCursor: null } } } } } })
  const dataLines = (stdout) => stdout.split('\n').filter((l) => l.startsWith('{')).map((l) => JSON.parse(l))

  t('threads-detail: 3000 文字超の本文も全文を返し（旧プロンプトで読めていた範囲を後退させない）、長さを示す。非信頼データは nonce 付きの区切りで囲む', () => {
    const body = `${'あ'.repeat(3331)}`
    const stub = createObserveStub({ graphql: { out: gql([th('T1', body), th('T2', 'short', true)]) } })
    const r = run(bash, stub, ['--mode', 'threads-detail', '--pr', '12'])
    assert.equal(r.status, 0, r.stderr)
    const [d] = dataLines(r.stdout)
    assert.deepEqual({ id: d.threadId, len: d.bodyLength, trunc: d.truncated, same: d.body === body }, { id: 'T1', len: 3331, trunc: false, same: true })
    const out = r.stdout.split('\n')
    assert.ok(out[0].includes(`BEGIN UNTRUSTED`) && out[0].includes(NONCE), out[0])
    assert.ok(out.filter(Boolean).at(-1).includes('END UNTRUSTED') && out.filter(Boolean).at(-1).includes(NONCE))
    assert.ok(!('payload' in d))
  })

  t('threads-detail: 上限を超える本文は切り詰め、truncated と元の長さを明示する。--thread-id で全文を取れる', () => {
    const body = 'x'.repeat(30000)
    const stub = createObserveStub({ graphql: { out: gql([th('T1', body), th('T2', 'other')]) } })
    const [d] = dataLines(run(bash, stub, ['--mode', 'threads-detail', '--pr', '12']).stdout)
    assert.equal(d.truncated, true)
    assert.equal(d.bodyLength, 30000)
    assert.ok(d.body.length >= 6000 && d.body.length < 30000)
    const full = dataLines(run(bash, stub, ['--mode', 'threads-detail', '--pr', '12', '--thread-id', 'T1']).stdout)
    assert.equal(full.length, 1)
    assert.deepEqual({ id: full[0].threadId, trunc: full[0].truncated, len: full[0].body.length }, { id: 'T1', trunc: false, len: 30000 })
  })

  t('threads-detail: --thread-id が threads-detail 以外・不正な形式なら exit 2', () => {
    const stub = createObserveStub({ graphql: { out: gql([]) } })
    for (const args of [['--mode', 'threads', '--pr', '12', '--thread-id', 'T1'], ['--mode', 'threads-detail', '--pr', '12', '--thread-id', 'a b'], ['--mode', 'threads-detail', '--pr', '12', '--thread-id', '$(id)']]) {
      assert.equal(run(bash, stub, args).status, 2, args.join(' '))
    }
  })

  // --- --repo ---

  t('--repo の . と .. の要素は拒否する（exit 2・gh を呼ばない）。名前の途中の .. は許す', () => {
    const stub = createObserveStub({ prview: { out: prJson() }, 'check-runs-total': { out: '{"total_count":1}' }, status: { out: '{"statuses":[]}' } })
    for (const repo of ['a/..', '../x', './x', 'a/.', '../..']) {
      const r = run(bash, stub, ['--mode', 'checks', '--pr', '12', '--repo', repo])
      assert.equal(r.status, 2, repo)
    }
    assert.equal(stub.calls().length, 0)
    assert.equal(run(bash, stub, ['--mode', 'checks', '--pr', '12', '--repo', 'o/a..b']).status, 0)
  })
}

// --- 待機の窓の境界（PR #612 の 2 回目の独立レビュー）---
// 観測時間は整数秒でしか測れず、1 秒ほど過小に見積もる。残りが「次の観測 + 間隔」ちょうどのとき、sleep のあとに始めた観測が
// 残り 1〜2 秒で gh の制限を縮められ、正常な gh を kill して取得失敗（err:1）になっていた。余裕を足し、それでも壁時計の残りで
// 縮めた制限に掛かって kill した場合は、取得失敗ではなく「この起動では結論が出なかった」= pending を返す。
// 実時間を縮めるため、WALL=8・SLEEP=1 に縮尺し、gh の遅延を 1 観測の長さが整数秒の境界をまたぐ帯で振る。

function runAsync(bash, stub, args, env) {
  return new Promise((resolve) => {
    const t0 = Date.now()
    const c = spawn(bash, [SCRIPT, '--nonce', NONCE, ...args], { env: stub.env({ ...FAST, ...env }), stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    c.stdout.on('data', (d) => (out += d))
    c.on('close', (code) => {
      let payload = {}
      try { payload = JSON.parse(out.split('\n')[0]).payload } catch { /* 封筒なし */ }
      resolve({ code, payload, elapsed: (Date.now() - t0) / 1000 })
    })
  })
}
const SCALED = { OBSERVE_PR_WALL_SEC: '8', OBSERVE_PR_SLEEP_SEC: '1', OBSERVE_PR_POLLS: '10', OBSERVE_PR_GH_TIMEOUT_SEC: '25' }
const UNMET = () => createObserveStub({
  prview: { out: prJson({ mergeable: 'UNKNOWN' }) },
  'check-runs-total': { out: '{"total_count":0,"check_runs":[]}' },
  status: { out: '{"statuses":[]}' },
  rules: { out: lines(reqRule2('a', 'b')) },
  'check-runs': { out: lines({ check_runs: [{ name: 'a', app: { slug: 'cursor' }, status: 'in_progress', conclusion: null }] }) },
  statuses: { out: lines([]) },
  reviews: { out: lines([]) },
})
function reqRule2(...ctx) { return [{ type: 'required_status_checks', parameters: { required_status_checks: ctx.map((context) => ({ context })) } }] }
const MODES = {
  checks: ['--mode', 'checks', '--wait', '--attempt', '1'],
  required: ['--mode', 'required', '--base', 'main', '--wait', '--attempt', '1'],
  reviews: ['--mode', 'reviews', '--slug', 'cursor', '--until', 'review', '--wait', '--attempt', '1'],
}

// 余裕（3 秒）の検査は、観測時間が整数秒で測られる境界（実測 3.0〜3.3 秒の観測が 3 秒と 4 秒のどちらに測られるか）に依存する。
// 同時に多数のプロセスを走らせると観測が延びて 4 秒側に倒れ、余裕を外した変異を見逃す（変異テストで確認）ので、この検査だけは
// 同時実行の describe に入れず単独で走らせる（旧テストと同じ条件。2 つの bash で約 6 秒）。
for (const bash of BASHES) {
  test(`[${bash}] 余裕: 残りが「最長の 1 観測 + 間隔」ちょうど（整数秒の誤差の範囲）なら次の観測を始めず pending を返す`, { skip: !jqAvailable }, () => {
    const stub = UNMET()
    // 1 観測 = gh 3 回 × 1 秒 ≒ 3 秒。壁時計 8 秒・間隔 1 秒では、1 回目のあとに残り約 5 秒 < 3 + 1 + 余裕。始めない
    const r = run(bash, stub, ['--mode', 'checks', '--pr', '5', '--wait', '--attempt', '1'], { ...SCALED, GH_STUB_DELAY: '1' })
    const p = payloadOf(r)
    assert.deepEqual({ o: p.outcome, e: p.err }, { o: 'pending', e: 0 })
    assert.equal(stub.countOf('prview'), 1, '2 回目の観測を始めていない')
  })
}

describe('待機の窓の境界・壁時計の打ち切り（実時間を待つケースは同時に走る）', { concurrency: 24 }, () => {
BASHES.forEach((bash, bi) => {
  test(`[${bash}] 条件未成立の --wait は、gh の遅延が観測時間の整数秒の境界をまたぐ帯でも、全モードで pending を返す（正常な gh を取得失敗にしない）`, { skip: !jqAvailable }, async () => {
    const delays = ['0.3', '0.5', '0.7', '1.0', '1.3', '1.6', '2.0', '2.4']
    const jobs = []
    for (const d of delays) {
      for (const [name, args] of Object.entries(MODES)) {
        jobs.push(runAsync(bash, UNMET(), [...args, '--pr', '5'], { ...SCALED, GH_STUB_DELAY: d }).then((r) => ({ d, name, ...r })))
      }
    }
    const results = await Promise.all(jobs)
    const bad = results.filter((r) => r.payload.outcome !== 'pending' || r.payload.err !== 0)
    assert.deepEqual(bad.map((r) => `${r.name} D=${r.d} → ${r.payload.outcome}/err${r.payload.err}`), [], '正常な gh が壁時計の縮めで kill されて error になった')
    for (const r of results) assert.ok(r.elapsed <= 8 + 4, `${r.name} D=${r.d}: ${r.elapsed}s が壁時計上限 + 後始末に収まる`)
  })

  test(`[${bash}] 壁時計の残りで縮めた制限に掛かって kill した場合は pending、gh 自身の制限に掛かった場合は error（取得失敗）と区別する`, { skip: !jqAvailable }, async () => {
    const hang = hangSeconds(1, bi)
    const stub = createObserveStub({ prview: { out: prJson() } })
    // 3 つは独立した起動。待ちを重ねるため同時に走らせる（縮尺は変えない）
    const t0 = Date.now()
    const [wall, once, own] = (await Promise.all([
      // gh の制限（30 秒）> 壁時計（3 秒）: 3 秒で壁時計の縮めに掛かる → この起動では結論が出なかった（pending）
      runA(bash, stub, ['--mode', 'checks', '--pr', '5', '--wait', '--attempt', '1'], { GH_STUB_HANG: hang, OBSERVE_PR_GH_TIMEOUT_SEC: '30', OBSERVE_PR_WALL_SEC: '3' }).then((r) => ({ p: payloadOf(r), elapsed: (Date.now() - t0) / 1000 })),
      // 待機なしの単発観測は pending という概念が無いので、壁時計で打ち切られたら取得失敗（error）
      runA(bash, stub, ['--mode', 'checks', '--pr', '5'], { GH_STUB_HANG: hang, OBSERVE_PR_GH_TIMEOUT_SEC: '30', OBSERVE_PR_WALL_SEC: '2' }).then((r) => ({ p: payloadOf(r) })),
      // gh 自身の制限（1 秒）を超えた場合は取得失敗のまま
      runA(bash, stub, ['--mode', 'checks', '--pr', '5', '--wait', '--attempt', '1'], { GH_STUB_HANG: hang, OBSERVE_PR_GH_TIMEOUT_SEC: '1', OBSERVE_PR_WALL_SEC: '5', OBSERVE_PR_POLLS: '1' }).then((r) => ({ p: payloadOf(r) })),
    ]))
    assert.deepEqual({ o: wall.p.outcome, e: wall.p.err }, { o: 'pending', e: 0 })
    assert.ok(wall.elapsed <= 3 + 3, '壁時計の縮めで 3 秒付近に打ち切られる（gh の 30 秒制限を待たない）')
    assert.deepEqual({ o: once.p.outcome, e: once.p.err }, { o: 'error', e: 1 })
    assert.deepEqual({ o: own.p.outcome, e: own.p.err }, { o: 'error', e: 1 })
    const left = sleepersOf(hang)
    if (left !== null) assert.equal(left, 0)
  })

  test(`[${bash}] --attempt が上限のときの壁時計打ち切りは exhausted（pending のまま再実行させない）`, { skip: !jqAvailable }, async () => {
    const hang = hangSeconds(2, bi)
    const stub = createObserveStub({ prview: { out: prJson() } })
    const p = payloadOf(await runA(bash, stub, ['--mode', 'checks', '--pr', '5', '--wait', '--attempt', '7'], { GH_STUB_HANG: hang, OBSERVE_PR_GH_TIMEOUT_SEC: '30', OBSERVE_PR_WALL_SEC: '2' }))
    assert.deepEqual({ o: p.outcome, e: p.err }, { o: 'exhausted', e: 0 })
  })

  t2(bash, 'gh の出力サイズに上限があり、出力し続ける gh は取得失敗にする（一時ファイルが際限なく育たない）', async () => {
    const stub = createObserveStub({ prview: { out: prJson() } })
    const t0 = Date.now()
    const p = payloadOf(await runA(bash, stub, ['--mode', 'checks', '--pr', '12'], { GH_STUB_FLOOD: '1', OBSERVE_PR_MAX_OUT_BYTES: '20000', OBSERVE_PR_WALL_SEC: '20' }))
    assert.deepEqual({ e: p.err, o: p.outcome }, { e: 1, o: 'error' })
    assert.ok((Date.now() - t0) / 1000 < 10, '上限で打ち切る（壁時計まで待たない）')
  })
})
})

for (const bash of BASHES) {
  t2(bash, '--thread-id が見つからないときは空で exit 0 にせず、見つからないことが分かる行を出して exit 4 にする。未解決 0 件で空行を挟まない', () => {
    const stub = createObserveStub({ graphql: { out: gql2([th2('T1', 'a'), th2('T2', 'b', true)]) } })
    const nf = run(bash, stub, ['--mode', 'threads-detail', '--pr', '12', '--thread-id', 'NOPE'])
    assert.equal(nf.status, 4)
    assert.ok(nf.stdout.includes('"found":false') && nf.stdout.includes('NOPE'), nf.stdout)
    assert.match(nf.stderr, /見つからない/)
    const resolved = createObserveStub({ graphql: { out: gql2([th2('T2', 'b', true)]) } })
    const none = run(bash, resolved, ['--mode', 'threads-detail', '--pr', '12'])
    assert.equal(none.status, 0)
    assert.ok(!/\n\n/.test(none.stdout), '区切りの間に空行を入れない: ' + JSON.stringify(none.stdout))
    assert.equal(dataLines2(none.stdout).length, 0)
  })

}

const th2 = (id, body, resolved = false) => ({ id, isResolved: resolved, path: 'a.js', comments: { nodes: [{ body, url: 'https://github.com/o/r/pull/12#d', author: { login: 'cursor' } }] } })
const gql2 = (nodes) => JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes, pageInfo: { hasNextPage: false, endCursor: null } } } } } })
const dataLines2 = (stdout) => stdout.split('\n').filter((l) => l.startsWith('{'))
function t2(bash, name, fn) {
  test(`[${bash}] ${name}`, { skip: !jqAvailable }, fn)
}
