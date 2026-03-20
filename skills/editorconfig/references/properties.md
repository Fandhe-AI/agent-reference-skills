# EditorConfig プロパティ

EditorConfig で使用可能な全プロパティの詳細。

## universally supported プロパティ

全エディタプラグインでサポートされるプロパティ。

### root

| 項目 | 値 |
|------|-----|
| 値 | `true` |
| 配置 | プリアンブルのみ（セクション外） |
| 説明 | `true` に設定すると、それ以上親ディレクトリの `.editorconfig` を検索しない |

```ini
# これ以上上位を検索しない
root = true
```

### indent_style

| 項目 | 値 |
|------|-----|
| 値 | `tab`, `space` |
| 説明 | インデントスタイル。`tab` はハードタブ、`space` はソフトタブ |

`tab` の場合、可能な限りハードタブで埋め、残りをスペースで埋める。

### indent_size

| 項目 | 値 |
|------|-----|
| 値 | 正の整数、または `tab` |
| 説明 | インデント1レベルあたりの列数、およびソフトタブの幅 |

- `tab` に設定した場合、`tab_width` の値が使用される（`tab_width` 未指定ならエディタのデフォルト）

### tab_width

| 項目 | 値 |
|------|-----|
| 値 | 正の整数 |
| デフォルト | `indent_size` の値 |
| 説明 | タブ文字の表示幅（列数） |

通常は `indent_size` から自動設定されるため、明示的な指定は不要な場合が多い。

### end_of_line

| 項目 | 値 |
|------|-----|
| 値 | `lf`, `cr`, `crlf` |
| 説明 | 改行コード |

| 値 | 改行コード | 主な使用 OS |
|----|-----------|------------|
| `lf` | `\n` | Linux, macOS |
| `cr` | `\r` | 旧 Mac OS |
| `crlf` | `\r\n` | Windows |

### charset

| 項目 | 値 |
|------|-----|
| 値 | `latin1`, `utf-8`, `utf-8-bom`, `utf-16be`, `utf-16le` |
| 説明 | ファイルの文字エンコーディング |

`utf-8-bom` の使用は非推奨。

### trim_trailing_whitespace

| 項目 | 値 |
|------|-----|
| 値 | `true`, `false` |
| 説明 | `true` で改行前の末尾空白を除去 |

#### 適用タイミング

- ファイルオープン時: 適用しない
- ファイル保存時: エディタ組み込み設定を適用

### insert_final_newline

| 項目 | 値 |
|------|-----|
| 値 | `true`, `false` |
| 説明 | `true` でファイル末尾に改行を保証、`false` で改行がないことを保証 |

#### 適用タイミング

- ファイルオープン時: 適用しない
- ファイル保存時: エディタ組み込み設定を適用

#### 注意点

- 空ファイルの保存時、`insert_final_newline = true` でも改行を挿入してはならない

## limited support プロパティ

一部エディタのみでサポートされるプロパティ。

### max_line_length

| 項目 | 値 |
|------|-----|
| 値 | 正の整数、または `off` |
| 説明 | 指定文字数での強制改行 |
| サポート | Emacs, Vim, Neovim, Atom, ReSharper, Rider, IntelliJ IDEA, PhpStorm, PyCharm, RubyMine, WebStorm, Kakoune, Prettier |

### spelling_language

| 項目 | 値 |
|------|-----|
| 値 | `ss` または `ss-TT` 形式 |
| 説明 | スペルチェック言語 |

- `ss`: ISO 639 の2文字言語コード（例: `en`）
- `TT`: ISO 3166 の2文字地域コード（例: `US`）
- 例: `en`, `en-US`, `ja`
- 1つの言語のみ指定可能。デフォルト値なし

## 共通ルール

### 大文字小文字

- プロパティ名と値はすべて **大文字小文字を区別しない**
- パース後に小文字化される

### unset

任意のプロパティで値に `unset` を設定すると、そのプロパティの効果を無効化し、エディタのデフォルト設定が使用される。

```ini
[*.md]
indent_size = unset
```

### 未知のプロパティ

- EditorConfig コアは仕様に定義されていないキーバリューペアも受理・報告する
- エディタプラグインは未知のキーや無効な値を **無視** する

## プロパティ適用タイミング一覧

| プロパティ | オープン時 | 保存時 |
|-----------|----------|--------|
| indent_style | 適用 | - |
| indent_size | 適用 | - |
| tab_width | 適用 | - |
| end_of_line | 適用 | 適用 |
| charset | 適用 | 適用 |
| trim_trailing_whitespace | - | 適用 |
| insert_final_newline | - | 適用 |

## 関連

- [specification](./specification.md) — 正式仕様
- [glob-patterns](./glob-patterns.md) — グロブパターン
- [best-practices](./best-practices.md) — 設定例・FAQ
