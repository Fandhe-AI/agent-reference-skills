#!/usr/bin/env bash
# worktree-remove-lib.sh — worktree-remove.sh の判断と入力検証だけを持つ純関数（source 専用）
#
# 呼び出し元: worktree-remove.sh（Issue #603 第 7 弾）。削除してよいかの判断（モードと観測 → 削除・強制削除・保持）、lock の扱い、
#             git の出力の読み取り、入力の形式検証を、git を呼ぶ本体から切り出したもの。切り出した理由は、テストが 1 回の
#             bash 起動でこれらの関数へ表の全ケースを渡せるようにするため（lib/pr-push-lib.sh と同じ）。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない（wr_find_entry だけはパスの実体化に cd / pwd -P を使う）。
#       結果は WR_* 変数・標準出力・return 値で返す。source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。
#       二重 source は無害。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・連想配列・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# shellcheck disable=SC2034  # WR_* は source 元のスクリプトが読む
WR_DIRTY=0
WR_SUB_DIRTY=0
WR_REGISTERED=0
WR_MAIN=0
WR_LOCKED=0
WR_LOCK_REASON=""
WR_LOCK_PID=""
WR_LOCK_START=""
WR_DETACHED=0
WR_HOLDER=""

# 削除対象の worktree パス。ホストの sanitizeWorktreePath と同じ形（絶対パス・先頭は英数字・使える文字は英数字と - _ . / 空白・.. を含まない）
wr_valid_path() {
  case "$1" in
    /[A-Za-z0-9]*) ;;
    *) return 1 ;;
  esac
  case "$1" in
    *[!A-Za-z0-9._/\ -]* | *..*) return 1 ;;
  esac
  return 0
}

# ブランチ名。ホストの isValidBranchName と同じ文字種に、git が拒否する形（末尾の / ・ .lock・連続する /・@{）を加えて狭める
wr_valid_branch() {
  case "$1" in
    [A-Za-z0-9]*) ;;
    *) return 1 ;;
  esac
  case "$1" in
    *[!A-Za-z0-9._/-]* | *..* | *//* | */ | *.lock | *.lock/* | */.* | *@\{*) return 1 ;;
  esac
  return 0
}

# コミットの sha（--head）。40 桁の小文字 16 進だけ（短縮形・大文字・空は不可。ホストが GitHub の headRefOid を正規化して渡す）
wr_valid_head() {
  [ "${#1}" -eq 40 ] || return 1
  case "$1" in
    *[!0-9a-f]*) return 1 ;;
  esac
  return 0
}

