# Build

本番向けビルドと静的サイト生成。

## プロダクションビルド（npm）

```sh
npm run build
```

## プロダクションビルド（pnpm）

```sh
pnpm run build
```

## プロダクションビルド（yarn）

```sh
yarn run build
```

## プロダクションビルド（bun）

```sh
bun run build
```

## Cloudflare Pages のクライアント + サーバービルド

```sh
vite build --mode client && vite build
```

クライアントバンドルを先にビルドし、続けてサーバーバンドルをビルドする。

## 生成された静的ファイルの確認

`toSSG` で生成した静的ファイルを確認する。

```sh
ls ./static
```

デフォルト出力先は `./static/`（`toSSG` の `dir` オプションで変更可）。
