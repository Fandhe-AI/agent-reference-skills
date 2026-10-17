// 新規追加ファイルの衝突ゲート（Issue #658）のホスト側の回帰テスト。
//
// 検証する契約:
//   - 比べる先行 PR は同じランの PR（knownPrByIssue と状態ファイルの pr）のうち自分より番号の小さいものだけ（addedFilesPeers）
//   - 封筒の照合（nonce・入力のハッシュ・sha256）に通り、取得に成功した観測だけを判定に使う。照合・取得・形の失敗は skip
//     （ゲートを飛ばす = 止める方向にしか効かない判定を、観測できないときに止めない）（classifyAddedFiles）
//   - monitor の ready の後・merge-exec の前に観測し、連番の衝突は改番の fix へ回し（上限 ADDED_FILE_COLLISION_FIX_MAX 回）、
//     同じパスの新規追加は blocked で止める。衝突が無い・観測できないときは従来どおり進む（結合）
//   - Plan / Implement のプロンプトに連番ファイル・置き場ファイルの選び方を書く（(a) の補助）
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BASE_ARGS, definitionPart, driverPart, importDefinitions, runScript } from './lib/stub-run.mjs'
import { inputSha256, makeEnvelope, nonceOf } from './lib/signed-output.mjs'

const {
  addedFilesPeers, classifyAddedFiles, observeInputText, observeCommand, addedFileSeqFindingSummary, addedFilePathBlockedReason,
  planPrompt, implementPrompt, ADDED_FILES_PEERS_MAX, ADDED_FILE_COLLISION_FIX_MAX, addedFileNamingPolicy,
} = await importDefinitions(
  ['addedFilesPeers', 'classifyAddedFiles', 'observeInputText', 'observeCommand', 'addedFileSeqFindingSummary', 'addedFilePathBlockedReason',
    'planPrompt', 'implementPrompt', 'ADDED_FILES_PEERS_MAX', 'ADDED_FILE_COLLISION_FIX_MAX', 'addedFileNamingPolicy'],
  'added-files-gate',
)

const NONCE = 'af1n2o3n4c5e'
const inputOf = (pr, peers, base = 'main', repo = '') => ['observe-pr', 'added-files', String(pr), repo, base, '', '', '', '', peers.join(',')].join('\n')
const payloadOf = (pr, peers, over = {}) => ({
  mode: 'added-files', inputSha256: inputSha256(inputOf(pr, peers)), outcome: 'observed', err: 0, attempt: 0, maxAttempts: 0,
  state: 'OPEN', added: 2, numbered: 1, samePath: 0, seqPeer: 0, seqBase: 0, truncated: 0, pathPeers: [], seqPeers: [], ...over,
})

test('addedFilesPeers: 自分より番号の小さい同じランの PR だけを、近い順に上限まで昇順で返す', () => {
  const known = new Map([[2, 1002], [3, 1003], [4, 1004], [5, 0]])
  const saved = [['6', { status: 'monitoring', pr: 990 }], ['7', { status: 'merged', pr: 991 }], ['8', { status: 'closed', pr: 992 }], ['9', { status: 'blocked', pr: 1002 }], ['3', { status: 'monitoring', pr: 980 }]]
  assert.deepEqual(addedFilesPeers(3, 1003, known, saved), [990, 1002])
  assert.deepEqual(addedFilesPeers(2, 1002, known, []), [])
  const many = new Map(Array.from({ length: ADDED_FILES_PEERS_MAX + 5 }, (_, i) => [100 + i, 500 + i]))
  const got = addedFilesPeers(1, 10000, many, [])
  assert.equal(got.length, ADDED_FILES_PEERS_MAX)
  assert.equal(got[0], 505, '番号の近い（大きい）方から取る')
  assert.deepEqual(got, [...got].sort((a, b) => a - b))
})