# 状態ファイルのパス（_/issue-trees/<正の整数>.json）。書き込みはしないが、sweep が読む先をこの形に限る
wr_valid_file() {
  local n
  case "$1" in
    _/issue-trees/*.json) ;;
    *) return 1 ;;
  esac
  n=${1#_/issue-trees/}
  n=${n%.json}
  case "${n}" in
    '' | *[!0-9]* | 0*) return 1 ;;
  esac
  return 0
}

# lock 理由が Claude Code の worktree の形（`claude agent|session <名前> (pid <N>)` または `… (pid <N> start <ps -o lstart= の出力>)`。
# Claude Code 側の照合は /^claude (?:agent|session) .{1,255} \(pid (\d{1,10})(?: start (.{1,255}))?\)$/）なら、pid を WR_LOCK_PID に、
# start（あれば）を WR_LOCK_START に入れる。この pid は agent ごとではなく**セッション（メインの claude プロセス）の pid** で、
# 同じセッションの中から実行すると常に生きている。ほかの形は WR_LOCK_PID を空にして return 1（利用者が手で付けた lock など。解除しない）
wr_lock_pid() {
  local r=$1 body tail pid rest name start=""
  WR_LOCK_PID=""
  WR_LOCK_START=""
  case "${r}" in
    'claude agent '*')' | 'claude session '*')') ;;
    *) return 1 ;;
  esac
  body=${r%')'}
  case "${body}" in
    *' (pid '*) ;;
    *) return 1 ;;
  esac
  tail=${body##*' (pid '}
  name=${body%' (pid '"${tail}"}
  case "${name}" in
    'claude agent '*) name=${name#'claude agent '} ;;
    *) name=${name#'claude session '} ;;
  esac
  case "${tail}" in
    *' '*)
      pid=${tail%% *}
      rest=${tail#* }
      case "${rest}" in
        'start '*) start=${rest#'start '} ;;
        *) return 1 ;;
      esac
      [ -n "${start}" ] && [ "${#start}" -le 255 ] || return 1
      ;;
    *) pid=${tail} ;;
  esac
  case "${pid}" in
    '' | *[!0-9]*) return 1 ;;
  esac
  [ "${#pid}" -le 10 ] || return 1
  [ -n "${name}" ] && [ "${#name}" -le 255 ] || return 1
  WR_LOCK_PID=${pid}
  WR_LOCK_START=${start}
  return 0
}

# lock 理由の start（ps -o lstart= の出力）と、いま観測した start が同じか。空白の連なり（BSD の ps は日が 1 桁のとき 2 連スペース）は
# 1 個に畳み、両端の空白は無視して比べる。$1 = 観測した値、$2 = lock 理由の値。同じなら return 0
wr_start_matches() {
  local a b
  a=$(printf '%s' "$1" | tr -s ' \t' '  ' | sed 's/^ //; s/ $//')
  b=$(printf '%s' "$2" | tr -s ' \t' '  ' | sed 's/^ //; s/ $//')
  [ -n "${a}" ] && [ "${a}" = "${b}" ]
}

# `kill -0 <pid>` の結果を語にする。$1 = 終了コード、$2 = LC_ALL=C で得たエラーメッセージ。標準出力:
#   ok（成功 = 存在する）/ esrch（No such process = 存在しないと肯定的に言えた）/ eperm（Operation not permitted = 存在する。
#   他ユーザーのプロセス）/ other（それ以外のメッセージ。判定不能）
wr_kill_class() {
  if [ "$1" = 0 ]; then
    echo ok
    return 0
  fi
  case "$2" in
    *'No such process'*) echo esrch ;;
    *'Operation not permitted'*) echo eperm ;;
    *) echo other ;;
  esac
}

# `ps -p <pid> -o pid=` の結果を語にする。$1 = 自己確認（自分の pid `ps -p $$ -o pid=` の出力。空なら ps は使えない）、
# $2 = 対象 pid の終了コード、$3 = 対象 pid の出力。標準出力: found（終了コード 0 で出力あり）/ absent（自己確認が通り、
# 終了コード 1・出力空）/ unusable（それ以外。ps が無い・失敗・busybox のように -p を持たない、など）
wr_ps_class() {
  if [ "$2" = 0 ] && [ -n "$3" ]; then
    echo found
  elif [ -n "$1" ] && [ "$2" = 1 ] && [ -z "$3" ]; then
    echo absent
  else
    echo unusable
  fi
}

# 3 つの観測から pid のプロセスの生死を決める。$1 = kill（ok / esrch / eperm / other）、$2 = ps（found / absent / unusable）、
# $3 = proc（present / absent / unavailable）。標準出力: alive / dead / unknown。
# 規則: どれか 1 つでも「存在する」（ok・eperm・found・present）と言えば alive。存在すると言う観測が無く、少なくとも 1 つが
# 肯定的に「存在しない」（esrch・absent）と言ったときだけ dead。それ以外（観測不能・エラー・未知の語）は unknown。
# 呼び出し側は unknown を生存扱い（保持）にする。ps の absent は ps の自己確認が通ったときだけ呼び出し側が出す
wr_pid_state() {
  case "$1" in ok | eperm) echo alive; return 0 ;; esac
  case "$2" in found) echo alive; return 0 ;; esac
  case "$3" in present) echo alive; return 0 ;; esac
  if [ "$1" = esrch ] || [ "$2" = absent ] || [ "$3" = absent ]; then
    echo dead
  else
    echo unknown
  fi
}

# lock の扱い。$1 = locked か（0/1）、$2 = pid（wr_lock_pid の結果。空なら Claude Code の形ではない）、$3 = その pid のプロセスが
# 生きているか（0/1。観測できなければ 1 = 生きていると見なす。start つきの lock では start が一致する同じプロセスか）。
# 標準出力: none（lock なし）/ unlock（Claude Code の形で pid が死んでいる・pid が再利用されている）/
# retain（それ以外。lock は外さず、worktree も消さない）
wr_lock_action() {
  if [ "$1" = 0 ]; then
    echo none
  elif [ "$1" = 1 ] && [ -n "$2" ] && [ "$3" = 0 ]; then
    echo unlock
  else
    echo retain
  fi
}

# 汚れ・submodule の観測 → 削除の方法。$1 = モード（superseded / discard）、$2 = 汚れの行数（-1 = 確認できなかった）、
# $3 = 汚れのうち submodule 由来の行数、$4 = 初期化済み submodule の数。標準出力:
#   plain             --force なしで消す（discard で汚れも初期化済み submodule も無い）
#   force             --force で消す（superseded。汚れていても消すが、submodule に未記録の変更があれば保持）
#   retain-dirty      汚れがあるため保持する
#   retain-unobservable  汚れを確認できなかった（$2 = -1。git status コマンドそのものの失敗）ため保持する。汚れの有無は分からないので、
#                        retain-dirty（汚れを観測した）とは別の語にする。ホストは後者を恒久の試行済み記録にするが、前者は一過性かもしれず次のランで再試行させる
#   retain-broken     git の対象が worktree 自身でない（$2 = -2。.git の破損・toplevel の不一致）ため保持する。再試行しても解消しない決定的な状態なので、
#                     ホストは retain-dirty と同じく恒久の試行済み記録にする（区別できない一過性の失敗もここへ倒す。毎ラン再試行して枠を食い続けるより安全）
#   retain-submodule  submodule に未記録の変更（superseded）・初期化済み submodule（discard）があるため保持する
wr_plan() {
  case "$1" in
    superseded)
      if [ "$2" -lt -1 ]; then
        echo retain-broken
      elif [ "$2" -lt 0 ]; then
        echo retain-unobservable
      elif [ "$3" -gt 0 ]; then
        echo retain-submodule
      else
        echo force
      fi
      ;;
    discard)
      if [ "$2" -lt -1 ]; then
        echo retain-broken
      elif [ "$2" -lt 0 ]; then
        echo retain-unobservable
      elif [ "$2" != 0 ]; then
        echo retain-dirty
      elif [ "$4" -gt 0 ]; then
        echo retain-submodule
      else
        echo plain
      fi
      ;;
    *) echo retain-dirty ;;
  esac
}

# `git status --porcelain=v2 -uall --ignore-submodules=none` の出力（$1）から、汚れの行数を WR_DIRTY に、うち submodule 由来
# （通常の変更行 `1 `・`2 `・未マージ行 `u ` の第 3 フィールドが `S` で始まる）の行数を WR_SUB_DIRTY に入れる。
# ヘッダ行（#）と空行は数えない。未追跡（?）は汚れに数える
wr_count_status() {
  local line n=0 s=0 rest sub
  while IFS= read -r line; do
    case "${line}" in
      '' | '#'*) continue ;;
    esac
    n=$((n + 1))
    case "${line}" in
      '1 '* | '2 '* | 'u '*)
        rest=${line#* }
        rest=${rest#* }
        sub=${rest%% *}
        case "${sub}" in
          S*) s=$((s + 1)) ;;
        esac
        ;;
    esac
  done <<<"$1"
  WR_DIRTY=${n}
  WR_SUB_DIRTY=${s}
}

# パスの字面の正規化（絶対パス前提）。連続する / を 1 つに、途中の /./ を / に、末尾の /. と / を落とす。.. は解決しない
# （入力検証 wr_valid_path が .. を含むパスを拒否済み。解決して別の場所を指させない）。ファイルシステムには触れない
wr_norm_path() {
  local p=$1 prev=""
  while [ "${p}" != "${prev}" ]; do
    prev=${p}
    case "${p}" in
      *//*) p=${p//\/\//\/} ;;
      */./*) p=${p//\/.\//\/} ;;
      */.) p=${p%/.} ;;
      */) p=${p%/} ;;
    esac
  done
  [ -n "${p}" ] || p=/
  printf '%s' "${p}"
}

