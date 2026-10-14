#!/usr/bin/env bash
# merge-gate.sh — 新規マージの直前に merge-exec が行う読み取り専用の検証（G0 と再検証）を一括で実行するスクリプト
#
# 使い方（通常は run-verified.sh 経由。ホストが nonce 入りのコマンドを組み立てる）:
#   bash merge-gate.sh --nonce N --pr NUM --base BRANCH [--repo OWNER/REPO] [--expect-sha SHA] [--external JSON]
#
# 役割: merge-exec のプロンプトに書いていた gh / jq の検証手順（Issue #603 第 6 弾）を持つ。マージの実行そのもの
#       （squash merge の呼び出し）はこのスクリプトに含めない。実行は merge-exec がプロンプトのコマンド形で行い、ここは
#       「実行してよいか」を決定的に判定して判定語を返すだけ（書き込み・mutation・マージ系のコマンドは一切実行しない）。
#       判定の語彙は merge-exec の返却 reason と同じで、ok 以外はその語をそのまま reason にして辞退する。
# 検証の順序（最初に落ちた段階で止まる。段階と判定語の対応は automerge-design.md の G0 の節と同じ）:
#   view      PR の state / HEAD sha / mergeable / base / draft を 1 回取得する。取得失敗・HEAD sha の形式不正・OPEN でない・
#             --expect-sha との不一致 → head-moved（CLOSED は pr-closed）、base 不一致または draft → wrong-target
#   g0        ベースブランチのサーバー側強制の実測（rules/branches を全ページ取得）
#             - required status checks が 1 件も無い（集計後の総数 0 を含む）・取得失敗 → classic-unsupported（classic branch protection は非対応）
#             - 適用 ruleset が Repository ソースでない（Organization 継承を含む）・各 ruleset の enforcement が active でない・
#               bypass_actors が空配列でない・取得失敗 → server-enforcement-missing
#             - required_review_thread_resolution が強制されていない → server-enforcement-missing
#             - --external の宣言（App の slug + context）が App ID（apps/<slug> の .id）と context の組で required に無い → 同上
#             - HEAD の check-run 名・commit status の context に required でないもの（client-only）がある・取得失敗 → 同上
#             - required の integration_id が数値でない・取得失敗 → issuer-unbound
#             - integration_id と一致する App 発行の check-run が HEAD に未発行の required context がある → checks-not-green（一過性）
#             strict_required_status_checks_policy は読まない（意図的な非要件。ruleset-policy.md）
#   checks    gh pr checks の state が 1 件以上あり全件 SUCCESS / NEUTRAL / SKIPPED でなければ checks-not-green
#             （総数 0・終了コード 8〔pending あり。一過性なので err 0〕を含む）。8 以外の非ゼロ終了・時間切れ・解析失敗は取得失敗（err 1）
#   threads   未解決のレビュースレッド（GraphQL を全ページ走査）が 1 件でもあれば unresolved-threads、取得失敗は head-moved
#   mergeable view で取得した mergeable が CONFLICTING なら not-mergeable（UNKNOWN は止めない。マージ時に GitHub が拒否する）
#   external  --external の App ごと: cursor はレビュー 0 件または CHANGES_REQUESTED があれば external-review-missing。
#             その他は check-run が 1 件以上なら全件が success / neutral / skipped であること（でなければ checks-not-green）、
#             0 件ならレビューが APPROVED 1 件以上かつ他の state 0 件であること（でなければ external-review-missing）。
#             取得失敗は external-review-missing
# 出力: 標準出力に 1 行の封筒 {nonce, payload, sha256}（lib/signed-output.sh）。payload は整数と ASCII の固定語彙・
#       40 桁 16 進だけで、ruleset 名・context 名・App 名・PR のタイトルや本文のような外部由来の文字列は含めない。キー:
#       mode(=merge-gate) / inputSha256 / err(取得失敗 = 1) / verdict / stage / detail(落ちた判定の固定語) / headSha(view の取得値。
#       view の前に落ちたときは空) / checks・notGreen・unresolved・requiredTotal・clientOnly・unbound・unissued(件数。段階に
#       達しなければ 0)。ホストは封筒を再計算して照合し、merged: true を受理する条件に verdict == ok と headSha の一致を要求する。
#       inputSha256 は「merge-gate・pr・repo・base・expect-sha・external（引数の文字列そのもの）を改行で連ねたもの」の SHA-256
# 終了コード:
#   0  封筒を出力した（判定は payload.verdict。取得失敗は payload.err = 1）
#   2  使い方の誤り（引数不足・形式不正・未知の引数）。封筒は出力しない
#   3  封筒を作れなかった（jq・sha256sum / shasum が無い等）
# 時間の上限: gh 1 回ごとに MERGE_GATE_GH_TIMEOUT_SEC 秒（既定 25）、全体で MERGE_GATE_WALL_SEC 秒（既定 100）。超えた gh は
#       kill して取得失敗として扱う（観測スクリプトと同じ手法。孫プロセスもグループごと kill する）。出力は gh 1 回あたり
#       MERGE_GATE_MAX_OUT_BYTES（既定 16 MiB）まで。超えたら取得失敗（ページ不完全を合格に倒さない）
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。gh api の成否は終了コードで判定する（gh api は HTTP エラーの
#       本文も標準出力に出すため）。複数ページは gh api --paginate の出力（ページごとの JSON の連なり）を jq -s で合算する。
# 副作用: gh の出力を受ける一時ファイルを TMPDIR（無ければ /tmp）に 1 つ作り、必ず消す。それ以外に書かない。

