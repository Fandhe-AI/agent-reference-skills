// 観測スクリプト scripts/observe-pr.sh を、偽 gh（tests/lib/gh-observe-stub.mjs）を PATH の先頭に置いて実際に実行する
// 回帰テスト（Issue #603 第 2 弾）。monitor プロンプトに書いていた gh / jq の観測と分類規則が、スクリプトに移っても
// 同じ意味を保つことを固定する。
//
// 検証する契約:
//   - 取得失敗（非 0 終了・HTTP エラー本文が標準出力に出る・成功終了でも本文が想定の型でない）を「0 件」「不足 0」へ
//     畳み込まず err=1 で返す（件数の 0 と区別できる）
//   - --paginate --slurp の複数ページを合算する（件数の合算は jq。paste・bc に依存しない）
//   - 待機は 1 回の起動が有界（OBSERVE_PR_POLLS 回まで）で、met / pending / exhausted を返し、--attempt の範囲外は exit 2
//   - 出力は 1 行の封筒で、payload は整数と固定語彙・40 桁 16 進だけ（context 名・コメント本文などの外部由来の文字列を含めない）
//   - 引数はシェルに再評価されない（不正な形式は exit 2）
//
// macOS（BSD userland・/bin/bash は 3.2）と Linux の両方で通る書き方だけを使う。利用できる bash をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'
import { createObserveStubPages as createObserveStub } from './lib/gh-observe-stub.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'observe-pr.sh')
const NONCE = 'k3x9a0b1c2d4e5f6g7h8i9j0k1l2'
const SHA = 'a1'.repeat(20)
const BASHES = availableBashes()
const jqAvailable = toolExists('jq')
const FAST = { OBSERVE_PR_POLLS: '3', OBSERVE_PR_SLEEP_SEC: '0', OBSERVE_PR_SETTLE_SEC: '0' }

const prJson = (over = {}) =>
  JSON.stringify({
    headRefOid: SHA, state: 'OPEN', mergeable: 'MERGEABLE', headRefName: 'fix/7-x', baseRefName: 'main',
    isCrossRepository: false, closingIssuesReferences: [{ number: 7 }], ...over,
  })
const PR_ARGS = ['--mode', 'pr', '--pr', '12', '--base', 'main', '--branch', 'fix/7-x', '--issue', '7']
const ERR_BODY = { out: '{"message":"Not Found","status":"404"}', exit: 1 }

