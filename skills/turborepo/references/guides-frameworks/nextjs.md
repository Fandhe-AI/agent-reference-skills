# Next.js

## クイックスタート

```bash
pnpm dlx create-turbo@latest        # デフォルトテンプレート
pnpm dlx create-next-app@latest apps/my-app  # 既存リポジトリに追加
```

## 内部パッケージの参照

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

## タスクのカスタマイズ

デフォルトではルートの `turbo.json` のタスクが使用される。アプリ固有の設定は Package Configurations で上書き可能。

## マイクロフロントエンド設定

```ts
// apps/docs/next.config.ts
const nextConfig: NextConfig = {
  basePath: "/docs",
};
export default nextConfig;
```

`basePath` の設定を忘れるとアセットのルーティングが壊れる。
