// scripts/state.sh の読み取りモード verify と scripts/lib/state-verify-lib.sh の回帰テスト（Issue #603 計画 C の P5）。
//
// 4 層:
//  (1) lib の判定（sv_uint）を 1 回の bash 起動で表のまま検査する。
//  (2) 実スクリプトを実 jq で走らせ、封筒（nonce・sha256・入力の束縛）・ページ送り・outcome（ok / nofile / error）を、
//      利用できる bash すべて（/bin/bash 3.2 と PATH の bash 5 等）で検査する。
//  (3) 差分テスト: 従来のインラインのコマンド（P5 より前の state:load-verify プロンプトに埋め込まれていたもの）を同じ入力に
//      流し、キーのダイジェスト・件数・高水位・項目ごとのハッシュが一致すること、従来が使えない・誤った値を返した入力と、
//      従来は値を返したが新しい版が受理しない入力（停止側に厳しくした分）が error になること（従来より緩くならない）を確かめる。
//  (4) 読み取り専用の固定: ファイルのバイト・更新時刻・ディレクトリの内容が変わらない、無いファイルのとき _/issue-trees も
//      作らない、書き込み不可の場所でも成功する、ライブラリに書き込みの綴りが無い、verify の分岐が書き込みの準備より前にある。
// 実時間では待たない。LC_ALL を変えても結果が同じことも確かめる（判定がロケールに依存しない）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, statSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { trackTmp } from './lib/tmp-track.mjs'
import { availableBashes, toolExists, expectedSha256, canonicalPayload } from './lib/signed-output.mjs'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const SCRIPT = join(SCRIPTS, 'state.sh')
const LIB = join(SCRIPTS, 'lib', 'state-verify-lib.sh')
const BASHES = availableBashes()
const jq = toolExists('jq')
const FILE = '_/issue-trees/1.json'
const NONCE = 'abc123nonce'
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex')
const isRoot = typeof process.getuid === 'function' && process.getuid() === 0

// ---- (1) lib の判定表 ----
test('lib: sv_uint は 0 以上の整数（先頭ゼロ・符号・小数・16 桁以上を拒否）', () => {
  const ok = ['0', '1', '4096', '53687091200', '999999999999999']
  const ng = ['', '00', '01', '-1', '1.5', '1e3', 'a', '1 ', '9999999999999999', 'null']
  for (const bash of BASHES) {
    const script = '. "$1"; shift; for v in "$@"; do if sv_uint "$v"; then echo 0; else echo 1; fi; done'
    const r = spawnSync(bash, ['-c', script, 'x', LIB, ...ok, ...ng], { encoding: 'utf8' })
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(r.stdout.trim().split('\n').map(Number), [...ok.map(() => 0), ...ng.map(() => 1)], bash)
  }
})

// ---- 実行の土台 ----
function sandbox(state, withDir = true) {
  const root = trackTmp(mkdtempSync(join(tmpdir(), 'iit-state-verify-')))
  if (withDir) mkdirSync(join(root, '_', 'issue-trees'), { recursive: true })
  mkdirSync(join(root, 'tmp'))
  if (state !== undefined) writeFileSync(join(root, FILE), typeof state === 'string' ? state : JSON.stringify(state))
  const run = (bash, args = [], env = {}) => spawnSync(bash, [SCRIPT, ...args], { cwd: root, encoding: 'utf8', env: { ...process.env, TMPDIR: join(root, 'tmp'), ...env } })
  const verify = (bash, page = 0, env = {}) => run(bash, ['--nonce', NONCE, '--file', FILE, 'verify', '--page', String(page)], env)
  return { root, run, verify, abs: (p) => join(root, p) }
}
function envelope(r) {
  assert.equal(r.status, 0, `exit ${r.status} / ${r.stderr}`)
  const lines = r.stdout.split('\n').filter(Boolean)
  assert.equal(lines.length, 1, `封筒の 1 行だけを出す: ${r.stdout}`)
  const env = JSON.parse(lines[0])
  // 出力は正規形（キー昇順・空白なし）そのもの。ホストの canonicalJson と同じ定義で sha256 が合う
  assert.equal(`{"nonce":"${env.nonce}","payload":${canonicalPayload(env.payload)},"sha256":"${env.sha256}"}`, lines[0], '出力が正規形でない')
  assert.equal(env.sha256, expectedSha256(env.nonce, env.payload))
  assert.equal(env.nonce, NONCE)
  assert.equal(r.stderr, '', '標準エラーに何も出さない')
  return env
}
const itemsOf = (n, base = 100) => Object.fromEntries(Array.from({ length: n }, (_, i) => [String(base + i), { status: 'monitoring', pr: 1000 + i, note: '日本語 付き\t"q"', nested: { b: 1, a: [1, 2, { z: null, y: true }] } }]))
const itemHash = (v) => sha(canonicalJsonJq(v))
// jq -jcS の出力の期待値（キー昇順・空白なし）。DEL の出力は jq の版で違う（1.8 は \u007f へエスケープ）ため、DEL を含む項目は
// 下の差分テスト（従来のコマンドとの比較）だけで確かめ、ここでは DEL を含まない値だけに使う
function canonicalJsonJq(v) {
  const enc = (x) => (Array.isArray(x) ? `[${x.map(enc).join(',')}]` : x && typeof x === 'object' ? `{${Object.keys(x).sort().map((k) => `${JSON.stringify(k)}:${enc(x[k])}`).join(',')}}` : JSON.stringify(x))
  return enc(v)
}

