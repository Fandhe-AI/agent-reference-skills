#!/usr/bin/env bash
# recover-prep.sh — Recover の機械的な部分（対象ブランチの解決・未コミット変更の WIP コミット・base の取得・差分の有無）を決定的に行う
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立て、Recover エージェントが 1 回実行する）:
#   bash recover-prep.sh --base BASE [--worktree PATH] [--branch BRANCH]
#     --worktree  状態ファイルに記録されていた旧 worktree のパス（無ければ branch だけの残骸）
#     --branch    状態ファイルに記録されていたブランチ名（参考値。worktree の HEAD と食い違えば HEAD を使う）
#
# 役割: recoverPrompt が文章で持っていた「worktree の HEAD からのブランチ解決 → 未コミット変更の WIP コミット → origin/<base> の取得 →
#       base との差分の有無」を、判断を挟まない固定のコマンド列として持つ（Issue #603 第 9 弾）。エージェントに残るのは、継続か破棄かの判断と
#       回復ブリーフ（done / remaining / broken）の作成だけである。ブランチの削除・worktree の削除・push は行わない（削除は worktree-remove.sh）。
#   1. 旧 worktree の状態を調べる（無い = dead worktree、メイン worktree、登録されていない、git がそのパス自身を指さない、登録済みで実体が一致）。
#      live なら `git symbolic-ref` の HEAD を対象ブランチにする（state のブランチと食い違えば HEAD を優先する）。dead は記録されたブランチを使う。
#      メイン・未登録・不一致・detached・base と同名は確定せず（resolved:false）、何も書かない
#   2. live のとき、未コミット変更があれば WIP コミットを作る。汚れの観測は worktree-remove.sh と同じ対象の
#      `git -c core.excludesFile= status --porcelain=v2 -z -uall --ignore-submodules=none`（利用者の status.showUntrackedFiles や submodule の ignore、
#      グローバルの除外に左右されない。-z はパスの C 引用〔非 ASCII・"・\・タブ〕で入れ子の git リポジトリの検出が取りこぼすのを避けるため。
#      worktree-remove.sh は行数だけを数え、引用で数は変わらないので -z なしのまま）。フックは通す（--no-verify を使わない）。退避完了（wipCommitted:true）の根拠はコミットの終了コードではなく、
#      コミット後の同じ観測で汚れが無いこと。フックの拒否・フックによる書き換え・submodule 内の未コミットの変更・入れ子の git リポジトリ・
#      未マージのエントリ・マージ／cherry-pick／revert／rebase の途中があれば false（推測で true にしない）。コミットの終了コードが成功でも、
#      HEAD が進んでいない・進んだが前の HEAD との差分が空（フックが commit のあとで変更を捨てた）なら empty-commit・false。拒否されたときの add は戻さない（staged は worktree-remove.sh が汚れとして保持する）
#   3. 対象ブランチが確定したら `git fetch origin refs/heads/<base>:refs/remotes/origin/<base>` で base を最新化し、
#      `git diff --quiet --no-ext-diff --ignore-submodules=none <base>...<branch>` で差分の有無を調べる（利用者の diff.ignoreSubmodules や
#      diff.external に左右されない。submodule ポインタだけの変更も差分に数える）（fetch に失敗したら unknown。空とは扱わない）。差分があれば先行コミット数と変更ファイル数も出す
# 初期化済み submodule の扱い: 親の `git add -A` は submodule 内の未コミットの変更を記録しない。そうした変更はコミット後も汚れとして残るので wip:submodule・
#       wipCommitted:false になる。submodule の変更が無いなら、初期化済みであること自体は WIP の判定に影響しない（discard の可否は worktree-remove.sh が
#       初期化済み submodule の存在で保持として判定する）。
# 出力: 標準出力の最後の 1 行が `RECOVER_PREP_RESULT {json}`。値は固定語彙・真偽・件数・40 桁 16 進の sha と、検証済みのブランチ名だけ
#       （パス・hook の出力・外部由来の文字列を入れない。診断は標準エラーへ）。結果を出せたときは、失敗や未確定を含めて exit 0。
#         {"resolved":bool,"reason":"…","branch":"…","source":"worktree|state|none","worktreeMissing":bool,
#          "wip":"none|skipped|committed|commit-failed|empty-commit|unmerged|in-progress|nested-repo|submodule|residual-dirty|unverified","wipCommitted":bool,"dirty":N,
#          "branchExists":bool,"branchSha":"<40 桁 | 空>","baseFetched":bool,"baseSha":"<40 桁 | 空>","diff":"empty|nonempty|unknown",
#          "commitsAhead":N,"filesChanged":N}
#         reason は resolved:false のときの理由（main-worktree / not-registered / toplevel-mismatch / detached / base-branch / no-target / list-failed）。
#         dirty は WIP の前の汚れの行数（-1 = 確認できなかった。live 以外は 0）。commitsAhead と filesChanged は diff が nonempty のときだけ非 0。
#         wipCommitted はホストの削除の第 1 層のゲートに使われるが、封筒は付けない（削除の実効ゲートは worktree-remove.sh が削除と同じプロセスで行う独立観測で、
#         この値の偽装では破れない。references/script-trust-model.md の第 9 弾）。
# 終了コード: 0 結果の行を出力した / 2 使い方の誤り（結果の行は出さない）/ 3 git が無い
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・GNU 専用フラグを使わない。

