# Configuration

biome.json / biome.jsonc の全オプション。

## トップレベルプロパティ

| プロパティ | 説明 |
|-----------|------|
| `$schema` | JSON スキーマパス。ローカル: `./node_modules/@biomejs/biome/configuration_schema.json`、オンライン: `https://biomejs.dev/schemas/2.3.11/schema.json` |
| `extends` | 他の設定ファイルのパス配列。モノレポ: `"//"` でルート設定を参照 |
| `root` | ルート設定として扱うか（デフォルト: true）。ネスト設定では false |
| `files` | ファイル処理の対象範囲 |
| `vcs` | VCS 統合設定 |
| `formatter` | フォーマッター設定 |
| `linter` | リンター設定 |
| `assist` | アシスト設定 |
| `javascript` | JavaScript/TypeScript 設定 |
| `css` | CSS 設定 |
| `json` | JSON 設定 |
| `graphql` | GraphQL 設定 |
| `html` | HTML 設定 |
| `overrides` | ファイルパターン別の上書き設定 |
| `plugins` | GritQL プラグインパス配列 |

## files セクション

| オプション | 説明 |
|-----------|------|
| `files.includes` | グロブパターンでファイル指定。`!` で除外、`!!` で完全除外 |
| `files.ignoreUnknown` | 不明ファイルを無視（デフォルト: false） |
| `files.maxSize` | 最大ファイルサイズ（デフォルト: 1048576 = 1MB） |

## vcs セクション

| オプション | デフォルト | 説明 |
|-----------|-----------|------|
| `vcs.enabled` | false | VCS 統合有効化 |
| `vcs.clientKind` | — | `"git"` を指定 |
| `vcs.useIgnoreFile` | false | .gitignore/.ignore を尊重 |
| `vcs.root` | — | VCS ファイル検索フォルダ |
| `vcs.defaultBranch` | — | メインブランチ名 |

## formatter セクション

| オプション | デフォルト | 説明 |
|-----------|-----------|------|
| `enabled` | true | フォーマッター有効化 |
| `includes` | — | 対象ファイル（グロブ） |
| `indentStyle` | tab | インデント方式 |
| `indentWidth` | 2 | インデント幅 |
| `lineEnding` | lf | 改行コード |
| `lineWidth` | 80 | 最大行幅 |
| `formatWithErrors` | false | 構文エラー時も実行 |
| `attributePosition` | auto | HTML 属性位置 |
| `bracketSpacing` | true | 括弧内空白 |
| `expand` | auto | 配列・オブジェクト展開 |
| `trailingNewline` | true | ファイル末尾改行 |
| `useEditorconfig` | false | .editorconfig 参照 |

## javascript セクション

### パーサ
| オプション | デフォルト | 説明 |
|-----------|-----------|------|
| `unsafeParameterDecoratorsEnabled` | false | パラメータデコレータ |
| `jsxEverywhere` | true | .js でも JSX 許可 |

### フォーマッタ
| オプション | デフォルト |
|-----------|-----------|
| `quoteStyle` | double |
| `jsxQuoteStyle` | double |
| `quoteProperties` | asNeeded |
| `trailingCommas` | all |
| `semicolons` | always |
| `arrowParentheses` | always |
| `bracketSameLine` | false |
| `operatorLinebreak` | after |

### その他
- `linter.enabled` / `assist.enabled`
- `globals`: グローバル変数配列
- `jsxRuntime`: `"transparent"` / `"reactClassic"`

## css セクション

- `css.parser.cssModules`: CSS Modules サポート
- `css.parser.tailwindDirectives`: Tailwind CSS 構文
- `css.formatter.*`: CSS 固有フォーマッタ設定

## html セクション

- `html.experimentalFullSupportEnabled`: Vue/Svelte/Astro 対応
- `html.parser.interpolation`: `{{ }}` 式サポート
- `html.formatter.whitespaceSensitivity`: 空白処理方式

## overrides セクション

特定ファイルに対する設定上書き:

```json
{
  "overrides": [
    {
      "includes": ["generated/**"],
      "formatter": { "lineWidth": 160 }
    },
    {
      "includes": ["**/*.config.js"],
      "javascript": { "formatter": { "quoteStyle": "double" } }
    }
  ]
}
```

パターンの順序が重要。最初にマッチしたものが適用。

## グロブパターン

| パターン | 説明 |
|---------|------|
| `*` | 1 フォルダ内の全ファイル |
| `**` | 再帰的に全ファイル |
| `[...]` | 文字クラス |
| `!パターン` | 除外 |
| `!!パターン` | 完全除外（スキャナが無視） |
