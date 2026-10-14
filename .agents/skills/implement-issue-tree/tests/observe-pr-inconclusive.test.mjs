// 壁時計 kill 由来の「未確定」と本当の取得失敗の区別、およびホストがそれを「チェック 0 件」と採用しないことの回帰テスト
// （PR #612 の独立レビュー・codex P1・Bugbot の同一指摘）。
//
//   - 壁時計で kill した観測の封筒は headSha が空で件数は 0（古い件数・headSha を載せない）。ホストは headSha が 40 桁 16 進でない
//     封筒を採用しない（採用すると timeout かつ checksTotal 0 が conflicting へ再判定され、不要な base 取り込みになる）
//   - 実測 0 件の封筒（headSha あり）は従来どおり採用する
//   - その起動の中で取得失敗があり、一度も取得に成功しないまま終わるなら、pending / exhausted ではなく error（err:1）
//   - 非 0 終了の gh は、本文が有効な JSON でも取得失敗（pipefail）。出力サイズの検査は上限ちょうどの境界を固定する
//
// 速度: 壁時計 kill を実際に待つケース（1 本 7 秒前後）は、縮尺（SCALED）を変えずに非同期で走らせ、describe の concurrency で
// 同時に待つ（旧: spawnSync で順に待ち、ファイル全体で約 90 秒。今: 最長の 1 本分）。
import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { spawnAsync } from './lib/run-async.mjs'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { availableBashes, toolExists } from './lib/signed-output.mjs'
import { createObserveStub } from './lib/gh-observe-stub.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const SCRIPT = join(HERE, '..', 'scripts', 'observe-pr.sh')
const SRC = join(HERE, '..', 'scripts', 'implement-issue-tree.src.js')
const NONCE = 'k3x9a0b1c2d4e5f6g7h8i9j0k1l2'
const SHA = 'a1'.repeat(20)
const BASHES = availableBashes()
const jqAvailable = toolExists('jq')
const prJson = JSON.stringify({ headRefOid: SHA, state: 'OPEN', mergeable: 'MERGEABLE', headRefName: 'fix/7-x', baseRefName: 'main', isCrossRepository: false, closingIssuesReferences: [{ number: 7 }] })
const ERR_BODY = { out: '{"message":"Bad Gateway"}', exit: 1 }
const SCALED = { OBSERVE_PR_WALL_SEC: '7', OBSERVE_PR_SLEEP_SEC: '1', OBSERVE_PR_POLLS: '10', OBSERVE_PR_GH_TIMEOUT_SEC: '30' }

function run(bash, stub, args, env = {}) {
  return spawnSync(bash, [SCRIPT, '--nonce', NONCE, ...args], { encoding: 'utf8', env: stub.env(env) })
}
const payloadOf = (r) => {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  return JSON.parse(r.stdout).payload
}

// ホスト側（定義部のスライス）
globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
globalThis.agent = async () => null
globalThis.log = () => {}
const source = readFileSync(SRC, 'utf8')
const def = source.slice(0, source.lastIndexOf('\n', source.indexOf(['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_'))))
const slice = join(trackTmp(mkdtempSync(join(tmpdir(), 'iit-inconclusive-'))), 'defs.mjs')
writeFileSync(slice, `${def}\nexport { applyChecksObservation, observeInputText, sha256Hex }\n`)
const m = await import(pathToFileURL(slice).href)
const inputSha = m.sha256Hex(m.observeInputText({ mode: 'checks', pr: 5 }))

const runA = (bash, stub, args, env = {}) => spawnAsync(bash, [SCRIPT, '--nonce', NONCE, ...args], { env: stub.env(env) })

