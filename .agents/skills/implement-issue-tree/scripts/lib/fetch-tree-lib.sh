#!/usr/bin/env bash
# fetch-tree-lib.sh — fetch-tree.sh の判定・ダイジェストだけを持つ関数（source 専用）
#
# 呼び出し元: fetch-tree.sh（Issue #668）。ツリー取得の出力（ノードごとの TSV 行）から検査値を作る定義の置き場。
#             ホスト（implement-issue-tree.src.js の treeRowDigestLine / treeNodesDigest）は同じ定義を JavaScript で
#             計算し直して照合する。定義を変えるときは両方と tests/fetch-tree-unit.test.mjs の表を同時に直す。
# 役割: 1) title の表示形（制御文字を半角スペースへ置換）、2) 行ダイジェスト、3) ノード全体のダイジェスト nodesSha256、
#       4) 入力の束縛 inputSha256 の定義を 1 箇所に持つ。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は stdout と return 値で返す。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
#       signed-output.sh（so_sha256）を先に source しておくこと。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。連想配列・mapfile・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# title の表示形を作る jq の定義。制御文字（U+0000〜U+001F・U+007F）を半角スペース 1 つに置換する。
# TSV の列区切り（タブ）と行区切り（改行）を title が壊さないための正規化で、NUL を正規表現に書かないよう
# explode / implode で行う。fetch-tree.sh の jq フィルタもこの定義を埋め込んで使う（実装を 1 つにする）。
FT_JQ_DISP='def disp: explode | map(if . < 32 or . == 127 then 32 else . end) | implode;'

# $1 の title を表示形にして stdout へ（改行を付けない）。
ft_title_display() {
  printf '%s' "$1" | jq -Rrj -s "${FT_JQ_DISP} disp"
}

# state は open / closed のみ。
ft_valid_state() {
  case "$1" in
    open | closed) return 0 ;;
  esac
  return 1
}

# 0 以上の整数（先頭ゼロは拒否。9 桁以内）。
ft_is_count() {
  case "$1" in
    '' | *[!0-9]*) return 1 ;;
    0) return 0 ;;
    0*) return 1 ;;
  esac
  [ "${#1}" -le 9 ]
}

# 取得した子の件数がそのノードの subIssuesTotal と一致するか。$1 = 期待、$2 = 実際。
ft_count_ok() {
  ft_is_count "$1" && ft_is_count "$2" && [ "$1" = "$2" ]
}

# 行ダイジェストの行テキスト: number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB sha256hex(title)。
# $1..$5 = 各欄、$6 = title の表示形。stdout へ（改行なし）。sha256 を計算できなければ非ゼロ。
ft_row_digest_line() {
  local tsha tab
  tab=$(printf '\t')
  tsha=$(printf '%s' "$6" | so_sha256) || return 1
  printf '%s%s%s%s%s%s%s%s%s%s%s' "$1" "${tab}" "$2" "${tab}" "$3" "${tab}" "$4" "${tab}" "$5" "${tab}" "${tsha}"
}

# 標準入力の TSV（number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB title）の nodesSha256 を stdout へ。
# 行ダイジェストの行を number の昇順（数値）に並べ、改行で連結（末尾改行なし）して SHA-256 を取る。並び順は検査対象にしない。
ft_nodes_digest() {
  local tab num parent sib state total title lines line sorted
  tab=$(printf '\t')
  lines=""
  while IFS="${tab}" read -r num parent sib state total title || [ -n "${num}" ]; do
    [ -n "${num}" ] || continue
    line=$(ft_row_digest_line "${num}" "${parent}" "${sib}" "${state}" "${total}" "${title}") || return 1
    lines="${lines}${line}
"
  done
  [ -n "${lines}" ] || return 1
  sorted=$(printf '%s' "${lines}" | LC_ALL=C sort -t "${tab}" -k1,1n) || return 1
  printf '%s' "${sorted}" | so_sha256
}

# 入力の束縛: sha256("fetch-tree\n" + root + "\n" + repo)（repo 未指定は空文字）。$1 = root、$2 = repo。
ft_input_sha() {
  printf 'fetch-tree\n%s\n%s' "$1" "$2" | so_sha256
}
