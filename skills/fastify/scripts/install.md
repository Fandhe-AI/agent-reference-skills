---
source: https://raw.githubusercontent.com/fastify/fastify/v5.12.1/docs/Guides/Getting-Started.md, https://raw.githubusercontent.com/fastify/fastify/v5.12.1/docs/Reference/TypeScript.md, https://github.com/fastify/fastify-cli/blob/main/README.md
---

# install

Fastify 本体と `fastify-cli`（scaffolding / dev サーバー CLI、v5.12.1 時点の Guides/Getting-Started.md・Reference/TypeScript.md、および fastify-cli 8.0.0 時点の README.md 由来）のインストールコマンド集。

## Fastify 本体のインストール（npm）

```sh
npm i fastify
```

## Fastify 本体のインストール（yarn）

```sh
yarn add fastify
```

## fastify-cli のインストール

```sh
npm i fastify-cli
```

CLI からのスキャフォールディング・開発サーバー起動が必要な場合に追加する。

## fastify-cli のグローバルインストール

```sh
npm install fastify-cli --global
```

`generate` / `generate-plugin` / `start` / `print-routes` / `print-plugins` / `readme` / `eject` / `generate-swagger` などのサブコマンドがシェルから直接使えるようになる。

## TypeScript 開発環境のセットアップ

```sh
npm init -y
npm i fastify
npm i -D typescript @types/node
```

`@types/node` のインストールを忘れないこと（TypeScript.md で強調されている必須手順）。

## TypeBox でスキーマバリデーションを行う場合

```sh
npm i typebox
```
