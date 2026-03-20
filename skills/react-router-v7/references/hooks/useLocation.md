# useLocation

Returns the current `Location` object. Triggers a re-render whenever the location changes.

## Signature

```typescript
function useLocation(): Location
```

## Usage

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router";

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    ga("send", "pageview");
  }, [location]);

  return null;
}
```

## Location object properties

| Property | Type | Description |
|----------|------|-------------|
| `pathname` | `string` | The current URL path |
| `search` | `string` | The query string (e.g. `"?tab=1"`) |
| `hash` | `string` | The URL hash (e.g. `"#section"`) |
| `state` | `unknown` | State passed via `navigate` or `<Link state>` |
| `key` | `string` | Unique key for this location entry |

## Notes

- Commonly used with `useEffect` for analytics, scroll restoration, or animations on route change
- Available in all modes: Framework, Data, and Declarative

## Related

- [useNavigate](./useNavigate.md) — programmatic navigation
- [useParams](./useParams.md) — dynamic route parameters
- [useSearchParams](./useSearchParams.md) — read and update query string params
