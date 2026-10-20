#!/usr/bin/env bash
# fetch-tree.sh — イシューツリー（ルート配下の全子孫）を取得する読み取り専用スクリプト（Issue #668）
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立てる）:
#   bash fetch-tree.sh --nonce <nonce> --root <親イシュー番号> [--repo <owner/repo>]
#
# 役割: これまで取得エージェントが毎回自分で書いていた幅優先の取得（sub_issues のページ送り・closed ノードの貫通・
#       siblingIndex の付与・件数の自己点検）を決定的な手順にする。エージェントは標準出力を nodes へ書き写し、
#       封筒（lib/signed-output.sh）の値を転記するだけになる。ホストは書き写しを同じ定義で計算し直して照合する。
# 出力（標準出力。成功時のみ。失敗時は何も出さない）:
#   前半  ノードごとに 1 行の TSV: number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB title
#         （発見順。ルートは parent 0・siblingIndex 0。title は制御文字を半角スペースへ置換した表示形）
#   最終行  封筒 1 行 {nonce, payload, sha256}。payload は {"count":N,"inputSha256":"...","nodesSha256":"..."}
#         - inputSha256  sha256("fetch-tree\n" + root + "\n" + repo)。ルート・対象リポジトリを束縛する
#         - nodesSha256  lib/fetch-tree-lib.sh の ft_nodes_digest（6 欄を網羅。title は SHA-256 の 16 進にして含める）
# 終了コード:
#   0  封筒を出力した
#   2  使い方の誤り（--nonce / --root / --repo の欠落・形式不正・未知の引数）
#   3  封筒を作れない（sha256sum / shasum が無い・jq が無い）
#   5  gh の失敗・応答が想定外の形（終了コードで判定する。gh は HTTP エラー本文も標準出力へ出すため内容では判定しない）
#   6  不完全（取得した子の件数が subIssuesTotal と一致しない・番号の重複）
#   7  出力が大きすぎる（TSV が 24000 バイトを超える。Bash ツールの出力上限で中央が欠けて静かに壊れないよう止める）
#   標準エラーには固定語彙と番号だけを出す（title など外部由来の文字列は出さない）。
# 副作用: なし（読み取りのみの gh api GET。一時ファイルも作らない）。
# 限界: 約 350 ノードを超えるツリーは exit 7 で止まる（ページ指定つきの出力は未対応）。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU）。

set -u
LC_ALL=C
export LC_ALL

script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 2
# shellcheck source=lib/signed-output.sh
. "${script_dir}/lib/signed-output.sh" || exit 3
# shellcheck source=lib/base-merge-lib.sh
. "${script_dir}/lib/base-merge-lib.sh" || exit 3
# shellcheck source=lib/fetch-tree-lib.sh
. "${script_dir}/lib/fetch-tree-lib.sh" || exit 3

MAX_TSV_BYTES=24000

usage() {
  echo "使い方: fetch-tree.sh --nonce NONCE --root N [--repo OWNER/REPO]" >&2
  exit 2
}

nonce=""
root=""
repo=""
while [ $# -gt 0 ]; do
  case "$1" in
    --nonce) [ $# -ge 2 ] || usage; nonce=$2; shift 2 ;;
    --root) [ $# -ge 2 ] || usage; root=$2; shift 2 ;;
    --repo) [ $# -ge 2 ] || usage; repo=$2; shift 2 ;;
    *) usage ;;
  esac
done
so_valid_nonce "${nonce}" || usage
is_uint "${root}" || usage
if [ -n "${repo}" ]; then valid_repo "${repo}" || usage; fi

command -v jq >/dev/null 2>&1 || { echo "fetch-tree: jq が無い" >&2; exit 3; }
input_sha=$(ft_input_sha "${root}" "${repo}") || { echo "fetch-tree: 入力のハッシュを計算できなかった（sha256sum / shasum が無い等）" >&2; exit 3; }

if [ -n "${repo}" ]; then base="repos/${repo}"; else base='repos/{owner}/{repo}'; fi
nl='
'

