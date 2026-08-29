---
source: https://tanstack.com/router/latest/docs/api/router/createRootRouteFunction
---

# createRootRoute

Returns a new root route instance. The root route instance is used to build a route tree (via `.addChildren`).

## Signature / Usage

```tsx
import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const routeTree = rootRoute.addChildren([
  // ... other routes
])

const router = createRouter({
  routeTree,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `options` | `Omit<RouteOptions, 'path' \| 'id' \| 'getParentRoute' \| 'caseSensitive' \| 'parseParams' \| 'stringifyParams'>` | Root route configuration (path/id/parent options are not applicable to the root) |

## Related

- [createRootRouteWithContext](./create-root-route-with-context.md)
- [createRoute](./create-route.md)
