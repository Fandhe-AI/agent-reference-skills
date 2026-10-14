// ホスト側の出力封筒の照合（verifySignedOutput）と args.skillDir の検証・必須判定の回帰テスト
// （Issue #603 第 1 弾）。信頼モデルは references/script-trust-model.md。
//
// 検証する契約:
//   - 封筒 { nonce, payload, sha256 } の欠落・型不正・nonce 不一致・sha256 不一致・payload の改竄を拒否する
//   - 拒否された封筒は転記失敗として有界に再測定し（最大 1 + RESIDUAL_BYTE_MEASURE_MAX_RETRIES 回）、
//     使い切ったら null（fail-closed）。スクリプトを実行せず作った値・前回の出力の流用・転記後の改竄は通らない
//   - 本物のスクリプトを実際に実行して返した封筒は受理され、旧プロンプトと同じ測定値になる（結合）
//   - args.skillDir: 絶対パスだけを受理し、不正な値は黙って読み替えずエラーにする。未指定の扱いは、
//     測定を使うラン（dryRun でなく maxResidualWorktreeBytes > 0）だけ起動時エラー
//
// 読み込み方式は他の回帰テストと同じ（駆動部マーカーより上を切り出して import）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { bundleSha256 } from '../scripts/build-workflow.mjs'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'
import { expectedSha256, makeEnvelope, nonceOf, signedReply } from './lib/signed-output.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const SKILL_DIR = join(HERE, '..')
const SCRIPT_PATH = join(SKILL_DIR, 'scripts', 'implement-issue-tree.src.js')
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
assert.ok(markerIndex >= 0)
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))
const SLICE_EXPORTS = [
  'verifySignedOutput',
  'measureResidualWorktreeBytesDetailed',
  'measureFreeDiskKib',
  'ensureBoundaryNonceSeed',
  'parseSkillDirArg',
  'signedOutputSchema',
  'scriptInvocation',
  'ORPHAN_BYTES_SCHEMA',
  'DISK_FREE_SCHEMA',
  'SCRIPT_SHA256',
  'RESIDUAL_BYTE_MEASURE_MAX_RETRIES',
]
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-signed-host-')))
let sliceSeq = 0
// args を差し替えて別の定義部スライスを import する（skillDir は import 時に確定する定数のため）
async function importSlice(argsValue) {
  globalThis.args = argsValue
  const p = join(sliceDir, `defs-${(sliceSeq += 1)}.mjs`)
  writeFileSync(p, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
  return await import(pathToFileURL(p).href)
}

const REAL_SKILL_DIR = SKILL_DIR
const mod = await importSlice({ parent: 1, skillDir: REAL_SKILL_DIR })
const { verifySignedOutput, measureResidualWorktreeBytesDetailed, measureFreeDiskKib, ensureBoundaryNonceSeed, parseSkillDirArg } = mod

globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '1'.repeat(64) } : null)
globalThis.log = () => {}
await ensureBoundaryNonceSeed()

// --- verifySignedOutput ---

const NONCE = 'n0nce1234567890abcdefghij'
const PAYLOAD = { count: 3, err: 0, kib: 300, missing: 0 }

test('verifySignedOutput: 正しい封筒は payload を返す（キーの並び順が違っても正規形で照合する）', () => {
  const env = makeEnvelope(NONCE, PAYLOAD)
  assert.deepEqual(verifySignedOutput(env, NONCE), { ok: true, payload: PAYLOAD })
  const reordered = { sha256: env.sha256, payload: { missing: 0, kib: 300, err: 0, count: 3 }, nonce: NONCE }
  assert.equal(verifySignedOutput(reordered, NONCE).ok, true)
})

test('verifySignedOutput: 欠落・型不正は missing', () => {
  const good = makeEnvelope(NONCE, PAYLOAD)
  const cases = [
    null,
    undefined,
    'string',
    42,
    [],
    {},
    { ...good, payload: undefined },
    { ...good, payload: null },
    { ...good, payload: [] },
    { ...good, payload: 'x' },
    { ...good, sha256: undefined },
    { ...good, sha256: 123 },
    { ...good, nonce: undefined },
    { ...good, nonce: 5 },
  ]
  for (const c of cases) assert.deepEqual(verifySignedOutput(c, NONCE), { ok: false, reason: 'missing' }, JSON.stringify(c))
})

