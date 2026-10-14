#!/usr/bin/env bash
# worktree-remove.sh — worktree の破棄・掃除を、確認と削除を同じプロセスで決定的に行う
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立て、掃除エージェントが 1 回実行する）:
#   bash worktree-remove.sh remove --mode superseded --path <worktree>
#   bash worktree-remove.sh remove --mode discard [--path <worktree>] [--branch <branch> --base <base>]
#   bash worktree-remove.sh sweep --file _/issue-trees/N.json     （標準入力: 削除候補のパスの JSON 配列）
#
# 役割: 掃除プロンプトが文章で持っていた「登録の確認 → lock の扱い → 汚れの確認 → 削除 → ブランチ削除」を、固定のコマンド列として
#       持つ（Issue #603 第 7 弾）。確認と削除を同じプロセスで行い、確認した状態のまま削除する。
#   superseded  マージ済み・置き換え済み・最終スイープ。汚れていても --force で消す（汚れの行数を結果に記録）。ただし submodule に
#               未記録の変更があれば保持する。
#   discard     Recover の破棄・継続。汚れていれば、または初期化済み submodule があれば保持する（--force は使わない）。--branch が
#               あれば worktree が無くなったあとでブランチも消す（消す前の先頭 sha を結果に出す。base と同名のブランチは消さない）。--path と --branch を
#               両方与えたときは、削除の前に同じプロセスでその worktree の HEAD を読み、--branch と違えば worktree もブランチも消さない。
#   sweep       ラン終了時の残骸回収。候補ごとに superseded と同じ規則で消す。状態ファイルが failed / blocked / monitoring の
#               イシューに記録した worktree、登録されていないパス、メイン worktree は消さない。状態ファイルを読めなければ何も消さない。
# 確認の方法: `git -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none`（利用者の status.showUntrackedFiles や
#       submodule の ignore 設定、グローバルの除外ファイル〔core.excludesFile・~/.config/git/ignore〕に左右されない形。素の status は設定で
#       未追跡を隠す）。リポジトリの .gitignore と .git/info/exclude に載った ignore 対象（node_modules・dist 等）は汚れに数えず、中身ごと消える
#       （--ignored は見ない）。残る限界は references/script-trust-model.md に記載。
# lock: Claude Code の形（`claude agent|session <名前> (pid N)` と `… (pid N start <LC_ALL=C TZ=UTC ps -o lstart= の出力>)`）で、そのプロセスが
#       死んでいる（kill -0 が ESRCH、自己確認の通った ps -p が「無い」、/proc が見える環境で /proc/<pid> が無い、のうち少なくとも 1 つが
#       肯定的に「存在しない」と言い、どれも「存在する」と言わない。EPERM は存在扱い）か、start が現在のプロセスの値と一致しない（pid の再利用）ときだけ外す。
#       観測できない・エラー・判定不能（ps が無い・失敗、/proc が無い、未知の kill のエラー）は生存扱い。それ以外の lock は外さず、worktree を保持して結果に記録する。この pid は agent ごとではなく
#       セッション（メインの claude プロセス）の pid なので、同じセッションの中から実行すると lock は常に生存と判定されて保持になる
#       （外れるのは、そのセッションが終わったあとの実行だけ）。
# 自衛: メイン worktree（porcelain の先頭エントリ・実体のパスの一致）、登録されていないパス、カレントがその中にあるパスは消さない。
#       rm の再帰削除は持たない（git worktree remove が消せなかったものは保持して報告する）。
# 出力: 標準出力の最後の 1 行が `WORKTREE_REMOVE_RESULT {json}`。値は固定語彙と件数のみ（パスは sweep の removed だけで、
#       検証済みの候補のパスに限る）。
#           main = メイン worktree、cwd = カレントがその worktree の中（どちらも消さない）。
#           retained-branch-mismatch = discard で --path と --branch を両方与えたとき、worktree の HEAD が --branch と違う（detached を含む。worktree もブランチも消さない）。
#           branchSha は消す前（または消さなかった）ブランチの先頭 sha で、ブランチの削除に失敗したとき（failed）は空。
#   remove: {"ok":bool,"mode":"…","worktree":"removed|not-registered|skipped|main|cwd|retained-dirty|retained-submodule|retained-locked|retained-branch-mismatch|failed",
#            "branch":"none|deleted|absent|keep-base|keep|failed","branchSha":"<40 桁 | 空>","dirty":N,"unlocked":bool,"retained":bool}
#   sweep:  {"ok":true,"mode":"sweep","removed":["…"],"retained":N,"skipped":N,"failed":N,"reason":"…"}
#           reason は空 / state-unreadable / invalid-input。state-unreadable と invalid-input では何も消さない。
#   結果を出せたときは、削除の失敗や保持を含めて exit 0。
# 終了コード: 0 結果の行を出力した / 2 使い方の誤り（結果の行は出さない）/ 3 git・jq が無い
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。

