// scripts/build-workflow.mjs（開発ファイル → 実行ファイルのコメント除去ビルダー）の回帰テスト。
//
// 検証は次の系統:
//   (a) lexer の固定ケース — 文字列・テンプレートリテラル・正規表現の内部にある `//` を
//       コメントと誤認して削らないこと（本スクリプトはプロンプト用の巨大テンプレートに
//       コード例を含み得るため、ここが壊れると生成物が静かに破損する）
//   (b) 鮮度ゲート — リポジトリの実行ファイル（implement-issue-tree.js）が開発ファイル
//       （implement-issue-tree.src.js）から再生成した内容と byte 一致すること。生成物の
//       直接編集・ビルド忘れの双方をここで fail させる（CI がこのスイートを実行する）。
//   (d) 空白除去 — トークン間の不要な半角スペースを詰める後段パス（squeezeSpaces）の許可リスト・
//       固定ケース・性質（行数保持・冪等・リテラル不変）と、Node 同梱 acorn による変換前後の
//       トークン列一致（実ファイル + 固定ケース + Bugbot 指摘の回帰 + 生成的テスト〔ランダム・
//       3 トークン全数・隣接 2 文字全数〕）と、許可リストの規則を 1 項ずつ外す変異テスト。
//   (e) ビルド時のトークン照合 — lexer の `/` 判別の固定ケースと、判別できない入力・照合ヘルパーの
//       失敗（実行できない・出力が想定の形でない）でビルドが生成ファイルを書かずに中止すること。
// 生成物のサイズ・パースゲートは workflow-loadability.test.mjs が担う（対象は実行ファイル）。
import { test, after, describe } from 'node:test'
import { stripMetaExport } from './lib/workflow-script-contract.mjs'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, existsSync, mkdtempSync, symlinkSync, rmSync } from 'node:fs'
import { trackTmp } from './lib/tmp-track.mjs'
import { spawnSync } from 'node:child_process'
import { spawnAsync } from './lib/run-async.mjs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  stripComments, squeezeSpaces, shouldSqueezeSpace, buildArtifact, verifyTokenParity, runBuild, parseArgs, embedScriptHashes, SQUEEZE_REFUSAL_RULES, SRC_PATH, DIST_PATH,
} from '../scripts/build-workflow.mjs'

const SCRIPT_PATH = fileURLToPath(new URL('../scripts/build-workflow.mjs', import.meta.url))
// 開発ファイルは目印（スクリプトのハッシュ）を持つため、ビルダーと同じく置換してから比較する
const readSrcEmbedded = () => embedScriptHashes(readFileSync(SRC_PATH, 'utf8'), dirname(SRC_PATH))
const REPO_ROOT = resolve(fileURLToPath(new URL('../../..', import.meta.url)))
const TOKEN_DIFF_HELPER = fileURLToPath(new URL('../scripts/token-diff.cjs', import.meta.url))

// 実物の開発ファイル（約 900 KB）のビルドとトークン照合は 1 回約 7 秒かかる。実物への --check は 1 回だけ、このファイルの読み込み時に
// 子プロセスで始め（相対パスで起動する形 = 作業ディレクトリがリポジトリルートで、スクリプトを相対パスで渡す）、他のテストを
// 走らせている間に終わらせる。結果は 2 つのテスト（鮮度ゲートと相対パス起動の CLI ガード）が共有する。
// --check の判定は『開発ファイルから再生成した結果が実行ファイルと byte 一致し、かつ変換前後のトークン列が一致する』ことなので、
// 旧テストが同じ再生成をこのプロセスの中で繰り返していた分（鮮度ゲートと symlink 起動で各 7 秒）はここへ集約した。
const REAL_CHECK = spawnAsync(process.execPath, ['skills/implement-issue-tree/scripts/build-workflow.mjs', '--check'], { cwd: REPO_ROOT, env: process.env })

// ---------------------------------------------------------------------------
// (a) lexer 固定ケース
// ---------------------------------------------------------------------------

test('行コメントのみの行は空行になる（改行保持・行番号維持）', () => {
  assert.equal(stripComments('const a = 1\n// comment\nconst b = 2\n'), 'const a = 1\n\nconst b = 2\n')
})

test('trailing コメントは直前の行内空白ごと除去される（trim_trailing_whitespace 準拠）', () => {
  assert.equal(stripComments('const a = 1  // comment\n'), 'const a = 1\n')
})

test('文字列リテラル内の // は保持される', () => {
  assert.equal(stripComments("const u = 'http://example.com' // c\n"), "const u = 'http://example.com'\n")
})

test('テンプレートリテラル内の行頭 // 行（プロンプト内コード例）は保持される', () => {
  const src = 'const p = `手順:\n// この行はコード例\ncode()\n`\n'
  assert.equal(stripComments(src), src)
})

test('テンプレート ${} 内の文字列に } を含んでもテンプレート境界を見失わない', () => {
  const src = "const t = `a${foo('}')}b` // c\n"
  assert.equal(stripComments(src), "const t = `a${foo('}')}b`\n")
})

test('ネストしたテンプレートリテラルを正しく追跡する', () => {
  const src = 'const t = `x${cond ? `in//ner${y}` : z}w`\n// comment\n'
  assert.equal(stripComments(src), 'const t = `x${cond ? `in//ner${y}` : z}w`\n\n')
})

test('${} 内のオブジェクトリテラル（{} ネスト）でテンプレートへ早期復帰しない', () => {
  const src = 'const t = `v=${JSON.stringify({ a: { b: 1 } })} // not comment`\n'
  assert.equal(stripComments(src), src)
})

test('正規表現リテラル内の // をコメントと誤認しない（キーワード直後の regex）', () => {
  const src = 'if (x) return /a[/][/]b/.test(s)\n'
  assert.equal(stripComments(src), src)
})

test('. 直後のキーワード同名プロパティ直後の除算に続く trailing コメントを除去する', () => {
  assert.equal(stripComments('const a = obj.in / 2 // c\n'), 'const a = obj.in / 2\n')
})

test('. 直後のキーワード同名プロパティ直後の除算行の後続文字列を書き換えない', () => {
  assert.equal(
    stripComments("const b = x.return / y + 'http://keep' // c\n"),
    "const b = x.return / y + 'http://keep'\n",
  )
})

test('末尾ドット数値直後のキーワード（1. in /re/）をプロパティ名と誤判定せず regex を保持する', () => {
  assert.equal(stripComments('const r = 1. in /x[/]y/ // c\n'), 'const r = 1. in /x[/]y/\n')
})

test('数値へのプロパティアクセス（1 .in）直後の除算行で後続文字列を書き換えず trailing コメントを除去する', () => {
  assert.equal(
    stripComments("const a = 1 .in / 2 + 'http://keep' // c\n"),
    "const a = 1 .in / 2 + 'http://keep'\n",
  )
})

// Issue #455（Bugbot 連鎖指摘 5 巡目）の回帰固定: dotAfterDigit が「. の直前 1 文字が数字か」
// という字句隣接のみで判定していたため、数字終わり識別子（foo1）・完了済み数値リテラル
// （1e10・0x10）へのプロパティアクセス直後の `.` を末尾ドット数値（`1.`）と誤同一視し、
// keywordProperty が false になって後続の `/` を regex 開始と誤読していた。
test('数字終わり識別子直後のプロパティアクセス（foo1.in）を末尾ドット数値と誤同一視しない', () => {
  assert.equal(
    stripComments("const a = foo1.in / 2 + 'http://keep' // c\n"),
    "const a = foo1.in / 2 + 'http://keep'\n",
  )
})

test('指数表記リテラル直後のプロパティアクセス（1e10.in）を末尾ドット数値と誤同一視しない', () => {
  assert.equal(
    stripComments("const a = 1e10.in / 2 + 'http://keep' // c\n"),
    "const a = 1e10.in / 2 + 'http://keep'\n",
  )
})

test('符号付き指数表記リテラル直後のプロパティアクセス（1e+10.in）を末尾ドット数値と誤同一視しない（Issue #455 Bugbot）', () => {
  assert.equal(
    stripComments("const a = 1e+10.in / 2 + 'http://keep' // c\n"),
    "const a = 1e+10.in / 2 + 'http://keep'\n",
  )
})

test('負符号付き指数表記リテラル直後のプロパティアクセス（1e-5.in）を末尾ドット数値と誤同一視しない（Issue #455 Bugbot）', () => {
  assert.equal(
    stripComments("const a = 1e-5.in / 2 + 'http://keep' // c\n"),
    "const a = 1e-5.in / 2 + 'http://keep'\n",
  )
})

test('末尾ドット仮数の符号付き指数表記リテラル直後のプロパティアクセス（1.e+10.in）を末尾ドット数値と誤同一視しない（Bugbot 指摘）', () => {
  assert.equal(
    stripComments("const a = 1.e+10.in / 2 + 'http://keep' // c\n"),
    "const a = 1.e+10.in / 2 + 'http://keep'\n",
  )
  assert.equal(
    stripComments("const a = 1.E-5.in / 2 + 'http://keep' // c\n"),
    "const a = 1.E-5.in / 2 + 'http://keep'\n",
  )
})

test('末尾ドット仮数の符号付き指数表記リテラル（1.e+10）を含む除算行の trailing コメント除去は従来通り機能する', () => {
  assert.equal(
    stripComments("const a = 1.e+10 / 2 // c\n"),
    "const a = 1.e+10 / 2\n",
  )
})

test('末尾ドット数値直後の識別子 e へ続く二項 + は指数部符号と扱わず、後続の regex を保持する', () => {
  // `1. e` は数値リテラルではない（空白を挟む）ため、`e` は識別子。`+` は二項演算子
  assert.equal(
    stripComments("const r = 1. e +10. in /x[/]y/ // c\n"),
    "const r = 1. e +10. in /x[/]y/\n",
  )
})

test('符号付き指数表記リテラル（1e+10）を含む式の除算判定・trailing コメント除去は従来通り機能する', () => {
  assert.equal(
    stripComments("const a = 1e+10 / 2 // c\n"),
    "const a = 1e+10 / 2\n",
  )
  assert.equal(
    stripComments("const b = 1e-5 / 2 // c\n"),
    "const b = 1e-5 / 2\n",
  )
})

test('16 進リテラル直後のプロパティアクセス（0x10.in）を末尾ドット数値と誤同一視しない', () => {
  assert.equal(
    stripComments("const a = 0x10.in / 2 + 'http://keep' // c\n"),
    "const a = 0x10.in / 2 + 'http://keep'\n",
  )
})

test('小数リテラル直後のプロパティアクセス（1.5.in）を末尾ドット数値と誤同一視しない', () => {
  assert.equal(
    stripComments("const a = 1.5.in / 2 + 'http://keep' // c\n"),
    "const a = 1.5.in / 2 + 'http://keep'\n",
  )
})

test('先頭ドット小数リテラル直後のプロパティアクセス（.5.in）を末尾ドット数値と誤同一視しない', () => {
  assert.equal(
    stripComments("const a = .5.in / 2 + 'http://keep' // c\n"),
    "const a = .5.in / 2 + 'http://keep'\n",
  )
})

// Issue #455 codex P1（PR #456 レビュー指摘）の回帰固定: 数字終わり識別子直後の `.` 判定
// （wordPrevRaw のチェック）が \p{L}\p{Nl}_$ のみを識別子継続文字として認識しており、
// 結合文字（Mn/Mc。分解形の á = 'a' + U+0301 等）・ZWNJ（U+200C）・ZWJ（U+200D）・
// 非 BMP 識別子文字（サロゲートペア）を継続文字と判定できず、それらに隣接する数字を
// 末尾ドット数値（`1.`）と誤同一視していた。誤同一視すると `.` 後続のプロパティアクセス
// （`in`）が keywordProperty=false になり、後続 `/` が regex と誤読されて閉じ `/` 探索が
// 文字列リテラル内の `/`（`http://`）を飲み込み、trailing コメントが除去されない
// （コメント除去契約違反）。
test('結合文字（分解形 á = a + U+0301）に隣接する数字直後のプロパティアクセスを末尾ドット数値と誤同一視しない', () => {
  const src = "const x = á1.in / 2 + 'http://keep' // c\n"
  const expected = "const x = á1.in / 2 + 'http://keep'\n"
  assert.equal(stripComments(src), expected)
})

test('ZWNJ（U+200C）に隣接する数字直後のプロパティアクセスを末尾ドット数値と誤同一視しない', () => {
  const src = "const x = a‌1.in / 2 + 'http://keep' // c\n"
  const expected = "const x = a‌1.in / 2 + 'http://keep'\n"
  assert.equal(stripComments(src), expected)
})

test('ZWJ（U+200D）に隣接する数字直後のプロパティアクセスを末尾ドット数値と誤同一視しない', () => {
  const src = "const x = a‍1.in / 2 + 'http://keep' // c\n"
  const expected = "const x = a‍1.in / 2 + 'http://keep'\n"
  assert.equal(stripComments(src), expected)
})

test('非 BMP 識別子文字（サロゲートペア。数学用太字大文字 A U+1D400）に隣接する数字直後のプロパティアクセスを末尾ドット数値と誤同一視しない', () => {
  const src = "const x = \u{1D400}1.in / 2 + 'http://keep' // c\n"
  const expected = "const x = \u{1D400}1.in / 2 + 'http://keep'\n"
  assert.equal(stripComments(src), expected)
})

// Issue #455 codex P1（PR #456 レビュー指摘・2 巡目）の回帰固定: wordPrevRaw は「識別子中に
// 実際に出現した文字」のみを見ており、ECMAScript の Unicode コードポイントエスケープ
// （`\u{H...}` / `\uHHHH`）で書かれた識別子文字は認識できなかった。エスケープは `\` `{` `}`
// を含み isWordChar（ASCII のみ）が単語境界と誤認するため、`\u{1D400}1` の `1` が新規単語
// 開始と誤認され、直後の `.` が末尾ドット数値と誤同一視されていた（上のサロゲートペア回帰は
// 実際の非 BMP 文字が直接書かれたソースのみをカバーしており、エスケープ表記は未カバーだった）
test('Unicode コードポイントエスケープ（\\u{H...}）で書かれた識別子直後の数字とプロパティアクセスを末尾ドット数値と誤同一視しない', () => {
  const src = "const x = \\u{1D400}1.in / 2 + 'http://keep' // c\n"
  const expected = "const x = \\u{1D400}1.in / 2 + 'http://keep'\n"
  assert.equal(stripComments(src), expected)
})

test('Unicode コードポイントエスケープ（\\uHHHH 固定4桁）で書かれた識別子直後の数字とプロパティアクセスを末尾ドット数値と誤同一視しない', () => {
  const src = "const x = \\u0041\\u0042" + "1.in / 2 + 'http://keep' // c\n"
  const expected = "const x = \\u0041\\u0042" + "1.in / 2 + 'http://keep'\n"
  assert.equal(stripComments(src), expected)
})

test('Unicode コードポイントエスケープの識別子は {} 深度カウントの対象にならない（エスケープ内の { } はブロック境界ではない）', () => {
  const src = 'function f() { const \\u{1D400} = 1; return \\u{1D400} }\n'
  assert.equal(stripComments(src), src)
})

test('キーワード本体（in）直後の regex は保持される', () => {
  const src = 'for (const k in /x[/]y/.source) {}\n'
  assert.equal(stripComments(src), src)
})

test('エスケープされたスラッシュを含む regex を保持する', () => {
  const src = 'const re = /https:\\/\\/[a-z]+/\n'
  assert.equal(stripComments(src), src)
})

test('除算を regex と誤認して後続の trailing コメントを取り逃さない', () => {
  assert.equal(stripComments('const x = a / b // comment\n'), 'const x = a / b\n')
})

test('regex フラグ直後の除算も正しく除算として扱う', () => {
  assert.equal(stripComments('const x = /a/g // c\n'), 'const x = /a/g\n')
})

// PR #452 codex P2 / Bugbot Medium の回帰固定: `}` や後置 `++` / `--` の直後の `/` を
// regex 開始と誤認すると、(a) 後続の行コメントの先頭 `/` を regex の閉じとして素通しして
// コメントが生成物に残留し、(b) 最悪は閉じ `/` 探索が行内の文字列開始を飲み込んで
// 非コメントのコードを書き換える。これらを除算として扱うことを固定する。
test('} 直後の除算に続く trailing コメントを除去する', () => {
  assert.equal(stripComments('const x = {} / 2 // remove me\n'), 'const x = {} / 2\n')
})

