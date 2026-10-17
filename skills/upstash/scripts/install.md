# Install

Upstash 各 SDK・CLI のインストールコマンド。

## @upstash/redis（TypeScript/JavaScript）

```sh
npm install @upstash/redis
```

## @upstash/qstash（TypeScript/JavaScript）

```sh
npm install @upstash/qstash
```

## @upstash/vector（TypeScript/JavaScript）

```sh
npm install @upstash/vector
```

## @upstash/search（TypeScript/JavaScript）

```sh
npm install @upstash/search
```

代替パッケージマネージャー:

```sh
yarn add @upstash/search
```

```sh
pnpm add @upstash/search
```

```sh
bun install @upstash/search
```

## @upstash/workflow（TypeScript/JavaScript）

```sh
npm install @upstash/workflow
```

代替パッケージマネージャー:

```sh
pnpm install @upstash/workflow
```

```sh
bun add @upstash/workflow
```

## @upstash/workflow-agents（TypeScript/JavaScript）

```sh
npm i @upstash/workflow @upstash/workflow-agents ai zod
```

## @upstash/ratelimit（TypeScript/JavaScript）

```sh
npm install @upstash/ratelimit
```

`@upstash/ratelimit` は Redis バックエンドが必要なため、`@upstash/redis` と併用する。

## @upstash/box（TypeScript/JavaScript）

```sh
npm install @upstash/box
```

代替パッケージマネージャー:

```sh
yarn add @upstash/box
```

```sh
pnpm add @upstash/box
```

```sh
bun install @upstash/box
```

## upstash-redis（Python）

```sh
pip install upstash-redis
```

Python 3.8 以上が必要。

## upstash-qstash（Python）

```sh
pip install upstash-qstash
```

## upstash-workflow（Python）

```sh
pip install upstash-workflow
```

FastAPI クイックスタートでは次の形で導入する。

```sh
pip install fastapi uvicorn upstash-workflow
```

## upstash-ratelimit（Python）

```sh
pip install upstash-ratelimit
```

## upstash-vector（Python）

```sh
pip install upstash-vector
```

## upstash-box（Python）

```sh
pip install upstash-box
```

## upstash（Upstash CLI）

```sh
npm i -g upstash
```

グローバルインストールにより `upstash` コマンドがパスに追加される。`npx upstash ...` でもインストールなしで実行できる。同一ビルドが `@upstash/cli` 名でも公開されている。Node.js 20 以上が必要。
