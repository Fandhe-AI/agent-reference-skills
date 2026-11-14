---
source: https://spec.editorconfig.org/#glob-expressions
---

# EditorConfig グロブパターン

`.editorconfig` のセクション名で使用するグロブ（ワイルドカード）パターンの仕様。

## Signature / Usage

```ini
# 全サブディレクトリの .js ファイル
[*.js]
indent_size = 2

# src/ 直下の .ts ファイルのみ
[src/*.ts]
indent_size = 2

# src/ 配下の全 .ts ファイル（サブディレクトリ含む）
[src/**.ts]
indent_size = 2

# .ts と .tsx
[*.{ts,tsx}]
indent_size = 2

# 拡張子なしの特定ファイル
[Makefile]
indent_style = tab

# 複数の特定ファイル
[{package.json,tsconfig.json,.prettierrc}]
indent_size = 2

# file1.txt 〜 file12.txt
[file{1..12}.txt]
indent_size = 2

# a, b, c のいずれかで始まるファイル
[[abc]*.txt]
indent_size = 2

# a, b, c のいずれでもない文字で始まるファイル
[[!abc]*.txt]
indent_size = 2

# ネストした波括弧
[{*.{js,ts},Makefile}]
indent_size = 2
```

## Options / Props

| 文字 | 説明 |
|------|------|
| `*` | パス区切り（`/`）**以外** の任意の文字列にマッチ |
| `**` | パス区切りを **含む** 任意の文字列にマッチ |
| `?` | パス区切り（`/`）**以外** の任意の 1 文字にマッチ |
| `[seq]` | `seq` 内の任意の 1 文字にマッチ。括弧内の文字はすべてリテラル扱い（`[ab*c{1..2}]` は `a` / `b` / `*` / `c` / `{` / `1` / `.` / `2` / `}` のいずれか 1 文字） |
| `[!seq]` | `seq` 内に **含まれない** 任意の 1 文字にマッチ。括弧内の文字は同様にリテラル扱い |
| `{s1,s2,s3}` | 列挙された文字列のいずれかにマッチ（ネスト可能）。`{s1}`（要素 1 つ）は `{s1}` というリテラルにのみマッチ |
| `{num1..num2}` | `num1` 〜 `num2` の整数にマッチ（正負両対応）。`num1` は `num2` より小さい必要がある |
| `\` | 次の文字のエスケープ（特殊文字を文字通りに扱う） |

## Notes

### パス区切りルール

- `/` を含まないパターン（括弧内の `/` は数えない）は `.editorconfig` のディレクトリとその全サブディレクトリでマッチする。`*.c` は `.editorconfig` と同じディレクトリおよびその配下の `.c` ファイルにマッチ
- `/` を含むパターンは `.editorconfig` のあるディレクトリからの相対パスとしてマッチする。`subdir/*.c` は `subdir` 直下の `.c` ファイルのみ
- パターン中間に既に `/` がある場合、先頭の `/` は無関係。`/subdir/*.c` と `subdir/*.c` は同じ結果になる（master のみの記述、下記）
- 末尾が `/` で終わるセクション名はどのファイルにもマッチしない

### 波括弧の数値範囲

- 有効: `{1..3}`, `{-1..4}`。無効: `{-4..-5}`, `{3..1}`（`num1 < num2` が必要）。この記述は master のみ（下記）

### 長さ制約

- コアは 1024 文字までのセクション名を受理する必要がある。それ以上は実装依存

### 版の扱い

- `[seq]` / `[!seq]` のリテラル扱い、`{num1..num2}` の `num1 < num2` 要件、先頭 `/` の扱いは、spec.editorconfig.org が master `f580513` からビルドされた版（2026-11-14 取得）にあり、最新タグ v0.17.2（`329077a`）の `index.rst` には無い。タグ v0.17.2 の記述: 末尾 `/` で終わる名前はどのファイルにもマッチしない、`{s1}` のリテラル扱い、`\` エスケープ、1024 文字
- editorconfig.org のトップページはワイルドカード表で `?` を「任意の 1 文字」とだけ記し、`{s1,s2,s3}` を Core 0.11.0 以降とする。仕様側（上記）は `?` を `/` 以外とする
- Source: https://spec.editorconfig.org/#glob-expressions （取得日 2026-11-14、master `f580513`）
- Source: https://github.com/editorconfig/specification/blob/v0.17.2/index.rst （最新タグ v0.17.2 / `329077a`、取得日 2026-11-14）
- Source: https://editorconfig.org/ （取得日 2026-11-14）

## Related

- [specification](./specification.md) — ファイルフォーマット仕様
- [properties](./properties.md) — 全プロパティ詳細
- [best-practices](./best-practices.md) — 設定例
