# useOutlet

Returns the element for the child route at this level of the route hierarchy. Used internally by `<Outlet>` to render child routes.

## Signature / Usage

```typescript
function useOutlet(context?: unknown): React.ReactElement | null
```

```tsx
import { useOutlet } from "react-router";

function CustomLayout() {
  const outlet = useOutlet();
  return <div className="layout">{outlet}</div>;
}
```

## Options / Props

| Option | Type | Description |
|--------|------|-------------|
| `context` | `unknown` | The context to pass to the outlet |

## Notes

- Available in all modes: Framework, Data, and Declarative

## Related

- [useOutletContext](./useOutletContext.md) — read the context passed to the parent `<Outlet>`
