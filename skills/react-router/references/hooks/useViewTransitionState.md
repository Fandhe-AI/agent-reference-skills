# useViewTransitionState

**Deprecated** (8.5.0): use React's `<ViewTransition>` component instead. This hook only tracks React Router's legacy view transitions, not transitions started by React.

Returns `true` when there is an active View Transition targeting the specified location, enabling fine-grained CSS `view-transition-name` assignments during transitions.

## Signature / Usage

```typescript
function useViewTransitionState(
  to: To,
  options?: { relative?: RelativeRoutingType },
): boolean
```

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

## Options / Props

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `relative` | `"route" \| "path"` | `"route"` | How to resolve the `to` location |

## Notes

- View transitions must first be enabled for the navigation via `<Link viewTransition>`, `<Form viewTransition>`, `submit(..., { viewTransition: true })`, or `navigate(..., { viewTransition: true })`
- Not available in Declarative mode
- Deprecated: this hook only tracks React Router's legacy view transitions. Use React's `<ViewTransition>` component to style transitions; see [View Transitions](../how-to/view-transitions.md)
- Source: https://reactrouter.com/api/hooks/useViewTransitionState (docs/api/hooks/useViewTransitionState.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/api/hooks/useViewTransitionState.md)

## Related

- [useNavigate](./useNavigate.md) — navigate with `viewTransition` option