test('後置 ++ / -- 直後の除算に続く trailing コメントを除去する', () => {
  assert.equal(stripComments('const y = x++ / 2 // remove me\n'), 'const y = x++ / 2\n')
  assert.equal(stripComments('const z = x-- / 2 // remove me\n'), 'const z = x-- / 2\n')
})

test('} 直後の除算行にある後続文字列を書き換えない（regex 誤読でクォートを飲み込まない）', () => {
  assert.equal(
    stripComments("const x = {} / 2 + 'http://keep' // c\n"),
    "const x = {} / 2 + 'http://keep'\n",
  )
})

test('ブロックコメントは内部の改行を保持して除去される（行番号維持）', () => {
  assert.equal(stripComments('const a = 1\n/*\n block\n*/\nconst b = 2\n'), 'const a = 1\n\n\n\nconst b = 2\n')
})

test('ブロックコメント除去でトークンが連結しない', () => {
  assert.equal(stripComments('const/*x*/y = 1\n'), 'const y = 1\n')
})

// PR #452 codex P1 の回帰固定: 空白挿入を単語文字同士に限ると、演算子連結（`x+/*c*/+y` →
// `x++y` は加算がインクリメントへ変わる）や数値と `.` の連結（`1/*c*/.toString()` →
// `1.toString()` は構文エラー）で「コメントのみを除去する」契約が破れる。ブロックコメントは
// 常に空白 1 個へ置換して全トークン境界を保持することを固定する。
test('ブロックコメント除去で演算子が連結しない（+ /*c*/ + がインクリメントにならない）', () => {
  assert.equal(stripComments('const z = x+/*c*/+y\n'), 'const z = x+ +y\n')
})

test('ブロックコメント除去で数値と . が連結しない（1/*c*/.toString() の構文破壊防止）', () => {
  assert.equal(stripComments('const s = 1/*c*/.toString()\n'), 'const s = 1 .toString()\n')
})

test('行末ブロックコメントの置換空白は行末に残らない（trim_trailing_whitespace 準拠）', () => {
  assert.equal(stripComments('const a = 1 /* c */\nconst b = 2\n'), 'const a = 1\nconst b = 2\n')
})

test('末尾ドット数値直後の除算に続く trailing コメントを除去する', () => {
  assert.equal(stripComments('const a = 1. / 2 // c\n'), 'const a = 1. / 2\n')
})

test('末尾ドット数値直後の除算行の後続文字列を書き換えない（regex 誤読でクォートを飲み込まない）', () => {
  assert.equal(
    stripComments("const a = 1. / 2 + 'http://keep' // c\n"),
    "const a = 1. / 2 + 'http://keep'\n",
  )
})

test('spread `...` 直後の regex は保持される（末尾ドット数値の除算判定に巻き込まない）', () => {
  const src = 'const r = [.../a[/]b/.exec(s)]\n'
  assert.equal(stripComments(src), src)
})

test('ブロックコメント直後の識別子が直前の単語と連結して keyword 判定を壊さない', () => {
  assert.equal(stripComments('const b = x/*c*/in /[/]/ // note\n'), 'const b = x in /[/]/\n')
})

// コード行の先頭インデント除去（サイズ予算確保。改行は触らず行番号を保つ）
test('インデントされたコード行は先頭の空白が除去される', () => {
  assert.equal(stripComments('function f() {\n  if (x) {\n    y()\n  }\n}\n'), 'function f() {\nif (x) {\ny()\n}\n}\n')
})

test('タブインデントも除去される', () => {
  assert.equal(stripComments('a()\n\t\tb()\n \t c()\n'), 'a()\nb()\nc()\n')
})

test('コメントだけの行・インデント付きコメントだけの行は完全な空行になる', () => {
  assert.equal(stripComments('a()\n    // c\n  /* d */\nb()\n'), 'a()\n\n\nb()\n')
})

test('複数行ブロックコメントは完全な空行になり、閉じ後のコードの先頭にも空白が残らない', () => {
  assert.equal(stripComments('a()\n  /* x\n     y\n  */ b()\n'), 'a()\n\n\nb()\n')
})

test('インデント + 行末コメントは先頭・末尾とも空白が残らない', () => {
  assert.equal(stripComments('    const a = 1  // c\n'), 'const a = 1\n')
})

test('空白だけの行は完全な空行になる', () => {
  assert.equal(stripComments('a()\n    \n\t\nb()\n'), 'a()\n\n\nb()\n')
})

test('複数行テンプレートリテラルの継続行（インデント付き）は 1 バイトも変わらない', () => {
  const src = 'const p = `\n  line1\n\tline2\n    bash:\n      echo hi\n`\n'
  assert.equal(stripComments(src), src)
})

test('テンプレート閉じ直後の行のインデントは除去される（モード復帰）', () => {
  assert.equal(stripComments('const p = `\n  a\n`\n  next()\n'), 'const p = `\n  a\n`\nnext()\n')
})

test('テンプレート ${} 内で改行した行頭インデントも保守側で除去しない（テンプレート内は一切不変）', () => {
  const src = 'const p = `a ${\n    foo(\n      1)\n  } b\n  c`\n  after()\n'
  assert.equal(stripComments(src), 'const p = `a ${\n    foo(\n      1)\n  } b\n  c`\nafter()\n')
})

test('ネストしたテンプレートの継続行も不変', () => {
  const src = 'const p = `x ${cond ? `\n   in\n` : z}\n   tail`\n'
  assert.equal(stripComments(src), src)
})

test('エスケープされたバッククォートでテンプレートが閉じたと誤認しない', () => {
  const src = 'const p = `a \\`\n   still template \\` x\n`\n  after()\n'
  assert.equal(stripComments(src), 'const p = `a \\`\n   still template \\` x\n`\nafter()\n')
})

test('シングルクォート文字列内のバッククォートでテンプレートが開いたと誤認しない', () => {
  assert.equal(stripComments("const a = '`a'\n  b()\n    c()\n"), "const a = '`a'\nb()\nc()\n")
})

test('文字列リテラルの \\ 改行継続の継続行は除去しない', () => {
  const src = "const s = 'abc\\\n    def'\n  after()\n"
  assert.equal(stripComments(src), "const s = 'abc\\\n    def'\nafter()\n")
})

test('正規表現リテラル直後の行のインデントは除去される', () => {
  assert.equal(stripComments('const r = /a b/\n    r.test(s)\n'), 'const r = /a b/\nr.test(s)\n')
})

test('入力と出力の行数（改行数）が同一', () => {
  const src = [
    'function f() {', '  // c', '  /* a', '     b */ g()', '  const p = `', '    keep', '  `', '\tx()', '',
  ].join('\n')
  const out = stripComments(src)
  assert.equal(out.split('\n').length, src.split('\n').length)
})

test('冪等性: インデント除去後の出力へ再適用しても不変', () => {
  const once = stripComments('f(() => {\n    const t = `\n  a\n`\n  /* c */ g()\n})\n')
  assert.equal(stripComments(once), once)
})

test('冪等性: 除去済みソースへ再適用しても不変', () => {
  const once = stripComments("const a = 1 // c\nconst u = 'http://x'\n")
  assert.equal(stripComments(once), once)
})

// ---------------------------------------------------------------------------
// (d) 空白除去（squeezeSpaces）
// ---------------------------------------------------------------------------

test('許可リスト: 詰めてよい組（括弧・区切り・引用符の隣、単語と記号の隣、区切りを含む記号どうし）', () => {
  const squeezable = [
    ['a', '('], [')', 'b'], ['(', 'x'], ['x', ')'], [',', 'y'], [';', 'z'], ['{', 'k'], ['}', 'e'], ['t', '['],
    ['a', '='], ['=', 'b'], ['a', '+'], ['+', 'b'], ['a', '?'], ['?', 'b'], ['b', ':'], [':', 'c'], ['a', '<'],
    ['=', '1'], ['<', '1'], ['*', '2'], // 符号以外の記号の後ろの数字
    ['"', '"'], ['"', '+'], ['+', '"'],
    ['n', '"'], ['"', 'i'], ["'", 'x'], ['`', 'x'], ['=', '`'],
    // 記号どうしは片方が ( ) [ ] { } , ; のときだけ
    ['=', '('], [')', '='], ['+', '('], [')', '+'], ['!', '('], ['(', '!'], ['(', '-'], ['(', '+'], ['}', '+'],
    [']', '='], [',', '!'], [',', '-'], [';', '+'], ['(', ')'], ['{', '}'], ['>', ')'], ['=', '['], ['?', '{'],
  ]
  for (const [prev, next] of squeezable) {
    assert.equal(shouldSqueezeSpace(prev, next), true, `${prev} ${next} は詰めてよい`)
  }
})

test('許可リスト: 詰めてはいけない組（連結すると別トークンになる・意味が変わる・判断できない）', () => {
  const kept = [
    ['a', 'b'], ['1', 'a'], ['_', '$'], // 単語文字同士
    ['+', '+'], ['+', '-'], ['-', '-'], ['-', '+'], // `+ +` `+ ++` `- --` の先頭 2 文字
    ['*', '*'], ['&', '&'], ['|', '|'], ['?', '?'], ['<', '<'], ['>', '>'], ['=', '='], ['=', '>'], ['!', '='],
    ['<', '!'], ['!', '-'], ['-', '>'], ['<', '-'], // `<!--` `-->`（script では HTML 風コメントの開始・終了）
    ['=', '!'], ['&', '!'], ['=', '-'], ['+', '!'], ['=', '+'], ['=', '~'], ['!', '~'], ['+', '~'], ['*', '-'], // 記号どうし
    ['?', '.'], // `?.5`
    ['1', '.'], ['.', '5'], ['.', 'a'], ['+', '.'], ['=', '.'], ['.', '('], ['.', '.'], // `.` の前後（直前が `.` は常に残す）
    ['n', '.'], ['x', '.'], ['F', '.'], ['a', '.'], // 直後が `.` は常に残す（`return .5` が `return.5` にならない）
    [',', '.'], ['(', '.'], ['"', '.'], ['}', '.'], [')', '.'], [']', '.'], ['`', '.'], [';', '.'], // 直後が `.` なら直前が区切り・引用符でも残す
    ['1', '+'], ['9', '-'], ['e', '+'], ['E', '-'], ['e', '.'], // 直前が数字・e・E で直後が + - .（`1e +2` `1.e + 2` `1 .toString()`）
    ['+', '2'], ['-', '2'], ['+', '0'], ['-', '9'], // 符号の直後の数字（`1e+ 2`）
    ['a', '/'], ['/', 'a'], [')', '/'], ['/', '/'], ['*', '/'], ['/', '*'], // `/` の前後
    ['é', 'a'], ['a', 'é'], ['\\', 'a'], ['a', '\\'], ['#', 'a'], ['@', 'a'], // 分類なし
    ['', 'a'], ['a', ''], [undefined, 'a'], ['a', undefined],
  ]
  for (const [prev, next] of kept) {
    assert.equal(shouldSqueezeSpace(prev, next), false, `${prev} ${next} は詰めない`)
  }
})

test('空白除去: 括弧・区切り・演算子の隣の空白を詰める', () => {
  assert.equal(squeezeSpaces('const a = 1\n'), 'const a=1\n')
  assert.equal(squeezeSpaces('f(a, b)\n'), 'f(a,b)\n')
  assert.equal(squeezeSpaces('if (x) { y() } else { z() }\n'), 'if(x){y()}else{z()}\n')
  assert.equal(squeezeSpaces('const o = { a: 1, b: -1 }\n'), 'const o={a:1,b: -1}\n') // 記号どうし（`: -`）は残す
  assert.equal(squeezeSpaces('const f = (a) => a + b\n'), 'const f=(a)=>a+b\n')
  assert.equal(squeezeSpaces('const v = c ? b : d\n'), 'const v=c?b:d\n')
  assert.equal(squeezeSpaces('const w = a && !b || ~c\n'), 'const w=a&& !b|| ~c\n')
  assert.equal(squeezeSpaces("switch (k) { case 'a': return -1 }\n"), "switch(k){case'a':return-1}\n")
})

test('空白除去: 単語文字同士の空白は残す', () => {
  assert.equal(squeezeSpaces('const x = a in o\n'), 'const x=a in o\n')
  assert.equal(squeezeSpaces('return typeof x\n'), 'return typeof x\n')
})

test('空白除去: 連続する空白・タブは詰めるか 1 個に畳む', () => {
  assert.equal(squeezeSpaces('const   x  =\t1\n'), 'const x=1\n')
  assert.equal(squeezeSpaces('return \t x\n'), 'return x\n')
})

test('空白除去: 連結すると別トークンになる組は詰めない（+ + / + ++ / - - / - --）', () => {
  assert.equal(squeezeSpaces('const a = b + +c\n'), 'const a=b+ +c\n')
  assert.equal(squeezeSpaces('const a = b + ++c\n'), 'const a=b+ ++c\n')
  assert.equal(squeezeSpaces('const a = b - -c\n'), 'const a=b- -c\n')
  assert.equal(squeezeSpaces('const a = b - --c\n'), 'const a=b- --c\n')
  assert.equal(squeezeSpaces('const a = b++ + c\n'), 'const a=b++ +c\n')
})

test('空白除去: <!-- を作らない（< と ! の間は詰めない）', () => {
  const out = squeezeSpaces('const a = b < !--c\n')
  assert.equal(out, 'const a=b< !--c\n')
  assert.ok(!out.includes('<!--'))
})

test('空白除去: / の前後は詰めない（除算・正規表現・コメント開始の誤生成防止）', () => {
  assert.equal(squeezeSpaces('const q = a / b\n'), 'const q=a / b\n')
  assert.equal(squeezeSpaces('const r = /ab/ .test(s)\n'), 'const r= /ab/ .test(s)\n')
  assert.equal(squeezeSpaces('const t = a * /b/.source.length\n'), 'const t=a* /b/.source.length\n')
})

test('空白除去: 除算（または除算と誤読された正規表現）がある行は残りの空白を詰めない', () => {
  // `if (x)` 直後の `/` は除算側に倒される（`)` `}` 直後の曖昧さ）。実際は正規表現でも、
  // その内部の空白（`a (b)`）を詰めて正規表現を壊さない
  assert.equal(squeezeSpaces('if (x) /a (b)/.test(s)\n'), 'if(x) /a (b)/.test(s)\n')
  // 次の行は影響を受けず詰める
  assert.equal(squeezeSpaces('if (x) /a (b)/.test(s)\nconst z = 1\n'), 'if(x) /a (b)/.test(s)\nconst z=1\n')
})

test('空白除去: 数値の後の . は詰めない（1 .toString()）、? . 数値（a ? .5 : b）も ?.5 にしない', () => {
  assert.equal(squeezeSpaces('const s = 1 .toString()\n'), 'const s=1 .toString()\n')
  const out = squeezeSpaces('const n = a ? .5 : b\n')
  assert.equal(out, 'const n=a? .5:b\n')
  assert.ok(!out.includes('?.5'))
})

test('空白除去: 語の直後の .5 は詰めない（return .5 を return.5 にしない。トークン列は変わらないが Bugbot が誤検出した形）', () => {
  assert.equal(squeezeSpaces('function f() { return .5 }\n'), 'function f(){return .5}\n')
  assert.equal(squeezeSpaces('const a = typeof .5\n'), 'const a=typeof .5\n')
  assert.equal(squeezeSpaces('const a = x in .5\n'), 'const a=x in .5\n')
  assert.equal(squeezeSpaces('const a = b + .5\n'), 'const a=b+ .5\n')
  const cases = ['return .5\n', 'x = typeof .5\n', 'x = a in .5\n', 'x = b + .5\n', 'x = [a, ...b]\n'].map((code) => ({
    name: JSON.stringify(code), before: code, after: squeezeSpaces(code), lenient: true,
  }))
  assert.deepEqual(compareTokensWithTokenizer(cases).filter((r) => !r.ok), [])
})

test('空白除去: spread の ... の前の空白は残す（直後が . の規則）', () => {
  // 直後が `.` なら詰めない規則に従い、`, ...` の空白は残る（`(...args` のように空白の無い箇所は元のまま）
  assert.equal(squeezeSpaces('const a = [x, ...y]\n'), 'const a=[x, ...y]\n')
  assert.equal(squeezeSpaces('f(...args, ...more)\n'), 'f(...args, ...more)\n')
})