set -u
unset POSIXLY_CORRECT
LC_ALL=C
export LC_ALL

command -v git >/dev/null 2>&1 || { echo "worktree-remove: git が無い" >&2; exit 3; }
script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 3
# shellcheck source=lib/worktree-remove-lib.sh
. "${script_dir}/lib/worktree-remove-lib.sh" || exit 3

usage() {
  echo "使い方: worktree-remove.sh remove --mode (superseded|discard) [--path P] [--branch B --base BASE] / sweep --file _/issue-trees/N.json（候補は標準入力）" >&2
  [ $# -eq 0 ] || echo "worktree-remove: $1" >&2
  exit 2
}

cmd=${1:-}
[ $# -gt 0 ] && shift
case "${cmd}" in
  remove | sweep) ;;
  *) usage "サブコマンドは remove か sweep" ;;
esac

mode=""
path=""
branch=""
base=""
file=""
while [ $# -gt 0 ]; do
  case "$1" in
    --mode | --path | --branch | --base | --file)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --mode) mode=$2 ;;
        --path) path=$2 ;;
        --branch) branch=$2 ;;
        --base) base=$2 ;;
        --file) file=$2 ;;
      esac
      shift 2
      ;;
    *) usage "未知の引数: $1" ;;
  esac
done

# 1 件の worktree を調べて消す（または保持する）。結果は T_WT / T_DIRTY / T_UNLOCKED に入る
T_WT=""
T_DIRTY=0
T_UNLOCKED=false
# $1 = モード、$2 = パス、$3 = 結びつけるブランチ（discard の --branch。空 = 結びつけない）
remove_one() {
  local m=$1 path=$2 expect=${3:-} wt_head list top real cwd_real plan lockact alive cur_start status_out sub_init gd rc kmsg krc kw pw pself pout prc xw
  T_WT=""
  T_DIRTY=0
  T_UNLOCKED=false
  list=$(git worktree list --porcelain 2>/dev/null) || { T_WT=failed; return 0; }
  wr_find_entry "${list}" "${path}"
  if [ "${WR_MAIN}" = 1 ]; then T_WT=main; return 0; fi
  if [ "${WR_REGISTERED}" != 1 ]; then T_WT='not-registered'; return 0; fi
  real=$(wr_real "${path}")
  cwd_real=$(pwd -P)
  case "${cwd_real}/" in
    "${real}/"*) T_WT=cwd; return 0 ;; # カレントがこの worktree の中（自分が居る場所は消さない）
  esac

  # lock: agent の形で pid が死んでいるときだけ外す
  lockact=none
  if [ "${WR_LOCKED}" = 1 ]; then
    alive=1
    if wr_lock_pid "${WR_LOCK_REASON}"; then
      # 死亡は「存在しない」と肯定的に言えたときだけ確定する。EPERM・ps の不在や失敗・/proc の不在・未知のエラーは生存扱い（保持）
      kmsg=$(builtin kill -0 "${WR_LOCK_PID}" 2>&1 >/dev/null) && krc=0 || krc=$?
      kw=$(wr_kill_class "${krc}" "${kmsg}")
      # ps は自己確認（自分の pid が見える）が通ったときだけ根拠に使う。終了コード 1・出力空のときだけ「存在しない」
      pself=$(ps -p "$$" -o pid= 2>/dev/null) || pself=""
      pout=$(ps -p "${WR_LOCK_PID}" -o pid= 2>/dev/null) && prc=0 || prc=$?
      pw=$(wr_ps_class "${pself}" "${prc}" "${pout}")
      # /proc は Linux のみ。/proc/self が見えるときだけ「無い」を根拠にする
      xw=unavailable
      if [ -d /proc/self ]; then
        if [ -d "/proc/${WR_LOCK_PID}" ]; then xw=present; else xw=absent; fi
      fi
      if [ "$(wr_pid_state "${kw}" "${pw}" "${xw}")" = dead ]; then alive=0; fi
      # start つきの lock: 生きているプロセスの開始時刻が lock に書かれた値と違えば、pid が再利用された別のプロセス（= lock した側は死んでいる）。
      # ps が無い・失敗・出力が空のときは観測できないので生存扱いのまま（保持側）
      if [ "${alive}" = 1 ] && [ -n "${WR_LOCK_START}" ]; then
        cur_start=$(LC_ALL=C TZ=UTC ps -o lstart= -p "${WR_LOCK_PID}" 2>/dev/null) || cur_start=""
        if [ -n "${cur_start}" ] && ! wr_start_matches "${cur_start}" "${WR_LOCK_START}"; then alive=0; fi
      fi
    fi
    lockact=$(wr_lock_action 1 "${WR_LOCK_PID}" "${alive}")
    if [ "${lockact}" = retain ]; then T_WT='retained-locked'; return 0; fi
  fi

  # 汚れの確認。実体があるときだけ。git の対象がこの worktree 自身であることを確かめる（.git が壊れていると git は親のリポジトリを
  # 見てしまい、メインの status を読んでしまう）
  WR_DIRTY=0
  WR_SUB_DIRTY=0
  sub_init=0
  wt_head=""
  if [ -d "${path}" ]; then
    top=$(git -C "${path}" rev-parse --show-toplevel 2>/dev/null) || top=""
    if [ -n "${top}" ] && [ "$(wr_real "${top}")" = "${real}" ] && status_out=$(git -C "${path}" -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none 2>/dev/null); then
      wr_count_status "${status_out}"
      # この worktree が実際に指すブランチ（toplevel がこの worktree 自身だと確かめた後に、削除と同じプロセスで読む）
      wt_head=$(git -C "${path}" symbolic-ref -q --short HEAD 2>/dev/null) || wt_head=""
      # 初期化済み submodule（先頭が - の行は未初期化）と、このworktree専用の modules ディレクトリ（deinit 後もコミットが残り得る）
      sub_init=$(git -C "${path}" submodule status 2>/dev/null | awk 'substr($0,1,1) != "-" && NF > 0 { n++ } END { print n + 0 }') || sub_init=0
      gd=$(git -C "${path}" rev-parse --absolute-git-dir 2>/dev/null) || gd=""
      if [ -n "${gd}" ] && [ -d "${gd}/modules" ] && [ -n "$(ls -A "${gd}/modules" 2>/dev/null)" ]; then sub_init=$((sub_init + 1)); fi
    else
      WR_DIRTY=-1
    fi
  fi
  T_DIRTY=${WR_DIRTY}
  plan=$(wr_plan "${m}" "${WR_DIRTY}" "${WR_SUB_DIRTY}" "${sub_init}")
  case "${plan}" in
    retain-dirty) T_WT='retained-dirty'; return 0 ;;
    retain-submodule) T_WT='retained-submodule'; return 0 ;;
  esac
  # discard で --branch を結びつけられた worktree は、その HEAD が --branch と一致するときだけ消す（呼び出し側が別のブランチ名を渡しても、
  # 無関係な worktree とそのブランチを消さない。worktree もブランチも残る）。実体が無い worktree（dead）は読めないので従来どおり
  if [ "${m}" = discard ] && [ -n "${expect}" ] && [ -d "${path}" ] && [ "${wt_head}" != "${expect}" ]; then T_WT='retained-branch-mismatch'; return 0; fi

  rc=0
  if [ "${lockact}" = unlock ]; then
    git worktree unlock -- "${path}" >/dev/null 2>&1 || rc=$?
    if [ "${rc}" -ne 0 ]; then T_WT='retained-locked'; return 0; fi
    T_UNLOCKED=true
  fi
  if [ "${plan}" = force ]; then
    git worktree remove --force -- "${path}" >/dev/null 2>&1 || rc=$?
  else
    git worktree remove -- "${path}" >/dev/null 2>&1 || rc=$?
  fi
  if [ "${rc}" -eq 0 ]; then T_WT=removed; else T_WT=failed; fi
  return 0
}