test('verifySignedOutput: nonce 不一致（別の呼び出しの出力の流用）は nonce', () => {
  const other = makeEnvelope('othernonce', PAYLOAD)
  assert.deepEqual(verifySignedOutput(other, NONCE), { ok: false, reason: 'nonce' })
  // nonce だけ書き換えても sha256 が合わないので、nonce 欄の差し替えで通らない
  assert.equal(verifySignedOutput({ ...other, nonce: NONCE }, NONCE).ok, false)
})

test('verifySignedOutput: payload の改竄・sha256 の改竄・値の捏造は sha256', () => {
  const good = makeEnvelope(NONCE, PAYLOAD)
  for (const tampered of [
    { ...good, payload: { ...PAYLOAD, kib: 1 } },
    { ...good, payload: { ...PAYLOAD, err: 1 } },
    { ...good, payload: { ...PAYLOAD, extra: 0 } },
    { ...good, payload: { count: 3, err: 0, kib: 300 } },
    { ...good, sha256: '0'.repeat(64) },
    { ...good, sha256: good.sha256.toUpperCase() },
    { ...good, sha256: '' },
  ]) {
    assert.deepEqual(verifySignedOutput(tampered, NONCE), { ok: false, reason: 'sha256' }, JSON.stringify(tampered))
  }
})

test('verifySignedOutput: sha256 の入力は「nonce + 改行 + payload の正規形」（スクリプト側 so_emit と同じ定義）', () => {
  // python3 hashlib で独立に計算した固定値。ホストの sha256Hex / canonicalJson にも、テストの expectedSha256 にも依存しない
  const fixed = '5538544439c6205dbd6df60ba8ce04b3d899c4261a2184083307a63480a95af1' // sha256('abc\n{"a":1,"b":2}')
  assert.equal(expectedSha256('abc', { b: 2, a: 1 }), fixed)
  assert.equal(verifySignedOutput({ nonce: 'abc', payload: { b: 2, a: 1 }, sha256: fixed }, 'abc').ok, true)
  assert.equal(
    expectedSha256('n', PAYLOAD),
    '48d1732c94f72559446daa55d9c74309d6ef25bd99e9c643ec47b1faa8490ea6', // sha256('n\n{"count":3,"err":0,"kib":300,"missing":0}')
  )
})

// --- 再測定と fail-closed ---

const PATHS = ['/tmp/a-wt', '/tmp/b-wt', '/tmp/c-wt']
function stub(replyFor) {
  const calls = []
  const logs = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, model: opts.model, label: opts.label })
    return replyFor(prompt, calls.length)
  }
  globalThis.log = (m) => { logs.push(m) }
  return { calls, logs }
}

test('スクリプトを実行せず作った値（sha256 を合わせられない）は拒否され、有界に再測定したのち null', async () => {
  const { calls, logs } = stub((prompt) => ({
    nonce: nonceOf(prompt),
    payload: { count: 3, err: 0, kib: 1, missing: 0 },
    sha256: 'f'.repeat(64),
  }))
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 1 + mod.RESIDUAL_BYTE_MEASURE_MAX_RETRIES)
  assert.deepEqual(calls.map((c) => c.model), ['haiku', 'sonnet', 'sonnet'])
  assert.ok(logs.some((l) => l.includes('sha256 不一致')), logs.join('\n'))
  assert.ok(logs.some((l) => l.includes('観測失敗として扱う') && l.includes('skillDir=')), logs.join('\n'))
})

test('前回の呼び出しの出力の流用（nonce が違う）は拒否される', async () => {
  let first = null
  const { calls, logs } = stub((prompt, n) => {
    if (n === 1) return (first = signedReply(prompt, { count: 3, err: 0, kib: 300, missing: 0 }))
    return first // 2 回目以降は 1 回目の出力をそのまま返す
  })
  // 1 回目は正しい封筒で受理されるので、流用は 2 回目の測定（別の呼び出し）で起きる
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0, dup: 0 })
  const second = await measureResidualWorktreeBytesDetailed(PATHS)
  assert.equal(second, null)
  assert.equal(calls.length, 1 + 1 + mod.RESIDUAL_BYTE_MEASURE_MAX_RETRIES)
  assert.ok(logs.some((l) => l.includes('nonce 不一致')), logs.join('\n'))
})

test('スクリプトの出力を転記した後に値を書き換える（kib の改竄）は拒否される', async () => {
  const { calls } = stub((prompt) => {
    const env = signedReply(prompt, { count: 3, err: 0, kib: 300, missing: 0 })
    return { ...env, payload: { ...env.payload, kib: 0 } }
  })
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 3)
})