test('observeInputText / observeCommand: added-files は peers の行を足し、コマンドの引数と一致させる', () => {
  const f = { mode: 'added-files', pr: 1003, base: 'main', peers: [990, 1002] }
  assert.equal(observeInputText(f), inputOf(1003, [990, 1002]))
  assert.equal(observeInputText({ ...f, peers: [] }), inputOf(1003, []))
  assert.equal(observeInputText({ mode: 'threads', pr: 1 }).split('\n').length, 9, '他のモードの入力の定義は変えない')
  const cmd = observeCommand(NONCE, f)
  assert.match(cmd, /observe-pr\.sh --nonce af1n2o3n4c5e --mode added-files --pr 1003 --base main --peers 990,1002$/)
  assert.doesNotMatch(observeCommand(NONCE, { ...f, peers: [] }), /--peers/)
  for (const peers of [[1003], [1, 1], ['1'], [0], Array.from({ length: ADDED_FILES_PEERS_MAX + 1 }, (_, i) => i + 1)]) {
    assert.throws(() => observeCommand(NONCE, { ...f, peers }), /peers/, JSON.stringify(peers))
  }
})

test('classifyAddedFiles: 照合に通った観測だけを path / seq / none に分け、失敗は skip にする', () => {
  const peers = [1002]
  const c = (payload, nonce = NONCE) => classifyAddedFiles(makeEnvelope(nonce, payload), NONCE, inputSha256(inputOf(1003, peers)), peers)
  assert.equal(c(payloadOf(1003, peers)).kind, 'none')
  assert.equal(c(payloadOf(1003, peers, { seqPeer: 1, seqPeers: [1002] })).kind, 'seq')
  assert.equal(c(payloadOf(1003, peers, { seqBase: 1 })).kind, 'seq')
  assert.equal(c(payloadOf(1003, peers, { samePath: 1, pathPeers: [1002], seqPeer: 1, seqPeers: [1002] })).kind, 'path', '同じパスが優先')
  assert.deepEqual(c(payloadOf(1003, peers, { state: 'MERGED', samePath: 1, pathPeers: [1002] })).kind, 'none', 'OPEN でなければ止めない')
  const skips = [
    [c(payloadOf(1003, peers), 'othernonce'), 'envelope:nonce'],
    [c(payloadOf(1003, peers, { inputSha256: inputSha256(inputOf(1003, [])) })), 'envelope:input'],
    [c(payloadOf(1003, peers, { err: 1, outcome: 'error' })), 'fetch-error'],
    [c(payloadOf(1003, peers, { mode: 'threads' })), 'mode'],
    [c(payloadOf(1003, peers, { seqPeers: [777], seqPeer: 1 })), 'payload'], // 依頼していない番号
    [c(payloadOf(1003, peers, { samePath: -1 })), 'payload'],
    [c(payloadOf(1003, peers, { state: 'DRAFT' })), 'payload'],
    [classifyAddedFiles(null, NONCE, inputSha256(inputOf(1003, peers)), peers), 'envelope:missing'],
  ]
  for (const [r, reason] of skips) assert.deepEqual([r.kind, r.reason], ['skip', reason])
  const env = makeEnvelope(NONCE, payloadOf(1003, peers, { seqPeer: 1, seqPeers: [1002] }))
  assert.equal(classifyAddedFiles({ ...env, sha256: '0'.repeat(64) }, NONCE, inputSha256(inputOf(1003, peers)), peers).reason, 'envelope:sha256')
})

