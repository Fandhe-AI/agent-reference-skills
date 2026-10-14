// observe-pr.sh --mode push（push 直後の確認）を、偽 gh と実 git の作業ディレクトリで実際に走らせる回帰テスト
// （Issue #603 第 3 弾）。pr-create / fix のプロンプトに文章で書いていた「push 済みの head を取得し、そのチェック総数と
// mergeable を 30 秒間隔で最大 5 分観測する」手順が、スクリプトに移っても同じ意味を保ち、推測で値を作らないことを固定する。
//
// 検証する契約:
//   - PR の head がローカルの HEAD（push 済みのコミット）と一致するまで、件数も mergeable も読まない（古い head の値を
//     『push 後の値』として返さない）。一致しなければ mergeable は UNKNOWN、checksStarted は 0
//   - 一致したあと、チェック総数（check-run + commit status）が 1 件以上かつ mergeable が確定したら met
//   - mergeable が CONFLICTING に確定したら、チェックは構造的に 0 件のままなので待たずに met（checksStarted 0）
//   - 想定外の PR・OPEN でない PR は待っても変わらないので met（値は読まない）
//   - 取得失敗（gh・git の失敗）は 0 件・CONFLICTING に畳み込まず err=1 / error
//   - 待機は『30 秒間隔・1 起動 3 回観測・--attempt 最大 4 回（およそ 5 分）』が既定で、範囲外の --attempt は exit 2
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, realpathSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'
import { createObserveStubPages as createObserveStub } from './lib/gh-observe-stub.mjs'
import { REAL_GIT, git } from './lib/git-sandbox.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'observe-pr.sh')
const NONCE = 'k3x9a0b1c2d4e5f6g7h8i9j0k1l2'
const OLD = 'b2'.repeat(20)
const BASHES = availableBashes()
const jqAvailable = toolExists('jq')
const FAST = { OBSERVE_PR_POLLS: '3', OBSERVE_PR_SLEEP_SEC: '0' }
const BRANCH = 'fix/603-x'
const ARGS = ['--mode', 'push', '--pr', '12', '--base', 'main', '--branch', BRANCH]
const WAIT = (n) => ['--wait', '--attempt', String(n)]

function makeRepo() {
  const dir = realpathSync(trackTmp(mkdtempSync(join(tmpdir(), 'iit-push-mode-'))))
  git(dir, 'init', '-q', '-b', 'main')
  git(dir, 'config', 'user.name', 'test')
  git(dir, 'config', 'user.email', 'test@example.com')
  git(dir, 'commit', '-q', '--allow-empty', '-m', 'c1')
  return { dir, head: git(dir, 'rev-parse', 'HEAD') }
}
const prJson = (head, over = {}) =>
  JSON.stringify({ state: 'OPEN', headRefOid: head, mergeable: 'MERGEABLE', headRefName: BRANCH, baseRefName: 'main', isCrossRepository: false, ...over })
const checks = (runs, statuses = 0) => ({
  'check-runs-total': { out: JSON.stringify({ total_count: runs, check_runs: [] }) },
  status: { out: JSON.stringify({ statuses: Array.from({ length: statuses }, (_, i) => ({ context: `s${i}` })) }) },
})

function run(bash, stub, repo, args, env = {}) {
  return spawnSync(bash, [SCRIPT, '--nonce', NONCE, ...args], { cwd: repo.dir, encoding: 'utf8', env: stub.env({ ...FAST, ...env }) })
}
function payloadOf(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は 1 行')
  const e = JSON.parse(r.stdout)
  assert.deepEqual(Object.keys(e).sort(), ['nonce', 'payload', 'sha256'])
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload))
  return e.payload
}
const pick = (p) => ({ o: p.outcome, e: p.err, c: p.checksStarted, m: p.mergeable, t: p.total })

