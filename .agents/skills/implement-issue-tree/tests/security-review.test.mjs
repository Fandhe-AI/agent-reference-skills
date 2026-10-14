// セキュリティ専用の Review を独立に立てる opt-in 引数 args.securityReview の回帰テスト。
//
// 契約:
//   1. 未指定・false では agent の呼び出しが今と同じ（security-review の agent を呼ばず、Review の opts も不変）。
//   2. 有効なら Review の各ラウンドで、通常の Review とは別にセキュリティ専用の Review を呼ぶ。プロンプトは
//      通常の Review と同じ差分の取り方で、観点だけをセキュリティに絞る。
//   3. 判定は両方を合わせる（combineReviews）: どちらかが blocked なら blocked、どちらかが needs-fix なら
//      通らず、fix には指摘のある側の指摘をすべて渡す。highestSeverity は高い方で、最終ラウンドの Low の
//      扱いは合わせた結果に当てる。
//   4. モデルの既定は通常の Review と同じ（models.review、無ければ sonnet）。models.securityReview で変えられ、
//      無効のまま models.securityReview だけを指定すると起動時に止まる。
//   5. 不正な値は起動時に throw し、agent を 1 回も呼ばない。
//   6. 返却値 securityReview に有効かどうかと使ったモデルが載り、ラウンドごとに両方の結果をログに出す。
//   7. 有効時は 1 issue の呼び出し数の目安と使い捨て worktree の予約に、Review ラウンドぶんを足す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'
import { runScript, BASE_ARGS, importDefinitions } from './lib/stub-run.mjs'

const NAMES = ['parseSecurityReview', 'combineReviews', 'reviewPrompt', 'AGENT_CALLS_PER_ISSUE', 'EPHEMERAL_KIND_MAX', 'EPHEMERAL_RESERVE_PER_NEW_START', 'REVIEW_SCHEMA']
const defaults = await importDefinitions(NAMES, 'security-review-off')
// 定義部は args を参照して定数を決めるため、有効時の値は args を差し替えた別のスライスで読む。
globalThis.args = { parent: 1, securityReview: true }
const enabled = await importDefinitions(NAMES, 'security-review-on')
delete globalThis.args
const { parseSecurityReview, combineReviews, reviewPrompt, REVIEW_SCHEMA } = defaults

// ---------------------------------------------------------------------------
// 単体
// ---------------------------------------------------------------------------

test('parseSecurityReview: 未指定・false は無効、true / { enabled: true } は有効', () => {
  assert.equal(parseSecurityReview(undefined), false)
  assert.equal(parseSecurityReview(null), false)
  assert.equal(parseSecurityReview(false), false)
  assert.equal(parseSecurityReview(true), true)
  assert.equal(parseSecurityReview({ enabled: true }), true)
  assert.equal(parseSecurityReview({ enabled: false }), false)
})

test('parseSecurityReview: 不正な値は throw（誤記を黙って無効へ読み替えない）', () => {
  for (const bad of ['true', 1, 0, [], [true], {}, { enabled: 'true' }, { enabled: 1 }, { enabled: true, model: 'opus' }, { enable: true }]) {
    assert.throws(() => parseSecurityReview(bad), /args\.securityReview は/, JSON.stringify(bad))
  }
})

const ok = (summary = 'ok') => ({ state: 'ok', highestSeverity: 'none', summary, worktreePath: '/w/main' })
const nf = (sev, summary) => ({ state: 'needs-fix', highestSeverity: sev, summary, worktreePath: '/w/x' })
const bl = (summary) => ({ state: 'blocked', highestSeverity: 'none', summary, worktreePath: '/w/x' })

test('combineReviews: 両方 ok なら ok', () => {
  const r = combineReviews(ok('品質 OK'), ok('セキュリティ OK'))
  assert.equal(r.state, 'ok')
  assert.equal(r.highestSeverity, 'none')
  assert.match(r.summary, /品質 OK/)
  assert.match(r.summary, /セキュリティ OK/)
  assert.equal(r.worktreePath, '/w/main')
})

test('combineReviews: 片方だけ needs-fix なら needs-fix で、指摘のある側の指摘を渡す', () => {
  const a = combineReviews(ok('品質 OK'), nf('high', 'SQL インジェクション'))
  assert.equal(a.state, 'needs-fix')
  assert.equal(a.highestSeverity, 'high')
  assert.match(a.summary, /SQL インジェクション/)
  assert.doesNotMatch(a.summary, /品質 OK/, 'ok の側の確認内容は fix へ渡さない')
  const b = combineReviews(nf('low', '命名'), ok())
  assert.equal(b.state, 'needs-fix')
  assert.equal(b.highestSeverity, 'low')
})

