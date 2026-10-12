// implement-issue-tree の実行ファイル（Workflow へ渡す配布物）を開発ファイルから生成する
// ビルダー。開発ファイル implement-issue-tree.src.js（コメント込み・編集はこちらだけ）から
// コメントのみを除去した implement-issue-tree.js を生成する。Workflow ランタイムのハード上限
// 512 KiB（tests/lib/workflow-script-contract.mjs 参照）に対しコメントが約 28% を占めるため、
// 実行ファイルからコメントを落としてサイズ予算を確保し、開発ファイル側はコメント量の制約から
// 解放する（設計の経緯は PR #241 → 本分離）。
//
// 変換は「コメント除去」「コード行の先頭インデント除去」「トークン間の不要な半角スペースの
// 除去」の 3 つだけで、これ以外の minify（識別子短縮・改行除去等）はしない: コメント行は空行化し
// 改行を全て保持するため、生成物と開発ファイルの行番号は完全に一致する（スタックトレース・
// エラー行の突き合わせ用）。一方、先頭インデントと空白を落とすため**列番号は一致しない**。
// テンプレートリテラル内（`${}` 式部分を含む）・文字列リテラル・正規表現リテラルは一切変更しない
// （プロンプトに埋め込む bash・YAML 等は継続行のインデントが内容の一部）。インデント除去と
// 空白除去は 512 KiB 予算（tests/lib/workflow-script-contract.mjs）を行番号一致を保ったまま
// 守るための措置。空白除去は、詰めても同じ 2 トークンに字句解析される隣接の組だけを許可リスト
// （shouldSqueezeSpace）で詰め、迷う組は詰めない。
// lexer の `/` 判別（除算と正規表現）は誤り得るため、誤読で文字列・テンプレートの中身が詰められても
// 気づけるよう、ビルド（生成時と --check の両方）で生成物のトークン列（種類・値・開始行）が開発ファイルの
// トークン列と一致することを Node 同梱の acorn で照合する（verifyTokenParity）。不一致・acorn を取得
// できない Node・字句解析の失敗はいずれも生成ファイルを書かずに非ゼロ終了する（fail-closed）。
// 生成物の鮮度（開発ファイルとの同期）は tests/build-workflow.test.mjs が CI で検証する —
// 生成物を直接編集したりビルドを忘れたりすると byte 不一致で fail する。
//
// 使い方:
//   node skills/implement-issue-tree/scripts/build-workflow.mjs          # 生成して書き込み
//   node skills/implement-issue-tree/scripts/build-workflow.mjs --check  # 書き込まず鮮度確認
//   --src <path> / --dist <path> で入力の開発ファイル・出力（--check では比較対象）の実行ファイルを差し替える
//   （テスト用。既定はこのディレクトリの implement-issue-tree.src.js / implement-issue-tree.js）
import { spawnSync } from 'node:child_process'
import { readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
export const SRC_PATH = join(HERE, 'implement-issue-tree.src.js')
export const DIST_PATH = join(HERE, 'implement-issue-tree.js')
export const TOKEN_DIFF_PATH = join(HERE, 'token-diff.cjs')

// 直後の `/` を正規表現リテラルの開始と判定するキーワード。識別子・数値の直後の `/` は
// 除算として素通しする（標準的な division / regex 判別ヒューリスティック）。
const REGEX_PRECEDING_KEYWORDS = new Set([
  'return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void',
  'case', 'do', 'else', 'yield', 'await', 'throw',
])

const isWordChar = (ch) => /[A-Za-z0-9_$]/.test(ch)

// 高サロゲート（U+D800-DBFF）判定。非 BMP 識別子文字（数学記号等）はコード単位 2 個の
// サロゲートペアで表現されるため、`.` 判定部の単一コード単位チェックだけでは判別できない
const isHighSurrogate = (ch) => ch.length === 1 && ch.charCodeAt(0) >= 0xd800 && ch.charCodeAt(0) <= 0xdbff
// 低サロゲート（U+DC00-DFFF）判定
const isLowSurrogate = (ch) => ch.length === 1 && ch.charCodeAt(0) >= 0xdc00 && ch.charCodeAt(0) <= 0xdfff

// ECMAScript の IdentifierPart（UnicodeIDContinue | $ | _ | <ZWNJ> | <ZWJ>）相当の判定
// （Issue #455 codex P1）。`prevRaw` は判定対象の直前生文字（1 コード単位）、`prevRaw2` は
// その 1 つ前の生文字（空白含む）。`prevRaw` が低サロゲートで `prevRaw2` が高サロゲートの
// 場合は両者を結合し、非 BMP 識別子文字（例: 数学用英数字記号）も 1 コードポイントとして
// 正しく判別する。`\p{ID_Continue}` は結合文字（Mn/Mc）・連結文字（Pc）・10 進数字（Nd）等の
// ID_Continue カテゴリを、明示的な U+200C（ZWNJ）・U+200D（ZWJ）は環境の Unicode データ
// によっては ID_Continue に含まれない場合がある 2 文字（ECMAScript の IdentifierPart には
// 含まれる）をそれぞれ捕捉する。ZWNJ/ZWJ はソース中に不可視文字として直接書かず `\u`
// エスケープで明示し、エディタ・diff ツールでの混入・破損を避ける
const isIdentifierContinuationRaw = (prevRaw, prevRaw2) => {
  if (prevRaw === '') return false
  const cp = isLowSurrogate(prevRaw) && isHighSurrogate(prevRaw2) ? prevRaw2 + prevRaw : prevRaw
  return /[\p{ID_Continue}_$\u200c\u200d]/u.test(cp)
}

// `\uHHHH`\uff084\u6841\u56fa\u5b9a\uff09/ `\u{H...}`\uff08\u53ef\u5909\u9577\uff09\u5f62\u5f0f\u306e Unicode \u30b3\u30fc\u30c9\u30dd\u30a4\u30f3\u30c8\u30a8\u30b9\u30b1\u30fc\u30d7\u3092
// `src` \u306e\u4f4d\u7f6e `i`\uff08`src[i] === '\\'` \u524d\u63d0\uff09\u304b\u3089\u691c\u51fa\u3059\u308b\u3002ECMAScript \u3067\u306f `\` \u306f\u3053\u306e\u5f62\u5f0f\u306e
// identifier \u4e2d\u30a8\u30b9\u30b1\u30fc\u30d7\u4ee5\u5916\u306e\u4f4d\u7f6e\u306b\u306f\u51fa\u73fe\u3057\u306a\u3044\uff08\u6587\u5b57\u5217\u30fb\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u30fb\u6b63\u898f\u8868\u73fe\u30ea\u30c6\u30e9\u30eb
// \u5185\u306f\u672c lexer \u306e\u5225\u30e2\u30fc\u30c9\u3067\u51e6\u7406\u3055\u308c\u3053\u3053\u306b\u306f\u6765\u306a\u3044\uff09\u305f\u3081\u3001code \u30e2\u30fc\u30c9\u3067 `\` \u306b\u906d\u9047\u3057\u305f\u6642\u70b9\u3067
// \u3053\u306e\u5f62\u72b6\u306e\u30de\u30c3\u30c1\u3092\u8a66\u307f\u308c\u3070\u5341\u5206\uff08Issue #455 codex P1\uff09\u3002\u30de\u30c3\u30c1\u3057\u305f\u30a8\u30b9\u30b1\u30fc\u30d7\u5168\u4f53\u306e\u30c6\u30ad\u30b9\u30c8
// \uff08`\` \u3092\u542b\u3080\uff09\u3092\u8fd4\u3057\u3001\u30de\u30c3\u30c1\u3057\u306a\u3051\u308c\u3070 null \u3092\u8fd4\u3059
const matchIdentifierUnicodeEscape = (src, i) => {
  if (src[i] !== '\\' || src[i + 1] !== 'u') return null
  if (src[i + 2] === '{') {
    const close = src.indexOf('}', i + 3)
    if (close === -1) return null
    const hex = src.slice(i + 3, close)
    if (hex.length === 0 || !/^[0-9A-Fa-f]+$/.test(hex)) return null
    return src.slice(i, close + 1)
  }
  const hex = src.slice(i + 2, i + 6)
  if (!/^[0-9A-Fa-f]{4}$/.test(hex)) return null
  return src.slice(i, i + 6)
}

// 空白除去で使う文字の分類。ここに無い文字（`/`・非 ASCII・バックスラッシュ・`#`・`@`・改行等）は
// 分類なし = 空白を詰めない。`/` は除算・正規表現・`//` `/*` の誤生成と判別不能を避けるため、
// 常に詰めない
const SQUEEZE_WORD = /[A-Za-z0-9_$]/
const SQUEEZE_QUOTES = '"\'`' // 文字列・テンプレートリテラルの境界
const SQUEEZE_DELIMITERS = '()[]{},;' // 他の記号と連結しても別トークンにならない 1 文字記号
const SQUEEZE_SYMBOLS = '=:?!<>|&*%^+-~.' // 上記以外の記号。記号どうしの連結は合成トークンを作り得る

/**
 * トークン間の半角スペースを詰めてよいかを、直前トークンの末尾 1 文字 `prev` と直後トークンの
 * 先頭 1 文字 `next` だけで判定する純粋関数。**詰めてよい組を列挙し、それ以外はすべて残す**
 * （fail-closed: 想定外の組は詰めない）。字句解析器の状態（直前の単語等）には頼らない。
 *
 * 詰めてよい組は、次の「詰めない」条件のどれにも当たらない次のいずれか:
 * - 単語文字（英数字・`_`・`$`）↔ 単語文字以外の分類ありの文字（記号・括弧・引用符）
 * - 引用符 ↔ 分類ありの任意の文字
 * - 記号どうしは、片方が `( ) [ ] { } , ;` のときだけ（`<!--`・`-->`・`++`・`--`・`=>`・`**`・
 *   `??`・`?.` 等の合成をまとめて防ぐ。`/` は常に対象外なので `//` `/*` も作らない）
 *
 * 詰めない条件（上の許可に優先する）:
 * - どちらかが分類なし、単語文字同士（`a b`）、直前が `.`（`1. a` は `1.a` で構文エラー）
 * - 直前が数字・`e`・`E` で直後が `+` `-` `.`（`1e +2` → `1e+2`、`1 .toString()`、`1.e + 2`）。
 *   `1.e` のように末尾ドットで単語が切れる形も隣接 2 文字だけで防ぐ
 * - 直前が `+` `-` で直後が数字（`1e+ 2` → `1e+2`、符号の後ろの空白）
 *
 * lexer が状態から加えて除外する組 — `\u{...}` の直後・同一行に除算の `/` がある行 — は
 * ここでは判定しない。
 */
export function shouldSqueezeSpace(prev, next) {
  if (typeof prev !== 'string' || typeof next !== 'string' || prev.length !== 1 || next.length !== 1) return false
  const isWord = (ch) => SQUEEZE_WORD.test(ch)
  const isQuote = (ch) => SQUEEZE_QUOTES.includes(ch)
  const isDelimiter = (ch) => SQUEEZE_DELIMITERS.includes(ch)
  const isSymbol = (ch) => SQUEEZE_SYMBOLS.includes(ch)
  const classified = (ch) => isWord(ch) || isQuote(ch) || isDelimiter(ch) || isSymbol(ch)
  if (!classified(prev) || !classified(next)) return false
  if (prev === '.') return false
  if (isWord(prev) && isWord(next)) return false
  if (/[0-9eE]/.test(prev) && (next === '+' || next === '-' || next === '.')) return false
  if ((prev === '+' || prev === '-') && /[0-9]/.test(next)) return false
  const prevIsPunct = isSymbol(prev) || isDelimiter(prev)
  const nextIsPunct = isSymbol(next) || isDelimiter(next)
  if (prevIsPunct && nextIsPunct) return isDelimiter(prev) || isDelimiter(next)
  return true
}

/**
 * JS ソースからコメントとコード行の先頭インデントを除去する（改行はすべて保持し行番号を
 * 維持する。列番号は維持しない）。`squeezeSpaces` オプションを true にすると、さらに最上位の
 * コードのトークン間の不要な半角スペースを詰める（`squeezeSpaces()` 経由で使う。lexer の状態
 * 追跡を共有するため、文字列・テンプレート・正規表現の判定を二重実装しない）。
 *
 * 文字列・テンプレートリテラル（`${}` のネスト含む）・正規表現リテラルを追跡する lexer で、
 * それらの内部にある `//` `/*` をコメントと誤認しない。本スクリプトはプロンプト用の巨大
 * テンプレートリテラル（コード例を含み得る）を多数持つため、行ベースの正規表現置換では
 * 安全に処理できない — 必ずこの lexer を経由すること。
 *
 * 誤判定の安全性: 除算を正規表現と誤読しても出力は素通しで不変。危険なのは正規表現内の
 * `//` を行コメントと誤認して以降を削る方向のみで、それを判別分岐が防ぐ。変換の妥当性は
 * ビルド時検証（行数保持・先頭 meta 宣言・冪等性）と tests/build-workflow.test.mjs の
 * 固定ケース + 生成物パースゲートで担保する。
 */
export function stripComments(src, { squeezeSpaces = false } = {}) {
  let out = ''
  let i = 0
  const n = src.length
  let rawPrev = '' // 直前に出力した文字（空白含む）。単語の連続判定に使う
  // 直前に消費したトークンが Unicode コードポイントエスケープ（`\uXXXX` / `\u{X...}`）の
  // 末尾であったか。isWordChar(rawPrev) はエスケープの最終文字（`}` や hex 桁）だけでは
  // 「識別子文字が続いていた」と判定できない（`}` 自体は識別子文字でない）ため、rawPrev の
  // 値とは別にこのフラグで単語の地続きを追跡する（Issue #455 codex P1）
  let rawPrevIsIdentEscape = false
  // 直前に消費した文字が、10 進数値リテラルの指数部符号（`1e+10` の `+`・`1e-5` の `-`）で
  // あったか。指数部符号は isWordChar に含まれない（`+`/`-` は識別子文字でない）ため、
  // 符号を挟むと sigWord が指数部の桁（`1e` + `+` + `10`）で分断され、符号後の桁だけの
  // 「10」が独立した完結済み整数リテラルと誤認される。結果、直後の `.` が末尾ドット数値と
  // 誤同一視され、続く `.in` がプロパティ名でなくキーワードとして扱われて regex 誤判定に
  // つながる（Issue #455 Bugbot 指摘）。このフラグで符号を挟んでも sigWord の地続きを保つ
  let rawPrevContinuesSigWord = false
  // rawPrev のさらに 1 つ前の生文字（空白含む）。`wordPrevRaw`（単語開始直前の 1 文字）が
  // サロゲートペアの下位ハーフである場合に、上位ハーフと組み合わせて 1 コードポイントへ
  // 復元するために保持する（Issue #455 codex P1: UTF-16 コード単位ごとの走査のため、
  // 単一コード単位だけでは非 BMP 識別子文字を判別できない）
  let rawPrev2 = ''
  let sigCh = '' // 直前の非空白文字。regex / 除算の判別に使う
  let sigCh2 = '' // sigCh の 1 つ前の非空白文字。後置 `++` / `--` の検出に使う（PR #452 P2）
  let sigWord = '' // 直近の単語（識別子・数値・キーワード）。空白を挟んでも保持する
  // sigWord の直前の非空白文字。`.` なら sigWord はプロパティ名であり、キーワードと同名でも
  // 識別子として扱う（`obj.in / 2` を regex と誤読しないため — Bugbot 指摘）
  let wordPrev = ''
  // 直近に出力した `.` が数字と字句的に隣接していたか（`1.` = 数値リテラルの末尾ドット）。
  // `1 .in` のように空白を挟む `.` は数値へのプロパティアクセスなので false。非空白文字の
  // 並びだけでは両者を区別できない（PR #454 codex P1）ため、`.` 出力時点の rawPrev で判定する。
  // ただし字句隣接だけでは `foo1.`・`1e10.`・`0x10.`（完了済みトークンへのプロパティアクセス）
  // を `1.` と区別できない（Issue #455）ため、直前単語が 10 進整数リテラルそのものである
  // ことも併せて要求する（下記 `.` 判定部）
  let dotAfterDigit = false
  // 単語開始直前の生の 1 文字（空白含む）。`wordPrev`（直前の非空白文字）だけでは非 ASCII
  // 識別子文字（`é1` 等）に隣接する数字単語を識別子の一部として除外できないため別途保持する
  let wordPrevRaw = ''
  // wordPrevRaw のさらに 1 つ前の生文字。サロゲートペア復元用（rawPrev2 と同じ理由）
  let wordPrevRaw2 = ''
  // 単語開始時点の dotAfterDigit。wordPrev が `.` でもこれが true なら末尾ドット数値直後の
  // キーワード（`1. in /re/`）でありプロパティ名ではない — キーワード判定を維持する（Bugbot 指摘）
  let wordDotAfterDigit = false
  // 'code'（{} 深度つき）と 'template' のネストを管理する。template 内の `${` で code を
  // push し、その code の深度が閉じたら template へ復帰する
  const stack = [{ mode: 'code', depth: 0 }]
  // 空白除去用: 現在の行に除算（正規表現と判別されなかった `/`）が出たか。除算と誤読した正規表現
  // リテラルの内部の空白を詰めて壊さないため、その行の残りでは空白を詰めない（改行で解除）
  let squeezeOff = false

  // コメント除去の直前に出力末尾の行内空白を切り詰める。コメントだけの行は空行になり、
  // `code  // c` は `code` になる（.editorconfig の trim_trailing_whitespace 準拠）
  const trimLineTail = () => {
    out = out.replace(/[ \t]+$/, '')
  }

  while (i < n) {
    const ctx = stack[stack.length - 1]
    const c = src[i]

    if (ctx.mode === 'template') {
      if (c === '\\') {
        out += c + (src[i + 1] ?? '')
        i += 2
        continue
      }
      if (c === '`') {
        out += c
        i++
        stack.pop()
        sigCh2 = sigCh
        sigCh = '`'
        sigWord = ''
        rawPrev2 = rawPrev
        rawPrev = '`'
        rawPrevIsIdentEscape = false
        continue
      }
      if (c === '$' && src[i + 1] === '{') {
        out += '${'
        i += 2
        stack.push({ mode: 'code', depth: 0 })
        sigCh2 = sigCh
        sigCh = '{'
        sigWord = ''
        rawPrev2 = rawPrev
        rawPrev = '{'
        rawPrevIsIdentEscape = false
        continue
      }
      out += c
      i++
      continue
    }

    // コード行の先頭インデント除去: 最上位の code モード（stack.length === 1 = テンプレート
    // リテラルが開いていない。`${}` 式の内側は stack が 2 以上なので保守側で対象外）で、出力が
    // 行頭（空または直前が改行）のときの半角スペース・タブだけを出力しない。行頭の空白を消す
    // だけで直前は必ず改行なのでトークンは連結せず意味は変わらない。字句状態（rawPrev 等）は
    // 空白を出力した場合と同じに更新し、regex / 除算判別の結果を変えない。文字列リテラルの
    // `\` 改行継続とテンプレート本文は専用の内側ループ／template モードで処理され、ここへ
    // 到達しないため継続行は除去されない
    if ((c === ' ' || c === '\t') && stack.length === 1 && (out === '' || out.endsWith('\n'))) {
      rawPrev2 = rawPrev
      rawPrev = c
      rawPrevIsIdentEscape = false
      rawPrevContinuesSigWord = false
      i++
      continue
    }

    // トークン間の空白除去（squeezeSpaces 有効時）: 最上位のコードで行内の空白・タブの連なりを
    // 丸ごと消費し、詰められる組（shouldSqueezeSpace）なら何も出さず、そうでなければ 1 個に
    // まとめて出す。行末の空白は対象外（下の通常経路）。字句状態は空白 1 個を出した場合と
    // 同じに更新するため、regex / 除算判別の結果は変わらない
    if (squeezeSpaces && (c === ' ' || c === '\t') && stack.length === 1 && !squeezeOff) {
      let j = i
      while (src[j] === ' ' || src[j] === '\t') j++
      const next = src[j]
      const prev = out[out.length - 1]
      if (prev !== undefined && prev !== '\n' && next !== undefined && next !== '\n' && next !== '\r') {
        const squeeze =
          shouldSqueezeSpace(prev, next) &&
          // `\u{41}` の閉じ `}` と単語文字を連結すると識別子が地続きになる
          !(prev === '}' && rawPrevIsIdentEscape && isWordChar(next))
        if (!squeeze) out += ' '
        rawPrev2 = rawPrev
        rawPrev = ' '
        rawPrevIsIdentEscape = false
        rawPrevContinuesSigWord = false
        i = j
        continue
      }
    }

    const c2 = src[i + 1]
    // 行コメント: 行末まで削る（改行は次ループで出力される）
    if (c === '/' && c2 === '/') {
      trimLineTail()
      while (i < n && src[i] !== '\n') i++
      continue
    }
    // ブロックコメント: 内部の改行だけ保持して削り、位置に空白 1 個を置いて**全**トークン
    // 境界を保持する（単語文字同士に限ると `x+/*c*/+y` → `x++y` の意味変化や
    // `1/*c*/.toString()` → `1.toString()` の構文破壊を防げない — PR #452 codex P1）。
    // 行末に残った空白は改行出力時の trimLineTail が回収する
    if (c === '/' && c2 === '*') {
      trimLineTail()
      i += 2
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] === '\n') out += '\n'
        i++
      }
      i = Math.min(i + 2, n)
      // 行頭（コメント内の改行で末尾が改行になった場合を含む）ならトークン境界は改行が担うため
      // 置換空白は不要。置くと閉じ後のコードに先頭空白が残る
      if (!(out === '' || out.endsWith('\n'))) out += ' '
      // 置換空白を rawPrev に反映する。古い rawPrev のままだと `x/*c*/in` の `in` が直前の
      // 単語へ連結（`xin`）され keyword 判定が壊れ、後続の regex を除算と誤読して regex 内の
      // `//` `/*` をコメントとして削り得る（Bugbot 指摘）
      rawPrev2 = rawPrev
      rawPrev = ' '
      rawPrevIsIdentEscape = false
      continue
    }
    // 文字列リテラル: 内部の `//` 等を素通しする
    if (c === '"' || c === "'") {
      out += c
      i++
      while (i < n && src[i] !== c) {
        if (src[i] === '\\') {
          out += src[i] + (src[i + 1] ?? '')
          i += 2
          continue
        }
        if (src[i] === '\n') break // 生改行 = 未終端文字列（不正構文）。安全側でそのまま抜ける
        out += src[i]
        i++
      }
      if (i < n && src[i] === c) {
        out += c
        i++
      }
      sigCh2 = sigCh
      sigCh = c
      sigWord = ''
      rawPrev2 = rawPrev
      rawPrev = c
      rawPrevIsIdentEscape = false
      continue
    }
    // テンプレートリテラル開始
    if (c === '`') {
      out += c
      i++
      stack.push({ mode: 'template' })
      rawPrev2 = rawPrev
      rawPrev = '`'
      rawPrevIsIdentEscape = false
      continue
    }
    // Unicode コードポイントエスケープ（`\uXXXX` / `\u{X...}`）: ECMAScript の IdentifierPart /
    // IdentifierStart はこの形式のエスケープを含みうる。isWordChar は `\` `{` `}` を識別子文字と
    // 認識できないため、個別文字として処理すると単語境界が誤って分断される（`\u{1D400}1.in` の
    // `1` が新規単語開始と誤認され、直後の `.` が末尾ドット数値と誤同一視される — Issue #455
    // codex P1）。ここでエスケープを丸ごと 1 トークンとして消費し、直前・直後の識別子文字と
    // 地続きに扱う（{} 深度カウントの対象にもしない — エスケープ内の `{` `}` はブロック境界
    // ではない）
    if (c === '\\') {
      const esc = matchIdentifierUnicodeEscape(src, i)
      if (esc) {
        out += esc
        if (isWordChar(rawPrev) || rawPrevIsIdentEscape) {
          sigWord += esc
        } else {
          sigWord = esc
          wordPrev = sigCh // 新規単語の開始: 直前の非空白文字と、それが `.` なら数字隣接を記録
          wordPrevRaw = rawPrev
          wordPrevRaw2 = rawPrev2
          wordDotAfterDigit = wordPrev === '.' && dotAfterDigit
        }
        sigCh2 = sigCh
        sigCh = esc[esc.length - 1]
        rawPrev2 = rawPrev
        rawPrev = esc[esc.length - 1]
        rawPrevIsIdentEscape = true
        i += esc.length
        continue
      }
    }
    // code モードの {} 深度（template の `${` からの復帰判定）
    if (c === '{') ctx.depth++
    if (c === '}') {
      if (ctx.depth === 0 && stack.length > 1) {
        out += c
        i++
        stack.pop() // `${ ... }` を閉じて template へ復帰
        continue
      }
      ctx.depth--
    }
    // 正規表現リテラル: 直前トークンが識別子・数値・閉じ括弧 `)` `]` `}`・後置 `++` / `--`・
    // リテラル終端なら除算として素通しし、それ以外（演算子・区切り・キーワード直後）は regex
    // として閉じ `/` まで素通しする — regex 内部の `//` をコメントと誤認しないための分岐。
    // `}` はブロック文直後の regex（`if (a) {} /re/`）と曖昧だが除算側へ倒す: regex 側へ
    // 誤読すると閉じ `/` 探索が行内の文字列開始を飲み込み、非コメントを書き換え得る
    // （PR #452 Bugbot）。除算側の誤りは素通しのため出力を変えない
    if (c === '/') {
      const postfixIncDec =
        (sigCh === '+' && sigCh2 === '+') || (sigCh === '-' && sigCh2 === '-')
      // 末尾ドット数値（`1. / 2`）: `.` が sigWord を空にし除算先行子にも無いため regex と
      // 誤読され、行内の後続 `/`（`//` コメントの 1 文字目や文字列中の `/`）を閉じ `/` と
      // 誤認する（Bugbot 指摘）。数字直後の `.` に限り除算側へ倒す（`...` spread は regex のまま）
      const trailingDotNumber = sigCh === '.' && /[0-9]/.test(sigCh2)
      // `.` 直後のキーワード同名プロパティ（`obj.in / 2`・`x.return / y`）は識別子なので
      // 除算側へ倒す（Bugbot 指摘）。キーワード本体（`return /re/`・`in /re/`）は regex のまま
      // 末尾ドット数値直後のキーワード（`1. in /re/`）はプロパティ名ではない（Bugbot 指摘）。
      // 数値へのプロパティアクセス `1 .in / 2` は字句隣接でないためプロパティ名として除算側
      const keywordProperty = wordPrev === '.' && !wordDotAfterDigit
      const isDivision =
        (sigWord !== '' && (!REGEX_PRECEDING_KEYWORDS.has(sigWord) || keywordProperty)) ||
        /[)\]}]/.test(sigCh) ||
        sigCh === '"' || sigCh === "'" || sigCh === '`' ||
        postfixIncDec ||
        trailingDotNumber
      if (!isDivision) {
        let j = i + 1
        let buf = c
        let inClass = false
        let closed = false
        while (j < n && src[j] !== '\n') {
          if (src[j] === '\\') {
            buf += src[j] + (src[j + 1] ?? '')
            j += 2
            continue
          }
          if (src[j] === '[') inClass = true
          else if (src[j] === ']') inClass = false
          buf += src[j]
          if (src[j] === '/' && !inClass) {
            j++
            closed = true
            break
          }
          j++
        }
        if (closed) {
          out += buf
          i = j
          sigCh2 = sigCh
          sigCh = '/'
          sigWord = ''
          rawPrev2 = rawPrev
          rawPrev = '/'
          rawPrevIsIdentEscape = false
          continue
        }
        // 行末まで閉じ `/` が無い = regex ではなかった。通常文字として下へ流す
      }
    }

    // code モードの改行出力時に行末空白を回収する（ブロックコメント置換の空白 1 個が
    // 行末に残るケース。文字列・テンプレート内の改行は別経路のため触らない）
    if (c === '\n') trimLineTail()
    out += c
    if (c === '\n') squeezeOff = false
    else if (c === '/') squeezeOff = true
    if (isWordChar(c)) {
      // rawPrevIsIdentEscape: 直前が Unicode コードポイントエスケープの末尾（`\u{1D400}1` の
      // `1` 等）で地続きの識別子文字である場合も継続として扱う（Issue #455 codex P1）。
      // rawPrevContinuesSigWord: 直前が数値リテラルの指数部符号（`1e+10` の `+`）で、その
      // 手前の sigWord が指数部途中（`1e`）だった場合も地続きとして扱う（Issue #455 Bugbot）
      if (isWordChar(rawPrev) || rawPrevIsIdentEscape || rawPrevContinuesSigWord) {
        sigWord += c
      } else {
        sigWord = c
        wordPrev = sigCh // 新規単語の開始: 直前の非空白文字と、それが `.` なら数字隣接を記録
        wordPrevRaw = rawPrev // `.` 判定で「単語開始直前が識別子文字か」を見るため生文字も保持
        wordPrevRaw2 = rawPrev2 // サロゲートペア復元用（下記 `.` 判定部）
        wordDotAfterDigit = wordPrev === '.' && dotAfterDigit
      }
      sigCh2 = sigCh
      sigCh = c
      rawPrev2 = rawPrev
      rawPrev = c
      rawPrevIsIdentEscape = false
      rawPrevContinuesSigWord = false
      i++
      continue
    } else if (!/\s/.test(c)) {
      if (c === '.') {
        // `1.` と `1 .` を字句隣接で区別（従来）に加え、直前単語が 10 進整数リテラルそのもの
        // であることも要求する。字句隣接のみだと `foo1.`・`1e10.`・`0x10.`（完了済みトークンへの
        // プロパティアクセス）を末尾ドット数値と誤同一視してしまう（Issue #455）。
        // 識別子継続文字の判定は isWordChar（ASCII のみ）ではなく isIdentifierContinuationRaw
        // （ID_Continue + ZWNJ/ZWJ + サロゲートペア復元）を使う — 結合文字（`á1` の合成前
        // 形式等）・ZWNJ/ZWJ・非 BMP 識別子文字を isWordChar は継続文字として認識できず、
        // 単一コード単位の \p{L} 判定だけでは結合文字・ZWNJ/ZWJ を捕捉できない（Issue #455 codex P1）
        dotAfterDigit =
          /[0-9]/.test(rawPrev) &&
          /^[0-9]+(?:_[0-9]+)*$/.test(sigWord) && // foo1 / 1e10 / 0x10 / 10n を除外（数値セパレータは許容）
          wordPrev !== '.' && // `1.5.` の 2 つ目の `.`（小数部直後）はプロパティアクセス
          !isIdentifierContinuationRaw(wordPrevRaw, wordPrevRaw2) // 識別子の一部に隣接する数字を除外
      }
      // 指数部符号（`1e+10` の `+`・`1e-5` の `-`）: 直前 sigWord が「数字列 [小数部] e/E」で
      // 終わっており、かつ字句隣接（rawPrev が e/E そのもの）の場合のみ、指数部の続きとして
      // sigWord を温存する（リセットしない）。これにより符号後の桁が sigWord へ地続きで
      // 連結され（`1e` + `10` = `1e10`）、純粋な数字列パターンに一致しなくなるため、符号後の
      // 桁だけを独立した完結済み整数リテラルと誤認しない（Issue #455 Bugbot 指摘）
      // 末尾ドット仮数（`1.e+10`）: `.` が sigWord を空にするため `e` は単独語として始まり、
      // 上の「数字列 [小数部] e/E」パターンに一致しない。`e`/`E` 単独語が末尾ドット数値の `.`
      // に字句隣接して始まっている（wordDotAfterDigit かつ wordPrevRaw が `.`）場合も指数部
      // として温存する。取りこぼすと符号後の `10` が完結済み整数と誤認され、続く `.in /` が
      // キーワード + regex と誤判定される（消費リポ同期 PR の Bugbot 指摘・2026-08-29）
      const isExponentSign =
        (c === '+' || c === '-') &&
        /[eE]/.test(rawPrev) &&
        (/^[0-9]+(?:_[0-9]+)*(?:\.[0-9]+(?:_[0-9]+)*)?[eE]$/.test(sigWord) ||
          (/^[eE]$/.test(sigWord) && wordDotAfterDigit && wordPrevRaw === '.'))
      if (!isExponentSign) {
        sigWord = ''
      }
      sigCh2 = sigCh
      sigCh = c
      rawPrev2 = rawPrev
      rawPrev = c
      rawPrevIsIdentEscape = false
      rawPrevContinuesSigWord = isExponentSign
      i++
      continue
    }
    rawPrev2 = rawPrev
    rawPrev = c
    rawPrevIsIdentEscape = false
    rawPrevContinuesSigWord = false
    i++
  }
  // 末尾に改行を持たないソースで最終行にブロックコメント置換の空白が残るケースの保険
  return out.replace(/[ \t]+$/, '')
}

