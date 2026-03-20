# SvelteKit

## クイックスタート

```bash
pnpm dlx create-turbo@latest -e with-svelte
pnpm dlx sv create apps/my-app  # 既存リポジトリに追加
```

## 内部パッケージの参照

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

## マイクロフロントエンド設定

SvelteKit も Vite ベースのため、`vite.config.ts` で `base` を設定:

```ts
export default defineConfig({
  base: "/admin",
});
```