test('combineReviews: 両方 needs-fix なら両方の指摘を合わせ、重要度は高い方', () => {
  const r = combineReviews(nf('low', '命名の指摘'), nf('critical', '認可の欠落'))
  assert.equal(r.state, 'needs-fix')
  assert.equal(r.highestSeverity, 'critical')
  assert.match(r.summary, /命名の指摘/)
  assert.match(r.summary, /認可の欠落/)
  assert.equal(combineReviews(nf('medium', 'a'), nf('low', 'b')).highestSeverity, 'medium')
})

test('combineReviews: どちらかが blocked なら blocked（needs-fix より優先）', () => {
  assert.equal(combineReviews(bl('fetch 失敗'), ok()).state, 'blocked')
  const r = combineReviews(nf('high', 'x'), bl('比較基準を解決できない'))
  assert.equal(r.state, 'blocked')
  assert.match(r.summary, /比較基準を解決できない/)
})

test('combineReviews: 無効な結果・矛盾出力は medium 相当（片方の low と合わせて最終ラウンドを通さない）', () => {
  assert.deepEqual([combineReviews(null, ok()).state, combineReviews(null, ok()).highestSeverity], ['needs-fix', 'medium'])
  assert.equal(combineReviews(ok(), undefined).highestSeverity, 'medium')
  assert.match(combineReviews(ok(), null).summary, /異常終了/)
  assert.equal(combineReviews(nf('none', '矛盾'), nf('low', 'b')).highestSeverity, 'medium', 'needs-fix + none は medium 相当')
  assert.equal(combineReviews(nf(undefined, '不明'), ok()).highestSeverity, 'medium')
  assert.equal(combineReviews({ state: 'weird' }, ok()).state, 'needs-fix')
})

test('reviewPrompt: 既定（security: false）の出力は引数なしと同一で、セキュリティ専用の指示を含まない', () => {
  const item = { number: 2, title: 't' }
  const impl = { branch: 'feat/2-x' }
  assert.equal(reviewPrompt(item, impl, false), reviewPrompt(item, impl))
  const p = reviewPrompt(item, impl)
  assert.match(p, /コードレビュー担当エージェント/)
  assert.match(p, /implement-review スキルに従い/)
  assert.doesNotMatch(p, /セキュリティレビュー担当/)
})

test('reviewPrompt: security: true は同じ差分の取り方で、観点をセキュリティに絞る', () => {
  const item = { number: 2, title: 't' }
  const impl = { branch: 'feat/2-x' }
  const base = reviewPrompt(item, impl).split('\n')
  const sec = reviewPrompt(item, impl, true).split('\n')
  assert.match(sec[0], /セキュリティレビュー担当エージェント/)
  assert.doesNotMatch(sec.join('\n'), /implement-review スキル/)
  for (const kw of ['認証・認可', 'インジェクション', '秘密情報・個人情報', 'OWASP Top 10', '専門サブエージェントにセキュリティレビューの手順・観点があれば必ず従う']) {
    assert.ok(sec.some((l) => l.includes(kw)), kw)
  }
  // 比較基準の取得・差分の取り方・判定と返却の手順は通常の Review と同じ行
  for (const shared of base.filter((l) => /git (fetch|checkout --detach|rev-parse --verify)|^返却:|^3\. |^4\. |^5\. /.test(l))) {
    assert.ok(sec.includes(shared), `共通の行が無い: ${shared.slice(0, 60)}`)
  }
  assert.ok(sec.some((l) => l.includes('git diff origin/main...HEAD')))
})

test('予算と予約: 無効なら今と同じ、有効なら Review ラウンドぶんを足す', () => {
  assert.equal(defaults.AGENT_CALLS_PER_ISSUE.implement, 30)
  assert.equal(defaults.EPHEMERAL_KIND_MAX['security-review'], 0)
  assert.equal(defaults.EPHEMERAL_RESERVE_PER_NEW_START, 9)
  assert.equal(enabled.AGENT_CALLS_PER_ISSUE.implement, 32, '見積りの Review 2 回ぶん')
  assert.equal(enabled.EPHEMERAL_KIND_MAX['security-review'], 3, 'Review ラウンド最大 3 回ぶん')
  assert.equal(enabled.EPHEMERAL_RESERVE_PER_NEW_START, 12)
})

