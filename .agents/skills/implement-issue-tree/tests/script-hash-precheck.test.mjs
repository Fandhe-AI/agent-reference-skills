// 起動時のスクリプトハッシュ予検査（Issue #603 第 4 弾）の回帰テスト。
//
// 予検査 = ラン開始時に 1 回、埋め込みの SCRIPT_SHA256 の全エントリを skillDir の実ファイルと照合し、不一致・欠落なら何も着手せずに止める。
// ホストは bash を実行できないので、エージェント 1 回で `run-verified.sh --verify-only` を呼び、封筒（nonce・入力のハッシュ・sha256）を
// 転記させて照合する。信頼モデル（版ずれ・転記ミスの検出であり、悪意あるエージェントの捏造は検出しない）は references/script-trust-model.md。
//
// 構成:
//   (1) スクリプト側: run-verified.sh --verify-only を実際に実行する（一致・不一致・欠落・lib の書き換え・入力の正規化・使い方の誤り・
//       スクリプトを実行しないこと）。封筒の sha256 はホストの実装とは独立に node:crypto で検証する。
//   (2) ホスト側: classifyHashPrecheck の表（転記ミスは再試行可、実ファイルとの不一致は再試行しない）と、stub agent で全体を走らせた流れ
//       （呼び出しの位置・再試行・停止・何も着手しないこと・dryRun・skillDir なし）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readdirSync, existsSync, rmSync, writeFileSync, appendFileSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, hashPrecheckReply, inputSha256, makeEnvelope } from './lib/signed-output.mjs'
import { BASE_ARGS, importDefinitions, runScript } from './lib/stub-run.mjs'
import { bundleSha256 } from '../scripts/build-workflow.mjs'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const NONCE = 'abc123xyz'

function cloneScripts() {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-precheck-')))
  const scripts = join(dir, 'scripts')
  mkdirSync(join(scripts, 'lib'), { recursive: true })
  for (const f of ['run-verified.sh', 'measure-residual-bytes.sh', 'measure-free-disk.sh']) copyFileSync(join(SCRIPTS, f), join(scripts, f))
  for (const f of readdirSync(join(SCRIPTS, 'lib'))) copyFileSync(join(SCRIPTS, 'lib', f), join(scripts, 'lib', f))
  return { dir, scripts }
}
const tableOf = (scripts, names) => names.map((n) => `${bundleSha256(scripts, n)} ${n}`).join('\n')
const verify = (bash, scripts, table, args = ['--verify-only', '--nonce', NONCE]) =>
  spawnSync(bash, [join(scripts, 'run-verified.sh'), ...args], { input: table, encoding: 'utf8' })
function envelope(r) {
  assert.equal(r.status, 0, r.stderr)
  const lines = r.stdout.split('\n').filter(Boolean)
  assert.equal(lines.length, 1, r.stdout)
  const e = JSON.parse(lines[0])
  assert.equal(e.nonce, NONCE)
  assert.equal(e.sha256, expectedSha256(NONCE, e.payload), '封筒の sha256 は nonce + 改行 + payload の正規形のハッシュ')
  return e.payload
}

