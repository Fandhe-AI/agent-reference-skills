# NavLink

A `<Link>` wrapper that automatically applies active/pending CSS classes and `aria-current="page"` based on whether its route is currently active. Supports render-function children and styles for dynamic styling.

## Props

| Name | Type | Description |
|------|------|-------------|
| `to` | `string \| Partial<Path>` | The destination URL or path object. |
| `end` | `boolean` | Match only when the URL ends at `to` (prevents parent matching child routes). |
| `caseSensitive` | `boolean` | Makes URL matching case-sensitive. Default: `false`. |
| `className` | `string \| (props: NavLinkRenderProps) => string` | Static or dynamic CSS classes based on active/pending state. |
| `style` | `CSSProperties \| (props: NavLinkRenderProps) => CSSProperties` | Static or dynamic inline styles. |
| `children` | `ReactNode \| (props: NavLinkRenderProps) => ReactNode` | Static content or render function. |
| `replace` | `boolean` | Replaces history entry instead of pushing. |
| `state` | `any` | Persistent client-side navigation state. |
| `relative` | `"route" \| "path"` | Relative path resolution. Default: `"route"`. |
| `reloadDocument` | `boolean` | Use browser navigation instead of client-side routing. |
| `preventScrollReset` | `boolean` | Prevent scroll reset on navigation. |
| `viewTransition` | `boolean` | Enable View Transition API for navigation. |
| `prefetch` | `"none" \| "intent" \| "render" \| "viewport"` | Prefetching strategy. Framework mode only. |
| `discover` | `"render" \| "none"` | Route discovery behavior. Framework mode only. |

### NavLinkRenderProps

| Name | Type | Description |
|------|------|-------------|
| `isActive` | `boolean` | Whether the link's route is currently active. |
| `isPending` | `boolean` | Whether a navigation to this route is pending (Framework & Data modes only). |
| `isTransitioning` | `boolean` | Whether a view transition is currently in progress. |

## 使用例

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

## 注意点

- Automatically adds `active`, `pending`, and `transitioning` classes; override via the `className` render function.
- `<NavLink to="/">` matches every URL by default. The `end` prop does not fully constrain root-path matching.
- `isPending` is only available in Framework and Data modes, not in Declarative mode.
- When using `prefetch`, `<link rel="prefetch">` tags are inserted after the element — use `nav :last-of-type` instead of `nav :last-child` in CSS.

## 関連

- [Link.md](./Link.md)
- [ScrollRestoration.md](./ScrollRestoration.md)
