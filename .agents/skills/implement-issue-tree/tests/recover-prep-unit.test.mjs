// scripts/lib/recover-prep-lib.sh（recover-prep.sh の判断だけの純関数）を、表で単体検査する回帰テスト（Issue #603 第 9 弾）。
//
// 対象ブランチの解決・WIP コミットの要否と結果の分類・base との差分の三値判定は、git を呼ばない純関数に切り出してある。1 回の bash 起動で
// 表の全ケースを source した関数へ渡し、1 行ずつ結果を返させる（実 git で全体を走らせる検査は tests/recover-prep.test.mjs）。
// 利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes } from './lib/signed-output.mjs'

const SCRIPTS = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib')
const US = '\u001f'
const NL = '@@' // 表の中の改行（ドライバが改行へ戻す）

// 各行 [関数名, 引数...]。出力は `<i> <rc> [<標準出力>] [RP_ 変数のまとめ]`
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1/worktree-remove-lib.sh" || exit 9
. "$1/recover-prep-lib.sh" || exit 9
US=$(printf '\\037')
nl() { printf '%s' "$1" | sed 's/@@/\\
/g'; }
i=0
while IFS="$US" read -r fn a b c d e; do
  rc=0
  out=""
  RP_RESOLVED=x; RP_REASON=x; RP_BRANCH=x; RP_SOURCE=x; RP_WT_MISSING=x; RP_NESTED=x; RP_UNMERGED=x
  case "$fn" in
    rp_resolve) rp_resolve "$a" "$b" "$c" "$d" "$e" ;;
    rp_scan_status) rp_scan_status "$(nl "$a")" ;;
    *) out=$("$fn" "$a" "$b" "$c" "$d" 2>&1) || rc=$? ;;
  esac
  printf '%s %s [%s] [%s,%s,%s,%s,%s,%s,%s]\\n' "$i" "$rc" "$out" "$RP_RESOLVED" "$RP_REASON" "$RP_BRANCH" "$RP_SOURCE" "$RP_WT_MISSING" "$RP_NESTED" "$RP_UNMERGED"
  i=$((i + 1))
