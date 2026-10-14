#!/usr/bin/env bash
# worktree-remove.sh — worktree の破棄・掃除を、確認と削除を同じプロセスで決定的に行う
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立て、掃除エージェントが 1 回実行する）:
#   bash worktree-remove.sh remove --mode superseded --path <worktree>
#   bash worktree-remove.sh remove --mode discard [--path <worktree>] [--branch <branch> --base <base>] [--head <40 桁の sha>] [--expect-branch <branch>]
#   bash worktree-remove.sh sweep --file _/issue-trees/N.json     （標準入力: 削除候補のパスの JSON 配列）
#   bash worktree-remove.sh check-absent --path <worktree> [--repo-root <メイン worktree>]   （読み取り専用: そのパスが不在かだけを観測する。何も削除・変更しない）
#
# 役割: 掃除プロンプトが文章で持っていた「登録の確認 → lock の扱い → 汚れの確認 → 削除 → ブランチ削除」を、固定のコマンド列として
#       持つ（Issue #603 第 7 弾）。確認と削除を同じプロセスで行い、確認した状態のまま削除する。
#   superseded  マージ済み・置き換え済み・最終スイープ。汚れていても --force で消す（汚れの行数を結果に記録）。ただし submodule に
#               未記録の変更があれば保持する。
#   discard     Recover の破棄・継続。汚れていれば、または初期化済み submodule があれば保持する（--force は使わない）。--branch が
#               あれば worktree が無くなったあとでブランチも消す（消す前の先頭 sha を結果に出す。base と同名のブランチは消さない）。--path と --branch を
#               両方与えたときは、削除の前に同じプロセスでその worktree の HEAD を読み、--branch と違えば worktree もブランチも消さない。
#               --expect-branch <branch>（--path が要る・--branch とは併用しない）は --branch と同じ位置・同じ判定（HEAD が違う・detached なら保持）だけを行い、
#               ブランチは消さない（規約外の名前のブランチ上の worktree を片づけるとき、HEAD の照合なしで消さないための引数。base と同名でも照合だけなので拒否しない）。
#               --head <sha>（--path が要る）を与えたときは、同じプロセスで worktree の HEAD のコミットを読み、sha と違えば（読めないときも）
#               消さない。マージ済み PR の head との一致で『未 push のコミットを持たない』ことを確かめる用（squash マージは base との差分で見分けられない）。
#   sweep       ラン終了時の残骸回収。候補ごとに superseded と同じ規則で消す。状態ファイルが failed / blocked / monitoring の
#               イシューに記録した worktree、登録されていないパス、メイン worktree は消さない。状態ファイルを読めなければ何も消さない。
#   check-absent  削除を一切しない不在専用の確認（Issue #637）。人が worktree を手で消した後の再実行で、状態の worktree 記録を捨ててよいかの根拠にする。
#               worktree remove・unlock・prune・branch の削除を持たず、`git worktree list --porcelain` の読み取りとパスの実在の観測だけを行う。
#               照合の前に --path を正規化する（末尾の / と /.・連続する /・途中の /./ を畳む。.. は入力検証が拒否済みで解決しない）。大小だけが違う登録と
#               一致するときは、同じ場所かもしれない（大小を区別しないファイルシステム）として不在と言わず unknown にする。一覧はカレントのリポジトリから取るので、
#               --repo-root（無ければパスの最寄りの実在する祖先）の属するリポジトリとカレントの共通 git ディレクトリを照合し、違う・求められないときは unknown。
#               absent = 登録が無くパスも無い / prunable = 登録だけ残り実体が無い（lock なし・ブランチ上〔HEAD が 0000… でない〕。HEAD はブランチ ref が持つので失うものが無い。
#               登録の掃除はこのモードでしない）。ホストが不在として扱うのはこの 2 語だけ。ほかは保全側: prunable-detached = 登録だけ残り detached、または HEAD が 0000…（ブランチ ref を update-ref -d で消した形）
#               （登録がコミットの唯一の参照かもしれない）/ prunable-locked = 登録だけ残り lock あり（git は lock を prune しない・外付けの一時的な未接続かも
#               しれない）/ present = 登録も実体もある / unregistered-present = 登録は無いがパスがある / main / unknown = 一覧・実在を確定できない。
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
# --branch の削除: そのブランチを持つ実体の無い登録が残っていると git branch -D が used by worktree で拒否する。全体の prune には頼らず、その登録だけを
#       remove_one（同じ確認・同じ許可形の git worktree remove）で 1 件消してからブランチを消す。lock あり・実体の無い detached・HEAD 0000… は消さず保持の語を結果にし、
#       ブランチも残す（keep）。実体のある別の worktree が持つブランチは触らない（branch -D が失敗する従来どおり）。
#       実体の無いパスは実体のパス（祖先のシンボリックリンクを解決した形）でも照合する。大小だけ違う綴りは一致させない（大小を区別する FS では別の場所を消しかねない）。
# prune: 全体の `git worktree prune` は safe_prune の 1 か所だけが呼ぶ。remove で何も消さなかったとき（not-registered・main・cwd・保持）は呼ばず、呼ぶときも
#       実体の無い登録のうち detached または HEAD 0000… のもの（コミットの唯一の参照かもしれない・lock なしの prune 対象）が 1 件でもあれば全体をスキップする
#       （prune は対象を絞れない。登録が残るだけで、結果の語は変わらない）。スキップした件数は結果の行の pruneSkipped（0 のときは出さない）。
# 自衛: メイン worktree（porcelain の先頭エントリ・実体のパスの一致）、登録されていないパス、カレントがその中にあるパスは消さない。
#       rm の再帰削除は持たない（git worktree remove が消せなかったものは保持して報告する）。
# 出力: 標準出力の最後の 1 行が `WORKTREE_REMOVE_RESULT {json}`。値は固定語彙と件数のみ（パスは sweep の removed だけで、
#       検証済みの候補のパスに限る）。
#           main = メイン worktree、cwd = カレントがその worktree の中（どちらも消さない）。
#           retained-branch-mismatch = discard で --path と --branch（または --expect-branch）を与えたとき、worktree の HEAD が --branch と違う（detached を含む。worktree もブランチも消さない）。
#           retained-head-mismatch = discard で --head を与えたとき、worktree の HEAD のコミットが --head と違う（読めないときを含む。worktree もブランチも消さない）。
#           retained-detached = discard で --head を与えたとき、HEAD が一致していても detached（detached 上の未 push のコミットは消すと失われる）。
#           retained-unobservable = 観測に失敗した（git status コマンドそのものの失敗・--head 指定時の HEAD のコミットの一過性の読み取り失敗）。何も消さない。
#               retained-dirty / retained-head-mismatch / retained-broken は観測した結果の保持で、これは観測できなかったという別の語（ホストは前者を恒久の試行済みに記録し、これは次のランで再試行させる）。
#           retained-broken = git の対象が worktree 自身でない（.git の破損・toplevel の不一致）。読み直しても変わらない決定的な状態なのでホストは記録する側。
#               rev-parse の一過性の失敗と区別できないときも、毎ラン再試行して枠を食い続けるより安全なので、この語（記録側）へ倒す。何も消さない。
#           unborn（コミットが無い）の HEAD に --head を渡したときは retained-head-mismatch（PR の head と一致し得ない決定的な状態。毎ラン再試行させない）。
#           retained-detached は実体の無い登録にも使う: 実体が無く、detached または HEAD 0000…（ブランチ ref が無い）で lock の無い登録は、登録がコミットの唯一の参照かもしれず、
#               消すと到達不能になるので superseded・discard・sweep のすべてで消さない。
#           branchSha は消す前（または消さなかった）ブランチの先頭 sha で、ブランチの削除に失敗したとき（failed）は空。
#   check-absent: remove と同じ形で mode が check-absent、worktree が上の語、branch は none、dirty は 0、retained は absent・prunable 以外で true。
#   remove: {"ok":bool,"mode":"…","worktree":"removed|not-registered|skipped|main|cwd|retained-dirty|retained-broken|retained-submodule|retained-locked|retained-branch-mismatch|retained-head-mismatch|retained-detached|retained-unobservable|failed",
#            "branch":"none|deleted|absent|keep-base|keep|failed","branchSha":"<40 桁 | 空>","dirty":N,"unlocked":bool,"retained":bool[,"pruneSkipped":N]}
#   sweep:  {"ok":true,"mode":"sweep","removed":["…"],"retained":N,"skipped":N,"failed":N,"reason":"…"[,"pruneSkipped":N]}
#           reason は空 / state-unreadable / invalid-input。state-unreadable と invalid-input では何も消さない。
#   結果を出せたときは、削除の失敗や保持を含めて exit 0。
# 終了コード: 0 結果の行を出力した / 2 使い方の誤り（結果の行は出さない）/ 3 git・jq が無い
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。

