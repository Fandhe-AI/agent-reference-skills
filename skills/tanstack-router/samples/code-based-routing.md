---
source: https://tanstack.com/router/latest/docs/framework/react/routing/code-based-routing
---

# Code-Based Routing

Hand-write `createRoute` calls and compose the route tree with `addChildren()` instead of using file-based routing.

```tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Home</div>,
})

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'posts',
  component: () => <div>Posts layout</div>,
})

const postRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '$postId',
  loader: ({ params }) => fetchPost(params.postId),
  component: () => {
    const { postId } = postRoute.useParams()
    return <div>Post {postId}</div>
  },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  postsRoute.addChildren([postRoute]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

## Notes

- `getParentRoute` is required on every non-root route; it is how the tree derives type-safe nesting.
- `path` is normalized (`/about/` becomes `about`); index routes use `'/'`.
- Use `createRootRouteWithContext<T>()` instead of `createRootRoute()` when the root needs typed context (see the `router-context.md` sample).
