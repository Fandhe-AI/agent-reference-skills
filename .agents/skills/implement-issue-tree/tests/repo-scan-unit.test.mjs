// scripts/lib/repo-scan-lib.sh（repo-scan.sh の判定と封筒の payload 組み立てだけの純関数）を、表で単体検査する回帰テスト。
//
// slug・sha・番号・ラベルの形式検査、番号の整列、slug の収集（昇順・重複なし・形式不正の件数）、入力の束縛、payload の正規形を、
// gh・ネットワークを呼ばずに 1 回の bash 起動で表の全ケースに当てる。利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
// 期待値はホスト・スクリプトの実装とは独立に書く（入力の束縛は node:crypto で計算する）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, repoScanInputSha256, toolExists } from './lib/signed-output.mjs'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts')
const SIGNED = join(SCRIPTS, 'lib', 'signed-output.sh')
const LIB = join(SCRIPTS, 'lib', 'repo-scan-lib.sh')

// 1 行 1 ケース: 関数名 TAB 引数（\\n は改行、\\t はタブへ戻す）。出力は `<番号> <rc> [<出力>]`
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
. "$2" || exit 9
i=0
TAB=$(printf '\\t')
unesc() { printf '%b' "$1"; }
while IFS="$TAB" read -r fn a1 a2 a3; do
  rc=0
  a1=$(unesc "$a1"); a2=$(unesc "$a2"); a3=$(unesc "$a3")
  case "$fn" in
    collect_apps) rs_collect_apps "$a1"; out="$RS_APPS|$RS_DROPPED" ;;
    input_sha) out=$(rs_input_sha "$a1" "$a2" $a3) || rc=$? ;;
    *) out=$("$fn" "$a1" "$a2" "$a3") || rc=$? ;;
  esac
  printf '%s %s [%s]\\n' "$i" "$rc" "$(printf '%s' "$out" | tr '\\n' '~')"
  i=$((i + 1))
