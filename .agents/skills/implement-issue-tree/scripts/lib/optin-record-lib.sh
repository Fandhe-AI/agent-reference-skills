#!/usr/bin/env bash
# optin-record-lib.sh — observe-pr.sh の optin-record モードの判定だけを持つ純関数（source 専用）
#
# 呼び出し元: observe-pr.sh。マージ前の opt-in テスト記録ゲート（Issue #495）が、PR 本文の記録節のマーカー行
#             `<!-- optin-test-record: <40 桁 sha> <pass|fail|not-run> <コマンド> -->` を、現在の HEAD に対して宣言コマンドごとに
#             何件数えるかを決める（pass は行全体の一致・fail と not-run は行内の部分一致。理由は optin_record_counts の上のコメント）。かつてはこの手順（正規化 + 固定文字列の grep）を 1 KB 超のインラインのコマンド列として
#             エージェントのプロンプトに埋め込み、エージェントが書き写して実行していた。書き写しの誤り（バックスラッシュの半減・
#             `\n` の `n` 化など）が結果を黙って変えない形にするため、スクリプトへ移した。判定そのもの（pass が 1 件以上かつ
#             pass 以外が 0 件）はホストの classifyOptinRecordGate に残る。ここは件数を数えるだけ。
# 契約: exit せず、git・gh・ネットワークを呼ばない。結果は標準出力と return 値だけ。set -e / set -u / trap / exit は置かない。二重 source は無害。
# マーカー行の書式は implement-issue-tree.src.js の optinRecordMarkerLine と同じ（書式のずれは tests/optin-tests-gate.test.mjs の群 F が
#             ホストの描画・書き直しの出力をこの関数へ通して検出する）。接頭辞を変えるときは両方を同時に変える。
OPTIN_RECORD_MARKER_PREFIX='<!-- optin-test-record: '
NL_OPTIN='
'

# 宣言コマンドの文字列として許す形か（ホストの OPTIN_TEST_COMMAND_RE と同じ: 先頭が英数字、残りは [A-Za-z0-9 _./:=@+,-]、200 文字以内）。
# 改行や許可外の文字を含む値は grep -F のパターンが複数行に化ける・シェル特殊文字を持ち込むため、gh を呼ぶ前に拒否する
optin_cmd_valid() {
  local rest
  case "$1" in
    '' | [!A-Za-z0-9]*) return 1 ;;
  esac
  [ "${#1}" -le 200 ] || return 1
  rest=${1// /}
  case "${rest}" in
    *[!A-Za-z0-9_./:=@+,-]*) return 1 ;;
  esac
  return 0
}

# PR 本文の正規化（標準入力 → 標準出力）。CR の除去と、行頭・行末の空白の除去。マーカー行は行頭インデントなしで書く契約だが、
# 人手の復旧編集で空白や CRLF が付くことがある。LC_ALL=C のため [[:space:]] は ASCII の空白だけ（U+3000・NBSP・U+2028 などは削らない。
# 旧版は利用者のロケールで動いており、macOS の sed は UTF-8 のロケールでこれらも削った。この差で pass が厳しくなる側の変化は
# 受け入れ、pass 以外の件数が減る側の変化は optin_record_counts の部分一致で塞ぐ）。パイプのどちらかが失敗したら return 1
optin_record_normalize() {
  local -a st
  tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//'
  st=("${PIPESTATUS[@]}")
  [ "${st[0]}" -eq 0 ] && [ "${st[1]}" -eq 0 ] || return 1
  return 0
}

