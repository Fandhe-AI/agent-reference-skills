// Issue #566: 残置 worktree バイト測定がエージェントの転記ミス 1 回で新規着手を全停止する問題の回帰。
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
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

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

globalThis.args = { parent: 1 }
const sliceDir = mkdtempSync(join(tmpdir(), 'implement-issue-tree-residual-retry-'))
const slicePath = join(sliceDir, 'defs.mjs')
const SLICE_EXPORTS = [
  'buildResidualBytesScript',
  'buildFreeDiskScript',
  'classifyResidualByteReport',
  'measureResidualWorktreeBytesDetailed',
  'measureFreeDiskKib',
  'ensureBoundaryNonceSeed',
  'RESIDUAL_BYTE_MEASURE_MAX_RETRIES',
]
writeFileSync(slicePath, `${definitionPart}\nexport { ${SLICE_EXPORTS.join(', ')} }\n`)
const mod = await import(pathToFileURL(slicePath).href)
const {
  buildResidualBytesScript,
  buildFreeDiskScript,
  classifyResidualByteReport,
  measureResidualWorktreeBytesDetailed,
  measureFreeDiskKib,
  ensureBoundaryNonceSeed,
  RESIDUAL_BYTE_MEASURE_MAX_RETRIES,
} = mod

globalThis.agent = async (_p, opts) => (opts.label === 'nonce:seed' ? { seedHex: '0'.repeat(64) } : null)
globalThis.log = () => {}
await ensureBoundaryNonceSeed()

const hasJq = spawnSync('jq', ['--version']).status === 0

// agent スタブ。responses を順に返し、呼び出し（prompt・model・label）を calls へ記録する。
function stubAgent(responses) {
  const calls = []
  const logs = []
  globalThis.agent = async (prompt, opts) => {
    calls.push({ prompt, model: opts.model, label: opts.label })
    const r = responses[calls.length - 1]
    if (r instanceof Error) throw r
    return r
  }
  globalThis.log = (m) => { logs.push(m) }
  return { calls, logs }
}

const PATHS = ['/tmp/a-wt', '/tmp/b-wt', '/tmp/c-wt']
const GOOD = { kib: 300, err: 0, missing: 0, count: 3 }
const TRANSCRIPTION_FAIL = { kib: 0, err: 1, missing: 0, count: 0 }

// --- 1. 実 sh でのスクリプト実行 ---

