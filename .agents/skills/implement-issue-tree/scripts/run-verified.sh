#!/usr/bin/env bash
# run-verified.sh — 同じディレクトリのスクリプトを、実行前に SHA-256 を照合してから起動する
#
# 使い方:
#   bash "<skillDir>/scripts/run-verified.sh" <期待する sha256> <スクリプト名> [引数...]
#   bash "<skillDir>/scripts/run-verified.sh" --verify-only --nonce NONCE   （表は標準入力。下の「予検査」）
#
# 役割: ビルダー（build-workflow.mjs）が生成物 implement-issue-tree.js へ埋め込んだハッシュと、
#       いま置かれているスクリプトの内容が一致するときだけ起動する。配布の版ずれ（Workflow だけ新しく
#       スクリプトが古い、またはその逆）や、スクリプトの書き換えを、実行前に fail-closed で止める。
# ハッシュの対象: <スクリプト名> のバイト列の後ろに、同じ scripts/lib/ の *.sh（バイト順）を連結した
#       もの。lib を書き換えるとそれを読み込む全スクリプトのハッシュが変わる。build-workflow.mjs の
#       bundleSha256 と同じ定義（tests/ が両者の一致を検証する）。
# 解決: スクリプトはこのファイルと同じディレクトリから名前だけで解決する（パス区切りと .. を含む名前は
#       拒否）。エージェントが渡せるのは名前だけで、実行する場所は変えられない。
# 予検査（--verify-only。Issue #603 第 4 弾）: ラン開始時に 1 回、ホストが埋め込みの全エントリ（`<sha256> <スクリプト名>` を
#       1 行ずつ）を標準入力で渡す。スクリプトは起動せず、各行を同じ定義のハッシュと照合して、結果を封筒
#       {nonce, payload, sha256}（lib/signed-output.sh）の 1 行で出す。payload は整数と入力のハッシュだけ:
#       count（行数）・ok（一致）・mismatch（不一致）・missing（スクリプトが無い・読めない・ハッシュを計算できない）・
#       firstBad（最初の不一致または欠落の行番号。1 始まり。無ければ 0）・inputSha256（標準入力のハッシュ）。
#       封筒を作れたときは、不一致・欠落があっても exit 0（判定はホストが封筒を照合して行う）。表の形式不正は exit 2 で
#       封筒を出さない。版ずれを『個々のスクリプトの最初の起動』で初めて知る（exit 3 / 4）のではなく、着手前に知るための入口で、
#       起動時の照合（上の通常の使い方）の代わりにはならない。
# 終了コード:
#   2  使い方の誤り（引数不足・スクリプト名の形式不正・期待ハッシュの形式不正・予検査の表の形式不正）
#   3  ハッシュ不一致（起動しない）。標準エラーへ期待値と実測値を出す
#   4  スクリプトが無い・読めない・ハッシュを計算できない（sha256sum / shasum が無い等）
#   それ以外  起動したスクリプト自身の終了コード（標準入力・標準出力はそのまま引き継ぐ）
#
# 限界: ハッシュを照合してから起動するまでの間にファイルを差し替える競合（TOCTOU）は防がない。
#       この launcher 自身も照合の対象外である。信頼の根はスキルディレクトリそのものであり、
#       そこへ書き込める者に対する防御ではない（references/script-trust-model.md）。

set -u
LC_ALL=C
export LC_ALL

usage() {
  echo "使い方: run-verified.sh SHA256 SCRIPT-NAME.sh [ARGS...]  /  run-verified.sh --verify-only --nonce NONCE（表は標準入力）" >&2
  [ $# -eq 0 ] || echo "run-verified: $1" >&2
  exit 2
}

dir=$(cd "$(dirname "$0")" && pwd -P) || exit 4

# スクリプト名の形式。先頭は英数字、使える文字は英小文字・数字・ハイフン・ドット、末尾は .sh。スラッシュと .. は含められない
valid_name() {
  case "$1" in
    *.sh) ;;
    *) return 1 ;;
  esac
  case "$1" in
    '' | *[!a-z0-9.-]* | [!a-z0-9]* | *..*) return 1 ;;
  esac
  return 0
}
valid_sha() {
  case "$1" in
    '' | *[!0-9a-f]*) return 1 ;;
  esac
  [ "${#1}" -eq 64 ]
}