for (const bash of BASHES) {
  const t = (name, fn) => test(`[${bash}] ${name}`, { skip: !jqAvailable }, fn)

  t('met: PR の head が HEAD と一致し、チェック（check-run + commit status）が 1 件以上で mergeable が確定している', () => {
    const repo = makeRepo()
    const stub = createObserveStub({ prview: { out: prJson(repo.head) }, ...checks(2, 1) })
    const p = payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(1)]))
    assert.deepEqual(pick(p), { o: 'met', e: 0, c: 1, m: 'MERGEABLE', t: 3 })
    assert.deepEqual(
      { h: p.headSha, s: p.state, b: p.bound, a: p.attempt, ma: p.maxAttempts, mode: p.mode },
      { h: repo.head, s: 'OPEN', b: 1, a: 1, ma: 4, mode: 'push' },
    )
    assert.equal(p.inputSha256, inputSha256(['observe-pr', 'push', '12', '', 'main', BRANCH, '', '', ''].join('\n')))
  })

  t('PR の head がまだ push 済みの HEAD と違う間は、件数も mergeable も読まない（古い head の値を返さない）', () => {
    const repo = makeRepo()
    const stub = createObserveStub({ prview: { out: prJson(OLD) }, ...checks(5) })
    const p = payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(1)]))
    assert.deepEqual(pick(p), { o: 'pending', e: 0, c: 0, m: 'UNKNOWN', t: 0 })
    assert.equal(stub.countOf('check-runs-total'), 0, '一致するまでチェックの件数を取りに行かない')
    assert.equal(p.headSha, OLD)
  })

  t('head が遅れて一致したら、その head の値で met になる（途中の古い head の値は採用しない）', () => {
    const repo = makeRepo()
    const stub = createObserveStub({
      prview: [{ out: prJson(OLD) }, { out: prJson(repo.head) }], ...checks(1),
    })
    const p = payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(1)]))
    assert.deepEqual(pick(p), { o: 'met', e: 0, c: 1, m: 'MERGEABLE', t: 1 })
    assert.equal(stub.countOf('prview'), 2)
  })

  t('mergeable が CONFLICTING に確定したら待たずに met。チェックは 0 件のままなので件数を取りに行かず checksStarted は 0', () => {
    const repo = makeRepo()
    const stub = createObserveStub({ prview: { out: prJson(repo.head, { mergeable: 'CONFLICTING' }) }, ...checks(0) })
    const p = payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(1)]))
    assert.deepEqual(pick(p), { o: 'met', e: 0, c: 0, m: 'CONFLICTING', t: 0 })
    assert.equal(stub.countOf('prview'), 1, '1 回の観測で返る')
    assert.equal(stub.countOf('check-runs-total'), 0)
  })

  t('mergeable が UNKNOWN のままなら met にしない。最後の attempt では exhausted で、件数があれば checksStarted は 1・mergeable は UNKNOWN', () => {
    const repo = makeRepo()
    const stub = createObserveStub({ prview: { out: prJson(repo.head, { mergeable: 'UNKNOWN' }) }, ...checks(2) })
    assert.deepEqual(pick(payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(1)]))), { o: 'pending', e: 0, c: 1, m: 'UNKNOWN', t: 2 })
    assert.deepEqual(pick(payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(4)]))), { o: 'exhausted', e: 0, c: 1, m: 'UNKNOWN', t: 2 })
  })

  t('チェックが 0 件のままなら met にしない。最後の attempt では exhausted で checksStarted は 0（mergeable は確定値のまま）', () => {
    const repo = makeRepo()
    const stub = createObserveStub({ prview: { out: prJson(repo.head) }, ...checks(0) })
    assert.deepEqual(pick(payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(2)]))), { o: 'pending', e: 0, c: 0, m: 'MERGEABLE', t: 0 })
    assert.deepEqual(pick(payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(4)]))), { o: 'exhausted', e: 0, c: 0, m: 'MERGEABLE', t: 0 })
  })

  t('想定外の PR（head ブランチ・base・fork が違う）と OPEN でない PR は待っても変わらないので met。件数は読まず checksStarted は 0', () => {
    for (const over of [{ headRefName: 'fix/other' }, { baseRefName: 'develop' }, { isCrossRepository: true }, { state: 'MERGED' }, { state: 'CLOSED' }]) {
      const repo = makeRepo()
      const stub = createObserveStub({ prview: { out: prJson(repo.head, over) }, ...checks(3) })
      const p = payloadOf(run(bash, stub, repo, [...ARGS, ...WAIT(1)]))
      assert.deepEqual(pick(p), { o: 'met', e: 0, c: 0, m: 'UNKNOWN', t: 0 }, JSON.stringify(over))
      assert.equal(stub.countOf('check-runs-total'), 0, JSON.stringify(over))
    }
  })

  t('取得失敗（gh pr view・check-runs・status の失敗、壊れた JSON）は err=1 / error。0 件・CONFLICTING に畳み込まない', () => {
    const body = { out: '{"message":"Bad Gateway"}', exit: 1 }
    const cases = {
      'pr view 失敗': (head) => ({ prview: body, ...checks(1) }),
      'pr view 壊れた JSON': () => ({ prview: { out: '{"x":1}' }, ...checks(1) }),
      'check-runs 失敗': (head) => ({ prview: { out: prJson(head) }, 'check-runs-total': body, status: { out: '{"statuses":[]}' } }),
      'status 失敗': (head) => ({ prview: { out: prJson(head) }, 'check-runs-total': { out: '{"total_count":2}' }, status: body }),
      'state の語彙が不正': (head) => ({ prview: { out: prJson(head, { state: 'WEIRD' }) }, ...checks(1) }),
    }
    for (const [name, make] of Object.entries(cases)) {
      const repo = makeRepo()
      const p = payloadOf(run(bash, createObserveStub(make(repo.head)), repo, [...ARGS, ...WAIT(1)]))
      assert.deepEqual(pick(p), { o: 'error', e: 1, c: 0, m: 'UNKNOWN', t: 0 }, name)
      assert.equal(p.headSha, '', `${name}: 失敗した観測の head を載せない`)
    }
  })

  t('git の作業ディレクトリでない（HEAD を読めない）なら err=1 / error。待たずに推測もしない', () => {
    const stub = createObserveStub({ prview: { out: prJson(OLD) }, ...checks(1) })
    const notRepo = { dir: realpathSync(trackTmp(mkdtempSync(join(tmpdir(), 'iit-push-norepo-')))) }
    const r = run(bash, stub, notRepo, [...ARGS, ...WAIT(1)], { GIT_CEILING_DIRECTORIES: dirname(notRepo.dir) })
    assert.deepEqual(pick(payloadOf(r)), { o: 'error', e: 1, c: 0, m: 'UNKNOWN', t: 0 })
    assert.equal(stub.countOf('prview'), 0, 'HEAD を読めないなら PR も取りに行かない')
  })

  t('待機なしの単発観測でも使える（outcome は observed）。mergeable を欠く応答は UNKNOWN に正規化する', () => {
    const repo = makeRepo()
    const stub = createObserveStub({ prview: { out: JSON.stringify({ state: 'OPEN', headRefOid: repo.head, headRefName: BRANCH, baseRefName: 'main', isCrossRepository: false }) }, ...checks(1) })
    const p = payloadOf(run(bash, stub, repo, ARGS))
    assert.deepEqual(pick(p), { o: 'observed', e: 0, c: 1, m: 'UNKNOWN', t: 1 })
    assert.equal(p.attempt, 0)
  })

  t('引数: --base --branch が必須。--wait の --attempt は 1〜4（既定の上限）で、範囲外は exit 2 で封筒を出さない', () => {
    const repo = makeRepo()
    const stub = createObserveStub({ prview: { out: prJson(repo.head) }, ...checks(1) })
    for (const args of [
      ['--mode', 'push', '--pr', '12', '--base', 'main'],
      ['--mode', 'push', '--pr', '12', '--branch', BRANCH],
      [...ARGS, '--wait'],
      [...ARGS, ...WAIT(0)],
      [...ARGS, ...WAIT(5)],
      [...ARGS, '--branch', 'a;b'],
    ]) {
      const r = run(bash, stub, repo, args)
      assert.equal(r.status, 2, JSON.stringify(args))
      assert.equal(r.stdout, '')
    }
    assert.equal(run(bash, stub, repo, [...ARGS, ...WAIT(4)]).status, 0)
    assert.equal(run(bash, stub, repo, [...ARGS, ...WAIT(5)], { OBSERVE_PR_MAX_ATTEMPTS: '6' }).status, 0, '環境変数で上限を変えられる')
    assert.equal(stub.countOf('check-runs-total'), 2)
  })
}

