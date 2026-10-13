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
// lexer の `/` 判別（除算と正規表現）は、直前のトークンだけでは決まらない箇所がある。決められる範囲
// （非 ASCII 識別子・`of`・`if` / `for` / `for await` / `while` の括弧の直後・プロパティ名・private 名・
// 正規表現リテラルの直後）は lexer が直し、決められない範囲（`}` の直後 = ブロックの終わりか
// オブジェクトリテラルの終わりか）は除算側に倒す。lexer が誤読して文字列・テンプレートの中身を詰めたり
// コードをコメントとして消したりしても気づけるよう、ビルド（生成時と --check の両方）で、生成物と開発
// ファイルを Node 同梱の acorn の**パーサ**（acorn.parse の onToken）で読んで、トークン列（種類・値・開始行）が
// 一致することを照合する（verifyTokenParity）。パーサは文脈（ブロックかオブジェクトか、条件の括弧、
// for await 等）を決めるので、acorn.tokenizer 単体の比較のように lexer と同じ位置で `/` を誤読して
// 「同じ誤読」で一致することがない。開発ファイルをパースできない（検査できない）・生成物をパースできない・
// トークン列が違う・acorn を取得できない Node・照合結果が想定の形でない場合は、いずれも生成ファイルを書かずに
// 非ゼロ終了する（fail-closed）。
//
// 照合は 2 つのゴールで行い、両方で一致を要求する: module（開発ファイルの書き方どおり）と、Workflow
// ランタイムが実際に評価する形 = 先頭の `export const meta` の `export ` を外した本体を関数本体
// （AsyncFunction）として評価する script（tests/lib/workflow-script-contract.mjs）。script では `<!--` と
// 行頭の `-->` が行末までのコメントになるため、module の parse だけだと `r = a <!-- b /*` の後のコードが
// 消えて実行結果が変わっても通ってしまう。照合を通ったとき保証されるのは、生成物が開発ファイルと同じトークン列
// （コメントと空白を除く）で、module と script のどちらの読みでも同じであること。
//
// ビルドが中止になる開発ファイルの書き方（実測。lexer が決められない・acorn が読めない・照合が止める形）。
// `/` の読み違えに由来する形の正確な条件は、stripComments の doc コメント（「残る制約」）を正とする
// （ここでは代表的な形だけを挙げ、条件を別々の場所で言い直さない）:
// - `}` の直後（ブロックの終わり）に置いた正規表現が `//` か `/*` を含む。普通の `/re/.test(s)`（クォート・
//   空白・文字クラスを含むものも）は通る
// - `for (` の括弧の中で変数 `of` を除算に使う行（`i < of / 2`）と同じ行に `//` を含むブロックコメント
//   （`/* a//b */`）がある。同じ行に `/` を含むテンプレートがあり、その後に複数行のテンプレート等がある場合も
// - `class A extends /[//]/…` のように `extends` の直後に `//` か `/*` を含む正規表現を置く（`extends` は
//   正規表現の前置キーワードに含めていないので除算と読み、`//` 以降がコメントとして消える）。括弧で包む
//   （`extends (/[//]/…)`）か変数に代入すれば通る
// - `o?.in / 2` のように `?.` の直後のキーワード名プロパティの直後に `/` を置く（同梱 acorn が正規表現と
//   誤読して開発ファイルをパースできない）。`(o?.in) / 2`・`o?.["in"] / 2`・変数へ代入して使う、で避けられる
// - `with` 文・行頭の `-->` など module でパースできない構文、`<!--` を行末コメントとして使って後ろに
//   `/*` を置くなど script と module の読みが分かれる形
// 回避は、どれも開発ファイル側の書き方を変える（lexer の誤読を直すより単純で、通った生成物は上の保証を満たす）。
//
// 中止にはならないが生成物が縮まない形（意味は同じ。実測。正確な条件は stripComments の doc コメントを正とする）:
// lexer が正規表現と除算を取り違えた結果、その行のコメントや、以降のコメントとインデントが生成物に残る
// （`// secret comment` のような開発用コメントも配布物に残る）。代表的な形は `}` の直後の `` /`/ ``、
// `of` の除算の行（行末の `//` コメントが残る。同じ行に `/` を含むテンプレートがあると以降も残る）、
// メソッド名が `for` の定義の括弧内で `of` を除算に使い `/` を含むテンプレートを書く形
// （`class A { for(x = of / 2, y = `/`) {…} }`・オブジェクトの `for(…)`・`async for(…)`）、
// `}` の直後の対にならないクォートを含む正規表現（`/a b['"]x/.test(s)`。その行のコメントが残る）。
//
// 生成物の鮮度（開発ファイルとの同期）は tests/build-workflow.test.mjs が CI で検証する —
// 生成物を直接編集したりビルドを忘れたりすると byte 不一致で fail する。
//
// 使い方:
//   node skills/implement-issue-tree/scripts/build-workflow.mjs          # 生成して書き込み
//   node skills/implement-issue-tree/scripts/build-workflow.mjs --check  # 書き込まず鮮度確認
//   --src <path> / --dist <path> で入力の開発ファイル・出力（--check では比較対象）の実行ファイルを差し替える
//   （テスト用。既定はこのディレクトリの implement-issue-tree.src.js / implement-issue-tree.js）。値が無い・
//   未知の引数は既定値へ戻らず使い方のエラー（exit 2）。トークン照合を差し替える引数は無い（迂回できてしまうため）。
//   照合の差し替え（テスト用）は runBuild / verifyTokenParity の引数だけで行う
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
// `of` は for-of 以外では識別子になれる（`x = of / 2`）ため、`for (` の括弧の直下にあるときだけ
// キーワードとして扱う（下の isDivision）。`of` をこの集合から外さないのは、外すと
// `for (x of /`/.test(s))` が除算側の誤読（正規表現内のバッククォートでテンプレートの開閉が反転）に
// なり、正規表現側の誤読より害が大きいため
const REGEX_PRECEDING_KEYWORDS = new Set([
  'return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void',
  'case', 'do', 'else', 'yield', 'await', 'throw',
])