done
`

const long = (c, n) => c.repeat(n)
// [名前, 関数, 引数 1, 2, 3, 期待 rc, 期待出力]
const CASES = [
  // slug
  ['slug: 小文字英数字とハイフン', 'rs_valid_slug', 'cursor', '', '', 0, ''],
  ['slug: 数字始まりも可', 'rs_valid_slug', '9x', '', '', 0, ''],
  ['slug: ハイフンを含む', 'rs_valid_slug', 'my-app-2', '', '', 0, ''],
  ['slug: 64 文字は可', 'rs_valid_slug', long('a', 64), '', '', 0, ''],
  ['slug: 65 文字は不可', 'rs_valid_slug', long('a', 65), '', '', 1, ''],
  ['slug: 空は不可', 'rs_valid_slug', '', '', '', 1, ''],
  ['slug: ハイフン始まりは不可（オプションと取り違えない）', 'rs_valid_slug', '-x', '', '', 1, ''],
  ['slug: 大文字は不可', 'rs_valid_slug', 'Cursor', '', '', 1, ''],
  ['slug: 下線は不可', 'rs_valid_slug', 'a_b', '', '', 1, ''],
  ['slug: 空白は不可', 'rs_valid_slug', 'a b', '', '', 1, ''],
  ['slug: シェルの特殊文字は不可', 'rs_valid_slug', 'a;b', '', '', 1, ''],
  ['slug: コマンド置換は不可', 'rs_valid_slug', '$(id)', '', '', 1, ''],
  ['slug: 非 ASCII は不可', 'rs_valid_slug', 'ａｂ', '', '', 1, ''],
  // sha
  ['sha: 40 桁の小文字 16 進', 'rs_valid_sha', long('a', 40), '', '', 0, ''],
  ['sha: 64 桁も可', 'rs_valid_sha', long('0', 64), '', '', 0, ''],
  ['sha: 39 桁は不可', 'rs_valid_sha', long('a', 39), '', '', 1, ''],
  ['sha: 41 桁は不可', 'rs_valid_sha', long('a', 41), '', '', 1, ''],
  ['sha: 大文字は不可', 'rs_valid_sha', long('A', 40), '', '', 1, ''],
  ['sha: 16 進以外は不可', 'rs_valid_sha', long('g', 40), '', '', 1, ''],
  ['sha: 空は不可', 'rs_valid_sha', '', '', '', 1, ''],
  // 番号
  ['番号: 正の整数', 'rs_valid_number', '123', '', '', 0, ''],
  ['番号: 9 桁まで', 'rs_valid_number', '999999999', '', '', 0, ''],
  ['番号: 10 桁は不可', 'rs_valid_number', '1000000000', '', '', 1, ''],
  ['番号: 0 は不可', 'rs_valid_number', '0', '', '', 1, ''],
  ['番号: 先頭 0 は不可', 'rs_valid_number', '012', '', '', 1, ''],
  ['番号: 負・小数・文字は不可', 'rs_valid_number', '-1', '', '', 1, ''],
  ['番号: 小数は不可', 'rs_valid_number', '1.5', '', '', 1, ''],
  ['番号: 空は不可', 'rs_valid_number', '', '', '', 1, ''],
  // ラベル
  ['ラベル: コロン・空白を含む', 'rs_valid_label', 'owner:human', '', '', 0, ''],
  ['ラベル: 日本語', 'rs_valid_label', '人手', '', '', 0, ''],
  ['ラベル: 内側の空白は可', 'rs_valid_label', 'good first issue', '', '', 0, ''],
  ['ラベル: 空は不可', 'rs_valid_label', '', '', '', 1, ''],
  ['ラベル: カンマは不可（labels= は AND になる）', 'rs_valid_label', 'a,b', '', '', 1, ''],
  ['ラベル: 改行は不可', 'rs_valid_label', 'a\\nb', '', '', 1, ''],
  ['ラベル: タブは不可', 'rs_valid_label', 'a\\tb', '', '', 1, ''],
  ['ラベル: 制御文字は不可', 'rs_valid_label', 'a\\001b', '', '', 1, ''],
  ['ラベル: 先頭の空白は不可', 'rs_valid_label', ' x', '', '', 1, ''],
  ['ラベル: 末尾の空白は不可', 'rs_valid_label', 'x ', '', '', 1, ''],
  ['ラベル: 200 バイトは可', 'rs_valid_label', long('a', 200), '', '', 0, ''],
  ['ラベル: 201 バイトは不可', 'rs_valid_label', long('a', 201), '', '', 1, ''],
  // 番号の整列
  ['整列: 昇順・重複なし・カンマ区切り', 'rs_sorted_numbers', '9\\n3\\n5\\n3', '', '', 0, '3,5,9'],
  ['整列: 数値順（辞書順にしない）', 'rs_sorted_numbers', '100\\n9\\n20', '', '', 0, '9,20,100'],
  ['整列: 空は何も出さない（成功）', 'rs_sorted_numbers', '', '', '', 0, ''],
  ['整列: 空行は無視', 'rs_sorted_numbers', '\\n4\\n\\n', '', '', 0, '4'],
  ['整列: 番号でない行が 1 つでもあれば失敗（黙って捨てない）', 'rs_sorted_numbers', '4\\nabc\\n5', '', '', 1, ''],
  ['整列: 0 や先頭 0 は失敗', 'rs_sorted_numbers', '4\\n0', '', '', 1, ''],
  ['整列: エラー本文（JSON）は失敗', 'rs_sorted_numbers', '{"message":"Not Found"}', '', '', 1, ''],
  // slug の収集
  ['収集: 昇順・重複なし', 'collect_apps', 'cursor\\ncodecov\\ncursor\\n9x', '', '', 0, '9x~codecov~cursor|0'],
  ['収集: 形式不正は捨てて数える（空行は数えない）', 'collect_apps', 'ok\\n\\nBad\\na b\\nx;y\\n-z', '', '', 0, 'ok|4'],
  ['収集: 空', 'collect_apps', '', '', '', 0, '|0'],
  ['収集: 文字列 null は slug の形式なので残る（null の check-run は jq が落とす）', 'collect_apps', 'null', '', '', 0, 'null|0'],
  ['収集: LC_ALL=C の並び（数字 < 英小文字・ハイフンは数字の前）', 'collect_apps', 'b\\na-b\\na1\\na\\n1', '', '', 0, '1~a~a-b~a1~b|0'],
  // --numbers（ツリーの open ノードの番号。Issue #807）
  ['numbers: 昇順のカンマ区切り（数値として比べる）', 'rs_valid_numbers_csv', '1,2,10,100', '', '', 0, ''],
  ['numbers: 1 件', 'rs_valid_numbers_csv', '7', '', '', 0, ''],
  ['numbers: 9 桁まで', 'rs_valid_numbers_csv', '999999999', '', '', 0, ''],
  ['numbers: 空は不可', 'rs_valid_numbers_csv', '', '', '', 1, ''],
  ['numbers: 昇順でない', 'rs_valid_numbers_csv', '10,9', '', '', 1, ''],
  ['numbers: 重複', 'rs_valid_numbers_csv', '3,3', '', '', 1, ''],
  ['numbers: 先頭 0', 'rs_valid_numbers_csv', '1,02', '', '', 1, ''],
  ['numbers: 0', 'rs_valid_numbers_csv', '0,1', '', '', 1, ''],
  ['numbers: 10 桁', 'rs_valid_numbers_csv', '1234567890', '', '', 1, ''],
  ['numbers: 数字以外', 'rs_valid_numbers_csv', '1,x', '', '', 1, ''],
  ['numbers: 空白', 'rs_valid_numbers_csv', '1, 2', '', '', 1, ''],
  ['numbers: 先頭のカンマ', 'rs_valid_numbers_csv', ',1', '', '', 1, ''],
  ['numbers: 末尾のカンマ', 'rs_valid_numbers_csv', '1,', '', '', 1, ''],
  ['numbers: 連続するカンマ', 'rs_valid_numbers_csv', '1,,2', '', '', 1, ''],
  ['numbers: 改行', 'rs_valid_numbers_csv', '1\\n2', '', '', 1, ''],
  // 交わり（Issue #807）
  ['交わり: ラベルの番号のうちノードにあるものだけ（ラベル側の順）', 'rs_intersect_numbers', '2,5,9,100', '1,2,3,9,10,100', '', 0, '2,9,100'],
  ['交わり: 交わらなければ空', 'rs_intersect_numbers', '2,5', '1,3,4', '', 0, ''],
  ['交わり: ラベルの番号が空なら空', 'rs_intersect_numbers', '2,5', '', '', 0, ''],
  ['交わり: 桁の違う番号を前方一致で取り違えない', 'rs_intersect_numbers', '1,12', '11,120,121,12', '', 0, '12'],
  // JSON
  ['JSON: slug の配列', 'rs_json_slugs', 'a\\nb-1', '', '', 0, '["a","b-1"]'],
  ['JSON: 空の配列', 'rs_json_slugs', '', '', '', 0, '[]'],
  // payload
  ['payload: external-checks はキー昇順', 'rs_payload_external', '["a"]', '3', '1', 0, '{"apps":["a"],"dropped":0,"errs":1,"inputSha256":"h","prs":3}'],
  ['payload: skip-labels はキー昇順', 'rs_payload_skip', '[2]', '[{"i":1,"numbers":[3]}]', '[3]', 0, '{"absent":[2],"entries":[{"i":1,"numbers":[3]}],"failed":[3],"inputSha256":"h"}'],
  // 入力の束縛
  ['束縛: external-checks（repo なし）', 'input_sha', 'external-checks', '', '', 0, repoScanInputSha256('external-checks', '')],
  ['束縛: external-checks（repo あり）', 'input_sha', 'external-checks', 'Fandhe-AI/x', '', 0, repoScanInputSha256('external-checks', 'Fandhe-AI/x')],
  ['束縛: skip-labels（ラベル 2 件・日本語・空白）', 'input_sha', 'skip-labels', 'Fandhe-AI/x', "owner:human 'a'", 0, null],
]

// payload 組み立ての引数 4 つ目（inputSha256）は固定値 h にするため、ドライバーを経由せず別に検査する
const EXTRA = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
. "$2" || exit 9
rs_payload_external '["a"]' 3 1 0 h
printf '\\n'
rs_payload_skip '[2]' '[{"i":1,"numbers":[3]}]' '[3]' h
printf '\\n'
rs_input_sha skip-labels Fandhe-AI/x 'owner:human' '人手 x' 'it'"'"'s'
printf '\\n'
rs_input_sha skip-labels '' a
printf '\\n'
`

