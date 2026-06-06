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

## Module Federation

ランタイムでのモジュール共有には `with-vite-module-federation` テンプレートを使う:

```bash
pnpm dlx create-turbo@latest -e with-vite-module-federation
```

複数の Vite アプリ・パッケージ間で React / Vue / Svelte コンポーネントや依存関係をランタイム共有できる。

Module Federation 使用時の `turbo.json` 設定:
- `dev` タスク: `"cache": false`、`"persistent": true`、`"dependsOn": ["^build"]`（共有パッケージのビルドを先に実行）
