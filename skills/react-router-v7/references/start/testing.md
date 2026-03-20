# Testing

`createRoutesStub` でルーターコンテキスト依存のコンポーネントをユニットテスト。

## createRoutesStub

```tsx
import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Stub = createRoutesStub([
  {
    path: "/login",
    Component: LoginForm,
    action() {
      return {
        errors: { username: "Username is required" },
      };
    },
  },
]);

render(<Stub initialEntries={["/login"]} />);
userEvent.click(screen.getByText("Login"));
await waitFor(() => screen.findByText("Username is required"));
```

## Route.* 型との互換性

Framework Mode の `Route.ComponentProps` を使うコンポーネントは型が合わない場合がある。

```tsx
const Stub = createRoutesStub([{
  path: "/login",
  // @ts-expect-error: matches won't align
  Component: LoginRoute,
  action() { /* ... */ },
}]);
```

## 推奨

- `createRoutesStub` は **再利用可能コンポーネント** のユニットテスト向け
- Route コンポーネントの完全テストは **E2E テスト**（Playwright, Cypress）を推奨

## 注意点

- Framework Mode / Data Mode で利用可能（Declarative Mode は不可）
- `useLoaderData`, `useActionData`, `<Link>` 等を使うコンポーネントのテストに有効

## 関連

- [route-module](./route-module.md)
- [actions](./actions.md)