test('合成 finding と blocked の理由はホストの整数と固定文だけで作り、改番の手順と先行 PR を示す', () => {
  const s = addedFileSeqFindingSummary(1003, { seqBase: 1, seqPeer: 2, seqPeers: [990, 1002] })
  assert.match(s, /PR #1003/)
  assert.match(s, /base（origin\/main）の同じディレクトリの既存ファイルと 1 件、同じランの先行 PR #990, #1002 の新規追加ファイルと 2 件/)
  assert.match(s, /gh pr view <番号> --json files/)
  const pinned = addedFileSeqFindingSummary(1003, { seqBase: 1, seqPeer: 0, seqPeers: [] }, 'o/r')
  assert.match(pinned, /gh pr list -R o\/r --state open --json number/)
  assert.match(pinned, /gh pr view <番号> -R o\/r --json files/)
  assert.match(s, /先行 PR・base のファイルは変更しない/)
  assert.doesNotMatch(addedFileSeqFindingSummary(1003, { seqBase: 0, seqPeer: 1, seqPeers: [1002] }), /base（origin/)
  assert.match(addedFilePathBlockedReason(1003, { samePath: 1, pathPeers: [1002] }), /先行 PR #1002 と同じパスのファイルを新規に追加している（1 件/)
})

test('Plan と Implement のプロンプトに連番ファイル・置き場ファイルの選び方を書く（(a) の補助）', () => {
  const item = { number: 3, title: 't', optinTests: [] }
  assert.ok(planPrompt(item).includes(addedFileNamingPolicy()))
  assert.ok(implementPrompt(item, 'p').includes(addedFileNamingPolicy()))
  assert.match(addedFileNamingPolicy(), /open PR の追加ファイル/)
  assert.match(addedFileNamingPolicy(), /別名で新設せず/)
  assert.match(addedFileNamingPolicy(), /gh pr list --state open --json number/, 'args.repo が無ければ -R を付けない')
  // args.repo があれば gh を -R で束縛する（Bugbot: gh -R follows args.repo）
  const pinned = addedFileNamingPolicy('o/r')
  assert.match(pinned, /gh pr list -R o\/r --state open/)
  assert.match(pinned, /gh pr view <番号> -R o\/r --json files/)
})

test('ゲートは ready の後・recoveryOnly とマージ実行より前に置く', () => {
  const gate = driverPart.indexOf('__ADDED_FILES_GATE__')
  assert.ok(gate > 0)
  assert.ok(driverPart.indexOf('const recoveryOnly = ') > gate, 'recoveryOnly（人手マージ待ちの経路）より前')
  assert.ok(driverPart.indexOf('merge-exec:#${item.number}') > gate)
  assert.equal(driverPart.split('__ADDED_FILES_GATE__').length, 2, '目印は 1 つ')
  assert.ok(definitionPart.includes("label: `merge:added-files:#${item.number}`"))
})

// ---- 結合: 2 件のツリーを parallel 1 で回し、#2（PR 1002）の後に #3（PR 1003）を監視する ----
const HEAD = 'a'.repeat(40)
async function runTree(addedFilesReply, { fixPushed = true } = {}) {
  const observed = []
  const out = await runScript({
    args: { ...BASE_ARGS },
    leaves: [2, 3],
    override: (label, opts, prompt) => {
      const n = Number(/#(\d+)/.exec(label)?.[1])
      if (label.startsWith('pr-bind:#')) return { state: 'OPEN', headRefOid: HEAD, headRefName: `feat/${n}-x`, baseRefName: 'main', isCrossRepository: false, closingIssues: [n] }
      if (label.startsWith('merge:added-files:#')) {
        const m = /--pr (\d+) --base (\S+)(?: --peers ([0-9,]+))?/.exec(prompt)
        const peers = m[3] ? m[3].split(',').map(Number) : []
        observed.push({ issue: n, pr: Number(m[1]), peers, model: opts.model })
        return addedFilesReply({ prompt, issue: n, pr: Number(m[1]), peers, call: observed.filter((o) => o.issue === n).length })
      }
      if (label.startsWith('merge:#')) return { state: 'ready', summary: 'マージ条件充足', headSha: HEAD }
      if (label.startsWith('fix:#')) return { pushed: fixPushed, summary: '改番した', worktreePath: `/repo/wt/f${n}` }
      return undefined
    },
  })
  return { ...out, observed }
}
const honest = (prompt, pr, peers, over = {}) => makeEnvelope(nonceOf(prompt), payloadOf(pr, peers, over))
const labelsOf = (calls, issue) => calls.map((c) => c.opts.label).filter((l) => l.endsWith(`#${issue}`))
const resultOf = (result, issue) => [...(result.done ?? []), ...(result.failed ?? []), ...(result.blocked ?? [])].find((d) => d.issue === issue)

test('結合: 衝突が無ければ fix へ回さず従来どおり進み、後発の #3 は先行の PR 1002 を peers に渡す', async () => {
  const { calls, observed } = await runTree(({ prompt, pr, peers }) => honest(prompt, pr, peers))
  assert.deepEqual(observed.map((o) => [o.issue, o.pr, o.peers]), [[2, 1002, []], [3, 1003, [1002]]])
  assert.equal(observed[0].model, 'haiku')
  for (const issue of [2, 3]) {
    const labels = labelsOf(calls, issue)
    assert.ok(!labels.includes(`fix:#${issue}`), labels.join(' '))
    assert.ok(labels.indexOf(`merge:added-files:#${issue}`) > labels.indexOf(`merge:#${issue}`))
    assert.ok(labels.indexOf(`merge-exec:#${issue}`) > labels.indexOf(`merge:added-files:#${issue}`), 'マージ実行より前に観測する')
  }
})

test('結合: 連番の衝突は改番の fix へ回し、直った観測の後に従来どおり進む', async () => {
  const { calls, observed } = await runTree(({ prompt, issue, pr, peers, call }) =>
    honest(prompt, pr, peers, issue === 3 && call === 1 ? { seqPeer: 1, seqPeers: [1002] } : {}))
  const labels = labelsOf(calls, 3)
  const fixIdx = labels.indexOf('fix:#3')
  assert.ok(fixIdx > labels.indexOf('merge:added-files:#3'), labels.join(' '))
  const fixPrompt = calls.filter((c) => c.opts.label === 'fix:#3')[0].prompt
  assert.match(fixPrompt, /連番付きのファイル/)
  assert.match(fixPrompt, /先行 PR #1002 の新規追加ファイルと 1 件/)
  assert.equal(observed.filter((o) => o.issue === 3).length, 2, 'fix の後の ready で観測し直す')
  assert.ok(labels.lastIndexOf('merge-exec:#3') > labels.lastIndexOf('merge:added-files:#3'))
  assert.equal(calls.filter((c) => c.opts.label === 'fix:#3').length, 1)
})

test(`結合: 連番の衝突が fix ${2} 回で直らなければ blocked で止める`, async () => {
  assert.equal(ADDED_FILE_COLLISION_FIX_MAX, 2)
  const { calls, result } = await runTree(({ prompt, issue, pr, peers }) => honest(prompt, pr, peers, issue === 3 ? { seqBase: 1 } : {}))
  assert.equal(calls.filter((c) => c.opts.label === 'fix:#3').length, ADDED_FILE_COLLISION_FIX_MAX)
  assert.ok(!labelsOf(calls, 3).includes('merge-exec:#3'), 'マージ実行へ進まない')
  const r = resultOf(result, 3)
  assert.equal(r.status, 'blocked')
  assert.match(r.note, /連番の衝突が fix 2 回で解消しなかった/)
})

test('結合: 同じパスの新規追加は fix へ回さず blocked で止め、理由に先行 PR を書く', async () => {
  const { calls, result } = await runTree(({ prompt, issue, pr, peers }) => honest(prompt, pr, peers, issue === 3 ? { samePath: 1, pathPeers: [1002] } : {}))
  const labels = labelsOf(calls, 3)
  assert.ok(!labels.includes('fix:#3'))
  assert.ok(!labels.includes('merge-exec:#3'))
  const r = resultOf(result, 3)
  assert.equal(r.status, 'blocked')
  assert.match(r.note, /先行 PR #1002 と同じパスのファイルを新規に追加している/)
})

test('結合: 観測できない（封筒の不一致・取得失敗・例外）ときは sonnet で 1 回だけ取り直し、なお駄目ならゲートを飛ばして続行する', async () => {
  for (const bad of [
    ({ prompt, pr, peers }) => ({ ...honest(prompt, pr, peers, { samePath: 1, pathPeers: peers }), sha256: '0'.repeat(64) }),
    ({ prompt, pr, peers }) => honest(prompt, pr, peers, { err: 1, outcome: 'error' }),
    () => { throw new Error('boom') },
  ]) {
    const { calls, observed, logs } = await runTree((ctx) => (ctx.issue === 3 ? bad(ctx) : honest(ctx.prompt, ctx.pr, ctx.peers)))
    const mine = observed.filter((o) => o.issue === 3)
    assert.deepEqual(mine.map((o) => o.model), ['haiku', 'sonnet'])
    const labels = labelsOf(calls, 3)
    assert.ok(!labels.includes('fix:#3'))
    assert.ok(labels.includes('merge-exec:#3'), '従来どおりマージ実行（人手マージ待ちの確認）へ進む')
    assert.ok(logs.some((l) => l.includes('#3: 新規追加ファイルの衝突を確かめられなかった')))
  }
})
