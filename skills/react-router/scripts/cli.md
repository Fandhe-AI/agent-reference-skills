# CLI

`@react-router/dev` パッケージが提供する CLI コマンド。Framework Mode 専用。`devDependencies` に追加してサーバーへのデプロイを避けること。

## ヘルプの表示

```sh
npx @react-router/dev -h
```

## 開発サーバーの起動（react-router dev）

```sh
react-router dev
```

HMR（Hot Module Replacement）と HDR（Hot Data Revalidation）を有効にして開発モードで起動する。

主なオプション:

```sh
# ポート指定
react-router dev --port 3000

# ホスト指定
react-router dev --host 0.0.0.0

# 起動時にブラウザを開く
react-router dev --open

# 指定ポートが使用中の場合に終了
react-router dev --strictPort

# CORS を有効化
react-router dev --cors

# キャッシュを無視して再バンドル
react-router dev --force

# env モードを指定
react-router dev --mode staging

# ログレベルを指定（info / warn / error / silent）
react-router dev --logLevel warn
```

## プロダクションビルド（react-router build）

```sh
react-router build
```

Vite で本番向けビルドを実行。`NODE_ENV=production` が設定され、出力はミニファイされる。

主なオプション:

```sh
# ミニファイアを指定（esbuild / terser / false で無効化）
react-router build --minify terser

# クライアントビルドのソースマップ出力
react-router build --sourcemapClient

# サーバービルドのソースマップ出力
react-router build --sourcemapServer

# インライン化しきい値の変更（デフォルト: 4096 バイト）
react-router build --assetsInlineLimit 8192

# env モードを指定
react-router build --mode staging
```

## エントリーポイントの生成（react-router reveal）

```sh
npx react-router reveal
```

`app/entry.client.tsx` と `app/entry.server.tsx` を生成する。生成後は React Router がデフォルトの代わりにこれらを使用する。

```sh
# JavaScript ファイルとして生成
npx react-router reveal --no-typescript
```

実行は初回のみでよく、生成したファイルはリポジトリにコミットする。

## ルートツリーの表示（react-router routes）

```sh
react-router routes
```

```sh
# JSON 形式で出力
react-router routes --json
```

ルート設定の出力を確認するためのデバッグ用コマンド。

## 型生成（react-router typegen）

```sh
react-router typegen
```

全ルートの TypeScript 型を `.react-router/types/` に生成する。`react-router dev` 実行中は自動で実行されるが、CI では手動実行が必要。

```sh
# ウォッチモードで実行
react-router typegen --watch
```

CI で `tsc` を実行する前に型を生成するために使用する:

```sh
react-router typegen && tsc --noEmit
```
