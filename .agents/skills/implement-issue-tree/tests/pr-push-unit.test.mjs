// scripts/lib/pr-push-lib.sh（pr-push.sh の判定だけの純関数）を、表で単体検査する回帰テスト（Issue #603 第 4 弾）。
//
// pr-create の起点の決定（旧 prCreatePrompt 手順 0 の (i)〜(iv)）・既存 open PR の分類・gh pr create の出力からの PR 番号の取り出し・
// タイトルとパスの形式は、git・gh を呼ばない純関数に切り出してある。1 回の bash 起動で表の全ケースを source した関数へ渡し、
// 1 行ずつ結果を返させる（スクリプト全体を実 git で走らせるケースは tests/pr-push.test.mjs の代表に絞る）。
// 利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes } from './lib/signed-output.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'pr-push-lib.sh')
const US = '\u001f'
const A = 'a'.repeat(40)
const B = 'b'.repeat(40)
const NL = '@@' // 表の中の改行（ドライバが改行へ戻す）

// 各行 [関数名, 引数...]。出力は `<i> <rc> <PP_ORIGIN> <PP_PR_STATUS> <PP_PR_NUMBER>`（関数が何かを出力したら out に入る）
const DRIVER = `
set -u
LC_ALL=C
export LC_ALL
. "$1" || exit 9
US=$(printf '\\037')
i=0
while IFS="$US" read -r fn a b c d; do
  rc=0
  out=""
  PP_ORIGIN=""; PP_PR_STATUS=""; PP_PR_NUMBER=""; PP_HEAD=""; PP_MILESTONE=""
  case "$fn" in
    origin) out=$(pp_decide_origin "$a" "$b" "$c" "$d" 2>&1) || rc=$?; pp_decide_origin "$a" "$b" "$c" "$d" >/dev/null 2>&1; true ;;
    classify) rows=$(printf '%s' "$c" | sed 's/@@/\\
/g'); out=$(pp_classify_pr "$a" "$b" "$rows" 2>&1) || rc=$?; pp_classify_pr "$a" "$b" "$rows" >/dev/null 2>&1; true ;;
    number) out=$(pp_pr_number_from_output "$(printf '%s' "$a" | sed 's/@@/\\
/g')" 2>&1) || rc=$?; pp_pr_number_from_output "$(printf '%s' "$a" | sed 's/@@/\\
/g')" >/dev/null 2>&1; true ;;
    head) out=$(pp_head_status "$a" "$b" "$c" 2>&1) || rc=$?; pp_head_status "$a" "$b" "$c" >/dev/null 2>&1; true ;;
    milestone) out=$(pp_milestone_status "$a" "$b" "$c" 2>&1) || rc=$?; pp_milestone_status "$a" "$b" "$c" >/dev/null 2>&1; true ;;
    title) out=$(pp_valid_title "$a" 2>&1) || rc=$?; true ;;
    path) out=$(pp_valid_path "$a" 2>&1) || rc=$?; true ;;
    *) echo "unknown fn $fn" >&2; exit 8 ;;
  esac
  printf '%s %s [%s] [%s] [%s] [%s]\\n' "$i" "$rc" "$PP_ORIGIN$PP_HEAD$PP_MILESTONE" "$PP_PR_STATUS" "$PP_PR_NUMBER" "$out"
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
    const m = /^(\d+) (\d+) \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*)\]$/.exec(l)
    assert.ok(m && Number(m[1]) === i, l)
    return { rc: Number(m[2]), origin: m[3], status: m[4], number: m[5], out: m[6] }
  })
}

for (const bash of availableBashes()) {
  const tag = `[${bash}]`

  test(`${tag} pp_decide_origin: リモートに branch が無い・同一 sha・local ahead は続行、remote ahead・diverged・ローカル欠落・判定不能は中止する`, () => {
    // [remote, local, l_in_r, r_in_l, 期待 rc, 期待 origin]
    const cases = [
      ['', '', '-', '-', 0, 'local'], // 初回（リモートに無い）: ローカル起点
      ['', A, '-', '-', 0, 'local'],
      [A, A, '-', '-', 0, 'remote'], // 同一 sha: どちらでも同じコミット
      [A, B, 1, 0, 0, 'local'], // リモートがローカルの祖先（local ahead）: ローカル起点
      [A, B, 0, 1, 1, 'remote-ahead'], // ローカルがリモートの真の祖先（remote ahead）: 第三者の push と区別できないので中止
      [A, B, 0, 0, 1, 'remote-ahead'], // 両方 0 は同一 sha のはずだが、l_in_r を先に見て中止へ倒す
      [A, B, 1, 1, 1, 'diverged'],
      [A, '', '-', '-', 1, 'local-missing'], // リモートにあるのにローカルの refs/heads が無い
      [A, B, 2, 0, 1, 'error'], // 祖先判定が 0 / 1 以外（git の失敗）
      [A, B, 1, 128, 1, 'error'],
      [A, B, '-', '-', 1, 'error'],
    ]
    const res = table(bash, cases.map(([r, l, x, y]) => ['origin', r, l, String(x), String(y)]))
    cases.forEach(([r, l, x, y, rc, origin], i) => {
      assert.deepEqual({ rc: res[i].rc, origin: res[i].origin, out: res[i].out }, { rc, origin, out: '' }, JSON.stringify([r, l, x, y]))
    })
  })

  test(`${tag} pp_classify_pr: open PR なしは none、base と head が一致する 1 件だけ reuse、head が動いている・base が違う・複数・形式不正は先へ進まない`, () => {
    // [期待 base, リモート tip, 行, 期待 rc, 期待 status, 期待 number]
    const cases = [
      ['main', A, '', 0, 'none', ''],
      ['main', A, `12 main ${A}`, 0, 'reuse', '12'],
      ['main', A, `12 main ${B}`, 1, 'head-mismatch', '12'], // 他者・別ランの push で PR の head が動いている
      ['main', A, `12 develop ${A}`, 1, 'base-mismatch', ''], // base が違う PR は head が同じでも再利用しない
      ['main', A, `12 develop ${A}${NL}13 main ${A}`, 0, 'reuse', '13'], // 別 base の PR が混じっても同 base の一致を見る
      ['main', A, `12 main ${A}${NL}13 main ${A}`, 1, 'ambiguous', ''],
      ['main', A, `12 main`, 1, 'malformed', ''],
      ['main', A, `12 main ${A} extra`, 1, 'malformed', ''],
      ['main', A, `x main ${A}`, 1, 'malformed', ''],
      ['main', A, `012 main ${A}`, 1, 'malformed', ''],
      ['main', A, `12 ma$in ${A}`, 1, 'malformed', ''],
      ['main', A, `12 main ${'A'.repeat(40)}`, 1, 'malformed', ''], // 大文字の sha は受け付けない
      ['main', A, `12 main ${A.slice(1)}`, 1, 'malformed', ''],
      ['release/1.0', A, `7 release/1.0 ${A}`, 0, 'reuse', '7'],
      ['main', '', `12 main ${A}`, 1, 'head-mismatch', '12'], // リモート tip を渡せていない（空）なら一致扱いにしない
    ]
    const res = table(bash, cases.map(([base, remote, rows]) => ['classify', base, remote, rows]))
    cases.forEach(([base, remote, rows, rc, status, number], i) => {
      assert.deepEqual({ rc: res[i].rc, status: res[i].status, number: res[i].number, out: res[i].out }, { rc, status, number, out: '' }, JSON.stringify([base, remote, rows]))
    })
  })

  test(`${tag} pp_pr_number_from_output: 最後の非空行の /pull/<正の整数> から番号を取り出す。それ以外は失敗し、何も出力しない`, () => {
    const cases = [
      ['https://github.com/o/r/pull/77', 0, '77'],
      [`Creating pull request for x into main in o/r${NL}${NL}https://github.com/o/r/pull/5${NL}`, 0, '5'],
      ['https://github.com/o/r/pull/0', 1, ''],
      ['https://github.com/o/r/pull/012', 1, ''],
      ['https://github.com/o/r/pull/7x', 1, ''],
      ['https://github.com/o/r/issues/7', 1, ''],
      ['', 1, ''],
      [`https://github.com/o/r/pull/9${NL}warning: something`, 1, ''], // 最後の行が URL でない
      ['https://github.com/o/r/pull/1234567890', 1, ''], // 10 桁は拒否
    ]
    const res = table(bash, cases.map(([out]) => ['number', out]))
    cases.forEach(([out, rc, number], i) => {
      assert.deepEqual({ rc: res[i].rc, number: res[i].number, out: res[i].out }, { rc, number, out: '' }, JSON.stringify(out))
    })
  })

  test(`${tag} pp_valid_title / pp_valid_path: タイトルは 1〜256 文字・制御文字なし。パスは絶対・安全な文字種・.. なし`, () => {
    const titles = [['feat(x): 追加', 0], ['a', 0], ['x'.repeat(256), 0], ['', 1], ['x'.repeat(257), 1], ['a\tb', 1], ['a\u001bb', 1]]
    const paths = [['/tmp/x/pr-title.abc', 0], ['/var/folders/ab/c_d/T/tmp.Xy12', 0], ['/Users/me/My Files/tmp.Xy12', 0], ['rel/path', 1], ['', 1], ['/tmp/a\tb', 1], ['/tmp/../etc/passwd', 1], ['/tmp/a;b', 1], ['/tmp/a$b', 1], [`/${'a'.repeat(300)}`, 1]]
    const res = table(bash, [...titles.map(([t]) => ['title', t]), ...paths.map(([p]) => ['path', p])])
    const all = [...titles, ...paths]
    all.forEach(([v, rc], i) => assert.deepEqual({ rc: res[i].rc, out: res[i].out }, { rc, out: '' }, JSON.stringify(v)))
  })

  test(`${tag} pp_head_status: サーバー head が期待と一致するときだけ ok。取得失敗・形式不正は unknown、ブランチ無しは missing、不一致は mismatch`, () => {
    // [期待, ls-remote の終了コード, サーバー head, 期待 rc, 期待 status]
    const cases = [
      [A, 0, A, 0, 'ok'],
      [A, 0, B, 1, 'mismatch'], // push 後に第三者が積んだ（race）
      [A, 0, '', 1, 'missing'],
      [A, 1, '', 1, 'unknown'],
      [A, 1, A, 1, 'unknown'], // 取得失敗の rc なら sha が入っていても採らない
      [A, 0, 'A'.repeat(40), 1, 'unknown'], // 大文字・形式不正
      [A, 0, A.slice(1), 1, 'unknown'],
      ['', 0, A, 1, 'unknown'], // 期待が空（転記漏れ）なら一致扱いにしない
      ['zz', 0, 'zz', 1, 'unknown'],
    ]
    const res = table(bash, cases.map(([e, rc, r]) => ['head', e, String(rc), r]))
    cases.forEach(([e, lrc, r, rc, status], i) => {
      assert.deepEqual({ rc: res[i].rc, status: res[i].origin, out: res[i].out }, { rc, status, out: '' }, JSON.stringify([e, lrc, r]))
    })
  })

  test(`${tag} pp_milestone_status: 件数 0 は非運用（確認しない）、運用中は割当済み / 未割当、件数・Issue の取得失敗は fetch-failed（fail-closed）`, () => {
    // [件数, issue view の終了コード, タイトル, 期待 rc, 期待 status]
    const cases = [
      ['0', 0, '', 0, 'not-used'],
      ['0', 1, '', 0, 'not-used'], // 非運用なら Issue を見ない（rc は無視）
      ['1', 0, 'v1.0', 0, 'assigned'],
      ['12', 0, '', 0, 'unassigned'], // 未割当は警告つきで続行
      ['2', 1, '', 1, 'fetch-failed'], // Issue の取得失敗
      ['2', 1, 'v1.0', 1, 'fetch-failed'],
      ['', 0, '', 1, 'fetch-failed'], // 件数の取得失敗を非運用と読み替えない
      ['abc', 0, 'v1.0', 1, 'fetch-failed'],
      ['-1', 0, 'v1.0', 1, 'fetch-failed'],
      ['1.5', 0, 'v1.0', 1, 'fetch-failed'],
    ]
    const res = table(bash, cases.map(([c, rc, t]) => ['milestone', c, String(rc), t]))
    cases.forEach(([c, vrc, t, rc, status], i) => {
      assert.deepEqual({ rc: res[i].rc, status: res[i].origin, out: res[i].out }, { rc, status, out: '' }, JSON.stringify([c, vrc, t]))
    })
  })
}
