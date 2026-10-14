#!/usr/bin/env bash
# base-merge-lib.sh — base-merge.sh の入力検証と remote URL の照合（source 専用）
#
# 呼び出し元: base-merge.sh（Issue #603）。判定だけを持つ純関数を、スクリプト本体から『ロジックを変えずに』切り出したもの。
#             切り出した理由は、テストが 1 回の bash 起動でこれらの関数へ表の全ケースを渡せるようにするため
#             （スクリプト本体は先頭から実行され exit するので、source して関数だけを呼ぶことができない）。
# 内容: is_uint（正の整数）・valid_repo（OWNER/REPO の形式）・lower（小文字化）・url_allowed（remote URL が許可ホストの
#       期待リポジトリか）と、許可ホストの定数 ALLOWED_REMOTE_HOST。どの関数も exit せず、git・gh・ネットワークを呼ばない
#       （lower が tr を呼ぶだけ）。結果は return 値で返し、何も出力しない。
# 契約: 関数の挙動は base-merge.sh の従来の定義と同一である。変えるときは tests/base-merge-unit.test.mjs の表と
#       tests/base-merge.test.mjs の代表ケース（実 git）を同時に直す。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。paste・bc・mapfile・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む
# （ここを書き換えると、これを読み込む全スクリプトのハッシュが変わる）。
# 読み込み済みを示す変数でのガードは置かない: 環境から継承した変数でこのファイルの定義が飛ばされ、export -f した偽の関数が使われるのを防ぐ
#（定義だけのファイルなので毎回読み直して構わない）。

# shellcheck disable=SC2034  # RM_FAILED（routing_check_remotes が設定する）は source 元のスクリプトが読む

# 許可するリモートのホスト。Fandhe-AI は GitHub.com 運用のため固定値とする（owner/repo だけを比較すると、同じ
# owner/repo を持つ別ホストを一致とみなして別ホストへ push しうる。PR #443 codex P0）
ALLOWED_REMOTE_HOST='github.com'

# 正の整数（先頭ゼロは拒否: 012 を 12 と読み替えない。gh の応答との文字列比較が偶然止めるのに頼らない）
is_uint() {
  case "$1" in
    '' | *[!0-9]* | 0*) return 1 ;;
  esac
  [ "${#1}" -le 9 ]
}
# OWNER/REPO の形式（ホストの REPO_SLUG_RE と同じ厳格さ）。owner は英数字とハイフン・先頭末尾ハイフン不可・1〜39 文字、
# repo は先頭がハイフン以外の英数字 . _ で . と .. だけは不可・1〜100 文字
valid_repo() {
  local owner name
  case "$1" in
    */*/* | */ | /* | '') return 1 ;;
  esac
  case "$1" in */*) ;; *) return 1 ;; esac
  owner=${1%%/*}
  name=${1#*/}
  case "${owner}" in
    '' | -* | *- | *[!A-Za-z0-9-]*) return 1 ;;
  esac
  [ "${#owner}" -le 39 ] || return 1
  case "${name}" in
    '' | . | .. | [!A-Za-z0-9._]* | *[!A-Za-z0-9._-]*) return 1 ;;
  esac
  [ "${#name}" -le 100 ]
}
lower() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]'
}

