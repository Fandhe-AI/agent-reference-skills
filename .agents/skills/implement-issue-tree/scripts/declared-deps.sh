#!/usr/bin/env bash
# declared-deps.sh — イシュー本文の依存宣言（Depends on #N 等）を機械抽出する
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立て、依存抽出エージェントが 1 回実行する）:
#   bash declared-deps.sh --numbers N,N,… [--repo OWNER/REPO] [--table JSON] --input-sha256 HEX
#   bash declared-deps.sh --rate-limit
#   bash declared-deps.sh --print-filter [--table JSON]
#
# 役割: プロンプトに埋め込まれていた gh api + jq の長いコマンドを、スクリプトへ切り出したもの。エージェントが 3.9〜4.9 KB の
#       コマンドを転記する際にバックスラッシュが半減する事故（`\\b` → `\b`。jq ではエラーにならずバックスペースとして通り、単語境界の判定が
#       黙って false になる）を、フィルタ本体を lib/declared-deps-lib.sh に置いてハッシュで固定することで防ぐ。フィルタの意味は
#       切り出し前と同一（tests/declared-deps-script.test.mjs が、切り出し前の文字列との文字単位の一致を固定する）。
# モード:
#   --numbers N,N,…   各イシューの本文を `gh api repos/<repo>/issues/<N>`（REST の core 枠。GraphQL 枠を消費しない）で 1 件ずつ読み、
#                     jq で整数だけに正規化した 1 行の JSON を標準出力へ出す: {"number": N, "deps": [...], "sig": S}。
#                     sig は number と deps から計算した検査値（ホストが deps から同じ式で再計算して照合する）。成功した
#                     イシューの行だけを出し、gh か jq が失敗したイシューは行を出さず標準エラーへ `FAILED #N` を出す
#                     （失敗を空の宣言と取り違えないため。欠落はホストの全件照合が検出して再試行する）。gh の標準エラーはそのまま通す。
#                     本文そのもの（非信頼データ）は出力しない。--repo を省くと gh が現在のリポジトリを使う（{owner}/{repo}）。
#                     --table は兄弟のタスク ID の表（ホストの siblingTaskTableFor。省くと表なし = 従来の抽出だけ）。
#                     --input-sha256 は入力の束縛（必須）: sha256("declared-deps\n" + numbers + "\n" + repo + "\n" + table)。repo と table は
#                     省いたとき空文字・末尾に改行を付けない。ホストが同じ定義で計算して起動行へ付け、スクリプトは受け取った引数から計算し直す。
#                     エージェントが --table のエントリ・--repo・--numbers の番号を転記で落とすと（sig は number と deps だけから計算されるので
#                     つじつまが合ったまま）兄弟の依存が解決されない・別のリポジトリの同じ番号を読む事故になるため、不一致は gh を呼ぶ前に
#                     標準エラーへ INPUT_MISMATCH を出して exit 2 にする（期待値は出力しない = 転記し直しで通せない）。
#   --rate-limit      gh api rate_limit の core 枠を読み、{"remaining":…,"resetAt":"…","waitSeconds":…} を 1 行で出す。
#                     抽出が rate limit で失敗したときの復帰時刻の確認用。待機はホストが行う。
#   --print-filter    --numbers で使う jq フィルタをそのまま標準出力へ出す（ネットワークを使わない。確認とテスト用）。
# 終了コード: 0 完了（--numbers は一部が FAILED でも 0。判定はホストが全件照合で行う）/ 2 使い方の誤り・入力の不一致（INPUT_MISMATCH）/
#             3 gh が無い・入力のハッシュを計算できない（sha256sum / shasum が無い）
#             --rate-limit は gh の終了コードをそのまま返す。
# 自衛: gh api の GET（REST）だけ。書き込み・マージ・設定変更は含まない。ファイルを作らない。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。

set -u
unset POSIXLY_CORRECT
LC_ALL=C
export LC_ALL

script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 3
# shellcheck source=lib/signed-output.sh
. "${script_dir}/lib/signed-output.sh" || exit 3
# shellcheck source=lib/declared-deps-lib.sh
. "${script_dir}/lib/declared-deps-lib.sh" || exit 3

