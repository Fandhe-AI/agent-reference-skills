#!/usr/bin/env bash
# base-merge.sh — PR のブランチへ base ブランチを取り込んで push する（コンフリクトは解消せず報告する）
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立て、隔離 worktree のエージェントが 1 回実行する）:
#   bash base-merge.sh --pr NUM --branch BRANCH --base BASE --repo OWNER/REPO
#
# 役割: baseMergePrompt（Issue #441）に文章で書いていた手順 0〜3 を、判断を挟まない決定的なコマンド列として持つ
#       （Issue #603 第 3 弾）。レビュー指摘の修正・スレッドの resolve・PR 本文編集・マージ・クローズは行わない。
#       担当するのは次だけである。
#         0. worktree routing ガード: origin の fetch URL と push 先 URL の『全行』（git remote get-url --all / --push
#            --all）が host github.com・owner/repo が --repo と完全一致（大文字小文字を区別しない）し、gh pr view -R の
#            number と headRefName が --pr / --branch と一致すること。1 つでも外れたら fetch・checkout・merge・push を
#            一切実行しない（git 2.7 以降。取得できない git では routingError に倒れる）
#         1. 対象ブランチの fetch（refs/heads/ 修飾。保存先は worktree ごとの ref refs/worktree/base-merge/*。共有の
#            refs/remotes/origin/* は読み書きも削除もしない）→ detached checkout → HEAD と取得した sha の照合
#         2. base の fetch → 埋め込み subject でマージ。コンフリクトは解消せず abort して報告する
#         3. push 前後のリモート head の突き合わせ（lib/push-verify.sh。pushed になるのは二条件を満たしたときだけ）
# 入力: 引数は検証済みの値だけを渡す。--branch と --base は同じ値にできない（base 自身への push の防止）。--repo は
#       小文字化して比較する。空の --repo は「期待リポジトリが未確定」として routingError で返す（常に不一致 = fail-closed）。
# 出力: 標準出力の最後の 1 行が `BASE_MERGE_RESULT {…}` の 1 行 JSON（キーは BASE_MERGE_SCHEMA と同じ: pushed / summary /
#       worktreePath、該当時だけ routingError / commitFailed / conflict / hookRejected が true）。summary は固定の語彙だけ
#       で、hook の出力・gh の出力・URL・ブランチ名のような外部由来の文字列を入れない（診断は標準エラーへ出す）。
#       結果を出せたときは、取り込み失敗・routing 不一致を含めて exit 0。ホストは pushed を『進捗』にしか使わない
#       （マージ・push・削除の可否には使わない。references/script-trust-model.md）。
# 終了コード:
#   0  結果の行を出力した（成否は JSON の内容で判断する）
#   2  使い方の誤り（引数不足・形式不正・未知の引数・--branch と --base が同じ）。結果の行は出力しない
#   3  実行できる前提が無い（git が無い等）。結果の行は出力しない
# 自衛: push の refspec は HEAD:refs/heads/<branch> の 1 形だけ（--no-follow-tags 付き。利用者設定 push.followTags でタグが
#       origin へ出ない）。--force 系・--no-verify は使わない（hook を通す）。
#       マージの subject は下の埋め込み定数を一時ファイルに書いて -F で渡す（commitlint 設定やコミット履歴を読まない =
#       未信頼の読み取りを自動 base 取り込みの経路から排除する。PR #443 codex P0）。一時ファイルは trap で必ず消す。
#       --no-ff でマージするため、merge.ff などの利用者設定でマージコミットの有無が変わらない。
# 副作用: この worktree の detached HEAD を動かし、対象ブランチへ push する。それ以外のリポジトリ設定は変更しない。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・GNU 専用フラグを使わない。

set -u
unset POSIXLY_CORRECT
LC_ALL=C
export LC_ALL
# 認証情報の入力待ちでハングしない（非対話の fail-closed）
GIT_TERMINAL_PROMPT=0
export GIT_TERMINAL_PROMPT
GIT_MERGE_AUTOEDIT=no
export GIT_MERGE_AUTOEDIT

command -v git >/dev/null 2>&1 || { echo "base-merge: git が無い" >&2; exit 3; }
script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 3
# shellcheck source=lib/push-verify.sh
. "${script_dir}/lib/push-verify.sh" || exit 3
# is_uint・valid_repo・lower・url_allowed と許可ホストの定数 ALLOWED_REMOTE_HOST（テストが表で単体検査するため lib へ切り出した）
# shellcheck source=lib/base-merge-lib.sh
. "${script_dir}/lib/base-merge-lib.sh" || exit 3

# マージコミットの subject（ホストの固定値と同じ文字列。commitlint が拒否するリポでは hookRejected で返り、
# ホストが commitlint 対応の subject を決められる fix 経路へ委譲する）
MERGE_SUBJECT='chore: base ブランチの変更を取り込む'

