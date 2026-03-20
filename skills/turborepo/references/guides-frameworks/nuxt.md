# Nuxt

## クイックスタート

```bash
pnpm dlx create-turbo@latest -e with-vue-nuxt
pnpm dlx nuxi@latest init apps/my-app  # 既存リポジトリに追加
```

## 内部パッケージの参照

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

## マイクロフロントエンド設定

Nuxt は内部的に Vite を使用するため、`vite.config.ts` で `base` を設定:

```ts
export default defineConfig({
  base: "/admin",
});
```
