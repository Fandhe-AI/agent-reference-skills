#!/usr/bin/env bash
# measure-residual-bytes.sh — 残置 worktree のディスク使用量（KiB）を測る読み取り専用スクリプト
#
# 使い方（通常は run-verified.sh 経由。ホストがコマンドを組み立てる）:
#   bash measure-residual-bytes.sh --nonce <nonce> <<'EOF'
#   /abs/path/one
#   /abs/path/two
#   EOF
#
# 入力: 標準入力に絶対パスを 1 行 1 件。パスはデータであり、シェルへ再評価させない（eval なし・変数は
#       すべてクォート・du には -- で区切って渡す）。空行も 1 件として数える（欠落を黙って捨てない）。
#       貼り付け崩れへの扱い: 行末の CR（CRLF 化）だけをハッシュ前に落とす。CR は許可文字集合に無く、正当なパスの
#       一部になり得ないので、落としても別のパスが同じハッシュになることはない。行末の空白は半角スペースが許可文字で
#       パスの一部になり得る（`/a/b ` と `/a/b` は別のパス）ため落とさない。代わりに標準エラーへ、空行・行末空白・CR
#       を含む行があったことを件数で出す（ホストの再測定ログと突き合わせて原因を特定できるように）。
# 出力: 標準出力に 1 行の封筒（lib/signed-output.sh）。payload は
#       {"count":N,"dup":N,"err":N,"inputSha256":"<64 桁 16 進>","kib":N,"missing":N}（キーは昇順）
#       - inputSha256 標準入力の内容（末尾の改行 1 つを除く）の SHA-256。ホストは自分が送ったパス列から
#                 同じ値を再計算して照合する。エージェントがコマンド中のパスを書き換えて実行すると
#                 別の値になり、件数が同じでも拒否される（封筒が入力を束縛する）
#       - count   処理した行数（ホストは送った件数と一致することを検証する）
#       - kib     実在したパスに du -sk を実行した第 1 列の合計（存在しないパスは 0 として加算）。同じ実体を指す別の綴り
#                 （/./ 混じり・/var と /private/var・シンボリックリンク経由）は物理パスに解決して 1 回だけ測る（count はそのまま入力の行数。
#                 重複行は kib・missing・err のどれにも足さず dup に数える）。物理パスに解決できないものは渡された綴りのまま測る。
#                 物理パスは末尾の改行も保って受け取る（名前が改行で終わるディレクトリが短い別のパスに化けない）。
#                 合計は 15 桁以内に限る（超える加算は err に数え、負値や桁あふれの値を封筒に入れない）
#       - dup     同じ実体の別の綴りとして測らなかった行数。ホストは 1 worktree あたりの平均の分母を count - missing - dup
#                 （kib に足された実体の数）にする。引かないと別の綴りの重複が分母に残って平均が下がり、空き容量の予約が
#                 過小になる
#       - missing 測定時点で存在しなかった（test -e が偽の）件数。並行 cleanup との競合で消えたパスを
#                 測定失敗にしない既存の契約。「0 KiB だった」とは区別して返す
#       - err     測定失敗の件数: du の非 0 終了・出力欠損・許可文字集合外のパス・相対パス・物理パスが許可文字集合を外れるもの
#                 （改行を含む等。シンボリックリンク経由で解決した先が許可外のときも測らず fail-closed）。
#                 取得失敗を kib=0 に畳み込まない。ホストは err が 0 のときだけ kib を採用する
# 許可文字集合（ホストの sanitizeWorktreePath と同じ）: 絶対パス、英数字・/・-・_・.・半角スペースのみ、
#       先頭は英数字の 1 文字目から始まり、.. を含まない。外れたパスは du に渡さず err に数える。
# 数値: du の第 1 列は数字だけ・15 桁以内のときだけ採用し、10 進として合算する（先頭ゼロを 8 進と読まない。
#       桁あふれや数字以外は err に数え、算術エラーで途中終了して err:0 のまま出力することがない）。1 件ごとの
#       桁数だけでなく合計も 15 桁以内に縛る（15 桁 × 多数件の加算で 64 ビットを超え、負値になるのを防ぐ）。
# 環境: du -sk は -k を明示するが、POSIXLY_CORRECT や BLOCKSIZE 系の環境変数に左右される実装に備えて
#       これらを外してから実行する（busybox の df は POSIXLY_CORRECT で -k を無視する。du は実測で影響なし）。
# 終了コード:
#   0  封筒を出力した（測定の成否は payload.err で判断する）
#   2  使い方の誤り（--nonce が無い・形式不正・未知の引数）。封筒は出力しない
#   3  封筒を作れなかった（sha256sum / shasum が無い、標準入力を読めない等）。封筒は出力しない
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU）。du -sk は両方にあり、paste・bc・GNU 専用
#       フラグ・mapfile は使わない。集計はシェルの整数演算。
# 副作用: なし（一時ファイルも作らない）。

