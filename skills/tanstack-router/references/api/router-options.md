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
| `basepath` | `string` | — | Basepath for the entire router (mounting at a subpath) |
| `context` | `any` | — | Root context provided to all routes |
| `defaultPreload` | `false \| 'intent' \| 'viewport' \| 'render'` | `false` | Default route preloading behavior |
| `defaultComponent` | `RouteComponent` | — | Fallback `component` used when a route provides none |
| `caseSensitive` | `boolean` | `false` | Whether route matching is case-sensitive |
| `trailingSlash` | `'always' \| 'never' \| 'preserve'` | `'never'` | Trailing slash handling |
| `notFoundMode` | `'root' \| 'fuzzy'` | `'fuzzy'` | Not-found route matching behavior |
| `protocolAllowlist` | `Array<string>` | — | Restricts allowed URL protocols |

## Related

- [createRouter](./create-router.md)
- [Router](./router.md)
