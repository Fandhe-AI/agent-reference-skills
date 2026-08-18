#!/usr/bin/env bash
# reassign-sub-issue.sh — 1 件の sub-issue を安全に付け替える（DELETE→POST の 2 段操作を集約）
#
# 呼び出し元: skills/update-issue-tree/SKILL.md Step 3（closed 親下の残置 open issue の付け替え）・
#            Step 4（孤児 issue の再配置。--old-parent を省略して呼ぶ）
#
# 背景: SKILL.md 本文に「DELETE→POST」を素の gh api 呼び出しとして並べる旧方式（PR #295）は、
#       手順書のコードフェンスがブロックごとに独立シェルで実行され得るため、状態変数の受け渡しが
#       構造的に壊れやすかった（DELETE 失敗を検知できず POST へ進む・冪等性判定が実行より後に
#       走る等）。このスクリプトへ切り出すことで単一プロセスに閉じ込め、そのクラスの欠陥を消す
#       （Issue #297 参照）。
#
# 現在の親の解決方法（実装着手前の実測で判明した事実）:
#   GET /repos/{owner}/{repo}/issues/{n} のレスポンスに `parent_issue_url` フィールドが含まれ、
#   対象 issue の現在の親を追加のページング呼び出しなしで直接判別できる（親なしなら null）。
#   これにより「新親配下の全件取得で存在確認する」「旧親配下の全件取得で所属確認する」という
#   listing ベースの冪等性判定は不要になった。冪等性判定・第三の親の検知は、この 1 フィールドの
#   実測値を先に確定させてから分岐する（3.3 節の処理順序どおり、判定を DELETE/POST の実行より
#   必ず先に行う）。--old-parent と実測値が食い違う場合、および --old-parent 省略（孤児として
#   承認）なのに実測では親が居る場合は、承認されていない親子関係を壊さないため exit 6 で
#   fail-closed に停止する（何も変更しない）。呼び出し側は実測した親を改めてユーザーへ提示して
#   承認を取り直したうえで再実行する。実測で親が居ないのに --old-parent が指定された場合だけは、
#   承認された操作の部分集合（DELETE 不要の POST のみ）となり破壊が起きないため警告して続行する。
#
# 使い方:
#   ./reassign-sub-issue.sh --issue <対象 issue 番号> --new-parent <新親 issue 番号> \
#     [--old-parent <旧親 issue 番号>] [--repo <owner/name>]
#
# --repo は対象 issue（--issue）の所在を指す。親（--old-parent / --new-parent）の所在では
# ない。--repo は対象 issue の GET だけでなく DELETE / POST を含む全 API パスを切り替える
# ため、親リポジトリの値を入れると親リポジトリ側の同番号 issue を誤操作する（PR #314 P0）。
#
# cross-repository sub-issue（対象 issue の親が別リポジトリにある場合）は対象外。
# 実測した現在の親が別リポジトリなら exit 2 で fail-closed に停止する（下記参照）。
# exit 2 は gh/jq 不在・未認証・issue 取得失敗（解消可能な前提不備）とも共有するため、
# このケースだけ stderr に `reason=cross-repository-parent` の安定マーカー行を追加で出す
# （呼び出し側が exit 2 の中で「中断すべきか」「記録して次へ進むべきか」を機械的に判定
# できるようにするため。skills/update-issue-tree/SKILL.md の終了コード表を参照）。
#
# 終了コードと stdout 最終行（result=<state> ...）は skills/update-issue-tree/SKILL.md の
# 「付け替えスクリプトの呼び出し規約」節を正とする。呼び出し側は非ゼロ終了を 1 件も握り潰さず、
# 完了レポートの「要確認事項」へ記載すること。
#
# 前提:
#   - gh CLI がインストールされ認証済みであること
#   - カレントディレクトリがリポジトリ内であること（--repo 省略時、gh の {owner}/{repo} 展開に依存）

set -euo pipefail

NUM_RE='^[1-9][0-9]*$'
REPO_RE='^[A-Za-z0-9._-]+/[A-Za-z0-9._-]+$'