usage() {
  echo "使い方: base-merge.sh --pr NUM --branch BRANCH --base BASE --repo OWNER/REPO" >&2
  [ $# -eq 0 ] || echo "base-merge: $1" >&2
  exit 2
}

pr=""
branch=""
base=""
repo=""
repo_given=0
while [ $# -gt 0 ]; do
  case "$1" in
    --pr | --branch | --base | --repo)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --pr) pr=$2 ;;
        --branch) branch=$2 ;;
        --base) base=$2 ;;
        --repo) repo=$2; repo_given=1 ;;
      esac
      shift 2
      ;;
    *) usage "未知の引数: $1" ;;
  esac
done
is_uint "${pr}" || usage "--pr は正の整数で指定する"
pv_valid_branch "${branch}" || usage "--branch の形式が不正"
pv_valid_branch "${base}" || usage "--base の形式が不正"
[ "${branch}" != "${base}" ] || usage "--branch と --base は同じ値にできない"
[ "${repo_given}" -eq 1 ] || usage "--repo が無い"
[ -z "${repo}" ] || valid_repo "${repo}" || usage "--repo は OWNER/REPO 形式で指定する"

msgfile=""
# shellcheck disable=SC2329  # trap 経由で呼ばれる
cleanup() {
  [ -z "${msgfile}" ] || rm -f "${msgfile}"
  msgfile=""
}
trap cleanup EXIT
trap 'cleanup; exit 143' TERM INT HUP

# 結果を出して終了する。$1 = pushed（true / false）、$2 = summary（固定語彙）、$3 以降 = true にするフラグ名。
# worktreePath は pwd -P。ホストの許可文字（英数字・/・-・_・.・半角スペース）と ".." 以外は JSON を壊し得るので空にする
emit() {
  local pushed=$1 summary=$2 extra="" f wt
  shift 2
  for f in "$@"; do
    extra="${extra},\"${f}\":true"
  done
  wt=$(pwd -P 2>/dev/null) || wt=""
  case "${wt}" in
    '' | *..* | [!/]* | /[!A-Za-z0-9]* | *[!A-Za-z0-9/._\ -]*) wt="" ;;
  esac
  printf 'BASE_MERGE_RESULT {"pushed":%s,"summary":"%s","worktreePath":"%s"%s}\n' "${pushed}" "${summary}" "${wt}" "${extra}"
  exit 0
}
fail_routing() {
  echo "base-merge: routing ガード不成立（${1}）" >&2
  emit false "worktree routing error: ${2}" routingError
}
fail_commit() {
  echo "base-merge: ${1}" >&2
  emit false "$2" commitFailed
}

# ---- 0. worktree routing ガード ----
# remote の URL を照合する。fetch URL（`git remote get-url --all`）と push 先 URL（`--push --all`）の『全行』が、許可ホストと
# 期待 owner/repo に一致しなければならない（1 行ごとの判定 url_allowed と、許す URL の形・拒否の根拠は lib/base-merge-lib.sh）。
# 先頭 1 件だけを見ると、pushurl・pushInsteadOf・複数 url の追加で push だけが別のリポジトリへ届く（隔離 worktree は本体の
# .git/config を共有するので、先行するエージェントが書ける位置にある）。URL はトークンを含み得るので、どの出力にも出さない。
# 全行の照合は lib の routing_check_remotes（pr-push.sh と共有）。0 = 全行が許可、1 = 1 行でも外れた、2 = 取得できない

[ -n "${repo}" ] || fail_routing "期待リポジトリが空" "期待リポジトリが未確定（--repo が空）"
want=$(lower "${repo}")
rc=0
routing_check_remotes "${want}" || rc=$?
case "${rc}" in
  0) ;;
  1) fail_routing "remote の ${RM_FAILED} URL が不一致" "remote の URL（fetch / push）が許可ホスト・期待リポジトリと不一致" ;;
  *) fail_routing "git remote get-url（${RM_FAILED}）が失敗または空" "origin の URL（fetch / push）を取得できない" ;;
esac
# -R で期待リポジトリを明示する（GH_REPO や gh repo set-default で別リポジトリの PR を引かない）
pr_row=$(gh pr view "${pr}" -R "${repo}" --json number,headRefName --jq '[(.number | tostring), .headRefName] | join(" ")' 2>/dev/null) \
  || fail_routing "gh pr view が失敗" "PR を解決できない（gh 取得失敗）"
if [ "${pr_row}" != "${pr} ${branch}" ]; then
  fail_routing "PR の number / headRefName が対象と不一致" "PR の number または headRefName が対象と不一致"
fi