test('空白除去: 文字列リテラル内の空白は 1 バイトも変えない', () => {
  assert.equal(squeezeSpaces(`const s = 'a  +  b' + "x  (y)  =  z"\n`), `const s='a  +  b'+"x  (y)  =  z"\n`)
})

test('空白除去: テンプレートリテラル（本文・${} 式内・ネスト）は 1 バイトも変えない', () => {
  const t = 'const t = `a  b ${ c  +  d } e  ${ f ? `g  h ${ i  +  j }` : k }  l`\n'
  assert.equal(squeezeSpaces(t), 'const t=`a  b ${ c  +  d } e  ${ f ? `g  h ${ i  +  j }` : k }  l`\n')
})

test('空白除去: テンプレートリテラルの直後の空白は詰める（モード復帰）', () => {
  assert.equal(squeezeSpaces('const t = `a  b` + c  + `d`\n'), 'const t=`a  b`+c+`d`\n')
})

test('空白除去: 正規表現リテラル内の空白とエスケープは 1 バイトも変えない', () => {
  assert.equal(squeezeSpaces('const r = /a  (b)  \\//g.test(s)\n'), 'const r= /a  (b)  \\//g.test(s)\n')
  assert.equal(squeezeSpaces('const r = [x, /a  [ ]  b/]\n'), 'const r=[x, /a  [ ]  b/]\n')
})

test('空白除去: 行末の空白は残らず、改行と行数は保持される', () => {
  const src = 'foo(a)  \nbar( b )\n\n  baz()\n'
  const out = squeezeSpaces(src)
  assert.equal(out, 'foo(a)\nbar(b)\n\nbaz()\n')
  assert.equal(out.split('\n').length, src.split('\n').length)
})

test('空白除去: Unicode エスケープ識別子の閉じ } と単語文字を連結しない', () => {
  assert.equal(squeezeSpaces('const x = \\u{61} in o\n'), 'const x= \\u{61} in o\n')
  assert.equal(squeezeSpaces('const y = {} in o\n'), 'const y={}in o\n') // 通常の } は詰める
})

test('空白除去: 非 ASCII 識別子の隣は詰めない（return é が returné にならない）', () => {
  assert.equal(squeezeSpaces('return é\n'), 'return é\n')
  assert.equal(squeezeSpaces('const x = é + 1\n'), 'const x= é + 1\n')
})

test('空白除去: 数値の指数部になる並び（1e +2）は詰めない', () => {
  // 隣接 2 文字だけで決める（e の前が数字かどうかは見ない）ので、変数 e の後ろも保守的に残す
  assert.equal(squeezeSpaces('const a = 1e + 2\n'), 'const a=1e + 2\n')
  assert.equal(squeezeSpaces('const b = e + 2\n'), 'const b=e + 2\n')
})

test('空白除去: ブロックコメントの置換空白が詰め残しにならず冪等', () => {
  const out = squeezeSpaces('foo(/*c*/ x, /* d */ y)\n')
  assert.equal(out, 'foo(x,y)\n')
  assert.equal(squeezeSpaces(out), out)
})

test('空白除去: stripComments は既定では空白を詰めない（既存契約を変えない）', () => {
  assert.equal(stripComments('const a = f(b, c)\n'), 'const a = f(b, c)\n')
})

test('空白除去: 冪等（再適用しても不変）', () => {
  const src = [
    'function f(a, b) {',
    '  const t = `x  ${ a  +  b }`',
    '  if (a < !--b) return a + +b - --a',
    '  return /a  (b)/.test(t) ? 1 .toString() : "s  s"',
    '}',
    '',
  ].join('\n')
  const once = squeezeSpaces(src)
  assert.equal(squeezeSpaces(once), once)
  assert.equal(stripComments(once, { squeezeSpaces: true }), once)
})

test('空白除去: 行数（改行数）を保持する', () => {
  const src = 'a ( 1 )\n\n/* x\n y */ b ( 2 )\n`t\n  u`\n  c ( 3 )'
  assert.equal(squeezeSpaces(src).split('\n').length, src.split('\n').length)
})

// acorn（Node 同梱の解析器）で、変換前後のトークン列（種類・テキスト・開始行）が一致することを検証する。
// acorn は `node --expose-internals` の子プロセスでしか読めないため scripts/token-diff.cjs（ビルダーの
// ビルド時照合と共用）経由で呼ぶ。読み込めない環境でも skip せず fail する（fail-closed: 検証が静かに
// 無効化されて「トークン列一致」の保証が消えるのを防ぐ）。
//
// 比較は 2 通りで、取り違えないよう関数を分ける:
// - compareTokensWithParser（mode: parse）: acorn.parse の onToken。ビルドと --check が使うのと同じ照合で、
//   パーサ文脈つき。lexer と同じ位置で `/` を誤読して「同じ誤読」で一致することがない。構文エラーの入力は
//   比べられない（source-unparsable / artifact-unparsable になる）
// - compareTokensWithTokenizer（mode: tokenize）: acorn.tokenizer 単体。パーサ文脈を持たないので `/` の読みが
//   lexer と同じ誤読をし得る（このため「トークンの羅列」のような構文エラーの入力を大量に比べる生成的テストと
//   変異テスト専用で、ビルドの判定には使わない）
const runTokenDiff = (mode, cases) => {
  const r = spawnSync(process.execPath, ['--expose-internals', TOKEN_DIFF_HELPER], {
    input: JSON.stringify(cases.map((c) => ({ ...c, mode }))),
    encoding: 'utf8',
    maxBuffer: 1 << 28,
  })
  assert.equal(r.status, 0, `acorn によるトークン比較の子プロセスが失敗（status ${r.status}）: ${r.stderr}`)
  const { results } = JSON.parse(r.stdout)
  assert.equal(results.length, cases.length)
  return results
}
// 非同期版: 同じ子プロセスを同時に走らせて待ちを重ねる（変異テスト用。入力・判定は runTokenDiff と同じ）
const runTokenDiffAsync = async (mode, cases) => {
  const r = await spawnAsync(process.execPath, ['--expose-internals', TOKEN_DIFF_HELPER], { input: JSON.stringify(cases.map((c) => ({ ...c, mode }))) })
  assert.equal(r.status, 0, `acorn によるトークン比較の子プロセスが失敗（status ${r.status}）: ${r.stderr}`)
  const { results } = JSON.parse(r.stdout)
  assert.equal(results.length, cases.length)
  return results
}
const compareTokensWithTokenizer = (cases) => runTokenDiff('tokenize', cases)
const compareTokensWithParser = (cases) => runTokenDiff('parse', cases)

test('トークン列一致（acorn）: 固定ケースで変換前後のトークンの種類・値・行が一致する', () => {
  const snippets = [
    'const a = 1\n',
    'if (x) { y() } else { z() }\n',
    'const o = { a: 1, b: -1, ...c }\n',
    'const f = (a) => a + 1\n',
    'const v = c ? b : d\n',
    'const n = a ? .5 : b\n',
    'const s = 1 .toString()\n',
    'const q = a / b / c\n',
    'const r = /a  (b)  \\//g.test(s) + 1\n',
    'const a = b + +c - -d + ++e - --f\n',
    'const a = b++ + c-- - d\n',
    'const z = b < !--c\n',
    'const w = (a && !b || ~c) ?? d\n',
    'const e1 = e + 2\n',
    "switch (k) { case 'a': return -1; default: return +x }\n",
    'const s = \'a  +  b\' + "x  (y)  =  z"\n',
    'const t = `a  b ${ c  +  d } e  ${ f ? `g  h ${ i  +  j }` : k }  l`\n',
    'const t = `a  b` + c  + `d`\n',
    'const x = \\u{61} in o\n',
    'for (const k of [1, 2]) { sum += k * 2 ** 3 }\n',
    'a = b ? c : d ? e : f\n',
    'x = a ? -1 : +1\n',
    'async function g() { await h(); return typeof (await i) }\n',
    'class A extends B { static #p = 1; get x() { return this.#p } }\n',
    'label: for (;;) { break label }\n',
    'x = y\n  ? z\n  : w\n',
    'foo(/*c*/ x, /* d */ y) // tail\n',
  ]
  const cases = snippets.map((code) => ({ name: JSON.stringify(code), before: code, after: squeezeSpaces(code) }))
  assert.deepEqual(compareTokensWithTokenizer(cases).filter((r) => !r.ok), [])
  // パーサ文脈つきの照合でも一致する（トップレベルの return を含む `switch` の一行は関数に包む）
  const wrapped = cases.map((c) => ({ ...c, before: `async function w() {\n${c.before}}\n`, after: `async function w() {\n${c.after}}\n` }))
  const unparsable = compareTokensWithParser(wrapped).filter((r) => !r.ok)
  assert.deepEqual(unparsable, [])
})

test('トークン列一致（acorn）: 実ファイル implement-issue-tree.src.js と生成物の全トークンが一致する', () => {
  const src = readSrcEmbedded()
  const dist = readFileSync(DIST_PATH, 'utf8')
  // before は生の src（acorn はコメントを読み飛ばす）なので、コメント除去・インデント除去・
  // 空白除去の全体が「トークン列と各トークンの開始行を変えない」ことを独立実装で検証する
  const [result] = compareTokensWithParser([{ name: 'implement-issue-tree', before: src, after: dist }])
  assert.equal(result.ok, true, result.detail)
})

// 下流の同期 PR で Cursor Bugbot が指摘した「詰めるとトークン列が変わる入力」3 種。現在の src には
// 現れないが、ビルダーの規則としては誤りだった。トークン列の比較は module と script の両方で行う
// （token-diff.cjs）。`1e+ 2` のように変換前が構文エラーになる入力は lenient で、例外の有無と
// 例外までのトークンを比べる。
test('Bugbot 指摘 1: `a < ! --b` は詰めて `<!--`（script の HTML 風コメント開始）にしない', () => {
  assert.equal(squeezeSpaces('a < ! --b\n'), 'a< ! --b\n')
  assert.equal(squeezeSpaces('x\n-- > y\n'), 'x\n-- >y\n') // 行頭の `-->` も作らない
  const cases = ['a < ! --b\n', 'a<! --b\n', 'a < !--b\n', 'x\n-- > y\n', 'x\n- -> y\n', 'a - - > b\n'].map((code) => ({
    name: JSON.stringify(code), before: code, after: squeezeSpaces(code), lenient: true,
  }))
  assert.deepEqual(compareTokensWithTokenizer(cases).filter((r) => !r.ok), [])
})

test('Bugbot 指摘 2: `1e+ 2` / `1e- 2`（符号の後ろの空白）を詰めて `1e+2` / `1e-2` にしない', () => {
  assert.equal(squeezeSpaces('x = 1e+ 2\n'), 'x=1e+ 2\n')
  assert.equal(squeezeSpaces('x = 1e- 2\n'), 'x=1e- 2\n')
  const cases = ['x = 1e+ 2\n', 'x = 1e- 2\n', 'x = 1e + 2\n', 'x = 1E+ 2\n', 'x = 1.5e+ 2\n'].map((code) => ({
    name: JSON.stringify(code), before: code, after: squeezeSpaces(code), lenient: true,
  }))
  assert.deepEqual(compareTokensWithTokenizer(cases).filter((r) => !r.ok), [])
})

test('Bugbot 指摘 3: `1.e + 2`（末尾ドットで単語が切れる形）を詰めて `1.e+2` にしない', () => {
  assert.equal(squeezeSpaces('x = 1.e + 2\n'), 'x=1.e + 2\n')
  const cases = ['x = 1.e + 2\n', 'x = 1.e - 2\n', 'x = 1. e + 2\n', 'x = 1.E + 2\n', 'x = 1.e+ 2\n'].map((code) => ({
    name: JSON.stringify(code), before: code, after: squeezeSpaces(code), lenient: true,
  }))
  assert.deepEqual(compareTokensWithTokenizer(cases).filter((r) => !r.ok), [])
})

// 生成的テスト: 語彙のトークンを空白 1 個で連結した入力を大量に作り、squeezeSpaces の前後でトークン列が
// 一致することを確かめる。個別の穴を塞ぐのではなく、規則（隣接 2 文字だけで決める許可リスト）そのものが
// 保守側に倒れていることの裏づけ。入力はすべて固定シードの擬似乱数か全数列挙で、再現できる。
//
// - 構文エラーになる並び（`1e+` `a ) ( 1.` 等）も含むため lenient（例外の有無と例外までのトークンを
//   比較）で比べる。トークン列の比較は module と script の両方（token-diff.cjs）。
// - `/` は除算と正規表現の判別が字句解析器（本ビルダーの lexer と acorn）で食い違い得る。語彙に `/` を
//   含む文字列・バッククォートや引用符入りの正規表現・非 ASCII 識別子・`if` を入れて、食い違いが残って
//   いないかを調べる。食い違う並びのうち、lexer が決められない `}` の直後と、構文エラーになる `.` `?.` の
//   直後などの「バッククォート・`//`・`/*` 入りの正規表現」は avoidKnownSlashDisagreement で避ける（下のコメント参照）。
//   それ以外の食い違いは、このテストが赤くなって見つかる。誤読で詰めすぎた生成物は、ビルダー自身の
//   ビルド時トークン照合（verifyTokenParity）が止める。
// - 引用符 1 文字だけ・バッククォート 1 文字だけは語彙に入れない（文字列・テンプレートの開始になり、
//   以降を丸ごと文字列として読むため、トークンの隣接を試せなくなる）。完結した文字列リテラルだけ入れる。
//   引用符 1 文字どうしの隣接は、下の「隣接 2 文字の全数検査」が扱う。
// - `<!--` `-->` `//` `/*` は 1 語彙にせず 1 文字ずつ別トークンとして入れる（元の入力では必ず空白で
//   隔てる）。連結すると別トークン・コメントになるかを見たいので。
const GENERATIVE_VOCABULARY = [
  'a', 'x1', '_q', '$', 'e', 'E', 'in', 'typeof', 'return', 'of', '\\u0061', 'é',
  '1', '2', '1.', '.5', '1e', '1e+', '1e-', '1.e', '0x1', '1n', '1_0',
  '+', '-', '++', '--', '!', '~', '<', '>', '=', '=>', '==', '*', '**', '/', '.', '...', '?', '?.', '??', ':', '&', '&&', '|', '||', '%', '^',
  '(', ')', '[', ']', '{', '}', ',', ';',
  "'s p'", '"d"', '`t`', "''", '/r/g',
  // 空白を含む文字列・テンプレート（詰められたら中身が変わる）、`/` を含む文字列、バッククォート・引用符入りの
  // 正規表現（除算と誤読すると以降の文字列・テンプレートの開閉が反転する）、制御構文の括弧を作る語、
  // 非 BMP の識別子（サロゲートペア）
  "'s  p'", '`t  u`', '"a/b"', '/`/', '/"/', 'if', 'while', 'for', 'ok', '\u{1D400}',
  // `//` `/*` を含む正規表現（コメントと誤認するとコードが消える）、行末コメント・ブロックコメント、`await`
  // （`for await (` の括弧）。コメントは語彙の 1 トークンとして入れ、直後のトークンは行末コメントなら消える
  '/[//]/', '/[/*]/', '// c', '/* c */', 'await',
]

// 全数列挙用の中核語彙。長さ 3 の全並びを列挙できる大きさに絞る（`<!--` `-->` 等の 3 トークンの合成と
// 数値の指数部の形を必ず含める）
const GENERATIVE_CORE = [
  'a', 'e', 'E', '1', '2', '1.', '.5', '1e', '1e+', '1.e', '0x1', '1n',
  '+', '-', '++', '--', '!', '~', '<', '>', '=', '=>', '*', '/', '.', '...', '?', '??', ':', '&', '|', '%',
  '(', ')', '[', ']', '{', '}', ',', ';', "'s'", 'in',
  'return', 'é', "'s  p'", '`t  u`', // 語の直後の `.5`、非 ASCII 識別子、空白を含む文字列・テンプレート
]

// mulberry32（固定シードで再現できる 32 ビット擬似乱数）
const mulberry32 = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const GENERATIVE_CASES = 20000
const GENERATIVE_SEED = 20260926

