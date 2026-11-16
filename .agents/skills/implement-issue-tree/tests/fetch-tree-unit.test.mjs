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
import { importDefinitions } from './lib/stub-run.mjs'

// ホストの treeOptinDigest（実ソースの定義部を読み込む）。シェルの ft_optin_digest と同じ値になること
const { treeOptinDigest, treeNodesDigest, treeStructDigest } = await importDefinitions(['treeOptinDigest', 'treeNodesDigest', 'treeStructDigest'], 'fetch-tree-unit')

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
    optin) out=$(printf '%s\\n' "$a" | ft_optin_digest) || rc=$? ;;
    input) out=$(ft_input_sha "$a" "$b") || rc=$? ;;
    pcount) out=$(printf '%s\\n' "$a" | ft_page_count "$b") || rc=$? ;;
    pcount0) out=$(printf '' | ft_page_count "$b") || rc=$? ;;
    pslice) out=$(printf '%s\\n' "$a" | ft_page_slice "$b" "$c") || rc=$? ;;
    pinput) out=$(ft_page_input_sha "$a" "$b") || rc=$? ;;
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
      ['pinput', 'abc', '3'],
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
    assert.deepEqual(res.slice(31, 39).map((x) => x.rc), [0, 0, 1, 1, 1, 1, 1, 1])
    assert.deepEqual([res[39].rc, res[39].out], [0, sha('fetch-tree-page\nabc\n3')])
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

// 第 7 欄 optinTests（本文の opt-in テスト宣言）。optinSha256 は number 昇順の `number TAB 第 7 欄の JSON` の SHA-256。
// nodesSha256 / structSha256 は 7 欄の行でも第 7 欄を見ず、title が空でも分割がずれない（タブの連続を畳まない）。
for (const bash of availableBashes()) {
  test(`[${bash}] ft_optin_digest（第 7 欄だけ・順序非依存）と、7 欄の行での ft_nodes_digest / ft_struct_digest の不変`, () => {
    const rows7 = ['2\t1\t0\tclosed\t0\tb\t[]', '1\t0\t0\topen\t1\ta\t["make e2e"]', '10\t1\t1\topen\t0\tc d\t["npm run e2e","node --test"]']
    const expectOptin = sha(['1\t["make e2e"]', '2\t[]', '10\t["npm run e2e","node --test"]'].join('\n'))
    const reordered = [rows7[2], rows7[0], rows7[1]].join('\n')
    const retitled = rows7.map((r) => r.replace('\ta\t', '\tA!\t').replace('\tb\t', '\t\t')).join('\n') // title を変える・空にしても optin は同じ
    const changed = rows7.map((r) => r.replace('make e2e', 'make e2f')).join('\n')
    const dropped = rows7.map((r) => r.replace('\t[]', '\t[""]')).join('\n')
    // 6 欄の旧形式の行（第 7 欄なし）でも nodes / struct は従来と同じ値
    const rows6 = rows7.map((r) => r.slice(0, r.lastIndexOf('\t')))
    const withEmptyTitle = '3\t1\t2\topen\t0\t\t["x"]'
    const res = table(bash, [
      ['optin', rows7.join('\n')],
      ['optin', reordered],
      ['optin', retitled],
      ['optin', changed],
      ['optin', dropped],
      ['optin', ''],
      ['nodes', rows7.join('\n')],
      ['nodes', rows6.join('\n')],
      ['struct', rows7.join('\n')],
      ['struct', rows6.join('\n')],
      ['nodes', withEmptyTitle],
      ['nodes', '3\t1\t2\topen\t0\t'],
      ['optin', withEmptyTitle],
    ])
    assert.deepEqual([res[0].rc, res[0].out], [0, expectOptin])
    assert.deepEqual([res[1].rc, res[1].out], [0, expectOptin])
    assert.deepEqual([res[2].rc, res[2].out], [0, expectOptin])
    assert.equal(res[3].rc, 0)
    assert.notEqual(res[3].out, expectOptin)
    assert.equal(res[4].rc, 0)
    assert.notEqual(res[4].out, expectOptin)
    assert.notEqual(res[5].rc, 0)
    assert.equal(res[6].out, res[7].out)
    assert.equal(res[8].out, res[9].out)
    // 空の title は 6 欄の行と 7 欄の行で同じ nodesSha256（第 7 欄が title に詰められない）
    assert.deepEqual([res[10].rc, res[10].out], [0, res[11].out])
    assert.equal(res[10].out, sha(['3', '1', '2', 'open', '0', sha('')].join('\t')))
    assert.equal(res[12].out, sha('3\t["x"]'))
  })

  test(`[${bash}] シェルの ft_*_digest とホストの tree*Digest が同じ値（JS とシェルのダイジェストの一致）`, () => {
    const nodes = [
      { number: 7, parent: 1, siblingIndex: 1, state: 'open', subIssuesTotal: 0, title: 'chore: 日本語 🎉', optinTests: ['make e2e', 'npm run e2e', 'cargo test -- --ignored', 'go test ./...', 'a?b', ''] },
      { number: 1, parent: 0, siblingIndex: 0, state: 'open', subIssuesTotal: 2, title: 'root', optinTests: [] },
      { number: 12, parent: 1, siblingIndex: 0, state: 'closed', subIssuesTotal: 0, title: '', optinTests: [] },
      { number: 100, parent: 1, siblingIndex: 2, state: 'open', subIssuesTotal: 0, title: 'x y', optinTests: ['pnpm run test:e2e', 'make t@v1+2,3=4_5.6-7/8:9'] },
    ]
    const tsv = nodes.map((n) => [n.number, n.parent, n.siblingIndex, n.state, n.subIssuesTotal, n.title, JSON.stringify(n.optinTests)].join('\t')).join('\n')
    const res = table(bash, [['optin', tsv], ['nodes', tsv], ['struct', tsv]])
    assert.deepEqual(res.map((x) => x.rc), [0, 0, 0])
    assert.equal(res[0].out, treeOptinDigest(nodes))
    assert.equal(res[1].out, treeNodesDigest(nodes))
    assert.equal(res[2].out, treeStructDigest(nodes))
  })
}