test('欠落・不正 JSON 相当（payload 無し・文字列）は拒否される。1 回目だけ不正なら再測定で回復する', async () => {
  const { calls } = stub((prompt, n) => (n === 1 ? { nonce: nonceOf(prompt), sha256: 'a'.repeat(64) } : signedReply(prompt, { count: 3, err: 0, kib: 7, missing: 0 })))
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 7, missing: 0, dup: 0 })
  assert.deepEqual(calls.map((c) => c.model), ['haiku', 'sonnet'])
  stub(() => 'not json')
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
})

test('件数不一致（封筒は正しいが count が送った件数と違う）は転記失敗として再測定される', async () => {
  const { calls } = stub((prompt, n) => signedReply(prompt, n === 1 ? { count: 2, err: 0, kib: 5, missing: 0 } : { count: 3, err: 0, kib: 9, missing: 1 }))
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 9, missing: 1, dup: 0 })
  assert.equal(calls.length, 2)
})

test('err>0 の封筒は正しくても再測定せず null（du の実失敗は fail-closed）', async () => {
  const { calls } = stub((prompt) => signedReply(prompt, { count: 3, err: 1, kib: 100, missing: 0 }))
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 1)
})

test('free-disk: 不正な封筒は 1 回だけ別エージェントで再測定し、2 回とも不正なら null', async () => {
  const bad = stub((prompt) => ({ nonce: nonceOf(prompt), payload: { err: 0, freeKib: 99 }, sha256: 'e'.repeat(64) }))
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), null)
  assert.equal(bad.calls.length, 2)
  assert.deepEqual(bad.calls.map((c) => c.model), ['haiku', 'sonnet'])
  const ok = stub((prompt, n) => (n === 1 ? { nonce: 'zzz', payload: { err: 0, freeKib: 1 }, sha256: 'a'.repeat(64) } : signedReply(prompt, { err: 0, freeKib: 12345 })))
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 12345)
  assert.equal(ok.calls.length, 2)
})

test('free-disk: err=1 の封筒（df 失敗の正直な報告）は freeKib を採用せず再測定する', async () => {
  const { calls } = stub((prompt, n) => signedReply(prompt, n === 1 ? { err: 1, freeKib: 0 } : { err: 0, freeKib: 777 }))
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 777)
  assert.equal(calls.length, 2)
})

// --- 結合: 本物のスクリプトを実際に実行する agent スタブ ---

// プロンプトの ```sh フェンスのコマンドを実際に実行し、標準出力の 1 行 JSON を StructuredOutput として返す
// （エージェントがコマンドを実行して転記した結果を模す）。開発ファイルの目印は実スクリプトのハッシュに置換する
function runningAgent(onResult, mutateCommand = (c) => c) {
  return (prompt) => {
    const fence = /```sh\n([\s\S]*?)\n```/.exec(prompt)
    assert.ok(fence, 'プロンプトに ```sh フェンスのコマンドがある')
    const command = mutateCommand(fence[1]).replace(/@@SCRIPT_SHA256:([a-z0-9.-]+\.sh)@@/g, (_m, name) => bundleSha256(join(SKILL_DIR, 'scripts'), name))
    const r = spawnSync('/bin/sh', ['-c', command], { encoding: 'utf8' })
    assert.equal(r.status, 0, r.stderr)
    return onResult(JSON.parse(r.stdout))
  }
}