usage() {
  echo "使い方: declared-deps.sh --numbers N,N,… [--repo OWNER/REPO] [--table JSON] --input-sha256 HEX | --rate-limit | --print-filter [--table JSON]" >&2
  [ $# -eq 0 ] || echo "declared-deps: $1" >&2
  exit 2
}

numbers=""
repo=""
table=""
input_sha=""
have_repo=0
have_table=0
have_sha=0
mode=""
set_mode() {
  [ -z "${mode}" ] || usage "モードは 1 つだけ（--numbers / --rate-limit / --print-filter）"
  mode=$1
}
while [ $# -gt 0 ]; do
  case "$1" in
    --numbers | --repo | --table | --input-sha256)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --numbers)
          [ -z "${numbers}" ] || usage "--numbers は 1 回だけ"
          numbers=$2
          set_mode fetch
          ;;
        --repo)
          [ "${have_repo}" -eq 0 ] || usage "--repo は 1 回だけ"
          repo=$2
          have_repo=1
          ;;
        --table)
          [ "${have_table}" -eq 0 ] || usage "--table は 1 回だけ"
          table=$2
          have_table=1
          ;;
        --input-sha256)
          [ "${have_sha}" -eq 0 ] || usage "--input-sha256 は 1 回だけ"
          input_sha=$2
          have_sha=1
          ;;
      esac
      shift 2
      ;;
    --rate-limit)
      set_mode rate-limit
      shift
      ;;
    --print-filter)
      set_mode print-filter
      shift
      ;;
    *) usage "未知の引数: $1" ;;
  esac
done
[ -n "${mode}" ] || usage "モードが無い"
# 入力の束縛に使う表は、渡された値そのまま（省いたときは空文字。表なしの既定値を渡したことにしない）
table_arg=""
if [ "${have_table}" -eq 1 ]; then table_arg=${table}; else table=${DD_EMPTY_TABLE}; fi

case "${mode}" in
  rate-limit)
    [ "${have_repo}" -eq 0 ] && [ "${have_table}" -eq 0 ] && [ "${have_sha}" -eq 0 ] || usage "--rate-limit は他の引数を取らない"
    ;;
  print-filter)
    [ "${have_repo}" -eq 0 ] && [ "${have_sha}" -eq 0 ] || usage "--print-filter は --repo・--input-sha256 を取らない"
    dd_valid_table "${table}" || usage "--table が表の形式（{\"f\":{…},\"n\":{…}}）でない"
    printf '%s\n' "$(dd_filter "${table}")"
    exit 0
    ;;
  fetch)
    dd_valid_numbers "${numbers}" || usage "--numbers は正の整数のカンマ区切り（重複なし・1〜${DD_NUMBERS_MAX} 個）で指定する"
    # --repo '' は省略と同じ扱いにしない（空のまま gh が現在のリポジトリへ倒れるのを防ぐ）
    if [ "${have_repo}" -eq 1 ]; then dd_valid_repo "${repo}" || usage "--repo は OWNER/REPO の形で指定する"; fi
    dd_valid_table "${table}" || usage "--table が表の形式（{\"f\":{…},\"n\":{…}}）でない"
    ;;
esac

command -v gh >/dev/null 2>&1 || { echo "declared-deps: gh が無い" >&2; exit 3; }

if [ "${mode}" = rate-limit ]; then
  gh api rate_limit --jq "${DD_RATE_LIMIT_JQ}"
  exit $?
fi

# 入力の束縛: 検証済みの引数から期待値を計算し直し、起動行の --input-sha256 と一致しなければ gh を呼ばずに終わる。期待値は出力しない。
expected=$(dd_input_sha "${numbers}" "${repo}" "${table_arg}") || { echo "declared-deps: 入力のハッシュを計算できない（sha256sum / shasum が無い等）" >&2; exit 3; }
if [ "${have_sha}" -ne 1 ] || [ "${input_sha}" != "${expected}" ]; then
  echo "declared-deps: INPUT_MISMATCH（起動行の --numbers・--repo・--table・--input-sha256 が束縛と合わない。転記ミス。gh は呼んでいない）" >&2
  exit 2
fi

filter=$(dd_filter "${table}")
if [ "${have_repo}" -eq 1 ]; then repo_path=${repo}; else repo_path='{owner}/{repo}'; fi
oldifs=${IFS}
IFS=,
# shellcheck disable=SC2086  # dd_valid_numbers が数字とカンマだけと確かめた値の意図した単語分割
set -- ${numbers}
IFS=${oldifs}
for n in "$@"; do
  # 成功したイシューの行だけを標準出力へ出す。失敗した分は行を出さず FAILED を標準エラーへ出す
  out=$(gh api "repos/${repo_path}/issues/${n}" --jq "${filter}") && printf '%s\n' "${out}" || echo "FAILED #${n}" >&2
done
exit 0
