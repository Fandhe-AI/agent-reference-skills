#!/usr/bin/env bash
# select-target.sh — update-docs が更新する指示ファイル（CLAUDE.md / AGENTS.md）を選ぶ
#
# 呼び出し元: update-docs の SKILL.md Step 0。
# 役割: 対象リポジトリのルートを見て、「ある方」を 1 つだけ返す。読み取り専用で、ファイルは作らない・
#       変えない。選んだあとの書き込み（AGENTS.md の区間の差し替え）は agents-section.sh が行う。
#       あわせて、書き込み先がリポジトリの外へ逃げないこと（symlink）と、mv で壊れないこと
#       （ハードリンク）を確かめ、危ない構成なら書かせずに止める。
#       --print-write-path を付けると、選択と同じ検証を通った書き込み先の物理パスも返す。
#       書き込み先の解決はこのスクリプトだけが持ち、SKILL.md のフェンスは重複して持たない。
#
# 使い方:
#   select-target.sh --root <リポジトリのルート> [--print-write-path]
#
# --print-write-path: 結果が agents のときだけ、最終行の直前に
#   UPDATE_DOCS_WRITE_PATH <物理パス>
#   を 1 行出す（claude・none・エラーでは出さない）。物理パスは symlink を最後まで辿った先で、ルートの
#   物理パスの配下の通常ファイルであることを確かめ済み。agents-section.sh の --target へそのまま渡す
#   （AGENTS.md が symlink でも、リンクは壊さず実体へ区間を書ける）。改行を含むパスは出さずに
#   error-symlink で止める。指定しないときの出力は従来と同じ。
#
# 選び方（通常ファイルか、リポジトリ内の通常ファイルへのシンボリックリンクだけを「ある」とみなす）:
#   CLAUDE.md がある                  -> claude（AGENTS.md があっても読むだけで触らない）
#   CLAUDE.md が無く AGENTS.md がある -> agents
#   どちらも無い                      -> none（ファイルを作らずに報告して止める）
#   例外 1: CLAUDE.md と AGENTS.md が同じファイルで、どちらかが symlink のときは agents を返し、
#   stderr に警告を出す。CLAUDE.md として直接書き換えると AGENTS.md の管理区間やレビュー観点集を
#   壊し得るため、update-docs 専用の区間だけを agents-section.sh で更新する。
#   例外 2: 同じファイルなのに、物理的なリンク先のパスが両者で一致しない（ハードリンク）ときは
#   error-hardlink で止まる（どちらも symlink でない場合、別々の symlink がハードリンク同士の実体を
#   指す場合を含む）。置換（mv）でリンクが切れて 2 つのファイルが別物になるため。
#   CLAUDE.md・AGENTS.md のどちらかが symlink で、物理的なリンク先がルートの物理パスの配下の
#   通常ファイルでなければ（リポジトリ外を指す・壊れている・ループ・ディレクトリ）error-symlink で
#   止まる。リポジトリ外のファイルを書き換えさせないため。
#
# 終了コード: 0 選択できた（none を含む）/ 1 使い方の誤り / 2 ルートが無い / 3 書き込み先が危ない
#   （error-symlink・error-hardlink）
# stdout の最終行は固定語彙の
#   UPDATE_DOCS_TARGET <claude|agents|none|error-usage|error-root|error-symlink|error-hardlink>。
#
# 単体実行専用（source しない）。bash 3.2 と BSD/GNU の POSIX ツールだけで動く。
set -euo pipefail

fail() {
  # $1 終了コード $2 語彙 $3 メッセージ
  echo "エラー: $3" >&2
  echo "UPDATE_DOCS_TARGET $2"
  exit "$1"
}

ROOT="" PRINT_PATH=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --root)
      [[ $# -ge 2 ]] || fail 1 error-usage "--root に値がない"
      ROOT="$2"
      shift 2
      ;;
    --print-write-path)
      PRINT_PATH=1
      shift
      ;;
    *) fail 1 error-usage "未知の引数: $1（使い方: --root <リポジトリのルート> [--print-write-path]）" ;;
  esac
done
[[ -n "${ROOT}" ]] || fail 1 error-usage "--root は必須"
[[ -d "${ROOT}" ]] || fail 2 error-root "--root がディレクトリではない"

