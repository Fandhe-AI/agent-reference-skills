---
source: https://raw.githubusercontent.com/fastify/fastify/v5.12.1/docs/Guides/Getting-Started.md, https://raw.githubusercontent.com/fastify/fastify/v5.12.1/docs/Reference/TypeScript.md, https://github.com/fastify/fastify-cli/blob/v8.0.0/README.md, https://raw.githubusercontent.com/fastify/fastify-type-provider-typebox/v6.1.0/README.md
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

## TypeBox 単体でスキーマを組み立てる場合

```sh
npm i typebox
```

`typebox` のみのインストール。JSON Schema を手組みする代わりに TypeBox の型ビルダーで生成する用途で、Fastify の Type Provider 統合は含まない。

## TypeBox を Fastify の Type Provider として使う場合

```sh
npm i typebox
npm i @fastify/type-provider-typebox
```

`typebox` を peer dependency として先にインストールし、続けて `@fastify/type-provider-typebox` をインストールする（`fastify-type-provider-typebox` README の Installation 手順どおり）。`TypeBoxTypeProvider` で `fastify.withTypeProvider<TypeBoxTypeProvider>()` を使う場合はこちらが必要（`samples/type-provider-typebox.md` 参照）。

## samples/ が使用する外部パッケージ

`skills/fastify/samples/` 配下の実例コードが import している、Fastify 本体・`fastify-cli` 以外の外部パッケージ。

```sh
npm i fastify-plugin
```

プラグインのカプセル化境界を破って親スコープにデコレーターを公開する。`samples/plugin-encapsulation.md` / `samples/graceful-shutdown.md` / `samples/database-integration.md` で使用。

```sh
npm i @fastify/aws-lambda
```

Fastify アプリを AWS Lambda ハンドラーとしてラップする。`samples/serverless-lambda.md` で使用。

```sh
npm i mysql2
```

MySQL クライアント（Promise API は `mysql2/promise`）。`samples/database-integration.md` で使用。
