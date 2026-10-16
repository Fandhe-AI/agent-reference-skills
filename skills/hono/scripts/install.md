# Install

Hono プロジェクトのセットアップとパッケージインストール。

## プロジェクトの新規作成（npm）

```sh
npm create hono@latest my-app
cd my-app
npm i
```

テンプレート選択後、対象ランタイム（cloudflare-workers, nodejs, bun, deno 等）を指定する。

## プロジェクトの新規作成（pnpm）

```sh
pnpm create hono@latest my-app
cd my-app
pnpm i
```

## プロジェクトの新規作成（yarn）

```sh
yarn create hono my-app
cd my-app
yarn
```

## プロジェクトの新規作成（bun）

```sh
bun create hono@latest my-app
cd my-app
bun install
```

## プロジェクトの新規作成（deno）

```sh
deno init --npm hono@latest my-app
cd my-app
```

## 既存プロジェクトへの hono の追加

```sh
npm i hono
```

```sh
pnpm add hono
```

```sh
yarn add hono
```

```sh
bun add hono
```

## Node.js アダプターの追加

Node.js で Hono を動かすには `@hono/node-server` が必要。

```sh
npm i @hono/node-server
```

```sh
pnpm add @hono/node-server
```

```sh
yarn add @hono/node-server
```

```sh
bun add @hono/node-server
```

## Runtime adapter packages

v4.13.10 以降、ランタイムアダプターは独立パッケージとして公開されている。`hono/<adapter>` の import パスは v4.13.10+ で deprecated、v5 で削除される。

AWS Lambda:

```sh
npm i hono @hono/aws-lambda
```

Lambda@Edge:

```sh
npm i hono @hono/lambda-edge
```

Bun:

```sh
bun add @hono/bun
```

Deno:

```sh
deno add jsr:@hono/deno
```

Vercel（Next.js の既存プロジェクト）:

```sh
npm i @hono/vercel
```

Service Worker:

```sh
npm i hono @hono/service-worker
```

## Cloudflare Workers 型定義の追加

```sh
npm i --save-dev @cloudflare/workers-types
```

```sh
pnpm add -D @cloudflare/workers-types
```

```sh
yarn add -D @cloudflare/workers-types
```

```sh
bun add --dev @cloudflare/workers-types
```