/**
 * コメント・インデントを除去したうえで、最上位のコードのトークン間の不要な半角スペースを詰める。
 * 先にコメントを除去してから空白除去の lexer を走らせるため、ブロックコメントの置換空白が
 * 詰め残しになって冪等性を壊すことはない。冪等（出力へ再適用しても不変）。
 */
export function squeezeSpaces(src) {
  return stripComments(stripComments(src), { squeezeSpaces: true })
}

/**
 * 開発ファイルのソースから実行ファイルの内容を生成し、変換の安全性を検証して返す。
 * 検証に失敗した場合は throw する（fail-closed: 壊れた生成物を書き出さない）。
 */
export function buildArtifact(src) {
  const stripped = squeezeSpaces(src) // コメント・インデント・不要な空白を除去した生成物
  const srcLines = src.split('\n').length
  const outLines = stripped.split('\n').length
  if (srcLines !== outLines) {
    throw new Error(`行数が保持されていない（src ${srcLines} 行 → 生成物 ${outLines} 行）`)
  }
  // Workflow ランタイムはファイル先頭（位置 0）の `export const meta` を要求する
  // （tests/lib/workflow-script-contract.mjs の META_EXPORT_PATTERN）。開発ファイルの
  // 先頭にコメントを置くとここで検出される — 先頭コメントは置けない制約を fail-closed で守る
  if (!/^export const meta\b/.test(stripped)) {
    throw new Error('生成物の先頭が `export const meta` でない（開発ファイル先頭にコメント等が混入）')
  }
  // 冪等性: 生成物へ再適用しても不変であること（lexer の自己整合検証）。空白除去モードの lexer は
  // コメント・インデント除去も兼ねるため、1 回の再適用でコメント除去・空白除去の双方を検証できる
  if (stripComments(stripped, { squeezeSpaces: true }) !== stripped) {
    throw new Error('コメント除去・空白除去が冪等でない（lexer がコメント・空白以外を変更している疑い）')
  }
  return stripped
}

