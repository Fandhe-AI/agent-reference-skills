---
source: https://tanstack.com/router/latest/docs/framework/react/routing/code-based-routing
---

# Code-Based Routing

Building the same route-tree concept as file-based routing, but by hand-writing `createRoute` calls and composing them with `addChildren()`.

## Signature / Usage

```tsx
import { createRootRoute, createRoute } from '@tanstack/react-router'

const rootRoute = createRootRoute()

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'about',
  component: AboutComponent,
})

const postRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '$postId',
  loader: ({ params }) => fetchPost(params.postId),
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  postsRoute.addChildren([postsIndexRoute, postRoute]),
])
```

## Options / Props

| Option | Description |
|--------|-------------|
| `getParentRoute` | Function returning the parent route; required on every non-root route, provides TypeScript the info needed for type-safe nesting |
| `path` | Path string for the route; required on all routes except root/pathless routes. Leading/trailing slashes are normalized (`/about/` → `about`). Index routes use `'/'` |
| `id` | Used instead of `path` for pathless layout routes (replaces the filesystem `_` prefix) |

## Notes

- `createRootRouteWithContext<T>()` creates a root route carrying typed context (e.g. a `QueryClient`).
- Catch-all routes use `$` alone as `path`; captured value lands under `params._splat`.
- Non-nested routes set `getParentRoute` to an ancestor other than the immediate one, with `path` containing the full path segment chain (e.g. `posts/$postId/edit`).
- Code-based and file-based routing share the same route-tree matching/composition model; the only difference is manual vs. automatic tree construction.

## Related

- [Route Trees](./route-trees.md)
- [Routing Concepts](./routing-concepts.md)
- [File-Based Routing](./file-based-routing.md)
