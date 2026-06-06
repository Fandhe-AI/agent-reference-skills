# Install

TSDoc 関連パッケージのインストール。

## ESLint プラグインのインストール

```sh
npm install --save-dev eslint-plugin-tsdoc
```

TypeScript プロジェクトへの TSDoc 構文検証ルールを追加する。`typescript-eslint` セットアップ済みの環境が前提。

## tsdoc-config パッケージのインストール

```sh
npm install @microsoft/tsdoc-config
```

`tsdoc.json` 設定ファイルの読み込みに使用するパッケージ。カスタムタグ定義や設定の継承が必要な場合にインストールする。

## tsdoc パーサーのインストール

```sh
npm install @microsoft/tsdoc
```

TSDoc コメントのプログラム的な解析に使用するリファレンス実装。ドキュメント生成ツール（API Extractor、TypeDoc 等）が内部で使用する。
