---
source: https://tanstack.com/router/latest/docs/api/router/RouterOptionsType
---

# RouterOptions

The type describing all configuration options accepted by `createRouter`.

## Signature / Usage

```tsx
const router = createRouter({
  routeTree,
  basepath: '/app',
  defaultPreload: 'intent',
  context: { queryClient },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `routeTree` | `AnyRoute` | — | The route tree used to configure the router instance (required) |
| `history` | `RouterHistory` | `createBrowserHistory()` | Manages browser history |
| `basepath` | `string` | `/` | Basepath for the entire router (mounting at a subpath) |
| `context` | `any` | — | Root context provided to all routes |
| `defaultPreload` | `false \| 'intent' \| 'viewport' \| 'render'` | `false` | Default route preloading behavior |
| `defaultComponent` | `RouteComponent` | `Outlet` | Fallback `component` used when a route provides none |
| `caseSensitive` | `boolean` | `false` | Whether route matching is case-sensitive |
| `trailingSlash` | `'always' \| 'never' \| 'preserve'` | `'never'` | Trailing slash handling |
| `notFoundMode` | `'root' \| 'fuzzy'` | `'fuzzy'` | Not-found route matching behavior |
| `protocolAllowlist` | `Array<string>` | `DEFAULT_PROTOCOL_ALLOWLIST` (`http:`, `https:`, `mailto:`, `tel:`) | Restricts allowed URL protocols |
| `origin` | `string` | browser origin (`http://localhost` on the server and in browsers with an opaque origin) | Origin used to resolve URLs. Pass a normalized origin without a path or trailing slash, e.g. `new URL(url).origin` |
| `pathParamsAllowedCharacters` | `ReadonlyArray<';' \| ':' \| '@' \| '&' \| '=' \| '+' \| '$' \| ','>` | — | URI characters allowed in path params that `encodeURIComponent` would otherwise escape |
| `defaultOnCatch` | `(error: unknown, errorInfo: ErrorInfo) => void` | — | Default `onCatch` handler for errors caught by the Router ErrorBoundary |

## Notes

- `pathParamsAllowedCharacters` is read only when the router is created. To change it, create a new router instance; `router.update` and provider props do not change it.
- `origin` is used as provided by the router; normalize a full URL with `new URL(url).origin` first.

## Related

- [createRouter](./create-router.md)
- [Router](./router.md)
