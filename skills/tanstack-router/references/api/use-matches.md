---
source: https://tanstack.com/router/latest/docs/api/router/useMatchesHook
---

# useMatches

Retrieves the router's complete presented array of `RouteMatch` objects, regardless of the caller's position in the component tree. The returned array may include still-loading descendants or matches positioned below pending/error/not-found render boundaries.

## Signature / Usage

```tsx
import { useMatches } from '@tanstack/react-router'

function Component() {
  const matches = useMatches()
  // returns RouteMatch[]
}
```

```ts
useMatches(options?: { select?: (matches: RouteMatch[]) => TSelected; structuralSharing?: boolean })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `select` | `(matches: RouteMatch[]) => TSelected` | Transforms the returned matches array; determines re-render via shallow equality |
| `structuralSharing` | `boolean` | Enables structural sharing for the selected value |

## Notes

- To access only parent or child matches, use `useParentMatches` / `useChildMatches` instead (out of scope for this reference set).

## Related

- [useMatch](./use-match.md)
- [useMatchRoute](./use-match-route.md)
