#!/usr/bin/env bash
# reply-resolve.sh — 修正したレビュースレッドへ定型の対応報告を返してから resolve する
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立て、Merge ループの fix が 1 回実行する）:
#   bash reply-resolve.sh --pr NUM [--repo OWNER/REPO] --branch BRANCH --allow ID[,ID...] --thread-id ID [--thread-id ID ...]
#
# 役割: fixPrompt が文章で指示していた resolve（Issue #119）に、resolve の前の定型の返信（Issue #759）を足し、順序と本文を
#       エージェントの判断ではなく機械的な実行にする。fix の push 後にレビューした人や bot が、どのコミットで直ったかを
#       スレッドから辿れるようにするため。担当するのは次だけである。
#         1. 前提の確認（読み取り）: origin が --repo と一致、ローカル HEAD・origin の refs/heads/<branch>・PR の headRefOid が
#            全て一致、PR が OPEN で headRefName が --branch と一致。返信に載せる sha はこの観測値（fix の申告ではない）
#         2. スレッドごと: 状態を読み、別 PR・別リポジトリ・resolve 済みなら何もしない。自分の同 sha の返信が既にあれば返信せず
#            resolve だけ行う（返信後に resolve が失敗した再実行で二重投稿しない）。無ければ返信し、返信が SUBMITTED で
#            成功したときだけ resolve する（返信に失敗したスレッドは resolve しない = 未解決のまま残る）
# 入力: --allow はホストが finding.unresolvedComments から検証して作る許可リスト（最大 20 件）。--thread-id は繰り返し可
#       （最大 20 件）で、各 ID は形式検証を通り --allow に含まれていなければならない（違反は exit 2 で gh を 1 回も呼ばない）。
# 返信本文: lib の定数テンプレートに sha とブランチ名だけを入れる。レビュー本文・Issue 本文・fix の自由文が入る経路は無い（Issue #145）。
# 出力: 標準出力の最後の 1 行が `REPLY_RESOLVE_RESULT {…}`（封筒なしの進捗専用。references/script-trust-model.md）。値は固定語彙・
#       40 桁 16 進・検証済みの thread id だけ。gh の出力・コメント本文は標準出力にも標準エラーにも出さない。
# 終了コード: 0 結果の行を出力した（status が done 以外でも 0）/ 2 使い方の誤り（結果の行なし）/ 3 jq・gh・git が無い（結果の行なし）
# 書き込み: 返信（addPullRequestReviewThreadReply）と resolve（resolveReviewThread）の 2 つの mutation だけ。query は下の定数で
#       固定し、可変値は -f の変数で渡す（query に連結しない）。マージ・承認・設定変更・push は持たない。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。

set -u
unset POSIXLY_CORRECT
LC_ALL=C
export LC_ALL
GIT_TERMINAL_PROMPT=0
export GIT_TERMINAL_PROMPT

for c in git gh jq; do
  command -v "${c}" >/dev/null 2>&1 || { echo "reply-resolve: ${c} が無い" >&2; exit 3; }
done
script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 3
# shellcheck source=lib/push-verify.sh
. "${script_dir}/lib/push-verify.sh" || exit 3
# shellcheck source=lib/base-merge-lib.sh
. "${script_dir}/lib/base-merge-lib.sh" || exit 3
# shellcheck source=lib/reply-resolve-lib.sh
. "${script_dir}/lib/reply-resolve-lib.sh" || exit 3

# GraphQL の定数（静的ガードが、この 2 行の mutation だけを許可形として許す）
RR_REPLY_QUERY='mutation($tid:ID!,$body:String!){addPullRequestReviewThreadReply(input:{pullRequestReviewThreadId:$tid,body:$body}){comment{id state}}}'
RR_RESOLVE_QUERY='mutation($tid:ID!){resolveReviewThread(input:{threadId:$tid}){thread{id isResolved}}}'
RR_READ_QUERY='query($tid:ID!){node(id:$tid){... on PullRequestReviewThread{isResolved pullRequest{number repository{nameWithOwner}} comments(last:100){nodes{viewerDidAuthor state body}}}}}'

usage() {
  echo "使い方: reply-resolve.sh --pr NUM [--repo OWNER/REPO] --branch BRANCH --allow ID[,ID...] --thread-id ID [--thread-id ID ...]" >&2
  [ $# -eq 0 ] || echo "reply-resolve: $1" >&2
  exit 2
}

pr=""
repo=""
branch=""
allow=""
threads=""
nthreads=0
while [ $# -gt 0 ]; do
  case "$1" in
    --pr | --repo | --branch | --allow | --thread-id)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --pr) pr=$2 ;;
        --repo) repo=$2 ;;
        --branch) branch=$2 ;;
        --allow) allow=$2 ;;
        --thread-id)
          rr_valid_thread_id "$2" || usage "--thread-id の形式が不正"
          case " ${threads} " in
            *" $2 "*) ;;
            *)
              threads="${threads:+${threads} }$2"
              nthreads=$((nthreads + 1))
              ;;
          esac
          [ "${nthreads}" -le "${RR_MAX_THREADS}" ] || usage "--thread-id が多すぎる"
          ;;
      esac
      shift 2
      ;;
    *) usage "未知の引数: $1" ;;
  esac
done
is_uint "${pr}" || usage "--pr は正の整数で指定する"
[ -z "${repo}" ] || valid_repo "${repo}" || usage "--repo は OWNER/REPO 形式で指定する"
pv_valid_branch "${branch}" || usage "--branch の形式が不正"
[ -n "${allow}" ] || usage "--allow が空"
n_allow=0
old_ifs=${IFS}
IFS=,
for a in ${allow}; do
  rr_valid_thread_id "${a}" || usage "--allow の要素の形式が不正"
  n_allow=$((n_allow + 1))