set -u
unset POSIXLY_CORRECT
# 環境の GIT_DIR などが残っていると、git の対象が引数のパスでなく環境の指すリポジトリになる（wr_repo_matches が誤って一致し、登録を見落として absent を返し得る）
unset GIT_DIR GIT_WORK_TREE GIT_COMMON_DIR GIT_INDEX_FILE
LC_ALL=C
export LC_ALL

command -v git >/dev/null 2>&1 || { echo "worktree-remove: git が無い" >&2; exit 3; }
script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 3
# shellcheck source=lib/worktree-remove-lib.sh
. "${script_dir}/lib/worktree-remove-lib.sh" || exit 3

usage() {
  echo "使い方: worktree-remove.sh remove --mode (superseded|discard) [--path P] [--branch B --base BASE] [--head SHA] [--expect-branch B] / sweep --file _/issue-trees/N.json（候補は標準入力）/ check-absent --path P [--repo-root R]" >&2
  [ $# -eq 0 ] || echo "worktree-remove: $1" >&2
  exit 2
}

cmd=${1:-}
[ $# -gt 0 ] && shift
case "${cmd}" in
  remove | sweep | check-absent) ;;
  *) usage "サブコマンドは remove か sweep か check-absent" ;;
esac

mode=""
path=""
branch=""
base=""
head=""
head_set=0
expect_branch=""
expect_set=0
file=""
repo_root=""
repo_root_set=0
while [ $# -gt 0 ]; do
  case "$1" in
    --mode | --path | --branch | --base | --head | --expect-branch | --file | --repo-root)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --mode) mode=$2 ;;
        --path) path=$2 ;;
        --branch) branch=$2 ;;
        --base) base=$2 ;;
        --head) head=$2; head_set=1 ;;
        --expect-branch) expect_branch=$2; expect_set=1 ;;
        --file) file=$2 ;;
        --repo-root) repo_root=$2; repo_root_set=1 ;;
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
# $1 = モード、$2 = パス、$3 = 結びつけるブランチ（discard の --branch。空 = 結びつけない）、$4 = 結びつける HEAD の sha（discard の --head。空 = 結びつけない）
remove_one() {
  local m=$1 path=$2 expect=${3:-} expect_sha=${4:-} wt_sha wt_head wt_unborn lreal list top real cwd_real plan lockact alive cur_start status_out sub_init gd rc kmsg krc kw pw pself pout prc xw
  T_WT=""
  T_DIRTY=0
  T_UNLOCKED=false
  # 字面を正規化してから使う（末尾の / と /.・連続する /・途中の /./。.. は入力検証が拒否済み）。remove は実体の無いパスを自分では
  # 解決せず、登録の字面と比べるので、正規化しない綴りで指すと登録を見つけても消せない
  path=$(wr_norm_path "${path}")
  list=$(git worktree list --porcelain 2>/dev/null) || { T_WT=failed; return 0; }
  wr_find_entry "${list}" "${path}"
  if [ "${WR_REGISTERED}" != 1 ] && [ ! -e "${path}" ] && [ ! -L "${path}" ]; then
    # 実体の無いパスは字面のままでは登録（実体のパス）と照合できない（祖先がシンボリックリンクのとき）。check-absent と同じく、実在する祖先を実体にした形でも探す。
    # 一致したらそのパスで以降を進める（git worktree remove は実体の無いパスを自分では解決しない）。大小だけ違う綴りは一致させない（大小を区別する
    # ファイルシステムでは別の場所を消しかねない。照合できないなら従来どおり not-registered）
    lreal=$(wr_loose_real "${path}")
    wr_find_entry "${list}" "${lreal}"
    if [ "${WR_REGISTERED}" = 1 ]; then path=${lreal}; fi
  fi
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

  # 実体の無い登録で、detached または HEAD が 0000…（ブランチ ref が無い）ものは、登録がそのコミットの唯一の参照かもしれない（消すと到達不能になる）。
  # 消さずに保持する（superseded・discard・sweep のすべて。lock を外すのもこの確認のあと）。ブランチ上の登録は HEAD をブランチ ref が持つので失うものが無い
  if [ ! -e "${path}" ] && [ ! -L "${path}" ] && [ "${WR_DETACHED}" = 1 ]; then T_WT='retained-detached'; return 0; fi

  # 汚れの確認。実体があるときだけ。git の対象がこの worktree 自身であることを確かめる（.git が壊れていると git は親のリポジトリを
  # 見てしまい、メインの status を読んでしまう）
  WR_DIRTY=0
  WR_SUB_DIRTY=0
  sub_init=0
  wt_head=""
  wt_sha=""
  wt_unborn=0
  if [ -d "${path}" ]; then
    top=$(git -C "${path}" rev-parse --show-toplevel 2>/dev/null) || top=""
    if [ -z "${top}" ] || [ "$(wr_real "${top}")" != "${real}" ]; then
      # git の対象がこの worktree 自身でない（.git の破損・toplevel の不一致）。読み直しても変わらない決定的な状態なので retained-broken（記録する側）。
      # rev-parse の一過性の失敗もここへ入るが、区別できないときは恒久側へ倒す（毎ラン再試行して closed 後始末の枠を食い続けるより、記録して人に見せる）
      WR_DIRTY=-2
    elif status_out=$(git -C "${path}" -c core.excludesFile= status --porcelain=v2 -uall --ignore-submodules=none 2>/dev/null); then
      wr_count_status "${status_out}"
      # この worktree が実際に指すブランチ（toplevel がこの worktree 自身だと確かめた後に、削除と同じプロセスで読む）
      wt_head=$(git -C "${path}" symbolic-ref -q --short HEAD 2>/dev/null) || wt_head=""
      wt_sha=$(git -C "${path}" rev-parse -q --verify 'HEAD^{commit}' 2>/dev/null) || wt_sha=""
      # コミットを読めなかった理由の見分け: HEAD が指すブランチの ref が無ければ unborn（決定的）、ブランチの ref があるのに読めなければ一過性の失敗
      if [ -z "${wt_sha}" ] && [ -n "${wt_head}" ] && ! git -C "${path}" show-ref --verify -q "refs/heads/${wt_head}" 2>/dev/null; then wt_unborn=1; fi
      # 初期化済み submodule（先頭が - の行は未初期化）と、このworktree専用の modules ディレクトリ（deinit 後もコミットが残り得る）
      sub_init=$(git -C "${path}" submodule status 2>/dev/null | awk 'substr($0,1,1) != "-" && NF > 0 { n++ } END { print n + 0 }') || sub_init=0
      gd=$(git -C "${path}" rev-parse --absolute-git-dir 2>/dev/null) || gd=""
      if [ -n "${gd}" ] && [ -d "${gd}/modules" ] && [ -n "$(ls -A "${gd}/modules" 2>/dev/null)" ]; then sub_init=$((sub_init + 1)); fi
    else
      WR_DIRTY=-1 # git status コマンドそのものの失敗（一過性になり得る）
    fi
  fi
  T_DIRTY=${WR_DIRTY}
  if [ "${T_DIRTY}" -lt -1 ]; then T_DIRTY=-1; fi
  plan=$(wr_plan "${m}" "${WR_DIRTY}" "${WR_SUB_DIRTY}" "${sub_init}")
  case "${plan}" in
    retain-dirty) T_WT='retained-dirty'; return 0 ;;
    retain-unobservable) T_WT='retained-unobservable'; return 0 ;;
    retain-broken) T_WT='retained-broken'; return 0 ;;
    retain-submodule) T_WT='retained-submodule'; return 0 ;;
  esac
  # discard で --branch を結びつけられた worktree は、その HEAD が --branch と一致するときだけ消す（呼び出し側が別のブランチ名を渡しても、
  # 無関係な worktree とそのブランチを消さない。worktree もブランチも残る）。実体が無い worktree（dead）は読めないので従来どおり
  if [ "${m}" = discard ] && [ -d "${path}" ] && [ "$(wr_branch_check "${expect}" "${wt_head}")" != ok ]; then T_WT='retained-branch-mismatch'; return 0; fi

  # --head を結びつけられた worktree は、HEAD のコミットが一致するときだけ消す（マージ済み PR の head に無いコミット = 未 push の作業を守る）。
  # 実体が無い worktree（dead）は読めない・失う作業も無いので従来どおり
  if [ "${m}" = discard ] && [ -n "${expect_sha}" ] && [ -d "${path}" ]; then
    case "$(wr_head_check "${expect_sha}" "${wt_sha}" "${wt_head}" "${wt_unborn}")" in
      ok) ;;
      retain-detached) T_WT='retained-detached'; return 0 ;;
      retain-unobservable) T_WT='retained-unobservable'; return 0 ;;
      *) T_WT='retained-head-mismatch'; return 0 ;;
    esac
  fi

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