// ---------------------------------------------------------------------------
// 結合
// ---------------------------------------------------------------------------

// rounds[i] = [通常の Review の応答, セキュリティ専用の Review の応答]（undefined は stub の既定 = ok）。
function scriptedReviews(rounds) {
  let main = 0
  let sec = 0
  return (label) => {
    if (label.startsWith('review:#')) return rounds[main++]?.[0]
    if (label.startsWith('security-review:#')) return rounds[sec++]?.[1]
    return undefined
  }
}
const labels = (calls, prefix) => calls.filter((c) => c.opts.label.startsWith(prefix))

test('結合: 無効（未指定・false・{ enabled: false }）なら agent の呼び出しは同じで、security-review を呼ばない', async () => {
  const runs = await Promise.all([undefined, false, { enabled: false }].map((v) =>
    runScript({ args: v === undefined ? BASE_ARGS : { ...BASE_ARGS, securityReview: v }, override: scriptedReviews([[nf('medium', 'A')]]) })))
  const sig = (cs) => cs.map((c) => [c.opts.label, c.opts.model, c.prompt])
  assert.deepEqual(sig(runs[1].calls), sig(runs[0].calls))
  assert.deepEqual(sig(runs[2].calls), sig(runs[0].calls))
  const { calls, result } = runs[0]
  assert.equal(labels(calls, 'security-review:#').length, 0)
  const reviews = labels(calls, 'review:#')
  assert.equal(reviews.length, 2)
  assert.deepEqual(reviews[0].opts, { label: 'review:#2', phase: 'Review', model: 'sonnet', effort: 'medium', schema: REVIEW_SCHEMA, isolation: 'worktree' }, 'Review の opts は今と同じ')
  assert.deepEqual(result.securityReview, { enabled: false, model: null })
})

test('結合: 有効なら各ラウンドでセキュリティ専用の Review を呼び、ラウンドごとに両方の結果をログに出す', async () => {
  const { calls, result, logs } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: scriptedReviews([[nf('medium', '品質の指摘'), undefined], [undefined, undefined]]),
  })
  const sec = labels(calls, 'security-review:#')
  assert.equal(labels(calls, 'review:#').length, 2)
  assert.equal(sec.length, 2, 'Review ラウンドごとに 1 回')
  assert.deepEqual(sec.map((c) => [c.opts.phase, c.opts.model, c.opts.isolation, JSON.stringify(c.opts.schema) === JSON.stringify(REVIEW_SCHEMA)]), [['Review', 'sonnet', 'worktree', true], ['Review', 'sonnet', 'worktree', true]])
  assert.match(sec[0].prompt, /セキュリティレビュー担当エージェント/)
  assert.doesNotMatch(sec[0].prompt, /品質の指摘/, '通常の Review の結果を見せない')
  assert.equal(labels(calls, 'pr-create:#').length, 1, '2 ラウンド目で両方 ok なので PR 作成へ進む')
  assert.deepEqual(result.securityReview, { enabled: true, model: 'sonnet' })
  const roundLogs = logs.filter((l) => l.includes('Review ラウンド'))
  assert.equal(roundLogs.length, 2)
  assert.match(roundLogs[0], /通常の Review: needs-fix（medium）/)
  assert.match(roundLogs[0], /セキュリティ専用の Review: ok（none）/)
})

test('結合: 通常の Review より先にセキュリティ専用の Review を起動し終わるのを待たない（並列）', async () => {
  // 通常の Review の応答を返す前に、セキュリティ専用の Review が呼ばれていること。
  const order = []
  const { calls } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: (label) => { if (/^(security-)?review:#/.test(label)) order.push(label.split(':')[0]); return undefined },
  })
  assert.deepEqual(order, ['review', 'security-review'])
  const i = calls.findIndex((c) => c.opts.label === 'review:#2')
  assert.equal(calls[i + 1].opts.label, 'security-review:#2', '間に他の呼び出しを挟まず続けて起動する')
})

test('結合: 片方だけ needs-fix ならそのラウンドは通らず、fix に指摘が渡る', async () => {
  const { calls } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: scriptedReviews([[undefined, nf('high', 'SEC-FINDING-1 認可の欠落')]]),
  })
  const fixes = labels(calls, 'fix:#')
  assert.equal(fixes.length, 1, '通常の Review が ok でもセキュリティの指摘で fix する')
  assert.match(fixes[0].prompt, /SEC-FINDING-1/)
  assert.equal(labels(calls, 'review:#').length, 2, '次のラウンドで再レビューする')
})

