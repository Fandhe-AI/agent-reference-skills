---
source: https://tanstack.com/router/latest/docs/api/router/createLazyFileRouteFunction
---

# createLazyFileRoute

Creates a partial file-based route that is code-split and loaded lazily when matched. Configures only "non-critical" properties (`component`, `pendingComponent`, `errorComponent`, `notFoundComponent`).

## Signature / Usage

```tsx
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

```ts
createLazyFileRoute(path: string): (options: Pick<RouteOptions, 'component' | 'pendingComponent' | 'errorComponent' | 'notFoundComponent'>) => Route
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` | File path for route generation; automatically managed by `tsr generate` / `tsr watch` (required) |

## Notes

- The file route instance must be exported using the `Route` identifier for the CLI to work correctly.

## Related

- [createFileRoute](./create-file-route.md)
- [lazyRouteComponent](./lazy-route-component.md)