# ---- 1. 対象ブランチの取得 ----
# 作業ツリーに未コミットの変更があるとマージコミットへ混入し得る。隔離 worktree は clean のはず（clean でなければ中止）
dirty=$(git status --porcelain --untracked-files=no 2>/dev/null) || fail_commit "git status が失敗" "worktree の状態を確認できない"
[ -z "${dirty}" ] || fail_commit "作業ツリーに未コミットの変更がある" "worktree が clean でない"
# fetch 元は refs/heads/ で修飾する（修飾しないと同名のタグが優先され、タグにしか無いコミットがブランチへ入る）。
# 取得先は『この worktree だけの ref』（refs/worktree/ 配下は linked worktree 間で共有されない。pr-push.sh と同じ）。
# refs/remotes/origin/ は並列 worktree が共有するため、読まず・書かず・消さない（別の worktree が参照中の ref を消すと、
# そちらの checkout や取り込みが解決できず正常な作業を失敗終端させる）。失敗した fetch が古い ref を残して stale な内容を
# merge しないよう、先に自分の ref だけを消す
branch_ref="refs/worktree/base-merge/branch"
git update-ref -d "${branch_ref}" >/dev/null 2>&1 || true
git fetch origin "refs/heads/${branch}:${branch_ref}" >/dev/null || fail_commit "branch の fetch が失敗" "branch fetch 失敗"
git checkout --detach "${branch_ref}" >/dev/null 2>&1 || fail_commit "branch の checkout が失敗" "branch checkout 失敗"
head_now=$(git rev-parse HEAD 2>/dev/null) || head_now=""
remote_tip=$(git rev-parse "${branch_ref}" 2>/dev/null) || remote_tip=""
if ! pv_is_sha "${head_now}" || [ "${head_now}" != "${remote_tip}" ]; then
  fail_commit "checkout 後の HEAD が origin のブランチと不一致" "checkout 後の HEAD が origin/<branch> と不一致"
fi

# ---- 2. base の取得とマージ ----
base_ref="refs/worktree/base-merge/base"
git update-ref -d "${base_ref}" >/dev/null 2>&1 || true
git fetch origin "refs/heads/${base}:${base_ref}" >/dev/null || fail_commit "base の fetch が失敗" "base fetch 失敗"
# ブランチの先頭が base に含まれている（独自のコミットが無い）なら、マージは fast-forward になり base の先端をそのまま
# ブランチへ push してしまう。取り込む差分が無いので何もしない
anc=0
git merge-base --is-ancestor HEAD "${base_ref}" 2>/dev/null || anc=$?
case "${anc}" in
  0) emit false "ブランチの先頭は base に含まれている（取り込む差分なし）" ;;
  1) ;;
  *) fail_commit "git merge-base が失敗" "base との祖先関係を確認できない" ;;
esac
msgfile=$(mktemp "${TMPDIR:-/tmp}/base-merge-msg.XXXXXX") || fail_commit "一時ファイルを作れない" "マージ subject の一時ファイルを作れない"
printf '%s\n' "${MERGE_SUBJECT}" >"${msgfile}" || fail_commit "一時ファイルへ書けない" "マージ subject の一時ファイルへ書けない"
pre_merge=${head_now}
merge_rc=0
git merge --no-ff --no-edit -F "${msgfile}" "${base_ref}" >/dev/null || merge_rc=$?
if [ "${merge_rc}" -ne 0 ]; then
  unmerged=$(git diff --name-only --diff-filter=U 2>/dev/null) || unmerged=""
  has_merge_head=0
  git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1 && has_merge_head=1
  git merge --abort >/dev/null 2>&1 || true
  if [ -n "${unmerged}" ]; then
    echo "base-merge: base とのコンフリクトを検出した（解消せず abort した）" >&2
    emit false "base コンフリクト解消不能（内容編集の権限なし。fix/implement へ委譲要）" commitFailed conflict
  fi
  if [ "${has_merge_head}" -eq 1 ]; then
    echo "base-merge: マージコミットが hook 等に拒否された（abort した）" >&2
    emit false "base merge コミット拒否（commit-msg / pre-commit hook 等）" commitFailed hookRejected
  fi
  fail_commit "git merge が失敗した（コンフリクト・MERGE_HEAD なし）" "base merge が失敗した（コンフリクト・hook 拒否以外）"
fi
post_merge=$(git rev-parse HEAD 2>/dev/null) || post_merge=""
if ! pv_is_sha "${post_merge}"; then
  fail_commit "マージ後の HEAD を読めない" "マージ後の HEAD を確認できない"
fi
if [ "${post_merge}" = "${pre_merge}" ]; then
  emit false "Already up to date（GitHub 側の mergeable 算出待ちの可能性）"
fi

# ---- 3. push と反映の確認 ----
pv_push_verified "${branch}" || fail_commit "push を実行できなかった" "push の前提（ブランチ名）が不正"
case "${PV_OUTCOME}" in
  pushed) emit true "base を取り込み push した" ;;
  noop) emit false "変更なしのため push は no-op" ;;
  race) emit false "リモート head がローカル HEAD と不一致（並行 push 競合の可能性）" ;;
  push-failed) emit false "push が失敗した（拒否・通信エラー等）" ;;
  *) emit false "push 前後のリモート head を確認できず pushed: false として返す" ;;
esac
