# useInRouterContext

Returns `true` if this component is a descendant of a `Router`, useful to ensure a component is used within a `Router`.

## Signature / Usage

```typescript
function useInRouterContext(): boolean
```

```tsx
import { useInRouterContext } from "react-router";

function SomeComponent() {
  const inRouter = useInRouterContext();
  if (!inRouter) {
    throw new Error("SomeComponent must be used within a Router");
  }
  return null;
}
```

## Notes

- Not available in Declarative mode

## Related

- [useLocation](./useLocation.md) — current location object