set -u
LC_ALL=C
export LC_ALL

script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 2
# shellcheck source=lib/signed-output.sh
. "${script_dir}/lib/signed-output.sh" || exit 3
# valid_repo（OWNER/REPO の形式検証。observe-pr.sh・base-merge.sh・pr-push.sh と共有する）
# shellcheck source=lib/base-merge-lib.sh
. "${script_dir}/lib/base-merge-lib.sh" || exit 3
# shellcheck source=lib/merge-gate-lib.sh
. "${script_dir}/lib/merge-gate-lib.sh" || exit 3

usage() {
  echo "使い方: merge-gate.sh --nonce N --pr NUM --base BRANCH [--repo O/R] [--expect-sha SHA] [--external JSON]" >&2
  [ $# -eq 0 ] || echo "merge-gate: $1" >&2
  exit 2
}

command -v jq >/dev/null 2>&1 || { echo "merge-gate: jq が無い" >&2; exit 3; }

is_uint() {
  case "$1" in
    '' | *[!0-9]*) return 1 ;;
  esac
  [ "${#1}" -le 9 ] && [ "$1" -ge 1 ]
}
valid_ref() {
  case "$1" in
    '' | *..* | [!A-Za-z0-9]* | *[!A-Za-z0-9._/-]*) return 1 ;;
  esac
  [ "${#1}" -le 200 ]
}
env_int() {
  case "$1" in
    '' | *[!0-9]*) printf '%s' "$2"; return ;;
  esac
  if [ "${#1}" -gt 4 ] || [ "$1" -gt "$3" ] || [ "$1" -lt "$4" ]; then printf '%s' "$2"; return; fi
  printf '%s' "$((10#$1))"
}

nonce=""
pr=""
base=""
repo=""
expect_sha=""
external=""
while [ $# -gt 0 ]; do
  case "$1" in
    --nonce | --pr | --base | --repo | --expect-sha | --external)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --nonce) nonce=$2 ;;
        --pr) pr=$2 ;;
        --base) base=$2 ;;
        --repo) repo=$2 ;;
        --expect-sha) expect_sha=$2 ;;
        --external) external=$2 ;;
      esac
      shift 2
      ;;
    *) usage "未知の引数: $1" ;;
  esac
done

so_valid_nonce "${nonce}" || usage "--nonce は小文字英数字 1〜64 文字で指定する"
is_uint "${pr}" || usage "--pr は正の整数で指定する"
valid_ref "${base}" || usage "--base の形式が不正"
[ -z "${repo}" ] || valid_repo "${repo}" || usage "--repo は OWNER/REPO 形式で指定する"
if [ -n "${expect_sha}" ]; then
  case "${expect_sha}" in *[!0-9a-f]*) usage "--expect-sha は 40 桁の小文字 16 進で指定する" ;; esac
  [ "${#expect_sha}" -eq 40 ] || usage "--expect-sha は 40 桁の小文字 16 進で指定する"
