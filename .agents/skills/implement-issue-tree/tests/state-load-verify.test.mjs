// 状態ファイル読込の内容照合（state:load-verify）と PR・issue の結び付け照合の回帰テスト。
//
// 事故（Phase 6 ラン）: state:load の haiku が約 48KB の状態ファイルをツール出力の 2KB プレビュー
// でしか見られず、残りの items を推測で埋めて返した（PR 番号は issue 番号 + 1006 の連番の捏造。
// 件数は実ファイルと一致）。isValidStateLoadResult は型と形しか見ないため採用され、runOne の
// resumable 判定・monitor / merge-exec の MERGED 受理が headRefName を照合しなかったため、未実装の
// issue が別 issue の MERGED PR で close された。
//
// 検証の三層構造（state-write-fallback.test.mjs と同型）:
//   1. 純粋関数（sha256Hex / canonicalJson / verifyLoadedItems / prBindingProblem）の入出力表。
//      canonicalJson の期待値は jq 1.8.1 の `jq -jcS` 出力の sha256 を固定値として埋め込む
//      （テストから jq を呼ばない。ランナーの jq バージョン差で揺れないため）。
//   2. スタブ agent による loadState の振る舞い（捏造 items・検証未返却・新規作成）。
//   3. ソース走査（配線検証）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const SCRIPT_PATH = join(HERE, '..', 'scripts', 'implement-issue-tree.src.js')
const SAMPLE_STATE_PATH = join(HERE, '..', 'sample', 'state-example.json')
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const driverPart = source.slice(markerIndex)

globalThis.args = { parent: 1 }

