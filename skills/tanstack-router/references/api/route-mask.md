---
source: https://tanstack.com/router/latest/docs/api/router/RouteMaskType
---

# RouteMask

Extends `ToOptions` with the properties necessary to create a route mask.

## Signature / Usage

The source page gives no code block; this snippet is illustrative (see createRouteMask).

```tsx
import { createRouteMask } from '@tanstack/react-router'

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: '/photos/$photoId/modal',
  to: '/photos/$photoId',
  params: (prev) => ({ photoId: prev.photoId }),
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...ToOptions` | `ToOptions` | Required. The options used to configure the route mask |
| `options.routeTree` | `TRouteTree` | Required. The route tree this route mask will support |
| `options.unmaskOnReload` | `boolean` | Optional. If `true`, the route mask is removed when the page is reloaded |

## Notes

- The source page has no code block; the snippet is illustrative.

## Related

- [createRouteMask](./create-route-mask.md)
- [ToOptions](./to-options.md)
