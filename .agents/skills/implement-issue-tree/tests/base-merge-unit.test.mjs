// scripts/lib/base-merge-lib.sh（base-merge.sh の入力検証と remote URL の照合）を、表で単体検査する回帰テスト（Issue #603）。
//
// 旧テストは URL の形・引数の形のケースごとに git サンドボックスを作り、スクリプト全体を実行していた（1 ケース約 1 秒。表だけで
// 1 bash あたり約 40 秒）。判定は lib の純関数（is_uint・valid_repo・lower・url_allowed。exit せず git を呼ばない）なので、
// 1 回の bash 起動で表の全ケースを source した関数へ渡し、1 行ずつ結果を返させる。ここで見るのは『どの入力を受理／拒否するか』と
// 『判定関数が何も出力しない（URL・トークンを出さない）』ことで、判定がスクリプト全体の流れ（routingError で fetch・merge・push
// を呼ばない・push まで進む）に結びついていることは、実 git で走らせる tests/base-merge.test.mjs が URL の形ごとの代表で確かめる。
//
// 利用できる bash（macOS の 3.2 と Homebrew の 5 など）をすべて回す。lib は bash 3.2 でも動く構文だけを使う契約で、
// ${var%%…}・case のパターン・local・文字クラスの否定の解釈は bash の版で差が出得る箇所なので、表は両方の bash で回す。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { availableBashes } from './lib/signed-output.mjs'
import { REPO } from './lib/git-sandbox.mjs'

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'lib', 'base-merge-lib.sh')
const BASHES = availableBashes()
const WANT = REPO.toLowerCase() // スクリプトは小文字化した期待 owner/repo を渡す
const TOKEN = 'ghp_SECRETTOKEN0123456789abcdef'
const US = '\u001f' // 行内の区切り（IFS の空白でないので、空の項目が潰れない）

