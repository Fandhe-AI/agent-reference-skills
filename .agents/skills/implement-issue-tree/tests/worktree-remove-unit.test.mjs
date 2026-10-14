// scripts/lib/worktree-remove-lib.sh（worktree-remove.sh の判断と入力検証だけの純関数）を、表で単体検査する回帰テスト（Issue #603 第 7 弾）。
//
// 削除してよいかの判断（モードと観測 → 削除・強制削除・保持）、lock の扱い、git の出力の読み取り、入力の形式検証は、git を呼ばない純関数に
// 切り出してある。1 回の bash 起動で表の全ケースを source した関数へ渡し、1 行ずつ結果を返させる（実 git で全体を走らせる検査は
// tests/worktree-remove.test.mjs）。利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes } from './lib/signed-output.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'worktree-remove-lib.sh')
const US = '\u001f'
const NL = '@@' // 表の中の改行（ドライバが改行へ戻す）

// 各行 [関数名, 引数...]。出力は `<i> <rc> [<標準出力>] [WR_ 変数のまとめ]`
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
US=$(printf '\\037')
nl() { printf '%s' "$1" | sed 's/@@/\\
/g'; }
i=0
while IFS="$US" read -r fn a b c d; do
  rc=0
  out=""
  WR_DIRTY=0; WR_SUB_DIRTY=0; WR_REGISTERED=0; WR_MAIN=0; WR_LOCKED=0; WR_LOCK_REASON=""; WR_LOCK_PID=""; WR_LOCK_START=""
  case "$fn" in
    wr_count_status) wr_count_status "$(nl "$a")" ;;
    wr_find_entry) wr_find_entry "$(nl "$a")" "$b" ;;
    wr_lock_pid) out=$(wr_lock_pid "$a" 2>&1) || rc=$?; wr_lock_pid "$a" || true ;;
    *) out=$("$fn" "$a" "$b" "$c" "$d" 2>&1) || rc=$? ;;
  esac
  printf '%s %s [%s] [%s,%s,%s,%s,%s,%s,%s;%s]\\n' "$i" "$rc" "$out" "$WR_DIRTY" "$WR_SUB_DIRTY" "$WR_REGISTERED" "$WR_MAIN" "$WR_LOCKED" "$WR_LOCK_REASON" "$WR_LOCK_PID" "$WR_LOCK_START"
  i=$((i + 1))
done
`

function table(bash, rows) {
  const input = rows.map((r) => r.join(US)).join('\n') + '\n'
  const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIB], { input, encoding: 'utf8' })
  assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
  const lines = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(lines.length, rows.length, `行数が合わない:\n${r.stdout}`)
  return lines.map((l, i) => {
    const m = /^(\d+) (\d+) \[(.*?)\] \[(.*)\]$/.exec(l)
    assert.ok(m && Number(m[1]) === i, l)
    const [head, start] = m[4].split(';')
    const [dirty, sub, reg, main, locked, reason, pid] = head.split(',')
    return { rc: Number(m[2]), out: m[3], dirty: Number(dirty), sub: Number(sub), reg: Number(reg), main: Number(main), locked: Number(locked), reason, pid, start }
  })
}

const OK = 0
const NG = 1

function check(name, rows, expect) {
  for (const bash of availableBashes()) {
    test(`${name} [${bash}]`, () => {
      const got = table(bash, rows)
      rows.forEach((r, i) => expect(got[i], r, i))
    })
  }
}

check(
  'wr_valid_path: 絶対パス・先頭は英数字・使える文字は英数字と . _ / - 空白・.. を含まない（ホストの sanitizeWorktreePath と同じ）',
  [
    ['wr_valid_path', '/tmp/wt-1'], ['wr_valid_path', '/a'], ['wr_valid_path', '/Users/x/my repo/.claude/worktrees/agent-ab12'],
    ['wr_valid_path', ''], ['wr_valid_path', 'relative/p'], ['wr_valid_path', '/'], ['wr_valid_path', '/.hidden'], ['wr_valid_path', '/-x'],
    ['wr_valid_path', '/a/../b'], ['wr_valid_path', '/a..b'], ['wr_valid_path', "/a'b"], ['wr_valid_path', '/a"b'], ['wr_valid_path', '/a;b'],
    ['wr_valid_path', '/a$b'], ['wr_valid_path', '/a`b'], ['wr_valid_path', '/a|b'], ['wr_valid_path', '/a&b'], ['wr_valid_path', '/a\\b'],
    ['wr_valid_path', '/a*b'], ['wr_valid_path', '/a(b)'], ['wr_valid_path', '/a日本'], ['wr_valid_path', '/a\tb'],
  ],
  (g, r) => {
    const good = new Set(['/tmp/wt-1', '/a', '/Users/x/my repo/.claude/worktrees/agent-ab12'])
    assert.equal(g.rc, good.has(r[1]) ? OK : NG, JSON.stringify(r[1]))
  },
)