test('結合: 実スクリプトの出力を転記すると受理され、du / df の実測値になる', async () => {
  const work = trackTmp(mkdtempSync(join(tmpdir(), 'iit-e2e-')))
  try {
    const dirs = ['wt one', 'wt-two'].map((n) => {
      const d = join(work, n)
      mkdirSync(d)
      writeFileSync(join(d, 'f'), Buffer.alloc(40 * 1024, 2))
      return d
    })
    const gone = join(work, 'gone')
    stub(runningAgent((env) => env))
    const duKib = (p) => Number(spawnSync('du', ['-sk', '--', p], { encoding: 'utf8' }).stdout.split(/\s/)[0])
    assert.deepEqual(await measureResidualWorktreeBytesDetailed([...dirs, gone]), { kib: duKib(dirs[0]) + duKib(dirs[1]), missing: 1, dup: 0 })
    const free = await measureFreeDiskKib(work)
    assert.ok(Number.isInteger(free) && free > 0, `freeKib=${free}`)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
})

test('結合: 実スクリプトの出力を転記後に kib を書き換えると拒否される（再測定でも改竄が続けば null）', async () => {
  const work = trackTmp(mkdtempSync(join(tmpdir(), 'iit-e2e-')))
  try {
    const d = join(work, 'wt')
    mkdirSync(d)
    const { calls } = stub(runningAgent((env) => ({ ...env, payload: { ...env.payload, kib: env.payload.kib + 1 } })))
    assert.equal(await measureResidualWorktreeBytesDetailed([d]), null)
    assert.equal(calls.length, 3)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
})

test('結合: 期待ハッシュと合わないスクリプト（版ずれ）は launcher が起動せず、出力が無いので null（fail-closed）', async () => {
  const work = trackTmp(mkdtempSync(join(tmpdir(), 'iit-e2e-')))
  try {
    const d = join(work, 'wt')
    mkdirSync(d)
    // 期待ハッシュを実スクリプトと合わない（形式は正しい）値にする = Workflow だけ新しい版ずれを模す
    const { calls } = stub((prompt) => {
      const fence = /```sh\n([\s\S]*?)\n```/.exec(prompt)[1].replace(/@@SCRIPT_SHA256:[a-z0-9.-]+\.sh@@/, 'a'.repeat(64))
      const r = spawnSync('/bin/sh', ['-c', fence], { encoding: 'utf8' })
      assert.equal(r.status, 3, r.stderr)
      assert.equal(r.stdout, '')
      return null
    })
    assert.equal(await measureResidualWorktreeBytesDetailed([d]), null)
    assert.equal(calls.length, 3)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
})


// --- B1: nonce は呼び出し・再試行ごとに一意（codex P1。同じパスの測定で nonce が変わらないと、1 回目の封筒を
// 実行せず流用しても受理される） ---

test('B1: free-disk の nonce は同じパスの測定ごと・再試行ごとに異なる', async () => {
  const { calls } = stub(() => null) // 失敗させて再試行まで走らせる（1 測定 = 2 呼び出し）
  await measureFreeDiskKib('/tmp/main-wt')
  await measureFreeDiskKib('/tmp/main-wt')
  const nonces = calls.map((c) => nonceOf(c.prompt))
  assert.equal(nonces.length, 4)
  assert.equal(new Set(nonces).size, 4, nonces.join(' '))
})

test('B1: free-disk で 1 回目の封筒を 2 回目の測定へ流用しても拒否される（実行せず流用した場合）', async () => {
  let first = null
  const { calls, logs } = stub((prompt, n) => (n === 1 ? (first = signedReply(prompt, { err: 0, freeKib: 4242 })) : first))
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 4242)
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), null)
  assert.equal(calls.length, 3)
  assert.ok(logs.some((l) => l.includes('nonce')), logs.join('\n'))
})

test('B1 総点検: 残置バイト・空き容量・メイン worktree 相当サイズの測定が使う nonce は、呼び出し・再試行を通して全て一意', async () => {
  const { calls } = stub(() => null) // 全測定を失敗させ、再試行を含めて最大回数まで呼ばせる
  for (let i = 0; i < 3; i++) {
    await measureResidualWorktreeBytesDetailed(PATHS)
    await measureFreeDiskKib('/tmp/main-wt')
    await measureResidualWorktreeBytesDetailed(['/tmp/main-wt']) // measureMainWorktreeContentBytes が使う単一パスの測定と同形
  }
  const nonces = calls.map((c) => nonceOf(c.prompt))
  assert.equal(nonces.length, 3 * (3 + 2 + 3))
  assert.ok(nonces.every((n) => n), '全呼び出しのコマンドに nonce がある')
  assert.equal(new Set(nonces).size, nonces.length)
})

// --- S2: 封筒が入力（測定対象）を束縛する ---

test('verifySignedOutput: 期待する入力 sha256 を渡すと payload.inputSha256 と照合し、違えば input', () => {
  const withInput = (h) => makeEnvelope(NONCE, { ...PAYLOAD, inputSha256: h })
  const h = 'a'.repeat(64)
  assert.deepEqual(verifySignedOutput(withInput(h), NONCE, h), { ok: true, payload: { ...PAYLOAD, inputSha256: h } })
  assert.deepEqual(verifySignedOutput(withInput('b'.repeat(64)), NONCE, h), { ok: false, reason: 'input' })
  assert.deepEqual(verifySignedOutput(makeEnvelope(NONCE, PAYLOAD), NONCE, h), { ok: false, reason: 'input' }, 'inputSha256 が無い封筒')
  assert.equal(verifySignedOutput(makeEnvelope(NONCE, PAYLOAD), NONCE).ok, true, '期待値を渡さなければ従来どおり')
})

