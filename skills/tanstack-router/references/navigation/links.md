---
source: https://tanstack.com/router/latest/docs/framework/react/guide/navigation
---

# Link, useNavigate, Navigate, router.navigate

The primary navigation APIs: `<Link>` (declarative anchor rendering), `useNavigate()`/`router.navigate()` (imperative), and `<Navigate>` (declarative immediate navigation).

## Signature / Usage

```tsx
import { Link } from '@tanstack/react-router'

<Link to="/blog/post/$postId" params={{ postId: 'my-first-blog-post' }}>
  Blog Post
</Link>
```

```tsx
function Component() {
  const navigate = useNavigate({ from: '/posts/$postId' })
  navigate({ to: '/posts/$postId', params: { postId } })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `LinkOptions` | extends `NavigateOptions` | Adds `target`, `activeOptions`, `preload`, `preloadDelay`, `disabled` |
| `activeOptions.exact` | `boolean` | Active only on exact pathname match (default `false`) |
| `activeOptions.includeHash` | `boolean` | Include hash in active match (default `false`) |
| `activeOptions.includeSearch` | `boolean` | Include search params in active match (default `true`) |
| `activeOptions.explicitUndefined` | `boolean` | Explicitly-`undefined` search keys must be absent from current URL to be active |
| `preload` | `false \| 'intent' \| 'viewport' \| 'render'` | Preload strategy |
| `preloadDelay` | `number` | Delay (ms) before intent/viewport preload begins (default 50) |
| `activeProps` | `object \| fn` | Extra props applied when link is active |
| `inactiveProps` | `object \| fn` | Extra props applied when link is inactive |
| `disabled` | `boolean` | Render link without `href` attribute |

## Notes

- `"."` reloads the current (or `from`) location; `".."` navigates to the first parent route.
- Optional path params use `{-$param}` syntax; pass `params: {}` to inherit current params, or set a param to `undefined` to remove it.
- `data-status="active"` attribute is set on the rendered element when active; useful for CSS-based styling.
- The `Link` component adds `isActive` as a render-prop when children is a function.
- `useMatchRoute`/`<MatchRoute>` cover checking whether a route is matched/pending, e.g. showing a spinner during navigation.
- `useNavigate`/`router.navigate` accept `NavigateOptions`; prefer `<Link>` for anything user-clickable since it supports `href`, cmd/ctrl-click, and active state.
- `Link` / `useNavigate` are TanStack Router APIs, unrelated to the same-named APIs in `react-router` (React Router).

## Related

- [navigation.md](./navigation.md)
- [custom-link.md](./custom-link.md)
- [path-params.md](./path-params.md)