check(
  'wr_valid_branch: ホストの isValidBranchName の文字種に、git が拒否する形を加えて狭める',
  [
    ['wr_valid_branch', 'feat/603-x'], ['wr_valid_branch', 'main'], ['wr_valid_branch', 'release/1.0'], ['wr_valid_branch', 'a_b-c.d'],
    ['wr_valid_branch', ''], ['wr_valid_branch', '-D'], ['wr_valid_branch', '--delete'], ['wr_valid_branch', '/x'], ['wr_valid_branch', 'a..b'],
    ['wr_valid_branch', 'a//b'], ['wr_valid_branch', 'a/'], ['wr_valid_branch', 'a.lock'], ['wr_valid_branch', 'a.lock/b'], ['wr_valid_branch', 'a/.b'],
    ['wr_valid_branch', 'a@{1}'], ['wr_valid_branch', 'a b'], ['wr_valid_branch', 'a;b'], ['wr_valid_branch', 'a$b'], ['wr_valid_branch', "a'b"], ['wr_valid_branch', 'a:b'],
    ['wr_valid_branch', 'a*b'], ['wr_valid_branch', 'a^b'], ['wr_valid_branch', 'a~b'], ['wr_valid_branch', 'a?b'], ['wr_valid_branch', 'a[b'], ['wr_valid_branch', 'a\\b'],
  ],
  (g, r) => {
    const good = new Set(['feat/603-x', 'main', 'release/1.0', 'a_b-c.d'])
    assert.equal(g.rc, good.has(r[1]) ? OK : NG, JSON.stringify(r[1]))
  },
)

check(
  'wr_valid_file: _/issue-trees/<正の整数>.json だけ',
  [
    ['wr_valid_file', '_/issue-trees/1.json'], ['wr_valid_file', '_/issue-trees/603.json'],
    ['wr_valid_file', ''], ['wr_valid_file', '_/issue-trees/0.json'], ['wr_valid_file', '_/issue-trees/01.json'], ['wr_valid_file', '_/issue-trees/a.json'],
    ['wr_valid_file', '_/issue-trees/.json'], ['wr_valid_file', '_/issue-trees/1.json.bak'], ['wr_valid_file', '/_/issue-trees/1.json'],
    ['wr_valid_file', '_/issue-trees/../x/1.json'], ['wr_valid_file', '_/issue-trees/1/2.json'], ['wr_valid_file', 'x/issue-trees/1.json'],
  ],
  (g, r) => assert.equal(g.rc, r[1] === '_/issue-trees/1.json' || r[1] === '_/issue-trees/603.json' ? OK : NG, JSON.stringify(r[1])),
)

