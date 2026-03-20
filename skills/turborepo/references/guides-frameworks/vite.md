# Vite

## クイックスタート

```bash
pnpm dlx create-turbo@latest -e with-vite
```

## 内部パッケージの参照

```jsonc
// pnpm / bun
"@repo/ui": "workspace:*"

// yarn / npm
"@repo/ui": "*"
```

## マイクロフロントエンド設定

```ts
export default defineConfig({
  base: "/admin",
});
```

`base` を設定しないと画像や CSS が正しくルーティングされない。
