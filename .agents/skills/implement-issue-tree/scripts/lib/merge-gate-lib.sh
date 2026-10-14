#!/usr/bin/env bash
# merge-gate-lib.sh — merge-gate.sh の判定だけを切り出した純関数（source 専用。Issue #603 第 6 弾）
#
# 呼び出し元: merge-gate.sh（本体）と tests/merge-gate-unit.test.mjs（表で単体検査する）。
# 役割: 取得済みの JSON を判定語・件数へ畳む部分だけを持つ。gh・ネットワーク・時間・ファイルに触れないので、
#       テストは gh なしで JSON の表を 1 回の bash 起動で検査できる（実時間を待たない）。
# 契約: 結果は stdout に 1 語（または整数）を出す。入力が想定外の形（型違い・欠落・jq の失敗）のときは非ゼロ return で
#       何も出さない。呼び出し側はそれを判定不能として fail-closed に倒す（合格にしない）。
#       rules は gh api --paginate の出力を平坦化した「ルールの配列」（[.[][]]）、rsc は required status checks の
#       [{context, integration_id}] の配列。判定の根拠と各語の意味は references/automerge-design.md の G0 の節にある。
# 互換: macOS（BSD userland・bash 3.2）と Linux の両方で動く。jq 1.5 以降の構文だけを使う。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、export -f した偽の関数が使われるのを防ぐ）。

# 適用 ruleset 全体の分類。none = required status checks が 1 件も無い（classic のみ・保護なし）、
# source = Repository 以外（Organization 継承）または ruleset_id が数値でないルールがある、ok = それ以外
mg_rules_class() {
  printf '%s' "$1" | jq -er '
    if (type != "array") then error("rules")
    elif ([.[] | select(.type == "required_status_checks")] | length) == 0 then "none"
    elif ([.[] | ((.ruleset_id | type) == "number" and .ruleset_source_type == "Repository")] | all) | not then "source"
    else "ok" end'
}

# 適用 ruleset の id（重複排除・1 行 1 件）
mg_rule_ids() {
  printf '%s' "$1" | jq -er '[.[] | .ruleset_id | select(type == "number")] | unique | .[] | floor'
}

# 1 つの ruleset が有効（enforcement が active）で bypass_actors が空配列か。成立 = 0、不成立・想定外 = 非ゼロ
mg_ruleset_ok() {
  printf '%s' "$1" | jq -e '
    type == "object" and .enforcement == "active" and (.bypass_actors | type) == "array" and (.bypass_actors | length) == 0' >/dev/null
}

# レビュースレッド解消の必須化（pull_request ルールのどれかが required_review_thread_resolution == true）。1 = 強制、0 = なし
mg_thread_enforced() {
  printf '%s' "$1" | jq -er '[.[] | select(.type == "pull_request")] | any(.parameters.required_review_thread_resolution == true) | if . then 1 else 0 end'
}

# required status checks の {context, integration_id} の重複排除済み配列（compact JSON）
mg_rsc() {
  printf '%s' "$1" | jq -ec '[.[] | select(.type == "required_status_checks") | .parameters.required_status_checks[] | {context: .context, integration_id: .integration_id}] | unique'
}

# 宣言した外部チェック（App ID + context の組）に完全一致する required check の件数。$1 = rsc、$2 = App ID（数値）、$3 = context
mg_external_bound_count() {
  printf '%s' "$1" | jq -er --argjson appid "$2" --arg ctx "$3" '[.[] | select(.integration_id == $appid and .context == $ctx)] | length'
}

# required に含まれない client-only の context の件数。$1 = rsc、$2 = check-run 名の配列、$3 = commit status の context の配列
mg_client_only_count() {
  jq -nr --argjson rsc "$1" --argjson cr "$2" --argjson st "$3" '
    ([$rsc[] | .context]) as $req | [($cr + $st) | unique | .[] | select(. as $c | ($req | index($c)) | not)] | length'
}

# integration_id が数値でない required check の件数（任意の発行元で条件を満たせるため発行元を束縛できない）
mg_unbound_count() {
  printf '%s' "$1" | jq -er '[.[] | select((.integration_id | type) != "number")] | length'
}

# 宣言の integration_id と一致する App 発行の check-run が HEAD に無い required context の件数。$1 = rsc、$2 = [{n, a}] の配列
mg_unissued_count() {
  jq -nr --argjson rsc "$1" --argjson runs "$2" '
    [$rsc[] | select(. as $r | (($r.integration_id | type) == "number" and ($runs | any(.n == $r.context and .a == $r.integration_id))) | not)] | length'
}

# チェックの state の配列 → 「総数 合格以外の件数」。合格 = SUCCESS / NEUTRAL / SKIPPED
mg_checks_counts() {
  printf '%s' "$1" | jq -er '
    if (type == "array" and all(.[]; type == "string")) then
      "\(length) \([.[] | select(. != "SUCCESS" and . != "NEUTRAL" and . != "SKIPPED")] | length)"
    else error("states") end'
}

# 外部チェック App 1 件の判定。$1 = cursor（レビュー到着 + 否定的 state なし）か other（check-run が合格、0 件ならレビューで代替）、
# $2 = その App の check-run の結論（無ければ状態）の配列、$3 = その App の [bot] が HEAD sha に付けたレビュー state の配列。
# 結果: ok / not-green（check-run が不合格・未完了）/ missing（合格の根拠が無い）
mg_external_verdict() {
  jq -nr --arg kind "$1" --argjson cr "$2" --argjson rv "$3" '
    def n(x): [$rv[] | select(. == x)] | length;
    if $kind == "cursor" then
      (if ($rv | length) == 0 or n("CHANGES_REQUESTED") > 0 then "missing" else "ok" end)
    elif ($cr | length) >= 1 then
      (if ([$cr[] | select(. != "success" and . != "neutral" and . != "skipped")] | length) > 0 then "not-green" else "ok" end)
    else
      (if n("APPROVED") >= 1 and n("CHANGES_REQUESTED") == 0 and n("COMMENTED") == 0 and n("PENDING") == 0 then "ok" else "missing" end)
    end'
}
