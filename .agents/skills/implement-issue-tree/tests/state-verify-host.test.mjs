// ホストの state:load-verify（scripts/state.sh verify の封筒の照合）の回帰テスト（Issue #603 計画 C の P5）。
//
// 以前は検証エージェントがプロンプト中のインラインのコマンドを書き写して実行し、`hashes`（自由形式の object）を自己申告で返した。
// いまはホストが決めた固定コマンド（state.sh verify）を実行させ、封筒 {nonce, payload, sha256} を転記させる。ホストは
// (1) 封筒の nonce・sha256・入力（ファイルとページ）を照合し、(2) 1 ページ 100 件のページを順に取り、(3) 全ページの一致を
// 要求して従来の照合入力へ戻す。検証側の応答の組み立ては tests/lib/signed-output.mjs（node:crypto で独立に計算）。
// 実スクリプトの出力そのものは state-verify-script.test.mjs が検査する。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { trackTmp } from './lib/tmp-track.mjs'
import { stateVerifyReply, makeEnvelope, nonceOf, inputSha256, STATE_VERIFY_PAGE } from './lib/signed-output.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const source = readFileSync(join(HERE, '..', 'scripts', 'implement-issue-tree.src.js'), 'utf8')
const markerIndex = source.indexOf('__IMPLEMENT_ISSUE_TREE_DRIVER_START__')
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))

globalThis.args = { parent: 1, skillDir: '/skill' }
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-state-verify-host-')))
const slicePath = join(sliceDir, 'defs.mjs')
const NAMES = ['loadState', 'ensureBoundaryNonceSeed', 'mergeStateVerify', 'isValidStateVerifyEnvelope', 'sha256Hex', 'canonicalJson', 'STATE_VERIFY_MAX_PAGES', 'STATE_VERIFY_PAYLOAD_SCHEMA', 'readStateVerify']
writeFileSync(slicePath, `${definitionPart}\nexport { ${NAMES.join(', ')} }\n`)
const m = await import(pathToFileURL(slicePath).href)
globalThis.log = () => {}
globalThis.agent = async () => ({ seedHex: 'd'.repeat(64) })
await m.ensureBoundaryNonceSeed()

const FILE = '_/issue-trees/1.json'
const items = (n) => Object.fromEntries(Array.from({ length: n }, (_, i) => [String(100 + i), { status: 'monitoring', pr: 1000 + i, branch: `fix/${100 + i}-x` }]))
const hashesOf = (it) => Object.fromEntries(Object.entries(it).map(([k, v]) => [k, m.sha256Hex(m.canonicalJson(v))]))
const keysSha = (h) => m.sha256Hex(m.canonicalJson(Object.keys(h).sort()))
const checkOf = (h, extra = {}) => ({ fileExists: true, hashes: h, keysSha256: keysSha(h), keysCount: Object.keys(h).length, highWaterBytes: 0, highWaterVersion: 0, ...extra })
const loadOk = (it) => ({ ok: true, fileExisted: true, items: it, highWaterBytes: 0, highWaterVersion: 0 })

function stub(behavior) {
  const calls = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, opts })
    return behavior(opts, prompt)
  }
  return calls
}
const isVerify = (opts) => opts.label.startsWith('state:load-verify')

test('250 件: 100 件ずつ 3 ページを順に取り（label と --page・nonce はページごと）、全件採用して verified', async () => {
  const all = items(250)
  const h = hashesOf(all)
  const calls = stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, checkOf(h)) : loadOk(all)))
  const r = await m.loadState()
  assert.equal(r.verified, true)
  assert.equal(Object.keys(r.items).length, 250)
  const v = calls.filter((c) => isVerify(c.opts))
  assert.deepEqual(v.map((c) => c.opts.label), ['state:load-verify', 'state:load-verify:p1', 'state:load-verify:p2'])
  assert.deepEqual(v.map((c) => /--page (\d+)/.exec(c.prompt)[1]), ['0', '1', '2'])
  assert.equal(new Set(v.map((c) => nonceOf(c.prompt))).size, 3)
  assert.equal(STATE_VERIFY_PAGE, 100)
})

test('項目 0 件・1 件・ちょうど 100 件・101 件のページ数（0 件でも 1 ページ・100 件は 1 ページ・101 件は 2 ページ）', async () => {
  for (const [n, pages] of [[0, 1], [1, 1], [100, 1], [101, 2]]) {
    const all = items(n)
    const calls = stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, checkOf(hashesOf(all))) : loadOk(all)))
    const r = await m.loadState()
    assert.equal(r.verified, true, `${n} 件`)
    assert.equal(calls.filter((c) => isVerify(c.opts)).length, pages, `${n} 件`)
  }
})

