---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/getRouteApiFunction.md
---

# getRouteApi

Creates type-safe hook bindings (`useParams`, `useSearch`, `useRouteContext`, `useLoaderData`, etc.) pre-bound to a specific route ID, avoiding repeated route-ID passing throughout the component tree.

## Signature / Usage

```tsx
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts')

function Component() {
  const loaderData = routeApi.useLoaderData()
  return <div>{JSON.stringify(loaderData)}</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `routeId` | `string` | The route ID literal to bind hooks to (required) |

## Notes

- Returns a `RouteApi` instance exposing route-specific, type-safe versions of the common hooks.

## Related

- [useLoaderData](./use-loader-data.md)
- [useParams](./use-params.md)
- [useSearch](./use-search.md)
