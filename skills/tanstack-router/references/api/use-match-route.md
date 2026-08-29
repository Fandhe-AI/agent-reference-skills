---
source: https://tanstack.com/router/latest/docs/api/router/useMatchRouteHook
---

# useMatchRoute

Returns a `matchRoute` function used to match a route against either the current or pending location. Subscribes the component to router state changes relevant to matching.

## Signature / Usage

```tsx
import { useMatchRoute } from '@tanstack/react-router'

function Component() {
  const matchRoute = useMatchRoute()
  const params = matchRoute({ to: '/posts/$postId' })
  return params ? <Post postId={params.postId} /> : <NotFound />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `to` | `string` | Route path to match |
| `fuzzy` | `boolean` | Enable fuzzy matching (optional) |
| `pending` | `boolean` | Match against pending location instead of current (optional) |
| `params` | `object` | Specific params to validate (optional) |

## Notes

- Returns the matched route's params, or `false` if no route matched.
- For imperative checks in event handlers, use `useRouter` with `router.matchRoute` directly to avoid unnecessary component subscriptions.

## Related

- [useMatch](./use-match.md)
- [useRouter](./use-router.md)
