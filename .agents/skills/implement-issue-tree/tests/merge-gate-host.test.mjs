// ホスト側の merge-gate.sh 封筒の照合（Issue #603 第 6 弾）。merge-exec が転記した封筒を、ホストが再計算して照合し、通ったときだけ
// 新規マージ（merged: true / reason: merged）を受理する契約を固定する。
//
//   - verifyMergeGate（純粋関数）: nonce・sha256・入力（PR・repo・base・期待 sha・外部チェック宣言）・verdict ok・取得失敗でないこと・
//     最終段階まで到達・封筒の HEAD sha と merge-exec 申告の HEAD sha の一致（期待 sha があればそれとも一致）の全部が揃ったときだけ ok
//   - 結合: 実装スクリプト全体を stub agent に対して走らせ、封筒が欠落・不正な merged: true を merged として確定しない
//     （blocked + quality で次回ランの already-merged 回復に回す = 従来の「独立確認で裏付けられなかった」経路と同じ）
//   - 封筒は呼び出しごと（ラウンドごと）に別の nonce を持ち、前の呼び出しの封筒の流用は通らない
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BASE_ARGS, importDefinitions, runScript } from './lib/stub-run.mjs'
import { inputSha256, makeEnvelope, nonceOf } from './lib/signed-output.mjs'

const { verifyMergeGate, mergeGateInputText, mergeGateExternalArg, mergeGateCommand, baseBranch, repoArg } = await importDefinitions(
  ['verifyMergeGate', 'mergeGateInputText', 'mergeGateExternalArg', 'mergeGateCommand', 'baseBranch', 'repoArg'],
  'merge-gate-host',
)

const HEAD = 'a'.repeat(40)
const OTHER = 'b'.repeat(40)
const PR = 1002
const NONCE = 'n0nce1x2'
const EXT = [{ app: 'cursor', contexts: ['Cursor Bugbot'] }]

// 独立に計算した入力（ホストの mergeGateInputText とは別の実装で、定義が壊れたときに期待値ごと壊れないようにする）
const inputOf = (pr, expect, external) => ['merge-gate', String(pr), repoArg, baseBranch, expect, external].join('\n')
const payloadOf = (over = {}, ext = '', expect = '') => ({
  mode: 'merge-gate', err: 0, verdict: 'ok', stage: 'done', detail: 'ok', headSha: HEAD, inputSha256: inputSha256(inputOf(PR, expect, ext)),
  checks: 2, notGreen: 0, unresolved: 0, requiredTotal: 2, clientOnly: 0, unbound: 0, unissued: 0, ...over,
})
const check = (env, { nonce = NONCE, pr = PR, expect = '', ext = '', exec = HEAD } = {}) => verifyMergeGate(env, nonce, pr, expect, ext, exec)

test('verifyMergeGate: 正しい封筒（verdict ok・stage done・HEAD sha 一致）だけが ok', () => {
  assert.deepEqual(check(makeEnvelope(NONCE, payloadOf())), { ok: true, reason: '' })
  const ext = mergeGateExternalArg(EXT)
  assert.equal(check(makeEnvelope(NONCE, payloadOf({}, ext)), { ext }).ok, true)
  // 期待 sha があれば、封筒の入力にも HEAD sha にも一致が要る
  assert.equal(check(makeEnvelope(NONCE, payloadOf({}, '', HEAD)), { expect: HEAD }).ok, true)
})

test('verifyMergeGate: 封筒なし・形の不完全・nonce 違い・sha256 の転記ミスは拒否する', () => {
  const good = makeEnvelope(NONCE, payloadOf())
  assert.equal(check(undefined).reason, 'missing')
  assert.equal(check(null).reason, 'missing')
  assert.equal(check({ nonce: NONCE, payload: payloadOf() }).reason, 'missing')
  assert.equal(check({ ...good, payload: 'x' }).reason, 'missing')
  assert.equal(check(makeEnvelope('othernonce', payloadOf())).reason, 'nonce')
  assert.equal(check({ ...good, sha256: '0'.repeat(64) }).reason, 'sha256')
  assert.equal(check({ ...good, payload: { ...good.payload, verdict: 'ok', checks: 3 } }).reason, 'sha256', 'payload の改変')
})