test('S2: 件数は同じで別のパスを測った封筒（正しい nonce・正しい sha256）は input で拒否され、再測定しても続けば null', async () => {
  const { calls, logs } = stub((prompt) => {
    const nonce = nonceOf(prompt)
    // 1 文字違いのパス列を測った正直な出力（過小な kib）。inputSha256 はその別入力の値になる
    return makeEnvelope(nonce, { count: 3, err: 0, inputSha256: 'c'.repeat(64), kib: 1, missing: 3 })
  })
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 3)
  assert.ok(logs.some((l) => l.includes('input')), logs.join('\n'))
})

test('S2 結合: エージェントがコマンド中のパスを 1 文字変えて実行した出力は、実スクリプトの正しい封筒でも拒否される', async () => {
  const work = trackTmp(mkdtempSync(join(tmpdir(), 'iit-e2e-')))
  try {
    const dirs = ['wt-one', 'wt-two'].map((n) => {
      const d = join(work, n)
      mkdirSync(d)
      writeFileSync(join(d, 'f'), Buffer.alloc(40 * 1024, 2))
      return d
    })
    const { calls } = stub(runningAgent((env) => env, (c) => c.replace('wt-one', 'wt-onx')))
    assert.equal(await measureResidualWorktreeBytesDetailed(dirs), null)
    assert.equal(calls.length, 3)
    // 変えずに実行すれば受理される（束縛が正しい入力まで拒否していない）
    stub(runningAgent((env) => env))
    const r = await measureResidualWorktreeBytesDetailed(dirs)
    assert.equal(r.missing, 0)
    assert.ok(r.kib > 0)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
})

test('S2 結合: free-disk のパスを変えて実行した出力も拒否され、変えなければ受理される', async () => {
  const work = trackTmp(mkdtempSync(join(tmpdir(), 'iit-e2e-')))
  try {
    const d = join(work, 'main-wt')
    mkdirSync(d)
    mkdirSync(join(work, 'main-wx')) // 変えた先も実在する（err=1 の別の理由ではなく、入力の束縛だけで拒否されることを見る）
    const { calls } = stub(runningAgent((env) => env, (c) => c.replace('main-wt', 'main-wx')))
    assert.equal(await measureFreeDiskKib(d), null)
    assert.equal(calls.length, 2)
    stub(runningAgent((env) => env))
    const free = await measureFreeDiskKib(d)
    assert.ok(Number.isInteger(free) && free > 0)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
})

// --- プロンプトに残る入力の安全性 ---

test('コマンドに埋め込む値（skillDir・パス）は単一引用符またはヒアドキュメントで、シェルに再評価されない', async () => {
  const withSpace = await importSlice({ parent: 1, skillDir: '/opt/my skills/implement-issue-tree' })
  const cmd = withSpace.scriptInvocation('measure-free-disk.sh', 'abc123', " -- '/tmp/x'")
  assert.equal(cmd, `bash '/opt/my skills/implement-issue-tree/scripts/run-verified.sh' ${withSpace.SCRIPT_SHA256['measure-free-disk.sh']} measure-free-disk.sh --nonce abc123 -- '/tmp/x'`)
  const { calls } = stub(() => null)
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, label: opts.label })
    return null
  }
  await measureResidualWorktreeBytesDetailed(['/tmp/a b/c'])
  assert.match(calls[0].prompt, /<<'PATHSEOF_[0-9a-z]+'\n\/tmp\/a b\/c\nPATHSEOF_[0-9a-z]+\n/)
  globalThis.args = { parent: 1, skillDir: REAL_SKILL_DIR }
})

test('skillDir が未指定のスライスでは測定を始めず agent を 1 回も呼ばずに null（fail-closed）', async () => {
  const noDir = await importSlice({ parent: 1 })
  assert.throws(() => noDir.scriptInvocation('measure-free-disk.sh', 'abc', ''), /skillDir/)
  const calls = []
  globalThis.agent = async (_p, opts) => {
    calls.push(opts.label)
    return opts.label === 'nonce:seed' ? { seedHex: '2'.repeat(64) } : null
  }
  await noDir.ensureBoundaryNonceSeed()
  calls.length = 0
  assert.equal(await noDir.measureResidualWorktreeBytesDetailed(['/tmp/a']), null)
  assert.equal(await noDir.measureFreeDiskKib('/tmp/a'), null)
  assert.deepEqual(calls, [], 'エージェントを呼ばない')
})

