---
source: https://tanstack.com/router/latest/docs/api/router/MatchRouteOptionsType
---

# MatchRouteOptions

Options used when matching a route.

## Signature / Usage

```tsx
interface MatchRouteOptions {
  pending?: boolean
  caseSensitive?: boolean /* @deprecated */
  includeSearch?: boolean
  fuzzy?: boolean
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pending` | `boolean` | Optional. If `true`, matches against the pending location instead of the current location |
| `caseSensitive` | `boolean` | Optional, deprecated. If `true`, matches the current location with case sensitivity |
| `includeSearch` | `boolean` | Optional. If `true`, matches the current location's search params using a deep inclusive check, e.g. `{ a: 1 }` matches a current location of `{ a: 1, b: 2 }` |
| `fuzzy` | `boolean` | Optional. If `true`, uses a fuzzy match, e.g. `/posts` matches a current location of `/posts/123` |

## Notes

- `caseSensitive` is deprecated: declare case sensitivity in the route definition instead, or globally for all routes using the `caseSensitive` option on the router.

## Related

- [UseMatchRouteOptions](./use-match-route-options.md)
- [useMatchRoute](./use-match-route.md)
- [MatchRoute](./match-route.md)
- [Router](./router.md)
