---
source: https://tanstack.com/router/latest/docs/api/router/RouteMatchType
---

# RouteMatch

Represents a single matched route in the router's state.

## Signature / Usage

```tsx
const match = useMatch({ from: '/posts/$postId' })
// match.status, match.loaderData, match.params, ...
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique match id |
| `routeId` | `string` | Id of the matched route |
| `pathname` | `string` | Matched pathname |
| `params` | `Route['allParams']` | Parsed path params |
| `search` | `Route['fullSearchSchema']` | Parsed search params |
| `status` | `'pending' \| 'success' \| 'error' \| 'notFound'` | Render state of the match |
| `isFetching` | `false \| 'beforeLoad' \| 'loader'` | Independently tracks active `beforeLoad`/`loader` work |
| `loaderData` | `Route['loaderData']` | Data returned from the route's loader (optional) |
| `error` | `unknown` | Error captured during load, if any |
| `context` | `Route['allContext']` | Resolved route context |
| `updatedAt` | `number` | Timestamp of last update |
| `abortController` | `AbortController` | Controller for the match's in-flight load |
| `cause` | `'preload' \| 'enter' \| 'stay'` | Reason the match was created |

## Notes

- `status` and `isFetching` are independent: a match can show stale `loaderData` (`status: 'success'`) while `isFetching: 'loader'` during a background reload.

## Related

- [useMatch](./use-match.md)
- [useMatches](./use-matches.md)