// Claude Code の実物: `claude agent agent-aa14453c88416c114 (pid 72544 start Mon Oct 12 02:48:39 2026)`（照合は
// /^claude (?:agent|session) .{1,255} \(pid (\d{1,10})(?: start (.{1,255}))?\)$/）。pid はセッション（メインの claude プロセス）の pid
const START = 'Mon Oct 12 02:48:39 2026'
const LOCK_ROWS = [
  // [理由, 期待する pid（null = 形が違う）, 期待する start]
  ['claude agent agent-abc123 (pid 4242)', '4242', ''],
  ['claude agent a (pid 1)', '1', ''],
  ['claude agent two words (pid 9)', '9', ''],
  [`claude agent agent-aa14453c88416c114 (pid 72544 start ${START})`, '72544', START],
  ['claude agent agent-x (pid 5 start Mon Oct  5 02:48:39 2026)', '5', 'Mon Oct  5 02:48:39 2026'],
  ['claude session sess-1 (pid 77)', '77', ''],
  [`claude session sess-1 (pid 78 start ${START})`, '78', START],
  ['claude agent agent-abc (pid 1234567890)', '1234567890', ''],
  ['claude agent name (pid x) (pid 12)', '12', ''],
  ['', null], ['manual lock', null], ['claude agent agent-abc', null], ['claude agent agent-abc (pid )', null],
  ['claude agent agent-abc (pid x1)', null], ['claude agent agent-abc (pid 12x)', null], ['claude agent  (pid 1)', null],
  ['claude agent agent-abc (pid 12345678901)', null], ['Claude agent agent-abc (pid 1)', null], ['claude agent agent-abc (pid 1) extra', null],
  ['xclaude agent agent-abc (pid 1)', null], ['claude agent agent-abc (pid -1)', null],
  ['claude other agent-abc (pid 1)', null], ['claude agent agent-abc (pid 1 start )', null], ['claude agent agent-abc (pid 1 start)', null],
  ['claude agent agent-abc (pid 1 begin x)', null], ['claude agent agent-abc (pid 1 start x) y', null], ['claude agent agent-abc (pid 1 extra start x)', null],
  [`claude agent ${'n'.repeat(256)} (pid 1)`, null], [`claude agent agent-abc (pid 1 start ${'s'.repeat(256)})`, null],
  [`claude agent ${'n'.repeat(255)} (pid 1)`, '1', ''],
]
check(
  'wr_lock_pid: `claude agent|session <名前> (pid <N>[ start <lstart>])` の形だけ pid と start を取り出す（Claude Code の照合と同じ形）',
  LOCK_ROWS.map((r) => ['wr_lock_pid', r[0]]),
  (g, r, i) => {
    const [, pid, start] = LOCK_ROWS[i]
    assert.deepEqual([g.rc, g.pid, g.start], pid === null ? [NG, '', ''] : [OK, pid, start], r[1])
  },
)

// wr_start_matches OBSERVED RECORDED
check(
  'wr_start_matches: 空白の連なり・両端の空白を畳んで比べる。観測が空・違う値は不一致',
  [
    ['wr_start_matches', START, START], ['wr_start_matches', 'Mon Oct  5 02:48:39 2026', 'Mon Oct 5 02:48:39 2026'],
    ['wr_start_matches', ' Mon Oct 12 02:48:39 2026 ', START], ['wr_start_matches', 'Mon Oct 12 02:48:39 2026', 'Mon Oct 12 02:48:40 2026'],
    ['wr_start_matches', '', START], ['wr_start_matches', '', ''], ['wr_start_matches', START, ''], ['wr_start_matches', 'Mon Oct 12 02:48:39 2025', START],
  ],
  (g, r, i) => assert.equal(g.rc, [OK, OK, OK, NG, NG, NG, NG, NG][i], JSON.stringify(r)),
)

check(
  'wr_lock_action: lock なし → none / Claude Code の形で pid が死んでいる（start つきは pid の再利用を含む）→ unlock / それ以外（生きている・形が違う・観測不能）→ retain',
  [
    ['wr_lock_action', '0', '', '1'], ['wr_lock_action', '0', '123', '0'],
    ['wr_lock_action', '1', '123', '0'], ['wr_lock_action', '1', '123', '1'], ['wr_lock_action', '1', '', '0'], ['wr_lock_action', '1', '', '1'],
    ['wr_lock_action', '1', '123', ''], ['wr_lock_action', '', '123', '0'], ['wr_lock_action', '2', '123', '0'],
  ],
  (g, r, i) => assert.equal(g.out, ['none', 'none', 'unlock', 'retain', 'retain', 'retain', 'retain', 'retain', 'retain'][i], JSON.stringify(r)),
)

check(
  'wr_kill_class: 成功 → ok / No such process → esrch / Operation not permitted → eperm / それ以外のメッセージ・空 → other',
  [
    ['wr_kill_class', '0', ''], ['wr_kill_class', '1', 'bash: kill: (123) - No such process'], ['wr_kill_class', '1', 'bash: kill: (1) - Operation not permitted'],
    ['wr_kill_class', '1', ''], ['wr_kill_class', '1', 'bash: kill: (x) - arguments must be process or job IDs'], ['wr_kill_class', '2', 'kill: Nicht gefunden'],
    ['wr_kill_class', '0', 'No such process'],
  ],
  (g, r, i) => assert.equal(g.out, ['ok', 'esrch', 'eperm', 'other', 'other', 'other', 'ok'][i], JSON.stringify(r)),
)

