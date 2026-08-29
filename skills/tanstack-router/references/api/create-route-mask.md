---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/createRouteMaskFunction.md
---

# createRouteMask

Helper for generating a route mask configuration object for `RouterOptions.routeMasks`, letting one route path display in the browser while another route path is internally rendered.

## Signature / Usage

```tsx
import { createRouteMask, createRouter } from '@tanstack/react-router'

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: '/photos/$photoId/modal',
  to: '/photos/$photoId',
  params: (prev) => ({ photoId: prev.photoId }),
})

const router = createRouter({
  routeTree,
  routeMasks: [photoModalToPhotoMask],
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `routeMask` | `RouteMask` | Configuration object describing the mask (required) |

## Related

- [Route Masking](../navigation/route-masking.md)
