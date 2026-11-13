#!/usr/bin/env bash
# reply-resolve-lib.sh — reply-resolve.sh の入力検証・返信本文・処置の分類・結果 JSON（source 専用）
#
# 呼び出し元: reply-resolve.sh（Issue #759）。Merge ループの fix が、修正したレビュースレッドへ定型の対応報告を返してから
#             resolve するための判定だけを持つ純関数。スクリプト本体から切り出した理由は、テストが 1 回の bash 起動で
#             表の全ケースを渡せるようにするため（本体は先頭から実行され exit する）。
# 内容: rr_valid_thread_id / rr_in_allow（ホストが検証した許可リストとの照合）/ rr_reply_prefix・rr_reply_body（返信本文。
#       定数のテンプレートと sha・ブランチ名だけで組み立てる = レビュー本文・fix の自由文が入る経路を作らない）/
#       rr_classify（スレッドの観測値 → pending-review / skip / reply / resolve-only / invalid）/ rr_json_array / rr_result（結果 JSON）。
#       どの関数も exit せず、git・gh・ネットワークを呼ばない。
# 契約: 返信本文のテンプレートは引数や環境変数で差し替えられない。変えるときは tests/reply-resolve-unit.test.mjs の表を同時に直す。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。mapfile・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。

# 返信の目印（HTML コメントなので GitHub 上では表示されない）。自分の返信が既にあるかの判定にも使う
RR_MARKER='<!-- implement-issue-tree:fix-reply -->'
# 1 回の呼び出しで扱うスレッド数の上限（ホストの unresolvedComments の上限と同じ）
RR_MAX_THREADS=20

# GraphQL の thread node ID（ホストの sanitizeThreadId と同じ形式）
rr_valid_thread_id() {
  case "$1" in
    '' | *[!A-Za-z0-9_-]*) return 1 ;;
  esac
  [ "${#1}" -le 100 ]
}

# $1 = thread id、$2 = カンマ区切りの許可リスト。完全一致のときだけ 0
rr_in_allow() {
  case ",$2," in
    *",$1,"*) return 0 ;;
  esac
  return 1
}

# 返信本文の先頭（目印 + 改行 + sha + 半角スペース）。既存の返信の検出にも使う。$1 = 40 桁小文字 16 進の sha
rr_reply_prefix() {
  printf '%s\n%s ' "${RR_MARKER}" "$1"
}
# 返信本文の全体。$1 = sha、$2 = ブランチ名（検証済み）
rr_reply_body() {
  printf '%s\n%s で対応した（ブランチ %s）' "${RR_MARKER}" "$1" "$2"
}

# スレッドの観測値から処置を決める。$1 = isResolved（true / false）、$2 = スレッドの PR 番号、$3 = 期待する PR 番号、
# $4 = スレッドのリポジトリ（小文字）、$5 = 期待するリポジトリ（小文字）、$6 = 自分の同 sha の返信の件数、
# $7 = viewer の pending review の件数（1 以上なら返信も resolve もしない。既存の返信がある場合も resolve-only より先に判定する）。
# 出力: pending-review / skip（resolve 済み・別 PR・別リポジトリ）/ resolve-only（返信が既にある）/ reply / invalid（観測値の形が不正）
rr_classify() {
  case "$1" in true | false) ;; *) echo invalid; return 0 ;; esac
  case "$2" in '' | *[!0-9]*) echo invalid; return 0 ;; esac
  case "$6" in '' | *[!0-9]*) echo invalid; return 0 ;; esac
  case "$7" in '' | *[!0-9]*) echo invalid; return 0 ;; esac
  if [ "$2" != "$3" ] || [ "$4" != "$5" ] || [ "$1" = true ]; then
    echo skip
  elif [ "$7" -ge 1 ]; then
    echo pending-review
  elif [ "$6" -ge 1 ]; then
    echo resolve-only
  else
    echo reply
  fi
}

# 空白区切りの thread id 一覧を JSON 配列にする（要素は検証済みの id だけ）
rr_json_array() {
  local out="" id
  for id in $1; do
    out="${out:+${out},}\"${id}\""
  done
  printf '[%s]' "${out}"
}

# 結果の最後の 1 行。$1 = status、$2 = sha（空可）、$3〜$6 = resolved / replyFailed / resolveFailed / skipped（空白区切り）
rr_result() {
  printf 'REPLY_RESOLVE_RESULT {"status":"%s","sha":"%s","resolved":%s,"replyFailed":%s,"resolveFailed":%s,"skipped":%s}\n' \
    "$1" "$2" "$(rr_json_array "$3")" "$(rr_json_array "$4")" "$(rr_json_array "$5")" "$(rr_json_array "$6")"
}
