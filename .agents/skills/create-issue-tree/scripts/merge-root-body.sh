#!/usr/bin/env bash
# merge-root-body.sh — 既存ルート issue の本文へ、今回起票した Phase の行・セクションだけをマージして更新する
#
# 呼び出し元: skills/create-issue-tree/SKILL.md Step 6（--root 指定の部分起票経路）。
# 役割: 旧 Step 6 は --root 用の約 125 行の bash を SKILL.md に埋め込み、実行時の Claude が転記して
#       実行していた。レビュー修正のたびに SKILL.md が肥大し、ヘルパーも tree-lib.sh と二重化して
#       いたため、マージ処理を本スクリプトへ切り出した（Issue #556。新規作成経路は create-root-body.sh）。
#       先行 Phase の表・自由記述は保持し、今回の Phase 行とセクションだけを実ツリーから生成して差し替える。
#
# 使い方: merge-root-body.sh --root <n> --granularity <Nh> --phase <N> --phase-number <n>
#         引数が無ければ環境変数 ROOT_NUMBER / GRANULARITY / PHASE / PHASE_NUMBER を使う。
#
# Step 3 雛形との対応（追記位置の契約）:
#   - 表のプレースホルダー行 `| (作成後に更新) |` は、実在の Phase 行が 1 つも無い雛形のままのルートで
#     今回の Phase 行へ置き換える位置として awk が読む。`## 運用` 見出しは Phase セクションの挿入位置。
#     文言を変えるときは Step 3 の雛形とテスト (n) を合わせて直す。
#
# 不変条件:
#   - Phase 行・セクションは実ツリーからのみ生成し、タイトルは非信頼データとして無害化する（CELL）。
#   - 最終本文にプレースホルダーが残る・検査に失敗する場合は gh issue edit を呼ばない（fail-closed）。
#   - セクションは一時ファイル、行は ENVIRON 経由で awk へ渡す（環境変数長上限の回帰防止。SEC= で渡さない）。
#   - コードフェンス内の行は見出し・表行・`## 運用` として扱わない（フェンス内の `# コメント` が置換対象セクションの
#     終端に見えて旧内容が残るのを防ぐ）。閉じ忘れのフェンスは追記位置を判定できないため中止する（Issue #557）。
#   - update-issue-tree の管理マーカー（`<!-- update-issue-tree:phase-plan:begin/end -->`）がある本文では区間の内側だけを
#     置換対象にし、外側は素通しする。マーカーが無くても `<details>` 内（update-issue-tree が退避した旧表など）は対象外。
#     マーカーが 1 組でない・除外後も同名の見出しが複数ある・`<details>` が閉じていない本文は、置換先を決められないため中止する。
#     `<details` は直後が空白・CR・`>`・行末のときだけ開きタグとして数える（`<detailsfoo>` 等は通常行）。
#   - 一時ファイルは成否によらず削除する（trap は mktemp より先に登録）。
#   - granularity マーカーは常に GRANULARITY で先頭へ 1 行だけ書き直す。
#
# 終了コード: 0 本文をマージして更新した / 1 入力不正・取得失敗・追記位置なし・検査失敗（本文は未更新）/
#            2 前提不備（gh・jq・tree-lib.sh が使えない。本文は未更新）/
#            それ以外は gh issue edit 自身の終了コード（実状態の確認が必要）。
# 成功時の stdout 最終行: result=merged root=<n> phase=<N>。エラーは stderr へ出す。
#
# set -e は使わない。本文がマーカー 1 行だけのとき grep -v が exit 1 を返すのは正常系であり、
# `[ ... ] && break` 等の -e 非互換パターンも含むため、失敗は `|| die` で明示処理する。単体実行用で source しない。
set -uo pipefail

USAGE='使い方: merge-root-body.sh --root <n> --granularity <Nh> --phase <N> --phase-number <n>'

die() {
  local code="$1"
  shift
  echo "エラー: $*" >&2
  exit "${code}"
}

ROOT_NUMBER="${ROOT_NUMBER:-}"
GRANULARITY="${GRANULARITY:-}"
PHASE="${PHASE:-}"
PHASE_NUMBER="${PHASE_NUMBER:-}"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --root | --granularity | --phase | --phase-number)
      [[ $# -ge 2 ]] || die 1 "$1 に値がありません。${USAGE}"
      case "$1" in
        --root) ROOT_NUMBER="$2" ;;
        --granularity) GRANULARITY="$2" ;;
        --phase) PHASE="$2" ;;
        --phase-number) PHASE_NUMBER="$2" ;;
      esac
      shift 2
      ;;
    *) die 1 "未知の引数: $1。${USAGE}" ;;
  esac
