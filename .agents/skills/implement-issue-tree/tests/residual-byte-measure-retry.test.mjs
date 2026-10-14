// Issue #566: 残置 worktree バイト測定がエージェントの転記ミス 1 回で新規着手を全停止する問題の回帰。
//
// Issue #603 第 1 弾: 測定はスキル同梱のスクリプト（scripts/measure-*.sh）へ移り、エージェントは封筒
// {nonce, payload, sha256} を転記する。ここでの agent スタブは平らな測定値を封筒にして返す
// （wrapAgentReply）。スクリプトを実際に実行する検証は measure-scripts.test.mjs、封筒の照合は
// signed-output-host.test.mjs。
//
// 背景: 旧プロンプトは手順 2 が自然言語の条件（「tf が空でなければ…ヒアドキュメントで書き出す」）
// で、エージェントが条件を逆に書き起こすと対象パス一覧が書き出されず ERR=1 COUNT=0 になり、
// ホストは測定失敗（null）として新規着手を止めていた（再測定なし）。本テストは、
//   1. 対象パス JSON をホストがスクリプトへ無条件に埋め込む構造（条件を書かせない）
//   2. count 不一致（転記失敗）のみを有界に別エージェントで再測定する振る舞い
//   3. du の実失敗（count 一致で err>0）は再測定しないこと
// を固定する。読み込み方式は state-write-fallback.test.mjs と同じ（駆動部マーカーより上を切り出す）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { wrapAgentReply, nonceOf, makeEnvelope, commandInputOf, inputSha256 } from './lib/signed-output.mjs'

const SCRIPT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  '..', 'scripts', 'implement-issue-tree.src.js',
)
const DRIVER_MARKER = '__IMPLEMENT_ISSUE_TREE_DRIVER_START__'

const source = readFileSync(SCRIPT_PATH, 'utf8')
const markerIndex = source.indexOf(DRIVER_MARKER)
if (markerIndex < 0) {
  throw new Error(`テスト境界マーカー ${DRIVER_MARKER} が実装スクリプトに存在しない`)
}
const definitionPart = source.slice(0, source.lastIndexOf('\n', markerIndex))

globalThis.args = { parent: 1, skillDir: '/opt/skills/implement-issue-tree' }
const sliceDir = trackTmp(mkdtempSync(join(tmpdir(), 'implement-issue-tree-residual-retry-')))
const slicePath = join(sliceDir, 'defs.mjs')
const SLICE_EXPORTS = [
  'classifyResidualByteReport',
  'measureResidualWorktreeBytesDetailed',
  'measureFreeDiskKib',
  'ensureBoundaryNonceSeed',
  'RESIDUAL_BYTE_MEASURE_MAX_RETRIES',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const mod = await import(pathToFileURL(slicePath).href)
const {
  classifyResidualByteReport,
  measureResidualWorktreeBytesDetailed,
  measureFreeDiskKib,
  ensureBoundaryNonceSeed,
  RESIDUAL_BYTE_MEASURE_MAX_RETRIES,
} = mod

globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
globalThis.log = () => {}
await ensureBoundaryNonceSeed()

// agent スタブ。responses を順に返し、呼び出し（prompt・model・label）を calls へ記録する。
function stubAgent(responses) {
  const calls = []
  const logs = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, model: opts.model, label: opts.label })
    const r = wrapAgentReply(prompt, responses[calls.length - 1])
    if (r instanceof Error) throw r
    return r
  }
  globalThis.log = (m) => { logs.push(m) }
  return { calls, logs }
}

const PATHS = ['/tmp/a-wt', '/tmp/b-wt', '/tmp/c-wt']
const GOOD = { kib: 300, err: 0, missing: 0, count: 3 }
const TRANSCRIPTION_FAIL = { kib: 0, err: 1, missing: 0, count: 0 }

// --- 1. 条件を書かせない構造（プロンプトはコマンドを 1 回実行して封筒を転記させるだけ） ---