# 1 ノードぶんの検証を jq で行い TSV 行へ。number は正の整数、state は open / closed、
# sub_issues_summary.total は 0 以上の整数でなければ jq がエラー終了する（応答の形が想定外 = exit 5）。
JQ_ROW="${FT_JQ_DISP}"'
def okint(lo): type == "number" and . == floor and . >= lo and . < 1000000000;
def row($parent; $sib):
  if (.number | okint(1)) and (.state == "open" or .state == "closed") and (.title | type == "string")
    and (.sub_issues_summary | type == "object") and (.sub_issues_summary.total | okint(0))
  then [(.number | tostring), ($parent | tostring), ($sib | tostring), .state, (.sub_issues_summary.total | tostring), (.title | disp)] | join("\t")
  else error("bad-node") end;'

# ルート
root_json=$(gh api "${base}/issues/${root}" 2>/dev/null) || { echo "fetch-tree: gh 失敗（ルート #${root}）" >&2; exit 5; }
root_row=$(printf '%s' "${root_json}" | jq -r --argjson r "${root}" "${JQ_ROW}"' if .number == $r then row(0; 0) else error("root-mismatch") end' 2>/dev/null) \
  || { echo "fetch-tree: ルートの応答が想定外の形（#${root}）" >&2; exit 5; }

rows="${root_row}"
seen=" ${root} "
pending=""
rtotal=$(printf '%s' "${root_row}" | cut -f5)
[ "${rtotal}" = "0" ] || pending="${root}"
totals=" ${root}:${rtotal} "

while [ -n "${pending}" ]; do
  n=${pending%% *}
  if [ "${pending}" = "${n}" ]; then pending=""; else pending=${pending#* }; fi
  expected=${totals#*" ${n}:"}
  expected=${expected%% *}
  resp=$(gh api --paginate "${base}/issues/${n}/sub_issues?per_page=100" 2>/dev/null) \
    || { echo "fetch-tree: gh 失敗（sub_issues #${n}）" >&2; exit 5; }
  kids=$(printf '%s' "${resp}" | jq -s -r --argjson p "${n}" "${JQ_ROW}"'
    (add // []) as $a | if ($a | type) != "array" then error("not-array") else . end
    | range(0; $a | length) as $i | $a[$i] | row($p; $i)' 2>/dev/null) \
    || { echo "fetch-tree: sub_issues の応答が想定外の形（#${n}）" >&2; exit 5; }
  actual=0
  if [ -n "${kids}" ]; then
    while IFS= read -r line; do
      actual=$((actual + 1))
      cnum=$(printf '%s' "${line}" | cut -f1)
      ctot=$(printf '%s' "${line}" | cut -f5)
      case "${seen}" in
        *" ${cnum} "*) echo "fetch-tree: 番号の重複（#${cnum}、親 #${n}）" >&2; exit 6 ;;
      esac
      seen="${seen}${cnum} "
      totals="${totals}${cnum}:${ctot} "
      [ "${ctot}" = "0" ] || pending="${pending:+${pending} }${cnum}"
      rows="${rows}${nl}${line}"
    done <<EOF_KIDS
${kids}
EOF_KIDS
  fi
  ft_count_ok "${expected}" "${actual}" || { echo "fetch-tree: 子の件数が subIssuesTotal と不一致（#${n} 期待 ${expected} 実際 ${actual}）" >&2; exit 6; }
done

count=$(printf '%s\n' "${rows}" | grep -c '')

nodes_sha=$(printf '%s\n' "${rows}" | ft_nodes_digest) || { echo "fetch-tree: ノードのダイジェストを作れなかった" >&2; exit 3; }
envelope=$(so_emit "${nonce}" "$(printf '{"count":%d,"inputSha256":"%s","nodesSha256":"%s"}' "${count}" "${input_sha}" "${nodes_sha}")") \
  || { echo "fetch-tree: 出力封筒を作れなかった（sha256sum / shasum が無い等）" >&2; exit 3; }
# 上限は封筒を含む最終出力全体のバイト数で判定する（TSV だけだと上限付近で封筒が切れる）。
out_bytes=$(printf '%s\n%s\n' "${rows}" "${envelope}" | wc -c | tr -d ' ')
[ "${out_bytes}" -le "${MAX_TSV_BYTES}" ] || { echo "fetch-tree: 出力が大きすぎる（${out_bytes} バイト > ${MAX_TSV_BYTES}）" >&2; exit 7; }
printf '%s\n%s\n' "${rows}" "${envelope}"
