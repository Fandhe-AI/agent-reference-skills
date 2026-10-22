// scripts/lib/fetch-tree-lib.sh（fetch-tree.sh の判定・ダイジェストの関数）を、表で単体検査する回帰テスト（Issue #668）。
// 1 回の bash 起動で表の全ケースを source した関数へ渡す。利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
// 期待値は node:crypto による独立計算（ホストの実装とも lib の実装とも共有しない）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { availableBashes } from './lib/signed-output.mjs'

const LIBDIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib')
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex')
const US = '\u001f'

// 各行 [関数, 引数...]（引数の改行は @@、タブは ## で表す）。出力は `<i> <rc> <stdout の JSON 文字列>`
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1/signed-output.sh" || exit 9
. "$1/fetch-tree-lib.sh" || exit 9
US=$(printf '\\037')
TAB=$(printf '\\t')
NL='
'
dec() { printf '%s' "$1" | sed 's/@@/\\
/g; s/##/'"$TAB"'/g'; }
i=0
while IFS="$US" read -r fn a b c d e f; do
  rc=0
  out=""
  a=$(dec "$a")
  f=$(dec "$f")
  case "$fn" in
    title) out=$(ft_title_display "$a") || rc=$? ;;
    state) ft_valid_state "$a" || rc=$? ;;
    count) ft_count_ok "$a" "$b" || rc=$? ;;
    line) out=$(ft_row_digest_line "$a" "$b" "$c" "$d" "$e" "$f") || rc=$? ;;
    nodes) out=$(printf '%s\\n' "$a" | ft_nodes_digest) || rc=$? ;;
    taskid) out=$(printf '%s\\n' "$a" | ft_task_id_digest) || rc=$? ;;
    struct) out=$(printf '%s\\n' "$a" | ft_struct_digest) || rc=$? ;;
    input) out=$(ft_input_sha "$a" "$b") || rc=$? ;;
    pcount) out=$(printf '%s\\n' "$a" | ft_page_count "$b") || rc=$? ;;
    pcount0) out=$(printf '' | ft_page_count "$b") || rc=$? ;;
    pslice) out=$(printf '%s\\n' "$a" | ft_page_slice "$b" "$c") || rc=$? ;;
    dname) ft_page_dir_name_ok "$a" || rc=$? ;;
    *) echo "unknown fn $fn" >&2; exit 8 ;;
  esac
  printf '%s %s %s\\n' "$i" "$rc" "$(printf '%s' "$out" | od -An -tx1 | tr -d ' \\n')"
  i=$((i + 1))
