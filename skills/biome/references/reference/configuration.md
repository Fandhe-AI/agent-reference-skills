# Configuration

`biome.json` / `biome.jsonc` の全オプション（Biome 2.5.15 のスキーマに準拠）。

## Signature / Usage

```json
{
  "$schema": "https://biomejs.dev/schemas/2.5.15/schema.json",
  "files": { "includes": ["src/**"] },
  "formatter": { "enabled": true },
  "linter": { "enabled": true, "rules": { "preset": "recommended" } }
}
```

## トップレベルプロパティ

| プロパティ | 説明 |
|-----------|------|
| `$schema` | JSON スキーマのパス。ローカル: `./node_modules/@biomejs/biome/configuration_schema.json`（インストール済みバージョンと常に一致）。オンライン: `https://biomejs.dev/schemas/2.5.15/schema.json`（使用中のバージョンに合わせる。不一致の場合 Biome が警告する） |
| `extends` | 他の設定ファイルへのパスの配列。モノレポでは `"//"` がルート設定を指す |
| `root` | ルート設定かどうか（既定: true）。ネストした設定では false にする |
| `files` | 処理対象ファイルの範囲 |
| `vcs` | VCS 統合の設定 |
| `formatter` | フォーマッターの設定 |
| `linter` | リンターの設定 |
| `assist` | アシストの設定 |
| `javascript` | JavaScript/TypeScript の設定 |
| `css` | CSS の設定 |
| `json` | JSON の設定 |
| `graphql` | GraphQL の設定 |
| `html` | HTML の設定 |
| `overrides` | ファイルパターンごとの上書き |
| `grit` | GritQL（.grit）ファイルのフォーマッター / リンター / アシスト設定 |
| `plugins` | GritQL プラグインの配列。各要素は文字列パスまたは `{ "path": string, "includes"?: string[] }` |

### plugins の要素

| オプション | 説明 |
|-----------|------|
| `plugins.<ITEM>.path` | プラグインの `.grit` ファイル、または `biome-manifest.jsonc` を含むディレクトリ |
| `plugins.<ITEM>.includes` | プラグインを実行するファイルの glob（`!` で除外）。省略時はリント対象の全ファイル。`[]` はファイルなし |

## files セクション

| オプション | 説明 |
|-----------|------|
| `files.includes` | 処理対象ファイルの glob パターン。`!` で除外、`!!` で強制無視 |
| `files.ignoreUnknown` | 未知のファイルを無視する（既定: false） |
| `files.maxSize` | 最大ファイルサイズ（既定: 1048576 = 1 MiB） |
| `files.experimentalScannerIgnores` | 非推奨（2.3.0 以降）。スキャナーが無条件に無視するパス要素の配列。`files.includes` の強制無視（`!!`）を使うか、`biome migrate` で移行する |

## vcs セクション

| オプション | 既定値 | 説明 |
|-----------|-----------|------|
| `vcs.enabled` | false | VCS 統合を有効化 |
| `vcs.clientKind` | - | `"git"` を指定 |
| `vcs.useIgnoreFile` | false | .gitignore/.ignore を尊重 |
| `vcs.root` | - | VCS ファイルを探すフォルダー |
| `vcs.defaultBranch` | - | メインブランチ名 |

## linter / assist セクション（プリセット）

| オプション | 説明 |
|-----------|------|
| `linter.enabled` / `linter.includes` | リンターの有効化 / 対象ファイル（`files.includes` を絞り込むのみ） |
| `linter.domains` | `Record<ドメイン名, "recommended" \| "all" \| "none">`。15 ドメイン: astro / drizzle / next / playwright / project / qwik / react / reactNative / solid / svelte / tailwind / test / turborepo / types / vue（`domains.md` 参照） |
| `linter.rules.recommended` | 非推奨。次期メジャーで削除予定。`linter.rules.preset` または `biome migrate` を使う |
| `linter.rules.preset` | `"recommended"`（既定）\| `"all"`（nursery 以外の全ルール）\| `"none"` |
| `linter.rules.[group]` | `"off" \| "on" \| "info" \| "warn" \| "error" \| { preset?, recommended?, [rule]? }` |
| `linter.rules.[group].preset` | グループ単位のプリセット（`linter.rules.preset` を上書き。個別ルールの設定が最優先） |
| `linter.rules.[group].[rule]` | `"off" \| "on" \| "info" \| "warn" \| "error"` またはオブジェクト `{ level, options?, fix? }` |
| `assist.enabled` / `assist.includes` | アシストの有効化 / 対象ファイル |
| `assist.actions.preset` | `"recommended"`（既定）\| `"all"` \| `"none"` |
| `assist.actions.[group].preset` | グループ単位のプリセット。`preset` は `assist.actions.[group].recommended` より優先される |
| `assist.actions.[group].[action]` | `"on" \| "off"` またはオブジェクト `{ level, options }` |

## formatter セクション

