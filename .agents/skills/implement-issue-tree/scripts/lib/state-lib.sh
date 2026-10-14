#!/usr/bin/env bash
# state-lib.sh — state.sh の入力検証と状態ファイルの書き換え（source 専用）
#
# 呼び出し元: state.sh（Issue #603 第 5 弾）。判定と書き換えの部品を、本体から切り出したもの。切り出した理由は、テストが
#             1 回の bash 起動でこれらの関数へ表の全ケースを渡せるようにするため（本体は先頭から実行され exit する）。
# 内容:
#   st_valid_file     状態ファイルのパスが _/issue-trees/<正の整数>.json の形か（ここ以外へは書かない）
#   st_uint           0 以上の整数か（先頭ゼロ不可・15 桁以内 = JS の安全な整数の範囲）
#   st_valid_groups   merge の入力（[{"numbers":[正の整数...],"patch":{...}}...]）の形
#   st_valid_entries  init の入力（[{"number":正の整数,"type":"implement"|"verify-close"}...]）の形
#   st_rewrite        状態ファイルを jq で書き換える（スナップショットから計算 → 書き込み直前に変更なしを確認 → mv。
#                     変更を検知したら最初からやり直し、3 回で諦める）
#   ST_MERGE_JQ / ST_INIT_JQ / ST_HW_MAX_JQ / ST_HW_SET_JQ  書き換えの jq プログラム（固定。外部入力は --slurpfile / --argjson で渡す）
# 契約: 外部入力（patch の自由文を含む）は jq のプログラム文字列に埋め込まない。書き換えはファイルの同じディレクトリに
#       作った一時ファイルへ出力してから mv する（部分書き込みを残さない）。.items がオブジェクトでないファイルは書き換えない
#       （壊れた状態の上へ書き足さない）。st_rewrite の戻り値: 0 成功 / 1 入力の形・jq の失敗 / 2 ファイルが無い / 3 一時ファイル
#       を作れない / 4 変更の検知が 3 回続いた。関数は exit しない。
# 限界: 『変更なしの確認』から mv までの間（数ミリ秒）の書き込みは検知しない。同一ランの書き込みはホストが直列化しており、
#       この確認は別ランが同じ状態ファイルを書いた場合を検出するもの（アドバイザリ。排他ロックではない）。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、export -f した偽の関数が使われるのを防ぐ）。

# shellcheck disable=SC2034,SC2016  # ST_*_JQ は source 元（state.sh）が読む。jq の変数（$ts 等）はシェルで展開しない
# .items["<番号>"] へ patch を浅くマージする（従来の updateState / blocked 一括記録と同じ式）
ST_MERGE_JQ='reduce $groups[0][] as $g (.; reduce $g.numbers[] as $n (.; .items[($n|tostring)] = ((.items[($n|tostring)] // {}) + $g.patch))) | .updatedAt = $ts'
# 存在しない項目だけを pending で追加する（既存項目は上書きしない）
ST_INIT_JQ='reduce $entries[0][] as $e (.; if .items[($e.number|tostring)] == null then .items[($e.number|tostring)] = {"type":$e.type,"status":"pending","pr":0,"branch":"","worktree":"","fixCount":0,"note":""} else . end) | .updatedAt = $ts'
# 高水位: 版が違えば無条件で置き換え、同じ版なら大きい方へ（縮めない）
ST_HW_MAX_JQ='if ((.perWorktreeByteReserveHighWaterVersion // 0) != $v) or ((.perWorktreeByteReserveHighWater // 0) < $hw) then .perWorktreeByteReserveHighWater = $hw | .perWorktreeByteReserveHighWaterVersion = $v else . end | .updatedAt = $ts'
# 高水位: 無条件で上書き（引き下げ・旧版の無効化）
ST_HW_SET_JQ='.perWorktreeByteReserveHighWater = $hw | .perWorktreeByteReserveHighWaterVersion = $v | .updatedAt = $ts'

st_valid_file() {
  local n
  case "$1" in
    _/issue-trees/*.json) ;;
    *) return 1 ;;
  esac
  n=${1#_/issue-trees/}
  n=${n%.json}
  case "${n}" in
    '' | *[!0-9]* | 0*) return 1 ;;
  esac
  return 0
}

st_uint() {
  case "$1" in
    '' | *[!0-9]*) return 1 ;;
    0) return 0 ;;
    0*) return 1 ;;
  esac
  [ "${#1}" -le 15 ]
}

# $1 = JSON 文字列。jq -s -e で『ちょうど 1 個の値』であることと形を確かめる（番号は 1 以上の整数。patch はオブジェクト。
# 複数の値が続く入力は、最後の値だけが検査され先頭の値が書かれる食い違いを避けるため拒否する）
st_valid_groups() {
  printf '%s' "$1" | jq -s -e 'length == 1 and (.[0] | type == "array" and length >= 1 and length <= 1000 and all(.[]; type == "object" and (.numbers | type == "array" and length >= 1 and all(.[]; type == "number" and . >= 1 and . == floor)) and (.patch | type == "object")))' >/dev/null 2>&1
}
st_valid_entries() {
  printf '%s' "$1" | jq -s -e 'length == 1 and (.[0] | type == "array" and length >= 1 and all(.[]; type == "object" and (.number | type == "number" and . >= 1 and . == floor) and (.type == "implement" or .type == "verify-close")))' >/dev/null 2>&1
}

# 一時ファイルのパスは ST_SNAP / ST_TMP に持つ（呼び出し元の trap が、シグナルで中断されても消せるようにするため）
ST_SNAP=""
ST_TMP=""
st_drop() {
  [ -z "${ST_SNAP}" ] || rm -f -- "${ST_SNAP}"
  [ -z "${ST_TMP}" ] || rm -f -- "${ST_TMP}"
  ST_SNAP=""
  ST_TMP=""
}

# $1 = 状態ファイル、$2 = jq プログラム、以降 = jq の追加オプション（--slurpfile / --argjson / --arg ts）
st_rewrite() {
  local f=$1 prog=$2 try=0
  shift 2
  while [ "${try}" -lt 3 ]; do
    try=$((try + 1))
    [ -f "${f}" ] || return 2
    ST_SNAP=$(mktemp "${TMPDIR:-/tmp}/state-snap.XXXXXX") || { ST_SNAP=""; return 3; }
    cp -- "${f}" "${ST_SNAP}" || { st_drop; return 3; }
    ST_TMP=$(mktemp "${f}.XXXXXX") || { ST_TMP=""; st_drop; return 3; }
    if ! jq -e '.items | type == "object"' "${ST_SNAP}" >/dev/null 2>&1 \
      || ! jq "$@" "${prog}" "${ST_SNAP}" >"${ST_TMP}" 2>/dev/null \
      || ! jq -e '.items | type == "object"' "${ST_TMP}" >/dev/null 2>&1; then
      st_drop
      return 1
    fi
    if cmp -s -- "${ST_SNAP}" "${f}"; then
      rm -f -- "${ST_SNAP}"
      ST_SNAP=""
      if mv -f -- "${ST_TMP}" "${f}"; then
        ST_TMP=""
        return 0
      fi
      st_drop
      return 1
    fi
    st_drop
  done
  return 4
}
