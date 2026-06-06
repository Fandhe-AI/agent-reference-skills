# setup

プロジェクトの初期設定と設定ファイル生成のコマンド集。

## 設定ファイルの初期化（npm）

```sh
npx @biomejs/biome init
```

`biome.json` を生成する。

## 設定ファイルの初期化（JSONC 形式）

```sh
npx @biomejs/biome init --jsonc
```

`biome.jsonc` を生成する。

## 設定ファイルの初期化（pnpm）

```sh
pnpx @biomejs/biome init
```

## 設定ファイルの初期化（yarn）

```sh
yarn exec biome -- init
```

## 設定ファイルの初期化（bun）

```sh
bunx --bun @biomejs/biome init
```

## 設定ファイルの初期化（deno）

```sh
deno run -A npm:@biomejs/biome init
```

## デーモンサーバーの起動

```sh
biome start
```

LSP やエディター統合のためのデーモンを起動する。

## デーモンサーバーの停止

```sh
biome stop
```

## デバッグ情報の表示

```sh
biome rage
```

診断用の情報を表示する。デーモンログ・フォーマッター設定・リンター設定を確認できる。

## ルール・概念の説明表示

```sh
biome explain <name>
```

CLI の各種側面についてのドキュメントを表示する。
