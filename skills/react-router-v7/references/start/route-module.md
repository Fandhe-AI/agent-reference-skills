# Route Module

ルートモジュールは `routes.ts` から参照されるファイルで、自動コード分割・データロード・アクション等を定義する。

## エクスポート一覧

| エクスポート | 実行環境 | 説明 |
|-------------|---------|------|
| `default` | 両方 | ルートコンポーネント |
| `loader` | サーバー | データ読み込み |
| `clientLoader` | クライアント | クライアント側データ読み込み |
| `action` | サーバー | データ変更 |
| `clientAction` | クライアント | クライアント側データ変更 |
| `middleware` | サーバー | サーバーミドルウェア |
| `clientMiddleware` | クライアント | クライアントミドルウェア |
| `ErrorBoundary` | 両方 | エラー表示 |
| `HydrateFallback` | クライアント | clientLoader 実行中の表示 |
| `headers` | サーバー | HTTP ヘッダー定義 |
| `handle` | 両方 | useMatches() 用の任意データ |
| `links` | 両方 | `<link>` 要素の定義 |
| `meta` | 両方 | メタタグの定義 |
| `shouldRevalidate` | クライアント | 再検証の制御 |

## コンポーネント（default export）

```tsx
import type { Route } from "./+types/route-name";

export default function MyRoute({ loaderData, actionData, params, matches }: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

## loader

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const product = await db.getProduct(params.pid);
  return product;
}
```

## clientLoader

```tsx
export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverData = await serverLoader();
  return { ...serverData, clientData: getClientData() };
}
clientLoader.hydrate = true as const;
```

## action

```tsx
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  return await db.updateProject({ title: formData.get("title") });
}
```

## middleware

```tsx
export const middleware = [
  async function auth({ request, context }, next) {
    const user = await getUser(request);
    if (!user) throw redirect("/login");
    context.set(userContext, user);
    return next();
  }
];
```

## ErrorBoundary

```tsx
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <h1>{error.status} {error.statusText}</h1>;
  }
  return <h1>Error</h1>;
}
```

## meta（React 19+ は `<meta>` 要素を直接使用推奨）

```tsx
export function meta() {
  return [
    { title: "My App" },
    { name: "description", content: "Description" },
  ];
}
```

## 型安全

`import type { Route } from "./+types/route-name"` で自動生成される型を使用。

## 注意点

- `loader`/`action`/`headers`/`middleware` はサーバー専用（クライアントバンドルから除外）
- `meta` は親ルートのメタを置換する（マージではない）
- `clientLoader.hydrate = true as const` で初回ページロード時にも実行

## 関連

- [data-loading](./data-loading.md)
- [actions](./actions.md)
- [pending-ui](./pending-ui.md)
