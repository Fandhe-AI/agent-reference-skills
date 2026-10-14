#!/usr/bin/env bash
# pr-push-lib.sh — pr-push.sh の判定だけを持つ純関数（source 専用）
#
# 呼び出し元: pr-push.sh（Issue #603 第 4 弾）。起点（ローカルとリモートのどちらから続けるか）の決定、既存 open PR の分類、
#             gh pr create の出力からの PR 番号の取り出し、タイトル・パスの形式検証。スクリプト本体から切り出した理由は、
#             テストが 1 回の bash 起動で表の全ケースを渡せるようにするため（lib/base-merge-lib.sh と同じ）。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は PP_* 変数と return 値で返し、何も出力しない。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# shellcheck disable=SC2034  # PP_* は source 元のスクリプトが読む
PP_ORIGIN=""
PP_PR_STATUS=""
PP_PR_NUMBER=""
PP_HEAD=""
PP_MILESTONE=""

pp_is_uint() {
  case "$1" in
    '' | *[!0-9]* | 0*) return 1 ;;
  esac
  [ "${#1}" -le 9 ]
}
pp_is_sha() {
  case "$1" in
    '' | *[!0-9a-f]*) return 1 ;;
  esac
  [ "${#1}" -eq 40 ]
}
# 分類の入力に使う ref 名の文字種（英数字・. _ / -）。厳密な ref 名規則は pv_valid_branch が持つ
pp_ref_chars() {
  case "$1" in
    '' | *[!A-Za-z0-9._/-]*) return 1 ;;
  esac
  return 0
}

# 起点の決定（pr-create 用。旧 prCreatePrompt 手順 0 の (i)〜(iv)）。
#   $1 = リモートの branch の sha（無ければ空）、$2 = ローカル refs/heads/<branch> の sha（無ければ空）、
#   $3 = ローカル tip がリモート tip の祖先か（git merge-base --is-ancestor の終了コード。0 = 祖先）、
#   $4 = リモート tip がローカル tip の祖先か（同上）。$3 / $4 は両 sha があって異なるときだけ読む。
# PP_ORIGIN:
#   local         リモートに branch が無い、またはリモートがローカルの祖先（local ahead = 通常の回復フロー）→ ローカル tip から続ける
#   remote        両 tip が同一 sha → リモート追跡 ref から続ける（どちらでも同一コミット）
#   local-missing リモートにあるがローカルの refs/heads/<branch> が無い → 中止
#   remote-ahead  ローカル tip がリモート tip の真の祖先 → 中止（第三者の push と区別できないリモートコミットを採用しない）
#   diverged      どちらの向きの祖先関係も成立しない → 中止
#   error         祖先判定が 0 / 1 以外 → 中止
# return 0 = 続行してよい（local / remote）、1 = 中止
pp_decide_origin() {
  local remote=$1 localsha=$2 l_in_r=$3 r_in_l=$4
  PP_ORIGIN=""
  if [ -z "${remote}" ]; then
    PP_ORIGIN=local
    return 0
  fi
  if [ -z "${localsha}" ]; then
    PP_ORIGIN=local-missing
    return 1
  fi
  if [ "${remote}" = "${localsha}" ]; then
    PP_ORIGIN=remote
    return 0
  fi
  case "${l_in_r}" in
    0) PP_ORIGIN='remote-ahead'; return 1 ;;
    1) ;;
    *) PP_ORIGIN=error; return 1 ;;
  esac
  case "${r_in_l}" in
    0) PP_ORIGIN=local; return 0 ;;
    1) PP_ORIGIN=diverged; return 1 ;;
    *) PP_ORIGIN=error; return 1 ;;
  esac
}

# gh pr list の出力行（"<number> <baseRefName> <headRefOid>" を 1 行 1 PR）を、期待する base とリモート tip に照らして分類する。
#   $1 = 期待する base、$2 = push したリモート tip の sha（40 桁小文字 16 進）、$3 = 行の全体（空 = open PR なし）
# PP_PR_STATUS / PP_PR_NUMBER:
#   none           open PR なし → 新規作成へ
#   reuse          base が一致し head の sha も一致する PR が 1 つ → その番号を再利用する
#   head-mismatch  base は一致するが head の sha が違う（他者・別ランの push で head が動いている）→ 再利用も新規作成もしない
#   base-mismatch  base が違う PR しか無い → 再利用も新規作成もしない（base 契約の迂回を防ぐ）
#   ambiguous      base が一致する PR が 2 つ以上 → 判別できないので止める
#   malformed      行の形式が不正（番号・base・sha のいずれかが想定外）→ 止める
# return 0 = none / reuse（先へ進める）、1 = それ以外
pp_classify_pr() {
  local base=$1 remote=$2 rows=$3 line num rbase rsha extra same=0 same_num="" same_sha=""
  PP_PR_STATUS=""
  PP_PR_NUMBER=""
  if [ -z "${rows}" ]; then
    PP_PR_STATUS=none
    return 0
  fi
  while IFS= read -r line; do
    [ -n "${line}" ] || continue
    num="" rbase="" rsha="" extra=""
    read -r num rbase rsha extra <<EOF
${line}
EOF
    if [ -n "${extra}" ] || ! pp_is_uint "${num}" || ! pp_ref_chars "${rbase}" || ! pp_is_sha "${rsha}"; then
      PP_PR_STATUS=malformed
      return 1
    fi
    if [ "${rbase}" = "${base}" ]; then
      same=$((same + 1))
      same_num=${num}
      same_sha=${rsha}
    fi
  done <<EOF
${rows}
EOF
  if [ "${same}" -gt 1 ]; then
    PP_PR_STATUS=ambiguous
    return 1
  fi
  if [ "${same}" -eq 1 ]; then
    PP_PR_NUMBER=${same_num}
    if [ "${same_sha}" = "${remote}" ]; then
      PP_PR_STATUS=reuse
      return 0
    fi
    PP_PR_STATUS=head-mismatch
    return 1
  fi
  PP_PR_STATUS='base-mismatch'
  return 1
}

