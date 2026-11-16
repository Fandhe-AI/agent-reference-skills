#!/usr/bin/env bash
# repo-scan.sh — Tree フェーズの読み取り専用の観測 2 つ（外部チェック App の観測・対象外ラベルの open issue の取得）
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立てる）:
#   bash repo-scan.sh --mode external-checks --nonce <nonce> --repo <owner/repo>
#   bash repo-scan.sh --mode skip-labels --nonce <nonce> --repo <owner/repo> --numbers <n,n,...> -- <ラベル> [<ラベル> ...]
#   --numbers は skip-labels だけの必須引数（Issue #807）: ツリーの open ノードの番号（昇順・重複なしのカンマ区切り）。出力はこの集合との交わりだけ。
#   --repo は必須（Issue #808）。省くと gh がカレントのリポジトリを走査し、ツリーと違うリポジトリを読み得るため使い方の誤り（exit 2）にする。
#   ホストは args.repo、無ければツリー取得の封筒の repo（fetch-tree.sh がルートの repository_url から解決）を渡す。
#
# 役割: プロンプトに埋め込まれていた gh + jq のコマンド（`detect:external-checks` はバックスラッシュ 5 か所の xargs + sh -c、
#       `plan:skip-labels` は単一引用符・`\n`・jq を含む for ループ）を、スクリプトへ切り出したもの。エージェントが転記する際に
#       バックスラッシュが半減する・`\n` が `n` になる・引用符が欠ける事故で結果が黙って変わる経路をなくす。内容は run-verified.sh の
#       ハッシュで固定され、エージェントが書き写すのは起動行と出力の封筒だけになる。
# 出力: どちらも成功時は封筒 {nonce, payload, sha256}（lib/signed-output.sh）の 1 行だけを標準出力へ出す。ホストが封筒を照合してから payload を使う。
#   external-checks   payload {"apps":[…],"dropped":N,"errs":N,"inputSha256":"…","prs":N}
#         - apps          直近 3 件の merged PR の head の check-runs にある GitHub Actions 以外の App の slug（昇順・重複なし・形式検査済み）
#         - prs           head の sha を得られた PR の件数（0〜3）
#         - errs          gh の失敗の件数（PR 一覧の失敗 1 件 + check-runs のページの取得失敗・上限 10 ページで読み切れなかった PR。個々の失敗は
#                         無視して部分結果を返す = 旧コマンドと同じ。check-runs は per_page=100 でページ送りする。Issue #809）
#         - dropped       形式が slug でないため捨てた値の件数
#         - inputSha256   sha256("repo-scan\nexternal-checks\n" + repo)
#   skip-labels       payload {"absent":[i,…],"entries":[{"i":i,"numbers":[…]},…],"failed":[i,…],"inputSha256":"…"}
#         - i             ラベルの 1 始まりの添字（引数の順。ホストは添字だけでラベルを引き、スクリプトが返した文字列は使わない）
#         - entries       取得できたラベルごとの open issue の番号のうち --numbers にあるもの（昇順・重複なし・PR を除く）。0 件でも行は出る。
#                         リポジトリ全体の番号は形式を全行検査してから交わりへ絞る（数千件のラベルでも出力はツリーの open ノード数で抑えられる）
#         - absent        リポジトリにラベルが存在しない添字（typo・未作成。ラベル一覧を取得できなかったときは判定しない）
#         - failed        取得に失敗した添字（entries に含めない。ホストが欠落として再取得し、それでも取れなければ全 open ノードを待たせる）
#         - inputSha256   sha256("repo-scan\nskip-labels\n" + repo + "\n" + numbers + 各ラベルを "\n" で連結)。ノード番号の集合とラベルの並びを束縛する（添字がラベルの意味を決める）
# 終了コード:
#   0  封筒を出力した（個々の gh の失敗は payload の errs / failed に出る）
#   2  使い方の誤り（引数の欠落・形式不正・未知の引数・モードに合わない引数）
#   3  gh・jq・sha256sum / shasum が無い、または封筒を作れない
#   7  出力が大きすぎる（封筒が 1 回の Bash 出力に収まらない。ホストは取得できなかったものとして扱う）
#   標準エラーには固定語彙と添字だけを出す（ラベル名・slug など外部由来の文字列は出さない）。
# 自衛: gh pr list と gh api の GET（REST）だけ。書き込み・マージ・設定変更は含まない。ファイルを作らない。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU）。

set -u
unset POSIXLY_CORRECT
LC_ALL=C
export LC_ALL

script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 2
# shellcheck source=lib/signed-output.sh
. "${script_dir}/lib/signed-output.sh" || exit 3
# shellcheck source=lib/base-merge-lib.sh
. "${script_dir}/lib/base-merge-lib.sh" || exit 3
# shellcheck source=lib/repo-scan-lib.sh
. "${script_dir}/lib/repo-scan-lib.sh" || exit 3

