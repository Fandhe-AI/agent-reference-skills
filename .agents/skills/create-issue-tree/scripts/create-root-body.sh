#!/usr/bin/env bash
# create-root-body.sh — 新規作成したツリーのルート（トラッキング）issue 本文を実ツリーから生成して更新する
#
# 呼び出し元: skills/create-issue-tree/SKILL.md Step 6（--root 未指定の新規作成経路）。
# 役割: 旧 Step 6 は約 125 行の bash を SKILL.md に埋め込み、実行時の Claude が転記して実行していた。
#       レビュー修正のたびに SKILL.md が肥大するため、本文生成を本スクリプトへ切り出した（Issue #555）。
#       Phase 別表は sub_issues API の実ツリーだけから生成し、手書きのプレースホルダーを本文に載せない。
#
# 使い方: create-root-body.sh --root <n> --granularity <Nh>
#         引数が無ければ環境変数 ROOT_NUMBER / GRANULARITY を使う（SKILL.md の既存フロー互換）。
#
# 不変条件:
#   - 表は実ツリーからのみ生成し、タイトルは非信頼データとして無害化する（tree-lib.sh の CELL）。
#   - プレースホルダー残り・Phase 行数不一致の本文では gh issue edit を呼ばない（fail-closed）。
#   - 一時ファイルは成否によらず削除する（trap は mktemp より先に登録）。
#
# 終了コード: 0 本文を更新した / 1 入力不正・取得失敗・検査失敗（本文は未更新）/
#            2 前提不備（tree-lib.sh・gh・jq が使えない。本文は未更新）/
#            それ以外は gh issue edit 自身の終了コード。
# 成功時の stdout 最終行: result=updated root=<n> phases=<k>。エラーは stderr へ出す。
#
# set -e は使わない。本スクリプトは各所の `|| die ...` で失敗を明示処理する設計で、
# `[ ... ] && break` 等の -e 非互換パターンを含むため。単体実行用であり source しない。
set -uo pipefail

die() {
  local code="$1"
  shift
  echo "エラー: $*" >&2
  exit "${code}"
}

