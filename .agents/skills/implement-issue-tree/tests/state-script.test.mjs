// scripts/state.sh と scripts/lib/state-lib.sh（状態ファイルの書き込み。Issue #603 第 5 弾）の回帰テスト。
//
// 二層: (1) lib の判定関数（パス・整数・入力の形）を 1 回の bash 起動で表のまま検査する（ケースごとにプロセスを起動しない）。
// (2) state.sh を実 jq で走らせ、merge / init / hw-max / hw-set の結果・失敗時にファイルを変えないこと・一時ファイルを残さないこと・
// 書き込み直前の変更検知（cmp を差し替えるシムで『スナップショット後に別ランが書いた』状況を作る）を確かめる。
// 実時間では待たない。bash は利用できるものすべてで (2) の代表ケースを回す（3.2 と 5 で差が出得る構文を含むため）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { chmodSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { trackTmp } from './lib/tmp-track.mjs'
import { availableBashes, toolExists } from './lib/signed-output.mjs'
import { bundleSha256 } from '../scripts/build-workflow.mjs'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const SCRIPT = join(SCRIPTS, 'state.sh')
const LIB = join(SCRIPTS, 'lib', 'state-lib.sh')
const BASHES = availableBashes()
const jq = toolExists('jq')
const US = '\u001f'

// ---- (1) lib の判定表 ----
const DRIVER = `
. "$1" || exit 9
US=$(printf '\\037')
while IFS="$US" read -r fn a; do
  rc=0
  out=$("$fn" "$a" 2>&1) || rc=$?
  printf '%s %s\\n' "$rc" "\${#out}"
done
`
function table(rows) {
  const input = rows.map(([fn, a]) => `${fn}${US}${a}`).join('\n') + '\n'
  const out = []
  for (const bash of BASHES) {
    const r = spawnSync(bash, ['-c', DRIVER, 'x', LIB], { input, encoding: 'utf8' })
    assert.equal(r.status, 0, `${bash}: ${r.stderr}`)
    out.push(r.stdout.trim().split('\n').map((l) => l.split(' ').map(Number)))
  }
  return out
}
const G = (o) => JSON.stringify(o)

test('lib: st_valid_file は _/issue-trees/<正の整数>.json だけを受理する', { skip: !jq }, () => {
  const ok = ['_/issue-trees/1.json', '_/issue-trees/603.json']
  const ng = ['', '_/issue-trees/0.json', '_/issue-trees/012.json', '_/issue-trees/.json', '_/issue-trees/a.json', '_/issue-trees/1.json.bak',
    '/_/issue-trees/1.json', '../_/issue-trees/1.json', '_/issue-trees/../x/1.json', '_/issue-trees/1/2.json', 'issue-trees/1.json', '_/issue-trees/-1.json', '_/issue-trees/1 .json', '1.json', '99.json', 'x/_/issue-trees/1.json']
  const rows = [...ok, ...ng].map((p) => ['st_valid_file', p])
  for (const res of table(rows)) {
    res.forEach(([rc, len], i) => {
      assert.equal(rc, i < ok.length ? 0 : 1, rows[i][1])
      assert.equal(len, 0, '何も出力しない')
    })
  }
})

test('lib: st_uint は 0 以上の整数（先頭ゼロ・符号・小数・16 桁以上を拒否）', () => {
  const ok = ['0', '1', '9', '53687091200', '999999999999999']
  const ng = ['', '00', '01', '-1', '+1', '1.5', '1e3', 'a', '1 ', '9999999999999999']
  const rows = [...ok, ...ng].map((p) => ['st_uint', p])
  for (const res of table(rows)) res.forEach(([rc], i) => assert.equal(rc, i < ok.length ? 0 : 1, rows[i][1]))
})