usage() {
  cat >&2 <<'EOF'
使い方: reassign-sub-issue.sh --issue <n> --new-parent <n> [--old-parent <n>] [--repo <owner/name>]
  --repo は対象 issue（--issue）の所在。親（--old-parent / --new-parent）の所在ではない。
EOF
}

ISSUE=""
NEW_PARENT=""
OLD_PARENT=""
REPO_ARG=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --issue|--new-parent|--old-parent|--repo)
      # 各フラグは値を 1 つ取る名前付き引数。位置引数にしない理由: 中央の引数が
      # 省略可という形は、旧親省略のつもりが新親の位置にずれる取り違えを招き、
      # 別 issue の親子関係を破壊する事故につながる（計画 3.1 参照）
      if [[ $# -lt 2 ]]; then
        echo "エラー: $1 には値が必要" >&2
        usage
        exit 1
      fi
      case "$1" in
        --issue) ISSUE="$2" ;;
        --new-parent) NEW_PARENT="$2" ;;
        --old-parent) OLD_PARENT="$2" ;;
        --repo) REPO_ARG="$2" ;;
      esac
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "エラー: 不明な引数 $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "${ISSUE}" || -z "${NEW_PARENT}" ]]; then
  echo "エラー: --issue と --new-parent は必須" >&2
  usage
  exit 1
fi

if ! [[ "${ISSUE}" =~ ${NUM_RE} ]]; then
  echo "エラー: --issue は正の整数で指定する（例: 42）" >&2
  exit 1
fi
if ! [[ "${NEW_PARENT}" =~ ${NUM_RE} ]]; then
  echo "エラー: --new-parent は正の整数で指定する（例: 42）" >&2
  exit 1
fi
if [[ -n "${OLD_PARENT}" ]] && ! [[ "${OLD_PARENT}" =~ ${NUM_RE} ]]; then
  echo "エラー: --old-parent は正の整数で指定する（例: 42）" >&2
  exit 1
fi

# 自己参照（--new-parent が --issue と同一）は API を 1 件も叩かずに確定できる純粋な
# 引数の誤り。DELETE を撃つ前に潰す事前検証の一種だが、他の検証（新親の存在・同一リポ
# ジトリ）と異なり gh 呼び出しを要しないため、ここ（引数検証ブロック）に置く（Issue #333）
if [[ "${NEW_PARENT}" == "${ISSUE}" ]]; then
  echo "エラー: --new-parent に --issue 自身は指定できない（自己参照）" >&2
  exit 1
fi

if [[ -n "${REPO_ARG}" ]]; then
  if ! [[ "${REPO_ARG}" =~ ${REPO_RE} ]]; then
    echo "エラー: --repo は owner/name 形式で指定する" >&2
    exit 1
  fi
  # gh api に -R フラグは無いため、検証済みの owner/name を全 API パスへそのまま埋め込む。
  # ここで REPO_PATH を一度だけ確定し、以降は必ずこの変数経由で組み立てる
  # （取り違えると黙って別リポを操作する）
  REPO_PATH="${REPO_ARG}"
else
  # gh api の {owner}/{repo} は gh 自身が cwd の git remote から解決するプレースホルダ
  REPO_PATH="{owner}/{repo}"
fi

if ! command -v gh &> /dev/null; then
  echo "エラー: gh CLI がインストールされていません" >&2
  exit 2
fi

if ! command -v jq &> /dev/null; then
  echo "エラー: jq がインストールされていません" >&2
  exit 2
fi

if ! gh auth status &> /dev/null; then
  echo "エラー: gh CLI が認証されていません。gh auth login を実行してください" >&2
  exit 2
fi

# result=<state> issue=<n> new_parent=<n> old_parent=<n|-> の形式で最終行を出す。
# SKILL.md 側はこの 1 行から完了レポートの内訳（付け替え N 件 / 孤児の再配置 N 件）を集計する
emit_result() {
  local state="$1"
  local old_parent_out="${2:--}"
  echo "result=${state} issue=${ISSUE} new_parent=${NEW_PARENT} old_parent=${old_parent_out}"
}

