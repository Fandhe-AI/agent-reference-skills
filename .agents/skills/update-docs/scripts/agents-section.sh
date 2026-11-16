#!/usr/bin/env bash
# agents-section.sh — AGENTS.md の update-docs 専用区間だけを差し替える
#
# 呼び出し元: update-docs の SKILL.md（更新対象が AGENTS.md のとき）。
# 役割: CLAUDE.md が無く AGENTS.md だけがあるリポジトリで、update-docs はスキル一覧・構成の節を
#       AGENTS.md へ書く。AGENTS.md には init-codex 系が置く管理区間（agents-md）や、
#       setup-repo-guards が置くレビュー観点集など人が育てた本文があるため、自分専用の
#       マーカー区間の中身だけを管理し、区間外のバイトは 1 つも変えない。AGENTS.md への書き込みは
#       このスクリプトだけで行い、直接編集しない。
#
# 使い方:
#   agents-section.sh --target <AGENTS.md> --block <区間の中身ファイル> [--check]
#   --check は書き込まず、書いた場合の結果語彙だけを返す（終了コードは通常実行と同じ）。
#   --target が無いときは作らずに止める（update-docs はファイルを新規作成しない）。
#
# マーカー（それぞれ単独の 1 行。行末の空白・CR は無視、行頭の字下げは不可）:
#   <!-- agent-cli-skills:update-docs:start -->
#   <!-- agent-cli-skills:update-docs:end -->
#   init-codex 系の管理区間（agent-cli-skills:agents-md:start / end）は書き換えない。
#
# 挙動:
#   - 区間無し               -> 末尾へ追記（appended）。既存バイトは不変。末尾改行が無ければ
#                               区切りの改行を足し、空行 1 つを挟んで区間を置く
#   - 区間 1 組（start < end）-> start/end の間だけ差し替え（replaced）。区間外は不変
#   - 結果が現状と同一       -> 書かない（unchanged。mtime も変えない）
#
# 書かずに非 0 で止める条件（ファイルは変えない）:
#   - 自マーカーが片方のみ・2 組以上・逆順（error-markers）
#   - 自マーカーが agents-md 管理区間の内側にある、または自区間の内側に agents-md 管理区間がある。
#     閉じていない agents-md 区間への追記も、区間の内側に入るため止める（error-nested）。自区間の
#     後ろにある閉じていない agents-md 区間は、差し替え・unchanged では元の状態のまま許す
#   - 対象のコードフェンスが閉じていない（error-fence）
#   - --block の中身にどちらかのマーカー文字列（自分のもの・agents-md のもの）が含まれる
#     （error-block-marker。フェンスの内外を問わない）
#   - --block のコードフェンスが閉じておらず、書くと区間の終端がフェンス内に入る（error-block-fence）
#   - --target か --block がシンボリックリンク（error-symlink）
#   - 走査したあとに --target が書き換わった（error-changed）。走査の前に --target を一時ディレクトリへ
#     コピーし、そのコピーから結果を作る。置換（mv）の直前に --target がコピーと同じかを比べ、違えば
#     書かずに止める。他者の更新を上書きしないための検知で、比べてから mv までの短い間は排他しない
# コードフェンス: ``` / ~~~ のフェンス内の行はマーカーとして数えない（フェンス行の字下げは 3 桁まで・
#   開きより短い閉じは無効）。
# 既存のマーカー行（CRLF を含む）は差し替え時もそのバイトのまま残す。追記時に足すマーカーは LF。
#
# 32768 バイト超: Codex が AGENTS.md を読む上限。書き込み後（unchanged では現状）のサイズが
#   超えるときは stderr へ警告を出す。止めはしない。サイズはバイト数（wc -c）で数える。
#
# 終了コード: 0 成功 / 1 使い方の誤り / 2 入出力・前提（error-changed を含む）/ 4 マーカー・フェンス不整合
# stdout の最終行は固定語彙の
#   UPDATE_DOCS_SECTION_RESULT <appended|replaced|unchanged|error-...>。
#
# ファイル全体を $(...) で読み書きしない（末尾の改行が落ちるため）。書き込みは同じディレクトリの
# 一時ファイルから mv で置換する。単体実行専用（source しない）。bash 3.2 と BSD/GNU の
# POSIX ツールだけで動く。
set -euo pipefail

START='<!-- agent-cli-skills:update-docs:start -->'
END='<!-- agent-cli-skills:update-docs:end -->'
OTHER_START='<!-- agent-cli-skills:agents-md:start -->'
OTHER_END='<!-- agent-cli-skills:agents-md:end -->'
LIMIT=32768

fail() {
  # $1 終了コード $2 語彙 $3 メッセージ
  echo "エラー: $3" >&2
  echo "UPDATE_DOCS_SECTION_RESULT $2"
  exit "$1"
}