// 1 回の bash 起動で rows 全部を判定する。各行は [関数名, 引数...]。戻り値は行ごとの { rc, out }（out は stdout + stderr）。
// lib の関数は何も出力しない契約なので、呼び出しを $(…) で包んで出力の長さも返させる
const DRIVER = `
set -u
. "$1" || exit 9
US=$(printf '\\037')
i=0
while IFS="$US" read -r fn a b; do
  rc=0
  out=""
  case "$fn" in
    is_uint) out=$(is_uint "$a" 2>&1) || rc=$? ;;
    valid_repo) out=$(valid_repo "$a" 2>&1) || rc=$? ;;
    url_allowed) out=$(url_allowed "$a" "$b" 2>&1) || rc=$? ;;
    lower) out=$(lower "$a" 2>&1) || rc=$? ;;
    *) echo "unknown fn $fn" >&2; exit 8 ;;
  esac
  printf '%s %s %s\\n' "$i" "$rc" "$out"
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
    const m = /^(\d+) (\d+) ?(.*)$/.exec(l)
    assert.ok(m && Number(m[1]) === i, l)
    return { rc: Number(m[2]), out: m[3] }
  })
}
// expect: 0 = 受理、1 = 拒否
function check(bash, fn, cases, extra = () => []) {
  const res = table(bash, cases.map(([input, expect]) => [fn, input, ...extra(input)]))
  const bad = []
  cases.forEach(([input, expect], i) => {
    if (res[i].rc !== expect) bad.push(`${JSON.stringify(input)}: 期待 ${expect} / 実際 ${res[i].rc}`)
    if (fn !== 'lower' && res[i].out !== '') bad.push(`${JSON.stringify(input)}: 判定関数が出力した（URL・値を出さない契約）`)
  })
  assert.deepEqual(bad, [])
}

// 受理する URL（許可ホストの期待 owner/repo。形式の違い・大文字小文字・.git の有無・標準ポート・userinfo）
const ACCEPT = [
  `git@github.com:${REPO}.git`, `ssh://git@github.com/${REPO}`, `https://github.com/${REPO}`,
  `https://GitHub.com/${REPO.toUpperCase()}.git`, `https://github.com/${REPO.toLowerCase()}.git/`,
  `https://x-access-token:${TOKEN}@github.com/${REPO}.git`, `https://${TOKEN}@github.com/${REPO}`, `https://github.com:443/${REPO}`,
  `https://u:p@GitHub.com:443/${REPO}.git/`, `ssh://git@github.com:22/${REPO}.git`,
  // トークンの @ をパーセントエンコード（%40）した userinfo は受理する（@ が 2 つ以上の拒否と区別される）
  `https://x-access-token:p%40ss${TOKEN}@github.com/${REPO}.git`,
]
// 拒否する URL
const REJECT = [
  // host が github.com でない（同じ owner/repo の別ホスト・非 URL・後方一致・前方一致）
  `git@evil.example:${REPO}.git`, `https://evil.example/${REPO}`, `ssh://git@evil.example/${REPO}`,
  `https://github.com.evil.example/${REPO}`, `/srv/git/${REPO}`, '',
  `https://evilgithub.com/${REPO}`, `https://evil.github.com/${REPO}`, `git@notgithub.com:${REPO}`,
  `ssh://git@evilgithub.com/${REPO}`, `https://x:${TOKEN}@evilgithub.com/${REPO}`,
  // owner/repo が期待と違う（別リポ・余計なパス・部分一致・欠落）
  'https://github.com/Fandhe-AI/other-repo', 'https://github.com/other-org/agent-cli-skills', `https://github.com/${REPO}/extra`,
  `https://github.com/${REPO}-fork`, 'https://github.com/Fandhe-AI',
  `https://github.com/x/${REPO}`, `github.com/x/${REPO}`, `git@github.com:x/${REPO}`,
  // userinfo の偽装・非標準ポート・.GIT・http / git・ssh の別ユーザー
  `https://github.com@evil.example/${REPO}`, `https://${TOKEN}@evil.example/${REPO}`, `https://x:${TOKEN}@github.com.evil.example/${REPO}`,
  `https://github.com:8443/${REPO}`, `https://${TOKEN}@github.com:8443/${REPO}`, `ssh://git@github.com:2222/${REPO}`,
  `https://github.com/${REPO}.GIT`, `git@github.com:${REPO}.GIT`,
  `http://github.com/${REPO}`, `http://${TOKEN}@github.com/${REPO}`, `git://github.com/${REPO}`,
  `ssh://evil@github.com/${REPO}`, `evil@github.com:${REPO}`, `${TOKEN}@github.com:${REPO}`, `GIT@github.com:${REPO}`,
  // 区切り文字（\ ? #）・許可文字以外
  `https://github.com/${REPO}\\evil`, `https://github.com/${REPO}?x=${TOKEN}`, `https://github.com/${REPO}#${TOKEN}`,
  // userinfo の中に区切り文字を置く偽装。WHATWG 系のパーサは \ ? # で authority を終えるので、本当の host は evil.example
  `https://evil.example\\@github.com/${REPO}`, `https://evil.example?@github.com/${REPO}`, `https://evil.example#@github.com/${REPO}`,
  // authority に @ が 2 つ以上ある（git は接続に失敗するが、エラー文に 2 つ目の userinfo が残る）
  `https://a@evil.example@github.com/${REPO}`, `https://${TOKEN}@evil.example@github.com/${REPO}`, `https://a@b@github.com/${REPO}`, `https://@@github.com/${REPO}`,
  // 空白・ホスト部だけ・パスなし
  `https://github.com/${REPO} x`, 'https://github.com', 'git@github.com:', 'ssh://git@github.com', 'https://github.com/',
]