test('verifyMergeGate: 別の入力（別 PR・外部チェック宣言の違い・期待 sha の違い）を検証した封筒は拒否する', () => {
  assert.equal(check(makeEnvelope(NONCE, payloadOf({ inputSha256: inputSha256(inputOf(PR + 1, '', '')) }))).reason, 'input')
  const ext = mergeGateExternalArg(EXT)
  // 宣言なしで検証した封筒を、宣言ありの呼び出しの証拠にはできない
  assert.equal(check(makeEnvelope(NONCE, payloadOf({}, '')), { ext }).reason, 'input')
  assert.equal(check(makeEnvelope(NONCE, payloadOf({}, ext)), { ext: mergeGateExternalArg([{ app: 'cursor', contexts: ['Other'] }]) }).reason, 'input')
  assert.equal(check(makeEnvelope(NONCE, payloadOf({}, '', OTHER)), { expect: HEAD }).reason, 'input')
})

test('verifyMergeGate: verdict が ok でない・取得失敗・最終段階に達していない・mode 違いは拒否する', () => {
  for (const over of [{ verdict: 'checks-not-green' }, { verdict: 'server-enforcement-missing' }, { verdict: '' }, { err: 1 }, { stage: 'external' }, { stage: 'g0' }, { mode: 'checks' }]) {
    assert.equal(check(makeEnvelope(NONCE, payloadOf(over))).reason, 'verdict', JSON.stringify(over))
  }
})

test('verifyMergeGate: 封筒の HEAD sha が merge-exec 申告と違う・40 桁 16 進でない・期待 sha と違うなら拒否する', () => {
  assert.equal(check(makeEnvelope(NONCE, payloadOf({ headSha: OTHER }))).reason, 'head')
  assert.equal(check(makeEnvelope(NONCE, payloadOf()), { exec: OTHER }).reason, 'head')
  assert.equal(check(makeEnvelope(NONCE, payloadOf({ headSha: '' })), { exec: '' }).reason, 'head')
  assert.equal(check(makeEnvelope(NONCE, payloadOf({ headSha: 'A'.repeat(40) })), { exec: 'A'.repeat(40) }).reason, 'head')
  // 期待 sha は封筒の入力に含まれていても、HEAD sha が違えば拒否（スクリプトを経ない偽造への多重防御）
  assert.equal(check(makeEnvelope(NONCE, payloadOf({ headSha: OTHER }, '', HEAD)), { expect: HEAD, exec: OTHER }).reason, 'head')
})

test('mergeGateCommand: コマンドの引数が入力文字列と一致する（ホストの再計算と同じ値を束縛する）', () => {
  const ext = mergeGateExternalArg(EXT)
  const cmd = mergeGateCommand(NONCE, PR, HEAD, ext)
  assert.match(cmd, new RegExp(`merge-gate\\.sh --nonce ${NONCE} --pr ${PR} --base ${baseBranch}`))
  assert.ok(cmd.includes(`--expect-sha ${HEAD}`))
  assert.ok(cmd.includes(`--external '${ext}'`))
  assert.equal(mergeGateInputText(PR, HEAD, ext), inputOf(PR, HEAD, ext))
  assert.ok(!mergeGateCommand(NONCE, PR, '', '').includes('--expect-sha'))
  assert.ok(!mergeGateCommand(NONCE, PR, '', '').includes('--external'))
  assert.throws(() => mergeGateCommand(NONCE, 0, '', ''), /PR 番号/)
  assert.throws(() => mergeGateCommand(NONCE, PR, 'zz', ''), /expect-sha/)
})

// --- 結合 ---
const ARGS = { ...BASE_ARGS, autoMerge: true, externalChecks: [] }
const verifyReply = { state: 'MERGED', headRefOid: HEAD, mergeCommitOid: 'c'.repeat(40), headRefName: 'feat/2-x', baseRefName: 'main', isCrossRepository: false, closingIssues: [2] }

async function runMerge(execReply) {
  const prNumbers = []
  const out = await runScript({
    args: ARGS,
    override: (label, opts, prompt) => {
      if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: HEAD, headRefName: 'feat/2-x', baseRefName: 'main', isCrossRepository: false, closingIssues: [2] }
      if (label.startsWith('merge:#')) return { state: 'ready', summary: 'マージ条件充足', headSha: HEAD }
      if (label.startsWith('merge-exec:#')) {
        prNumbers.push(Number(/gh pr merge (\d+) /.exec(prompt)?.[1]))
        return execReply(prompt, prNumbers.length)
      }
      if (label.startsWith('merge-verify:#')) return verifyReply
      return undefined
    },
  })
  return { ...out, prNumbers }
}
const gateInputOf = (prompt) => {
  const m = /--pr (\d+) --base \S+/.exec(prompt)
  return inputSha256(inputOf(Number(m[1]), '', ''))
}
const merged = (prompt, gate) => ({ merged: true, reason: 'merged', summary: 'マージ済み', issueClosed: true, headSha: HEAD, ...(gate === undefined ? {} : { gate }) })
const honest = (prompt, over = {}) => makeEnvelope(nonceOf(prompt), { mode: 'merge-gate', err: 0, verdict: 'ok', stage: 'done', detail: 'ok', headSha: HEAD, inputSha256: gateInputOf(prompt), checks: 2, notGreen: 0, unresolved: 0, requiredTotal: 2, clientOnly: 0, unbound: 0, unissued: 0, ...over })
const doneOf = (result) => result.done.find((d) => d.issue === 2)

