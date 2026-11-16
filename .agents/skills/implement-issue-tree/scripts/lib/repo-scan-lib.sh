#!/usr/bin/env bash
# repo-scan-lib.sh — repo-scan.sh の判定と封筒の payload 組み立てだけを持つ純関数（source 専用）
#
# 呼び出し元: repo-scan.sh（計画 C の Phase P4）。Tree フェーズのエージェント 2 つ（`detect:external-checks` と
#             `plan:skip-labels`）が以前プロンプトに埋め込まれたコマンドを転記して実行していた手順を、スクリプトへ切り出したもの。
# 役割: 1) gh api に渡す jq フィルタ（引用符つきの単純な文字列。バックスラッシュを含まない）、2) 外部由来の文字列の検査
#       （App slug・番号・コミット sha・ラベル）、3) 入力の束縛 inputSha256、4) 封筒の payload（キーを昇順に並べた空白なしの JSON）の組み立て。
# なぜスクリプトに置くか: コマンドはエージェントが転記して実行していたので、転記の誤り（バックスラッシュの半減・`\n` が `n`・引用符の欠落）で
#       結果が黙って変わり得た。スクリプトに置けば run-verified.sh のハッシュで内容が固定され、エージェントが書き写すのは起動行と出力の封筒だけになる。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は stdout と return 値で返す（関数が設定する変数は RS_ で始まる名前に限る）。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
#       signed-output.sh（so_sha256）を先に source しておくこと。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。連想配列・mapfile・GNU 専用フラグを使わない。
#       文字の判定は呼び出し側が LC_ALL=C にしている前提（[a-z] や [[:cntrl:]] が ASCII だけを指す）。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# 直近の merged PR の head の check-runs の 1 ページから、1 行目にそのページの check-run の件数、2 行目以降に GitHub Actions 以外の App の slug を
# 出す gh --jq（gojq）の定義。件数はページ送りの終わりの判定に使い（Issue #809。100 件未満なら最後のページ）、slug の候補には混ぜない
# （slug だけでは github-actions を除いた後なので、ページが埋まっていたか分からない）。
# slug の部分の旧コマンド '[.check_runs[] | select(.app.slug != "github-actions") | .app.slug] | .[]' との違いは、slug が文字列でないもの
# （`.app` が null の check-run）を落とすだけ。旧版はこれを文字列 null として出し、外部 App「null」として待たせ得た。
# check_runs が配列でない応答は `.check_runs[]` が失敗し、gh が非 0 で終わる（取得失敗として errs に数える）。
RS_APPS_JQ='(.check_runs | length), ([.check_runs[] | select(.app.slug != "github-actions") | .app.slug | select(type == "string")] | .[])'
# 対象リポジトリの open issue（PR を除く）の番号。旧コマンドと同一
RS_ISSUES_JQ='.[]|select(.pull_request==null)|.number'
# リポジトリのラベル名の一覧。旧コマンドと同一
RS_NAMES_JQ='.[].name'

# 検査の上限
RS_SLUG_MAX=64         # App slug の長さ（GitHub の slug は小文字英数字とハイフン）
RS_LABELS_MAX=10       # ホストの parseSkipLabels の上限と同じ
RS_LABEL_MAX_BYTES=200 # ラベル 1 件の長さ。ホストは 50 文字までで、日本語は 1 文字 3 バイト（LC_ALL=C のバイト数）に収まる余裕を持たせる
RS_NUMBER_MAX_LEN=9    # イシュー番号の桁数（is_uint と同じ。10 億未満）
# check-runs のページ送りの上限（1 ページ 100 件。Issue #809）。3 件の PR × 10 ページ = gh api 最大 30 回で、1 回の Bash 呼び出しの
# 時間に収まる範囲にとどめる。上限のページまで埋まっていたら（続きを読まずに止めたので）取りこぼしとして errs に数える
RS_CHECK_PAGES_MAX=10
RS_CHECK_PAGE_SIZE=100
# --numbers（ツリーの open ノードの番号のカンマ区切り。Issue #807）の長さの上限。Linux の 1 引数の上限（MAX_ARG_STRLEN 131,072 B）より
# 小さく取る。fetch-tree.sh の上限（約 4,500 ノード）× 9 桁 + カンマでも 45,000 B で収まり、超えるのは想定外の入力だけ
RS_NUMBERS_MAX_BYTES=100000

