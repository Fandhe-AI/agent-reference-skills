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

CLI・プラットフォーム・環境・設定・ワークスペース・デーモンサーバーの診断レポートを表示する。

## 診断情報の表示（デーモンログ付き）

```sh
biome rage --daemon-logs
```

最新のデーモンサーバーログを含める。CLI がデーモンに接続していない場合は、実行中の Biome デーモンインスタンスも探索する。

## 診断情報の表示（フォーマッター設定付き）

```sh
biome rage --formatter
```

読み込まれたフォーマッター設定を含める。

## 診断情報の表示（リンター設定付き）

```sh
biome rage --linter
```

読み込まれたリンター設定と有効なリントルールを含める。

## LSP プロキシの起動

```sh
biome lsp-proxy
```

デーモンサーバーの起動を保証したうえで、標準入出力とデーモンの間で Language Server Protocol のメッセージを中継する。通常はエディター拡張が起動する。

## ルールの説明表示

```sh
biome explain noDebugger
```

指定したリントルールのドキュメントを表示する。

## デーモンログのパス表示

```sh
biome explain daemon-logs
```

デーモンサーバーのログディレクトリのパスを表示する。
