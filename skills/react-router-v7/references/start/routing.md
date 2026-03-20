# Routing

`app/routes.ts` でルートを宣言的に設定する。各ルートは URL パターンとルートモジュールファイルで構成。

## 基本構成

```typescript
import { type RouteConfig, route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),
  route("teams/:teamId", "./team.tsx"),
] satisfies RouteConfig;
```

## ヘルパー関数

### `route(pattern, moduleFile, children?)`
URL パターンとモジュールファイルでルートを作成。

### `index(moduleFile)`
親 URL でレンダリングされるインデックスルート。子ルートは持てない。

### `layout(moduleFile, children)`
URL セグメントを追加せずに子ルートをネストするレイアウトルート。

```typescript
layout("./auth/layout.tsx", [
  route("login", "./auth/login.tsx"),
  route("register", "./auth/register.tsx"),
])
```

### `prefix(pathPrefix, routes)`
URL プレフィックスを追加（配列を返すため spread 演算子が必要）。

```typescript
...prefix("projects", [
  index("./projects/home.tsx"),
  route(":id", "./projects/detail.tsx"),
])
```

## 動的セグメント

```typescript
route("teams/:teamId", "./team.tsx")
// loader で params.teamId としてアクセス
```

### オプショナルセグメント
```typescript
route(":lang?/categories", "./categories.tsx")
```

### スプラットルート（キャッチオール）
```typescript
route("files/*", "./files.tsx")
// params["*"] で残りのパスを取得
```

## ネスティング

子ルートは親コンポーネントの `<Outlet/>` でレンダリングされる。

```typescript
route("dashboard", "./dashboard.tsx", [
  index("./home.tsx"),
  route("settings", "./settings.tsx"),
])
```

## ファイルベースルーティング

```typescript
import { flatRoutes } from "@react-router/fs-routes";
export default [
  ...(await flatRoutes()),
] satisfies RouteConfig;
```

## 注意点

- インデックスルートは子ルートを持てない
- `prefix()` は配列を返す（`...prefix()` で展開）
- 全ルートは `app/root.tsx` の中にネストされる
- コンポーネントルートはデータロード等の機能を使えない

## 関連

- [route-module](./route-module.md)
- [data-loading](./data-loading.md)
- [navigating](./navigating.md)
