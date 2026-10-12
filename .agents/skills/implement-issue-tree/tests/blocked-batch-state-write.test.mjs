// Issue #585: 着手できないノードの blocked 記録を 1 件 1 エージェント（state:update:#N）で行うと、
// 1,100 件規模のツリーで記録だけがエージェント数（1 ラン 1,000 回が上限）とトークンを使い切る。
// 是正後の契約を固定する:
//   1. blocked 確定分（依存失敗の連鎖 + 未着手）は patch を溜め、BLOCKED_STATE_CHUNK_SIZE 件ずつ
//      1 エージェント（state:update-batch:<n>）で直列に書く。件数 N に比例した起動をしない。
//   2. 保存済みの状態が同じ（status・note・pr が一致）項目は書かない。読めていない項目は書く。
//   3. args.dryRun: true は状態ファイル・worktree・実装系エージェントへ一切触れず、見積りを返す。
//   4. note は前 Phase 等の未完了番号を「件数 + 先頭 5 件」に縮める。
//   5. チャンクが失敗したとき、記録しようとした件数と書けた件数の差を返却値とログに出す。
//
// 検証の二層構造:
//   - 定義部をスライス import し、writeBlockedStateBatch 等を stub agent で直接実行する（単体）。
//   - 実装スクリプト全体を Workflow ランタイムと同じ評価形態（AsyncFunction）で stub agent に対して
//     実行し、エージェント起動のラベルと回数・返却値を観測する（結合）。実行する前に必ず
//     skills/implement-issue-tree/scripts/implement-issue-tree.src.js を対象にする。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'

const SCRIPT_PATH = process.env.IIT_BLOCKED_BATCH_SCRIPT_PATH ?? join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
const DIST_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.js')
const DRIVER_MARKER = ['__IMPLEMENT', 'ISSUE', 'TREE', 'DRIVER', 'START__'].join('_')

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)

globalThis.args = { parent: 1 }
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-blocked-batch-'))
const slicePath = join(sliceDir, 'implement-issue-tree-blocked-batch-defs.mjs')
// 旧実装（修正前）にはこれらの宣言が無い。RED 確認用に typeof ガードで存在しない名前を undefined にする。
const SLICE_EXPORTS = [
  'runStateAgent',
  'ensureBoundaryNonceSeed',
  'STATE_AGENT_MODEL_CHAIN',
  'declaredDepsChecksum',
  'outOfTreeStateChecksum',
  'sha256Hex',
  'canonicalJson',
  'parseDryRun',
  'formatIssueList',
  'isUnchangedStatePatch',
  'writeBlockedStateBatch',
  'estimateDispatch',
  'BLOCKED_STATE_CHUNK_SIZE',
]
// typeof で包んで書き出す: RED 確認時に旧実装を指しても import 自体は成功させ、各テストの失敗で示す。
const optionalExports = SLICE_EXPORTS.map((n) => `const __opt_${n} = typeof ${n} === 'undefined' ? undefined : ${n}`).join('\n')
const exportList = SLICE_EXPORTS.map((n) => `__opt_${n} as ${n}`).join(', ')
writeFileSync(slicePath, `${definitionPart}\n${optionalExports}\nexport { ${exportList} }\n`)
const mod = await import(pathToFileURL(slicePath).href)
const {
  runStateAgent, ensureBoundaryNonceSeed, declaredDepsChecksum, outOfTreeStateChecksum, sha256Hex, canonicalJson,
  parseDryRun, formatIssueList, isUnchangedStatePatch, writeBlockedStateBatch, estimateDispatch, BLOCKED_STATE_CHUNK_SIZE,
} = mod

globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: 'a'.repeat(64) } : null)
globalThis.log = () => {}
await ensureBoundaryNonceSeed()

function installAgentStub(behavior) {
  const calls = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    return behavior(opts, calls.length, prompt)
  }
  const logs = []
  globalThis.log = (m) => { logs.push(m) }
  return { calls, logs }
}

const entriesOf = (from, to, patch) => Array.from({ length: to - from + 1 }, (_, i) => ({ number: from + i, patch }))
const BLOCKED = { status: 'blocked', note: 'n', pr: 0 }
const batchCalls = (calls) => calls.filter((c) => /^state:update-batch:\d+$/.test(c.opts.label))

// ---------------------------------------------------------------------------
// 単体: 整形・比較・引数
// ---------------------------------------------------------------------------

test('parseDryRun: boolean のみ受理し、未指定は false、誤記（"true"）は throw する', () => {
  assert.equal(parseDryRun(undefined), false)
  assert.equal(parseDryRun(null), false)
  assert.equal(parseDryRun(true), true)
  assert.equal(parseDryRun(false), false)
  assert.throws(() => parseDryRun('true'), /args\.dryRun は boolean/)
  assert.throws(() => parseDryRun(1), /args\.dryRun は boolean/)
})