set -u
unset POSIXLY_CORRECT
LC_ALL=C
export LC_ALL
GIT_TERMINAL_PROMPT=0
export GIT_TERMINAL_PROMPT

command -v git >/dev/null 2>&1 || { echo "recover-prep: git が無い" >&2; exit 3; }
script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 3
# shellcheck source=lib/worktree-remove-lib.sh
. "${script_dir}/lib/worktree-remove-lib.sh" || exit 3
# shellcheck source=lib/recover-prep-lib.sh
. "${script_dir}/lib/recover-prep-lib.sh" || exit 3

usage() {
  echo "使い方: recover-prep.sh --base BASE [--worktree PATH] [--branch BRANCH]（--worktree か --branch の少なくとも 1 つ）" >&2
  [ $# -eq 0 ] || echo "recover-prep: $1" >&2
  exit 2
}

path=""
branch=""
base=""
while [ $# -gt 0 ]; do
  case "$1" in
    --worktree | --branch | --base)
      [ $# -ge 2 ] || usage "$1 に値が無い"
      case "$1" in
        --worktree) path=$2 ;;
        --branch) branch=$2 ;;
        --base) base=$2 ;;
      esac
      shift 2
      ;;
    *) usage "未知の引数: $1" ;;
  esac
done
[ -n "${base}" ] && wr_valid_branch "${base}" || usage "--base は必須で、ブランチ名の形"
if [ -n "${path}" ]; then wr_valid_path "${path}" || usage "--worktree の形が不正"; fi
if [ -n "${branch}" ]; then wr_valid_branch "${branch}" || usage "--branch の形が不正"; fi
[ -n "${path}" ] || [ -n "${branch}" ] || usage "--worktree か --branch が要る"

# 結果の各項目（emit が出力する）
R_WIP=skipped
R_WIPOK=false
R_DIRTY=0
R_EXISTS=false
R_BSHA=""
R_FETCHED=false
R_BASESHA=""
R_DIFF=unknown
R_AHEAD=0
R_FILES=0

emit() {
  local resolved=false wtm=false
  [ "${RP_RESOLVED}" = 1 ] && resolved=true
  [ "${RP_WT_MISSING}" = 1 ] && wtm=true
  printf 'RECOVER_PREP_RESULT {"resolved":%s,"reason":"%s","branch":"%s","source":"%s","worktreeMissing":%s,"wip":"%s","wipCommitted":%s,"dirty":%s,"branchExists":%s,"branchSha":"%s","baseFetched":%s,"baseSha":"%s","diff":"%s","commitsAhead":%s,"filesChanged":%s}\n' \
    "${resolved}" "${RP_REASON}" "${RP_BRANCH}" "${RP_SOURCE}" "${wtm}" "${R_WIP}" "${R_WIPOK}" "${R_DIRTY}" "${R_EXISTS}" "${R_BSHA}" "${R_FETCHED}" "${R_BASESHA}" "${R_DIFF}" "${R_AHEAD}" "${R_FILES}"
  exit 0
}

