// scripts/run-verified.sh（実行前のハッシュ照合 launcher）と、ビルダーによるハッシュ埋め込み
// （build-workflow.mjs の bundleSha256 / embedScriptHashes）の回帰テスト（Issue #603 第 1 弾）。
//
// 検証する契約:
//   - launcher のハッシュ定義（スクリプト本体 + lib/*.sh のバイト列連結）とビルダーの bundleSha256 が一致する
//     （sha256sum 経路と shasum 経路の両方）
//   - ハッシュ不一致・スクリプト欠落・不正なスクリプト名/ハッシュは起動せず、固有の終了コードで止まる
//   - lib の書き換え・追加でハッシュが変わる（lib を読み込む全スクリプトに波及する）
//   - 起動したスクリプトの終了コード・標準入力・標準出力はそのまま引き継ぐ
//   - 開発ファイルの目印がスクリプトのハッシュに置換される。スクリプトを書き換えると生成物が変わり、
//     `--check` の鮮度ゲートが検出する。スクリプトが無い・目印の書式が不正ならビルドは書かずに中止する
//   - リポジトリの生成物には目印が残らず、埋め込まれたハッシュが実スクリプトの bundleSha256 と一致する
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { chmodSync, copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, toolExists } from './lib/signed-output.mjs'
import { bundleSha256, embedScriptHashes, runBuild, SCRIPT_HASH_PLACEHOLDER_RE, DIST_PATH, SRC_PATH } from '../scripts/build-workflow.mjs'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const BASHES = availableBashes()
const sh = (cmd) => spawnSync('sh', ['-c', cmd], { encoding: 'utf8' }).stdout.trim()

// 本物の scripts/ を一時ディレクトリへ複製する（lib も含む）。書き換え・追加のテストが本物を汚さないため
function cloneScripts() {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-launcher-')))
  const scripts = join(dir, 'scripts')
  mkdirSync(join(scripts, 'lib'), { recursive: true })
  for (const f of ['run-verified.sh', 'measure-residual-bytes.sh', 'measure-free-disk.sh']) copyFileSync(join(SCRIPTS, f), join(scripts, f))
  for (const f of readdirSync(join(SCRIPTS, 'lib'))) copyFileSync(join(SCRIPTS, 'lib', f), join(scripts, 'lib', f))
  return { dir, scripts }
}

const launch = (bash, scripts, args, opts = {}) =>
  spawnSync(bash, [join(scripts, 'run-verified.sh'), ...args], { encoding: 'utf8', ...opts })

