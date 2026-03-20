# Type Safety

React Router generates TypeScript types per route, providing type-safe loader args, action args, and component props automatically.

**Availability**: Framework Mode only.

## 詳細説明

React Router executes your route config (`app/routes.ts`) and generates `+types/<route>.d.ts` files in `.react-router/types/`. TypeScript's `rootDirs` configuration makes these importable as if they were next to your route modules.

**Generated types per route:**
- `LoaderArgs`
- `ClientLoaderArgs`
- `ActionArgs`
- `ClientActionArgs`
- `HydrateFallbackProps`
- `ComponentProps` (for the default export)
- `ErrorBoundaryProps`

Types are generated automatically during `react-router dev` and `vite.createServer`. For CI pipelines, run `react-router typegen` manually before `tsc`.

## コード例

**Route config:**
```typescript
// app/routes.ts
import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("products/:id", "./routes/product.tsx"),
] satisfies RouteConfig;
```

**Route module with generated types:**
```typescript
// app/routes/product.tsx
import type { Route } from "./+types/product";

export function loader({ params }: Route.LoaderArgs) {
  // params is typed as { id: string }
  return { planet: `world #${params.id}` };
}

export default function Component({
  loaderData, // typed as { planet: string }
}: Route.ComponentProps) {
  return <h1>Hello, {loaderData.planet}!</h1>;
}
```

**CLI commands:**
```sh
# Generate types once (for CI)
react-router typegen

# Watch mode
react-router typegen --watch
```

## 注意点

- Types are generated into `.react-router/types/` — commit this directory or generate it in CI before running `tsc`
- When running `react-router dev`, types are regenerated on every route config change automatically
- `satisfies RouteConfig` on your route config is required for type inference to work correctly
- Each route gets its own isolated type file, so `Route.LoaderArgs` in one route is unrelated to another route's `Route.LoaderArgs`

## 関連

- [Code Splitting](./code-splitting.md)
- [Lazy Route Discovery](./lazy-route-discovery.md)
