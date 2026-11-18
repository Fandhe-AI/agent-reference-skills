#!/usr/bin/env bash
# state-verify-lib.sh — state.sh の読み取りモード `verify`（状態ファイルの項目ハッシュの取得）。source 専用
#
# 呼び出し元: state.sh（Issue #603 計画 C の P5）。ホストの state:load-verify が、エージェントに書き写させていた約 1 KB の
#             インラインのコマンド（jq | sha256sum のループ）を、決定的なスクリプトに置き換えたもの。
# 役割: 状態ファイルの各項目 `.items[<番号>]` の SHA-256（`jq -jcS` の出力のハッシュ。従来と同一）と、キー一覧の
#       ダイジェスト・件数・高水位を、封筒 {nonce, payload, sha256}（lib/signed-output.sh）で 1 行に出す。
#       ホスト（verifyLoadedItems）は読込エージェントが返した項目を同じ正規形で再計算して照合し、一致した項目だけを採用する。
# 読み取り専用: 状態ファイルを書かない・作らない・ディレクトリも作らない・一時ファイルを作らない（here-document も使わない。bash 3.2 は here-document を一時ファイルで実装する。ファイルは 1 回だけ読んで
#       変数に持ち、以降の jq はその内容へ流す = 1 回の呼び出しの中で同じ版を見る）。書き込み側の関数（state-lib.sh の
#       st_rewrite / st_create / ST_*_JQ）は使わない。このファイルに rm・mv・cp・ln・mktemp・ファイルへのリダイレクト書き込みは
#       無い（tests/state-verify-script.test.mjs が静的に固定する）。
# 出力: 封筒の payload は {entries:[{h,k,n}], highWaterBytes, highWaterVersion, inputSha256, keysCount, keysSha256, mode, outcome,
#       page, pages}（キー昇順・空白なしの正規形。値は整数・64 桁 16 進・数字だけのキーと固定語彙）。
#         entries の n = 項目の note（文字列のときだけ）の SHA-256（jq -j で出した生のバイト列のハッシュ）。note が無い・文字列でない項目は空文字。
#         ホストは note を読み込まない（Issue #878）ので、blocked の一括記録が「保存済みの note と同じか」を n と sha256(patch.note) の一致で判定する。
#         outcome = ok（読めた）/ nofile（ファイルが存在しない）/ error（シンボリックリンク・存在するが読めない・JSON として不正・
#                   .items が〔無い・null 以外で〕オブジェクトでない・高水位が〔無い・null 以外で〕非負整数の number でない・
#                   キーが 15 桁を超える〔全キーを 1 回で検査。要求したページ以外のキーでも error〕・項目のハッシュを取れない）。
#       nofile と error は別: nofile だけがホストで「状態なし」へ進み得る。error は壊れた・読めない状態であり、ホストは停止する。
#       項目の内容・ファイルの内容・パスは payload にも標準エラーにも出さない。
# ページ: entries は 1 回に 100 件まで（ST_VERIFY_PAGE）。キーは jq の keys と同じ昇順で、page P は P*100 番目から。pages は
#       全ページ数（キー 0 件でも 1）。各ページに keysSha256・keysCount・高水位を載せるので、ホストは全ページで一致を要求する。
#       inputSha256 = sha256(「<ファイル>\n<page>」)。別のファイル・別のページの観測はホストの照合で拒否される。
# 判定は従来のコマンドと同じ: キーの選別 K・項目のハッシュ（jq -jcS --arg k "$k" '.items[$k]'）は同じ式、高水位は無い・null
#       なら 0（従来の // 0 と同じ）。従来より緩くならない。上の error の条件は停止側の追加で、従来が誤った値を返し得た入力
#       （改行を含むキー・複数の JSON 値・文字列の高水位〔従来は "4096" を文字列のまま出した〕）と、従来は値を返したが受理しない
#       入力（16 桁以上のキー・.items や高水位の false）の両方を含む（references/script-trust-model.md の「従来との差」）。
# 互換: macOS（bash 3.2・BSD）と Linux。mapfile・連想配列・GNU 専用フラグを使わない。
#
# このファイルは単体実行しない。run-verified.sh のハッシュ照合は scripts/lib/*.sh も対象に含む。
# 読み込み済みを示す変数でのガードは置かない（環境から継承した変数で定義が飛ばされ、export -f した偽の関数が使われるのを防ぐ）。

# shellcheck disable=SC2016  # jq の変数（$k 等）はシェルで展開しない
ST_VERIFY_PAGE=100
# 項目キー（正の整数の 10 進表記）の選別。従来のコマンドの K と同一
ST_VERIFY_KEYS='[.items // {} | keys[] | select(test("^[1-9][0-9]*$"))]'
# 項目のハッシュの射影: note（書き込み専用の自由文。読み込み後の判断に使わず、長いと読込エージェントの書き写し違いで照合に落ちる。
# Issue #878）を除いてから正規形にする。ホスト（implement-issue-tree.src.js の projectStateItem）と読込側の jq も同じ射影を掛ける。
# 項目が文字列・配列などの object でない値はそのまま。状態ファイル自体の note は変更しない（読み取り専用）
ST_VERIFY_PROJECT='if type == "object" then del(.note) else . end'
# 高水位の欄の値: 無い・null は 0、number はそのまま、それ以外（false・文字列等）は何も出さない（sv_uint が空を拒否して error）。
# // 0 にしない: // は false も 0 に置き換える。tostring にしない: 文字列の "4096" が 4096 になる
ST_VERIFY_UINT='if . == null then 0 elif type == "number" then . else empty end | tostring'