test('結合: 両方 needs-fix なら fix に両方の指摘を合わせて渡す', async () => {
  const { calls } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: scriptedReviews([[nf('low', 'MAIN-FINDING-1'), nf('medium', 'SEC-FINDING-2')]]),
  })
  const fixes = labels(calls, 'fix:#')
  assert.equal(fixes.length, 1)
  assert.match(fixes[0].prompt, /MAIN-FINDING-1/)
  assert.match(fixes[0].prompt, /SEC-FINDING-2/)
})

// fixPrompt は summary 全体を 2000 文字で切る。通常の Review の summary が長くても、セキュリティ専用の
// 指摘と見出しが fix のプロンプトから落ちないこと（側ごとに長さを制限し、セキュリティ側を先に並べる）。
for (const mainLen of [500, 1990, 2500]) {
  test(`結合: 通常の Review の summary が ${mainLen} 文字でも、fix のプロンプトにセキュリティ専用の指摘と見出しが残る`, async () => {
    const { calls } = await runScript({
      args: { ...BASE_ARGS, securityReview: true },
      override: scriptedReviews([[nf('low', 'Q'.repeat(mainLen)), nf('critical', 'SECFIND-critical-injection')]]),
    })
    const fixes = labels(calls, 'fix:#')
    assert.equal(fixes.length, 1)
    assert.match(fixes[0].prompt, /【セキュリティ専用の Review】SECFIND-critical-injection/)
    assert.match(fixes[0].prompt, /【品質・セキュリティ（通常の Review）】Q{20}/, '通常側も先頭は残る')
    assert.ok(fixes[0].prompt.indexOf('【セキュリティ専用の Review】') < fixes[0].prompt.indexOf('【品質・セキュリティ（通常の Review）】'), 'セキュリティ側が先')
    if (mainLen > 940) assert.match(fixes[0].prompt, /Q（省略）/, '切り詰めた印')
  })
}

test('結合: 両方の summary が長くても、fix のプロンプトに両方の先頭が残る', async () => {
  const { calls } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: scriptedReviews([[nf('high', `MAINHEAD${'a'.repeat(3000)}`), nf('critical', `SECHEAD${'b'.repeat(3000)}`)]]),
  })
  const p = labels(calls, 'fix:#')[0].prompt
  assert.match(p, /SECHEAD/)
  assert.match(p, /MAINHEAD/)
  assert.match(p, /b（省略）/)
  assert.match(p, /a（省略）/)
})