| オプション | 既定値 | 説明 |
|-----------|-----------|------|
| `enabled` | true | フォーマッターを有効化 |
| `includes` | - | 対象ファイル（glob） |
| `indentStyle` | tab | インデントスタイル |
| `indentWidth` | 2 | インデント幅 |
| `lineEnding` | lf | 改行コード |
| `lineWidth` | 80 | 最大行幅 |
| `formatWithErrors` | false | 構文エラーがあってもフォーマットする |
| `attributePosition` | auto | HTML 属性の位置 |
| `bracketSameLine` | false | 複数行の HTML / JSX 開始タグの閉じ括弧を最後の属性行の末尾に置く |
| `bracketSpacing` | true | 括弧内のスペース |
| `delimiterSpacing` | false | 1 行に収まる対応する区切り文字の内側のスペース（2.5.0。対象の区切り文字は言語による。言語別のキーもある） |
| `expand` | auto | 配列 / オブジェクトの展開 |
| `trailingNewline` | true | ファイル末尾の改行 |
| `useEditorconfig` | false | .editorconfig を読み込む |

## javascript セクション

### パーサー
| オプション | 既定値 | 説明 |
|-----------|-----------|------|
| `unsafeParameterDecoratorsEnabled` | false | パラメータデコレーター |
| `gritMetavariables` | false | JS/TS 構文内の Grit メタ変数をパースする |
| `jsxEverywhere` | true | .js ファイルでの JSX を許可 |

### フォーマッター
| オプション | 既定値 |
|-----------|-----------|
| `quoteStyle` | double |
| `jsxQuoteStyle` | double |
| `quoteProperties` | asNeeded |
| `trailingCommas` | all |
| `semicolons` | always |
| `arrowParentheses` | always |
| `bracketSameLine` | false |
| `delimiterSpacing` | false |
| `operatorLinebreak` | after |

### その他
- `linter.enabled` / `assist.enabled`
- `globals`: グローバル変数の配列
- `jsxRuntime`: `"transparent"`（既定）/ `"reactClassic"`
- `resolver.experimentalPnpmCatalogs`（既定 false。2.5.0 で opt-in として追加）: `pnpm-workspace.yaml` の `catalog` / `catalogs` を使って `catalog:` バージョンを解決する
- `experimentalEmbeddedSnippetsEnabled`（既定 false）: JS/TS のテンプレートリテラルに埋め込まれた CSS（`css` / `styled`）と GraphQL（`gql` / `graphql`）をパース・フォーマット・リントする（補間を含むテンプレートは非対応）

## json セクション

- `json.parser.allowComments` / `json.parser.allowTrailingCommas`: `.json` でコメント / 末尾カンマを許可（未設定時はファイル種別の既定に従う。`biome.jsonc` は常にコメントを許可）
- `json.formatter.*`（`delimiterSpacing` を含む）/ `json.linter.enabled` / `json.assist.enabled`

## css セクション

- `css.parser.cssModules`: CSS Modules のサポート（未設定時は `.module.css` で自動的に有効）
- `css.parser.tailwindDirectives`: Tailwind CSS 構文
- `css.parser.allowWrongLineComments`（既定 false）: 通常の CSS で `//` 行コメントを許可
- `css.formatter.*`（`delimiterSpacing` を含む）: CSS 固有のフォーマッター設定
- `css.globals`: 将来の CSS アナライザー用に予約。現時点では効果なし

## html セクション

- `html.experimentalFullSupportEnabled`: Vue/Svelte/Astro のサポート（フォーマッターは `html.formatter.enabled` で別途有効化が必要）
- `html.parser.interpolation`: `{{ }}` 式のサポート
- `html.parser.vue`（既定 false、2.5.0）: `.html` で Vue 構文（`v-if` / `v-bind` など）を有効化。`html.parser.interpolation` も有効になる
- `html.formatter.whitespaceSensitivity`: 空白の扱いモード
- `html.formatter.indentScriptAndStyle`（既定 false）: `<script>` / `<style>` の内容を 1 段インデントする
- `html.formatter.selfCloseVoidElements`（`"never"`（既定）/ `"always"`）: void 要素に `/` を付けるか

## grit セクション

GritQL（.grit）ファイルの設定:

| オプション | 既定値 | 説明 |
|-----------|-----------|------|
| `grit.formatter.enabled` | false | GritQL ファイルのフォーマットを有効化 |
| `grit.formatter.indentStyle` | tab | インデントスタイル |
| `grit.formatter.indentWidth` | 2 | インデント幅 |
| `grit.formatter.lineWidth` | 80 | 最大行幅 |
| `grit.formatter.trailingNewline` | true | ファイル末尾の改行 |
| `grit.linter.enabled` | true | GritQL ファイルのリントを有効化 |
| `grit.assist.enabled` | true | GritQL ファイルのアシストを有効化 |

## overrides セクション

特定のファイルに対して設定を上書きする:

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

パターンの順序が重要。最初にマッチしたパターンが適用される。

## glob パターン

| パターン | 説明 |
|---------|------|
| `*` | 1 つのフォルダー内の全ファイル |
| `**` | 再帰的に全ファイル |
| `[...]` | 文字クラス |
| `!pattern` | 除外 |
| `!!pattern` | 強制無視（スキャナーにも無視される） |

## Notes

- 公式ページは 2026-10 に手書きのリファレンスへ再構成された（website #4508）。`<ITEM>` は配列の要素、`[group]` / `[rule]` / `[action]` は名前のプレースホルダー
- `grit.formatter.quoteStyle` は 2.5.15 のスキーマに存在しないため、ここから削除した
- ドキュメント HEAD で異なる設定は、2.5.15 のスキーマとリリース版ページに従って記録している

## Related

- [cli.md](./cli.md)
- [../linter/domains.md](../linter/domains.md)
- [../guides/configure-biome.md](../guides/configure-biome.md)
