# Data Loading

`loader` と `clientLoader` でルートコンポーネントにデータを提供する。

## Server Loader

```tsx
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fakeDb.getProduct(params.pid);
  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

- サーバー専用（クライアントバンドルから除外）
- SSR 時とクライアントナビゲーション時の両方で実行

## Client Loader

```tsx
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  return await res.json();
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}
```

- ブラウザ専用
- `HydrateFallback` が必要

## Combined（サーバー + クライアント）

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  return fakeDb.getProduct(params.pid);
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  const clientData = getClientData();
  return { ...serverData, ...clientData };
}
clientLoader.hydrate = true as const;
```

## Static（Pre-rendering）

```typescript
// react-router.config.ts
export default {
  async prerender() {
    const products = await readProductsFromCSV();
    return products.map(p => `/products/${p.id}`);
  },
} satisfies Config;
```

loader がビルド時に実行される。

## サポートされる型

- プリミティブ: string, number, boolean
- コレクション: Array, Object
- 特殊型: `Map`, `Set`, `Date`, `Promise`

## 注意点

- `loader` はサーバー専用 API を安全に使用可能
- Pre-render 未指定 URL は SSR にフォールバック
- `clientLoader.hydrate = true as const` で初回ロード時にも実行

## 関連

- [route-module](./route-module.md)
- [actions](./actions.md)
- [rendering](./rendering.md)