/**
 * 生成物のトークン列が開発ファイルのトークン列と一致することを acorn で照合する。lexer
 * （stripComments）とは独立の字句解析なので、lexer が `/` を誤読して文字列・テンプレート・正規表現の
 * 中身を変えても検出できる。コメントはトークンに出ないため開発ファイルをそのまま比べる。比較は種類・
 * 値・開始行で、sourceType は module と script の両方。一致しなければ最初の差の位置（行番号と前後の
 * トークン）を含めて throw する。acorn を取得できない Node でも黙って飛ばさず throw する。
 */
export function verifyTokenParity(src, artifact) {
  const r = spawnSync(process.execPath, ['--expose-internals', TOKEN_DIFF_PATH], {
    input: JSON.stringify([{ name: 'build', before: src, after: artifact }]),
    encoding: 'utf8',
    maxBuffer: 1 << 28,
  })
  if (r.error || r.status !== 0) {
    throw new Error(
      'トークン照合を実行できない（acorn を取得できない Node の可能性。検査を省略せず中止する）: ' +
        `${r.error ? r.error.message : `status ${r.status}`} ${r.stderr ?? ''}`.trim(),
    )
  }
  const [result] = JSON.parse(r.stdout).results
  if (!result.ok) throw new Error(`生成物のトークン列が開発ファイルと一致しない: ${result.detail}`)
}

