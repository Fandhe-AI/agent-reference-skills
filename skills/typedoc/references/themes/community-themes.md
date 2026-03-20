# コミュニティテーマ

TypeDocのコミュニティによって開発・提供されているサードパーティ製テーマの一覧。バージョン互換性別に整理。

## 詳細説明

テーマはnpmパッケージとしてインストールし、`--theme` オプションまたは `--plugin` オプションで指定する。各テーマはTypeDocの特定バージョンとの互換性がある。

## 一覧

### v0.28 対応テーマ

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-theme-oxide** | balthild | 0.2.5 | rustdocに似た見た目のTypeDocテーマ | MIT |
| **typedoc-github-theme** | killerjulian | 0.4.0 | GitHub Pagesでのドキュメント向けのエレガントでシームレスなテーマ | MIT |
| **@signalk/typedoc-signalk-theme** | tkurki | 0.4.0 | SignalK向けTypeDocテーマ | MIT |
| **typedoc-rhineai-theme** | hran2004 | 1.2.0 | GitHubスタイルの丁寧にデザインされたTypeDocテーマ | MIT |
| **typedoc-theme-fresh** | ekzhang | 0.2.3 | クリーンでミニマリストなTypeDocテーマ | MIT |
| **varvara-typedoc-theme** | mmarine | 0.3.9 | Varvaraテーマ | MIT |
| **ig-typedoc-theme** | igniteui | 7.0.1 | Infragistics製テーマ。バージョニングとローカライゼーション対応のAPIドキュメント | MIT |
| **typedoc-material-theme** | dmnsgn | 1.4.1 | Material 3ベースのTypeDocテーマ | MIT |
| **@typhonjs-typedoc/typedoc-theme-dmt** | typhonrt | 0.4.0 | デフォルトテーマのモダンでカスタマイズ可能なUX拡張 | MPL-2.0 |
| **typedoc-unhoax-theme** | sacdenoeuds | 0.5.3 | カスタムTypeDocテーマ | MIT |
| **typedoc-theme-hierarchy** | difuks | 6.0.0 | 階層表示テーマ | MIT |

### v0.27 対応テーマ

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-material-theme** | dmnsgn | — | Material 3ベースのTypeDocテーマ | MIT |
| **@mxssfd/typedoc-theme** | mxssfd | 1.1.7 | カスタムTypeDocテーマ（デモ・サンプル付き） | MIT |

### v0.26 対応テーマ

| パッケージ名 | 作者 | バージョン | 説明 | ライセンス |
|---|---|---|---|---|
| **typedoc-material-theme** | dmnsgn | — | Material 3ベースのTypeDocテーマ | MIT |
| **@mxssfd/typedoc-theme** | mxssfd | 1.1.7 | カスタムTypeDocテーマ（デモ・サンプル付き） | MIT |

## インストールと使用方法

### インストール

```bash
npm install --save-dev typedoc-theme-oxide
```

### 使用

```bash
typedoc --plugin typedoc-theme-oxide --theme oxide
```

または `typedoc.json` で設定：

```json
{
  "plugin": ["typedoc-theme-oxide"],
  "theme": "oxide"
}
```

## 注意点

- テーマはTypeDocの特定バージョンとの互換性がある。使用するTypeDocバージョンに対応したテーマを選択すること
- 各テーマのnpmページやGitHubリポジトリで最新の互換性情報を確認すること
- テーマの `--theme` オプションの値はパッケージごとに異なる場合がある。各テーマのドキュメントを参照
- ほとんどのテーマはMITライセンスだが、一部異なるライセンス（MPL-2.0等）のテーマがある
- テーマとプラグインは併用可能

## 関連

- [ビルトインテーマ](./built-in.md) — デフォルトテーマの機能とカスタマイズ
- [コミュニティプラグイン](../plugins/community-plugins.md) — プラグイン一覧
