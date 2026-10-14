#!/usr/bin/env bash
# state.sh — 状態ファイル（_/issue-trees/<親>.json）の書き込みを決定的に行う
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立て、state 書込みエージェントが 1 回実行する）:
#   bash state.sh --file _/issue-trees/N.json merge            （標準入力: [{"numbers":[…],"patch":{…}}…]）
#   bash state.sh --file _/issue-trees/N.json init             （標準入力: [{"number":N,"type":"implement|verify-close"}…]）
#   bash state.sh --file _/issue-trees/N.json hw-max --bytes B --version V
#   bash state.sh --file _/issue-trees/N.json hw-set --bytes B --version V
#
# 役割: 状態ファイルを jq で書き換える手順（mktemp → jq → mv）を、エージェントが文章から組み立てる代わりに、固定のコマンド列として
#       持つ（Issue #603 第 5 弾）。patch の自由文はプログラム文字列に入れず --slurpfile で渡す。入力の形を検証し、書き換え前に
#       ファイルが変わっていないか確かめる（lib/state-lib.sh の st_rewrite）。worktree・branch の削除と読み込みはしない。
# 出力: 標準出力の最後の 1 行が `STATE_RESULT {"ok":true}` または `STATE_RESULT {"ok":false,"reason":"…"}`。reason は固定語彙
#       （invalid-input / no-file / rewrite-failed / changed-concurrently / no-temp）。patch の内容は出さない。
#       結果を出せたときは、書き込みの失敗を含めて exit 0。
# 終了コード: 0 結果の行を出力した / 2 使い方の誤り（結果の行は出さない）/ 3 jq が無い
# 自衛: 書き込み先は _/issue-trees/<正の整数>.json の 1 形だけ。rm は自分が作った一時ファイルだけ。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。

set -u
unset POSIXLY_CORRECT
LC_ALL=C
export LC_ALL

command -v jq >/dev/null 2>&1 || { echo "state: jq が無い" >&2; exit 3; }
script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 3
# shellcheck source=lib/state-lib.sh
. "${script_dir}/lib/state-lib.sh" || exit 3

usage() {
  echo "使い方: state.sh --file _/issue-trees/N.json (merge|init|hw-max --bytes B --version V|hw-set --bytes B --version V)" >&2
  [ $# -eq 0 ] || echo "state: $1" >&2
  exit 2
}
result() {
  if [ "$1" = ok ]; then
    printf 'STATE_RESULT {"ok":true}\n'
  else
    printf 'STATE_RESULT {"ok":false,"reason":"%s"}\n' "$1"
  fi
  exit 0
}

file=""
mode=""
bytes=""
version=""
while [ $# -gt 0 ]; do
  case "$1" in
    --file | --bytes | --version)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --file) file=$2 ;;
        --bytes) bytes=$2 ;;
        --version) version=$2 ;;
      esac
      shift 2
      ;;
    merge | init | hw-max | hw-set)
      [ -z "${mode}" ] || usage "モードは 1 つだけ"
      mode=$1
      shift
      ;;
    *) usage "未知の引数: $1" ;;
  esac
done
[ -n "${mode}" ] || usage "モードが無い"
st_valid_file "${file}" || usage "--file は _/issue-trees/N.json の形で指定する"

pf=""
# shellcheck disable=SC2329  # trap 経由で呼ばれる
cleanup() {
  [ -z "${pf}" ] || rm -f -- "${pf}"
  pf=""
  st_drop
}
trap cleanup EXIT
trap 'cleanup; exit 143' TERM INT HUP

ts=$(date -u +%FT%TZ)
rc=0
case "${mode}" in
  merge | init)
    body=$(cat) || usage "標準入力を読めない"
    if [ "${mode}" = merge ]; then
      st_valid_groups "${body}" || result invalid-input
      prog=${ST_MERGE_JQ}
      var=groups
    else
      st_valid_entries "${body}" || result invalid-input
      prog=${ST_INIT_JQ}
      var=entries
    fi
    pf=$(mktemp "${TMPDIR:-/tmp}/state-in.XXXXXX") || result no-temp
    printf '%s\n' "${body}" >"${pf}" || result no-temp
    st_rewrite "${file}" "${prog}" --slurpfile "${var}" "${pf}" --arg ts "${ts}" || rc=$?
    ;;
  hw-max | hw-set)
    st_uint "${bytes}" || usage "--bytes は 0 以上の整数で指定する"
    if [ "${mode}" = hw-max ] && [ "${bytes}" = 0 ]; then usage "hw-max の --bytes は正の整数で指定する"; fi
    st_uint "${version}" || usage "--version は 0 以上の整数で指定する"
    if [ "${mode}" = hw-max ]; then prog=${ST_HW_MAX_JQ}; else prog=${ST_HW_SET_JQ}; fi
    st_rewrite "${file}" "${prog}" --argjson hw "${bytes}" --argjson v "${version}" --arg ts "${ts}" || rc=$?
    ;;
esac
case "${rc}" in
  0) result ok ;;
  2) result no-file ;;
  3) result no-temp ;;
  4) result changed-concurrently ;;
  *) result rewrite-failed ;;
esac