# $1 = nonce、$2 = 入力の sha256、$3 = page、$4 = outcome（nofile / error）。キーも項目も無い payload の封筒を出す
sv_emit_empty() {
  so_emit "$1" "{\"entries\":[],\"highWaterBytes\":0,\"highWaterVersion\":0,\"inputSha256\":\"$2\",\"keysCount\":0,\"keysSha256\":\"\",\"mode\":\"verify\",\"outcome\":\"$4\",\"page\":$3,\"pages\":1}"
}

# 値が 0 以上の整数（先頭ゼロ不可・15 桁以内）か
sv_uint() {
  case "$1" in
    '' | *[!0-9]*) return 1 ;;
    0) return 0 ;;
    0*) return 1 ;;
  esac
  [ "${#1}" -le 15 ]
}

# $1 = ファイルの内容、$2 = キーの一覧（1 行 1 件）、$3 = 開始位置、$4 = 終了位置（含まない）、$5 = 件数。該当ページの entries
# （カンマ区切りの {"h":…,"k":…,"n":…}）を出す。戻り値: 0 / 1（キーの形・桁数・行数の不一致・項目のハッシュを取れない）。
# 必ずコマンド置換（サブシェル）で呼ぶ: set -f と IFS・位置引数の変更を呼び出し元へ漏らさない。キーの一覧は here-document にしない（bash 3.2 は
# here-document を一時ファイルで実装するため、一時ファイルを作らない契約を守れない）。キーは数字だけなので、改行だけで単語分割すれば足りる。
# 項目の値はページの分を 1 回の jq でまとめて取る（1 件ごとに jq を起動するとファイル全体を 100 回パースし、5000 件の状態で遅い）。
# jq -jcS の出力は値の中に改行を含まない（文字列の中の改行は \n へエスケープされる）ので 1 件 1 行で区切れ、各行は従来の 1 件ごとの
# jq -jcS --arg k "$k" '.items[$k]' の出力と同じバイト列になる（同じフラグの同じ出力器）。例外は項目そのものが文字列の場合で、-j は文字列を
# 生のまま出す（改行を含み得る）。その項目の行は印の 1 文字 " にして（JSON の値の compact 表現が " 1 文字になることは無い）、従来どおり 1 件ずつ取る
sv_items() {
  local content=$1 keys=$2 start=$3 end=$4 count=$5 idx=0 k sel="" list="" vals val h n note want=value out=""
  set -f
  IFS='
'
  # shellcheck disable=SC2086  # 意図した単語分割（改行区切り・glob は set -f で無効）
  for k in ${keys}; do
    if [ "${idx}" -ge "${start}" ] && [ "${idx}" -lt "${end}" ]; then
      case "${k}" in
        '' | *[!0-9]* | 0*) return 1 ;;
      esac
      [ "${#k}" -le 15 ] || return 1
      sel="${sel}${sel:+,}\"${k}\""
      list="${list}${k}