fi
# --external: [{"app": slug, "contexts": [context, …]}, …]（contexts は 1 件以上）。context の受理条件はホストの EXTERNAL_CHECK_CONTEXT_RE と
# 前後空白の拒否（c === c.trim()）に合わせる（1〜255 文字・制御文字と U+2028/2029 は不可・前後に JS の空白類は不可）。同じ入力表での一致は merge-gate-context-parity.test.mjs が固定する。
# 形式が違えば使い方の誤り（合格にしない）。
ext_json='[]'
if [ -n "${external}" ]; then
  printf '%s' "${external}" | jq -e '
    type == "array" and length >= 1 and all(.[];
      type == "object" and (.app | type) == "string" and (.app | test("^[a-z0-9][a-z0-9-]{0,38}$"))
      and (.contexts | type) == "array" and (.contexts | length) >= 1
      and all(.contexts[]; type == "string" and length >= 1 and length <= 255
        and (test("[\\p{Cc}\u2028\u2029]") | not)
        and (test("^[\\t\\v\\f \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]|[\\t\\v\\f \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]\\z") | not)))' >/dev/null 2>&1 || usage "--external の形式が不正"
  ext_json=${external}
fi

wall=$(env_int "${MERGE_GATE_WALL_SEC:-}" 100 100 1)
gh_timeout=$(env_int "${MERGE_GATE_GH_TIMEOUT_SEC:-}" 25 60 1)
max_out=16777216
case "${MERGE_GATE_MAX_OUT_BYTES:-}" in
  '' | *[!0-9]*) ;;
  *) if [ "${#MERGE_GATE_MAX_OUT_BYTES}" -le 9 ] && [ "$((10#${MERGE_GATE_MAX_OUT_BYTES}))" -ge 1000 ]; then max_out=$((10#${MERGE_GATE_MAX_OUT_BYTES})); fi ;;
esac

nl='
'
input_text="merge-gate${nl}${pr}${nl}${repo}${nl}${base}${nl}${expect_sha}${nl}${external}"
input_sha=$(printf '%s' "${input_text}" | so_sha256) || {
  echo "merge-gate: 入力のハッシュを計算できなかった（sha256sum / shasum が無い等）" >&2
  exit 3
}

if [ -n "${repo}" ]; then
  repo_path="repos/${repo}"
  gql_owner=${repo%%/*}
  gql_name=${repo#*/}
else
  repo_path='repos/{owner}/{repo}'
  gql_owner='{owner}'
  gql_name='{repo}'
fi

# ---- gh の薄いラッパー（observe-pr.sh の run_timed と同じ手法。成否は終了コードで判定し、標準出力を OUT へ入れる）----
# gh を自分のプロセスグループのバックグラウンドで走らせ、別のウォッチャーが時間切れでグループごと kill する。時間切れ・非 0 終了・
# 出力なし・出力サイズ超過はすべて失敗（return 1）。
DEADLINE=$(( $(date +%s) + wall ))
CUR_PID=""
CUR_WPID=""
CUR_TMP=""
kill_group() {
  [ -z "$1" ] || kill -KILL -- "-$1" 2>/dev/null
  return 0
}
cleanup() {
  kill_group "${CUR_PID}"
  kill_group "${CUR_WPID}"
  [ -z "${CUR_TMP}" ] || rm -f "${CUR_TMP}"
  CUR_PID=""
  CUR_WPID=""
  CUR_TMP=""
}
trap cleanup EXIT
trap 'cleanup; exit 143' TERM INT HUP

OUT=""
# RC: 直近の run_timed の終了コード（失敗の種類の判別用）。accept_rc: 0 のほかに出力を OUT へ取り込む終了コード（既定は無し = 255。
# gh pr checks が pending で返す 8 だけ checks 段階で指定する。取り込んでも run_timed の戻り値は 0 のときだけ成功）
RC=0
accept_rc=255
run_timed() {
  local limit=$1 now rem pid wpid rc=1 size
  shift
  now=$(date +%s)
  rem=$((DEADLINE - now))
  [ "${rem}" -gt 0 ] || { echo "merge-gate: 壁時計上限に達したため gh を呼ばない" >&2; return 1; }
  [ "${limit}" -le "${rem}" ] || limit=${rem}
  CUR_TMP=$(mktemp "${TMPDIR:-/tmp}/merge-gate.XXXXXX") || { CUR_TMP=""; return 1; }
  {
    set -m
    (set -o pipefail; "$@" 2>/dev/null </dev/null | head -c $((max_out + 1)) >"${CUR_TMP}") &
    pid=$!
    (sleep "${limit}"; kill -KILL -- "-${pid}" || kill -KILL "${pid}") >/dev/null 2>&1 &
    wpid=$!
    set +m
  } 2>/dev/null
  CUR_PID=${pid}
  CUR_WPID=${wpid}
  { wait "${pid}"; rc=$?; } 2>/dev/null
  kill_group "${wpid}"
  { wait "${wpid}"; } 2>/dev/null
  CUR_PID=""
  CUR_WPID=""
  if [ "${rc}" -eq 0 ] || [ "${rc}" -eq "${accept_rc}" ]; then
    size=$(wc -c <"${CUR_TMP}")
    if [ $((size + 0)) -gt "${max_out}" ]; then
      echo "merge-gate: gh の出力が上限 ${max_out} バイトを超えた" >&2
      rc=1
    else
      OUT=$(cat "${CUR_TMP}")
      [ -n "${OUT}" ] || rc=1
    fi
  elif [ "${rc}" -eq 137 ]; then
    echo "merge-gate: gh が ${limit} 秒の時間制限を超えたため kill した（取得失敗）" >&2
  else
    echo "merge-gate: gh が終了コード ${rc} で失敗した（141 は出力サイズ上限の超過による SIGPIPE）" >&2
  fi
  rm -f "${CUR_TMP}"
  CUR_TMP=""
  RC=${rc}
  [ "${rc}" -eq 0 ]
}
gh_api() {
  run_timed "${gh_timeout}" gh api "$@"
}

# ---- 判定の確定と封筒の出力 ----
verdict=ok
stage=view
detail=ok
err=0
HEAD=""
N_CHECKS=0; N_NOTGREEN=0; N_UNRESOLVED=0; N_REQTOTAL=0; N_CLIENTONLY=0; N_UNBOUND=0; N_UNISSUED=0

# stop VERDICT STAGE DETAIL [ERR]: 判定を確定して封筒を出し、終了する
stop() {
  verdict=$1
  stage=$2
  detail=$3
  err=${4:-0}
  emit
  exit 0
}
emit() {
  local payload
  payload=$(jq -cnS --arg is "${input_sha}" --arg v "${verdict}" --arg s "${stage}" --arg d "${detail}" --arg hs "${HEAD}" \
    --argjson e "${err}" --argjson ck "${N_CHECKS}" --argjson ng "${N_NOTGREEN}" --argjson ur "${N_UNRESOLVED}" \
    --argjson rt "${N_REQTOTAL}" --argjson co "${N_CLIENTONLY}" --argjson ub "${N_UNBOUND}" --argjson ui "${N_UNISSUED}" \
    '{mode: "merge-gate", inputSha256: $is, err: $e, verdict: $v, stage: $s, detail: $d, headSha: $hs,
      checks: $ck, notGreen: $ng, unresolved: $ur, requiredTotal: $rt, clientOnly: $co, unbound: $ub, unissued: $ui}') \
    || { echo "merge-gate: payload を組み立てられなかった" >&2; exit 3; }
  so_emit "${nonce}" "${payload}" || {
    echo "merge-gate: 出力封筒を作れなかった（sha256sum / shasum が無い等）" >&2
    exit 3
  }
}

# ---- view: PR の状態を 1 回取得する ----
stage=view
if [ -n "${repo}" ]; then
  run_timed "${gh_timeout}" gh pr view "${pr}" -R "${repo}" --json state,headRefOid,mergeable,baseRefName,isDraft || stop head-moved view view-fetch 1
else
  run_timed "${gh_timeout}" gh pr view "${pr}" --json state,headRefOid,mergeable,baseRefName,isDraft || stop head-moved view view-fetch 1
fi
row=$(printf '%s' "${OUT}" | jq -r --arg bs "${base}" '
  if (type == "object" and (.state | type) == "string" and (.headRefOid | type) == "string") then
    [ .state, .headRefOid, (.mergeable // "UNKNOWN"), (if .baseRefName == $bs then "1" else "0" end), (if .isDraft == false then "0" else "1" end) ] | join(" ")
  else empty end' 2>/dev/null) || stop head-moved view view-format 1
# shellcheck disable=SC2086
set -- ${row}
[ $# -eq 5 ] || stop head-moved view view-format 1
v_state=$1; v_head=$2; v_mergeable=$3; v_base_ok=$4; v_draft=$5
case "${v_head}" in '' | *[!0-9a-f]*) stop head-moved view view-format 1 ;; esac
[ "${#v_head}" -eq 40 ] || stop head-moved view view-format 1
HEAD=${v_head}
case "${v_state}" in
  OPEN) ;;
  CLOSED) stop pr-closed view state ;;
  *) stop head-moved view state ;;
esac
[ -z "${expect_sha}" ] || [ "${expect_sha}" = "${HEAD}" ] || stop head-moved view expect-sha
[ "${v_base_ok}" = 1 ] || stop wrong-target view base
[ "${v_draft}" = 0 ] || stop wrong-target view draft

# ---- g0: ベースブランチのサーバー側強制 ----
stage=g0
enc=$(jq -rn --arg b "${base}" '$b | @uri') || stop classic-unsupported g0 rules-fetch 1
gh_api --paginate "${repo_path}/rules/branches/${enc}" || stop classic-unsupported g0 rules-fetch 1
rules=$(printf '%s' "${OUT}" | jq -sc '[.[][]]' 2>/dev/null) || stop classic-unsupported g0 rules-fetch 1
cls=$(mg_rules_class "${rules}") || stop classic-unsupported g0 rules-fetch 1
case "${cls}" in
  ok) ;;
  none) stop classic-unsupported g0 no-required-checks ;;
  *) stop server-enforcement-missing g0 source ;;