for (const bash of BASHES) {
  test(`[${bash}] ok: 項目ごとのハッシュ・キーのダイジェスト・件数・高水位・入力の束縛を封筒で返す`, { skip: !jq }, () => {
    const items = { 42: { status: 'merged', pr: 1371 }, 7: { status: 'pending', pr: 0, note: '日本語' }, 100: { status: 'x' } }
    const sb = sandbox({ parent: 1, perWorktreeByteReserveHighWater: 4096, perWorktreeByteReserveHighWaterVersion: 2, items })
    const env = envelope(sb.verify(bash))
    const p = env.payload
    assert.deepEqual(Object.keys(p).sort(), ['entries', 'highWaterBytes', 'highWaterVersion', 'inputSha256', 'keysCount', 'keysSha256', 'mode', 'outcome', 'page', 'pages'])
    assert.equal(p.mode, 'verify')
    assert.equal(p.outcome, 'ok')
    assert.equal(p.page, 0)
    assert.equal(p.pages, 1)
    assert.equal(p.keysCount, 3)
    // jq の keys と同じ文字列昇順（"100" < "42" < "7"）
    assert.deepEqual(p.entries.map((e) => e.k), ['100', '42', '7'])
    assert.equal(p.keysSha256, sha('["100","42","7"]'))
    for (const e of p.entries) assert.equal(e.h, itemHash(items[e.k]), e.k)
    assert.equal(p.highWaterBytes, 4096)
    assert.equal(p.highWaterVersion, 2)
    assert.equal(p.inputSha256, sha(`${FILE}\n0`))
  })

  test(`[${bash}] ページ送り: 250 件は 3 ページ（100・100・50）。全ページでキーのダイジェスト・件数・高水位が同じで、結合すると全件が昇順に並ぶ`, { skip: !jq }, () => {
    const items = itemsOf(250)
    const sb = sandbox({ parent: 1, items })
    const pages = [0, 1, 2, 3].map((pg) => envelope(sb.verify(bash, pg)).payload)
    assert.deepEqual(pages.map((p) => p.entries.length), [100, 100, 50, 0])
    assert.ok(pages.every((p) => p.pages === 3 && p.keysCount === 250 && p.outcome === 'ok' && p.keysSha256 === pages[0].keysSha256))
    assert.deepEqual(pages.map((p) => p.page), [0, 1, 2, 3])
    assert.equal(new Set(pages.map((p) => p.inputSha256)).size, 4, 'ページごとに入力のハッシュが違う')
    const all = pages.flatMap((p) => p.entries)
    assert.deepEqual(all.map((e) => e.k), Object.keys(items).sort())
    assert.equal(pages[0].keysSha256, sha(JSON.stringify(Object.keys(items).sort())))
    for (const e of all) assert.equal(e.h, itemHash(items[e.k]), e.k)
  })

  test(`[${bash}] ちょうど 100 件は 1 ページ・0 件（items: {}）は keys が空のダイジェストで 1 ページ`, { skip: !jq }, () => {
    const p100 = envelope(sandbox({ items: itemsOf(100) }).verify(bash)).payload
    assert.equal(p100.pages, 1)
    assert.equal(p100.entries.length, 100)
    const p0 = envelope(sandbox({ parent: 1, items: {} }).verify(bash)).payload
    assert.equal(p0.outcome, 'ok')
    assert.equal(p0.pages, 1)
    assert.equal(p0.keysCount, 0)
    assert.equal(p0.keysSha256, sha('[]'))
    assert.deepEqual(p0.entries, [])
  })

  test(`[${bash}] nofile: ファイルが無ければ outcome nofile（ディレクトリも作らない）。ファイルがあれば nofile にならない`, { skip: !jq }, () => {
    for (const withDir of [true, false]) {
      const sb = sandbox(undefined, withDir)
      const p = envelope(sb.verify(bash)).payload
      assert.equal(p.outcome, 'nofile')
      assert.equal(p.keysCount, 0)
      assert.equal(p.keysSha256, '')
      assert.equal(p.pages, 1)
      assert.equal(existsSync(sb.abs('_/issue-trees')), withDir, 'ディレクトリを作らない・消さない')
      assert.deepEqual(readdirSync(sb.abs('tmp')), [], '一時ファイルを作らない')
    }
  })

  test(`[${bash}] error: 壊れた JSON・空ファイル・オブジェクトでない・items が配列や文字列や false・高水位が非負整数の number でない（false・文字列・負・小数）・ディレクトリ・複数の値は nofile にせず error（payload は空）`, { skip: !jq }, () => {
    const bad = ['not json', '', '[]', 'null', '"x"', '{"items":[]}', '{"items":"x"}', '{"items":5}', '{"items":{}}{"items":{}}',
      // jq の // は false も既定値に置き換える。items: false をキー 0 件の ok にしない
      '{"items":false}', '{"items":true}',
      // 高水位は number だけ（false を 0 に・文字列の "4096" を 4096 にしない）。Bytes と Version の両方
      '{"items":{},"perWorktreeByteReserveHighWater":false}', '{"items":{},"perWorktreeByteReserveHighWater":"4096"}',
      '{"items":{},"perWorktreeByteReserveHighWaterVersion":false}', '{"items":{},"perWorktreeByteReserveHighWaterVersion":"2"}',
      '{"items":{},"perWorktreeByteReserveHighWaterVersion":-1}', '{"items":{},"perWorktreeByteReserveHighWaterVersion":1.5}',
      '{"items":{},"perWorktreeByteReserveHighWater":{}}',
      '{"items":{},"perWorktreeByteReserveHighWater":1.5}', '{"items":{},"perWorktreeByteReserveHighWater":"abc"}', '{"items":{},"perWorktreeByteReserveHighWater":-1}',
      '{"items":{},"perWorktreeByteReserveHighWaterVersion":true}', '{"items":{},"perWorktreeByteReserveHighWater":1e30}',
      // 16 桁以上のキー（旧版は正しいハッシュを返していた。新しい版は受理しない = 停止側に厳しくした分）
      `{"items":{"${'9'.repeat(16)}":{}}}`,
      // 末尾に改行の付いたキー（jq の $ は末尾の改行の前にも当たる）。1 行 1 件の一覧から引けないので受理しない
      '{"items":{"5\\n":{"a":1},"6":{}}}']
    for (const state of bad) {
      const sb = sandbox(state)
      const p = envelope(sb.verify(bash)).payload
      assert.equal(p.outcome, 'error', state)
      assert.equal(p.keysCount, 0, state)
      assert.deepEqual(p.entries, [], state)
      assert.equal(p.keysSha256, '', state)
    }
    const sb = sandbox()
    mkdirSync(sb.abs(FILE))
    assert.equal(envelope(sb.verify(bash)).payload.outcome, 'error', 'ディレクトリ')
  })

  test(`[${bash}] ok: 無い・null の items と高水位は従来どおり受理する（高水位は 0）`, { skip: !jq }, () => {
    for (const state of ['{}', '{"items":null}', '{"items":{"3":{}},"perWorktreeByteReserveHighWater":null,"perWorktreeByteReserveHighWaterVersion":null}']) {
      const p = envelope(sandbox(state).verify(bash)).payload
      assert.equal(p.outcome, 'ok', state)
      assert.equal(p.highWaterBytes, 0, state)
      assert.equal(p.highWaterVersion, 0, state)
    }
  })

  test(`[${bash}] error: --file がシンボリックリンクなら（リンク先が正しい状態ファイルでも・リンク切れでも）error。nofile にしない`, { skip: !jq }, () => {
    const sb = sandbox()
    writeFileSync(sb.abs('real.json'), JSON.stringify({ parent: 1, items: itemsOf(2) }))
    symlinkSync('../../real.json', sb.abs(FILE))
    assert.equal(envelope(sb.verify(bash)).payload.outcome, 'error', 'リンク先が正しい状態ファイル')
    const dangling = sandbox()
    symlinkSync('no-such.json', dangling.abs(FILE))
    assert.equal(envelope(dangling.verify(bash)).payload.outcome, 'error', 'リンク切れ')
  })

  test(`[${bash}] error: 15 桁を超えるキーは、要求したページに無くても全ページで error（ページによって結果が変わらない）`, { skip: !jq }, () => {
    // 文字列昇順で "9…" は "100"…"199" より後ろ = 2 ページ目
    const sb = sandbox({ parent: 1, items: { ...itemsOf(100), ['9'.repeat(16)]: { a: 1 } } })
    for (const pg of [0, 1]) assert.equal(envelope(sb.verify(bash, pg)).payload.outcome, 'error', `page ${pg}`)
  })

  test(`[${bash}] 外部由来の文字列（項目の中身・パス）を payload にも標準エラーにも出さない`, { skip: !jq }, () => {
    const secret = 'SECRET-TOKEN-ZZZ'
    const sb = sandbox({ parent: 1, items: { 5: { note: secret, branch: `${secret}/x` } }, [secret]: secret })
    const r = sb.verify(bash)
    assert.ok(!r.stdout.includes(secret))
    assert.ok(!r.stderr.includes(secret))
    const bad = sandbox(`{"items":{"5":{"note":"${secret}"}}`)
    const r2 = bad.verify(bash)
    assert.ok(!r2.stdout.includes(secret) && !r2.stderr.includes(secret))
  })

  test(`[${bash}] 引数の誤りは exit 2（出力なし）: --nonce なし・不正な nonce・不正な --page・--bytes の併用・別モード併用・未知の引数`, { skip: !jq }, () => {
    const sb = sandbox({ parent: 1, items: {} })
    const cases = [
      ['--file', FILE, 'verify'],
      ['--nonce', 'ABC', '--file', FILE, 'verify'],
      ['--nonce', 'a b', '--file', FILE, 'verify'],
      ['--nonce', 'x'.repeat(65), '--file', FILE, 'verify'],
      ['--nonce', 'a', '--file', FILE, 'verify', '--page', '-1'],
      ['--nonce', 'a', '--file', FILE, 'verify', '--page', '01'],
      ['--nonce', 'a', '--file', FILE, 'verify', '--page', 'x'],
      ['--nonce', 'a', '--file', FILE, 'verify', '--bytes', '5'],
      ['--nonce', 'a', '--file', FILE, 'verify', '--version', '5'],
      ['--nonce', 'a', '--file', '_/issue-trees/0.json', 'verify'],
      ['--nonce', 'a', '--file', '../x.json', 'verify'],
      ['--nonce', 'a', '--file', FILE, 'verify', 'merge'],
      ['--nonce', 'a', '--file', FILE, 'merge'],
      ['--page', '1', '--file', FILE, 'init'],
      ['--nonce', 'a', '--file', FILE, 'hw-max', '--bytes', '5', '--version', '1'],
      ['--nonce', 'a', '--file', FILE, 'verify', '--unknown'],
    ]
    for (const args of cases) {
      const r = sb.run(bash, args)
      assert.equal(r.status, 2, args.join(' '))
      assert.equal(r.stdout, '', args.join(' '))
    }
  })

  test(`[${bash}] ロケールに依存しない（C / UTF-8 / 未設定で同じ封筒）`, { skip: !jq }, () => {
    const sb = sandbox({ parent: 1, items: { 3: { note: '日本語・全角　空白・ ・ ' }, 12: { a: 'é😀' } } })
    const outs = ['C', 'en_US.UTF-8', 'ja_JP.UTF-8', ''].map((lc) => sb.verify(bash, 0, { LC_ALL: lc, LANG: lc }).stdout)
    assert.ok(outs[0].length > 0)
    assert.ok(outs.every((o) => o === outs[0]))
  })

  test(`[${bash}] 読み取り専用: バイト・更新時刻・ディレクトリの内容・一時ディレクトリが変わらない。書き込み不可の場所でも成功する`, { skip: !jq }, () => {
    const sb = sandbox({ parent: 1, items: itemsOf(130) })
    const f = sb.abs(FILE)
    const before = { raw: readFileSync(f), mtime: statSync(f).mtimeMs, ino: statSync(f).ino, dir: readdirSync(sb.abs('_/issue-trees')), root: readdirSync(sb.root), tmp: readdirSync(sb.abs('tmp')) }
    for (const pg of [0, 1, 2]) assert.equal(envelope(sb.verify(bash, pg)).payload.outcome, 'ok')
    // TMPDIR が存在しなくても動く（here-document を使わない。bash 3.2 は here-document を一時ファイルで実装する）
    for (const pg of [0, 1, 2]) assert.equal(envelope(sb.verify(bash, pg, { TMPDIR: sb.abs('no-such-dir') })).payload.outcome, 'ok', `TMPDIR なし page ${pg}`)
    assert.ok(!existsSync(sb.abs('no-such-dir')))
    assert.deepEqual(readFileSync(f), before.raw)
    assert.equal(statSync(f).mtimeMs, before.mtime)
    assert.equal(statSync(f).ino, before.ino)
    assert.deepEqual(readdirSync(sb.abs('_/issue-trees')), before.dir)
    assert.deepEqual(readdirSync(sb.root), before.root)
    assert.deepEqual(readdirSync(sb.abs('tmp')), before.tmp, '一時ファイルを作らない')
    if (!isRoot) {
      chmodSync(f, 0o444)
      chmodSync(sb.abs('_/issue-trees'), 0o555)
      chmodSync(sb.abs('tmp'), 0o555)
      try {
        assert.equal(envelope(sb.verify(bash)).payload.outcome, 'ok', '書き込み不可でも読める')
      } finally {
        chmodSync(sb.abs('_/issue-trees'), 0o755)
        chmodSync(sb.abs('tmp'), 0o755)
      }
    }
  })

  test(`[${bash}] 読めないファイル（権限なし）は error（nofile にしない）`, { skip: !jq || isRoot }, () => {
    const sb = sandbox({ parent: 1, items: itemsOf(2) })
    chmodSync(sb.abs(FILE), 0o000)
    try {
      assert.equal(envelope(sb.verify(bash)).payload.outcome, 'error')
    } finally {
      chmodSync(sb.abs(FILE), 0o644)
    }
  })

  test(`[${bash}] ページの値をまとめて取る jq の出力が 1 行欠ける・1 行余る・失敗するなら error（ハッシュを詰めて返さない）`, { skip: !jq }, () => {
    const sb = sandbox({ parent: 1, items: itemsOf(3) })
    const realJq = spawnSync('sh', ['-c', 'command -v jq'], { encoding: 'utf8' }).stdout.trim()
    const ok = envelope(sb.verify(bash)).payload
    assert.equal(ok.entries.length, 3)
    // ページの値の取得（--argjson ks）だけを書き換える偽の jq。ほかの呼び出しは本物へそのまま渡す
    for (const [name, filter] of [['drop', `| sed '$d'`], ['extra', `; printf '{}\\n'`], ['fail', '; exit 5']]) {
      const bin = join(sb.root, `jq-${name}`)
      mkdirSync(bin)
      const body = name === 'drop' ? `"${realJq}" "$@" ${filter}` : `{ "${realJq}" "$@"${filter}; }`
      writeFileSync(join(bin, 'jq'), `#!/bin/sh\ncase " $* " in *" --argjson ks "*) ${body} ;; *) exec "${realJq}" "$@" ;; esac\n`)
      chmodSync(join(bin, 'jq'), 0o755)
      const p = envelope(sb.verify(bash, 0, { PATH: `${bin}:${process.env.PATH}` })).payload
      assert.equal(p.outcome, 'error', name)
      assert.deepEqual(p.entries, [], name)
    }
  })

  test(`[${bash}] ハッシュ計算のツールが無ければ封筒を作れず exit 3（空のハッシュを返さない）`, { skip: !jq }, () => {
    const sb = sandbox({ parent: 1, items: itemsOf(2) })
    const bin = join(sb.root, 'nobin')
    mkdirSync(bin)
    // jq だけを置いた PATH（sha256sum / shasum が無い）。bash は絶対パスで起動する
    const jqPath = spawnSync('sh', ['-c', 'command -v jq'], { encoding: 'utf8' }).stdout.trim()
    spawnSync('ln', ['-s', jqPath, join(bin, 'jq')])
    for (const t of ['cat', 'cut', 'sed', 'tr', 'date', 'dirname']) spawnSync('ln', ['-s', spawnSync('sh', ['-c', `command -v ${t}`], { encoding: 'utf8' }).stdout.trim(), join(bin, t)])
    const r = spawnSync(bash, [SCRIPT, '--nonce', NONCE, '--file', FILE, 'verify'], { cwd: sb.root, encoding: 'utf8', env: { PATH: bin, TMPDIR: join(sb.root, 'tmp') } })
    assert.equal(r.status, 3)
    assert.equal(r.stdout, '')
    assert.match(r.stderr, /verify の封筒を作れない/, 'lib の読み込みではなく sv_run の失敗で exit 3 になる')
  })
}