test('formatIssueList: 5 件以下は従来の "#a, #b" 形式のまま、6 件以上は「件数 + 先頭 5 件」に縮める', () => {
  assert.equal(formatIssueList([7]), '#7')
  assert.equal(formatIssueList([9, 3, 5]), '#3, #5, #9', '番号の昇順（ツリー取得順の揺れで note が変わらない）')
  assert.equal(formatIssueList([1, 2, 3, 4, 5]), '#1, #2, #3, #4, #5')
  const many = Array.from({ length: 300 }, (_, i) => i + 10)
  const s = formatIssueList(many)
  assert.equal(s, '300 件（先頭 5 件: #10, #11, #12, #13, #14）')
  assert.ok(!s.includes('#15'), '先頭 5 件より後の番号を並べない')
})

test('isUnchangedStatePatch: patch の全キーが保存済みと一致するときだけ true（未保存・キー欠落・値差は false）', () => {
  const saved = { type: 'implement', status: 'blocked', note: 'n', pr: 0, branch: '' }
  assert.equal(isUnchangedStatePatch(saved, BLOCKED), true)
  assert.equal(isUnchangedStatePatch(undefined, BLOCKED), false, '読めていない項目は省略せず書く')
  assert.equal(isUnchangedStatePatch({ ...saved, note: 'other' }, BLOCKED), false)
  assert.equal(isUnchangedStatePatch({ ...saved, pr: 42 }, BLOCKED), false, 'pr をクリアする必要がある項目は書く')
  assert.equal(isUnchangedStatePatch({ status: 'blocked', note: 'n' }, BLOCKED), false, 'pr キーが無ければ書く')
  assert.equal(isUnchangedStatePatch(saved, { status: 'blocked', note: 'n' }), true, 'pr を触らない patch は pr を比較しない')
})

// ---------------------------------------------------------------------------
// 単体: 一括書き込み
// ---------------------------------------------------------------------------

test('writeBlockedStateBatch: 件数 N に比例せず ceil(N / チャンク上限) 回のエージェントで書く（N=10 と N=250）', async () => {
  assert.equal(BLOCKED_STATE_CHUNK_SIZE, 100)
  for (const [n, expected] of [[10, 1], [100, 1], [101, 2], [250, 3], [1101, 12]]) {
    const { calls } = installAgentStub(() => ({ ok: true }))
    const r = await writeBlockedStateBatch(entriesOf(1, n, BLOCKED), {})
    assert.equal(batchCalls(calls).length, expected, `N=${n}`)
    assert.equal(calls.length, expected, 'フォールバックが無ければ 1 チャンク 1 回')
    assert.equal(r.requested, n)
    assert.equal(r.written, n)
    assert.equal(r.unwritten, 0)
    assert.equal(r.chunks, expected)
    assert.equal(r.failedChunks, 0)
  }
})

test('writeBlockedStateBatch: チャンクは直列に流れる（同時に 2 つのエージェントが動かない）', async () => {
  let active = 0
  let maxActive = 0
  installAgentStub(async () => {
    active++
    maxActive = Math.max(maxActive, active)
    await new Promise((r) => setTimeout(r, 2))
    active--
    return { ok: true }
  })
  await writeBlockedStateBatch(entriesOf(1, 350, BLOCKED), {})
  assert.equal(maxActive, 1)
})

test('writeBlockedStateBatch: 保存済みと同じ（blocked・同じ note・pr 0）の項目は書き込み対象から外す', async () => {
  const saved = Object.fromEntries(Array.from({ length: 50 }, (_, i) => [String(i + 1), { status: 'blocked', note: 'n', pr: 0 }]))
  const { calls } = installAgentStub(() => ({ ok: true }))
  const none = await writeBlockedStateBatch(entriesOf(1, 50, BLOCKED), saved)
  assert.equal(calls.length, 0, '全件が同一なら書き込みエージェントを起動しない')
  assert.equal(none.unchanged, 50)
  assert.equal(none.attempted, 0)
  assert.equal(none.requested, 50)

  const half = await writeBlockedStateBatch(entriesOf(1, 80, BLOCKED), saved)
  assert.equal(calls.length, 1)
  assert.equal(half.unchanged, 50)
  assert.equal(half.attempted, 30)
  assert.equal(half.written, 30)
  // 書き込みプロンプトに載るのは未保存の 51..80 だけ
  const sent = JSON.parse(calls[0].prompt.split('\n').find((l) => l.startsWith('[{"numbers"')))
  assert.deepEqual(sent.flatMap((g) => g.numbers), Array.from({ length: 30 }, (_, i) => 51 + i))
})