esac
ids=$(mg_rule_ids "${rules}") || stop server-enforcement-missing g0 source
[ -n "${ids}" ] || stop server-enforcement-missing g0 source
for id in ${ids}; do
  gh_api "${repo_path}/rulesets/${id}" || stop server-enforcement-missing g0 ruleset-fetch 1
  mg_ruleset_ok "${OUT}" || stop server-enforcement-missing g0 bypass
done
enforced=$(mg_thread_enforced "${rules}") || stop server-enforcement-missing g0 thread-resolution
[ "${enforced}" = 1 ] || stop server-enforcement-missing g0 thread-resolution
rsc=$(mg_rsc "${rules}") || stop server-enforcement-missing g0 rules-fetch 1
N_REQTOTAL=$(printf '%s' "${rsc}" | jq 'length') || stop server-enforcement-missing g0 rules-fetch 1
[ "${N_REQTOTAL}" -ge 1 ] 2>/dev/null || stop classic-unsupported g0 no-required-checks

# 外部チェック App は slug ごとに App ID を取得し、宣言 context との組が required にあることを確認する
n_ext=$(printf '%s' "${ext_json}" | jq 'length') || stop server-enforcement-missing g0 external-binding 1
i=0
while [ "${i}" -lt "${n_ext}" ]; do
  slug=$(printf '%s' "${ext_json}" | jq -r --argjson i "${i}" '.[$i].app')
  gh_api "apps/${slug}" || stop server-enforcement-missing g0 external-binding 1
  appid=$(printf '%s' "${OUT}" | jq -er '.id | numbers | floor | tostring' 2>/dev/null) || stop server-enforcement-missing g0 external-binding 1
  case "${appid}" in '' | *[!0-9]*) stop server-enforcement-missing g0 external-binding 1 ;; esac
  j=0
  n_ctx=$(printf '%s' "${ext_json}" | jq --argjson i "${i}" '.[$i].contexts | length')
  while [ "${j}" -lt "${n_ctx}" ]; do
    ctx=$(printf '%s' "${ext_json}" | jq -r --argjson i "${i}" --argjson j "${j}" '.[$i].contexts[$j]')
    cnt=$(mg_external_bound_count "${rsc}" "${appid}" "${ctx}") || stop server-enforcement-missing g0 external-binding 1
    [ "${cnt}" -ge 1 ] 2>/dev/null || stop server-enforcement-missing g0 external-binding
    j=$((j + 1))
  done
  i=$((i + 1))