ROOT_PHYS=$(cd -P -- "${ROOT}" && pwd -P) || fail 2 error-root "--root の物理パスを解決できない"
CLAUDE="${ROOT}/CLAUDE.md"
AGENTS="${ROOT}/AGENTS.md"

# symlink を最後まで辿った物理パスを出す（リンクを 1 段ずつ readlink で辿り、最後に dirname を物理化する）。
# 辿れない（壊れている・ループ）ときは非 0 で返す。BSD の readlink は -f を持たないため使わない。
resolve_final() {
  local p="$1" n=0 link dir base
  while [[ -L "${p}" ]]; do
    n=$((n + 1))
    [[ "${n}" -le 40 ]] || return 1
    link=$(readlink -- "${p}") || return 1
    case "${link}" in
      /*) p="${link}" ;;
      *) p="$(dirname -- "${p}")/${link}" ;;
    esac
  done
  [[ -f "${p}" ]] || return 1
  dir=$(cd -P -- "$(dirname -- "${p}")" 2>/dev/null && pwd -P) || return 1
  base=$(basename -- "${p}")
  printf '%s/%s\n' "${dir%/}" "${base}"
}

# symlink なら、リポジトリ内の通常ファイルへ向いていることを確かめる。
check_link() {
  # $1 パス $2 表示名
  local resolved
  [[ -L "$1" ]] || return 0
  resolved=$(resolve_final "$1") \
    || fail 3 error-symlink "$2 はシンボリックリンクで、リンク先の通常ファイルへ辿れない（壊れている・ループ・ディレクトリ）。書き込みを避けて止める"
  case "${resolved}" in
    "${ROOT_PHYS%/}"/*) ;;
    *) fail 3 error-symlink "$2 のリンク先がリポジトリの外にある。外のファイルを書き換えないため止める" ;;
  esac
}
check_link "${CLAUDE}" CLAUDE.md
check_link "${AGENTS}" AGENTS.md

# agents を返す。--print-write-path のときは AGENTS.md の物理パスを先に 1 行出す。
# check_link で範囲内の通常ファイルであることは確認済み。
emit_agents() {
  local real
  if [[ "${PRINT_PATH}" -eq 1 ]]; then
    real=$(resolve_final "${AGENTS}") || fail 3 error-symlink "AGENTS.md のリンク先を辿れない"
    case "${real}" in
      "${ROOT_PHYS%/}"/*) ;;
      *) fail 3 error-symlink "AGENTS.md のリンク先がリポジトリの外にある。外のファイルを書き換えないため止める" ;;
    esac
    case "${real}" in
      *$'\n'*) fail 3 error-symlink "AGENTS.md の物理パスに改行が含まれる。書き込み先として扱えないため止める" ;;
    esac
    echo "UPDATE_DOCS_WRITE_PATH ${real}"
  fi
  echo "UPDATE_DOCS_TARGET agents"
}

if [[ -f "${CLAUDE}" && -f "${AGENTS}" && "${CLAUDE}" -ef "${AGENTS}" ]]; then
  # 同じファイル。物理的なリンク先のパスが一致するときだけ（一方がもう一方への symlink、または
  # 両方が同じ実体への symlink）、その実体を書き込み先にする。一致しないのはハードリンク。
  CLAUDE_REAL=$(resolve_final "${CLAUDE}") || fail 3 error-symlink "CLAUDE.md のリンク先を辿れない"
  AGENTS_REAL=$(resolve_final "${AGENTS}") || fail 3 error-symlink "AGENTS.md のリンク先を辿れない"
  if [[ "${CLAUDE_REAL}" != "${AGENTS_REAL}" ]]; then
    fail 3 error-hardlink "CLAUDE.md と AGENTS.md は同じファイルへのハードリンク。置換でリンクが切れるため書き込まずに止める（どちらかを symlink か別ファイルにしてから再実行する）"
  fi
  echo "警告: CLAUDE.md と AGENTS.md は同じファイルなので、AGENTS.md として update-docs 専用の区間だけを更新する（CLAUDE.md は直接書き換えない）" >&2
  emit_agents
elif [[ -f "${CLAUDE}" ]]; then
  echo "UPDATE_DOCS_TARGET claude"
elif [[ -f "${AGENTS}" ]]; then
  emit_agents
else
  echo "CLAUDE.md も AGENTS.md も無い。ファイルは作らない（報告して止める）" >&2
  echo "UPDATE_DOCS_TARGET none"
fi
