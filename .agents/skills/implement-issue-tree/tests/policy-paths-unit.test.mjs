// scripts/lib/policy-paths-lib.sh（observe-pr.sh の policy-paths モードの判定だけの純関数）を、表で単体検査する回帰テスト（Issue #760）。
//
// 方針パス（.github/workflows/・.github/actions/・CODEOWNERS 3 箇所）の判定、許可の完全一致と / 終わりの接頭辞一致、リネームの新旧、
// 空の許可を、git・gh を呼ばずに 1 回の bash 起動で表の全ケースに当てる。利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes, toolExists } from './lib/signed-output.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'policy-paths-lib.sh')

// 1 行 1 ケース（許可 TAB files の JSON。空の許可は _ で書く = 先頭の TAB は read に潰される）を読、`<番号> <rc> [<出力>]` を返す
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
i=0
TAB=$(printf '\\t')
while IFS="$TAB" read -r allow input; do
  rc=0
  [ "$allow" != _ ] || allow=""
  out=$(printf '%s' "$input" | policy_paths_count "$allow") || rc=$?
  printf '%s %s [%s]\\n' "$i" "$rc" "$out"
  i=$((i + 1))
done
`
const f = (filename, previous_filename) => (previous_filename ? { filename, previous_filename } : { filename })

const CASES = [
  // [名前, 許可, ファイル, policy, unplanned]
  ['方針パス以外だけなら 0', '', [f('src/a.js'), f('docs/x.md')], 0, 0],
  ['workflows 配下は方針パス（許可なしは全件が計画外）', '', [f('.github/workflows/ci.yml'), f('src/a.js')], 1, 1],
  ['actions 配下も方針パス', '', [f('.github/actions/setup/action.yml')], 1, 1],
  ['CODEOWNERS は 3 箇所の完全一致', '', [f('CODEOWNERS'), f('.github/CODEOWNERS'), f('docs/CODEOWNERS')], 3, 3],
  ['別の場所の CODEOWNERS は方針パスではない', '', [f('src/CODEOWNERS'), f('CODEOWNERS.md')], 0, 0],
  ['紛らわしい名前（workflowsx・actions-lib）は方針パスではない', '', [f('.github/workflowsx/a.yml'), f('.github/actions-lib/a.yml'), f('github/workflows/a.yml')], 0, 0],
  ['大文字小文字は区別する', '', [f('.GitHub/workflows/ci.yml'), f('.github/Workflows/ci.yml')], 0, 0],
  ['/ 終わりの許可は接頭辞として一致する', '.github/workflows/', [f('.github/workflows/ci.yml'), f('.github/workflows/sub/x.yml')], 2, 0],
  ['ファイル名の許可は完全一致だけ', '.github/workflows/ci.yml', [f('.github/workflows/ci.yml'), f('.github/workflows/ci.yml.bak'), f('.github/workflows/other.yml')], 3, 2],
  ['/ で終わらない許可は接頭辞として扱わない', '.github/workflows', [f('.github/workflows/ci.yml')], 1, 1],
  ['許可の一部だけなら残りが計画外', '.github/workflows/,CODEOWNERS', [f('.github/workflows/ci.yml'), f('CODEOWNERS'), f('.github/CODEOWNERS')], 3, 1],
  ['リネームは新旧の両方を数える（workflow の外へ出す）', '', [f('docs/ci.yml', '.github/workflows/ci.yml')], 1, 1],
  ['リネームで workflow へ入れる', '', [f('.github/workflows/ci.yml', 'docs/ci.yml')], 1, 1],
  ['workflow 内のリネームは 2 件', '.github/workflows/', [f('.github/workflows/b.yml', '.github/workflows/a.yml')], 2, 0],
  ['リネームの片側だけが許可外なら計画外が残る', '.github/workflows/', [f('.github/workflows/b.yml', 'CODEOWNERS')], 2, 1],
  ['ファイルなしは 0', 'CODEOWNERS', [], 0, 0],
]

for (const bash of availableBashes()) {
  test(`[${bash}] policy_paths_count: 方針パスと計画外の件数を表で数える`, { skip: !toolExists('jq') }, () => {
    const lines = CASES.map(([, allow, files]) => `${allow || '_'}\t${JSON.stringify(files)}`).join('\n') + '\n'
    const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIB], { input: lines, encoding: 'utf8' })
    assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
    const out = r.stdout.split('\n').filter((l) => l !== '')
    assert.equal(out.length, CASES.length, r.stdout)
    CASES.forEach(([name, , , policy, unplanned], i) => {
      assert.equal(out[i], `${i} 0 [${JSON.stringify({ policy, unplanned })}]`, name)
    })
  })

  test(`[${bash}] policy_paths_count: 配列でない入力は出力なしで rc 非 0`, { skip: !toolExists('jq') }, () => {
    const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIB], { input: '_\t{"filename":"x"}\n_\t"abc"\n', encoding: 'utf8' })
    assert.equal(r.status, 0)
    for (const l of r.stdout.split('\n').filter((x) => x !== '')) {
      assert.match(l, /^\d+ [1-9]\d* \[\]$/, l)
    }
  })
}