# 全体の worktree prune。prune はこの 1 か所だけが呼ぶ。実体の無い登録のうち、そのコミットの最後の参照になり得るもの（detached、または HEAD が
# 0000… = wr_prune_risk）が 1 件でもあるときは、prune しない（登録ごと消えるとコミットが到達不能になる。git worktree prune は対象を絞れない）。
# スキップした件数は PRUNE_SKIPPED に入り、結果の行に pruneSkipped として出る。スキップしても登録が残るだけで、ほかの結果の語は変わらない。
# 一覧を読めないときも prune しない（保全側）
PRUNE_SKIPPED=0
safe_prune() {
  local plist
  PRUNE_SKIPPED=0
  plist=$(git worktree list --porcelain 2>/dev/null) || { PRUNE_SKIPPED=1; return 0; }
  wr_prune_risk "${plist}"
  if [ "${WR_PRUNE_RISK}" -gt 0 ]; then PRUNE_SKIPPED=${WR_PRUNE_RISK}; return 0; fi
  git worktree prune >/dev/null 2>&1 || true
}

# 結果の行に足す prune スキップの件数（0 のときは何も足さない）
prune_field() {
  if [ "${PRUNE_SKIPPED}" -gt 0 ]; then printf ',"pruneSkipped":%s' "${PRUNE_SKIPPED}"; fi
}

