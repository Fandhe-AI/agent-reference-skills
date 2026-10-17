---
source: https://tanstack.com/router/latest/docs/api/router/notFoundComponentComponent
---

# NotFoundComponent

Component that renders when a not-found error occurs in a route. Typically returns a "page not found" message along with links to go home or navigate to previous pages.

## Signature / Usage

The source page gives no code block; this snippet only illustrates the documented props.

```tsx
export const Route = createFileRoute('/posts/$postId')({
  notFoundComponent: ({ data, isNotFound, routeId }) => (
    <p>Not found ({routeId})</p>
  ),
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `props.data` | `unknown` | Optional. Custom data from the `data` property of the `NotFoundError` object |
| `props.isNotFound` | `boolean` | Required. Whether the current state is a not-found error state; always `true` |
| `props.routeId` | `RouteIds<RegisteredRouter['routeTree']>` | Required. ID of the route attempting to handle the not-found error; must be a valid route ID from the router's route tree |

## Notes

- The official page documents the props without an example; the snippet above is illustrative, not from the source.

## Related

- [NotFoundError](./not-found-error.md)
- [DefaultGlobalNotFound](./default-global-not-found.md)
- [notFound](./not-found.md)
