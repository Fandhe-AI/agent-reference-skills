# api

React Router (`react-router`) の同名フック・コンポーネント（`useNavigate` / `useParams` / `useLoaderData` / `Link` / `Outlet` 等）とは別 API。TanStack Router 独自のシグネチャ・型を参照すること。

| Name | Description | Path |
|------|-------------|------|
| createRouter | Creates a new `Router` instance from `RouterOptions` | [create-router.md](./create-router.md) |
| createRoute | Creates a `Route` instance for code-based routing | [create-route.md](./create-route.md) |
| createFileRoute | Creates a file-based route instance for CLI-generated route trees | [create-file-route.md](./create-file-route.md) |
| createRootRoute | Creates the root route instance | [create-root-route.md](./create-root-route.md) |
| createRootRouteWithContext | Creates a root route requiring a router context type | [create-root-route-with-context.md](./create-root-route-with-context.md) |
| createLazyFileRoute | Creates a lazily-loaded, code-split file-based route | [create-lazy-file-route.md](./create-lazy-file-route.md) |
| lazyRouteComponent | Creates a code-split route component with preload support | [lazy-route-component.md](./lazy-route-component.md) |
| RouterProvider | Root component that mounts a `Router` instance | [router-provider.md](./router-provider.md) |
| Link | Component for navigating to a new location | [link.md](./link.md) |
| Outlet | Renders the next matched child route | [outlet.md](./outlet.md) |
| Navigate | Navigates to a new location when rendered | [navigate.md](./navigate.md) |
| useRouter | Returns the current `Router` instance | [use-router.md](./use-router.md) |
| useNavigate | Returns a `navigate` function | [use-navigate.md](./use-navigate.md) |
| useParams | Returns the current route's path params | [use-params.md](./use-params.md) |
| useSearch | Returns the current search query params | [use-search.md](./use-search.md) |
| useLoaderData | Returns the loader data of the closest match | [use-loader-data.md](./use-loader-data.md) |
| useLoaderDeps | Returns a route's loader dependencies | [use-loader-deps.md](./use-loader-deps.md) |
| useRouteContext | Returns the current route context | [use-route-context.md](./use-route-context.md) |
| useMatch | Returns a single `RouteMatch` | [use-match.md](./use-match.md) |
| useMatches | Returns the full array of `RouteMatch` objects | [use-matches.md](./use-matches.md) |
| useMatchRoute | Returns a function to match a route imperatively | [use-match-route.md](./use-match-route.md) |
| useRouterState | Returns the router's internal state | [use-router-state.md](./use-router-state.md) |
| useBlocker | Blocks navigation when a condition is met (experimental) | [use-blocker.md](./use-blocker.md) |
| useLocation | Returns the current parsed location | [use-location.md](./use-location.md) |
| useCanGoBack | Returns whether router history can go back | [use-can-go-back.md](./use-can-go-back.md) |
| redirect | Returns/throws a `Redirect` from `beforeLoad`/`loader` | [redirect.md](./redirect.md) |
| notFound | Returns/throws a `NotFoundError` from `beforeLoad`/`loader` | [not-found.md](./not-found.md) |
| RouterOptions | Configuration options accepted by `createRouter` | [router-options.md](./router-options.md) |
| RouteOptions | Configuration options accepted by `createRoute`/`createFileRoute` | [route-options.md](./route-options.md) |
| Router | Router instance type (navigate, matchRoute, load, etc.) | [router.md](./router.md) |
| RouteMatch | Type describing a single matched route | [route-match.md](./route-match.md) |
| ParsedLocation | Type describing a parsed location (pathname/search/hash) | [parsed-location.md](./parsed-location.md) |
| NavigateOptions | Options accepted by `navigate`/`useNavigate`/`Navigate` | [navigate-options.md](./navigate-options.md) |
| LinkOptions | Options accepted by `Link` (extends `NavigateOptions`) | [link-options.md](./link-options.md) |
| Register | Module augmentation interface for full router type safety | [register.md](./register.md) |
| ErrorComponent | Default error-rendering component | [error-component.md](./error-component.md) |
| CatchBoundary | Catches errors thrown by children | [catch-boundary.md](./catch-boundary.md) |
| CatchNotFound | Catches not-found errors thrown by children | [catch-not-found.md](./catch-not-found.md) |
| retainSearchParams | Search middleware that retains search params across navigation | [retain-search-params.md](./retain-search-params.md) |
| stripSearchParams | Search middleware that strips search params from the URL | [strip-search-params.md](./strip-search-params.md) |
| eslint-plugin-router | TanStack Router's ESLint plugin | [eslint-plugin-router.md](./eslint-plugin-router.md) |
| create-route-property-order | ESLint rule enforcing route-option property order | [create-route-property-order.md](./create-route-property-order.md) |
| TanStack Query Integration | SSR dehydration/hydration/streaming integration with TanStack Query | [query.md](./query.md) |
| defer | Wraps a promise with a deferred state object for `useAwaited`/`Await` | [defer.md](./defer.md) |
| Await | Suspends rendering until a promise resolves or rejects | [await.md](./await.md) |
| useAwaited | Suspends a component until a deferred promise settles | [use-awaited.md](./use-awaited.md) |
| getRouteApi | Creates type-safe hooks pre-bound to a specific route ID | [get-route-api.md](./get-route-api.md) |
| createRouteMask | Creates a route mask configuration for `RouterOptions.routeMasks` | [create-route-mask.md](./create-route-mask.md) |
| MatchRoute | Component wrapper around `useMatchRoute` for conditional rendering | [match-route.md](./match-route.md) |
| ClientOnly | Renders a component only on the client, avoiding SSR hydration errors | [client-only.md](./client-only.md) |
| useLinkProps | Returns anchor element props for a set of link options | [use-link-props.md](./use-link-props.md) |
| useChildMatches | Returns child `RouteMatch` objects excluding the current match | [use-child-matches.md](./use-child-matches.md) |
| useParentMatches | Returns parent `RouteMatch` objects excluding the current match | [use-parent-matches.md](./use-parent-matches.md) |
| isRedirect | Checks whether a value is a redirect object | [is-redirect.md](./is-redirect.md) |
| isNotFound | Checks whether a value is a `NotFoundError` object | [is-not-found.md](./is-not-found.md) |
