---
source: https://tanstack.com/router/latest/docs/api/router/createRouteFunction
---

# createRoute

Creates a `Route` instance from a `RouteOptions` object. Route instances are passed to a root route's children to build a route tree (code-based routing).

## Signature / Usage

```tsx
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'

const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: () => {
    return 'Hello World'
  },
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `options` | `RouteOptions` | Options used to configure the route instance (required) |

## Notes

- The route instance created is integrated into a route tree structure and passed to the router for configuration.

## Related

- [RouteOptions](./route-options.md)
- [createRootRoute](./create-root-route.md)
- [createFileRoute](./create-file-route.md)