done
`

const enc = (s) => String(s).replace(/\n/g, '@@').replace(/\t/g, '##')
const hex = (s) => Buffer.from(s, 'utf8').toString('hex')

function table(bash, rows) {
  const input = rows.map((r) => r.map(enc).join(US)).join('\n') + '\n'
  const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIBDIR], { input, encoding: 'utf8' })
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  const lines = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(lines.length, rows.length, r.stdout)
  return lines.map((l) => {
    const m = /^(\d+) (\d+) ?([0-9a-f]*)$/.exec(l)
    assert.ok(m, l)
    return { rc: Number(m[2]), out: Buffer.from(m[3], 'hex').toString('utf8') }
  })
}

for (const bash of availableBashes()) {
  test(`[${bash}] fetch-tree-lib.sh の表`, () => {
    const lineA = ['5', '1', '0', 'open', '2', 'タイトル 🎉']
    const nodesTsv = ['2\t1\t0\tclosed\t0\tb', '1\t0\t0\topen\t1\ta', '10\t1\t1\topen\t0\tc d'].join('\n')
    const expectNodes = sha(
      [
        ['1', '0', '0', 'open', '1', sha('a')],
        ['2', '1', '0', 'closed', '0', sha('b')],
        ['10', '1', '1', 'open', '0', sha('c d')],
      ].map((x) => x.join('\t')).join('\n'),
    )
    const res = table(bash, [
      ['title', 'plain'],
      ['title', 'a\tb'],
      ['title', 'x\ny'],
      ['title', '\u0001\u0002\u007f'],
      ['title', '日本語 🎉'],
      ['title', ''],
      ['state', 'open'],
      ['state', 'closed'],
      ['state', 'merged'],
      ['state', ''],
      ['count', '0', '0'],
      ['count', '3', '3'],
      ['count', '3', '2'],
      ['count', '03', '3'],
      ['count', '', '0'],
      ['count', 'x', 'x'],
      ['line', ...lineA.slice(0, 5), lineA[5]],
      ['nodes', nodesTsv],
      ['input', '12', 'o/r'],
      ['input', '12', ''],
      // ページ分割（Issue #673）。1 行は「長さ + 改行 1」で数え、上限を超える手前で次のページへ回す
      ['pcount', 'aaaa@@bbbb@@cccc', '10'], // 5 + 5 / 5 → 2 ページ
      ['pcount', 'aaaa@@bbbb@@cccc', '15'], // 1 ページ
      ['pcount', 'aaaa@@bbbb@@cccc', '14'], // 10 + 5 > 14 → 2 ページ
      ['pcount', 'toolongline@@x', '5'], // 1 行が上限超過 → その行だけで 1 ページ、x が 2 ページ目
      ['pcount', '日本語@@日本語', '10'], // 1 行 10 バイト（9 + 改行 1）× 2 → 2 ページ
      ['pcount0', '', '10'],
      ['pcount', 'a', '0'],
      ['pslice', 'aaaa@@bbbb@@cccc', '10', '1'],
      ['pslice', 'aaaa@@bbbb@@cccc', '10', '2'],
      ['pslice', 'aaaa@@bbbb@@cccc', '10', '3'],
      ['pslice', 'aaaa@@bbbb@@cccc', '10', '0'],
      ['dname', '/tmp/iit-tree.AbC123'],
      ['dname', '/var/folders/ab/c_d1/T/iit-tree.AbC123'],
      ['dname', 'tmp/iit-tree.AbC123'],
      ['dname', '/tmp/other.AbC123'],
      ['dname', '/tmp/iit-tree.'],
      ['dname', '/tmp/iit-tree.a b'],
      ['dname', '/tmp/../etc/iit-tree.x'],
      ['dname', '/tmp/iit-tree.x;rm'],
    ])
    assert.deepEqual(res.slice(0, 6).map((x) => x.out), ['plain', 'a b', 'x y', '   ', '日本語 🎉', ''])
    assert.deepEqual(res.slice(6, 10).map((x) => x.rc), [0, 0, 1, 1])
    assert.deepEqual(res.slice(10, 16).map((x) => x.rc), [0, 0, 1, 1, 1, 1])
    assert.equal(res[16].rc, 0)
    assert.equal(res[16].out, ['5', '1', '0', 'open', '2', sha('タイトル 🎉')].join('\t'))
    assert.deepEqual([res[17].rc, res[17].out], [0, expectNodes])
    assert.equal(res[18].out, sha('fetch-tree\n12\no/r'))
    assert.equal(res[19].out, sha('fetch-tree\n12\n'))
    assert.deepEqual(res.slice(20, 25).map((x) => [x.rc, x.out]), [[0, '2'], [0, '1'], [0, '2'], [0, '2'], [0, '2']])
    assert.equal(res[25].rc, 1)
    assert.equal(res[26].rc, 2)
    assert.deepEqual(res.slice(27, 31).map((x) => [x.rc, x.out]), [[0, 'aaaa\nbbbb'], [0, 'cccc'], [1, ''], [2, '']])
    assert.deepEqual(res.slice(31).map((x) => x.rc), [0, 0, 1, 1, 1, 1, 1, 1])
    void hex
  })

  test(`[${bash}] ft_struct_digest（title を除く 5 欄・順序非依存・Issue #687）`, () => {
    const expect = sha(['1\t0\t0\topen\t1', '2\t1\t0\tclosed\t0', '10\t1\t1\topen\t0'].join('\n'))
    const a = ['2\t1\t0\tclosed\t0\tb', '1\t0\t0\topen\t1\ta', '10\t1\t1\topen\t0\tc d'].join('\n')
    const retitled = ['2\t1\t0\tclosed\t0\tB!', '1\t0\t0\topen\t1\t日本語', '10\t1\t1\topen\t0\t'].join('\n')
    const sib = ['2\t1\t0\tclosed\t0\tb', '1\t0\t0\topen\t1\ta', '10\t1\t2\topen\t0\tc d'].join('\n')
    const res = table(bash, [['struct', a], ['struct', retitled], ['struct', sib], ['struct', '']])
    assert.deepEqual([res[0].rc, res[0].out], [0, expect])
    assert.deepEqual([res[1].rc, res[1].out], [0, expect])
    assert.equal(res[2].rc, 0)
    assert.notEqual(res[2].out, expect)
    assert.notEqual(res[3].rc, 0)
  })
}