test('writeBlockedStateBatch: note が違う・状態が読めていない項目は省略しない', async () => {
  const { calls } = installAgentStub(() => ({ ok: true }))
  const r = await writeBlockedStateBatch(
    [{ number: 1, patch: BLOCKED }, { number: 2, patch: BLOCKED }, { number: 3, patch: BLOCKED }],
    { 1: { status: 'blocked', note: '古い note', pr: 0 }, 2: { status: 'pending', note: '', pr: 0 } },
  )
  assert.equal(r.unchanged, 0)
  assert.equal(r.attempted, 3)
  assert.equal(calls.length, 1)
})

test('writeBlockedStateBatch: 同一 patch は numbers へ束ね、PR を持つ再開情報のキー（pr 省略）も patch のまま載せる', async () => {
  const { calls } = installAgentStub(() => ({ ok: true }))
  const keep = { status: 'blocked', note: 'unverified' } // prClearPatch が {} のとき pr キーを書かない
  await writeBlockedStateBatch([...entriesOf(1, 3, BLOCKED), { number: 9, patch: keep }], {})
  const groups = JSON.parse(calls[0].prompt.split('\n').find((l) => l.startsWith('[{"numbers"')))
  assert.deepEqual(groups, [{ numbers: [1, 2, 3], patch: BLOCKED }, { numbers: [9], patch: keep }])
  assert.equal('pr' in groups[1].patch, false, '保存済み pr を消さない')
})

test('writeBlockedStateBatch: プロンプトは未信頼範囲の境界・TEMP_FILE_POLICY を含み、jq は --slurpfile で値を渡す', async () => {
  const { calls } = installAgentStub(() => ({ ok: true }))
  await writeBlockedStateBatch(entriesOf(1, 2, BLOCKED), {})
  const p = calls[0].prompt
  assert.match(p, /UNTRUSTED_[0-9a-z]+_BEGIN/)
  assert.match(p, /UNTRUSTED_[0-9a-z]+_END/)
  assert.match(p, /一時ファイル配置規則/)
  assert.match(p, /jq --slurpfile groups "\$groups_file"/)
  assert.match(p, /cat <<'GROUPS_EOF_[0-9a-z]+' > "\$groups_file"/)
})

test('writeBlockedStateBatch: haiku が未返却なら同一プロンプトで sonnet へ 1 回フォールバックする（#493 の対象に含まれる）', async () => {
  const { calls } = installAgentStub((opts) => (opts.model === 'haiku' ? null : { ok: true }))
  const r = await writeBlockedStateBatch(entriesOf(1, 5, BLOCKED), {})
  assert.equal(calls.length, 2)
  assert.deepEqual(calls.map((c) => c.opts.model), ['haiku', 'sonnet'])
  assert.equal(calls[0].prompt, calls[1].prompt)
  assert.equal(calls[0].opts.label, 'state:update-batch:1')
  assert.equal(calls[1].opts.label, 'state:update-batch:1:fallback-sonnet')
  assert.equal(r.written, 5)
  assert.equal(r.failedChunks, 0)
})

test('writeBlockedStateBatch: 途中のチャンクが失敗しても続行し、記録しようとした件数と書けた件数の差を返す', async () => {
  const { calls, logs } = installAgentStub((opts) => ({ ok: !opts.label.startsWith('state:update-batch:2') }))
  const r = await writeBlockedStateBatch(entriesOf(1, 250, BLOCKED), {})
  assert.equal(batchCalls(calls).length, 3, '失敗したチャンクの後も残りを書く（updateState 失敗時の既存の扱いと同じ続行）')
  assert.equal(r.requested, 250)
  assert.equal(r.attempted, 250)
  assert.equal(r.written, 150)
  assert.equal(r.unwritten, 100)
  assert.equal(r.failedChunks, 1)
  assert.deepEqual(r.unwrittenIssues.slice(0, 3), [101, 102, 103])
  assert.ok(logs.some((l) => l.includes('state:update-batch:2') && l.includes('ok:false')))
})

test('writeBlockedStateBatch: StructuredOutput 未返却（haiku / sonnet とも）のチャンクも未書き込みに数える', async () => {
  installAgentStub(() => null)
  const r = await writeBlockedStateBatch(entriesOf(1, 120, BLOCKED), {})
  assert.equal(r.written, 0)
  assert.equal(r.unwritten, 120)
  assert.equal(r.failedChunks, 2)
})

