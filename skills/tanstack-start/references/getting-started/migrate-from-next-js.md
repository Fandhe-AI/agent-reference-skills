---
source: https://tanstack.com/start/latest/docs/framework/react/migrate-from-next-js
---

# Migrate from Next.js

Step-by-step guide to migrate a Next.js App Router project to TanStack Start, plus advanced routing/API/server-function/image/font conversion patterns.

## Signature / Usage

```sh
# 1. Remove Next.js
npm uninstall @tailwindcss/postcss next
rm postcss.config.* next.config.*

# 2. Install TanStack Start (Vite)
npm i @tanstack/react-router @tanstack/react-start nitro vite @vitejs/plugin-react
npm i -D @tailwindcss/vite tailwindcss
```

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: 'src',
      router: { routesDirectory: 'app' }, // match Next.js App Router layout
    }),
    viteReact(),
    nitro(),
  ],
})
```

Root layout: `src/app/layout.tsx` → `src/app/__root.tsx` using `createRootRoute` + `HeadContent` + `Scripts` (replaces Next `metadata` export).

Home page: `src/app/page.tsx` → `src/app/index.tsx` using `createFileRoute('/')`.

Router config (`src/router.tsx`):

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true })
}
```

## Routing Concepts Mapping

| Route Example | Next.js | TanStack Start |
|---|---|---|
| Root Layout | `src/app/layout.tsx` | `src/app/__root.tsx` |
| `/` (Home) | `src/app/page.tsx` | `src/app/index.tsx` |
| `/posts` | `src/app/posts/page.tsx` | `src/app/posts.tsx` |
| `/posts/[slug]` | `src/app/posts/[slug]/page.tsx` | `src/app/posts/$slug.tsx` |
| `/posts/[...slug]` | `src/app/posts/[...slug]/page.tsx` | `src/app/posts/$.tsx` |
| `/api/endpoint` | `src/app/api/endpoint/route.ts` | `src/app/api/endpoint.ts` |

## Common Conversions

- Dynamic params: `params` promise → `Route.useParams()`; catch-all via `const { _splat } = Route.useParams()`; search params via `Route.useSearch()`.
- Links: `next/link` `<Link href>` → `@tanstack/react-router` `<Link to>`.
- Images: `next/image` → `@unpic/react` `<Image>` (numeric `width`/`height` instead of string).
- Server Actions → Server Functions: `'use server'` function → `createServerFn().handler(...)`.
- Route Handlers → Server Routes: `export async function GET()` → `createFileRoute(...)({ server: { handlers: { GET: async () => ... } } })`.
- Fonts: `next/font/google` → Tailwind CSS `@import` of Fontsource packages plus `@theme inline` font variables.
- Data fetching: Next.js async Server Component `await fetch(...)` → TanStack Router `loader` + `Route.useLoaderData()`.

## Notes

- Default `routesDirectory` is `routes`; set to `app` to keep Next.js App Router-like paths.
- A reference starter and post-migration repo are linked from the official page (`nrjdalal/awesome-templates`, `nrjdalal/next-to-start`) for side-by-side comparison.
- This is about migrating *into* TanStack Start; it does not document `nextjs-app` skill's own APIs.

## Related

- [Start vs Next.js](./start-vs-nextjs.md)
- [Getting Started](./getting-started.md)
