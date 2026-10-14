// monitor の観測封筒をホストが受け取る経路を、実装スクリプト全体を stub agent に対して走らせて確かめる結合テスト
// （Issue #603 第 2 弾）。agent-call-budget.test.mjs の runScript と同じ評価形態（AsyncFunction。agent は引数）。
//
// 契約:
//   - monitor が checks の封筒つきで state: timeout / checksTotal: 0 を返したときだけ、ホストは conflicting へ再判定する
//     （封筒が無い・nonce 違い・別 PR・改変は採用せず、従来どおり timeout のまま次ラウンドへ回る）
//   - 監視呼び出しごと・再試行ごとに nonce が別になり、前の呼び出しの封筒を流用しても採用されない
//   - 封筒を採用しても、マージ経路（merge-exec への入力）は変わらない
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'
import { hashPrecheckReply, inputSha256, makeEnvelope, nonceOf } from './lib/signed-output.mjs'

const SCRIPT_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.src.js')
const rawSource = readFileSync(SCRIPT_PATH, 'utf8')
const scriptBody = stripMetaExport(rawSource)
// 依存宣言・域外依存の署名（ホストが再計算して照合する）をスタブ応答に付けるため、定義部をスライス import する
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')
const definitionPart = rawSource.slice(0, rawSource.lastIndexOf('\n', rawSource.indexOf(DRIVER_MARKER)))
globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
globalThis.agent = async () => null
globalThis.log = () => {}
const slicePath = join(trackTmp(mkdtempSync(join(tmpdir(), 'iit-observe-flow-'))), 'defs.mjs')
writeFileSync(slicePath, `${definitionPart}\nexport { declaredDepsChecksum, outOfTreeStateChecksum }\n`)
const { declaredDepsChecksum, outOfTreeStateChecksum } = await import(pathToFileURL(slicePath).href)
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

const PR = 1002
const SHA = 'a'.repeat(40)
const ARGS = { parent: 1, parallel: 1, maxResidualWorktrees: 0, maxResidualWorktreeBytes: 0, skillDir: '/opt/skills/implement-issue-tree' }
const checksInput = (pr = PR) => inputSha256(['observe-pr', 'checks', String(pr), '', '', '', '', '', ''].join('\n'))
const payloadOf = (over = {}) => ({
  mode: 'checks', err: 0, total: 0, checkRuns: 0, statuses: 0, headSha: SHA, attempt: 0, maxAttempts: 0, outcome: 'observed', inputSha256: checksInput(), ...over,
})

// 葉 #2 が PR 作成（#1002）まで進み、monitor の応答を monitorReply(prompt, opts, callIndex) に任せる最小の stub
async function run(monitorReply, { args = ARGS, mergeExecReply = () => null } = {}) {
  const nodes = [
    { number: 1, title: 'root', state: 'open', parent: 0, siblingIndex: 0, dependsOn: [], subIssuesTotal: 1 },
    { number: 2, title: 'issue 2', state: 'open', parent: 1, siblingIndex: 0, dependsOn: [], subIssuesTotal: 0 },
  ]
  const calls = []
  const logs = []
  let monitorCalls = 0
  const handler = (prompt, opts) => {
    const label = opts.label
    if (label === 'nonce:seed') return { seedHex: 'b'.repeat(64) }
    if (label === 'script-hash-precheck') return hashPrecheckReply(prompt)
    if (label === 'worktree:untracked-scan') return { count: 0, paths: [] }
    if (label === 'state:load') return { ok: true, fileExisted: false, items: {}, highWaterBytes: 0, highWaterVersion: 0 }
    if (label === 'state:load-verify') return { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 }
    if (label === 'plan:issue-tree') return { nodes: structuredClone(nodes) }
    if (label === 'detect:external-checks') return { apps: [] }
    if (label.startsWith('plan:declared-deps')) {
      const nums = /for n in ([0-9 ]+); do/.exec(prompt)[1].trim().split(' ').map(Number)
      return { entries: nums.map((x) => ({ number: x, deps: [], sig: declaredDepsChecksum(x, []) })) }
    }
    if (label.startsWith('plan:root-ancestors')) return { fetched: true, chain: [{ number: 1, parent: 0 }] }
    if (label.startsWith('plan:out-of-tree-deps')) {
      const nums = /for n in ([0-9 ]+); do/.exec(prompt)[1].trim().split(' ').map(Number)
      return { entries: nums.map((x) => ({ number: x, state: 'OPEN', sig: outOfTreeStateChecksum(x, 'OPEN') })) }
    }
    if (label === 'worktree:orphan-scan') return { entries: [{ path: '/repo', branch: 'main', isMain: true }] }
    if (label === 'worktree:record-count') return { count: 1 }
    if (label.startsWith('plan:#')) return { plan: 'p', summary: 's' }
    if (label.startsWith('impl:#')) return { branch: 'feat/2-x', summary: 's', worktreePath: '/repo/wt/2' }
    if (label.startsWith('review:#')) return { state: 'ok', highestSeverity: 'none', summary: 's', worktreePath: '/repo/wt/r2' }
    if (label.startsWith('pr-create:#')) return { prNumber: PR, summary: 's', worktreePath: '/repo/wt/p2', checksStarted: true, mergeableAfterPush: 'MERGEABLE' }
    if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: SHA, headRefName: 'feat/2-x', baseRefName: 'main', isCrossRepository: false, closingIssues: [2] }
    if (label.startsWith('merge:#')) return monitorReply(prompt, opts, (monitorCalls += 1))
    if (label.startsWith('merge-exec:#')) return mergeExecReply(prompt, opts)
    if (label.startsWith('state:')) return { ok: true }
    return null
  }
  const agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    await Promise.resolve()
    return handler(prompt, opts)
  }
  const result = await new AsyncFunction('args', 'agent', 'log', 'phase', scriptBody)(args, agent, (m) => { logs.push(m) }, () => {})
  return { result, calls, logs }
}