done
`

function table(bash, rows) {
  const input = rows.map((r) => r.join(US)).join('\n') + '\n'
  const r = spawnSync(bash, ['-c', DRIVER, 'driver', SCRIPTS], { input, encoding: 'utf8' })
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  const lines = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(lines.length, rows.length, `行数が合わない:\n${r.stdout}`)
  return lines.map((l, i) => {
    const m = /^(\d+) (\d+) \[(.*?)\] \[(.*)\]$/.exec(l)
    assert.ok(m && Number(m[1]) === i, l)
    const [resolved, reason, branch, source, wtm, nested, unmerged] = m[4].split(',')
    return { rc: Number(m[2]), out: m[3], resolved, reason, branch, source, wtm, nested, unmerged }
  })
}

function check(name, rows, expect) {
  for (const bash of availableBashes()) {
    test(`${name} [${bash}]`, () => {
      const got = table(bash, rows)
      rows.forEach((r, i) => expect(got[i], r, i))
    })
  }
}

// rp_resolve の表。[given, wtstate, head, state, base] → [resolved, reason, branch, source, worktreeMissing]
const RESOLVE_ROWS = [
  // branch だけの残骸: 記録されたブランチを使う（記録が無ければ対象なし）
  [0, 'missing', '', 'feat/1-x', 'main', [1, '', 'feat/1-x', 'state', 0]],
  [0, 'live', 'other', 'feat/1-x', 'main', [1, '', 'feat/1-x', 'state', 0]],
  [0, 'missing', '', '', 'main', [0, 'no-target', '', 'none', 0]],
  // 記録されたブランチが base と同名なら確定しない（live と対称。dead worktree・branch だけの残骸でも base を継続・破棄の対象にしない）
  [0, 'missing', '', 'main', 'main', [0, 'base-branch', '', 'none', 0]],
  [0, 'live', 'other', 'release/1.0', 'release/1.0', [0, 'base-branch', '', 'none', 0]],
  [1, 'missing', '', 'main', 'main', [0, 'base-branch', '', 'none', 0]],
  [1, 'missing', '', 'main', '', [1, '', 'main', 'state', 1]],
  [0, 'missing', '', 'main', 'develop', [1, '', 'main', 'state', 0]],
  // dead worktree: 記録されたブランチを使う（無ければ空で確定 = 継続不能）。取り残すデータが無い
  [1, 'missing', '', 'feat/1-x', 'main', [1, '', 'feat/1-x', 'state', 1]],
  [1, 'missing', '', '', 'main', [1, '', '', 'none', 1]],
  [1, 'missing', 'ignored', 'feat/1-x', 'main', [1, '', 'feat/1-x', 'state', 1]],
  // live: worktree の HEAD を使う。state が食い違っても HEAD を優先、state が無くても HEAD
  [1, 'live', 'feat/1-x', 'feat/1-x', 'main', [1, '', 'feat/1-x', 'worktree', 0]],
  [1, 'live', 'feat/2-y', 'feat/1-x', 'main', [1, '', 'feat/2-y', 'worktree', 0]],
  [1, 'live', 'feat/2-y', '', 'main', [1, '', 'feat/2-y', 'worktree', 0]],
  // live で確定しない: ブランチを指さない（detached・読めない）、base と同名
  [1, 'live', '', 'feat/1-x', 'main', [0, 'detached', '', 'none', 0]],
  [1, 'live', '', '', 'main', [0, 'detached', '', 'none', 0]],
  [1, 'live', 'main', 'feat/1-x', 'main', [0, 'base-branch', '', 'none', 0]],
  [1, 'live', 'release/1.0', 'feat/1-x', 'release/1.0', [0, 'base-branch', '', 'none', 0]],
  [1, 'live', 'main', 'main', 'main', [0, 'base-branch', '', 'none', 0]],
  // 確定しない: メイン・未登録・git がそのパス自身を指さない（実体があるのに dead 扱いにしない）
  [1, 'main', 'main', 'feat/1-x', 'main', [0, 'main-worktree', '', 'none', 0]],
  [1, 'main', 'feat/1-x', 'feat/1-x', 'main', [0, 'main-worktree', '', 'none', 0]],
  [1, 'unregistered', 'feat/1-x', 'feat/1-x', 'main', [0, 'not-registered', '', 'none', 0]],
  [1, 'mismatch', 'feat/1-x', 'feat/1-x', 'main', [0, 'toplevel-mismatch', '', 'none', 0]],
  [1, 'bogus', 'feat/1-x', 'feat/1-x', 'main', [0, 'unknown-state', '', 'none', 0]],
]
check(
  'rp_resolve: 対象ブランチの解決（live は HEAD を優先・dead と branch だけの残骸は記録を使う・メイン／未登録／不一致／detached／base 同名は確定しない）',
  RESOLVE_ROWS.map((r) => ['rp_resolve', ...r.slice(0, 5)]),
  (g, _r, i) => {
    const [resolved, reason, branch, source, wtm] = RESOLVE_ROWS[i][5]
    assert.deepEqual(
      [g.resolved, g.reason, g.branch, g.source, g.wtm],
      [String(resolved), reason, branch, source, String(wtm)],
      JSON.stringify(RESOLVE_ROWS[i].slice(0, 5)),
    )
  },
)

const SCAN_ROWS = [
  ['', 0, 0],
  ['# branch.oid abc', 0, 0],
  ['1 .M N... 100644 100644 100644 a b a.txt', 0, 0],
  ['? u.txt', 0, 0],
  ['? deep/er/u.txt', 0, 0],
  ['u UU N... 100644 100644 100644 100644 a b c a.txt', 0, 1],
  [`u UU N... 1 1 1 1 a b c a.txt${NL}u AA N... 1 1 1 1 a b c b.txt`, 0, 2],
  ['? nested/', 1, 0],
  [`? nested/${NL}? other/${NL}? u.txt`, 2, 0],
  [`1 .M N... 100644 100644 100644 a b a.txt${NL}? nested/${NL}u UU N... 1 1 1 1 a b c c.txt`, 1, 1],
  ['1 .M N... 100644 100644 100644 a b dir/', 0, 0],
  // read -r なので末尾が \ のパスでも次のレコードと連結されず、後続の入れ子 repo の行（? …/）が隠れない（-r を外すと壊れる）
  [`? a\\${NL}? nested/`, 1, 0],
  [`u UU N... 1 1 1 1 a b c x\\${NL}? nested/${NL}? mid\\dle/`, 2, 1],
  [`? trail\\\\${NL}? nested/`, 1, 0],
]
check(
  'rp_scan_status: 未マージ行（u ）と入れ子の git リポジトリ（未追跡の行で末尾が /）を数える',
  SCAN_ROWS.map((r) => ['rp_scan_status', r[0]]),
  (g, _r, i) => assert.deepEqual([g.nested, g.unmerged], [String(SCAN_ROWS[i][1]), String(SCAN_ROWS[i][2])], JSON.stringify(SCAN_ROWS[i][0])),
)

check(
  'rp_wip_plan: 汚れ無し → none、確認不能 → unverified、未マージ → unmerged、入れ子 → nested-repo、それ以外の汚れ → commit',
  [
    ['rp_wip_plan', '0', '0', '0'], ['rp_wip_plan', '0', '3', '2'], ['rp_wip_plan', '1', '0', '0'], ['rp_wip_plan', '5', '0', '0'],
    ['rp_wip_plan', '-1', '0', '0'], ['rp_wip_plan', '-1', '2', '1'], ['rp_wip_plan', '2', '1', '0'], ['rp_wip_plan', '2', '1', '1'],
    ['rp_wip_plan', '2', '0', '1'], ['rp_wip_plan', '1', '0', '2'],
    // マージ・cherry-pick・revert・rebase の途中（4 つ目）: 汚れがあれば in-progress（unmerged が先、入れ子より先）。汚れ無し・確認不能はそちらが先
    ['rp_wip_plan', '2', '0', '0', '1'], ['rp_wip_plan', '2', '1', '0', '1'], ['rp_wip_plan', '2', '0', '1', '1'], ['rp_wip_plan', '0', '0', '0', '1'],
    ['rp_wip_plan', '-1', '0', '0', '1'], ['rp_wip_plan', '2', '0', '0', '0'],
  ],
  (g, _r, i) => assert.equal(g.out, ['none', 'none', 'commit', 'commit', 'unverified', 'unverified', 'unmerged', 'unmerged', 'nested-repo', 'nested-repo', 'in-progress', 'unmerged', 'in-progress', 'none', 'unverified', 'commit'][i], String(i)),
)

check(
  'rp_wip_after: 退避完了はコミットの成功かつコミット後の観測が空のときだけ（フックの拒否・書き換え・submodule の変更・観測不能は完了にしない）',
  [
    ['rp_wip_after', '0', '0', '0'],
    ['rp_wip_after', '1', '0', '0'], ['rp_wip_after', '128', '2', '0'], ['rp_wip_after', '1', '-1', '0'], ['rp_wip_after', '1', '0', '1'],
    ['rp_wip_after', '0', '-1', '0'],
    ['rp_wip_after', '0', '2', '1'], ['rp_wip_after', '0', '2', '2'],
    ['rp_wip_after', '0', '1', '0'], ['rp_wip_after', '0', '4', '0'],
    // commit が失敗しても、残る汚れが全部 submodule 由来ならコミットできるものが無かっただけ（submodule）。フックの拒否で staged が残るなら commit-failed
    ['rp_wip_after', '1', '2', '2'], ['rp_wip_after', '1', '3', '2'], ['rp_wip_after', '128', '1', '1'],
    // コミットの実体（4 つ目）: 成功の終了コードでも made 以外（HEAD が進まない・差分が空・確認不能）は汚れが無くても退避できていない
    ['rp_wip_after', '0', '0', '0', 'made'], ['rp_wip_after', '0', '0', '0', 'none'], ['rp_wip_after', '0', '0', '0', 'empty'], ['rp_wip_after', '0', '0', '0', 'unknown'],
    ['rp_wip_after', '0', '1', '0', 'none'], ['rp_wip_after', '0', '-1', '0', 'empty'], ['rp_wip_after', '0', '-1', '0', 'made'], ['rp_wip_after', '1', '0', '0', 'none'],
  ],
  (g, _r, i) => assert.equal(g.out, ['committed', 'commit-failed', 'commit-failed', 'commit-failed', 'commit-failed', 'unverified', 'submodule', 'submodule', 'residual-dirty', 'residual-dirty', 'submodule', 'commit-failed', 'submodule', 'committed', 'empty-commit', 'empty-commit', 'empty-commit', 'empty-commit', 'empty-commit', 'unverified', 'commit-failed'][i], String(i)),
)

const WIP_WORDS = ['none', 'skipped', 'committed', 'commit-failed', 'empty-commit', 'unmerged', 'in-progress', 'nested-repo', 'submodule', 'residual-dirty', 'unverified', '', 'bogus']
check(
  'rp_wip_ok: 取り残す未コミット変更が無い語（none・skipped・committed）だけが完了、それ以外は未知の語を含めて未完了',
  WIP_WORDS.map((w) => ['rp_wip_ok', w]),
  (g, r) => assert.equal(g.rc, ['none', 'skipped', 'committed'].includes(r[1]) ? 0 : 1, JSON.stringify(r[1])),
)

check(
  'rp_diff_state: base を取得できなかった・ブランチが無いときは差分が空とは言わない（unknown）。diff の終了コード 0 → empty、1 → nonempty、それ以外 → unknown',
  [
    ['rp_diff_state', '1', '1', '0'], ['rp_diff_state', '1', '1', '1'], ['rp_diff_state', '1', '1', '128'], ['rp_diff_state', '1', '1', '2'],
    ['rp_diff_state', '0', '1', '0'], ['rp_diff_state', '0', '1', '1'], ['rp_diff_state', '1', '0', '0'], ['rp_diff_state', '1', '0', '1'],
    ['rp_diff_state', '0', '0', '0'], ['rp_diff_state', '', '1', '0'], ['rp_diff_state', '1', '', '0'], ['rp_diff_state', '1', '1', ''],
  ],
  (g, _r, i) => assert.equal(g.out, ['empty', 'nonempty', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'][i], String(i)),
)

check(
  'rp_is_sha: 40 桁の小文字 16 進だけ',
  [
    ['rp_is_sha', 'a'.repeat(40)], ['rp_is_sha', '0123456789abcdef0123456789abcdef01234567'],
    ['rp_is_sha', ''], ['rp_is_sha', 'a'.repeat(39)], ['rp_is_sha', 'a'.repeat(41)], ['rp_is_sha', 'A'.repeat(40)], ['rp_is_sha', `${'a'.repeat(39)}g`], ['rp_is_sha', `${'a'.repeat(39)} `],
    ['rp_is_sha', 'refs/heads/main'],
  ],
  (g, _r, i) => assert.equal(g.rc, i < 2 ? 0 : 1, String(i)),
)
