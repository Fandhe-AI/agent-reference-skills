# Rendering

React Router v7 は3つのレンダリング戦略をサポート。

## 1. Client Side Rendering (CSR)

```typescript
// react-router.config.ts
import type { Config } from "@react-router/dev/config";
export default { ssr: false } satisfies Config;
```

SPA 向け。サーバー不要。

## 2. Server Side Rendering (SSR)

```typescript
export default { ssr: true } satisfies Config;
```

SEO・初回表示パフォーマンス向上。サーバー必要。

## 3. Static Pre-rendering

```typescript
export default {
  async prerender() {
    return ["/", "/about", "/contact"];
  },
} satisfies Config;
```

ビルド時に静的 HTML を生成。loader もビルド時に実行。

## 判断基準

| 戦略 | 用途 | デプロイ | SEO |
|------|------|---------|-----|
| CSR | SPA | 静的ホスティング | △ |
| SSR | Webアプリ | サーバー必要 | ○ |
| Pre-render | 静的サイト | 静的ホスティング | ◎ |

## 注意点

- SSR と Pre-render は組み合わせ可能
- `clientLoader` で特定ルートのサーバーレンダリングをスキップ可能
- Pre-render 未指定 URL は SSR にフォールバック

## 関連

- [installation](./installation.md)
- [data-loading](./data-loading.md)
- [deploying](./deploying.md)