test('lib: st_valid_groups / st_valid_entries は形の崩れた入力（番号 0・小数・patch が配列・numbers 空・型違い）を拒否する', { skip: !jq }, () => {
  const rows = [
    ['st_valid_groups', G([{ numbers: [1], patch: { a: 1 } }]), true],
    ['st_valid_groups', G([{ numbers: [1, 2, 3], patch: {} }, { numbers: [9], patch: { note: "it's \"q\"\n" } }]), true],
    ['st_valid_groups', G([]), false],
    ['st_valid_groups', G({ numbers: [1], patch: {} }), false],
    ['st_valid_groups', G([{ numbers: [], patch: {} }]), false],
    ['st_valid_groups', G([{ numbers: [0], patch: {} }]), false],
    ['st_valid_groups', G([{ numbers: [1.5], patch: {} }]), false],
    ['st_valid_groups', G([{ numbers: ['1'], patch: {} }]), false],
    ['st_valid_groups', G([{ numbers: [1], patch: [] }]), false],
    ['st_valid_groups', G([{ numbers: [1], patch: null }]), false],
    ['st_valid_groups', G([{ numbers: [1] }]), false],
    ['st_valid_groups', `${G([{ numbers: [1], patch: {} }])} ${G([{ numbers: [2], patch: {} }])}`, false],
    ['st_valid_groups', `${G([{ numbers: [1], patch: {} }])} 5`, false],
    ['st_valid_groups', 'not json', false],
    ['st_valid_groups', '', false],
    ['st_valid_entries', G([{ number: 1, type: 'implement' }, { number: 2, type: 'verify-close' }]), true],
    ['st_valid_entries', G([{ number: 1, type: 'other' }]), false],
    ['st_valid_entries', G([{ number: 0, type: 'implement' }]), false],
    ['st_valid_entries', G([{ type: 'implement' }]), false],
    ['st_valid_entries', G([]), false],
    ['st_valid_entries', `${G([{ number: 1, type: 'implement' }])} ${G([{ number: 2, type: 'implement' }])}`, false],
    ['st_valid_entries', G({ number: 1, type: 'implement' }), false],
  ]
  for (const res of table(rows.map(([f, a]) => [f, a]))) res.forEach(([rc], i) => assert.equal(rc === 0, rows[i][2], `${rows[i][0]} ${rows[i][1]}`))
})

// ---- (2) state.sh の実行 ----
function sandbox(initial = { parent: 1, perWorktreeByteReserveHighWater: 5, perWorktreeByteReserveHighWaterVersion: 2, items: { 10: { status: 'pending', pr: 0 }, 11: { status: 'done' } } }) {
  const root = trackTmp(mkdtempSync(join(tmpdir(), 'iit-state-script-')))
  mkdirSync(join(root, '_', 'issue-trees'), { recursive: true })
  mkdirSync(join(root, 'bin'))
  const file = '_/issue-trees/1.json'
  if (initial !== null) writeFileSync(join(root, file), JSON.stringify(initial))
  const read = () => JSON.parse(readFileSync(join(root, file), 'utf8'))
  const run = (bash, args, input = '', env = {}) => spawnSync(bash, [SCRIPT, '--file', file, ...args], {
    cwd: root, input, encoding: 'utf8', env: { ...process.env, TMPDIR: root, ...env },
  })
  const leftovers = () => readdirSync(root).filter((n) => n.startsWith('state-')).concat(readdirSync(join(root, '_', 'issue-trees')).filter((n) => n !== '1.json'))
  return { root, file, read, run, leftovers }
}
function lastResult(r) {
  assert.equal(r.status, 0, `exit ${r.status} / ${r.stderr}`)
  const lines = r.stdout.split('\n').filter(Boolean)
  const m = /^STATE_RESULT (\{.*\})$/.exec(lines[lines.length - 1])
  assert.ok(m, r.stdout)
  return JSON.parse(m[1])
}

