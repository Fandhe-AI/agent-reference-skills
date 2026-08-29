---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/useChildMatchesHook.md
---

# useChildMatches

Returns all child `RouteMatch` objects from the closest match down to the leaf-most match, excluding the current match itself.

## Signature / Usage

```tsx
import { useChildMatches } from '@tanstack/react-router'

function Component() {
  const childMatches = useChildMatches()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `select` | `(matches: RouteMatch[]) => T` | Optional selector; result compared via shallow equality to control re-renders |
| `structuralSharing` | `boolean` | Enables structural sharing on the returned value |

## Notes

- Use `useMatch` to get the current match itself.

## Related

- [useMatch](./use-match.md)
- [useParentMatches](./use-parent-matches.md)
- [useMatches](./use-matches.md)
