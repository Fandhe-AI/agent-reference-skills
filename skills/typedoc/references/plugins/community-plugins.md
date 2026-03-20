# コミュニティプラグイン

TypeDocのコミュニティによって開発・提供されているプラグインの一覧。`--plugin` フラグで読み込み可能。npmで `typedoc-plugin` キーワードで検索できる。

## 詳細説明

TypeDocはプラグインシステムを持ち、`--plugin` オプションでプラグインを指定して機能を拡張できる。

```bash
typedoc --plugin typedoc-plugin-markdown
```

```json
{
  "plugin": ["typedoc-plugin-markdown", "typedoc-plugin-mdn-links"]
}
```

## 一覧

### v0.28 対応プラグイン

#### 出力形式・Markdown

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-markdown** | tgreyuk | 4.11.0 | TypeScript APIドキュメントをMarkdown形式で生成 | MIT |
| **typedoc-plugin-md** | ocavue | 0.7.1 | Markdownドキュメント生成 | MIT |
| **typedoc-plugin-inline-sources** | tgreyuk | 1.3.0 | ソースコードをドキュメントにインライン表示 | MIT |

#### 型情報・表示改善

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-zod** | gerrit0 | 1.4.3 | `z.infer<typeof x>` を推論された型に置換 | MIT |
| **typedoc-plugin-valibot** | mkljczk | 1.0.2 | `v.InferOutput<typeof x>` を推論された型に置換 | MIT |
| **typedoc-plugin-vue** | gerrit0 | 1.5.1 | Vue `defineComponent` とPiniaの表示を改善 | MIT |
| **typedoc-plugin-missing-exports** | gerrit0 | 4.1.2 | エクスポートされていない型もドキュメントに含める | MIT |
| **typedoc-plugin-rename-defaults** | felipecrs | 0.7.3 | `default` エクスポートを元の名前にリネーム | MIT |

#### リンク・参照

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-mdn-links** | gerrit0 | 5.1.1 | グローバル型をMDNドキュメントにリンク | MIT |
| **typedoc-plugin-dt-links** | gerrit0 | 2.0.46 | `@types` パッケージのGitHubソースコードリンクを追加 | MIT |
| **typedoc-plugin-redirect** | gerrit0 | 1.3.0 | 生成サイトにリダイレクトページを追加 | MIT |

#### ドキュメント構造・組織化

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-merge-modules** | krisztianb | 7.0.0 | モジュールコンテンツをマージ | ISC |
| **typedoc-plugin-no-inherit** | jonchardy | 1.6.1 | 継承メンバーをドキュメントから除外 | MIT |
| **typedoc-plugin-default-groups** | herveperchec | 1.0.2 | リフレクションにデフォルトグループを追加 | GPL-3.0-only |

#### ナビゲーション

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-navigation-title** | herveperchec | 1.2.3 | `@navigationTitle` タグでカスタムナビゲーションタイトルを設定 | GPL-3.0-only |
| **typedoc-plugin-navigation-hooks** | herveperchec | 1.1.2 | ナビゲーション関連フック（実験的） | GPL-3.0-only |

#### テキスト処理

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-replace-text** | krisztianb | 4.2.0 | ドキュメント内のテキストを置換 | ISC |
| **@reside-ic/typedoc-plugin-copy-doc** | m-kusumgar | 1.1.2 | 関連ドキュメントをコピー | MIT |

#### ダイアグラム・可視化

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-umlclass** | krisztianb | 0.10.2 | UMLクラスダイアグラムを生成 | ISC |
| **@boneskull/typedoc-plugin-mermaid** | boneskull | 0.2.1 | Mermaidダイアグラムのレンダリング | BlueOak-1.0.0 |

#### バージョン管理

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **@r74tech/typedoc-plugin-monorepo-versions** | r74tech | 1.0.2 | モノレポのバージョン選択メニュー付きドキュメントビルド追跡 | MIT |
| **@shipgirl/typedoc-plugin-versions** | 0t4u | 0.3.2 | バージョン選択メニュー付きビルド追跡 | MIT |

#### コード例・インポート

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-include-example** | ferdodo | 3.0.2 | ファイルをサンプルコードとして取り込み | MIT |
| **typedoc-plugin-import-target** | herveperchec | 1.4.0 | インポートターゲットを解決しコードブロックを挿入 | GPL-3.0-only |
| **typedoc-plugin-language-switcher** | jackmacwindows | 1.0.2 | コードブロックで複数言語の切り替えを提供 | ISC |

