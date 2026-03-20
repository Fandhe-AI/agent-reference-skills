# Link

A progressively enhanced `<a href>` wrapper that enables client-side navigation. Supports prefetching, scroll management, view transitions, and relative path resolution.

## Props

| Name | Type | Description |
|------|------|-------------|
| `to` | `string \| Partial<Path>` | Navigation destination: a string path or a `{ pathname, search, hash }` object. |
| `relative` | `"route" \| "path"` | Path resolution mode. Default: `"route"` (relative to route pattern). |
| `replace` | `boolean` | Replaces current History entry instead of pushing a new one. |
| `state` | `any` | Persistent client-side state passed to the next location via `history.state`. |
| `reloadDocument` | `boolean` | Uses document navigation instead of client-side routing. |
| `preventScrollReset` | `boolean` | Prevents scroll reset to top when clicked (requires `<ScrollRestoration>`). |
| `viewTransition` | `boolean` | Enables View Transition API for the navigation. |
| `prefetch` | `"none" \| "intent" \| "render" \| "viewport"` | Prefetching strategy. Default: `"none"`. Framework mode only. |
| `discover` | `"render" \| "none"` | Lazy route discovery behavior. Default: `"render"`. Framework mode only. |
| `unstable_mask` | `string` | Masked URL path for contextual SPA/SSR navigations. |
| `unstable_defaultShouldRevalidate` | `boolean` | Default revalidation behavior for the navigation. |

## 使用例

```tsx
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

## 注意点

- `prefetch` inserts `<link rel="prefetch">` tags after the anchor element. If using `nav :last-child` CSS selectors, switch to `nav :last-of-type` to avoid broken styles.
- `preventScrollReset` only suppresses scroll reset for new navigations; back/forward navigation still restores scroll normally.
- `state` is client-side only (stored in `history.state`) and is not accessible on the server.
- `unstable_mask` only works in SPA mode and SSR renders; sharing a masked URL loads only the masked location without context.

## 関連

- [NavLink.md](./NavLink.md)
- [Form.md](./Form.md)
- [ScrollRestoration.md](./ScrollRestoration.md)