// --- args.skillDir の検証 ---

test('parseSkillDirArg: 絶対パスだけを受理し、未指定（undefined / null）は空文字', () => {
  assert.equal(parseSkillDirArg(undefined), '')
  assert.equal(parseSkillDirArg(null), '')
  for (const ok of [
    '/Users/me/repo/.claude/skills/implement-issue-tree',
    '/home/runner/work/repo/repo/.agents/skills/implement-issue-tree',
    '/opt/my skills/implement-issue-tree',
    '/a',
    '/repo_1/skills-2/x.y',
  ]) {
    assert.equal(parseSkillDirArg(ok), ok)
  }
})

test('parseSkillDirArg: 相対・空・型不正・.. ・// ・末尾 / ・許可外の文字・長すぎる値はエラー（黙って読み替えない）で、エラー文に何を渡すかを示す', () => {
  for (const bad of [
    '',
    ' ',
    '.',
    'skills/implement-issue-tree',
    './skills/implement-issue-tree',
    '.claude/skills/implement-issue-tree',
    '/',
    '/opt/../etc',
    '/opt//skills',
    '/opt/skills/',
    "/opt/it's",
    '/opt/a;b',
    '/opt/$(x)',
    '/opt/`x`',
    '/opt/a\nb',
    '/opt/a|b',
    '/opt/a*b',
    '/-rf',
    '/.hidden',
    '/' + 'a'.repeat(400),
    123,
    true,
    {},
    [],
    ['/opt/x'],
  ]) {
    assert.throws(() => parseSkillDirArg(bad), (e) => /args\.skillDir にはスキルディレクトリ.*絶対パスを渡す.*例: "\/home\/me\/repo\/\.claude\/skills\/implement-issue-tree"/.test(e.message), JSON.stringify(bad))
  }
})

// --- 未指定の扱い（起動時エラーの条件）---

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const scriptBody = stripMetaExport(source)

async function runDriver(args) {
  const calls = []
  const agent = async (_prompt, opts) => {
    calls.push(opts.label)
    return null
  }
  const fn = new AsyncFunction('args', 'agent', 'log', 'phase', scriptBody)
  let error = null
  try {
    await fn(args, agent, () => {}, () => {})
  } catch (e) {
    error = e
  }
  return { error, calls }
}

// #603 第 2 弾: monitor の観測スクリプト（observe-pr.sh）が残置バイト軸の有無に関わらず使われるため、dryRun でないラン
// （= 実エージェントを起動するラン）は、バイト軸を 0 でオプトアウトしていても skillDir が要る。
test('起動時: dryRun でないランは、既定でもバイト軸オプトアウトでも、skillDir 未指定ならエージェントを 1 回も呼ばずエラーで停止する', async () => {
  for (const args of [{ parent: 1 }, { parent: 1, maxResidualWorktreeBytes: 0, maxResidualWorktrees: 0 }]) {
    const { error, calls } = await runDriver(args)
    assert.ok(error, `エラーで停止する: ${JSON.stringify(args)}`)
    assert.match(error.message, /args\.skillDir にはスキルディレクトリ.*絶対パスを渡す/)
    assert.match(error.message, /省略できるのは dryRun: true のときだけ/)
    assert.deepEqual(calls, [])
  }
})

test('起動時: skillDir の形式不正は、他の引数より先に起動時エラーになる（dryRun・バイト軸オプトアウトでも）', async () => {
  for (const extra of [{}, { dryRun: true }, { maxResidualWorktreeBytes: 0 }]) {
    const { error, calls } = await runDriver({ parent: 1, skillDir: 'relative/dir', ...extra })
    assert.ok(error && /args\.skillDir にはスキルディレクトリ/.test(error.message), JSON.stringify(extra))
    assert.deepEqual(calls, [])
  }
})

test('起動時: dryRun: true のランは skillDir を省略できる（スクリプトを使うエージェントを起動しない）', async () => {
  for (const args of [{ parent: 1, dryRun: true }]) {
    const { error } = await runDriver(args)
    assert.ok(!error || !/skillDir/.test(error.message), `${JSON.stringify(args)}: ${error?.message}`)
  }
})

test('起動時: 有効な skillDir を渡せば skillDir のエラーにならない', async () => {
  const { error } = await runDriver({ parent: 1, skillDir: '/opt/skills/implement-issue-tree' })
  assert.ok(!error || !/skillDir/.test(error.message), error?.message)
})