const monitorCalls = (calls) => calls.filter((c) => /^merge:#\d+(:retry)?$/.test(c.opts.label))
const timeoutWith = (prompt, extra) => ({ state: 'timeout', summary: '監視上限', headSha: SHA, ...extra(nonceOf(prompt)) })
const REROUTED = /check-run 0 件のまま timeout を返した。再監視せず conflicting/
const NOT_ADOPTED = /監視エージェントの checksTotal（0）を採用しない/

test('結合: 正しい封筒つきの checksTotal 0 の timeout は conflicting へ再判定される（封筒の total が根拠）', async () => {
  const { logs, calls } = await run((prompt) => timeoutWith(prompt, (nonce) => ({ checksObservation: makeEnvelope(nonce, payloadOf({ total: 0 })) })))
  assert.ok(logs.some((l) => REROUTED.test(l)), logs.join('\n'))
  assert.ok(!logs.some((l) => NOT_ADOPTED.test(l)))
  assert.ok(monitorCalls(calls).length >= 1)
})

test('結合: 封筒が無い・nonce 違い・別 PR・payload 改変の checksTotal 0 は採用せず、再判定もしない（timeout のまま）', async () => {
  const tamper = (nonce) => {
    const e = makeEnvelope(nonce, payloadOf({ total: 0 }))
    return { ...e, payload: { ...e.payload, total: 0, outcome: 'met' } }
  }
  const variants = {
    封筒なし: () => ({ checksTotal: 0 }),
    nonce違い: () => ({ checksTotal: 0, checksObservation: makeEnvelope('othernonce1', payloadOf({ total: 0 })) }),
    別PR: (nonce) => ({ checksTotal: 0, checksObservation: makeEnvelope(nonce, payloadOf({ total: 0, inputSha256: checksInput(PR + 1) })) }),
    payload改変: (nonce) => ({ checksTotal: 0, checksObservation: tamper(nonce) }),
    取得失敗の封筒: (nonce) => ({ checksTotal: 0, checksObservation: makeEnvelope(nonce, payloadOf({ err: 1, total: 0, outcome: 'error' })) }),
  }
  for (const [name, make] of Object.entries(variants)) {
    const { logs } = await run((prompt) => timeoutWith(prompt, (nonce) => make(nonce)))
    assert.ok(!logs.some((l) => REROUTED.test(l)), `${name}: 自己申告の 0 で再判定してはならない`)
    assert.ok(logs.some((l) => NOT_ADOPTED.test(l)), `${name}: 採用しなかったことをログに残す\n${logs.join('\n')}`)
  }
})

test('結合: 封筒の total が 1 以上なら、エージェントが 0 と申告しても再判定しない（封筒が勝つ）', async () => {
  const { logs } = await run((prompt) => timeoutWith(prompt, (nonce) => ({ checksTotal: 0, checksObservation: makeEnvelope(nonce, payloadOf({ total: 3, checkRuns: 3 })) })))
  assert.ok(!logs.some((l) => REROUTED.test(l)))
})

test('結合: 監視呼び出しごと・再試行ごとに nonce が別で、前の呼び出しの封筒は流用できない', async () => {
  // 1 回目は未返却（null）→ 再試行へ。再試行は 1 回目と別の nonce を持つ
  const seen = []
  let firstEnvelope = null
  const { logs, calls } = await run((prompt, opts, n) => {
    const nonce = nonceOf(prompt)
    seen.push({ label: opts.label, nonce })
    if (n === 1) {
      firstEnvelope = makeEnvelope(nonce, payloadOf({ total: 0 }))
      return null
    }
    // 再試行は 1 回目の封筒を流用して返す（実行せずに使い回した想定）
    return { state: 'timeout', summary: '監視上限', headSha: SHA, checksTotal: 0, checksObservation: firstEnvelope }
  })
  assert.ok(seen.length >= 2, '1 回目の未返却の後に再試行が走る（その後は timeout のまま次ラウンドへ回る）')
  assert.deepEqual(seen.slice(0, 2).map((s) => s.label.endsWith(':retry')), [false, true])
  assert.equal(new Set(seen.map((s) => s.nonce)).size, seen.length, '全 monitor 呼び出し（ラウンド・再試行）の nonce が一意')
  assert.notEqual(seen[0].nonce, seen[1].nonce, '再試行は 1 回目と別の nonce')
  assert.ok(seen.every((s) => /^[0-9a-z]{1,64}$/.test(s.nonce)))
  assert.ok(!logs.some((l) => REROUTED.test(l)), '1 回目の封筒の流用は採用されない')
  assert.ok(logs.some((l) => NOT_ADOPTED.test(l)))
  // 再試行の本文は nonce 以外が 1 回目と同じ（観測専用 suffix が付く）
  const [first, retry] = monitorCalls(calls)
  assert.equal(retry.prompt.split(seen[1].nonce).join(seen[0].nonce).startsWith(first.prompt), true)
  assert.ok(!retry.prompt.includes(seen[0].nonce), '再試行の本文に 1 回目の nonce が残らない')
})

test('結合: 再試行で正しく実行された封筒（再試行の nonce）は採用される', async () => {
  const { logs } = await run((prompt, _opts, n) => (n === 1 ? null : timeoutWith(prompt, (nonce) => ({ checksObservation: makeEnvelope(nonce, payloadOf({ total: 0 })) }))))
  assert.ok(logs.some((l) => REROUTED.test(l)), logs.join('\n'))
})

test('結合: 別ラウンドの monitor 呼び出しは別の nonce を持つ（同じ PR・同じ内容でも前ラウンドの封筒は通らない）', async () => {
  const nonces = []
  let round1 = null
  const { logs } = await run((prompt, _opts, n) => {
    const nonce = nonceOf(prompt)
    nonces.push(nonce)
    if (n === 1) {
      round1 = makeEnvelope(nonce, payloadOf({ total: 2, checkRuns: 2 }))
      // 検査の対象外のラウンド 1: 品質ブロックではなく timeout（総数 2）でラウンドを進める
      return { state: 'timeout', summary: '監視上限', headSha: SHA, checksTotal: 2, checksObservation: round1 }
    }
    if (n === 2) return { state: 'timeout', summary: '監視上限', headSha: SHA, checksTotal: 0, checksObservation: round1 }
    return { state: 'blocked', blockedReason: 'quality', summary: '終了', unresolvedComments: [] }
  })
  assert.ok(nonces.length >= 2, `2 ラウンド以上監視する: ${nonces.length}`)
  assert.equal(new Set(nonces).size, nonces.length, `全 monitor 呼び出しの nonce が一意: ${nonces.join(',')}`)
  assert.ok(!logs.some((l) => REROUTED.test(l)), 'ラウンド 1 の封筒をラウンド 2 で流用しても採用されない')
})

// D1（#603 の実ラン検証の指摘）: autoMerge: false で止まった PR の note に、回復専用 merge-exec の内部理由名（head-moved）を
// 「HEAD が動いた」と読める形で混ぜない。HEAD は動いておらず、PR が未マージなだけである。
test('結合: autoMerge 無効で ready になった PR の停止 note は、回復専用 merge-exec の内部理由 head-moved を転記せず「未マージのまま」と書く', async () => {
  const { result, calls } = await run(
    (prompt) => ({ state: 'ready', summary: 'マージ条件充足', headSha: SHA }),
    { mergeExecReply: () => ({ merged: false, reason: 'head-moved', summary: 'head-moved で終了。PR は MERGED ではなかった', issueClosed: false }) },
  )
  assert.ok(calls.some((c) => c.opts.label.startsWith('merge-exec:#')), '回復専用の merge-exec が走る')
  const done = result.done.find((d) => d.issue === 2)
  assert.equal(done.status, 'blocked')
  assert.ok(!done.note.includes('head-moved'), done.note)
  assert.ok(!done.note.includes('HEAD'), done.note)
  assert.ok(done.note.includes('PR は未マージのままだった'), done.note)
  assert.ok(done.note.includes('自動マージは無効'), '停止の本当の理由（自動マージ無効）は残る')
})

test('結合: 回復専用 merge-exec が head-moved 以外の理由を返したときは、従来どおりその summary を note に添える', async () => {
  const { result } = await run(
    () => ({ state: 'ready', summary: 'マージ条件充足', headSha: SHA }),
    { mergeExecReply: () => ({ merged: false, reason: 'checks-not-green', summary: '独自の説明文', issueClosed: false }) },
  )
  const done = result.done.find((d) => d.issue === 2)
  assert.ok(done.note.includes('独自の説明文'), done.note)
})