done
[[ "${ROOT_NUMBER}" =~ ^[1-9][0-9]*$ ]] || die 1 "--root（ROOT_NUMBER）は正整数で指定してください。"
[[ "${GRANULARITY}" =~ ^[1-9][0-9]*h$ ]] || die 1 "--granularity（GRANULARITY）は正整数+h 形式（例: 2h）で指定してください。"
# PHASE は awk の正規表現へ入るため、数字以外は API 呼び出し前に拒否する
[[ "${PHASE}" =~ ^[0-9]+$ ]] || die 1 "--phase（PHASE）は数字で指定してください。"
[[ "${PHASE_NUMBER}" =~ ^[1-9][0-9]*$ ]] || die 1 "--phase-number（PHASE_NUMBER）は正整数で指定してください。"

# gh・jq の欠落はライブラリ読み込み失敗と区別して前提不備（exit 2）にする
command -v gh >/dev/null 2>&1 || die 2 "gh が見つかりません。"
command -v jq >/dev/null 2>&1 || die 2 "jq が見つかりません。"
# shellcheck source=tree-lib.sh
source "$(dirname "${BASH_SOURCE[0]}")/tree-lib.sh" 2>/dev/null \
  || die 2 "tree-lib.sh を読み込めません。"

# trap を mktemp より先に登録する（mktemp 失敗時も作成済みファイルを削除するため）
SEC_FILE=''
CHK_FILE=''
trap 'rm -f "${SEC_FILE}" "${CHK_FILE}"' EXIT

CURRENT_BODY=$(gh issue view "${ROOT_NUMBER}" --json body --jq '.body') \
  || die 1 "ルート issue #${ROOT_NUMBER} の本文を取得できません。中止します。"

# <!-- granularity: Nh --> マーカーは常に GRANULARITY で先頭へ 1 行だけ書き直す。
# 既存本文に旧マーカー行があれば重複させないため、先に取り除いてから先頭へ再出力する。
# 本文がマーカー 1 行だけだと grep -v は exit 1 を返すが正常系なので失敗扱いにしない（2 以上のみ失敗）
rc=0; CURRENT_BODY=$(printf '%s\n' "${CURRENT_BODY}" | grep -vE '^<!-- granularity: [1-9][0-9]*h -->$') || rc=$?
[ "${rc}" -le 1 ] || die 1 "既存本文の granularity マーカー除去に失敗しました（grep exit ${rc}）。中止します。"
NEW_BODY="$(printf '<!-- granularity: %s -->\n' "${GRANULARITY}"; printf '%s\n' "${CURRENT_BODY}")"

# 今回の Phase 行（PHASE_ROW）と「### Phase N: ...」セクション（PHASE_SECTION）を実ツリーから生成する
PTITLE=$(gh issue view "${PHASE_NUMBER}" --json title --jq ".title | ${CELL}") \
  || die 1 "Phase 親 #${PHASE_NUMBER} を取得できません。中止します。"
CHILDREN=$(list_subs "${PHASE_NUMBER}") \
  || die 1 "Phase 親 #${PHASE_NUMBER} の sub-issues を取得できません。中止します。"
# jq が失敗（API 応答の形が想定外）したまま空値で Phase 行・セクションを作ると、既存本文を誤内容で
# 上書きし得るため、変換ごとに終了コードと値の形を確認して失敗時は本文未更新で中止する（fail-closed）
CHILDREN=$(printf '%s' "${CHILDREN}" | jq '[.[] | select(.state == "open")]') \
  || die 1 "Phase 親 #${PHASE_NUMBER} の sub-issues の絞り込みに失敗しました。ルート本文は更新しません。"
DIRECT=$(printf '%s' "${CHILDREN}" | jq 'length') \
  || die 1 "Phase 親 #${PHASE_NUMBER} の子 issue 数の集計に失敗しました。ルート本文は更新しません。"
