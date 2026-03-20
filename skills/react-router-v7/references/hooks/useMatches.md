# useMatches

Returns an array of `UIMatch` objects representing every active route in the current match hierarchy, from root to the current route.

## Signature

```typescript
function useMatches(): UIMatch[]
```

## Usage

```tsx
import { useMatches } from "react-router";

function Breadcrumbs() {
  const matches = useMatches();
  return (
    <nav>
      {matches
        .filter(m => m.handle?.breadcrumb)
        .map(m => <span key={m.id}>{m.handle.breadcrumb}</span>)}
    </nav>
  );
}
```

## UIMatch object

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Route ID |
| `pathname` | `string` | Matched pathname |
| `params` | `Params` | Dynamic route params |
| `data` | `unknown` | Loader data for this route |
| `handle` | `unknown` | The route module's `handle` export |

## Notes

- Commonly used for breadcrumbs, layout decisions, and accessing parent loader data
- The `handle` export on a route module is an arbitrary value — use it to attach metadata
- Not available in Declarative mode

## Related

- [useLoaderData](./useLoaderData.md) — current route's loader data
- [useRouteLoaderData](./useRouteLoaderData.md) — loader data by route ID
- [useMatch](./useMatch.md) — test a single pattern against the current URL