# JSON を jq でパースする GET 呼び出しは stdout/stderr を分離して取得する（2>&1 で
# マージすると、gh が stderr へ何か出力しただけで JSON パースが壊れ、本来成功している
# 呼び出しが偽陽性で中断する。エラー本文の表示用途は err ファイル側に閉じ込める）
GH_ERR_FILE=$(mktemp)
trap 'rm -f "${GH_ERR_FILE}"' EXIT

# 対象 issue の database id（sub_issues API が要求する識別子。issue 番号ではない）と
# 現在の親を 1 回の GET で確定する
if ! ISSUE_JSON=$(gh api "repos/${REPO_PATH}/issues/${ISSUE}" 2>"${GH_ERR_FILE}"); then
  echo "エラー: イシュー #${ISSUE} の取得に失敗した" >&2
  cat "${GH_ERR_FILE}" >&2
  # gh api は失敗時も stdout に詳細なエラー本文（JSON）を返すことがある。
  # stderr の簡潔なメッセージだけでは診断情報が失われるため、stdout 側に
  # 内容があれば併せて表示する（ISSUE_JSON は失敗時も stdout 由来の値を保持する）
  if [[ -n "${ISSUE_JSON:-}" ]]; then
    echo "${ISSUE_JSON}" >&2
  fi
  exit 2
fi

ISSUE_ID=$(printf '%s' "${ISSUE_JSON}" | jq -r '.id')
if ! [[ "${ISSUE_ID}" =~ ^[0-9]+$ ]]; then
  echo "エラー: イシュー #${ISSUE} の database id を解決できない" >&2
  exit 2
fi

# 対象リポジトリの同定に使う。事前判定と事後確認の双方が参照するため、親の有無に関わらず
# ここで一度だけ解決する（--repo 省略時の REPO_PATH は {owner}/{repo} プレースホルダのため
# 比較に使えない。対象 issue 自身の repository_url なら追加の API 呼び出しも要らない）
SELF_REPO_URL=$(printf '%s' "${ISSUE_JSON}" | jq -r '.repository_url // empty')
if [[ -z "${SELF_REPO_URL}" ]]; then
  echo "エラー: イシュー #${ISSUE} の repository_url を解決できない" >&2
  exit 2
fi

PARENT_URL=$(printf '%s' "${ISSUE_JSON}" | jq -r '.parent_issue_url // empty')
CURRENT_PARENT=""
if [[ -n "${PARENT_URL}" ]]; then
  # sub-issue はリポジトリを跨いで紐付けられる。parent_issue_url は
  # https://api.github.com/repos/<owner>/<repo>/issues/<n> の形で親の owner/repo を含むため、
  # 番号だけを取り出すと (a) 別リポの親に対して本リポ宛の DELETE を撃って失敗する
  # (b) 番号が偶然 --new-parent と一致すると already-attached と誤判定する、の 2 つが起きる。
  # 対象リポジトリの同定には、追加の API を叩かずに済む対象 issue 自身の repository_url を使う
  # （--repo 省略時の REPO_PATH は {owner}/{repo} プレースホルダのため比較に使えない）。
  if [[ "${PARENT_URL%/issues/*}" != "${SELF_REPO_URL}" ]]; then
    # cross-repository sub-issue はスキルの契約として対象外（SKILL.md 前提条件を参照。
    # Issue #332）。親リポジトリへの書き込みは本スキルの前提条件（対象リポジトリへの
    # 書き込み権限）の外側にあるため、誤ったリポジトリへ DELETE を撃つ前に
    # fail-closed で停止する
    echo "エラー: 現在の親が別リポジトリにある（${PARENT_URL}）。本スクリプトは同一リポジトリ内の付け替えのみを扱う" >&2
    # --repo を親リポジトリへ変えて再実行する案内はしない。--repo は親の所在だけでなく
    # 対象 issue の GET / DELETE / POST を含む全 API パスを切り替えるため、親リポジトリに
    # 同番号の無関係な issue があるとそれを操作してしまう
    echo "対処: 親リポジトリ側で手動で取り外してから再実行する（本スクリプトでは対応しない）" >&2
    # exit 2 は gh/jq 不在・未認証・issue 取得失敗（解消可能）とこのケース（恒久的に
    # 対象外）の両方で使われ、終了コード単独では呼び出し側が区別できない（Issue #335
    # codex-review 指摘）。人間可読メッセージの文言に依存させず機械可読に判定できるよう、
    # stderr に安定したマーカー行を出す。SKILL.md の終了コード表・Step 3/4 はこの行の
    # 有無で (a) 解消可能な前提不備 / (b) 恒久的な対象外を判定する
    echo "reason=cross-repository-parent" >&2
    exit 2
  fi
  CURRENT_PARENT=$(printf '%s' "${PARENT_URL}" | grep -oE '[0-9]+$' || true)
