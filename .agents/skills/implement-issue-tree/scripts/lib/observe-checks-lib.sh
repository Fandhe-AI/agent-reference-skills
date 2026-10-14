#!/usr/bin/env bash
# observe-checks-lib.sh — observe-pr.sh の checks --until settled の分類だけを持つ純関数（source 専用）
#
# 呼び出し元: observe-pr.sh（Issue #603 第 8 弾）。HEAD sha の check-run の配列と commit status の配列を受け取り、
#             「合格 / 未完了 / 不合格」の件数に分類する。スクリプト本体から切り出した理由は、テストが 1 回の bash 起動で
#             表の全ケースを渡せるようにするため（lib/pr-push-lib.sh と同じ）。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は標準出力と return 値だけで返す。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
# 語彙:
#       check-run   (.conclusion // .status) が success / neutral / skipped なら合格、queued / in_progress / waiting /
#                   pending / requested なら未完了、それ以外はすべて不合格（failure / cancelled / timed_out / action_required /
#                   stale / startup_failure と、未知の語彙。未知を合格にも未完了にも倒さない = merge-gate.sh の
#                   「SUCCESS / NEUTRAL / SKIPPED 以外は green ではない」と同じ側）。
#       重複      同じ (app.id, name) の check-run は id が最大の 1 件だけを数える（REST の /commits/<sha>/check-runs は古い check suite の
#                   cancelled を新しい success と並べて返す。gh pr checks と merge-gate.sh は最新だけを見るので、揃えないと新版だけが
#                   failed になる）。commit status は同じ context の id 最大の 1 件。id（数値）か名前を持たない要素は畳まずそのまま数える。
#       進行中    status が queued / in_progress / waiting / pending / requested の check-run は、conclusion を持っていても未完了。
#       commit status  state が success なら合格、pending なら未完了、それ以外（failure / error / 未知）は不合格。
#                   combined status の最上位の state は使わない（status が 0 件でも pending を返すため）。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# jq の共通定義（重複排除）。引数ではなく標準入力で JSON を渡す（Linux は 1 引数 128 KiB が上限で、大きな配列を --argjson で渡すと E2BIG になる）
CHECKS_JQ_DEFS='
  def rkey: if (.name | type) == "string" then [(.app.id? // null), .name] else null end;
  def skey: if (.context | type) == "string" then .context else null end;
  def dedup(kf):
    ([.[] | select((.id | type) == "number" and (kf != null))] | group_by(kf) | map(max_by(.id)))
    + [.[] | select(((.id | type) == "number" and (kf != null)) | not)];
'

# checks_latest KIND JSON
#   KIND  runs（check-run の配列）か statuses（commit status の配列）。同じキーの重複を最新の 1 件に畳んだ配列を 1 行で出力する。
#   配列でない・解析できない入力は何も出力せず return 1。
checks_latest() {
  case "${1:-}" in
    runs) printf '%s' "${2:-null}" | jq -ce "${CHECKS_JQ_DEFS}"' if type == "array" and all(type == "object") then dedup(rkey) else error("shape") end' 2>/dev/null || return 1 ;;
    statuses) printf '%s' "${2:-null}" | jq -ce "${CHECKS_JQ_DEFS}"' if type == "array" and all(type == "object") then dedup(skey) else error("shape") end' 2>/dev/null || return 1 ;;
    *) return 1 ;;
  esac
}

# checks_classify RUNS_JSON STATUSES_JSON
#   RUNS_JSON      check-run オブジェクトの配列（各要素が status を文字列で持つ。conclusion は null か文字列）
#   STATUSES_JSON  commit status オブジェクトの配列（各要素が state を文字列で持つ）
#   標準出力: 「合格 未完了 不合格」（空白区切りの 3 整数。重複は最新だけを数えた件数）。形が違う入力は何も出力せず return 1（件数を 0 に畳まない）。
checks_classify() {
  printf '{"runs":%s,"sts":%s}' "${1:-null}" "${2:-null}" | jq -r "${CHECKS_JQ_DEFS}"'
    def run_bucket:
      if (.status == "queued" or .status == "in_progress" or .status == "waiting" or .status == "pending" or .status == "requested") then "w"
      else
        (.conclusion // .status) as $v
        | if ($v == "success" or $v == "neutral" or $v == "skipped") then "p"
          else "f" end
      end;
    def st_bucket:
      if .state == "success" then "p" elif .state == "pending" then "w" else "f" end;
    .runs as $runs | .sts as $sts
    | if (($runs | type) == "array" and ($sts | type) == "array"
        and ($runs | all(type == "object" and (.status | type) == "string" and ((.conclusion | type) == "null" or (.conclusion | type) == "string")))
        and ($sts | all(type == "object" and (.state | type) == "string"))) then
      ([($runs | dedup(rkey))[] | run_bucket] + [($sts | dedup(skey))[] | st_bucket]) as $b
      | "\($b | map(select(. == "p")) | length) \($b | map(select(. == "w")) | length) \($b | map(select(. == "f")) | length)"
    else error("shape") end' 2>/dev/null || return 1
}