check(
  'wr_ps_class: 出力あり → found / 自己確認が通り終了コード 1・出力空 → absent / 自己確認が空・終了コードが 1 以外（失敗・127）・出力ありで非 0 → unusable',
  [
    ['wr_ps_class', '99', '0', '123'], ['wr_ps_class', '99', '1', ''], ['wr_ps_class', '', '1', ''], ['wr_ps_class', '99', '127', ''], ['wr_ps_class', '99', '2', ''],
    ['wr_ps_class', '99', '0', ''], ['wr_ps_class', '99', '1', '123'], ['wr_ps_class', '', '0', ''], ['wr_ps_class', '', '0', '123'],
  ],
  (g, r, i) => assert.equal(g.out, ['found', 'absent', 'unusable', 'unusable', 'unusable', 'unusable', 'unusable', 'unusable', 'found'][i], JSON.stringify(r)),
)

// wr_pid_state KILL PS PROC: 存在すると言う観測が 1 つでもあれば alive、肯定的に「無い」と言う観測だけ（存在と言う観測なし）で dead、それ以外は unknown
const PID_STATE_ROWS = [
  ['ok', 'found', 'present', 'alive'], ['ok', 'unusable', 'unavailable', 'alive'], ['eperm', 'unusable', 'unavailable', 'alive'], ['eperm', 'absent', 'absent', 'alive'],
  ['other', 'found', 'unavailable', 'alive'], ['other', 'unusable', 'present', 'alive'],
  ['esrch', 'unusable', 'unavailable', 'dead'], ['esrch', 'absent', 'absent', 'dead'], ['esrch', 'absent', 'unavailable', 'dead'],
  ['other', 'absent', 'unavailable', 'dead'], ['other', 'unusable', 'absent', 'dead'], ['other', 'absent', 'absent', 'dead'],
  ['esrch', 'found', 'absent', 'alive'], ['esrch', 'absent', 'present', 'alive'], ['esrch', 'unusable', 'present', 'alive'],
  ['other', 'unusable', 'unavailable', 'unknown'], ['other', 'unusable', 'unavailable', 'unknown'], ['', '', '', 'unknown'], ['bogus', 'bogus', 'bogus', 'unknown'],
  ['other', 'unusable', 'bogus', 'unknown'], ['OK', 'FOUND', 'PRESENT', 'unknown'],
]
check(
  'wr_pid_state: 生存の観測が 1 つでもあれば alive / 生存の観測が無く肯定的な「存在しない」があるときだけ dead / EPERM・ps 不在・失敗・/proc 不在・未知の語は unknown（保持）',
  PID_STATE_ROWS.map((r) => ['wr_pid_state', r[0], r[1], r[2]]),
  (g, r, i) => assert.equal(g.out, PID_STATE_ROWS[i][3], JSON.stringify(r)),
)

// wr_plan MODE DIRTY SUB_DIRTY SUB_INIT
check(
  'wr_plan: superseded は汚れていても force（submodule の未記録の変更・確認不能は保持）、discard は汚れ・初期化済み submodule で保持し --force を使わない',
  [
    ['wr_plan', 'superseded', '0', '0', '0'], ['wr_plan', 'superseded', '5', '0', '0'], ['wr_plan', 'superseded', '5', '1', '0'], ['wr_plan', 'superseded', '1', '1', '2'],
    ['wr_plan', 'superseded', '0', '0', '3'], ['wr_plan', 'superseded', '-1', '0', '0'],
    ['wr_plan', 'discard', '0', '0', '0'], ['wr_plan', 'discard', '1', '0', '0'], ['wr_plan', 'discard', '0', '0', '1'], ['wr_plan', 'discard', '2', '1', '1'],
    ['wr_plan', 'discard', '-1', '0', '0'], ['wr_plan', 'bogus', '0', '0', '0'], ['wr_plan', '', '0', '0', '0'],
  ],
  (g, r, i) => assert.equal(g.out, ['force', 'force', 'retain-submodule', 'retain-submodule', 'force', 'retain-dirty', 'plain', 'retain-dirty', 'retain-submodule', 'retain-dirty', 'retain-dirty', 'retain-dirty', 'retain-dirty'][i], JSON.stringify(r)),
)