describe('観測スクリプト（壁時計 kill・取得失敗・出力サイズ。実時間を待つケースは同時に走る）', { concurrency: 16 }, () => {
for (const bash of BASHES) {
  const t = (name, fn) => test(`[${bash}] ${name}`, { skip: !jqAvailable }, fn)
  const unmetStub = (extra = {}) => createObserveStub({
    prview: { out: prJson }, 'check-runs-total': { out: '{"total_count":0,"check_runs":[]}' }, status: { out: '{"statuses":[]}' }, ...extra,
  })

  t('壁時計 kill の pending 封筒は headSha が空で件数 0（直前の観測の headSha・件数を載せない）。stderr は「結論が出ていない」と言う', async () => {
    // 1 回目の観測は成功（gh 3 回）。2 回目の観測は pr view に成功して HEAD を得たあと、check-runs の呼び出しが壁時計で kill される
    const stub = unmetStub()
    const r = await runA(bash, stub, ['--mode', 'checks', '--pr', '5', '--wait', '--attempt', '1'], { ...SCALED, GH_STUB_DELAYS: '0 0 0 0 60' })
    const p = payloadOf(r)
    // 前提の自己検証: 1 回目の観測が成功し（check-runs の件数取得まで届いた）、2 回目の pr view まで進んでいたこと。
    // 極端な負荷で 1 回目の観測が壁時計に間に合わなかった場合、この検査が無いと『直前の件数を載せない』を見ないまま緑になる
    assert.ok(stub.countOf('check-runs-total') >= 1 && stub.countOf('prview') >= 2, `前提が崩れた: 1 回目の観測が完了していない（prview=${stub.countOf('prview')} check-runs-total=${stub.countOf('check-runs-total')}）`)
    assert.deepEqual({ o: p.outcome, e: p.err, h: p.headSha, t: p.total, r: p.checkRuns, s: p.statuses }, { o: 'pending', e: 0, h: '', t: 0, r: 0, s: 0 })
    assert.match(r.stderr, /この起動では結論が出ていない/)
    assert.ok(!/取得に失敗した（gh pr view/.test(r.stderr.split('\n').filter((l) => l.includes('結論が出ていない')).join('')), '結論が出ていない行は取得失敗と言わない')
  })

  t('その起動で取得失敗があり、一度も取得に成功しないまま壁時計 kill で終わるなら、pending / exhausted ではなく error（err:1）', async () => {
    // attempt 1 と 7 は独立した 2 回の起動。待ちを重ねるため同時に走らせる
    const runs = await Promise.all(['1', '7'].map(async (attempt) => {
      const stub = createObserveStub({ prview: ERR_BODY })
      return { attempt, r: await runA(bash, stub, ['--mode', 'checks', '--pr', '5', '--wait', '--attempt', attempt], { ...SCALED, GH_STUB_DELAYS: '0 0 60' }) }
    }))
    for (const { attempt, r } of runs) {
      const p = payloadOf(r)
      assert.deepEqual({ o: p.outcome, e: p.err, h: p.headSha, t: p.total }, { o: 'error', e: 1, h: '', t: 0 }, `attempt ${attempt}`)
      // error にする箇所の直前に、なぜ pending / exhausted ではなく error なのかを 1 行出す（ログから原因が分かる）
      assert.match(r.stderr, /一度も取得に成功しなかった（取得失敗が続いた）ため、待ち切ったとは返さず error にする/, `attempt ${attempt}`)
    }
  })

  // 『取得失敗ではない』と言えるのは待機つきだけ（pending / exhausted で返せる）。待機なしの単発観測は結論が出なければ
  // そのまま err:1・error になるので、取得失敗として知らせる（payload と stderr が食い違わない）。
  t('壁時計の残りで gh を kill したとき、stderr が「取得失敗ではない」と言うのは --wait のときだけ。待機なしは取得失敗と言う（err:1 と一致）', async () => {
    const routes = {
      prview: { out: prJson }, rules: { out: '[{"type":"required_status_checks","parameters":{"required_status_checks":[{"context":"ci"}]}}]\n' },
      'check-runs': { out: '{"check_runs":[]}\n' }, statuses: { out: '[]\n' },
    }
    // 待機なしと待機つきは独立した 2 回の起動。待ちを重ねるため同時に走らせる
    const [noWait, waited] = await Promise.all([
      runA(bash, createObserveStub(routes), ['--mode', 'required', '--base', 'main', '--pr', '5'], { ...SCALED, GH_STUB_DELAYS: '0 0 60' }),
      runA(bash, createObserveStub(routes), ['--mode', 'required', '--base', 'main', '--pr', '5', '--wait', '--attempt', '1'], { ...SCALED, GH_STUB_DELAYS: '0 0 0 0 0 0 60' }),
    ])
    const pn = payloadOf(noWait)
    assert.deepEqual({ o: pn.outcome, e: pn.err }, { o: 'error', e: 1 }, '待機なしは壁時計で結論が出なければ取得失敗')
    assert.match(noWait.stderr, /取得に失敗した（/)
    assert.doesNotMatch(noWait.stderr, /取得失敗ではない/, '待機なしの err:1 に「取得失敗ではない」と言わない')
    const pw = payloadOf(waited)
    assert.equal(pw.err, 0, '待機つきは取得失敗ではなく未確定')
    assert.match(waited.stderr, /この起動では結論が出ていない（壁時計の残り時間に達した: .*）。取得失敗ではない/)
  })

  t('対照: 取得に一度でも成功していれば、そのあと壁時計で kill されても pending（取得失敗が混じっていても）', async () => {
    // 観測 1 の pr view は 502、観測 2 は成功（0 件）、観測 3 が壁時計 kill
    const stub = createObserveStub({
      prview: [ERR_BODY, { out: prJson }], 'check-runs-total': { out: '{"total_count":0,"check_runs":[]}' }, status: { out: '{"statuses":[]}' },
    })
    const p = payloadOf(await runA(bash, stub, ['--mode', 'checks', '--pr', '5', '--wait', '--attempt', '1'], { ...SCALED, GH_STUB_DELAYS: '0 0 0 0 60' }))
    assert.deepEqual({ o: p.outcome, e: p.err }, { o: 'pending', e: 0 })
  })

  t('非 0 終了の gh は、標準出力が有効な JSON でも取得失敗（pipefail）。全モードで err:1 になり、理由を標準エラーに 1 行出す', () => {
    const cases = [
      ['checks', ['--mode', 'checks'], { prview: { out: prJson }, 'check-runs-total': { out: '{"total_count":2,"check_runs":[]}', exit: 1 }, status: { out: '{"statuses":[]}' } }],
      ['checks-prview', ['--mode', 'checks'], { prview: { out: SHA, exit: 1 }, 'check-runs-total': { out: '{"total_count":2}' }, status: { out: '{"statuses":[]}' } }],
      ['pr', ['--mode', 'pr', '--base', 'main', '--branch', 'fix/7-x', '--issue', '7'], { prview: { out: prJson, exit: 1 } }],
      ['required', ['--mode', 'required', '--base', 'main'], {
        prview: { out: prJson }, rules: { out: '[{"type":"pull_request"}]\n', exit: 1 }, 'check-runs': { out: '{"check_runs":[]}\n' }, statuses: { out: '[]\n' },
      }],
      ['threads', ['--mode', 'threads'], { graphql: { out: '{"data":{"repository":{"pullRequest":{"reviewThreads":{"nodes":[],"pageInfo":{"hasNextPage":false,"endCursor":null}}}}}}', exit: 1 } }],
    ]
    for (const [name, args, routes] of cases) {
      const r = run(bash, createObserveStub(routes), [...args, '--pr', '5'])
      const p = payloadOf(r)
      assert.deepEqual({ e: p.err, o: p.outcome }, { e: 1, o: 'error' }, name)
      assert.match(r.stderr, /終了コード/, `${name}: 失敗の理由を標準エラーに出す`)
    }
  })

  t('gh の出力サイズの上限は境界を含めて検査する（上限ちょうどは採用、1 バイト超は取得失敗）', () => {
    const body = (n) => `{"total_count":2,"pad":"${'x'.repeat(n - '{"total_count":2,"pad":""}'.length)}"}`
    assert.equal(body(1000).length, 1000)
    const ok = payloadOf(run(bash, unmetStub({ 'check-runs-total': { out: body(1000) } }), ['--mode', 'checks', '--pr', '5'], { OBSERVE_PR_MAX_OUT_BYTES: '1000' }))
    assert.deepEqual({ e: ok.err, t: ok.total }, { e: 0, t: 2 })
    const over = payloadOf(run(bash, unmetStub({ 'check-runs-total': { out: body(1001) } }), ['--mode', 'checks', '--pr', '5'], { OBSERVE_PR_MAX_OUT_BYTES: '1000' }))
    assert.deepEqual({ e: over.err, o: over.outcome }, { e: 1, o: 'error' })
  })
}

test('ホスト: 実際の壁時計 kill の封筒（スクリプトの出力）は採用されず、実測 0 件の exhausted は採用される', { skip: !jqAvailable }, async () => {
  const bash = BASHES[0]
  const args = [SCRIPT, '--nonce', NONCE, '--mode', 'checks', '--pr', '5', '--wait', '--attempt', '7']
  const [rKilled, rReal] = await Promise.all([
    spawnAsync(bash, args, { env: createObserveStub({ prview: { out: prJson }, 'check-runs-total': { out: '{"total_count":0}' }, status: { out: '{"statuses":[]}' } }).env({ ...SCALED, GH_STUB_DELAYS: '0 0 0 0 60' }) }),
    spawnAsync(bash, args, { env: unmetEnv() }),
  ])
  const killed = JSON.parse(rKilled.stdout)
  assert.deepEqual({ o: killed.payload.outcome, h: killed.payload.headSha }, { o: 'exhausted', h: '' })
  const a = m.applyChecksObservation({ state: 'timeout', summary: 's', checksTotal: 0, checksObservation: killed }, NONCES, inputSha)
  assert.equal(a.reason, 'inconclusive')
  assert.ok(!('checksTotal' in a.result))
  const b = m.applyChecksObservation({ state: 'timeout', summary: 's', checksObservation: JSON.parse(rReal.stdout) }, NONCES, inputSha)
  assert.equal(b.reason, '')
  assert.equal(b.result.checksTotal, 0)
})
})

