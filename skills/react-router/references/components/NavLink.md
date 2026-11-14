# NavLink

A `<Link>` wrapper that automatically applies active/pending CSS classes and `aria-current="page"` based on whether its route is currently active. Supports render-function children and styles for dynamic styling. Available in Framework, Data, and Declarative modes.

## Signature / Usage

```tsx
import { NavLink } from "react-router";

<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `to` | `string \| Partial<Path>` | The destination URL or path object. |
| `end` | `boolean` | Match only when the URL ends at `to` (prevents parent matching child routes). Ignored by `<NavLink to="/">`, which only matches at the root route. |
| `caseSensitive` | `boolean` | Makes URL matching case-sensitive. Default: `false`. |
| `className` | `string \| (props: NavLinkRenderProps) => string` | Static or dynamic CSS classes based on active/pending state. |
| `style` | `CSSProperties \| (props: NavLinkRenderProps) => CSSProperties` | Static or dynamic inline styles. |
| `children` | `ReactNode \| (props: NavLinkRenderProps) => ReactNode` | Static content or render function. |
| `replace` | `boolean` | Replaces history entry instead of pushing. |
| `state` | `any` | Persistent client-side navigation state. |
| `relative` | `"route" \| "path"` | Relative path resolution. Default: `"route"`. |
| `reloadDocument` | `boolean` | Use browser navigation instead of client-side routing. |
| `preventScrollReset` | `boolean` | Prevent scroll reset on navigation. Framework & Data modes. |
| `viewTransition` | `boolean` | **Deprecated** (8.5.0). Enable View Transition API for navigation. Framework & Data modes. Use React's `<ViewTransition>` component instead. |
| `prefetch` | `"none" \| "intent" \| "render" \| "viewport"` | Prefetching strategy. Framework mode only. |
| `discover` | `"render" \| "none"` | Route discovery behavior. Framework mode only. |

### NavLinkRenderProps

| Name | Type | Description |
|------|------|-------------|
| `isActive` | `boolean` | Whether the link's route is currently active. |
| `isPending` | `boolean` | Whether a navigation to this route is pending (Framework & Data modes only). |
| `isTransitioning` | `boolean` | **Deprecated** (8.5.0). Whether a view transition is currently in progress. |

## Notes

- Automatically adds `active`, `pending`, and `transitioning` classes; override via the `className` render function.
- `<NavLink to="/">` matches every URL by default. The `end` prop does not fully constrain root-path matching.
- `isPending` is only available in Framework and Data modes, not in Declarative mode.
- When using `prefetch`, `<link rel="prefetch">` tags are inserted after the element — use `nav :last-of-type` instead of `nav :last-child` in CSS.
- `viewTransition`, the `isTransitioning` render prop and the `transitioning` class are deprecated and only track React Router's legacy view transitions. Use React's `<ViewTransition>` component instead; see [View Transitions](../how-to/view-transitions.md)
- Source: https://reactrouter.com/api/components/NavLink (docs/api/components/NavLink.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/api/components/NavLink.md)
- Source: https://github.com/remix-run/react-router/blob/react-router@8.5.1/packages/react-router/CHANGELOG.md (8.5.0 deprecation of view transition APIs, [PR #15493](https://github.com/remix-run/react-router/pull/15493))

## Related

- [Link](./Link.md)
- [ScrollRestoration](./ScrollRestoration.md)
