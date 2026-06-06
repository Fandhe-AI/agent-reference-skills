# Build & Deploy

React Router v7 アプリのビルドと各種デプロイ向けコマンド。

## プロダクションビルド

```sh
react-router build
```

Vite で本番向けビルドを実行する。`NODE_ENV=production` が設定され、出力がミニファイされる。

## アプリの起動（ビルド後）

```sh
npm start
```

ビルド成果物を使用してサーバーを起動する。`package.json` の `scripts.start` に定義されたコマンドに依存する。

## 型チェック（CI 向け）

```sh
react-router typegen && tsc --noEmit
```

CI でのビルド前に型を生成してから TypeScript の型チェックを実行する。`react-router typegen` で `.react-router/types/` に型を生成してから `tsc` を実行する必要がある。

## デプロイ向けテンプレートの作成

### Node.js + Docker（汎用）

```sh
npx create-react-router@latest --template remix-run/react-router-templates/default
```

AWS ECS, Google Cloud Run, Azure Container Apps, Digital Ocean, Fly.io, Railway に対応。

### Node.js + Docker + カスタムサーバー（Express）

```sh
npx create-react-router@latest --template remix-run/react-router-templates/node-custom-server
```

### Node.js + Docker + Postgres

```sh
npx create-react-router@latest --template remix-run/react-router-templates/node-postgres
```

Drizzle ORM + Postgres データベース付き。

## Cloudflare Workers テンプレート

> **警告**: Cloudflare Workers デプロイはランタイム制約（Node.js API 非対応）があるため、サーバーコードの互換性を事前に確認すること。

詳細は [Cloudflare 公式ガイド](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/) を参照。