test('転記ミス（payload のハッシュを 1 文字書き換え）は封筒の sha256 が合わず、sonnet で取り直して採用する', async () => {
  const all = items(3)
  const h = hashesOf(all)
  const calls = stub((opts, prompt) => {
    if (!isVerify(opts)) return loadOk(all)
    const env = stateVerifyReply(prompt, checkOf(h))
    if (opts.model !== 'haiku') return env
    const e0 = env.payload.entries[0]
    return { ...env, payload: { ...env.payload, entries: [{ ...e0, h: `0${e0.h.slice(1)}` }, ...env.payload.entries.slice(1)] } }
  })
  const r = await m.loadState()
  assert.equal(r.verified, true)
  assert.deepEqual(calls.filter((c) => isVerify(c.opts)).map((c) => c.opts.label), ['state:load-verify', 'state:load-verify:fallback-sonnet'])
})

test('別の呼び出しの nonce の封筒（開始時の観測の流用）は受理しない。haiku / sonnet とも不成立なら停止する', async () => {
  const all = items(2)
  const h = hashesOf(all)
  const stale = stateVerifyReply('--nonce stale0nonce --file ' + FILE + ' --page 0', checkOf(h))
  const calls = stub((opts) => (isVerify(opts) ? stale : loadOk(all)))
  await assert.rejects(() => m.loadState(), /内容照合が成立しなかったため停止した/)
  assert.equal(calls.length, 3)
})

test('別のページ・別のファイルを観測した封筒は受理しない（入力の束縛）', () => {
  const h = hashesOf(items(2))
  const env = stateVerifyReply(`--nonce n1 --file ${FILE} --page 0`, checkOf(h))
  assert.equal(m.isValidStateVerifyEnvelope(env, 'n1', 0), true)
  assert.equal(m.isValidStateVerifyEnvelope(env, 'n1', 1), false, '0 ページ目の封筒を 1 ページ目として採らない')
  const other = stateVerifyReply(`--nonce n1 --file _/issue-trees/2.json --page 0`, checkOf(h))
  assert.equal(m.isValidStateVerifyEnvelope(other, 'n1', 0), false, '別のファイルの観測')
  assert.equal(m.isValidStateVerifyEnvelope(env, 'n2', 0), false, 'nonce 違い')
  assert.equal(m.isValidStateVerifyEnvelope({ ...env, sha256: '0'.repeat(64) }, 'n1', 0), false)
  assert.equal(m.isValidStateVerifyEnvelope(checkOf(h), 'n1', 0), false, '従来の平らな hashes の応答は受理しない')
  assert.equal(m.isValidStateVerifyEnvelope(null, 'n1', 0), false)
})

test('スクリプトの error（壊れた・読めない状態ファイル）は正しい観測として受理するがフォールバックせず、nofile にも倒さず停止する', async () => {
  const all = items(2)
  const calls = stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, checkOf(hashesOf(all)), { outcome: 'error', entries: [], keysCount: 0, keysSha256: '', highWaterBytes: 0, highWaterVersion: 0, pages: 1 }) : loadOk(all)))
  await assert.rejects(() => m.loadState(), /内容照合が成立しなかったため停止した/)
  assert.deepEqual(calls.map((c) => c.opts.label), ['state:load', 'state:load-verify'], 'sonnet へ回さない')
})

test('error は読込側が新規作成した（fileExisted: false）と申告していても nofile 扱いで続行せず停止する', async () => {
  stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, checkOf(hashesOf(items(1))), { outcome: 'error', entries: [], keysCount: 0, keysSha256: '', highWaterBytes: 0, highWaterVersion: 0, pages: 1 }) : { ok: true, fileExisted: false, items: {}, highWaterBytes: 0, highWaterVersion: 2 }))
  await assert.rejects(() => m.loadState(), /内容照合が成立しなかったため停止した/)
})

test('nofile: 読込側が新規作成した（fileExisted: false）なら状態なしで続行し、既存と申告したなら停止する', async () => {
  stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 }) : { ok: true, fileExisted: false, items: {}, highWaterBytes: 0, highWaterVersion: 2 }))
  const r = await m.loadState()
  assert.deepEqual(r.items, {})
  assert.equal(r.verified, false)
  stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, { fileExists: false, hashes: {}, keysSha256: '', keysCount: 0, highWaterBytes: 0, highWaterVersion: 0 }) : loadOk(items(1))))
  await assert.rejects(() => m.loadState(), /成立しなかったため停止した/)
})