// 「コードを消す・以降の開閉を反転させる」正規表現（バッククォート・`//`・`/*` を含むもの）は、直前が
// 被演算子を取る位置（演算子・開き括弧・区切り・キーワード）のときだけ置く。それ以外では置き換える
// （置き換えるだけで長さは変えない）。
// - 識別子・数値・文字列・`)` `]` の直後は除算で、そこに置くと正規表現ではなく除算＋コード（`/*` なら
//   閉じのないコメント = 構文エラー）になる。除算と読むのは lexer も acorn も同じなので、検査したいことと別
// - `}` の直後: ブロックの終わり（正規表現）かオブジェクトリテラルの終わり（除算）か、lexer では決められず
//   除算側に倒す。解かない制約で、ビルド時のトークン照合（パーサ）が止める（LEXER_SLASH_RESIDUAL）
// - `.` `?.` の直後: プロパティ名が来るべき位置で、正規表現が来る入力は構文エラー
// - 行頭: 前の行の末尾が被演算子なら除算になる（前の行は別に生成されるので分からない）
// - `of` の直後: `for (` の括弧の直下かどうかで正規表現か除算かが変わる（lexer は括弧の種類を見るが、
//   この生成器の行には括弧の対応が無い）
const DANGEROUS_REGEX = new Set(['/`/', '/[//]/', '/[/*]/'])
const OPERAND_EXPECTED_BEFORE = new Set([
  '=', '(', ',', '[', ':', '?', '&&', '||', '??', '!', '~', '+', '-', '*', '%', '<', '>', '==', '=>', '&', '|', '^', '**',
  ';', '{', 'return', 'typeof', 'in',
])
// - 直後が `/` で始まるトークンの `of`: acorn の tokenizer は被演算子の直後の `of` を for-of のキーワードと
//   読んで正規表現を期待する（括弧の対応を見ない）。lexer は `for (` の括弧の直下だけをキーワードとして扱う。
//   括弧の対応が無い生成行では比べられないので `ok` に置き換える（括弧つきは grammar ベースのテストが扱う）
// - 危険な正規表現・コメントを含む行の素の `/` と `?.`: 素の `/` は除算にも正規表現の開始にもなり、周りの語彙と組んで
//   `/*` を閉じのないコメントにしたり、tokenizer と lexer の読みを分けたりする（acorn の tokenizer は `?.` の直後の
//   キーワードを別扱いしない）。`++` `--`: lexer は直前 2 文字が `++` `--` なら後置と読むため `-- - /re/`（後置 `--`
//   の次の二項 `-`）を除算と読む。いずれも構文エラーまたは稀な入力の読みの違いで、検査したいことではないので置き換える
const avoidKnownSlashDisagreement = (rawTokens) => {
  const hasDangerous = rawTokens.some((t) => DANGEROUS_REGEX.has(t) || t === '/* c */' || t === '// c')
  const tokens = hasDangerous ? rawTokens.map((t) => (t === '/' ? '+' : t === '?.' ? '?' : t === '++' ? '*' : t === '--' ? '%' : t)) : rawTokens
  return tokens.map((t, i) => {
    if (DANGEROUS_REGEX.has(t) && !OPERAND_EXPECTED_BEFORE.has(tokens[i - 1])) return 'ok'
    if (t === 'of' && (tokens[i + 1] ?? '').startsWith('/')) return 'ok'
    // `...` の直後のキーワード: lexer は `.` の直後の単語をプロパティ名として扱う（`...in` は構文エラー）
    if ((t === 'in' || t === 'return' || t === 'typeof') && tokens[i - 1] === '...') return 'ok'
    // 行頭・`}` の直後の `/` は、前の行や `}` がブロックの終わりなら正規表現の開始になり得る（lexer は除算側に
    // 倒す。LEXER_SLASH_RESIDUAL）。直後にコメント語彙が続くと読みの違いがコードの消失として現れる
    if (t === '/' && (i === 0 || tokens[i - 1] === '}')) return '+'
    return t
  })
}

const generateLines = (rand) => {
  const lineCount = 1 + Math.floor(rand() * 3)
  return Array.from({ length: lineCount }, () => {
    const len = 2 + Math.floor(rand() * 6)
    return avoidKnownSlashDisagreement(
      Array.from({ length: len }, () => GENERATIVE_VOCABULARY[Math.floor(rand() * GENERATIVE_VOCABULARY.length)]),
    )
  })
}

const linesToSource = (lines) => lines.map((tokens) => tokens.join(' ')).join('\n') + '\n'

const generativeCase = (name, lines) => {
  const code = linesToSource(lines)
  return { name, before: code, after: squeezeSpaces(code), lenient: true }
}

// 失敗した入力を、同じ行の連続するトークンの部分列へ縮めて最小の再現を探す。
// 見つかった最小の入力の変換前後と差の詳細を文字列で返す（縮められなければ元の入力）
const describeFailure = (lines, fallbackDetail) => {
  const candidates = []
  for (const tokens of lines) {
    for (let len = 1; len <= tokens.length; len++) {
      for (let from = 0; from + len <= tokens.length; from++) candidates.push(tokens.slice(from, from + len))
    }
  }
  candidates.sort((x, y) => x.length - y.length)
  const cases = candidates.map((tokens, i) => generativeCase(`#${i}`, [tokens]))
  const results = compareTokensWithTokenizer(cases)
  const at = results.findIndex((r) => !r.ok)
  const shown = at >= 0 ? { c: cases[at], detail: results[at].detail, label: '最小の入力' } : { c: generativeCase('', lines), detail: fallbackDetail, label: '最小化できず' }
  return `${shown.label}: ${JSON.stringify(shown.c.before)} → ${JSON.stringify(shown.c.after)}（${shown.detail}）`
}

test(`生成的テスト: 語彙を空白 1 個で連結したランダムな ${GENERATIVE_CASES} 件で squeezeSpaces の前後のトークン列が一致する（固定シード）`, () => {
  const rand = mulberry32(GENERATIVE_SEED)
  const generated = Array.from({ length: GENERATIVE_CASES }, () => generateLines(rand))
  const cases = generated.map((lines, i) => generativeCase(`#${i}`, lines))
  // 空振り防止: 多くの入力で実際に空白が詰められていること
  const changed = cases.filter((c) => c.before !== c.after).length
  assert.ok(changed > GENERATIVE_CASES * 0.5, `詰めが働いた入力が少なすぎる（${changed}/${GENERATIVE_CASES}）`)
  const failed = compareTokensWithTokenizer(cases).filter((r) => !r.ok)
  if (failed.length > 0) {
    const first = Number(failed[0].name.slice(1))
    assert.fail(`${failed.length}/${GENERATIVE_CASES} 件でトークン列が変化。${describeFailure(generated[first], failed[0].detail)}`)
  }
})

test('生成的テスト: 中核語彙の長さ 3 の全並びを列挙してもトークン列が一致する（`< ! --` `1e+ 2` `1.e + 2` 等の 3 トークン合成）', () => {
  const triples = []
  for (const x of GENERATIVE_CORE) for (const y of GENERATIVE_CORE) for (const z of GENERATIVE_CORE) triples.push([x, y, z])
  const cases = triples.map((tokens, i) => generativeCase(`#${i}`, [tokens]))
  const failed = compareTokensWithTokenizer(cases).filter((r) => !r.ok)
  if (failed.length > 0) {
    const first = Number(failed[0].name.slice(1))
    assert.fail(`${failed.length}/${triples.length} 件でトークン列が変化。${describeFailure([triples[first]], failed[0].detail)}`)
  }
})

test('生成的テスト: 隣接 2 文字の全数検査（ASCII 印字可能 × ASCII 印字可能 × 前置きの文脈）でトークン列が変わらない', () => {
  // shouldSqueezeSpace の入力空間（直前 1 文字 × 直後 1 文字）の全数検査。前に文脈を置いて、直前の
  // 文字が数値・識別子・記号の末尾になる状況を作る。引用符・バッククォート・`/` の 1 文字も含む
  // （文字列や正規表現の開始になっても、変換前後で例外の有無と例外までのトークンが同じであればよい）
  const printable = Array.from({ length: 94 }, (_, i) => String.fromCharCode(33 + i))
  const contexts = ['', '1', '1.', 'a', '1e', 'x1', '0x1']
  const cases = []
  for (const p of printable) {
    for (const q of printable) {
      for (const ctx of contexts) {
        const code = `${ctx}${p} ${q}2\n`
        cases.push({ name: JSON.stringify(code), before: code, after: squeezeSpaces(code), lenient: true })
      }
    }
  }
  const failed = compareTokensWithTokenizer(cases).filter((r) => !r.ok)
  assert.deepEqual(failed.slice(0, 5), [], `${failed.length}/${cases.length} 件でトークン列が変化`)
})

// 文法ベースの生成的テスト: 語彙を空白で連結した入力（上のテスト）は構文エラーのトークンの羅列が多く、
// パーサ文脈つきの照合（ビルドが使うのと同じ）で比べられない。ここでは文・式のテンプレートを組み合わせて
// 構文として成立するプログラムを作り、acorn.parse の onToken で変換前後のトークン列を比べる。tokenizer 単体と違い、
// lexer と同じ位置で `/` を誤読しても「同じ誤読」で一致することがない。acorn.parse が通らない組み合わせ
// （`a ?? b || c` 等）は読み捨て（source-unparsable）、通ったものだけを比べる。固定シードで再現できる。
//
// 狙い: 正規表現内の `//` `/*`・バッククォートの取り違え（コードがコメントとして消える・テンプレートの開閉が
// 反転する）、`for await (` の括弧、`of` を識別子に使う for、private 名・プロパティ名がキーワードと同名の
// 呼び出しの直後の除算、`${}` のネスト、行末・ブロックコメント。
// 避けるもの: 文の先頭が正規表現になる並び（`}` の直後 = LEXER_SLASH_RESIDUAL。文は必ずキーワード・識別子・
// `const` で始め、正規表現は演算子・条件の括弧・`else` の直後にだけ置く）。
const GRAMMAR_PROGRAMS = 4000
const GRAMMAR_SEED = 20261013

const grammarProgram = (rand) => {
  const pick = (xs) => xs[Math.floor(rand() * xs.length)]
  const chance = (p) => rand() < p
  const sp = () => (chance(0.3) ? '  ' : ' ')
  const ATOMS = [
    'a', 'b1', 'of', 'é', '\u{1D400}', '1', '.5', '2.5', '0x1f', 'null', 'this', 's',
    "'s  p'", '"a/b"', '"//"', '"/*"', '`t  u`', '`a/${b1}/c  d`',
  ]
  const REGEXES = ['/[//]/', '/[/*]/g', '/a*/', '/`/', '/"/', "/'/", '/a  b/', '/\\//', '/[`]/', '/[//]*/i']
  const BINOPS = ['+', '-', '*', '/', '%', '&&', '||', '??', '<', '>', '==', 'in', 'instanceof', '**']
  const CALLEES = ['f', 'h', 'o.if', 'o.while', 'o.for', 'o.with', 'o.in', 'o.of', 'this.#if', 'this.#for', 'this.#while', 'this.#with', 'this.#in', 'this.#of']
  const expr = (d) => {
    if (d <= 0 || chance(0.2)) return chance(0.3) ? pick(REGEXES) : pick(ATOMS)
    const e = () => expr(d - 1)
    switch (Math.floor(rand() * 13)) {
      case 0: case 1: case 2: return `${e()}${sp()}${pick(BINOPS)}${sp()}${e()}`
      case 3: case 4: return `${pick(CALLEES)}(${e()}${chance(0.3) ? `,${sp()}${e()}` : ''})`
      case 5: return `(${e()})`
      case 6: return `[${e()},${sp()}${e()}]`
      case 7: return `{ k: ${e()}, ${pick(['if', 'for', 'while', 'of', 'in', 'await'])}: ${e()} }`
      case 8: return `(x) =>${sp()}${e()}`
      case 9: return `${pick(REGEXES)}.test(${e()})`
      case 10: return `${e()} ? ${e()} : ${e()}`
      case 11: return `\`l1\${${e()}}\n  l2  \${${e()}}\``
      default: return `${pick(['typeof', '!', '-', 'await'])} ${pick(ATOMS)}`
    }
  }
  const call = (d) => `${pick(CALLEES)}(${expr(d)})`
  // 文の位置に置ける正規表現（制御構文の本体にだけ使う）
  const regexStatement = (d) => `${pick(REGEXES)}.test(${expr(d)}) && ${call(d)}`
  const simple = (d) => pick([() => `const v${Math.floor(rand() * 9)} = ${expr(d)}`, () => call(d), () => `return ${expr(d)}`])()
  const trailing = () => (chance(0.2) ? pick([' // c', ' /* c */', '  /* c  d */ ']) : '')
  const stmt = (d, ind) => {
    const pad = ' '.repeat(ind)
    const block = () => `{\n${stmts(d - 1, ind + 2)}\n${pad}}`
    const bodyOf = () => {
      const k = Math.floor(rand() * 4)
      if (k === 0) return { text: block(), braces: true }
      if (k === 1) return { text: regexStatement(d - 1), braces: false }
      return { text: simple(d - 1), braces: false }
    }
    const head = Math.floor(rand() * 11)
    if (d <= 0 || head <= 2) return `${pad}${simple(d)}${chance(0.3) ? ';' : ''}${trailing()}`
    const b = bodyOf()
    const tail = b.braces ? '' : ';'
    switch (head) {
      case 3: return `${pad}if (${expr(d - 1)}) ${b.text}${tail}${trailing()}`
      case 4: {
        const c = bodyOf()
        return `${pad}if (${expr(d - 1)}) ${b.text}${tail} else ${c.text}${c.braces ? '' : ';'}${trailing()}`
      }
      case 5: return `${pad}while (${expr(d - 1)}) ${b.text}${tail}`
      case 6: return `${pad}for (let i = 0; i < ${expr(d - 1)}; i++) ${b.text}${tail}`
      case 7: return `${pad}for (const ${pick(['x', 'of'])} of ${pick([expr(d - 1), `${pick(REGEXES)}.exec(s)`, `${pick(REGEXES)}g[Symbol.matchAll](s)`])}) ${b.text}${tail}`
      case 8: return `${pad}for await (const ${pick(['x', 'of'])} of ${pick([expr(d - 1), `${pick(REGEXES)}.exec(s)`, `${pick(REGEXES)}g[Symbol.matchAll](s)`, 'xs'])}) ${b.text}${tail}`
      case 9: {
        // do-while の `)` の直後は ASI で文が終わるので、同じ行に次の文（正規表現で始まってもよい）を置ける
        const follow = chance(0.5) ? ` ${regexStatement(d - 1)}` : ''
        return `${pad}do ${b.braces ? b.text : `{ ${b.text} }`} while (${expr(d - 1)})${follow}${trailing()}`
      }
      default: return `${pad}try ${block()} catch (e) ${block()}`
    }
  }
  const stmts = (d, ind) => Array.from({ length: 1 + Math.floor(rand() * 3) }, () => stmt(d, ind)).join('\n')
  const body = stmts(3, 4)
  return `export const meta = { name: 'x' }\nclass K {\n  #if(x) { return x }\n  #for(x) { return x }\n  #while(x) { return x }\n  #with(x) { return x }\n  #in(x) { return x }\n  #of(x) { return x }\n  async m(of, s, é, xs, a, b1) {\n${body}\n  }\n}\n`
}

