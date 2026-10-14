// observe-pr.sh の checks --until settled（gh pr checks --watch の置き換え。Issue #603 第 8 弾）を、偽 gh を PATH の先頭に置いて
// 実際に実行する回帰テスト。待機は OBSERVE_PR_SLEEP_SEC=0 で縮め、実時間を待たない（観測の回数と outcome を検査する）。
//
// 検証する契約:
//   - 未完了（pending）が 0 件になったら met。pending → settled の遷移を、観測のたびに応答が変わる偽 gh で再現する
//   - 待機の上限は --attempt で強制し（既定 30 回 = およそ 40 分）、上限での未成立は exhausted。範囲外は exit 2
//   - 取得失敗・形の違う応答を『未完了 0 = 完了』に畳み込まない（err=1・error。件数は 0 だが err を見る）
//   - commit status だけを発行する CI も数える。check-run と commit status は合算する
//   - 合格以外（failure など）は failed として数える。failed があっても未完了が 0 なら met（判断は呼び出し側）
//   - 総数 0 件は met（total 0）。通常の checks（--until なし）の payload の形は変えない
//   - payload は整数と固定語彙・40 桁 16 進だけ
// macOS（/bin/bash は 3.2）と Linux の両方で通る書き方だけを使う。利用できる bash をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'
import { createObserveStubPages as createObserveStub } from './lib/gh-observe-stub.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'observe-pr.sh')
const NONCE = 'k3x9a0b1c2d4e5f6g7h8i9j0k1l2'
const SHA = 'a1'.repeat(20)
const FAST = { OBSERVE_PR_POLLS: '3', OBSERVE_PR_SLEEP_SEC: '0' }
const ARGS = ['--mode', 'checks', '--pr', '12', '--until', 'settled']
const WAIT = (n) => [...ARGS, '--wait', '--attempt', String(n)]
const ERR_BODY = { out: '{"message":"Not Found","status":"404"}', exit: 1 }

const prView = { out: JSON.stringify({ headRefOid: SHA }) }
const run = (status, conclusion = null) => ({ name: 'x', status, conclusion, app: { slug: 'github-actions' } })
// check-runs の応答は『ページの配列』の JSON で書く（偽 gh が 1 行 1 ページに直す）
const runs = (...pages) => ({ out: JSON.stringify(pages.map((rs) => ({ total_count: rs.length, check_runs: rs }))) })
const status = (...states) => ({ out: JSON.stringify({ state: 'pending', statuses: states.map((state) => ({ state, context: 'ci/x' })) }) })

function exec(bash, stub, args, env = {}) {
  return spawnSync(bash, [SCRIPT, '--nonce', NONCE, ...args], { encoding: 'utf8', env: stub.env({ ...FAST, ...env }) })
}
function envelope(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は 1 行（末尾の改行 1 つ）')
  const e = JSON.parse(r.stdout)
  assert.deepEqual(Object.keys(e).sort(), ['nonce', 'payload', 'sha256'])
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload), 'sha256 は nonce + 改行 + payload の正規形')
  return e.payload
}
const counts = (p) => ({ passed: p.passed, pending: p.pending, failed: p.failed, total: p.total })