# 封筒 1 行の上限。Bash ツールの 1 回の出力（約 30000 文字）を超えると中央が欠けて静かに壊れるので、収まる範囲で止める
MAX_OUT_BYTES=24000

usage() {
  echo "使い方: repo-scan.sh --mode external-checks --nonce NONCE --repo OWNER/REPO | --mode skip-labels --nonce NONCE --repo OWNER/REPO --numbers N,N,... -- LABEL [LABEL ...]" >&2
  [ $# -eq 0 ] || echo "repo-scan: $1" >&2
  exit 2
}

mode=""
nonce=""
repo=""
have_repo=0
numbers=""
have_numbers=0
while [ $# -gt 0 ]; do
  case "$1" in
    --mode) [ $# -ge 2 ] || usage "--mode に値が無い"; [ -z "${mode}" ] || usage "--mode は 1 回だけ"; mode=$2; shift 2 ;;
    --nonce) [ $# -ge 2 ] || usage "--nonce に値が無い"; [ -z "${nonce}" ] || usage "--nonce は 1 回だけ"; nonce=$2; shift 2 ;;
    --repo) [ $# -ge 2 ] || usage "--repo に値が無い"; [ "${have_repo}" -eq 0 ] || usage "--repo は 1 回だけ"; repo=$2; have_repo=1; shift 2 ;;
    --numbers) [ $# -ge 2 ] || usage "--numbers に値が無い"; [ "${have_numbers}" -eq 0 ] || usage "--numbers は 1 回だけ"; numbers=$2; have_numbers=1; shift 2 ;;
    --) shift; break ;;
    *) usage "未知の引数" ;;
  esac
done
case "${mode}" in
  external-checks)
    [ $# -eq 0 ] || usage "external-checks はラベルを取らない"
    [ "${have_numbers}" -eq 0 ] || usage "external-checks は --numbers を取らない"
    ;;
  skip-labels)
    # ツリーの open ノードの番号（Issue #807）。形を検査してから使う（交わりの計算と入力の束縛に入る）
    [ "${have_numbers}" -eq 1 ] || usage "skip-labels は --numbers が必須"
    rs_valid_numbers_csv "${numbers}" || usage "--numbers の形式が不正（昇順・重複なしの番号のカンマ区切り・${RS_NUMBERS_MAX_BYTES} バイト以内）"
    [ $# -ge 1 ] && [ $# -le "${RS_LABELS_MAX}" ] || usage "ラベルは 1〜${RS_LABELS_MAX} 件"
    for l in "$@"; do rs_valid_label "${l}" || usage "ラベルの形式が不正（空・制御文字・カンマ・前後の空白・長さ超過）"; done
    ;;
  *) usage "--mode は external-checks か skip-labels" ;;
esac
so_valid_nonce "${nonce}" || usage "--nonce の形式が不正"
# --repo は必須で、空文字も不可（省略・空のまま gh がカレントのリポジトリへ倒れ、ツリーと別のリポジトリを走査するのを防ぐ。Issue #808）
[ "${have_repo}" -eq 1 ] || usage "--repo は必須"
valid_repo "${repo}" || usage "--repo は OWNER/REPO の形で指定する"

command -v gh >/dev/null 2>&1 || { echo "repo-scan: gh が無い" >&2; exit 3; }
command -v jq >/dev/null 2>&1 || { echo "repo-scan: jq が無い" >&2; exit 3; }
# skip-labels は --numbers を repo の次の固定位置に入れる（ノード番号の集合を束縛する。Issue #807）。external-checks はラベルも番号も無い
if [ "${mode}" = skip-labels ]; then
  input_sha=$(rs_input_sha "${mode}" "${repo}" "${numbers}" "$@")
else
  input_sha=$(rs_input_sha "${mode}" "${repo}")
fi || { echo "repo-scan: 入力のハッシュを計算できない（sha256sum / shasum が無い等）" >&2; exit 3; }

base="repos/${repo}"

# 封筒を出す。大きすぎれば exit 7
emit() {
  local env
  env=$(so_emit "${nonce}" "$1") || { echo "repo-scan: 出力封筒を作れなかった" >&2; exit 3; }
  [ "${#env}" -le "${MAX_OUT_BYTES}" ] || { echo "repo-scan: 出力が大きすぎる（${#env} バイト > ${MAX_OUT_BYTES}）" >&2; exit 7; }
  printf '%s\n' "${env}"
}