test('writeBlockedStateBatch: 同じ番号は最後の patch を採用する（連鎖で 2 度確定しても 1 件）', async () => {
  const { calls } = installAgentStub(() => ({ ok: true }))
  const r = await writeBlockedStateBatch([{ number: 4, patch: { ...BLOCKED, note: 'a' } }, { number: 4, patch: { ...BLOCKED, note: 'b' } }], {})
  assert.equal(r.requested, 1)
  const groups = JSON.parse(calls[0].prompt.split('\n').find((l) => l.startsWith('[{"numbers"')))
  assert.deepEqual(groups, [{ numbers: [4], patch: { ...BLOCKED, note: 'b' } }])
})

// ---------------------------------------------------------------------------
// 単体: 見積り（estimateDispatch）
// ---------------------------------------------------------------------------

test('estimateDispatch: 着手見込み・ツリー外前提待ち・phaseGate・下流を分類し、状態を変更しない', () => {
  const work = [2, 3, 4, 5, 6].map((number) => ({ number }))
  const depsMap = new Map([
    [2, new Set()],
    [3, new Set([900])], // ツリー外の open
    [4, new Set([3])], // 3 の下流
    [5, new Set([2])], // 着手見込みの 2 の下流（2 が成功する前提で着手見込み）
    [6, new Set([2])], // phaseGate 辺
  ])
  const done = new Set()
  const failed = new Set([900])
  const r = estimateDispatch(work, depsMap, done, failed, { outOfTreeWait: new Set([900]), phaseGateEdgeKeys: new Set(['6->2']) })
  assert.deepEqual(r.startable, [2, 5, 6])
  assert.equal(r.readyNow, 1)
  assert.deepEqual(r.blocked, { outOfTree: [3], phaseGate: [], downstream: [4], optinTestsInvalid: [], savedBranchMismatch: [] })
  assert.deepEqual([...done], [], '入力の done を書き換えない')
  assert.deepEqual([...failed], [900], '入力の failedSet を書き換えない')
})

test('estimateDispatch: phaseGate 辺の先が失敗済みなら phaseGate に分類する', () => {
  const work = [10, 11].map((number) => ({ number }))
  const depsMap = new Map([[10, new Set([900])], [11, new Set([10])]])
  const r = estimateDispatch(work, depsMap, new Set(), new Set([900]), { outOfTreeWait: new Set([900]), phaseGateEdgeKeys: new Set(['11->10']) })
  assert.deepEqual(r.blocked, { outOfTree: [10], phaseGate: [11], downstream: [], optinTestsInvalid: [], savedBranchMismatch: [] })
})

test('estimateDispatch: 前提を満たしても自身が実行前ゲートで blocked になるノードは着手見込みに入れず、下流へ伝播する', () => {
  const work = [20, 21, 22, 23, 24].map((number) => ({ number }))
  const depsMap = new Map([
    [20, new Set()], // opt-in 宣言不備の葉
    [21, new Set([20])], // 20 の下流
    [22, new Set()], // 保存済み branch が別 issue の命名
    [23, new Set([900])], // 依存で止まる。自身も宣言不備だが、実行されないので依存側に分類する
    [24, new Set()], // 正常
  ])
  const selfBlocked = new Map([[20, 'optinTestsInvalid'], [22, 'savedBranchMismatch'], [23, 'optinTestsInvalid']])
  const r = estimateDispatch(work, depsMap, new Set(), new Set([900]), { outOfTreeWait: new Set([900]), phaseGateEdgeKeys: new Set(), selfBlocked })
  assert.deepEqual(r.startable, [24])
  assert.equal(r.readyNow, 1, '自身が blocked になるノードは「今すぐ着手できる」に数えない')
  assert.deepEqual(r.blocked, { outOfTree: [23], phaseGate: [], downstream: [21], optinTestsInvalid: [20], savedBranchMismatch: [22] })
})

// ---------------------------------------------------------------------------
// 結合: 実装スクリプト全体を stub agent で実行する
// ---------------------------------------------------------------------------

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const scriptBody = stripMetaExport(source)
const OOT = 9999

// nodes: [{ number, parent, state?, dependsOn? }]。siblingIndex・subIssuesTotal は構造から補う。
function buildTree(specs) {
  const kids = new Map()
  for (const s of specs) kids.set(s.parent, [...(kids.get(s.parent) ?? []), s.number])
  return specs.map((s) => ({
    number: s.number,
    title: `issue ${s.number}`,
    state: s.state ?? 'open',
    parent: s.parent,
    siblingIndex: s.parent === 0 ? 0 : kids.get(s.parent).indexOf(s.number),
    dependsOn: s.dependsOn ?? [],
    ...(s.optinTests ? { optinTests: s.optinTests } : {}),
    subIssuesTotal: (kids.get(s.number) ?? []).length,
  }))
}

