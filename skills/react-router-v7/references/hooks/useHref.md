# useHref

Resolves a path against the current location and returns the resulting href string.

## Signature

```typescript
function useHref(
  to: To,
  options?: { relative?: RelativeRoutingType },
): string
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `relative` | `"route" \| "path"` | `"route"` | Resolve relative to the route tree (`"route"`) or URL path segments (`"path"`) |

## Usage

```tsx
import { useHref } from "react-router";

function SomeComponent() {
  const href = useHref("some/where");
  // e.g. "/resolved/some/where"
  return <a href={href}>Link</a>;
}
```

## Notes

- Useful when you need a resolved URL string to pass to non-React-Router elements (e.g. native `<a>`)
- Available in all modes: Framework, Data, and Declarative

## Related

- [useLocation](./useLocation.md) — current location object
- [useNavigate](./useNavigate.md) — programmatic navigation