"
    fi
    idx=$((idx + 1))
  done
  [ "${idx}" -eq "${count}" ] || return 1
  [ -n "${sel}" ] || return 0
  # jq の失敗はハッシュへ畳まない（パイプの最後が jq なので、その終了コードで止める）
  # 1 件につき 2 行: 値の行（上記）と note の行。note の行は note が文字列なら JSON 文字列（1 行）、無ければ印の - （空行は単語分割で消えるため）
  vals=$(printf '%s' "${content}" | jq -jcS --argjson ks "[${sel}]" '$ks[] as $k | (.items[$k] | if type == "string" then "\"" else ('"${ST_VERIFY_PROJECT}"') end), "\n", (.items[$k] | if type == "object" and (.note | type) == "string" then (.note | tojson) else "-" end), "\n"' 2>/dev/null) || return 1
  # shellcheck disable=SC2086  # 意図した単語分割（キーは数字だけ）
  set -- ${list}
  # shellcheck disable=SC2086  # 意図した単語分割（1 件 1 行。空の行は出ない）
  for val in ${vals}; do
    if [ "${want}" = value ]; then
      [ $# -gt 0 ] || return 1
      k=$1
      shift
      if [ "${val}" = '"' ]; then
        # 項目が文字列: 値は jq -jcS の出力そのまま（末尾の改行も含めて保つため、番兵 x を付けて外す）
        val=$(printf '%s' "${content}" | jq -jcS --arg k "${k}" '.items[$k]' 2>/dev/null && printf x) || return 1
        val=${val%x}
      fi
      h=$(printf '%s' "${val}" | so_sha256) || return 1
      want=note
      continue
    fi
    # note の行。JSON 文字列を生のバイト列へ戻してからハッシュする（末尾の改行を保つため番兵 x を付けて外す）
    n=""
    if [ "${val}" != '-' ]; then
      note=$(printf '%s' "${val}" | jq -j '.' 2>/dev/null && printf x) || return 1
      note=${note%x}
      n=$(printf '%s' "${note}" | so_sha256) || return 1
    fi
    out="${out}${out:+,}{\"h\":\"${h}\",\"k\":\"${k}\",\"n\":\"${n}\"}"
    want=value
  done
  # 値の行だけで終わった（note の行が欠けた）ものは受理しない
  [ "${want}" = value ] || return 1
  # 行数がキーの数と合わない（jq の出力が欠けた・余った）ものは受理しない
  [ $# -eq 0 ] || return 1
  printf '%s' "${out}"
}

# $1 = 状態ファイル（st_valid_file 済み）、$2 = nonce、$3 = page（0 以上の整数）。封筒を 1 行出す。
# 戻り値: 0 封筒を出した（error / nofile を含む）/ 3 封筒を作れない（nonce の形式・sha256 のツールが無い）
sv_run() {
  local f=$1 nonce=$2 page=$3 input content keys_json keys_sha count hwb hwv pages start val entries=""
  so_valid_nonce "${nonce}" || return 3
  input=$(printf '%s\n%s' "${f}" "${page}" | so_sha256) || return 3
  if [ ! -e "${f}" ] && [ ! -L "${f}" ]; then
    sv_emit_empty "${nonce}" "${input}" "${page}" nofile
    return $?
  fi
  # シンボリックリンクは辿らない（-f はリンク先を見る。状態ファイルは state.sh が mv で置く通常のファイルだけ）。リンク切れも error
  [ ! -L "${f}" ] || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  [ -f "${f}" ] || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  content=$(cat -- "${f}" 2>/dev/null) || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  # ちょうど 1 個の JSON オブジェクトで、.items が（無い・null でなければ）オブジェクトであること（// は false も {} にするので使わない）
  if ! printf '%s' "${content}" | jq -s -e 'length == 1 and (.[0] | type == "object" and (.items | . == null or type == "object"))' >/dev/null 2>&1; then
    sv_emit_empty "${nonce}" "${input}" "${page}" error
    return $?
  fi
  keys_json=$(printf '%s' "${content}" | jq -jc "${ST_VERIFY_KEYS}" 2>/dev/null) || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  count=$(printf '%s' "${content}" | jq "${ST_VERIFY_KEYS} | length" 2>/dev/null) || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  sv_uint "${count}" || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  # 末尾に改行の付いたキー（"5\n"。jq の $ は末尾の改行の前にも当たる）は、1 行 1 件の一覧から項目を引けず別のキーとして扱われてしまう。受理しない
  printf '%s' "${content}" | jq -e "${ST_VERIFY_KEYS} | all(.[]; contains(\"\\n\") | not)" >/dev/null 2>&1 || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  # 15 桁を超えるキーは全キーを 1 回で検査する（sv_items の検査は要求したページの分だけなので、ページによって結果が変わらないように）
  printf '%s' "${keys_json}" | jq -e 'all(.[]; length <= 15)' >/dev/null 2>&1 || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  keys_sha=$(printf '%s' "${keys_json}" | so_sha256) || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  hwb=$(printf '%s' "${content}" | jq -r ".perWorktreeByteReserveHighWater | ${ST_VERIFY_UINT}" 2>/dev/null) || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  sv_uint "${hwb}" || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  hwv=$(printf '%s' "${content}" | jq -r ".perWorktreeByteReserveHighWaterVersion | ${ST_VERIFY_UINT}" 2>/dev/null) || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  sv_uint "${hwv}" || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  pages=$(((count + ST_VERIFY_PAGE - 1) / ST_VERIFY_PAGE))
  [ "${pages}" -ge 1 ] || pages=1
  start=$((page * ST_VERIFY_PAGE))
  if [ "${start}" -lt "${count}" ]; then
    # キーは 1 行 1 件。行数が件数と合わない（改行を含むキー等）ものは受理しない
    val=$(printf '%s' "${content}" | jq -r "${ST_VERIFY_KEYS} | .[]" 2>/dev/null) || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
    entries=$(sv_items "${content}" "${val}" "${start}" "$((start + ST_VERIFY_PAGE))" "${count}") || { sv_emit_empty "${nonce}" "${input}" "${page}" error; return $?; }
  fi
  so_emit "${nonce}" "{\"entries\":[${entries}],\"highWaterBytes\":${hwb},\"highWaterVersion\":${hwv},\"inputSha256\":\"${input}\",\"keysCount\":${count},\"keysSha256\":\"${keys_sha}\",\"mode\":\"verify\",\"outcome\":\"ok\",\"page\":${page},\"pages\":${pages}}"
}
