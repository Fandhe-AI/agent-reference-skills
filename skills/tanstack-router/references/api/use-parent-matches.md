---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/useParentMatchesHook.md
---

# useParentMatches

Returns all parent `RouteMatch` objects from the root down to (but not including) the immediate parent of the current match.

## Signature / Usage

```tsx
import { useParentMatches } from '@tanstack/react-router'

function Component() {
  const parentMatches = useParentMatches()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `select` | `(matches: RouteMatch[]) => T` | Optional selector to transform the matches array |
| `structuralSharing` | `boolean` | Enables structural sharing on the returned value |

## Notes

- Use `useMatch` to get the current match itself.

## Related

- [useMatch](./use-match.md)
- [useChildMatches](./use-child-matches.md)
- [useMatches](./use-matches.md)
