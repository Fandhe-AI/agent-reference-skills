#!/usr/bin/env bash
# signed-output.sh — 測定スクリプトの出力封筒 {nonce, payload, sha256} を作る共通ヘルパー（source 専用）
#
# 呼び出し元: measure-residual-bytes.sh / measure-free-disk.sh（Issue #603 第 1 弾）。以降の弾の
#             スクリプトも同じ封筒を使う。
# 役割: スクリプトの結果（payload）を 1 行の JSON にして出し、サブエージェントが転記した値を
#       ホスト（implement-issue-tree.src.js の verifySignedOutput）が再計算して照合できるようにする。
#       sha256 の入力は「nonce + 改行 + payload の正規形」で、ホストと本ファイルがこの 1 箇所の
#       定義を共有する。
#       - payload の正規形: キーを昇順に並べた空白なしの JSON。値は整数と ASCII の固定文字列だけ
#         にする（jq の数値表記・エスケープ差に依存しないため、呼び出し側が printf で直接組み立てる）
#       - nonce: ホストが呼び出しごとに決めて --nonce で渡す。出力は呼び出しに結び付く
# 契約: 失敗は非ゼロ return。source 元のシェル状態を壊さないため set -e / set -u / trap / exit は
#       置かない。二重 source は無害。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU）の両方で動く書き方だけを使う。
#       sha256sum が無ければ shasum -a 256 を使う（macOS に sha256sum は標準では無い）。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む
# （ここを書き換えると、これを読み込む全スクリプトのハッシュが変わる）。
# 読み込み済みを示す変数でのガードは置かない: 環境から継承した変数でこのファイルの定義が飛ばされ、export -f した偽の関数が使われるのを防ぐ
#（定義だけのファイルなので毎回読み直して構わない）。

# 標準入力の SHA-256 を小文字 16 進 64 桁で stdout へ出す。ツールが無い・出力が想定外なら非ゼロ。
so_sha256() {
  local out
  if command -v sha256sum >/dev/null 2>&1; then
    out=$(sha256sum) || return 1
  elif command -v shasum >/dev/null 2>&1; then
    out=$(shasum -a 256) || return 1
  else
    return 1
  fi
  out=${out%%[[:space:]]*}
  case "${out}" in
    '' | *[!0-9a-f]*) return 1 ;;
  esac
  [ "${#out}" -eq 64 ] || return 1
  printf '%s' "${out}"
}

# nonce の形式（小文字英数字 1〜64 文字）。ホストは boundaryNonce（base36）を渡す。
so_valid_nonce() {
  case "$1" in
    '' | *[!0-9a-z]*) return 1 ;;
  esac
  [ "${#1}" -le 64 ]
}

# 封筒を 1 行で stdout へ出す。$1 = nonce、$2 = payload の正規形 JSON。
so_emit() {
  local nonce="$1" payload="$2" sha
  so_valid_nonce "${nonce}" || return 1
  sha=$(printf '%s\n%s' "${nonce}" "${payload}" | so_sha256) || return 1
  printf '{"nonce":"%s","payload":%s,"sha256":"%s"}\n' "${nonce}" "${payload}" "${sha}"
}
