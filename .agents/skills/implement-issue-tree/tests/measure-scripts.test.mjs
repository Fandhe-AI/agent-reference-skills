// 測定スクリプト（scripts/measure-residual-bytes.sh・measure-free-disk.sh）を実際に実行する回帰テスト
// （Issue #603 第 1 弾）。一時ディレクトリにファイルを作って du / df を本当に走らせる。
//
// 検証する契約（ホスト側の判定ロジックは変えていないので、スクリプトは旧プロンプトのシェルと同じ意味を保つ）:
//   - 存在しないパスは測定失敗にせず missing に数え、kib へは 0 として加算する
//   - du の実失敗・出力欠損・許可文字集合外のパス・相対パスは err に数える（kib=0 に畳み込まない）
//   - count は処理した行数で、入力の件数と一致する（ホストが送った件数と突き合わせる）
//   - 出力は 1 行の封筒 {nonce, payload, sha256}。sha256 は nonce + 改行 + payload の正規形の SHA-256
//   - 入力はシェルに再評価されない（$(...)・バッククォート・; を含むパスは実行されず err になる）
//
// CI は Linux（GNU）、手元は macOS（BSD userland・/bin/bash は 3.2）。両方で通る書き方だけを使う:
// 利用できる bash（/bin/bash と Homebrew の bash など）をすべて回し、fake の du / df は PATH の先頭へ置く。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { chmodSync, closeSync, existsSync, mkdirSync, mkdtempSync, openSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, expectedSha256, inputSha256, toolExists } from './lib/signed-output.mjs'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const RESIDUAL = join(SCRIPTS, 'measure-residual-bytes.sh')
const FREE = join(SCRIPTS, 'measure-free-disk.sh')
const NONCE = 'k3x9a0b1c2d4e5f6g7h8i9j0k1l2'
const BASHES = availableBashes()

function run(bash, script, args, { input = '', env = {} } = {}) {
  const r = spawnSync(bash, [script, ...args], {
    input,
    encoding: 'utf8',
    env: { ...process.env, ...env },
  })
  return r
}

// 標準出力が 1 行の封筒であることを検証して返す
function parseEnvelope(r) {
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  assert.match(r.stdout, /^[^\n]+\n$/, '標準出力は 1 行（末尾の改行 1 つ）')
  const env = JSON.parse(r.stdout)
  assert.deepEqual(Object.keys(env).sort(), ['nonce', 'payload', 'sha256'])
  return env
}