emit_remove() {
  local ok=false retained=false sha=$1
  if wr_ok "${mode}" "${T_WT}" "${T_BR}"; then ok=true; fi
  if wr_retained "${T_WT}"; then retained=true; fi
  printf 'WORKTREE_REMOVE_RESULT {"ok":%s,"mode":"%s","worktree":"%s","branch":"%s","branchSha":"%s","dirty":%s,"unlocked":%s,"retained":%s}\n' \
    "${ok}" "${mode}" "${T_WT}" "${T_BR}" "${sha}" "${T_DIRTY}" "${T_UNLOCKED}" "${retained}"
  exit 0
}

T_BR=none
if [ "${cmd}" = remove ]; then
  case "${mode}" in
    superseded | discard) ;;
    *) usage "--mode は superseded か discard" ;;
  esac
  if [ -n "${path}" ]; then wr_valid_path "${path}" || usage "--path の形が不正"; fi
  [ -n "${path}" ] || [ "${mode}" = discard ] || usage "superseded には --path が要る"
  if [ -n "${branch}" ]; then
    [ "${mode}" = discard ] || usage "--branch は discard 専用"
    wr_valid_branch "${branch}" || usage "--branch の形が不正"
  fi
  if [ -n "${base}" ]; then wr_valid_branch "${base}" || usage "--base の形が不正"; fi
  [ -z "${file}" ] || usage "--file は sweep 専用"

  if [ -n "${path}" ]; then
    remove_one "${mode}" "${path}" "${branch}"
  else
    T_WT=skipped
  fi
  # 何かを消した（または元から無い）あとの登録情報の掃除。消せなかった worktree は触らない（実体の無い登録だけが対象）
  git worktree prune >/dev/null 2>&1 || true

  sha=""
  if [ -n "${branch}" ]; then
    gone=0
    wr_wt_gone "${T_WT}" && gone=1
    exists=0
    if sha=$(git rev-parse --verify -q "refs/heads/${branch}^{commit}" 2>/dev/null); then exists=1; else sha=""; fi
    act=$(wr_branch_action "${branch}" "${base}" "${gone}" "${exists}")
    case "${act}" in
      delete)
        # 先頭 sha は消す前に結果へ出す（消した後は gc まで到達不能なオブジェクトとして残るだけで、reflog には残らない）
        rc=0
        git branch -D -- "${branch}" >/dev/null 2>&1 || rc=$?
        if [ "${rc}" -eq 0 ]; then T_BR=deleted; else T_BR=failed; fi
        ;;
      keep-base | keep | absent) T_BR=${act} ;;
      *) T_BR=none ;;
    esac
    [ "${act}" = delete ] || [ "${act}" = keep-base ] || [ "${act}" = keep ] || sha=""
    # 削除に失敗したときの sha は『消す前の先頭』ではなく『消えずに残った先頭』なので、復元の手がかりとしては出さない
    [ "${T_BR}" != failed ] || sha=""
  fi
  emit_remove "${sha}"