test('測定プロンプト: 自然言語の条件文言が無く、ヒアドキュメントは無条件で、パスは 1 行 1 件・nonce 付き終端記号', async () => {
  const { calls } = stubAgent([GOOD])
  await measureResidualWorktreeBytesDetailed(PATHS)
  assert.equal(calls.length, 1)
  const p = calls[0].prompt
  assert.doesNotMatch(p, /tf が空でなければ/)
  assert.doesNotMatch(p, /タグの内側/)
  const nonce = nonceOf(p)
  assert.ok(nonce, 'コマンドに --nonce がある')
  // コマンド全体: run-verified.sh 経由・期待ハッシュ・スクリプト名・nonce・ヒアドキュメント（終端記号は nonce 入り）
  const m = new RegExp(
    `\\nbash '/opt/skills/implement-issue-tree/scripts/run-verified\\.sh' (\\S+) measure-residual-bytes\\.sh --nonce ${nonce} <<'(PATHSEOF_${nonce})'\\n([\\s\\S]*?)\\n\\2\\n`,
  ).exec(p)
  assert.ok(m, 'run-verified.sh 経由のコマンドとヒアドキュメントがある')
  assert.deepEqual(m[3].split('\n'), PATHS)
  assert.equal(calls[0].model, 'haiku')
  // 一時ファイル・条件分岐・rm はプロンプトに残らない（スクリプト側へ移った）
  assert.doesNotMatch(p, /\btf=|\$tf|rm -f|jq -r/)
})

test('測定プロンプト: 呼び出しごとに nonce が異なる（再測定が前回の出力を流用できない）', async () => {
  const { calls } = stubAgent([TRANSCRIPTION_FAIL, GOOD])
  await measureResidualWorktreeBytesDetailed(PATHS)
  assert.equal(calls.length, 2)
  assert.notEqual(nonceOf(calls[0].prompt), nonceOf(calls[1].prompt))
})

test('measureFreeDiskKib: 条件文言が無く、パスは単一引用符で -- の後ろに渡す', async () => {
  const { calls } = stubAgent([{ freeKib: 1000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 1000)
  const p = calls[0].prompt
  assert.doesNotMatch(p, /tf が空でなければ/)
  const nonce = nonceOf(p)
  assert.match(
    p,
    new RegExp(`\\nbash '/opt/skills/implement-issue-tree/scripts/run-verified\\.sh' \\S+ measure-free-disk\\.sh --nonce ${nonce} -- '/tmp/main-wt'\\n`),
  )
})

test('測定プロンプト: 期待ハッシュは SCRIPT_SHA256 の値（開発ファイルでは目印、生成物ではビルダーが 64 桁 16 進に置換する）', async () => {
  const { calls } = stubAgent([GOOD])
  await measureResidualWorktreeBytesDetailed(PATHS)
  assert.match(calls[0].prompt, /run-verified\.sh' @@SCRIPT_SHA256:measure-residual-bytes\.sh@@ measure-residual-bytes\.sh /)
})

// --- 3. 分類 ---

test('classifyResidualByteReport: 正常・転記失敗・実失敗・スキーマ不正を分類する', () => {
  assert.deepEqual(classifyResidualByteReport({ ...GOOD, dup: 0 }, 3), { ok: true, kib: 300, missing: 0, dup: 0 })
  const t = classifyResidualByteReport(TRANSCRIPTION_FAIL, 3)
  assert.equal(t.ok, false)
  assert.equal(t.retryable, true)
  assert.equal(classifyResidualByteReport({ kib: 1, err: 0, missing: 0, dup: 0, count: 2 }, 3).retryable, true)
  assert.equal(classifyResidualByteReport(undefined, 3).retryable, true)
  const o = classifyResidualByteReport({ count: 3, err: 0 }, 3)
  assert.deepEqual([o.ok, o.retryable, o.reason], [false, true, 'output-missing'])
  assert.equal(classifyResidualByteReport(null, 3).reason, 'output-missing')
  assert.equal(classifyResidualByteReport({ kib: 1, err: -1, missing: 0, dup: 0, count: 3 }, 3).retryable, false)
  const m = classifyResidualByteReport({ kib: 100, err: 2, missing: 0, dup: 0, count: 3 }, 3)
  assert.deepEqual([m.ok, m.retryable, m.reason], [false, false, 'measure'])
  assert.equal(classifyResidualByteReport({ kib: 1, err: 0, missing: 4, dup: 0, count: 3 }, 3).retryable, false)
  assert.equal(classifyResidualByteReport({ kib: 'x', err: 0, missing: 0, dup: 0, count: 3 }, 3).retryable, false)
})

// --- 4. リトライの振る舞い ---

test('転記失敗 1 回目 → 2 回目 sonnet で正常: 値を返す', async () => {
  const { calls } = stubAgent([TRANSCRIPTION_FAIL, GOOD])
  const r = await measureResidualWorktreeBytesDetailed(PATHS)
  assert.deepEqual(r, { kib: 300, missing: 0, dup: 0 })
  assert.equal(calls.length, 2)
  assert.equal(calls[0].model, 'haiku')
  assert.equal(calls[1].model, 'sonnet')
})

test('転記失敗が続くと合計 1+MAX_RETRIES 回で打ち切り null（有界）', async () => {
  assert.equal(RESIDUAL_BYTE_MEASURE_MAX_RETRIES, 2)
  const { calls } = stubAgent([TRANSCRIPTION_FAIL, TRANSCRIPTION_FAIL, TRANSCRIPTION_FAIL, GOOD])
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 3)
})

test('count 一致で err>0（du 実失敗）は再測定せず null', async () => {
  const { calls } = stubAgent([{ kib: 100, err: 1, missing: 0, count: 3 }, GOOD])
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 1)
})

test('agent が throw → 2 回目 sonnet で正常: 値を返す（Issue #571）', async () => {
  const { calls } = stubAgent([new Error('boom'), GOOD])
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0, dup: 0 })
  assert.deepEqual(calls.map((c) => c.model), ['haiku', 'sonnet'])
})