# App slug の形式（小文字英数字とハイフン・先頭は英数字・1〜64 文字）。slug は後でホストのプロンプトに入るので、形を限って返す。
rs_valid_slug() {
  case "$1" in
    '' | *[!a-z0-9-]* | -*) return 1 ;;
  esac
  [ "${#1}" -le "${RS_SLUG_MAX}" ]
}

# コミット sha の形式（小文字 16 進 40 桁または 64 桁）
rs_valid_sha() {
  case "$1" in
    '' | *[!0-9a-f]*) return 1 ;;
  esac
  [ "${#1}" -eq 40 ] || [ "${#1}" -eq 64 ]
}

# イシュー番号（先頭 0 なしの 1〜9 桁の正の整数）
rs_valid_number() {
  case "$1" in
    '' | *[!0-9]* | 0*) return 1 ;;
  esac
  [ "${#1}" -le "${RS_NUMBER_MAX_LEN}" ]
}

# --numbers の形式（Issue #807）: 番号（rs_valid_number）のカンマ区切りで、狭義の昇順（重複なし）・1 件以上・RS_NUMBERS_MAX_BYTES 以下。
# 並びを 1 通りに固定するので、inputSha256 に入れた文字列がそのまま集合を表す（ホストは昇順に並べて渡す）。
# 区切りの分解（tr）が失敗して空になった場合も、空行が番号の形でないので非ゼロ（fail-closed）。
rs_valid_numbers_csv() {
  local n prev=0
  case "$1" in
    '' | *[!0-9,]* | ,* | *, | *,,*) return 1 ;;
  esac
  [ "${#1}" -le "${RS_NUMBERS_MAX_BYTES}" ] || return 1
  while IFS= read -r n; do
    rs_valid_number "${n}" || return 1
    [ "${n}" -gt "${prev}" ] || return 1
    prev=${n}
  done <<RS_EOF
$(printf '%s\n' "$1" | tr ',' '\n')
RS_EOF
  return 0
}

# 番号の交わり（Issue #807）: $2（ラベルの open issue の番号。rs_sorted_numbers の出力 = 昇順のカンマ区切り。空可）のうち、
# $1（ツリーの open ノードの番号。rs_valid_numbers_csv 済み）にあるものだけを、$2 の順のままカンマ区切りで出す（空なら空行）。
# リポジトリ全体の数千件をそのまま出すと封筒の上限（exit 7）を超え、ツリー全体が待機になるため、ツリーと交わる番号だけを返す。
# 数千件を jq --arg に渡すと 1 引数の上限に当たり得るので、標準入力で渡す。jq の失敗は非ゼロ（呼び出し側がそのラベルを failed にする）。
rs_intersect_numbers() {
  [ -n "$2" ] || return 0
  printf '%s\n%s\n' "$1" "$2" | jq -R -s -r 'split("\n") | (.[0] | split(",") | reduce .[] as $k ({}; .[$k] = true)) as $s | [.[1] | split(",")[] | select($s[.] == true)] | join(",")' 2>/dev/null
}

# ラベル 1 件の形式。空・制御文字（改行を含む）・カンマ（labels= はカンマで AND になる）・長さ超過は不可。前後の空白もホストの検査に揃えて不可
rs_valid_label() {
  case "$1" in
    '' | *,* | *[[:cntrl:]]* | ' '* | *' ') return 1 ;;
  esac
  [ "${#1}" -le "${RS_LABEL_MAX_BYTES}" ]
}

# 入力の束縛 inputSha256: sha256("repo-scan\n" + mode + "\n" + repo + ["\n" + 欄 …])。末尾に改行を付けない。
# ホストの repoScanInputSha256 と同じ定義（ホストは ['repo-scan', mode, repo, ...rest].join('\n') を計算する）。
# $1 = モード、$2 = repo、$3... = 残りの欄。skip-labels は --numbers（ツリーの open ノードの番号。Issue #807）を先頭の固定位置に置き、
# 続けてラベル（順序込み。添字がラベルの意味を決める）。external-checks は残りの欄なし。stdout に 16 進 64 桁。ツールが無ければ非ゼロ。
rs_input_sha() {
  local mode=$1 repo=$2 text l
  shift 2
  text="repo-scan
${mode}
${repo}"
  for l in "$@"; do
    text="${text}
${l}"
  done
  printf '%s' "${text}" | so_sha256
}

