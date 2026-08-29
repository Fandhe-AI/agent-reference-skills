---
source: https://tanstack.com/start/latest/docs/framework/react/guide/routing
---

# Routing

TanStack Start routing is built on TanStack Router's file-based routing: a `getRouter()` factory in `src/router.tsx`, a `src/routes/` directory of file routes (including a required root route), and a generated `routeTree.gen.ts`.

## Signature / Usage

### The router

```tsx
// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// You must export a getRouter function that
// returns a new router instance each time
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}
```

### The root route

```tsx
// src/routes/__root.tsx
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

### Creating a file route

```tsx
// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `createRouter({ routeTree, ... })` | — | Must be wrapped in an exported `getRouter()` factory that returns a **new** router instance on each call (per-request on the server) |
| `createRootRoute({ head, component })` | — | Defines the root route; `head()` returns `meta`/`title`/etc. rendered by `<HeadContent />` |

## Notes

- `getRouter()` must return a fresh router instance every call — reusing a single instance across requests leaks state between users on the server.
- `<HeadContent />` renders the `head()` meta from the matched route tree; `<Scripts />` injects the client hydration script — both belong in the root route's document shell.
- `routeTree.gen.ts` is generated from the `src/routes/` file structure and must be imported into `getRouter()`.
- File routes nest by directory/file-name convention (`posts.tsx` + `posts/$postId.tsx` renders `<Posts><Post /></Posts>`), the same convention `server-routes.md` uses for API routes.
- ルーティングの詳細は TanStack Router スキル（tanstack-router）を参照。

## Related

- [Server Routes](./server-routes.md)
- [Error Boundaries](./error-boundaries.md)