emit_remove() {
  local ok=false retained=false sha=$1
  if wr_ok "${mode}" "${T_WT}" "${T_BR}"; then ok=true; fi
  if wr_retained "${T_WT}"; then retained=true; fi
  printf 'WORKTREE_REMOVE_RESULT {"ok":%s,"mode":"%s","worktree":"%s","branch":"%s","branchSha":"%s","dirty":%s,"unlocked":%s,"retained":%s%s}\n' \
    "${ok}" "${mode}" "${T_WT}" "${T_BR}" "${sha}" "${T_DIRTY}" "${T_UNLOCKED}" "${retained}" "$(prune_field)"
  exit 0
}

T_BR=none
if [ "${repo_root_set}" -eq 1 ] && [ "${cmd}" != check-absent ]; then usage "--repo-root は check-absent 専用"; fi
# 不在専用の確認。ここで必ず exit する（remove の prune・sweep の処理へ落ちない）。--path 以外の引数は受け付けない
if [ "${cmd}" = check-absent ]; then
  [ -z "${mode}${branch}${base}${head}${expect_branch}${file}" ] && [ "${head_set}" -eq 0 ] && [ "${expect_set}" -eq 0 ] || usage "check-absent は --path と --repo-root だけを取る"
  [ -n "${path}" ] && wr_valid_path "${path}" || usage "check-absent には妥当な --path が要る"
  if [ "${repo_root_set}" -eq 1 ]; then
    [ -n "${repo_root}" ] && wr_valid_path "${repo_root}" || usage "--repo-root の形が不正"
  fi
  # 照合は字面を正規化してから行う（末尾の / と /.・連続する /・途中の /./）。.. は wr_valid_path が拒否済みで、解決して別の場所を指させない
  path=$(wr_norm_path "${path}")
  ca_ok=1
  ca_ci=0
  ca_list=$(git worktree list --porcelain 2>/dev/null) || { ca_ok=0; ca_list=""; }
  # 一覧を取るのはカレントのリポジトリ。対象のリポジトリと違えば登録を見落として absent に倒れるので、確定できないとき・違うときは unknown
  [ "${ca_ok}" -eq 0 ] || wr_repo_matches "${repo_root}" "${path}" || ca_ok=0
  ca_fs=$(wr_path_state "${path}")
  wr_find_entry "${ca_list}" "${path}"
  if [ "${WR_REGISTERED}" != 1 ] && [ "${ca_fs}" = missing ]; then
    # 存在しないパスは字面のままでは登録（実体のパス）と照合できないので、実在する祖先を実体にした形でも探す
    wr_find_entry "${ca_list}" "$(wr_loose_real "${path}")"
  fi
  if [ "${WR_REGISTERED}" != 1 ] && [ "${ca_fs}" = missing ]; then
    # 大小だけが違う登録（大小を区別しないファイルシステムでは同じ場所）。登録なしとは言えないので、不在側に倒さない（unknown）
    wr_find_entry "${ca_list}" "$(wr_loose_real "${path}")" 1
    ca_ci=${WR_REGISTERED}
    WR_REGISTERED=0
  fi
  T_WT=$(wr_absent_word "${ca_ok}" "${ca_fs}" "${WR_REGISTERED}" "${WR_MAIN}" "${WR_LOCKED}" "${WR_DETACHED}" "${ca_ci}")
  mode=check-absent
  emit_remove ""