const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-state-verify-'))
const slicePath = join(sliceDir, 'implement-issue-tree-state-verify-defs.mjs')
const SLICE_EXPORTS = [
  'sha256Hex',
  'canonicalJson',
  'verifyLoadedItems',
  'prBindingProblem',
  'isValidBranchName',
  'branchMatchesIssue',
  'loadState',
  'mergeVerifyPrompt',
  'monitorPrompt',
  'mergeExecutePrompt',
  'checkPrBinding',
  'isValidStateVerifyResult',
  'applyPrereqTransitions',
  'normalizeBlockedReason',
  'MERGE_SCHEMA',
  'MERGE_VERIFY_SCHEMA',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const {
  sha256Hex,
  canonicalJson,
  verifyLoadedItems,
  prBindingProblem,
  isValidBranchName,
  branchMatchesIssue,
  loadState,
  mergeVerifyPrompt,
  monitorPrompt,
  mergeExecutePrompt,
  checkPrBinding,
  isValidStateVerifyResult,
  applyPrereqTransitions,
  normalizeBlockedReason,
  MERGE_SCHEMA,
  MERGE_VERIFY_SCHEMA,
} = await import(pathToFileURL(slicePath).href)

const nodeSha = (s) => createHash('sha256').update(s, 'utf8').digest('hex')
// 検証側が返す keysSha256 の期待値（hashes のキー一覧の jq 正規形の sha256）。
const keysOf = (hashes) => sha256Hex(canonicalJson(Object.keys(hashes).sort()))

// jq 1.8.1 で `jq -jcS --arg k "$k" '.items[$k]' sample/state-example.json | sha256sum` を実行した値。
const SAMPLE_JQ_HASHES = {
  42: 'c343d27a932798c0bb87a2c0d22c7427423b8a824d004e9ebfc53cfaf92668ae',
  43: 'bdb65d91dd3b17fd64c574c0a0843f84b84d5237607f80b1652be74a1a538fdc',
  44: '3ade2ae5dbeedcc16c6cf2619797ee85b97e49c2e48dee69a6e4395818d6dcbb',
  45: '9aba53f4b220229b479b32bde109a0cd1e422c06b26db2e78c19eeb600dbdee9',
}
const sampleItems = JSON.parse(readFileSync(SAMPLE_STATE_PATH, 'utf8')).items

// ---------------------------------------------------------------------------
// 層 1: 純粋関数
// ---------------------------------------------------------------------------

test('sha256Hex は node:crypto と一致する（ASCII・日本語・絵文字・DEL・空文字・ブロック境界長）', () => {
  const inputs = ['', 'abc', '状態ファイル', '😀𝒜', 'a\x7fb', 'x'.repeat(55), 'x'.repeat(56), 'y'.repeat(64), 'z'.repeat(1000)]
  for (const s of inputs) assert.equal(sha256Hex(s), nodeSha(s), JSON.stringify(s.slice(0, 20)))
})

test('canonicalJson + sha256Hex は jq -jcS | sha256sum と一致する（sample/state-example.json の全項目）', () => {
  assert.deepEqual(Object.keys(sampleItems).sort(), Object.keys(SAMPLE_JQ_HASHES).sort())
  for (const [k, expected] of Object.entries(SAMPLE_JQ_HASHES)) {
    assert.equal(sha256Hex(canonicalJson(sampleItems[k])), expected, `item ${k}`)
  }
})

test('canonicalJson はキー昇順・空白なし・DEL を \\u007f へエスケープする（jq 1.8.1 の実測出力と一致）', () => {
  const v = { s: 'a\x7fb\x01\x1f\t\n\\" é😀/<>&', n: [1, -2, 0, 123456789], z: null, t: true, o: { b: 1, a: { d: [], c: {} } }, キー: '値' }
  const jqOut = '{"n":[1,-2,0,123456789],"o":{"a":{"c":{},"d":[]},"b":1},"s":"a\\u007fb\\u0001\\u001f\\t\\n\\\\\\" é😀/<>&","t":true,"z":null,"キー":"値"}'
  assert.equal(canonicalJson(v), jqOut)
  assert.equal(sha256Hex(canonicalJson(v)), 'e145292f5956db2bc57183b563ea1fc2d14fed1cb5f16f5a1a6eefc68a7e6c2f')
})

test('verifyLoadedItems: 実ファイルと同一の items は全件採用し verified: true', () => {
  const r = verifyLoadedItems(sampleItems, { fileExists: true, hashes: SAMPLE_JQ_HASHES })
  assert.deepEqual(Object.keys(r.adopted).sort(), ['42', '43', '44', '45'])
  assert.deepEqual(r.dropped, [])
  assert.equal(r.verified, true)
})

test('verifyLoadedItems: 件数一致でも PR 番号を捏造（issue 番号 + 1006）した items は 1 件も採用しない', () => {
  const fabricated = Object.fromEntries(
    Object.entries(sampleItems).map(([k, v]) => [k, { ...v, pr: Number(k) + 1006 }]),
  )
  assert.equal(Object.keys(fabricated).length, Object.keys(SAMPLE_JQ_HASHES).length)
  const r = verifyLoadedItems(fabricated, { fileExists: true, hashes: SAMPLE_JQ_HASHES })
  assert.deepEqual(r.adopted, {})
  assert.deepEqual(r.dropped.sort(), ['42', '43', '44', '45'])
  // 実ファイルに状態がある項目は「状態なし」ではなく state-unverified として扱わせる。
  assert.deepEqual(r.unverified.sort(), ['42', '43', '44', '45'])
  assert.equal(r.verified, false)
})

test('verifyLoadedItems: 一部だけ捏造された場合は一致した項目のみ採用する（項目単位の fail-closed）', () => {
  const partly = { ...sampleItems, 44: { ...sampleItems[44], branch: 'feat/359-other-issue' } }
  const r = verifyLoadedItems(partly, { fileExists: true, hashes: SAMPLE_JQ_HASHES })
  assert.deepEqual(Object.keys(r.adopted).sort(), ['42', '43', '45'])
  assert.deepEqual(r.dropped, ['44'])
  assert.deepEqual(r.unverified, ['44'])
  assert.equal(r.verified, false)
})

test('verifyLoadedItems: 読込側が項目を省いた場合は採用分が一致しても verified: false', () => {
  const { 45: _omitted, ...rest } = sampleItems
  const r = verifyLoadedItems(rest, { fileExists: true, hashes: SAMPLE_JQ_HASHES })
  assert.deepEqual(Object.keys(r.adopted).sort(), ['42', '43', '44'])
  assert.deepEqual(r.dropped, [])
  assert.deepEqual(r.unverified, ['45'])
  assert.equal(r.verified, false)
})

test('verifyLoadedItems: 検証側にハッシュが無い読込側のキーも state-unverified にする（捏造か取りこぼしか区別できない。Codex P1）', () => {
  const r = verifyLoadedItems({ ...sampleItems, 365: { status: 'merged', pr: 1371 } }, { fileExists: true, hashes: SAMPLE_JQ_HASHES })
  assert.deepEqual(Object.keys(r.adopted).sort(), ['42', '43', '44', '45'])
  assert.deepEqual(r.dropped, ['365'])
  assert.deepEqual(r.unverified, ['365'])
  assert.equal(r.verified, false)
})

test('verifyLoadedItems: 検証側が一部・全部のハッシュを返さない場合、保存済み項目を状態なしにせず state-unverified にする（Codex P1）', () => {
  const { 44: _missing, ...partialHashes } = SAMPLE_JQ_HASHES
  const partial = verifyLoadedItems(sampleItems, { fileExists: true, hashes: partialHashes })
  assert.deepEqual(Object.keys(partial.adopted).sort(), ['42', '43', '45'])
  assert.deepEqual(partial.unverified, ['44'])
  assert.equal(partial.verified, false)
  const none = verifyLoadedItems(sampleItems, { fileExists: true, hashes: {} })
  assert.deepEqual(none.adopted, {})
  assert.deepEqual(none.unverified.sort(), ['42', '43', '44', '45'])
  // 和集合の性質: 採用されなかった issue 番号キーはすべて unverified に入る（読込側・検証側どちら由来でも）
  const loaderOnly = { 42: sampleItems[42], 500: { status: 'monitoring', pr: 9 } }
  const mixed = verifyLoadedItems(loaderOnly, { fileExists: true, hashes: { 42: SAMPLE_JQ_HASHES[42], 43: SAMPLE_JQ_HASHES[43] } })
  assert.deepEqual(Object.keys(mixed.adopted), ['42'])
  assert.deepEqual(mixed.unverified.sort(), ['43', '500'])
  // 配列・文字列などオブジェクトでない items は添字をキーとして扱わない
  assert.deepEqual(verifyLoadedItems('ab', { fileExists: true, hashes: {} }).unverified, [])
  assert.deepEqual(verifyLoadedItems(['x', 'y'], { fileExists: true, hashes: {} }).unverified, [])
})

test('verifyLoadedItems: 検証未返却・ファイルなし申告・不正ハッシュ・特殊キーはすべて不採用', () => {
  assert.deepEqual(verifyLoadedItems(sampleItems, null).adopted, {})
  assert.equal(verifyLoadedItems(sampleItems, null).verified, false)
  assert.deepEqual(verifyLoadedItems(sampleItems, { fileExists: false, hashes: SAMPLE_JQ_HASHES }).adopted, {})
  const upper = Object.fromEntries(Object.entries(SAMPLE_JQ_HASHES).map(([k, h]) => [k, h.toUpperCase()]))
  assert.deepEqual(verifyLoadedItems(sampleItems, { fileExists: true, hashes: upper }).adopted, {})
  const evil = JSON.parse('{"__proto__": {"status": "merged"}, "0": {}}')
  const r = verifyLoadedItems(evil, {
    fileExists: true,
    hashes: JSON.parse(`{"__proto__": "${sha256Hex(canonicalJson({ status: 'merged' }))}", "0": "${sha256Hex('{}')}"}`),
  })
  assert.deepEqual(Object.keys(r.adopted), [])
  assert.equal(Object.getPrototypeOf(r.adopted), Object.prototype)
  assert.equal(r.verified, false)
})

test('verifyLoadedItems: 空ファイル（items: {}）は空のまま verified: true（新規作成直後）', () => {
  const r = verifyLoadedItems({}, { fileExists: true, hashes: {} })
  assert.deepEqual(r, { adopted: {}, dropped: [], unverified: [], verified: true })
})

test('prBindingProblem: 別 issue（#359）のブランチ・closingIssues の PR は結び付けない', () => {
  const merged359 = { state: 'MERGED', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/359-foo', closingIssues: [359] }
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', merged359), '')
  // ブランチは一致しても closingIssuesReferences が別 issue のみを指すなら結び付けない
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', { state: 'MERGED', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [359] }), '')
  // 取得不能・UNKNOWN・closingIssues 欠落は fail-closed
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', null), '')
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', { state: 'UNKNOWN', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [] }), '')
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', { state: 'MERGED', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/365-bar' }), '')
  // fork（isCrossRepository: true）・isCrossRepository 欠落は結び付けない
  assert.equal(prBindingProblem(365, 'feat/365-bar', { state: 'OPEN', isCrossRepository: true, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [365] }), 'cross-repository')
  assert.equal(prBindingProblem(365, 'feat/365-bar', { state: 'OPEN', headRefName: 'feat/365-bar', closingIssues: [365] }), 'cross-repository')
  // base ブランチが期待（args.branch。既定 main）と異なる PR・baseRefName 欠落は結び付けない（Codex P1）
  assert.equal(prBindingProblem(365, 'feat/365-bar', { state: 'MERGED', isCrossRepository: false, baseRefName: 'release', headRefName: 'feat/365-bar', closingIssues: [365] }), 'baseRefName')
  assert.equal(prBindingProblem(365, 'feat/365-bar', { state: 'MERGED', isCrossRepository: false, headRefName: 'feat/365-bar', closingIssues: [365] }), 'baseRefName')
  // 期待ブランチ自体が本 issue の命名でなければ、headRefName と一致しても結び付けない
  assert.notEqual(prBindingProblem(365, 'feat/359-foo', { state: 'MERGED', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/359-foo', closingIssues: [365] }), '')
  assert.notEqual(prBindingProblem(365, 'misc-branch', { state: 'OPEN', isCrossRepository: false, baseRefName: 'main', headRefName: 'misc-branch', closingIssues: [] }), '')
  // 期待ブランチが不正値なら一致させない
  assert.notEqual(prBindingProblem(365, '', { state: 'OPEN', isCrossRepository: false, baseRefName: 'main', headRefName: '', closingIssues: [] }), '')
})

test('prBindingProblem: 本 issue のブランチで closingIssues が空か本 issue を含めば結び付ける', () => {
  assert.equal(prBindingProblem(365, 'feat/365-bar', { state: 'MERGED', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [] }), '')
  assert.equal(prBindingProblem(365, 'feat/365-bar', { state: 'OPEN', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [365, 400] }), '')
  assert.equal(prBindingProblem(365, 'feat/365-bar', { state: 'CLOSED', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [365] }), '')
})

// ---------------------------------------------------------------------------
// 層 2: loadState の振る舞い（スタブ agent）
// ---------------------------------------------------------------------------

function installAgentStub(behavior) {
  const calls = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    return behavior(opts, prompt)
  }
  const logs = []
  globalThis.log = (msg) => { logs.push(msg) }
  return { calls, logs }
}

const loadResult = (items, extra = {}) => ({ ok: true, fileExisted: true, items, highWaterBytes: 0, highWaterVersion: 0, ...extra })

test('loadState: 捏造 items（PR = issue + 1006）は採用せず state-unverified として返す（throw しない）', async () => {
  const fabricated = Object.fromEntries(Object.entries(sampleItems).map(([k, v]) => [k, { ...v, pr: Number(k) + 1006 }]))
  const { calls, logs } = installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult(fabricated)
      : { fileExists: true, hashes: SAMPLE_JQ_HASHES, keysSha256: keysOf(SAMPLE_JQ_HASHES), keysCount: Object.keys(SAMPLE_JQ_HASHES).length, highWaterBytes: 0, highWaterVersion: 0 })
  const r = await loadState()
  assert.deepEqual(r.items, {})
  assert.equal(r.verified, false)
  assert.deepEqual(r.unverified, [42, 43, 44, 45])
  // 不一致の項目は再取得の対象になる。fill が値を返さない（null）ため最大 2 巡で打ち切られ、不採用のまま止まる。
  assert.deepEqual(calls.slice(0, 2).map((c) => c.opts.label), ['state:load', 'state:load-verify'])
  assert.ok(calls.slice(2).every((c) => c.opts.label.startsWith('state:load-fill')))
  // 検証エージェントには読込結果を渡さない（鸚鵡返し防止）。
  assert.ok(!calls[1].prompt.includes('1049'), '検証プロンプトに読込結果が混入している')
  assert.ok(logs.some((l) => /state-unverified 4 件/.test(l)))
})

test('loadState: 実ファイルと一致する items は採用し、高水位は両エージェントが一致しなければ停止する', async () => {
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult(sampleItems, { highWaterBytes: 4096, highWaterVersion: 2 })
      : { fileExists: true, hashes: SAMPLE_JQ_HASHES, keysSha256: keysOf(SAMPLE_JQ_HASHES), keysCount: Object.keys(SAMPLE_JQ_HASHES).length, highWaterBytes: 4096, highWaterVersion: 2 })
  const r = await loadState()
  assert.deepEqual(Object.keys(r.items).sort(), ['42', '43', '44', '45'])
  assert.equal(r.verified, true)
  assert.equal(r.highWaterBytes, 4096)
  assert.equal(r.highWaterVersion, 2)

  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult(sampleItems, { highWaterBytes: 4096, highWaterVersion: 2 })
      : { fileExists: true, hashes: SAMPLE_JQ_HASHES, keysSha256: keysOf(SAMPLE_JQ_HASHES), keysCount: Object.keys(SAMPLE_JQ_HASHES).length, highWaterBytes: 1, highWaterVersion: 2 })
  // 高水位が両エージェントで食い違う場合は 0 へ置き換えて続行せず停止する（容量予約を失わない。Codex P1）
  await assert.rejects(() => loadState(), /成立しなかったため停止した/)
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult(sampleItems, { highWaterBytes: 4096, highWaterVersion: 2 })
      : { fileExists: true, hashes: SAMPLE_JQ_HASHES, keysSha256: keysOf(SAMPLE_JQ_HASHES), keysCount: 4, highWaterBytes: 4096, highWaterVersion: 1 })
  await assert.rejects(() => loadState(), /成立しなかったため停止した/)
})