# 正規化済みの本文の中の、固定文字列 $2 に当たる行の件数（grep -c 相当）。$1 = 正規化済みの本文、$2 = grep のオプション（-cxF = 行全体の一致 /
# -cF = 行内の部分一致）、$3 = パターン。標準出力に件数。printf と grep の両方の終了コードを見る（grep は 0 / 1 だけが正常。構文エラー等の 2 以上と、
# printf の失敗は return 1）。件数が数字でないときも return 1（件数を 0 件へ畳み込まない）
optin_record_grep_count() {
  local out n trailer p0 p1 extra
  # grep の標準出力（件数 1 行）の後ろに、パイプの各段の終了コードを 1 行（S <printf> <grep>）で足す
  out=$(printf '%s\n' "$1" | grep "$2" -- "$3"; st=("${PIPESTATUS[@]}"); printf 'S %s %s' "${st[0]}" "${st[1]}") || return 1
  case "${out}" in
    *"${NL_OPTIN}"*) n=${out%"${NL_OPTIN}"*}; trailer=${out##*"${NL_OPTIN}"} ;;
    *) n=""; trailer=${out} ;;
  esac
  read -r trailer p0 p1 extra <<EOF_OPTIN_GREP
${trailer}
EOF_OPTIN_GREP
  [ "${trailer}" = S ] && [ -z "${extra}" ] || return 1
  case "${p0}${p1}" in '' | *[!0-9]*) return 1 ;; esac
  case "${p0}" in 0) ;; *) return 1 ;; esac
  case "${p1}" in 0 | 1) ;; *) return 1 ;; esac
  case "${n}" in '' | *[!0-9]*) return 1 ;; esac
  printf '%s' "${n}"
}

# 正規化済みの本文に、行全体が `<接頭辞><sha> <result> <コマンド> -->` と一致する行が何件あるか（pass の数え方）。
# $1 = 正規化済みの本文、$2 = 40 桁の sha、$3 = pass|fail|not-run、$4 = コマンド。標準出力に件数
optin_record_count() {
  optin_record_grep_count "$1" -cxF "${OPTIN_RECORD_MARKER_PREFIX}$2 $3 $4 -->"
}

# 同じマーカーを行内の部分一致で数える（pass 以外の数え方）。マーカーは `<!-- ` で始まり ` -->` で終わるので、`make e2e` の検索が `make e2e-x -->` には
# 当たらず、`<sha> fail ` が前にあるので `xmake e2e` にも当たらない。行頭・行末に正規化が削らない文字（U+3000・NBSP・U+2028 など）が付いていても数える
optin_record_count_partial() {
  optin_record_grep_count "$1" -cF "${OPTIN_RECORD_MARKER_PREFIX}$2 $3 $4 -->"
}

# 宣言コマンド 1 件の件数を「pass 件数 pass 以外の件数」で出す。pass 以外 = fail + not-run（$H と一致しないマーカー行はどの grep にも
# 一致せず自動的に除かれる = 古い HEAD・base 取り込み前・fix 前の記録は存在しないものとして扱う）。$1 = 正規化済みの本文、$2 = sha、$3 = コマンド
#
# pass は行全体の一致、fail と not-run は部分一致。非対称にする理由（fail-open の防止）: 旧版は利用者のロケールで正規化し、行頭・行末の Unicode の空白
# （U+3000・NBSP・U+2028 など）も削っていたので、そうした空白が付いた fail 行も数えて blocked にできた。LC_ALL=C の新版は ASCII の空白しか削らず、
# 行全体の一致のままだとそうした fail 行が数えられず pass 以外が 0 件になって通ってしまう。pass 以外の件数は旧版より減ってはならないので、
# 部分一致（旧版の行全体の一致の上位集合）で数える。pass は逆に、削られなかった空白が付いた行を数えない（pass の件数が減る = 厳しくなる側の変化）。
# 人が読む形の行（`- opt-in テスト結果: <コマンド> => fail` など）はマーカーの接頭辞を含まないので、どちらにも数えない
optin_record_counts() {
  local p f nr
  p=$(optin_record_count "$1" "$2" pass "$3") || return 1
  f=$(optin_record_count_partial "$1" "$2" fail "$3") || return 1
  nr=$(optin_record_count_partial "$1" "$2" not-run "$3") || return 1
  printf '%s %s' "${p}" "$((f + nr))"
}