nl='
'
if [ "${mode}" = external-checks ]; then
  errs=0
  prs=0
  raw=""
  # 直近 3 件の merged PR の head。失敗は errs に数えて続行する（旧コマンドは失敗を空の出力として扱い、apps: [] へ倒れていた）
  shas=$(gh pr list -R "${repo}" --state merged --limit 3 --json headRefOid --jq '.[].headRefOid' 2>/dev/null </dev/null) || { errs=$((errs + 1)); shas=""; }
  seen=0
  while IFS= read -r s; do
    [ -n "${s}" ] || continue
    seen=$((seen + 1))
    [ "${seen}" -le 3 ] || break
    if ! rs_valid_sha "${s}"; then errs=$((errs + 1)); continue; fi
    prs=$((prs + 1))
    # check-runs は per_page=100 でページ送りする（Issue #809。以前は 1 ページ目だけで、101 件目以降にしか無い App を取りこぼした。
    # 旧コマンドは既定の 30 件）。--paginate は上限を置けないので page= を数えて読み、そのページが 100 件未満なら終わる。
    # ページの取得失敗・件数行の形の違い・上限（RS_CHECK_PAGES_MAX）のページまで埋まっていた場合は errs に数え、その PR の残りは読まない
    # （取りこぼしを黙らない）。読めたページの slug は使う（部分結果。旧コマンドの失敗の扱いと同じ向き）
    p=1
    while :; do
      if ! out=$(gh api "${base}/commits/${s}/check-runs?per_page=${RS_CHECK_PAGE_SIZE}&page=${p}" --jq "${RS_APPS_JQ}" 2>/dev/null </dev/null); then
        errs=$((errs + 1))
        break
      fi
      # 1 行目はこのページの check-run の件数（slug の候補に混ぜない）、2 行目以降が slug
      n=${out%%"${nl}"*}
      case "${out}" in *"${nl}"*) out=${out#*"${nl}"} ;; *) out="" ;; esac
      # 件数は 0 か正の整数（is_uint は 0 を通さない）
      if [ "${n}" != 0 ] && ! is_uint "${n}"; then
        errs=$((errs + 1))
        break
      fi
      raw="${raw}${out}${nl}"
      [ "${n}" -ge "${RS_CHECK_PAGE_SIZE}" ] || break
      if [ "${p}" -ge "${RS_CHECK_PAGES_MAX}" ]; then
        errs=$((errs + 1))
        break
      fi
      p=$((p + 1))
    done
  done <<RS_EOF
${shas}
RS_EOF
  # slug の整列（sort）の失敗は apps を空として成功させず、取得の失敗として errs に数える（部分結果。旧コマンドの失敗の扱いと同じ向き）
  rs_collect_apps "${raw}" || errs=$((errs + 1))
  emit "$(rs_payload_external "$(rs_json_slugs "${RS_APPS}")" "${prs}" "${errs}" "${RS_DROPPED}" "${input_sha}")"
  exit 0
fi

# skip-labels: ラベルごとにリポジトリ全体の open issue 番号を列挙する（labels= はカンマで AND になるためラベルごとに呼ぶ）。
# 全行の形式を検査してから（rs_sorted_numbers。番号でない行があればそのラベルは failed）、ツリーの open ノード（--numbers）との交わりへ絞る
# （Issue #807。数千件のラベルでも封筒の上限を超えて全 open ノードが待機になる経路を塞ぐ）。
# ラベル一覧は存在確認用で、取得できなければ absent を判定しない（旧コマンドの k=0）。
if names=$(gh api "${base}/labels?per_page=100" --paginate --jq "${RS_NAMES_JQ}" 2>/dev/null </dev/null); then names_ok=1; else names_ok=0; fi
i=0
entries=""
absent=""
failed=""
for l in "$@"; do
  i=$((i + 1))
  enc=$(jq -rn --arg l "${l}" '$l | @uri' 2>/dev/null) || enc=""
  out=""
  nums=""
  if [ -n "${enc}" ] \
    && out=$(gh api "${base}/issues?state=open&labels=${enc}&per_page=100" --paginate --jq "${RS_ISSUES_JQ}" 2>/dev/null </dev/null) \
    && nums=$(rs_sorted_numbers "${out}") \
    && nums=$(rs_intersect_numbers "${numbers}" "${nums}"); then
    entries="${entries}${entries:+,}{\"i\":${i},\"numbers\":[${nums}]}"
    if [ "${names_ok}" -eq 1 ]; then
      rc=0
      rs_label_listed "${l}" "${names}" || rc=$?
      if [ "${rc}" -eq 1 ]; then absent="${absent}${absent:+,}${i}"; fi
    fi
  else
    echo "FAILED ${i}" >&2
    failed="${failed}${failed:+,}${i}"
  fi
done
emit "$(rs_payload_skip "[${absent}]" "[${entries}]" "[${failed}]" "${input_sha}")"
exit 0
