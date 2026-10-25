#!/usr/bin/env bash
# fetch-tree.sh — イシューツリー（ルート配下の全子孫）を取得する読み取り専用スクリプト（Issue #668・#673）
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立てる）:
#   bash fetch-tree.sh --nonce <nonce> --root <親イシュー番号> [--repo <owner/repo>]   取得（既定）
#   bash fetch-tree.sh --nonce <nonce> --page <P> --dir <封筒の dir>                  P ページ目（1 以上）の行と、そのページの封筒を出す
#   bash fetch-tree.sh --release --dir <封筒の dir>                                    一時ディレクトリを片づける
#
# 役割: これまで取得エージェントが毎回自分で書いていた幅優先の取得（sub_issues のページ送り・closed ノードの貫通・
#       siblingIndex の付与・件数の自己点検）を決定的な手順にする。エージェントは標準出力を nodes へ書き写し、
#       封筒（lib/signed-output.sh）の値を転記するだけになる。ホストは書き写しを同じ定義で計算し直して照合する。
#       ツリーが大きく 1 ページ（20000 バイト）に収まらないときは、全行を一時ファイルへ書き、取得モードは封筒だけを出す。
#       ホストが 1 ページごとに別のエージェントで --page を実行させ、ページの封筒で照合してから連結する
#       （1 体のエージェントに全件を書き写させない。Issue #673・#690）。
# 出力（取得モード。標準出力。成功時のみ。失敗時は何も出さない）:
#   ページ数 1   ノードごとに 1 行の TSV: number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB title
#                （発見順。ルートは parent 0・siblingIndex 0。title は制御文字を半角スペースへ置換した表示形）に続けて封筒
#   ページ数 2 以上  封筒 1 行だけ（行は --page で読む）
#   封筒 {nonce, payload, sha256}。payload は {"count":N,"dir":"...","inputSha256":"...","nodesSha256":"...","pages":P,"structSha256":"...","taskIdSha256":"...","tsvSha256":"..."}
#   （P が 1 のときは dir・tsvSha256 を含まない 6 欄。空文字の欄の転記漏れで署名が合わなくなるのを避ける）
#         - count       全ページ合計の行数
#         - dir         ページ数 2 以上のときの一時ディレクトリの絶対パス（1 のときは空文字）
#         - inputSha256  sha256("fetch-tree\n" + root + "\n" + repo)。ルート・対象リポジトリを束縛する
#         - nodesSha256  lib/fetch-tree-lib.sh の ft_nodes_digest（6 欄を網羅。title は SHA-256 の 16 進にして含める）
#         - structSha256 lib/fetch-tree-lib.sh の ft_struct_digest（title を除く 5 欄。title の書き写し誤りと構造の誤りを分けて扱う・Issue #687）
#         - taskIdSha256 lib/fetch-tree-lib.sh の ft_task_id_digest（title 先頭のタスク ID だけ。依存解決に使う値で、title の不一致を許容する場合でも別に検査する）
#         - pages        ページ数
#         - tsvSha256    tree.tsv 全体（各行 + 改行）の SHA-256。--page の封筒の入力の束縛に使う
# 出力（--page モード）: 指定ページの TSV 行 + そのページだけの封筒 1 行。payload は
#   {"count":N,"inputSha256":sha256("fetch-tree-page\n" + tsvSha256 + "\n" + P),"nodesSha256":..,"page":P,"structSha256":..,"taskIdSha256":..}
#   （各ダイジェストはそのページの行だけに対する値）。ホストが同じ定義で照合する。
# 終了コード:
#   0  成功（取得モードは封筒を出力した）
#   2  使い方の誤り（引数の欠落・形式不正・未知の引数・モードの混在・--page で --nonce なし）、--page の範囲外
#   3  封筒を作れない（sha256sum / shasum が無い・jq が無い）
#   4  一時ディレクトリ・ファイルの作成、読み出し、--dir の検証の失敗
#   5  gh の失敗・応答が想定外の形（終了コードで判定する。gh は HTTP エラー本文も標準出力へ出すため内容では判定しない）
#   6  不完全（取得した子の件数が subIssuesTotal と一致しない・番号の重複）
#   7  出力が大きすぎる（ページ数が MAX_PAGES を超える。1 回の転記の現実的な限界として止める）
#   標準エラーには固定語彙と番号だけを出す（title など外部由来の文字列は出さない）。
# 副作用: gh api GET のみ。ページ数が 2 以上のときだけ TMPDIR（無ければ /tmp）に専用ディレクトリ iit-tree.XXXXXX を
#         1 つ作り（umask 077）、全行を tree.tsv に書く。削除は --release だけで、tree.tsv の rm -f と rmdir しか行わない
#         （再帰削除を持たない）。--dir は名前・所有者・シンボリックリンクでないこと・中身を検証してから使う。
#         メインや隔離 worktree には何も置かない。異常終了で残ったディレクトリは OS の一時領域の掃除に任せる。
# 限界: 約 4,500 ノード相当（MAX_PAGES = 30 ページ）を超えるツリーは exit 7 で止まる。
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