# 英大文字を小文字へ（パスは ASCII の英数字・._/-空白だけ）。大小の区別が無いファイルシステム（macOS の既定）で、字面が違うだけの同じ場所を見分けないために使う
wr_lower() {
  printf '%s' "$1" | tr 'A-Z' 'a-z'
}

# パスの実体（存在しなければ字面を正規化したもの。末尾の / や /. が残って登録と照合できなくならないように）
wr_real() {
  local r
  if [ -d "$1" ] && r=$(cd "$1" 2>/dev/null && pwd -P) && [ -n "${r}" ]; then
    printf '%s' "${r}"
  else
    wr_norm_path "$1"
  fi
}

# ディレクトリ（$1）が属するリポジトリの共通 git ディレクトリの実体。ディレクトリが無い・リポジトリの外なら何も出さず非 0
wr_common_dir() {
  local c
  [ -d "$1" ] || return 1
  c=$(git -C "$1" rev-parse --git-common-dir 2>/dev/null) && [ -n "${c}" ] || return 1
  case "${c}" in
    /*) ;;
    *) c="$1/${c}" ;;
  esac
  [ -d "${c}" ] || return 1
  (cd "${c}" 2>/dev/null && pwd -P)
}

# 対象のリポジトリの確認（check-absent 用）。$1 = ホストが渡したリポジトリの root（空 = 渡されていない）、$2 = 確認するパス。
# カレントのリポジトリ（git worktree list を取る先）と対象のリポジトリの共通 git ディレクトリが一致するときだけ 0。
# $1 が空のときは、パスの最寄りの実在する祖先から属するリポジトリを求める。求められない・違うときは非 0（呼び出し側は unknown に倒す）。
# 別のリポジトリのカレントで実行されると、その一覧に対象が載らず absent に倒れてしまう（失うものがある登録を見落とす）のを防ぐ
wr_repo_matches() {
  local base=$1 p=$2 here there
  if [ -z "${base}" ]; then
    base=$p
    while [ ! -d "${base}" ] && [ "${base}" != / ] && [ -n "${base}" ]; do
      base=${base%/*}
      [ -n "${base}" ] || base=/
    done
  fi
  here=$(wr_common_dir .) || return 1
  there=$(wr_common_dir "${base}") || return 1
  [ -n "${here}" ] && [ "${here}" = "${there}" ]
}

# 2 つのパスが同じか。$1 = 一覧のエントリの字面、$2 = その実体、$3 = 探すパス、$4 = その実体、$5 = 1 のとき大小を区別しない
wr_same_path() {
  if [ "$5" = 1 ]; then
    [ "$(wr_lower "$(wr_norm_path "$1")")" = "$(wr_lower "$(wr_norm_path "$3")")" ] || [ "$(wr_lower "$2")" = "$(wr_lower "$4")" ]
  else
    [ "$(wr_norm_path "$1")" = "$(wr_norm_path "$3")" ] || [ "$2" = "$4" ]
  fi
}

# 全体の worktree prune で登録が消えると困る登録を、1 回の走査で数える。$1 = git worktree list --porcelain の出力。
# 各登録のパスの有無を wr_path_state で 1 回だけ観測し、その 1 回の観測から WR_PRUNE_RISK と WR_PRUNE_UNOBS へ互いに素に振り分ける（同じ登録を 2 回観測して
# 結果がずれる窓、つまり risk に数えられず unobservable にも数えられない登録が出る窓を、構造でなくす）。対象はメイン以外で lock が無い登録だけ
# （lock された登録は git が prune しないので数えない）:
#   観測が unknown（親を検索・読み取りできない。prune は stat の失敗を不在と扱ってその登録を落とす）→ WR_PRUNE_UNOBS
#   そうでなく、git が prunable と言う、または観測が missing（実体が無い）→ detached、または HEAD が 0000…（ブランチ ref が無く、そのコミットの
#   最後の参照が worktree の HEAD の reflog だけ）のものを WR_PRUNE_RISK。ブランチ上の登録は HEAD をブランチ ref が持つので数えない
# 合計（スキップの原因になった登録の件数）は WR_PRUNE_RISK + WR_PRUNE_UNOBS で、重複は構造上ない
wr_prune_scan() {
  local line cur="" idx=0 head="" det=0 lk=0 pr=0 nr=0 nu=0 on=0 st
  while IFS= read -r line; do
    case "${line}" in
      'worktree '* | '')
        if [ "${on}" = 1 ] && [ "${idx}" -gt 1 ] && [ "${lk}" = 0 ]; then
          st=$(wr_path_state "${cur}")
          if [ "${st}" = unknown ]; then
            nu=$((nu + 1))
          elif [ "${pr}" = 1 ] || [ "${st}" = missing ]; then
            if [ "${det}" = 1 ]; then
              nr=$((nr + 1))
            else
              case "${head}" in
                '') ;;
                *[!0]*) ;;
                *) nr=$((nr + 1)) ;;
              esac
            fi
          fi
        fi
        on=0
        head=""
        det=0
        lk=0
        pr=0
        case "${line}" in
          'worktree '*)
            cur=${line#worktree }
            idx=$((idx + 1))
            on=1
            ;;
        esac
        ;;
      'HEAD '*) head=${line#HEAD } ;;
      'detached') det=1 ;;
      'locked' | 'locked '*) lk=1 ;;
      'prunable' | 'prunable '*) pr=1 ;;
    esac
  done <<<"$1"$'\n'
  WR_PRUNE_RISK=${nr}
  WR_PRUNE_UNOBS=${nu}
}

# `git worktree list --porcelain` の出力（$1）から、対象（$2 = 与えられたパス）の登録状況を調べる。実体のパスでも照合する。
# $3 = 1 のときは大小を区別せずに照合する（check-absent が、大小だけ違う登録を見落とさないため。この一致は『別の場所かもしれないが保全する』用）。
# WR_REGISTERED = 登録されているか、WR_MAIN = 先頭のエントリ（メイン worktree）か、WR_LOCKED / WR_LOCK_REASON = lock の有無と理由
wr_find_entry() {
  local line cur="" idx=0 want real hit=0 first=0 locked=0 reason="" in_hit=0 cur_real detached=0 fold sha
  want=$2
  fold=${3:-0}
  real=$(wr_real "${want}")
  WR_REGISTERED=0
  WR_MAIN=0
  WR_LOCKED=0
  WR_LOCK_REASON=""
  WR_DETACHED=0
  while IFS= read -r line; do
    case "${line}" in
      'worktree '*)
        cur=${line#worktree }
        idx=$((idx + 1))
        in_hit=0
        cur_real=$(wr_real "${cur}")
        if [ "${hit}" = 0 ] && wr_same_path "${cur}" "${cur_real}" "${want}" "${real}" "${fold}"; then
          hit=1
          in_hit=1
          [ "${idx}" = 1 ] && first=1
          locked=0
          reason=""
          detached=0
        fi
        ;;
      'detached')
        [ "${in_hit}" = 1 ] && detached=1
        ;;
      'HEAD '*)
        # HEAD が 0000…（ブランチ ref を update-ref -d で消した登録など）は、そのコミットの最後の参照が worktree の HEAD の reflog だけになる。
        # detached と同じく、登録が唯一の参照かもしれないものとして扱う（prunable にしない）
        if [ "${in_hit}" = 1 ]; then
          sha=${line#HEAD }
          case "${sha}" in
            '' | *[!0]*) ;;
            *) detached=1 ;;
          esac
        fi
        ;;
      'locked' | 'locked '*)
        if [ "${in_hit}" = 1 ]; then
          locked=1
          reason=${line#locked}
          reason=${reason# }
        fi
        ;;
    esac
  done <<<"$1"
  WR_REGISTERED=${hit}
  WR_MAIN=${first}
  WR_LOCKED=${locked}
  WR_LOCK_REASON=${reason}
  WR_DETACHED=${detached}
}

# `git worktree list --porcelain` の出力（$1）から、ブランチ $2 を持つ登録（メイン以外）のパスを WR_HOLDER に入れる（無ければ空）。
# 実体の無い登録がブランチを持ち続けると `git branch -D` が used by worktree で拒否されるため、remove がその登録だけを消す相手を探すのに使う
wr_branch_holder() {
  local line cur="" idx=0
  WR_HOLDER=""
  while IFS= read -r line; do
    case "${line}" in
      'worktree '*)
        cur=${line#worktree }
        idx=$((idx + 1))
        ;;
      'branch refs/heads/'*)
        if [ "${idx}" -gt 1 ] && [ "${line#branch refs/heads/}" = "$2" ]; then
          WR_HOLDER=${cur}
          return 0
        fi
        ;;
    esac
  done <<<"$1"
  return 0
}

# 存在しないパスの実体化（check-absent 用）。実在する最も近い祖先を pwd -P で実体にし、残りの成分を付ける。git は実体のパスで登録する
# ため、祖先がシンボリックリンク（macOS の /var → /private/var 等）だと、存在しないパスの字面では登録と照合できない。$1 = 絶対パス
wr_loose_real() {
  local p rest="" base up
  p=$(wr_norm_path "$1")
  while [ "${p}" != / ] && [ -n "${p}" ] && [ ! -d "${p}" ]; do
    base=${p##*/}
    rest="/${base}${rest}"
    p=${p%/*}
  done
  [ -n "${p}" ] || p=/
  up=$(cd "${p}" 2>/dev/null && pwd -P) || up=${p}
  [ "${up}" = / ] && up=""
  printf '%s%s' "${up}" "${rest}"
}

# パスの実在の三値（check-absent 用）。標準出力: exists（パス自体がある。壊れたシンボリックリンクを含む）/ missing（無く、実在する最も近い祖先が
# 検索可能なディレクトリと読めた）/ unknown（祖先を検索・読み取りできず、「無い」と言えない）。$1 = 絶対パス
wr_path_state() {
  local p=$1
  if [ -e "${p}" ] || [ -L "${p}" ]; then
    echo exists
    return 0
  fi
  while [ "${p}" != / ] && [ -n "${p}" ]; do
    p=${p%/*}
    [ -n "${p}" ] || p=/
    if [ -d "${p}" ]; then
      if [ -x "${p}" ] && [ -r "${p}" ]; then echo missing; else echo unknown; fi
      return 0
    fi
  done
  echo unknown
}

# check-absent の判定。$1 = 一覧を取れたか（0/1）、$2 = パスの実在（wr_path_state の語）、$3 = 登録されているか、$4 = メイン worktree か、
# $5 = lock されているか、$6 = 登録の HEAD が detached か、または HEAD が 0000…（すべて 0/1）、$7 = 登録は無いが大小だけ違う登録がある（0/1。省略は 0）。標準出力（固定語彙）:
#   absent             登録が無く、パスも無い（失うものが無い）
#   prunable           登録は残るが実体が無い（lock なし・ブランチ上）。実体の無い登録の HEAD はブランチ ref が持つので、失うものが無い。このモードでは prune しない
#   prunable-detached  登録だけ残り、HEAD が detached または 0000…（ブランチ ref が無い）（その登録がコミットの唯一の参照かもしれず、prune で失われ得る）。保全する
#   prunable-locked    登録だけ残り lock されている（git は lock された登録を prune しない。外付けの一時的な未接続かもしれない）。保全する
#   present            登録があり実体もある。unregistered-present は登録が無いがパスがある。main はメイン worktree。unknown は一覧・実在・リポジトリを確定できない、または大小だけ違う登録がある
# ホストが不在として扱ってよい語は absent と prunable だけ
wr_absent_word() {
  if [ "$1" != 1 ] || [ "$2" = unknown ]; then
    echo unknown
  elif [ "$4" = 1 ]; then
    echo main
  elif [ "$2" = exists ]; then
    if [ "$3" = 1 ]; then echo present; else echo unregistered-present; fi
  elif [ "$3" != 1 ]; then
    # 大小だけが違う登録と一致する（$7 = 1）なら、同じ場所かもしれない。登録なしと見なさず保全側（unknown）に倒す
    if [ "${7:-0}" = 1 ]; then echo unknown; else echo absent; fi
  elif [ "$5" = 1 ]; then
    echo prunable-locked
  elif [ "$6" = 1 ]; then
    echo prunable-detached
  else
    echo prunable
  fi
}

# --require-missing の実体の確認。$1 = 正規化済みのパス。標準出力: ok（実体もシンボリックリンクも無いと肯定的に言える）/ retain（ある）/
# unobservable（有無を確かめられない。祖先を検索・読み取りできず stat が失敗するなど。「無い」と言えないので ok にしない）。
# 空のパスは retain 側（実体の有無を肯定的に「無い」と言えたときだけ ok）。判定は check-absent と同じ wr_path_state に揃える
wr_require_missing_check() {
  if [ -z "${1:-}" ]; then echo retain; return 0; fi
  case "$(wr_path_state "$1")" in
    missing) echo ok ;;
    exists) echo retain ;;
    *) echo unobservable ;;
  esac
}

# 破棄時のブランチの扱い。$1 = ブランチ名（空 = 指定なし）、$2 = base ブランチ名、$3 = worktree が無くなったか（0/1）、
# $4 = ブランチが実在するか（0/1）。標準出力: none（指定なし）/ keep-base（base と同名。消さない）/ keep（worktree が残っているので
# 消さない）/ absent（実在しない）/ delete
wr_branch_action() {
  if [ -z "$1" ]; then
    echo none
  elif [ -n "$2" ] && [ "$1" = "$2" ]; then
    echo keep-base
  elif [ "$3" != 1 ]; then
    echo keep
  elif [ "$4" != 1 ]; then
    echo absent
  else
    echo delete
  fi
}

# worktree の結果の語彙のうち『もう無い（または元から無い）』もの。$1 = 語彙
wr_wt_gone() {
  case "$1" in
    removed | not-registered | skipped) return 0 ;;
  esac
  return 1
}

# --branch / --expect-branch との照合。$1 = 結びつけられたブランチ（空 = 指定なし）、$2 = worktree が指すブランチ（detached・読めないときは空）。
# 標準出力: ok（指定なし、または一致）/ retain（違う、detached、読めない）。ブランチを消すかどうかは判断しない（照合だけ）
wr_branch_check() {
  if [ -z "$1" ] || [ "$1" = "${2:-}" ]; then
    echo ok
  else
    echo retain
  fi
}

# --head（マージ済み PR の head）との照合。$1 = 指定された sha（空 = 指定なし）、$2 = worktree の HEAD のコミット（読めなければ空）、
# $3 = worktree が指すブランチ（detached は空）、$4 = 1 のとき HEAD が指すブランチがまだ無い（unborn。省略は 0）。
# 標準出力: ok（指定なし、または ブランチ上で一致）/ retain（違う）/ retain-unobservable（HEAD のコミットを読めなかった。不一致ではなく観測の失敗）/ retain-detached（一致していても detached）。
# squash マージでは base との差分で未 push のコミットを見分けられないため、PR の head と worktree の HEAD の一致だけを根拠にする。
# detached HEAD 上のコミットは worktree を消すと含む ref が無くなり失われる（headRefOid は自己申告で HEAD と同じ値を返し得る）ため、
# 実装 worktree が常にブランチ上にある前提で、一致していても保持する。sha の照合を先にする（読めない・違うは retain のまま）
wr_head_check() {
  if [ -z "$1" ]; then
    echo ok
  elif [ -z "$2" ]; then
    # unborn（コミットが無い）は読み直しても変わらない決定的な状態で、PR の head と一致し得ないので不一致として扱う（毎ラン再試行させない）
    if [ "${4:-0}" = 1 ]; then echo retain; else echo retain-unobservable; fi
  elif [ "$1" != "$2" ]; then
    echo retain
  elif [ -z "${3:-}" ]; then
    echo retain-detached
  else
    echo ok
  fi
}

# 結果の ok。$1 = モード、$2 = worktree の結果、$3 = ブランチの結果。
# check-absent: 不在と読める語（absent・prunable）のときだけ ok
# superseded: worktree が残っても非致命（ok。retained で区別する）。ただしメイン worktree を指していた（main）・カレントがその中（cwd）は異常として ok にしない。
# discard: worktree が無くなり、ブランチも（指定があれば）消えたか元から無いときだけ ok
wr_ok() {
  case "$1" in
    superseded)
      [ "$2" != main ] && [ "$2" != cwd ] && return 0
      return 1
      ;;
    check-absent)
      [ "$2" = absent ] || [ "$2" = prunable ]
      return $?
      ;;
    discard)
      wr_wt_gone "$2" || return 1
      case "$3" in
        none | deleted | absent | keep-base) return 0 ;;
      esac
      return 1
      ;;
  esac
  return 1
}

# worktree が残った（保持・失敗・メイン）か。ホストはこれが true のパスを『削除成功』に数えない
wr_retained() {
  case "$1" in absent | prunable) return 1 ;; esac
  ! wr_wt_gone "$1"
}

# sweep が保持する worktree（failed / blocked / monitoring のイシューが記録したもの）を 1 行 1 パスで出す。$1 = 状態ファイル。
# 値がオブジェクトでない項目・文字列でない worktree に出会ったら error で非 0 終了する（黙って 0 件にしない。0 件は「保持なし」と区別できず、全候補を消してしまう）
wr_retain_list() {
  jq -r '.items | to_entries[] | .value | if type != "object" then error("item") else . end | select(.status == "failed" or .status == "blocked" or .status == "monitoring") | if has("worktree") then (.worktree | if type == "string" then . else error("worktree") end) else empty end | select(. != "")' "$1" 2>/dev/null
}