test('ページ間の食い違い（keysSha256・keysCount・高水位・pages）・重複キー・不正なキー・ページ欠落は null（停止）', () => {
  const h = hashesOf(items(150))
  const page = (p, over = {}) => {
    const env = stateVerifyReply(`--nonce n --file ${FILE} --page ${p}`, checkOf(h), over)
    return env.payload
  }
  const good = [page(0), page(1)]
  assert.equal(m.mergeStateVerify(good)?.keysCount, 150)
  assert.equal(Object.keys(m.mergeStateVerify(good).hashes).length, 150)
  for (const f of [{ keysSha256: 'a'.repeat(64) }, { keysCount: 149 }, { highWaterBytes: 1 }, { highWaterVersion: 1 }, { pages: 3 }, { outcome: 'nofile' }]) {
    assert.equal(m.mergeStateVerify([good[0], { ...good[1], ...f }]), null, JSON.stringify(f))
  }
  assert.equal(m.mergeStateVerify([good[0]]), null, '2 ページ目が無い')
  assert.equal(m.mergeStateVerify([good[0], good[0]]), null, '同じページの重複（重複キー）')
  assert.equal(m.mergeStateVerify([{ ...good[0], entries: [{ k: '__proto__', h: 'a'.repeat(64) }] }, good[1]]), null, '数字以外のキー')
  assert.equal(m.mergeStateVerify([{ ...good[0], entries: [{ k: '007', h: 'a'.repeat(64) }] }, good[1]]), null, '先頭ゼロのキー')
  assert.equal(m.mergeStateVerify([{ ...good[0], entries: [...good[0].entries.slice(1), { k: '100', h: 'zz' }] }, good[1]]), null, 'ハッシュの形式違い')
  assert.equal(m.mergeStateVerify([{ ...good[0], outcome: 'error' }]), null)
})

test('ページを黙って欠かしたレスポンス（keysSha256 と entries が合わない）は loadState が停止する', async () => {
  const all = items(130)
  const h = hashesOf(all)
  stub((opts, prompt) => {
    if (!isVerify(opts)) return loadOk(all)
    const env = stateVerifyReply(prompt, checkOf(h))
    return makeEnvelope(nonceOf(prompt), { ...env.payload, entries: env.payload.entries.slice(1) })
  })
  await assert.rejects(() => m.loadState(), /成立しなかったため停止した/)
})

test('pages が上限（50）を超える ok の封筒は正しい観測として受理し（sonnet へ回さない）、2 ページ目を取らずに専用の文で停止する（再実行・退避を勧めない）', async () => {
  const all = items(2)
  const h = hashesOf(all)
  const env = stateVerifyReply(`--nonce n --file ${FILE} --page 0`, checkOf(h), { pages: m.STATE_VERIFY_MAX_PAGES + 1 })
  assert.equal(m.isValidStateVerifyEnvelope(env, 'n', 0), true, '上限超過は転記ミスではない')
  assert.equal(m.STATE_VERIFY_MAX_PAGES, 50)
  // ホストの停止経路を通しで: 偽の封筒（pages 51）
  const calls = stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, checkOf(h), { pages: 51 }) : loadOk(all)))
  const err = await m.loadState().then(() => null, (e) => e)
  assert.ok(err instanceof Error, '停止する')
  assert.match(err.message, /項目数が照合の上限 5000 件を超えるため停止した/)
  assert.doesNotMatch(err.message, /再実行|mv |退避/, '再実行・退避では解消しないので勧めない')
  assert.deepEqual(calls.map((c) => c.opts.label), ['state:load', 'state:load-verify'], 'フォールバックも 2 ページ目の取得もしない')
  // ちょうど 50 ページは上限の内（停止せず 50 ページ目まで取る）
  const at = stub((opts, prompt) => (isVerify(opts) ? stateVerifyReply(prompt, checkOf(h), { pages: 50 }) : loadOk(all)))
  await m.loadState().catch(() => null)
  assert.equal(at.filter((c) => isVerify(c.opts)).length, 50)
})

test('返却スキーマに自由形式の object（additionalProperties が真・hashes）が無い', () => {
  const walk = (x, out) => {
    if (x && typeof x === 'object') {
      if (x.type === 'object' && x.properties === undefined) out.push('properties なしの object')
      if (x.additionalProperties !== undefined) out.push('additionalProperties')
      Object.values(x).forEach((v) => walk(v, out))
    }
    return out
  }
  assert.deepEqual(walk(m.STATE_VERIFY_PAYLOAD_SCHEMA, []), [])
  assert.ok(!('hashes' in m.STATE_VERIFY_PAYLOAD_SCHEMA.properties))
  assert.equal(inputSha256(`${FILE}\n0`).length, 64)
})