fi

if [[ -n "${OLD_PARENT}" && -z "${CURRENT_PARENT}" ]]; then
  # --old-parent 指定時に実測した現在の親が空（孤児）の非対称ケース。承認された操作
  # （旧親から外して新親へ付ける）の部分集合であり、承認外の親子関係を壊さないため続行する。
  # ただし不整合の事実は伏せない
  echo "警告: 指定された --old-parent #${OLD_PARENT} に反し、実測した現在の親は無い（孤児）。POST のみを実行する" >&2
fi

# 冪等性判定を DELETE/POST の実行より先に確定する（#295 で「判定が実行より後で 1 巡遅れる」と
# 指摘された欠陥の回避）。既に新親配下なら DELETE も POST も撃たない
if [[ "${CURRENT_PARENT}" == "${NEW_PARENT}" ]]; then
  emit_result "already-attached" "${CURRENT_PARENT}"
  exit 0
fi

# 承認境界のガード（fail-closed）。呼び出し側（SKILL.md Step 2）はユーザーへ「#X から #Y へ
# 付け替える」と提示して承認を得ている。実測した現在の親がその承認内容と食い違う場合、
# ここで DELETE を撃つと**承認されていない親子関係を壊す**ため、何も変更せずに停止する。
# 状態が動いていた場合は、実測した親を改めてユーザーへ提示して承認を取り直す（PR #314 codex P1）
if [[ -n "${CURRENT_PARENT}" ]]; then
  if [[ -z "${OLD_PARENT}" ]]; then
    echo "エラー: 孤児として指定されたが、実測では #${CURRENT_PARENT} 配下にある。承認外の親子関係を壊さないため中止する" >&2
    echo "対処: 現在の親 #${CURRENT_PARENT} をユーザーへ提示して承認を得たうえで --old-parent ${CURRENT_PARENT} を付けて再実行する" >&2
    exit 6
  elif [[ "${OLD_PARENT}" != "${CURRENT_PARENT}" ]]; then
    echo "エラー: 実測した現在の親 #${CURRENT_PARENT} が指定された --old-parent #${OLD_PARENT} と異なる。承認外の親子関係を壊さないため中止する" >&2
    echo "対処: 現在の親 #${CURRENT_PARENT} をユーザーへ提示して承認を得たうえで --old-parent ${CURRENT_PARENT} で再実行する" >&2
    exit 6
  fi
fi

# 新親の事前検証（DELETE を撃つ前の最後の関門）。ここまでの分岐（already-attached・
# 承認境界ガード）は既に通過しており、この先は必ず DELETE または POST を伴う。新親が
# 存在しない・別リポジトリにある場合、DELETE だけ成功して POST が失敗すると対象 issue が
# 孤児化する（不可逆）ため、DELETE の**前**に新親を GET して判定する（Issue #333 AC1/AC2）。
# 孤児経路（CURRENT_PARENT が空、DELETE を伴わない）にも通す。DELETE が無いため孤児化
# リスク自体は無いが、「事前に判定できる拒否条件は必ず無変更で終端する」契約を経路によらず
# 統一するため（SKILL.md 参照）
if ! NEW_PARENT_JSON=$(gh api "repos/${REPO_PATH}/issues/${NEW_PARENT}" 2>"${GH_ERR_FILE}"); then
  echo "エラー: 新親 #${NEW_PARENT} の取得に失敗した（存在しない番号の可能性）" >&2
  cat "${GH_ERR_FILE}" >&2
  if [[ -n "${NEW_PARENT_JSON:-}" ]]; then
    echo "${NEW_PARENT_JSON}" >&2
  fi
  exit 2