set -u
LC_ALL=C
export LC_ALL
unset POSIXLY_CORRECT BLOCKSIZE BLOCK_SIZE DU_BLOCK_SIZE

script_dir=$(cd "$(dirname "$0")" && pwd -P) || exit 2
# shellcheck source=lib/signed-output.sh
. "${script_dir}/lib/signed-output.sh" || exit 3

nonce=""
while [ $# -gt 0 ]; do
  case "$1" in
    --nonce)
      [ $# -ge 2 ] || { echo "使い方: measure-residual-bytes.sh --nonce NONCE（パスは標準入力）" >&2; exit 2; }
      nonce=$2
      shift 2
      ;;
    *)
      echo "使い方: measure-residual-bytes.sh --nonce NONCE（パスは標準入力。未知の引数: $1）" >&2
      exit 2
      ;;
  esac
done
so_valid_nonce "${nonce}" || { echo "measure-residual-bytes: --nonce は小文字英数字 1〜64 文字で指定する" >&2; exit 2; }

# 標準入力を丸ごと読み（末尾の改行 1 つだけを除く）、その SHA-256 を封筒に入れる。入力を変数に保持して
# 同じバイト列を「ハッシュ」と「1 行ずつの処理」の両方に使う。コマンド置換は末尾の改行を落とすので x を付けて守る
nl='
'
# cat の失敗を終了コードに反映する（`cat; printf x` だと最後の printf の成功が代入の終了コードになり、読み取り失敗が
# count:0, err:0 の封筒に化ける）
input=$(cat && printf x) || { echo "measure-residual-bytes: 標準入力を読めなかった" >&2; exit 3; }
input=${input%x}
# CR（貼り付けで CRLF 化した行末）はハッシュ前に落とす。ホストが送るパスは許可文字集合内で CR を含まないので、落としても
# ホストの計算と食い違わず、別のパスが同じハッシュになることもない
cr=$(printf '\r')
case "${input}" in
  *"${cr}"*)
    crcount=$(printf '%s' "${input}" | tr -cd '\r' | wc -c | tr -d ' ')
    echo "measure-residual-bytes: 入力に CR が ${crcount} 個あった（貼り付けで CRLF になった疑い。CR を落として処理する）" >&2
    input=$(printf '%s' "${input}" | tr -d '\r'; printf x)
    input=${input%x}
    ;;
esac
case "${input}" in
  *"${nl}") input=${input%"${nl}"} ;;
esac
input_sha=$(printf '%s' "${input}" | so_sha256) || {
  echo "measure-residual-bytes: 入力のハッシュを計算できなかった（sha256sum / shasum が無い等）" >&2
  exit 3
}

# 物理パスの出力の末尾に付ける番兵 x を、受け取り側が外す。コマンド置換は末尾の改行をすべて落とすので、名前が改行で終わる
# ディレクトリの物理パスが短い別のパスに化ける（du がその兄弟を測る・seen に入って本物の兄弟が dup 扱いになる）のを防ぐ。
# 実在するパス（$1。絶対・許可文字のみ・存在確認済み）の物理パスを「<物理パス>x」の形で出力する（改行を付けない）。
# ディレクトリは cd -P で、それ以外は親を cd -P で解決して末尾の名前を足す。
# 解決できなければ非 0（呼び出し側が渡された綴りのまま測る）。cd はサブシェル内で行い、CDPATH は外す
phys_dir() {
  (unset CDPATH; cd -P -- "$1" 2>/dev/null && pwd -P && printf x)
}
phys_path() {
  local d b o
  if [ -d "$1" ]; then
    o=$(phys_dir "$1") || return 1
    o=${o%x}
    printf '%sx' "${o%"${nl}"}"
    return 0
  fi
  d=${1%/*}
  b=${1##*/}
  [ -n "${d}" ] || d=/
  o=$(phys_dir "${d}") || return 1
  o=${o%x}
  d=${o%"${nl}"}
  if [ "${d}" = / ]; then printf '/%sx' "${b}"; else printf '%s/%sx' "${d}" "${b}"; fi
}

