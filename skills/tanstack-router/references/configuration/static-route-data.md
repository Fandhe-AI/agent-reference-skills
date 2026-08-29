---
source: https://tanstack.com/router/latest/docs/framework/react/guide/static-route-data
---

# Static Route Data

`staticData` attaches metadata to a route at creation time; the data must be synchronously available when the route is created and is accessible via `match.staticData` on any matched route.

## Signature / Usage

```tsx
export const Route = createFileRoute('/settings')({
  staticData: {
    showNavbar: false,
  },
  component: Settings,
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| staticData | `object` (route option) | Arbitrary synchronous metadata attached at route creation, read via `match.staticData` |

## Notes

- Use `staticData` for static route metadata; use `context` for dynamic data or auth state that varies per request.
- Common use cases: hiding layout elements (e.g. `showNavbar: false`), generating breadcrumbs via title functions, and enforcing required metadata fields via TypeScript declaration merging on `StaticDataRouteOption`.
- Works identically in React and Solid implementations.

## Related

- [Router Context](./router-context.md)
