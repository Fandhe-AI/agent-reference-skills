---
source: https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors
---

# Not Found Errors

Handles two scenarios: URLs that don't match any known route (governed by `notFoundMode`), and manually-thrown not-found errors for missing resources via the `notFound()` utility in `loader`/`beforeLoad`.

## Signature / Usage

```tsx
export const Route = createFileRoute('/settings')({
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>
  },
})
```

```tsx
// in a loader or beforeLoad
throw notFound({ routeId: '/_pathlessLayout' })
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| notFoundMode | `'fuzzy' \| 'root'` | `'fuzzy'` | `createRouter` option. `'fuzzy'` finds the closest matching route and renders its `notFoundComponent`, preserving parent layouts. `'root'` always routes not-found errors to the root route's `notFoundComponent` |
| notFoundComponent | `Component` | — | Per-route option rendered when a not-found error bubbles to that route |
| defaultNotFoundComponent | `Component` | — | `createRouter` option; router-wide fallback for routes with children lacking their own `notFoundComponent` |
| routeId (on `notFound()`) | `string` | — | Directs a manually-thrown not-found error to a specific parent route |

## Notes

- `throw notFound()` in a loader bubbles up to the nearest parent route with a configured `notFoundComponent`.
- The deprecated `NotFoundRoute` API is being replaced by `notFoundComponent`, which offers better layout support and stricter path matching.

## Related

- [Creating a Router](./creating-a-router.md)
- [Outlets](./outlets.md)