for (const bash of BASHES) {
  test(`[${bash}] merge: patch を .items[n] へ浅くマージし、他の項目・トップレベルを保つ。特殊文字の自由文もそのまま入る。一時ファイルを残さない`, { skip: !jq }, () => {
    const sb = sandbox()
    const note = "引用符 ' \" と $(echo x) と `bt` と\n改行 \\ と EOF STATE_EOF_x"
    const before = sb.read()
    const r = sb.run(bash, ['merge'], G([{ numbers: [10], patch: { status: 'blocked', note } }, { numbers: [12, 13], patch: { status: 'blocked', pr: 0 } }]))
    assert.deepEqual(lastResult(r), { ok: true })
    const after = sb.read()
    assert.deepEqual(after.items['10'], { status: 'blocked', pr: 0, note })
    assert.deepEqual(after.items['12'], { status: 'blocked', pr: 0 })
    assert.deepEqual(after.items['13'], { status: 'blocked', pr: 0 })
    assert.deepEqual(after.items['11'], before.items['11'])
    assert.equal(after.perWorktreeByteReserveHighWater, 5)
    assert.match(after.updatedAt, /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/)
    assert.deepEqual(sb.leftovers(), [])
  })

  test(`[${bash}] merge: 不正な入力・存在しないファイル・壊れたファイルは ok:false を返し、ファイルを変えない（一時ファイルも残さない）`, { skip: !jq }, () => {
    const sb = sandbox()
    const raw = readFileSync(join(sb.root, sb.file), 'utf8')
    for (const input of ['', 'not json', G([{ numbers: [0], patch: {} }]), G([{ numbers: [1], patch: [] }]), `${G([{ numbers: [10], patch: { status: 'x' } }])}\n${G([{ numbers: [11], patch: { status: 'y' } }])}`]) {
      assert.deepEqual(lastResult(sb.run(bash, ['merge'], input)), { ok: false, reason: 'invalid-input' }, input)
    }
    assert.equal(readFileSync(join(sb.root, sb.file), 'utf8'), raw)
    const none = sandbox(null)
    assert.deepEqual(lastResult(none.run(bash, ['merge'], G([{ numbers: [1], patch: {} }]))), { ok: false, reason: 'no-file' })
    for (const bad of ['{not json', JSON.stringify({ items: [] }), JSON.stringify({ parent: 1 })]) {
      const sbBad = sandbox(null)
      writeFileSync(join(sbBad.root, sbBad.file), bad)
      assert.deepEqual(lastResult(sbBad.run(bash, ['merge'], G([{ numbers: [1], patch: {} }]))), { ok: false, reason: 'rewrite-failed' }, bad)
      assert.equal(readFileSync(join(sbBad.root, sbBad.file), 'utf8'), bad, '壊れたファイルの上へ書き足さない')
      assert.deepEqual(sbBad.leftovers(), [])
    }
  })

  test(`[${bash}] init: 無い項目だけを pending で追加し、既存項目を上書きしない`, { skip: !jq }, () => {
    const sb = sandbox()
    const r = sb.run(bash, ['init'], G([{ number: 10, type: 'implement' }, { number: 20, type: 'verify-close' }]))
    assert.deepEqual(lastResult(r), { ok: true })
    const items = sb.read().items
    assert.deepEqual(items['10'], { status: 'pending', pr: 0 }, '既存は不変')
    assert.deepEqual(items['20'], { type: 'verify-close', status: 'pending', pr: 0, branch: '', worktree: '', fixCount: 0, note: '' })
    assert.deepEqual(lastResult(sb.run(bash, ['init'], G([{ number: 1, type: 'bogus' }]))), { ok: false, reason: 'invalid-input' })
  })

  test(`[${bash}] hw-max / hw-set: 版が違えば無条件で置換、同じ版なら大きい方だけ（縮めない）、hw-set は 0 も書ける。.items は不変`, { skip: !jq }, () => {
    const sb = sandbox()
    const items = sb.read().items
    assert.deepEqual(lastResult(sb.run(bash, ['hw-max', '--bytes', '3', '--version', '2'])), { ok: true })
    assert.equal(sb.read().perWorktreeByteReserveHighWater, 5, '同じ版で小さい値は縮めない')
    assert.deepEqual(lastResult(sb.run(bash, ['hw-max', '--bytes', '53687091200', '--version', '2'])), { ok: true })
    assert.equal(sb.read().perWorktreeByteReserveHighWater, 53687091200)
    assert.deepEqual(lastResult(sb.run(bash, ['hw-max', '--bytes', '7', '--version', '3'])), { ok: true })
    const v3 = sb.read()
    assert.deepEqual([v3.perWorktreeByteReserveHighWater, v3.perWorktreeByteReserveHighWaterVersion], [7, 3], '版が違えば小さくても置換する')
    assert.deepEqual(lastResult(sb.run(bash, ['hw-set', '--bytes', '0', '--version', '2'])), { ok: true })
    const set = sb.read()
    assert.deepEqual([set.perWorktreeByteReserveHighWater, set.perWorktreeByteReserveHighWaterVersion], [0, 2])
    assert.deepEqual(set.items, items)
  })

  test(`[${bash}] 使い方の誤り（不正な --file・未知の引数・モード無し・整数でない値）は exit 2 で結果の行を出さず、何も書かない`, { skip: !jq }, () => {
    const sb = sandbox()
    const raw = readFileSync(join(sb.root, sb.file), 'utf8')
    const cases = [['--file', '../x.json', 'merge'], ['--file', '_/issue-trees/0.json', 'merge'], ['--bogus'], [], ['merge', 'init'], ['hw-max', '--bytes', 'x', '--version', '2'],
      ['hw-max', '--bytes', '0', '--version', '2'], ['hw-set', '--bytes', '1', '--version', '-1'], ['hw-max', '--bytes', '1']]
    for (const args of cases) {
      const r = spawnSync(bash, [SCRIPT, ...(args[0] === '--file' ? [] : ['--file', sb.file]), ...args], { cwd: sb.root, input: G([{ numbers: [1], patch: {} }]), encoding: 'utf8', env: { ...process.env, TMPDIR: sb.root } })
      assert.equal(r.status, 2, `${args.join(' ')}: exit ${r.status}`)
      assert.doesNotMatch(r.stdout, /STATE_RESULT/)
    }
    assert.equal(readFileSync(join(sb.root, sb.file), 'utf8'), raw)
    assert.deepEqual(sb.leftovers(), [])
  })
}