fi

NEW_PARENT_REPO_URL=$(printf '%s' "${NEW_PARENT_JSON}" | jq -r '.repository_url // empty')
if [[ -z "${NEW_PARENT_REPO_URL}" ]]; then
  echo "エラー: 新親 #${NEW_PARENT} の repository_url を解決できない" >&2
  exit 2
fi

if [[ "${NEW_PARENT_REPO_URL}" != "${SELF_REPO_URL}" ]]; then
  # 既存の旧親側 cross-repo ガード（現 L184 相当）と同じ完全一致比較。転送済み issue は
  # GET がリダイレクトされ別リポジトリのレスポンスを返すため、レスポンス側の実測値でしか
  # 判定できない（--repo 等の静的な値からは導けない）
  echo "エラー: 新親 #${NEW_PARENT} が別リポジトリにある（${NEW_PARENT_REPO_URL}）。本スクリプトは同一リポジトリ内の付け替えのみを扱う" >&2
  # --repo を新親リポジトリへ変えて再実行する案内はしない。--repo は対象 issue の
  # GET/DELETE/POST を含む全 API パスを切り替えるため、同番号の無関係な issue を
  # 操作させる危険な案内になる（PR #314 codex P0 の再発防止と同じ理由）
  exit 2
fi

# 新親が Pull Request でないことを確認する。GitHub の `GET /repos/{o}/{r}/issues/{n}` は
# **PR も返す**（issue と PR は番号空間を共有し、PR のレスポンスには `.pull_request` が付く）。
# そのため --new-parent に PR 番号を渡すと、直前の存在確認も同一リポジトリ確認も通過して
# しまう。旧親がある経路ではこの後 DELETE が成功したうえで sub_issues への POST が失敗し、
# 対象 issue が旧親から外れたまま新親にも付かない部分変更（実害は exit 8 相当）に陥る。
# これは本スクリプトが予防対象としている孤児化そのものであり、判別に使う `.pull_request` は
# 既に取得済みの NEW_PARENT_JSON に含まれているため追加の API 呼び出しなしで弾ける。
if printf '%s' "${NEW_PARENT_JSON}" | jq -e 'has("pull_request")' >/dev/null 2>&1; then
  echo "エラー: 新親 #${NEW_PARENT} は issue ではなく Pull Request である。sub-issue の親には指定できない" >&2
  echo "対処: 親として使う issue の番号を指定して再実行する（issue と PR は番号空間を共有するため取り違えやすい）" >&2
  exit 2
fi

if [[ -z "${CURRENT_PARENT}" ]]; then
  # 孤児（どの親にも属していない）: DELETE を飛ばして POST のみ
  if ! POST_OUT=$(gh api --method POST "repos/${REPO_PATH}/issues/${NEW_PARENT}/sub_issues" -F "sub_issue_id=${ISSUE_ID}" 2>&1); then
    echo "${POST_OUT}" >&2
    if printf '%s' "${POST_OUT}" | grep -qi "only have one parent"; then
      # 事前の実測では孤児だったが POST 時点で別の親が付いていたレース。DELETE は 1 度も
      # 撃っていないため**ツリーは無変更**。exit 6（承認不一致・無変更）とは区別する
      echo "エラー: POST 時点で別の親が付いていた（レース）。DELETE は実行していないためツリーは無変更" >&2
      exit 7
    fi
    exit 4
  fi
