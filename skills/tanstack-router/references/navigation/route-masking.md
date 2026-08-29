---
source: https://tanstack.com/router/latest/docs/framework/react/guide/route-masking
---

# Route Masking

Route masking displays a different URL than the one actually navigated to, falling back to the real (unmasked) URL when the masked URL is shared or (optionally) on reload.

## Signature / Usage

```tsx
<Link
  to="/photos/$photoId/modal"
  params={{ photoId: 5 }}
  mask={{ to: '/photos/$photoId', params: { photoId: 5 } }}
>
  Open Photo
</Link>
```

```tsx
import { createRouteMask, createRouter } from '@tanstack/react-router'

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: '/photos/$photoId/modal',
  to: '/photos/$photoId',
  params: (prev) => ({ photoId: prev.photoId }),
})

const router = createRouter({ routeTree, routeMasks: [photoModalToPhotoMask] })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mask` (Link/navigate option) | `ToOptions` | Imperative mask applied to a single navigation |
| `routeMasks` (RouterOptions) | `RouteMask[]` | Declarative masks applied automatically when matching `from` |
| `createRouteMask({ routeTree, from, ...navigateOptions })` | function | Builds a type-safe route mask definition |
| `unmaskOnReload` | `boolean` | Unmask the URL on page reload (settable on router default, mask function return, or per `<Link>`/`navigate()` call — the latter overrides) |

## Notes

- Implemented via `location.state.__tempLocation`; the actual URL is recoverable from `location.maskedLocation` (used by e.g. Devtools).
- URLs are automatically unmasked when copied/shared, since masking data lives only in `location.state` of the local history stack.
- By default masked URLs are **not** unmasked on local page reload.
- Composable with parallel routes for advanced patterns (modal routes, e.g. `/photo/5/modal` masked as `/photos/5`).

## Related

- [navigation.md](./navigation.md)
