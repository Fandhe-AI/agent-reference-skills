---
source: https://tanstack.com/router/latest/docs/framework/react/guide/navigation
---

# Navigation

Every navigation within TanStack Router is relative, using a shared `from`/`to` interface across all navigation and route-matching APIs.

## Signature / Usage

```ts
type ToOptions<TRouteTree, TFrom, TTo> = {
  from?: string
  to: string
  params: Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>)
  search: Record<string, unknown> | ((prev: Record<string, unknown>) => Record<string, unknown>)
  hash?: string | ((prevHash: string) => string)
  state?: Record<string, any> | ((prevState: Record<string, unknown>) => Record<string, unknown>)
  mask?: ToMaskOptions<TRouteTree>
}

type NavigateOptions<TRouteTree, TFrom, TTo> = ToOptions<TRouteTree, TFrom, TTo> & {
  replace?: boolean
  resetScroll?: boolean
  hashScrollIntoView?: boolean | ScrollIntoViewOptions
  viewTransition?: boolean | ViewTransitionOptions
  ignoreBlocker?: boolean
  reloadDocument?: boolean
  href?: string
}
```

```tsx
import { useNavigate } from '@tanstack/react-router'

function Component() {
  const navigate = useNavigate({ from: '/posts/$postId' })
  navigate({ to: '/posts/$postId', params: { postId: '123' } })
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `from` | `string` | Origin route path. Defaults to root `/` if omitted (absolute paths only autocomplete) |
| `to` | `string` | Destination route path (absolute or relative to `from`) |
| `params` | `object \| fn` | Path param values to interpolate into `to` |
| `search` | `object \| fn` | Search params for the destination |
| `hash` | `string \| fn` | URL hash fragment |
| `state` | `object \| fn` | History API state, not persisted in URL |
| `mask` | `ToMaskOptions` | Navigation object used to mask the displayed URL |
| `replace` | `boolean` | Replace current history entry instead of pushing |
| `resetScroll` | `boolean` | Reset scroll position to 0,0 after commit |
| `viewTransition` | `boolean \| ViewTransitionOptions` | Use `document.startViewTransition()` when navigating |
| `reloadDocument` | `boolean` | Force full page load instead of SPA navigation |
| `href` | `string` | Full built href to navigate to (e.g. external target), used instead of `to` |

## Notes

- APIs: `<Link>` component, `useNavigate()` hook, `<Navigate>` component, `router.navigate()` method.
- None of these APIs replace server-side redirects for pre-mount redirection.
- `useMatchRoute` / `<MatchRoute>` check whether a route is currently matched or pending; `router.matchRoute` reads latest state without subscribing to re-renders.
- `Link` / `useNavigate` here are TanStack Router APIs and are unrelated to the same-named APIs in `react-router` (React Router). Search param type-safe validation (`validateSearch`) is also distinct from `nuqs`.

## Related

- [links.md](./links.md)
- [path-params.md](./path-params.md)
- [search-params.md](./search-params.md)
- [history-types.md](./history-types.md)
