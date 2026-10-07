#!/usr/bin/env bash
# tree-lib.sh — イシューツリーの実ツリー取得と表セル無害化の共通ヘルパー（source 専用）
#
# 呼び出し元: create-root-body.sh（Step 6 新規作成経路）と merge-root-body.sh（Step 6 --root 経路）。
# 役割: sub_issues API のページング取得・open 子孫の再帰集計・issue タイトルの表セル無害化・
#       プレースホルダー検査の正規表現を 1 箇所に定義し、2 つのスクリプトで本文生成ロジックを
#       重複させない（Issue #555・#556）。
# 前提: gh（認証済み）と jq が PATH にあること。リポジトリは gh の {owner}/{repo} 解決に従う。
# 契約: 失敗は非ゼロ return。source 元のシェル状態を壊さないため set -e / set -u / trap / exit
#       は置かない（エラー処理は呼び出し側が行う）。二重 source は無害（ガードで即 return）。
#
# このファイルは単体実行しない。

# CELL / TREE_PLACEHOLDER_RE は source 元が参照する（このファイル内では未使用）
# shellcheck disable=SC2034
[[ -n "${TREE_LIB_LOADED:-}" ]] && return 0
TREE_LIB_LOADED=1

# 指定 issue の sub-issues 全件（JSON 配列）をページングで取得する。失敗時は非ゼロ。
list_subs() {
  local n="$1" page=1 res all='[]'
  while true; do
    res=$(gh api "repos/{owner}/{repo}/issues/${n}/sub_issues?per_page=100&page=${page}") || return 1
    # 本文を含む全 JSON を --argjson の引数に載せると ARG_MAX / MAX_ARG_STRLEN を超え得るため、
    # printf（組み込み）経由の stdin で jq へ渡す
    all=$({ printf '%s' "${all}"; printf '%s' "${res}"; } | jq -s '.[0] + .[1]') || return 1
    [ "$(printf '%s' "${res}" | jq 'length')" -lt 100 ] && break
    page=$((page + 1))
  done
  printf '%s' "${all}"
}

# 指定 issue の全子孫のうち open な issue 件数を再帰で数えて stdout へ出す。Step 5 は sub-issue への
# 追加分解を許すため、直下だけでなく 3 階層目より深い open issue も総件数に含める。
# 失敗時は非ゼロ。depth は循環・異常な深さへの安全弁（超過は失敗扱い）
count_open_desc() {
  local n="$1" depth="${2:-0}" subs open c cnum
  [ "${depth}" -le 20 ] || return 1
  subs=$(list_subs "${n}") || return 1
  open=$(printf '%s' "${subs}" | jq '[.[] | select(.state == "open")] | length') || return 1
  for cnum in $(printf '%s' "${subs}" | jq -r '.[].number'); do
    c=$(count_open_desc "${cnum}" $((depth + 1))) || return 1
    open=$((open + c))
  done
  printf '%s' "${open}"
}

# issue タイトルは非信頼データ。表を壊す | と改行だけ無害化し、シェル展開には載せない。
# 先にバックスラッシュを \\ へ二重化してから | を \| にする（順序が逆だと a\|b が a\\|b となり | が列区切り化する）
CELL='gsub("[\r\n]+"; " ") | gsub("\\\\"; "\\\\") | gsub("\\|"; "\\|")'

# ルート本文に残ってはならないプレースホルダー（grep -E 用）。Step 3 の雛形・手書き例の取り残しを検出する
TREE_PLACEHOLDER_RE='<phase[0-9]*_number>|\(作成後に更新\)|#N([^0-9A-Za-z]|$)|^\|.*\|[[:space:]]*N[[:space:]]*(\||$)'