for (const bash of availableBashes()) {
  test(`[${bash}] repo-scan-lib: 形式検査・整列・収集・束縛を表で検査する`, { skip: !toolExists('jq') && 'jq が無い' }, () => {
    const rows = CASES.filter((c) => !['rs_payload_external', 'rs_payload_skip'].includes(c[1]) && c[6] !== null)
    const lines = rows.map(([, fn, a1, a2, a3]) => [fn, a1, a2, a3].join('\t')).join('\n') + '\n'
    const r = spawnSync(bash, ['-c', DRIVER, 'driver', SIGNED, LIB], { input: lines, encoding: 'utf8' })
    assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
    const out = r.stdout.split('\n').filter((l) => l !== '')
    assert.equal(out.length, rows.length, r.stdout)
    rows.forEach(([name, , , , , rc, want], i) => {
      assert.equal(out[i], `${i} ${rc} [${want}]`, name)
    })
  })

  test(`[${bash}] repo-scan-lib: payload の正規形（キー昇順・空白なし）と入力の束縛は独立計算と一致する`, () => {
    const r = spawnSync(bash, ['-c', EXTRA, 'driver', SIGNED, LIB], { encoding: 'utf8' })
    assert.equal(r.status, 0, r.stderr)
    const [pe, ps, i1, i2] = r.stdout.split('\n')
    assert.equal(pe, '{"apps":["a"],"dropped":0,"errs":1,"inputSha256":"h","prs":3}')
    assert.equal(ps, '{"absent":[2],"entries":[{"i":1,"numbers":[3]}],"failed":[3],"inputSha256":"h"}')
    assert.equal(i1, repoScanInputSha256('skip-labels', 'Fandhe-AI/x', ['owner:human', '人手 x', "it's"]), '残りの欄を順に連結する（skip-labels のスクリプトは numbers を先頭に渡す）')
    assert.equal(i2, repoScanInputSha256('skip-labels', '', ['a']))
    // 正規形は JSON として読め、キーが昇順である
    for (const line of [pe, ps]) {
      const keys = Object.keys(JSON.parse(line))
      assert.deepEqual(keys, [...keys].sort())
    }
  })

  test(`[${bash}] repo-scan-lib: LC_ALL=C のとき slug の判定は ASCII の小文字英数字とハイフンだけ（大文字・全角・アクセント付きは不可）`, () => {
    const drv = `
set -u
. "$1" || exit 9
. "$2" || exit 9
for s in Cursor Ａ é a_b ok; do rs_valid_slug "$s" && printf 'T' || printf 'F'; done
`
    // lib は呼び出し元のスクリプトが LC_ALL=C を設定する前提（ここでも C にして流す）。環境のロケールが違ってもスクリプト経由なら C になることは
    // repo-scan.test.mjs の「LC_ALL を変えても同じ出力」が確かめる
    const r = spawnSync(bash, ['-c', `LC_ALL=C; export LC_ALL; ${drv}`, 'driver', SIGNED, LIB], { encoding: 'utf8' })
    assert.equal(r.stdout, 'FFFFT')
  })
}
