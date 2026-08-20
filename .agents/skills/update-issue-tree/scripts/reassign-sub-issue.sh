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

# 実測で期待した親配下に見えた場合でも、DELETE/POST の反映遅延による過渡状態を見ている
# 可能性を排除できない。短い間隔を空けて再取得し、2 回連続で同じ結果が得られて初めて
# 安定した状態として確定する（codex-review P1 指摘 PR #391）。呼び出し文脈が異なる複数箇所
# （補償 POST 前の孤児観測の安定確認 / 補償 POST 失敗直後の確認 / 実測で既に旧親配下だった
# 場合の確認 / 新親への偽陰性確認）で同一ロジックが必要になるため共通化した。孤児観測の
# 安定確認は expected="" を渡すことで「2 回連続で親なしが観測できるか」を同じ関数で判定
# する（cursor[bot] Medium 指摘「Orphan restore skips stability check」）。期待どおりで
# 安定確認できれば戻り値 0（stdout 出力なし）。
# 期待値とは異なるが実測が本来の新親 #NEW_PARENT だった場合は戻り値 2 とし、情報行のみ
# stderr へ出す（呼び出し元はこれを「元の POST が偽陰性で実際には成功していた」ことを
# 意味する成功終端として扱う。cursor[bot] Medium 指摘 PR #391 — 旧親への復旧確認・偽陰性
# 確認のいずれでも、実測が新親であることを第三者による割り込みと誤ラベルしていた）。
# それ以外の不一致（第三者の別親・孤児への転落）は戻り値 1 とし、原因を stderr へ出力する
# （呼び出し元は exit 8 で終端する）。
# 引数 $1: ログメッセージに使う文脈ラベル（例: "補償復旧後の確認"） 引数 $2: 期待する親 issue 番号
confirm_stable_parent() {
  local label="$1"
  local expected="$2"
  # 待機秒数は使用前に非負整数へ検証し、sleep の失敗も捕捉する — set -e 下で無条件実行すると、
  # 不正値・実行失敗の非 0 終了が呼び出し元の exit 8 / reason=recovery-state-unknown への変換より
  # 先にスクリプトを即終了させ、終了コード契約外の exit 1 になるため（codex-review P1 指摘
  # PR #391）。検証・実行の失敗は状態不明（return 1）として既存の fail-closed 経路へ流す
  # 上限 60 秒: 非負整数の検証だけでは、継承環境の極端な値（例: 999999999）で sleep が
  # 事実上停止し、DELETE 済みの部分変更状態を報告できないまま処理が止まる（codex-review
  # P1 指摘 PR #391 第 4 ラウンド）。再確認待機に 60 秒超の値は運用上あり得ないため、
  # 範囲外は状態不明（return 1）の fail-closed 経路へ流す
  # 検証は算術比較ではなく文字列表現（最大 2 桁）で行う — `18446744073709551616` のような
  # 巨大な数字列は Bash の算術比較で整数オーバーフローし `> 60` の上限検証を素通りするため
  # （codex-review P1 指摘 PR #391 第 5 ラウンド）。2 桁以内へ字句で制限すればオーバーフロー
  # 経路そのものが存在しない
  local recheck_delay="${RECOVERY_RECHECK_DELAY_SEC:-2}"
  if ! [[ "${recheck_delay}" =~ ^[0-9]{1,2}$ ]] || (( recheck_delay > 60 )); then
    echo "エラー: RECOVERY_RECHECK_DELAY_SEC が 0〜60 の整数でない（値: ${recheck_delay}）。${label}を実施できず状態不明のまま終端する" >&2
    return 1
  fi
  if ! sleep "${recheck_delay}"; then
    echo "エラー: ${label}のための待機（sleep ${recheck_delay}）に失敗した。状態不明のまま終端する" >&2
    return 1
  fi
  local recheck_json
  if ! recheck_json=$(gh api "repos/${REPO_PATH}/issues/${ISSUE}" 2>"${GH_ERR_FILE}"); then
    echo "エラー: ${label}のための再取得に失敗した。#${ISSUE} が #${expected} 配下で安定しているか未確認のまま終端する" >&2
    cat "${GH_ERR_FILE}" >&2
    return 1
  fi
  # 同一リポジトリ判定は「親の存在判定」から分離する（cursor[bot] Medium 指摘 PR #391。
  # cross-repo 判定時のみ recheck_parent を空にすると、実際には別リポジトリの
  # 第三者親配下にあるのに「実測 parent=なし」＝孤児と誤報する）
  local recheck_parent_url recheck_parent recheck_same_repo=1
  # jq 解析は set -e で即終了させず明示捕捉する — GET が終了コード 0 でも空・不正 JSON を
  # 返した場合、素の代入だと契約外の exit 1 で終端するため（codex-review P1 指摘 PR #391）
  if ! recheck_parent_url=$(printf '%s' "${recheck_json}" | jq -r '.parent_issue_url // empty'); then
    echo "エラー: ${label}の応答 JSON を解析できない。#${ISSUE} が #${expected} 配下で安定しているか未確認のまま終端する" >&2
    return 1
  fi
  recheck_parent=""
  if [[ -n "${recheck_parent_url}" ]]; then
    recheck_parent=$(printf '%s' "${recheck_parent_url}" | grep -oE '[0-9]+$' || true)
    # 「URL なし（孤児）」と「URL はあるが番号を抽出できない（解析不能）」を区別する。
    # 後者を空のまま通すと孤児と誤認され、実際には親が存在し得る状態で後続の書き込みを
    # 許してしまう（codex-review P1 指摘 PR #391。fail-open）
    if [[ -z "${recheck_parent}" ]]; then
      echo "エラー: ${label}の parent_issue_url から親 issue 番号を抽出できない（解析不能な応答形式）。#${ISSUE} の親子状態は未確認のまま終端する" >&2
      return 1
    fi
    if [[ "${recheck_parent_url%/issues/*}" != "${SELF_REPO_URL}" ]]; then
      recheck_same_repo=0
    fi
  fi
  if [[ "${recheck_same_repo}" -eq 1 && "${recheck_parent}" == "${expected}" ]]; then
    return 0
  fi
  if [[ "${expected}" != "${NEW_PARENT}" && "${recheck_same_repo}" -eq 1 && "${recheck_parent}" == "${NEW_PARENT}" ]]; then
    echo "情報: ${label}で期待した #${expected} ではなく本来の新親 #${NEW_PARENT} 配下にあることが判明した（元の POST が偽陰性で実際には成功していた可能性）" >&2
    return 2
  fi
  if [[ -n "${recheck_parent}" ]]; then
    local recheck_scope
    if [[ "${recheck_same_repo}" -eq 1 ]]; then
      recheck_scope="同一リポジトリの #${recheck_parent}"
    else
      recheck_scope="別リポジトリの ${recheck_parent_url}"
    fi
    echo "エラー: ${label}で期待した #${expected} 配下ではなく ${recheck_scope} 配下だった（第三者が付け替えた可能性）。復旧成立とはみなさず停止する" >&2
  else
    echo "エラー: ${label}で期待した #${expected} 配下から外れていた（実測 parent=なし）。直前の読み取りは反映前の過渡状態だった可能性が高く、復旧成立とはみなさず停止する" >&2
  fi
  return 1
}

