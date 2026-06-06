# Dev

ローカル開発サーバーの起動とホットリロード。

## 開発サーバーの起動（npm）

```sh
npm run dev
```

## 開発サーバーの起動（pnpm）

```sh
pnpm dev
```

## 開発サーバーの起動（yarn）

```sh
yarn dev
```

## 開発サーバーの起動（bun）

```sh
bun run dev
```

ポートのデフォルト値はランタイムにより異なる（Cloudflare Workers: 8787 / Node.js: 3000 / Vite: 5173）。

## Bun のホットリロード起動

```sh
bun run --hot src/index.ts
```

`--hot` フラグでファイル変更を検出して自動再起動する。

## Deno の開発サーバー起動

```sh
deno task start
```

`deno.json` の `tasks.start` に定義されたコマンドが実行される。

## Netlify 開発サーバーの起動

```sh
netlify dev
```

## Vercel 開発サーバーの起動

```sh
vercel dev
```
