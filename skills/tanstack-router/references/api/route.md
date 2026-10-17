---
source: https://tanstack.com/router/latest/docs/api/router/RouteType
---

# Route (type)

Describes a route instance.

## Signature / Usage

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      // Type-safe redirect - 'from' is automatically '/dashboard/settings'
      throw Route.redirect({
        to: '../login', // Relative path to sibling route
      })
    }
  },
})
```

## Options / Props

| Method | Type | Description |
|--------|------|-------------|
| `.addChildren` | `(children: Route[]) => this` | Adds child routes and returns the route instance (with updated types reflecting the new children) |
| `.update` | `(options: Partial<UpdatableRouteOptions>) => this` | Updates the route with new options, returning the instance with updated types. Can be useful to avoid circular type references |
| `.lazy` | `(lazyImporter: () => Promise<Partial<UpdatableRouteOptions>>) => this` | Sets a lazy importer resolved lazily when loading the route. Useful for code splitting |
| `.redirect` | `(opts?: RedirectOptions) => Redirect` | Type-safe `redirect` pre-bound to the route's path. `from` is automatically set to the route's `fullPath`, enabling type-safe relative redirects |
| `...RouteApi` methods | | All methods from `RouteApi` are available |

## Related

- [RouteApi](./route-api.md)
- [createRoute](./create-route.md)
- [RouteOptions](./route-options.md)
- [redirect](./redirect.md)