for (const bash of availableBashes()) {
  const tag = `[${bash}]`
  const NAMES = ['measure-residual-bytes.sh', 'measure-free-disk.sh']

  test(`${tag} --verify-only: 全行が実ファイルと一致すれば ok = count、不一致・欠落 0 で、入力のハッシュを封筒に束縛する`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const table = tableOf(scripts, NAMES)
      assert.deepEqual(envelope(verify(bash, scripts, `${table}\n`)), { count: 2, firstBad: 0, inputSha256: inputSha256(table), mismatch: 0, missing: 0, ok: 2 })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} --verify-only: スクリプトの 1 バイトの書き換えは mismatch、無いスクリプトは missing。最初の問題の行番号を返し、exit 0`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const table = tableOf(scripts, NAMES)
      appendFileSync(join(scripts, 'measure-free-disk.sh'), '\n# tampered\n')
      assert.deepEqual(envelope(verify(bash, scripts, table)), { count: 2, firstBad: 2, inputSha256: inputSha256(table), mismatch: 1, missing: 0, ok: 1 })
      rmSync(join(scripts, 'measure-residual-bytes.sh'))
      assert.deepEqual(envelope(verify(bash, scripts, table)), { count: 2, firstBad: 1, inputSha256: inputSha256(table), mismatch: 1, missing: 1, ok: 0 })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} --verify-only: lib の書き換えは lib を読み込む全スクリプトの不一致になる（ハッシュの定義は通常の起動と同じ）`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const table = tableOf(scripts, NAMES)
      appendFileSync(join(scripts, 'lib', 'signed-output.sh'), '\n# tampered\n')
      const p = envelope(verify(bash, scripts, table))
      assert.deepEqual({ mismatch: p.mismatch, ok: p.ok, firstBad: p.firstBad }, { mismatch: 2, ok: 0, firstBad: 1 })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} --verify-only: スクリプトを実行しない（照合するだけ）。CRLF と末尾の改行は正規化して入力のハッシュに入れる`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const marker = join(dir, 'ran')
      writeFileSync(join(scripts, 'canary.sh'), `#!/usr/bin/env bash\ntouch ${marker}\n`)
      const table = tableOf(scripts, ['canary.sh', ...NAMES])
      const p = envelope(verify(bash, scripts, `${table.replace(/\n/g, '\r\n')}\r\n`))
      assert.equal(p.ok, 3)
      assert.equal(p.inputSha256, inputSha256(table), 'CR と末尾の改行を落としたテキストのハッシュ（ホストが送った表と一致する）')
      assert.equal(existsSync(marker), false, '照合対象のスクリプトは実行されない')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} --verify-only: 使い方の誤り（引数・nonce・空の表・不正な行・64 行超）は exit 2 で封筒を出さない。通常の起動の位置引数の形は変わらない`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const table = tableOf(scripts, NAMES)
      const sha = bundleSha256(scripts, 'measure-free-disk.sh')
      const bad = [
        [table, ['--verify-only']],
        [table, ['--verify-only', '--nonce']],
        [table, ['--verify-only', '--nonce', 'ABC']],
        [table, ['--verify-only', '--nonce', NONCE, 'extra']],
        [table, ['--verify-only', 'x', NONCE]],
        ['', ['--verify-only', '--nonce', NONCE]],
        ['\n', ['--verify-only', '--nonce', NONCE]],
        ['nospace.sh', ['--verify-only', '--nonce', NONCE]],
        [`zz${sha.slice(2)} measure-free-disk.sh`, ['--verify-only', '--nonce', NONCE]],
        [`${sha} ../run-verified.sh`, ['--verify-only', '--nonce', NONCE]],
        [`${sha} lib/signed-output.sh`, ['--verify-only', '--nonce', NONCE]],
        [`${sha} measure-free-disk.txt`, ['--verify-only', '--nonce', NONCE]],
        [`${sha}  measure-free-disk.sh`, ['--verify-only', '--nonce', NONCE]],
        [Array.from({ length: 65 }, () => `${sha} measure-free-disk.sh`).join('\n'), ['--verify-only', '--nonce', NONCE]],
      ]
      for (const [input, args] of bad) {
        const r = verify(bash, scripts, input, args)
        assert.equal(r.status, 2, `${JSON.stringify(args)} ${JSON.stringify(input.slice(0, 40))} → exit ${r.status}`)
        assert.equal(r.stdout, '')
      }
      // 位置引数の通常の形（--verify-only を含まない）は従来どおり: 引数不足は exit 2
      assert.equal(spawnSync(bash, [join(scripts, 'run-verified.sh'), sha], { encoding: 'utf8' }).status, 2)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
}

// ---------------------------------------------------------------------------
// ホスト側
// ---------------------------------------------------------------------------
globalThis.args = { skillDir: '/opt/skills/implement-issue-tree' }
const { classifyHashPrecheck, hashPrecheckTable, SCRIPT_SHA256 } = await importDefinitions(['classifyHashPrecheck', 'hashPrecheckTable', 'SCRIPT_SHA256'], 'hash-precheck')
const NAMES = Object.keys(SCRIPT_SHA256)
const TABLE = hashPrecheckTable()
const honest = (over = {}) => makeEnvelope(NONCE, { count: NAMES.length, firstBad: 0, inputSha256: inputSha256(TABLE), mismatch: 0, missing: 0, ok: NAMES.length, ...over })

test('予検査の表は SCRIPT_SHA256 の全エントリを `<sha256> <name>` の 1 行ずつで並べる（pr-push.sh を含む）', () => {
  assert.ok(NAMES.includes('pr-push.sh') && NAMES.includes('base-merge.sh') && NAMES.includes('observe-pr.sh'))
  assert.equal(TABLE.split('\n').length, NAMES.length)
  for (const [i, line] of TABLE.split('\n').entries()) assert.equal(line, `${SCRIPT_SHA256[NAMES[i]]} ${NAMES[i]}`)
})

test('classifyHashPrecheck: 全行一致だけが ok。転記ミス・別の呼び出し・別の表は再試行可、実ファイルとの不一致・欠落は再試行しない', () => {
  const run = (raw, nonce = NONCE) => classifyHashPrecheck(raw, nonce, TABLE, NAMES)
  assert.deepEqual(run(honest()), { ok: true })
  // 再試行してよいもの（エージェント側の失敗）
  const forgedSha = { ...honest(), sha256: '0'.repeat(64) }
  const cases = [
    [undefined, 'envelope:missing'],
    [null, 'envelope:missing'],
    [{ nonce: NONCE, payload: {} }, 'envelope:missing'],
    [honest(), 'envelope:nonce', 'other-nonce'],
    [forgedSha, 'envelope:sha256'],
    [makeEnvelope(NONCE, { count: NAMES.length, firstBad: 0, inputSha256: inputSha256('別の表'), mismatch: 0, missing: 0, ok: NAMES.length }), 'envelope:input'],
    [honest({ count: NAMES.length - 1, ok: NAMES.length - 1 }), 'payload'], // 行数が表と違う（一部だけ検査した）
    [honest({ ok: NAMES.length - 1 }), 'payload'], // ok + mismatch + missing が count と合わない
    [honest({ count: -1 }), 'payload'],
    [honest({ firstBad: 1.5 }), 'payload'],
  ]
  for (const [raw, reason, nonce] of cases) {
    const r = run(raw, nonce)
    assert.deepEqual({ ok: r.ok, retryable: r.retryable, reason: r.reason }, { ok: false, retryable: true, reason }, JSON.stringify(reason))
  }
  // 再試行しないもの（スキルディレクトリの実ファイルが埋め込みと違う）
  const skew = run(honest({ ok: NAMES.length - 1, mismatch: 1, firstBad: 2 }))
  assert.deepEqual(skew, { ok: false, retryable: false, reason: 'skew', mismatch: 1, missing: 0, first: NAMES[1] })
  const missing = run(honest({ ok: NAMES.length - 2, mismatch: 1, missing: 1, firstBad: 1 }))
  assert.deepEqual({ ok: missing.ok, retryable: missing.retryable, mismatch: missing.mismatch, missing: missing.missing, first: missing.first }, { ok: false, retryable: false, mismatch: 1, missing: 1, first: NAMES[0] })
})

// ---- 全体の流れ（stub agent）----
const LABEL = 'script-hash-precheck'
const labels = (calls) => calls.map((c) => c.opts.label)

test('流れ: 予検査はシード取得の後・状態の読み込みの前に 1 回だけ呼ばれ、全スクリプトの表と --verify-only のコマンドを渡す', async () => {
  const { calls } = await runScript({ args: BASE_ARGS })
  const ls = labels(calls)
  assert.equal(ls.filter((l) => l === LABEL).length, 1)
  assert.ok(ls.indexOf('nonce:seed') < ls.indexOf(LABEL) && ls.indexOf(LABEL) < ls.indexOf('state:load'), ls.slice(0, 6).join(','))
  const c = calls[ls.indexOf(LABEL)]
  assert.equal(c.opts.model, 'haiku')
  assert.match(c.prompt, /run-verified\.sh' --verify-only --nonce [0-9a-z]+ <<'HASHESEOF_[0-9a-z]+'/)
  for (const n of NAMES) assert.ok(c.prompt.includes(` ${n}\n`) || c.prompt.includes(` ${n}\nHASHESEOF`), `${n} が表にない`)
  assert.match(c.prompt, /bash '\/repo\/\.claude\/skills\/implement-issue-tree\/scripts\/run-verified\.sh' --verify-only/)
})

test('流れ: 実ファイルとの不一致は何も着手せずに停止する（状態の読み込み・Plan・実装に進まない）。再試行しない', async () => {
  const seen = []
  await assert.rejects(
    runScript({
      args: BASE_ARGS,
      override: (label, opts, prompt) => {
        seen.push(label)
        if (label === LABEL) return hashPrecheckReply(prompt, { ok: NAMES.length - 1, mismatch: 1, firstBad: 2 })
        return undefined
      },
    }),
    (e) => /スクリプトの版ずれまたは改変の疑い/.test(e.message) && /不一致 1 件・欠落 0 件・先頭 \S+\.sh/.test(e.message) && /何も着手せずに停止した/.test(e.message),
  )
  assert.equal(seen.filter((l) => l === LABEL).length, 1, '不一致は再試行しない')
  assert.ok(!seen.some((l) => l.startsWith('state:') || l.startsWith('plan:') || l.startsWith('impl:')), seen.join(','))
})

test('流れ: 転記ミス（sha256 不一致）・agent 例外は 1 回だけ別エージェント（sonnet）で再試行し、通れば続行する。使い切れば停止する', async () => {
  for (const first of ['sha', 'throw']) {
    let n = 0
    const models = []
    const { calls } = await runScript({
      args: BASE_ARGS,
      override: (label, opts, prompt) => {
        if (label !== LABEL) return undefined
        models.push(opts.model)
        n += 1
        if (n === 1) {
          if (first === 'throw') throw new Error('agent crashed')
          return { ...hashPrecheckReply(prompt), sha256: '0'.repeat(64) }
        }
        return hashPrecheckReply(prompt)
      },
    })
    assert.equal(n, 2, first)
    assert.deepEqual(models, ['haiku', 'sonnet'])
    assert.ok(labels(calls).includes('state:load'), '再試行で通れば続行する')
  }
  await assert.rejects(
    runScript({ args: BASE_ARGS, override: (label) => (label === LABEL ? null : undefined) }),
    (e) => /スクリプトのハッシュを検査できなかった/.test(e.message) && /何も着手せずに停止した/.test(e.message),
  )
  await assert.rejects(
    runScript({ args: BASE_ARGS, override: (label) => { if (label === LABEL) throw new Error('boom'); return undefined } }),
    /スクリプトのハッシュを検査できなかった（agent 例外/,
  )
})

test('流れ: 1 回目と 2 回目の nonce は別（前の呼び出しの封筒は流用できない）', async () => {
  const nonces = []
  let n = 0
  await runScript({
    args: BASE_ARGS,
    override: (label, opts, prompt) => {
      if (label !== LABEL) return undefined
      nonces.push(/--nonce ([0-9a-z]+)/.exec(prompt)[1])
      n += 1
      return n === 1 ? { ...hashPrecheckReply(prompt), sha256: '0'.repeat(64) } : hashPrecheckReply(prompt)
    },
  })
  assert.equal(nonces.length, 2)
  assert.notEqual(nonces[0], nonces[1])
})

test('流れ: dryRun でも skillDir があれば予検査を 1 回行い、skillDir が無い dryRun では行わない（スクリプトを使わないため）', async () => {
  const withDir = await runScript({ args: { ...BASE_ARGS, dryRun: true } })
  assert.equal(labels(withDir.calls).filter((l) => l === LABEL).length, 1)
  const { skillDir, ...noDir } = BASE_ARGS
  assert.ok(skillDir)
  const without = await runScript({ args: { ...noDir, dryRun: true } })
  assert.equal(labels(without.calls).filter((l) => l === LABEL).length, 0)
  // 版ずれのある dryRun も停止する（見積りの前に版ずれを知らせる）
  await assert.rejects(
    runScript({ args: { ...BASE_ARGS, dryRun: true }, override: (label, opts, prompt) => (label === LABEL ? hashPrecheckReply(prompt, { ok: 0, missing: NAMES.length, firstBad: 1 }) : undefined) }),
    /版ずれまたは改変の疑い/,
  )
})