# Bash ツールの 1 回の出力の上限（超えると中央が欠けて静かに壊れる）。1 ページ目の出力（行 + ディレクトリ行 + 封筒）はこの内に収める。
MAX_TSV_BYTES=24000
# 1 ページに詰める TSV 行のバイト数。封筒（約 400 バイト）とディレクトリ行の余裕を MAX_TSV_BYTES から引いた値。
PAGE_BYTES=20000
# ページ数の上限（約 600KB・約 4,500 ノード相当）。1 回の StructuredOutput へ写せる現実的な限界の目安（経験則）。
MAX_PAGES=30

usage() {
  echo "使い方: fetch-tree.sh --nonce NONCE --root N [--repo OWNER/REPO] | --nonce NONCE --page P --dir DIR | --release --dir DIR" >&2
  exit 2
}

nonce=""
root=""
repo=""
page=""
dir=""
release=0
while [ $# -gt 0 ]; do
  case "$1" in
    --nonce) [ $# -ge 2 ] || usage; nonce=$2; shift 2 ;;
    --root) [ $# -ge 2 ] || usage; root=$2; shift 2 ;;
    --repo) [ $# -ge 2 ] || usage; repo=$2; shift 2 ;;
    --page) [ $# -ge 2 ] || usage; page=$2; shift 2 ;;
    --dir) [ $# -ge 2 ] || usage; dir=$2; shift 2 ;;
    --release) release=1; shift ;;
    *) usage ;;
  esac
done

# --page / --release。取得モードの引数（--root / --repo）とは混在させない。
if [ -n "${page}" ] || [ "${release}" = "1" ]; then
  if [ -n "${root}" ] || [ -n "${repo}" ]; then usage; fi
  if [ -n "${page}" ] && [ "${release}" = "1" ]; then usage; fi
  [ -n "${dir}" ] || usage
  ft_page_dir_name_ok "${dir}" || { echo "fetch-tree: --dir の形が不正" >&2; exit 4; }
  if [ "${release}" = "1" ]; then
    [ -z "${nonce}" ] || usage
    # 既に無ければ何もしない（失敗経路からの呼び出しでも安全にする）
    if [ ! -e "${dir}" ] && [ ! -L "${dir}" ]; then exit 0; fi
    ft_is_page_dir "${dir}" || { echo "fetch-tree: --dir の検証に失敗（片づけない）" >&2; exit 4; }
    rm -f "${dir}/tree.tsv" && rmdir "${dir}" || { echo "fetch-tree: 片づけに失敗" >&2; exit 4; }
    exit 0
  fi
  so_valid_nonce "${nonce}" || usage
  is_uint "${page}" && [ "${page}" -ge 1 ] || usage
  command -v jq >/dev/null 2>&1 || { echo "fetch-tree: jq が無い" >&2; exit 3; }
  ft_is_page_dir "${dir}" && [ -f "${dir}/tree.tsv" ] || { echo "fetch-tree: --dir の検証に失敗" >&2; exit 4; }
  tsv_sha=$(so_sha256 <"${dir}/tree.tsv") || { echo "fetch-tree: tree.tsv のハッシュを計算できなかった" >&2; exit 3; }
  page_out=$(ft_page_slice "${PAGE_BYTES}" "${page}" <"${dir}/tree.tsv"; echo x) || true
  page_out=${page_out%x}
  [ -n "${page_out}" ] || { echo "fetch-tree: ページが範囲外（${page}）" >&2; exit 2; }
  p_count=$(printf '%s' "${page_out}" | grep -c '')
  p_nodes=$(printf '%s' "${page_out}" | ft_nodes_digest) || { echo "fetch-tree: ノードのダイジェストを作れなかった" >&2; exit 3; }
  p_struct=$(printf '%s' "${page_out}" | ft_struct_digest) || { echo "fetch-tree: 構造のダイジェストを作れなかった" >&2; exit 3; }
  p_task=$(printf '%s' "${page_out}" | ft_task_id_digest) || { echo "fetch-tree: タスク ID のダイジェストを作れなかった" >&2; exit 3; }
  p_input=$(ft_page_input_sha "${tsv_sha}" "${page}") || { echo "fetch-tree: 入力のハッシュを計算できなかった" >&2; exit 3; }
  p_env=$(so_emit "${nonce}" "$(printf '{"count":%d,"inputSha256":"%s","nodesSha256":"%s","page":%d,"structSha256":"%s","taskIdSha256":"%s"}' "${p_count}" "${p_input}" "${p_nodes}" "${page}" "${p_struct}" "${p_task}")") \
    || { echo "fetch-tree: 出力封筒を作れなかった" >&2; exit 3; }
  p_total=$(printf '%s%s\n' "${page_out}" "${p_env}" | wc -c | tr -d ' ')
  [ "${p_total}" -le "${MAX_TSV_BYTES}" ] || { echo "fetch-tree: 出力が大きすぎる（${p_total} バイト > ${MAX_TSV_BYTES}）" >&2; exit 7; }
  printf '%s%s\n' "${page_out}" "${p_env}"
  exit 0
