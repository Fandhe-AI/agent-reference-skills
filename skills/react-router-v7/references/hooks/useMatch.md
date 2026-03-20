# useMatch

Returns a `PathMatch` object if the given pattern matches the current URL, or `null` if it does not. Useful for determining "active" state of navigation elements.

## Signature

```typescript
function useMatch<
  ParamKey extends ParamParseKey<Path>,
  Path extends string,
>(
  pattern: PathPattern<Path> | Path,
): PathMatch<ParamKey> | null
```

## Usage

```tsx
import { useMatch } from "react-router";

function NavItem({ to, children }) {
  const match = useMatch(to);
  return (
    <a href={to} style={{ fontWeight: match ? "bold" : "normal" }}>
      {children}
    </a>
  );
}
```

## PathMatch object

| Property | Type | Description |
|----------|------|-------------|
| `pathname` | `string` | The matched portion of the URL |
| `pathnameBase` | `string` | The base of the matched pathname |
| `pattern` | `PathPattern` | The pattern that was matched |
| `params` | `Params<ParamKey>` | Extracted dynamic params |

## Notes

- Returns `null` when the pattern does not match — guard before accessing properties
- Available in all modes: Framework, Data, and Declarative

## Related

- [useMatches](./useMatches.md) — all active route matches in the hierarchy
- [useParams](./useParams.md) — current route's dynamic params
- [useLocation](./useLocation.md) — current location object
