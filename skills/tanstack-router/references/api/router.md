---
source: https://tanstack.com/router/latest/docs/api/router/RouterType
---

# Router

The type describing a router instance (returned by `createRouter`) used for navigation and state management.

## Signature / Usage

```tsx
const router = createRouter({ routeTree })
router.navigate({ to: '/posts' })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `RouterState` | Current router state; non-reactive (use `useRouterState` for reactivity) |
| `navigate` | `(options: NavigateOptions) => Promise<void>` | Navigates to a new location |
| `matchRoute` | `(dest: ToOptions, matchOpts?: MatchRouteOptions) => RouteMatch['params'] \| false` | Matches pathname/search against the route tree |
| `matchRoutes` | `(pathname: string, locationSearch?, opts?) => RouteMatch[]` | Matches pathname and search; returns an array of matches |
| `buildLocation` | `(opts: BuildNextOptions) => ParsedLocation` | Builds a parsed location for a future navigation |
| `commitLocation` | `(location) => Promise<void>` | Commits a location to browser history |
| `invalidate` | `(opts?) => Promise<void>` | Reruns loaders and marks route data stale |
| `load` | `(opts?: { sync?: boolean }) => Promise<void>` | Loads all matched routes (respects `staleTime`) |
| `preloadRoute` | `(opts: NavigateOptions) => Promise<RouteMatch[] \| undefined>` | Speculatively preloads route matches |
| `subscribe` | `(eventType, fn) => () => void` | Subscribes to router events; returns an unsubscribe function |
| `clearCache` | `(opts?) => void` | Removes cached route matches and preloads |
| `dehydrate` | `() => DehydratedRouter` | Serializes router state for SSR |
| `hydrate` | `(dehydrated: DehydratedRouter) => void` | Restores router state from a dehydrated object |

## Related

- [createRouter](./create-router.md)
- [RouterOptions](./router-options.md)
- [useRouter](./use-router.md)