for (const bash of BASHES) {
  const tag = `[${bash}]`

  test(`${tag} url_allowed: 許可ホストの期待 owner/repo の URL は受理する（ssh 2 種・https・.git の有無・大文字小文字・標準ポート・userinfo・%40）`, () => {
    check(bash, 'url_allowed', ACCEPT.map((u) => [u, 0]), () => [WANT])
  })

  test(`${tag} url_allowed: 別ホスト・別リポ・userinfo 偽装・非標準ポート・.GIT・http / git・区切り文字・@ が 2 つ以上・欠落は拒否する。何も出力しない`, () => {
    check(bash, 'url_allowed', REJECT.map((u) => [u, 1]), () => [WANT])
  })

  test(`${tag} url_allowed: 期待リポジトリが空（未確定）なら、URL が owner/repo を欠く場合も、正規の URL でも拒否する（常に不一致 = fail-closed）`, () => {
    check(bash, 'url_allowed', ['git@github.com:', 'https://github.com/', `https://github.com/${REPO}`, `git@github.com:${REPO}.git`].map((u) => [u, 1]), () => [''])
  })

  test(`${tag} url_allowed: 期待 owner/repo は大文字小文字を区別せず比較される（呼び出し側が小文字化して渡す前提）`, () => {
    check(bash, 'url_allowed', [[`https://github.com/${REPO.toUpperCase()}`, 0], [`https://GITHUB.COM/${REPO}`, 0]], () => [WANT])
    // 期待側が大文字のまま渡されたら一致しない（小文字化は呼び出し側の責務で、lib は URL 側だけを小文字化する）
    check(bash, 'url_allowed', [[`https://github.com/${REPO}`, 1]], () => [REPO])
  })

  test(`${tag} is_uint: 正の整数だけを受理する（先頭ゼロ・0・符号・空・10 桁以上は拒否）`, () => {
    check(bash, 'is_uint', [
      ['1', 0], ['12', 0], ['999999999', 0], ['100', 0],
      ['0', 1], ['00', 1], ['012', 1], ['1x', 1], ['x', 1], ['', 1], ['-1', 1], ['+1', 1], ['1 2', 1], ['1.5', 1], ['1234567890', 1],
    ])
  })

  test(`${tag} valid_repo: OWNER/REPO の形式（owner は英数字とハイフン・先頭末尾ハイフン不可、repo は . _ - を含む英数字で . と .. は不可）だけを受理する`, () => {
    check(bash, 'valid_repo', [
      [REPO, 0], ['a/b', 0], ['a-b/c.d_e', 0], ['o/a..b', 0], ['o/a-b', 0], ['O/R', 0],
      ['no-slash', 1], ['a/b/c', 1], ['-evil/repo', 1], ['evil-/repo', 1], ['owner/..', 1], ['owner/.', 1], ['/x', 1], ['x/', 1], ['', 1],
      ['a b/c', 1], ['a/b c', 1], ['o/-x', 1], ['o/a$b', 1], ['o/a;b', 1], ['ow_ner/r', 1],
      [`${'a'.repeat(40)}/r`, 1], [`o/${'a'.repeat(101)}`, 1], [`${'a'.repeat(39)}/${'b'.repeat(100)}`, 0],
    ])
  })

  test(`${tag} lower: ASCII の大文字を小文字にする。それ以外はそのまま`, () => {
    const cases = [['GitHub.COM/Fandhe-AI', 'github.com/fandhe-ai'], ['abc', 'abc'], ['A-B_C.1', 'a-b_c.1']]
    const res = table(bash, cases.map(([i]) => ['lower', i]))
    cases.forEach(([i, want], k) => {
      assert.equal(res[k].rc, 0)
      assert.equal(res[k].out, want, i)
    })
  })
}

// lib は「読み込み済み」変数でのガードを持たない。環境から継承した LOADED 変数や export -f した偽の関数で、定義が飛ばされたり
// 差し替えられたりしないこと（拒否すべき URL・ブランチ名・不正な nonce を、lib 自身の定義で拒否する）
const LIB_DIR = dirname(LIB)
// 子の bash が実行する検査。$1 = lib のディレクトリ、$2 = 期待 owner/repo。結果は key=rc の行で返す
const INNER = `. "$1/base-merge-lib.sh" && . "$1/push-verify.sh" && . "$1/signed-output.sh" || exit 90
url_allowed "https://evil.example/$2" "$2"; echo "url=$?"
pv_valid_branch "refs/heads/x"; echo "branch=$?"
so_valid_nonce "bad nonce!"; echo "nonce=$?"
h=$(printf abc | so_sha256); echo "sha=$?"; echo "hash=$h"`
// 親の bash が偽の関数を export -f してから子を起動する（bash の版ごとの輸出形式に依らない）
const OUTER = `url_allowed() { return 0; }; pv_valid_branch() { return 0; }; so_valid_nonce() { return 0; }; so_sha256() { echo fake; }
export -f url_allowed pv_valid_branch so_valid_nonce so_sha256
exec "$0" -c "$INNER" inner "$LIBDIR" "$WANT"`
for (const bash of BASHES) {
  test(`[${bash}] lib は継承した環境（LOADED 変数・export -f の偽の関数）に左右されない`, () => {
    const r = spawnSync(bash, ['-c', OUTER, bash], {
      encoding: 'utf8',
      env: { ...process.env, INNER, LIBDIR: LIB_DIR, WANT, BASE_MERGE_LIB_LOADED: '1', PUSH_VERIFY_LIB_LOADED: '1', SIGNED_OUTPUT_LIB_LOADED: '1' },
    })
    assert.equal(r.status, 0, `exit ${r.status} / stderr: ${r.stderr}`)
    const got = Object.fromEntries(r.stdout.split('\n').filter((l) => /^[a-z]+=/.test(l)).map((l) => l.split('=')))
    assert.equal(got.url, '1', `偽の url_allowed で拒否すべき URL が通った: ${r.stdout}`)
    assert.equal(got.branch, '1', `偽の pv_valid_branch が使われた: ${r.stdout}`)
    assert.equal(got.nonce, '1', `偽の so_valid_nonce が使われた: ${r.stdout}`)
    assert.ok(!r.stdout.includes('fake'), `偽の so_sha256 が使われた: ${r.stdout}`)
    assert.deepEqual({ sha: got.sha, hash: got.hash }, { sha: '0', hash: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad' })
  })
}
