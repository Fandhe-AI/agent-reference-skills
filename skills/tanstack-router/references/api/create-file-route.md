---
source: https://tanstack.com/router/latest/docs/api/router/createFileRouteFunction
---

# createFileRoute

A factory function that creates file-based route instances for automatic route tree generation via the `tsr generate` and `tsr watch` commands.

## Signature / Usage

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: () => 'Hello World',
  component: IndexComponent,
})

function IndexComponent() {
  const data = Route.useLoaderData()
  return <div>{data}</div>
}
```

```ts
createFileRoute(path: string): (options: RouteOptions) => Route
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `path` | `string` (literal) | Full path of the file the route is generated from; automatically inserted and updated by the CLI (required) |

## Notes

- For `tsr generate` / `tsr watch` to work correctly, the file route instance must be exported using the `Route` identifier.

## Related

- [createLazyFileRoute](./create-lazy-file-route.md)
- [createRoute](./create-route.md)
