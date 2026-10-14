#!/usr/bin/env bash
# measure-free-disk.sh — 指定パスが属するファイルシステムの実空き容量（KiB）を測る読み取り専用スクリプト
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立てる）:
#   bash measure-free-disk.sh --nonce <nonce> -- '/abs/path'
#
# 入力: 引数に絶対パス 1 件（-- の後ろ）。パスはデータであり、シェルへ再評価させない。
# 出力: 標準出力に 1 行の封筒（lib/signed-output.sh）。payload は
#       {"err":N,"freeKib":N,"inputSha256":"<64 桁 16 進>"}（キーは昇順）
#       - inputSha256 対象パス（引数の文字列）の SHA-256。ホストは自分が送ったパスから再計算して照合する。
#                  エージェントがパスを書き換えて実行すると別の値になり拒否される（封筒が入力を束縛する）
#       - freeKib  df -Pk の 2 行目の Available 列（KiB）。POSIX の -P で 1 ファイルシステム 1 行に固定
#                  され、GNU 専用の -B 等は使わない。デバイス名に空白があっても列がずれないよう、
#                  Capacity 列（数字 + %）を基準に 1 つ前の列を取る。ヘッダが 1024-blocks でなければ
#                  （単位を確かめられなければ）測定失敗にする。err が 1 のときは 0 を入れる
#       - err      0 = 測定成功、1 = 測定失敗（パスが許可文字集合外・実在しない、df の非 0 終了、
#                  出力が数値でない）。取得失敗を freeKib=0 に畳み込まず、ホストは err が 0 のときだけ
#                  freeKib を採用する（空き 0 KiB の実測と区別できる）
# 許可文字集合（ホストの sanitizeWorktreePath と同じ）: 絶対パス、英数字・/・-・_・.・半角スペースのみ、
#       .. を含まない。
# 数値: Available は数字だけ・15 桁以内のときだけ採用し、10 進として扱う（先頭ゼロを 8 進と読まない）。
# 環境: busybox の df は POSIXLY_CORRECT が設定されていると -k を無視して 512 バイト単位になり、空きを
#       2 倍に報告する（実測: alpine の busybox df で 1024-blocks が 512-blocks に変わる）。環境変数を外し、
#       さらにヘッダで単位を検査する二重の防御にしている。GNU・BSD(macOS)・busybox のいずれも -P でヘッダは
#       「Filesystem 1024-blocks Used Available Capacity Mounted on」の形（実測）。
# 終了コード:
#   0  封筒を出力した（測定の成否は payload.err で判断する）
#   2  使い方の誤り（--nonce が無い・形式不正・パスが 1 件でない・未知の引数）。封筒は出力しない
#   3  封筒を作れなかった（sha256sum / shasum が無い等）。封筒は出力しない
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU）。
# 副作用: なし（一時ファイルも作らない）。

set -u
LC_ALL=C
export LC_ALL
unset POSIXLY_CORRECT BLOCKSIZE BLOCK_SIZE DF_BLOCK_SIZE

script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 2
# shellcheck source=lib/signed-output.sh
. "${script_dir}/lib/signed-output.sh" || exit 3

usage() {
  echo "使い方: measure-free-disk.sh --nonce NONCE -- 絶対パス1件" >&2
  exit 2
}

nonce=""
while [ $# -gt 0 ]; do
  case "$1" in
    --nonce)
      [ $# -ge 2 ] || usage
      nonce=$2
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *) usage ;;
  esac
done
so_valid_nonce "${nonce}" || usage
[ $# -eq 1 ] || usage
p=$1
input_sha=$(printf '%s' "${p}" | so_sha256) || {
  echo "measure-free-disk: 入力のハッシュを計算できなかった（sha256sum / shasum が無い等）" >&2
  exit 3
}

sp=' '
err=1
free=0
case "${p}" in
  '' | / | /[!A-Za-z0-9]* | *..* | *[!A-Za-z0-9/_.${sp}-]*) ;;
  /*)
    if [ -e "${p}" ] && dfout=$(df -Pk -- "${p}" 2>/dev/null); then
      avail=$(printf '%s\n' "${dfout}" | awk '
        NR == 1 { ok = (0 < index($0, " 1024-blocks ")) }
        NR == 2 && ok {
          for (i = 4; i <= NF; i++) {
            if ($i ~ /^([0-9]+%|-)$/ && $(i - 1) ~ /^[0-9]+$/ && $(i - 2) ~ /^[0-9]+$/ && $(i - 3) ~ /^[0-9]+$/) {
              print $(i - 1)
              exit
            }
          }
        }')
      case "${avail}" in
        '' | *[!0-9]*) ;;
        *)
          if [ "${#avail}" -le 15 ]; then
            free=$((10#${avail}))
            err=0
          fi
          ;;
      esac
    fi
    ;;
esac

so_emit "${nonce}" "$(printf '{"err":%d,"freeKib":%d,"inputSha256":"%s"}' "${err}" "${free}" "${input_sha}")" || {
  echo "measure-free-disk: 出力封筒を作れなかった（sha256sum / shasum が無い等）" >&2
  exit 3
}
