---
source: https://tanstack.com/router/latest/docs/api/router/useRouterStateHook
---

# useRouterState

Returns the current internal state of the router.

## Signature / Usage

```tsx
import { useRouterState } from '@tanstack/react-router'

function Component() {
  const state = useRouterState()

  const selected = useRouterState({
    select: (state) => state.location,
  })
}
```

```ts
useRouterState(options?: { select?: (state: RouterState) => TSelected; structuralSharing?: boolean })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `select` | `(state: RouterState) => TSelected` | Transforms the returned state |
| `structuralSharing` | `boolean` | Enables structural sharing for the selected value |

## Notes

- `useLocation` and `useMatches` are recommended first for common cases, as they can be more performant and ergonomic than reading raw router state.

## Related

- [useRouter](./use-router.md)
- [useLocation](./use-location.md)
- [useMatches](./use-matches.md)
