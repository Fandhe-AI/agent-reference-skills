// scripts/merge-gate.sh（merge-exec の G0 とマージ直前の再検証）を、偽 gh（tests/lib/gh-observe-stub.mjs）を PATH の先頭に置いて
// 実際に実行する回帰テスト（Issue #603 第 6 弾）。プロンプトに書いていた gh / jq の検証手順が、スクリプトに移っても同じ意味を保ち、
// かつ危険側（bypass・未束縛・取得失敗・ページ不完全・enforcement が active でない・expect-sha の不一致）を合格に倒さないことを固定する。
//
// 検証する契約:
//   - 出力は 1 行の封筒で、payload は整数と固定語彙・40 桁 16 進だけ（ruleset 名・context 名・App 名などの外部由来の文字列を含めない）
//   - 判定の語彙は merge-exec の reason と同じ。段階の順序（view → g0 → checks → threads → mergeable → external）で最初に落ちた段階で止まり、
//     後続の gh は呼ばない
//   - 取得失敗・ページ不完全・出力サイズ超過・時間切れは、合格にも「0 件」にも畳み込まず fail-closed（err=1 の判定語）
//   - すべての gh 呼び出しが対象リポジトリを明示する（-R / repos/<o>/<r>/…）。書き込み・マージ系の呼び出しは無い
//   - 引数はシェルに再評価されない（不正な形式は exit 2 で封筒を出さない）
//
// 判定の表（JSON → 判定語）は merge-gate-unit.test.mjs。ここは gh を差し替えたスクリプト全体の代表。
// macOS（BSD userland・/bin/bash は 3.2）と Linux の両方で通る書き方だけを使う。利用できる bash をすべて回し、独立したケースは同時に走らせる。
import { describe, it, test } from 'node:test'
import assert from 'node:assert/strict'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'
import { createObserveStubPages as createObserveStub } from './lib/gh-observe-stub.mjs'
import { hangSeconds, spawnAsync } from './lib/run-async.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'merge-gate.sh')
const NONCE = 'k3x9a0b1c2d4e5f6g7h8i9j0k1l2'
const HEAD = 'a1'.repeat(20)
const REPO = 'o/r'
const CURSOR_APP = 1234
const CI_APP = 15368
const EXTERNAL = [{ app: 'cursor', contexts: ['Cursor Bugbot'] }]
const SECRET = 'SECRET-CONTEXT-NAME'
const jqAvailable = toolExists('jq')

const J = JSON.stringify
const ok = (x) => ({ out: typeof x === 'string' ? x : J(x) })
const rsc = (...e) => ({ type: 'required_status_checks', ruleset_id: 11, ruleset_source_type: 'Repository', parameters: { required_status_checks: e } })
const prRule = (v = true) => ({ type: 'pull_request', ruleset_id: 11, ruleset_source_type: 'Repository', parameters: { required_review_thread_resolution: v } })
const run = (name, app, conclusion = 'success') => ({ name, app: { id: app, slug: app === CURSOR_APP ? 'cursor' : 'github-actions' }, conclusion })
const threadsPage = (nodes, hasNextPage = false, endCursor = null) => ({ data: { repository: { pullRequest: { reviewThreads: { nodes, pageInfo: { hasNextPage, endCursor } } } } } })

// 全段階を合格する構成（外部チェックは cursor 1 件）。ケースごとに必要な経路だけを書き換える
function happy() {
  return {
    prview: ok({ state: 'OPEN', headRefOid: HEAD, mergeable: 'MERGEABLE', baseRefName: 'main', isDraft: false }),
    rules: ok([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Cursor Bugbot', integration_id: CURSOR_APP }), prRule(true)]]),
    'rulesets-11': ok({ enforcement: 'active', bypass_actors: [] }),
    'apps-cursor': ok({ id: CURSOR_APP }),
    'check-runs': ok([{ check_runs: [run('ci', CI_APP), run('Cursor Bugbot', CURSOR_APP)] }]),
    statuses: ok([[]]),
    prchecks: ok([{ state: 'SUCCESS' }, { state: 'NEUTRAL' }]),
    graphql: ok(threadsPage([{ isResolved: true }])),
    reviews: ok([[{ user: { login: 'cursor[bot]' }, commit_id: HEAD, state: 'COMMENTED' }]]),
  }
}

const inputOf = (f) => ['merge-gate', f.pr ?? '5', f.repo ?? REPO, f.base ?? 'main', f.expect ?? '', f.external ?? ''].join('\n')
const externalArg = J(EXTERNAL)

async function execute(bash, routes, { args, env = {}, external = true } = {}) {
  const stub = createObserveStub(routes)
  const argv = args ?? ['--pr', '5', '--base', 'main', '--repo', REPO, ...(external ? ['--external', externalArg] : [])]
  const r = await spawnAsync(bash, [SCRIPT, '--nonce', NONCE, ...argv], { env: stub.env(env) })
  return { r, stub }
}
function payloadOf(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は 1 行（末尾の改行 1 つ）')
  const e = JSON.parse(r.stdout)
  assert.deepEqual(Object.keys(e).sort(), ['nonce', 'payload', 'sha256'])
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload), 'sha256 は nonce + 改行 + payload の正規形')
  return e.payload
}
const verdictOf = (p) => `${p.verdict}/${p.stage}/${p.detail}/${p.err}`

