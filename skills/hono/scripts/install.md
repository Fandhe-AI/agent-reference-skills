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
