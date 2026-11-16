// scripts/declared-deps.sh を偽 gh で実行して確かめる回帰テスト一式。
// bash ごとに登録できるよう関数にしてある（tests/declared-deps-script.test.mjs が 1 つ目の bash、
// tests/declared-deps-alt-bash.test.mjs が 2 つ目以降。fetch-tree-suite と同じ分割）。
//
// 1) フィルタの同一性: 切り出し前（origin/main）の src が実行時に組み立てたフィルタ文字列を tests/fixtures/declared-deps-filter-main.txt に
//    固定してあり、スクリプトの --print-filter の出力と文字単位で一致することを確かめる（移植でバックスラッシュが半減していないこと）。
// 2) エスケープに依存する既知の入力（\\b・\\x27・\\x60・\\[・\\]）を、実際のスクリプト経由で実行して期待どおりの結果になることを確かめる。
// 3) 正常系・--repo・--table・gh の失敗・引数の誤り・--rate-limit・launcher を、偽 gh で実行する。
//
// 偽 gh は POSIX sh と jq だけで書く。`gh api repos/…/issues/<n> --jq F` は $DIR/issue-<n>.json を jq -c F で絞って出し、
// $DIR/issue-<n>.fail があればメッセージを標準エラーへ出して失敗する。`gh api rate_limit --jq F` は $DIR/rate_limit.json を絞る。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { spawnSync, execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { trackTmp } from './tmp-track.mjs'
import { bundleSha256 } from '../../scripts/build-workflow.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
export const SCRIPTS = join(HERE, '..', '..', 'scripts')
export const SCRIPT = join(SCRIPTS, 'declared-deps.sh')
const LIB = join(SCRIPTS, 'lib', 'declared-deps-lib.sh')
const FIXTURE = join(HERE, '..', 'fixtures', 'declared-deps-filter-main.txt')
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex')

// 切り出し前（origin/main の implement-issue-tree.src.js が実行時に組み立てた文字列）の SHA-256。
// 表なし（declaredDepsJq() を {number, deps} と sig で包んだ全体）と、表ありの 1 例。
export const MAIN_FILTER_SHA256_EMPTY = '0d960561a65be20bdcb0997b2ecff89807650e41855368f89230b049f2ebb5d7'
export const MAIN_FILTER_SHA256_SAMPLE = '97c1395600ef7841f32b94fa0d6f12bd5af01e2f4e3c20d56ab9e95c4fa7a0f5'
export const SAMPLE_TABLE = { f: { 100: [['TASK-97-5', 105], ['TASK-97-6', 106]] }, n: { 106: ['100', 105] } }
const EMPTY_LITERAL = '{"f":{},"n":{}}'

const STUB_SH = `#!/bin/sh
# 生成スタブ（テスト専用）
dir=\${GH_STUB_DIR:?}
printf "%s\\n" "$*" >> "$dir/calls.log"
[ "$1" = "api" ] || { echo "gh stub: 未定義の呼び出し: $*" >&2; exit 99; }
path=$2
shift 2
filter=""
while [ $# -gt 0 ]; do
  case "$1" in
    --jq) filter=$2; shift 2 ;;
    *) shift ;;
  esac
done
case "$path" in
  rate_limit) f="$dir/rate_limit.json" ;;
  repos/*/issues/*) f="$dir/issue-\${path##*/}.json"; [ -f "$dir/issue-\${path##*/}.fail" ] && { cat "$dir/issue-\${path##*/}.fail" >&2; exit 1; } ;;
  *) echo "gh stub: 未定義のパス: $path" >&2; exit 99 ;;
esac
[ -f "$f" ] || { echo '{"message":"Not Found","status":"404"}' >&2; exit 1; }
jq -c "$filter" < "$f"
`

function makeStub() {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-dd-stub-')))
  const bin = join(dir, 'bin')
  mkdirSync(bin)
  writeFileSync(join(bin, 'gh'), STUB_SH)
  chmodSync(join(bin, 'gh'), 0o755)
  return {
    dir,
    bin,
    env: () => ({ PATH: `${bin}:${process.env.PATH}`, GH_STUB_DIR: dir, HOME: dir }),
    issue(n, body) { writeFileSync(join(dir, `issue-${n}.json`), JSON.stringify({ number: n, body })) },
    fail(n, msg) { writeFileSync(join(dir, `issue-${n}.fail`), msg) },
    rate(obj) { writeFileSync(join(dir, 'rate_limit.json'), JSON.stringify(obj)) },
    calls: () => (existsSync(join(dir, 'calls.log')) ? readFileSync(join(dir, 'calls.log'), 'utf8').split('\n').filter((l) => l !== '') : []),
  }
}

// ホスト（declaredDepsChecksum）とは独立に計算した sig
function sigOf(number, deps) {
  const M = 1000000007n
  let sum = 0n
  deps.forEach((d, i) => { sum += (BigInt(i + 1) * BigInt(d) * 104729n) % M })
  return Number(((BigInt(number) * 7919n) % M + sum) % M)
}

// 入力の束縛の正準文字列（ホストの declaredDepsFetchCommand・lib の dd_input_sha と独立に書いた定義）。
// "declared-deps\n" + numbers + "\n" + repo（無ければ空）+ "\n" + table（無ければ空）。末尾に改行を付けない。
export const inputShaOf = (numbers, repo = '', table = '') => sha(`declared-deps\n${numbers}\n${repo}\n${table}`)