[[ "${DIRECT}" =~ ^[0-9]+$ ]] \
  || die 1 "Phase 親 #${PHASE_NUMBER} の子 issue 数が数値ではありません。ルート本文は更新しません。"
TOTAL=${DIRECT}

PHASE_SECTION="### Phase ${PHASE}: ${PTITLE}"$'\n\n'"| Issue | タイトル | 分解 |"$'\n'"|-------|---------|------|"
for j in $(seq 0 $((DIRECT - 1))); do
  [ "${DIRECT}" -ge 1 ] || break
  CNUM=$(printf '%s' "${CHILDREN}" | jq -r --argjson j "${j}" '.[$j].number') \
    || die 1 "子 issue の番号を取得できません。ルート本文は更新しません。"
  [[ "${CNUM}" =~ ^[1-9][0-9]*$ ]] \
    || die 1 "子 issue の番号が正整数ではありません。ルート本文は更新しません。"
  CTITLE=$(printf '%s' "${CHILDREN}" | jq -er --argjson j "${j}" ".[\$j].title | ${CELL}") \
    || die 1 "#${CNUM} のタイトルを取得できません。ルート本文は更新しません。"
  GRAND_OPEN=$(count_open_desc "${CNUM}") \
    || die 1 "#${CNUM} の子孫を取得できません。中止します。"
  TOTAL=$((TOTAL + GRAND_OPEN))
  if [ "${GRAND_OPEN}" -ge 1 ]; then DECOMP='sub-issue あり'; else DECOMP='-'; fi
  PHASE_SECTION+=$'\n'"| #${CNUM} | ${CTITLE} | ${DECOMP} |"
done
PHASE_ROW="| Phase ${PHASE} | #${PHASE_NUMBER} ${PTITLE} | ${DIRECT} | ${TOTAL} |"

# Phase N が既存本文にあれば、その行とセクションを置き換える（再利用した Phase 親の件数更新）。
# 無ければ表の最終行（'| Phase N |' 行）の直後へ行を挿入し、セクションは既存 Phase セクションと同じ位置
# （'## 運用' の直前）へ挿入する（'## 運用' が無い本文のみ末尾へ追加する）。
# 実在の Phase 行が 1 つも無い Step 3 雛形のままの本文では、'| (作成後に更新) |' 行の位置へ今回の Phase 行を
# 置き換えて挿入する。このプレースホルダー行は実在行の有無によらず出力しない。
# 追記位置がどちらも無い、または行を出力できなかった場合は awk が exit 3 で中止する（fail-closed）。
# コードフェンス（行頭 0〜3 空白の ``` / ~~~、閉じは同記号で開き以上の長さ）の内側の行は F[] で印を付け、
# 見出し・表行・プレースホルダー・運用見出しの判定から外す。ユーザー編集可能な本文で閉じ忘れフェンスがあると
# 以降が全てフェンス内扱いになり実セクションを消し得るため、閉じていなければ exit 5 で本文未更新のまま中止する。
# 管理マーカー区間と <details> の内側は X[] で対象外にし、マーカーの不整合は exit 6、除外後も置換対象の見出しが複数なら exit 7、<details> の閉じ忘れは exit 8 で中止する。
# 区間指定 {n,m} や gawk 拡張は mawk・BSD awk 非対応のため使わない。
# セクションは全子 issue の行を含み環境変数・引数の長さ上限を超え得るため、一時ファイル経由で渡す。
# 行（1 行）は ENVIRON で渡し、いずれもシェル構文・awk 構文として再評価させない
SEC_FILE=$(mktemp) && printf '%s\n' "${PHASE_SECTION}" > "${SEC_FILE}" \
  || die 1 "Phase セクションの一時ファイルを作成できません。中止します。"