// --- ホスト側 ---

const NONCES = [NONCE, `${NONCE}w`]
const envOf = (payload, nonce = NONCE) => {
  // 独立実装（test lib）で署名する
  return import('./lib/signed-output.mjs').then((lib) => lib.makeEnvelope(nonce, payload))
}
const good = (over = {}) => ({ mode: 'checks', err: 0, total: 0, checkRuns: 0, statuses: 0, headSha: SHA, attempt: 7, maxAttempts: 7, outcome: 'exhausted', inputSha256: inputSha, ...over })

test('ホスト: headSha が 40 桁 16 進でない封筒（壁時計 kill 由来の未確定）は、正しく署名されていても採用しない', async () => {
  // [SHA] は String に強制変換すると 40 桁 16 進と一致する（typeof の検査が無いと正規表現を通る）
  for (const headSha of ['', 'abc', 'Z'.repeat(40), 'a'.repeat(41), null, 12, [SHA]]) {
    for (const outcome of ['pending', 'exhausted']) {
      const env = await envOf(good({ headSha, outcome }))
      const r = m.applyChecksObservation({ state: 'timeout', summary: 's', checksTotal: 0, checksObservation: env }, NONCES, inputSha)
      assert.equal(r.reason, 'inconclusive', JSON.stringify({ headSha, outcome }))
      assert.ok(!('checksTotal' in r.result), '採用しない（conflicting への再判定の根拠にならない）')
    }
  }
})