done
IFS=${old_ifs}
[ "${n_allow}" -le "${RR_MAX_THREADS}" ] || usage "--allow が多すぎる"
[ "${nthreads}" -ge 1 ] || usage "--thread-id が無い"
for t in ${threads}; do
  rr_in_allow "${t}" "${allow}" || usage "--thread-id が --allow に含まれない"
done

# --repo 省略時（args.repo 未指定の導入先）は routing の remote 照合を行わず、gh の対象はカレントのリポジトリにする（pr-push.sh と同じ扱い）。
# スレッドの所属リポジトリ照合に使う期待値はカレントから解決し、解決できなければ何も書かずに中止する
if [ -n "${repo}" ]; then
  want=$(lower "${repo}")
else
  want=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null) || want=""
  valid_repo "${want}" || { echo "reply-resolve: カレントのリポジトリを解決できない" >&2; rr_result observe-failed "" "" "" "" ""; exit 0; }
  want=$(lower "${want}")
fi

fail() {
  echo "reply-resolve: $2" >&2
  rr_result "$1" "" "" "" "" ""
  exit 0
}

# ---- 1. 前提の確認（読み取りのみ） ----
rc=0
if [ -n "${repo}" ]; then routing_check_remotes "${want}" || rc=$?; fi
[ "${rc}" -eq 0 ] || fail routing-error "origin の URL が許可ホスト・期待リポジトリと不一致、または取得できない"

local_head=$(git rev-parse HEAD 2>/dev/null) || fail observe-failed "git rev-parse HEAD が失敗"
pv_is_sha "${local_head}" || fail observe-failed "HEAD の形式が不正"
remote_row=$(git ls-remote origin "refs/heads/${branch}" 2>/dev/null) || fail observe-failed "git ls-remote が失敗"
remote_head=${remote_row%%[[:space:]]*}
pv_is_sha "${remote_head}" || fail observe-failed "リモートのブランチを解決できない"
[ "${remote_head}" = "${local_head}" ] || fail head-mismatch "ローカル HEAD とリモートのブランチ先端が不一致"

# PR の headRefOid は push 直後だと反映が遅れる。ここだけ最大 3 回観測する（間隔 RR_PR_HEAD_WAIT_S 秒・既定 3・上限 10）。
# ローカル HEAD と ls-remote の不一致は本物の競合なので待たない。何も書き込む前の段階なので待っても副作用はない
wait_s=${RR_PR_HEAD_WAIT_S:-3}
case "${wait_s}" in '' | *[!0-9]*) wait_s=3 ;; esac
[ "${wait_s}" -le 10 ] || wait_s=10
attempt=0
while :; do
  attempt=$((attempt + 1))
  pr_row=$(gh pr view "${pr}" ${repo:+-R "${repo}"} --json state,headRefName,headRefOid --jq '[.state, .headRefName, .headRefOid] | join(" ")' 2>/dev/null) \
    || fail observe-failed "gh pr view が失敗"
  [ "${pr_row}" = "OPEN ${branch} ${local_head}" ] && break
  [ "${attempt}" -lt 3 ] || fail head-mismatch "PR の状態・ブランチ・head が対象と不一致"
  sleep "${wait_s}"
done
sha=${local_head}

# ---- 2. スレッドごとの処理（直列） ----
prefix=$(rr_reply_prefix "${sha}")
body=$(rr_reply_body "${sha}" "${branch}")
resolved=""
reply_failed=""
resolve_failed=""
skipped=""

# resolve を 1 回だけ再試行して実行する。0 = resolve 済みを確認
do_resolve() {
  local try out
  for try in 1 2; do
    out=$(gh api graphql -f query="${RR_RESOLVE_QUERY}" -f tid="$1" --jq '.data[].thread.isResolved' 2>/dev/null) || out=""
    [ "${out}" = true ] && return 0
  done
  return 1
}

for tid in ${threads}; do
  row=$(gh api graphql -f query="${RR_READ_QUERY}" -f tid="${tid}" 2>/dev/null \
    | jq -r --arg m "${prefix}" '.data.node | [(.isResolved | tostring), (.pullRequest.number | tostring), (.pullRequest.repository.nameWithOwner | ascii_downcase), ([.comments.nodes[]? | select(.viewerDidAuthor == true and .state == "SUBMITTED" and ((.body // "") | startswith($m)))] | length | tostring)] | join(" ")' 2>/dev/null) || row=""
  # shellcheck disable=SC2086  # 空白区切りの固定 4 項目へ分割する
  set -- ${row}
  if [ $# -ne 4 ]; then
    reply_failed="${reply_failed:+${reply_failed} }${tid}"
    continue
  fi
  action=$(rr_classify "$1" "$2" "${pr}" "$3" "${want}" "$4")
  case "${action}" in
    skip)
      skipped="${skipped:+${skipped} }${tid}"
      continue
      ;;
    reply)
      out=$(gh api graphql -f query="${RR_REPLY_QUERY}" -f tid="${tid}" -f body="${body}" --jq '.data[] | [.comment.id // "", .comment.state // ""] | join(" ")' 2>/dev/null) || out=""
      case "${out}" in
        ?*" SUBMITTED") ;;
        *)
          reply_failed="${reply_failed:+${reply_failed} }${tid}"
          continue
          ;;
      esac
      ;;
    resolve-only) ;;
    *)
      reply_failed="${reply_failed:+${reply_failed} }${tid}"
      continue
      ;;
  esac
  if do_resolve "${tid}"; then
    resolved="${resolved:+${resolved} }${tid}"
  else
    resolve_failed="${resolve_failed:+${resolve_failed} }${tid}"
  fi
done

rr_result done "${sha}" "${resolved}" "${reply_failed}" "${resolve_failed}" "${skipped}"
exit 0