// wr_count_status TEXT（v2 形式。@@ が改行）→ WR_DIRTY, WR_SUB_DIRTY
const SUB_LINE = '1 .M S.M. 160000 160000 160000 aaaaaaaa bbbbbbbb sm'
check(
  'wr_count_status: v2 の行数を汚れとして数え、第 3 フィールドが S で始まる行を submodule 由来として数える',
  [
    ['wr_count_status', ''],
    ['wr_count_status', '1 .M N... 100644 100644 100644 aaaa bbbb a.txt'],
    ['wr_count_status', `1 .M N... 100644 100644 100644 aaaa bbbb a.txt${NL}? u.txt${NL}? deep/x`],
    ['wr_count_status', SUB_LINE],
    ['wr_count_status', `${SUB_LINE}${NL}1 A. N... 000000 100644 100644 0000 cccc c.txt`],
    ['wr_count_status', '2 R. N... 100644 100644 100644 aaaa bbbb R100 new.txt\told.txt'],
    ['wr_count_status', 'u UU N... 100644 100644 100644 100644 aaaa bbbb cccc a.txt'],
    ['wr_count_status', 'u UU S.M. 160000 160000 160000 160000 aaaa bbbb cccc sm'],
    ['wr_count_status', `# branch.oid abc${NL}1 .M N... 100644 100644 100644 aaaa bbbb a.txt`],
    ['wr_count_status', `${NL}${NL}? x${NL}`],
    ['wr_count_status', '? S-looks-like-submodule.txt'],
  ],
  (g, r, i) => assert.deepEqual([g.dirty, g.sub], [[0, 0], [1, 0], [3, 0], [1, 1], [2, 1], [1, 0], [1, 0], [1, 1], [1, 0], [1, 0], [1, 0]][i], JSON.stringify(r)),
)

const LIST = (...entries) => entries.join(`${NL}${NL}`)
const MAIN = `worktree /r/main${NL}HEAD aaaa${NL}branch refs/heads/main`
const W1 = `worktree /r/w1${NL}HEAD bbbb${NL}branch refs/heads/b1`
const W2L = `worktree /r/w2${NL}HEAD cccc${NL}branch refs/heads/b2${NL}locked claude agent agent-x (pid 77)`
const W3L = `worktree /r/w3${NL}HEAD dddd${NL}branch refs/heads/b3${NL}locked`
const W4 = `worktree /r/w 4${NL}HEAD eeee${NL}detached`
// wr_find_entry LIST TARGET → [dirty,sub,reg,main,locked,reason,pid] の reg, main, locked, reason
check(
  'wr_find_entry: 登録の有無・先頭エントリ（メイン）・lock の有無と理由（lock は対象のエントリのものだけ）',
  [
    ['wr_find_entry', LIST(MAIN, W1, W2L), '/r/main'],
    ['wr_find_entry', LIST(MAIN, W1, W2L), '/r/w1'],
    ['wr_find_entry', LIST(MAIN, W1, W2L), '/r/w2'],
    ['wr_find_entry', LIST(MAIN, W1, W2L), '/r/w3'],
    ['wr_find_entry', LIST(MAIN, W1, W3L), '/r/w3'],
    ['wr_find_entry', LIST(MAIN, W1, W3L), '/r/w1'],
    ['wr_find_entry', LIST(MAIN, W4, W1), '/r/w 4'],
    ['wr_find_entry', '', '/r/w1'],
    ['wr_find_entry', LIST(MAIN, W1), '/r/w1/'],
    ['wr_find_entry', LIST(MAIN, W1), '/r'],
    ['wr_find_entry', LIST(MAIN, W1), '/r/main/sub'],
    ['wr_find_entry', LIST(W2L, MAIN), '/r/main'],
  ],
  (g, r, i) => {
    const exp = [
      [1, 1, 0, ''], [1, 0, 0, ''], [1, 0, 1, 'claude agent agent-x (pid 77)'], [0, 0, 0, ''], [1, 0, 1, ''], [1, 0, 0, ''], [1, 0, 0, ''],
      [0, 0, 0, ''], [0, 0, 0, ''], [0, 0, 0, ''], [0, 0, 0, ''], [1, 0, 0, ''],
    ][i]
    assert.deepEqual([g.reg, g.main, g.locked, g.reason], exp, `${i}: ${JSON.stringify(r.slice(1))}`)
  },
)