fi

[ -z "${dir}" ] || usage
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
struct_sha=$(printf '%s\n' "${rows}" | ft_struct_digest) || { echo "fetch-tree: 構造のダイジェストを作れなかった" >&2; exit 3; }
task_sha=$(printf '%s\n' "${rows}" | ft_task_id_digest) || { echo "fetch-tree: タスク ID のダイジェストを作れなかった" >&2; exit 3; }
pages=$(printf '%s\n' "${rows}" | ft_page_count "${PAGE_BYTES}") || { echo "fetch-tree: ページ数を数えられなかった" >&2; exit 4; }
[ "${pages}" -le "${MAX_PAGES}" ] || { echo "fetch-tree: ツリーが大きすぎる（${pages} ページ > ${MAX_PAGES}）" >&2; exit 7; }
out_dir=""
# tree.tsv 全体（各行 + 改行）の SHA-256。--page の封筒の入力の束縛に使う
tsv_sha=$(printf '%s\n' "${rows}" | so_sha256) || { echo "fetch-tree: tsv のハッシュを計算できなかった" >&2; exit 3; }
if [ "${pages}" != "1" ]; then
  # 全行を専用の一時ディレクトリへ書く。ハッシュを求めた後に作るので、ここまでの失敗では何も残らない。
  tmp_base=${TMPDIR:-/tmp}
  tmp_base=${tmp_base%/}
  out_dir=$(umask 077 && mktemp -d "${tmp_base}/iit-tree.XXXXXX" 2>/dev/null) || { echo "fetch-tree: 一時ディレクトリを作れなかった" >&2; exit 4; }
  if ! ft_page_dir_name_ok "${out_dir}"; then
    rmdir "${out_dir}" 2>/dev/null
    echo "fetch-tree: 一時ディレクトリのパスが許可文字集合外" >&2
    exit 4
  fi
  if ! (umask 077 && printf '%s\n' "${rows}" >"${out_dir}/tree.tsv"); then
    rm -f "${out_dir}/tree.tsv"
    rmdir "${out_dir}" 2>/dev/null
    echo "fetch-tree: 一時ファイルを書けなかった" >&2
    exit 4
  fi
fi
# 1 ページのときは dir（空文字）・tsvSha256 を payload に入れない。これらはページ経路（pages >= 2）でしか使わず、
# 空文字の欄はエージェントの転記で落ちやすい。1 欄でも欠けると署名の再計算が合わず取得が毎回失敗するため、
# 転記で落ちうる欄を署名対象から外す（ホストの TREE_SCHEMA でも dir・tsvSha256 は任意）
if [ "${pages}" = "1" ]; then
  payload=$(printf '{"count":%d,"inputSha256":"%s","nodesSha256":"%s","pages":%d,"structSha256":"%s","taskIdSha256":"%s"}' "${count}" "${input_sha}" "${nodes_sha}" "${pages}" "${struct_sha}" "${task_sha}")
else
  payload=$(printf '{"count":%d,"dir":"%s","inputSha256":"%s","nodesSha256":"%s","pages":%d,"structSha256":"%s","taskIdSha256":"%s","tsvSha256":"%s"}' "${count}" "${out_dir}" "${input_sha}" "${nodes_sha}" "${pages}" "${struct_sha}" "${task_sha}" "${tsv_sha}")
fi
envelope=$(so_emit "${nonce}" "${payload}") \
  || { [ -z "${out_dir}" ] || { rm -f "${out_dir}/tree.tsv"; rmdir "${out_dir}" 2>/dev/null; }; echo "fetch-tree: 出力封筒を作れなかった（sha256sum / shasum が無い等）" >&2; exit 3; }

if [ "${pages}" = "1" ]; then
  out=$(printf '%s\n%s\n' "${rows}" "${envelope}")
else
  out=${envelope}
fi
# 上限は封筒を含む最終出力全体のバイト数で判定する（上限付近で封筒が切れて静かに壊れないため）。
out_bytes=$(printf '%s\n' "${out}" | wc -c | tr -d ' ')
if [ "${out_bytes}" -gt "${MAX_TSV_BYTES}" ]; then
  if [ -n "${out_dir}" ]; then rm -f "${out_dir}/tree.tsv"; rmdir "${out_dir}" 2>/dev/null; fi
  echo "fetch-tree: 出力が大きすぎる（${out_bytes} バイト > ${MAX_TSV_BYTES}）" >&2
  exit 7
fi
printf '%s\n' "${out}"
