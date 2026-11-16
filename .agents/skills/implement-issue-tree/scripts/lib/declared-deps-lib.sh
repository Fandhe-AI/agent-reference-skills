#!/usr/bin/env bash
# declared-deps-lib.sh — declared-deps.sh の jq フィルタと入力検証だけを持つ定義（source 専用）
#
# 呼び出し元: declared-deps.sh（Issue #603 の切り出しの 1 つ。計画 C の Phase P）。
# 役割: 1) イシュー本文から依存宣言を抽出する jq フィルタ本体（dd_filter）、2) gh api rate_limit の jq（DD_RATE_LIMIT_JQ）、
#       3) 番号の並び・リポジトリ・兄弟のタスク ID の表の検証の関数を 1 か所に持つ。
# なぜスクリプトに置くか: フィルタは以前、エージェントのプロンプトへ 3.9〜4.9 KB の文字列として埋め込まれ、エージェントが
#       シェルの単一引用符へ転記して実行していた。転記でバックスラッシュが半減する事故が起きた（`\\b` が `\b` になる。jq では
#       エラーにならずバックスペースとして通り、単語境界の判定が黙って false になって deps に誤った番号が混ざる。sig は誤った結果と
#       整合するのでホストの照合も通る）。スクリプトに置けば run-verified.sh のハッシュで内容が固定され、エージェントが転記するのは
#       短い起動行だけになる。
# エスケープの階層: フィルタは引用符つきヒアドキュメント（<<'JQ'）で置く。シェルは本文を一切解釈しないので、ここに書いたバックスラッシュは
#       そのまま jq（gojq。gh api --jq）の文字列リテラルの入力になる。したがって jq の文字列の `\\b` は正規表現の `\b`（単語境界）、
#       `\\x27` は正規表現の単一引用符、`\\x60` はバッククォート、`\t` はタブを表す。JavaScript の String.raw 時代と文字は同一で、
#       tests/declared-deps-script.test.mjs が切り出し前（origin/main）の実行時の文字列との文字単位の一致を固定する。
#       フィルタは単一引用符もバッククォートも \uXXXX も含まない（Claude Code がツール入力中の \uXXXX を実行前に文字へ戻す事故があった。
#       Issue #716）。正規表現の特殊文字や記号はここで書き換えず、dd_filter の出力で確かめる。
# フィルタの構造: 兄弟のタスク ID の表（ホストが作る {"f":{…},"n":{…}}。Issue #657）は、フィルタの途中に JSON のリテラルとして
#       埋め込む（gh api --jq は --argjson を持たないため）。リテラルは dd_valid_table が許可した文字だけ（英大文字・数字・- ・
#       引用符・コロン・カンマ・括弧）なので、単一引用符・バックスラッシュ・バッククォートは入らない。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は stdout と return 値で返す。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。連想配列・mapfile・GNU 専用フラグを使わない。
#       bash 3.2 は $( ... ) の中のヒアドキュメントに引用符・括弧があると構文を誤読するので、read -d '' で読む。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# フィルタの前半（表のリテラルの直前まで）。1 行が 1 つの def で、行を半角スペースでつないだものが jq の入力になる。
IFS= read -r -d '' DD_JQ_HEAD <<'JQ' || true
{number: .number, deps: (def refs: [scan("#([0-9]+)") | .[0] | tonumber];
def run: "(#[0-9]+(?:(?:[ \t,、/]|and|および|及び)+#[0-9]+)*)";
def inline: gsub("(?i)(?:\\b(?:not|no longer|never)\\b|n\\x27t)(?:[ \t]+[A-Za-z]+)?[ \t]+(?:depends on|blocked by)[ \t]*:?[ \t]*" + run; "") | [scan("(?i)(?:depends on|blocked by)[ \t]*:?[ \t]*" + run) | .[0] | refs[]];
def neg: test("(?i)関連|参考|参照|任意|なし|不要|\\b(related|see also|optional|none|no longer|not|never|unnecessary)\\b|n\\x27t");
def fenceof: (capture("^[ ]{0,3}(?<f>\\x60{3,}|~{3,})") | .f) // null;
def stripcode: . as $s | [match("\\x60+"; "g") | {o: .offset, l: .length}] as $r
| def go($i): if $i >= ($r | length) then []
else (first(range($i + 1; $r | length) | select($r[.].l == $r[$i].l)) // null) as $j
| if $j == null then go($i + 1) else [[$r[$i].o, $r[$j].o + $r[$j].l]] + go($j + 1) end end;
go(0) as $c | reduce ($c | reverse[]) as $x ($s; .[:$x[0]] + ($s[$x[0]:$x[1]] | gsub("[^\n]"; "")) + .[$x[1]:]);
def linehead: [scan("^[ \t]*(?:(?:[-*+]|[0-9]+[.)])[ \t]+)?(?:\\[[ xX]\\][ \t]+)?" + run) | .[0] | refs[]];
def idend: "(?:[^A-Za-z0-9_-]|$)";
def sibpat($id): "(?:前の?工程|前段)[ \t]*[（(][ \t]*" + $id + "[ \t]*[）),、]"
+ "|(?:^|[^A-Za-z0-9_-])" + $id + "[ \t]*[）)]?[ \t]*(?:の(?:結果|成果物|成果|実装|出力|内容)?を(?:踏まえ|前提|受け)|を(?:踏まえ|前提)|の(?:完了)?後|(?:完了|マージ)後|が(?:完了|マージ)(?:して|した|され))"
+ "|(?i:after|depends on|blocked by|builds on|requires)[ \t]+" + $id + idend;
def sibhead($id): "^[ \t]*(?:(?:[-*+]|[0-9]+[.)])[ \t]+)?(?:\\[[ xX]\\][ \t]+)?" + $id + idend;
def prevword: test("前の?工程(?:[ \t]*$|[ \t]*[^ \t（(])");
def sibrefs($me; $insec; $prev): . as $t | if ($me.s | length) == 0 or ($t | neg) then [] else
[$me.s[] | select(. as $e | $t | test(sibpat($e[0]) + (if $insec then "|" + sibhead($e[0]) else "" end))) | .[1]] as $hit
| $hit + (if $prev and $me.p > 0 and ($t | prevword) then [$me.p] else [] end) end;
def extract($t): (if .in and ($t | neg | not) then .d += ($t | linehead) else . end) | .d += ($t | inline) | .in as $insec | .me as $me | .d += ($t | sibrefs($me; $insec; true));
def flush: if (.buf | length) == 0 then . else (.buf | join("\n") | stripcode | split("\n")) as $ls | reduce $ls[] as $t (.; extract($t)) | .buf = [] end;
.number as $self |
JQ
# フィルタの後半（表のリテラルの直後から）。最後の行は sig を計算する式（{number, deps} に .sig を足す。
# 各項を法 1000000007 で丸め、jq（倍精度）・gojq・JavaScript の整数演算が一致する範囲に収める。ホストが declaredDepsChecksum で照合する）。
IFS= read -r -d '' DD_JQ_TAIL <<'JQ' || true
as $T | ($T.n[($self | tostring)] // [null, 0]) as $nn
| {s: [($T.f[$nn[0] // ""] // [])[] | select(.[1] != $self)], p: ($nn[1] // 0)} as $me |
(.body // "") | split("\n")
| (reduce .[] as $raw ({in: false, fence: null, buf: [], d: [], me: $me};
($raw | sub("\r$"; "")) as $l
| ($l | fenceof) as $f
| if .fence != null then
(if $f != null and ($f[0:1] == .fence[0:1]) and (($f | length) >= (.fence | length)) and ($l | test("^[ ]{0,3}[\\x60~]+[ \t]*$")) then .fence = null else . end)
elif $f != null then flush | .fence = $f
elif ($l | test("^[ ]{0,3}>")) or ($l | test("^[ \t]*$")) then flush
elif ($l | test("^[ ]{0,3}#{1,6}([ \t]|$)")) then flush
| .in = ($l | stripcode | test("^[ ]{0,3}#{1,6}[ \t]*(依存|依存関係|前提|Depends on|Dependencies|Blocked by)[ \t]*:?[ \t]*$"; "i"))
| .d += ($l | stripcode | inline)
| .me as $me | .d += ($l | stripcode | sibrefs($me; false; false))
elif ($l | test("^[ \t]*(?:[-*+]|[0-9]+[.)])[ \t]")) then flush | .buf = [$l]
else .buf += [$l]
end) | flush)
| .d | map(select(. > 0)) | unique)} |
.sig = ((((.number * 7919) % 1000000007) + ([.deps | to_entries[] | (((.key + 1) * .value * 104729) % 1000000007)] | add // 0)) % 1000000007)
JQ
# 改行を半角スペースに置き換える（行末の改行 1 つは取り除く）
DD_JQ_HEAD=${DD_JQ_HEAD//$'\n'/ }
DD_JQ_HEAD=${DD_JQ_HEAD% }
DD_JQ_TAIL=${DD_JQ_TAIL//$'\n'/ }
DD_JQ_TAIL=${DD_JQ_TAIL% }

# gh api rate_limit の core 枠を読む jq。レート制限の復帰時刻と待ち秒数だけを出す（単一引用符・バックスラッシュを含まない）。
# shellcheck disable=SC2034  # source 元（declared-deps.sh）が使う
DD_RATE_LIMIT_JQ='.resources.core | {remaining, resetAt: (.reset | todate), waitSeconds: ([.reset - now, 0] | max | ceil)}'

# 兄弟のタスク ID の表がないときの既定
# shellcheck disable=SC2034  # source 元が使う
DD_EMPTY_TABLE='{"f":{},"n":{}}'
# 表の長さの上限（Linux の 1 引数の上限 128 KiB に収める）
DD_TABLE_MAX=120000
# 1 回に依頼できる番号の数の上限（ホストの DECLARED_DEPS_CHUNK_SIZE は 40）
DD_NUMBERS_MAX=100

# 入力の束縛（Issue #603 の監査 M-1）: sha256("declared-deps\n" + numbers + "\n" + repo + "\n" + table)。末尾に改行を付けない。
# $1 = --numbers の値、$2 = --repo の値（省いたときは空文字）、$3 = --table の値（省いたときは空文字）。いずれも検証済みの値だけを渡すこと
# （番号は数字とカンマ・リポジトリは英数字と . _ - /・表は dd_valid_table が許した文字だけなので、区切りの改行は値に現れず境界があいまいにならない）。
# ホストの declaredDepsInputSha256 と同じ定義。so_sha256 は lib/signed-output.sh（呼び出し元が先に source する）。
dd_input_sha() {
  printf 'declared-deps\n%s\n%s\n%s' "$1" "$2" "$3" | so_sha256
}

# $1 = 兄弟のタスク ID の表（JSON）を埋め込んだ完全なフィルタを stdout へ（改行なし）。表は dd_valid_table を通したものだけを渡すこと。
dd_filter() {
  printf '%s %s %s' "${DD_JQ_HEAD}" "$1" "${DD_JQ_TAIL}"
}

# 番号のカンマ区切り（正の整数・重複なし・1〜DD_NUMBERS_MAX 個・各 10 桁以内・先頭ゼロなし）。
dd_valid_numbers() {
  local csv=$1 n count=0 seen=","
  case "${csv}" in
    '' | *[!0-9,]* | ,* | *, | *,,*) return 1 ;;
  esac
  local IFS=,
  # shellcheck disable=SC2086  # 数字とカンマだけと確かめたあとの意図した単語分割
  set -- ${csv}
  for n in "$@"; do
    case "${n}" in
      0* | '') return 1 ;;
    esac
    [ "${#n}" -le 10 ] || return 1
    case "${seen}" in *",${n},"*) return 1 ;; esac
    seen="${seen}${n},"
    count=$((count + 1))
  done
  [ "${count}" -ge 1 ] && [ "${count}" -le "${DD_NUMBERS_MAX}" ]
}

# OWNER/REPO の形式（ホストの REPO_SLUG_RE と同じ厳格さ）。owner は英数字とハイフン・先頭末尾ハイフン不可・1〜39 文字、
# repo は先頭がハイフン以外の英数字 . _ で . と .. だけは不可・1〜100 文字
dd_valid_repo() {
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

# 兄弟のタスク ID の表（ホストの siblingTaskTableFor が作る形）。
#   {"f":{"<親番号>":[["<ID>",<番号>],…],…},"n":{"<番号>":["<親番号>",<前の工程の番号>],…}}
# ID は英大文字で始まり英大文字・数字の並びに「-数字」が 1 つ以上続く形。この文法に一致するものだけを受理する（フィルタへ埋め込める
# 文字は、これで英大文字・数字・- ・引用符・コロン・カンマ・括弧・波括弧に限られる）。空白・改行・エスケープは許さない。
dd_valid_table() {
  local t=$1 id entry list fam node re
  [ -n "${t}" ] && [ "${#t}" -le "${DD_TABLE_MAX}" ] || return 1
  id='[A-Z][A-Z0-9]*(-[0-9]+)+'
  entry='[[]"'"${id}"'",[0-9]+[]]'
  list='[[]'"${entry}"'(,'"${entry}"')*[]]'
  fam='"[0-9]+":'"${list}"
  node='"[0-9]+":[[]"[0-9]+",[0-9]+[]]'
  re='^[{]"f":[{]('"${fam}"'(,'"${fam}"')*)?[}],"n":[{]('"${node}"'(,'"${node}"')*)?[}][}]$'
  [[ ${t} =~ ${re} ]]
}