// ---- FT_JQ_OPTIN の optin_list（第 7 欄の抽出・正規化）を表で検査する（Issue #802 / #803）----
// 1 回の bash 起動・1 回の jq 起動で、ノード（{state, body}）の配列の全ケースを流す。期待値は下の独立実装（JS の正規表現）と手書きの値。
const OPTIN_DRIVER = `
. "$1/fetch-tree-lib.sh" || exit 9
jq -c "\${FT_JQ_OPTIN} .[] | optin_list"
`
function optinTable(bash, nodes) {
  const r = spawnSync(bash, ['-c', OPTIN_DRIVER, 'driver', LIBDIR], { input: JSON.stringify(nodes), encoding: 'utf8' })
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  const lines = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(lines.length, nodes.length)
  return lines
}
// 独立実装: 閉じない開始（同じ行で後ろに --> が無い <!--[ \t]*optin-tests:）があれば ["?"]、無ければ scan → 前後の空白とタブを落とす → 正規化 → 1 値 300 → 20 件 → 合計 1,000
const START_RE = /<!--[ \t]*optin-tests:/g
const DECL_RE = /<!--[ \t]*optin-tests:([^\n]*?)-->/g
const normV = (v) => [...v.replace(/^[ \t]+|[ \t]+$/g, '').replace(/\t/g, ' ')].map((c) => (/^[A-Za-z0-9 _./:=@+,-]$/.test(c) ? c : '?')).join('')
function expectedOptin({ state, body }) {
  if (state !== 'open') return []
  const b = body ?? ''
  const open = b.split('\n').some((line) => [...line.matchAll(START_RE)].some((m) => !line.includes('-->', m.index + m[0].length)))
  if (open) return ['?']
  let vs = [...b.matchAll(DECL_RE)].map((m) => normV(m[1])).map((v) => ([...v].length > 300 ? `${[...v].slice(0, 299).join('')}?` : v))
  if (vs.length > 20) vs = [...vs.slice(0, 19), '?']
  return vs.reduce((n, v) => n + v.length, 0) > 1000 ? ['?'] : vs
}
const OPTIN_COL_MAX = 1000 + 20 * 2 + 19 + 2 // 値 1,000 文字 + 引用符 + カンマ + 括弧 = 第 7 欄の 1 ノードの最大バイト数

