# Env

App Router で環境変数を読み込む・Next.js ランタイム外で利用するためのコマンド集。

## @next/env をインストールする（Next.js ランタイム外で .env を読み込む）

```sh
npm install @next/env
```

ORM のルート設定ファイルやテストランナーなど、Next.js のランタイム外で `.env*` ファイルを読み込みたい場合に使う。インストール後、`loadEnvConfig(process.cwd())` を呼び出す設定ファイルを用意する。

## NODE_ENV を指定して開発サーバーを起動する

```sh
NODE_ENV=test next dev
```

`NODE_ENV` の許容値は `production` / `development` / `test`。未指定時、`next dev` は自動的に `development` を設定する（それ以外のコマンドは `production`）。

## NEXT_PUBLIC_ 変数をビルド時に埋め込んでビルドする

```sh
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk next build
```

`NEXT_PUBLIC_` 接頭辞の変数は `next build` 実行時にクライアント JS バンドルへインライン化される。ビルド後に値を変更しても反映されない点に注意する。

## PORT 環境変数でポートを指定する

```sh
PORT=4000 next dev
```

`PORT` は `.env` ファイルには設定できない（HTTP サーバー起動が他のコード初期化より先に走るため）。

Source: https://nextjs.org/docs/app/guides/environment-variables
