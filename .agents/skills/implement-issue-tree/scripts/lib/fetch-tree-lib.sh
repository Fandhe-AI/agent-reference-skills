#!/usr/bin/env bash
# fetch-tree-lib.sh — fetch-tree.sh の判定・ダイジェストだけを持つ関数（source 専用）
#
# 呼び出し元: fetch-tree.sh（Issue #668）。ツリー取得の出力（ノードごとの TSV 行）から検査値を作る定義の置き場。
#             ホスト（implement-issue-tree.src.js の treeRowDigestLine / treeNodesDigest）は同じ定義を JavaScript で
#             計算し直して照合する。定義を変えるときは両方と tests/fetch-tree-unit.test.mjs の表を同時に直す。
# 役割: 0) 構造 5 欄だけのダイジェスト structSha256（Issue #687）、1) title の表示形（制御文字を半角スペースへ置換）、2) 行ダイジェスト、3) ノード全体のダイジェスト nodesSha256、
#       4) 入力の束縛 inputSha256、5) 第 7 欄 optinTests（opt-in テスト宣言）の抽出・正規化の jq 定義と optinSha256 の定義を 1 箇所に持つ。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は stdout と return 値で返す。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
#       signed-output.sh（so_sha256）を先に source しておくこと。
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。連想配列・mapfile・GNU 専用フラグを使わない。
#
# ページ分割（Issue #673）: ft_page_count / ft_page_slice / ft_page_dir_name_ok / ft_is_page_dir を追加した。
#       大きなツリーの TSV を 1 回の Bash 出力に収まる単位（ページ）に分け、エージェントが 1 ページずつ読めるようにする。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

# title の表示形を作る jq の定義。制御文字（U+0000〜U+001F・U+007F）を半角スペース 1 つに置換する。
# TSV の列区切り（タブ）と行区切り（改行）を title が壊さないための正規化で、NUL を正規表現に書かないよう
# explode / implode で行う。fetch-tree.sh の jq フィルタもこの定義を埋め込んで使う（実装を 1 つにする）。
FT_JQ_DISP='def disp: explode | map(if . < 32 or . == 127 then 32 else . end) | implode;'

# $1 の title を表示形にして stdout へ（改行を付けない）。
ft_title_display() {
  printf '%s' "$1" | jq -Rrj -s "${FT_JQ_DISP} disp"
}

