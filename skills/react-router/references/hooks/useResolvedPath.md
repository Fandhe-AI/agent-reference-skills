# useResolvedPath

Resolves the pathname of the given `to` value against the current `Location`. Similar to `useHref`, but returns a `Path` instead of a string.

## Signature / Usage

```typescript
function useResolvedPath(
  to: To,
  options?: { relative?: RelativeRoutingType },
): Path
```

```tsx
import { useResolvedPath } from "react-router";

function SomeComponent() {
  // if the user is at /dashboard/profile
  const path = useResolvedPath("../accounts");
  path.pathname; // "/dashboard/accounts"
  path.search;   // ""
  path.hash;     // ""
}
```

## Options / Props

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `relative` | `"route" \| "path"` | `"route"` | Resolve relative to the route tree (`"route"`) or URL path segments (`"path"`) |

## Notes

- Available in all modes: Framework, Data, and Declarative

## Related

- [useHref](./useHref.md) — resolve a path to an href string instead of a `Path` object