for (const bash of BASHES) {
  const tag = `[${bash}]`

  test(`${tag} launcher のハッシュ定義はビルダーの bundleSha256 と一致し、一致すれば起動して標準入力と出力を引き継ぐ`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const hash = bundleSha256(scripts, 'measure-free-disk.sh')
      const r = launch(bash, scripts, [hash, 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir])
      assert.equal(r.status, 0, r.stderr)
      assert.equal(JSON.parse(r.stdout).nonce, 'abc123')
      // 標準入力の引き継ぎ（residual は標準入力のパスを読む）
      const hash2 = bundleSha256(scripts, 'measure-residual-bytes.sh')
      const r2 = launch(bash, scripts, [hash2, 'measure-residual-bytes.sh', '--nonce', 'abc123'], { input: `${dir}\n` })
      assert.equal(r2.status, 0, r2.stderr)
      assert.equal(JSON.parse(r2.stdout).payload.count, 1)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} launcher: ハッシュ不一致は exit 3 で起動しない（標準出力は空・標準エラーに期待値と実測値）`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const real = bundleSha256(scripts, 'measure-free-disk.sh')
      const wrong = real.replace(/^./, real[0] === '0' ? '1' : '0')
      const r = launch(bash, scripts, [wrong, 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir])
      assert.equal(r.status, 3)
      assert.equal(r.stdout, '')
      assert.ok(r.stderr.includes(wrong) && r.stderr.includes(real), r.stderr)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} launcher: スクリプト本体の 1 バイトの書き換えで起動しない`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const hash = bundleSha256(scripts, 'measure-free-disk.sh')
      writeFileSync(join(scripts, 'measure-free-disk.sh'), `${readFileSync(join(scripts, 'measure-free-disk.sh'), 'utf8')}\n# tampered\n`)
      const r = launch(bash, scripts, [hash, 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir])
      assert.equal(r.status, 3)
      assert.equal(r.stdout, '')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} launcher: lib の書き換え・lib への追加も検出する（lib を読み込む全スクリプトのハッシュが変わる）`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const hash = bundleSha256(scripts, 'measure-free-disk.sh')
      writeFileSync(join(scripts, 'lib', 'extra.sh'), 'echo injected\n')
      assert.notEqual(bundleSha256(scripts, 'measure-free-disk.sh'), hash)
      const r = launch(bash, scripts, [hash, 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir])
      assert.equal(r.status, 3)
      // 追加した lib を含めた新しいハッシュなら起動する（launcher と bundleSha256 が lib の集合でも一致する）
      const r2 = launch(bash, scripts, [bundleSha256(scripts, 'measure-free-disk.sh'), 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir])
      assert.equal(r2.status, 0, r2.stderr)
      rmSync(join(scripts, 'lib', 'extra.sh'))
      writeFileSync(join(scripts, 'lib', 'signed-output.sh'), `${readFileSync(join(scripts, 'lib', 'signed-output.sh'), 'utf8')}# tampered\n`)
      assert.equal(launch(bash, scripts, [hash, 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir]).status, 3)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} launcher: lib/ が無い配置でもスクリプト単体のハッシュで動く（bundleSha256 と一致）`, () => {
    const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-launcher-nolib-')))
    try {
      copyFileSync(join(SCRIPTS, 'run-verified.sh'), join(dir, 'run-verified.sh'))
      writeFileSync(join(dir, 'hello.sh'), 'echo "hello $1"\nexit 7\n')
      const hash = bundleSha256(dir, 'hello.sh')
      const r = launch(bash, dir, [hash, 'hello.sh', 'world'])
      assert.equal(r.stdout, 'hello world\n')
      assert.equal(r.status, 7, '起動したスクリプトの終了コードをそのまま返す')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} launcher: スクリプトが無い・読めないは exit 4`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const r = launch(bash, scripts, ['a'.repeat(64), 'no-such-script.sh'])
      assert.equal(r.status, 4)
      assert.equal(r.stdout, '')
      // ディレクトリや lib 内のファイルは名前で指せない（スクリプト名は scripts/ 直下の *.sh だけ）
      assert.equal(launch(bash, scripts, ['a'.repeat(64), 'lib']).status, 2)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} launcher: 不正なスクリプト名・ハッシュは exit 2 で何も起動しない`, () => {
    const { dir, scripts } = cloneScripts()
    try {
      const h = 'a'.repeat(64)
      const bad = [
        [h, '../measure-free-disk.sh'],
        [h, 'lib/signed-output.sh'],
        [h, '/etc/passwd'],
        [h, 'Measure.sh'],
        [h, 'measure-free-disk'],
        [h, 'a..b.sh'],
        [h, '-x.sh'],
        [h, '.hidden.sh'],
        [h, ''],
        ['abc', 'measure-free-disk.sh'],
        ['A'.repeat(64), 'measure-free-disk.sh'],
        [`${h};touch x`, 'measure-free-disk.sh'],
        [h],
        [],
      ]
      for (const args of bad) {
        const r = launch(bash, scripts, args)
        assert.equal(r.status, 2, JSON.stringify(args))
        assert.equal(r.stdout, '', JSON.stringify(args))
      }
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test(`${tag} launcher: スクリプトは launcher と同じディレクトリから名前だけで解決する（cwd や PATH の同名ファイルは使わない）`, () => {
    const { dir, scripts } = cloneScripts()
    const other = trackTmp(mkdtempSync(join(tmpdir(), 'iit-launcher-cwd-')))
    try {
      writeFileSync(join(other, 'measure-free-disk.sh'), 'echo hijacked\n')
      const hash = bundleSha256(scripts, 'measure-free-disk.sh')
      const r = launch(bash, scripts, [hash, 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir], { cwd: other, env: { ...process.env, PATH: `${other}:${process.env.PATH}` } })
      assert.equal(r.status, 0, r.stderr)
      assert.ok(!r.stdout.includes('hijacked'))
    } finally {
      rmSync(dir, { recursive: true, force: true })
      rmSync(other, { recursive: true, force: true })
    }
  })

  // 実行経路が sha256sum / shasum のどちらでも同じハッシュになること。PATH に片方だけを置いて確かめる
  for (const tool of ['sha256sum', 'shasum']) {
    test(`${tag} launcher: ${tool} だけが使える環境でもビルダーと同じハッシュで起動できる`, { skip: !toolExists(tool) }, () => {
      const { dir, scripts } = cloneScripts()
      const bin = trackTmp(mkdtempSync(join(tmpdir(), 'iit-only-')))
      try {
        for (const t of ['dirname', 'cat', 'du', 'df', 'awk', tool]) {
          const p = sh(`command -v ${t}`)
          if (p) symlinkSync(p, join(bin, t))
        }
        // shasum は perl スクリプト。perl が PATH に無いと動かないため併せて置く
        if (tool === 'shasum' && sh('command -v perl')) symlinkSync(sh('command -v perl'), join(bin, 'perl'))
        const hash = bundleSha256(scripts, 'measure-free-disk.sh')
        const r = launch(bash, scripts, [hash, 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir], { env: { PATH: bin } })
        assert.equal(r.status, 0, r.stderr)
      } finally {
        rmSync(dir, { recursive: true, force: true })
        rmSync(bin, { recursive: true, force: true })
      }
    })
  }

  test(`${tag} launcher: sha256sum も shasum も無ければ exit 4（検証できないまま起動しない）`, () => {
    const { dir, scripts } = cloneScripts()
    const bin = trackTmp(mkdtempSync(join(tmpdir(), 'iit-nohash-')))
    try {
      for (const t of ['dirname', 'cat']) symlinkSync(sh(`command -v ${t}`), join(bin, t))
      const r = launch(bash, scripts, [bundleSha256(scripts, 'measure-free-disk.sh'), 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir], { env: { PATH: bin } })
      assert.equal(r.status, 4)
      assert.equal(r.stdout, '')
    } finally {
      rmSync(dir, { recursive: true, force: true })
      rmSync(bin, { recursive: true, force: true })
    }
  })
}

// --- ビルダーによる埋め込み ---

function fixture(files) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-embed-')))
  mkdirSync(join(dir, 'lib'), { recursive: true })
  for (const [name, body] of Object.entries(files)) {
    mkdirSync(dirname(join(dir, name)), { recursive: true })
    writeFileSync(join(dir, name), body)
  }
  return dir
}

test('bundleSha256: スクリプト本体 + lib/*.sh（バイト順・通常ファイルのみ・ドットで始まるものと .sh 以外は除外）の連結の SHA-256', () => {
  const dir = fixture({ 'x.sh': 'X\n', 'lib/b.sh': 'B\n', 'lib/a.sh': 'A\n', 'lib/.hidden.sh': 'H\n', 'lib/notes.txt': 'N\n' })
  try {
    mkdirSync(join(dir, 'lib', 'dir.sh')) // ディレクトリは除外
    const expected = spawnSync('sh', ['-c', 'printf "X\\nA\\nB\\n" | (sha256sum 2>/dev/null || shasum -a 256)'], { encoding: 'utf8' }).stdout.split(' ')[0]
    assert.equal(bundleSha256(dir, 'x.sh'), expected)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('embedScriptHashes: 目印を 64 桁 16 進に置換し、行数と目印以外の内容は変わらない。目印が無ければ入力のまま', () => {
  const dir = fixture({ 'a.sh': 'echo a\n', 'b-2.sh': 'echo b\n' })
  try {
    const src = "const H = { 'a.sh': '@@SCRIPT_SHA256:a.sh@@', 'b-2.sh': '@@SCRIPT_SHA256:b-2.sh@@' }\nconst x = 1\n"
    const out = embedScriptHashes(src, dir)
    assert.match(out, /^const H = \{ 'a\.sh': '[0-9a-f]{64}', 'b-2\.sh': '[0-9a-f]{64}' \}\nconst x = 1\n$/)
    assert.equal(out.split('\n').length, src.split('\n').length)
    assert.ok(out.includes(bundleSha256(dir, 'a.sh')))
    assert.equal(embedScriptHashes('const x = 1\n', dir), 'const x = 1\n')
    assert.ok(!out.includes('@@SCRIPT_SHA256:'))
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('embedScriptHashes: スクリプトが無い・目印の書式が不正（置換されずに残る）なら throw する', () => {
  const dir = fixture({ 'a.sh': 'echo a\n' })
  try {
    assert.throws(() => embedScriptHashes("'@@SCRIPT_SHA256:missing.sh@@'", dir), /ハッシュを埋め込めない.*missing\.sh/)
    for (const bad of ['@@SCRIPT_SHA256:A.sh@@', '@@SCRIPT_SHA256:a@@', '@@SCRIPT_SHA256:../a.sh@@', '@@SCRIPT_SHA256:a.sh']) {
      assert.throws(() => embedScriptHashes(`'${bad}'`, dir), /不正な書式/, bad)
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('目印の書式は run-verified.sh が受理するスクリプト名と同じ文字集合', () => {
  assert.ok(SCRIPT_HASH_PLACEHOLDER_RE.flags.includes('g'))
  assert.match('@@SCRIPT_SHA256:measure-residual-bytes.sh@@', new RegExp(SCRIPT_HASH_PLACEHOLDER_RE.source))
  assert.doesNotMatch('@@SCRIPT_SHA256:Bad.sh@@', new RegExp(SCRIPT_HASH_PLACEHOLDER_RE.source))
})

function buildFixture(scriptBody) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-build-')))
  const srcPath = join(dir, 'w.src.js')
  const distPath = join(dir, 'w.js')
  writeFileSync(srcPath, "export const meta = { name: 'x' }\nconst SHA = '@@SCRIPT_SHA256:t.sh@@' // 目印\n")
  if (scriptBody !== null) writeFileSync(join(dir, 't.sh'), scriptBody)
  return { dir, srcPath, distPath }
}

test('runBuild: 生成物に埋め込まれるハッシュはスクリプトの bundleSha256。スクリプトを書き換えると --check が鮮度エラーにする', () => {
  const { dir, srcPath, distPath } = buildFixture('echo v1\n')
  try {
    const built = runBuild({ srcPath, distPath })
    assert.equal(built.status, 0, built.stderr.join('\n'))
    const dist = readFileSync(distPath, 'utf8')
    assert.ok(dist.includes(bundleSha256(dir, 't.sh')))
    assert.ok(!dist.includes('@@'))
    assert.equal(runBuild({ srcPath, distPath, checkOnly: true }).status, 0)
    // スクリプトだけを書き換える（開発ファイルは不変）
    writeFileSync(join(dir, 't.sh'), 'echo v2\n')
    const stale = runBuild({ srcPath, distPath, checkOnly: true })
    assert.equal(stale.status, 1)
    assert.match(stale.stderr.join('\n'), /鮮度エラー/)
    // 再生成すると同期する
    assert.equal(runBuild({ srcPath, distPath }).status, 0)
    assert.equal(runBuild({ srcPath, distPath, checkOnly: true }).status, 0)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('runBuild: スクリプトが無ければ生成物を書かずに中止する（status 1・wrote false）', () => {
  const { dir, srcPath, distPath } = buildFixture(null)
  try {
    const r = runBuild({ srcPath, distPath })
    assert.equal(r.status, 1)
    assert.equal(r.wrote, false)
    assert.equal(existsSync(distPath), false)
    assert.match(r.stderr.join('\n'), /ハッシュを埋め込めない/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('実リポジトリの生成物: 目印は残らず、埋め込まれたハッシュは実スクリプトの bundleSha256 と一致する', () => {
  const dist = readFileSync(DIST_PATH, 'utf8')
  const src = readFileSync(SRC_PATH, 'utf8')
  assert.ok(!dist.includes('@@SCRIPT_SHA256:'), '生成物に目印が残っていない')
  const names = [...src.matchAll(SCRIPT_HASH_PLACEHOLDER_RE)].map((m) => m[1])
  assert.ok(names.length >= 2, `開発ファイルにスクリプトの目印がある（${names.join(', ')}）`)
  for (const name of new Set(names)) {
    assert.ok(existsSync(join(SCRIPTS, name)), `${name} が scripts/ にある`)
    assert.ok(dist.includes(`'${name}':'${bundleSha256(SCRIPTS, name)}'`), `${name} のハッシュが生成物に埋め込まれている`)
  }
})

test('スクリプト一式は実行ビットに依存しない（bash "<path>" で起動する）。launcher の起動コマンドは常に bash 経由', () => {
  const src = readFileSync(SRC_PATH, 'utf8')
  assert.match(src, /return `bash '\$\{skillDir\}\/scripts\/run-verified\.sh' \$\{SCRIPT_SHA256\[name\]\} \$\{name\}\$\{nonce === undefined \? '' : ` --nonce \$\{nonce\}`\}/)
  // 実行ビットを落としても launcher 経由で動く
  const { dir, scripts } = cloneScripts()
  try {
    for (const f of ['run-verified.sh', 'measure-free-disk.sh']) chmodSync(join(scripts, f), 0o644)
    const r = launch(BASHES[0], scripts, [bundleSha256(scripts, 'measure-free-disk.sh'), 'measure-free-disk.sh', '--nonce', 'abc123', '--', dir])
    assert.equal(r.status, 0, r.stderr)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
