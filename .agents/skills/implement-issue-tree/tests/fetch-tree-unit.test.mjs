// scripts/lib/fetch-tree-lib.sh（fetch-tree.sh の判定・ダイジェストの関数）を、表で単体検査する回帰テスト（Issue #668）。
// 1 回の bash 起動で表の全ケースを source した関数へ渡す。利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
// 期待値は node:crypto による独立計算（ホストの実装とも lib の実装とも共有しない）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
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
    input) out=$(ft_input_sha "$a" "$b") || rc=$? ;;
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
    ])
    assert.deepEqual(res.slice(0, 6).map((x) => x.out), ['plain', 'a b', 'x y', '   ', '日本語 🎉', ''])
    assert.deepEqual(res.slice(6, 10).map((x) => x.rc), [0, 0, 1, 1])
    assert.deepEqual(res.slice(10, 16).map((x) => x.rc), [0, 0, 1, 1, 1, 1])
    assert.equal(res[16].rc, 0)
    assert.equal(res[16].out, ['5', '1', '0', 'open', '2', sha('タイトル 🎉')].join('\t'))
    assert.deepEqual([res[17].rc, res[17].out], [0, expectNodes])
    assert.equal(res[18].out, sha('fetch-tree\n12\no/r'))
    assert.equal(res[19].out, sha('fetch-tree\n12\n'))
    void hex
  })
}
