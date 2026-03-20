# Options: Output

TypeDoc の Output オプション一覧。

## outputs

**Type:** `array`（出力設定オブジェクトの配列）
**Default:** なし
**CLI:** なし

複数の出力先とそのタイプおよび個別オプションを指定する。各出力オブジェクトには name（例: `"html"`, `"json"`, `"markdown"`）、path、およびオプションのレンダリング設定が含まれる。

```json
{
  "outputs": [
    { "name": "html", "path": "./docs" },
    { "name": "json", "path": "./docs/api.json" }
  ]
}
```

## out

**Type:** `string`（ファイルパス）
**Default:** なし
**CLI:** `--out <path/to/documentation/>`

デフォルト出力タイプの書き込み先を指定する。`outputs` オプションを上書きするショートカットとして機能する。プラグインによって変更されない限り、デフォルトで HTML を生成する。

```json
{
  "out": "./docs"
}
```

## html

**Type:** `string`（ファイルパス）
**Default:** なし
**CLI:** `--html <path/to/documentation/>`

HTML ドキュメント出力の場所を指定する。`outputs` オプションを上書きする出力ショートカットとして機能する。

```json
{
  "html": "./docs/html"
}
```

## json

**Type:** `string`（ファイルパス）
**Default:** なし
**CLI:** `--json <path/to/out-file.json>`

すべてのリフレクションデータを含む JSON ファイルの出力先を指定する。`outputs` オプションを上書きする出力ショートカットとして機能する。

```json
{
  "json": "./docs/api.json"
}
```

## pretty

**Type:** `boolean`
**Default:** `true`
**CLI:** `--pretty`

JSON 出力を読みやすい形式でフォーマットするかどうかを決定する。

```json
{
  "pretty": true
}
```

## emit

**Type:** `"docs" | "both" | "none"`
**Default:** `"docs"`
**CLI:** `--emit <value>`

TypeDoc が何を書き込むかを制御する。`"docs"` はドキュメントのみを出力し、`"both"` はドキュメントと JavaScript を出力し、`"none"` はファイルを出力せずに変換と検証を行う。

```json
{
  "emit": "docs"
}
```

## theme

**Type:** `string`
**Default:** `"default"`
**CLI:** `--theme <name>`

ドキュメントのレンダリングに使用するテーマを指定する。

```json
{
  "theme": "default"
}
```

## router

**Type:** `"kind" | "kind-dir" | "structure" | "structure-dir" | "group" | "category"`
**Default:** `"kind"`
**CLI:** `--router <name>`

HTML 出力のファイル構造を決定する。

- **kind:** メンバーの種類別にページを整理
- **kind-dir:** kind と同じだが、クリーン URL のためにディレクトリ内の index.html としてレンダリング
- **structure:** モジュール構造別にページを整理
- **structure-dir:** structure と同じだが、ディレクトリ内の index.html としてレンダリング
- **group:** グループタグ別にページを整理
- **category:** カテゴリタグ別にページを整理

```json
{
  "router": "kind"
}
```

## lightHighlightTheme

**Type:** `string`（Shiki テーマ名）
**Default:** なし（Shiki のデフォルト）
**CLI:** `--lightHighlightTheme <theme>`

ライトモードでのコードスニペットのシンタックスハイライト用 Shiki テーマを指定する。

```json
{
  "lightHighlightTheme": "github-light"
}
```

## darkHighlightTheme

**Type:** `string`（Shiki テーマ名）
**Default:** なし（Shiki のデフォルト）
**CLI:** `--darkHighlightTheme <theme>`

ダークモードでのコードスニペットのシンタックスハイライト用 Shiki テーマを指定する。

```json
{
  "darkHighlightTheme": "github-dark"
}
```

## highlightLanguages

**Type:** `string[]`
**Default:** `["bash", "console", "css", "html", "javascript", "json", "jsonc", "json5", "tsx", "typescript"]`
**CLI:** なし

コードブロックのハイライトに読み込む Shiki 文法を指定する。

```json
{
  "highlightLanguages": ["bash", "css", "html", "javascript", "json", "typescript", "python"]
}
```

## ignoredHighlightLanguages

**Type:** `string[]`
**Default:** `[]`
**CLI:** なし

ハイライト中に警告を生成せずに黙って無視すべきコードブロック内の言語。

```json
{
  "ignoredHighlightLanguages": ["mermaid", "plantuml"]
}
```

## typePrintWidth

**Type:** `number`
**Default:** `80`
**CLI:** `--typePrintWidth <number>`

型をレンダリングする際にコードが折り返される文字幅を設定する。変更するには対応するテーマの調整が必要。

```json
{
  "typePrintWidth": 120
}
```

## customCss

**Type:** `string`（ファイルパス）
**Default:** なし
**CLI:** `--customCss <path>`

アセットにコピーされテーマによって参照される CSS ファイルへのパス。

```json
{
  "customCss": "./src/custom-theme.css"
}
```

## customJs

**Type:** `string`（ファイルパス）
**Default:** なし
**CLI:** `--customJs <path>`