# DELETE 成功後の POST 失敗（旧親から外れ新親にも付かない部分変更）に対する補償復旧
# （Issue #352）。#333 は「事前に判定できる拒否条件」を DELETE 前に潰したが、DELETE と
# POST の間のレース・一時的な 5xx は事前判定できない残余として残っていた。ここで諦めて
# exit すると孤児化が確定するため、実状態を再取得してから安全に判断できる範囲でのみ
# 旧親へ戻す。呼び出し元（DELETE 経路の POST 失敗ブロック）は必ず ISSUE / NEW_PARENT /
# CURRENT_PARENT / ISSUE_ID / REPO_PATH / SELF_REPO_URL / GH_ERR_FILE / POST_OUT を
# 設定済みの状態でこの関数を呼ぶ。関数は必ず exit するため呼び出し元へは戻らない
recover_after_post_failure() {
  if printf '%s' "${POST_OUT}" | grep -qi "only have one parent"; then
    # メッセージ文字列は GitHub 側の表現変更に追随できず脆いため、分岐の根拠にはしない。
    # 「第三者による付け替えの可能性が高い」というヒントに格下げし、実測値で確定させる
    echo "情報: エラーメッセージから第三者による付け替えの可能性が示唆されている（実測値で確定させる）" >&2
  fi

  if ! RECOVERY_JSON=$(gh api "repos/${REPO_PATH}/issues/${ISSUE}" 2>"${GH_ERR_FILE}"); then
    echo "エラー: 復旧のための実状態再取得に失敗した。#${ISSUE} は #${CURRENT_PARENT} から外れたまま孤児で残っている可能性がある" >&2
    cat "${GH_ERR_FILE}" >&2
    # 状態不明のまま補償 POST を撃つと、実は既に別の親が付いている場合に承認外の
    # 親子関係を壊しかねない。fail-closed のため補償を試みずに終端する
    echo "reason=recovery-state-unknown" >&2
    exit 8
  fi

  local recovery_parent_url recovery_parent recovery_same_repo=1
  # jq 解析失敗は状態不明として exit 8 へ統一する（codex-review P1 指摘 PR #391。素の代入だと
  # set -e で契約外の exit 1 になり、DELETE 済みの部分変更が残ったことが呼び出し元へ伝わらない）
  if ! recovery_parent_url=$(printf '%s' "${RECOVERY_JSON}" | jq -r '.parent_issue_url // empty'); then
    echo "エラー: 復旧のための実状態応答 JSON を解析できない。#${ISSUE} の親子状態は未確認" >&2
    echo "reason=recovery-state-unknown" >&2
    exit 8
  fi
  recovery_parent=""
  if [[ -n "${recovery_parent_url}" ]]; then
    recovery_parent=$(printf '%s' "${recovery_parent_url}" | grep -oE '[0-9]+$' || true)
    # 非空 URL から番号を抽出できない場合は孤児と誤認せず状態不明で停止する（codex-review
    # P1 指摘 PR #391。空のまま通すと孤児分岐へ入り、実際には親が存在し得る状態で旧親への
    # 補償 POST という承認外の書き込みを実行してしまう fail-open）
    if [[ -z "${recovery_parent}" ]]; then
      echo "エラー: parent_issue_url から親 issue 番号を抽出できない（解析不能な応答形式: ${recovery_parent_url}）。#${ISSUE} の親子状態は未確認" >&2
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi
    if [[ "${recovery_parent_url%/issues/*}" != "${SELF_REPO_URL}" ]]; then
      recovery_same_repo=0
    fi
  fi

  if [[ "${recovery_same_repo}" -eq 1 && "${recovery_parent}" == "${NEW_PARENT}" ]]; then
    # POST は偽陰性だった可能性がある（応答は失敗扱いでも実際には成立していたかも
    # しれない）。ただしこの 1 回の読み取りだけでは DELETE/POST の反映遅延による
    # 過渡状態を見ている可能性を排除できない。他の成功判定経路と非対称に即時確定
    # させず、共通関数で安定確認してから成功終端する（codex-review P1 指摘 PR #391。
    # CI 失敗の直接原因）
    local rfp_rc=0
    confirm_stable_parent "復旧確認での新親偽陰性確認" "${NEW_PARENT}" || rfp_rc=$?
    if [[ "${rfp_rc}" -eq 0 ]]; then
      # 本来の目的（新親への付け替え）は達成済みのため、通常の成功終端と同じ扱いにする
      emit_result "reassigned" "${CURRENT_PARENT}"
      exit 0
    fi
    echo "reason=recovery-state-unknown" >&2
    exit 8
  fi

  if [[ "${recovery_same_repo}" -eq 1 && -z "${recovery_parent}" ]]; then
    # 実測でも孤児（想定どおり DELETE のみ成立し POST が未達）に見える。ただしこの
    # 1 回の読み取りだけでは DELETE/POST の反映遅延による過渡状態を見ている可能性を
    # 排除できず、他の分岐（新親偽陰性確認・旧親配下の再確認）は書き込み前に必ず
    # confirm_stable_parent で安定確認しているのに対し、ここだけは単発の観測を信頼して
    # 即座に補償 POST という書き込みを実行していた（cursor[bot] Medium 指摘「Orphan
    # restore skips stability check」）。expected="" は「親なし（孤児）」を表し、
    # confirm_stable_parent は 2 回連続で親なしが観測できて初めて 0 を返す
    local orc_rc=0
    confirm_stable_parent "孤児観測の安定確認（補償 POST 前）" "" || orc_rc=$?
    if [[ "${orc_rc}" -eq 2 ]]; then
      # 安定確認中に本来の新親 #NEW_PARENT への遅延反映が見えた（元の POST の偽陰性が
      # ここで確定した。cursor[bot] Medium 指摘 PR #391 と同種の経路）
      emit_result "reassigned" "${CURRENT_PARENT}"
      exit 0
    elif [[ "${orc_rc}" -ne 0 ]]; then
      # 安定確認できない（第三者が別親を設定・応答解析不能・再取得失敗等）。孤児と
      # 断定して補償 POST という書き込みを行うと、実際には別の親が付いている場合に
      # 承認外の親子関係を壊しかねないため、書き込まずに状態不明として終端する
      # （fail-closed）
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi

    # 実測でも孤児（想定どおり DELETE のみ成立し POST が未達）と安定確認できた。
    # 承認済みの操作の逆操作（旧親へ戻す）は承認範囲内であるため、ここでのみ補償 POST を撃つ
    if ! COMP_POST_OUT=$(gh api --method POST "repos/${REPO_PATH}/issues/${CURRENT_PARENT}/sub_issues" -F "sub_issue_id=${ISSUE_ID}" 2>&1); then
      echo "エラー: 旧親 #${CURRENT_PARENT} への補償復旧 POST が失敗した" >&2
      echo "${COMP_POST_OUT}" >&2
      # 補償 POST が失敗したことだけを根拠に「孤児のまま」と断定しない。失敗している間に
      # 第三者が別の親を設定した可能性があるため、実状態を再取得してから正確な内容を
      # 報告する（cursor[bot] Medium 指摘 PR #391。再取得自体が失敗した場合は状態不明の
      # まま孤児と断定せず reason=compensation-post-failed のみで終端する）
      if COMP_FAIL_JSON=$(gh api "repos/${REPO_PATH}/issues/${ISSUE}" 2>"${GH_ERR_FILE}"); then
        # リポジトリ一致は「同一リポジトリの親か」の判定にのみ使い、「親が存在するか」の
        # 判定からは分離する。空でない parent_issue_url は同一・別リポジトリを問わず
        # 「孤児ではない」ことを意味するため、別リポジトリという理由だけで comp_fail_parent
        # を空にすると third-party-parent を見逃し「実測でも孤児」と誤報告してしまう
        # （codex-review P1 指摘 PR #391。CI 失敗の直接原因）
        local comp_fail_parent_url comp_fail_parent comp_fail_same_repo=1
        # jq 解析失敗は状態不明として exit 8 へ統一する（codex-review P1 指摘 PR #391）
        if ! comp_fail_parent_url=$(printf '%s' "${COMP_FAIL_JSON}" | jq -r '.parent_issue_url // empty'); then
          echo "エラー: 補償 POST 失敗後の実状態応答 JSON を解析できない。#${ISSUE} が孤児のままかは未確認" >&2
          echo "reason=recovery-state-unknown" >&2
          exit 8
        fi
        comp_fail_parent=""
        if [[ -n "${comp_fail_parent_url}" ]]; then
          comp_fail_parent=$(printf '%s' "${comp_fail_parent_url}" | grep -oE '[0-9]+$' || true)
          # 非空 URL の番号抽出不能は孤児と誤認せず状態不明で停止する（codex-review P1
          # 指摘 PR #391）
          if [[ -z "${comp_fail_parent}" ]]; then
            echo "エラー: parent_issue_url から親 issue 番号を抽出できない（解析不能な応答形式: ${comp_fail_parent_url}）。#${ISSUE} が孤児のままかは未確認" >&2
            echo "reason=recovery-state-unknown" >&2
            exit 8
          fi
          if [[ "${comp_fail_parent_url%/issues/*}" != "${SELF_REPO_URL}" ]]; then
            comp_fail_same_repo=0
          fi
        fi
        if [[ -n "${comp_fail_parent}" && "${comp_fail_same_repo}" -eq 1 && "${comp_fail_parent}" == "${NEW_PARENT}" ]]; then
          # 補償 POST はエラー応答だったが、実測では本来の新親 #NEW_PARENT に既に付いている。
          # これは元の POST（新親への付け替え）が偽陰性で実際には成功していたことを意味し、
          # 第三者の割り込みではない。下の third-party-parent 分岐で誤ラベルしないよう、
          # 先にこの成功ケースを判定する（cursor[bot] Medium 指摘 PR #391 「New parent
          # misread as failure」）。1 回の読み取りだけでは過渡状態の可能性を排除できないため
          # 共通関数で再確認してから確定する
          echo "情報: 旧親 #${CURRENT_PARENT} への補償復旧 POST はエラー応答だったが、実測では本来の新親 #${NEW_PARENT} に既に付いていた（元の POST が偽陰性だった可能性。反映遅延を考慮し再確認する）" >&2
          local nfp_rc=0
          confirm_stable_parent "補償 POST 失敗後の新親偽陰性確認" "${NEW_PARENT}" || nfp_rc=$?
          if [[ "${nfp_rc}" -eq 0 ]]; then
            emit_result "reassigned" "${CURRENT_PARENT}"
            exit 0
          fi
          echo "reason=recovery-state-unknown" >&2
          exit 8
        fi
        if [[ -n "${comp_fail_parent}" && "${comp_fail_same_repo}" -eq 1 && "${comp_fail_parent}" == "${CURRENT_PARENT}" ]]; then
          # 補償 POST はエラー応答だったが、実測では既に旧親 #CURRENT_PARENT 配下にある
          # （応答が偽陰性だった、または反映が追いついた）。この場合を third-party-parent
          # として報告すると、実際には承認済みの復旧が成立しているのに誤って部分変更・
          # 要確認扱いにしてしまう（cursor[bot] Medium 指摘 PR #391 の逆方向ケース）。
          # ただしこの 1 回の読み取りだけでは、DELETE の反映が遅延しているだけの過渡状態を
          # 見ている可能性を排除できない。その場合、少し後には実際に孤児化するにも
          # かかわらずここで「復旧済み」と確定させると誤報になる（codex-review P1 指摘
          # PR #391。通常の DELETE 経路（下の recovery_parent 分岐）と同じ安定確認を
          # 共通関数で適用し、2 回連続で旧親配下が観測できて初めて確定する）
          echo "情報: 旧親 #${CURRENT_PARENT} への補償復旧 POST はエラー応答だったが、実測では既に旧親配下に復旧していた（応答が偽陰性だった可能性。反映遅延を考慮し再確認する）" >&2
          local cfp_rc=0
          confirm_stable_parent "補償 POST 失敗後の偽陰性確認" "${CURRENT_PARENT}" || cfp_rc=$?
          if [[ "${cfp_rc}" -eq 0 ]]; then
            echo "result=restored issue=${ISSUE} new_parent=${NEW_PARENT} old_parent=${CURRENT_PARENT}"
            exit 10
          elif [[ "${cfp_rc}" -eq 2 ]]; then
            # 反映遅延の再確認で、実は本来の新親 #NEW_PARENT に付いていたことが判明した
            # （元の POST の偽陰性がここで初めて見える経路。cursor[bot] Medium 指摘 PR #391）
            emit_result "reassigned" "${CURRENT_PARENT}"
            exit 0
          fi
          echo "reason=recovery-state-unknown" >&2
          exit 8
        fi
        if [[ -n "${comp_fail_parent}" ]]; then
          local comp_fail_scope
          if [[ "${comp_fail_same_repo}" -eq 1 ]]; then
            comp_fail_scope="同一リポジトリの #${comp_fail_parent}"
          else
            comp_fail_scope="別リポジトリの ${comp_fail_parent_url}"
          fi
          echo "エラー: #${ISSUE} は孤児ではなく、実測では ${comp_fail_scope} 配下にある（補償 POST 失敗の間に第三者が付け替えた可能性）。承認外の親子関係を壊さないためこのまま停止する" >&2
          echo "reason=compensation-post-failed-third-party-parent" >&2
          exit 8
        fi
        echo "エラー: #${ISSUE} は実測でも孤児のまま残っている" >&2
        echo "reason=compensation-post-failed" >&2
        exit 8
      fi
      # 再取得自体が失敗した場合、孤児か否かを一切測定できていない。この分岐を
      # reason=compensation-post-failed で終端すると、呼び出し元が「親子関係を
      # 確認済みの孤児」と誤認しうる（cursor[bot] Medium 指摘 PR #391）。
      # 上の JSON 解析失敗パスと同じ reason=recovery-state-unknown に統一する
      echo "エラー: 補償復旧 POST 失敗後の実状態再取得にも失敗した。#${ISSUE} が孤児のままかは未確認" >&2
      cat "${GH_ERR_FILE}" >&2
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi

    # 補償 POST の成功応答だけを信頼しない。事後確認は必ず取り直す（#295 の設計哲学を
    # 復旧経路にも一貫させる）
    if ! RECOVERY_VERIFY_JSON=$(gh api "repos/${REPO_PATH}/issues/${ISSUE}" 2>"${GH_ERR_FILE}"); then
      echo "エラー: 補償復旧後の確認取得に失敗した" >&2
      cat "${GH_ERR_FILE}" >&2
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi
    # 同一リポジトリ判定は「親の存在判定」から分離する（cursor[bot] Medium 指摘 PR #391。
    # comp_fail_parent と同じ欠陥がここにもあった: cross-repo 判定時のみ rv_parent を
    # 空にすると、実際には別リポジトリの第三者親配下にあるのに「実測 parent=なし」と
    # 誤報し、孤児と紐付いていない状態を「孤児」として報告してしまう）
    local rv_parent_url rv_parent rv_same_repo=1
    # jq 解析失敗は状態不明として exit 8 へ統一する（codex-review P1 指摘 PR #391）
    if ! rv_parent_url=$(printf '%s' "${RECOVERY_VERIFY_JSON}" | jq -r '.parent_issue_url // empty'); then
      echo "エラー: 補償復旧後の確認応答 JSON を解析できない。#${ISSUE} の親子状態は未確認" >&2
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi
    rv_parent=""
    if [[ -n "${rv_parent_url}" ]]; then
      rv_parent=$(printf '%s' "${rv_parent_url}" | grep -oE '[0-9]+$' || true)
      # 非空 URL の番号抽出不能は孤児と誤認せず状態不明で停止する（codex-review P1
      # 指摘 PR #391）
      if [[ -z "${rv_parent}" ]]; then
        echo "エラー: parent_issue_url から親 issue 番号を抽出できない（解析不能な応答形式: ${rv_parent_url}）。#${ISSUE} の親子状態は未確認" >&2
        echo "reason=recovery-state-unknown" >&2
        exit 8
      fi
      if [[ "${rv_parent_url%/issues/*}" != "${SELF_REPO_URL}" ]]; then
        rv_same_repo=0
      fi
    fi
    if [[ "${rv_same_repo}" -eq 1 && "${rv_parent}" == "${NEW_PARENT}" ]]; then
      # 補償 POST は成功応答だったが、事後確認では旧親ではなく本来の新親 #NEW_PARENT に
      # 付いていた。旧親への補償 POST と競合するタイミングで、元の POST の偽陰性が遅れて
      # 反映された可能性がある。第三者の割り込みではなく本来の目的が達成された状態のため、
      # third-party 誤ラベルを避けて成功終端する（cursor[bot] Medium 指摘 PR #391）。
      # ただしこの 1 回の読み取りだけでは反映遅延による過渡状態を排除できないため、他の
      # 成功判定経路と同様に共通関数で安定確認してから確定する（codex-review P1 指摘
      # PR #391。CI 失敗の直接原因）
      echo "情報: 補償復旧後の確認で旧親ではなく本来の新親 #${NEW_PARENT} 配下にあることが判明した（元の POST が偽陰性で実際には成功していた可能性。反映遅延を考慮し再確認する）" >&2
      local pvfp_rc=0
      confirm_stable_parent "補償 POST 成功後の新親偽陰性確認" "${NEW_PARENT}" || pvfp_rc=$?
      if [[ "${pvfp_rc}" -eq 0 ]]; then
        emit_result "reassigned" "${CURRENT_PARENT}"
        exit 0
      fi
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi
    if [[ "${rv_same_repo}" -ne 1 || "${rv_parent}" != "${CURRENT_PARENT}" ]]; then
      if [[ -n "${rv_parent}" ]]; then
        local rv_scope
        if [[ "${rv_same_repo}" -eq 1 ]]; then
          rv_scope="同一リポジトリの #${rv_parent}"
        else
          rv_scope="別リポジトリの ${rv_parent_url}"
        fi
        echo "エラー: 補償復旧後の確認で旧親 #${CURRENT_PARENT} 配下ではなく ${rv_scope} 配下だった（補償復旧と前後して第三者が付け替えた可能性）。状態を手で確認する" >&2
      else
        echo "エラー: 補償復旧後の確認で旧親 #${CURRENT_PARENT} 配下に見つからない（実測 parent=なし）。状態を手で確認する" >&2
      fi
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi

    # 補償 POST の成功応答 + 直後の GET 1 回だけでは、DELETE の反映遅延で旧親配下に
    # 見えている過渡状態を排除できない。直後に孤児化または新親への遅延反映が起きても
    # restored と誤報するため、他の成功判定経路（補償 POST 失敗後・POST 偽陰性・補償不要）
    # と同じ共通関数で安定確認してから確定する（codex-review P1 指摘 PR #391。成功応答
    # 経路だけ契約が非対称だった）
    local pvr_rc=0
    confirm_stable_parent "補償復旧後の安定確認" "${CURRENT_PARENT}" || pvr_rc=$?
    if [[ "${pvr_rc}" -eq 2 ]]; then
      # 安定確認中に本来の新親 #NEW_PARENT への遅延反映が見えた（元の POST の偽陰性）
      emit_result "reassigned" "${CURRENT_PARENT}"
      exit 0
    elif [[ "${pvr_rc}" -ne 0 ]]; then
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi
    echo "情報: #${ISSUE} を旧親 #${CURRENT_PARENT} へ補償復旧した（本来の目的だった #${NEW_PARENT} への付け替えは未達。反映遅延を考慮し再確認済み）" >&2
    echo "result=restored issue=${ISSUE} new_parent=${NEW_PARENT} old_parent=${CURRENT_PARENT}"
    exit 10
  fi

  if [[ "${recovery_same_repo}" -eq 1 && "${recovery_parent}" == "${CURRENT_PARENT}" ]]; then
    # 実測で既に旧親配下（DELETE が実は不成立だった、または応答後に反映が追いついた等）。
    # ただしこの 1 回の読み取りだけでは、DELETE の反映が遅延しているだけの過渡状態を
    # 見ている可能性を排除できない。その場合、少し後には実際に孤児化するにもかかわらず
    # ここで「復旧済み」と確定させると誤報になる（codex-review P1 指摘 PR #391）。
    # 短い間隔を空けて再取得し、2 回連続で同じ結果（旧親配下）が得られて初めて安定した
    # 状態として確定する（共通関数化。上の補償 POST 失敗後の偽陰性確認と同一ロジック）
    local sop_rc=0
    confirm_stable_parent "反映遅延を考慮した再確認" "${CURRENT_PARENT}" || sop_rc=$?
    if [[ "${sop_rc}" -eq 2 ]]; then
      # 再確認で、実は本来の新親 #NEW_PARENT に付いていたことが判明した（元の POST の
      # 偽陰性がここで初めて見える経路。cursor[bot] Medium 指摘 PR #391）
      emit_result "reassigned" "${CURRENT_PARENT}"
      exit 0
    elif [[ "${sop_rc}" -ne 0 ]]; then
      echo "reason=recovery-state-unknown" >&2
      exit 8
    fi
    echo "情報: #${ISSUE} は実測で既に旧親 #${CURRENT_PARENT} 配下にあった（補償 POST は不要。反映遅延を考慮し再確認済み）" >&2
    echo "result=restored issue=${ISSUE} new_parent=${NEW_PARENT} old_parent=${CURRENT_PARENT}"
    exit 10
  fi

  # 実測で第三者が別の親を設定済み（同一リポジトリの別 issue、または別リポジトリへの
  # 転送）。承認外の親子関係を壊さないため、旧親へ戻すことも新親へ POST し直すことも
  # せず書き込みなしで停止する（fail-closed）
  echo "エラー: DELETE 後の POST 失敗を受けて実状態を再取得したところ、第三者が別の親を設定済みだった（parent_issue_url=${recovery_parent_url}）。承認外の親子関係を壊さないため補償せず停止する" >&2
  echo "対処: 実測した親をユーザーへ提示して承認を得たうえで再実行する" >&2
  echo "reason=third-party-parent" >&2
  exit 11
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
    # DELETE は既に成立済みのため、ここで即終端すると孤児化が確定してしまう。
    # 実状態を再取得してから安全に判断できる範囲でのみ旧親へ戻す（Issue #352）。
    # 関数は必ず exit する（0 / 8 / 10 / 11 のいずれか）ため、この if ブロックには戻らない
    recover_after_post_failure
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