// jq/Oniguruma の \s と JS の \s は U+FEFF・U+0085 で食い違う。両側が同じ明示集合を使い、抽出結果が一致すること（Issue #687）。
// ホスト側の TITLE_TASK_ID_RE を実ソースから取り出す（テスト側に正規表現を複製しない）。
const SRC_RE_LINE = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'implement-issue-tree.src.js'), 'utf8')
  .split('\n').find((l) => l.startsWith('const TITLE_TASK_ID_RE ='))
const SRC_RE = new Function(`return ${SRC_RE_LINE.replace('const TITLE_TASK_ID_RE =', '')}`)()
const WS_PARITY_TITLES = [
  ['\uFEFFTASK-1 x', 'TASK-1'],
  ['\u0085TASK-1 x', ''],
  ['\u00A0TASK-1 x', 'TASK-1'],
  ['feat:\u3000TASK-1 x', 'TASK-1'],
  ['TASK-1\u3000x', 'TASK-1'],
  ['TASK-1\u0085x', ''],
  ['TASK-1\uFEFFx', 'TASK-1'],
  // scope の {0,64} はコードポイント単位で両側一致させる（絵文字はホストで UTF-16 の 2 単位になる）
  [`feat(${'\u{1F600}'.repeat(33)}): TASK-1 x`, 'TASK-1'],
  [`feat(${'\u{1F600}'.repeat(64)}): TASK-1 x`, 'TASK-1'],
  [`feat(${'\u{1F600}'.repeat(65)}): TASK-1 x`, ''],
]
for (const bash of availableBashes()) {
  test(`[${bash}] ft_task_id_digest は JS の空白集合と一致する（U+FEFF / U+0085・Issue #687）`, () => {
    for (const [title, want] of WS_PARITY_TITLES) {
      const jsId = (SRC_RE.exec(title) || [])[1] || ''
      assert.equal(jsId, want, `JS: ${JSON.stringify(title)}`)
      const res = table(bash, [['taskid', `1\t0\t0\topen\t0\t${title}`]])
      assert.deepEqual([res[0].rc, res[0].out], [0, sha(`1\t${want}`)], `jq: ${JSON.stringify(title)}`)
    }
  })
}

for (const bash of availableBashes()) {
  test(`[${bash}] ft_task_id_digest（タイトル先頭のタスク ID だけ・順序非依存・Issue #687）`, () => {
    const rows = [
      '1\t0\t0\topen\t1\tfeat(x)!: [TASK-97-6] foo',
      '2\t1\t0\topen\t0\tno id',
      '3\t1\t1\topen\t0\t【ABC-1-2】x',
      '4\t1\t2\topen\t0\tTASK-97-5x',
      '5\t1\t3\topen\t0\tTASK-97-5',
      '10\t1\t4\topen\t0\t',
    ]
    const expect = sha(['1\tTASK-97-6', '2\t', '3\tABC-1-2', '4\t', '5\tTASK-97-5', '10\t'].join('\n'))
    const reordered = [rows[5], rows[2], rows[0], rows[4], rows[1], rows[3]].join('\n')
    const retitled = rows.map((r) => r.replace('foo', 'bar')).join('\n')
    const dropped = rows.map((r) => r.replace('[TASK-97-6] ', '')).join('\n')
    const res = table(bash, [['taskid', rows.join('\n')], ['taskid', reordered], ['taskid', retitled], ['taskid', dropped], ['taskid', '']])
    assert.deepEqual([res[0].rc, res[0].out], [0, expect])
    assert.deepEqual([res[1].rc, res[1].out], [0, expect])
    assert.deepEqual([res[2].rc, res[2].out], [0, expect])
    assert.equal(res[3].rc, 0)
    assert.notEqual(res[3].out, expect)
    assert.notEqual(res[4].rc, 0)
  })
}
