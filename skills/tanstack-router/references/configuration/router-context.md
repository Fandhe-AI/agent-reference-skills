---
source: https://tanstack.com/router/latest/docs/framework/react/guide/router-context
---

# Router Context

The router context is a dependency-injection mechanism passed through the router and down through each matching route; each route in the hierarchy can add to or modify it for its children.

## Signature / Usage

```tsx
import {
  createRootRouteWithContext,
  createRouter,
} from '@tanstack/react-router'

interface MyRouterContext {
  user: User
}

// Use the routerContext to create your root route
const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: App,
})

const routeTree = rootRoute.addChildren([
  // ...
])

// Use the routerContext to create your router
const router = createRouter({
  routeTree,
  context: {
    user: { id: '123', name: 'John Doe' },
  },
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `createRootRouteWithContext<T>()` | factory | Creates a root route constrained to context type `T`; use instead of `createRootRoute()` when you need a typed root context |
| `createRouter({ context })` | `object` | Passes the initial router context at instantiation time; defaults to `{}` if omitted |
| `router.invalidate()` | method | Recomputes the router context (and re-runs `beforeLoad`/`loader`) for all routes |
| `beforeLoad` return value | `object` | Extends/merges into the context available to the route and its children |

## Notes

- `MyRouterContext` only needs to contain properties passed directly to `createRouter`; context added via `beforeLoad` is inferred automatically.
- If context has required properties, omitting them at `createRouter({ context })` is a TypeScript error; if all are optional, passing `context` is optional too.
- Hooks (e.g. React hooks) cannot be called inside `beforeLoad`/`loader` since they are not React components — instantiate the hook in a component and inject its return value via `context` on `<RouterProvider context={{ ... }} />`.
- Each route's own `context` object is retained (not just the merged result), enabling per-route metadata like breadcrumb titles via `match.context`.
- Route contexts are commonly used for dependency injection (data clients, mutation services), breadcrumbs, and dynamic `<head>`/title management via `useRouterState({ select: (s) => s.matches })`.

## Related

- [Creating a Router](./creating-a-router.md)
- [Static Route Data](./static-route-data.md)
- [Type Safety](./type-safety.md)