ROOT_NUMBER="${ROOT_NUMBER:-}"
GRANULARITY="${GRANULARITY:-}"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --root | --granularity)
      [[ $# -ge 2 ]] || die 1 "$1 に値がありません。使い方: create-root-body.sh --root <n> --granularity <Nh>"
      if [[ "$1" == "--root" ]]; then ROOT_NUMBER="$2"; else GRANULARITY="$2"; fi
      shift 2
      ;;
    *) die 1 "未知の引数: $1。使い方: create-root-body.sh --root <n> --granularity <Nh>" ;;
  esac
done
[[ "${ROOT_NUMBER}" =~ ^[1-9][0-9]*$ ]] || die 1 "--root（ROOT_NUMBER）は正整数で指定してください。"
[[ "${GRANULARITY}" =~ ^[1-9][0-9]*h$ ]] || die 1 "--granularity（GRANULARITY）は正整数+h 形式（例: 2h）で指定してください。"

# gh・jq の欠落はライブラリ読み込み失敗と区別して前提不備（exit 2）にする
command -v gh >/dev/null 2>&1 || die 2 "gh が見つかりません。"
command -v jq >/dev/null 2>&1 || die 2 "jq が見つかりません。"
# shellcheck source=tree-lib.sh
source "$(dirname "${BASH_SOURCE[0]}")/tree-lib.sh" 2>/dev/null \
  || die 2 "tree-lib.sh を読み込めません。"

# trap を mktemp より先に登録する（2 回目以降の mktemp 失敗でも作成済みファイルを削除するため）
BODY_FILE=''; SUMMARY_FILE=''; DETAIL_FILE=''
trap 'rm -f "${BODY_FILE}" "${SUMMARY_FILE}" "${DETAIL_FILE}"' EXIT
BODY_FILE=$(mktemp) && SUMMARY_FILE=$(mktemp) && DETAIL_FILE=$(mktemp) \
  || die 1 "一時ファイルを作成できません。中止します。"

PHASES=$(list_subs "${ROOT_NUMBER}") \
  || die 1 "ルート #${ROOT_NUMBER} の sub-issues を取得できません。中止します。"
PHASE_COUNT=$(printf '%s' "${PHASES}" | jq 'length')
[ "${PHASE_COUNT}" -ge 1 ] \
  || die 1 "ルート #${ROOT_NUMBER} 直下に Phase 親がありません。中止します。"

for i in $(seq 0 $((PHASE_COUNT - 1))); do
  PNUM=$(printf '%s' "${PHASES}" | jq -r --argjson i "${i}" '.[$i].number')
  PTITLE=$(printf '%s' "${PHASES}" | jq -r --argjson i "${i}" ".[\$i].title | ${CELL}")
  # Phase 番号は位置（i + 1）で採番しない。--phase 2 等の部分起票では最初の親が Phase 2 になるため、
  # Step 4 で付与した phase:N ラベルから取得する（無ければ title の feat(phase-N): から取得）。
  # どちらからも決められなければ誤記録せず中止する（fail-closed）
  PNO=$(printf '%s' "${PHASES}" | jq -r --argjson i "${i}" '.[$i] as $p
    | ([$p.labels[]?.name | select(test("^phase:[0-9]+$")) | sub("^phase:"; "")][0]
        // ($p.title | capture("^feat\\(phase-(?<n>[0-9]+)\\):").n) // empty)') \
    || PNO=''
  [[ "${PNO}" =~ ^[0-9]+$ ]] \
    || die 1 "Phase 親 #${PNUM} の Phase 番号（phase:N ラベル / タイトル）を決定できません。中止します。"
  CHILDREN=$(list_subs "${PNUM}") \
    || die 1 "Phase 親 #${PNUM} の sub-issues を取得できません。中止します。"
  CHILDREN=$(printf '%s' "${CHILDREN}" | jq '[.[] | select(.state == "open")]')
  DIRECT=$(printf '%s' "${CHILDREN}" | jq 'length')
  TOTAL=${DIRECT}

  {
    printf '\n### Phase %s: %s\n\n' "${PNO}" "${PTITLE}"
    printf '| Issue | タイトル | 分解 |\n|-------|---------|------|\n'
  } >> "${DETAIL_FILE}"

  for j in $(seq 0 $((DIRECT - 1))); do
    [ "${DIRECT}" -ge 1 ] || break
    CNUM=$(printf '%s' "${CHILDREN}" | jq -r --argjson j "${j}" '.[$j].number')
    CTITLE=$(printf '%s' "${CHILDREN}" | jq -r --argjson j "${j}" ".[\$j].title | ${CELL}")
    GRAND_OPEN=$(count_open_desc "${CNUM}") \
      || die 1 "#${CNUM} の子孫を取得できません。中止します。"
    TOTAL=$((TOTAL + GRAND_OPEN))
    if [ "${GRAND_OPEN}" -ge 1 ]; then DECOMP='sub-issue あり'; else DECOMP='-'; fi
    printf '| #%s | %s | %s |\n' "${CNUM}" "${CTITLE}" "${DECOMP}" >> "${DETAIL_FILE}"
  done

  printf '| Phase %s | #%s %s | %s | %s |\n' "${PNO}" "${PNUM}" "${PTITLE}" "${DIRECT}" "${TOTAL}" >> "${SUMMARY_FILE}"
done

{
  printf '<!-- granularity: %s -->\n' "${GRANULARITY}"
  cat <<'BODY_EOF'
## 概要

全 open issue を Phase 別に 1 ツリーへ整理する。各 Phase 親 issue を sub-issues として紐付け。

## Phase 別実装計画

| Phase | 親 issue | 直下 | 総 open 件数 |
|-------|----------|------|-------------|
BODY_EOF
  cat "${SUMMARY_FILE}"
  cat "${DETAIL_FILE}"
  cat <<'BODY_EOF'

## 運用

- 新規 issue は起票時に Phase 親へ紐付ける
- 実行順は sub-issues リスト順が正
- closed 親の下に open issue を残置しない
- implement-issue-tree が post-order DFS で消化可能な構造を維持する
BODY_EOF
} > "${BODY_FILE}"

# プレースホルダー検査（fail-closed）。grep の終了コードは 0=ヒット / 1=なし / 2 以上=失敗。
# 2 以上は「残りなし」へ倒さず検査失敗として中止する
rc=0; grep -qE "${TREE_PLACEHOLDER_RE}" "${BODY_FILE}" || rc=$?
[ "${rc}" -eq 1 ] \
  || die 1 "本文にプレースホルダーが残っている、または検査に失敗した（grep exit ${rc}）。ルート本文は更新しません。"
rc=0; ROWS=$(grep -cE '^\| Phase [0-9]+ \| #[0-9]+ ' "${BODY_FILE}") || rc=$?
{ [ "${rc}" -le 1 ] && [ "${ROWS}" -eq "${PHASE_COUNT}" ]; } \
  || die 1 "Phase 行数（${ROWS:-?}）が Phase 親数（${PHASE_COUNT}）と一致しません。ルート本文は更新しません。"

gh issue edit "${ROOT_NUMBER}" --body-file "${BODY_FILE}" || exit $?
echo "result=updated root=${ROOT_NUMBER} phases=${PHASE_COUNT}"
