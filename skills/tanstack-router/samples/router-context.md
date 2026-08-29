---
source: https://tanstack.com/router/latest/docs/framework/react/guide/router-context
---

# Typed Router Context

Inject dependencies (auth state, a query client, breadcrumb data) through `createRootRouteWithContext` and `createRouter({ context })`.

```tsx
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'

interface MyRouterContext {
  user: User
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

const routeTree = rootRoute.addChildren([
  // ...
])

const router = createRouter({
  routeTree,
  context: {
    user: { id: '123', name: 'John Doe' },
  },
})
```

```tsx
// A child route can extend context via beforeLoad; child routes see the merged result
export const Route = createFileRoute('/posts')({
  beforeLoad: () => ({
    breadcrumb: 'Posts',
  }),
  loader: ({ context }) => {
    // context.user (from root) and context.breadcrumb (from this route) are both available
    return fetchPosts(context.user.id)
  },
})
```

## Notes

- `MyRouterContext` only needs properties passed directly to `createRouter({ context })`; properties added via `beforeLoad` are inferred automatically.
- If context has required properties, omitting them at `createRouter({ context })` is a TypeScript error.
- Hooks cannot be called inside `beforeLoad`/`loader` — instantiate the hook in a component and inject its value via `<RouterProvider context={{ ... }} />`.
- `router.invalidate()` recomputes context and re-runs `beforeLoad`/`loader` for all matched routes.