test('結合: 正しい封筒つきの merged: true は merged として確定する', async () => {
  const { result, prNumbers } = await runMerge((prompt) => merged(prompt, honest(prompt)))
  assert.equal(prNumbers.length, 1)
  assert.equal(doneOf(result).status, 'merged', doneOf(result).note)
})

test('結合: 封筒が無い・nonce 違い・sha256 不一致・別入力・verdict が ok でない・HEAD sha が申告と違う merged: true は確定しない（blocked + quality）', async () => {
  const variants = {
    封筒なし: () => merged(null, undefined),
    nonce違い: (p) => merged(p, makeEnvelope('othernonce1', honest(p).payload)),
    sha256不一致: (p) => merged(p, { ...honest(p), sha256: '0'.repeat(64) }),
    別入力: (p) => merged(p, honest(p, { inputSha256: inputSha256('merge-gate\n999\n\nmain\n\n') })),
    verdict違い: (p) => merged(p, honest(p, { verdict: 'checks-not-green', stage: 'checks' })),
    取得失敗: (p) => merged(p, honest(p, { err: 1 })),
    HEAD違い: (p) => merged(p, honest(p, { headSha: 'b'.repeat(40) })),
  }
  for (const [name, make] of Object.entries(variants)) {
    const { result } = await runMerge((prompt) => make(prompt))
    const d = doneOf(result)
    assert.notEqual(d.status, 'merged', `${name}: 確定してはならない`)
    assert.equal(d.status, 'blocked', `${name}: ${d.status} ${d.note}`)
    assert.ok(d.note.includes('検証スクリプトの封筒'), `${name}: 拒否の理由が note に残る: ${d.note}`)
  }
})

test('結合: already-merged の回復は封筒を要求しない（新規マージではない）', async () => {
  const { result } = await runScript({
    args: { ...ARGS, autoMerge: true },
    override: (label, opts, prompt) => {
      if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: HEAD, headRefName: 'feat/2-x', baseRefName: 'main', isCrossRepository: false, closingIssues: [2] }
      if (label.startsWith('merge:#')) return { state: 'ready', summary: 'ok', headSha: HEAD }
      if (label.startsWith('merge-exec:#')) return { merged: true, reason: 'already-merged', summary: '既にマージ済み', issueClosed: true, headSha: '' }
      if (label.startsWith('merge-verify:#')) return verifyReply
      return undefined
    },
  })
  assert.equal(doneOf(result).status, 'merged', doneOf(result).note)
})

test('結合: merge-exec 呼び出しごとに nonce が別で、前の呼び出しの封筒を流用しても通らない', async () => {
  const nonces = []
  let first = null
  const { result } = await runScript({
    args: ARGS,
    override: (label, opts, prompt) => {
      if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: HEAD, headRefName: 'feat/2-x', baseRefName: 'main', isCrossRepository: false, closingIssues: [2] }
      if (label.startsWith('merge:#')) return { state: 'ready', summary: 'ok', headSha: HEAD }
      if (label.startsWith('merge-exec:#')) {
        nonces.push(nonceOf(prompt))
        if (first === null) {
          first = honest(prompt)
          // 1 回目は一過性の理由で見送り（次ラウンドで再監視 → 再度 merge-exec）
          return { merged: false, reason: 'checks-not-green', summary: '見送り', issueClosed: false }
        }
        // 2 回目は 1 回目の封筒を流用して merged: true を申告する
        return merged(prompt, first)
      }
      if (label.startsWith('merge-verify:#')) return verifyReply
      return undefined
    },
  })
  assert.ok(nonces.length >= 2, `merge-exec が 2 回走る: ${nonces.length}`)
  assert.equal(new Set(nonces).size, nonces.length, `nonce が呼び出しごとに一意: ${nonces.join(',')}`)
  assert.notEqual(doneOf(result).status, 'merged', '前の呼び出しの封筒の流用は通らない')
})