test('既定の待機は 30 秒間隔・1 起動 3 回観測・--attempt 最大 4 回（およそ 5 分）で、1 起動は壁時計 90 秒に収まる。他のモードの既定は変えない', () => {
  const sh = readFileSync(SCRIPT, 'utf8')
  const all = (name) => [...sh.matchAll(new RegExp(`env_int "\\$\\{${name}:-\\}" (\\d+) (\\d+) (\\d+)`, 'g'))].map((x) => Number(x[1]))
  // 先頭が既定（monitor の各モード）、2 つ目が push の上書き、3 つ目が checks --until settled の上書き（第 8 弾。別のテストが検査する）
  assert.deepEqual(all('OBSERVE_PR_POLLS'), [6, 3, 4])
  assert.deepEqual(all('OBSERVE_PR_SLEEP_SEC'), [15, 30, 25])
  assert.deepEqual(all('OBSERVE_PR_MAX_ATTEMPTS'), [7, 4, 30])
  const polls = all('OBSERVE_PR_POLLS')[1]
  const sleep = all('OBSERVE_PR_SLEEP_SEC')[1]
  const maxAttempts = all('OBSERVE_PR_MAX_ATTEMPTS')[1]
  assert.ok((polls - 1) * sleep < 90, `内部 sleep の合計 ${(polls - 1) * sleep} 秒が壁時計上限 90 秒未満`)
  const total = maxAttempts * (polls - 1) * sleep
  assert.ok(total >= 240 && total <= 330, `合計の待機 ${total} 秒が 5 分前後`)
})

test('git が実在する（このテストの前提）', () => {
  assert.ok(REAL_GIT && spawnSync(REAL_GIT, ['--version']).status === 0)
})
