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
import { readFileSync } from 'node:fs'
import { stripComments, buildArtifact, SRC_PATH, DIST_PATH } from '../scripts/build-workflow.mjs'

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