// 正規表現リテラルの直後を表す sigWord の目印。キーワードでも識別子でもない値
const AFTER_REGEX_LITERAL = '/regex/'

// 直後の括弧が「文の頭の条件」になるキーワード。`if (x) /re/` の `)` の直後は正規表現、
// `f(x) / 2` の `)` の直後は除算になる。括弧を開いた時点の直前の単語で決める（`o.if(x)` の
// プロパティ名は対象外）。`with` は含めない: `with` 文は strict mode（ES モジュール）で構文エラーであり、
// トークン照合の module ゴールのパースを通らず、含めても到達しない死にコードになる
const CONTROL_PAREN_KEYWORDS = new Set(['if', 'for', 'while'])

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
const IDENTIFIER_PART = /[\p{ID_Continue}_$\u200c\u200d]/u
const isIdentifierContinuationRaw = (prevRaw, prevRaw2) => {
  if (prevRaw === '') return false
  const cp = isLowSurrogate(prevRaw) && isHighSurrogate(prevRaw2) ? prevRaw2 + prevRaw : prevRaw
  return IDENTIFIER_PART.test(cp)
}

// `src` の位置 `i` のコード単位が識別子文字（ASCII の単語文字・非 ASCII の ID_Continue・ZWNJ/ZWJ）の
// 一部か。非 BMP の識別子文字はサロゲートペアの 2 単位とも真を返す（高単位は後ろの低単位と、低単位は
// 前の高単位と組にして判定する）。lexer が「識別子の直後の `/` は除算」と判定するための単語判定で、
// ASCII しか見ないと `é / 2` を正規表現の開始と誤読する
const isWordUnitAt = (src, i) => {
  const ch = src[i]
  if (isWordChar(ch)) return true
  if (ch.charCodeAt(0) < 0x80) return false
  const cp = isLowSurrogate(ch) && isHighSurrogate(src[i - 1] ?? '') ? src.codePointAt(i - 1) : src.codePointAt(i)
  return IDENTIFIER_PART.test(String.fromCodePoint(cp))
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

const squeezeIsWord = (ch) => SQUEEZE_WORD.test(ch)
const squeezeIsQuote = (ch) => SQUEEZE_QUOTES.includes(ch)
const squeezeIsDelimiter = (ch) => SQUEEZE_DELIMITERS.includes(ch)
const squeezeIsSymbol = (ch) => SQUEEZE_SYMBOLS.includes(ch)
const squeezeClassified = (ch) => squeezeIsWord(ch) || squeezeIsQuote(ch) || squeezeIsDelimiter(ch) || squeezeIsSymbol(ch)

/**
 * 「詰めない」規則の一覧（prev・next は隣接する 1 文字。`refuses` が真ならその組は詰めない）。
 * どの規則にも当たらない組だけを詰める（fail-closed）。規則を 1 項ずつ外した版を
 * tests/build-workflow.test.mjs が作り、外すとトークン列が変わる入力が見つかること（各規則が実際に
 * 効いていること）を確かめる。
 */
export const SQUEEZE_REFUSAL_RULES = [
  // 分類なし（`/`・非 ASCII・バックスラッシュ・`#`・`@` 等）は判断できない。`/` は除算・正規表現・
  // `//` `/*` の誤生成を避けるため常に残す
  { name: 'unclassified', refuses: (prev, next) => !squeezeClassified(prev) || !squeezeClassified(next) },
  // `1. a` は `1.a` で構文エラーになる
  { name: 'after-dot', refuses: (prev) => prev === '.' },
  // 単語どうしは連結すると別の単語になる
  { name: 'word-word', refuses: (prev, next) => squeezeIsWord(prev) && squeezeIsWord(next) },
  // `1e +2` → `1e+2`、`1.e + 2` → `1.e+2`（直前が数字・e・E で直後が符号）
  { name: 'exponent-sign', refuses: (prev, next) => /[0-9eE]/.test(prev) && (next === '+' || next === '-') },
  // `1e+ 2` → `1e+2`（符号の後ろの空白）
  { name: 'sign-digit', refuses: (prev, next) => (prev === '+' || prev === '-') && /[0-9]/.test(next) },
  // 直後が `.` なら詰めない。`1 .toString()` → `1.toString()` は構文エラー（トークン列が変わる）。
  // `return .5` → `return.5` や `? .5` → `?.5` はトークン列が変わらない（または別規則が守る）が、
  // 下流の Bugbot が誤検出したため見た目も残す側に倒す
  { name: 'before-dot', refuses: (prev, next) => next === '.' },
  // 記号どうしは片方が ( ) [ ] { } , ; のときだけ詰める（`<!--`・`-->`・`++`・`--`・`=>`・`**`・`??` 等の
  // 合成を防ぐ）
  {
    name: 'symbol-symbol',
    refuses: (prev, next) => {
      const prevIsPunct = squeezeIsSymbol(prev) || squeezeIsDelimiter(prev)
      const nextIsPunct = squeezeIsSymbol(next) || squeezeIsDelimiter(next)
      return prevIsPunct && nextIsPunct && !squeezeIsDelimiter(prev) && !squeezeIsDelimiter(next)
    },
  },
]

/**
 * トークン間の半角スペースを詰めてよいかを、直前トークンの末尾 1 文字 `prev` と直後トークンの
 * 先頭 1 文字 `next` だけで判定する純粋関数。字句解析器の状態（直前の単語等）には頼らない。
 * `SQUEEZE_REFUSAL_RULES` のどれにも当たらない組だけを詰める（fail-closed: 想定外の組は残す）。
 * 詰める組の典型:
 * - 単語文字（英数字・`_`・`$`）↔ 単語文字以外の分類ありの文字（記号・括弧・引用符）
 * - 引用符 ↔ 分類ありの任意の文字
 * - 記号どうしは、片方が `( ) [ ] { } , ;` のときだけ
 * 詰めない組の典型: 単語どうし、分類なしの文字、直前が `.`、直後が `.`、
 * 直前が数字・`e`・`E` で直後が `+` `-`、直前が `+` `-` で直後が数字。
 *
 * `rules` は規則一覧の差し替え用（テストが規則を 1 項ずつ外した版を作る）。実行時は既定のまま使う。
 *
 * lexer が状態から加えて除外する組 — `\u{...}` の直後・同一行に除算の `/` がある行 — は
 * ここでは判定しない。
 */
export function shouldSqueezeSpace(prev, next, rules = SQUEEZE_REFUSAL_RULES) {
  if (typeof prev !== 'string' || typeof next !== 'string' || prev.length !== 1 || next.length !== 1) return false
  return !rules.some((rule) => rule.refuses(prev, next))
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
 * `/` の判別（除算か正規表現か）:
 * - 直前が識別子（非 ASCII の識別子文字・サロゲートペアを含む）・数値・文字列・テンプレート・
 *   `]`・後置 `++` / `--`・正規表現リテラルなら除算。`of` は `for (` の括弧の直下でだけキーワード
 *   （直後は正規表現）で、それ以外は識別子（直後は除算）
 * - 直前が `)` のときは、その括弧を開いた直前の単語で決める。`if` / `for` / `while`
 *   （プロパティ名でない）なら条件の括弧の終わりなので正規表現（`if (x) /re/`）、それ以外は除算
 *   （`f(x) / 2`・`(a) / b`）
 * - `for await (` の括弧は `for` の括弧（`await` の直前の単語が `for`）。`await (x) / 2` は除算
 * - プロパティ名（`obj.if(x)`・private 名 `this.#if(x)`・`this.#in`）はキーワードと同名でも識別子
 * - 角括弧・波括弧も積むので、`for (x of [of / 2])` の `of` は識別子（括弧の直下でない）
 * - 決められない箇所は除算側に倒す: `}` の直後（ブロックの終わりなら正規表現、オブジェクト
 *   リテラルの終わりなら除算）
 * - 逆に正規表現と読むと決めた箇所が実は除算だった場合に備え、正規表現と読んだ行の残りは
 *   文字列・テンプレートの中身を詰めない（squeezeOff）
 *
 * 残る制約: 上の「除算側に倒す」箇所（`}` の直後）で実際は正規表現のとき、その中にバッククォートが
 * あると以降のテンプレートの開閉が反転して中身を詰め、`//` `/*` があるとコードをコメントとして消す。
 * lexer では解かず、ビルド時のトークン照合（verifyTokenParity）が止める — 普通の `/re/.test(s)` は
 * 素通しで通り、`//` `/*` を含むとき（コードが消える）と、バッククォートで以降のテンプレートの中身が
 * 変わるときに中止になる。開発ファイル側は、`}` の直後に `//` `/*` バッククォートを含む正規表現を
 * 置かない（括弧で包む・変数に代入する）。
 * `for (` の括弧の中で変数 `of` を除算に使う形（`i < of / 2`）は、除算の `/` を正規表現の開始、行内の次の
 * `/` を閉じと読み、行の残りは詰めない（閉じ `/` が無ければ除算に戻る）。実測した挙動（意味はどれも同じ）:
 * - 同じ行に `/` を含むテンプレートが無い: 行末の `//` コメントは、次の `/` が `//` の 1 文字目として閉じに
 *   読まれたときだけ生成物に残る。ほかの `/`（`r += of / 2`）が先にあればそこが閉じになり、後続の `//`
 *   コメントは消える。`/` を 1 個含むブロックコメント（本文が a/b）も残る。`//` を含むブロックコメント
 *   （本文が a//b）は閉じのないコメントになって中止する。この行の後に複数行のテンプレートや `//` を含むテンプレートがあっても、
 *   中止にならず結果も同じ
 * - 同じ行に `/` を含むテンプレート（`` t = `a/b` ``）がある: 閉じ `/` がテンプレートの開始より前に来て、
 *   開閉が反転し、lexer はテンプレートモードに入ったままになる。以降が 1 行のテンプレートや通常のコード
 *   だけなら中止にならず、以降のコメントとインデントが生成物に残る（サイズが縮まない・開発用コメントが配布物に
 *   残る）。その後に複数行のテンプレート（インデントが詰まる）か `//` を含むテンプレート（パース不能）が
 *   あると、トークン照合が中止する
 * 同じ状態は `}` の直後の `` /`/ `` でも起きる: 以降に別のテンプレートが無い、または 1 行のテンプレートだけなら
 * 通り、以降のコメントとインデントが残る。以降に複数行のテンプレートがあると中止する。`}` の直後の対に
 * ならないクォートを含む正規表現（`/a b['"]x/.test(s)`）は、クォートが文字列の開始と読まれて行末まで素通しに
 * なり、その行のコメントが残る。メソッド名が `for` の定義（`class A { for(x = of / 2, y = `/`) {…} }`・
 * オブジェクトの `for(…)`・`async for(…)`）は `for (` の括弧と同じに扱われ、括弧内の `of` の除算が上と同じ
 * 取り違えになり、結果は同じで以降のコメントとインデントが残る。`class … extends /[//]/…` のように
 * `extends` の直後に置いた `//` `/*` 入りの正規表現は除算と読まれ、`//` 以降が消えて中止する。
 * 後置 `++` / `--` の判定は直前 2 文字が `++` `--` かだけを見るため、空白で離れた `x-- - /re/`（後置 `--` の次の
 * 二項 `-` の直後の正規表現）や `a - -/re/` も除算と読む。正規表現内に `//` `/*` バッククォートがあれば
 * コードが消える・開閉が反転するが、ビルド時のトークン照合（パーサ）が止める。
 *
 * 誤判定の安全性: 除算を正規表現と読んでも、その行の残りは詰めないのでリテラルの中身は変わらない。
 * 危険なのは正規表現を除算と読む方向（正規表現内の `//` を行コメントと誤認して以降を削る、バッククォートで
 * テンプレートの開閉が反転する）で、それは上の判別とビルド時のトークン照合が防ぐ。変換の妥当性は
 * ビルド時検証（行数保持・先頭 meta 宣言・冪等性・トークン照合）と tests/build-workflow.test.mjs の
 * 固定ケース + 生成的テスト + 生成物パースゲートで担保する。
 */
export function stripComments(src, { squeezeSpaces = false, shouldSqueeze = shouldSqueezeSpace } = {}) {
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
  // sigWord の 1 つ前の単語（sigWord が始まった時点で、まだ句読点に遮られていなかった直前の sigWord）。
  // `for await (` の `await` の前が `for` であることの判定に使う
  let wordBefore = ''
  // wordBefore がプロパティ名・private 名（`obj.for`・`this.#for`）だったか。プロパティ名の `for` は
  // キーワードではないので、その後に改行を挟んで来る `await (` を `for await (` と読まない
  let wordBeforeIsProperty = false
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
  const stack = [{ mode: 'code', depth: 0, parens: [] }]
  // 空白除去用: 現在の行に除算（正規表現と判別されなかった `/`）が出たか。除算と誤読した正規表現
  // リテラルの内部の空白を詰めて壊さないため、その行の残りでは空白を詰めない（改行で解除）
  let squeezeOff = false
  // 直近に閉じた `)` の種類（開いた時点の直前の単語: 'if' | 'for' | 'while'、それ以外は 'other'）。
  // 直後の `/` が `if (x) /re/` の正規表現か `f(x) / 2` の除算かの判別に使う
  let lastClosedParen = 'other'

  // 直近の単語 sigWord がプロパティ名か（`obj.in`・`x.return`・private 名 `this.#if` の `if`）。
  // プロパティ名はキーワードと同名でも識別子として扱う。`1. in /re/`（末尾ドット数値の直後の
  // キーワード）の `.` は演算子の直前なのでプロパティ名ではない。`#` 直後の名前は private 名
  const isPropertyName = () => (wordPrev === '.' && !wordDotAfterDigit) || wordPrev === '#'

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
        stack.push({ mode: 'code', depth: 0, parens: [] })
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
          shouldSqueeze(prev, next) &&
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
          wordBeforeIsProperty = sigWord !== '' && isPropertyName()
          wordBefore = sigWord
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
    // 括弧の種類の追跡（`/` が除算か正規表現かの判別用）。開いた時点の直前の単語が if / for / while
    // （プロパティ名でない）なら条件の括弧として記録し、閉じたときにその種類を残す。文字列・正規表現・
    // コメント・テンプレート本文の括弧はここへ来ないので数えない
    if (c === '(') {
      // `for await (` の括弧は `for` の括弧（直下の `of` はキーワード）。`await` が単独の式のとき
      // （`await (x) / 2`）は対象外なので、直前が実際の `for` キーワードのときだけ（`obj.for` `this.#for` の
      // プロパティ名の `for` の後に改行を挟んで `await (` が来る形は `for await` ではない）
      const kind = sigWord === 'await' && wordBefore === 'for' && !wordBeforeIsProperty ? 'for' : sigWord
      const control = CONTROL_PAREN_KEYWORDS.has(kind) && !isPropertyName()
      ctx.parens.push(control ? kind : 'other')
    } else if (c === ')') {
      const top = ctx.parens.pop() ?? 'other'
      lastClosedParen = top === '[' || top === '{' ? 'other' : top
    } else if (c === '[') {
      // 角括弧・波括弧も積む: `for (x of [of / 2])` の `of` は `for` の括弧の直下ではなく識別子
      ctx.parens.push('[')
    } else if (c === ']') {
      if (ctx.parens[ctx.parens.length - 1] === '[') ctx.parens.pop()
    } else if (c === '{') {
      ctx.parens.push('{')
    } else if (c === '}' && ctx.parens[ctx.parens.length - 1] === '{') {
      ctx.parens.pop()
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
    // 正規表現リテラル: 直前トークンが識別子・数値・`]` `}`・後置 `++` / `--`・リテラル終端、または
    // 条件の括弧以外の閉じ括弧 `)` なら除算として素通しし、それ以外（演算子・区切り・キーワード・
    // 条件の括弧 `if (x)` `for (…)` `while (x)` の `)` の直後）は regex として閉じ `/` まで素通しする —
    // regex 内部の `//` をコメントと誤認しないための分岐。
    // `}` はブロック文直後の regex（`if (a) {} /re/`）と曖昧だが除算側へ倒す: regex 側へ
    // 誤読すると閉じ `/` 探索が行内の文字列開始を飲み込み、非コメントを書き換え得る
    // （PR #452 Bugbot）。除算と読んだ regex の中身は、バッククォート・`//` `/*` を含まなければ素通しで
    // 出力は変わらない（含むとテンプレートの開閉の反転・コードの消失になり、トークン照合が止める）
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
      const keywordProperty = isPropertyName()
      // `of` は for の括弧の直下でだけキーワード（`for (x of /re/.exec(s))`）。それ以外は識別子
      const ofIsIdentifier = sigWord === 'of' && ctx.parens[ctx.parens.length - 1] !== 'for'
      // `if (x) /re/` の `)` は条件の括弧を閉じた直後なので正規表現。`}` の直後はブロックの終わり
      // （正規表現）とオブジェクトリテラルの終わり（除算）を lexer では決められないため除算側に倒す
      const closedControlParen = sigCh === ')' && lastClosedParen !== 'other'
      const isDivision =
        (sigWord !== '' && (!REGEX_PRECEDING_KEYWORDS.has(sigWord) || keywordProperty || ofIsIdentifier)) ||
        (/[)\]}]/.test(sigCh) && !closedControlParen) ||
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
          // 正規表現と読んだ判定が誤りでも、その行の残りの文字列・テンプレートの中身を詰めない
          squeezeOff = true
          sigCh2 = sigCh
          sigCh = '/'
          // 正規表現リテラルは被演算子なので、直後の `/` は除算（`/a/ / 2`）。単語として扱う目印を置く。
          // 直後にフラグ（`/a/g`）が続けば通常の単語で置き換わる
          sigWord = AFTER_REGEX_LITERAL
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
    if (isWordUnitAt(src, i)) {
      // rawPrevIsIdentEscape: 直前が Unicode コードポイントエスケープの末尾（`\u{1D400}1` の
      // `1` 等）で地続きの識別子文字である場合も継続として扱う（Issue #455 codex P1）。
      // rawPrevContinuesSigWord: 直前が数値リテラルの指数部符号（`1e+10` の `+`）で、その
      // 手前の sigWord が指数部途中（`1e`）だった場合も地続きとして扱う（Issue #455 Bugbot）
      // isLowSurrogate(c): 非 BMP 識別子文字の 2 単位目は 1 単位目と同じ単語（isWordUnitAt が組を確認済み）
      if (isLowSurrogate(c) || isIdentifierContinuationRaw(rawPrev, rawPrev2) || rawPrevIsIdentEscape || rawPrevContinuesSigWord) {
        sigWord += c
      } else {
        wordBeforeIsProperty = sigWord !== '' && isPropertyName()
        wordBefore = sigWord
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
 * `shouldSqueeze` は詰める組の判定関数の差し替え用（テストが規則を 1 項ずつ外した版を渡す）。
 */
export function squeezeSpaces(src, { shouldSqueeze = shouldSqueezeSpace } = {}) {
  return stripComments(stripComments(src), { squeezeSpaces: true, shouldSqueeze })
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
 * 生成物のトークン列が開発ファイルのトークン列と一致することを、acorn のパーサ（onToken）で照合する。
 * lexer（stripComments）とは独立の解析で、lexer が `/` を誤読して文字列・テンプレート・正規表現の中身を
 * 変えたり、コードをコメントとして消したりしても検出できる。パーサは文脈（`/` が除算か正規表現か、
 * `if (x) /re/` の括弧、ブロックかオブジェクトリテラルか、for await の括弧）を決めるので、tokenizer 単体の
 * 比較と違い、lexer と同じ位置で `/` を誤読して「同じ誤読」で一致してしまうことがない
 * （照合の詳細は scripts/token-diff.cjs の mode: "parse"）。比較は種類・値・開始行。
 *
 * 次の場合はいずれも throw する（fail-closed。検査を省略して通さない）:
 * - 開発ファイルをパースできない（検査できない）。tokenizer へのフォールバックはしない
 * - 生成物をパースできない・トークン列が違う（最初の差の位置の行番号と前後のトークンつき）
 * - acorn を取得できない Node・照合ヘルパーの異常終了・出力が想定の形でない
 *
 * `helperPath` / `execPath` は照合ヘルパーと実行ファイルの差し替え用（テストが照合を実行できない
 * 状況を作る）。CLI からは渡せない（照合を迂回する口を本番の入口に残さない）。
 */
export function verifyTokenParity(src, artifact, { helperPath = TOKEN_DIFF_PATH, execPath = process.execPath } = {}) {
  const r = spawnSync(execPath, ['--expose-internals', helperPath], {
    input: JSON.stringify([{ name: 'build', mode: 'parse', before: src, after: artifact }]),
    encoding: 'utf8',
    maxBuffer: 1 << 28,
  })
  if (r.error || r.status !== 0) {
    throw new Error(
      'トークン照合を実行できない（acorn を取得できない Node の可能性。検査を省略せず中止する）: ' +
        `${r.error ? r.error.message : `status ${r.status}${r.signal ? ` signal ${r.signal}` : ''}`} ${r.stderr ?? ''}`.trim(),
    )
  }
  // 終了コード 0 でも出力が JSON でない・想定の形でない場合は「一致した」と扱わず中止する
  // （出力が空・途中で切れた・別のスクリプトが差し込まれた等。通過は ok: true を明示的に受け取ったときだけ）
  let parsed
  try {
    parsed = JSON.parse(r.stdout)
  } catch (e) {
    throw new Error(`トークン照合の結果を解釈できない（出力が JSON として読めない。検査を省略せず中止する）: ${e.message}`)
  }
  const results = parsed?.results
  if (!Array.isArray(results) || results.length !== 1 || typeof results[0]?.ok !== 'boolean') {
    throw new Error('トークン照合の結果を解釈できない（results が 1 件の { ok: boolean } でない。検査を省略せず中止する）')
  }
  const [result] = results
  if (result.ok) return
  if (result.kind === 'source-unparsable') {
    // 原因は開発ファイルの構文エラーとは限らない。acorn のエラー本文と位置を先に出し、ヒントは例として添える
    throw new Error(
      `開発ファイルをパースできないため照合できない（検査を省略せず中止する）: ${result.detail}。` +
        '原因の例: 構文エラー、module と script のどちらかのゴールで読めない構文（`with` 文・行頭の `-->`・' +
        '2 つ目の `export`・`import.meta` 等）、acorn が正当な構文を読めない場合（よくある原因の 1 つ: ' +
        '`o?.in / 2` のように `?.` の直後のキーワード名プロパティの直後の `/` を acorn が正規表現と誤読する。' +
        '`(o?.in) / 2` のように括弧で包むと避けられる）',
    )
  }
  throw new Error(`生成物のトークン列が開発ファイルと一致しない: ${result.detail}`)
}

/**
 * ビルド本体（CLI が使う関数）。開発ファイルから生成物を作ってトークン照合し、書き込む（`checkOnly` では
 * 書かず、既存の実行ファイルとの一致だけ確かめる）。標準出力・標準エラーに出す行と終了コードを返し、
 * 出力と終了は呼び出し側（CLI）が行う。照合に失敗したら生成ファイルは書かない。
 * `parity` は verifyTokenParity へ渡す差し替え（`helperPath` / `execPath`。テスト専用で、CLI の引数からは渡せない）。
 */
export function runBuild({ srcPath = SRC_PATH, distPath = DIST_PATH, checkOnly = false, parity = {} } = {}) {
  const startedAt = Date.now()
  let src
  let artifact
  try {
    src = readFileSync(srcPath, 'utf8')
    artifact = buildArtifact(src)
    verifyTokenParity(src, artifact, parity)
  } catch (e) {
    return { status: 1, stdout: [], stderr: [`ビルド中止（${distPath} は書き込まない）: ${e.message}`], wrote: false }
  }
  const srcBytes = Buffer.byteLength(src)
  const outBytes = Buffer.byteLength(artifact)
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(2)
  if (checkOnly) {
    let current
    try {
      current = readFileSync(distPath, 'utf8')
    } catch (e) {
      return { status: 1, stdout: [], stderr: [`鮮度エラー: 実行ファイルを読めない（${distPath}）: ${e.message}`], wrote: false }
    }
    if (current !== artifact) {
      return {
        status: 1,
        stdout: [],
        stderr: ['鮮度エラー: 実行ファイルが開発ファイルと同期していない。node build-workflow.mjs で再生成せよ'],
        wrote: false,
      }
    }
    return { status: 0, stdout: [`鮮度 ok: ${outBytes} B（src ${srcBytes} B・トークン照合 ok・${elapsed}s）`], stderr: [], wrote: false }
  }
  writeFileSync(distPath, artifact)
  return {
    status: 0,
    stdout: [
      `生成完了: ${distPath}`,
      `src ${srcBytes} B → dist ${outBytes} B（-${srcBytes - outBytes} B, -${Math.round(((srcBytes - outBytes) / srcBytes) * 100)}%・トークン照合 ok・${elapsed}s）`,
    ],
    stderr: [],
    wrote: true,
  }
}

const USAGE = '使い方: node build-workflow.mjs [--check] [--src <path>] [--dist <path>]'

/**
 * コマンドライン引数を解釈する。未知の引数・値のないオプション（末尾、または次が別のオプション）は
 * 既定値へ黙って戻らず、使い方のエラーとして `error` を返す。照合を差し替える口は持たない。
 */
export function parseArgs(argv) {
  const out = { checkOnly: false, srcPath: SRC_PATH, distPath: DIST_PATH, error: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--check') {
      out.checkOnly = true
    } else if (a === '--src' || a === '--dist') {
      const v = argv[i + 1]
      if (v === undefined || v.startsWith('--')) return { ...out, error: `${a} に値がない` }
      if (a === '--src') out.srcPath = v
      else out.distPath = v
      i++
    } else {
      return { ...out, error: `未知の引数: ${a}` }
    }
  }
  return out
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
  const args = parseArgs(process.argv.slice(2))
  if (args.error) {
    console.error(`${args.error}\n${USAGE}`)
    process.exit(2)
  }
  const r = runBuild(args)
  for (const line of r.stdout) console.log(line)
  for (const line of r.stderr) console.error(line)
  process.exit(r.status)
}
