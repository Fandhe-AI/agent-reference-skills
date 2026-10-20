#!/usr/bin/env bash
# added-files-lib.sh — observe-pr.sh の added-files モードの判定だけを持つ純関数（source 専用）
#
# 呼び出し元: observe-pr.sh（Issue #658）。PR が新規に追加したファイル（changeType ADDED）を、同じランの先行 PR が新規に
#             追加したファイルと base の同じディレクトリの既存ファイルに突き合わせ、パスと連番の衝突を数える。スクリプト本体から
#             切り出した理由は、テストが 1 回の bash 起動で表の全ケースを渡せるようにするため（lib/observe-checks-lib.sh と同じ）。
# 契約: どの関数も exit せず、git・gh・ネットワークを呼ばない。結果は標準出力と return 値だけで返す。
#       source 元のシェル状態を壊さないため set -e / set -u / trap / exit は置かない。二重 source は無害。
# 入力の形（observe-pr.sh が GraphQL の応答から作る。どちらも標準入力の JSON 1 つ）:
#       files  {self: {pr, state, added: [path…], deleted: [path…], truncated: 0|1},
#               peers: [{pr, state, added: [path…], truncated: 0|1}…]}
#       base   {"<ディレクトリ>": [名前…]…}（ルートは ""。base に無いディレクトリはキーごと無い）
# 判定:
#       連番     basename の先頭が 3 桁以上の数字に `-` か `_` が続く名前（例: 0063-scope.md・0018_create.sql）。その数字を連番とする。
#                ただし日付接頭辞（YYYY-MM-DD・YYYY_MM_DD・YYYYMMDD。年は 19xx / 20xx・月日は実在の範囲。直後は `-` `_` `.`〔拡張子〕か名前の終わり）は連番にしない
#                （2026-01-01-notes.md と 2026-10-19-notes.md が年の一致だけで衝突にならないようにする）
#       幹       basename の最初の `.` より前（0018_create.up.sql と 0018_create.down.sql は同じ幹 = 1 組のファイルとして衝突にしない。
#                0001-intro.md と 0001-intro.ja.md も同じ）
#       samePath 自分の追加ファイルと同じパスを、OPEN の先行 PR も新規に追加している件数（先行 PR ごとに数えて合計）
#       seqPeer  自分の連番ファイルと同じディレクトリ・同じ連番・別の幹のファイルを、OPEN の先行 PR が新規に追加している件数
#                （自分のファイル 1 件 × 先行 PR 1 本で 1。同じパスは samePath だけに数える）
#       seqBase  自分の連番ファイルのうち、base の同じディレクトリに同じ連番・別の幹のファイルがあるものの件数。自分が削除する
#                base のファイル（deleted）は比べない（改番のための削除 + 追加を衝突にしない）
#       MERGED / CLOSED の先行 PR は比べない（MERGED の追加ファイルは base 側の seqBase で数える）
# 互換: macOS（BSD userland・bash 3.2）と Linux（GNU・busybox）。jq だけを使う。引数ではなく標準入力で JSON を渡す
#       （Linux は 1 引数 128 KiB が上限で、大きな配列を --argjson で渡すと E2BIG になる）。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、偽の関数が使われるのを防ぐ）。

ADDED_FILES_JQ_DEFS='
  def bname: split("/") | last;
  def dname: split("/") | .[:-1] | join("/");
  def datepre: bname | test("^(?:(?:19|20)[0-9]{2}[-_](?:0[1-9]|1[0-2])[-_](?:0[1-9]|[12][0-9]|3[01])|(?:19|20)[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01]))(?:[-_.]|$)");
  def seqno: if datepre then null else [bname | capture("^(?<n>[0-9]{3,})[-_]") | .n] | first // null end;
  def stem: bname | split(".") | first;
  def strs: type == "array" and all(.[]; type == "string");
  def shape: type == "object"
    and (.self | type) == "object" and (.self.pr | type) == "number"
    and (.self.added | strs) and (.self.deleted | strs)
    and (.peers | type) == "array"
    and all(.peers[]; type == "object" and (.pr | type) == "number" and (.state | type) == "string" and (.added | strs));
'

# added_files_numbered_dirs
#   標準入力: files の形の JSON。自分の追加ファイルのうち連番ファイルのディレクトリを重複なく並べた配列を 1 行で出す。
#   形が違う入力は何も出力せず return 1。
added_files_numbered_dirs() {
  jq -ce "${ADDED_FILES_JQ_DEFS}"' if shape then [.self.added[] | select(seqno != null) | dname] | unique else error("shape") end' 2>/dev/null || return 1
}

# added_files_classify
#   標準入力: {files: <files の形>, base: <base の形>}。次のキーを持つ JSON を 1 行で出す（どれも整数か整数の配列）:
#     added（自分の追加ファイル数）・numbered（そのうち連番ファイル数）・samePath・seqPeer・seqBase・
#     pathPeers / seqPeers（samePath / seqPeer が 1 以上の先行 PR の番号。昇順）・truncated（files が 100 件で切れた PR の数）
#   形が違う入力は何も出力せず return 1。
added_files_classify() {
  jq -ce "${ADDED_FILES_JQ_DEFS}"'
    if (.files | shape) and (.base | type) == "object" and all(.base[]; strs) then
      .files as $f | .base as $b
      | $f.self.added as $S
      | [$S[] | select(seqno != null)] as $N
      | [$f.peers[] | select(.state == "OPEN" and .pr != $f.self.pr)] as $P
      | [$P[] | . as $q | {
          pr: $q.pr,
          path: ([$S[] | . as $s | select(any($q.added[]; . == $s))] | length),
          seq: ([$N[] | . as $s | select(any($q.added[];
                    . != $s and dname == ($s | dname) and seqno == ($s | seqno) and stem != ($s | stem)))] | length)
        }] as $per
      | {
          added: ($S | length),
          numbered: ($N | length),
          samePath: ([$per[].path] | add // 0),
          seqPeer: ([$per[].seq] | add // 0),
          seqBase: ([$N[] | . as $s
                    | ($s | dname) as $d
                    | [$f.self.deleted[] | select(dname == $d) | bname] as $del
                    | select(any(($b[$d] // [])[];
                        . as $nm | ($del | index([$nm]) | not) and seqno == ($s | seqno) and stem != ($s | stem)))] | length),
          pathPeers: ([$per[] | select(.path > 0) | .pr] | sort),
          seqPeers: ([$per[] | select(.seq > 0) | .pr] | sort),
          truncated: ([$f.self.truncated, ($f.peers[] | .truncated)] | map(select(. == 1)) | length)
        }
    else error("shape") end' 2>/dev/null || return 1
}