// CLI 実行部（import 時は実行しない）。argv[1] は realpath で比較する — import.meta.url は
// symlink 解決済みのため、symlink 経由（downstream の `.claude/skills/...` → `.agents/skills/...`）
// で起動すると素の argv[1] とは一致せず、無言で何もせず exit 0 してしまう（Bugbot 指摘）
const invokedAs = (() => {
  try {
    return realpathSync(process.argv[1] ?? '')
  } catch {
    return ''
  }
})()
if (invokedAs && invokedAs === fileURLToPath(import.meta.url)) {
  const argValue = (flag, fallback) => {
    const at = process.argv.indexOf(flag)
    return at === -1 ? fallback : (process.argv[at + 1] ?? fallback)
  }
  const checkOnly = process.argv.includes('--check')
  const srcPath = argValue('--src', SRC_PATH)
  const distPath = argValue('--dist', DIST_PATH)
  const startedAt = Date.now()
  let src
  let artifact
  try {
    src = readFileSync(srcPath, 'utf8')
    artifact = buildArtifact(src)
    verifyTokenParity(src, artifact)
  } catch (e) {
    console.error(`ビルド中止（${distPath} は書き込まない）: ${e.message}`)
    process.exit(1)
  }
  const srcBytes = Buffer.byteLength(src)
  const outBytes = Buffer.byteLength(artifact)
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(2)
  if (checkOnly) {
    const current = readFileSync(distPath, 'utf8')
    if (current !== artifact) {
      console.error('鮮度エラー: 実行ファイルが開発ファイルと同期していない。node build-workflow.mjs で再生成せよ')
      process.exit(1)
    }
    console.log(`鮮度 ok: ${outBytes} B（src ${srcBytes} B・トークン照合 ok・${elapsed}s）`)
  } else {
    writeFileSync(distPath, artifact)
    console.log(`生成完了: ${distPath}`)
    console.log(`src ${srcBytes} B → dist ${outBytes} B（-${srcBytes - outBytes} B, -${Math.round(((srcBytes - outBytes) / srcBytes) * 100)}%・トークン照合 ok・${elapsed}s）`)
  }
}