# 複数行の slug の候補（$1）から、形式の正しいものを昇順・重複なしで RS_APPS（改行区切り）へ、捨てた件数（形式不正の行の数。同じ不正な値が重複していても行ごとに数える）を RS_DROPPED へ入れる。
# 件数の上限は設けない（3 件の PR × check-runs の 10 ページ × 100 件なので高々 3,000 件。重複を除いた apps が封筒の上限を超えれば
# exit 7 で、ホストは観測を採用しない。ホストは 100 件以内を検査する）。
# 並びは LC_ALL=C の sort -u で固定する（ロケールで並びが変わらない）。空行は数えない。sort の失敗（入力があるのに結果が空の場合を含む）は return 1（RS_APPS は空）。
rs_collect_apps() {
  local line valid=""
  RS_APPS=""
  RS_DROPPED=0
  while IFS= read -r line; do
    [ -n "${line}" ] || continue
    if rs_valid_slug "${line}"; then
      valid="${valid}${line}
"
    else
      RS_DROPPED=$((RS_DROPPED + 1))
    fi
  done <<RS_EOF
$1
RS_EOF
  if [ -n "${valid}" ]; then
    # sort が失敗したり、入力があるのに何も返さなかったりしたら、空の一覧（= 該当なし）として成功させず return 1。呼び出し側が取得失敗として数える
    RS_APPS=$(printf '%s' "${valid}" | LC_ALL=C sort -u 2>/dev/null) || { RS_APPS=""; return 1; }
    [ -n "${RS_APPS}" ] || return 1
  fi
  return 0
}

# 改行区切りの slug（形式検査済み）→ JSON の文字列配列（["a","b"]）。空なら []。エスケープが要る文字は rs_valid_slug が許さない。
rs_json_slugs() {
  local out="" line
  while IFS= read -r line; do
    [ -n "${line}" ] || continue
    out="${out}${out:+,}\"${line}\""
  done <<RS_EOF
$1
RS_EOF
  printf '[%s]' "${out}"
}

# 改行区切りの番号から、番号として正しいものだけを昇順・重複なしにしてカンマ区切りで出す（空なら何も出さない）。
# 1 行でも番号の形でなければ非ゼロ（gh の応答が想定外 = 取得失敗として扱う。黙って捨てて一覧を欠かさない）。sort・paste の失敗も非ゼロ。
rs_sorted_numbers() {
  local line valid="" sorted joined
  while IFS= read -r line; do
    [ -n "${line}" ] || continue
    rs_valid_number "${line}" || return 1
    valid="${valid}${line}
"
  done <<RS_EOF
$1
RS_EOF
  [ -n "${valid}" ] || return 0
  # パイプにすると sort が失敗しても paste が空文字で成功し、番号が空の成功として扱われる。段を分けて各段の終了コードを見る。
  # 入力が非空なのに結果が空になる場合も失敗（sort が何も返さずに 0 で終わる等）
  sorted=$(printf '%s' "${valid}" | LC_ALL=C sort -un 2>/dev/null) || return 1
  [ -n "${sorted}" ] || return 1
  joined=$(printf '%s\n' "${sorted}" | paste -sd, - 2>/dev/null) || return 1
  [ -n "${joined}" ] || return 1
  printf '%s\n' "${joined}"
}

# ラベル $1 がラベル名の一覧（改行区切り。$2）にあるか。ASCII の大文字小文字を区別しない完全一致（旧コマンドの grep -Fxiq の、ロケールに依存しない版）。
# 戻り値: 0 = ある、1 = ない、2 = 判定できない（jq の失敗）
rs_label_listed() {
  local rc=0
  printf '%s\n' "$2" | jq -R -s -e --arg l "$1" 'split("\n") | map(ascii_downcase) | index($l | ascii_downcase) != null' >/dev/null 2>&1 || rc=$?
  case "${rc}" in
    0) return 0 ;;
    1) return 1 ;;
    *) return 2 ;;
  esac
}

# external-checks の payload（キー昇順の正規形）。$1 = apps の JSON 配列、$2 = PR の件数、$3 = 取得失敗の件数、$4 = 捨てた slug の件数、$5 = inputSha256
rs_payload_external() {
  printf '{"apps":%s,"dropped":%d,"errs":%d,"inputSha256":"%s","prs":%d}' "$1" "$4" "$3" "$5" "$2"
}

# skip-labels の payload（キー昇順の正規形）。$1 = absent の JSON 配列、$2 = entries の JSON 配列、$3 = failed の JSON 配列、$4 = inputSha256
rs_payload_skip() {
  printf '{"absent":%s,"entries":%s,"failed":%s,"inputSha256":"%s"}' "$1" "$2" "$3" "$4"
}