test('combineReviews: 側ごとの上限は fixPrompt の 2000 文字に収まる（$ のように sanitize で広がる文字でも）', () => {
  for (const ch of ['x', '$', '\\', '\n']) {
    const r = combineReviews(nf('low', ch.repeat(5000)), nf('critical', ch.repeat(5000)))
    const text = r.summary.replace(/\r?\n/g, ' ').replace(/`/g, "'").replace(/\\/g, '/').replace(/\$/g, '\\$')
    assert.ok(text.length <= 2000, `${JSON.stringify(ch)}: sanitize 後 ${text.length} 文字`)
    assert.match(r.summary, /【セキュリティ専用の Review】/)
    assert.match(r.summary, /【品質・セキュリティ（通常の Review）】/)
  }
  // 片方だけ指摘があるなら、その側が全体の枠を使える（上限が緩む）
  const one = combineReviews(ok(), nf('high', 'y'.repeat(1500)))
  assert.doesNotMatch(one.summary, /省略/)
  assert.equal(combineReviews(ok(), nf('high', 'short')).summary, '【セキュリティ専用の Review】short')
})

test('結合: セキュリティ専用の Review が blocked なら fix せず blocked で終わる', async () => {
  const { calls, result } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: scriptedReviews([[undefined, bl('比較基準を解決できない')]]),
  })
  assert.equal(labels(calls, 'fix:#').length, 0)
  assert.equal(labels(calls, 'pr-create:#').length, 0)
  const f = result.failures.find((x) => x.issue === 2)
  assert.equal(f?.status, 'blocked')
  assert.match(f.reason, /比較基準を解決できない/)
})

test('結合: 最終ラウンドの Low の扱いは合わせた結果に当てる（両方 low 以下なら通る・片方が medium なら通らない）', async () => {
  const lowLow = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: scriptedReviews([[nf('medium', 'a')], [nf('medium', 'b')], [nf('low', 'LOW-MAIN'), nf('low', 'LOW-SEC')]]),
  })
  assert.equal(labels(lowLow.calls, 'pr-create:#').length, 1, '両方 low なら最終ラウンドで通る')
  const comment = labels(lowLow.calls, 'low-comment:#')
  assert.equal(comment.length, 1)
  assert.match(comment[0].prompt, /LOW-MAIN/)
  assert.match(comment[0].prompt, /LOW-SEC/)

  const lowMedium = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: scriptedReviews([[nf('medium', 'a')], [nf('medium', 'b')], [nf('low', 'LOW-MAIN'), nf('medium', 'MED-SEC')]]),
  })
  assert.equal(labels(lowMedium.calls, 'pr-create:#').length, 0, '片方が medium なら通らない')
  const f = lowMedium.result.failures.find((x) => x.issue === 2)
  assert.equal(f?.status, 'blocked')
  assert.match(f.lastReviewFinding, /MED-SEC/)
})

test('結合: モデルの既定は models.review に従い、models.securityReview で上書きできる', async () => {
  const followReview = await runScript({ args: { ...BASE_ARGS, securityReview: { enabled: true }, models: { review: 'opus' } } })
  assert.deepEqual(labels(followReview.calls, 'security-review:#').map((c) => c.opts.model), ['opus'])
  assert.deepEqual(followReview.result.securityReview, { enabled: true, model: 'opus' })
  const own = await runScript({ args: { ...BASE_ARGS, securityReview: true, models: { review: 'opus', securityReview: 'fable' } } })
  assert.deepEqual(labels(own.calls, 'security-review:#').map((c) => c.opts.model), ['fable'])
  assert.deepEqual(labels(own.calls, 'review:#').map((c) => c.opts.model), ['opus'])
  assert.deepEqual(own.result.models, { review: 'opus', securityReview: 'fable' })
})

// ---------------------------------------------------------------------------
// 片方の Review が reject したとき（残置 worktree の台帳と例外の経路）
// ---------------------------------------------------------------------------

// 台帳（返却値 ephemeralWorktrees）の review / security-review の記録だけを取り出す。reject した側は
// パスが分からないが、isolation: 'worktree' の agent() は reject の前に worktree を作り得るため、
// base-merge と同じく path: ''（パス不明）の 1 件として計上される（件数を実体より過小にしない）。
const reviewLedger = (result) => result.ephemeralWorktrees
  .filter((e) => e.kind === 'review' || e.kind === 'security-review')
  .map((e) => [e.kind, e.path])

test('例外: セキュリティ専用の Review が reject しても、決着した通常の Review の worktree は台帳に載る', async () => {
  const { calls, result } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: (label) => { if (label.startsWith('security-review:#')) throw new Error('SEC-BOOM') },
  })
  assert.deepEqual(reviewLedger(result), [['review', '/repo/wt/r2'], ['security-review', '']], 'Promise.all だと通常の Review の記録が漏れる')
  assert.deepEqual(result.failures.map((f) => [f.issue, f.reason]), [[2, 'SEC-BOOM']], '単独の Review の reject と同じ failed 経路（runOne の catch-all）')
  assert.equal(labels(calls, 'fix:#').length, 0, '例外を無効な結果へ倒して fix を誘発しない')
  assert.equal(labels(calls, 'pr-create:#').length, 0)
})

test('例外: 通常の Review が reject しても、決着したセキュリティ専用の Review の worktree は台帳に載る', async () => {
  const { calls, result } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: (label) => {
      if (label.startsWith('review:#')) throw new Error('MAIN-BOOM')
      if (label.startsWith('security-review:#')) return { state: 'ok', highestSeverity: 'none', summary: 's', worktreePath: '/repo/wt/s2' }
    },
  })
  assert.deepEqual(reviewLedger(result), [['review', ''], ['security-review', '/repo/wt/s2']], 'Promise.all だとセキュリティ専用の Review の記録が漏れる')
  assert.deepEqual(result.failures.map((f) => [f.issue, f.reason]), [[2, 'MAIN-BOOM']])
  assert.equal(labels(calls, 'fix:#').length, 0)
})

test('例外: 両方 reject したらパス不明の 2 件を計上し、通常の Review の原因を伝える', async () => {
  const { result } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: (label) => {
      if (label.startsWith('security-review:#')) throw new Error('SEC-BOOM')
      if (label.startsWith('review:#')) throw new Error('MAIN-BOOM')
    },
  })
  assert.deepEqual(reviewLedger(result), [['review', ''], ['security-review', '']])
  assert.deepEqual(result.failures.map((f) => f.reason), ['MAIN-BOOM'])
})

test('例外: 両方 reject したらセキュリティ側の理由を長さ制限つきで 1 行ログに残す（片方だけなら出さない）', async () => {
  const both = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: (label) => {
      if (label.startsWith('security-review:#')) throw new Error(`SEC-BOOM\n\`${'z'.repeat(1000)}`)
      if (label.startsWith('review:#')) throw new Error('MAIN-BOOM')
    },
  })
  const secLogs = both.logs.filter((l) => l.includes('セキュリティ専用の Review も異常終了した'))
  assert.equal(secLogs.length, 1)
  assert.match(secLogs[0], /SEC-BOOM '/, '改行・バッククォートは sanitize 済み')
  assert.ok(secLogs[0].length < 400, `長さ制限: ${secLogs[0].length}`)
  assert.match(secLogs[0], /（省略）$/)
  assert.deepEqual(both.result.failures.map((f) => f.reason), ['MAIN-BOOM'])

  for (const only of ['review:#', 'security-review:#']) {
    const r = await runScript({
      args: { ...BASE_ARGS, securityReview: true },
      override: (label) => { if (label.startsWith(only)) throw new Error('ONE-BOOM') },
    })
    assert.equal(r.logs.filter((l) => l.includes('も異常終了した')).length, 0)
  }
})