for (const bash of availableBashes()) {
  // スクリプト全体の実行は 1 ケース 0.3〜0.6 秒かかるため、独立したケースは同時に走らせる（検査の中身は変えない）
  describe(`[${bash}]`, { concurrency: 8 }, () => {
  const t = (name, fn) => it(name, { skip: !jqAvailable }, fn)

  t('全段階を合格する構成: verdict ok・stage done・HEAD sha を返し、入力の束縛 inputSha256 がホストの再計算と一致する', async () => {
    const { r } = await execute(bash, happy())
    const p = payloadOf(r)
    assert.equal(verdictOf(p), 'ok/done/ok/0')
    assert.equal(p.mode, 'merge-gate')
    assert.equal(p.headSha, HEAD)
    assert.equal(p.inputSha256, inputSha256(inputOf({ external: externalArg })))
    assert.deepEqual([p.checks, p.notGreen, p.unresolved, p.clientOnly, p.unbound, p.unissued, p.requiredTotal], [2, 0, 0, 0, 0, 0, 2])
  })

  t('外部チェックなしの構成（--external なし）も ok で、inputSha256 は external が空の入力になる', async () => {
    const { r, stub } = await execute(bash, happy(), { external: false })
    const p = payloadOf(r)
    assert.equal(verdictOf(p), 'ok/done/ok/0')
    assert.equal(p.inputSha256, inputSha256(inputOf({})))
    assert.equal(stub.countOf('apps-cursor'), 0)
    assert.equal(stub.countOf('reviews'), 0)
  })

  t('gh の呼び出しはすべて対象リポジトリを明示し（-R / repos/<o>/<r>/…）、書き込み・マージ系を含まない。--repo なしは {owner}/{repo} を使う', async () => {
    const { r, stub } = await execute(bash, happy())
    payloadOf(r)
    const calls = stub.calls()
    assert.ok(calls.length >= 9, calls.join('\n'))
    for (const c of calls) {
      assert.ok(/ -R o\/r |repos\/o\/r\/|^api apps\/cursor $|-F owner=o -F name=r /.test(`${c} `), `リポジトリを明示していない gh 呼び出し: ${c}`)
      assert.ok(!/(^| )(-X|--method|--input|merge|close|approve|--field|--raw-field)( |$)/.test(c), `書き込み・マージ系の呼び出し: ${c}`)
    }
    const noRepo = await execute(bash, happy(), { args: ['--pr', '5', '--base', 'main'], external: false })
    assert.equal(verdictOf(payloadOf(noRepo.r)), 'ok/done/ok/0')
    for (const c of noRepo.stub.calls()) assert.ok(/repos\/\{owner\}\/\{repo\}\/|^pr (view|checks) 5 |-F owner=\{owner\} -F name=\{repo\} /.test(c), c)
  })

  t('payload に ruleset 名・context 名・App 名などの外部由来の文字列は入らない（値は整数と固定語彙・40 桁 16 進だけ）', async () => {
    const routes = happy()
    routes.rules = ok([[rsc({ context: SECRET, integration_id: CI_APP }, { context: 'Cursor Bugbot', integration_id: CURSOR_APP }), prRule(true)]])
    routes['check-runs'] = ok([{ check_runs: [run(SECRET, CI_APP), run('Cursor Bugbot', CURSOR_APP), run('client-only-' + SECRET, 9)] }])
    const { r } = await execute(bash, routes)
    assert.ok(!r.stdout.includes(SECRET), '外部由来の文字列が標準出力に出ている')
    const p = payloadOf(r)
    assert.equal(verdictOf(p), 'server-enforcement-missing/g0/client-only/0')
    for (const [k, v] of Object.entries(p)) {
      assert.ok(Number.isInteger(v) || /^[a-z0-9-]*$/.test(v) || /^[0-9a-f]{40}$/.test(v) || (k === 'inputSha256' && /^[0-9a-f]{64}$/.test(v)), `${k}: ${v}`)
    }
  })

  // [名前, routes の書き換え, 期待 verdict/stage/detail/err, 呼ばれないはずの経路]
  const cases = [
    ['view: gh pr view の失敗は head-moved（err=1）', (r) => { r.prview = { out: '{"message":"x"}', exit: 1 } }, 'head-moved/view/view-fetch/1'],
    ['view: HEAD sha が 40 桁 16 進でなければ head-moved', (r) => { r.prview = ok({ state: 'OPEN', headRefOid: 'zz', mergeable: 'MERGEABLE', baseRefName: 'main', isDraft: false }) }, 'head-moved/view/view-format/1'],
    ['view: 型が違う応答は head-moved', (r) => { r.prview = ok({ state: 1, headRefOid: HEAD }) }, 'head-moved/view/view-format/1'],
    ['view: CLOSED は pr-closed', (r) => { r.prview = ok({ state: 'CLOSED', headRefOid: HEAD, mergeable: 'MERGEABLE', baseRefName: 'main', isDraft: false }) }, 'pr-closed/view/state/0'],
    ['view: MERGED（手順 1 の後に起きた競合）は head-moved', (r) => { r.prview = ok({ state: 'MERGED', headRefOid: HEAD, mergeable: 'UNKNOWN', baseRefName: 'main', isDraft: false }) }, 'head-moved/view/state/0'],
    ['view: base の不一致は wrong-target', (r) => { r.prview = ok({ state: 'OPEN', headRefOid: HEAD, mergeable: 'MERGEABLE', baseRefName: 'develop', isDraft: false }) }, 'wrong-target/view/base/0'],
    ['view: draft は wrong-target', (r) => { r.prview = ok({ state: 'OPEN', headRefOid: HEAD, mergeable: 'MERGEABLE', baseRefName: 'main', isDraft: true }) }, 'wrong-target/view/draft/0'],
    ['view: isDraft が欠落していても draft として止める（fail-closed）', (r) => { r.prview = ok({ state: 'OPEN', headRefOid: HEAD, mergeable: 'MERGEABLE', baseRefName: 'main' }) }, 'wrong-target/view/draft/0'],
    ['g0: rules/branches の取得失敗は classic-unsupported（err=1）', (r) => { r.rules = { out: '{"message":"Not Found"}', exit: 1 } }, 'classic-unsupported/g0/rules-fetch/1'],
    ['g0: ページ途中の失敗（先頭ページは完全な構成でも exit 非 0）は合格にしない', (r) => { r.rules = { out: J([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Cursor Bugbot', integration_id: CURSOR_APP }), prRule(true)]]), exit: 1 } }, 'classic-unsupported/g0/rules-fetch/1'],
    ['g0: 本文が配列でない（HTTP エラー本文が exit 0 で出た）は判定不能', (r) => { r.rules = ok('{"message":"Not Found","status":"404"}') }, 'classic-unsupported/g0/rules-fetch/1'],
    ['g0: required status checks が 0 件（classic のみ）は classic-unsupported', (r) => { r.rules = ok([[prRule(true)]]) }, 'classic-unsupported/g0/no-required-checks/0'],
    ['g0: ルールが 0 件（保護なし）は classic-unsupported', (r) => { r.rules = ok([[]]) }, 'classic-unsupported/g0/no-required-checks/0'],
    ['g0: Organization 継承 ruleset は server-enforcement-missing', (r) => { r.rules = ok([[{ ...rsc({ context: 'ci', integration_id: CI_APP }), ruleset_source_type: 'Organization' }, prRule(true)]]) }, 'server-enforcement-missing/g0/source/0', ['rulesets-11']],
    ['g0: ruleset_id が数値でないルールは server-enforcement-missing', (r) => { r.rules = ok([[{ ...rsc({ context: 'ci', integration_id: CI_APP }), ruleset_id: 'x' }, prRule(true)]]) }, 'server-enforcement-missing/g0/source/0', ['rulesets-11']],
    ['g0: ruleset の取得失敗は server-enforcement-missing（err=1）', (r) => { r['rulesets-11'] = { out: '{"message":"Not Found"}', exit: 1 } }, 'server-enforcement-missing/g0/ruleset-fetch/1'],
    ['g0: bypass_actors が空でない ruleset は server-enforcement-missing', (r) => { r['rulesets-11'] = ok({ enforcement: 'active', bypass_actors: [{ actor_id: 5, actor_type: 'Team', bypass_mode: 'always' }] }) }, 'server-enforcement-missing/g0/bypass/0', ['graphql', 'prchecks']],
    ['g0: bypass_actors が null（取得できていない）は server-enforcement-missing', (r) => { r['rulesets-11'] = ok({ enforcement: 'active', bypass_actors: null }) }, 'server-enforcement-missing/g0/bypass/0'],
    ['g0: enforcement が active でない ruleset（evaluate）は server-enforcement-missing', (r) => { r['rulesets-11'] = ok({ enforcement: 'evaluate', bypass_actors: [] }) }, 'server-enforcement-missing/g0/bypass/0'],
    ['g0: enforcement が disabled の ruleset は server-enforcement-missing', (r) => { r['rulesets-11'] = ok({ enforcement: 'disabled', bypass_actors: [] }) }, 'server-enforcement-missing/g0/bypass/0'],
    ['g0: レビュースレッド解消が強制されていなければ server-enforcement-missing', (r) => { r.rules = ok([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Cursor Bugbot', integration_id: CURSOR_APP }), prRule(false)]]) }, 'server-enforcement-missing/g0/thread-resolution/0', ['graphql']],
    ['g0: 外部チェックの宣言 context が required に無ければ server-enforcement-missing', (r) => { r.rules = ok([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Other', integration_id: CURSOR_APP }), prRule(true)]]) }, 'server-enforcement-missing/g0/external-binding/0'],
    ['g0: 外部チェックの context は一致しても integration_id が別 App なら server-enforcement-missing', (r) => { r.rules = ok([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Cursor Bugbot', integration_id: 999 }), prRule(true)]]) }, 'server-enforcement-missing/g0/external-binding/0'],
    ['g0: App ID が取れなければ server-enforcement-missing（err=1）', (r) => { r['apps-cursor'] = { out: '{"message":"Not Found"}', exit: 1 } }, 'server-enforcement-missing/g0/external-binding/1'],
    ['g0: App ID が数値でなければ server-enforcement-missing（err=1）', (r) => { r['apps-cursor'] = ok({ id: 'abc' }) }, 'server-enforcement-missing/g0/external-binding/1'],
    ['g0: required に無い check-run（client-only）があれば server-enforcement-missing', (r) => { r['check-runs'] = ok([{ check_runs: [run('ci', CI_APP), run('Cursor Bugbot', CURSOR_APP), run('extra', 7)] }]) }, 'server-enforcement-missing/g0/client-only/0', ['prchecks']],
    ['g0: required に無い commit status の context があれば server-enforcement-missing', (r) => { r.statuses = ok([[{ context: 'legacy-ci', state: 'success' }]]) }, 'server-enforcement-missing/g0/client-only/0'],
    ['g0: check-runs の取得失敗は server-enforcement-missing（err=1）', (r) => { r['check-runs'] = { out: J([{ check_runs: [run('ci', CI_APP)] }]), exit: 1 } }, 'server-enforcement-missing/g0/client-only-fetch/1'],
    ['g0: statuses の取得失敗は server-enforcement-missing（err=1）', (r) => { r.statuses = { out: '[]', exit: 1 } }, 'server-enforcement-missing/g0/client-only-fetch/1'],
    ['g0: integration_id が null の required check は issuer-unbound', (r) => { r.rules = ok([[rsc({ context: 'ci', integration_id: null }, { context: 'Cursor Bugbot', integration_id: CURSOR_APP }), prRule(true)]]) }, 'issuer-unbound/g0/unbound/0'],
    ['g0: 同名の commit status では発行元束縛を満たさない（未束縛の required は issuer-unbound）', (r) => { r.rules = ok([[rsc({ context: 'ci', integration_id: null }), prRule(true)]]); r.statuses = ok([[{ context: 'ci', state: 'success' }]]); r['check-runs'] = ok([{ check_runs: [] }]) }, 'issuer-unbound/g0/unbound/0', ['prchecks'], false],
    ['g0: 束縛済み App の check-run が未発行（別 App が同名で発行）は一過性の checks-not-green', (r) => { r['check-runs'] = ok([{ check_runs: [run('ci', 99), run('Cursor Bugbot', CURSOR_APP)] }]) }, 'checks-not-green/g0/unissued/0', ['prchecks']],
    ['checks: 終了コード 8（pending あり）で出力も PENDING なら、解析結果の checks-not-green（一過性 = err 0）', (r) => { r.prchecks = { out: J([{ state: 'SUCCESS' }, { state: 'PENDING' }]), exit: 8 } }, 'checks-not-green/checks/checks-not-green/0'],
    ['checks: 終了コード 8 は出力が全件 green に読めても合格にしない（checks-pending・err 0）', (r) => { r.prchecks = { out: J([{ state: 'SUCCESS' }]), exit: 8 } }, 'checks-not-green/checks/checks-pending/0'],
    ['checks: 終了コード 8 でも出力が解析できなければ取得失敗（err 1）', (r) => { r.prchecks = { out: J({ state: 'SUCCESS' }), exit: 8 } }, 'checks-not-green/checks/checks-fetch/1'],
    ['checks: 終了コード 0 でも state が文字列でない（出力は読めるが解析できない）なら取得失敗（err 1）', (r) => { r.prchecks = ok([{ state: 1 }]) }, 'checks-not-green/checks/checks-fetch/1'],
    ['checks: 終了コード 8 でも state が文字列でないなら取得失敗（err 1）', (r) => { r.prchecks = { out: J([{ state: 1 }]), exit: 8 } }, 'checks-not-green/checks/checks-fetch/1'],
    ['checks: 終了コード 8 で出力なしは取得失敗（err 1）', (r) => { r.prchecks = { out: '', exit: 8 } }, 'checks-not-green/checks/checks-fetch/1'],
    ['checks: 8 以外の非 0 終了（1）は出力が PENDING でも取得失敗（err 1）', (r) => { r.prchecks = { out: J([{ state: 'PENDING' }]), exit: 1 } }, 'checks-not-green/checks/checks-fetch/1'],
    ['checks: 8 以外の非 0 終了（4）は出力が全件 green でも合格にしない（取得失敗 err 1）', (r) => { r.prchecks = { out: J([{ state: 'SUCCESS' }]), exit: 4 } }, 'checks-not-green/checks/checks-fetch/1'],
    ['g0: required status checks のエントリが集計後 0 件なら classic-unsupported（no-required-checks）', (r) => { r.rules = ok([[rsc(), prRule(true)]]) }, 'classic-unsupported/g0/no-required-checks/0', ['check-runs', 'prchecks']],
    ['checks: 成功終了でも PENDING が混じれば checks-not-green', (r) => { r.prchecks = ok([{ state: 'SUCCESS' }, { state: 'PENDING' }]) }, 'checks-not-green/checks/checks-not-green/0'],
    ['checks: FAILURE / CANCELLED は checks-not-green', (r) => { r.prchecks = ok([{ state: 'FAILURE' }, { state: 'CANCELLED' }]) }, 'checks-not-green/checks/checks-not-green/0'],
    ['checks: 総数 0 件は green の証拠にならず checks-not-green', (r) => { r.prchecks = ok([]) }, 'checks-not-green/checks/checks-total-zero/0'],
    ['checks: 形が違う応答は checks-not-green', (r) => { r.prchecks = ok({ state: 'SUCCESS' }) }, 'checks-not-green/checks/checks-fetch/1'],
    ['threads: 未解決が 1 件でもあれば unresolved-threads', (r) => { r.graphql = ok(threadsPage([{ isResolved: true }, { isResolved: false }])) }, 'unresolved-threads/threads/unresolved/0', ['reviews']],
    ['threads: 取得失敗は head-moved（err=1）', (r) => { r.graphql = { out: '{"errors":[{"message":"x"}]}', exit: 1 } }, 'head-moved/threads/threads-fetch/1'],
    ['threads: GraphQL のエラー本文（exit 0）は判定不能 = head-moved（err=1）', (r) => { r.graphql = ok({ errors: [{ message: 'rate limited' }] }) }, 'head-moved/threads/threads-fetch/1'],
    ['threads: hasNextPage が true なのに endCursor が無ければ打ち切らず head-moved（err=1）', (r) => { r.graphql = ok(threadsPage([{ isResolved: true }], true, null)) }, 'head-moved/threads/threads-fetch/1'],
    ['threads: 2 ページ目の未解決も数える', (r) => { r.graphql = [ok(threadsPage([{ isResolved: true }], true, 'c1')), ok(threadsPage([{ isResolved: false }], false, null))] }, 'unresolved-threads/threads/unresolved/0'],
    ['threads: 2 ページ目の取得失敗は合格にしない', (r) => { r.graphql = [ok(threadsPage([{ isResolved: true }], true, 'c1')), { out: '', exit: 1 }] }, 'head-moved/threads/threads-fetch/1'],
    ['mergeable: CONFLICTING は not-mergeable', (r) => { r.prview = ok({ state: 'OPEN', headRefOid: HEAD, mergeable: 'CONFLICTING', baseRefName: 'main', isDraft: false }) }, 'not-mergeable/mergeable/conflicting/0', ['reviews']],
    ['order: 未解決スレッドと CONFLICTING が両方あれば unresolved-threads が先', (r) => { r.prview = ok({ state: 'OPEN', headRefOid: HEAD, mergeable: 'CONFLICTING', baseRefName: 'main', isDraft: false }); r.graphql = ok(threadsPage([{ isResolved: false }])) }, 'unresolved-threads/threads/unresolved/0'],
    ['external: cursor のレビューが 0 件なら external-review-missing', (r) => { r.reviews = ok([[]]) }, 'external-review-missing/external/external-review/0'],
    ['external: cursor の別 HEAD へのレビューは数えない', (r) => { r.reviews = ok([[{ user: { login: 'cursor[bot]' }, commit_id: 'b'.repeat(40), state: 'COMMENTED' }]]) }, 'external-review-missing/external/external-review/0'],
    ['external: cursor に CHANGES_REQUESTED があれば external-review-missing', (r) => { r.reviews = ok([[{ user: { login: 'cursor[bot]' }, commit_id: HEAD, state: 'COMMENTED' }, { user: { login: 'cursor[bot]' }, commit_id: HEAD, state: 'CHANGES_REQUESTED' }]]) }, 'external-review-missing/external/external-review/0'],
    ['external: レビューの取得失敗は external-review-missing（err=1）', (r) => { r.reviews = { out: '[]', exit: 1 } }, 'external-review-missing/external/external-fetch/1'],
  ]
  for (const [name, mutate, expected, notCalled = [], withExternal = true] of cases) {
    t(name, async () => {
      const routes = happy()
      mutate(routes)
      const { r, stub } = await execute(bash, routes, { external: withExternal })
      const p = payloadOf(r)
      assert.equal(verdictOf(p), expected)
      assert.notEqual(p.verdict, 'ok')
      for (const k of notCalled) assert.equal(stub.countOf(k), 0, `${k} は呼ばれないはず（最初に落ちた段階で止まる）`)
    })
  }

  t('external: cursor 以外の App は check-run が不合格なら APPROVED レビューが併存しても checks-not-green、check-run 0 件なら APPROVED のみで合格', async () => {
    const external = [{ app: 'sonar', contexts: ['Sonar Gate'] }]
    const base = () => {
      const r = happy()
      r.rules = ok([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Sonar Gate', integration_id: 77 }), prRule(true)]])
      r['apps-sonar'] = ok({ id: 77 })
      r['check-runs'] = ok([{ check_runs: [run('ci', CI_APP), { name: 'Sonar Gate', app: { id: 77, slug: 'sonar' }, conclusion: 'failure' }] }])
      r.reviews = ok([[{ user: { login: 'sonar[bot]' }, commit_id: HEAD, state: 'APPROVED' }]])
      return r
    }
    const args = ['--pr', '5', '--base', 'main', '--repo', REPO, '--external', J(external)]
    const failing = await execute(bash, base(), { args })
    assert.equal(verdictOf(payloadOf(failing.r)), 'checks-not-green/external/external-checks/0')
    // check-run が 0 件の App はレビューで判定する（ただし required の束縛は check-run の無い App では満たせないため、このケースは別の経路: 宣言を持たない構成）
    const noRuns = base()
    noRuns['check-runs'] = ok([{ check_runs: [run('ci', CI_APP), { name: 'Sonar Gate', app: { id: 77, slug: 'other' }, conclusion: 'success' }] }])
    const viaReview = await execute(bash, noRuns, { args })
    // slug が sonar の check-run が 0 件 → APPROVED のみ・他の state 0 件なので ok。ただし (v-b) は App ID 77 の発行を要求する（check-run の app.id は 77）
    assert.equal(verdictOf(payloadOf(viaReview.r)), 'ok/done/ok/0')
    noRuns.reviews = ok([[{ user: { login: 'sonar[bot]' }, commit_id: HEAD, state: 'APPROVED' }, { user: { login: 'sonar[bot]' }, commit_id: HEAD, state: 'COMMENTED' }]])
    const mixed = await execute(bash, noRuns, { args })
    assert.equal(verdictOf(payloadOf(mixed.r)), 'external-review-missing/external/external-review/0')
  })

  t('複数 App の宣言: App ごとに apps/<slug> を引き直して照合する（先行 App の ID を後続 App の context に流用しない。下流 Bugbot Medium の回帰）', async () => {
    const external = [{ app: 'cursor', contexts: ['Cursor Bugbot'] }, { app: 'sonar', contexts: ['Sonar Gate'] }]
    const args = ['--pr', '5', '--base', 'main', '--repo', REPO, '--external', J(external)]
    const two = (sonarIntegration) => {
      const r = happy()
      r.rules = ok([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Cursor Bugbot', integration_id: CURSOR_APP }, { context: 'Sonar Gate', integration_id: sonarIntegration }), prRule(true)]])
      r['apps-sonar'] = ok({ id: 77 })
      r['check-runs'] = ok([{ check_runs: [run('ci', CI_APP), run('Cursor Bugbot', CURSOR_APP), { name: 'Sonar Gate', app: { id: sonarIntegration, slug: 'sonar' }, conclusion: 'success' }] }])
      r.reviews = ok([[{ user: { login: 'cursor[bot]' }, commit_id: HEAD, state: 'COMMENTED' }]])
      return r
    }
    const good = await execute(bash, two(77), { args })
    assert.equal(verdictOf(payloadOf(good.r)), 'ok/done/ok/0')
    assert.equal(good.stub.countOf('apps-cursor'), 1)
    assert.equal(good.stub.countOf('apps-sonar'), 1)
    // Sonar Gate の required が先行 App（cursor）の ID に束縛されているだけでは、sonar の組としては不合格
    const mixed = await execute(bash, two(CURSOR_APP), { args })
    assert.equal(verdictOf(payloadOf(mixed.r)), 'server-enforcement-missing/g0/external-binding/0')
  })

  t('--expect-sha: 一致すれば ok、不一致は head-moved（以降の gh を呼ばない）。inputSha256 に期待 sha が入る', async () => {
    const good = await execute(bash, happy(), { args: ['--pr', '5', '--base', 'main', '--repo', REPO, '--expect-sha', HEAD, '--external', externalArg] })
    const gp = payloadOf(good.r)
    assert.equal(verdictOf(gp), 'ok/done/ok/0')
    assert.equal(gp.inputSha256, inputSha256(inputOf({ expect: HEAD, external: externalArg })))
    const bad = await execute(bash, happy(), { args: ['--pr', '5', '--base', 'main', '--repo', REPO, '--expect-sha', 'b'.repeat(40), '--external', externalArg] })
    assert.equal(verdictOf(payloadOf(bad.r)), 'head-moved/view/expect-sha/0')
    assert.equal(bad.stub.countOf('rules'), 0)
    assert.equal(payloadOf(bad.r).headSha, HEAD, '観測した HEAD は返す（ホストが申告と突き合わせる）')
  })

  t('出力サイズ上限を超える gh の出力は取得失敗（ページ不完全を合格に倒さない）', async () => {
    const routes = happy()
    const pad = Array.from({ length: 40 }, (_, i) => ({ ...prRule(true), padding: `x${i}`.repeat(10) }))
    routes.rules = ok([[rsc({ context: 'ci', integration_id: CI_APP }, { context: 'Cursor Bugbot', integration_id: CURSOR_APP }), ...pad]])
    const { r } = await execute(bash, routes, { env: { MERGE_GATE_MAX_OUT_BYTES: '1000' } })
    assert.equal(verdictOf(payloadOf(r)), 'classic-unsupported/g0/rules-fetch/1')
  })

  t('出力サイズ上限ちょうどを 1 バイト超える出力は、全体が正しい JSON として読めても取得失敗（上限判定を単独で固定する）', async () => {
    const view = J({ state: 'OPEN', headRefOid: HEAD, mergeable: 'MERGEABLE', baseRefName: 'main', isDraft: false })
    const padTo = (n) => view + ' '.repeat(n - Buffer.byteLength(view))
    const env = { MERGE_GATE_MAX_OUT_BYTES: '1000' }
    // gh は書き終えて正常終了するので SIGPIPE にならず、head -c が max+1 バイトで残すファイルのサイズだけが超過を示す
    const over = happy()
    over.prview = ok(padTo(1001))
    assert.doesNotThrow(() => JSON.parse(over.prview.out), '超過分は空白で、出力全体は正しい JSON')
    assert.equal(Buffer.byteLength(over.prview.out), 1001)
    const o = await execute(bash, over, { env })
    assert.equal(verdictOf(payloadOf(o.r)), 'head-moved/view/view-fetch/1')
    assert.equal(o.stub.countOf('rules'), 0)
    // 対照: ちょうど上限のバイト数なら view は通る（上限判定が > であること）
    const edge = happy()
    edge.prview = ok(padTo(1000))
    const e = await execute(bash, edge, { env })
    assert.notEqual(payloadOf(e.r).detail, 'view-fetch')
  })

  t('引数の誤りは exit 2 で封筒を出さない（nonce・PR・base・repo・expect-sha・external の形式）', async () => {
    const bads = [
      ['--nonce 空', ['--nonce', ''], null],
      ['PR が数字でない', ['--pr', '5;id', '--base', 'main'], null],
      ['base に ..', ['--pr', '5', '--base', 'a..b'], null],
      ['base が - 始まり', ['--pr', '5', '--base', '-x'], null],
      ['repo の形式', ['--pr', '5', '--base', 'main', '--repo', 'o/r;x'], null],
      ['expect-sha の桁数', ['--pr', '5', '--base', 'main', '--expect-sha', 'abc'], null],
      ['expect-sha の大文字', ['--pr', '5', '--base', 'main', '--expect-sha', 'A'.repeat(40)], null],
      ['external が JSON でない', ['--pr', '5', '--base', 'main', '--external', 'cursor'], null],
      ['external の contexts が空', ['--pr', '5', '--base', 'main', '--external', J([{ app: 'cursor', contexts: [] }])], null],
      ['external の slug の形式', ['--pr', '5', '--base', 'main', '--external', J([{ app: 'Cursor;x', contexts: ['a'] }])], null],
      ['未知の引数', ['--pr', '5', '--base', 'main', '--force'], null],
      ['値の欠落', ['--pr'], null],
    ]
    for (const [name, argv] of bads) {
      const stub = createObserveStub(happy())
      const nonceArgs = name === '--nonce 空' ? ['--nonce', '', ...argv.slice(2), '--pr', '5', '--base', 'main'] : ['--nonce', NONCE, ...argv]
      const r = await spawnAsync(bash, [SCRIPT, ...nonceArgs], { env: stub.env() })
      assert.equal(r.status, 2, `${name}: exit ${r.status} / ${r.stderr}`)
      assert.equal(r.stdout, '', `${name}: 封筒を出してはならない`)
      assert.equal(stub.calls().length, 0, `${name}: gh を呼んではならない`)
    }
  })

  t('シェルに再評価されない: context・base・repo に特殊文字を含めても外部コマンドは実行されない', async () => {
    const evil = [{ app: 'cursor', contexts: ["a'; touch /tmp/should-not-exist-merge-gate #", '$(touch /tmp/should-not-exist-merge-gate)'] }]
    const { r } = await execute(bash, happy(), { args: ['--pr', '5', '--base', 'main', '--repo', REPO, '--external', J(evil)] })
    const p = payloadOf(r)
    assert.equal(p.verdict, 'server-enforcement-missing')
    assert.equal(p.detail, 'external-binding')
    const probe = await spawnAsync('sh', ['-c', 'test -e /tmp/should-not-exist-merge-gate && echo EXISTS || echo none'])
    assert.equal(probe.stdout.trim(), 'none')
  })
  })
}

// 時間切れ（遅い・ハングする gh）。実時間は gh の制限（1 秒）だけ待つ。bash ごとに別の sleep 秒数を使い、残存確認で他のケースを数えない
for (const [bi, bash] of availableBashes().entries()) {
  test(`[${bash}] ハングする gh は MERGE_GATE_GH_TIMEOUT_SEC で kill され、取得失敗（err=1）として fail-closed で返る`, { skip: !jqAvailable }, async () => {
    const hang = hangSeconds(0, bi)
    const started = Date.now()
    const { r } = await execute(bash, happy(), { env: { MERGE_GATE_GH_TIMEOUT_SEC: '1', GH_STUB_HANG: hang } })
    const p = payloadOf(r)
    assert.equal(verdictOf(p), 'head-moved/view/view-fetch/1')
    assert.ok(Date.now() - started < 15000, '時間制限で返る')
    const ps = await spawnAsync('sh', ['-c', `ps -axo command | grep "sleep ${hang}" | grep -v grep | wc -l`])
    assert.equal(Number(ps.stdout.trim()), 0, 'gh の孫プロセス（sleep）が残っていない')
  })
}
