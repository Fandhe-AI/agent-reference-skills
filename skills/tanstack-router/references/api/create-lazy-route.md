---
source: https://tanstack.com/router/latest/docs/api/router/createLazyRouteFunction
---

# createLazyRoute

Creates a partial code-based route instance that is lazily loaded when matched. It can only configure the non-critical properties of the route: `component`, `pendingComponent`, `errorComponent`, and `notFoundComponent`.

## Signature / Usage

```tsx
// src/route-pages/index.tsx
import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}

// src/routeTree.tsx
import {
  createRootRouteWithContext,
  createRoute,
  Outlet,
} from '@tanstack/react-router'

interface MyRouterContext {
  foo: string
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
}).lazy(() => import('./route-pages/index').then((d) => d.Route))

export const routeTree = rootRoute.addChildren([indexRoute])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Required. The route id of the route (the single argument of `createLazyRoute`) |

Returns a function accepting a partial `RouteOptions`:

```tsx
Pick<
  RouteOptions,
  'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'
>
```

## Notes

- This route instance must be manually lazily loaded against its critical route instance using the `lazy` method returned by `createRoute`.

## Related

- [createLazyFileRoute](./create-lazy-file-route.md)
- [createRoute](./create-route.md)
- [RouteOptions](./route-options.md)
- [Route (type)](./route.md)
