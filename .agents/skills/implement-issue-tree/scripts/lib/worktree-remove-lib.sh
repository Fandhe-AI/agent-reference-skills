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
#   retain-dirty      汚れ（または確認できなかった）ため保持する
#   retain-submodule  submodule に未記録の変更（superseded）・初期化済み submodule（discard）があるため保持する
wr_plan() {
  case "$1" in
    superseded)
      if [ "$2" -lt 0 ]; then
        echo retain-dirty
      elif [ "$3" -gt 0 ]; then
        echo retain-submodule
      else
        echo force
      fi
      ;;
    discard)
      if [ "$2" != 0 ]; then
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

# パスの実体（存在しなければそのまま）
wr_real() {
  local r
  if [ -d "$1" ] && r=$(cd "$1" 2>/dev/null && pwd -P) && [ -n "${r}" ]; then
    printf '%s' "${r}"
  else
    printf '%s' "$1"
  fi
}

# `git worktree list --porcelain` の出力（$1）から、対象（$2 = 与えられたパス）の登録状況を調べる。実体のパスでも照合する。
# WR_REGISTERED = 登録されているか、WR_MAIN = 先頭のエントリ（メイン worktree）か、WR_LOCKED / WR_LOCK_REASON = lock の有無と理由
wr_find_entry() {
  local line cur="" idx=0 want real hit=0 first=0 locked=0 reason="" in_hit=0 cur_real
  want=$2
  real=$(wr_real "${want}")
  WR_REGISTERED=0
  WR_MAIN=0
  WR_LOCKED=0
  WR_LOCK_REASON=""
  while IFS= read -r line; do
    case "${line}" in
      'worktree '*)
        cur=${line#worktree }
        idx=$((idx + 1))
        in_hit=0
        cur_real=$(wr_real "${cur}")
        if [ "${hit}" = 0 ] && { [ "${cur}" = "${want}" ] || [ "${cur_real}" = "${real}" ]; }; then
          hit=1
          in_hit=1
          [ "${idx}" = 1 ] && first=1
          locked=0
          reason=""
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

# --head（マージ済み PR の head）との照合。$1 = 指定された sha（空 = 指定なし）、$2 = worktree の HEAD のコミット（読めなければ空）、
# $3 = worktree が指すブランチ（detached は空）。
# 標準出力: ok（指定なし、または ブランチ上で一致）/ retain（違う、または読めない）/ retain-detached（一致していても detached）。
# squash マージでは base との差分で未 push のコミットを見分けられないため、PR の head と worktree の HEAD の一致だけを根拠にする。
# detached HEAD 上のコミットは worktree を消すと含む ref が無くなり失われる（headRefOid は自己申告で HEAD と同じ値を返し得る）ため、
# 実装 worktree が常にブランチ上にある前提で、一致していても保持する。sha の照合を先にする（読めない・違うは retain のまま）
wr_head_check() {
  if [ -z "$1" ]; then
    echo ok
  elif [ -z "$2" ] || [ "$1" != "$2" ]; then
    echo retain
  elif [ -z "${3:-}" ]; then
    echo retain-detached
  else
    echo ok
  fi
}

# 結果の ok。$1 = モード、$2 = worktree の結果、$3 = ブランチの結果。
# superseded: worktree が残っても非致命（ok。retained で区別する）。ただしメイン worktree を指していた（main）・カレントがその中（cwd）は異常として ok にしない。
# discard: worktree が無くなり、ブランチも（指定があれば）消えたか元から無いときだけ ok
wr_ok() {
  case "$1" in
    superseded)
      [ "$2" != main ] && [ "$2" != cwd ] && return 0
      return 1
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
  ! wr_wt_gone "$1"
}

# sweep が保持する worktree（failed / blocked / monitoring のイシューが記録したもの）を 1 行 1 パスで出す。$1 = 状態ファイル。
# 値がオブジェクトでない項目・文字列でない worktree に出会ったら error で非 0 終了する（黙って 0 件にしない。0 件は「保持なし」と区別できず、全候補を消してしまう）
wr_retain_list() {
  jq -r '.items | to_entries[] | .value | if type != "object" then error("item") else . end | select(.status == "failed" or .status == "blocked" or .status == "monitoring") | if has("worktree") then (.worktree | if type == "string" then . else error("worktree") end) else empty end | select(. != "")' "$1" 2>/dev/null
}