// 本番のコマンドは run-verified.sh 経由（ハッシュ照合 → exec）で、patch は標準入力のヒアドキュメントで渡る。launcher が標準入力を
// 食わずに state.sh へ引き継ぐことが、merge / init が invalid-input にならない前提
for (const bash of BASHES) {
  test(`[${bash}] launcher 経由: run-verified.sh が標準入力を state.sh へ引き継ぎ、merge と init が書ける。期待ハッシュが違えば起動せず何も書かない`, { skip: !jq }, () => {
    const sb = sandbox()
    const launcher = join(SCRIPTS, 'run-verified.sh')
    const sha = bundleSha256(SCRIPTS, 'state.sh')
    const viaLauncher = (hash, args, input) => spawnSync(bash, [launcher, hash, 'state.sh', '--file', sb.file, ...args], {
      cwd: sb.root, input, encoding: 'utf8', env: { ...process.env, TMPDIR: sb.root },
    })
    assert.deepEqual(lastResult(viaLauncher(sha, ['merge'], G([{ numbers: [10], patch: { status: 'done', note: "it's" } }]))), { ok: true })
    assert.deepEqual(sb.read().items['10'], { status: 'done', pr: 0, note: "it's" })
    assert.deepEqual(lastResult(viaLauncher(sha, ['init'], G([{ number: 30, type: 'implement' }]))), { ok: true })
    assert.equal(sb.read().items['30'].status, 'pending')
    const raw = readFileSync(join(sb.root, sb.file), 'utf8')
    const bad = viaLauncher('0'.repeat(64), ['merge'], G([{ numbers: [10], patch: { status: 'x' } }]))
    assert.equal(bad.status, 3)
    assert.doesNotMatch(bad.stdout, /STATE_RESULT/)
    assert.equal(readFileSync(join(sb.root, sb.file), 'utf8'), raw)
  })
}