# 汚れの観測。worktree-remove.sh の確認と同じ対象（同じ設定に左右されない形）を、NUL 区切り（-z）で読む。-z でないとパスが C 引用（非 ASCII・"・\・タブ）で
# 出て、入れ子の git リポジトリ（`? パス/`）の検出が取りこぼす。シェル変数は NUL を持てないので、tr で改行→? と NUL→改行（パス中の改行を行区切りと
# 紛れさせず、1 レコード 1 行にする）に変え、rename / copy レコード（`2 `）の直後の元のパスのレコードは awk で落とし、git の終了コードは末尾の
# GITRC= の行で受け取る（パイプでは git の終了コードが消えるため）。結果は OBS_OUT（1 レコード 1 行）・OBS_RC に入る
OBS_OUT=""
OBS_RC=0
observe() { # $1 = worktree のパス
  local raw last
  OBS_RC=0
  OBS_OUT=""
  raw=$({ git -C "$1" -c core.excludesFile= status --porcelain=v2 -z -uall --ignore-submodules=none 2>/dev/null; printf 'GITRC=%s\0' "$?"; } |
    tr '\012\000' '?\012' |
    awk 'skip { skip = 0; next } { print } substr($0, 1, 2) == "2 " { skip = 1 }')
  last=${raw##*$'\n'}
  case "${last}" in
    GITRC=*) OBS_RC=${last#GITRC=} ;;
    *) OBS_RC=1 ;;
  esac
  case "${OBS_RC}" in '' | *[!0-9]*) OBS_RC=1 ;; esac
  case "${raw}" in
    *$'\n'*) OBS_OUT=${raw%$'\n'*} ;;
  esac
}