test('例外: 無効時の通常の Review の reject も同じ failed 経路（有効時はこの経路に揃えている）', async () => {
  const { calls, result } = await runScript({
    args: BASE_ARGS,
    override: (label) => { if (label.startsWith('review:#')) throw new Error('MAIN-BOOM') },
  })
  assert.deepEqual(result.failures.map((f) => [f.issue, f.reason]), [[2, 'MAIN-BOOM']])
  assert.equal(labels(calls, 'fix:#').length, 0)
})

test('例外: reject と null（StructuredOutput 欠落）は別経路 — null は無効な結果として needs-fix 相当で fix へ進む', async () => {
  const { calls } = await runScript({
    args: { ...BASE_ARGS, securityReview: true },
    override: (label) => { if (label.startsWith('security-review:#')) return null },
  })
  assert.ok(labels(calls, 'fix:#').length >= 1, 'null は従来どおり指摘ありとして扱う')
})

// ---------------------------------------------------------------------------
// 起動時の fail-closed（配布物 implement-issue-tree.js で検証）
// ---------------------------------------------------------------------------

const DIST = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.js'), 'utf8')
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
async function startup(args) {
  const calls = []
  const fn = new AsyncFunction('args', 'agent', 'log', 'phase', stripMetaExport(DIST))
  try {
    await fn(args, async (_p, opts) => { calls.push(opts.label); throw new Error('STOP') }, () => {}, () => {})
  } catch (e) {
    return { calls, message: e.message }
  }
  return { calls, message: 'returned' }
}

for (const [name, extra, re] of [
  ['securityReview が文字列', { securityReview: 'true' }, /args\.securityReview は/],
  ['securityReview が未知のキーを持つ', { securityReview: { enabled: true, model: 'opus' } }, /args\.securityReview は/],
  ['無効のまま models.securityReview を指定', { models: { securityReview: 'opus' } }, /args\.models\.securityReview は args\.securityReview を有効に/],
  ['securityReview: false で models.securityReview を指定', { securityReview: false, models: { securityReview: 'opus' } }, /args\.models\.securityReview は/],
]) {
  test(`起動時: ${name}なら agent を呼ぶ前にエラーで止まる`, async () => {
    const r = await startup({ ...BASE_ARGS, ...extra })
    assert.match(r.message, re)
    assert.deepEqual(r.calls, [])
  })
}

test('起動時: 有効な指定なら最初の agent 呼び出しまで進み、agentCallLimit の下限は目安の増分だけ上がる', async () => {
  const r = await startup({ ...BASE_ARGS, securityReview: true, models: { securityReview: 'opus' } })
  assert.equal(r.message, 'STOP')
  const low = await startup({ ...BASE_ARGS, securityReview: true, agentCallLimit: 81 })
  assert.match(low.message, /83〜1000/, '有効時は 1 issue の目安が 2 増えるため下限も 2 上がる')
  assert.equal((await startup({ ...BASE_ARGS, agentCallLimit: 81 })).message, 'STOP', '無効時の下限 81 は不変')
})