// wr_branch_action BRANCH BASE GONE EXISTS
check(
  'wr_branch_action: 指定なし → none / base と同名 → keep-base / worktree が残っている → keep / 実在しない → absent / それ以外 → delete',
  [
    ['wr_branch_action', '', 'main', '1', '1'], ['wr_branch_action', 'main', 'main', '1', '1'], ['wr_branch_action', 'feat/x', 'main', '0', '1'],
    ['wr_branch_action', 'feat/x', 'main', '1', '0'], ['wr_branch_action', 'feat/x', 'main', '1', '1'], ['wr_branch_action', 'feat/x', '', '1', '1'],
    ['wr_branch_action', 'main', 'main', '0', '0'], ['wr_branch_action', 'feat/x', 'main', '', '1'], ['wr_branch_action', 'feat/x', 'main', '1', ''],
  ],
  (g, r, i) => assert.equal(g.out, ['none', 'keep-base', 'keep', 'absent', 'delete', 'delete', 'keep-base', 'keep', 'absent'][i], JSON.stringify(r)),
)

const WT = ['removed', 'not-registered', 'skipped', 'main', 'cwd', 'retained-dirty', 'retained-submodule', 'retained-locked', 'retained-branch-mismatch', 'failed']
const BR = ['none', 'deleted', 'absent', 'keep-base', 'keep', 'failed']
check(
  'wr_ok / wr_retained / wr_wt_gone: superseded は worktree が残っても非致命（main・cwd だけ異常）、discard は worktree が無くなりブランチも無い・消えたときだけ ok',
  [
    ...WT.map((w) => ['wr_ok', 'superseded', w, 'none']),
    ...WT.flatMap((w) => BR.map((b) => ['wr_ok', 'discard', w, b])),
    ['wr_ok', 'bogus', 'removed', 'none'],
    ...WT.map((w) => ['wr_retained', w]),
    ...WT.map((w) => ['wr_wt_gone', w]),
  ],
  (g, r, i) => {
    let exp
    if (r[0] === 'wr_ok' && r[1] === 'superseded') exp = r[2] !== 'main' && r[2] !== 'cwd'
    else if (r[0] === 'wr_ok' && r[1] === 'discard') exp = ['removed', 'not-registered', 'skipped'].includes(r[2]) && ['none', 'deleted', 'absent', 'keep-base'].includes(r[3])
    else if (r[0] === 'wr_ok') exp = false
    else if (r[0] === 'wr_retained') exp = !['removed', 'not-registered', 'skipped'].includes(r[1])
    else exp = ['removed', 'not-registered', 'skipped'].includes(r[1])
    assert.equal(g.rc, exp ? OK : NG, `${i}: ${JSON.stringify(r)}`)
  },
)

// wr_retain_list は形の検査（worktree-remove.sh の jq -s -e）を通った後の防御の二重化: 想定外の型は黙って 0 件にせず非 0 終了する
test('wr_retain_list: 保持対象を 1 行 1 パスで返し、値がオブジェクトでない項目・文字列でない worktree は非 0 終了（0 件にしない）', () => {
  const dir = mkdtempSync(join(tmpdir(), 'wr-retain-'))
  try {
    const cases = [
      ['{"items":{}}', 0, ''],
      ['{"items":{"1":{"status":"failed","worktree":"/a"},"2":{"status":"merged","worktree":"/b"},"3":{"status":"blocked"},"4":{"status":"monitoring","worktree":""},"5":{"status":"monitoring","worktree":"/c"}}}', 0, '/a\n/c\n'],
      ['{"items":{"1":5}}', 5, ''],
      ['{"items":{"1":null}}', 5, ''],
      ['{"items":{"1":"x"}}', 5, ''],
      ['{"items":{"1":{"status":"failed","worktree":3}}}', 5, ''],
      ['{"items":{"1":{"status":"failed","worktree":null}}}', 5, ''],
      ['{"items":{"1":{"status":"merged","worktree":3}}}', 0, ''],
    ]
    for (const bash of availableBashes()) {
      cases.forEach(([json, rc, out], i) => {
        const f = join(dir, `s${i}.json`)
        writeFileSync(f, json)
        const r = spawnSync(bash, ['-c', '. "$1" && wr_retain_list "$2"', '_', LIB, f], { encoding: 'utf8' })
        assert.equal(r.stdout, out, `${bash} ${json}`)
        assert.equal(r.status === 0, rc === 0, `${bash} ${json} rc=${r.status}`)
      })
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