fi

# --- sweep ---
[ -z "${mode}${path}${branch}${base}" ] || usage "sweep は --file だけを取る"
wr_valid_file "${file}" || usage "--file は _/issue-trees/N.json の形で指定する"
command -v jq >/dev/null 2>&1 || { echo "worktree-remove: jq が無い" >&2; exit 3; }

sweep_result() { # $1 = removed（改行区切り）、$2 = retained、$3 = skipped、$4 = failed、$5 = reason
  local arr
  arr=$(printf '%s' "$1" | jq -R . | jq -sc .) || arr='[]'
  printf 'WORKTREE_REMOVE_RESULT {"ok":true,"mode":"sweep","removed":%s,"retained":%s,"skipped":%s,"failed":%s,"reason":"%s"}\n' "${arr}" "$2" "$3" "$4" "$5"
  exit 0
}

input=$(cat) || usage "標準入力を読めない"
# 形の検証（ちょうど 1 個の JSON 値が文字列の配列）と取り出しは分ける（空配列は有効で、取り出しの出力が 0 件になる）
printf '%s\n' "${input}" | jq -s -e 'length == 1 and (.[0] | type) == "array" and all(.[0][]; type == "string")' >/dev/null 2>&1 || sweep_result "" 0 0 0 invalid-input
candidates=$(printf '%s\n' "${input}" | jq -r -s '.[0][]' 2>/dev/null) || sweep_result "" 0 0 0 invalid-input
# 保持対象: failed / blocked / monitoring のイシューが記録した worktree。読めなければ（ファイル無し・壊れている）何も消さない
# 空ファイル・空白だけ・2 値・items が無い／配列は jq が 0 終了で通すので、保持対象が空のまま進んで消すことのないよう、形を先に確かめる
# items の値がオブジェクトでない・worktree が文字列でない状態も、保持対象を取りこぼしたまま進まないよう読めない扱いにする
jq -s -e 'length == 1 and (.[0] | type) == "object" and (.[0].items | type) == "object" and all(.[0].items[]; type == "object" and (if has("worktree") then .worktree else "" end | type) == "string")' "${file}" >/dev/null 2>&1 || sweep_result "" 0 0 0 state-unreadable
# 抽出側（wr_retain_list）も想定外の型に出会ったら非 0 終了する（黙って 0 件にしない）
retain_list=$(wr_retain_list "${file}") || sweep_result "" 0 0 0 state-unreadable
retain_real=""
while IFS= read -r r; do
  [ -n "${r}" ] || continue
  retain_real="${retain_real}$(wr_real "${r}")
"
done <<EOF
${retain_list}
EOF

removed=""
n_retained=0
n_skipped=0
n_failed=0
while IFS= read -r p; do
  [ -n "${p}" ] || continue
  if ! wr_valid_path "${p}"; then n_skipped=$((n_skipped + 1)); continue; fi
  pr=$(wr_real "${p}")
  held=0
  while IFS= read -r r; do
    if [ -n "${r}" ] && [ "${r}" = "${pr}" ]; then held=1; break; fi
  done <<EOF
${retain_real}
EOF
  if [ "${held}" = 1 ]; then n_retained=$((n_retained + 1)); continue; fi
  remove_one superseded "${p}"
  case "${T_WT}" in
    removed) removed="${removed}${p}
" ;;
    not-registered | main | cwd) n_skipped=$((n_skipped + 1)) ;;
    failed) n_failed=$((n_failed + 1)) ;;
    *) n_retained=$((n_retained + 1)) ;;
  esac
done <<EOF
${candidates}
EOF
git worktree prune >/dev/null 2>&1 || true
sweep_result "${removed}" "${n_retained}" "${n_skipped}" "${n_failed}" ""