// --numbers モードの引数から、スクリプトへ渡された値そのままで束縛のハッシュを付ける（ホストが起動行へ付けるのと同じ形）。
// 引数の誤りのテストでも、ハッシュは正しい値を付ける（= 拒否の理由が検証であって INPUT_MISMATCH ではないことを確かめられる）。
function withHash(args) {
  if (!args.includes('--numbers') || args.includes('--input-sha256')) return args
  // 末尾が値を取るフラグのままだと、足したハッシュがその値になってしまい「値が無い」の検査の意味が変わる
  if (['--numbers', '--repo', '--table'].includes(args[args.length - 1])) return args
  const val = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] ?? '' : '' }
  return [...args, '--input-sha256', inputShaOf(val('--numbers'), val('--repo'), val('--table'))]
}

function run(bash, stub, args, { launcher = null, env = null, raw = false } = {}) {
  if (!raw) args = withHash(args)
  const argv = launcher ? [launcher.runVerified, launcher.sha, launcher.name, ...args] : [SCRIPT, ...args]
  const r = spawnSync(bash, argv, { env: env ?? stub.env(), encoding: 'utf8' })
  return { status: r.status, stdout: r.stdout, stderr: r.stderr }
}
// 表の長さを丁度 len 文字にした表（`["A-1",1]` の列の最後の番号の桁で端数を埋める）。
function tableOfLength(len) {
  const k = Math.floor((len - 20) / 10)
  const pad = len - (10 * k + 20)
  const entries = Array.from({ length: k }, () => '["A-1",1]')
  entries[k - 1] = `["A-1",${'1'.repeat(pad + 1)}]`
  const t = `{"f":{"1":[${entries.join(',')}]},"n":{}}`
  assert.equal(t.length, len)
  return t
}
const lines = (out) => out.split('\n').filter((l) => l !== '').map((l) => JSON.parse(l))