# 許可文字集合の検査（入力のパスと物理パスで同じ条件）。通れば 0
path_allowed() {
  case "$1" in
    '' | / | /[!A-Za-z0-9]* | *..* | *[!A-Za-z0-9/_.${sp}-]*) return 1 ;;
    /*) return 0 ;;
    *) return 1 ;;
  esac
}

# 物理パス $1 が測定済みの一覧 seen にあるか。seen は先頭と各要素の後ろに改行を置いた形で、文字列の包含で比べる（パターンではない:
# $1 はダブルクォート内なので * ? [ を含む物理パスが別のパスに一致して測定が飛ばされ、過少に数えることはない）。リダイレクトした
# ループの中から return しない。一覧に入る物理パスは許可文字集合内（改行を含まない）に限る
seen_has() {
  case "${seen}" in
    *"${nl}${1}${nl}"*) return 0 ;;
  esac
  return 1
}

sp=' '
seen=${nl}
total=0
missing=0
dup=0
err=0
count=0
blank=0
trail=0
# 空入力は 0 件（here-string は空でも 1 行を渡すので分けて扱う）
[ -n "${input}" ] && while IFS= read -r p || [ -n "${p}" ]; do
  count=$((count + 1))
  case "${p}" in
    '') blank=$((blank + 1)) ;;
    *" ") trail=$((trail + 1)) ;;
  esac
  if ! path_allowed "${p}"; then
    err=$((err + 1))
    continue
  fi
  if [ ! -e "${p}" ]; then
    missing=$((missing + 1))
    continue
  fi
  # 同じ実体を別の綴り（/./ 混じり・/var と /private/var・シンボリックリンク経由）で 2 回渡されても 1 回だけ数える。物理パスに解決できたものを
  # 測定の対象にし、解決できないときは渡された綴りのまま測る（重複を除けないだけで、過少には振れない）。重複した行は count には数え、kib・missing・err には足さない
  real=$(phys_path "${p}") && real=${real%x} && [ -n "${real}" ] || real=${p}
  # 物理パスが許可文字集合を外れる（改行を含む等）ときは測らず err に数える（fail-closed）。du に渡す前・seen に入れる前に弾く
  if ! path_allowed "${real}"; then
    err=$((err + 1))
    continue
  fi
  if seen_has "${real}"; then
    dup=$((dup + 1))
    continue
  fi
  seen="${seen}${real}${nl}"
  # du の終了状態は if 条件で検査する（パイプ直結だと後段の終了状態に化けて失敗が消える）
  if duout=$(du -sk -- "${real}" 2>/dev/null); then
    sz=${duout%%[[:space:]]*}
    case "${sz}" in
      '' | *[!0-9]*) err=$((err + 1)) ;;
      *)
        if [ "${#sz}" -gt 15 ] || [ $((total + 10#${sz})) -gt 999999999999999 ]; then
          err=$((err + 1))
        else
          total=$((total + 10#${sz}))
        fi
        ;;
    esac
  else
    err=$((err + 1))
  fi
done <<< "${input}"

if [ $((blank + trail)) -gt 0 ]; then
  echo "measure-residual-bytes: 空行 ${blank} 件・行末が空白の行 ${trail} 件があった（貼り付け崩れの疑い。行末の空白は許可文字のため落とさず、そのまま別のパスとして処理した）" >&2
fi

so_emit "${nonce}" "$(printf '{"count":%d,"dup":%d,"err":%d,"inputSha256":"%s","kib":%d,"missing":%d}' "${count}" "${dup}" "${err}" "${input_sha}" "${total}" "${missing}")" || {
  echo "measure-residual-bytes: 出力封筒を作れなかった（sha256sum / shasum が無い等）" >&2
  exit 3
}