アセットにコピーされテーマによって参照される JavaScript ファイル（モジュールではない）へのパス。

```json
{
  "customJs": "./src/custom-script.js"
}
```

## customFooterHtml

**Type:** `string`（HTML コンテンツ）
**Default:** なし
**CLI:** `--customFooterHtml <html>`

ページフッターに挿入するカスタム HTML。

```json
{
  "customFooterHtml": "Copyright 2024 My Company"
}
```

## customFooterHtmlDisableWrapper

**Type:** `boolean`
**Default:** `false`
**CLI:** `--customFooterHtmlDisableWrapper`

有効にすると、カスタムフッター HTML の `<p>` 要素による自動ラッピングを無効にし、フォーマットを直接制御できる。

```json
{
  "customFooterHtmlDisableWrapper": true
}
```

## markdownItOptions

**Type:** `object`
**Default:** `{ "html": true, "linkify": true }`
**CLI:** なし

doc コメントを解析する際に markdown-it に転送される設定オプション。markdown-it のデフォルトをオーバーライドする。

```json
{
  "markdownItOptions": {
    "html": true,
    "linkify": true
  }
}
```

## markdownItLoader

**Type:** `function`
**Default:** なし
**CLI:** なし（JS 設定ファイル専用）

プラグインを設定するために markdown-it インスタンスを受け取るコールバック関数。JavaScript 設定ファイルでのみ使用可能。

```js
// typedoc.config.mjs
export default {
  markdownItLoader(parser) {
    parser.use(require("markdown-it-abbr"));
  }
};
```

## displayBasePath

**Type:** `string`（ファイルパス）
**Default:** 最も低い共通ディレクトリから自動決定
**CLI:** `--displayBasePath <path>`

ドキュメント内でファイルパスを表示するためのベースパス。表示にのみ影響し、リンク生成には影響しない。デフォルトは `basePath` オプションの値。

```json
{
  "displayBasePath": "./src"
}
```

## cname

**Type:** `string`（ドメイン名）
**Default:** なし
**CLI:** `--cname <domain>`

指定されたテキストで出力ディレクトリに CNAME ファイルを作成する。

```json
{
  "cname": "docs.example.com"
}
```

## favicon

**Type:** `string`（ファイルパス）
**Default:** なし
**CLI:** `--favicon <path>`

サイトの favicon として参照する favicon ファイル（`.ico`、`.png`、または `.svg`）へのパス。

```json
{
  "favicon": "./assets/favicon.ico"
}
```

## sourceLinkExternal

**Type:** `boolean`
**Default:** `false`
**CLI:** `--sourceLinkExternal`

有効にすると、HTML ドキュメント生成時にソースコードリンクが新しいタブで開く。

```json
{
  "sourceLinkExternal": true
}
```

## markdownLinkExternal

**Type:** `boolean`
**Default:** `false`
**CLI:** `--markdownLinkExternal`

有効にすると、コメントおよび Markdown ファイル内の http/https リンクが新しいタブで開く。

```json
{
  "markdownLinkExternal": true
}
```

## lang

**Type:** `string`（言語コード）
**Default:** `"en"`
**CLI:** `--lang <code>`

lang HTML 属性を設定し、ドキュメント生成に使用される翻訳を決定する。

```json
{
  "lang": "ja"
}
```

## locales

**Type:** `object`（ロケールをキーとした翻訳オーバーライド）
**Default:** なし
**CLI:** なし

指定されたロケールのカスタム翻訳。値は指定された言語のデフォルト翻訳をオーバーライドする。

```json
{
  "locales": {
    "ja": {
      "theme_search_placeholder": "検索..."
    }
  }
}
```

## githubPages

**Type:** `boolean`
**Default:** `true`
**CLI:** `--githubPages`

有効にすると、GitHub Pages が Jekyll を使用してドキュメントを処理するのを防ぐために `.nojekyll` ファイルを自動的に追加する。スコープ付きパッケージに便利。

```json
{
  "githubPages": true
}
```

## cacheBust

**Type:** `boolean`
**Default:** `false`
**CLI:** `--cacheBust`

有効にすると、前回のビルドからの古いアセットを防ぐために、script タグと link タグに生成タイムスタンプを含める。

```json
{
  "cacheBust": true
}
```

## hideGenerator

**Type:** `boolean`
**Default:** `false`
**CLI:** `--hideGenerator`

有効にすると、ページフッターの TypeDoc 帰属リンクを非表示にする。

```json
{
  "hideGenerator": true
}
```

## searchInComments

**Type:** `boolean`
**Default:** `false`
**CLI:** `--searchInComments`

有効にすると、ドキュメントサイトのコメントテキスト内を検索できる。注意: 検索インデックスのサイズが大幅に増加する。

```json
{
  "searchInComments": true
}
```

## searchInDocuments

**Type:** `boolean`
**Default:** `false`
**CLI:** `--searchInDocuments`

有効にすると、ドキュメントサイトのドキュメントテキスト内を検索できる。注意: 検索インデックスのサイズが大幅に増加する。

```json
{
  "searchInDocuments": true
}
```

## cleanOutputDir