for (const bash of availableBashes()) {
  const t = (name, fn) => test(`[${bash}] ${name}`, { skip: !toolExists('jq') }, fn)

  t('pending → settled: 未完了がある間は待ち、0 件になった観測で met を返す（件数は最後の観測）', () => {
    const stub = createObserveStub({
      prview: prView,
      'check-runs': [runs([run('completed', 'success'), run('in_progress')]), runs([run('completed', 'success'), run('queued')]), runs([run('completed', 'success'), run('completed', 'success')])],
      status: status('success'),
    })
    const p = envelope(exec(bash, stub, WAIT(3)))
    assert.deepEqual({ o: p.outcome, e: p.err, a: p.attempt, m: p.maxAttempts, h: p.headSha, mode: p.mode }, { o: 'met', e: 0, a: 3, m: 30, h: SHA, mode: 'checks' })
    assert.deepEqual(counts(p), { passed: 3, pending: 0, failed: 0, total: 3 })
    assert.equal(stub.countOf('check-runs'), 3, '3 回目の観測で結論が出る')
    assert.equal(stub.countOf('status'), 3)
  })

  t('上限: 1 回の起動は OBSERVE_PR_POLLS 回で打ち切り pending（件数は未完了の実測）、--attempt が上限なら exhausted。どちらも headSha を持つ', () => {
    const stub = createObserveStub({ prview: prView, 'check-runs': runs([run('completed', 'success'), run('in_progress')]), status: status() })
    const p = envelope(exec(bash, stub, WAIT(1)))
    assert.deepEqual({ o: p.outcome, h: p.headSha, a: p.attempt }, { o: 'pending', h: SHA, a: 1 })
    assert.deepEqual(counts(p), { passed: 1, pending: 1, failed: 0, total: 2 })
    assert.equal(stub.countOf('check-runs'), 3, '観測は OBSERVE_PR_POLLS 回で止まる（有界）')
    const q = envelope(exec(bash, stub, WAIT(30)))
    assert.deepEqual({ o: q.outcome, h: q.headSha, a: q.attempt, m: q.maxAttempts, e: q.err }, { o: 'exhausted', h: SHA, a: 30, m: 30, e: 0 })
    assert.equal(q.pending, 1)
    // 環境変数で上限を下げると、その値が上限になる（テストの縮尺）
    const r = envelope(exec(bash, stub, WAIT(2), { OBSERVE_PR_MAX_ATTEMPTS: '2' }))
    assert.deepEqual({ o: r.outcome, m: r.maxAttempts }, { o: 'exhausted', m: 2 })
  })

  t('上限: --attempt が 0・31 以上・数字以外なら exit 2（封筒を出さない）。--wait なしの --attempt は無視される', () => {
    const stub = createObserveStub({ prview: prView, 'check-runs': runs([]), status: status() })
    for (const a of ['0', '31', '-1', 'x', '']) {
      const r = exec(bash, stub, [...ARGS, '--wait', '--attempt', a])
      assert.equal(r.status, 2, `--attempt ${a}`)
      assert.equal(r.stdout, '')
    }
    assert.equal(exec(bash, stub, [...ARGS, '--wait']).status, 2, '--wait には --attempt が必要')
    assert.equal(stub.countOf('prview'), 0, '範囲外では gh を呼ばない')
    // OBSERVE_PR_MAX_ATTEMPTS は 40 まで（既定 30 を引き上げ可能）。範囲外は既定へ戻す
    assert.equal(envelope(exec(bash, stub, WAIT(1), { OBSERVE_PR_MAX_ATTEMPTS: '40' })).maxAttempts, 40)
    assert.equal(envelope(exec(bash, stub, WAIT(1), { OBSERVE_PR_MAX_ATTEMPTS: '41' })).maxAttempts, 30)
  })

  t('取得失敗は『未完了 0 = 完了』に畳まない: check-runs・status・HEAD の取得失敗、形の違う応答は err=1・error・met ではない', () => {
    const okRuns = runs([run('completed', 'success')])
    const scenarios = [
      { 'check-runs': ERR_BODY, status: status('success') },
      { 'check-runs': okRuns, status: ERR_BODY },
      { 'check-runs': okRuns, status: { out: '{"message":"Bad credentials"}' } },
      { 'check-runs': { out: '{"message":"Bad credentials"}' }, status: status() },
      { 'check-runs': { out: 'not json' }, status: status() },
      { 'check-runs': { out: '' }, status: status() },
      { 'check-runs': okRuns, status: { out: 'not json' } },
      // 型が違う（status が文字列でない・state が無い）
      { 'check-runs': { out: JSON.stringify({ total_count: 1, check_runs: [{ status: 3 }] }) }, status: status() },
      { 'check-runs': okRuns, status: { out: JSON.stringify({ statuses: [{ context: 'ci' }] }) } },
      { 'check-runs': okRuns, status: status('success'), prview: { out: '', exit: 1 } },
    ]
    for (const s of scenarios) {
      for (const args of [ARGS, WAIT(1)]) {
        const stub = createObserveStub({ prview: prView, ...s })
        const p = envelope(exec(bash, stub, args))
        assert.equal(p.err, 1, JSON.stringify(s))
        assert.equal(p.outcome, 'error', JSON.stringify(s))
        assert.deepEqual(counts(p), { passed: 0, pending: 0, failed: 0, total: 0 }, '失敗した観測の件数は信用せず 0 にする（err で判別させる）')
        assert.equal(p.headSha, '')
      }
    }
  })

  t('取得失敗が途中で起きても、一度成功した後の失敗を完了と読ませない（失敗した観測は met にならない）', () => {
    const stub = createObserveStub({
      prview: prView,
      'check-runs': [runs([run('in_progress')]), ERR_BODY, ERR_BODY],
      status: status(),
    })
    const p = envelope(exec(bash, stub, WAIT(1)))
    assert.notEqual(p.outcome, 'met')
    assert.equal(p.err, 1)
    assert.equal(p.outcome, 'error')
  })

  t('commit status だけの CI も数える: check-run が 0 件でも status の success で total 1・met、pending は未完了', () => {
    const only = createObserveStub({ prview: prView, 'check-runs': runs([]), status: status('success') })
    const p = envelope(exec(bash, only, WAIT(1)))
    assert.deepEqual({ o: p.outcome, c: counts(p), runs: p.checkRuns, st: p.statuses }, { o: 'met', c: { passed: 1, pending: 0, failed: 0, total: 1 }, runs: 0, st: 1 })
    const pend = createObserveStub({ prview: prView, 'check-runs': runs([]), status: status('pending', 'success') })
    const q = envelope(exec(bash, pend, WAIT(1)))
    assert.deepEqual({ o: q.outcome, c: counts(q) }, { o: 'pending', c: { passed: 1, pending: 1, failed: 0, total: 2 } })
    const mix = createObserveStub({ prview: prView, 'check-runs': runs([run('completed', 'success')]), status: status('failure', 'error') })
    const r = envelope(exec(bash, mix, WAIT(1)))
    assert.deepEqual({ o: r.outcome, c: counts(r) }, { o: 'met', c: { passed: 1, pending: 0, failed: 2, total: 3 } })
  })

  t('不合格: failure / cancelled / timed_out と未知の conclusion は failed に数え、未完了が 0 なら met（早期に終わらず、判断は呼び出し側）', () => {
    const stub = createObserveStub({
      prview: prView,
      'check-runs': runs([run('completed', 'failure'), run('completed', 'cancelled'), run('completed', 'timed_out'), run('completed', 'brand_new'), run('completed', 'neutral'), run('completed', 'skipped')]),
      status: status(),
    })
    const p = envelope(exec(bash, stub, WAIT(1)))
    assert.deepEqual({ o: p.outcome, c: counts(p) }, { o: 'met', c: { passed: 2, pending: 0, failed: 4, total: 6 } })
    // 失敗があっても未完了が残っていれば待つ（全チェックの完了を待つ現行の --watch と同じ）
    const waiting = createObserveStub({ prview: prView, 'check-runs': runs([run('completed', 'failure'), run('queued')]), status: status() })
    assert.equal(envelope(exec(bash, waiting, WAIT(1))).outcome, 'pending')
  })

  t('0 件: check-run も status も無ければ met・total 0（待ち続けない。0 件の扱いは呼び出し側の手順 3e）', () => {
    const stub = createObserveStub({ prview: prView, 'check-runs': runs([]), status: { out: '{"state":"pending","statuses":[]}' } })
    const p = envelope(exec(bash, stub, WAIT(1)))
    assert.deepEqual({ o: p.outcome, e: p.err, c: counts(p), h: p.headSha }, { o: 'met', e: 0, c: { passed: 0, pending: 0, failed: 0, total: 0 }, h: SHA })
    assert.equal(stub.countOf('check-runs'), 1, '1 回目で met になり、それ以上観測しない')
  })

  t('複数ページ: check-run をページ合算して分類する。--wait なしの単発観測は outcome observed', () => {
    const stub = createObserveStub({
      prview: prView,
      'check-runs': runs([run('completed', 'success'), run('completed', 'success')], [run('in_progress')], [run('completed', 'failure')]),
      status: status('success'),
    })
    const p = envelope(exec(bash, stub, ARGS))
    assert.deepEqual({ o: p.outcome, a: p.attempt, m: p.maxAttempts, c: counts(p), r: p.checkRuns, s: p.statuses }, { o: 'observed', a: 0, m: 0, c: { passed: 3, pending: 1, failed: 1, total: 5 }, r: 4, s: 1 })
    assert.equal(stub.countOf('check-runs'), 1)
  })

  t('commit status の複数ページ: --paginate で 2 ページ目も合算して分類する（1 ページで打ち切らない）', () => {
    const page = (...rows) => ({ statuses: rows.map(([id, state]) => ({ id, context: `ci/${id}`, state })) })
    const stub = createObserveStub({
      prview: prView,
      'check-runs': runs([run('completed', 'success')]),
      status: { out: JSON.stringify([page([1, 'success'], [2, 'success']), page([3, 'pending']), page([4, 'failure'])]) },
    })
    const p = envelope(exec(bash, stub, ARGS))
    assert.deepEqual({ c: counts(p), r: p.checkRuns, s: p.statuses }, { c: { passed: 3, pending: 1, failed: 1, total: 5 }, r: 1, s: 4 })
  })

  t('同名の check-run の重複: 古い check suite の cancelled と新しい success が並んでも最新（id 最大）だけを数える。件数・総数も畳んだ後', () => {
    const r = (id, name, status, conclusion, appId = 15368) => ({ id, name, status, conclusion, app: { id: appId, slug: 'github-actions' } })
    const stub = createObserveStub({
      prview: prView,
      'check-runs': runs(
        [r(10, 'build', 'completed', 'cancelled'), r(30, 'build', 'completed', 'success'), r(20, 'lint', 'completed', 'failure')],
        [r(40, 'lint', 'completed', 'success'), r(5, 'test', 'completed', 'success', 99), r(6, 'test', 'completed', 'failure', 15368)],
      ),
      status: { out: JSON.stringify({ statuses: [{ id: 1, context: 'ci/x', state: 'failure' }, { id: 2, context: 'ci/x', state: 'success' }] }) },
    })
    const p = envelope(exec(bash, stub, ARGS))
    // build 1・lint 1・test は app が別なので 2 件（success と failure）・status ci/x 1 件
    assert.deepEqual({ c: counts(p), r: p.checkRuns, s: p.statuses }, { c: { passed: 4, pending: 0, failed: 1, total: 5 }, r: 4, s: 1 })
  })

  t('大きな応答: 150 件・長い output.text を含む check-run でも引数の上限に当たらず分類できる（射影して標準入力で渡す）', () => {
    const big = 'x'.repeat(10000)
    const many = Array.from({ length: 150 }, (_, i) => ({ id: i + 1, name: `job-${i}`, status: 'completed', conclusion: 'success', app: { id: 15368 }, output: { title: 't', summary: 's', text: big } }))
    const stub = createObserveStub({
      prview: prView,
      'check-runs': runs(many.slice(0, 100), many.slice(100)),
      status: status('success'),
    })
    const p = envelope(exec(bash, stub, ARGS))
    assert.deepEqual({ o: p.outcome, c: counts(p) }, { o: 'observed', c: { passed: 151, pending: 0, failed: 0, total: 151 } })
  })

  t('通常の checks（--until なし）の payload は変えない: passed / pending / failed を持たず、per_page=1 の総数で数える', () => {
    const stub = createObserveStub({
      prview: prView,
      'check-runs-total': { out: JSON.stringify({ total_count: 2, check_runs: [] }) },
      status: { out: JSON.stringify({ statuses: [{ state: 'success' }] }) },
    })
    const p = envelope(exec(bash, stub, ['--mode', 'checks', '--pr', '12']))
    assert.deepEqual(Object.keys(p).sort(), ['attempt', 'checkRuns', 'err', 'headSha', 'inputSha256', 'maxAttempts', 'mode', 'outcome', 'statuses', 'total'])
    assert.equal(p.total, 3)
    assert.equal(stub.countOf('check-runs'), 0)
    // 通常の --wait の既定は従来どおり（7 回）
    const w = envelope(exec(bash, stub, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '1']))
    assert.equal(w.maxAttempts, 7)
  })

  t('入力の束縛: inputSha256 は --until を含む（通常の checks の封筒とは別の値）。checks の --until は settled だけ', () => {
    const stub = createObserveStub({ prview: prView, 'check-runs': runs([]), status: status() })
    const p = envelope(exec(bash, stub, ARGS))
    const input = (until) => ['observe-pr', 'checks', '12', '', '', '', '', '', until].join('\n')
    assert.equal(p.inputSha256, inputSha256(input('settled')))
    assert.notEqual(p.inputSha256, inputSha256(input('')))
    for (const u of ['review', 'started', 'bogus']) {
      const r = exec(bash, stub, ['--mode', 'checks', '--pr', '12', '--until', u])
      assert.equal(r.status, 2, u)
      assert.equal(r.stdout, '')
    }
  })

  t('payload は整数と固定語彙・40 桁 16 進だけで、check-run 名・context 名のような外部由来の文字列を含めない', () => {
    const stub = createObserveStub({
      prview: prView,
      'check-runs': runs([{ name: 'secret-name-ZZZ', status: 'completed', conclusion: 'success', app: { slug: 'evil' } }]),
      status: { out: JSON.stringify({ statuses: [{ state: 'success', context: 'context-YYY', description: 'desc-XXX' }] }) },
    })
    const r = exec(bash, stub, WAIT(1))
    for (const s of ['secret-name-ZZZ', 'context-YYY', 'desc-XXX', 'evil']) assert.ok(!r.stdout.includes(s), s)
    const p = envelope(r)
    for (const [k, v] of Object.entries(p)) assert.ok(typeof v === 'number' || /^[A-Za-z0-9]*$/.test(v), `${k}: ${v}`)
  })

  t('既定の観測回数は 4 回（OBSERVE_PR_POLLS 未指定）、上限は 30 回。1 起動の所要はテスト側で 25 秒間隔を 0 にして縮める', () => {
    const stub = createObserveStub({ prview: prView, 'check-runs': runs([run('queued')]), status: status() })
    const p = envelope(exec(bash, stub, WAIT(1), { OBSERVE_PR_POLLS: '', OBSERVE_PR_SLEEP_SEC: '0' }))
    assert.equal(p.outcome, 'pending')
    assert.equal(p.maxAttempts, 30)
    // 既定の polls は 4（間隔を 0 にして縮めても観測回数は既定どおり）
    assert.equal(stub.countOf('check-runs'), 4)
  })
}
