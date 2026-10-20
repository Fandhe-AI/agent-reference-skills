// gh-tree-stub.mjs — fetch-tree.sh を実 API なしで走らせるための偽 `gh`（Issue #668）。
// ファイル名が `*.test.mjs` に一致しないため node --test の glob には拾われない。
//
// 偽 `gh` は POSIX sh だけで書く。`gh api [--paginate] <パス>` の <パス>（クエリ文字列を除く）を英数字以外を `_` にした
// キーへ変換し、routes に登録した応答を返す。gh-observe-stub.mjs の「経路キー」方式とは違い、パスそのものが鍵なので、
// 任意の深さ・件数のツリーを組める。
//   応答の種類:
//     オブジェクト / 配列    JSON.stringify した 1 つの応答
//     { pages: [[...], ...] }  --paginate が返す『配列の連結』（ページごとに 1 つの JSON 配列を改行区切りで並べる）
//     { raw, exit }           そのままの標準出力と終了コード（HTTP エラーは本文を標準出力へ出して非 0 で終わる実 gh の挙動）
//   登録の無いパスは HTTP 404 相当（本文を標準出力へ出して exit 1）。
// 呼び出しの記録: callsPath の各行が 1 回分の argv（空白区切り）。callsTo(部分文字列) で数える。
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { trackTmp } from './tmp-track.mjs'

const STUB_SH = `#!/bin/sh
# 生成スタブ（テスト専用）
dir=\${GH_TREE_STUB_DIR:?}
echo "$*" >> "$dir/calls.log"
[ "$1" = "api" ] || { echo "stub: api 以外は未対応" >&2; exit 64; }
shift
path=""
for a in "$@"; do
  case "$a" in
    --*) ;;
    *) path=$a ;;
  esac
done
path=\${path%%\\?*}
key=$(printf '%s' "$path" | tr -c 'A-Za-z0-9' '_')
if [ -f "$dir/r/$key.out" ]; then
  cat "$dir/r/$key.out"
  rc=0
  [ -f "$dir/r/$key.rc" ] && rc=$(cat "$dir/r/$key.rc")
  exit "$rc"
fi
printf '%s' '{"message":"Not Found","status":"404"}'
exit 1
`

const keyOf = (path) => path.replace(/[^A-Za-z0-9]/g, '_')

/** @param {Record<string, any>} routes パス（クエリ無し）→ 応答 */
export function makeGhTreeStub(routes) {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'iit-gh-tree-')))
  const bin = join(dir, 'bin')
  mkdirSync(bin)
  mkdirSync(join(dir, 'r'))
  writeFileSync(join(bin, 'gh'), STUB_SH)
  chmodSync(join(bin, 'gh'), 0o755)
  writeFileSync(join(dir, 'calls.log'), '')
  for (const [path, resp] of Object.entries(routes)) {
    let out
    let exit = 0
    if (resp && typeof resp === 'object' && 'raw' in resp) {
      out = resp.raw
      exit = resp.exit ?? 0
    } else if (resp && typeof resp === 'object' && Array.isArray(resp.pages)) {
      out = resp.pages.map((p) => JSON.stringify(p)).join('\n')
    } else {
      out = JSON.stringify(resp)
    }
    writeFileSync(join(dir, 'r', `${keyOf(path)}.out`), out)
    if (exit !== 0) writeFileSync(join(dir, 'r', `${keyOf(path)}.rc`), String(exit))
  }
  return {
    dir,
    bin,
    env: (base = process.env) => ({ ...base, PATH: `${bin}:${base.PATH}`, GH_TREE_STUB_DIR: dir }),
    calls: () => readFileSync(join(dir, 'calls.log'), 'utf8').split('\n').filter((l) => l !== ''),
    callsTo: (needle) => readFileSync(join(dir, 'calls.log'), 'utf8').split('\n').filter((l) => l.includes(needle)).length,
  }
}

/** API の issue オブジェクト（テスト用の最小形） */
export function issue(number, { title = `issue ${number}`, state = 'open', total = 0 } = {}) {
  return { number, title, state, sub_issues_summary: { total, completed: 0, percent_completed: 0 } }
}
