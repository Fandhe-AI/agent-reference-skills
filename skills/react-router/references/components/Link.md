# Link

A progressively enhanced `<a href>` wrapper that enables client-side navigation. Supports prefetching, scroll management, view transitions, and relative path resolution. Available in Framework, Data, and Declarative modes.

## Signature / Usage

```tsx
function Link(props: LinkProps): React.ReactElement

import { Link } from "react-router";

// Basic
<Link to="/dashboard">Dashboard</Link>

// With prefetch on hover
<Link to="/profile" prefetch="intent">Profile</Link>

// With state
<Link to="/somewhere" state={{ from: "home" }}>Go</Link>

// Relative to URL path (not route pattern)
<Link to=".." relative="path">Back</Link>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `to` | `string \| Partial<Path>` | Navigation destination: a string path or a `{ pathname, search, hash }` object. |
| `relative` | `"route" \| "path"` | Path resolution mode. Default: `"route"` (relative to route pattern). |
| `replace` | `boolean` | Replaces current History entry instead of pushing a new one. |
| `state` | `any` | Persistent client-side state passed to the next location via `history.state`. |
| `reloadDocument` | `boolean` | Uses document navigation instead of client-side routing. |
| `preventScrollReset` | `boolean` | Prevents scroll reset to top when clicked (requires `<ScrollRestoration>`). Framework & Data modes. |
| `viewTransition` | `boolean` | Enables View Transition API for the navigation. Framework & Data modes. |
| `prefetch` | `"none" \| "intent" \| "render" \| "viewport"` | Prefetching strategy. Default: `"none"`. Framework mode only. |
| `discover` | `"render" \| "none"` | Lazy route discovery behavior. Default: `"render"`. Framework mode only. |
| `mask` | `string` | Displays a different URL in the address bar than the actual navigation target. Framework & Data modes; SPA/SSR renders only. |
| `defaultShouldRevalidate` | `boolean` | Default revalidation behavior for the navigation. |

## Notes

- `prefetch` inserts `<link rel="prefetch">` tags after the anchor element. If using `nav :last-child` CSS selectors, switch to `nav :last-of-type` to avoid broken styles.
- `preventScrollReset` only suppresses scroll reset for new navigations; back/forward navigation still restores scroll normally.
- `state` is client-side only (stored in `history.state`) and is not accessible on the server.
- `mask` only works in SPA mode and SSR renders; sharing a masked URL loads only the masked location without context.

## Related

- [NavLink](./NavLink.md)
- [Form](./Form.md)
- [ScrollRestoration](./ScrollRestoration.md)