test('agent の throw が続くと合計 1+MAX_RETRIES 回で打ち切り null（有界）', async () => {
  const { calls } = stubAgent([new Error('a'), new Error('b'), new Error('c'), GOOD])
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 1 + RESIDUAL_BYTE_MEASURE_MAX_RETRIES)
})

test('agent が null 返却（StructuredOutput 欠落）→ 再測定で正常。3 回続くと null', async () => {
  const a = stubAgent([null, GOOD])
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0, dup: 0 })
  assert.equal(a.calls.length, 2)
  const b = stubAgent([null, null, null, GOOD])
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(b.calls.length, 3)
})

test('必須フィールド欠落（kib / missing 欠落）→ 再測定で正常', async () => {
  const { calls } = stubAgent([{ count: 3, err: 0 }, GOOD])
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0, dup: 0 })
  assert.equal(calls.length, 2)
})

test('例外 → 転記失敗 → 正常: 再測定予算を共有し合計 3 回で値を返す', async () => {
  const { calls } = stubAgent([new Error('boom'), TRANSCRIPTION_FAIL, GOOD])
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0, dup: 0 })
  assert.equal(calls.length, 3)
})

for (const [name, bad] of [
  ['kib が文字列', { kib: 'x', err: 0, missing: 0, count: 3 }],
  ['err が負', { kib: 1, err: -1, missing: 0, count: 3 }],
  ['missing が件数超過', { kib: 1, err: 0, missing: 4, count: 3 }],
]) {
  test(`値が存在して不正（${name}）は再測定せず null`, async () => {
    const { calls } = stubAgent([bad, GOOD])
    assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
    assert.equal(calls.length, 1)
  })
}

// AJ: 封筒は dup（同じ実体の別の綴りとして測らなかった行数）を持つ。欠落・負・非整数・missing + dup > count は拒否して fail-closed。
// 検査は harness の dup 補完を通さず makeEnvelope で直接作る（補完が検査を隠さないため）
test('classifyResidualByteReport: dup 欠落は output-missing（再測定可）、負・非整数・missing + dup > 件数は schema（再測定しない）', () => {
  const base = { kib: 1, err: 0, missing: 0, count: 3 }
  const lack = classifyResidualByteReport(base, 3)
  assert.deepEqual([lack.ok, lack.retryable, lack.reason], [false, true, 'output-missing'])
  for (const dup of [-1, 1.5, '1', 4]) {
    const r = classifyResidualByteReport({ ...base, dup }, 3)
    assert.deepEqual([r.ok, r.retryable, r.reason], [false, false, 'schema'], String(dup))
  }
  const sum = classifyResidualByteReport({ ...base, missing: 2, dup: 2 }, 3)
  assert.deepEqual([sum.ok, sum.reason], [false, 'schema'], 'missing + dup が件数を超える')
  assert.deepEqual(classifyResidualByteReport({ ...base, missing: 1, dup: 2 }, 3), { ok: true, kib: 1, missing: 1, dup: 2 })
})