done

# client-only チェックの不在: HEAD 上の check-run 名・commit status の context がすべて required に含まれること
gh_api --paginate "${repo_path}/commits/${HEAD}/check-runs" || stop server-enforcement-missing g0 client-only-fetch 1
runs_raw=${OUT}
cr_names=$(printf '%s' "${runs_raw}" | jq -sc '[.[].check_runs[].name]' 2>/dev/null) || stop server-enforcement-missing g0 client-only-fetch 1
gh_api --paginate "${repo_path}/commits/${HEAD}/statuses" || stop server-enforcement-missing g0 client-only-fetch 1
st_ctx=$(printf '%s' "${OUT}" | jq -sc '[.[][].context]' 2>/dev/null) || stop server-enforcement-missing g0 client-only-fetch 1
N_CLIENTONLY=$(mg_client_only_count "${rsc}" "${cr_names}" "${st_ctx}") || stop server-enforcement-missing g0 client-only-fetch 1
[ "${N_CLIENTONLY}" = 0 ] || stop server-enforcement-missing g0 client-only

# 発行元束縛: integration_id が数値でない required check（偽装可能）→ issuer-unbound、未発行（一過性）→ checks-not-green
N_UNBOUND=$(mg_unbound_count "${rsc}") || stop issuer-unbound g0 rsc-format 1
[ "${N_UNBOUND}" = 0 ] || stop issuer-unbound g0 unbound
runs=$(printf '%s' "${runs_raw}" | jq -sc '[.[].check_runs[] | {n: .name, a: .app.id}]' 2>/dev/null) || stop issuer-unbound g0 rsc-format 1
N_UNISSUED=$(mg_unissued_count "${rsc}" "${runs}") || stop issuer-unbound g0 rsc-format 1
[ "${N_UNISSUED}" = 0 ] || stop checks-not-green g0 unissued