// ---- (3) 従来のインラインのコマンドとの差分 ----
// P5 より前の state:load-verify プロンプトに埋め込まれていたコマンド（エージェントが書き写して実行していたもの）。
// 項目のハッシュ・キーのダイジェスト・件数・高水位の計算式の正本として、そのまま持つ
const OLD_COMMAND = `h() { sha256sum 2>/dev/null || shasum -a 256; }; if [ -f "$f" ]; then K='[.items // {} | keys[] | select(test("^[1-9][0-9]*$"))]'; echo "KEYS $(jq -jc "$K" "$f" | h | cut -c1-64) $(jq "$K | length" "$f")"; jq -c '[.perWorktreeByteReserveHighWater // 0, .perWorktreeByteReserveHighWaterVersion // 0]' "$f"; jq -r "$K | .[]" "$f" | sed -n "\${R:-1,\\$}p" | while IFS= read -r k; do printf '%s %s\\n' "$k" "$(jq -jcS --arg k "$k" '.items[$k]' "$f" | h | cut -c1-64)"; done; else echo NOFILE; fi`

function oldResult(sb, bash) {
  const r = spawnSync(bash, ['-c', `f=${FILE}; ${OLD_COMMAND}`], { cwd: sb.root, encoding: 'utf8' })
  const lines = r.stdout.split('\n').filter(Boolean)
  if (lines[0] === 'NOFILE') return { nofile: true }
  const m = /^KEYS ([0-9a-f]{64}) (\d+)$/.exec(lines[0] ?? '')
  if (!m) return { garbage: true, status: r.status }
  const hw = JSON.parse(lines[1])
  return { keysSha256: m[1], keysCount: Number(m[2]), hw, entries: lines.slice(2).map((l) => { const [k, h] = l.split(' '); return { k, h } }) }
}
function newResult(sb, bash) {
  const first = envelope(sb.verify(bash)).payload
  const ps = [first]
  for (let i = 1; i < first.pages; i++) ps.push(envelope(sb.verify(bash, i)).payload)
  return { outcome: first.outcome, keysSha256: first.keysSha256, keysCount: first.keysCount, hw: [first.highWaterBytes, first.highWaterVersion], entries: ps.flatMap((p) => p.entries) }
}

