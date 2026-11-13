// scripts/lib/reply-resolve-lib.sh（reply-resolve.sh の入力検証・返信本文・処置の分類・結果 JSON）を表で単体検査する（Issue #759）。
// 判定は exit せず git / gh を呼ばない純関数なので、bash ごとに 1 回の起動で全ケースを渡す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes } from './lib/signed-output.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'reply-resolve-lib.sh')
const US = '\u001f'
const SHA = 'a'.repeat(40)
const MARKER = '<!-- implement-issue-tree:fix-reply -->'

const DRIVER = `
. "$1" || exit 9
US=$(printf '\\037')
while IFS="$US" read -r fn a b c d e f g; do
  rc=0
  case "$fn" in
    valid) out=$(rr_valid_thread_id "$a") || rc=$? ;;
    allow) out=$(rr_in_allow "$a" "$b") || rc=$? ;;
    body) out=$(rr_reply_body "$a" "$b" | base64 | tr -d '\\n') || rc=$? ;;
    prefix) out=$(rr_reply_prefix "$a" | base64 | tr -d '\\n') || rc=$? ;;
    classify) out=$(rr_classify "$a" "$b" "$c" "$d" "$e" "$f" "$g") || rc=$? ;;
    result) out=$(rr_result "$a" "$b" "$c" "$d" "$e" "$f") || rc=$? ;;
  esac
  printf '%s|%s\\n' "$rc" "$out"
done
`
function run(bash, rows) {
  const input = rows.map((r) => r.join(US)).join('\n') + '\n'
  const r = spawnSync(bash, ['-c', DRIVER, 'driver', LIB], { input, encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  const lines = r.stdout.split('\n').filter((l) => l !== '')
  assert.equal(lines.length, rows.length, r.stdout)
  return lines.map((l) => {
    const i = l.indexOf('|')
    return { rc: Number(l.slice(0, i)), out: l.slice(i + 1) }
  })
}

for (const bash of availableBashes()) {
  test(`reply-resolve-lib: 表の全ケース（${bash}）`, () => {
    const rows = []
    const expect = []
    const add = (row, rc, out) => {
      rows.push(row)
      expect.push([rc, out])
    }
    for (const [id, ok] of [['PRRT_abc-1', 0], ['', 1], ['a b', 1], ['a;b', 1], ['a$b', 1], ['x'.repeat(100), 0], ['x'.repeat(101), 1], ['a,b', 1], ['日本', 1]]) add(['valid', id], ok, '')
    for (const [id, list, ok] of [['A', 'A,B', 0], ['B', 'A,B', 0], ['C', 'A,B', 1], ['A', 'AA,B', 1], ['A', '', 1]]) add(['allow', id, list], ok, '')
    add(['classify', 'false', '5', '5', 'o/r', 'o/r', '0', '0'], 0, 'reply')
    add(['classify', 'false', '5', '5', 'o/r', 'o/r', '2', '0'], 0, 'resolve-only')
    add(['classify', 'true', '5', '5', 'o/r', 'o/r', '0', '0'], 0, 'skip')
    add(['classify', 'false', '6', '5', 'o/r', 'o/r', '0', '0'], 0, 'skip')
    add(['classify', 'false', '5', '5', 'x/y', 'o/r', '0', '0'], 0, 'skip')
    add(['classify', 'maybe', '5', '5', 'o/r', 'o/r', '0', '0'], 0, 'invalid')
    add(['classify', 'false', 'null', '5', 'o/r', 'o/r', '0', '0'], 0, 'invalid')
    add(['classify', 'false', '5', '5', 'o/r', 'o/r', '', '0'], 0, 'invalid')
    add(['classify', 'false', '5', '5', 'o/r', 'o/r', '0', '1'], 0, 'pending-review')
    add(['classify', 'false', '5', '5', 'o/r', 'o/r', '2', '1'], 0, 'pending-review')
    add(['classify', 'true', '5', '5', 'o/r', 'o/r', '0', '1'], 0, 'skip')
    add(['classify', 'false', '6', '5', 'o/r', 'o/r', '0', '1'], 0, 'skip')
    add(['classify', 'false', '5', '5', 'o/r', 'o/r', '0', 'x'], 0, 'invalid')
    add(['classify', 'false', '5', '5', 'o/r', 'o/r', '0', ''], 0, 'invalid')
    add(['result', 'done', SHA, 'A B', '', 'C', 'D'], 0, `REPLY_RESOLVE_RESULT {"status":"done","sha":"${SHA}","resolved":["A","B"],"replyFailed":[],"resolveFailed":["C"],"skipped":["D"]}`)
    add(['result', 'head-mismatch', '', '', '', '', ''], 0, 'REPLY_RESOLVE_RESULT {"status":"head-mismatch","sha":"","resolved":[],"replyFailed":[],"resolveFailed":[],"skipped":[]}')
    const res = run(bash, rows)
    res.forEach((r, i) => {
      const [rc, out] = expect[i]
      assert.equal(r.rc, rc, JSON.stringify(rows[i]))
      if (rows[i][0] === 'valid' || rows[i][0] === 'allow') return
      assert.equal(r.out, out, JSON.stringify(rows[i]))
    })
  })

  test(`reply-resolve-lib: 返信本文は目印・sha・ブランチ名だけの定型（${bash}）`, () => {
    const [body, prefix] = run(bash, [['body', SHA, 'fix/759-x'], ['prefix', SHA]])
    const dec = (r) => Buffer.from(r.out, 'base64').toString('utf8')
    assert.equal(dec(body), `${MARKER}\n${SHA} で対応した（ブランチ fix/759-x）`)
    assert.equal(dec(prefix), `${MARKER}\n${SHA} `)
    assert.ok(dec(body).startsWith(dec(prefix)))
  })
}