# マージ・cherry-pick・revert・rebase の途中か（未解決の途中状態。add -A は確定させてしまうので触らない）。ref とディレクトリの両方で見る
in_progress() { # $1 = worktree のパス
  local ref d gp
  for ref in MERGE_HEAD CHERRY_PICK_HEAD REVERT_HEAD REBASE_HEAD; do
    if git -C "$1" rev-parse -q --verify "${ref}" >/dev/null 2>&1; then return 0; fi
  done
  for d in rebase-merge rebase-apply sequencer; do
    gp=$(git -C "$1" rev-parse --git-path "${d}" 2>/dev/null) || continue
    case "${gp}" in /*) ;; *) gp="$1/${gp}" ;; esac
    if [ -d "${gp}" ]; then return 0; fi
  done
  return 1
}

# 1. 旧 worktree の状態
wtstate=missing
head_branch=""
if [ -n "${path}" ]; then
  if [ ! -e "${path}" ] && [ ! -L "${path}" ]; then
    wtstate=missing
  else
    # 登録の一覧を取れなければ確定しない（登録済みかの判断ができない）。RP_* は rp_resolve が決める値の初期状態のまま emit する
    list=$(git worktree list --porcelain 2>/dev/null) || { RP_RESOLVED=0; RP_REASON='list-failed'; emit; }
    wr_find_entry "${list}" "${path}"
    if [ "${WR_MAIN}" = 1 ]; then
      wtstate=main
    elif [ "${WR_REGISTERED}" != 1 ]; then
      wtstate=unregistered
    else
      top=$(git -C "${path}" rev-parse --show-toplevel 2>/dev/null) || top=""
      if [ -n "${top}" ] && [ "$(wr_real "${top}")" = "$(wr_real "${path}")" ]; then
        wtstate=live
        head_branch=$(git -C "${path}" symbolic-ref -q --short HEAD 2>/dev/null) || head_branch=""
        wr_valid_branch "${head_branch}" || head_branch=""
      else
        wtstate=mismatch
      fi
    fi
  fi
fi
given=0
[ -n "${path}" ] && given=1
rp_resolve "${given}" "${wtstate}" "${head_branch}" "${branch}" "${base}"
[ "${RP_RESOLVED}" = 1 ] || emit

# 2. WIP コミット（live のときだけ）
if [ "${wtstate}" = live ]; then
  observe "${path}"
  if [ "${OBS_RC}" -ne 0 ]; then
    R_DIRTY=-1
    rp_scan_status ""
  else
    wr_count_status "${OBS_OUT}"
    R_DIRTY=${WR_DIRTY}
    rp_scan_status "${OBS_OUT}"
  fi
  ipg=0
  if in_progress "${path}"; then ipg=1; fi
  plan=$(rp_wip_plan "${R_DIRTY}" "${RP_UNMERGED}" "${RP_NESTED}" "${ipg}")
  case "${plan}" in
    commit)
      crc=0
      old_head=$(git -C "${path}" rev-parse -q --verify HEAD 2>/dev/null) || old_head=""
      # stdin を閉じる（stdin 待ちのフックがハングしない）。フックの出力は標準エラーへ（標準出力の最後の 1 行を結果に保つ）
      git -C "${path}" add -A >&2 && git -C "${path}" commit -q -m "wip(recover): 中断時の未コミット変更を退避" </dev/null >&2 || crc=$?
      # コミットの実体: 成功の終了コードでも、フックがあとで変更を捨てると HEAD が進まない・進んでも差分が空になる（汚れは無く見える）
      cstate=made
      if [ "${crc}" = 0 ]; then
        new_head=$(git -C "${path}" rev-parse -q --verify HEAD 2>/dev/null) || new_head=""
        if [ -z "${new_head}" ] || [ "${new_head}" = "${old_head}" ]; then
          cstate=none
        else
          from=${old_head}
          [ -n "${from}" ] || from=$(git hash-object -t tree /dev/null 2>/dev/null) || from=""
          xrc=2
          if [ -n "${from}" ]; then
            xrc=0
            git -C "${path}" diff --quiet --no-ext-diff --ignore-submodules=none "${from}" "${new_head}" >/dev/null 2>&1 || xrc=$?
          fi
          case "${xrc}" in
            1) cstate=made ;;
            0) cstate=empty ;;
            *) cstate=unknown ;;
          esac
        fi
      fi
      observe "${path}"
      if [ "${OBS_RC}" -ne 0 ]; then
        after_dirty=-1
        after_sub=0
      else
        wr_count_status "${OBS_OUT}"
        after_dirty=${WR_DIRTY}
        after_sub=${WR_SUB_DIRTY}
      fi
      R_WIP=$(rp_wip_after "${crc}" "${after_dirty}" "${after_sub}" "${cstate}")
      ;;
    *) R_WIP=${plan} ;;
  esac
else
  R_WIP=skipped
fi
if rp_wip_ok "${R_WIP}"; then R_WIPOK=true; fi

# 3. 対象ブランチの先頭・base の取得・差分
if [ -n "${RP_BRANCH}" ]; then
  sha=$(git rev-parse --verify -q "refs/heads/${RP_BRANCH}^{commit}" 2>/dev/null) || sha=""
  if rp_is_sha "${sha}"; then
    R_EXISTS=true
    R_BSHA=${sha}
  fi
  if git fetch origin "refs/heads/${base}:refs/remotes/origin/${base}" >/dev/null 2>&1; then
    bsha=$(git rev-parse --verify -q "refs/remotes/origin/${base}^{commit}" 2>/dev/null) || bsha=""
    if rp_is_sha "${bsha}"; then
      R_FETCHED=true
      R_BASESHA=${bsha}
    fi
  fi
  fetched=0
  exists=0
  [ "${R_FETCHED}" = true ] && fetched=1
  [ "${R_EXISTS}" = true ] && exists=1
  drc=2
  if [ "${fetched}" = 1 ] && [ "${exists}" = 1 ]; then
    drc=0
    git diff --quiet --no-ext-diff --ignore-submodules=none "${R_BASESHA}...${R_BSHA}" >/dev/null 2>&1 || drc=$?
  fi
  R_DIFF=$(rp_diff_state "${fetched}" "${exists}" "${drc}")
  if [ "${R_DIFF}" = nonempty ]; then
    n=$(git rev-list --count "${R_BASESHA}..${R_BSHA}" 2>/dev/null) || n=0
    case "${n}" in '' | *[!0-9]*) n=0 ;; esac
    R_AHEAD=${n}
    files=$(git diff --name-only --no-ext-diff --ignore-submodules=none "${R_BASESHA}...${R_BSHA}" 2>/dev/null | awk 'END { print NR + 0 }') || files=0
    case "${files}" in '' | *[!0-9]*) files=0 ;; esac
    R_FILES=${files}
  fi
fi
emit
