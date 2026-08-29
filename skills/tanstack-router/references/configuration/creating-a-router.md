---
source: https://tanstack.com/router/latest/docs/framework/react/guide/creating-a-router
---

# Creating a Router

Instantiates the `Router` core that manages the route tree, matches routes, and coordinates navigations. A `router` instance must be registered on the `Register` interface for project-wide type safety.

## Signature / Usage

```tsx title="src/router.tsx"
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| routeTree | `AnyRoute` | — | Required. Root of the route tree, from file-based routing's generated `routeTree.gen.ts` or a code-based tree built with `rootRoute.addChildren(...)` |
| history | `RouterHistory` | browser history | Custom history object |
| stringifySearch | `(search) => string` | — | Custom search param serializer |
| parseSearch | `(searchStr) => search` | — | Custom search param deserializer |
| search.strict | `boolean` | `false` | Controls unknown search param handling |
| defaultPreload | `false \| 'intent' \| 'viewport' \| 'render'` | `false` | Route preloading strategy |
| defaultPreloadDelay | `number` | `50` | Millisecond delay before intent/viewport preloads |
| defaultPreloadStaleTime | `number` | `30_000` | Cache duration for preloaded data |
| defaultPreloadGcTime | `number` | 5 minutes | Garbage collection time for preloaded data |
| defaultComponent | `Component` | `Outlet` | Fallback route component |
| defaultErrorComponent | `Component` | `ErrorComponent` | Error boundary component |
| defaultNotFoundComponent | `Component` | `NotFound` | Router-wide fallback for routes without their own `notFoundComponent` |
| defaultPendingComponent | `Component` | — | Loading state component |
| defaultStaleTime | `number` | `0` | How long data remains fresh |
| defaultStaleReloadMode | `'background' \| 'blocking'` | `'background'` | Revalidation approach |
| defaultGcTime | `number` | 5 minutes | Cache retention period |
| defaultPendingMs | `number` | `1000` | Threshold before showing pending UI |
| defaultPendingMinMs | `number` | `500` | Minimum pending display duration |
| protocolAllowlist | `string[]` | — | Permitted URL protocols, e.g. `['https:', 'mailto:']` |
| basepath | `string` | `/` | Router mount point |
| trailingSlash | `'always' \| 'never' \| 'preserve'` | `'never'` | Trailing slash handling |
| caseSensitive | `boolean` | `false` | Route matching case sensitivity |
| rewrite | `RouterRewrite` | — | Bidirectional URL transformation configuration |
| pathParamsAllowedCharacters | `string[]` | — | URI characters permitted in path parameters |
| defaultViewTransition | `boolean \| object` | — | Enable View Transitions API integration |
| defaultHashScrollIntoView | `boolean` | `true` | Auto-scroll to hash targets |
| context | `object` | `{}` | Root context available to all routes (see Router Context) |
| routeMasks | `RouteMask[]` | — | Route masking configuration |
| unmaskOnReload | `boolean` | `false` | Auto-remove masks on page reload |
| notFoundMode | `'root' \| 'fuzzy'` | `'fuzzy'` | Route matching fallback mode |
| defaultStructuralSharing | `boolean` | `false` | Enable structural sharing optimization |
| defaultRemountDeps | `Function` | — | Determines route component remount behavior |
| Wrap | `Component` | — | Top-level provider component |
| InnerWrap | `Component` | — | Inner provider with router context access |
| defaultOnCatch | `Function` | — | Error handler for the router's `ErrorBoundary` |
| disableGlobalCatchBoundary | `boolean` | `false` | Disable automatic error wrapping |
| dehydrate | `Function` | — | Custom state serialization |
| hydrate | `Function` | — | Custom state rehydration |

## Notes

- Router type registration (via `declare module` on `Register`) is required for library-wide type safety across bare imports like `Link` and `useNavigate` — do not skip it.
- `notFoundComponent` for the catch-all case is configured on the root route via `createRootRoute`, not on `createRouter` directly (`defaultNotFoundComponent` is the router-wide fallback).
- The full `RouterOptions` type reference lives at `../api/router/RouterOptionsType.md` on the official site.

## Related

- [Router Context](./router-context.md)
- [Not Found Errors](./not-found-errors.md)
- [Router Events](./router-events.md)
