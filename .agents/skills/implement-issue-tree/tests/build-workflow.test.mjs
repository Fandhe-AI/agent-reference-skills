// scripts/build-workflow.mjs（開発ファイル → 実行ファイルのコメント除去ビルダー）の回帰テスト。
//
// 検証は 2 系統:
//   (a) lexer の固定ケース — 文字列・テンプレートリテラル・正規表現の内部にある `//` を
//       コメントと誤認して削らないこと（本スクリプトはプロンプト用の巨大テンプレートに
//       コード例を含み得るため、ここが壊れると生成物が静かに破損する）
//   (b) 鮮度ゲート — リポジトリの実行ファイル（implement-issue-tree.js）が開発ファイル
//       （implement-issue-tree.src.js）から再生成した内容と byte 一致すること。生成物の
//       直接編集・ビルド忘れの双方をここで fail させる（CI がこのスイートを実行する）。
// 生成物のサイズ・パースゲートは workflow-loadability.test.mjs が担う（対象は実行ファイル）。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, symlinkSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripComments, buildArtifact, SRC_PATH, DIST_PATH } from '../scripts/build-workflow.mjs'

const SCRIPT_PATH = fileURLToPath(new URL('../scripts/build-workflow.mjs', import.meta.url))
const REPO_ROOT = resolve(fileURLToPath(new URL('../../..', import.meta.url)))

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

test('冪等性: 除去済みソースへ再適用しても不変', () => {
  const once = stripComments("const a = 1 // c\nconst u = 'http://x'\n")
  assert.equal(stripComments(once), once)
})

// ---------------------------------------------------------------------------
// (b) 鮮度ゲート（リポジトリ実体の検証）
// ---------------------------------------------------------------------------

test('実行ファイルは開発ファイルからの再生成結果と byte 一致する（ビルド忘れ・直接編集の検出）', () => {
  const src = readFileSync(SRC_PATH, 'utf8')
  const dist = readFileSync(DIST_PATH, 'utf8')
  // buildArtifact は行数保持・先頭 meta 宣言・冪等性の検証込み（失敗時は throw）
  const rebuilt = buildArtifact(src)
  assert.ok(
    rebuilt === dist,
    '実行ファイル implement-issue-tree.js が開発ファイル implement-issue-tree.src.js と同期していない。' +
      '編集は .src.js に対して行い、node skills/implement-issue-tree/scripts/build-workflow.mjs で再生成すること' +
      '（実行ファイルの直接編集は次のビルドで消える）',
  )
})

test('開発ファイルと実行ファイルの行数が一致する（スタックトレース行番号の突き合わせ契約）', () => {
  const src = readFileSync(SRC_PATH, 'utf8')
  const dist = readFileSync(DIST_PATH, 'utf8')
  assert.equal(src.split('\n').length, dist.split('\n').length)
})

// ---------------------------------------------------------------------------
// (c) CLI ガード（symlink 経由・相対パス起動でも実行部が動くこと）
// ---------------------------------------------------------------------------

test('symlink 経由で起動しても CLI ガードを通過して --check が実行される（無言 no-op の防止）', () => {
  const dir = mkdtempSync(join(tmpdir(), 'build-workflow-link-'))
  try {
    const link = join(dir, 'build-workflow.mjs')
    symlinkSync(SCRIPT_PATH, link)
    const r = spawnSync(process.execPath, [link, '--check'], { encoding: 'utf8' })
    assert.equal(r.status, 0, r.stderr)
    assert.match(r.stdout, /鮮度 ok/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('相対パスで起動しても CLI ガードを通過して --check が実行される', () => {
  const r = spawnSync(
    process.execPath,
    ['skills/implement-issue-tree/scripts/build-workflow.mjs', '--check'],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  )
  assert.equal(r.status, 0, r.stderr)
  assert.match(r.stdout, /鮮度 ok/)
})