function stateVerifyFor(items) {
  const keys = Object.keys(items).sort()
  return {
    fileExists: true,
    hashes: Object.fromEntries(keys.map((k) => [k, sha256Hex(canonicalJson(items[k]))])),
    keysSha256: sha256Hex(canonicalJson(keys)),
    keysCount: keys.length,
    highWaterBytes: 0,
    highWaterVersion: 0,
  }
}

async function runScript({ args, nodes, saved = null, ootStates = { [OOT]: 'OPEN' }, batchOk = () => true }) {
  const calls = []
  const logs = []
  const handler = (prompt, opts) => {
    const label = opts.label
    if (label === 'nonce:seed') return { seedHex: 'b'.repeat(64) }
    if (label === 'worktree:untracked-scan') return { count: 0, paths: [] }
    if (label === 'state:load') {
      return { ok: true, fileExisted: saved !== null, items: saved ?? {}, highWaterBytes: 0, highWaterVersion: saved ? 2 : 0 }
    }
    if (label === 'state:load-verify') {
      if (saved === null) return { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 }
      return { ...stateVerifyFor(saved), highWaterVersion: 2 }
    }
    // スクリプトが返却ノードを書き換える（optinTests の採用結果）ため、実行ごとに複製して返す。
    if (label === 'plan:issue-tree') return { nodes: structuredClone(nodes) }
    if (label === 'detect:external-checks') return { apps: [] }
    if (label.startsWith('plan:declared-deps')) {
      const m = /for n in ([0-9 ]+); do/.exec(prompt)
      return { entries: m[1].trim().split(' ').map(Number).map((n) => ({ number: n, deps: [], sig: declaredDepsChecksum(n, []) })) }
    }
    if (label.startsWith('plan:root-ancestors')) return { fetched: true, chain: [{ number: args.parent, parent: 0 }] }
    if (label.startsWith('plan:out-of-tree-deps')) {
      const m = /for n in ([0-9 ]+); do/.exec(prompt)
      return { entries: m[1].trim().split(' ').map(Number).map((n) => ({ number: n, state: ootStates[n] ?? 'OPEN', sig: outOfTreeStateChecksum(n, ootStates[n] ?? 'OPEN') })) }
    }
    if (label === 'state:init-all') return { ok: true }
    if (/^state:update-batch:\d+/.test(label)) return { ok: batchOk(label) }
    if (label.startsWith('state:')) return { ok: true }
    return null
  }
  const agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    return handler(prompt, opts)
  }
  const fn = new AsyncFunction('args', 'agent', 'log', 'phase', scriptBody)
  const result = await fn(args, agent, (m) => { logs.push(m) }, () => {})
  return { result, calls, logs }
}

// 親 1 の直下に N 個の leaf を置き、全 leaf がツリー外の open な前提 #9999 に依存する。
const leafNodes = (n) => buildTree([
  { number: 1, parent: 0 },
  ...Array.from({ length: n }, (_, i) => ({ number: 2 + i, parent: 1, dependsOn: [OOT] })),
])

// バッチ書き込みのプロンプトから { 番号 → patch } を復元する。
function patchesFromBatchCalls(calls) {
  const out = {}
  for (const c of batchCalls(calls)) {
    for (const g of JSON.parse(c.prompt.split('\n').find((l) => l.startsWith('[{"numbers"')))) {
      for (const n of g.numbers) out[n] = g.patch
    }
  }
  return out
}

test('結合: ツリー外前提待ちのノードが N 件でも、blocked 記録のエージェント回数は ceil((N+1) / 上限)（N=10 と N=250）', async () => {
  for (const [n, expected] of [[10, 1], [250, 3]]) {
    const { result, calls } = await runScript({ args: { parent: 1 }, nodes: leafNodes(n) })
    assert.equal(batchCalls(calls).length, expected, `N=${n}`)
    assert.equal(calls.filter((c) => c.opts.label.startsWith('state:update:#')).length, 0, '1 件ごとの state:update を起動しない')
    const patches = patchesFromBatchCalls(calls)
    assert.equal(Object.keys(patches).length, n + 1, '葉 N 件 + 子の保留で blocked の親 1 件')
    assert.ok(Object.values(patches).every((p) => p.status === 'blocked' && p.pr === 0))
    assert.equal(result.blockedStateWrite.requested, n + 1)
    assert.equal(result.blockedStateWrite.written, n + 1)
    assert.equal(result.blockedStateWrite.unwritten, 0)
    assert.equal(result.done.filter((d) => d.status === 'blocked').length, n + 1, 'results への追記は従来どおり全件')
    assert.equal(result.failures.length, n, '葉はツリー外前提待ちとして failures にも載る（halt 非カウント）')
    assert.equal(result.halted, null, 'blocked は halt に数えない')
  }
})