CHK_FILE=$(mktemp) || die 1 "検査用の一時ファイルを作成できません。中止します。"
rc=0
NEW_BODY=$(printf '%s\n' "${NEW_BODY}" | PH="${PHASE}" ROW="${PHASE_ROW}" SECF="${SEC_FILE}" CHKF="${CHK_FILE}" awk '
  # 開きフェンス行なら 1 を返し、記号 fch と長さ flen を保存する。info 文字列に ` を含む ``` 行は開きではない
  function fence_open(line,    ind, rest, len, info) {
    match(line, /^ */); ind = RLENGTH
    if (ind > 3) return 0
    rest = substr(line, ind + 1)
    if (match(rest, /^`+/)) {
      len = RLENGTH; info = substr(rest, len + 1)
      if (len < 3 || index(info, "`") > 0) return 0
      fch = "`"; flen = len; return 1
    }
    if (match(rest, /^~+/)) {
      if (RLENGTH < 3) return 0
      fch = "~"; flen = RLENGTH; return 1
    }
    return 0
  }
  # 閉じフェンス行なら 1 を返す。同じ記号が開き以上の長さで続き、後ろは空白・タブ・CR のみ
  function fence_close(line,    ind, rest, len) {
    match(line, /^ */); ind = RLENGTH
    if (ind > 3) return 0
    rest = substr(line, ind + 1)
    # 三項演算子に正規表現リテラルを置くと $0 との照合結果（0/1）になるため、文字列で渡す
    if (!match(rest, (fch == "`") ? "^`+" : "^~+")) return 0
    len = RLENGTH
    return (len >= flen && substr(rest, len + 1) ~ /^[ \t\r]*$/)
  }
  # 本文へ 1 行出力する。passthru = 1（素通しの退避部分）でなければ検査用ファイルにも書く
  function emit(text, passthru) {
    print text
    if (!passthru) print text > ENVIRON["CHKF"]
  }
  BEGIN {
    sec = ""; n = 0
    while ((rc = (getline sl < ENVIRON["SECF"])) > 0) { sec = (n++ ? sec "\n" : "") sl }
    if (rc < 0) exit 4
  }
  {
    L[NR] = $0
    if (infence) { F[NR] = 1; if (fence_close($0)) infence = 0 }
    else if (fence_open($0)) { F[NR] = 1; infence = 1 }
  }
  END {
    if (infence) exit 5
    ph = ENVIRON["PH"]; row_re = "^[|] Phase " ph " [|]"; sec_re = "^### Phase " ph ":"
    row_done = 0; sec_done = 0; skip = 0; has_sec = 0
    # 管理マーカー区間（update-issue-tree の phase-plan）と <details> は置換対象から外す（X[] = 1）。
    # マーカーがあれば区間の内側だけが対象で外側は素通し。無ければ <details> の外側が対象。
    # マーカーの個数・順序が不整合なら対象範囲を決められないため exit 6 で中止する
    nb = 0; ne = 0; depth = 0
    for (k = 1; k <= NR; k++) {
      if (F[k]) continue
      if (L[k] ~ /^[ \t]*<!-- update-issue-tree:phase-plan:begin -->[ \t\r]*$/) { nb++; bpos = k }
      else if (L[k] ~ /^[ \t]*<!-- update-issue-tree:phase-plan:end -->[ \t\r]*$/) { ne++; epos = k }
    }
    if (nb > 1 || ne > 1 || nb != ne || (nb == 1 && bpos > epos)) exit 6
    for (k = 1; k <= NR; k++) {
      if (nb == 1 && (k <= bpos || k >= epos)) { X[k] = 1; XO[k] = 1 }
      if (F[k]) { if (depth > 0) X[k] = 1; continue }
      if (L[k] ~ /^[ \t]*<details([ \t\r>]|$)/) {
        opens = 1; X[k] = 1
        if (L[k] ~ /<\/details>[ \t\r]*$/) opens = 0
        depth += opens
      } else if (L[k] ~ /^[ \t]*<\/details>/) {
        X[k] = 1; if (depth > 0) depth--
      } else if (depth > 0) X[k] = 1
    }
    # 閉じ忘れの <details> は、以降の行が全て除外されて後ろの見出しが置換対象から外れるため、範囲を判定できず中止する
    if (depth > 0) exit 8
    # 追記位置（最終 Phase 行・プレースホルダー行）と置換対象の見出し数は、対象範囲の行だけから数える
    nsec = 0
    for (k = 1; k <= NR; k++) {
      if (F[k] || X[k]) continue
      if (L[k] ~ /^[|] Phase [0-9]+ [|]/) last = k
      else if (L[k] ~ /^[|] [(]作成後に更新[)] [|][ |]*$/) { T[k] = 1; if (!tmpl) tmpl = k }
      if (L[k] ~ sec_re) { has_sec = 1; nsec++ }
    }
    if (nsec > 1) exit 7
    if (last == 0 && tmpl == 0) exit 3
    for (i = 1; i <= NR; i++) {
      line = L[i]
      # 旧節の除去は次の見出しか区間の外へ出る境界（end マーカー）まで続ける。途中の通常コメント行・表は旧節の一部として落とし、
      # 保護対象の <details>（退避節）だけは落とさず出力する
      if (skip && XO[i]) { skip = 0; emit("", 0) }
      if (skip && X[i]) { emit(line, 1); continue }
      if (F[i] && !X[i]) { if (skip) continue; emit(line, 0); continue }
      if (X[i]) {
        # マーカー区間の末尾で、置換対象の節がまだ無ければ区間の内側（end マーカーの直前）へ新節を入れる
        if (nb == 1 && i == epos && !sec_done && !has_sec) { emit(sec, 0); emit("", 0); sec_done = 1 }
        emit(line, 1); continue
      }
      if (skip) { if (line ~ /^(#|##|###) /) { skip = 0; emit("", 0) } else continue }
      if (i in T) { if (last == 0 && i == tmpl && !row_done) { emit(ENVIRON["ROW"], 0); row_done = 1 }; continue }
      if (line ~ row_re) { if (!row_done) { emit(ENVIRON["ROW"], 0); row_done = 1 }; continue }
      if (line ~ sec_re) { if (!sec_done) { emit(sec, 0); sec_done = 1 }; skip = 1; continue }
      if (line ~ /^## 運用/ && !sec_done && !has_sec) { emit(sec, 0); emit("", 0); sec_done = 1 }
      emit(line, 0)
      if (i == last && !row_done) { emit(ENVIRON["ROW"], 0); row_done = 1 }
    }
    if (!sec_done) { emit("", 0); emit(sec, 0) }
    # 唯一のプレースホルダー行が置換対象セクション内にあると skip 分岐で読み飛ばされ、行を出力しないまま終わる
    if (!row_done) exit 3
  }') || rc=$?
if [ "${rc}" -eq 5 ]; then
  die 1 "ルート本文のコードフェンスが閉じていないため追記位置を判定できません。ルート本文は更新しません。"
elif [ "${rc}" -eq 6 ]; then
  die 1 "update-issue-tree の管理マーカー（phase-plan:begin / end）が 1 組になっていないため、置換対象の範囲を判定できません。ルート本文は更新しません。"
elif [ "${rc}" -eq 7 ]; then
  die 1 "置換対象の '### Phase ${PHASE}:' 見出しが管理マーカー・<details> を除いても複数あり、どれを置換するか判定できません。ルート本文は更新しません。"
elif [ "${rc}" -eq 8 ]; then
  die 1 "ルート本文の <details> が閉じていないため置換対象の範囲を判定できません。ルート本文は更新しません。"
elif [ "${rc}" -ne 0 ]; then
  die 1 "本文の Phase 別表に追記位置（'| Phase N |' 行または '| (作成後に更新) |' 行）がないか、Phase 行を出力できませんでした。中止します。"
fi

# 検査は追記を全て終えた最終本文のうち、今回生成・置換した範囲（awk が CHK_FILE へ書いた、素通しの退避部分
# = 管理マーカー区間の外と <details> 内を除く行）に対し、gh issue edit の直前で行う（fail-closed）。
# 退避された Step 3 表のプレースホルダーは update-issue-tree が保持するため、検査対象にすると移行済みルートが更新できない。
# 追記前に検査すると、追記部分に残ったプレースホルダーが検査を素通りする。
# grep の終了コードは 0=ヒット / 1=なし / 2 以上=失敗。2 以上は「残りなし」へ倒さず中止する
rc=0; grep -qE "${TREE_PLACEHOLDER_RE}" "${CHK_FILE}" || rc=$?
[ "${rc}" -eq 1 ] \
  || die 1 "本文にプレースホルダーが残っている、または検査に失敗した（grep exit ${rc}）。ルート本文は更新しません。"

# 検査を通った NEW_BODY を、検査直後に（本文を変更せず）そのまま gh issue edit へ渡す。
# 本文は stdin 経由で渡し、一時ファイルを作らない。失敗時は gh issue edit 自身の終了コードを伝播する
printf '%s\n' "${NEW_BODY}" | gh issue edit "${ROOT_NUMBER}" --body-file - || exit $?
echo "result=merged root=${ROOT_NUMBER} phase=${PHASE}"