for (const bash of BASHES) {
  test(`[${bash}] 差分: 従来のコマンドと、キーのダイジェスト・件数・高水位・項目ごとのハッシュが一致する（日本語・DEL・入れ子・数字以外のキー・先頭ゼロ・巨大な数値）`, { skip: !jq }, () => {
    const cases = {
      sample: JSON.parse(readFileSync(join(SCRIPTS, '..', 'sample', 'state-example.json'), 'utf8')),
      unicodeDel: { parent: 1, perWorktreeByteReserveHighWater: 53687091200, perWorktreeByteReserveHighWaterVersion: 2, items: { 3: { note: 'a\u007fb\u0001\t\n\\" é😀 全角　空白', n: [1, -2, 0, 123456789], o: { b: 1, a: { d: [], c: {} } } }, 12: { status: 'x' }, 9: null, 10: 5, 11: [1, { z: 1, a: 2 }], 13: true } },
      // 項目そのものが文字列（jq -j は生のまま出す。改行・末尾の改行・印と同じ " 1 文字・空文字を含む）。スクリプトは 1 件ずつ取り直す経路で従来と同じハッシュを返す
      stringItems: { parent: 1, items: { 4: 'a\nb', 5: 'tail\n\n', 6: '"', 7: '', 8: { s: 'x' }, 9: '日本語' } },
      oddKeys: { parent: 1, items: { 5: { a: 1 }, '007': { a: 2 }, x: { a: 3 }, '-1': { a: 4 }, '1.5': { a: 5 }, ' 6': { a: 6 }, '８': { a: 7 }, '': { a: 8 }, '12345678901234': { a: 9 } } },
      noItems: { parent: 1 },
      nullItems: { parent: 1, items: null },
      highWaterAbsent: { items: { 1: {} } },
      many: { parent: 1, items: itemsOf(257, 1) },
    }
    for (const [name, state] of Object.entries(cases)) {
      const sb = sandbox(state)
      const o = oldResult(sb, bash)
      const n = newResult(sb, bash)
      assert.equal(n.outcome, 'ok', name)
      assert.equal(n.keysSha256, o.keysSha256, `${name}: keysSha256`)
      assert.equal(n.keysCount, o.keysCount, `${name}: keysCount`)
      assert.deepEqual(n.hw, o.hw, `${name}: 高水位`)
      assert.deepEqual(n.entries, o.entries, `${name}: 項目ごとのハッシュ`)
    }
  })

  test(`[${bash}] 差分: 従来が使えない・誤った値を返した入力（壊れた JSON・items が配列・複数の値・改行を含むキー・非整数の高水位）は error にし、従来より緩くならない`, { skip: !jq }, () => {
    // 従来の出力: KEYS 行が壊れる（ホストの形式検査で停止）か、誤ったダイジェスト・ハッシュを返すか、高水位が整数でない（ホストの型検査で停止）
    for (const state of ['not json', '{"items":[1,2]}', '{"items":{}} {"items":{}}', '{"items":{"5\\n":{"a":1},"6":{}}}', '{"items":{},"perWorktreeByteReserveHighWater":1.5}', '{"items":{},"perWorktreeByteReserveHighWater":-1}', '{"items":{},"perWorktreeByteReserveHighWater":"4096"}']) {
      const sb = sandbox(state)
      const o = oldResult(sb, bash)
      const oldUsable = !o.garbage && Array.isArray(o.hw) && o.hw.every((x) => Number.isInteger(x) && x >= 0) && o.entries.every((e) => /^[1-9]\d*$/.test(e.k ?? ''))
      assert.equal(oldUsable, false, `従来も使える値を返さなかった: ${state}`)
      assert.equal(envelope(sb.verify(bash)).payload.outcome, 'error', state)
    }
  })

  test(`[${bash}] 差分: 従来は値を返したが新しい版は受理しない入力（16 桁以上のキー・items や高水位の false）は error（停止側に厳しくした分）`, { skip: !jq }, () => {
    const cases = [
      // 従来は正しいキーのダイジェスト・ハッシュを返した
      [`{"items":{"${'9'.repeat(16)}":{"a":1}}}`, (o) => o.keysCount === 1 && o.entries.length === 1],
      // 従来は // で false を既定値にした（キー 0 件・高水位 0）
      ['{"items":false}', (o) => o.keysCount === 0 && o.hw[0] === 0],
      ['{"items":{},"perWorktreeByteReserveHighWater":false}', (o) => o.keysCount === 0 && o.hw[0] === 0],
    ]
    for (const [state, oldOk] of cases) {
      const sb = sandbox(state)
      const o = oldResult(sb, bash)
      assert.ok(!o.garbage && oldOk(o), `従来は値を返した: ${state}`)
      assert.equal(envelope(sb.verify(bash)).payload.outcome, 'error', state)
    }
  })

  test(`[${bash}] 最悪時間: 5000 件の状態ファイルの最終ページも数秒以内（キー選別の正規表現は線形・ページ分だけ項目を読む）`, { skip: !jq }, () => {
    const sb = sandbox({ parent: 1, items: itemsOf(5000, 1) })
    const t0 = Date.now()
    const p = envelope(sb.verify(bash, 49)).payload
    const dt = Date.now() - t0
    assert.equal(p.pages, 50)
    assert.equal(p.entries.length, 100)
    assert.ok(dt < 20000, `${dt}ms`)
    // 病的なキー（桁数の多い数字・長い非数字）でも正規表現の時間は線形
    const long = sandbox({ parent: 1, items: { [`${'9'.repeat(200000)}x`]: { a: 1 }, 5: { a: 2 } } })
    const t1 = Date.now()
    envelope(long.verify(bash))
    assert.ok(Date.now() - t1 < 20000)
  })
}