# gh pr create の標準出力（最後の非空行が PR の URL）から PR 番号を取り出して PP_PR_NUMBER に入れる。URL は戻さない。
# 末尾が /pull/<正の整数> でなければ return 1。
pp_pr_number_from_output() {
  local out=$1 line last="" n
  PP_PR_NUMBER=""
  while IFS= read -r line; do
    [ -n "${line}" ] && last=${line}
  done <<EOF
${out}
EOF
  case "${last}" in
    */pull/*) n=${last##*/pull/} ;;
    *) return 1 ;;
  esac
  pp_is_uint "${n}" || return 1
  PP_PR_NUMBER=${n}
  return 0
}

# PR タイトル（1 行）の形式。1〜256 文字・制御文字なし。タイトルの文面を決めるのはエージェント（スクリプトは形だけ見る）
pp_valid_title() {
  local t=$1
  [ -n "${t}" ] && [ "${#t}" -le 256 ] || return 1
  case "${t}" in
    *[[:cntrl:]]*) return 1 ;;
  esac
  return 0
}

# ファイルパス引数の文字種（絶対パスのみ・英数字と . _ / -・半角スペース・".." なし）。mktemp の出力はこの範囲に入る
# （TMPDIR に半角スペースを含む macOS のユーザーパスも通す。パスは常に引用符つきの 1 引数として使う）
pp_valid_path() {
  case "$1" in
    /*) ;;
    *) return 1 ;;
  esac
  case "$1" in
    *[!A-Za-z0-9._/\ -]* | *..*) return 1 ;;
  esac
  [ "${#1}" -le 300 ]
}

# サーバー上のブランチ head（pv_remote_sha の結果）が、push した HEAD の sha と一致するかを分類する。
#   $1 = 期待する sha（40 桁小文字 16 進）、$2 = pv_remote_sha の終了コード（0 = 取得できた）、$3 = 取得した sha（ブランチが無ければ空）
# PP_HEAD:
#   ok        サーバー head が期待と一致 → PR の作成・再利用へ進んでよい
#   unknown   取得できない（ls-remote の失敗・形式不正）→ 止める（確認できない head を PR にしない）
#   missing   サーバーにブランチが無い → 止める
#   mismatch  期待と違う（push 後に第三者が積んだ・別ランが動かした）→ 止める
# return 0 = ok、1 = それ以外
pp_head_status() {
  local expect=$1 lrc=$2 remote=$3
  PP_HEAD=""
  if ! pp_is_sha "${expect}"; then
    PP_HEAD=unknown
    return 1
  fi
  if [ "${lrc}" != 0 ]; then
    PP_HEAD=unknown
    return 1
  fi
  if [ -z "${remote}" ]; then
    PP_HEAD=missing
    return 1
  fi
  if ! pp_is_sha "${remote}"; then
    PP_HEAD=unknown
    return 1
  fi
  if [ "${remote}" = "${expect}" ]; then
    PP_HEAD=ok
    return 0
  fi
  PP_HEAD=mismatch
  return 1
}

# Closes 対象 Issue の milestone の状態（create-pr スキル Step 2.5 の手順 3 と同じ判定）。
#   $1 = リポジトリの milestone 件数（gh api の length。closed 含む。取得に失敗したら空）、
#   $2 = Issue の milestone を取る gh issue view の終了コード（件数 0 のときは見ないので 0 を渡す）、
#   $3 = Issue の milestone のタイトル（未割当なら空）
# PP_MILESTONE:
#   not-used      件数 0（milestone 非運用リポジトリ）→ 確認も警告もしない
#   assigned      割当済み
#   unassigned    未割当（警告つきで続行。自律運転では milestone を割り当てない）
#   fetch-failed  件数が数値でない・Issue の取得が失敗 → 止める（fail-closed。取得失敗を非運用や割当済みと読み替えない）
# return 0 = 続行してよい（not-used / assigned / unassigned）、1 = fetch-failed
pp_milestone_status() {
  local count=$1 vrc=$2 title=$3
  PP_MILESTONE=""
  case "${count}" in
    '' | *[!0-9]*)
      PP_MILESTONE=fetch-failed
      return 1
      ;;
  esac
  if [ "${count}" -eq 0 ]; then
    PP_MILESTONE=not-used
    return 0
  fi
  if [ "${vrc}" != 0 ]; then
    PP_MILESTONE=fetch-failed
    return 1
  fi
  if [ -n "${title}" ]; then
    PP_MILESTONE=assigned
  else
    PP_MILESTONE=unassigned
  fi
  return 0
}
