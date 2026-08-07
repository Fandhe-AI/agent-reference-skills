# useLinkClickHandler

Handles the click behavior for router `<Link>` components. Useful if you need to create custom `<Link>` components with the same click behavior as the exported `<Link>`.

## Signature / Usage

```typescript
function useLinkClickHandler<E extends Element = HTMLAnchorElement>(
  to: To,
  options?: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    mask?: To;
    state?: any;
    preventScrollReset?: boolean;
    relative?: RelativeRoutingType;
    viewTransition?: boolean;
    defaultShouldRevalidate?: boolean;
    useTransitions?: boolean;
  },
): (event: React.MouseEvent<E, MouseEvent>) => void
```

```tsx
import { useLinkClickHandler } from "react-router";

const CustomLink = React.forwardRef(function CustomLink(
  { to, ...props },
  ref,
) {
  const handleClick = useLinkClickHandler(to);
  return <a ref={ref} href={to} onClick={handleClick} {...props} />;
});
```

## Options / Props

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `to` | `To` | required | The URL to navigate to (string or partial Path object) |
| `target` | `React.HTMLAttributeAnchorTarget` | `undefined` | The target attribute for the link |
| `replace` | `boolean` | `false` | Replace current History entry instead of pushing a new one |
| `state` | `any` | `undefined` | State to add to the History entry for this navigation |
| `preventScrollReset` | `boolean` | `false` | Prevent scroll position from resetting to top on navigation (with `ScrollRestoration`) |
| `relative` | `RelativeRoutingType` | `"route"` | The relative routing type for the link |
| `viewTransition` | `boolean` | `false` | Enable the View Transition API for this navigation |
| `defaultShouldRevalidate` | `boolean` | `undefined` | Specify default revalidation behavior for the navigation |
| `mask` | `To` | `undefined` | Masked location to display in browser instead of router location |
| `useTransitions` | `boolean` | `false` | Wrap navigation in `React.startTransition` for concurrent rendering |

## Notes

- Available in all modes: Framework, Data, and Declarative

## Related

- [useNavigate](./useNavigate.md) — programmatic navigation
- [useHref](./useHref.md) — resolve a path to an href string