# 第 7 欄 optinTests（opt-in テスト宣言）の抽出・正規化の jq の定義。fetch-tree.sh の jq フィルタがこの定義を埋め込んで使う（実装を 1 つにする）。
# 抽出: イシュー本文の `<!-- optin-tests: <値> -->` の値（従来 Tree エージェントが gh issue view --jq で手で実行していた scan と同じ意味: 値の前後の空白とタブを除いた文字列。
#       コードフェンス内の宣言も拾う）。正規表現は `<!--[ \t]*optin-tests:([^\n]*?)-->` で、前後の空白は正規表現ではなく optin_trim が落とす
#       （`[ \t]*` を値の前後に置いた形は Oniguruma でバックトラックが爆発し、空白の長い行で jq が retry-limit で異常終了する・`sub("[ \t]+$"; "")` も二次時間に戻り得るため。
#       optin_trim は explode した配列を先頭と末尾から 1 回ずつ走査する線形の処理）。
#       値の空白は ASCII の空白（32）とタブ（9）だけ。末尾の NBSP・全角空白は旧経路ではホストの trim() で落ちて一致したが、この経路では `?` になり invalid（blocked）になる。open ノードだけが対象で、closed のノードと宣言の無いノードは `[]`（空欄にしない）。
# 値ごとの正規化: タブは空白 1 つ、許可文字 [A-Za-z0-9 _./:=@+,-]（ホストの OPTIN_TEST_COMMAND_RE の文字集合）に無い文字は 1 文字ずつ `?` にする。
#       `?` は許可形式に無いので承認一覧と一致せず、必ず invalid（blocked）になる。結果は ASCII の印字可能文字だけで、JSON のエスケープが出ない
#       （jq の tojson と JS の JSON.stringify が同じバイト列になる）。
# 上限（fail-closed）: スキーマの上限（1 値 300 文字・20 件）を超えて schema エラーになる・黙って切り詰めて valid になることを避ける。
#       1 値が 300 文字を超えるときは先頭 299 文字 + `?`（ホストの許可形式は 200 文字までなので必ず invalid）。
#       件数が 20 を超えるときは先頭 19 件 + `?` の 1 件（`?` は invalid なので blocked）。件数 11〜20 はホストの parseOptinTestDeclarations が OPTIN_TESTS_MAX（10）超として invalid にする。
# 閉じない宣言（Issue #802）: 開始 `<!--[ \t]*optin-tests:` があり、同じ行（`\n` 区切り）でその後ろに `-->` が無いときは、宣言の値を出さず `["?"]` にする
#       （書き損じを「宣言なし」にして記録ゲートを静かに外さない fail-closed。本文中の構文の説明でもノードは blocked になる）。判定は「行の最後の `-->` より後ろに開始がある」で、
#       `-->` は開始の文字と重ならないので、最後の `-->` の手前にある開始はすべて閉じている。正規表現を使わず split / explode だけの線形の処理（optin_open）。
#       閉じない開始があると scan は行末まで探して二次時間になるため、scan を走らせる前に判定して飛ばす。
# 1 ノードの合計（Issue #803）: 上の 2 つの上限を当てた後の値の文字数の合計が 1,000 を超えるときは、配列全体を `["?"]` に置き換える（黙って切らない・invalid = blocked）。
#       これで第 7 欄は 1 ノード最大 1,061 バイト（値 1,000 + 引用符 40 + カンマ 19 + 括弧 2）になり、取得出力のページ数（30 ページの上限）を宣言で膨らませない。
FT_JQ_OPTIN='def optin_norm: explode | map(if . == 9 then 32 elif (. >= 48 and . <= 57) or (. >= 65 and . <= 90) or (. >= 97 and . <= 122) or . == 32 or . == 95 or . == 46 or . == 47 or . == 58 or . == 61 or . == 64 or . == 43 or . == 44 or . == 45 then . else 63 end) | implode;
def optin_trim: explode as $c | ($c | length) as $n | (first(range(0; $n) | select($c[.] != 32 and $c[.] != 9)) // $n) as $s | (first(range($n - 1; $s - 1; -1) | select($c[.] != 32 and $c[.] != 9)) // ($s - 1)) as $e | $c[$s:$e + 1] | implode;
def optin_cap: if length > 300 then .[:299] + "?" else . end;
def optin_head: explode as $c | ($c | length) as $n | (first(range(0; $n) | select($c[.] != 32 and $c[.] != 9)) // $n) as $s | $c[$s:$s + 12] == [111,112,116,105,110,45,116,101,115,116,115,58];
def optin_open: split("\n") | any(.[]; ((split("-->") | last) // "") | split("<!--") | .[1:] | any(.[]; optin_head));
def optin_total: if (map(length) | add // 0) > 1000 then ["?"] else . end;
def optin_list: if .state != "open" then [] elif (.body // "") | optin_open then ["?"] else [(.body // "") | scan("<!--[ \t]*optin-tests:([^\n]*?)-->") | .[0] | optin_trim | optin_norm | optin_cap] | if length > 20 then .[:19] + ["?"] else . end | optin_total end;'

# state は open / closed のみ。
ft_valid_state() {
  case "$1" in
    open | closed) return 0 ;;
  esac
  return 1
}

# 0 以上の整数（先頭ゼロは拒否。9 桁以内）。
ft_is_count() {
  case "$1" in
    '' | *[!0-9]*) return 1 ;;
    0) return 0 ;;
    0*) return 1 ;;
  esac
  [ "${#1}" -le 9 ]
}

# 取得した子の件数がそのノードの subIssuesTotal と一致するか。$1 = 期待、$2 = 実際。
ft_count_ok() {
  ft_is_count "$1" && ft_is_count "$2" && [ "$1" = "$2" ]
}

# 行ダイジェストの行テキスト: number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB sha256hex(title)。
# $1..$5 = 各欄、$6 = title の表示形。stdout へ（改行なし）。sha256 を計算できなければ非ゼロ。
ft_row_digest_line() {
  local tsha tab
  tab=$(printf '\t')
  tsha=$(printf '%s' "$6" | so_sha256) || return 1
  printf '%s%s%s%s%s%s%s%s%s%s%s' "$1" "${tab}" "$2" "${tab}" "$3" "${tab}" "$4" "${tab}" "$5" "${tab}" "${tsha}"
}

# 標準入力の TSV（number TAB parent TAB siblingIndex TAB state TAB subIssuesTotal TAB title [TAB optinTests]）の nodesSha256 を stdout へ。
# 行ダイジェストの行を number の昇順（数値）に並べ、改行で連結（末尾改行なし）して SHA-256 を取る。並び順は検査対象にしない。第 7 欄 optinTests は
# この値に入れない（ft_optin_digest が別に束縛する）。欄の分割はタブを US（0x1f）へ変えてから行う: タブは IFS の空白文字で連続が 1 つに畳まれ、
# 空の title が詰められて 7 欄の分割がずれるため（title は表示形で制御文字を含まないので US は現れない）。
ft_nodes_digest() {
  local tab us num parent sib state total title optin lines line sorted tsv_us
  tab=$(printf '\t')
  us=$(printf '\037')
  lines=""
  tsv_us=$(tr '\t' '\037') || return 1
  while IFS="${us}" read -r num parent sib state total title optin || [ -n "${num}" ]; do
    [ -n "${num}" ] || continue
    line=$(ft_row_digest_line "${num}" "${parent}" "${sib}" "${state}" "${total}" "${title}") || return 1
    lines="${lines}${line}
"
  done <<<"${tsv_us}"
  [ -n "${lines}" ] || return 1
  sorted=$(printf '%s' "${lines}" | LC_ALL=C sort -t "${tab}" -k1,1n) || return 1
  printf '%s' "${sorted}" | so_sha256
}

# 標準入力の TSV の structSha256（Issue #687）を stdout へ。title を除く 5 欄（number / parent / siblingIndex / state /
# subIssuesTotal）だけの行を number の昇順（数値）に並べ、改行で連結（末尾改行なし）して SHA-256 を取る。
# title の書き写し誤りと構造の誤りを分けて扱うための検査値（ホストの treeStructDigest と同じ定義）。
ft_struct_digest() {
  local tab us num parent sib state total title optin lines sorted tsv_us
  tab=$(printf '\t')
  us=$(printf '\037')
  lines=""
  tsv_us=$(tr '\t' '\037') || return 1
  while IFS="${us}" read -r num parent sib state total title optin || [ -n "${num}" ]; do
    [ -n "${num}" ] || continue
    lines="${lines}${num}${tab}${parent}${tab}${sib}${tab}${state}${tab}${total}
"
  done <<<"${tsv_us}"
  [ -n "${lines}" ] || return 1
  sorted=$(printf '%s' "${lines}" | LC_ALL=C sort -t "${tab}" -k1,1n) || return 1
  printf '%s' "${sorted}" | so_sha256
}

# 標準入力の TSV の optinSha256 を stdout へ。各行の「number TAB 第 7 欄（optinTests の compact JSON）」を number の昇順（数値）に並べ、
# 改行で連結（末尾改行なし）して SHA-256 を取る（ホストの treeOptinDigest と同じ定義。JS 側は `${number}\t${JSON.stringify(optinTests)}`）。
# 第 7 欄は FT_JQ_OPTIN が作る ASCII の JSON なので、このまま比較できる。本文由来の値を束縛する検査値で、title の不一致のように許容しない。
ft_optin_digest() {
  local tab us num parent sib state total title optin lines sorted tsv_us
  tab=$(printf '\t')
  us=$(printf '\037')
  lines=""
  tsv_us=$(tr '\t' '\037') || return 1
  while IFS="${us}" read -r num parent sib state total title optin || [ -n "${num}" ]; do
    [ -n "${num}" ] || continue
    lines="${lines}${num}${tab}${optin}
"
  done <<<"${tsv_us}"
  [ -n "${lines}" ] || return 1
  sorted=$(printf '%s' "${lines}" | LC_ALL=C sort -t "${tab}" -k1,1n) || return 1
  printf '%s' "${sorted}" | so_sha256
}

# タスク ID の抽出（Issue #687 の追補）。ホストの TITLE_TASK_ID_RE（implement-issue-tree.src.js）と同じ定義の Oniguruma 版。
# タイトル先頭の `type(scope)!: ` と `[` / `【` の後ろのタスク ID（例: TASK-97-6）。依存の解決（兄弟のタスク ID 表）に使われる値で、
# title のダイジェスト不一致を許容する場合でも、ここは別に検査して書き写し誤りを許さない。定義を変えるときはホストと表を同時に直す。
# 空白は \s に頼らず明示した集合にする（Oniguruma の \s は U+0085 を含み U+FEFF を含まず、JS は逆。ホストの空白集合と一致させる）。
FT_TASK_ID_RE='^[ \t\n\r\f\v\x{00A0}\x{1680}\x{2000}-\x{200A}\x{2028}\x{2029}\x{202F}\x{205F}\x{3000}\x{FEFF}]*(?:[a-z]+(?:\([^()\n]{0,64}\))?!?:[ \t\n\r\f\v\x{00A0}\x{1680}\x{2000}-\x{200A}\x{2028}\x{2029}\x{202F}\x{205F}\x{3000}\x{FEFF}]*)?[\[【]?(?<id>[A-Z][A-Z0-9]{0,19}(?:-[0-9]{1,6}){1,4})(?=$|[ \t\n\r\f\v\x{00A0}\x{1680}\x{2000}-\x{200A}\x{2028}\x{2029}\x{202F}\x{205F}\x{3000}\x{FEFF}\]】:：])'

# 標準入力の TSV の taskIdSha256 を stdout へ。各行の「number TAB タスク ID（無ければ空）」を number の昇順（数値）に並べ、
# 改行で連結（末尾改行なし）して SHA-256 を取る。title の他の部分の書き写し誤りは見ず、依存解決に効く ID だけを束縛する。
ft_task_id_digest() {
  local lines
  lines=$(jq -Rrs --arg re "${FT_TASK_ID_RE}" '
    split("\n") | map(select(length > 0) | split("\t"))
    | map({n: (.[0] | tonumber), id: (((.[5] // "") | capture($re) | .id) // "")})
    | sort_by(.n) | map("\(.n)\t\(.id)") | join("\n")') || return 1
  [ -n "${lines}" ] || return 1
  printf '%s' "${lines}" | so_sha256
}

# 入力の束縛: sha256("fetch-tree\n" + root + "\n" + repo)（repo 未指定は空文字）。$1 = root、$2 = repo。
ft_input_sha() {
  printf 'fetch-tree\n%s\n%s' "$1" "$2" | so_sha256
}

# --page の封筒の入力の束縛（Issue #690）: sha256("fetch-tree-page\n" + tree.tsv 全体の SHA-256 + "\n" + ページ番号)。
# $1 = tsvSha256、$2 = ページ番号。ホストの treePageInputSha256 と同じ定義。
ft_page_input_sha() {
  printf 'fetch-tree-page\n%s\n%s' "$1" "$2" | so_sha256
}

_ft_posint() {
  case "$1" in
    '' | *[!0-9]* | 0*) return 1 ;;
  esac
  [ "${#1}" -le 9 ]
}

# ページ分割の詰め方（ft_page_count と ft_page_slice で共通）: 標準入力の TSV 行を貪欲に詰める。
# 1 行のバイト数は「行の長さ + 改行 1」。次の行を足すとページ上限を超えるなら次のページへ回す。
# 1 行だけでページ上限を超える場合は、その行だけで 1 ページにする。LC_ALL=C の awk でバイト数を数える
# （BSD awk / GNU awk / mawk で動く書き方だけを使う）。$1 = ページ上限（バイト）、$2 = 出力するページ（0 なら総数を出す）。
_ft_paginate() {
  LC_ALL=C awk -v pb="$1" -v want="$2" '
    { cost = length($0) + 1
      if (cur > 0 && cur + cost > pb) { page++; cur = 0 }
      if (page == 0) page = 1
      cur += cost
      if (want > 0 && page == want) print $0 }
    END { if (want == 0) { if (page == 0) exit 1; print page } }'
}

# 標準入力の TSV 行をページ上限 $1 バイトで詰めたときのページ数を stdout へ。空入力は非 0。
ft_page_count() {
  _ft_posint "$1" || return 2
  _ft_paginate "$1" 0
}

# 同じ詰め方で $2 番目（1 始まり）のページの行だけを stdout へ。範囲外（行が 1 つも無い）は非 0。
ft_page_slice() {
  local out
  _ft_posint "$1" && _ft_posint "$2" || return 2
  out=$(_ft_paginate "$1" "$2"; echo x) || return 1
  [ "${out}" != "x" ] || return 1
  printf '%s' "${out%x}"
}

# ページ用ディレクトリの名前の形だけを検査する（ファイルシステムは見ない）。絶対パス・許可文字集合 [A-Za-z0-9._/-]
# （_ は macOS の TMPDIR に現れる）・basename が iit-tree. で始まる。
ft_page_dir_name_ok() {
  case "$1" in
    /*) ;;
    *) return 1 ;;
  esac
  case "$1" in
    *[!A-Za-z0-9._/-]*) return 1 ;;
    */../* | */.. | */./* | */.) return 1 ;;
  esac
  case "${1##*/}" in
    iit-tree.?*) return 0 ;;
  esac
  return 1
}

# --page / --release に渡された --dir の検証。名前の形に加え、ディレクトリで、シンボリックリンクでなく、
# 自分の所有で、中身が tree.tsv のみ（空も可）であること。パスの写し間違いで他のディレクトリを読み・消さないための防御。
ft_is_page_dir() {
  local ls_out
  ft_page_dir_name_ok "$1" || return 1
  [ -d "$1" ] && [ ! -L "$1" ] && [ -O "$1" ] || return 1
  ls_out=$(ls -A "$1" 2>/dev/null) || return 1
  case "${ls_out}" in
    '' | tree.tsv) return 0 ;;
  esac
  return 1
}
