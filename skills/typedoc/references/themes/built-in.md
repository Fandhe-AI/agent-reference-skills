# ビルトインテーマ

TypeDocに同梱されているデフォルトテーマの機能と、テーマのカスタマイズオプション。TypeDocは1つのビルトインデフォルトテーマを提供し、追加テーマはプラグインによって提供される。

## 詳細説明

### テーマの指定

`--theme` オプションでテーマを変更できる。デフォルトでは `default` テーマが使用される。

```bash
typedoc --theme default
```

### カスタマイズオプション

デフォルトテーマは以下のオプションでカスタマイズできる。

#### customCss

カスタムCSSファイルを指定して、デフォルトテーマのスタイルを上書きする。

```bash
typedoc --customCss ./custom-styles.css
```

```json
{
  "customCss": "./custom-styles.css"
}
```

指定されたCSSファイルは生成されたドキュメントの全ページに適用される。デフォルトテーマのCSSクラスやCSS変数を上書きすることで、色、フォント、レイアウトなどを変更できる。

#### customJs

カスタムJavaScriptファイルを指定して、生成されたドキュメントにスクリプトを追加する。

```bash
typedoc --customJs ./custom-script.js
```

```json
{
  "customJs": "./custom-script.js"
}
```

指定されたJavaScriptファイルは全ページに読み込まれる。

#### customFooterHtml

カスタムHTMLをフッターに追加する。

```bash
typedoc --customFooterHtml "<p>Copyright 2024</p>"
```

```json
{
  "customFooterHtml": "<p>Copyright 2024 My Company</p>"
}
```

#### customFooterHtmlDisableWrapper

`customFooterHtml` で追加するフッター HTML の自動 `<p>` ラッパーを無効化する。

```json
{
  "customFooterHtmlDisableWrapper": true
}
```

### ルーター（出力フォルダー構造）

`--router` オプションで出力フォルダーの構造を変更できる（v0.28 以降）。デフォルトは `kind`。プラグインによる拡張も可能。

```json
{
  "router": "kind"
}
```

### CSS レイヤー

v0.28 以降、デフォルトテーマの CSS は `@layer typedoc` でラップされる。`customCss` で CSS を上書きする際、カスケードの制御に `@layer` を活用できる。

### ナビゲーション / サイドバーのカスタマイズ

デフォルトテーマはサイドバーナビゲーションを提供し、以下のような設定が可能：

- モジュール、名前空間、クラス等の階層構造に基づいたナビゲーション
- カテゴリやグループによるエントリの整理
- ナビゲーション項目の展開/折りたたみ

### デフォルトテーマの機能

- **検索機能** — ドキュメント内のシンボルを検索
- **ダークモード / ライトモード** — テーマの切り替え
- **ソースコードリンク** — ソースファイルへのリンク
- **型情報の表示** — パラメータ、戻り値、プロパティの型情報
- **継承関係の表示** — クラスの継承階層
- **シグネチャの表示** — 関数やメソッドのシグネチャ
- **Markdownレンダリング** — コメント内のMarkdownのレンダリング
- **コードブロックのシンタックスハイライト** — コード例のハイライト表示

## 注意点

- TypeDocには1つのビルトインテーマ（`default`）のみが同梱されている
- 追加テーマはプラグインとして提供される（[コミュニティテーマ](./community-themes.md)を参照）
- `customCss` でデフォルトテーマの内部CSSクラスやCSS変数を上書きできるが、テーマのアップデートで内部構造が変更される可能性がある
- `customJs` は全ページに読み込まれるため、パフォーマンスへの影響に注意
- v0.28 以降、組み込みCSSは `@layer typedoc` でラップされる。`customCss` で上書きする際はカスケード優先順位に注意

## 関連

- [コミュニティテーマ](./community-themes.md) — サードパーティ製テーマの一覧
- [コミュニティプラグイン](../plugins/community-plugins.md) — プラグイン一覧