TARGET="" BLOCK="" CHECK=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --check)
      CHECK=1
      shift
      ;;
    --target | --block)
      [[ $# -ge 2 ]] || fail 1 error-usage "$1 に値がない"
      if [[ "$1" == "--target" ]]; then TARGET="$2"; else BLOCK="$2"; fi
      shift 2
      ;;
    *) fail 1 error-usage "未知の引数: $1（使い方: --target <AGENTS.md> --block <file> [--check]）" ;;
  esac
done
[[ -n "${TARGET}" && -n "${BLOCK}" ]] || fail 1 error-usage "--target と --block は必須"
[[ ! -L "${BLOCK}" ]] || fail 2 error-symlink "--block はシンボリックリンク（読み込み元を差し替えられないよう扱わない）"
[[ -f "${BLOCK}" && -r "${BLOCK}" ]] || fail 2 error-block-unreadable "--block のファイルを読めない"
[[ ! -L "${TARGET}" ]] || fail 2 error-symlink "--target はシンボリックリンク（mv で置換すると実体を壊すため扱わない）"
[[ -e "${TARGET}" ]] || fail 2 error-target-missing "--target が無い（update-docs はファイルを新規作成しない）"
[[ -f "${TARGET}" ]] || fail 2 error-target "--target は通常ファイルではない"

WORK=$(mktemp -d "${TMPDIR:-/tmp}/agents-section.XXXXXX") || fail 2 error-io "一時ディレクトリを作れない"
TMP_OUT=""
cleanup() {
  rm -rf "${WORK}"
  [[ -z "${TMP_OUT}" ]] || rm -f "${TMP_OUT}"
}
trap cleanup EXIT

# ---- 区間の中身の検査 ----
# 中身にマーカー文字列があると区間が壊れる。フェンスの内外を問わず拒否する。
if grep -qF -e "${START}" -e "${END}" -e "${OTHER_START}" -e "${OTHER_END}" "${BLOCK}"; then
  fail 4 error-block-marker "--block の中身に管理マーカーの文字列が含まれている"
fi
[[ -s "${BLOCK}" ]] || fail 2 error-block-empty "--block が空"

# 末尾改行を保証した中身（コマンド置換は末尾改行を落とすため、ファイルのまま扱う）
BLK="${WORK}/blk"
cat "${BLOCK}" > "${BLK}"
if [[ -n "$(tail -c 1 "${BLK}")" ]]; then printf '\n' >> "${BLK}"; fi

# ---- 走査: フェンス外のマーカー位置 ----
# 出力 1 行: <start行> <end行> <startの数> <endの数> <フェンスが閉じていないとき 1>
#            <入れ子のとき 1> <末尾で agents-md 区間が開いたままのとき 1>
# 入れ子 = 自マーカーが agents-md 区間の内側にある、または agents-md のマーカーが自区間の内側にある。
scan() {
  LC_ALL=C awk -v S="${START}" -v E="${END}" -v OS="${OTHER_START}" -v OE="${OTHER_END}" '
    function rtrim(s) { sub(/[ \t\r]+$/, "", s); return s }
    {
      t = $0; sub(/\r$/, "", t); sub(/^ ? ? ?/, "", t)
      c = substr(t, 1, 1); run = 0
      if (c == "`" || c == "~") { while (substr(t, run + 1, 1) == c) run++ }
      if (!infence) {
        if (run >= 3) {
          rest = substr(t, run + 1)
          if (c == "~" || index(rest, "`") == 0) { infence = 1; fch = c; flen = run; next }
        }
        s = rtrim($0)
        if (s == S) { ns++; sl = NR; if (inother) nested = 1; inown = 1 }
        else if (s == E) { ne++; el = NR; if (inother) nested = 1; inown = 0 }
        else if (s == OS) { if (inown) nested = 1; inother = 1 }
        else if (s == OE) { if (inown) nested = 1; inother = 0 }
      } else {
        if (c == fch && run >= flen && substr(t, run + 1) ~ /^[ \t]*$/) infence = 0
      }
    }
    END { printf "%d %d %d %d %d %d %d\n", sl + 0, el + 0, ns + 0, ne + 0, infence + 0, nested + 0, inother + 0 }
  ' "$1"
}

warn_size() {
  local size
  size=$(wc -c < "$1" | tr -d ' ')
  if [[ "${size}" -gt "${LIMIT}" ]]; then
    echo "警告: AGENTS.md は ${size} バイトで Codex の読み込み上限 ${LIMIT} バイトを超える（超過分は読まれない）" >&2
  fi
}

# 走査から置換までの間に他者が --target を書き換えても気づけるよう、先にコピーを取り、
# 以降の判定と結果の生成はすべてこのコピー（SNAP）から行う。
SNAP="${WORK}/snap"
cat "${TARGET}" > "${SNAP}" || fail 2 error-io "AGENTS.md を読めない"

SCAN1="${WORK}/scan1"
scan "${SNAP}" > "${SCAN1}" || fail 2 error-io "AGENTS.md を走査できない"
read -r sl el ns ne infence nested open_other < "${SCAN1}" || fail 2 error-io "走査結果を読めない"
[[ "${infence}" -eq 0 ]] \
  || fail 4 error-fence "コードフェンスが閉じていない。マーカーの位置を判定できないため変更しない（フェンスを閉じてから再実行する）"

NEW="${WORK}/new"
if [[ "${ns}" -eq 0 && "${ne}" -eq 0 ]]; then
  [[ "${open_other}" -eq 0 ]] \
    || fail 4 error-nested "agents-md 管理区間が閉じていない。末尾へ追記すると区間の内側に入るため変更しない"
  mode=appended
  {
    cat "${SNAP}"
    if [[ -s "${SNAP}" ]]; then
      if [[ -n "$(tail -c 1 "${SNAP}")" ]]; then printf '\n'; fi
      printf '\n'
    fi
    printf '%s\n' "${START}"
    cat "${BLK}"
    printf '%s\n' "${END}"
  } > "${NEW}"
elif [[ "${ns}" -eq 1 && "${ne}" -eq 1 && "${sl}" -lt "${el}" ]]; then
  [[ "${nested}" -eq 0 ]] \
    || fail 4 error-nested "update-docs の区間と agents-md 管理区間が入れ子になっている。ファイルは変更しない"
  mode=replaced
  {
    head -n "${sl}" "${SNAP}"
    cat "${BLK}"
    tail -n +"${el}" "${SNAP}"
  } > "${NEW}"
else
  fail 4 error-markers "update-docs のマーカーが不整合（片方のみ・2 組以上・逆順のいずれか）。ファイルは変更しない"
fi
[[ "${nested}" -eq 0 ]] || fail 4 error-nested "update-docs の区間と agents-md 管理区間が入れ子になっている。ファイルは変更しない"

# 書く結果が 1 組のマーカーとして読め、フェンスが閉じていること（中身のフェンス閉じ忘れの検出）
# 末尾で開いたままの agents-md 区間は、元ファイルと同じ状態（open_other）なら許す。差し替え・unchanged は
# 自区間の外を変えないため、既存の状態を保っている。増えたときだけ、--block が区間を壊したとみなす。
# 追記は上で open_other = 0 を要求済みなので、ここでは 0 のままであることを意味する。
SCAN2="${WORK}/scan2"
scan "${NEW}" > "${SCAN2}" || fail 2 error-io "書き込み結果を走査できない"
read -r _ _ ns2 ne2 infence2 nested2 open2 < "${SCAN2}" || fail 2 error-io "走査結果を読めない"
if [[ "${ns2}" -ne 1 || "${ne2}" -ne 1 || "${infence2}" -ne 0 || "${nested2}" -ne 0 || "${open2}" -ne "${open_other}" ]]; then
  fail 4 error-block-fence "--block のコードフェンスが閉じていないなど、書くと区間を読み取れなくなる"
fi

if cmp -s "${NEW}" "${SNAP}"; then mode=unchanged; fi

if [[ "${mode}" == "unchanged" || "${CHECK}" -eq 1 ]]; then
  warn_size "${NEW}"
  echo "UPDATE_DOCS_SECTION_RESULT ${mode}"
  exit 0
fi

# ---- 原子的な書き込み（同一ディレクトリの一時ファイル -> mv） ----
TMP_OUT=$(mktemp "${TARGET}.tmp.XXXXXX") || fail 2 error-io "一時ファイルを作れない"
# 権限・所有を引き継ぐため、既存ファイルのコピーへ内容だけ上書きする
cp -p "${TARGET}" "${TMP_OUT}" || fail 2 error-io "権限を引き継げない"
cat "${NEW}" > "${TMP_OUT}" || fail 2 error-io "一時ファイルへ書けない"
# 置換の直前に、走査したときの内容から変わっていないことを確かめる（変わっていたら他者の更新を上書きしない）
cmp -s "${TARGET}" "${SNAP}" \
  || fail 2 error-changed "走査のあとに AGENTS.md が書き換えられた。他の更新を上書きしないため書かない（再実行する）"
mv -f "${TMP_OUT}" "${TARGET}" || fail 2 error-io "置換できない"
TMP_OUT=""
warn_size "${TARGET}"
echo "UPDATE_DOCS_SECTION_RESULT ${mode}"