test(`文法ベースの生成的テスト: ${GRAMMAR_PROGRAMS} 個のプログラムで squeezeSpaces の前後のトークン列がパーサ文脈つきで一致する（固定シード）`, () => {
  const rand = mulberry32(GRAMMAR_SEED)
  const programs = Array.from({ length: GRAMMAR_PROGRAMS }, () => grammarProgram(rand))
  const results = compareTokensWithParser(programs.map((code, i) => ({ name: `#${i}`, before: code, after: squeezeSpaces(code) })))
  const parsable = results.filter((r) => r.kind !== 'source-unparsable')
  // 空振り防止: 読み捨てが多すぎない・狙いの構文が実際に含まれる
  assert.ok(parsable.length >= GRAMMAR_PROGRAMS * 0.4, `パースできるプログラムが少なすぎる（${parsable.length}/${GRAMMAR_PROGRAMS}）`)
  const used = programs.filter((_, i) => results[i].kind !== 'source-unparsable')
  for (const [label, re] of [
    ['for await', /for await \(/], ['for (const of of', /for \(const of of /], ['正規表現内の //', /\/\[\/\/\]\//], ['正規表現内の /*', /\/\[\/\*\]/],
    ['private 名の呼び出し', /this\.#if\(/], ['do-while', /\bdo \{/], ['if の本体が正規表現', /\) \/[^\n]*\.test\(/], ['行末コメント', / \/\/ c/],
  ]) {
    assert.ok(used.some((p) => re.test(p)), `パースできたプログラムに「${label}」が含まれない（生成器が狙いを外している）`)
  }
  const failed = parsable.filter((r) => !r.ok)
  if (failed.length > 0) {
    const first = Number(failed[0].name.slice(1))
    assert.fail(`${failed.length}/${parsable.length} 件で不一致。最初の例:\n${programs[first]}\n→ ${failed[0].detail}`)
  }
})

// 変異テスト: 「詰めない」規則を 1 項ずつ外した判定関数で squeezeSpaces を走らせ、外すとトークン列が変わる
// 入力が生成的テストの入力空間（中核語彙の長さ 3 の全並び + 隣接 2 文字の全数）から見つかることを確かめる。
// 見つからない規則は、規則そのものが不要か、生成的テストの語彙が足りないかのどちらか（どの規則も他の規則に
// 隠れていない）。規則表そのものを export しているので、テストが規則を再構成せず実物から 1 項ずつ外す。
const mutationCorpus = (() => {
  let cached
  return () => {
    if (cached) return cached
    const codes = []
    for (const x of GENERATIVE_CORE) for (const y of GENERATIVE_CORE) for (const z of GENERATIVE_CORE) codes.push(linesToSource([[x, y, z]]))
    const printable = Array.from({ length: 94 }, (_, i) => String.fromCharCode(33 + i))
    for (const p of printable) for (const q of printable) for (const ctx of ['', '1', '1.', 'a', '1e', 'x1', '0x1']) codes.push(`${ctx}${p} ${q}2\n`)
    cached = codes
    return codes
  }
})()

const withoutRule = (rule) => (prev, next) => shouldSqueezeSpace(prev, next, SQUEEZE_REFUSAL_RULES.filter((r) => r !== rule))

test('変異テスト: 規則表の規則名は重複せず、既定の判定は全規則を使う', () => {
  const names = SQUEEZE_REFUSAL_RULES.map((r) => r.name)
  assert.equal(new Set(names).size, names.length)
  assert.ok(names.length >= 7, `規則が減っている: ${names}`)
  assert.equal(shouldSqueezeSpace('a', 'b', SQUEEZE_REFUSAL_RULES), shouldSqueezeSpace('a', 'b'))
  assert.equal(shouldSqueezeSpace('a', 'b', []), true, '規則を全部外すと単語どうしも詰める判定になる（変異が実際に効く前提）')
})

// 規則ごとの変異は独立で、1 本の大半（約 1.5 秒）は子プロセスでのトークン比較。規則の数だけ同時に走らせる
describe('変異テスト（規則を 1 項ずつ外す）', { concurrency: 16 }, () => {
for (const rule of SQUEEZE_REFUSAL_RULES) {
  test(`変異テスト: 規則 ${rule.name} を外すと、トークン列が変わる入力が見つかる`, async () => {
    const shouldSqueeze = withoutRule(rule)
    const cases = mutationCorpus().map((code) => ({
      name: JSON.stringify(code), before: code, after: squeezeSpaces(code, { shouldSqueeze }), lenient: true,
    }))
    const failed = (await runTokenDiffAsync('tokenize', cases)).filter((r) => !r.ok)
    assert.ok(failed.length > 0, `規則 ${rule.name} を外してもトークン列が変わる入力が無い（規則が効いていないか、入力空間が足りない）`)
  })
}
})

test('変異テスト: 規則 before-dot を外すと return .5 が return.5 になる（トークン列は同じだが見た目を残す規則）', () => {
  const mutant = withoutRule(SQUEEZE_REFUSAL_RULES.find((r) => r.name === 'before-dot'))
  assert.equal(squeezeSpaces('return .5\n', { shouldSqueeze: mutant }), 'return.5\n')
  assert.equal(squeezeSpaces('return .5\n'), 'return .5\n')
  const [r] = compareTokensWithTokenizer([{ name: 'x', before: 'return .5\n', after: 'return.5\n' }])
  assert.equal(r.ok, true, 'return .5 → return.5 はトークン列を変えない（規則を残す理由は見た目だけ）')
})

// ---------------------------------------------------------------------------
// (b) 鮮度ゲート（リポジトリ実体の検証）
// ---------------------------------------------------------------------------

test('実行ファイルは開発ファイルからの再生成結果と byte 一致する（ビルド忘れ・直接編集の検出）', async () => {
  // buildArtifact（行数保持・先頭 meta 宣言・冪等性の検証込み）の結果を実行ファイルと byte 比較するのは --check 自身の判定
  // （runBuild の checkOnly）。読み込み時に始めた実物への --check の結果で確かめる
  const r = await REAL_CHECK
  assert.ok(
    r.status === 0 && /鮮度 ok/.test(r.stdout),
    '実行ファイル implement-issue-tree.js が開発ファイル implement-issue-tree.src.js と同期していない。' +
      '編集は .src.js に対して行い、node skills/implement-issue-tree/scripts/build-workflow.mjs で再生成すること' +
      `（実行ファイルの直接編集は次のビルドで消える）。--check: status ${r.status} / ${r.stdout}${r.stderr}`,
  )
})

test('開発ファイルと実行ファイルの行数が一致する（スタックトレース行番号の突き合わせ契約）', () => {
  const src = readFileSync(SRC_PATH, 'utf8')
  const dist = readFileSync(DIST_PATH, 'utf8')
  assert.equal(src.split('\n').length, dist.split('\n').length)
})

// ---------------------------------------------------------------------------
// (e) ビルド時のトークン照合（fail-closed）
// ---------------------------------------------------------------------------

// lexer の `/` 判別（除算と正規表現）は、直前のトークンだけでは決まらない箇所がある。誤読すると文字列・
// テンプレートの中身を詰めたり、正規表現内のバッククォートでテンプレートの開閉が反転したりする。
// 判別できる範囲は lexer が直し（下の LEXER_SLASH_FIXED）、判別できない範囲は
// ビルド時のトークン照合（verifyTokenParity。acorn.parse の onToken を比べるのでパーサ文脈つき）が止める
// （下の LEXER_SLASH_RESIDUAL）。一時ファイルの開発ファイルをビルダーの CLI（--src / --dist）へ渡して確かめる。
const META_HEADER = "export const meta = { name: 'x' }\n"

// lexer が正しく読む入力: ビルドが通り、文字列・テンプレート・正規表現の中身が 1 バイトも変わらない。
// keep は生成物にそのまま残るべき部分文字列
// 各入力は、1 行目の `/` の判別を誤ると、複数行のテンプレート（2〜3 行目）の中身が壊れるように組んである。
// 正規表現と誤読すると閉じ `/` を `` `/` `` の間に探し、末尾のバッククォートがテンプレートを開いてしまう
// （テンプレートの開閉が反転し、2 行目の改行がコードの改行として扱われて 3 行目が詰められる）。
// 文字列の中身だけなら「行の残りを詰めない」安全策が守るので、この安全策に隠れない形で見る。
const SLASH_PROBE = '`/`\nconst t = `a\n  b  c`\n'
const SLASH_PROBE_KEEP = ['`/`', '`a\n  b  c`']
const LEXER_SLASH_FIXED = {
  'A: 非 ASCII 識別子の直後の除算': {
    text: `${META_HEADER}const x = é / 2 + ${SLASH_PROBE}`,
    keep: SLASH_PROBE_KEEP,
  },
  'A: 非 BMP 識別子（サロゲートペア）の直後の除算': {
    text: `${META_HEADER}const x = \u{1D400} / 2 + ${SLASH_PROBE}`,
    keep: SLASH_PROBE_KEEP,
  },
  'A: 非 ASCII 識別子の末尾に数字が付く形の直後の除算': {
    text: `${META_HEADER}const x = é1 / 2 + ${SLASH_PROBE}`,
    keep: SLASH_PROBE_KEEP,
  },
  'A: 非 ASCII 識別子の途中に非 ASCII が続く形の直後の除算': {
    text: `${META_HEADER}const x = aé / 2 + ${SLASH_PROBE}`,
    keep: SLASH_PROBE_KEEP,
  },
  'A: 文字列の中身も変えない（非 ASCII 識別子の直後の除算）': {
    text: `${META_HEADER}const x = é / 2 + " / a  +  b "\n`,
    keep: ['" / a  +  b "'],
  },
  'A: of の直後の除算（for の括弧の外では識別子）': {
    text: `${META_HEADER}const of = 4\nconst y = of / 2 + ${SLASH_PROBE}`,
    keep: SLASH_PROBE_KEEP,
  },
  'A: for の括弧の中の of の直後の正規表現': {
    text: `${META_HEADER}for (const m of /a  b/g[Symbol.matchAll](s)) { f(m) }\nconst z = 1  +  2\n`,
    keep: ['/a  b/g'],
  },
  'A: for の括弧の中の of の直後の正規表現内のバッククォート': {
    text: `${META_HEADER}for (const m of /\`/g[Symbol.matchAll](s)) { f(m) }\nconst t = \`a\n  b  c\`\n`,
    keep: ['/`/g', '`a\n  b  c`'],
  },
  'A: for の括弧の中で変数 of を除算に使う曖昧な形（正規表現側に読むが行の残りは詰めない）': {
    text: `${META_HEADER}for (let i = 0; i < of / 2 + " / a  +  b "; i++) { f(i) }\n`,
    keep: ['" / a  +  b "'],
  },
  'R1: for await の括弧の直下の of の直後の正規表現内の //（コメントとして削らない）': {
    text: `${META_HEADER}async function f(s) {\n  for await (const m of /[//]/g[Symbol.matchAll](s)) { g(m) }\n}\n`,
    keep: ['/[//]/g'],
    expected: "export const meta={name:'x'}\nasync function f(s){\nfor await(const m of /[//]/g[Symbol.matchAll](s)) { g(m) }\n}\n",
  },
  'R1: 変数名が of のときの for await の括弧の直下の of の直後の正規表現': {
    text: `${META_HEADER}async function f(of) {\n  for await (const of of /[//]/ [0\n  ]) { g(of) }\n}\n`,
    keep: ['/[//]/ [0'],
    expected: "export const meta={name:'x'}\nasync function f(of){\nfor await(const of of /[//]/ [0\n]){g(of)}\n}\n",
  },
  'R1: for await の括弧の直下の of の直後の正規表現内の /* と in': {
    text: `${META_HEADER}async function f(s, of) {\n  for await (const of of /[/*]/.test(s) && /a*/ in /]/) { g(of) }\n}\n`,
    keep: ['/[/*]/.test(s)', '/a*/ in /]/'],
    expected: "export const meta={name:'x'}\nasync function f(s,of){\nfor await(const of of /[/*]/.test(s) && /a*/ in /]/) { g(of) }\n}\n",
  },
  'R1: for await の括弧の直後の本文が正規表現': {
    text: `${META_HEADER}async function f(xs) {\n  for await (const a of xs) /[//]/.test(a) && g(a)\n}\n`,
    keep: ['/[//]/.test(a) && g(a)'],
    expected: "export const meta={name:'x'}\nasync function f(xs){\nfor await(const a of xs) /[//]/.test(a) && g(a)\n}\n",
  },
  'R1: await が単独の式のとき（for の直後でない）は括弧の直後の / を除算と読む': {
    text: `${META_HEADER}async function f(a) {\n  return await (a) / 2 + "//" + " a  b "\n}\n`,
    keep: ['"//"', '" a  b "'],
  },
  'await の直後の正規表現内の //（await は正規表現の前置キーワード）': {
    text: `${META_HEADER}async function f(s) {\n  return await /[//]/.test(s)\n}\n`,
    keep: ['await /[//]/.test(s)'],
  },
  'yield の直後の正規表現内の //（yield は正規表現の前置キーワード）': {
    text: `${META_HEADER}function* g(s) {\n  yield /[//]/.exec(s)\n}\n`,
    keep: ['yield /[//]/.exec(s)'],
  },
  'await が単独の式（for の直後でない）の括弧の直後の / は除算で、以降のテンプレートの開閉を反転させない': {
    text: `${META_HEADER}async function f(a) {\n  return await (a) / 2 + \`/\`\n}\nconst t = \`a\n  b  c\`\n`,
    keep: ['await(a) / 2 + `/`', '`a\n  b  c`'],
  },
  'for の括弧の中の波括弧（オブジェクトリテラル）の中の of は識別子': {
    text: `${META_HEADER}function f(s, of) {\n  for (const p of {k: of / \`/x//y\`}.k) { g(\`//\`) }\n}\n`,
    keep: ['of / `/x//y`', '`//`'],
  },
  '} の直後の普通の正規表現（クォート・空白・文字クラスを含む）はビルドできる': {
    text: `${META_HEADER}function f(s) {\n  if (a) { b() }\n  /re/.test(s)\n  if (a) { b() }\n  /"/.test(s) && c()\n  if (a) { b() }\n  /a  b/.test(s)\n  if (a) { b() }\n  /[ab]/.test(s)\n  return 1\n}\n`,
    keep: ['/re/.test(s)', '/"/.test(s) && c()', '/a  b/.test(s)', '/[ab]/.test(s)'],
  },
  'for の括弧の中で変数 of を除算に使う行の末尾コメントは生成物に残る（意味は変わらない）': {
    text: `${META_HEADER}function f(of) {\n  for (let i = 0; i < of / 2; i++) { g(i) } // c\n}\n`,
    keep: ['{ g(i) } // c'],
    expected: "export const meta={name:'x'}\nfunction f(of){\nfor(let i=0;i<of / 2; i++) { g(i) } // c\n}\n",
  },
  'for の括弧の中で変数 of を除算に使う行の同じ行に / を含むテンプレートがあるだけ（以降に別のテンプレートが無い）': {
    text: `${META_HEADER}let a = 1, b = 5, r = 0, s = 'x', g = 2, t = ''\nfor (let of = 4, i = 0; i < of / 2; i++) { t = \`a/b\` }\nreturn t\n`,
    keep: ['t = `a/b`'],
    expected: "export const meta={name:'x'}\nlet a=1,b=5,r=0,s='x',g=2,t=''\nfor(let of=4,i=0;i<of / 2; i++) { t = `a/b` }\nreturn t\n",
  },
  'K1 の回避: 括弧で包んだ ?.キーワード名プロパティ の直後の除算': {
    text: `${META_HEADER}const o = { in: 4, default: 8 }\nconst half = (o?.in) / 2\nreturn half + (o?.default) / 4\n`,
    keep: ['(o?.in) / 2', '(o?.default) / 4'],
  },
  'K1 の回避: ブラケット記法の ?.["in"] の直後の除算': {
    text: `${META_HEADER}const o = { in: 4 }\nconst half = o?.["in"] / 2\nreturn half\n`,
    keep: ['o?.["in"] / 2'],
  },
  'K1 の回避: 呼び出し o?.in() の直後の除算': {
    text: `${META_HEADER}const o = { in() { return 4 } }\nconst half = o?.in() / 2\nreturn half\n`,
    keep: ['o?.in() / 2'],
  },
  'R2: private メソッド #if の呼び出しの直後の除算で文字列を変えない': {
    text: `${META_HEADER}class A {\n  #if(x) { return x }\n  m(a) { return this.#if(a) / 2 + "/" + "http://x" }\n}\n`,
    keep: ['"/"', '"http://x"'],
    expected: "export const meta={name:'x'}\nclass A{\n#if(x){return x}\nm(a){return this.#if(a) / 2 + \"/\" + \"http://x\" }\n}\n",
  },
  'R2: private メソッドの呼び出しの直後の除算で末尾コメントを消す': {
    text: `${META_HEADER}class A {\n  #if(x) { return x }\n  m(a) { return this.#if(a) / 2 // half\n  }\n  n(a) { return this.#for(a) / 2 + s.split("/").length /* c */ }\n  #for(x) { return x }\n}\n`,
    keep: ['this.#if(a) / 2', 'this.#for(a) / 2 + s.split("/").length'],
    expected:
      "export const meta={name:'x'}\nclass A{\n#if(x){return x}\nm(a){return this.#if(a) / 2\n}\nn(a){return this.#for(a) / 2 + s.split(\"/\").length  }\n#for(x){return x}\n}\n",
  },
  'R2: #while と #with の呼び出しの直後の除算': {
    text: `${META_HEADER}class A {\n  #while(x) { return x }\n  #with(x) { return x }\n  m(a) { return this.#while(a) / 2 + "//" }\n  n(a) { return this.#with(a) / 2 + "/*" }\n}\n`,
    keep: ['"//"', '"/*"'],
  },
  'R2: private 名がキーワードと同名（#in）の直後の除算': {
    text: `${META_HEADER}class A {\n  #in = 4\n  m() { return this.#in / 2 + "//" }\n}\n`,
    keep: ['"//"'],
  },
  'P2: プロパティ名が if / while の呼び出し（o.if(x)）の直後の除算': {
    text: `${META_HEADER}const q = o.if(x) / 2\nconst r = o.while(y) / 3 // c\n`,
    keep: ['o.if(x) / 2', 'o.while(y) / 3'],
    expected: "export const meta={name:'x'}\nconst q=o.if(x) / 2\nconst r=o.while(y) / 3\n",
  },
  'for の括弧の中の角括弧の中の of は識別子（括弧の直下ではない）': {
    text: `${META_HEADER}function f(s, of) {\n  for (const p of [of / \`/x//y\`]) { g(\`//\`) }\n}\n`,
    keep: ['of / `/x//y`', '`//`'],
    expected: "export const meta={name:'x'}\nfunction f(s,of){\nfor(const p of[of / `/x//y`]) { g(`//`) }\n}\n",
  },
  'do { } while (x) の直後の正規表現': {
    text: `${META_HEADER}function f(x, s) {\n  do { g() } while (x) /[//]/.test(s) && h()\n  return 1\n}\n`,
    keep: ['/[//]/.test(s) && h()'],
  },
  'for (const x of /re/.exec(s)) の正規表現内の //': {
    text: `${META_HEADER}function f(s) {\n  for (const x of /[//]/.exec(s)) { g(x) }\n}\n`,
    keep: ['/[//]/.exec(s)'],
  },
  'else の直後の正規表現': {
    text: `${META_HEADER}function f(x, s) {\n  if (x) g(); else /[//]/.test(s) && h()\n}\n`,
    keep: ['/[//]/.test(s) && h()'],
  },
  '括弧の直後の -/\\)/ と if の本文の正規表現': {
    text: `${META_HEADER}const a = - -/\\)/.source.length; if (a) /x/.test(s) // c\n`,
    keep: ['/\\)/.source.length', '/x/.test(s)'],
    expected: "export const meta={name:'x'}\nconst a= - -/\\)/.source.length; if (a) /x/.test(s)\n",
  },
  '正規表現リテラルの直後の除算': {
    text: `${META_HEADER}const x = /a/ / 2 + ${SLASH_PROBE}`,
    keep: SLASH_PROBE_KEEP,
  },
  'B: if の括弧の直後の正規表現内のバッククォート': {
    text: `${META_HEADER}if (ok) /\`/.test(s) && f()\nconst t = \`line1\n  indented   text  =  1\`\n`,
    keep: ['/`/.test', '`line1\n  indented   text  =  1`'],
  },
  'B: while の括弧の直後の正規表現内のバッククォート': {
    text: `${META_HEADER}while (more()) /\`/.test(s) && g()\nconst t = \`line1\n  indented   text  =  1\`\n`,
    keep: ['/`/.test', '`line1\n  indented   text  =  1`'],
  },
  'B: for の括弧の直後の正規表現内のバッククォート': {
    text: `${META_HEADER}for (;;) /\`/.test(s) && g()\nconst t = \`line1\n  indented   text  =  1\`\n`,
    keep: ['/`/.test', '`line1\n  indented   text  =  1`'],
  },
  'B: 二重の括弧の if の直後の正規表現': {
    text: `${META_HEADER}if ((ok)) /\`/.test(s) && f()\nconst t = \`line1\n  indented   text  =  1\`\n`,
    keep: ['/`/.test', '`line1\n  indented   text  =  1`'],
  },
  'B: 関数呼び出しの括弧の直後の除算': {
    text: `${META_HEADER}const q = f(a) / 2 + " / a  +  b "\n`,
    keep: ['" / a  +  b "'],
  },
  'B: 式の括弧の直後の除算': {
    text: `${META_HEADER}const q = (a) / 2 + " / a  +  b "\n`,
    keep: ['" / a  +  b "'],
  },
  'B: return の括弧の直後の除算': {
    text: `${META_HEADER}function g(a, b) { return (a) / b + " / a  +  b " }\n`,
    keep: ['" / a  +  b "'],
  },
  'B: if の本文が括弧で始まる式の除算': {
    text: `${META_HEADER}if (x) (a) / 2 + " / a  +  b "\n`,
    keep: ['" / a  +  b "'],
  },
}

// lexer が判別できない入力: `}` の直後の `/` はブロックの終わり（直後は正規表現）にも、オブジェクト
// リテラルの終わり（直後は除算）にもなる。lexer は除算側に倒す。実際が正規表現のとき、その中にバッククォートが
// あると以降のテンプレートが反転し、`//` や `/*` があるとコードをコメントと誤認して消す。この制約は lexer では
// 解かず、ビルド時のトークン照合（acorn.parse の onToken。ブロックかオブジェクトかをパーサが決める）が止める。
// どの入力もビルドは非ゼロで終わり、生成ファイルを書かない。
const LEXER_SLASH_RESIDUAL = {
  '} 直後の正規表現内のバッククォート': `${META_HEADER}if (ok) {} /\`/.test(s) && f()\nconst t = \`line1\n  indented   text  =  1\`\n`,
  // 文の位置にある正規表現（`{ c() }` はブロック）。正規表現内の `//` 以降をコメントとして消し、残りが
  // パースできない生成物になる
  '} 直後の正規表現内の //': `${META_HEADER}function f(s) {\n  if (a) { b() }\n  { c() }\n  /[//]/.test(s) && d()\n  return 1\n}\n`,
  // 正規表現内の `/*` で、次の `*/` までをブロックコメントとして読み、`in` までのコードが消えて意味が変わる
  // （消えた先がパースできる別のプログラムになる。tokenizer 単体の比較では src と同じ誤読で一致して通っていた）
  // `for (` の括弧の中で変数 `of` を除算に使う行は正規表現と読む（閉じ `/` 以降は読み違える）。同じ行の `/` を含む
  // テンプレートは正規表現の中に飲まれ、以降のテンプレートの開閉が反転して中身が変わる
  'for の括弧の中の変数 of の除算と同じ行の / を含むテンプレート': `${META_HEADER}function f(of) {\n  for (let i = 0; i < of / 2; i++) { g(\`a/b\`) }\n  const t = \`c\n    d\`\n}\n`,
  // 同じ行の `//` を含むブロックコメントは `//` 以降が行コメントとして読まれ、閉じのないコメントになる
  'for の括弧の中の変数 of の除算と同じ行の // を含むブロックコメント': `${META_HEADER}function f(of) {\n  for (let i = 0; i < of / 2; i++) { g(i) } /* a//b */\n}\n`,
  // 除算の行の後に複数行のテンプレートがあると、閉じ `/` を飲まれたテンプレートの開閉が反転して改行後のインデントが詰まる
  'for の括弧の中の変数 of の除算の行（/ を含むテンプレート）の後の複数行のテンプレート': `${META_HEADER}let t = ''\nfor (let of = 4, i = 0; i < of / 2; i++) { t = \`a/b\` }\nt = \`c\n    d\`\nreturn t\n`,
  // 後ろに `//` を含むテンプレートがあると、`//` 以降が行コメントとして読まれて閉じのないテンプレートになる
  'for の括弧の中の変数 of の除算の行（/ を含むテンプレート）の後の // を含むテンプレート': `${META_HEADER}let t = ''\nfor (let of = 4, i = 0; i < of / 2; i++) { t = \`a/b\` }\nt = \`c//d\`\nreturn t\n`,
  // ブロックコメントの中の CR は行終端として読まれる（`return` の後なら ASI で `return;` になる）が、lexer は
  // コメントを 1 個の空白に置き換えるので改行が消えて意味が変わる。トークンの開始行の比較が止める
  'return の後のブロックコメント内の CR（ASI で意味が変わる）': `${META_HEADER}function f() {\n  return /*\r*/ 1\n}\n`,
  '} 直後の正規表現内の /*': `${META_HEADER}function f(s, t) {\n  if (a) { b() }\n  { c() }\n  /[/*]/.test(s) && /a*/ in /]/\n  return 1\n}\n`,
}

const runBuilder = (srcText, extra = []) => {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'build-workflow-parity-')))
  try {
    const src = join(dir, 'in.src.js')
    const dist = join(dir, 'out.js')
    writeFileSync(src, srcText)
    const r = spawnSync(process.execPath, [SCRIPT_PATH, '--src', src, '--dist', dist, ...extra], { encoding: 'utf8' })
    return { ...r, dist, written: existsSync(dist), distText: existsSync(dist) ? readFileSync(dist, 'utf8') : null }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

for (const [name, { text, keep, expected }] of Object.entries(LEXER_SLASH_FIXED)) {
  test(`lexer の / 判別: ${name} はビルドが通り、中身を変えない`, () => {
    const out = buildArtifact(text)
    for (const part of keep) assert.ok(out.includes(part), `${JSON.stringify(part)} が生成物から消えた・変わった: ${JSON.stringify(out)}`)
    if (expected !== undefined) assert.equal(out, expected)
    // パーサ文脈つきの照合（ビルドが使うのと同じ）で、変換前後のトークン列が一致する
    const [result] = compareTokensWithParser([{ name, before: text, after: out }])
    assert.equal(result.ok, true, result.detail)
    const r = runBuilder(text)
    assert.equal(r.status, 0, r.stderr)
    assert.match(r.stdout, /トークン照合 ok/)
    assert.equal(r.written, true)
    assert.equal(r.distText, out)
  })
}

for (const [name, text] of Object.entries(LEXER_SLASH_RESIDUAL)) {
  test(`ビルド時のトークン照合: lexer が判別できない入力（${name}）はビルドが非ゼロで終わり生成ファイルを書かない`, () => {
    // 前提: lexer が実際に中身を変える（照合が無ければ壊れた生成物が出る入力であること）
    assert.notEqual(buildArtifact(text).replace(/\n$/, ''), text.replace(/\n$/, ''))
    const r = runBuilder(text)
    assert.notEqual(r.status, 0, `ビルドが成功してしまった: ${r.stdout}`)
    assert.equal(r.written, false, '照合に失敗したのに生成ファイルが書かれた')
    assert.match(r.stderr, /生成物のトークン列が開発ファイルと一致しない: \[module\] (変換後のパースに失敗|トークン [0-9]+（変換前 [0-9]+ 行）が不一致|トークン数が不一致)/)
  })

  test(`ビルド時のトークン照合: lexer が判別できない入力（${name}）は --check でも非ゼロで終わる`, () => {
    const r = runBuilder(text, ['--check'])
    assert.notEqual(r.status, 0)
    assert.match(r.stderr, /生成物のトークン列が開発ファイルと一致しない/)
  })
}

// 次の 5 入力は、tokenizer 単体の比較ではビルダーの lexer と同じ位置で `/` を誤読して src と生成物が
// 「同じ誤読」で一致し、壊れた生成物のまま「トークン照合 ok」でビルドが成功していた（レビュー再現）。
// 壊れた生成物（lexer が誤読したときの出力）を literal で持ち、lexer を介さずに verifyTokenParity へ渡して、
// パーサ文脈つきの照合が止めること・tokenizer 単体では止まらないことを固定する。
const MISREAD_PAIRS = {
  'G2: 文の位置の正規表現内の /*（in までのコードが消える）': {
    src: `${META_HEADER}function f(s, t) {\n  if (a) { b() }\n  { c() }\n  /[/*]/.test(s) && /a*/ in /]/\n  return 1\n}\n`,
    artifact: "export const meta={name:'x'}\nfunction f(s,t){\nif(a){b()}\n{c()}\n/[  in /]/\nreturn 1\n}\n",
  },
  'G: 文の位置の正規表現内の //（以降がコメントとして消える）': {
    src: `${META_HEADER}function f(s) {\n  if (a) { b() }\n  { c() }\n  /[//]/.test(s) && d()\n  return 1\n}\n`,
    artifact: "export const meta={name:'x'}\nfunction f(s){\nif(a){b()}\n{c()}\n/[\nreturn 1\n}\n",
  },
  'C: for await の本文の正規表現内の //': {
    src: `${META_HEADER}async function f(xs) {\n  for await (const a of xs) /[//]/.test(a) && g(a)\n}\n`,
    artifact: "export const meta={name:'x'}\nasync function f(xs){\nfor await(const a of xs) /[\n}\n",
  },
  'B: 変数名が of の for await の括弧の直下の正規表現内の //': {
    src: `${META_HEADER}async function f(of) {\n  for await (const of of /[//]/ [0\n  ]) { g(of) }\n}\n`,
    artifact: "export const meta={name:'x'}\nasync function f(of){\nfor await(const of of /[\n]){g(of)}\n}\n",
  },
  'B2: 変数名が of の for await の括弧の直下の正規表現内の /*': {
    src: `${META_HEADER}async function f(s, of) {\n  for await (const of of /[/*]/.test(s) && /a*/ in /]/) { g(of) }\n}\n`,
    artifact: "export const meta={name:'x'}\nasync function f(s,of){\nfor await(const of of /[  in /]/) { g(of) }\n}\n",
  },
}

for (const [name, { src, artifact }] of Object.entries(MISREAD_PAIRS)) {
  test(`パーサ文脈つきの照合: ${name} の壊れた生成物を verifyTokenParity が止める`, () => {
    assert.throws(() => verifyTokenParity(src, artifact), /生成物のトークン列が開発ファイルと一致しない/)
    const [result] = compareTokensWithParser([{ name, before: src, after: artifact }])
    assert.equal(result.ok, false)
    assert.ok(['mismatch', 'artifact-unparsable'].includes(result.kind), result.kind)
  })

  test(`パーサ文脈つきの照合: ${name} は tokenizer 単体の比較では同じ誤読で一致して通ってしまう（パース方式にした理由）`, () => {
    const [result] = compareTokensWithTokenizer([{ name, before: src, after: artifact, lenient: true }])
    assert.equal(result.ok, true, `tokenizer でも差が出るなら、この入力は理由の説明にならない: ${result.detail}`)
  })
}

test('パーサ文脈つきの照合: 開発ファイルをパースできないときは検査できないとして中止する（tokenizer へフォールバックしない）', () => {
  const src = `${META_HEADER}const x = (\n`
  assert.throws(() => verifyTokenParity(src, src), /開発ファイルをパースできないため照合できない.*変換前のパースに失敗/s)
  const [result] = compareTokensWithParser([{ name: 'x', before: src, after: src }])
  assert.equal(result.kind, 'source-unparsable')
  const r = runBuilder(src)
  assert.notEqual(r.status, 0)
  assert.equal(r.written, false)
  assert.match(r.stderr, /開発ファイルをパースできないため照合できない/)
})

test('パーサ文脈つきの照合: 生成物がパースできないときも中止する', () => {
  const src = `${META_HEADER}const x = 1\n`
  assert.throws(() => verifyTokenParity(src, `${META_HEADER}const x = (\n`), /生成物のトークン列が開発ファイルと一致しない.*変換後のパースに失敗/s)
})

// ランタイムは module ではなく、先頭の `export const meta` の `export ` を外した本体を関数本体（AsyncFunction）として
// 評価する（tests/lib/workflow-script-contract.mjs）。関数本体は script ゴールなので、`<!--` と行頭の `-->` が
// 行末までのコメントになる。module の parse だけの照合では、`<!--` の後のコードがコメントとして消えて実行結果が変わる
// 生成物を見逃していた（レビュー再現）。
const AsyncFunctionCtor = Object.getPrototypeOf(async function () {}).constructor
const runLikeRuntime = async (code) => new AsyncFunctionCtor(stripMetaExport(code))()
const H1_SRC = `${META_HEADER}let a = 1, b = 5, r = 0\nr = a <!-- b /*\nr = 42\n/* */\nreturn r\n`

test('script ゴールの照合: <!-- の後に /* を置いた開発ファイルはビルドが中止になる（module の parse だけでは通って実行結果が変わっていた）', async () => {
  // 前提: ランタイムの形（関数本体）で実行すると 42。lexer の出力（照合なし）は 1 になる
  assert.equal(await runLikeRuntime(H1_SRC), 42)
  const unchecked = buildArtifact(H1_SRC)
  assert.equal(await runLikeRuntime(unchecked), 1, '前提: 照合が無ければ実行結果が変わる生成物ができる入力であること')
  assert.throws(() => verifyTokenParity(H1_SRC, unchecked), /生成物のトークン列が開発ファイルと一致しない: \[script\]/)
  const r = runBuilder(H1_SRC)
  assert.notEqual(r.status, 0, `ビルドが成功してしまった: ${r.stdout}`)
  assert.equal(r.written, false)
  assert.match(r.stderr, /\[script\]/)
})

test('script ゴールの照合: 行頭の --> を含む開発ファイルは module でパースできないので中止になる', () => {
  const src = `${META_HEADER}let a = 1, b = 5, r = 0\nr = a\n--> b /*\nr = 42\n/* */\nreturn r\n`
  const r = runBuilder(src)
  assert.notEqual(r.status, 0)
  assert.equal(r.written, false)
  assert.match(r.stderr, /開発ファイルをパースできないため照合できない/)
})

test('script ゴールの照合: 無害な r = a <!-- b（後ろに /* が無い）はビルドでき、実行結果は変わらない', async () => {
  const src = `${META_HEADER}let a = 1, b = 5, r = 0\nr = a <!-- b\nreturn r\n`
  const out = buildArtifact(src)
  assert.doesNotThrow(() => verifyTokenParity(src, out))
  assert.ok(out.includes('<!--'), `<!-- が残る: ${JSON.stringify(out)}`)
  assert.equal(await runLikeRuntime(src), 1)
  assert.equal(await runLikeRuntime(out), 1)
  const r = runBuilder(src)
  assert.equal(r.status, 0, r.stderr)
  assert.equal(r.written, true)
})

test('script ゴールの照合: <!-- を文字列の中に持つ開発ファイルは影響を受けずビルドできる', async () => {
  const src = `${META_HEADER}let r = "a <!-- b /*"\nreturn r\n`
  const out = buildArtifact(src)
  assert.doesNotThrow(() => verifyTokenParity(src, out))
  assert.equal(await runLikeRuntime(out), 'a <!-- b /*')
})

test('script ゴールの照合: export を外す規則はランタイムの stripMetaExport と同じ（先頭の export const meta だけ）', () => {
  // 先頭が export const meta でない開発ファイルはそのまま script として読む（export を含めばパースできず中止）
  const noMeta = 'const x = 1\n'
  assert.doesNotThrow(() => verifyTokenParity(noMeta, buildArtifactUnchecked(noMeta)))
  const lateExport = `${META_HEADER}const a = 1\nexport const meta2 = 2\n`
  assert.throws(() => verifyTokenParity(lateExport, lateExport), /開発ファイルをパースできないため照合できない.*\[script\]/s)
})

// buildArtifact は先頭が export const meta であることを要求する。meta の無い断片は squeezeSpaces だけを通す
const buildArtifactUnchecked = (code) => squeezeSpaces(code)

test('tokenize モードの比較は script も読む（<!-- は script でだけコメント。module だけでは空白を詰めて <!-- を作った変化を見逃す）', () => {
  const [r] = compareTokensWithTokenizer([{ name: 'x', before: 'x = a < ! --b\n', after: 'x = a<!--b\n', lenient: true }])
  assert.equal(r.ok, false)
  assert.match(r.detail, /\[script\]/, 'module では同じトークン列なので、script の読みで見つかった差であること')
})

// 照合のトークン数・開始行の比較（どちらかを外しても他のテストが通ってしまった分岐）
for (const [mode, compare] of [['parse', compareTokensWithParser], ['tokenize', compareTokensWithTokenizer]]) {
  test(`${mode} モードの比較: 共通部分が同じでも、変換後のトークンが余分・不足なら不一致`, () => {
    const base = 'const x = 1\n'
    const [more] = compare([{ name: 'more', before: base, after: `${base}foo()\n` }])
    assert.equal(more.ok, false)
    const [fewer] = compare([{ name: 'fewer', before: `${base}foo()\n`, after: base }])
    assert.equal(fewer.ok, false)
    // tokenize モードは終端のトークンを持たないので、数の比較だけが差を見つける。parse モードは終端（eof）の
    // 位置で別のトークンとして不一致になる
    const pattern = mode === 'tokenize' ? /トークン数が不一致/ : /不一致/
    assert.match(more.detail, pattern)
    assert.match(fewer.detail, pattern)
  })

  test(`${mode} モードの比較: トークンの種類と値が同じでも、開始行が違えば不一致`, () => {
    const [r] = compare([{ name: 'line', before: 'x = 1\ny = 2\n', after: 'x = 1\n\ny = 2\n' }])
    assert.equal(r.ok, false)
    assert.match(r.detail, /不一致/)
  })
}

// 直前の単語の文字列だけを見て、その単語がプロパティ名・private 名だったかを見ない分岐の点検（PR レビュー指摘）。
// `obj.for` の後に改行を挟んで `await (a) / 2` が来ると、`wordBefore === 'for'` だけでは `for await (` と取り違え、
// await の括弧を条件の括弧として `/` を正規表現と読む（正当な入力がビルド中止になる）。実際の `for` キーワード
// のときだけ `for await` として扱う。各入力は、ランタイム形で実行して src と生成物の結果が一致することを見る。
// 末尾のテンプレート（複数行）は、`/` の読みを誤ると開閉が反転して中身が変わるプローブ。
const PROBE_TEMPLATE = 'const t = `a\n  b  c`\n'
const WORD_PROPERTY_CASES = {
  'obj.for の後に改行を挟んだ await (a) / 2（ASI）': {
    code: `async function f(obj, a) {\n  obj.for\n  await (a) / 2 + \`/\`\n  return 1\n}\n${PROBE_TEMPLATE}return [await f({ for: 1 }, 4), t]\n`,
    result: [1, 'a\n  b  c'],
  },
  'this.#for の後に改行を挟んだ await (a) / 2（ASI）': {
    code: `class K {\n  #for = 1\n  async m(a) {\n    this.#for\n    await (a) / 2 + \`/\`\n    return this.#for\n  }\n}\n${PROBE_TEMPLATE}return [await new K().m(4), t]\n`,
    result: [1, 'a\n  b  c'],
  },
  'obj.for の後に ; を挟んだ同一行の await (a) / 2': {
    code: `async function f(obj, a) {\n  obj.for; await (a) / 2 + \`/\`\n  return 1\n}\n${PROBE_TEMPLATE}return [await f({ for: 1 }, 4), t]\n`,
    result: [1, 'a\n  b  c'],
  },
  'this.#for の後に ; を挟んだ同一行の await (a) / 2': {
    code: `class K {\n  #for = 1\n  async m(a) {\n    this.#for; await (a) / 2 + \`/\`\n    return 1\n  }\n}\n${PROBE_TEMPLATE}return [await new K().m(4), t]\n`,
    result: [1, 'a\n  b  c'],
  },
  'for と await の間に別のトークンがある（オブジェクトのキー for の後の : と値）': {
    code: `async function f(a) {\n  const o = { for: 1 }\n  await (a) / 2 + \`/\`\n  return o.for\n}\n${PROBE_TEMPLATE}return [await f(4), t]\n`,
    result: [1, 'a\n  b  c'],
  },
  'obj?.for の後に改行を挟んだ await (a) / 2': {
    code: `async function f(obj, a) {\n  obj?.for\n  await (a) / 2 + \`/\`\n  return 1\n}\n${PROBE_TEMPLATE}return [await f({ for: 1 }, 4), t]\n`,
    result: [1, 'a\n  b  c'],
  },
  // 実際の for キーワードなら、for と await の間に改行があっても for await の括弧として読む（正規表現内の // を消さない）
  '実際の for キーワードと await の間に改行がある for await': {
    code: `async function f(s) {\n  let n = 0\n  for\n  await (const m of /[//]/g[Symbol.matchAll](s)) { n++ }\n  return n\n}\n${PROBE_TEMPLATE}return [await f('a//b'), t]\n`,
    result: [2, 'a\n  b  c'],
  },
  // 同類の点検: 条件の括弧を作る語（if / while / for）がプロパティ名・private 名で、改行を挟んで括弧が来る形
  'obj.if の後に改行を挟んだ (a) / 2': {
    code: `function f(obj, a) {\n  return obj.if\n  (a) / 2 + \`/\`\n}\n${PROBE_TEMPLATE}return [f({ if: (x) => x }, 4), t]\n`,
    result: ['2/', 'a\n  b  c'],
  },
  'this.#while の後に改行を挟んだ (a) / 2': {
    code: `class K {\n  #while(x) { return x }\n  m(a) {\n    return this.#while\n    (a) / 2 + \`/\`\n  }\n}\n${PROBE_TEMPLATE}return [new K().m(4), t]\n`,
    result: ['2/', 'a\n  b  c'],
  },
  // 同類の点検: 正規表現の前置キーワードがプロパティ名・private 名で、改行を挟んで除算が続く形
  'obj.return の後に改行を挟んだ / 2': {
    code: `function f(obj) {\n  return obj.return\n  / 2 + \`/\`\n}\n${PROBE_TEMPLATE}return [f({ return: 8 }), t]\n`,
    result: ['4/', 'a\n  b  c'],
  },
  'this.#in の後に改行を挟んだ / 2': {
    code: `class K {\n  #in = 8\n  m() {\n    return this.#in\n    / 2 + \`/\`\n  }\n}\n${PROBE_TEMPLATE}return [new K().m(), t]\n`,
    result: ['4/', 'a\n  b  c'],
  },
  'obj.await の後に改行を挟んだ / 2': {
    code: `function f(obj) {\n  return obj.await\n  / 2 + \`/\`\n}\n${PROBE_TEMPLATE}return [f({ await: 8 }), t]\n`,
    result: ['4/', 'a\n  b  c'],
  },
  'obj.of の後に改行を挟んだ / 2（for の括弧の外）': {
    code: `function f(obj) {\n  return obj.of\n  / 2 + \`/\`\n}\n${PROBE_TEMPLATE}return [f({ of: 8 }), t]\n`,
    result: ['4/', 'a\n  b  c'],
  },
}
for (const [name, { code, result }] of Object.entries(WORD_PROPERTY_CASES)) {
  test(`直前の単語がプロパティ名・private 名のときの分岐: ${name} はビルドでき、テンプレートの中身が変わらず、実行結果が一致する`, async () => {
    const src = `${META_HEADER}${code}`
    const out = buildArtifact(src)
    assert.doesNotThrow(() => verifyTokenParity(src, out))
    assert.ok(out.includes('`a\n  b  c`'), `テンプレートの中身が変わった: ${JSON.stringify(out)}`)
    const expected = await runLikeRuntime(src)
    assert.deepEqual(expected, result)
    assert.deepEqual(await runLikeRuntime(out), result)
    assert.equal(runBuilder(src).status, 0)
  })
}

// 中止にはならないが、lexer が取り違えた結果テンプレートモードに入ったままになり、以降のコメントとインデントが
// 生成物に残る形（意味は同じ・サイズが縮まない・開発用コメントが配布物に残る）。ランタイムの形で実行して結果を比べる。
const KEPT_COMMENT_CASES = {
  'for の括弧の中の変数 of の除算の行（/ を含むテンプレート）の後': {
    body: "for (let of = 4, i = 0; i < of / 2; i++) { t = `a/b` }\n// secret comment\n    r = 5 /* c2 */\nt = `p  q`\nreturn t + r",
    kept: ['// secret comment', '    r = 5 /* c2 */'],
    result: 'p  q5',
  },
  '} の直後の /`/ の後（以降に別のテンプレートが無い）': {
    body: 'if (a) { r = 1 }\n/`/.test(s)\n// secret comment\n   r = 5 /* c2 */\nreturn r',
    kept: ['// secret comment', '   r = 5 /* c2 */'],
    result: 5,
  },
}
for (const [name, { body, kept, result }] of Object.entries(KEPT_COMMENT_CASES)) {
  test(`中止にならず以降のコメントが生成物に残る形: ${name}（意味は同じ）`, async () => {
    const src = `${META_HEADER}let a = 1, b = 5, r = 0, s = 'x', g = 2, t = ''\n${body}\n`
    const out = buildArtifact(src)
    assert.doesNotThrow(() => verifyTokenParity(src, out))
    for (const part of kept) assert.ok(out.includes(part), `${JSON.stringify(part)} が残る: ${JSON.stringify(out)}`)
    assert.equal(await runLikeRuntime(src), result)
    assert.equal(await runLikeRuntime(out), result)
    assert.equal(runBuilder(src).status, 0)
  })
}

test('for の括弧の中の変数 of の除算の行の末尾コメント: 除算の / の次の / が // の 1 文字目なら残り、ほかの / が先にあれば消える', async () => {
  const head = `${META_HEADER}let r = 0\n`
  const one = `${head}for (let of = 4, i = 0; i < of / 2; i++) { r += 1 } // c\nreturn r\n`
  const two = `${head}for (let of = 4, i = 0; i < of / 2; i++) { r += of / 2 } // c\nreturn r\n`
  const outOne = buildArtifact(one)
  const outTwo = buildArtifact(two)
  assert.ok(outOne.includes('// c'), `1 個目の / の次が // の 1 文字目: コメントが残る: ${JSON.stringify(outOne)}`)
  assert.ok(!outTwo.includes('// c'), `ほかの / が先にある: コメントは消える: ${JSON.stringify(outTwo)}`)
  for (const [src, out, expected] of [[one, outOne, 2], [two, outTwo, 4]]) {
    assert.doesNotThrow(() => verifyTokenParity(src, out))
    assert.equal(await runLikeRuntime(out), expected)
    assert.equal(await runLikeRuntime(src), expected)
  }
})

test('K1: ?. の直後のキーワード名プロパティの直後の / は acorn が誤読して中止になり、エラー文言に回避形が出る', () => {
  const src = `${META_HEADER}const o = { in: 4, default: 8 }\nconst half = o?.in / 2\nreturn half + o?.default / 4\n`
  assert.throws(() => verifyTokenParity(src, src), /開発ファイルをパースできないため照合できない.*変換前のパースに失敗.*原因の例.*acorn が正当な構文を読めない場合.*\(o\?\.in\) \/ 2/s)
  const r = runBuilder(src)
  assert.notEqual(r.status, 0)
  assert.equal(r.written, false)
  assert.match(r.stderr, /acorn が正当な構文を読めない場合/)
})

// 開発ファイルをパースできない原因は K1 型とは限らない。エラー本文と位置が先に出て、ヒントは「例」と分かる書き方
// （どの原因にも同じ「K1 が原因」という断定を出さない）
for (const [label, body] of Object.entries({
  'with 文': 'function f(o, s) {\n  with (o) g(s)\n}\n',
  '2 つ目の export': 'const a = 1\nexport const meta2 = 2\n',
  'import.meta': 'const u = import.meta.url\n',
  '行頭の -->': 'let r = 1\n--> r\n',
  '構文エラー': 'const x = (\n',
})) {
  test(`パースできない開発ファイルの中止メッセージ: ${label} は acorn のエラー本文と位置が先に出て、ヒントは原因の例として添えられる`, () => {
    const src = META_HEADER + body
    let message = ''
    try {
      verifyTokenParity(src, src)
    } catch (e) {
      message = e.message
    }
    assert.match(message, /^開発ファイルをパースできないため照合できない（検査を省略せず中止する）: \[(module|script)\] 変換前のパースに失敗: .+ \(\d+:\d+\)。原因の例:/s)
    assert.match(message, /よくある原因の 1 つ/)
    assert.doesNotMatch(message, /acorn が読めない正当な構文の可能性:/, '旧文言（常に K1 が原因と読める断定）が残っていない')
  })
}

// buildArtifact の先頭 `export const meta` 検査（Workflow ランタイムが位置 0 に要求する）。外す変異が全テスト緑で
// 生き残っていたので、export をまったく持たない入力・先頭にコメントがある入力が中止になることを固定する
test('buildArtifact: export を持たない入力は先頭が export const meta でないとして throw し、CLI 本体も書かずに中止する', () => {
  assert.throws(() => buildArtifact('const x = 1\n'), /生成物の先頭が `export const meta` でない/)
  assert.throws(() => buildArtifact('const meta = { name: \'x\' }\n'), /生成物の先頭が `export const meta` でない/)
  const r = runBuildOn('const x = 1\n')
  assert.equal(r.status, 1)
  assert.equal(r.wrote, false)
  assert.equal(r.distExists, false)
  assert.match(r.stderr.join('\n'), /先頭が `export const meta` でない/)
})

test('buildArtifact: 先頭にコメントがある入力（コメント除去後の先頭が空行になる）も throw する', () => {
  assert.throws(() => buildArtifact(`// c\n${META_HEADER}const x = 1\n`), /生成物の先頭が `export const meta` でない/)
  // 同じ行の先頭のブロックコメントは行頭なら置換の空白を置かないので、除去後も先頭は export const meta になる
  assert.doesNotThrow(() => buildArtifact(`/* c */ ${META_HEADER}`))
  assert.doesNotThrow(() => buildArtifact(`${META_HEADER}// c\nconst x = 1\n`))
})

// 失敗を表す error は空文字のメッセージでも失敗として扱う（token-diff.cjs の判定を `!== null` にした）。
// 変換前だけ・変換後だけが空メッセージの例外で失敗する状況を作り、どちらの側の判定も外れていないことを見る
// （両側が失敗すると片方の判定が外れても不一致として止まり、見分けがつかない）
test('token-diff の失敗判定: 例外のメッセージが空文字でも、変換前・変換後それぞれの失敗として扱う', () => {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'token-diff-empty-error-')))
  try {
    const stub = join(dir, 'run.cjs')
    writeFileSync(
      stub,
      `const Module = require('module')\nconst real = require('internal/deps/acorn/acorn/dist/acorn')\nconst orig = Module._load\n` +
        `const fake = { ...real,\n` +
        `  parse(code, o) { if (code.includes('BAD')) throw new Error(''); return real.parse(code, o) },\n` +
        `  tokenizer(code, o) { if (code.includes('BAD')) throw new Error(''); return real.tokenizer(code, o) } }\n` +
        `Module._load = function (request, ...rest) { return request === 'internal/deps/acorn/acorn/dist/acorn' ? fake : orig.call(this, request, ...rest) }\n` +
        `require(${JSON.stringify(TOKEN_DIFF_HELPER)})\n`,
    )
    const run = (cases) => {
      const r = spawnSync(process.execPath, ['--expose-internals', stub], { input: JSON.stringify(cases), encoding: 'utf8' })
      assert.equal(r.status, 0, r.stderr)
      return JSON.parse(r.stdout).results
    }
    const [srcBad, artBad] = run([
      { name: 'src', mode: 'parse', before: 'BAD\n', after: 'x\n' },
      { name: 'art', mode: 'parse', before: 'x\n', after: 'BAD\n' },
    ])
    assert.equal(srcBad.kind, 'source-unparsable', '変換前の空メッセージの失敗を、失敗として扱わなかった')
    assert.equal(artBad.kind, 'artifact-unparsable', '変換後の空メッセージの失敗を、失敗として扱わなかった')
    const [tokSrcBad, tokArtBad] = run([
      { name: 'src', mode: 'tokenize', before: 'BAD\n', after: 'x\n' },
      { name: 'art', mode: 'tokenize', before: 'x\n', after: 'BAD\n' },
    ])
    assert.match(tokSrcBad.detail, /変換前の字句解析に失敗/)
    assert.match(tokArtBad.detail, /変換後の字句解析に失敗/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('with 文は module でパースできないので中止になる（lexer の条件の括弧に with を含めない理由）', () => {
  const src = `${META_HEADER}function f(o, s) {\n  with (o) /re/.test(s)\n}\n`
  const r = runBuilder(src)
  assert.notEqual(r.status, 0)
  assert.equal(r.written, false)
  assert.match(r.stderr, /開発ファイルをパースできないため照合できない.*with/s)
})

test('パーサ文脈つきの照合: 先頭の return・top-level await を含む Workflow スクリプトの形をパースできる', () => {
  const src = `${META_HEADER}const v = await g()\nif (!v) return 1\nreturn 2\n`
  assert.doesNotThrow(() => verifyTokenParity(src, buildArtifact(src)))
})

test('verifyTokenParity: 中身を変えた生成物は最初の差の位置（またはパース失敗）つきで throw する（lexer を直しても不一致を作れる入力）', () => {
  const src = `${META_HEADER}const s = " / a  +  b "\nconst t = \`l1\n  i   t  =  1\`\n`
  assert.doesNotThrow(() => verifyTokenParity(src, buildArtifact(src)))
  const tampered = [
    ['文字列の中身を詰めた', buildArtifact(src).replace('" / a  +  b "', '" / a+b "')],
    ['テンプレートの中身を詰めた', buildArtifact(src).replace('  i   t  =  1', ' i t=1')],
    ['トークンを消した', buildArtifact(src).replace('const t', 'const')],
  ]
  for (const [label, artifact] of tampered) {
    assert.notEqual(artifact, buildArtifact(src), `前提: ${label}改変が実際に差を作る`)
    assert.throws(() => verifyTokenParity(src, artifact), /トークン列が開発ファイルと一致しない.*(変換前 [0-9]+ 行）が不一致|トークン数が不一致|変換後のパースに失敗)/s, label)
  }
})

test('ビルド時のトークン照合: 正常な開発ファイルはビルドが通り、生成ファイルが書かれる', () => {
  const text = `${META_HEADER}const x = a / 2 + " / a  +  b "\nconst re = /\`/.test(s)\nconst t = \`l1\n  i   t  =  1\`\n`
  const r = runBuilder(text)
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /トークン照合 ok/)
  assert.equal(r.written, true)
  assert.equal(r.distText, buildArtifact(text))
})

// 照合を実行できない・結果を解釈できない場合は、検査を省略して通さずに止める（fail-closed）。
// 照合ヘルパーの差し替えは verifyTokenParity の引数（helperPath / execPath）と、CLI 本体が使う関数 runBuild の
// 引数 parity だけで行う（CLI の引数には差し替える口がない — 照合を迂回できてしまうため。下のテスト参照）。
// 正常終了で一致を示す出力は `{"results":[{"ok":true}]}` の形だけで、それ以外はすべて中止になる。
const helperDir = trackTmp(mkdtempSync(join(tmpdir(), 'build-workflow-helper-')))
after(() => rmSync(helperDir, { recursive: true, force: true }))
// 標準入力を読み切ってから body を実行する照合ヘルパー（読まずに終了すると EPIPE で原因が変わる）
const writeHelper = (name, body) => {
  const path = join(helperDir, name)
  writeFileSync(path, `process.stdin.resume()\nprocess.stdin.on('data', () => {})\nprocess.stdin.on('end', () => { ${body} })\n`)
  return path
}
// CLI 本体が使う runBuild を、一時ファイルの開発ファイルに対して呼ぶ（照合ヘルパーを差し替えられる）
const runBuildOn = (srcText, { checkOnly = false, parity = {} } = {}) => {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'build-workflow-run-')))
  try {
    const srcPath = join(dir, 'in.src.js')
    const distPath = join(dir, 'out.js')
    writeFileSync(srcPath, srcText)
    const r = runBuild({ srcPath, distPath, checkOnly, parity })
    return { ...r, distExists: existsSync(distPath) }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}
const GOOD_SRC = `${META_HEADER}const s = " / a  +  b "\n`
const UNREADABLE = /トークン照合の結果を解釈できない/
const BAD_HELPERS = {
  '終了コード 3 で終わる': { path: writeHelper('exit3.cjs', 'process.exit(3)'), message: /トークン照合を実行できない.*status 3/s },
  '存在しないパス': { path: join(helperDir, 'no-such-helper.cjs'), message: /トークン照合を実行できない/ },
  '終了コード 0 で出力が空': { path: writeHelper('empty.cjs', ''), message: UNREADABLE },
  '終了コード 0 で出力が JSON でない': { path: writeHelper('garbage.cjs', "process.stdout.write('not json')"), message: UNREADABLE },
  '終了コード 0 で出力が途中で切れた JSON': { path: writeHelper('truncated.cjs', `process.stdout.write('{"results":[{"ok":tr')`), message: UNREADABLE },
  '終了コード 0 で出力が {}': { path: writeHelper('object.cjs', "process.stdout.write('{}')"), message: UNREADABLE },
  '終了コード 0 で出力が null': { path: writeHelper('null.cjs', "process.stdout.write('null')"), message: UNREADABLE },
  '終了コード 0 で results が空配列': { path: writeHelper('empty-results.cjs', `process.stdout.write('{"results":[]}')`), message: UNREADABLE },
  '終了コード 0 で results が 2 件': {
    path: writeHelper('two-results.cjs', `process.stdout.write('{"results":[{"ok":true},{"ok":true}]}')`),
    message: UNREADABLE,
  },
  '終了コード 0 で ok が真偽値でない': { path: writeHelper('ok-string.cjs', `process.stdout.write('{"results":[{"ok":"true"}]}')`), message: UNREADABLE },
  '終了コード 0 で ok が無い': { path: writeHelper('no-ok.cjs', `process.stdout.write('{"results":[{}]}')`), message: UNREADABLE },
  '終了コード 0 で不一致を報告': {
    path: writeHelper('mismatch.cjs', `process.stdout.write('{"results":[{"ok":false,"detail":"差あり"}]}')`),
    message: /トークン列が開発ファイルと一致しない: 差あり/,
  },
  '終了コード 0 で開発ファイルのパース失敗を報告': {
    path: writeHelper('source-unparsable.cjs', `process.stdout.write('{"results":[{"ok":false,"kind":"source-unparsable","detail":"読めない"}]}')`),
    message: /開発ファイルをパースできないため照合できない.*読めない/,
  },
}
const GOOD_HELPER = writeHelper('ok.cjs', `process.stdout.write('{"results":[{"ok":true,"detail":"x"}]}')`)

test('verifyTokenParity: 照合ヘルパーが一致を示す出力を返せば通る（差し替え機構の正常系）', () => {
  assert.doesNotThrow(() => verifyTokenParity(GOOD_SRC, buildArtifact(GOOD_SRC), { helperPath: GOOD_HELPER }))
  const r = runBuildOn(GOOD_SRC, { parity: { helperPath: GOOD_HELPER } })
  assert.equal(r.status, 0, r.stderr.join('\n'))
  assert.equal(r.wrote, true)
})

for (const [name, { path, message }] of Object.entries(BAD_HELPERS)) {
  test(`verifyTokenParity: 照合ヘルパーが${name}と throw し、通過扱いにしない`, () => {
    assert.throws(() => verifyTokenParity(GOOD_SRC, buildArtifact(GOOD_SRC), { helperPath: path }), message)
  })

  test(`runBuild（CLI 本体が使う関数）: 照合ヘルパーが${name}と status 1 で、生成ファイルを書かない`, () => {
    const r = runBuildOn(GOOD_SRC, { parity: { helperPath: path } })
    assert.equal(r.status, 1, `ビルドが成功してしまった: ${r.stdout.join('\n')}`)
    assert.equal(r.wrote, false)
    assert.equal(r.distExists, false, '照合を実行できないのに生成ファイルが書かれた')
    assert.match(r.stderr.join('\n'), /ビルド中止/)
    assert.match(r.stderr.join('\n'), message)
  })
}

test('verifyTokenParity: 実行ファイル（node）が存在しないと throw する', () => {
  assert.throws(
    () => verifyTokenParity(GOOD_SRC, buildArtifact(GOOD_SRC), { execPath: join(helperDir, 'no-such-node') }),
    /トークン照合を実行できない.*ENOENT/s,
  )
})

test('runBuild: --check 相当でも照合ヘルパーが失敗すれば status 1 で、鮮度比較へ進まない', () => {
  const r = runBuildOn(GOOD_SRC, { checkOnly: true, parity: { helperPath: BAD_HELPERS['終了コード 3 で終わる'].path } })
  assert.equal(r.status, 1)
  assert.match(r.stderr.join('\n'), /トークン照合を実行できない/)
  assert.doesNotMatch(r.stdout.join('\n'), /鮮度 ok/)
})

test('runBuild: --check 相当で実行ファイルが読めなければ status 1', () => {
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'build-workflow-nodist-')))
  try {
    const srcPath = join(dir, 'in.src.js')
    writeFileSync(srcPath, GOOD_SRC)
    const r = runBuild({ srcPath, distPath: join(dir, 'missing.js'), checkOnly: true })
    assert.equal(r.status, 1)
    assert.match(r.stderr.join('\n'), /鮮度エラー: 実行ファイルを読めない/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

// CLI の引数に照合を差し替える口は無い。常に ok を返すヘルパーを渡せると照合を迂回できてしまうため、
// 未知の引数（旧 --token-diff を含む）は使い方のエラーで非ゼロ終了する。--src / --dist は値が無いとき
// （末尾・次が別のオプション）に既定値へ黙って戻らず、同じく使い方のエラーにする
test('CLI: --token-diff は未知の引数として使い方のエラー（exit 2）になり、生成ファイルを書かない', () => {
  const r = runBuilder(GOOD_SRC, ['--token-diff', GOOD_HELPER])
  assert.equal(r.status, 2)
  assert.equal(r.written, false)
  assert.match(r.stderr, /未知の引数: --token-diff/)
  assert.match(r.stderr, /使い方/)
})

test('CLI: 未知の引数は使い方のエラー（exit 2）', () => {
  const r = spawnSync(process.execPath, [SCRIPT_PATH, '--chek'], { encoding: 'utf8' })
  assert.equal(r.status, 2)
  assert.match(r.stderr, /未知の引数: --chek/)
})

for (const [name, argv] of Object.entries({
  '--src が末尾（値なし）': ['--src'],
  '--dist が末尾（値なし）': ['--dist'],
  '--src の次が別のオプション': ['--src', '--check'],
  '--dist の次が別のオプション': ['--dist', '--check'],
})) {
  test(`CLI: ${name}のときは既定値へ黙って戻らず、使い方のエラー（exit 2）になる`, () => {
    const r = spawnSync(process.execPath, [SCRIPT_PATH, ...argv], { encoding: 'utf8' })
    assert.equal(r.status, 2, `${r.stdout}${r.stderr}`)
    assert.match(r.stderr, /に値がない/)
    assert.match(r.stderr, /使い方/)
    assert.equal(r.stdout, '', '使い方のエラーなのにビルドが動いた')
  })
}

test('parseArgs: 引数なしは既定の src / dist、--src / --dist / --check を解釈する', () => {
  assert.deepEqual(parseArgs([]), { checkOnly: false, srcPath: SRC_PATH, distPath: DIST_PATH, error: null })
  assert.deepEqual(parseArgs(['--check', '--src', 'a.js', '--dist', 'b.js']), { checkOnly: true, srcPath: 'a.js', distPath: 'b.js', error: null })
})

// ---------------------------------------------------------------------------
// (c) CLI ガード（symlink 経由・相対パス起動でも実行部が動くこと）
// ---------------------------------------------------------------------------

test('symlink 経由で起動しても CLI ガードを通過して --check が実行される（無言 no-op の防止）', () => {
  // CLI ガードの性質（起動の形によらず実行部が動き、--check の結果を出す）は入力の大きさに依らないので、小さい開発ファイルと
  // その生成物で確かめる（実物への --check は読み込み時に 1 回だけ。上の REAL_CHECK）
  const dir = trackTmp(mkdtempSync(join(tmpdir(), 'build-workflow-link-')))
  try {
    const link = join(dir, 'build-workflow.mjs')
    symlinkSync(SCRIPT_PATH, link)
    const src = join(dir, 'in.src.js')
    const dist = join(dir, 'out.js')
    writeFileSync(src, GOOD_SRC)
    writeFileSync(dist, buildArtifact(GOOD_SRC))
    const r = spawnSync(process.execPath, [link, '--check', '--src', src, '--dist', dist], { encoding: 'utf8' })
    assert.equal(r.status, 0, r.stderr)
    assert.match(r.stdout, /鮮度 ok/)
    // 対照: 生成物が食い違っていれば、同じ起動の形で鮮度エラーになる（無言で成功を返す no-op ではない）
    writeFileSync(dist, `${buildArtifact(GOOD_SRC)}// stale\n`)
    const stale = spawnSync(process.execPath, [link, '--check', '--src', src, '--dist', dist], { encoding: 'utf8' })
    assert.notEqual(stale.status, 0)
    assert.match(stale.stderr, /鮮度エラー/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('相対パスで起動しても CLI ガードを通過して --check が実行される', async () => {
  // 読み込み時に、作業ディレクトリ = リポジトリルート・スクリプトは相対パスの形で実物へ --check を始めている
  const r = await REAL_CHECK
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /鮮度 ok/)
})