test('ホスト: 実測 0 件の封筒（headSha あり、exhausted / pending / met いずれも）は従来どおり採用する', async () => {
  for (const outcome of ['exhausted', 'pending', 'met', 'observed']) {
    const env = await envOf(good({ outcome, total: 0 }))
    const r = m.applyChecksObservation({ state: 'timeout', summary: 's', checksTotal: 9, checksObservation: env }, NONCES, inputSha)
    assert.equal(r.reason, '')
    assert.equal(r.result.checksTotal, 0, outcome)
  }
})

function unmetEnv() {
  return createObserveStub({ prview: { out: prJson }, 'check-runs-total': { out: '{"total_count":0}' }, status: { out: '{"statuses":[]}' } })
    .env({ OBSERVE_PR_POLLS: '2', OBSERVE_PR_SLEEP_SEC: '0' })
}

test('ホスト: outcome が error の封筒は、err が 0・headSha・total が揃っていても採用しない（手組みの封筒でのみ到達する不整合）', async () => {
  for (const outcome of ['error']) {
    const env = await envOf(good({ outcome, err: 0, total: 3, headSha: SHA }))
    const r = m.applyChecksObservation({ state: 'timeout', summary: 's', checksTotal: 3, checksObservation: env }, NONCES, inputSha)
    assert.equal(r.reason, 'fetch-error')
    assert.ok(!('checksTotal' in r.result))
  }
  // 対照: outcome が met / observed / exhausted / pending（headSha あり）なら従来どおり採用する
  for (const outcome of ['met', 'observed', 'exhausted', 'pending']) {
    const r = m.applyChecksObservation({ state: 'timeout', summary: 's', checksTotal: 3, checksObservation: await envOf(good({ outcome, total: 3 })) }, NONCES, inputSha)
    assert.equal(r.reason, '', outcome)
    assert.equal(r.result.checksTotal, 3, outcome)
  }
})
