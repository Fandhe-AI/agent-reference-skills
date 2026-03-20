# useViewTransitionState

Returns `true` when there is an active View Transition targeting the specified location, enabling fine-grained CSS `view-transition-name` assignments during transitions.

## Signature

```typescript
function useViewTransitionState(
  to: To,
  options?: { relative?: RelativeRoutingType },
): boolean
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `relative` | `"route" \| "path"` | `"route"` | How to resolve the `to` location |

## Usage

```tsx
import { Link, useViewTransitionState } from "react-router";

function NavItem({ to, children }) {
  const isTransitioning = useViewTransitionState(to);
  return (
    <Link
      to={to}
      viewTransition
      style={{
        viewTransitionName: isTransitioning ? "active-item" : undefined,
      }}
    >
      {children}
    </Link>
  );
}
```

## Notes

- View transitions must first be enabled for the navigation via `<Link viewTransition>`, `<Form viewTransition>`, `submit(..., { viewTransition: true })`, or `navigate(..., { viewTransition: true })`
- Not available in Declarative mode

## Related

- [useNavigate](./useNavigate.md) — navigate with `viewTransition` option