# ---- checks: gh pr checks の state（チェック名は取得しない）----
# gh pr checks は pending のチェックがあると終了コード 8 を返す（一過性）。8 は出力を解析して判定し、解析できれば解析結果（pending は
# checks-not-green・err 0）、できなければ取得失敗（err 1）。8 以外の非 0 終了・時間切れ・出力なしは取得失敗（err 1）。どれも合格に倒さない
stage=checks
accept_rc=8
if [ -n "${repo}" ]; then
  run_timed "${gh_timeout}" gh pr checks "${pr}" -R "${repo}" --json state --jq '[.[].state]' && ck_ok=1 || ck_ok=0
else
  run_timed "${gh_timeout}" gh pr checks "${pr}" --json state --jq '[.[].state]' && ck_ok=1 || ck_ok=0
fi
accept_rc=255
if [ "${ck_ok}" = 0 ] && [ "${RC}" -ne 8 ]; then stop checks-not-green checks checks-fetch 1; fi
counts=$(mg_checks_counts "${OUT}") || stop checks-not-green checks checks-fetch 1
# shellcheck disable=SC2086
set -- ${counts}
[ $# -eq 2 ] || stop checks-not-green checks checks-fetch 1
N_CHECKS=$1
N_NOTGREEN=$2
[ "${N_CHECKS}" -ge 1 ] || stop checks-not-green checks checks-total-zero
[ "${N_NOTGREEN}" -eq 0 ] || stop checks-not-green checks checks-not-green
# 終了コード 8 は（上の解析結果で止まらなかった場合も） pending の存在を意味する。出力が全件 green に読めても合格にしない（pending を一過性として止める）
[ "${ck_ok}" = 1 ] || stop checks-not-green checks checks-pending

# ---- threads: 未解決のレビュースレッド（コメント本文は取得しない）----
stage=threads
# shellcheck disable=SC2016  # GraphQL の $変数は gh に渡す文字列であり、シェルで展開しない
THREADS_QUERY='query($owner:String!,$name:String!,$number:Int!,$cursor:String){repository(owner:$owner,name:$name){pullRequest(number:$number){reviewThreads(first:100,after:$cursor){nodes{isResolved}pageInfo{hasNextPage endCursor}}}}}'
cursor=""
pages=0
while :; do
  pages=$((pages + 1))
  [ "${pages}" -le 50 ] || stop head-moved threads threads-fetch 1
  if [ -z "${cursor}" ]; then
    gh_api graphql -f query="${THREADS_QUERY}" -F owner="${gql_owner}" -F name="${gql_name}" -F number="${pr}" || stop head-moved threads threads-fetch 1
  else
    gh_api graphql -f query="${THREADS_QUERY}" -F owner="${gql_owner}" -F name="${gql_name}" -F number="${pr}" -F cursor="${cursor}" || stop head-moved threads threads-fetch 1
  fi
  page=$(printf '%s' "${OUT}" | jq -ec '.data.repository.pullRequest.reviewThreads | select((.nodes | type) == "array" and (.pageInfo.hasNextPage | type) == "boolean")' 2>/dev/null) || stop head-moved threads threads-fetch 1
  n=$(printf '%s' "${page}" | jq -r '[.nodes[] | select(.isResolved == false)] | length') || stop head-moved threads threads-fetch 1
  case "${n}" in '' | *[!0-9]*) stop head-moved threads threads-fetch 1 ;; esac
  N_UNRESOLVED=$((N_UNRESOLVED + n))
  [ "$(printf '%s' "${page}" | jq -r '.pageInfo.hasNextPage')" = true ] || break
  cursor=$(printf '%s' "${page}" | jq -r '.pageInfo.endCursor // empty')
  [ -n "${cursor}" ] || stop head-moved threads threads-fetch 1