fi
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
  if [ "${expect_set}" -eq 1 ]; then
    [ "${mode}" = discard ] || usage "--expect-branch は discard 専用"
    [ -n "${path}" ] || usage "--expect-branch には --path が要る"
    [ -z "${branch}" ] || usage "--expect-branch は --branch と併用しない"
    wr_valid_branch "${expect_branch}" || usage "--expect-branch の形が不正"
  fi
  if [ "${head_set}" -eq 1 ]; then
    [ "${mode}" = discard ] || usage "--head は discard 専用"
    [ -n "${path}" ] || usage "--head には --path が要る"
    wr_valid_head "${head}" || usage "--head は 40 桁の小文字 16 進"
  fi
  [ -z "${file}" ] || usage "--file は sweep 専用"

  if [ -n "${path}" ]; then
    remove_one "${mode}" "${path}" "${branch:-${expect_branch}}" "${head}"
  else
    T_WT=skipped
  fi
  # --branch の削除は、そのブランチを持つ実体の無い登録が残っていると git に拒否される（used by worktree）。全体の prune に頼らず、
  # そのブランチを持つ登録だけを remove_one で（同じ確認・同じ許可形の git worktree remove で）1 件消す。lock 中・detached・HEAD 0000… は
  # remove_one が保持の語で返すので、その語を結果にしてブランチは残す。実体のある別の worktree が持つ場合は触れない（従来どおり branch -D が失敗する）
  if [ -n "${branch}" ] && wr_wt_gone "${T_WT}"; then
    hl=$(git worktree list --porcelain 2>/dev/null) || hl=""
    wr_branch_holder "${hl}" "${branch}"
    holder=${WR_HOLDER}
    if [ -n "${holder}" ] && [ ! -e "${holder}" ] && [ ! -L "${holder}" ] && wr_valid_path "${holder}"; then
      was_unlocked=${T_UNLOCKED}
      remove_one discard "${holder}"
      if [ "${was_unlocked}" = true ]; then T_UNLOCKED=true; fi
    fi
  fi
  # 何かを消した（または元から無い）あとの登録情報の掃除。何も消さなかった（登録なし・メイン・カレント・保持）ときは prune しない。
  # 実体の無い登録のうちコミットの唯一の参照になり得るもの（detached・HEAD 0000…）があれば safe_prune がスキップする
  case "${T_WT}" in
    not-registered | main | cwd | retained-*) ;;
    *) safe_prune ;;
  esac

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
[ -z "${mode}${path}${branch}${base}${head}${expect_branch}" ] && [ "${head_set}" -eq 0 ] && [ "${expect_set}" -eq 0 ] || usage "sweep は --file だけを取る"
wr_valid_file "${file}" || usage "--file は _/issue-trees/N.json の形で指定する"
command -v jq >/dev/null 2>&1 || { echo "worktree-remove: jq が無い" >&2; exit 3; }

sweep_result() { # $1 = removed（改行区切り）、$2 = retained、$3 = skipped、$4 = failed、$5 = reason
  local arr
  arr=$(printf '%s' "$1" | jq -R . | jq -sc .) || arr='[]'
  printf 'WORKTREE_REMOVE_RESULT {"ok":true,"mode":"sweep","removed":%s,"retained":%s,"skipped":%s,"failed":%s,"reason":"%s"%s}\n' "${arr}" "$2" "$3" "$4" "$5" "$(prune_field)"
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
if [ -n "${removed}" ] || [ "${n_failed}" -gt 0 ]; then safe_prune; fi
sweep_result "${removed}" "${n_retained}" "${n_skipped}" "${n_failed}" ""