// ---- (4) 静的な固定 ----
const codeLines = (path) => readFileSync(path, 'utf8').split('\n').filter((l) => !/^\s*#/.test(l))

test('静的: state-verify-lib.sh に書き込み・削除・一時ファイルの綴りが無い（ファイルへのリダイレクト・rm・mv・cp・ln・mktemp・tee・touch・st_ の書き込み関数）', () => {
  const code = codeLines(LIB).join('\n')
  for (const re of [/\brm\b/, /\bmv\b/, /\bcp\b/, /\bln\b/, /\bmktemp\b/, /\btee\b/, /\btouch\b/, /\bmkdir\b/, /\bchmod\b/, /\bst_(rewrite|create|drop)\b/, /\bST_(MERGE|INIT|HW)_/, /\bsed\s+-i\b/, /\bdd\b/]) {
    assert.doesNotMatch(code, re, String(re))
  }
  // here-document を使わない（bash 3.2 は here-document を一時ファイルで実装する。<<< も同じ）
  assert.doesNotMatch(code, /<<-?\s*['"\\]?[A-Za-z_]/, 'here-document')
  assert.doesNotMatch(code, /<<</, 'here-string')
  // リダイレクトは /dev/null への出力・fd 複製（2>&1 等）・ヒアドキュメントだけ
  for (const m of code.matchAll(/(\d?>>?)\s*([^\s;|&)]+)/g)) assert.match(m[2], /^(\/dev\/null|&\d)$/, m[0])
})

test('静的: state.sh の verify の分岐は、trap・日時・一時ファイル・書き換えの準備より前にあり、そこで exit する', () => {
  const src = readFileSync(SCRIPT, 'utf8')
  const branch = src.indexOf('if [ "${mode}" = verify ]; then')
  assert.ok(branch > 0)
  for (const later of ['trap cleanup EXIT', 'ts=$(date', 'st_create', 'st_rewrite', 'mktemp']) {
    assert.ok(src.indexOf(later, branch) > src.indexOf('  exit 0\nfi', branch) || src.indexOf(later) > branch && src.indexOf(later, branch) > branch, later)
  }
  const block = src.slice(branch, src.indexOf('\nfi\n', branch))
  assert.match(block, /\bexit 0\b/)
  for (const w of ['st_create', 'st_rewrite', 'mktemp', 'trap ', 'cleanup']) assert.ok(!block.includes(w), `verify の分岐に ${w}`)
  assert.ok(src.indexOf('trap cleanup EXIT') > branch, 'trap は verify の分岐より後')
  // 書き込みのモードは --nonce / --page を拒否する
  assert.match(src, /\[ -z "\$\{nonce\}\$\{page\}" \] \|\| usage/)
})
