#!/usr/bin/env bash
# update-root-body.sh — ルート（トラッキング）issue 本文の「管理ブロックだけ」を更新する
#
# 呼び出し元: skills/update-issue-tree/SKILL.md Step 8。
# 役割: 旧 Step 8 は固定テンプレートで本文を全置換し、人が書いた計画・判断根拠・追記を棚卸しの
#       たびに消していた（Issue #545）。本スクリプトは既存本文を取得し、スキルが管理する範囲
#       だけを実ツリー（sub_issues API）から再生成して差し替え、それ以外の行は 1 行も失わない。
#
# 不変条件:
#   - 既存本文から消してよいのは「phase-plan マーカー間の行」と「granularity マーカー行」だけ。
#     マーカーが無い本文の移行時も同じで、旧 Phase 別表の候補は削除せず <details> へ逐語で退避する。
#   - 棚卸し履歴（inventory マーカー間）は追記専用。既存行は保持し、今回の 1 行だけ末尾へ足す。
#   - 本文に載せる値は実ツリーと検証済み引数だけから作る。件数引数は既定値なしの必須で、
#     プレースホルダーが残っていれば API を呼ぶ前に exit 1 で止まる。
#   - fail-closed: 取得失敗・マーカー不整合・並行編集・サイズ超過は、本文を変更せず停止する。
#
# 終了コードの正は SKILL.md Step 8 の表（0 成功 / 1 引数 / 2 前提 / 3 ツリー / 4 マーカー不整合 /
# 5 並行編集 / 6 編集失敗 / 7 事後確認不一致）。stdout の最終行は機械可読な result= 行。
#
# このスクリプトは単体実行用であり source しない（set -euo pipefail を使う）。
set -euo pipefail

PB='<!-- update-issue-tree:phase-plan:begin -->'
PE='<!-- update-issue-tree:phase-plan:end -->'
MAX_BODY=65536
MAX_DEPTH=8

die() {
  local code="$1"
  shift
  echo "エラー: $*" >&2
  exit "${code}"
}

usage() {
  echo "使い方: update-root-body.sh --root <n> --granularity <Nh> --reassigned <n> --orphans <n> --labels <n> --new-phases <n> --split <n> [--date YYYY-MM-DD] [--dry-run]" >&2
}

# ---- 引数検証（API 未実行） ----
ROOT="" GRAN="" C_REASSIGNED="" C_ORPHANS="" C_LABELS="" C_NEWPH="" C_SPLIT="" DATE_ARG="" DRY=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY=1
      shift
      ;;
    --root | --granularity | --reassigned | --orphans | --labels | --new-phases | --split | --date)
      [[ $# -ge 2 ]] || {
        usage
        die 1 "$1 に値がない"
      }
      case "$1" in
        --root) ROOT="$2" ;;
        --granularity) GRAN="$2" ;;
        --reassigned) C_REASSIGNED="$2" ;;
        --orphans) C_ORPHANS="$2" ;;
        --labels) C_LABELS="$2" ;;
        --new-phases) C_NEWPH="$2" ;;
        --split) C_SPLIT="$2" ;;
        --date) DATE_ARG="$2" ;;
      esac
      shift 2
      ;;
    *)
      usage
      die 1 "未知の引数: $1"
      ;;
  esac
done

[[ "${ROOT}" =~ ^[1-9][0-9]*$ ]] || die 1 "--root は正整数で指定する"
[[ "${GRAN}" =~ ^[1-9][0-9]*h$ ]] || die 1 "--granularity は正整数+h（例: 2h）で指定する"
for pair in "reassigned:${C_REASSIGNED}" "orphans:${C_ORPHANS}" "labels:${C_LABELS}" "new-phases:${C_NEWPH}" "split:${C_SPLIT}"; do
  [[ "${pair#*:}" =~ ^(0|[1-9][0-9]*)$ ]] || die 1 "--${pair%%:*} は非負整数の実績値で指定する（プレースホルダーが残っていないか確認）"