#### 追加機能・ユーティリティ

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-extras** | drarig29 | 4.0.1 | favicon、description、生成日時等の追加情報 | MIT |
| **typedoc-plugin-coverage** | gerrit0 | 4.0.2 | ドキュメントカバレッジバッジを生成 | MIT |
| **typedoc-plugin-llms-txt** | boneskull | 0.1.2 | LLM消費用の `llms.txt` ファイルを生成 | BlueOak-1.0.0 |
| **@typhonjs-typedoc/typedoc-pkg** | typhonrt | 0.4.1 | package.jsonからのゼロコンフィグAPIドキュメント生成CLI | MPL-2.0 |

#### アナリティクス

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-umami-analytics** | lordofbacon | 1.0.1 | Umami Analyticsトラッキングを統合 | Apache-2.0 |
| **@8hobbies/typedoc-plugin-plausible** | hong-xu | 2.2.0 | Plausible Analyticsトラッキングを追加 | Apache-2.0 |

### v0.27 追加対応プラグイン

上記v0.28対応プラグインに加え、以下のプラグインがv0.27で利用可能。

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-ga** | eubereveloper | 1.1.1 | Google Analyticsを追加 | — |
| **@vpalmisano/typedoc-plugin-ga** | vpalmisano | 1.0.6 | Google Analytics統合 | — |
| **@8hobbies/typedoc-plugin-404** | hong-xu | 3.2.1 | 404ページを生成 | — |
| **@giancosta86/typedoc-readonly** | giancosta86 | 1.0.1 | 高度なReadonlyサポート | — |
| **typedoc-plugin-external-link** | imranbarbhuiya | 3.0.2 | カスタム外部リンクを追加 | — |

### v0.26 追加対応プラグイン

上記に加え、以下のプラグインがv0.26で利用可能。

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-plugin-custom-validation** | rebeccastevens | 2.0.2 | カスタムバリデーション | BSD-3-Clause |
| **@emuanalytics/typedoc-plugin-no-inherit** | robin.summerhill | 1.4.2 | 継承除外（旧バージョン互換） | MIT |
| **typedoc-plugin-emojify** | mrfigg | 1.0.1 | 絵文字パースサポートを追加 | — |
| **@mrfigg/typedoc-plugin-lib-utils** | mrfigg | 1.3.1 | ユーティリティ関数 | — |
| **typedoc-plugin-document-page-headings** | mrfigg | 1.0.0 | ページ見出しを追加 | — |
| **typedoc-plugin-version-header** | mrfigg | 1.0.0 | ページヘッダーにバージョン表示 | — |
| **typedoc-plugin-rename-documents** | mrfigg | 1.0.0 | ドキュメントのリネーム | — |
| **typedoc-plugin-github-widget** | mrfigg | 1.0.0 | GitHubウィジェットを追加 | — |
| **nil-typedoc-plugin-markdown** | khannanov-nil | 4.3.1 | Markdown生成 | — |
| **@konami-emoji-blast/typedoc** | joshuakgoldberg | 0.0.2 | 絵文字統合 | — |
| **typedoc-plugin-mermaid** | kamiazya | 1.12.0 | mermaid.jsダイアグラムのグラフ生成 | — |
| **@zamiell/typedoc-plugin-not-exported** | zamiell | 0.3.0 | エクスポートされていないシンボルを含める | — |

## 注意点

- プラグインはTypeDocの特定バージョンとの互換性がある。使用するTypeDocバージョンに対応したプラグインを選択すること
- 複数のプラグインは配列で指定可能: `"plugin": ["plugin-a", "plugin-b"]`
- プラグインの開発については、TypeDocのPlugin Developmentドキュメントを参照
- GPL-3.0-onlyライセンスのプラグインは、プロジェクトのライセンスとの互換性に注意
- npmで `typedoc-plugin` キーワードで最新のプラグインを検索できる
- 各プラグインの詳細な設定オプションは、各プラグインのnpmページやGitHubリポジトリを参照

## 関連

- [ビルトインテーマ](../themes/built-in.md) — デフォルトテーマの機能
- [コミュニティテーマ](../themes/community-themes.md) — サードパーティ製テーマ