# <スクリプト名> + lib/*.sh の SHA-256 を stdout へ出す。戻り値: 0 = 計算できた、4 = スクリプトが無い・読めない、5 = 計算できない
bundle_sha() {
  local target="${dir}/$1" out lib
  [ -f "${target}" ] && [ -r "${target}" ] || return 4
  # スクリプト本体の後ろに lib/*.sh を連結する。lib が無ければ glob に一致せず文字列が残るので -f で除く
  out=$(
    {
      cat -- "${target}"
      for lib in "${dir}"/lib/*.sh; do
        [ -f "${lib}" ] || continue
        cat -- "${lib}"
      done
    } | {
      if command -v sha256sum >/dev/null 2>&1; then
        sha256sum
      elif command -v shasum >/dev/null 2>&1; then
        shasum -a 256
      else
        exit 1
      fi
    }
  ) || return 5
  out=${out%%[[:space:]]*}
  valid_sha "${out}" || return 5
  printf '%s' "${out}"
}

# ---- 予検査 ----
if [ "${1:-}" = "--verify-only" ]; then
  [ $# -eq 3 ] && [ "$2" = "--nonce" ] || usage "--verify-only は --nonce NONCE だけを取る"
  nonce=$3
  # shellcheck source=lib/signed-output.sh
  . "${dir}/lib/signed-output.sh" || { echo "run-verified: lib/signed-output.sh を読めない" >&2; exit 4; }
  so_valid_nonce "${nonce}" || usage "--nonce は小文字英数字 1〜64 文字で指定する"
  # 標準入力を丸ごと読み、CR と末尾の改行 1 つを落としてからハッシュする（measure-residual-bytes.sh と同じ正規化）
  nl='
'
  input=$(cat && printf x) || { echo "run-verified: 標準入力を読めなかった" >&2; exit 4; }
  input=${input%x}
  input=$(printf '%s' "${input}" | tr -d '\r'; printf x)
  input=${input%x}
  case "${input}" in
    *"${nl}") input=${input%"${nl}"} ;;
  esac
  [ -n "${input}" ] || usage "表が空"
  input_sha=$(printf '%s' "${input}" | so_sha256) || { echo "run-verified: 入力のハッシュを計算できない（sha256sum / shasum が無い等）" >&2; exit 4; }
  count=0
  ok=0
  mismatch=0
  missing=0
  first_bad=0
  while IFS= read -r line; do
    expected=${line%% *}
    name=${line#* }
    # 1 行 = `<64 桁 16 進> <名前>`。空白が 2 つ以上・形式不正はホストが作る表ではないので止める
    if [ "${expected}" = "${line}" ] || ! valid_sha "${expected}" || ! valid_name "${name}"; then
      usage "表の $((count + 1)) 行目が不正（SHA256 とスクリプト名を空白 1 つで区切って 1 行ずつ）"
    fi
    count=$((count + 1))
    [ "${count}" -le 64 ] || usage "表が 64 行を超えた"
    rc=0
    actual=$(bundle_sha "${name}") || rc=$?
    if [ "${rc}" -ne 0 ]; then
      missing=$((missing + 1))
      [ "${first_bad}" -ne 0 ] || first_bad=${count}
    elif [ "${actual}" = "${expected}" ]; then
      ok=$((ok + 1))
    else
      mismatch=$((mismatch + 1))
      [ "${first_bad}" -ne 0 ] || first_bad=${count}
    fi
  done <<EOF
${input}
EOF
  so_emit "${nonce}" "$(printf '{"count":%d,"firstBad":%d,"inputSha256":"%s","mismatch":%d,"missing":%d,"ok":%d}' "${count}" "${first_bad}" "${input_sha}" "${mismatch}" "${missing}" "${ok}")" || {
    echo "run-verified: 出力封筒を作れなかった（sha256sum / shasum が無い等）" >&2
    exit 4
  }
  exit 0
fi

[ $# -ge 2 ] || usage
expected=$1
name=$2
shift 2

valid_sha "${expected}" || usage
valid_name "${name}" || usage

target="${dir}/${name}"
[ -f "${target}" ] && [ -r "${target}" ] || {
  echo "run-verified: スクリプトが無い・読めない: ${target}" >&2
  exit 4
}

rc=0
actual=$(bundle_sha "${name}") || rc=$?
case "${rc}" in
  0) ;;
  4)
    echo "run-verified: スクリプトが無い・読めない: ${target}" >&2
    exit 4
    ;;
  *)
    echo "run-verified: ハッシュを計算できない（sha256sum / shasum が無い、または読み出しに失敗）" >&2
    exit 4
    ;;
esac

if [ "${actual}" != "${expected}" ]; then
  echo "run-verified: ハッシュ不一致のため起動しない（${name}）。期待=${expected} 実測=${actual}" >&2
  echo "run-verified: Workflow とスキルディレクトリの版が揃っていない可能性がある。スキルを同期し直す" >&2
  exit 3
fi

# 起動中の bash 自身で実行する（PATH 上の別の bash に化けない。$BASH が無い環境では PATH の bash）
exec "${BASH:-bash}" "${target}" "$@"