test('buildResidualBytesScript: 実 sh で実行すると COUNT が対象件数と一致し ERR=0、一時ファイルは削除される', { skip: !hasJq }, () => {
  const work = mkdtempSync('/tmp/residual-script-')
  try {
    const dirs = ['d1', 'd2'].map((n) => {
      const d = join(work, n)
      mkdirSync(d)
      writeFileSync(join(d, 'f.txt'), 'x'.repeat(8192))
      return d
    })
    const missing = join(work, 'gone')
    const paths = [...dirs, missing]
    const tmpFile = join(work, 'paths.json')
    const script = buildResidualBytesScript({
      tmpFile,
      delimiter: 'PATHSEOF_test',
      pathsJson: JSON.stringify(paths),
    })
    const r = spawnSync('/bin/sh', ['-c', script], { encoding: 'utf8', cwd: work })
    assert.equal(r.status, 0, r.stderr)
    const m = /TOTAL=(\d+) MISSING=(\d+) ERR=(\d+) COUNT=(\d+)/.exec(r.stdout)
    assert.ok(m, `出力を解釈できない: ${r.stdout}`)
    assert.equal(Number(m[4]), 3)
    assert.equal(Number(m[3]), 0)
    assert.equal(Number(m[2]), 1)
    assert.ok(Number(m[1]) > 0)
    assert.equal(existsSync(tmpFile), false)
    assert.equal(existsSync(`${tmpFile}.lines`), false)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
})

// --- 2. 条件を書かせない構造 ---

test('測定プロンプト: 自然言語の条件文言が無く、ヒアドキュメントは無条件で、JSON は 1 行・nonce 付き終端記号', async () => {
  const { calls } = stubAgent([GOOD])
  await measureResidualWorktreeBytesDetailed(PATHS)
  assert.equal(calls.length, 1)
  const p = calls[0].prompt
  assert.doesNotMatch(p, /tf が空でなければ/)
  assert.doesNotMatch(p, /タグの内側/)
  const m = /cat <<'(PATHSEOF_[0-9a-z]+)' > "\$tf"\n(.*)\n\1\n/.exec(p)
  assert.ok(m, 'ヒアドキュメントの書き出しがスクリプトに存在する')
  assert.deepEqual(JSON.parse(m[2]), PATHS)
  // ヒアドキュメント行は if 等の条件の内側ではなく独立した行である
  assert.match(p, /\ncat <<'PATHSEOF_/)
  assert.equal(calls[0].model, 'haiku')
})

test('measureFreeDiskKib: 条件文言が無く、ヒアドキュメントは無条件', async () => {
  const { calls } = stubAgent([{ freeKib: 1000, err: 0 }])
  assert.equal(await measureFreeDiskKib('/tmp/main-wt'), 1000)
  assert.doesNotMatch(calls[0].prompt, /tf が空でなければ/)
  assert.match(calls[0].prompt, /\ncat <<'PATHEOF_/)
})

test('buildFreeDiskScript: 実 sh で FREE と ERR=0 が出る', { skip: !hasJq }, () => {
  const work = mkdtempSync('/tmp/freedisk-script-')
  try {
    const script = buildFreeDiskScript({
      tmpFile: join(work, 'p.json'),
      delimiter: 'PATHEOF_test',
      pathsJson: JSON.stringify([work]),
    })
    const r = spawnSync('/bin/sh', ['-c', script], { encoding: 'utf8', cwd: work })
    assert.equal(r.status, 0, r.stderr)
    assert.match(r.stdout, /FREE=\d+ ERR=0/)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
})

// --- 2b. tmpFile の /tmp 配下ガード（PR #567 codex P1） ---

for (const [name, build] of [
  ['buildResidualBytesScript', buildResidualBytesScript],
  ['buildFreeDiskScript', buildFreeDiskScript],
]) {
  for (const bad of ['rel-paths.json', './rel-paths.json', '/tmp/../escape-paths.json', '/var/tmp/x.json']) {
    test(`${name}: tmpFile=${bad} は書き込みも rm も行わず失敗値を出す`, { skip: !hasJq }, () => {
      const work = mkdtempSync('/tmp/tf-guard-')
      try {
        writeFileSync(join(work, 'rel-paths.json'), 'keep')
        const script = build({ tmpFile: bad, delimiter: 'PATHSEOF_test', pathsJson: JSON.stringify([work]) })
        const r = spawnSync('/bin/sh', ['-c', script], { encoding: 'utf8', cwd: work })
        assert.equal(r.status, 0, r.stderr)
        assert.match(r.stdout, /ERR=1/)
        assert.equal(readFileSync(join(work, 'rel-paths.json'), 'utf8'), 'keep')
        assert.equal(existsSync(join(work, 'rel-paths.json.lines')), false)
        assert.equal(existsSync(join(work, 'rel-paths.json.line')), false)
        assert.equal(existsSync('/tmp/escape-paths.json'), false)
        assert.equal(existsSync('/var/tmp/x.json'), false)
      } finally {
        rmSync(work, { recursive: true, force: true })
      }
    })
  }
}

// --- 3. 分類 ---

test('classifyResidualByteReport: 正常・転記失敗・実失敗・スキーマ不正を分類する', () => {
  assert.deepEqual(classifyResidualByteReport(GOOD, 3), { ok: true, kib: 300, missing: 0 })
  const t = classifyResidualByteReport(TRANSCRIPTION_FAIL, 3)
  assert.equal(t.ok, false)
  assert.equal(t.retryable, true)
  assert.equal(classifyResidualByteReport({ kib: 1, err: 0, missing: 0, count: 2 }, 3).retryable, true)
  assert.equal(classifyResidualByteReport(undefined, 3).retryable, true)
  const o = classifyResidualByteReport({ count: 3, err: 0 }, 3)
  assert.deepEqual([o.ok, o.retryable, o.reason], [false, true, 'output-missing'])
  assert.equal(classifyResidualByteReport(null, 3).reason, 'output-missing')
  assert.equal(classifyResidualByteReport({ kib: 1, err: -1, missing: 0, count: 3 }, 3).retryable, false)
  const m = classifyResidualByteReport({ kib: 100, err: 2, missing: 0, count: 3 }, 3)
  assert.deepEqual([m.ok, m.retryable, m.reason], [false, false, 'measure'])
  assert.equal(classifyResidualByteReport({ kib: 1, err: 0, missing: 4, count: 3 }, 3).retryable, false)
  assert.equal(classifyResidualByteReport({ kib: 'x', err: 0, missing: 0, count: 3 }, 3).retryable, false)
})

// --- 4. リトライの振る舞い ---

test('転記失敗 1 回目 → 2 回目 sonnet で正常: 値を返し、tmp パスは 1 回目と異なる', async () => {
  const { calls } = stubAgent([TRANSCRIPTION_FAIL, GOOD])
  const r = await measureResidualWorktreeBytesDetailed(PATHS)
  assert.deepEqual(r, { kib: 300, missing: 0 })
  assert.equal(calls.length, 2)
  assert.equal(calls[0].model, 'haiku')
  assert.equal(calls[1].model, 'sonnet')
  const tf = (p) => /^tf=(\S+)$/m.exec(p)[1]
  assert.notEqual(tf(calls[0].prompt), tf(calls[1].prompt))
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
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0 })
  assert.deepEqual(calls.map((c) => c.model), ['haiku', 'sonnet'])
})

test('agent の throw が続くと合計 1+MAX_RETRIES 回で打ち切り null（有界）', async () => {
  const { calls } = stubAgent([new Error('a'), new Error('b'), new Error('c'), GOOD])
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(calls.length, 1 + RESIDUAL_BYTE_MEASURE_MAX_RETRIES)
})

test('agent が null 返却（StructuredOutput 欠落）→ 再測定で正常。3 回続くと null', async () => {
  const a = stubAgent([null, GOOD])
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0 })
  assert.equal(a.calls.length, 2)
  const b = stubAgent([null, null, null, GOOD])
  assert.equal(await measureResidualWorktreeBytesDetailed(PATHS), null)
  assert.equal(b.calls.length, 3)
})

test('必須フィールド欠落（kib / missing 欠落）→ 再測定で正常', async () => {
  const { calls } = stubAgent([{ count: 3, err: 0 }, GOOD])
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0 })
  assert.equal(calls.length, 2)
})

test('例外 → 転記失敗 → 正常: 再測定予算を共有し合計 3 回で値を返す', async () => {
  const { calls } = stubAgent([new Error('boom'), TRANSCRIPTION_FAIL, GOOD])
  assert.deepEqual(await measureResidualWorktreeBytesDetailed(PATHS), { kib: 300, missing: 0 })
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