# remote の URL を照合する。fetch URL（`git remote get-url --all`）と push 先 URL（`--push --all`）の『全行』が、許可ホストと
# 期待 owner/repo に一致しなければならない。先頭 1 件だけを見ると、pushurl・pushInsteadOf・複数 url の追加で push だけが別の
# リポジトリへ届く（隔離 worktree は本体の .git/config を共有するので、先行するエージェントが書ける位置にある）。
# 許す形: https://[userinfo@]github.com[:443]/<owner>/<repo>[.git]、ssh://git@github.com[:22]/<owner>/<repo>[.git]、
# git@github.com:<owner>/<repo>[.git]。userinfo は authority の最後の @ までを捨てて host を取り出す
# （https://github.com@evil.example/… の host は evil.example）。authority に @ が 2 つ以上ある URL は拒否する
# （https://a@evil.example@github.com/… は git が接続に失敗しても、エラー文に 2 つ目の userinfo が残る。トークン中の @ は
# %40 にエンコードされる）。URL はトークンを含み得るので、どの出力にも出さない。
# `.git` の除去は小文字の `.git` だけ（`.GIT` は別名になり得るので受理しない）。owner/repo の比較は大文字小文字を区別しない
# $1 = URL、$2 = 期待する owner/repo（小文字化済み）。0 = 許可、1 = 不許可
url_allowed() {
  local u=$1 want_slug=$2 scheme rest hostport host port path
  case "${u}" in
    '' | *[!A-Za-z0-9._~:/@%+-]*) return 1 ;;
  esac
  u=${u%/}
  u=${u%.git}
  case "${u}" in
    ssh://git@*)
      rest=${u#ssh://git@}
      case "${rest}" in */*) ;; *) return 1 ;; esac
      hostport=${rest%%/*}
      path=${rest#*/}
      case "${hostport}" in *@*) return 1 ;; esac
      scheme=ssh
      ;;
    git@*:*)
      rest=${u#git@}
      hostport=${rest%%:*}
      path=${rest#*:}
      scheme=scp
      ;;
    https://*)
      rest=${u#https://}
      case "${rest}" in */*) ;; *) return 1 ;; esac
      hostport=${rest%%/*}
      case "${hostport}" in *@*@*) return 1 ;; esac
      hostport=${hostport##*@}
      path=${rest#*/}
      scheme=https
      ;;
    *) return 1 ;;
  esac
  case "${hostport}" in
    *:*) host=${hostport%%:*}; port=${hostport#*:} ;;
    *) host=${hostport}; port="" ;;
  esac
  # 標準ポートだけ許す（https の 443、ssh:// の 22）。scp 形式にポートは無い
  case "${scheme}:${port}" in
    ssh: | ssh:22 | https: | https:443 | scp:) ;;
    *) return 1 ;;
  esac
  host=$(lower "${host}")
  path=$(lower "${path}")
  [ "${host}" = "${ALLOWED_REMOTE_HOST}" ] && [ -n "${path}" ] && [ "${path}" = "${want_slug}" ]
}

# 1 つの種別（fetch / push）の URL 全行を url_allowed で照合する。base-merge.sh と pr-push.sh の routing ガードが共有する
# （同じ照合を別々に書くと、片方だけ pushurl・pushInsteadOf の迂回を見逃す）。URL はトークンを含み得るので、どの出力にも出さない。
# $1 = ラベル（fetch / push）、$2 = 期待する owner/repo（小文字化済み）、残り = git remote get-url への追加オプション。
# 0 = 全行が許可、1 = 1 行でも外れた、2 = 取得できない（git が失敗・出力が空）
check_remote_urls() {
  local label=$1 want_slug=$2 out line n=0
  shift 2
  out=$(git remote get-url "$@" origin 2>/dev/null) || return 2
  [ -n "${out}" ] || return 2
  while IFS= read -r line; do
    n=$((n + 1))
    url_allowed "${line}" "${want_slug}" || { echo "routing: ${label} URL の ${n} 行目が許可ホスト・期待リポジトリと一致しない" >&2; return 1; }
  done <<EOF
${out}
EOF
  return 0
}

# fetch URL（`--all`）と push 先 URL（`--push --all`）の両方を check_remote_urls で照合する。$1 = 期待する owner/repo（小文字化済み）。
# 戻り値は check_remote_urls と同じ。外れた種別を RM_FAILED（fetch / push）に入れる
RM_FAILED=""
routing_check_remotes() {
  local want_slug=$1 spec rc
  RM_FAILED=""
  for spec in "fetch:--all" "push:--push --all"; do
    rc=0
    # shellcheck disable=SC2086  # ${spec#*:} は意図した単語分割（--push --all）
    check_remote_urls "${spec%%:*}" "${want_slug}" ${spec#*:} || rc=$?
    if [ "${rc}" -ne 0 ]; then
      RM_FAILED=${spec%%:*}
      return "${rc}"
    fi
  done
  return 0
}
