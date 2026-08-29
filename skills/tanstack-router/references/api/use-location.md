---
source: https://tanstack.com/router/latest/docs/api/router/useLocationHook
---

# useLocation

Returns the current `location` object. Useful for performing a side effect whenever the current location changes.

## Signature / Usage

```tsx
import { useLocation } from '@tanstack/react-router'

function Component() {
  const location = useLocation()

  const pathname = useLocation({
    select: (location) => location.pathname,
  })
}
```

```ts
useLocation(options?: { select?: (state: ParsedLocationType) => TSelected })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `select` | `(state: ParsedLocationType) => TSelected` | Transforms the returned location object (optional) |

## Related

- [ParsedLocation](./parsed-location.md)
- [useRouterState](./use-router-state.md)