function duKib(path) {
  const r = spawnSync('du', ['-sk', '--', path], { encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  return Number(r.stdout.split(/\s/)[0])
}

// 実行する du / df の代わりに置く偽コマンドのディレクトリを作る
function fakeBin(files) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-fakebin-')))
  for (const [name, body] of Object.entries(files)) {
    const p = join(dir, name)
    writeFileSync(p, `#!/bin/sh\n${body}\n`)
    chmodSync(p, 0o755)
  }
  return dir
}

function withWork(fn) {
  const work = trackTmp(mkdtempSync(join(tmpdir(), 'iit-measure-')))
  try {
    return fn(work)
  } finally {
    rmSync(work, { recursive: true, force: true })
  }
}

function mkTree(work, name, kib = 8) {
  const d = join(work, name)
  mkdirSync(d, { recursive: true })
  writeFileSync(join(d, 'f.bin'), Buffer.alloc(kib * 1024, 1))
  return d
}

for (const bash of BASHES) {
  const tag = `[${bash}]`

  test(`${tag} residual: 実在パスの du 合計・存在しないパスは missing・件数は入力行数と一致し、封筒の sha256 が正しい`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a', 64)
      const b = mkTree(work, 'wt b with space', 32) // 半角スペースは許可文字集合
      const gone = join(work, 'gone')
      const r = run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n${b}\n${gone}\n` })
      const env = parseEnvelope(r)
      assert.equal(env.nonce, NONCE)
      // inputSha256 は標準入力のパス列（末尾の改行 1 つを除く）の SHA-256。ホストが送った列から再計算して照合する
      assert.deepEqual(env.payload, { count: 3, dup: 0, err: 0, inputSha256: inputSha256(`${a}\n${b}\n${gone}`), kib: duKib(a) + duKib(b), missing: 1 })
      assert.equal(env.sha256, expectedSha256(NONCE, env.payload))
      // payload のキー順は昇順（ホストの canonicalJson と同じ正規形）
      assert.match(r.stdout, /"payload":\{"count":\d+,"dup":\d+,"err":\d+,"inputSha256":"[0-9a-f]{64}","kib":\d+,"missing":\d+\}/)
    })
  })

  // AH: 同じ実体の別の綴り（/./ 混じり・/var と /private/var・シンボリックリンク経由・末尾スラッシュ）を物理パスに解決して 1 回だけ測る。
  // count は入力の行数のまま（ホストは送った件数との一致を検証する）、封筒の形（キーの集合）は変えない
  test(`${tag} residual: 同じ実体の別の綴り（/./ 混じり・シンボリックリンク経由・末尾スラッシュ・/private 付き）は 1 回だけ数え、count は入力の行数のまま`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a', 64)
      const other = mkTree(work, 'wt-other', 32)
      const link = join(work, 'link-to-a')
      symlinkSync(a, link)
      const dotted = `${work}/./wt-a`
      const viaLinkDir = `${link}/`
      const real = realpathSync(a)
      const spellings = [a, dotted, link, viaLinkDir, real, `${a}/`, `${work}//wt-a`]
      const input = [...spellings, other].join('\n')
      const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input }))
      assert.deepEqual(env.payload, { count: spellings.length + 1, dup: spellings.length - 1, err: 0, inputSha256: inputSha256(input), kib: duKib(a) + duKib(other), missing: 0 })
      // 対照: 別の実体は別々に数える
      const two = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n${other}` }))
      assert.equal(two.payload.kib, duKib(a) + duKib(other))
    })
  })

  // AJ: 重複した行は dup に数える。ホストは平均の分母を count - missing - dup にする（dup を引かないと分母が膨らみ、平均が下がる）
  test(`${tag} residual: 同じ実体の 2 つの綴り + 別の実体 + 存在しないパスは dup=1・missing=1 で、count - missing - dup が kib に足された実体の数と一致する`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a', 64)
      const other = mkTree(work, 'wt-other', 32)
      const link = join(work, 'link-to-a')
      symlinkSync(a, link)
      const input = [a, link, other, join(work, 'gone')].join('\n')
      const p = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input })).payload
      assert.deepEqual([p.count, p.dup, p.missing, p.err, p.kib], [4, 1, 1, 0, duKib(a) + duKib(other)])
      assert.equal(p.count - p.missing - p.dup, 2, '平均の分母 = kib に足された実体の数')
    })
  })

  // AK: * ? [ を含む物理パスは許可文字集合の外なので測らず err に数える。それに似た名前の別の実体（許可内）は別のパスとして測る（dup にしない）
  test(`${tag} residual: 名前に * や [ を含む実ディレクトリへのシンボリックリンクは err。それに似た名前の別の実体は測る（dup=0・順序に依らない）`, () => {
    withWork((work) => {
      const pairs = [
        ['a*b', 'aXb'],
        ['d[1]', 'd1'],
        ['q?z', 'qYz'],
      ]
      for (const [odd, plain] of pairs) {
        const o = mkTree(work, odd, 40)
        const pl = mkTree(work, plain, 24)
        const lo = join(work, `link-${plain}-odd`)
        const lp = join(work, `link-${plain}-plain`)
        symlinkSync(o, lo)
        symlinkSync(pl, lp)
        for (const order of [[lp, lo], [lo, lp]]) {
          const p = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: order.join('\n') })).payload
          assert.deepEqual([p.count, p.dup, p.missing, p.err, p.kib], [2, 0, 0, 1, duKib(pl)], `${odd} / ${plain}`)
        }
      }
    })
  })

  // AN: 物理パスが許可文字集合を外れる（改行を含む等）ときは測らず err に数える（fail-closed）。dup・seen の特別扱いは要らない
  test(`${tag} residual: 物理パスが改行を含む実体は測らず err に数える。行に分かれた前半が実在する別のパスでも、そちらは測られ重複扱いされない`, () => {
    withWork((work) => {
      const nlDir = mkTree(work, 'has\nnewline', 16)
      const plain = mkTree(work, 'has', 8)
      const l1 = join(work, 'l1')
      const l2 = join(work, 'l2')
      symlinkSync(nlDir, l1)
      symlinkSync(nlDir, l2)
      const p = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: [l1, plain, l2].join('\n') })).payload
      assert.deepEqual([p.count, p.dup, p.missing, p.err], [3, 0, 0, 2])
      assert.equal(p.kib, duKib(plain))
    })
  })

  // AN: コマンド置換は末尾の改行を落とす。名前が改行で終わるディレクトリの物理パスが、短い別の兄弟のパスに化けてはいけない
  test(`${tag} residual: 名前が改行で終わるディレクトリへのシンボリックリンクは err。同じ綴りの短い名前の兄弟は測られ、dup にならない（どちらの順でも）`, () => {
    withWork((work) => {
      const nlDir = mkTree(work, 'sib\n', 16)
      const sib = mkTree(work, 'sib', 8)
      const link = join(work, 'link-nl')
      symlinkSync(nlDir, link)
      for (const order of [[link, sib], [sib, link]]) {
        const p = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: order.join('\n') })).payload
        assert.deepEqual([p.count, p.dup, p.missing, p.err, p.kib], [2, 0, 0, 1, duKib(sib)], order.join(' | '))
      }
      // ファイルの場合（親は許可内・名前が許可外ではなく、親ディレクトリの名前が改行で終わる）
      const f = join(nlDir, 'f.bin')
      const viaLink = join(link, 'f.bin')
      const pf = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: [viaLink, join(sib, 'f.bin')].join('\n') })).payload
      assert.deepEqual([pf.count, pf.dup, pf.err], [2, 0, 1], f)
    })
  })

  test(`${tag} residual: 物理パスが許可文字集合の外（@ + など）のシンボリックリンクは du に渡さず err に数える。許可内の物理パスは従来どおり測る`, () => {
    withWork((work) => {
      const odd = mkTree(work, 'a@b+c', 16)
      const ok = mkTree(work, 'ok', 8)
      const l = join(work, 'link-odd')
      symlinkSync(odd, l)
      const p = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: [l, ok].join('\n') })).payload
      assert.deepEqual([p.count, p.dup, p.missing, p.err, p.kib], [2, 0, 0, 1, duKib(ok)])
    })
  })

  // AM: seen_has はリダイレクトしたループの中から return しない。重複の後の行も処理される
  test(`${tag} residual: 重複行のあとに続く行も処理される（dup を数えてもループが止まらない）。許可外の物理パスの行は err に数えて続行する`, () => {
    withWork((work) => {
      const odd = mkTree(work, 'g*', 32)
      const pl = mkTree(work, 'gx', 16)
      const tail = mkTree(work, 'tail', 8)
      const lo = join(work, 'lo')
      symlinkSync(odd, lo)
      const input = [pl, `${pl}/.`, lo, `${pl}/./`, tail, `${tail}/.`, join(work, 'gone')].join('\n')
      const p = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input })).payload
      assert.deepEqual([p.count, p.dup, p.missing, p.err, p.kib], [7, 3, 1, 1, duKib(pl) + duKib(tail)])
    })
  })

  // AM: seen_has は文字列の包含で判定する。* ? [ を含む引数が別のパスに一致しない（スクリプトの関数だけを取り出して直接呼ぶ。
  // 物理パスの許可文字検査で * ? [ はここまで届かないので、関数単体の契約として確かめる）
  test(`${tag} residual: seen_has は * ? [ を含む引数を文字どおり比べ、別のパスに一致しない。重複は一致する`, () => {
    const src = readFileSync(RESIDUAL, 'utf8')
    const m = src.match(/^seen_has\(\) \{\n[\s\S]*?^\}\n/m)
    assert.ok(m, 'seen_has が見つかる')
    const script = [
      "nl='\n'",
      m[0],
      "seen=${nl}/w/aXb${nl}/w/d1${nl}/w/q.z${nl}",
      'for q in "/w/a*b" "/w/d[1]" "/w/q?z" "/w/*" "/w/aXb" "/w/d1" "/w/q.z" "/w/aX" "/w/a"; do',
      '  if seen_has "$q"; then echo "hit $q"; else echo "miss $q"; fi',
      'done',
    ].join('\n')
    const r = spawnSync(bash, ['-c', script], { encoding: 'utf8' })
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(r.stdout.trim().split('\n'), [
      'miss /w/a*b', 'miss /w/d[1]', 'miss /w/q?z', 'miss /w/*', 'hit /w/aXb', 'hit /w/d1', 'hit /w/q.z', 'miss /w/aX', 'miss /w/a',
    ])
  })

  test(`${tag} residual: シンボリックリンクだけを渡しても、指す実体を測る。ファイルの別の綴り（/./）も 1 回だけ。存在しないパスの別の綴りは従来どおり missing`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a', 64)
      const link = join(work, 'link-to-a')
      symlinkSync(a, link)
      const only = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: link }))
      assert.deepEqual([only.payload.kib, only.payload.err, only.payload.missing], [duKib(a), 0, 0])
      const f = join(a, 'f.bin')
      const file = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${f}\n${a}/./f.bin` }))
      assert.deepEqual([file.payload.kib, file.payload.count, file.payload.err], [duKib(f), 2, 0])
      const gone = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${work}/gone\n${work}/./gone` }))
      assert.deepEqual([gone.payload.kib, gone.payload.count, gone.payload.missing, gone.payload.err], [0, 2, 2, 0])
    })
  })

  test(`${tag} residual: 0 件は count=0・err=0・kib=0 の正常な封筒（取得失敗とは err で区別する）`, () => {
    const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: '' }))
    assert.deepEqual(env.payload, { count: 0, dup: 0, err: 0, inputSha256: inputSha256(''), kib: 0, missing: 0 })
  })

  test(`${tag} residual: 末尾の改行が無い最終行も 1 件として処理する`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: a }))
      assert.deepEqual(env.payload, { count: 1, dup: 0, err: 0, inputSha256: inputSha256(a), kib: duKib(a), missing: 0 })
    })
  })

  test(`${tag} residual: 空ディレクトリの kib は du の実測値と一致する（0 とは限らない）`, () => {
    withWork((work) => {
      const d = join(work, 'empty')
      mkdirSync(d)
      const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${d}\n` }))
      assert.equal(env.payload.kib, duKib(d))
      assert.equal(env.payload.err, 0)
    })
  })

  test(`${tag} residual: 許可文字集合外・相対・.. を含む・ルート直下のパスは du に渡さず err に数える（実行もされない）`, () => {
    withWork((work) => {
      const good = mkTree(work, 'wt-ok', 16)
      const marker = join(work, 'PWNED')
      const bad = [
        `/tmp/x;touch ${marker}`,
        `/tmp/$(touch ${marker})`,
        '/tmp/`touch ' + marker + '`',
        '/tmp/a|b',
        '/tmp/a*b',
        "/tmp/it's",
        '/tmp/../etc',
        'relative/path',
        '/',
        '/-rf',
        '',
      ]
      const r = run(bash, RESIDUAL, ['--nonce', NONCE], { input: [good, ...bad].join('\n') + '\n' })
      const env = parseEnvelope(r)
      assert.deepEqual(env.payload, { count: 1 + bad.length, dup: 0, err: bad.length, inputSha256: inputSha256([good, ...bad].join('\n')), kib: duKib(good), missing: 0 })
      assert.equal(existsSync(marker), false, '入力がシェルに再評価されていない')
    })
  })

  test(`${tag} residual: du が失敗したら err に数え、成功した分の合計を kib に出す（0 に畳み込まない）`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      const b = mkTree(work, 'wt-b')
      // wt-a だけ失敗する偽 du。それ以外は本物へ委譲する
      const real = spawnSync('sh', ['-c', 'command -v du'], { encoding: 'utf8' }).stdout.trim()
      const bin = fakeBin({ du: `case "$*" in *wt-a*) exit 1 ;; esac\nexec ${real} "$@"` })
      try {
        const r = run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n${b}\n`, env: { PATH: `${bin}:${process.env.PATH}` } })
        const env = parseEnvelope(r)
        assert.deepEqual(env.payload, { count: 2, dup: 0, err: 1, inputSha256: inputSha256(`${a}\n${b}`), kib: duKib(b), missing: 0 })
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} residual: du が 0 終了でも出力が数値でなければ err（出力欠損を 0 KiB にしない）`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      for (const body of ['exit 0', 'echo notanumber /x', 'printf "\\t%s\\n" x']) {
        const bin = fakeBin({ du: body })
        try {
          const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n`, env: { PATH: `${bin}:${process.env.PATH}` } }))
          assert.deepEqual(env.payload, { count: 1, dup: 0, err: 1, inputSha256: inputSha256(a), kib: 0, missing: 0 }, body)
        } finally {
          rmSync(bin, { recursive: true, force: true })
        }
      }
    })
  })

  test(`${tag} residual: 多数件（400 件）でも件数と合計が崩れない`, () => {
    withWork((work) => {
      // 同じ実体は 1 回しか数えない（AH）ので、合計の検査には別々のディレクトリを使う
      const lines = []
      let kib = 0
      for (let i = 0; i < 400; i++) {
        if (i % 4 === 3) { lines.push(join(work, `gone-${i}`)); continue }
        const d = mkTree(work, `wt-${i}`, 4)
        kib += duKib(d)
        lines.push(d)
      }
      const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: lines.join('\n') + '\n' }))
      assert.deepEqual(env.payload, { count: 400, dup: 0, err: 0, inputSha256: inputSha256(lines.join('\n')), kib, missing: 100 })
    })
  })


  // --- 数値の解釈（先頭ゼロを 8 進と読まない・算術エラーで err:0 のまま出力しない） ---

  test(`${tag} residual: du の出力が先頭ゼロ（08・0600）でも 10 進として合算する（8 進解釈・算術エラーにしない）`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      for (const [out, kib] of [['08', 8], ['0600', 600], ['007', 7], ['0', 0]]) {
        const bin = fakeBin({ du: `printf '${out}\\t%s\\n' "$3"` })
        try {
          const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n`, env: { PATH: `${bin}:${process.env.PATH}` } }))
          assert.deepEqual(env.payload, { count: 1, dup: 0, err: 0, inputSha256: inputSha256(a), kib, missing: 0 }, out)
        } finally {
          rmSync(bin, { recursive: true, force: true })
        }
      }
    })
  })

  test(`${tag} residual: 1 件が 15 桁を超える du の出力は err（算術がラップして誤った値を err:0 で出さない）`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      for (const out of ['99999999999999999999', '9223372036854775808', '18446744073709551617']) {
        const bin = fakeBin({ du: `printf '${out}\\t%s\\n' "$3"` })
        try {
          const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n`, env: { PATH: `${bin}:${process.env.PATH}` } }))
          assert.equal(env.payload.err, 1, out)
          assert.equal(env.payload.kib, 0, out)
        } finally {
          rmSync(bin, { recursive: true, force: true })
        }
      }
    })
  })

  test(`${tag} free-disk: Available が先頭ゼロ（08・0600）でも 10 進の整数として返す`, () => {
    withWork((work) => {
      for (const [avail, free] of [['08', 8], ['0600', 600], ['000', 0]]) {
        const bin = fakeBin({ df: `echo "Filesystem 1024-blocks Used Available Capacity Mounted on"; echo "/dev/x 1000 400 ${avail} 40% /"` })
        try {
          const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}` } }))
          assert.deepEqual(env.payload, { err: 0, freeKib: free, inputSha256: inputSha256(work) }, avail)
        } finally {
          rmSync(bin, { recursive: true, force: true })
        }
      }
    })
  })

  test(`${tag} free-disk: 桁あふれする Available は err`, () => {
    withWork((work) => {
      const bin = fakeBin({ df: 'echo "Filesystem 1024-blocks Used Available Capacity Mounted on"; echo "/dev/x 1 1 99999999999999999999 40% /"' })
      try {
        const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}` } }))
        assert.deepEqual(env.payload, { err: 1, freeKib: 0, inputSha256: inputSha256(work) })
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  // --- S1: df の単位 ---

  test(`${tag} free-disk: POSIXLY_CORRECT が設定されていても 1024 バイト単位で測る（busybox の df は -k を無視して 512 バイト単位になる）`, () => {
    withWork((work) => {
      // busybox を模す: POSIXLY_CORRECT が設定されているとヘッダが 512-blocks になり、値も 2 倍になる
      const bin = fakeBin({
        df: `if env | grep -q "^POSIXLY_CORRECT="; then echo "Filesystem 512-blocks Used Available Capacity Mounted on"; echo "/dev/x 2000 800 1200 40% /"; else echo "Filesystem 1024-blocks Used Available Capacity Mounted on"; echo "/dev/x 1000 400 600 40% /"; fi`,
      })
      try {
        const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}`, POSIXLY_CORRECT: '1' } }))
        assert.deepEqual(env.payload, { err: 0, freeKib: 600, inputSha256: inputSha256(work) })
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} free-disk: ヘッダが 1024-blocks でなければ（単位を確かめられなければ）err`, () => {
    withWork((work) => {
      for (const header of ['Filesystem 512-blocks Used Available Capacity Mounted on', 'Filesystem Size Used Avail Use% Mounted on', 'Filesystem 1M-blocks Used Available Capacity Mounted on']) {
        const bin = fakeBin({ df: `echo "${header}"; echo "/dev/x 1000 400 600 40% /"` })
        try {
          const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}` } }))
          assert.deepEqual(env.payload, { err: 1, freeKib: 0, inputSha256: inputSha256(work) }, header)
        } finally {
          rmSync(bin, { recursive: true, force: true })
        }
      }
    })
  })

  test(`${tag} free-disk: デバイス名に空白があっても Available を取り違えない（Capacity 列を基準に数える）`, () => {
    withWork((work) => {
      const bin = fakeBin({ df: 'echo "Filesystem 1024-blocks Used Available Capacity Mounted on"; echo "map auto_home 1000 400 600 40% /System/Volumes/Data/home"' })
      try {
        const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}` } }))
        assert.deepEqual(env.payload, { err: 0, freeKib: 600, inputSha256: inputSha256(work) })
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} du: POSIXLY_CORRECT・BLOCKSIZE 系の環境変数が設定されていても kib は変わらない（-k を明示している）`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a', 64)
      const env0 = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n` }))
      for (const e of [{ POSIXLY_CORRECT: '1' }, { BLOCKSIZE: '512' }, { BLOCK_SIZE: '1M' }, { DU_BLOCK_SIZE: '1M' }]) {
        const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n`, env: e }))
        assert.deepEqual(env.payload, env0.payload, JSON.stringify(e))
      }
    })
  })

  // --- Issue #603 第 2 弾の持ち越し（#611 の独立レビュー 2 回目）---

  test(`${tag} residual: 1 件ずつは 15 桁以内でも、合計が 15 桁を超える加算は err（合計が桁あふれして負値にならない）`, () => {
    withWork((work) => {
      const paths = ['a', 'b', 'c'].map((n) => mkTree(work, n))
      const bin = fakeBin({ du: "printf '999999999999999\\t%s\\n' \"$3\"" })
      try {
        const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${paths.join('\n')}\n`, env: { PATH: `${bin}:${process.env.PATH}` } }))
        assert.equal(env.payload.count, 3)
        assert.equal(env.payload.kib, 999999999999999, '15 桁以内の合計までは採用する')
        assert.equal(env.payload.err, 2, '上限を超える 2 件目・3 件目は err に数え、kib に加算しない')
        assert.ok(env.payload.kib >= 0)
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} residual: du が POSIXLY_CORRECT・BLOCKSIZE 系の環境変数に反応する実装でも、スクリプトが外すので kib は変わらない（unset の効果）`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      // sh が bash の posix モードだと POSIXLY_CORRECT が（export されない）シェル変数として自動で立つため、export された環境だけを見る
      const bin = fakeBin({ du: 'if env | grep -qE "^(POSIXLY_CORRECT|BLOCKSIZE|BLOCK_SIZE|DU_BLOCK_SIZE)="; then printf "999\\t%s\\n" "$3"; else printf "10\\t%s\\n" "$3"; fi' })
      try {
        for (const e of [{ POSIXLY_CORRECT: '1' }, { BLOCKSIZE: '512' }, { BLOCK_SIZE: '1M' }, { DU_BLOCK_SIZE: '1M' }, {}]) {
          const env = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n`, env: { PATH: `${bin}:${process.env.PATH}`, ...e } }))
          assert.equal(env.payload.kib, 10, JSON.stringify(e))
        }
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} free-disk: ロケールが翻訳されたヘッダを出す環境でも LC_ALL=C で固定して測れる（LC_ALL の効果）`, () => {
    withWork((work) => {
      const bin = fakeBin({
        df: 'if [ "$LC_ALL" = C ]; then echo "Filesystem 1024-blocks Used Available Capacity Mounted on"; else echo "Dateisystem 1024-Bl\u00f6cke Benutzt Verf\u00fcgbar Kapazit\u00e4t Eingeh\u00e4ngt auf"; fi; echo "/dev/x 1000 400 600 40% /"',
      })
      try {
        for (const lc of ['de_DE.UTF-8', 'ja_JP.UTF-8', 'C']) {
          const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}`, LC_ALL: lc, LANG: lc } }))
          assert.deepEqual(env.payload, { err: 0, freeKib: 600, inputSha256: inputSha256(work) }, lc)
        }
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} residual: 行末が CRLF になった貼り付けは CR を落として同じハッシュ・同じ測定結果になり、原因を標準エラーに出す`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      const b = mkTree(work, 'wt-b')
      const lf = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n${b}\n` }))
      const r = run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\r\n${b}\r\n` })
      const crlf = parseEnvelope(r)
      assert.deepEqual(crlf.payload, lf.payload)
      assert.equal(crlf.payload.inputSha256, inputSha256(`${a}\n${b}`), 'ホストが送った LF のパス列のハッシュと一致する')
      assert.match(r.stderr, /CR が 2 個あった/)
    })
  })

  test(`${tag} residual: 行末の空白は別のパスなので落とさない（\`/a \` と \`/a\` は別のハッシュ）。空行・行末空白は標準エラーに件数を出す`, () => {
    withWork((work) => {
      const a = mkTree(work, 'wt-a')
      const plain = parseEnvelope(run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a}\n` }))
      const r = run(bash, RESIDUAL, ['--nonce', NONCE], { input: `${a} \n\n` })
      const spaced = parseEnvelope(r)
      assert.notEqual(spaced.payload.inputSha256, plain.payload.inputSha256, '空白付きを空白なしと同じハッシュにしない')
      assert.equal(spaced.payload.inputSha256, inputSha256(`${a} \n`))
      assert.equal(spaced.payload.count, 2)
      assert.equal(spaced.payload.missing, 1, '空白付きは存在しない別のパスとして数える')
      assert.equal(spaced.payload.err, 1, '空行は err')
      assert.match(r.stderr, /空行 1 件・行末が空白の行 1 件/)
    })
  })

  test(`${tag} residual: 標準入力を読めなければ（cat が失敗すれば）exit 3 で封筒を出さない（count:0, err:0 の封筒にならない）`, () => {
    withWork((work) => {
      const dirFd = openSync(work, 'r')
      try {
        const r = spawnSync(bash, [RESIDUAL, '--nonce', NONCE], { encoding: 'utf8', stdio: [dirFd, 'pipe', 'pipe'] })
        assert.equal(r.status, 3, `exit ${r.status} / stdout: ${r.stdout}`)
        assert.equal(r.stdout, '')
      } finally {
        closeSync(dirFd)
      }
    })
  })

  test(`${tag} residual: --nonce の欠落・形式不正・未知の引数は exit 2 で封筒を出さない`, () => {
    for (const args of [[], ['--nonce'], ['--nonce', ''], ['--nonce', 'ABC'], ['--nonce', 'a b'], ['--nonce', 'a;b'], ['--nonce', 'x'.repeat(65)], ['--bogus']]) {
      const r = run(bash, RESIDUAL, args, { input: '/tmp\n' })
      assert.equal(r.status, 2, JSON.stringify(args))
      assert.equal(r.stdout, '', JSON.stringify(args))
    }
  })

  test(`${tag} residual: sha256sum / shasum が無ければ exit 3 で封筒を出さない`, () => {
    // dirname と du だけを置いた PATH。sha256sum / shasum は無い
    const bin = trackTmp(mkdtempSync(join(tmpdir(), 'iit-nohash-')))
    try {
      for (const t of ['dirname', 'du']) {
        const p = spawnSync('sh', ['-c', `command -v ${t}`], { encoding: 'utf8' }).stdout.trim()
        symlinkSync(p, join(bin, t))
      }
      const r = run(bash, RESIDUAL, ['--nonce', NONCE], { input: '/tmp\n', env: { PATH: bin } })
      assert.equal(r.status, 3)
      assert.equal(r.stdout, '')
    } finally {
      rmSync(bin, { recursive: true, force: true })
    }
  })

  test(`${tag} free-disk: 実パスの freeKib は正の整数で err=0、封筒の sha256 が正しい`, () => {
    withWork((work) => {
      const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work]))
      assert.equal(env.payload.err, 0)
      assert.ok(Number.isInteger(env.payload.freeKib) && env.payload.freeKib > 0, JSON.stringify(env.payload))
      assert.deepEqual(Object.keys(env.payload), ['err', 'freeKib', 'inputSha256'])
      assert.equal(env.payload.inputSha256, inputSha256(work), '対象パスを束縛する')
      assert.equal(env.sha256, expectedSha256(NONCE, env.payload))
      // 本物の df と同じ桁であること（実行間の変動は許容: 1 GiB 以内）
      const df = spawnSync('df', ['-Pk', '--', work], { encoding: 'utf8' }).stdout.split('\n')[1].trim().split(/\s+/)
      assert.ok(Math.abs(Number(df[3]) - env.payload.freeKib) < 1024 * 1024, `df=${df[3]} script=${env.payload.freeKib}`)
    })
  })

  test(`${tag} free-disk: 偽 df の Available 列（第 4 列）をそのまま freeKib にする`, () => {
    withWork((work) => {
      const bin = fakeBin({ df: 'echo "Filesystem 1024-blocks Used Available Capacity Mounted"; echo "/dev/x 1000000 400000 600000 40% /"' })
      try {
        const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}` } }))
        assert.deepEqual(env.payload, { err: 0, freeKib: 600000, inputSha256: inputSha256(work) })
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} free-disk: 取得失敗は err=1・freeKib=0（空き 0 KiB の実測とは err で区別できる）`, () => {
    withWork((work) => {
      // df の非 0 終了 / 出力が 1 行だけ / 第 4 列が数値でない
      for (const body of ['exit 1', 'echo header-only', 'echo "Filesystem 1024-blocks Used Available Capacity Mounted on"; echo "/dev/x 1 2 abc 4% /"', 'exit 0']) {
        const bin = fakeBin({ df: body })
        try {
          const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}` } }))
          assert.deepEqual(env.payload, { err: 1, freeKib: 0, inputSha256: inputSha256(work) }, body)
        } finally {
          rmSync(bin, { recursive: true, force: true })
        }
      }
      // 空き 0 の実測は err=0・freeKib=0
      const bin = fakeBin({ df: 'echo "Filesystem 1024-blocks Used Available Capacity Mounted on"; echo "/dev/x 1 1 0 100% /"' })
      try {
        const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', work], { env: { PATH: `${bin}:${process.env.PATH}` } }))
        assert.deepEqual(env.payload, { err: 0, freeKib: 0, inputSha256: inputSha256(work) })
      } finally {
        rmSync(bin, { recursive: true, force: true })
      }
    })
  })

  test(`${tag} free-disk: 存在しない・許可文字集合外・相対のパスは err=1 で、入力は再評価されない`, () => {
    withWork((work) => {
      const marker = join(work, 'PWNED')
      for (const p of [join(work, 'none'), `/tmp/$(touch ${marker})`, '/tmp/a;b', 'relative', '/tmp/../etc', '/']) {
        const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', p]))
        assert.deepEqual(env.payload, { err: 1, freeKib: 0, inputSha256: inputSha256(p) }, p)
      }
      assert.equal(existsSync(marker), false)
    })
  })

  test(`${tag} free-disk: 使い方の誤り（nonce 不正・パス 0 件・2 件・-- なし）は exit 2 で封筒を出さない`, () => {
    for (const args of [[], ['--nonce', NONCE], ['--nonce', NONCE, '--'], ['--nonce', NONCE, '--', '/tmp', '/var'], ['--nonce', 'BAD', '--', '/tmp'], ['--nonce', NONCE, '/tmp']]) {
      const r = run(bash, FREE, args)
      assert.equal(r.status, 2, JSON.stringify(args))
      assert.equal(r.stdout, '', JSON.stringify(args))
    }
  })

  test(`${tag} free-disk: パスが -- の後ろにあれば先頭が - でも引数として解釈されない`, () => {
    // 先頭が - のパスは許可文字集合外（絶対パスでない）として err=1 になるだけで、df のオプションにならない
    const env = parseEnvelope(run(bash, FREE, ['--nonce', NONCE, '--', '-h']))
    assert.deepEqual(env.payload, { err: 1, freeKib: 0, inputSha256: inputSha256('-h') })
  })
}

test('利用できる bash を 1 つ以上で実行している（macOS では /bin/bash 3.2 を含む）', () => {
  assert.ok(BASHES.length >= 1)
  assert.ok(toolExists('du') && toolExists('df') && toolExists('awk'))
})