export function registerDeclaredDepsTests(bash) {
  const label = (name) => `declared-deps.sh [${bash}]: ${name}`

  // ---- 1) フィルタの同一性 ----
  test(label('--print-filter は切り出し前の実行時の文字列と文字単位で一致する（表なし）'), () => {
    const stub = makeStub()
    const r = run(bash, stub, ['--print-filter'])
    assert.equal(r.status, 0, r.stderr)
    const main = readFileSync(FIXTURE, 'utf8').replace(/\n$/, '')
    assert.equal(r.stdout, `${main}\n`)
    assert.equal(sha(main), MAIN_FILTER_SHA256_EMPTY, 'フィクスチャ自体が切り出し前の文字列のまま')
    assert.equal(sha(r.stdout.slice(0, -1)), MAIN_FILTER_SHA256_EMPTY)
    assert.equal(stub.calls().length, 0, '--print-filter は gh を呼ばない')
  })

  test(label('--print-filter は表のリテラルだけが切り出し前と違う（表あり）'), () => {
    const stub = makeStub()
    const literal = JSON.stringify(SAMPLE_TABLE)
    const r = run(bash, stub, ['--print-filter', '--table', literal])
    assert.equal(r.status, 0, r.stderr)
    const main = readFileSync(FIXTURE, 'utf8').replace(/\n$/, '')
    const anchor = `.number as $self | ${EMPTY_LITERAL} as $T |`
    assert.equal(main.split(anchor).length, 2, '基準の文字列に表のリテラルの位置が 1 か所')
    const expected = main.replace(anchor, () => `.number as $self | ${literal} as $T |`)
    assert.equal(r.stdout, `${expected}\n`)
    assert.equal(sha(expected), MAIN_FILTER_SHA256_SAMPLE)
  })

  test(label('フィルタは単一引用符・バッククォート・\\uXXXX を含まず、バックスラッシュは jq の 1 段のエスケープだけ'), () => {
    const stub = makeStub()
    const f = run(bash, stub, ['--print-filter']).stdout
    assert.ok(!f.includes("'") && !f.includes('`'))
    assert.doesNotMatch(f, /\\u[0-9a-fA-F]{4}/)
    // 正規表現の \b・\x27・\x60・\[・\] は jq の文字列では 2 文字のバックスラッシュで書く。1 文字のバックスラッシュ + b は jq ではバックスペース
    for (const esc of ['\\\\b', '\\\\x27', '\\\\x60', '\\\\[', '\\\\]']) assert.ok(f.includes(esc), `${esc} がある`)
    assert.doesNotMatch(f.replace(/\\\\/g, ''), /\\[bx[\]]/, '2 文字ずつの組を除くと、単独のバックスラッシュ + b / x / [ / ] は残らない')
  })

  // ---- 2) エスケープに依存する既知の入力を、スクリプト経由で実行する ----
  const depsOf = (stub, body, extra = []) => {
    stub.issue(1, body)
    const r = run(bash, stub, ['--numbers', '1', ...extra])
    assert.equal(r.status, 0, r.stderr)
    const [o] = lines(r.stdout)
    assert.equal(o.sig, sigOf(1, o.deps))
    return o.deps
  }

  test(label('\\\\b（単語境界）: 否定語の単語は除外し、別の単語に含まれる語は除外しない'), () => {
    const stub = makeStub()
    assert.deepEqual(depsOf(stub, 'Not blocked by #3\n'), [], 'Not の単語境界で否定として消費される')
    assert.deepEqual(depsOf(stub, 'no longer depends on #4\n'), [])
    assert.deepEqual(depsOf(stub, '## 依存\n- #42 (not required)\n- #44 nonetheless\n- #45 notable\n'), [44, 45], 'not は除外・nonetheless / notable は none / not の単語ではない')
    assert.deepEqual(depsOf(stub, 'knot depends on #6\n'), [6], 'knot の not は単語ではない')
  })

  test(label("\\\\x27（単一引用符）: n't の否定を除外する"), () => {
    const stub = makeStub()
    assert.deepEqual(depsOf(stub, "This isn't blocked by #4\n"), [])
    assert.deepEqual(depsOf(stub, "don't depend on #5\ndoesn't depends on #6\n"), [])
    assert.deepEqual(depsOf(stub, "## 依存\n- #7 (can't skip)\n- #8\n"), [8])
  })

  test(label('\\\\x60（バッククォート）: インラインコードとコードフェンスの例示を依存にしない'), () => {
    const stub = makeStub()
    assert.deepEqual(depsOf(stub, '`Depends on #8` と ``blocked by #9``\nDepends on #12\n'), [12])
    assert.deepEqual(depsOf(stub, '```\nDepends on #10\n```\nDepends on #11\n'), [11])
    assert.deepEqual(depsOf(stub, '~~~\nDepends on #12\n~~~\n'), [])
  })

  test(label('\\\\[ \\\\]（チェックボックス）: 依存節の - [ ] #N / - [x] #N を拾う'), () => {
    const stub = makeStub()
    assert.deepEqual(depsOf(stub, '## 依存\n- [ ] #8\n- [x] #9\n- [X] #10\n'), [8, 9, 10])
  })

  test(label('単語境界のエスケープが 1 段落ちた（\\\\b → \\b）フィルタでは結果が変わる（上のテストが転記ミスを検出できる）'), () => {
    const stub = makeStub()
    const good = run(bash, stub, ['--print-filter']).stdout.replace(/\n$/, '')
    const broken = good.split('\\\\b').join('\\b')
    assert.notEqual(broken, good)
    const input = JSON.stringify({ number: 1, body: 'Not blocked by #3\n' })
    const out = (f) => JSON.parse(execFileSync('jq', ['-c', f], { input }).toString()).deps
    assert.deepEqual(out(good), [])
    assert.deepEqual(out(broken), [3], 'バックスペースになって単語境界が効かず、否定が消費されない（jq はエラーにしない）')
  })

  // ---- 3) 実行 ----
  test(label('正常系: 番号の順に 1 行ずつ {number, deps, sig} を出し、gh は番号ごとに REST を 1 回'), () => {
    const stub = makeStub()
    stub.issue(11, '## 依存\n- #5\n')
    stub.issue(12, '本文のみ\n')
    stub.issue(13, 'Depends on #11, #12\n')
    const r = run(bash, stub, ['--numbers', '11,12,13'])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(lines(r.stdout), [
      { number: 11, deps: [5], sig: sigOf(11, [5]) },
      { number: 12, deps: [], sig: sigOf(12, []) },
      { number: 13, deps: [11, 12], sig: sigOf(13, [11, 12]) },
    ])
    assert.equal(r.stderr, '')
    const calls = stub.calls()
    assert.equal(calls.length, 3, 'ページングはしない（番号ごとに 1 回）')
    calls.forEach((c, i) => assert.ok(c.startsWith(`api repos/{owner}/{repo}/issues/${11 + i} --jq `), c))
  })

  test(label('--repo を渡すとその owner/repo の REST パスを呼ぶ'), () => {
    const stub = makeStub()
    stub.issue(5, 'Depends on #4\n')
    const r = run(bash, stub, ['--numbers', '5', '--repo', 'Fandhe-AI/agent-cli-skills'])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(lines(r.stdout), [{ number: 5, deps: [4], sig: sigOf(5, [4]) }])
    assert.ok(stub.calls()[0].startsWith('api repos/Fandhe-AI/agent-cli-skills/issues/5 --jq '))
  })

  test(label('--table: 兄弟のタスク ID を番号へ解決し、sig はホストと同じ式'), () => {
    const stub = makeStub()
    stub.issue(106, '前の工程（TASK-97-5）の結果を踏まえている\nDepends on #12\n')
    stub.issue(105, '前の工程（TASK-97-5）の結果を踏まえている\n')
    const r = run(bash, stub, ['--numbers', '106,105', '--table', JSON.stringify(SAMPLE_TABLE)])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(lines(r.stdout), [
      { number: 106, deps: [12, 105], sig: sigOf(106, [12, 105]) },
      { number: 105, deps: [], sig: sigOf(105, []) },
    ])
    const filter = stub.calls()[0].slice(stub.calls()[0].indexOf('--jq ') + 5)
    assert.ok(filter.includes(`.number as $self | ${JSON.stringify(SAMPLE_TABLE)} as $T |`), '表がフィルタのリテラルとして入る')
  })

  // ---- 入力の束縛（監査 M-1）: --input-sha256 ----
  // 転記で --table のエントリ・--repo・番号を落としても、sig は number と deps だけから計算されるので出力はつじつまが合う。
  // 束縛が無いと、表が欠けて兄弟の依存が解決されない・cwd の別リポジトリの同じ番号を読む、がホストの照合を通ってしまう。
  const BIND_TABLE = { f: { 100: [['TASK-97-5', 105], ['TASK-97-6', 106]], 200: [['TASK-98-1', 201]] }, n: { 106: ['100', 105], 201: ['200', 0] } }
  const BIND_NUMBERS = '105,106,201'
  const BIND_REPO = 'Fandhe-AI/agent-cli-skills'
  const bindingArgs = (over = {}) => {
    const a = { numbers: BIND_NUMBERS, repo: BIND_REPO, table: JSON.stringify(BIND_TABLE), ...over }
    const argv = ['--numbers', a.numbers]
    if (a.repo !== null) argv.push('--repo', a.repo)
    if (a.table !== null) argv.push('--table', a.table)
    return argv
  }
  const goodHash = inputShaOf(BIND_NUMBERS, BIND_REPO, JSON.stringify(BIND_TABLE))
  const seedBinding = (stub) => { for (const n of [105, 106, 201]) stub.issue(n, '前の工程（TASK-97-5）の結果を踏まえている\n') }
  const expectMismatch = (name, argv) => test(label(`入力の束縛: ${name} は exit 2・INPUT_MISMATCH・gh を呼ばない`), () => {
    const stub = makeStub()
    seedBinding(stub)
    const r = run(bash, stub, argv, { raw: true })
    assert.equal(r.status, 2, r.stderr)
    assert.equal(r.stdout, '', '出力（つじつまの合った sig を含む行）を出さない')
    assert.match(r.stderr, /INPUT_MISMATCH/)
    assert.ok(!r.stderr.includes(goodHash), '期待値を出力しない（転記し直しで通せない）')
    assert.equal(stub.calls().length, 0, 'gh を 1 回も呼ばない')
  })

  test(label('入力の束縛: 正しい起動行（--numbers・--repo・--table・--input-sha256）は通り、フラグの順序に依存しない'), () => {
    const stub = makeStub()
    seedBinding(stub)
    const r = run(bash, stub, [...bindingArgs(), '--input-sha256', goodHash], { raw: true })
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(lines(r.stdout).map((o) => o.number), [105, 106, 201])
    assert.equal(stub.calls().length, 3)
    // 順序を入れ替えても、同じ引数の値なら通る（束縛は値の組であって並びではない）
    const stub2 = makeStub()
    seedBinding(stub2)
    const r2 = run(bash, stub2, ['--input-sha256', goodHash, '--table', JSON.stringify(BIND_TABLE), '--repo', BIND_REPO, '--numbers', BIND_NUMBERS], { raw: true })
    assert.equal(r2.status, 0, r2.stderr)
    assert.deepEqual(lines(r2.stdout), lines(r.stdout))
    // ホストが付ける形（表も --repo も無い）の起動行も、空文字を入れた正準文字列で通る
    const stub3 = makeStub()
    stub3.issue(1, 'Depends on #2\n')
    const r3 = run(bash, stub3, ['--numbers', '1', '--input-sha256', inputShaOf('1')], { raw: true })
    assert.equal(r3.status, 0, r3.stderr)
  })

  // 表の転記の欠落（--table の 1 エントリ・句ごと・全体）
  const tableWith = (mut) => { const t = JSON.parse(JSON.stringify(BIND_TABLE)); mut(t); return JSON.stringify(t) }
  const goodArgs = (over) => [...bindingArgs(over), '--input-sha256', goodHash]
  expectMismatch('--table の f の 1 エントリの欠落（TASK-97-6）', goodArgs({ table: tableWith((t) => { t.f[100].pop() }) }))
  expectMismatch('--table の f の 1 つの家族の欠落（親 200）', goodArgs({ table: tableWith((t) => { delete t.f[200] }) }))
  expectMismatch('--table の n の 1 エントリの欠落（番号 201）', goodArgs({ table: tableWith((t) => { delete t.n[201] }) }))
  expectMismatch('--table の f 句ごとの欠落（f が空）', goodArgs({ table: tableWith((t) => { t.f = {} }) }))
  expectMismatch('--table の n 句ごとの欠落（n が空）', goodArgs({ table: tableWith((t) => { t.n = {} }) }))
  expectMismatch('--table 全体の欠落（フラグごと省略）', goodArgs({ table: null }))
  expectMismatch('--table が既定の空の表（渡した値は省略と区別する）', goodArgs({ table: '{"f":{},"n":{}}' }))
  expectMismatch('--table の番号の書き換え（TASK-97-6 の番号が 106 → 107）', goodArgs({ table: tableWith((t) => { t.f[100][1][1] = 107 }) }))
  // --repo の欠落・別リポジトリ
  expectMismatch('--repo の欠落（cwd のリポジトリの同じ番号を読む事故）', goodArgs({ repo: null }))
  expectMismatch('--repo の別のリポジトリへの書き換え', goodArgs({ repo: 'Fandhe-AI/other-repo' }))
  // --numbers の欠落・並べ替え・追加
  expectMismatch('--numbers の 1 個の欠落（先頭）', goodArgs({ numbers: '106,201' }))
  expectMismatch('--numbers の 1 個の欠落（末尾）', goodArgs({ numbers: '105,106' }))
  expectMismatch('--numbers の並べ替え', goodArgs({ numbers: '106,105,201' }))
  expectMismatch('--numbers への 1 個の追加', goodArgs({ numbers: '105,106,201,202' }))
  // --input-sha256 自体
  const flip = (h) => h.slice(0, -1) + (h.endsWith('0') ? '1' : '0')
  expectMismatch('--input-sha256 の 1 文字違い（末尾）', [...bindingArgs(), '--input-sha256', flip(goodHash)])
  expectMismatch('--input-sha256 の 1 文字違い（先頭）', [...bindingArgs(), '--input-sha256', (goodHash[0] === '0' ? '1' : '0') + goodHash.slice(1)])
  expectMismatch('--input-sha256 の大文字化', [...bindingArgs(), '--input-sha256', goodHash.toUpperCase()])
  expectMismatch('--input-sha256 の短縮', [...bindingArgs(), '--input-sha256', goodHash.slice(0, 63)])
  expectMismatch('--input-sha256 が空文字', [...bindingArgs(), '--input-sha256', ''])
  expectMismatch('--input-sha256 の欠落', bindingArgs())
  expectMismatch('--input-sha256 が別の入力のハッシュ（表なし）', [...bindingArgs(), '--input-sha256', inputShaOf(BIND_NUMBERS, BIND_REPO, '')])
  expectMismatch('正準文字列の区切りを変えたハッシュ（先頭の語・改行の有無）', [...bindingArgs(), '--input-sha256', sha(`declared-deps\n${BIND_NUMBERS}\n${BIND_REPO}\n${JSON.stringify(BIND_TABLE)}\n`)])
  expectMismatch('隣の欄に値をずらしたハッシュ（repo の欄へ表を入れる）', [...bindingArgs(), '--input-sha256', sha(`declared-deps\n${BIND_NUMBERS}\n${JSON.stringify(BIND_TABLE)}\n${BIND_REPO}`)])

  test(label('入力の束縛: 引数の検証（形式）は束縛より先に働く（不正な値は INPUT_MISMATCH ではなく使い方の誤り）'), () => {
    const stub = makeStub()
    const r = run(bash, stub, ['--numbers', '1,a', '--input-sha256', inputShaOf('1,a')], { raw: true })
    assert.equal(r.status, 2)
    assert.match(r.stderr, /使い方/)
    assert.doesNotMatch(r.stderr, /INPUT_MISMATCH/)
  })

  test(label('入力の束縛: --rate-limit と --print-filter は束縛の対象外（ハッシュなしで動く）'), () => {
    const stub = makeStub()
    stub.rate({ resources: { core: { limit: 5000, remaining: 1, reset: 4102444800 } } })
    assert.equal(run(bash, stub, ['--rate-limit'], { raw: true }).status, 0)
    assert.equal(run(bash, stub, ['--print-filter'], { raw: true }).status, 0)
  })

  for (const tool of ['sha256sum', 'shasum']) {
    const which = spawnSync('sh', ['-c', `command -v ${tool}`], { encoding: 'utf8' }).stdout.trim()
    test(label(`入力の束縛: ${tool} だけが使える環境でも同じ正準文字列で通る`), { skip: which === '' }, () => {
      const stub = makeStub()
      stub.issue(1, 'Depends on #2\n')
      const only = join(stub.dir, `only-${tool}`)
      mkdirSync(only)
      symlinkSync(join(stub.bin, 'gh'), join(only, 'gh'))
      for (const t of ['dirname', 'jq', tool, ...(tool === 'shasum' ? ['perl'] : [])]) {
        const p = spawnSync('sh', ['-c', `command -v ${t}`], { encoding: 'utf8' }).stdout.trim()
        if (p) symlinkSync(p, join(only, t))
      }
      const env = { PATH: only, GH_STUB_DIR: stub.dir, HOME: stub.dir }
      const r = run(bash, stub, ['--numbers', '1', '--repo', 'a/b', '--input-sha256', inputShaOf('1', 'a/b')], { raw: true, env })
      assert.equal(r.status, 0, r.stderr)
      assert.deepEqual(lines(r.stdout), [{ number: 1, deps: [2], sig: sigOf(1, [2]) }])
    })
  }

  test(label('入力の束縛: ハッシュを計算できない環境（sha256sum も shasum も無い）は exit 3 で gh を呼ばない'), () => {
    const stub = makeStub()
    stub.issue(1, 'x\n')
    const only = join(stub.dir, 'only-nohash')
    mkdirSync(only)
    symlinkSync(join(stub.bin, 'gh'), join(only, 'gh'))
    for (const t of ['dirname', 'jq']) symlinkSync(spawnSync('sh', ['-c', `command -v ${t}`], { encoding: 'utf8' }).stdout.trim(), join(only, t))
    const r = run(bash, stub, ['--numbers', '1', '--input-sha256', inputShaOf('1')], { raw: true, env: { PATH: only, GH_STUB_DIR: stub.dir, HOME: stub.dir } })
    assert.equal(r.status, 3, r.stderr)
    assert.equal(r.stdout, '')
    assert.equal(stub.calls().length, 0)
  })

  test(label('gh の失敗: 失敗したイシューは行を出さず FAILED #N を標準エラーへ。gh の標準エラーは通し、他のイシューは続ける'), () => {
    const stub = makeStub()
    stub.issue(1, 'Depends on #9\n')
    stub.fail(2, 'gh: API rate limit exceeded (HTTP 403)\n')
    stub.issue(3, '本文\n')
    stub.issue(5, '本文\n')
    const r = run(bash, stub, ['--numbers', '1,2,3,4,5'])
    assert.equal(r.status, 0, '一部の失敗でも完了（判定はホストの全件照合）')
    assert.deepEqual(lines(r.stdout).map((o) => o.number), [1, 3, 5])
    assert.match(r.stderr, /API rate limit exceeded/)
    assert.ok(r.stderr.split('\n').includes('FAILED #2'))
    assert.ok(r.stderr.split('\n').includes('FAILED #4'), '存在しないイシュー（404）も FAILED')
    assert.equal(stub.calls().length, 5)
  })

  test(label('jq が失敗する本文（JSON でない応答）でも行を出さず FAILED'), () => {
    const stub = makeStub()
    writeFileSync(join(stub.dir, 'issue-7.json'), 'not json')
    const r = run(bash, stub, ['--numbers', '7'])
    assert.equal(r.status, 0)
    assert.equal(r.stdout, '')
    assert.ok(r.stderr.split('\n').includes('FAILED #7'))
  })

  test(label('1 回の上限（100 個）まで受け、順に 1 回ずつ呼ぶ'), () => {
    const stub = makeStub()
    const nums = Array.from({ length: 100 }, (_, i) => i + 1)
    for (const n of nums) stub.issue(n, n % 2 === 0 ? `Depends on #${n - 1}\n` : '本文\n')
    const r = run(bash, stub, ['--numbers', nums.join(',')])
    assert.equal(r.status, 0, r.stderr)
    assert.equal(lines(r.stdout).length, 100)
    assert.equal(stub.calls().length, 100)
  })

  test(label('--rate-limit: core 枠の remaining・resetAt・waitSeconds を 1 行で出す'), () => {
    const stub = makeStub()
    stub.rate({ resources: { core: { limit: 5000, remaining: 0, reset: 4102444800 }, graphql: { remaining: 9 } } })
    const r = run(bash, stub, ['--rate-limit'])
    assert.equal(r.status, 0, r.stderr)
    const o = JSON.parse(r.stdout)
    assert.deepEqual(Object.keys(o), ['remaining', 'resetAt', 'waitSeconds'])
    assert.equal(o.remaining, 0)
    assert.equal(o.resetAt, '2100-01-01T00:00:00Z')
    assert.ok(Number.isInteger(o.waitSeconds) && o.waitSeconds > 0)
    assert.equal(stub.calls().length, 1)
    assert.ok(stub.calls()[0].startsWith('api rate_limit --jq .resources.core | {remaining, resetAt: (.reset | todate), waitSeconds: ([.reset - now, 0] | max | ceil)}'))
  })

  test(label('--rate-limit: gh の失敗はそのまま非 0 で返す'), () => {
    const stub = makeStub()
    const r = run(bash, stub, ['--rate-limit'])
    assert.notEqual(r.status, 0)
  })

  test(label('gh が無ければ exit 3（--print-filter は gh を使わないので通る）'), () => {
    const stub = makeStub()
    const empty = join(stub.dir, 'nobin')
    mkdirSync(empty)
    const dirname1 = execFileSync('sh', ['-c', 'command -v dirname'], { encoding: 'utf8' }).trim()
    symlinkSync(dirname1, join(empty, 'dirname'))
    const env = { PATH: empty, HOME: stub.dir }
    assert.equal(run(bash, stub, ['--numbers', '1'], { env }).status, 3)
    assert.equal(run(bash, stub, ['--rate-limit'], { env }).status, 3)
    assert.equal(run(bash, stub, ['--print-filter'], { env }).status, 0)
  })

  // ---- 引数の誤り: exit 2・gh を呼ばない ----
  const BAD = [
    ['モードが無い', []],
    ['未知の引数', ['--numbers', '1', '--bogus']],
    ['--numbers の値が無い', ['--numbers']],
    ['--numbers が 2 回', ['--numbers', '1', '--numbers', '2']],
    ['モードの併用（--numbers と --rate-limit）', ['--numbers', '1', '--rate-limit']],
    ['モードの併用（--rate-limit と --print-filter）', ['--rate-limit', '--print-filter']],
    ['番号が空', ['--numbers', '']],
    ['番号が 0', ['--numbers', '0']],
    ['番号の先頭ゼロ', ['--numbers', '01']],
    ['番号が負', ['--numbers', '-1']],
    ['番号が整数でない', ['--numbers', '1,a']],
    ['番号が 11 桁', ['--numbers', '12345678901']],
    ['番号の重複', ['--numbers', '1,2,1']],
    ['番号の区切りが連続', ['--numbers', '1,,2']],
    ['番号の末尾のカンマ', ['--numbers', '1,2,']],
    ['番号が空白区切り', ['--numbers', '1 2']],
    ['番号が 101 個', ['--numbers', Array.from({ length: 101 }, (_, i) => i + 1).join(',')]],
    ['番号にコマンド置換', ['--numbers', '$(touch x)']],
    ['--repo の形式', ['--numbers', '1', '--repo', 'no-slash']],
    ['--repo が空文字（省略と同じ扱いにしない）', ['--numbers', '1', '--repo', '']],
    ['--repo が 2 回', ['--numbers', '1', '--repo', 'a/b', '--repo', 'a/b']],
    ['--input-sha256 が 2 回', ['--numbers', '1', '--input-sha256', 'a', '--input-sha256', 'a']],
    ['--input-sha256 の値が無い', ['--numbers', '1', '--input-sha256']],
    ['--rate-limit に --input-sha256', ['--rate-limit', '--input-sha256', 'a']],
    ['--print-filter に --input-sha256', ['--print-filter', '--input-sha256', 'a']],
    ['--rate-limit に空の --repo', ['--rate-limit', '--repo', '']],
    ['--print-filter に空の --repo', ['--print-filter', '--repo', '']],
    ['--repo に空白', ['--numbers', '1', '--repo', 'a/b c']],
    ['--repo に引用符', ['--numbers', '1', '--repo', "a/b'c"]],
    ['--repo が先頭ハイフンの owner', ['--numbers', '1', '--repo', '-a/b']],
    ['--table が JSON でない', ['--numbers', '1', '--table', 'x']],
    ['--table が空', ['--numbers', '1', '--table', '']],
    ['--table の f が無い', ['--numbers', '1', '--table', '{"n":{}}']],
    ['--table に空白', ['--numbers', '1', '--table', '{"f": {},"n":{}}']],
    ['--table に単一引用符', ['--numbers', '1', '--table', `{"f":{"1":[["X-1'",2]]},"n":{}}`]],
    ['--table にバックスラッシュ', ['--numbers', '1', '--table', '{"f":{"1":[["X-1\\\\b",2]]},"n":{}}']],
    ['--table にバッククォート', ['--numbers', '1', '--table', '{"f":{"1":[["X-1`",2]]},"n":{}}']],
    ['--table の ID が小文字', ['--numbers', '1', '--table', '{"f":{"1":[["x-1",2]]},"n":{}}']],
    ['--table の ID にハイフン数字が無い', ['--numbers', '1', '--table', '{"f":{"1":[["TASK",2]]},"n":{}}']],
    ['--table の番号が文字列', ['--numbers', '1', '--table', '{"f":{"1":[["TASK-1","2"]]},"n":{}}']],
    ['--table の末尾に余分な文字', ['--numbers', '1', '--table', '{"f":{},"n":{}}x']],
    ['--table の先頭に余分な文字', ['--numbers', '1', '--table', 'x{"f":{},"n":{}}']],
    // 上限（DD_TABLE_MAX = 120000）を 1 文字だけ超える表。Linux は 1 引数 131072 B（MAX_ARG_STRLEN）を超えると spawn が E2BIG で失敗するため、それ未満に収める
    ['--table が長すぎる（上限 + 1 文字）', ['--numbers', '1', '--table', tableOfLength(120001)]],
    ['--rate-limit に他の引数', ['--rate-limit', '--repo', 'a/b']],
    ['--print-filter に --repo', ['--print-filter', '--repo', 'a/b']],
    ['--print-filter の --table が不正', ['--print-filter', '--table', 'x']],
  ]
  for (const [name, args] of BAD) {
    test(label(`引数の誤り: ${name}`), () => {
      const stub = makeStub()
      const r = run(bash, stub, args)
      assert.equal(r.status, 2, r.stderr)
      assert.equal(r.stdout, '')
      assert.equal(stub.calls().length, 0)
      assert.match(r.stderr, /使い方/)
      assert.doesNotMatch(r.stderr, /INPUT_MISMATCH/, '束縛ではなく引数の検証が拒否する')
      if (name.includes('値が無い')) assert.match(r.stderr, /に値が無い/, '到達する分岐は「値が無い」（足したハッシュが値として消費されない）')
      assert.ok(!existsSync(join(process.cwd(), 'x')), '番号にコマンド置換を含めても実行されない')
    })
  }

  test(label('大きな表（40 親 × 100 件）を検証でき、フィルタへそのまま入る'), () => {
    const stub = makeStub()
    const f = {}
    const n = {}
    for (let p = 1; p <= 40; p++) {
      f[p] = Array.from({ length: 100 }, (_, i) => [`TASK-${p}-${i + 1}`, p * 1000 + i])
      n[p * 1000 + 50] = [String(p), p * 1000 + 49]
    }
    const literal = JSON.stringify({ f, n })
    assert.ok(literal.length < 120000)
    const t0 = Date.now()
    const r = run(bash, stub, ['--print-filter', '--table', literal])
    assert.equal(r.status, 0, r.stderr)
    assert.ok(r.stdout.includes(` ${literal} as $T |`))
    assert.ok(Date.now() - t0 < 10000, '検証が極端に遅くない')
  })

  test(label('表が上限（120000 文字）ちょうどなら検証を通り、フィルタへそのまま入る（1 文字超は引数の誤りで拒否）'), () => {
    const stub = makeStub()
    stub.issue(1, 'Depends on #2\n')
    const literal = tableOfLength(120000)
    const r = run(bash, stub, ['--numbers', '1', '--table', literal])
    assert.equal(r.status, 0, r.stderr)
    assert.deepEqual(lines(r.stdout).map((e) => e.number), [1])
    assert.equal(run(bash, stub, ['--numbers', '1', '--table', tableOfLength(120001)]).status, 2)
  })

  // ---- launcher ----
  test(label('run-verified.sh 経由: 正しいハッシュで起動し、スクリプトまたは lib の書き換えは exit 3'), () => {
    const stub = makeStub()
    const dir = join(stub.dir, 'skill-scripts')
    mkdirSync(join(dir, 'lib'), { recursive: true })
    for (const f of ['declared-deps.sh', 'run-verified.sh']) writeFileSync(join(dir, f), readFileSync(join(SCRIPTS, f)))
    for (const f of ['declared-deps-lib.sh', 'signed-output.sh']) writeFileSync(join(dir, 'lib', f), readFileSync(join(SCRIPTS, 'lib', f)))
    const launcher = { runVerified: join(dir, 'run-verified.sh'), sha: bundleSha256(dir, 'declared-deps.sh'), name: 'declared-deps.sh' }
    stub.issue(1, 'Depends on #2\n')
    const ok = run(bash, stub, ['--numbers', '1'], { launcher })
    assert.equal(ok.status, 0, ok.stderr)
    assert.deepEqual(lines(ok.stdout), [{ number: 1, deps: [2], sig: sigOf(1, [2]) }])
    // lib のフィルタを 1 文字書き換える（バックスラッシュの半減を模す）と、ハッシュが合わず起動しない
    const libPath = join(dir, 'lib', 'declared-deps-lib.sh')
    writeFileSync(libPath, readFileSync(libPath, 'utf8').replace('\\\\b(?:not', '\\b(?:not'))
    assert.equal(run(bash, stub, ['--numbers', '1'], { launcher }).status, 3)
  })

  // ---- lib の検証関数（1 回の bash 起動で表を検査） ----
  const libCheck = (fn, value) => spawnSync(bash, ['-c', `. "${LIB}"; ${fn} "$1"`, 'x', value], { encoding: 'utf8' }).status
  test(label('lib: dd_input_sha は独立に書いた正準文字列の SHA-256 と一致する（空の欄・表あり・末尾に改行なし）'), () => {
    const SIGNED = join(SCRIPTS, 'lib', 'signed-output.sh')
    const dd = (...a) => spawnSync(bash, ['-c', `. "${SIGNED}"; . "${LIB}"; dd_input_sha "$1" "$2" "$3"`, 'x', ...a], { encoding: 'utf8' })
    for (const [n, r, t] of [['1', '', ''], ['1,2', 'a/b', ''], ['105,106', 'Fandhe-AI/x', JSON.stringify(SAMPLE_TABLE)], ['7', '', JSON.stringify(SAMPLE_TABLE)]]) {
      const out = dd(n, r, t)
      assert.equal(out.status, 0, out.stderr)
      assert.equal(out.stdout, inputShaOf(n, r, t))
      assert.match(out.stdout, /^[0-9a-f]{64}$/)
    }
    assert.notEqual(inputShaOf('1', 'a/b', ''), inputShaOf('1', '', 'a/b'), '欄を入れ替えると別の値')
  })
  test(label('lib: dd_valid_numbers / dd_valid_repo / dd_valid_table の受理と拒否'), () => {
    for (const v of ['1', '1,2,3', '1234567890', '9,8,7']) assert.equal(libCheck('dd_valid_numbers', v), 0, v)
    for (const v of ['', '0', '01', ',1', '1,', '1,,2', '1,1', 'a', '1 2', '12345678901', '-1']) assert.equal(libCheck('dd_valid_numbers', v), 1, v)
    for (const v of ['a/b', 'Fandhe-AI/agent-cli-skills', 'o/r.s_t-u']) assert.equal(libCheck('dd_valid_repo', v), 0, v)
    for (const v of ['', 'a', 'a/', '/b', 'a/b/c', '-a/b', 'a-/b', 'a/.', 'a/..', 'a/b c', "a/b'c", `a/${'b'.repeat(101)}`]) assert.equal(libCheck('dd_valid_repo', v), 1, v)
    for (const v of [EMPTY_LITERAL, JSON.stringify(SAMPLE_TABLE), '{"f":{"1":[["A-1",2],["B2-3-4",5]],"7":[["C-1",9]]},"n":{"2":["1",0],"9":["7",0]}}']) assert.equal(libCheck('dd_valid_table', v), 0, v)
    for (const v of ['', '{}', '{"f":{},"n":{},"x":1}', '{"f":{"a":[["A-1",2]]},"n":{}}', '{"f":{"1":[]},"n":{}}', '{"f":{"1":[["A-1",2],]},"n":{}}', '{"f":{},"n":{"1":["2"]}}', '{"f":{},"n":{"1":["2",3,4]}}']) assert.equal(libCheck('dd_valid_table', v), 1, v)
  })
}