test('measureResidualWorktreeBytesDetailed: 不整合な dup の封筒（missing + dup > 件数）は再測定せず null、整合した dup は返す', async () => {
  const mk = (prompt, payload) => makeEnvelope(nonceOf(prompt), { ...payload, inputSha256: inputSha256(commandInputOf(prompt)) })
  const calls = []
  globalThis.log = () => {}
  globalThis.agent = async (prompt) => {
    calls.push(prompt)
    return mk(prompt, { kib: 300, err: 0, missing: 2, dup: 2, count: 3 })
  }
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 1)
  globalThis.agent = async (prompt) => mk(prompt, { kib: 300, err: 0, missing: 0, dup: 2, count: 3 })
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0, dup: 2 })
})

test('dup 欠落の封筒は output-missing として有界に再測定し、使い切れば null', async () => {
  const calls = []
  globalThis.log = () => {}
  globalThis.agent = async (prompt) => {
    calls.push(prompt)
    return makeEnvelope(nonceOf(prompt), { kib: 300, err: 0, missing: 0, count: 3, inputSha256: inputSha256(commandInputOf(prompt)) })
  }
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 3)
})

test('許可文字集合外パスは agent を呼ばず null', async () => {
  const { calls } = stubAgent([GOOD])
  assert.equal(await measureResidualWorktreeBytesDetailed(['/tmp/a; rm -rf x']), null)
  assert.equal(calls.length, 0)
})

// --- 5. free-disk ---

test('measureFreeDiskKib: err!==0 1 回目 → 2 回目 sonnet で正常なら値を返す', async () => {
  const { calls } = stubAgent([{ freeKib: 0, err: 1 }, { freeKib: 5000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 5000)
  assert.deepEqual(calls.map((c) => c.model), ['haiku', 'sonnet'])
})

test('measureFreeDiskKib: 2 回とも失敗なら null（再測定は 1 回まで）', async () => {
  const { calls } = stubAgent([{ freeKib: 0, err: 1 }, { freeKib: 0, err: 1 }, { freeKib: 5000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), null)
  assert.equal(calls.length, 2)
})

test('measureFreeDiskKib: agent 例外 1 回 → 2 回目 sonnet で正常なら値を返す（Issue #571）', async () => {
  const { calls } = stubAgent([new Error('boom'), { freeKib: 5000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 5000)
  assert.deepEqual(calls.map((c) => c.model), ['haiku', 'sonnet'])
})

test('measureFreeDiskKib: agent 例外が 2 回なら null（再測定は 1 回まで）', async () => {
  const { calls } = stubAgent([new Error('a'), new Error('b'), { freeKib: 5000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), null)
  assert.equal(calls.length, 2)
})

test('measureFreeDiskKib: null 返却 → 再測定で正常（現行挙動）', async () => {
  const { calls } = stubAgent([null, { freeKib: 5000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 5000)
  assert.equal(calls.length, 2)
})

test('measureFreeDiskKib: err===0 かつ freeKib 不正も再測定される（現行挙動を固定）', async () => {
  const { calls } = stubAgent([{ freeKib: -1, err: 0 }, { freeKib: 5000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 5000)
  assert.equal(calls.length, 2)
})

// --- 6. 呼び出し元の契約不変 ---

test('呼び出し元: implementMeasured === null は latchNewStartSuppressed({ implementOnly: true }) へ進む', () => {
  const driver = source.slice(markerIndex)
  const i = driver.indexOf('if (implementMeasured === null) {')
  assert.ok(i >= 0)
  assert.match(driver.slice(i, i + 2500), /latchNewStartSuppressed\(\{[\s\S]*?implementOnly: true/)
})