test('結合: 同じ引数で再実行しても、保存済みと同じ blocked・note のノードには書き込みエージェントが起動しない', async () => {
  const nodes = leafNodes(30)
  const first = await runScript({ args: { parent: 1 }, nodes })
  const patches = patchesFromBatchCalls(first.calls)
  assert.equal(Object.keys(patches).length, 31)
  const saved = Object.fromEntries(
    Object.entries(patches).map(([n, p]) => [n, { type: 'implement', status: 'pending', pr: 0, branch: '', worktree: '', fixCount: 0, ...p }]),
  )
  const second = await runScript({ args: { parent: 1 }, nodes, saved })
  assert.equal(batchCalls(second.calls).length, 0, '変化が無ければ書かない')
  assert.equal(second.result.blockedStateWrite.requested, 31)
  assert.equal(second.result.blockedStateWrite.unchanged, 31)
  assert.equal(second.result.blockedStateWrite.written, 0)
  assert.equal(second.result.done.filter((d) => d.status === 'blocked').length, 31, '報告（results）は書き込みの有無によらず全件')

  // 一部だけ note が違えばその分だけ書く
  const drifted = { ...saved, 5: { ...saved[5], note: '古い note' } }
  const third = await runScript({ args: { parent: 1 }, nodes, saved: drifted })
  assert.equal(batchCalls(third.calls).length, 1)
  assert.deepEqual(Object.keys(patchesFromBatchCalls(third.calls)), ['5'])
})

test('結合: 途中のチャンクが失敗すると、返却値とログから件数のずれが分かる', async () => {
  const { result, logs } = await runScript({
    args: { parent: 1 },
    nodes: leafNodes(250),
    batchOk: (label) => !label.startsWith('state:update-batch:2'),
  })
  assert.equal(result.blockedStateWrite.requested, 251)
  assert.equal(result.blockedStateWrite.written, 151)
  assert.equal(result.blockedStateWrite.unwritten, 100)
  assert.equal(result.blockedStateWrite.failedChunks, 1)
  assert.equal(result.done.filter((d) => d.status === 'blocked').length, 251, 'results は 251 件のまま（状態ファイルとの差が 100 件）')
  assert.ok(logs.some((l) => l.includes('100 件を書けなかった') && l.includes('1,000')), 'ずれと上限の可能性をログに出す')
})

test('結合: phaseGate の note は前 Phase の未完了番号を「件数 + 先頭 5 件」に縮める', async () => {
  // Phase 1 = ノード 2（葉 30 件。すべてツリー外前提待ち）、Phase 2 = ノード 33（葉）。
  const nodes = buildTree([
    { number: 1, parent: 0 },
    { number: 2, parent: 1 },
    ...Array.from({ length: 30 }, (_, i) => ({ number: 3 + i, parent: 2, dependsOn: [OOT] })),
    { number: 33, parent: 1 },
  ])
  const { result, calls } = await runScript({ args: { parent: 1, phaseGate: true }, nodes })
  const patches = patchesFromBatchCalls(calls)
  assert.equal(patches[33].note, '前 Phase 未完了（phaseGate）により未着手: 30 件（先頭 5 件: #3, #4, #5, #6, #7）')
  assert.ok(patches[33].note.length < 120)
  assert.equal(result.done.find((d) => d.issue === 33).note, patches[33].note, '報告の note も同じ形')
  // ツリー外前提待ちの note は 5 件以下なら従来文言のまま
  assert.equal(patches[3].note, 'ツリー外の前提イシュー #9999 が open のため未着手（close 後に再実行すると着手する）')
})

test('結合: ツリー外前提が 6 件以上のノードの note も「件数 + 先頭 5 件」になる', async () => {
  const deps = [9101, 9102, 9103, 9104, 9105, 9106, 9107]
  const nodes = buildTree([{ number: 1, parent: 0 }, { number: 2, parent: 1, dependsOn: deps }])
  const { calls } = await runScript({ args: { parent: 1 }, nodes, ootStates: {} })
  const patches = patchesFromBatchCalls(calls)
  assert.equal(patches[2].note, 'ツリー外の前提イシュー 7 件（先頭 5 件: #9101, #9102, #9103, #9104, #9105） が open のため未着手（close 後に再実行すると着手する）')
})