**Type:** `boolean`
**Default:** `true`
**CLI:** `--cleanOutputDir`

TypeDoc が生成前に出力ディレクトリをクリーンアップするかどうかを制御する。

```json
{
  "cleanOutputDir": true
}
```

## titleLink

**Type:** `string`（URL）
**Default:** ドキュメントのホームページ
**CLI:** `--titleLink <url>`

ヘッダーのタイトルリンクの遷移先 URL を指定する。

```json
{
  "titleLink": "https://example.com"
}
```

## navigationLinks

**Type:** `object`（名前から URL へのマッピング）
**Default:** なし
**CLI:** なし

ページヘッダーナビゲーションに表示する追加リンクを定義する。

```json
{
  "navigationLinks": {
    "GitHub": "https://github.com/user/repo",
    "Website": "https://example.com"
  }
}
```

## sidebarLinks

**Type:** `object`（名前から URL へのマッピング）
**Default:** なし
**CLI:** なし

ページサイドバーに表示する追加リンクを定義する。

```json
{
  "sidebarLinks": {
    "Getting Started": "https://example.com/guide"
  }
}
```

## navigation

**Type:** `object`（ブーリアンプロパティ）
**Default:** `{ "includeCategories": true, "includeGroups": false, "includeFolders": true, "compactFolders": false, "excludeReferences": true }`
**CLI:** なし

左サイドバーのナビゲーション構造を制御する。`categorizeByGroup` オプションと相互作用する。

```json
{
  "navigation": {
    "includeCategories": true,
    "includeGroups": false,
    "includeFolders": true,
    "compactFolders": false,
    "excludeReferences": true
  }
}
```

## headings

**Type:** `object`（ブーリアンプロパティ）
**Default:** `{ "readme": true, "document": false }`
**CLI:** なし

readme ファイルおよびドキュメントのレンダリングされたページに説明的な見出しを表示するかどうかを決定する。

```json
{
  "headings": {
    "readme": true,
    "document": true
  }
}
```

## sluggerConfiguration

**Type:** `object`
**Default:** `{ "lowercase": true }`
**CLI:** なし

ページアンカーの生成方法を制御する。後方互換性のために存在し、小文字化はバージョン 0.27 時点でデフォルトで true。

```json
{
  "sluggerConfiguration": {
    "lowercase": true
  }
}
```

## navigationLeaves

**Type:** `string[]`
**Default:** なし
**CLI:** なし

ナビゲーションツリーで展開しない名前空間/モジュールを指定する。ネストされた名前空間にはドット表記を使用する（例: `"ParentNS.ChildNS"`）。

```json
{
  "navigationLeaves": ["InternalModule", "ParentNS.ChildNS"]
}
```

## visibilityFilters

**Type:** `object`（ブーリアン値）
**Default:** すべての標準フィルターがデフォルトで表示
**CLI:** なし

ドキュメントページで利用可能なフィルターを設定する。標準オプションには protected、private、inherited、external が含まれる。カスタムソート用の修飾子タグも追加可能。

```json
{
  "visibilityFilters": {
    "protected": true,
    "private": false,
    "inherited": true,
    "external": false
  }
}
```

## searchCategoryBoosts

**Type:** `object`（カテゴリから乗数へのマッピング）
**Default:** なし
**CLI:** なし

数値乗数を使用して、指定されたカテゴリ内のアイテムの検索関連性を高める。

```json
{
  "searchCategoryBoosts": {
    "Getting Started": 1.5
  }
}
```

## searchGroupBoosts

**Type:** `object`（グループから乗数へのマッピング）
**Default:** なし
**CLI:** なし

数値乗数を使用して、指定されたグループ内のアイテムの検索関連性を高める。

```json
{
  "searchGroupBoosts": {
    "Classes": 1.5
  }
}
```

## hostedBaseUrl

**Type:** `string`（URL）
**Default:** なし
**CLI:** なし

TypeDoc サイトがホストされるベース URL。サイトマップ生成、正規リンク、および絶対リンク生成の有効化に使用される。

```json
{
  "hostedBaseUrl": "https://docs.example.com"
}
```

## useHostedBaseUrlForAbsoluteLinks

**Type:** `boolean`
**Default:** `false`
**CLI:** なし

有効にし `hostedBaseUrl` が設定されている場合、相対リンクの代わりに絶対リンクを生成する。

```json
{
  "useHostedBaseUrlForAbsoluteLinks": true
}
```

## useFirstParagraphOfCommentAsSummary

**Type:** `boolean`
**Default:** `false`
**CLI:** なし

有効にすると、`@summary` タグでオーバーライドされない限り、モジュール/名前空間のメンバーリストでコメントの最初の段落を短い要約として使用する。

```json
{
  "useFirstParagraphOfCommentAsSummary": true
}
```

## includeHierarchySummary

**Type:** `boolean`
**Default:** `true`
**CLI:** `--includeHierarchySummary`

ドキュメント化されたメンバーの完全なクラス階層をリストする hierarchy.html ページを生成するかどうかを制御する。

```json
{
  "includeHierarchySummary": true
}
```

## 関連

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