test('loadState: 既存ファイルの照合が成立しない（検証が haiku / sonnet とも未返却）ならランを停止する', async () => {
  installAgentStub((opts) => (opts.label === 'state:load' ? loadResult(sampleItems) : null))
  await assert.rejects(() => loadState(), (err) => {
    assert.match(err.message, /内容照合が成立しなかったため停止した（新規着手 0 件）/)
    assert.match(err.message, /退避/)
    return true
  })
})

test('loadState: 読込側が既存と申告したファイルを検証側が見つけられない場合も停止する', async () => {
  installAgentStub((opts) =>
    opts.label === 'state:load' ? loadResult(sampleItems) : { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 })
  await assert.rejects(() => loadState(), /成立しなかったため停止した/)
})

test('loadState: ファイルが無く新規作成した場合は検証が NOFILE でも状態なしで続行する', async () => {
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? { ok: true, fileExisted: false, items: {}, highWaterBytes: 0, highWaterVersion: 2 }
      : { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 })
  const r = await loadState()
  assert.deepEqual(r.items, {})
  assert.deepEqual(r.unverified, [])
})

test('loadState: 新規作成（items: {}）は検証成立で verified: true', async () => {
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? { ok: true, fileExisted: false, items: {}, highWaterBytes: 0, highWaterVersion: 2 }
      : { fileExists: true, hashes: {}, keysSha256: keysOf({}), keysCount: Object.keys({}).length, highWaterBytes: 0, highWaterVersion: 2 })
  const r = await loadState()
  assert.deepEqual(r.items, {})
  assert.equal(r.verified, true)
  assert.equal(r.highWaterVersion, 2)
})

// Issue #535: state:load が先頭 5 件しか返さない場合、ホストが欠落キーを特定して 5 件ずつ再取得する。
const makeItems = (n) => Object.fromEntries(Array.from({ length: n }, (_, i) => [String(100 + i), { status: 'monitoring', pr: 1000 + i, branch: `fix/${100 + i}-x` }]))
const hashesOf = (items) => Object.fromEntries(Object.entries(items).map(([k, v]) => [k, sha256Hex(canonicalJson(v))]))
const verifyResult = (hashes) => ({ fileExists: true, hashes, keysSha256: keysOf(hashes), keysCount: Object.keys(hashes).length, highWaterBytes: 0, highWaterVersion: 0 })
// fill プロンプトの --argjson k '[...]' から要求キーを取り出し、実ファイル相当の items から返す。
const requestedKeys = (prompt) => JSON.parse(/--argjson k '(\[[^']*\])'/.exec(prompt)[1])

test('loadState: 30 件の状態ファイルで state:load が先頭 5 件しか返しても、ホストが 5 件ずつ再取得して全件採用する', async () => {
  const all = makeItems(30)
  const hashes = hashesOf(all)
  const first5 = Object.fromEntries(Object.entries(all).slice(0, 5))
  const fillCalls = []
  installAgentStub((opts, prompt) => {
    if (opts.label === 'state:load') return loadResult(first5)
    if (opts.label === 'state:load-verify') return verifyResult(hashes)
    fillCalls.push(prompt)
    return { items: Object.fromEntries(requestedKeys(prompt).map((k) => [k, all[k]])) }
  })
  const r = await loadState()
  assert.equal(Object.keys(r.items).length, 30)
  assert.deepEqual(r.items, all)
  assert.equal(r.verified, true)
  assert.deepEqual(r.unverified, [])
  // 25 件 ÷ 5 件ずつ = 5 回。各プロンプトは要求キーだけを含み、ホストが組み立てた jq コマンドである。
  assert.equal(fillCalls.length, 5)
  const seen = fillCalls.flatMap(requestedKeys)
  assert.equal(new Set(seen).size, 25)
  assert.ok(seen.every((k) => !(k in first5)))
  assert.ok(fillCalls.every((p) => requestedKeys(p).length <= 5 && /jq -c --argjson k /.test(p) && p.includes('.items | with_entries')))
})

test('loadState: 再取得が値を返さない場合は 2 巡で打ち切り、欠落キーを state-unverified として明示する（throw しない）', async () => {
  const all = makeItems(12)
  const { calls, logs } = installAgentStub((opts) => {
    if (opts.label === 'state:load') return loadResult(Object.fromEntries(Object.entries(all).slice(0, 5)))
    if (opts.label === 'state:load-verify') return verifyResult(hashesOf(all))
    return { items: {} }
  })
  const r = await loadState()
  assert.equal(r.verified, false)
  assert.deepEqual(r.unverified, Array.from({ length: 7 }, (_, i) => 105 + i))
  assert.deepEqual(Object.keys(r.items).sort(), ['100', '101', '102', '103', '104'])
  // 7 件 = 2 塊 × 2 巡。fill は schema 適合応答（空 items）なのでフォールバックしない。
  assert.equal(calls.filter((c) => c.opts.label === 'state:load-fill').length, 4)
  assert.ok(logs.some((l) => /state-unverified 7 件/.test(l)))
})

test('loadState: 初回が改変して返した項目も、再取得の正しい値で救済される', async () => {
  const all = makeItems(8)
  const tampered = { ...all, 103: { ...all[103], pr: 9999 } }
  installAgentStub((opts, prompt) => {
    if (opts.label === 'state:load') return loadResult(tampered)
    if (opts.label === 'state:load-verify') return verifyResult(hashesOf(all))
    return { items: Object.fromEntries(requestedKeys(prompt).map((k) => [k, all[k]])) }
  })
  const r = await loadState()
  assert.deepEqual(r.items, all)
  assert.equal(r.verified, true)
})

test('loadState: 再取得が要求外のキー・捏造値を返しても採用しない', async () => {
  const all = makeItems(7)
  const { logs } = installAgentStub((opts, prompt) => {
    if (opts.label === 'state:load') return loadResult(Object.fromEntries(Object.entries(all).slice(0, 5)))
    if (opts.label === 'state:load-verify') return verifyResult(hashesOf(all))
    const fabricated = Object.fromEntries(requestedKeys(prompt).map((k) => [k, { ...all[k], pr: 1 }]))
    return { items: { ...fabricated, 999: { status: 'monitoring', pr: 1 }, __proto__x: {} } }
  })
  const r = await loadState()
  assert.equal(r.verified, false)
  assert.deepEqual(Object.keys(r.items).sort(), ['100', '101', '102', '103', '104'])
  assert.ok(!('999' in r.items))
  assert.ok(logs.some((l) => /state-unverified 2 件/.test(l)))
})

test('loadState: 再取得プロンプトには数値キー以外（__proto__・コマンド片）を埋め込まない', async () => {
  const all = makeItems(6)
  // JSON.parse は __proto__ を own プロパティとして生成する（実応答の再現）。
  const hashes = JSON.parse(JSON.stringify({ ...hashesOf(all), '1; rm -rf x': 'a'.repeat(64) }).replace(/}$/, `,"__proto__":"${'b'.repeat(64)}"}`))
  const fills = []
  installAgentStub((opts, prompt) => {
    if (opts.label === 'state:load') return loadResult(Object.fromEntries(Object.entries(all).slice(0, 5)))
    if (opts.label === 'state:load-verify') return verifyResult(hashes)
    fills.push(prompt)
    return { items: {} }
  })
  await loadState().catch(() => {})
  assert.ok(fills.every((p) => !p.includes('rm -rf') && !p.includes('__proto__')))
})

test('loadState: 全件が初回で返れば再取得エージェントは起動しない（回帰）', async () => {
  const all = makeItems(30)
  const { calls } = installAgentStub((opts) => (opts.label === 'state:load' ? loadResult(all) : verifyResult(hashesOf(all))))
  const r = await loadState()
  assert.equal(r.verified, true)
  assert.deepEqual(calls.map((c) => c.opts.label), ['state:load', 'state:load-verify'])
})

// ---------------------------------------------------------------------------
// 層 3: プロンプト・駆動部の配線
// ---------------------------------------------------------------------------

