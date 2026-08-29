---
source: https://tanstack.com/router/latest/docs/framework/react/guide/code-splitting
---

# Code Splitting

Split route files into critical (path parsing, search validation, loaders, `beforeLoad`, context, static data, links/scripts/styles) and non-critical/lazy configuration (component, error/pending/not-found components) to reduce initial bundle size.

## Signature / Usage

Automatic code-splitting (recommended, file-based routing + supported bundler only):

```ts
// vite.config.ts
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    react(), // after the TanStack Router plugin
  ],
})
```

Manual `.lazy.tsx` split:

```tsx
// src/routes/posts.tsx — critical config only
export const Route = createFileRoute('/posts')({
  loader: fetchPosts,
})

// src/routes/posts.lazy.tsx — non-critical config
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts')({
  component: Posts,
})
```

Code-based routing split:

```tsx
// src/posts.lazy.tsx
export const Route = createLazyRoute('/posts')({ component: MyComponent })

// src/app.tsx
const postsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/posts' })
  .lazy(() => import('./posts.lazy').then((d) => d.Route))
```

Loader splitting (discouraged — adds a network round trip before render):

```tsx
import { lazyFn } from '@tanstack/react-router'

const route = createRoute({
  path: '/my-route',
  component: MyComponent,
  loader: lazyFn(() => import('./loader'), 'loader'),
})
```

Accessing route APIs from a split-out file without importing `Route`:

```tsx
import { getRouteApi } from '@tanstack/react-router'
const route = getRouteApi('/my-route')
const loaderData = route.useLoaderData()
```

## Options / Props

| Export (`.lazy.tsx`) | Description |
|------|-------------|
| `component` | Route component |
| `errorComponent` | Rendered on error |
| `pendingComponent` | Rendered while loading |
| `notFoundComponent` | Rendered on not-found |

## Notes

- The `loader` is intentionally not part of the default lazy split — it's already an async boundary, is less likely to bloat the bundle, and is critical for preload-on-hover to work without extra async overhead.
- `__root.tsx` (via `createRootRoute`/`createRootRouteWithContext`) cannot be code-split — it always renders.
- If a route file becomes empty after moving everything to `.lazy.tsx`, delete it; a virtual route is generated automatically.
- To encapsulate a route's files, move e.g. `posts.tsx` into `posts/route.tsx`.
- `getRouteApi` also exposes `useLoaderDeps`, `useMatch`, `useParams`, `useRouteContext`, `useSearch`.

## Related

- [Automatic Code Splitting](./automatic-code-splitting.md)
- [Data Loading](./data-loading.md)
