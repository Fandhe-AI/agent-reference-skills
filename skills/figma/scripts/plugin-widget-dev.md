# Plugin / Widget Dev

Figma Plugin および Widget の開発環境セットアップ・ビルドコマンド。

## Plugin: create-figma-plugin でプロジェクト作成

```sh
npx --yes create-figma-plugin
```

対話形式でプラグインの種類・名前・TypeScript 使用有無等を選択してプロジェクトを生成する（コミュニティ製ツールキット）。

## Plugin: Plugma でプロジェクト作成

```sh
npm create plugma@latest
```

バンドル・UI コンポーネント等が設定済みのプロジェクトを生成する（コミュニティ製）。

## Plugin: AI プラグインテンプレートを使用

```sh
npx create-next-app@latest --example https://github.com/figma/ai-plugin-template/
```

Figma 公式の AI プラグインテンプレートから Next.js プロジェクトを生成する。

## Plugin: 既存テンプレートの依存関係インストール

```sh
npm install
```

Figma が提供するサンプルテンプレートをダウンロードした後に実行する。

## Plugin: TypeScript 型定義のインストール

```sh
npm install --save-dev @figma/plugin-typings
```

プラグイン API の型定義をインストールする。TypeScript バージョンの確認は `tsc -v` で行う。

## Plugin: Webpack でのビルドセットアップ

```sh
npm install webpack webpack-cli --save-dev
npm install --save-dev typescript ts-loader
```

```sh
# 一回ビルド
npm run build
```

```sh
# ウォッチモード（変更検知して自動ビルド）
npm run build -- --watch
```

`package.json` の `scripts.build` に `webpack` コマンドを設定している場合のコマンド例。

## Widget: テンプレートからプロジェクト作成

```sh
npm init @figma/widget
```

公式テンプレートを使って Widget プロジェクトを初期化する。

## Widget: 型定義のインストール

```sh
npm install --save-dev @figma/widget-typings @figma/plugin-typings
```

Widget API と Plugin API 両方の型定義をインストールする。

## Widget: 依存関係インストール

```sh
npm install
```

## Widget: ウォッチモードでコンパイル（VS Code）

VS Code で `Terminal > Run Build Task...` を選択し、`npm: watch` を実行する。

コマンドラインから直接実行する場合は `package.json` の `watch` スクリプトに `tsc --watch` 等を設定する。

## TypeScript バージョン確認

```sh
tsc -v
```

## Node.js バージョン確認

```sh
node --version
```