test('結合: dryRun は状態ファイル・worktree・実装系のエージェントを 1 回も起動せず、件数と一覧を返す', async () => {
  // 2: 着手見込み / 3: ツリー外の前提待ち / 4: 3 の下流 / 1: 子が止まるため保留
  const nodes = buildTree([
    { number: 1, parent: 0 },
    { number: 2, parent: 1 },
    { number: 3, parent: 1, dependsOn: [OOT] },
    { number: 4, parent: 1, dependsOn: [3] },
  ])
  const { result, calls, logs } = await runScript({ args: { parent: 1, dryRun: true }, nodes })
  const labels = calls.map((c) => c.opts.label)
  for (const forbidden of [/^state:update/, /^state:cleanup/, /^state:init-all/, /^state:high-water/, /^worktree:(?!untracked-scan)/, /^(plan|impl|review|fix|merge|monitor|pr)[:\-]#/, /^recover:/]) {
    assert.deepEqual(labels.filter((l) => forbidden.test(l)), [], `起動してはならない: ${forbidden}`)
  }
  assert.ok(calls.every((c) => !c.opts.isolation), 'worktree 隔離のエージェントを起動しない')
  assert.ok(calls.every((c) => !c.prompt.includes('mkdir -p _/issue-trees')), '状態ファイルの新規作成指示を含めない')
  assert.equal(result.dryRun, true)
  assert.deepEqual(result.startable, { count: 1, readyNow: 1, first: [2] })
  assert.equal(result.blocked.count, 3)
  assert.deepEqual(result.blocked.outOfTree, { count: 1, first: [3] })
  assert.deepEqual(result.blocked.downstream, { count: 2, first: [4, 1] })
  assert.deepEqual(result.blocked.phaseGate, { count: 0, first: [] })
  assert.deepEqual(result.blocked.optinTestsInvalid, { count: 0, first: [] })
  assert.deepEqual(result.outOfTreeDeps.open, [OOT])
  assert.equal(result.total, 4)
  assert.ok(logs.some((l) => l.startsWith('dryRun:')))
})

test('結合: dryRun は opt-in 宣言不備の葉とその下流を blocked に数え、着手見込みに入れない（通常実行の runImplement ゲートと一致）', async () => {
  // 2: 承認一覧（args.optinTestCommands 未指定）に無い宣言を持つ葉 / 3: 2 の下流 / 4: 正常
  const nodes = buildTree([
    { number: 1, parent: 0 },
    { number: 2, parent: 1, optinTests: ['make deploy'] },
    { number: 3, parent: 1, dependsOn: [2] },
    { number: 4, parent: 1 },
  ])
  const dry = await runScript({ args: { parent: 1, dryRun: true }, nodes })
  assert.deepEqual(dry.result.startable, { count: 1, readyNow: 1, first: [4] })
  assert.deepEqual(dry.result.blocked.optinTestsInvalid, { count: 1, first: [2] })
  assert.deepEqual(dry.result.blocked.downstream, { count: 2, first: [3, 1] })
  assert.equal(dry.result.blocked.count, 3)
  // 通常実行でも 2 は blocked（halt 非カウント）で、3 と 1 は前提失敗で止まる。dryRun の見積りと同じ集合。
  // 残置上限ゲートは stub に worktree 一覧が無く新規着手を抑止してしまうため無効化する。
  const real = await runScript({ args: { parent: 1, maxResidualWorktrees: 0, maxResidualWorktreeBytes: 0 }, nodes })
  const blockedReal = real.result.done.filter((d) => d.status === 'blocked').map((d) => d.issue).sort((a, b) => a - b)
  assert.deepEqual(blockedReal, [1, 2, 3])
})

test('結合: dryRun は状態ファイルの branch が本イシューの命名でないノードを blocked（savedBranchMismatch）に数える', async () => {
  const nodes = buildTree([{ number: 1, parent: 0 }, { number: 5, parent: 1 }, { number: 6, parent: 1 }])
  const saved = { 5: { type: 'implement', status: 'pending', pr: 0, branch: 'feat/999-other', worktree: '', fixCount: 0, note: '' } }
  const { result } = await runScript({ args: { parent: 1, dryRun: true }, nodes, saved })
  assert.deepEqual(result.blocked.savedBranchMismatch, { count: 1, first: [5] })
  assert.deepEqual(result.startable.first, [6])
})

test('結合: dryRun の phaseGate 内訳 — 前 Phase がツリー外前提待ちなら後続は phaseGate に数える', async () => {
  const nodes = buildTree([
    { number: 1, parent: 0 },
    { number: 2, parent: 1, dependsOn: [OOT] },
    { number: 3, parent: 1 },
  ])
  const { result, calls } = await runScript({ args: { parent: 1, dryRun: true, phaseGate: true }, nodes })
  assert.equal(calls.filter((c) => /^state:(update|init-all|cleanup)/.test(c.opts.label)).length, 0)
  assert.equal(result.startable.count, 0)
  assert.deepEqual(result.blocked.outOfTree.first, [2])
  assert.deepEqual(result.blocked.phaseGate.first, [3])
})

test('結合: dryRun でない通常ランの返却には dryRun を含まず、blockedStateWrite を含む', async () => {
  const { result } = await runScript({ args: { parent: 1 }, nodes: leafNodes(3) })
  assert.equal('dryRun' in result, false)
  assert.ok(result.blockedStateWrite)
})

// ---------------------------------------------------------------------------
// 配線（ソース走査）
// ---------------------------------------------------------------------------

test('配線: markBlockedByDeps と未着手ループは updateState を直接呼ばず blockedStateBatch へ溜める', () => {
  const start = driverPart.indexOf('async function markBlockedByDeps(')
  const body = driverPart.slice(start, driverPart.indexOf('\n}\n', start))
  assert.doesNotMatch(body, /updateState\(/)
  assert.match(body, /blockedStateBatch\.push\(/)
  const loopStart = driverPart.indexOf('for (const n of notStarted) {')
  const loop = driverPart.slice(loopStart, driverPart.indexOf('\n}\n', loopStart))
  assert.doesNotMatch(loop, /updateState\(/)
  assert.match(loop, /blockedStateBatch\.push\(/)
})

test('配線: 一括書き込みは終了時の孤立 worktree 判定（loadState 再読込）より前に 1 回だけ呼ばれる', () => {
  const calls = [...driverPart.matchAll(/await writeBlockedStateBatch\(/g)]
  assert.equal(calls.length, 1)
  const reload = driverPart.indexOf('const fresh = await enqueueStateWrite(() => loadState())')
  assert.ok(reload > 0 && calls[0].index < reload)
  assert.match(driverPart, /writeBlockedStateBatch\(blockedStateBatch, savedItems\)/)
})

test('配線: 新ラベル state:update-batch は runStateAgent 経由で、sonnet フォールバックと meta の説明に登録されている', () => {
  const fnStart = source.indexOf('async function writeBlockedStateChunk(')
  const fn = source.slice(fnStart, source.indexOf('\n}\n', fnStart))
  assert.match(fn, /await runStateAgent\(/)
  assert.doesNotMatch(fn, /await agent\(/, 'agent() 直呼びだと #493 の sonnet フォールバックが効かない')
  assert.match(fn, /schema: STATE_WRITE_SCHEMA/)
  const metaDetail = source.slice(0, source.indexOf('FILE MAP')).split('\n').find((l) => l.includes("title: 'State'"))
  assert.match(metaDetail, /state:update-batch/)
  assert.match(source, /state:update-batch:\$\{i \+ 1\}/)
})

test('配線: dryRun は状態の初期化・孤立記録・残置実測より前で分岐せず、それらをガードし、分岐は dispatch の前にある', () => {
  assert.match(driverPart, /if \(!dryRunEnabled\) await initAllPending\(/)
  assert.match(driverPart, /\nif \(!dryRunEnabled\) \{\n  const runStartOrphanEntries = await scanOrphanWorktrees\(\)/)
  const branch = driverPart.indexOf('\nif (dryRunEnabled) {')
  const running = driverPart.indexOf('\nconst running = new Map()')
  const initAll = driverPart.indexOf('initAllPending(queue.filter')
  const depsBuilt = driverPart.indexOf('let cycle = findDependencyCycle()')
  assert.ok(initAll > 0 && initAll < branch, '初期化（ガード付き）は分岐より前の記述位置')
  assert.ok(depsBuilt > 0 && depsBuilt < branch && branch < running, '依存解決の後・dispatch の前で分岐する')
  const block = driverPart.slice(branch, running)
  assert.doesNotMatch(block, /updateState|initAllPending|writeBlockedStateBatch|agent\(|runStateAgent|enqueueStateWrite/)
  assert.match(block, /return \{\n    dryRun: true,/)
})

test('配線: dryRun の loadState はファイルを新規作成しない（読み取り専用の指示に切り替える）', () => {
  const start = source.indexOf('async function loadState(')
  const fn = source.slice(start, source.indexOf('\n  // 読み込み・初期化のいずれが失敗しても停止する', start))
  assert.match(fn, /const readOnly = dryRunEnabled/)
  assert.match(fn, /読み取り専用のためディレクトリもファイルも作らない/)
})

test('生成物 implement-issue-tree.js にも一括記録と dryRun が存在する（ビルド漏れ検知）', () => {
  const dist = readFileSync(DIST_PATH, 'utf8')
  assert.match(dist, /BLOCKED_STATE_CHUNK_SIZE/)
  assert.match(dist, /state:update-batch:/)
  assert.match(dist, /function estimateDispatch\(/)
  assert.match(dist, /dryRun: true,/)
})