done
[ "${N_UNRESOLVED}" -eq 0 ] || stop unresolved-threads threads unresolved

# ---- mergeable ----
stage=mergeable
[ "${v_mergeable}" != CONFLICTING ] || stop not-mergeable mergeable conflicting

# ---- external: 宣言した外部チェック App が HEAD に対して合格しているか（本文・チェック名は取得しない）----
stage=external
i=0
while [ "${i}" -lt "${n_ext}" ]; do
  slug=$(printf '%s' "${ext_json}" | jq -r --argjson i "${i}" '.[$i].app')
  kind=other
  [ "${slug}" != cursor ] || kind=cursor
  gh_api --paginate "${repo_path}/pulls/${pr}/reviews" || stop external-review-missing external external-fetch 1
  rv=$(printf '%s' "${OUT}" | jq -sc --arg l "${slug}[bot]" --arg h "${HEAD}" '[.[][] | select(.user.login == $l and .commit_id == $h) | .state]' 2>/dev/null) || stop external-review-missing external external-fetch 1
  cr='[]'
  if [ "${kind}" = other ]; then
    gh_api --paginate "${repo_path}/commits/${HEAD}/check-runs" || stop external-review-missing external external-fetch 1
    cr=$(printf '%s' "${OUT}" | jq -sc --arg s "${slug}" '[.[].check_runs[] | select(.app.slug == $s) | (.conclusion // .status)]' 2>/dev/null) || stop external-review-missing external external-fetch 1
  fi
  ev=$(mg_external_verdict "${kind}" "${cr}" "${rv}") || stop external-review-missing external external-fetch 1
  case "${ev}" in
    ok) ;;
    not-green) stop checks-not-green external external-checks ;;
    *) stop external-review-missing external external-review ;;
  esac
  i=$((i + 1))
done

stop ok 'done' ok