test('検証プロンプトは項目ごとの jq -jcS ハッシュを要求し、読込プロンプトは分割読みと推測禁止を指示する', async () => {
  const { calls } = installAgentStub((opts) =>
    opts.label === 'state:load' ? loadResult({}) : { fileExists: true, hashes: {}, keysSha256: keysOf({}), keysCount: Object.keys({}).length, highWaterBytes: 0, highWaterVersion: 0 })
  await loadState()
  assert.match(calls[1].prompt, /jq -jcS --arg k "\$k" '\.items\[\$k\]'/)
  // キーは issue 番号（正の整数の 10 進表記）だけに絞り、「キー ハッシュ」行の解釈を一意にする。
  assert.ok(calls[1].prompt.includes(`keys[] | select(test("^[1-9][0-9]*$"))`))
  assert.match(calls[1].prompt, /sha256sum/)
  assert.match(calls[1].prompt, /shasum -a 256/)
  assert.match(calls[0].prompt, /5 件ずつ/)
  assert.match(calls[0].prompt, /推測で埋めない/)
  assert.match(calls[0].prompt, /ホストが再取得/)
})

test('mergeVerifyPrompt は headRefName・baseRefName・closingIssuesReferences を取得させる', () => {
  const p = mergeVerifyPrompt({ number: 365 }, { prNumber: 1371 })
  assert.ok(p.includes('gh pr view 1371 --json state,headRefOid,mergeCommit,headRefName,baseRefName,closingIssuesReferences,isCrossRepository'))
  assert.ok(p.includes('closingIssues'))
  assert.match(p, /返却: state \/ headRefOid \/ mergeCommitOid \/ headRefName \/ baseRefName \//)
})

test('monitorPrompt 手順 1 は PR 照合不一致で MERGED でも ready にせず blocked / unbound を返させる', () => {
  const p = monitorPrompt({ number: 365 }, { prNumber: 1366, branch: 'feat/365-bar' }, [], true, false)
  const step1 = p.slice(p.indexOf('1. まず gh pr view'), p.indexOf('\n', p.indexOf('1. まず gh pr view')))
  assert.ok(step1.includes('--json state,headRefOid,mergeable,headRefName,baseRefName,closingIssuesReferences,isCrossRepository'))
  assert.ok(step1.includes('baseRefName が "main" でない'))
  assert.ok(step1.includes('"feat/365-bar" と完全一致しない'))
  assert.ok(step1.includes('#365 を含まない'))
  assert.ok(step1.includes('MERGED でも'))
  const unboundIdx = step1.indexOf('blockedReason: "unbound" を返す（ready にしない）')
  assert.ok(unboundIdx > 0 && unboundIdx < step1.indexOf('state が MERGED の場合'))
  assert.doesNotMatch(step1.slice(0, unboundIdx), /"unrecoverable"/)
})

test('mergeExecutePrompt 手順 1 は PR 照合不一致で close せず wrong-target を返させ、MERGED 分岐より先に置く', () => {
  for (const allowMerge of [false, true]) {
    const p = mergeExecutePrompt({ number: 365 }, { prNumber: 1366, branch: 'feat/365-bar' }, allowMerge, [])
    const bindIdx = p.indexOf('イシューを close せず merged: false / reason: wrong-target を返す')
    const mergedIdx = p.indexOf('state が MERGED: マージ済み')
    assert.ok(bindIdx > 0, `allowMerge=${allowMerge}: PR 照合の分岐がない`)
    assert.ok(bindIdx < mergedIdx, `allowMerge=${allowMerge}: PR 照合が MERGED 分岐より後にある`)
    assert.ok(p.includes('--json state,headRefOid,mergeable,baseRefName,isDraft,headRefName,closingIssuesReferences,isCrossRepository'))
    assert.ok(p.includes('"feat/365-bar" と完全一致しない'))
    assert.ok(p.includes('baseRefName が "main" でない'))
  }
})

test('駆動部: isActiveMonitoring と runOne の resumable は branchMatchesIssue を要求する', () => {
  const start = driverPart.indexOf('function isActiveMonitoring(n)')
  const body = driverPart.slice(start, driverPart.indexOf('\n}\n', start))
  assert.match(body, /branchMatchesIssue\(s\.branch, n\)/)
  const resumableIdx = driverPart.indexOf('const resumable =')
  const resumable = driverPart.slice(resumableIdx, driverPart.indexOf('\n      if (', resumableIdx))
  assert.match(resumable, /branchMatchesIssue\(saved\.branch, item\.number\)/)
})

// runImplement の「branch 照合 → 再開前の PR 照合」区間を切り出して実行する振る舞いハーネス。
// 区間の末尾まで到達した（再開・通常実装へ進む）場合は 'proceed' を返す。
async function runResumeGuard({ number = 365, saved, active = true, bind = '' }) {
  const savedItems = { [String(number)]: saved }
  const unverifiedIssues = new Set()
  const start = driverPart.indexOf('async function runImplement(item)')
  const from = driverPart.indexOf('  const stopUnverified = (why) => {', start)
  const resumeHead = '  if (isResumeFromMonitoring && !bound) {\n    const why = await checkPrBinding('
  const bindStart = driverPart.indexOf(resumeHead, from)
  const to = driverPart.indexOf('\n  }\n', bindStart) + 4
  assert.ok(start > 0 && from > start && bindStart > from, '再開ガードの区間が見つからない')
  const ctx = { failures: [], stateWrites: [], bindCalls: [], savedItems, unverifiedIssues }
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const fn = new AsyncFunction('item', 'saved', 'ctx', [
    'const recordFailure = (f) => ctx.failures.push(f)',
    'const updateState = async (...a) => { ctx.stateWrites.push(a); return true }',
    "const branchMatchesIssue = (b, n) => new RegExp(`^[a-z]+/${n}-`).test(b)",
    'const sanitize = (x) => x',
    'const { savedItems, unverifiedIssues } = ctx',
    // active: true は常に再開対象、'auto' は保存値（pr > 0）から判定する。
    `const isActiveMonitoring = (n) => ${active === 'auto' ? 'savedItems[String(n)].pr > 0' : active}`,
    `const checkPrBinding = async (...a) => { ctx.bindCalls.push(a); return ${JSON.stringify(bind)} }`,
    driverPart.slice(from, to),
    "return { ret: 'proceed', saved, isResumeFromMonitoring }",
  ].join('\n'))
  const out = await fn({ number }, saved, ctx)
  return out === false ? { ret: false, ...ctx } : { ...out, ...ctx }
}

test('runImplement: 再開前の PR 照合が不一致・取得失敗なら状態を書き換えず state-unverified の blocked で終える', async () => {
  const saved = { status: 'monitoring', pr: 1366, branch: 'feat/365-bar', worktree: '/w' }
  for (const bind of ['PR not found', 'headRefName feat/359-foo']) {
    const r = await runResumeGuard({ saved, bind })
    assert.equal(r.ret, false, bind)
    assert.deepEqual(r.bindCalls, [[{ number: 365 }, 1366, 'feat/365-bar']])
    assert.equal(r.stateWrites.length, 0, '照合失敗で状態ファイルを書き換えてはならない')
    assert.equal(r.failures.length, 1)
    assert.equal(r.failures[0].status, 'blocked')
    assert.equal(r.failures[0].pr, undefined)
    assert.match(r.failures[0].reason, /^state-unverified: 状態ファイルの PR #1366 を本イシューに結び付けられない/)
    assert.match(r.failures[0].reason, /状態ファイルは変更していない/)
  }
  // 照合が通れば再開へ進む
  const ok = await runResumeGuard({ saved, bind: '' })
  assert.equal(ok.ret, 'proceed')
  assert.equal(ok.failures.length, 0)
})

test('runImplement: 別 issue の命名の branch を持つエントリは再開・Recover へ進まず state-unverified の blocked で終える', async () => {
  for (const saved of [
    { status: 'monitoring', pr: 1366, branch: 'feat/359-foo', worktree: '/repo/.git/worktrees/impl-359' },
    { status: 'implementing', pr: 0, branch: 'misc-branch', worktree: '/w' },
  ]) {
    const r = await runResumeGuard({ saved, active: false })
    assert.equal(r.ret, false)
    assert.equal(r.stateWrites.length, 0)
    assert.deepEqual(r.bindCalls, [])
    assert.equal(r.failures[0].status, 'blocked')
    assert.match(r.failures[0].reason, /^state-unverified: 状態ファイルの branch が本イシューの命名ではない/)
    // 止めた issue の番号は前提完了プローブのヒントから外す集合へ入る
    assert.ok(r.unverifiedIssues.has(365))
  }
  // 本 issue の branch・branch なしは素通しする
  assert.equal((await runResumeGuard({ saved: { status: 'implementing', branch: 'feat/365-bar' }, active: false })).ret, 'proceed')
  assert.equal((await runResumeGuard({ saved: { status: 'implementing', worktree: '/w' }, active: false })).ret, 'proceed')
})

test('駆動部: runImplement の照合ガードは再開判定・Recover より前にあり、savedItems を書き換えない', () => {
  const start = driverPart.indexOf('async function runImplement(item)')
  const body = driverPart.slice(start, driverPart.indexOf('\nasync function ', start + 10))
  const guard = body.indexOf("if (saved.branch && !branchMatchesIssue(String(saved.branch), item.number)) {")
  const resumeDecl = body.indexOf('const isResumeFromMonitoring = isActiveMonitoring(item.number)')
  const bind = body.indexOf('if (why) return stopUnverified(`状態ファイルの PR #')
  const remnant = body.indexOf('const hasRemnant')
  assert.ok(guard > 0 && guard < resumeDecl && resumeDecl < bind && bind < remnant, '照合ガードの位置が不正')
  // savedItems の書き換えは unverifiedPr の照合成立後（pr への昇格）の 1 か所だけ
  const writes = body.split('savedItems[String(item.number)] = ').length - 1
  assert.equal(writes, 1)
  const promote = body.indexOf('savedItems[String(item.number)] = saved')
  assert.ok(promote > body.indexOf('const why = await checkPrBinding(item, saved.unverifiedPr, saved.branch)'))
  assert.doesNotMatch(body, /dropForeignBranchEntry/)
})

test('runImplement: unverifiedPr だけを残した項目は照合が成立すればその番号で monitoring を再開する（Codex P1）', async () => {
  const saved = { status: 'blocked', pr: 0, unverifiedPr: 1380, branch: 'feat/365-bar', worktree: '/w' }
  const r = await runResumeGuard({ saved, active: 'auto', bind: '' })
  assert.equal(r.ret, 'proceed')
  assert.equal(r.isResumeFromMonitoring, true)
  assert.equal(r.saved.pr, 1380)
  assert.equal(r.savedItems['365'].pr, 1380)
  // 照合は 1 回だけ（昇格後の再開前照合を重ねない）
  assert.deepEqual(r.bindCalls, [[{ number: 365 }, 1380, 'feat/365-bar']])
  assert.equal(r.stateWrites.length, 0, '昇格の永続化は再開時の状態同期書き込みが担う')
  assert.equal(r.failures.length, 0)
})

test('runImplement: unverifiedPr の照合が不一致・取得失敗なら新規の実装・PR 作成をせず state-unverified で止める（Codex P1）', async () => {
  for (const bind of ['PR not found', 'cross-repository']) {
    const saved = { status: 'blocked', pr: 0, unverifiedPr: 1380, branch: 'feat/365-bar' }
    const r = await runResumeGuard({ saved, active: 'auto', bind })
    assert.equal(r.ret, false)
    assert.equal(r.stateWrites.length, 0)
    assert.equal(r.savedItems['365'].pr, 0, '未照合の番号を pr へ昇格させてはならない')
    assert.equal(r.failures[0].pr, undefined, '未照合の番号を結果一覧の pr へ流してはならない')
    assert.match(r.failures[0].reason, /^state-unverified: 未照合の PR #1380 を本イシューに結び付けられない/)
    assert.ok(r.unverifiedIssues.has(365))
  }
})

test('駆動部: 再開時の状態同期と pr-create 後の monitoring 遷移は unverifiedPr を消す', () => {
  assert.match(driverPart, /updateState\(item\.number, \{ status: 'monitoring', pr: impl\.prNumber, unverifiedPr: 0 \}\)/)
  assert.match(driverPart, /const monitoringPatch = \{ status: 'monitoring', pr: impl\.prNumber, unverifiedPr: 0,/)
})

// probePrereqCompletion の prHints 構築区間を切り出して実行する（Bugbot High）。
function buildPrHints({ targets, results, savedItems, unverifiedIssues }) {
  const fnStart = driverPart.indexOf('async function probePrereqCompletion(targets) {')
  const from = driverPart.indexOf('  const prHints = {}', fnStart)
  const to = driverPart.indexOf('  let probe', from)
  assert.ok(fnStart > 0 && from > fnStart && to > from)
  const fn = new Function('targets', 'results', 'savedItems', 'unverifiedIssues', 'knownBranchByIssue', 'isValidBranchName', 'branchMatchesIssue', `${driverPart.slice(from, to)}\nreturn { prHints, branchHints }`)
  return fn(targets, results, savedItems, unverifiedIssues, new Map(), isValidBranchName, branchMatchesIssue)
}

test('probePrereqCompletion: state-unverified の issue の保存済み pr は prHints に渡さず、MERGED でも done にしない（Bugbot High）', () => {
  const savedItems = { 365: { status: 'blocked', pr: 1366, branch: 'feat/365-bar' }, 366: { status: 'failed', pr: 1400, branch: 'feat/366-baz' } }
  const { prHints: unverified, branchHints } = buildPrHints({ targets: [365, 366], results: [], savedItems, unverifiedIssues: new Set([365]) })
  assert.deepEqual(unverified, { 366: 1400 })
  const done = new Set()
  const failedSet = new Set([365, 366])
  const probe = { results: [
    { issue: 365, issueState: 'OPEN', prState: 'MERGED', pr: 1366 },
    { issue: 366, issueState: 'OPEN', prState: 'MERGED', pr: 1400, headRefName: 'feat/366-baz', baseRefName: 'main', isCrossRepository: false, closingIssues: [366] },
  ] }
  const t = applyPrereqTransitions(probe, [365, 366], done, failedSet, unverified, branchHints)
  assert.deepEqual(t, [{ issue: 366, kind: 'merged', pr: 1400 }])
  assert.ok(failedSet.has(365) && !done.has(365), '未照合 PR の MERGED で前提を done にしてはならない')
  // 人手で CLOSED になった場合の遷移は従来どおり
  const t2 = applyPrereqTransitions({ results: [{ issue: 365, issueState: 'CLOSED', prState: 'MERGED', pr: 1366 }] }, [365], new Set(), new Set([365]), unverified)
  assert.deepEqual(t2, [{ issue: 365, kind: 'closed' }])
})

test('駆動部: stopUnverified と dispatch 前の state-unverified は同じ集合（unverifiedIssues）を使う', () => {
  assert.match(driverPart, /const unverifiedIssues = new Set\(stateUnverified\)/)
  assert.match(driverPart, /if \(unverifiedIssues\.has\(item\.number\)\) \{/)
  assert.match(driverPart, /const stopUnverified = \(why\) => \{\s*unverifiedIssues\.add\(item\.number\)/)
  assert.match(driverPart, /if \(unverifiedIssues\.has\(d\)\) continue/)
})

test('駆動部: merged 受理（already-merged を含む）は PR 照合を要求し、opt-in 前の MERGED 確認も照合する', () => {
  assert.match(driverPart, /const verifyBindIssue = prBindingProblem\(item\.number, impl\.branch, v\)/)
  assert.match(driverPart, /if \(!\(verifyStateOk && verifyHeadOk && !verifyBindIssue\)\) \{/)
})

test('駆動部: opt-in 前の MERGED 確認で PR 照合が不一致なら state を問わず blocked で終端する（allowMerge へ fail-open しない）', () => {
  const probeCheck = driverPart.indexOf('const probeBindIssue = prBindingProblem(item.number, impl.branch, mergedProbe)')
  const assign = driverPart.indexOf("prAlreadyMerged = mergedProbe?.state === 'MERGED'")
  const allowIdx = driverPart.indexOf('const allowMerge = !recoveryOnly && !prAlreadyMerged')
  assert.ok(probeCheck > 0 && probeCheck < assign && assign < allowIdx)
  const branch = driverPart.slice(probeCheck, assign)
  assert.match(branch, /if \(probeBindIssue\) \{\s*return await failMergeTerminal\(/)
  assert.match(branch, /'blocked'\)/)
})

test('駆動部: 新規 PR は pr-create 直後・Merge ループ投入前に PR 照合し、不一致なら blocked で終端する', () => {
  const created = driverPart.indexOf('impl = { ...impl, prNumber: prCreateResult.prNumber }')
  const save = driverPart.indexOf("const unverifiedPatch = { status: 'blocked', pr: 0, unverifiedPr: impl.prNumber, branch: impl.branch }", created)
  const check = driverPart.indexOf('const newPrBindIssue = await checkPrBinding(item, impl.prNumber, impl.branch)')
  const known = driverPart.indexOf('knownPrByIssue.set(item.number, impl.prNumber)', created)
  const loop = driverPart.indexOf('runMergeLoop(item, impl', created)
  // 照合より先に未照合の番号を unverifiedPr として保存する（照合中のクラッシュで番号を失わない。Bugbot）
  assert.ok(created > 0 && save > created && check > save && check < known && known < loop, 'pr-create 後の保存・PR 照合の位置が不正')
  const branch = driverPart.slice(check, known)
  assert.match(branch, /status: 'blocked'/)
  assert.match(branch, /return false/)
  // unverifiedPr を読むのは runImplement の照合（saved.unverifiedPr）だけ。isActiveMonitoring・
  // 前提完了プローブ・結果一覧は読まない。
  const readers = [...driverPart.matchAll(/([A-Za-z_$.\]\[?]+)\.unverifiedPr\b/g)].map((m) => m[1])
  assert.ok(readers.length > 0 && readers.every((r) => r === 'saved'), `unverifiedPr の読み手: ${readers.join(', ')}`)
})

test('駆動部: state-unverified の issue は dispatch 前に blocked（halt 非カウント）で止め、後続も止める', () => {
  assert.match(driverPart, /unverified: stateUnverified,\s*\} = await loadState\(\)/)
  const idx = driverPart.indexOf('if (unverifiedIssues.has(item.number)) {')
  const preloop = driverPart.indexOf('const failedSet = new Set()')
  const work = driverPart.indexOf('const work = queue.filter(')
  assert.ok(idx > preloop && idx < work, 'state-unverified の判定位置が不正')
  const body = driverPart.slice(idx, driverPart.indexOf('continue', idx))
  assert.match(body, /results\.push\(\{ issue: item\.number, status: 'blocked', note \}\)/)
  assert.match(body, /failedSet\.add\(item\.number\)/)
  assert.doesNotMatch(body, /updateState|recordFailure/)
})

test('checkPrBinding: 例外・未返却・fork の PR は問題ありを返し、同一リポの本 issue ブランチは空文字を返す', async () => {
  const calls = []
  globalThis.log = () => {}
  globalThis.agent = async (prompt, opts) => { calls.push(opts.label); throw new Error('boom') }
  assert.equal(await checkPrBinding({ number: 365 }, 1371, 'feat/365-bar'), 'PR not found')
  globalThis.agent = async () => ({ state: 'OPEN', isCrossRepository: true, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [] })
  assert.equal(await checkPrBinding({ number: 365 }, 1371, 'feat/365-bar'), 'cross-repository')
  globalThis.agent = async (prompt, opts) => {
    calls.push(opts.label)
    assert.ok(prompt.includes('gh pr view 1371 --json'))
    return { state: 'OPEN', isCrossRepository: false, baseRefName: 'main', headRefName: 'feat/365-bar', closingIssues: [365] }
  }
  assert.equal(await checkPrBinding({ number: 365 }, 1371, 'feat/365-bar'), '')
  assert.deepEqual(calls, ['pr-bind:#365', 'pr-bind:#365'])
})

test('駆動部: ラン開始時の孤立 worktree 記録は状態ファイルの内容照合（verified）成立時のみ行う', () => {
  assert.match(driverPart, /verified: savedItemsVerified,/)
  assert.match(driverPart, /for \(const entry of mainWorktreePath && savedItemsVerified \? runStartOrphanEntries : \[\]\)/)
})

test('駆動部: ラン末尾の孤立 worktree 記録・削除は再読込の内容照合（verified）成立時のみ行う', () => {
  assert.match(driverPart, /const fresh = await enqueueStateWrite\(\(\) => loadState\(\)\)/)
  assert.match(driverPart, /freshVerified = fresh\.verified === true/)
  assert.match(driverPart, /for \(const entry of mainWorktreePathAtEnd && freshVerified \? orphanEntriesAtEnd : \[\]\)/)
})

test('駆動部: 未検証の PR 記録を「作成済み」と報告しない（markBlockedByDeps・interrupted）', () => {
  const start = driverPart.indexOf('async function markBlockedByDeps(')
  const body = driverPart.slice(start, driverPart.indexOf('\n}\n', start))
  assert.doesNotMatch(body, /PR #\$\{pr\} 作成済み/)
  assert.match(body, /PR_RECORD_UNVERIFIED\(pr\)/)
  const intStart = driverPart.indexOf('for (const n of interrupted) {')
  const intBody = driverPart.slice(intStart, driverPart.indexOf('\n}\n', intStart))
  assert.doesNotMatch(intBody, /作成済み/)
  assert.match(intBody, /PR_RECORD_UNVERIFIED\(pr\)/)
})

// ---------------------------------------------------------------------------
// Bugbot 指摘への回帰テスト
// ---------------------------------------------------------------------------

test('isValidStateVerifyResult: 必須フィールド・型・ハッシュ形式をすべて検証する', () => {
  const ok = { fileExists: true, hashes: SAMPLE_JQ_HASHES, keysSha256: keysOf(SAMPLE_JQ_HASHES), keysCount: Object.keys(SAMPLE_JQ_HASHES).length, highWaterBytes: 0, highWaterVersion: 2 }
  assert.equal(isValidStateVerifyResult(ok), true)
  assert.equal(isValidStateVerifyResult({ fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 }), true)
  for (const bad of [
    null,
    { fileExists: true },
    { fileExists: true, hashes: SAMPLE_JQ_HASHES },
    { ...ok, hashes: null },
    { ...ok, hashes: [] },
    { ...ok, hashes: { 42: 'abc' } },
    { ...ok, hashes: { 42: SAMPLE_JQ_HASHES[42].toUpperCase() } },
    { ...ok, highWaterBytes: -1 },
    { ...ok, highWaterVersion: 1.5 },
    { ...ok, fileExists: 'true' },
    { ...ok, keysSha256: undefined },
    { ...ok, keysSha256: '' },
    { ...ok, keysSha256: 'E4B9' },
    { fileExists: false, hashes: {}, keysSha256: keysOf({}), keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 },
    { ...ok, keysCount: undefined },
    { ...ok, keysCount: -1 },
    { fileExists: false, hashes: {}, keysSha256: '', keysCount: 3, highWaterBytes: 0, highWaterVersion: 0 },
  ]) {
    assert.equal(isValidStateVerifyResult(bad), false, JSON.stringify(bad))
  }
})

test('loadState: 検証エージェントの haiku が { fileExists: true } だけを返したら sonnet へフォールバックして照合する', async () => {
  const { calls } = installAgentStub((opts) => {
    if (opts.label === 'state:load') return loadResult(sampleItems)
    if (opts.model === 'haiku') return { fileExists: true }
    return { fileExists: true, hashes: SAMPLE_JQ_HASHES, keysSha256: keysOf(SAMPLE_JQ_HASHES), keysCount: Object.keys(SAMPLE_JQ_HASHES).length, highWaterBytes: 0, highWaterVersion: 0 }
  })
  const r = await loadState()
  assert.deepEqual(calls.map((c) => c.opts.label), ['state:load', 'state:load-verify', 'state:load-verify:fallback-sonnet'])
  assert.deepEqual(Object.keys(r.items).sort(), ['42', '43', '44', '45'])
  assert.equal(r.verified, true)
})

test('loadState: 検証エージェントが haiku / sonnet とも不正な応答ならランを停止する', async () => {
  const { calls } = installAgentStub((opts) => (opts.label === 'state:load' ? loadResult(sampleItems) : { fileExists: true }))
  await assert.rejects(() => loadState(), /成立しなかったため停止した/)
  assert.equal(calls.length, 3)
})

test('駆動部: state:load-verify の isValid は isValidStateVerifyResult を使う', () => {
  assert.match(source, /label: 'state:load-verify', schema: STATE_VERIFY_SCHEMA, isValid: isValidStateVerifyResult/)
})

// pr-create 直後の PR 照合失敗ブロックを切り出して実行する（Codex P1: unverifiedPr 保存の成否確認）。
async function runNewPrBindFailure(writeResults, bind = 'PR not found') {
  const from = driverPart.indexOf('    const unverifiedPatch = { status: ')
  const bindAt = driverPart.indexOf('    const newPrBindIssue = await checkPrBinding(item, impl.prNumber, impl.branch)', from)
  const to = driverPart.indexOf('\n    }\n', bindAt) + 6
  assert.ok(from > 0 && bindAt > from && to > bindAt)
  const ctx = { writes: [], failures: [], unverifiedIssues: new Set(), bindCalls: 0 }
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  const fn = new AsyncFunction('item', 'impl', 'ctx', [
    'const { unverifiedIssues } = ctx',
    `const checkPrBinding = async () => { ctx.bindCalls++; return ${JSON.stringify(bind)} }`,
    'const sanitize = (x) => x',
    'const log = () => {}',
    'const recordFailure = (f) => ctx.failures.push(f)',
    'let w = 0',
    `const updateState = async (n, patch) => { ctx.writes.push(patch); return ${JSON.stringify(writeResults)}[w++] }`,
    driverPart.slice(from, to),
    "return 'proceed'",
  ].join('\n'))
  const ret = await fn({ number: 365 }, { prNumber: 1380, branch: 'feat/365-bar' }, ctx)
  return { ret, ...ctx }
}

test('pr-create 後: 照合より先に unverifiedPr を保存し、照合が通れば Merge ループへ進む（Bugbot）', async () => {
  const r = await runNewPrBindFailure([true], '')
  assert.equal(r.ret, 'proceed')
  assert.deepEqual(r.writes, [{ status: 'blocked', pr: 0, unverifiedPr: 1380, branch: 'feat/365-bar' }])
  assert.equal(r.bindCalls, 1)
  assert.equal(r.failures.length, 0)
})

test('pr-create 後の照合失敗: unverifiedPr の保存に成功すれば再試行せず blocked で終える', async () => {
  const r = await runNewPrBindFailure([true])
  assert.equal(r.ret, false)
  assert.equal(r.writes.length, 1)
  assert.deepEqual(r.writes[0], { status: 'blocked', pr: 0, unverifiedPr: 1380, branch: 'feat/365-bar' })
  assert.equal(r.failures[0].status, 'blocked')
  assert.equal(r.failures[0].pr, undefined)
  assert.doesNotMatch(r.failures[0].reason, /Failed to save/)
})

test('pr-create 後の照合失敗: 保存に 1 回失敗したら 1 回だけ再試行する', async () => {
  const r = await runNewPrBindFailure([false, true])
  assert.equal(r.writes.length, 2)
  assert.deepEqual(r.writes[0], r.writes[1])
  assert.doesNotMatch(r.failures[0].reason, /Failed to save/)
  assert.equal(r.unverifiedIssues.size, 0)
})

test('pr-create 後: unverifiedPr の保存が再試行も失敗したら照合せず、番号と手動確認の要否を英語で残し state-unverified で終える', async () => {
  const r = await runNewPrBindFailure([false, false], '')
  assert.equal(r.ret, false)
  assert.equal(r.writes.length, 2)
  assert.equal(r.bindCalls, 0, '保存できない場合は照合（エージェント呼び出し）へ進まない')
  assert.equal(r.failures.length, 1)
  assert.equal(r.failures[0].status, 'blocked')
  assert.equal(r.failures[0].pr, undefined, '未照合の番号を結果の pr（前提完了プローブのヒント源）へ流さない')
  assert.match(r.failures[0].reason, /^state-unverified: /)
  assert.match(r.failures[0].reason, /Failed to save to the state file\. PR #1380 may exist; verify it manually before re-running\./)
  assert.ok(r.unverifiedIssues.has(365))
})

// ---------------------------------------------------------------------------
// キー一覧ダイジェスト（keysSha256）による照合（Codex P1-G）
// ---------------------------------------------------------------------------

// jq 1.8.1 で `jq -jc '[.items // {} | keys[] | select(test("^[1-9][0-9]*$"))]' FILE | sha256sum` を
// 実行した値。MIXED は sample の items に "foo bar"・"007"（数値キーではない）・"1000" を足したファイル。
const JQ_KEYS_SHA_SAMPLE = 'e4b911406c1fa61a112f8ef6446f32e5b909e69f26806942bd0bc3e3b08ce184' // ["42","43","44","45"]
const JQ_KEYS_SHA_MIXED = 'c3847bdc2364716d3f8974131bfbfd37ffeaa76a35c85466edff7a2e8f3c9e86' // ["1000","42","43","44","45"]
const JQ_KEYS_SHA_EMPTY = '4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945' // []

test('keysSha256: ホスト側の正規形（文字列昇順の JSON 配列）の sha256 は jq の実出力と一致する', () => {
  assert.equal(keysOf(SAMPLE_JQ_HASHES), JQ_KEYS_SHA_SAMPLE)
  assert.equal(keysOf({}), JQ_KEYS_SHA_EMPTY)
  // 数値キーだけの hashes（検証側は select で数値キーに絞る）から、数値でないキーを含むファイルの
  // jq 出力と同じダイジェストになる。"1000" < "42" の文字列順も jq の keys と一致する。
  const mixedHashes = { 45: 'x', 1000: 'x', 42: 'x', 44: 'x', 43: 'x' }
  assert.equal(keysOf(mixedHashes), JQ_KEYS_SHA_MIXED)
})

test('loadState: 両エージェントが同じ項目を読み落とした場合（キー一覧ダイジェスト不一致）は停止する', async () => {
  const { 44: _r, ...readItems } = sampleItems
  const { 44: _h, ...returnedHashes } = SAMPLE_JQ_HASHES
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult(readItems)
      // 検証側の KEYS 行は jq が実ファイルから計算するため 44 を含む全キーのダイジェストのまま
      : { fileExists: true, hashes: returnedHashes, keysSha256: JQ_KEYS_SHA_SAMPLE, keysCount: 4, highWaterBytes: 0, highWaterVersion: 0 })
  await assert.rejects(() => loadState(), /成立しなかったため停止した/)
})

test('loadState: 両側が空（items: {}・hashes: {}）でも実ファイルのキーが残っていれば停止する', async () => {
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult({})
      : { fileExists: true, hashes: {}, keysSha256: JQ_KEYS_SHA_SAMPLE, keysCount: 4, highWaterBytes: 0, highWaterVersion: 0 })
  await assert.rejects(() => loadState(), /成立しなかったため停止した/)
})

test('loadState: 数値でないキーが混在するファイルでも、数値キーのダイジェストが一致すれば照合が成立する', async () => {
  const items = { ...sampleItems, 1000: sampleItems[42], 'foo bar': { x: 1 }, '007': {} }
  const hashes = { ...SAMPLE_JQ_HASHES, 1000: SAMPLE_JQ_HASHES[42] }
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult(items)
      : { fileExists: true, hashes, keysSha256: JQ_KEYS_SHA_MIXED, keysCount: 5, highWaterBytes: 0, highWaterVersion: 0 })
  const r = await loadState()
  assert.deepEqual(Object.keys(r.items).sort(), ['1000', '42', '43', '44', '45'])
  assert.deepEqual(r.unverified, [])
})

test('検証プロンプトは KEYS 行（数値キー一覧の jq -jc ダイジェスト）を要求する', async () => {
  const { calls } = installAgentStub((opts) =>
    opts.label === 'state:load' ? loadResult({}) : { fileExists: true, hashes: {}, keysSha256: JQ_KEYS_SHA_EMPTY, keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 })
  await loadState()
  const p = calls[1].prompt
  assert.ok(p.includes(`K='[.items // {} | keys[] | select(test("^[1-9][0-9]*$"))]'; echo "KEYS $(jq -jc "$K" "$f" | h | cut -c1-64) $(jq "$K | length" "$f")"`))
  // KEYS 行（ダイジェストと件数）はコマンド出力の先頭: ファイルあり分岐で最初の出力コマンドであり、
  // 高水位の行・項目ごとのハッシュ行（while ループ）より前に出す（Bugbot 指摘）。
  const branchStart = p.indexOf('if [ -f "$f" ]; then ')
  const keysIdx = p.indexOf('echo "KEYS ')
  const hwIdx = p.indexOf("jq -c '[.perWorktreeByteReserveHighWater")
  const loopIdx = p.indexOf('while IFS= read -r k')
  assert.ok(branchStart > 0 && keysIdx > branchStart && keysIdx < hwIdx && hwIdx < loopIdx, 'KEYS 行が出力の先頭にない')
  assert.doesNotMatch(p.slice(branchStart, keysIdx), /echo |printf |jq -c|jq -r/, 'KEYS 行より前に別の出力がある')
  // 範囲指定での分割実行（キー行のみ）
  assert.ok(p.includes('sed -n "${R:-1,\\$}p"'))
  assert.match(p, /R=1,20 のように行範囲を指定して同じコマンドを分割実行し全件を取得する/)
})

test('検証プロンプトは keysSha256 / keysCount を KEYS 行からそのまま転記させ、再計算・自前のキー一覧からの作成を禁じる', async () => {
  const { calls } = installAgentStub((opts) =>
    opts.label === 'state:load' ? loadResult({}) : { fileExists: true, hashes: {}, keysSha256: JQ_KEYS_SHA_EMPTY, keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 })
  await loadState()
  assert.match(calls[1].prompt, /先頭の KEYS 行の 2 列目を keysSha256・3 列目を keysCount へそのまま転記する（自分で計算し直したり、返すキー一覧から作ったりしない）/)
})

test('loadState: KEYS 行の件数（keysCount）と hashes の件数が一致しなければ停止する', async () => {
  installAgentStub((opts) =>
    opts.label === 'state:load'
      ? loadResult(sampleItems)
      : { fileExists: true, hashes: SAMPLE_JQ_HASHES, keysSha256: JQ_KEYS_SHA_SAMPLE, keysCount: 5, highWaterBytes: 0, highWaterVersion: 0 })
  await assert.rejects(() => loadState(), /成立しなかったため停止した/)
})

test('駆動部: monitor の PR 照合不成立（blockedReason: unbound）は状態を書き換えず state-unverified の blocked で終える（Bugbot High）', () => {
  assert.match(source, /enum: \['quality', 'unrecoverable', 'unbound'\]/)
  const idx = driverPart.indexOf("if (lastBlockedReason === 'unbound') {")
  assert.ok(idx > driverPart.indexOf('lastBlockedReason = normalizeBlockedReason(m?.blockedReason)'))
  const body = driverPart.slice(idx, driverPart.indexOf('\n      }\n', idx))
  assert.match(body, /unverifiedIssues\.add\(item\.number\)/)
  assert.match(body, /recordFailure\(\{ issue: item\.number, reason: `state-unverified: /)
  assert.match(body, /status: 'blocked' \}\)\s*return false/)
  assert.doesNotMatch(body, /updateState|failMergeTerminal/, '状態ファイルを書き換えてはならない（failed 終端・pr クリアをしない）')
})

// monitor プロンプト内の blockedReason の契約（Bugbot Medium。fandhe-container#1387 で検出）。
// 手順 1 と MERGE_SCHEMA は "unbound" を受け付けるのに、手順 7 と「返却:」が "quality" /
// "unrecoverable" だけを挙げていると、monitor はそちらに従って unbound を返さず、ホスト側の
// unbound 経路（状態を書き換えない state-unverified の blocked）が動かない。
test('monitorPrompt: blockedReason の値を列挙する文面（手順 7・返却）は "unbound" を手順 1 の照合不成立に限って明示する', () => {
  const p = monitorPrompt({ number: 365 }, { prNumber: 1366, branch: 'feat/365-bar' }, [], true, false)
  const lines = p.split('\n')
  const step7 = lines.find((l) => l.startsWith('7. '))
  const ret = lines.find((l) => l.startsWith('返却: '))
  assert.ok(step7 && ret, '手順 7 / 返却の行が見つからない')
  assert.ok(step7.includes('手順 1 の PR 照合不成立に限り "unbound"、再監視・再実行で解消し得るなら "quality"'))
  assert.ok(ret.includes('"quality"・"unrecoverable"、手順 1 の PR 照合不成立に限り "unbound"。省略・enum 外は'))
  // blockedReason の選び方を一般的に説明する行（手順 7 の「必ず付与し」・返却の「blockedReason（」）は
  // 必ず "unbound" も挙げる。特定の state に 1 つの値を指定するだけの行（手順 1 の CLOSED、3e）は対象外。
  const enumerating = lines.filter((l) => l.includes('blockedReason を必ず付与し') || l.includes('blockedReason（'))
  assert.ok(enumerating.length >= 2)
  for (const l of enumerating) assert.ok(l.includes('"unbound"'), `unbound を挙げていない列挙行: ${l.slice(0, 40)}`)
  // 旧文面（2 値だけの列挙）が残っていない
  assert.ok(!p.includes('"quality" または "unrecoverable"'))
  // schema の enum をすべてプロンプトが返却値として挙げている
  for (const v of MERGE_SCHEMA.properties.blockedReason.enum) assert.ok(ret.includes(`"${v}"`), `返却に ${v} がない`)
})

test('ホストは monitor の blockedReason: "unbound" を enum 外扱いにせずそのまま受理する', () => {
  assert.deepEqual(MERGE_SCHEMA.properties.blockedReason.enum, ['quality', 'unrecoverable', 'unbound'])
  assert.equal(normalizeBlockedReason('unbound'), 'unbound')
  assert.equal(normalizeBlockedReason('quality'), 'quality')
  // 省略・enum 外は従来どおり unrecoverable
  assert.equal(normalizeBlockedReason(undefined), 'unrecoverable')
  assert.equal(normalizeBlockedReason('Unbound'), 'unrecoverable')
  // 正規化の直後に unbound を分岐し、unrecoverable の終端分類（failed）へ流さない
  const norm = driverPart.indexOf('lastBlockedReason = normalizeBlockedReason(m?.blockedReason)')
  const branch = driverPart.indexOf("if (lastBlockedReason === 'unbound') {", norm)
  assert.ok(norm > 0 && branch > norm && branch - norm < 900)
})

// ---------------------------------------------------------------------------
// MERGE_VERIFY_SCHEMA: PR 照合（prBindingProblem）に使う取得値は必須項目（Bugbot 指摘への対応）。
// 任意項目のままだと、構造化出力が省いた正当な PR が fail-closed の照合不成立になる。
// ---------------------------------------------------------------------------
const BINDING_FIELDS = ['headRefName', 'baseRefName', 'isCrossRepository', 'closingIssues']
const VALID_VERIFY = { state: 'OPEN', headRefOid: 'a'.repeat(40), headRefName: 'feat/365-bar', baseRefName: 'main', isCrossRepository: false, closingIssues: [365] }

test('MERGE_VERIFY_SCHEMA: 照合に使う 4 項目が required に入り、properties に定義され description を持つ', () => {
  assert.ok(MERGE_VERIFY_SCHEMA.required.includes('state'))
  assert.ok(MERGE_VERIFY_SCHEMA.required.includes('headRefOid'))
  for (const f of BINDING_FIELDS) {
    assert.ok(MERGE_VERIFY_SCHEMA.required.includes(f), `${f} が required にない`)
    assert.ok(MERGE_VERIFY_SCHEMA.properties[f], `${f} が properties にない`)
    assert.ok(MERGE_VERIFY_SCHEMA.properties[f].description, `${f} に description がない`)
  }
  // 4 項目のいずれかを省いた出力は required 違反（スキーマ側で省略を許さない）
  for (const f of BINDING_FIELDS) {
    const omitted = { ...VALID_VERIFY }
    delete omitted[f]
    assert.ok(MERGE_VERIFY_SCHEMA.required.some((k) => !(k in omitted)), `${f} 省略が required 違反にならない`)
  }
  assert.ok(MERGE_VERIFY_SCHEMA.required.every((k) => k in VALID_VERIFY))
})

test('prBindingProblem: 4 項目が揃った正当な値は空文字（結び付く）', () => {
  assert.equal(prBindingProblem(365, 'feat/365-bar', VALID_VERIFY), '')
  assert.equal(prBindingProblem(365, 'feat/365-bar', { ...VALID_VERIFY, state: 'MERGED', closingIssues: [] }), '')
})

test('prBindingProblem: 各項目の取得失敗値（プロンプトが指示する値）は必ず不成立になる', () => {
  // 取得失敗値: headRefName / baseRefName は空文字、isCrossRepository は true、closingIssues は [-1]
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', { ...VALID_VERIFY, headRefName: '' }), '')
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', { ...VALID_VERIFY, baseRefName: '' }), '')
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', { ...VALID_VERIFY, isCrossRepository: true }), '')
  // closingIssues の失敗値 [-1] は空配列（紐付け無しの正当値）と区別され、不成立になる
  assert.equal(prBindingProblem(365, 'feat/365-bar', { ...VALID_VERIFY, closingIssues: [] }), '')
  assert.equal(prBindingProblem(365, 'feat/365-bar', { ...VALID_VERIFY, closingIssues: [-1] }), 'closingIssues')
  // コマンド全体の失敗値（state UNKNOWN + 全項目の失敗値）
  assert.notEqual(prBindingProblem(365, 'feat/365-bar', { state: 'UNKNOWN', headRefOid: '', headRefName: '', baseRefName: '', isCrossRepository: true, closingIssues: [-1] }), '')
})

test('mergeVerifyPrompt: 4 項目の取得・返却と各失敗値を明示し、スキーマの description と一致する', () => {
  const p = mergeVerifyPrompt({ number: 365 }, { prNumber: 1366 })
  const ret = p.split('\n').find((l) => l.startsWith('返却: '))
  assert.ok(ret, '返却行が見つからない')
  for (const f of MERGE_VERIFY_SCHEMA.required) assert.ok(ret.includes(f), `返却に ${f} がない`)
  assert.ok(p.includes('--json state,headRefOid,mergeCommit,headRefName,baseRefName,closingIssuesReferences,isCrossRepository'))
  const step3 = p.split('\n').find((l) => l.startsWith('3. '))
  assert.ok(step3)
  for (const frag of ['state: "UNKNOWN"', 'headRefOid: ""', 'headRefName: ""', 'baseRefName: ""', 'isCrossRepository: true', 'closingIssues: [-1]']) {
    assert.ok(step3.includes(frag), `手順 3 に ${frag} がない`)
  }
  // 手順 2 の fallback（gh が closingIssuesReferences 未対応）でも取得不能を [] に化けさせない
  const step2 = p.split('\n').find((l) => l.startsWith('2. '))
  assert.ok(step2, '手順 2 が見つからない')
  assert.ok(step2.includes('[-1]'), '手順 2 に [-1] がない')
  assert.ok(!/再実行し\s*\[\]/.test(step2), '手順 2 が fallback で [] を返す指示を残している')
  assert.ok(MERGE_VERIFY_SCHEMA.properties.closingIssues.description.includes('[-1]'))
  assert.ok(MERGE_VERIFY_SCHEMA.properties.isCrossRepository.description.includes('true'))
})

test('MERGE_VERIFY_SCHEMA の 3 利用箇所（pr-bind / merged-probe / merge-verify）は mergeVerifyPrompt とペアで使い、結果を prBindingProblem へ渡す', () => {
  assert.equal([...source.matchAll(/schema: MERGE_VERIFY_SCHEMA/g)].length, 3)
  assert.equal([...source.matchAll(/= await agent\(mergeVerifyPrompt\(/g)].length, 3)
  assert.match(source, /prBindingProblem\(item\.number, branch, bind\)/)
  assert.match(source, /prBindingProblem\(item\.number, impl\.branch, mergedProbe\)/)
  assert.match(source, /prBindingProblem\(item\.number, impl\.branch, v\)/)
})
