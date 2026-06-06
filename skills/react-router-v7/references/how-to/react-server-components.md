# React Server Components

Experimental support for React Server Components (RSC), enabling server-side rendering with direct data access, server functions, and mixed server/client component trees.

**Status:** Experimental — subject to breaking changes in minor/patch releases. Requires React 19+.
**Available in:** Framework Mode and Data Mode (not Declarative Mode).

## Quick Start Templates

```bash
# Framework Mode
npx create-react-router@latest --template remix-run/react-router-templates/unstable_rsc-framework-mode

# Data Mode (Vite)
npx create-react-router@latest --template remix-run/react-router-templates/unstable_rsc-data-mode-vite
```

## RSC Framework Mode

### Vite Configuration

```ts
// vite.config.ts
import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import rsc from "@vitejs/plugin-rsc";

// Note: rsc() must be placed AFTER reactRouterRSC()
export default defineConfig({ plugins: [reactRouterRSC(), rsc()] });
```

### Route Server Components

Export `ServerComponent` instead of `default`:

```tsx
// routes/home.tsx
export async function loader() {
  return { message: await getMessage() };
}

export function ServerComponent({ loaderData }: Route.ServerComponentProps) {
  return <h1>{loaderData.message}</h1>;
}
```

Server/client export counterparts:

| Server Export | Client Export |
|---|---|
| `ServerComponent` | `default` |
| `ServerErrorBoundary` | `ErrorBoundary` |
| `ServerLayout` | `Layout` |
| `ServerHydrateFallback` | `HydrateFallback` |

### Client Components

```tsx
// counter.tsx
"use client";
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Custom Entry Files (auto-detected in `app/`)

- `app/entry.rsc.ts` — Custom RSC server entry
- `app/entry.ssr.ts` — Custom SSR server entry
- `app/entry.client.tsx` — Custom client entry

### Unsupported Config Options (RSC Framework Mode)

`buildEnd`, `presets`, `serverBundles`, `future.v8_splitRouteModules`, `subResourceIntegrity`

## RSC Data Mode

Lower-level APIs for custom framework integration using `matchRSCServerRequest`, `routeRSCServerRequest`, `getRSCStream`, and `createCallServer`. See the RSC API reference for details.

## Notes

- `.server` / `.client` module conventions are NOT supported in RSC Framework Mode; use `"server-only"` from `@vitejs/plugin-rsc` instead
- Loaders and actions can return React elements directly in RSC mode
- `AsyncLocalStorage` works with server middleware in RSC mode via the middleware integration

## Related

- [./spa.md](./spa.md)
- [./client-data.md](./client-data.md)
- [./middleware.md](./middleware.md)
