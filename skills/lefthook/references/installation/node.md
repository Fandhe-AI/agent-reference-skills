# Node.js (npm) でのインストール

Source: https://lefthook.dev/installation/node

## インストールコマンド

各パッケージマネージャーに対応したインストールコマンドは以下の通りです。

```
npm install --save-dev lefthook
```

```
yarn add --dev lefthook
```

```
pnpm add -D lefthook
```

## パッケージの選択肢

Lefthook は3つの NPM パッケージとして配布されています。

### 1. lefthook（推奨）

お使いのシステムに対応した単一の実行ファイルをインストールします。

```
npm install --save-dev lefthook
```

### 2. @evilmartians/lefthook（レガシー）

すべての OS 向けの実行ファイルをインストールします。

```
npm install --save-dev @evilmartians/lefthook
```

### 3. @evilmartians/lefthook-installer（レガシー）

インストール時に適切な実行ファイルを取得します。

```
npm install --save-dev @evilmartians/lefthook-installer
```

## pnpm 利用時の重要な設定

pnpm をパッケージマネージャーとして使用する場合、postinstall スクリプトが正しく実行されフックが正常にインストールされるよう、以下の設定が必要です。

- `pnpm-workspace.yaml` の `onlyBuiltDependencies` に `lefthook` を追加する
- ルートの `package.json` の `pnpm.onlyBuiltDependencies` に `lefthook` を追加する