// 書き込み直前の変更検知: スナップショットを取った後に別ランが書いた状況を、cmp を差し替えるシムで作る（1 回目の比較の直前に
// ファイルを書き換える）。検知したら最初からやり直して、別ランの書き込みを失わずに自分の patch も入る。変更が続けば諦めて ok:false
for (const bash of BASHES.slice(0, 1)) {
  const realCmp = spawnSync('sh', ['-c', 'command -v cmp'], { encoding: 'utf8' }).stdout.trim()
  const shim = (sb, times) => {
    const counter = join(sb.root, 'cmp-count')
    writeFileSync(counter, '0')
    writeFileSync(join(sb.root, 'bin', 'cmp'), `#!/bin/sh
n=$(cat '${counter}'); n=$((n + 1)); echo "$n" > '${counter}'
if [ "$n" -le ${times} ]; then
  jq --argjson n "$n" '.items["c\\($n)"] = {"status":"concurrent"}' '${join(sb.root, sb.file)}' > '${join(sb.root, 'concurrent.tmp')}' && mv '${join(sb.root, 'concurrent.tmp')}' '${join(sb.root, sb.file)}'
fi
exec '${realCmp}' "$@"
`)
    chmodSync(join(sb.root, 'bin', 'cmp'), 0o755)
    return { PATH: `${join(sb.root, 'bin')}:${process.env.PATH}` }
  }
  test(`[${bash}] 並行書き込みの検知: スナップショット後にファイルが変わったら最初からやり直し、別ランの書き込みを失わない`, { skip: !jq || realCmp === '' }, () => {
    const sb = sandbox()
    const r = sb.run(bash, ['merge'], G([{ numbers: [10], patch: { status: 'done' } }]), shim(sb, 1))
    assert.deepEqual(lastResult(r), { ok: true })
    const items = sb.read().items
    assert.equal(items['10'].status, 'done')
    assert.deepEqual(items.c1, { status: 'concurrent' }, '別ランの書き込みが残っている（last-writer-wins で消えていない）')
    assert.equal(readFileSync(join(sb.root, 'cmp-count'), 'utf8').trim(), '2', 'やり直して 2 回比べた')
    assert.deepEqual(sb.leftovers().filter((n) => n !== 'cmp-count' && n !== 'concurrent.tmp'), [])
  })
  test(`[${bash}] 並行書き込みが 3 回続いたら諦めて changed-concurrently（自分の patch は書かない・別ランの書き込みは残る）`, { skip: !jq || realCmp === '' }, () => {
    const sb = sandbox()
    const r = sb.run(bash, ['merge'], G([{ numbers: [10], patch: { status: 'done' } }]), shim(sb, 99))
    assert.deepEqual(lastResult(r), { ok: false, reason: 'changed-concurrently' })
    const items = sb.read().items
    assert.equal(items['10'].status, 'pending')
    assert.ok(items.c3)
    assert.equal(readFileSync(join(sb.root, 'cmp-count'), 'utf8').trim(), '3', '3 回比べて諦める（4 回目は無い）')
  })
  test(`[${bash}] SIGTERM で中断されても st_rewrite のスナップショット・出力用一時ファイルを残さない（状態ファイルは変えない）`, { skip: !jq || realCmp === '' }, () => {
    const sb = sandbox()
    const before = readFileSync(join(sb.root, sb.file), 'utf8')
    writeFileSync(join(sb.root, 'bin', 'cmp'), `#!/bin/sh\nkill -TERM "$PPID"\nsleep 1\nexec '${realCmp}' "$@"\n`)
    chmodSync(join(sb.root, 'bin', 'cmp'), 0o755)
    const r = sb.run(bash, ['merge'], G([{ numbers: [10], patch: { status: 'done' } }]), { PATH: `${join(sb.root, 'bin')}:${process.env.PATH}` })
    assert.equal(r.status, 143, `exit ${r.status} / ${r.stderr}`)
    assert.equal(readFileSync(join(sb.root, sb.file), 'utf8'), before)
    assert.deepEqual(sb.leftovers(), [])
  })
}
