# Install

React Router v7 プロジェクトの作成とセットアップ。

## クイックスタート（推奨）

```sh
npx create-react-router@latest my-react-router-app
cd my-react-router-app
npm i
npm run dev
```

`http://localhost:5173` でアクセス可能。

## テンプレート指定

```sh
npx create-react-router@latest --template remix-run/react-router-templates/<template-name>
```

`<template-name>` は [react-router-templates](https://github.com/remix-run/react-router-templates) リポジトリのテンプレート名に置き換える。

## デプロイ向けテンプレート（Node.js + Docker）

```sh
npx create-react-router@latest --template remix-run/react-router-templates/default
```

AWS ECS, Google Cloud Run, Azure Container Apps, Digital Ocean, Fly.io, Railway に対応。

## Node.js + Docker + カスタムサーバー

```sh
npx create-react-router@latest --template remix-run/react-router-templates/node-custom-server
```

Express サーバーによる詳細な制御が必要な場合に使用。

## Node.js + Docker + Postgres

```sh
npx create-react-router@latest --template remix-run/react-router-templates/node-postgres
```

Drizzle ORM + Postgres データベース付き。