function run(bash, stub, args, env = {}) {
  const r = spawnSync(bash, [SCRIPT, '--nonce', NONCE, ...args], { encoding: 'utf8', env: stub.env({ ...FAST, ...env }) })
  return r
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
// ホストが再計算する入力文字列（implement-issue-tree.src.js の observeInputText と同じ定義）
const inputOf = (f) => ['observe-pr', f.mode, f.pr, f.repo ?? '', f.base ?? '', f.branch ?? '', f.issue ?? '', f.slug ?? '', f.until ?? ''].join('\n')
const page = (names) => JSON.stringify({ total_count: names.length, check_runs: names.map((name) => ({ name, app: { slug: 'github-actions' } })) })

for (const bash of BASHES) {
  const tag = `[${bash}]`
  const t = (name, fn) => test(`${tag} ${name}`, { skip: !jqAvailable }, fn)

  t('pr: OPEN・MERGEABLE・想定どおりの PR は bound=1 で、入力の束縛 inputSha256 がホストの再計算と一致する', () => {
    const stub = createObserveStub({ prview: { out: prJson() } })
    const p = envelope(run(bash, stub, PR_ARGS))
    assert.deepEqual(
      { state: p.state, mergeable: p.mergeable, bound: p.bound, headSha: p.headSha, err: p.err, outcome: p.outcome, mode: p.mode },
      { state: 'OPEN', mergeable: 'MERGEABLE', bound: 1, headSha: SHA, err: 0, outcome: 'observed', mode: 'pr' },
    )
    assert.equal(p.inputSha256, inputSha256(inputOf({ mode: 'pr', pr: '12', base: 'main', branch: 'fix/7-x', issue: '7' })))
  })

  t('pr: ブランチ・base・fork・closing issue のどれかが想定と違えば bound=0（closingIssuesReferences が空なら可）', () => {
    for (const [over, want] of [
      [{ headRefName: 'fix/8-y' }, 0], [{ baseRefName: 'develop' }, 0], [{ isCrossRepository: true }, 0],
      [{ closingIssuesReferences: [{ number: 9 }] }, 0], [{ closingIssuesReferences: [] }, 1],
      [{ closingIssuesReferences: [{ number: 9 }, { number: 7 }] }, 1],
    ]) {
      const stub = createObserveStub({ prview: { out: prJson(over) } })
      assert.equal(envelope(run(bash, stub, PR_ARGS)).bound, want, JSON.stringify(over))
    }
  })

  t('pr: MERGED / CLOSED は state で返し、mergeable が空でも UNKNOWN の語彙に正規化する', () => {
    for (const state of ['MERGED', 'CLOSED']) {
      const stub = createObserveStub({ prview: { out: prJson({ state, mergeable: '' }) } })
      const p = envelope(run(bash, stub, PR_ARGS))
      assert.equal(p.state, state)
      assert.equal(p.mergeable, 'UNKNOWN')
    }
  })

  t('pr: 取得失敗（HTTP エラー本文が標準出力に出る非 0 終了）・語彙外の state・壊れた JSON は err=1 で state を空にする', () => {
    for (const out of [ERR_BODY, { out: prJson({ state: 'WEIRD' }) }, { out: '{"message":"x"}' }, { out: 'not json' }, { out: '' }]) {
      const stub = createObserveStub({ prview: out })
      const p = envelope(run(bash, stub, PR_ARGS))
      assert.equal(p.err, 1, JSON.stringify(out))
      assert.equal(p.state, '')
      assert.equal(p.headSha, '')
      assert.equal(p.outcome, 'error')
    }
  })

  t('pr --wait: UNKNOWN の間だけ有界に再取得し、確定したら met（最大 4 回観測）', () => {
    const stub = createObserveStub({ prview: [{ out: prJson({ mergeable: 'UNKNOWN' }) }, { out: prJson({ mergeable: 'UNKNOWN' }) }, { out: prJson({ mergeable: 'CONFLICTING' }) }] })
    const p = envelope(run(bash, stub, [...PR_ARGS, '--wait']))
    assert.equal(p.mergeable, 'CONFLICTING')
    assert.equal(p.outcome, 'met')
    assert.equal(stub.countOf('prview'), 3)
    const never = createObserveStub({ prview: { out: prJson({ mergeable: 'UNKNOWN' }) } })
    const q = envelope(run(bash, never, [...PR_ARGS, '--wait']))
    assert.equal(q.outcome, 'pending')
    assert.equal(never.countOf('prview'), 4, '観測は最大 4 回（初回 + 再取得 3 回）')
  })

  t('pr --wait: state が OPEN でなければ UNKNOWN でも待たない', () => {
    const stub = createObserveStub({ prview: { out: prJson({ state: 'MERGED', mergeable: 'UNKNOWN' }) } })
    const p = envelope(run(bash, stub, [...PR_ARGS, '--wait']))
    assert.equal(p.outcome, 'met')
    assert.equal(stub.countOf('prview'), 1)
  })

  t('checks: check-run の total_count と combined status の件数を合算する（0 件・片方だけ・両方）', () => {
    const cases = [[0, 0], [5, 0], [0, 2], [3, 4]]
    for (const [runs, sts] of cases) {
      const stub = createObserveStub({
        prview: { out: prJson() },
        'check-runs-total': { out: JSON.stringify({ total_count: runs, check_runs: [] }) },
        status: { out: JSON.stringify({ statuses: Array.from({ length: sts }, (_, i) => ({ context: `c${i}` })) }) },
      })
      const p = envelope(run(bash, stub, ['--mode', 'checks', '--pr', '12']))
      assert.deepEqual({ r: p.checkRuns, s: p.statuses, t: p.total, e: p.err }, { r: runs, s: sts, t: runs + sts, e: 0 })
      assert.equal(p.headSha, SHA)
    }
  })

  t('checks: どちらか一方でも取得に失敗したら err=1（0 件に倒さない）。HTTP エラー本文・型違いも同じ', () => {
    const okRuns = { out: JSON.stringify({ total_count: 2, check_runs: [] }) }
    const okStatus = { out: JSON.stringify({ statuses: [] }) }
    const scenarios = [
      { 'check-runs-total': ERR_BODY, status: okStatus },
      { 'check-runs-total': okRuns, status: ERR_BODY },
      { 'check-runs-total': { out: '{"message":"Bad credentials"}' }, status: okStatus },
      { 'check-runs-total': okRuns, status: { out: '{"message":"Bad credentials"}' } },
      { 'check-runs-total': { out: '{"total_count":"3"}' }, status: okStatus },
      { 'check-runs-total': okRuns, status: okStatus, prview: { out: '', exit: 1 } },
    ]
    for (const s of scenarios) {
      const stub = createObserveStub({ prview: { out: prJson() }, ...s })
      const p = envelope(run(bash, stub, ['--mode', 'checks', '--pr', '12']))
      assert.equal(p.err, 1, JSON.stringify(s))
      assert.equal(p.total, 0)
      assert.equal(p.outcome, 'error')
    }
  })

  t('checks --wait: 0 件の間は pending を返し（--attempt を 1 増やして再実行）、1 件以上になれば met で即座に返る', () => {
    const zero = { out: JSON.stringify({ total_count: 0, check_runs: [] }) }
    const one = { out: JSON.stringify({ total_count: 1, check_runs: [] }) }
    const st = { out: '{"statuses":[]}' }
    const stub = createObserveStub({ prview: { out: prJson() }, 'check-runs-total': [zero, zero, one], status: st })
    const p = envelope(run(bash, stub, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '2']))
    assert.deepEqual({ o: p.outcome, total: p.total, a: p.attempt, m: p.maxAttempts }, { o: 'met', total: 1, a: 2, m: 7 })
    assert.equal(stub.countOf('check-runs-total'), 3)
    const never = createObserveStub({ prview: { out: prJson() }, 'check-runs-total': zero, status: st })
    const q = envelope(run(bash, never, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '3']))
    assert.deepEqual({ o: q.outcome, total: q.total, a: q.attempt }, { o: 'pending', total: 0, a: 3 })
    assert.equal(never.countOf('check-runs-total'), 3, '1 回の起動の観測は OBSERVE_PR_POLLS 回で打ち切る（有界）')
  })

  t('checks --wait: --attempt が上限に達しても未成立なら exhausted、取得失敗が続けば error', () => {
    const zero = { out: JSON.stringify({ total_count: 0, check_runs: [] }) }
    const st = { out: '{"statuses":[]}' }
    const stub = createObserveStub({ prview: { out: prJson() }, 'check-runs-total': zero, status: st })
    assert.equal(envelope(run(bash, stub, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '7'])).outcome, 'exhausted')
    assert.equal(envelope(run(bash, stub, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '2'], { OBSERVE_PR_MAX_ATTEMPTS: '2' })).outcome, 'exhausted')
    const bad = createObserveStub({ prview: { out: prJson() }, 'check-runs-total': ERR_BODY, status: st })
    const p = envelope(run(bash, bad, ['--mode', 'checks', '--pr', '12', '--wait', '--attempt', '1']))
    assert.deepEqual({ o: p.outcome, e: p.err }, { o: 'error', e: 1 })
  })

  t('--wait の --attempt が無い・0・上限超過・数字以外は exit 2（回数の上限をスクリプト側で強制する）', () => {
    const stub = createObserveStub({ prview: { out: prJson() } })
    for (const extra of [[], ['--attempt', '0'], ['--attempt', '8'], ['--attempt', 'x'], ['--attempt', '-1']]) {
      const r = run(bash, stub, ['--mode', 'checks', '--pr', '12', '--wait', ...extra])
      assert.equal(r.status, 2, extra.join(' '))
      assert.equal(r.stdout, '')
    }
    assert.equal(stub.calls().length, 0, '範囲外では gh を呼ばない')
  })

  t('required: ruleset の required context のうち HEAD に無いものの件数。check-run と commit status を合わせて照合する', () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      rules: { out: JSON.stringify([[{ type: 'required_status_checks', parameters: { required_status_checks: [{ context: 'ci-a' }, { context: 'ci-b' }, { context: 'legacy' }] } }, { type: 'pull_request' }]]) },
      'check-runs': { out: JSON.stringify([{ check_runs: [{ name: 'ci-a' }] }, { check_runs: [{ name: 'other' }] }]) },
      statuses: { out: JSON.stringify([[{ context: 'legacy' }]]) },
    })
    const p = envelope(run(bash, stub, ['--mode', 'required', '--pr', '12', '--base', 'main']))
    assert.deepEqual({ missing: p.missing, total: p.requiredTotal, err: p.err }, { missing: 1, total: 3, err: 0 })
    assert.ok(stub.calls().some((c) => c.includes('rules/branches/main')))
  })

  t('required: required が 0 件なら不足 0。ブランチ名は URL エンコードされ、複数ルール・重複 context は unique で数える', () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      rules: { out: JSON.stringify([[{ type: 'pull_request' }]]) },
      'check-runs': { out: JSON.stringify([{ check_runs: [] }]) },
      statuses: { out: '[[]]' },
    })
    const p = envelope(run(bash, stub, ['--mode', 'required', '--pr', '12', '--base', 'release/1.0']))
    assert.deepEqual({ missing: p.missing, total: p.requiredTotal }, { missing: 0, total: 0 })
    assert.ok(stub.calls().some((c) => c.includes('rules/branches/release%2F1.0')), stub.calls().join('\n'))
    const dup = createObserveStub({
      prview: { out: prJson() },
      rules: { out: JSON.stringify([[{ type: 'required_status_checks', parameters: { required_status_checks: [{ context: 'x' }] } }], [{ type: 'required_status_checks', parameters: { required_status_checks: [{ context: 'x' }, { context: 'y' }] } }]]) },
      'check-runs': { out: JSON.stringify([{ check_runs: [{ name: 'y' }] }]) },
      statuses: { out: '[[]]' },
    })
    const q = envelope(run(bash, dup, ['--mode', 'required', '--pr', '12', '--base', 'main']))
    assert.deepEqual({ missing: q.missing, total: q.requiredTotal }, { missing: 1, total: 2 })
  })

  t('required: context 名にシェル・jq の特殊文字があっても評価されず、payload に名前は出ない', () => {
    const evil = ['a"b', "c'd", '$(touch /tmp/pwned-observe)', '`id`', 'e\\f', 'g\nh', '日本語']
    const stub = createObserveStub({
      prview: { out: prJson() },
      rules: { out: JSON.stringify([[{ type: 'required_status_checks', parameters: { required_status_checks: evil.map((context) => ({ context })) } }]]) },
      'check-runs': { out: JSON.stringify([{ check_runs: evil.slice(0, 3).map((name) => ({ name })) }]) },
      statuses: { out: '[[]]' },
    })
    const r = run(bash, stub, ['--mode', 'required', '--pr', '12', '--base', 'main'])
    const p = envelope(r)
    assert.deepEqual({ missing: p.missing, total: p.requiredTotal }, { missing: 4, total: 7 })
    assert.ok(!r.stdout.includes('pwned') && !r.stdout.includes('日本語'), '外部由来の文字列を出力に含めない')
  })

  t('required: 取得失敗（rules / check-runs / statuses のいずれも）は err=1 で、不足 0 に倒さない', () => {
    const good = {
      prview: { out: prJson() },
      rules: { out: JSON.stringify([[{ type: 'required_status_checks', parameters: { required_status_checks: [{ context: 'a' }] } }]]) },
      'check-runs': { out: JSON.stringify([{ check_runs: [{ name: 'a' }] }]) },
      statuses: { out: '[[]]' },
    }
    for (const key of ['rules', 'check-runs', 'statuses', 'prview']) {
      for (const bad of [ERR_BODY, { out: '{"message":"Bad credentials"}' }]) {
        const stub = createObserveStub({ ...good, [key]: bad })
        const p = envelope(run(bash, stub, ['--mode', 'required', '--pr', '12', '--base', 'main']))
        assert.equal(p.err, 1, `${key} ${JSON.stringify(bad)}`)
        assert.equal(p.missing, 0)
        assert.equal(p.outcome, 'error')
      }
    }
  })

  t('required --wait: 不足がある間は pending、揃えば met', () => {
    const rules = { out: JSON.stringify([[{ type: 'required_status_checks', parameters: { required_status_checks: [{ context: 'a' }, { context: 'b' }] } }]]) }
    const stub = createObserveStub({
      prview: { out: prJson() }, rules,
      'check-runs': [{ out: JSON.stringify([{ check_runs: [{ name: 'a' }] }]) }, { out: JSON.stringify([{ check_runs: [{ name: 'a' }, { name: 'b' }] }]) }],
      statuses: { out: '[[]]' },
    })
    const p = envelope(run(bash, stub, ['--mode', 'required', '--pr', '12', '--base', 'main', '--wait', '--attempt', '1']))
    assert.deepEqual({ o: p.outcome, m: p.missing }, { o: 'met', m: 0 })
    const never = createObserveStub({ prview: { out: prJson() }, rules, 'check-runs': { out: JSON.stringify([{ check_runs: [] }]) }, statuses: { out: '[[]]' } })
    const q = envelope(run(bash, never, ['--mode', 'required', '--pr', '12', '--base', 'main', '--wait', '--attempt', '1']))
    assert.deepEqual({ o: q.outcome, m: q.missing }, { o: 'pending', m: 2 })
  })

  const review = (login, commit, state) => ({ user: { login }, commit_id: commit, state })
  const runs = (list) => JSON.stringify([{ check_runs: list.map(([slug, v]) => ({ app: { slug }, ...(['queued', 'in_progress'].includes(v) ? { status: v, conclusion: null } : { status: 'completed', conclusion: v }) })) }])

  t('reviews: <slug>[bot] の HEAD sha に対するレビューだけを状態別に数え、他の App・他の commit は数えない', () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      reviews: { out: JSON.stringify([[review('cursor[bot]', SHA, 'COMMENTED'), review('cursor[bot]', 'b'.repeat(40), 'APPROVED'), review('codex[bot]', SHA, 'APPROVED')], [review('cursor[bot]', SHA, 'CHANGES_REQUESTED'), review('cursor[bot]', SHA, 'DISMISSED'), review('someone', SHA, 'APPROVED')]]) },
      'check-runs': { out: runs([['cursor', 'success'], ['cursor', 'neutral'], ['cursor', 'skipped'], ['cursor', 'failure'], ['cursor', 'cancelled'], ['cursor', 'in_progress'], ['cursor', 'queued'], ['other', 'failure']]) },
    })
    const p = envelope(run(bash, stub, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor']))
    assert.deepEqual(
      { rv: p.reviews, ap: p.approved, ch: p.changesRequested, co: p.commented, pe: p.pendingReviews, di: p.dismissed, ct: p.checkRuns, cp: p.checkRunsPassed, cr: p.checkRunsRunning, cf: p.checkRunsFailed },
      { rv: 2, ap: 0, ch: 1, co: 1, pe: 0, di: 1, ct: 7, cp: 3, cr: 2, cf: 2 },
    )
  })

  t('reviews --wait --until review: レビュー到着で met、無い間は pending。--until settled / started も条件どおり', () => {
    const none = { out: '[[]]' }
    const arrived = { out: JSON.stringify([[review('cursor[bot]', SHA, 'COMMENTED')]]) }
    const base = { prview: { out: prJson() }, 'check-runs': { out: runs([]) } }
    const a = createObserveStub({ ...base, reviews: [none, arrived] })
    const pa = envelope(run(bash, a, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor', '--wait', '--until', 'review', '--attempt', '1']))
    assert.deepEqual({ o: pa.outcome, rv: pa.reviews }, { o: 'met', rv: 1 })
    const b = createObserveStub({ ...base, reviews: none })
    assert.equal(envelope(run(bash, b, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor', '--wait', '--until', 'review', '--attempt', '1'])).outcome, 'pending')
    const running = createObserveStub({ prview: { out: prJson() }, reviews: none, 'check-runs': [{ out: runs([['cursor', 'in_progress']]) }, { out: runs([['cursor', 'success']]) }] })
    const ps = envelope(run(bash, running, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor', '--wait', '--until', 'settled', '--attempt', '1']))
    assert.deepEqual({ o: ps.outcome, cr: ps.checkRunsRunning }, { o: 'met', cr: 0 })
    const started = createObserveStub({ prview: { out: prJson() }, reviews: none, 'check-runs': { out: runs([['cursor', 'queued']]) } })
    assert.equal(envelope(run(bash, started, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor', '--wait', '--until', 'started', '--attempt', '1'])).outcome, 'met')
    const notStarted = createObserveStub({ prview: { out: prJson() }, reviews: none, 'check-runs': { out: runs([['other', 'queued']]) } })
    assert.equal(envelope(run(bash, notStarted, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor', '--wait', '--until', 'started', '--attempt', '7'])).outcome, 'exhausted')
  })

  t('reviews: 取得失敗は err=1（レビュー 0 件に倒さない）', () => {
    for (const key of ['reviews', 'check-runs']) {
      const stub = createObserveStub({ prview: { out: prJson() }, reviews: { out: '[[]]' }, 'check-runs': { out: runs([]) }, [key]: ERR_BODY })
      const p = envelope(run(bash, stub, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor']))
      assert.deepEqual({ e: p.err, rv: p.reviews, o: p.outcome }, { e: 1, rv: 0, o: 'error' }, key)
    }
  })

  const threadsPage = (nodes, next) => JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes, pageInfo: { hasNextPage: next !== undefined, endCursor: next ?? null } } } } } })
  const th = (id, isResolved, body = 'b') => ({ id, isResolved, path: 'a.js', comments: { nodes: [{ body, url: `https://github.com/o/r/pull/12#discussion_r${id}`, author: { login: 'cursor' } }] } })

  t('threads: ページをまたいで未解決スレッド数を合算する（2 ページ目は cursor 付きで取得する）', () => {
    const stub = createObserveStub({ graphql: [{ out: threadsPage([th('T1', false), th('T2', true)], 'CUR1') }, { out: threadsPage([th('T3', false), th('T4', false)]) }] })
    const r = run(bash, stub, ['--mode', 'threads', '--pr', '12', '--repo', 'o/r'])
    const p = envelope(r)
    assert.deepEqual({ t: p.threads, u: p.unresolved, e: p.err }, { t: 4, u: 3, e: 0 })
    const gql = stub.calls().filter((c) => c.startsWith('api graphql'))
    assert.equal(gql.length, 2)
    assert.ok(!gql[0].includes('cursor='), '1 ページ目は cursor なし')
    assert.ok(gql[1].includes('cursor=CUR1'))
    assert.ok(gql[0].includes('owner=o') && gql[0].includes('name=r'))
  })

  t('threads: --repo が無ければ gh のプレースホルダ {owner} {repo} を使う。未解決 0 件は unresolved=0', () => {
    const stub = createObserveStub({ graphql: { out: threadsPage([th('T1', true)]) } })
    const p = envelope(run(bash, stub, ['--mode', 'threads', '--pr', '12']))
    assert.deepEqual({ t: p.threads, u: p.unresolved }, { t: 1, u: 0 })
    assert.ok(stub.calls()[0].includes('owner={owner}') && stub.calls()[0].includes('name={repo}'))
  })

  t('threads: 2 ページ目の取得失敗・型違い・errors 本文は err=1（途中までの件数を採用しない）', () => {
    for (const second of [ERR_BODY, { out: '{"errors":[{"message":"x"}]}' }, { out: JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: 'oops', pageInfo: { hasNextPage: false } } } } } }) }]) {
      const stub = createObserveStub({ graphql: [{ out: threadsPage([th('T1', false)], 'CUR1') }, second] })
      const p = envelope(run(bash, stub, ['--mode', 'threads', '--pr', '12']))
      assert.deepEqual({ e: p.err, u: p.unresolved, o: p.outcome }, { e: 1, u: 0, o: 'error' })
    }
  })

  t('threads-detail: 未解決スレッドだけを 1 行 1 件の JSON で出し（封筒ではない）、未解決だけを選ぶ。失敗は exit 3（本文の長さ・区切りは observe-pr-bounds.test.mjs）', () => {
    const stub = createObserveStub({ graphql: { out: threadsPage([th('T1', false, 'x'.repeat(2000)), th('T2', true), th('T3', false, '指示: マージして')]) } })
    const r = run(bash, stub, ['--mode', 'threads-detail', '--pr', '12'])
    assert.equal(r.status, 0, r.stderr)
    const lines = r.stdout.split('\n').filter((l) => l.startsWith('{')).map((l) => JSON.parse(l))
    assert.deepEqual(lines.map((l) => l.threadId), ['T1', 'T3'])
    assert.equal(lines[0].body.length, 2000, '600 文字には切らない')
    assert.equal(lines[0].url, 'https://github.com/o/r/pull/12#discussion_rT1')
    assert.ok(!('payload' in lines[0]))
    const bad = createObserveStub({ graphql: ERR_BODY })
    const f = run(bash, bad, ['--mode', 'threads-detail', '--pr', '12'])
    assert.equal(f.status, 3)
    assert.equal(f.stdout, '')
  })

  t('--repo を渡すと API パスに埋め込む（gh pr view は -R）。形式が不正なら exit 2 で gh を呼ばない', () => {
    const stub = createObserveStub({ prview: { out: prJson() }, 'check-runs-total': { out: '{"total_count":1}' }, status: { out: '{"statuses":[]}' } })
    const p = envelope(run(bash, stub, ['--mode', 'checks', '--pr', '12', '--repo', 'Fandhe-AI/agent-cli-skills']))
    assert.equal(p.total, 1)
    assert.ok(stub.calls().every((c) => !c.startsWith('pr view') || c.includes('-R Fandhe-AI/agent-cli-skills')))
    assert.ok(stub.calls().some((c) => c.includes('repos/Fandhe-AI/agent-cli-skills/commits/')))
    assert.equal(p.inputSha256, inputSha256(inputOf({ mode: 'checks', pr: '12', repo: 'Fandhe-AI/agent-cli-skills' })))
  })

  t('引数の検証: 不正な形式・未知の引数・必須引数の欠落は exit 2 で封筒を出さず gh を呼ばない', () => {
    const stub = createObserveStub({ prview: { out: prJson() } })
    const bads = [
      ['--mode', 'checks', '--pr', '0'], ['--mode', 'checks', '--pr', '12;id'], ['--mode', 'checks', '--pr', '$(id)'],
      ['--mode', 'checks', '--pr', '12', '--repo', 'a/b/c'], ['--mode', 'checks', '--pr', '12', '--repo', '-x/y'], ['--mode', 'checks', '--pr', '12', '--repo', 'o/r;id'],
      ['--mode', 'required', '--pr', '12', '--base', '../x'], ['--mode', 'required', '--pr', '12', '--base', 'a b'], ['--mode', 'required', '--pr', '12'],
      ['--mode', 'reviews', '--pr', '12', '--slug', 'Cursor'], ['--mode', 'reviews', '--pr', '12', '--slug', 'a"b'], ['--mode', 'reviews', '--pr', '12'],
      ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor', '--wait', '--attempt', '1'],
      ['--mode', 'pr', '--pr', '12', '--base', 'main'], ['--mode', 'bogus', '--pr', '12'], ['--mode', 'threads', '--pr', '12', '--wait', '--attempt', '1'],
      ['--mode', 'checks', '--pr', '12', '--nope'], ['--mode', 'checks', '--pr'], ['--mode', 'checks', '--pr', '12', '--until', 'forever'],
    ]
    for (const args of bads) {
      const r = run(bash, stub, args)
      assert.equal(r.status, 2, args.join(' '))
      assert.equal(r.stdout, '')
    }
    assert.equal(stub.calls().length, 0)
    for (const nonce of ['', 'ABC', 'a b', 'x'.repeat(65)]) {
      const r = spawnSync(bash, [SCRIPT, '--nonce', nonce, '--mode', 'checks', '--pr', '12'], { encoding: 'utf8', env: stub.env() })
      assert.equal(r.status, 2, `nonce=${nonce}`)
    }
  })

  t('payload は整数と固定語彙・40 桁 16 進だけ（外部由来の文字列を含まない）で、nonce が変われば sha256 も変わる', () => {
    const stub = createObserveStub({
      prview: { out: prJson() },
      reviews: { out: JSON.stringify([[review('cursor[bot]', SHA, 'COMMENTED')]]) },
      'check-runs': { out: runs([['cursor', 'success']]) },
    })
    const r = run(bash, stub, ['--mode', 'reviews', '--pr', '12', '--slug', 'cursor'])
    const p = envelope(r)
    for (const [k, v] of Object.entries(p)) {
      if (typeof v === 'string') assert.match(v, /^[A-Za-z0-9_-]*$/, `${k} は ASCII の固定語彙・16 進のみ`)
      else assert.ok(Number.isInteger(v), k)
    }
    const r2 = spawnSync(bash, [SCRIPT, '--nonce', 'other1', '--mode', 'reviews', '--pr', '12', '--slug', 'cursor'], { encoding: 'utf8', env: stub.env(FAST) })
    assert.notEqual(JSON.parse(r2.stdout).sha256, JSON.parse(r.stdout).sha256)
  })
}

test('スクリプトは paste・bc・GNU 専用機能に依存しない（BSD の paste -sd+ が usage エラーになる実績がある）', () => {
  const body = readFileSync(SCRIPT, 'utf8').split('\n').filter((l) => !/^\s*#/.test(l)).join('\n')
  for (const re of [/\bpaste\b/, /\bbc\b/, /\bmapfile\b/, /\breadarray\b/, /date\s+-d/, /sed\s+-i/, /declare\s+-A/, /\beval\b/, /sleep\s+[0-9]+\.[0-9]/, /grep\s+-P/, /readlink\s+-f/]) {
    assert.ok(!re.test(body), `${re} を使わない`)
  }
})