else
  # DELETE のパスは単数形 sub_issue（複数形 sub_issues を渡すと 404 になり、旧親から
  # 外れないまま POST して「Sub issue may only have one parent」で必ず失敗する。GitHub 側の
  # 仕様上の単複非対称。POST 側は複数形 sub_issues のまま）
  if ! DEL_OUT=$(gh api --method DELETE "repos/${REPO_PATH}/issues/${CURRENT_PARENT}/sub_issue" -F "sub_issue_id=${ISSUE_ID}" 2>&1); then
    echo "エラー: 旧親 #${CURRENT_PARENT} からの取り外しに失敗した" >&2
    echo "${DEL_OUT}" >&2
    # DELETE 失敗時は POST へ絶対に進まない（#295 で「DELETE 失敗検知なしに POST へ進む」と
    # 指摘された欠陥の回避。fail-closed）
    exit 3
  fi

  if ! POST_OUT=$(gh api --method POST "repos/${REPO_PATH}/issues/${NEW_PARENT}/sub_issues" -F "sub_issue_id=${ISSUE_ID}" 2>&1); then
    echo "エラー: 新親 #${NEW_PARENT} への紐付けに失敗した" >&2
    echo "${POST_OUT}" >&2
    if printf '%s' "${POST_OUT}" | grep -qi "only have one parent"; then
      # DELETE と POST の間に第三者が親を付け替えた等のレース。**DELETE は成功済み**のため
      # ツリーは部分変更（旧親から外れ、新親にも付いていない）。無変更を意味する
      # exit 6 / exit 7 と混同すると誤った復旧をされるため専用コードにする
      echo "エラー: DELETE 後の POST 時点で別の親が付いていた（レース）。#${ISSUE} は #${CURRENT_PARENT} から外れた状態で残っている" >&2
      echo "対処: 実状態を確認し、必要なら手で紐付け直す。同一コマンドの再実行では回復しない" >&2
      exit 8
    fi
    exit 4
  fi
fi

# 事後確認は必ず取り直す。DELETE/POST 前に取得した ISSUE_JSON を使い回さない
# （#295 の「スナップショットの追記型再利用による汚染」の回避）
if ! VERIFY_JSON=$(gh api "repos/${REPO_PATH}/issues/${ISSUE}" 2>"${GH_ERR_FILE}"); then
  echo "エラー: 事後確認のための再取得に失敗した" >&2
  cat "${GH_ERR_FILE}" >&2
  if [[ -n "${VERIFY_JSON:-}" ]]; then
    echo "${VERIFY_JSON}" >&2
  fi
  exit 5
fi

VERIFY_PARENT_URL=$(printf '%s' "${VERIFY_JSON}" | jq -r '.parent_issue_url // empty')
VERIFY_PARENT=""
if [[ -n "${VERIFY_PARENT_URL}" ]]; then
  # 事前判定と同じくリポジトリ部分まで照合する。番号だけを見ると、POST 後の競合で対象が
  # 別リポジトリの同番号 issue（例: other/repo#7）へ移されていても VERIFY_PARENT == NEW_PARENT
  # となり、誤ったツリー状態を成功として報告してしまう
  if [[ "${VERIFY_PARENT_URL%/issues/*}" != "${SELF_REPO_URL}" ]]; then
    echo "エラー: 事後確認で対象が別リポジトリの親配下にある（${VERIFY_PARENT_URL}）。新親 #${NEW_PARENT} への紐付けは成立していない" >&2
    echo "対処: 実状態を手で確認する" >&2
    exit 5
  fi
  VERIFY_PARENT=$(printf '%s' "${VERIFY_PARENT_URL}" | grep -oE '[0-9]+$' || true)
fi

if [[ "${VERIFY_PARENT}" != "${NEW_PARENT}" ]]; then
  echo "エラー: 事後確認で新親 #${NEW_PARENT} 配下に見つからない（実測 parent=#${VERIFY_PARENT:-なし}）" >&2
  exit 5
fi

if [[ -z "${CURRENT_PARENT}" ]]; then
  emit_result "posted-only" "-"
else
  emit_result "reassigned" "${CURRENT_PARENT}"
fi
exit 0