for (const bash of availableBashes()) {
  test(`[${bash}] optin_list: 閉じない宣言は ["?"] 1 件（行の最後の --> より後ろに開始がある）・閉じた宣言の抽出は変わらない`, () => {
    const m = (v) => `<!-- optin-tests: ${v} -->`
    const cases = [
      ['閉じた宣言', m('make a'), ['make a']],
      ['閉じた宣言 2 件と構文外の行', `説明\n${m('make a')}\n\`\`\`\n${m('npm run e2e')}\n\`\`\``, ['make a', 'npm run e2e']],
      ['入れ子の開始は同じ --> で閉じる（scan の 1 件のまま）', '<!-- optin-tests: a <!-- optin-tests: b -->', ['a ??-- optin-tests: b']],
      ['<!--> の --> でも閉じる', '<!-- optin-tests: a <!-->', ['a ??']],
      ['閉じた宣言の後ろに閉じない開始', '<!-- optin-tests: a --> <!-- optin-tests: b', ['?']],
      ['2 行目が閉じない', `x\n${m('make a')}\n<!-- optin-tests: no close`, ['?']],
      ['次の行の --> では閉じない', '<!-- optin-tests: a\n-->', ['?']],
      ['--> が開始より前にだけある', '--> <!-- optin-tests: x', ['?']],
      ['閉じない開始が複数でも ? は 1 件', '<!-- optin-tests: a\n<!-- optin-tests: b\n<!--optin-tests:', ['?']],
      ['開始の間の空白とタブ', '<!--\t \toptin-tests: x', ['?']],
      ['本文中の構文の説明でも止まる', '宣言は `<!-- optin-tests:` で始めて、閉じる記号は次の行に書く\n`-->`', ['?']],
      ['構文の説明が同じ行で閉じていれば値として抽出（? を含むので invalid）', '例: `<!-- optin-tests: <cmd> -->`', ['?cmd?']],
      ['日本語の後ろの閉じない開始', '日本語の説明<!-- optin-tests: make a', ['?']],
      ['CR は行を分けない（CRLF の閉じた宣言はそのまま）', `${m('make a')}\r\n${m('make b')}\r\n`, ['make a', 'make b']],
      ['CRLF の閉じない宣言', '<!-- optin-tests: make a\r\n', ['?']],
      ['大文字は開始ではない', '<!-- OPTIN-TESTS: x', []],
      ['名前違いは開始ではない', '<!-- optin-test: x\n<!-- optin-testsx', []],
      ['<!-- の無い optin-tests: は開始ではない', 'optin-tests: x', []],
      ['NBSP を挟んだものは開始ではない（正規表現の [ \\t] と同じ）', '<!-- optin-tests: x', []],
      ['<!-- だけ・--> だけ', '<!--\n-->\n<!-- x', []],
      ['空の本文', '', []],
    ]
    const nodes = [
      ...cases.map(([, body]) => ({ state: 'open', body })),
      { state: 'open', body: null },
      { state: 'closed', body: '<!-- optin-tests: x' },
    ]
    const out = optinTable(bash, nodes)
    cases.forEach(([name, , exp], i) => assert.equal(out[i], JSON.stringify(exp), name))
    assert.equal(out[cases.length], '[]', 'null の本文')
    assert.equal(out[cases.length + 1], '[]', 'closed は閉じない宣言があっても []')
    nodes.forEach((n, i) => assert.equal(out[i], JSON.stringify(expectedOptin(n)), `独立実装との一致 ${i}`))
  })

  test(`[${bash}] optin_list: 1 ノードの合計が 1,000 文字を超えたら ["?"] に置き換える（1,000 ちょうどは通す）。第 7 欄は最大 ${OPTIN_COL_MAX} バイト`, () => {
    const m = (v) => `<!-- optin-tests: ${v} -->`
    const val = (len, c = 'a') => `make ${c.repeat(len - 5)}`
    const decls = (n, len) => Array.from({ length: n }, (_, i) => m(val(len, String.fromCharCode(97 + (i % 26))))).join('\n')
    const cases = [
      ['20 件 × 50 文字 = 1,000 ちょうど', decls(20, 50), 'keep'],
      ['4 件 × 250 文字 = 1,000 ちょうど', decls(4, 250), 'keep'],
      ['1,001 文字', `${decls(3, 250)}\n${m(val(251))}`, 'cap'],
      ['4 件 × 300 文字 = 1,200', decls(4, 300), 'cap'],
      ['1 値の 300 文字の切り詰めの後で数える（2 件 × 5,000 → 300 + 300 = 600）', decls(2, 5000), 'keep'],
      ['1 値の切り詰めの後で 1,000 を超える（4 件 × 400 → 1,200）', decls(4, 400), 'cap'],
      ['20 件の切り詰めの後で数える（21 件 × 50 → 19 件 950 + ? = 951）', decls(21, 50), 'keep'],
      ['20 件の切り詰めの後で 1,000 を超える（25 件 × 60 → 1,141）', decls(25, 60), 'cap'],
      ['200 件 × 300 文字（本文の上限 65,536 文字以内）', decls(200, 300), 'cap'],
    ]
    const out = optinTable(bash, cases.map(([, body]) => ({ state: 'open', body })))
    cases.forEach(([name, body, kind], i) => {
      const exp = expectedOptin({ state: 'open', body })
      assert.equal(out[i], JSON.stringify(exp), name)
      if (kind === 'cap') assert.equal(out[i], '["?"]', name)
      else assert.notEqual(out[i], '["?"]', name)
      assert.ok(Buffer.byteLength(out[i]) <= OPTIN_COL_MAX, `${name}: ${Buffer.byteLength(out[i])} バイト`)
    })
    assert.equal(Buffer.byteLength(out[0]), OPTIN_COL_MAX, '上限ちょうどの宣言が第 7 欄の最大バイト数')
  })

  test(`[${bash}] optin_list: 生成した本文で独立実装と一致し、第 7 欄は ${OPTIN_COL_MAX} バイト以下`, () => {
    // 固定シードの線形合同法。部品は開始・終端・その断片・空白・改行・日本語・長い値
    let seed = 802803
    const rnd = (n) => {
      seed = (seed * 1103515245 + 12345) % 2147483648
      return seed % n
    }
    const parts = ['<!--', '-->', ' optin-tests:', 'optin-tests:', '<!-- optin-tests: ', ' -->', '\n', '\r\n', ' ', '\t', 'make e2e', '-', '>', '<!-->', '日本', 'x'.repeat(90), ';']
    const nodes = Array.from({ length: 400 }, () => ({ state: 'open', body: Array.from({ length: 1 + rnd(40) }, () => parts[rnd(parts.length)]).join('') }))
    const out = optinTable(bash, nodes)
    let opened = 0
    let extracted = 0
    nodes.forEach((n, i) => {
      assert.equal(out[i], JSON.stringify(expectedOptin(n)), JSON.stringify(n.body))
      assert.ok(Buffer.byteLength(out[i]) <= OPTIN_COL_MAX)
      if (out[i] === '["?"]') opened += 1
      else if (out[i] !== '[]') extracted += 1
    })
    assert.ok(opened > 20 && extracted > 20, `生成の偏り: ? ${opened} 件・抽出 ${extracted} 件`)
  })
}
