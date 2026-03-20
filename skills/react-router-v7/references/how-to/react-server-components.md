# React Server Components

Experimental support for React Server Components (RSC), enabling server-side rendering with direct data access, server functions, and mixed server/client component trees.

**Status:** Experimental — subject to breaking changes in minor/patch releases. Requires React 19+.

## 実装方法

**RSC Framework Mode (recommended):**
1. Use `unstable_reactRouterRSC` Vite plugin together with `@vitejs/plugin-rsc`
2. Export `ServerComponent` instead of a default component from route modules

**RSC Data Mode (lower-level):**
Use a custom bundler integration template.

```bash
# Framework mode starter
npx create-react-router@latest --template remix-run/react-router-templates/unstable_rsc-framework-mode
# Data mode starter
npx create-react-router@latest --template remix-run/react-router-templates/unstable_rsc-data-mode-vite
```

## コード例

```ts
// vite.config.ts (RSC Framework Mode)
import { unstable_reactRouterRSC as reactRouterRSC } from "@react-router/dev/vite";
import rsc from "@vitejs/plugin-rsc";

export default defineConfig({ plugins: [reactRouterRSC(), rsc()] });
```

```tsx
// routes/home.tsx — Server Component route
export async function loader() {
  return { message: await getMessage() };
}

export function ServerComponent({ loaderData }: Route.ComponentProps) {
  return <h1>{loaderData.message}</h1>;
}
```

```tsx
// counter.tsx — Client Component
"use client";
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

## 注意点

- `.server` / `.client` module conventions are NOT supported in RSC Framework Mode; use `"server-only"` / `"client-only"` from `@vitejs/plugin-rsc` instead
- Unsupported config options in RSC Framework Mode: `buildEnd`, `prerender`, `presets`, `routeDiscovery`, `serverBundles`, `ssr: false`
- Loaders and actions can return React elements directly in RSC mode

## 関連

- [./spa.md](./spa.md)
- [./client-data.md](./client-data.md)