done
if [[ -z "${DATE_ARG}" ]]; then
  DATE_ARG=$(date +%Y-%m-%d)
fi
[[ "${DATE_ARG}" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || die 1 "--date は YYYY-MM-DD で指定する"

# ---- 前提確認 ----
command -v gh > /dev/null 2>&1 || die 2 "gh が見つからない"
command -v jq > /dev/null 2>&1 || die 2 "jq が見つからない"
gh auth status > /dev/null 2>&1 || die 2 "gh が未認証（gh auth login）"

WORK=$(mktemp -d) || die 2 "一時ディレクトリを作成できない"
trap 'rm -rf "${WORK}"' EXIT

# ---- ルート本文の取得 ----
fetch_root() {
  # $1: 出力先 JSON ファイル。取得失敗・PR は呼び出し側で exit 2 にする。
  gh api "repos/{owner}/{repo}/issues/${ROOT}" > "$1" 2> /dev/null
}

ROOT_JSON="${WORK}/root.json"
fetch_root "${ROOT_JSON}" || die 2 "ルート issue #${ROOT} を取得できない"
jq -e 'type == "object"' "${ROOT_JSON}" > /dev/null 2>&1 || die 2 "ルート issue #${ROOT} の応答が不正"
if jq -e '.pull_request != null' "${ROOT_JSON}" > /dev/null 2>&1; then
  die 2 "#${ROOT} は PR であり issue ではない"
fi
ROOT_REPO_URL=$(jq -r '.repository_url // ""' "${ROOT_JSON}")

BODY_FILE="${WORK}/body.md"
# 原文を逐語で保持する（CR・末尾改行を削らない）。コマンド置換は末尾改行を落とすため、
# 本文は jq からファイルへ直接書き出し、以降の比較もすべてファイル内容で行う。
# 解析時の CRLF 吸収は merge.awk 側で行う。
jq -j '.body // ""' "${ROOT_JSON}" > "${BODY_FILE}" || die 2 "ルート本文を取り出せない"

# 末尾の改行だけを無視した比較用の正規化（$1 入力ファイル / $2 出力ファイル / $3 "nocr" で CR も除去）。
# unchanged 判定と事後確認が、改行 1 個の有無（GitHub 側の正規化を含む）で誤判定しないようにする。
norm_to() {
  if [[ "${3:-}" == "nocr" ]]; then
    jq -Rj -s 'gsub("\r"; "") | sub("\n+\\z"; "")' "$1" > "$2"
  else
    jq -Rj -s 'sub("\n+\\z"; "")' "$1" > "$2"
  fi
}

# ---- ツリー取得 ----
# 子一覧は番号ごとにキャッシュし、同じ issue を再取得しない。
fetch_children() {
  local n="$1" f="${WORK}/c_${1}.json" p=1 page cnt
  local pages=()
  [[ -f "${f}" ]] && return 0
  while :; do
    page="${WORK}/p_${n}_${p}.json"
    gh api "repos/{owner}/{repo}/issues/${n}/sub_issues?per_page=100&page=${p}" > "${page}" 2> /dev/null \
      || die 3 "#${n} の sub-issues を取得できない（page=${p}）"
    jq -e 'type == "array"' "${page}" > /dev/null 2>&1 || die 3 "#${n} の sub-issues 応答が配列でない"
    pages+=("${page}")
    cnt=$(jq 'length' "${page}")
    if [[ "${cnt}" -lt 100 ]]; then
      break
    fi
    p=$((p + 1))
    [[ "${p}" -le 50 ]] || die 3 "#${n} の sub-issues が 5000 件を超えた"
  done
  jq -s 'add // []' "${pages[@]}" > "${f}"
}

# 子の列挙（number state same/other summary_total）。repository_url 欠落は同一リポ扱い。
children_tsv() {
  jq -r --arg ru "${ROOT_REPO_URL}" '.[] | [
      .number,
      .state,
      (if ((.repository_url // $ru) == $ru) then "same" else "other" end),
      (.sub_issues_summary.total // -1)
    ] | @tsv' "${WORK}/c_${1}.json"
}

# walk <n> <depth> → "直下 open 数<空白>全子孫 open 数" を stdout へ出す。
# summary.total == 0 の節点と別リポジトリの sub-issue は API を呼ばず再帰しない。
walk() {
  local n="$1" depth="$2" direct=0 total=0 num state same stotal out d t
  [[ "${depth}" -le "${MAX_DEPTH}" ]] || die 3 "ツリーの深さが ${MAX_DEPTH} を超えた（#${n}）"
  fetch_children "${n}"
  children_tsv "${n}" > "${WORK}/w_${n}.tsv"
  while IFS=$'\t' read -r num state same stotal; do
    [[ -n "${num}" ]] || continue
    if [[ "${state}" == "open" ]]; then
      direct=$((direct + 1))
      total=$((total + 1))
    fi
    if [[ "${same}" == "same" && "${stotal}" != "0" ]]; then
      out=$(walk "${num}" $((depth + 1)))
      read -r d t <<< "${out}"
      total=$((total + t))
    fi
  done < "${WORK}/w_${n}.tsv"
  echo "${direct} ${total}"
}

fetch_children "${ROOT}"
ROOT_CHILDREN="${WORK}/c_${ROOT}.json"
CHILD_COUNT=$(jq 'length' "${ROOT_CHILDREN}")
STATS="${WORK}/stats.tsv"
DETAILS="${WORK}/details.jsonl"
: > "${STATS}"
: > "${DETAILS}"
children_tsv "${ROOT}" > "${WORK}/rootrows.tsv"

while IFS=$'\t' read -r num state same stotal; do
  [[ -n "${num}" ]] || continue
  d=0
  t=0
  if [[ "${same}" == "same" && "${stotal}" != "0" ]]; then
    out=$(walk "${num}" 1)
    read -r d t <<< "${out}"
  fi
  printf '%s\t%s\t%s\n' "${num}" "${d}" "${t}" >> "${STATS}"

  # 直下に open の子がある節点は、その open の子を詳細表にする。
  if [[ "${same}" == "same" && "${d}" -gt 0 ]]; then
    DEC="${WORK}/dec_${num}.tsv"
    : > "${DEC}"
    children_tsv "${num}" > "${WORK}/g_${num}.tsv"
    while IFS=$'\t' read -r gnum gstate gsame gtotal; do
      [[ -n "${gnum}" && "${gstate}" == "open" ]] || continue
      dec=0
      if [[ "${gsame}" == "same" && "${gtotal}" != "0" ]]; then
        gout=$(walk "${gnum}" 2)
        read -r _ gt <<< "${gout}"
        if [[ "${gt}" -gt 0 ]]; then
          dec=1
        fi
      fi
      printf '%s\t%s\n' "${gnum}" "${dec}" >> "${DEC}"
    done < "${WORK}/g_${num}.tsv"
    jq -c --arg ru "${ROOT_REPO_URL}" --argjson parent "${num}" --rawfile dec "${DEC}" '
      ($dec | split("\n") | map(select(length > 0) | split("\t")) | map({key: .[0], value: .[1]}) | from_entries) as $m
      | {parent: $parent, items: [ .[] | select(.state == "open") | {
          number: .number,
          title: .title,
          other: ((.repository_url // $ru) != $ru),
          repo: ((.repository_url // $ru) | sub("^.*/repos/"; "")),
          decomp: (($m[(.number | tostring)] // "0") == "1")
        } ]}' "${WORK}/c_${num}.json" >> "${DETAILS}"
  fi
done < "${WORK}/rootrows.tsv"

# ---- 管理ブロックの生成 ----
# issue タイトル・ラベルは非信頼データ。jq 内でデータとして無害化し、シェル展開へ載せない。
# `<` は `&lt;`、`-->` は `--&gt;` へ置換するため、タイトルがマーカーや HTML 構造を偽装できない。
# 表セルでは `|` の前にバックスラッシュを倍化する（`a\|b` の `\|` が先行 `\` に食われて列が割れるのを防ぐ）。
BLOCK_FILE="${WORK}/block.md"
jq -r -n \
  --arg pb "${PB}" --arg pe "${PE}" \
  --rawfile stats "${STATS}" \
  --slurpfile det "${DETAILS}" \
  --slurpfile ch "${ROOT_CHILDREN}" \
  --arg ru "${ROOT_REPO_URL}" '
  def clean: tostring | gsub("[\r\n]+"; " ") | gsub("<"; "&lt;") | gsub("-->"; "--&gt;");
  def san: clean | gsub("\\\\"; "\\\\") | gsub("\\|"; "\\|");
  def phasex: ([ (.labels // [])[] | (.name? // empty) | select(startswith("phase:")) ]) as $p
    | if ($p | length) == 1 and ($p[0] | ltrimstr("phase:") | test("^[0-9A-Za-z._-]{1,32}$"))
      then ($p[0] | ltrimstr("phase:")) else null end;
  def ref: if ((.repository_url // $ru) != $ru)
    then ((.repository_url | sub("^.*/repos/"; "")) + "#" + (.number | tostring))
    else ("#" + (.number | tostring)) end;
  ($stats | split("\n") | map(select(length > 0) | split("\t"))) as $st
  | ($det | map({key: (.parent | tostring), value: .items}) | from_entries) as $dm
  | $ch[0] as $kids
  | [
      $pb,
      "| Phase | 親 issue | 直下 open | 総 open |",
      "|-------|----------|-----------|---------|"
    ]
    + [ $kids | to_entries[] | .key as $i | .value as $k
        | ($k | ref) as $r
        | ((($k | phasex) // null) | if . == null then "-" else "Phase " + . end) as $ph
        | ($k.title | san) as $t
        | (if $k.state == "closed" then "（closed）" else "" end) as $cl
        | (if ((($k.repository_url // $ru) != $ru)) then "-" else $st[$i][1] end) as $d
        | (if ((($k.repository_url // $ru) != $ru)) then "-" else $st[$i][2] end) as $tt
        | "| \($ph) | \($r) \($t)\($cl) | \($d) | \($tt) |" ]
    + [ $kids | to_entries[] | .key as $i | .value as $k
        | select(($dm[($k.number | tostring)] // []) | length > 0)
        | ($k | phasex) as $px
        | ($k.title | clean) as $th
        | (if $px == null then "### #\($k.number): \($th)" else "### Phase \($px): \($th)" end),
          "",
          "| Issue | タイトル | 分解 |",
          "|-------|---------|------|",
          ( $dm[($k.number | tostring)][]
            | "| \(if .other then "\(.repo)#\(.number)" else "#\(.number)" end) | \(.title | san) | \(if .decomp then "sub-issue あり" else "-" end) |" ),
          "" ]
    + [ $pe ]
  | .[]' > "${BLOCK_FILE}" || die 3 "管理ブロックの生成に失敗した"

# 自己検査: 表のデータ行数がルート直下の件数と一致すること。
ROWS=$(awk 'NR > 1 && /^\| /{ c++ } NR > 1 && /^$/{ exit } END { print c + 0 }' "${BLOCK_FILE}")
if [[ $((ROWS - 1)) -ne "${CHILD_COUNT}" ]]; then
  die 3 "生成した表の行数（$((ROWS - 1))）がルート直下の件数（${CHILD_COUNT}）と一致しない"
fi

ROW_FILE="${WORK}/row.txt"
printf '| %s | %s | %s | %s | %s | %s |\n' \
  "${DATE_ARG}" "${C_REASSIGNED}" "${C_ORPHANS}" "${C_LABELS}" "${C_NEWPH}" "${C_SPLIT}" > "${ROW_FILE}"

# ---- マージ ----
# 本文はコードフェンスの内外を追跡して処理する（フェンス内のマーカー様文字列・見出しは対象外）。
# 置換テキストは -v ではなくファイル経由で渡す（エスケープ解釈を避ける）。
cat > "${WORK}/merge.awk" << 'AWK'
function rtrim(s) {
  sub(/[ \t]+$/, "", s)
  return s
}
function readfile(path,    line, out, first) {
  out = ""
  first = 1
  while ((getline line < path) > 0) {
    out = out (first ? "" : "\n") line
    first = 0
  }
  close(path)
  return out
}
function ish(i, lvl,    s) {
  s = A[i]
  if (lvl == 1) return (substr(s, 1, 2) == "# ")
  if (lvl == 2) return (substr(s, 1, 3) == "## ")
  return (substr(s, 1, 4) == "### ")
}
function addarch(a, b,    j) {
  for (j = a; j <= b; j++) {
    arch = arch (arch == "" ? "" : "\n") L[j]
    skip[j] = 1
  }
}
{ n++; L[n] = $0; A[n] = $0; sub(/\r$/, "", A[n]) }
END {
  PB = "<!-- update-issue-tree:phase-plan:begin -->"
  PE = "<!-- update-issue-tree:phase-plan:end -->"
  IB = "<!-- update-issue-tree:inventory:begin -->"
  IE = "<!-- update-issue-tree:inventory:end -->"
  BLOCK = readfile(ENVIRON["BLOCKF"])
  ROW = readfile(ENVIRON["ROWF"])
  DATE = ENVIRON["DATE"]
  INVHEAD = "| 日付 | 付け替え | 孤児再配置 | phase ラベル同期 | 新 Phase 親 | sub-issue 分解 |\n|------|---------|-----------|----------------|------------|---------------|"
  INVSEC = "## 棚卸しで実施した整理（update-issue-tree 実行履歴）\n\n" IB "\n" INVHEAD "\n" ROW "\n" IE

  infence = 0
  for (i = 1; i <= n; i++) {
    t = A[i]
    sub(/^ ? ? ?/, "", t)
    c = substr(t, 1, 1)
    run = 0
    if (c == "`" || c == "~") {
      while (substr(t, run + 1, 1) == c) run++
    }
    if (!infence) {
      F[i] = 0
      if (run >= 3) {
        rest = substr(t, run + 1)
        if (c == "~" || index(rest, "`") == 0) {
          infence = 1; fch = c; flen = run; F[i] = 1
        }
      }
    } else {
      F[i] = 1
      if (c == fch && run >= flen && substr(t, run + 1) ~ /^[ \t]*$/) infence = 0
    }
  }

  # 閉じていないフェンスは以降をすべてコード扱いにする。本物の見出し・管理マーカーを見落として
  # 管理ブロックを二重に追記し、追記分も描画上コードに飲まれるため、本文を変えずに止める。
  if (infence) {
    print "コードフェンスが閉じていない。管理マーカーの位置を判定できないため本文は変更しない（本文のフェンスを閉じてから再実行する）" > "/dev/stderr"
    exit 4
  }

  hfound = 0
  nonblank = 0
  for (i = 1; i <= n; i++) {
    if (F[i]) { nonblank++; continue }
    s = rtrim(A[i])
    if (s == PB) { npb++; pb = i }
    else if (s == PE) { npe++; pe = i }
    else if (s == IB) { nib++; ib = i }
    else if (s == IE) { nie++; ie = i }
    else if (s ~ /^<!--[ ]*granularity:[ ]*[0-9]+h[ ]*-->$/) { skip[i] = 1; continue }
    if (s !~ /^[ \t]*$/) nonblank++
    if (!hfound && index(A[i], "## Phase 別実装計画") == 1) { h = i; hfound = 1 }
  }

  bad = 0
  if (npb > 1 || npe > 1 || npb != npe) bad = 1
  if (nib > 1 || nie > 1 || nib != nie) bad = 1
  if (npb == 1 && pb >= pe) bad = 1
  if (nib == 1 && ib >= ie) bad = 1
  if (npb == 1 && nib == 1 && !(ie < pb || pe < ib)) bad = 1
  if (bad) {
    print "管理マーカーが不整合（片方のみ・重複・逆順・入れ子のいずれか）。本文は変更しない" > "/dev/stderr"
    exit 4
  }

  tail = ""
  if (nonblank == 0) {
    mig = "inserted"
    print "## 概要\n\n全 open issue を Phase 別に整理したトラッキング issue。各 Phase 親 issue を sub-issues として紐付ける。\n"
    print INVSEC "\n"
    print "## Phase 別実装計画\n"
    print BLOCK "\n"
    print "## 運用\n\n- 新規 issue は起票時に Phase 親へ紐付ける\n- 実行順は sub-issues リスト順が正\n- closed 親の下に open issue を残置しない\n- implement-issue-tree が post-order DFS で消化可能な構造を維持する"
    print mig > ENVIRON["MIGF"]
    exit 0
  }

  mig = "none"
  if (npb == 1) {
    for (i = pb; i <= pe; i++) skip[i] = 1
    before[pb] = BLOCK
    anchor = (hfound && h < pb) ? h : pb
  } else {
    if (hfound) {
      e = n
      for (j = h + 1; j <= n; j++) {
        if (!F[j] && (ish(j, 1) || ish(j, 2))) { e = j - 1; break }
      }
      first3 = e + 1
      for (j = h + 1; j <= e; j++) {
        if (!F[j] && ish(j, 3)) { first3 = j; break }
      }
      arch = ""
      pre_nb = 0
      for (j = h + 1; j < first3; j++) if (A[j] !~ /^[ \t]*$/) pre_nb = 1
      if (pre_nb) addarch(h + 1, first3 - 1)
      j = first3
      while (j <= e) {
        ce = e
        for (k = j + 1; k <= e; k++) {
          if (!F[k] && ish(k, 3)) { ce = k - 1; break }
        }
        if (substr(A[j], 1, 10) == "### Phase ") addarch(j, ce)
        j = ce + 1
      }
      aft = "\n" BLOCK "\n"
      if (arch != "") {
        aft = aft "\n<details><summary>移行前の Phase 別表（update-issue-tree が " DATE " に退避。確認のうえ不要なら削除）</summary>\n\n" arch "\n\n</details>\n"
        mig = "phase-plan-archived"
      } else {
        mig = "inserted"
      }
      after[h] = aft
      anchor = h
    } else {
      tail = "## Phase 別実装計画\n\n" BLOCK
      mig = "inserted"
      anchor = n + 1
    }
  }

  if (nib == 1) {
    last = ""
    for (j = ib + 1; j < ie; j++) if (A[j] !~ /^[ \t]*$/) last = rtrim(A[j])
    if (last != ROW) before[ie] = ROW
  } else {
    if (anchor <= n) pre[anchor] = INVSEC "\n"
    else tail = INVSEC "\n\n" tail
    if (mig == "none") mig = "inserted"
  }

  for (i = 1; i <= n; i++) {
    if (pre[i] != "") print pre[i]
    if (before[i] != "") print before[i]
    if (!skip[i]) print L[i]
    if (after[i] != "") print after[i]
  }
  if (tail != "") {
    if (n > 0) print ""
    print tail
  }
  print mig > ENVIRON["MIGF"]
}
AWK

MERGED_FILE="${WORK}/merged.md"
MIG_FILE="${WORK}/migration.txt"
rc=0
BLOCKF="${BLOCK_FILE}" ROWF="${ROW_FILE}" DATE="${DATE_ARG}" MIGF="${MIG_FILE}" \
  awk -f "${WORK}/merge.awk" "${BODY_FILE}" > "${MERGED_FILE}" || rc=$?
if [[ "${rc}" -eq 4 ]]; then
  exit 4
elif [[ "${rc}" -ne 0 ]]; then
  die 3 "本文のマージに失敗した（awk exit ${rc}）"
fi
MIGRATION=$(cat "${MIG_FILE}")

# granularity マーカーは先頭に 1 行だけ維持する（値は引数どおり）。
# 送信本文はコマンド置換を介さずファイルとして組み立てる（末尾改行を含め逐語で保つ）。
OUT_FILE="${WORK}/new-body.md"
{
  printf '<!-- granularity: %s -->\n' "${GRAN}"
  cat "${MERGED_FILE}"
} > "${OUT_FILE}"

# 実際に送る内容の長さで判定する。長さは jq でコードポイント数を数える
# （bash の ${#} は C ロケールだとバイト数になる）。
WRITE_LEN=$(jq -Rs 'length' "${OUT_FILE}") || die 3 "本文の長さを計測できない"
if [[ "${WRITE_LEN}" -gt "${MAX_BODY}" ]]; then
  die 3 "更新後の本文が ${MAX_BODY} 文字を超える（${WRITE_LEN} 文字）。編集しない"
fi

emit_result() {
  echo "result=$1 root=${ROOT} migration=${MIGRATION} phases=${CHILD_COUNT}"
}

if [[ "${DRY}" -eq 1 ]]; then
  cat "${OUT_FILE}"
  emit_result dry-run
  exit 0
fi

norm_to "${OUT_FILE}" "${WORK}/n_new.txt" || die 3 "送信本文を正規化できない"
norm_to "${BODY_FILE}" "${WORK}/n_old.txt" || die 3 "取得本文を正規化できない"
if cmp -s "${WORK}/n_new.txt" "${WORK}/n_old.txt"; then
  emit_result unchanged
  exit 0
fi

# ---- 編集直前の再取得で並行編集を検知する ----
# 条件付き更新が API に無いため、取得時点の本文と一致する場合に限って書き込む。
# 比較はファイル内容の厳密一致（コマンド置換を介さないため末尾改行・CR も差として検出する）。
RECHECK_JSON="${WORK}/root_recheck.json"
fetch_root "${RECHECK_JSON}" || die 5 "編集直前のルート再取得に失敗した。編集しない"
RECHECK_BODY="${WORK}/body_recheck.md"
jq -j '.body // ""' "${RECHECK_JSON}" > "${RECHECK_BODY}" || die 5 "編集直前のルート本文を取り出せない。編集しない"
if ! cmp -s "${BODY_FILE}" "${RECHECK_BODY}"; then
  die 5 "取得後にルート本文が変更された（並行編集）。編集しない。再実行して差分を確認する"
fi

if ! gh issue edit "${ROOT}" --body-file "${OUT_FILE}" > /dev/null; then
  die 6 "gh issue edit が失敗した。本文の実状態を確認する"
fi

# ---- 事後確認 ----
# 取得した本文全体を送信した本文と比較する。欠落・第三者による改変・マーカー崩れはすべて
# 不一致になる。末尾改行と CR だけは GitHub 側の正規化を許容して無視する。
VERIFY_JSON="${WORK}/root_verify.json"
fetch_root "${VERIFY_JSON}" || die 7 "事後確認の再取得に失敗した（本文は編集済み）"
VERIFY_BODY="${WORK}/body_verify.md"
jq -j '.body // ""' "${VERIFY_JSON}" > "${VERIFY_BODY}" || die 7 "事後確認の本文を取り出せない（本文は編集済み）"
norm_to "${VERIFY_BODY}" "${WORK}/n_verify.txt" nocr || die 7 "事後確認の本文を正規化できない（本文は編集済み）"
norm_to "${OUT_FILE}" "${WORK}/n_sent.txt" nocr || die 7 "送信本文を正規化できない（本文は編集済み）"
if ! cmp -s "${WORK}/n_verify.txt" "${WORK}/n_sent.txt"; then
  die 7 "事後確認の不一致（取得した本文が送信した本文と一致しない。本文は編集済み）"
fi

emit_result updated
