# api

React Router (`react-router`) の同名フック・コンポーネント（`useNavigate` / `useParams` / `useLoaderData` / `Link` / `Outlet` 等）とは別 API。TanStack Router 独自のシグネチャ・型を参照すること。

| Name | Description | Path |
|------|-------------|------|
| ActiveLinkOptions | Extends `LinkOptions` with options describing how a link is styled when it is active or inactive. | [active-link-options.md](./active-link-options.md) |
| AsyncRouteComponent | Describes a code-split route component that can be preloaded using a `component.preload()` method. | [async-route-component.md](./async-route-component.md) |
| Await | Suspends rendering until the provided promise is resolved or rejected. Targeted at React 18; React 19 users can use the `use()` hook instead. | [await.md](./await.md) |
| CatchBoundary | Catches errors thrown by its children, renders an error component, and optionally calls an `onCatch` callback. | [catch-boundary.md](./catch-boundary.md) |
| CatchNotFound | Catches not-found errors thrown by its children, renders a fallback component, and optionally calls an `onCatch` callback. | [catch-not-found.md](./catch-not-found.md) |
| ClientOnly | Renders a component only on the client, without breaking server-side rendering due to hydration errors. | [client-only.md](./client-only.md) |
| createFileRoute | A factory function that creates file-based route instances for automatic route tree generation via the `tsr generate` and `tsr watch` commands. | [create-file-route.md](./create-file-route.md) |
| createLazyFileRoute | Creates a partial file-based route that is code-split and loaded lazily when matched. Configures only "non-critical" properties (`component`, `pendingComponent`, `errorComponent`, `notFoundComponent`). | [create-lazy-file-route.md](./create-lazy-file-route.md) |
| createLazyRoute | Creates a partial code-based route instance that is lazily loaded when matched. It can only configure the non-critical properties of the route: `component`, `pendingComponent`, `errorComponent`, and `notFoundComponent`. | [create-lazy-route.md](./create-lazy-route.md) |
| createRootRoute | Returns a new root route instance. The root route instance is used to build a route tree (via `.addChildren`). | [create-root-route.md](./create-root-route.md) |
| createRootRouteWithContext | A helper function that creates a root route instance requiring a context type to be fulfilled when the router is created. | [create-root-route-with-context.md](./create-root-route-with-context.md) |
| createRoute | Creates a `Route` instance from a `RouteOptions` object. Route instances are passed to a root route's children to build a route tree (code-based routing). | [create-route.md](./create-route.md) |
| createRouteMask | Helper for generating a route mask configuration object for `RouterOptions.routeMasks`, letting one route path display in the browser while another route path is internally rendered. | [create-route-mask.md](./create-route-mask.md) |
| create-route-property-order | Enforces a specific property order in `createRoute` / `createFileRoute` / `createRootRoute` / `createRootRouteWithContext` calls, since property order affects type inference. | [create-route-property-order.md](./create-route-property-order.md) |
| createRouter | Accepts a `RouterOptions` object and creates a new `Router` instance. Used together with `RouterProvider` to mount the router in a React app. | [create-router.md](./create-router.md) |
| DefaultGlobalNotFound | Component that renders "Not Found" on the root route when no other route matches and a `notFoundComponent` is not provided. | [default-global-not-found.md](./default-global-not-found.md) |
| defer | Wraps a promise with a deferred state object that can be inspected and passed to `useAwaited` or `<Await>` for suspending until the promise resolves or rejects. | [defer.md](./defer.md) |
| ErrorComponent | Renders an error notice and optional details about the thrown value, for use as a route's `errorComponent`. | [error-component.md](./error-component.md) |
| eslint-plugin-router | TanStack Router's own ESLint plugin, enforcing best practices and helping avoid common mistakes. | [eslint-plugin-router.md](./eslint-plugin-router.md) |
| File-Based Routing API (generator config) | Configuration options for TanStack Router's file-based routing generator. | [file-based-routing-config.md](./file-based-routing-config.md) |
| getRouteApi | Creates type-safe hook bindings (`useParams`, `useSearch`, `useRouteContext`, `useLoaderData`, etc.) pre-bound to a specific route ID, avoiding repeated route-ID passing throughout the component tree. | [get-route-api.md](./get-route-api.md) |
| HistoryState | Interface exported by the `history` package describing the shape of the state object used with the `history` package and the `window.location` API. It can be extended to add properties to the state object across your application. | [history-state.md](./history-state.md) |
| isNotFound | Type guard checking whether a given value is a `NotFoundError` object. | [is-not-found.md](./is-not-found.md) |
| isRedirect | Checks whether a given value is a redirect object. | [is-redirect.md](./is-redirect.md) |
| lazyRouteComponent | Creates a code-split route component (for code-based routing) with preload capability via `component.preload()`. | [lazy-route-component.md](./lazy-route-component.md) |
| Link | Creates a link that navigates to a new location, including changes to the pathname, search params, hash, and location state. | [link.md](./link.md) |
| LinkOptions | Options accepted by the `Link` component. Extends `NavigateOptions` with anchor-specific behavior. | [link-options.md](./link-options.md) |
| linkOptions (function) | Type checks an object literal with the intention of being used for `Link`, `navigate` or `redirect`. Returns an object literal with the exact type inferred from the input. | [link-options-function.md](./link-options-function.md) |
| LinkProps | Extends `ActiveLinkOptions` and `React.AnchorHTMLAttributes<HTMLAnchorElement>` with props specific to the `Link` component. | [link-props.md](./link-props.md) |
| MatchRoute | Wrapper component around `useMatchRoute` that always renders, adjusting its content based on whether a route currently matches — useful for conditional UI such as spinners. | [match-route.md](./match-route.md) |
| MatchRouteOptions | Options used when matching a route. | [match-route-options.md](./match-route-options.md) |
| Navigate | Navigates to a new location when rendered. Handles changes to pathname, search params, hash, and location state. | [navigate.md](./navigate.md) |
| NavigateOptions | Options accepted by `navigate`, `useNavigate`, and the `Navigate` component. Extends `ToOptions` (`to`, `params`, `search`, `hash`, `from`). | [navigate-options.md](./navigate-options.md) |
| notFound | Returns a new `NotFoundError` object that can be returned or thrown from a route's `beforeLoad` or `loader` to trigger the `notFoundComponent`. | [not-found.md](./not-found.md) |
| NotFoundComponent | Component that renders when a not-found error occurs in a route. Typically returns a "page not found" message along with links to go home or navigate to previous pages. | [not-found-component.md](./not-found-component.md) |
| NotFoundError | Represents a not-found error in TanStack Router. | [not-found-error.md](./not-found-error.md) |
| Outlet | Renders the next matched child route of a parent route. | [outlet.md](./outlet.md) |
| ParsedHistoryState | Represents a parsed state object. In addition to `HistoryState`, it contains the index and the unique key of the route. | [parsed-history-state.md](./parsed-history-state.md) |
| ParsedLocation | Represents a parsed location in TanStack Router: pathname, search params, hash, location state, and route masking information. | [parsed-location.md](./parsed-location.md) |
| TanStack Query Integration | Automates SSR dehydration/hydration and streaming between TanStack Router and TanStack Query, removing the need for manual external data-loading configuration. | [query.md](./query.md) |
| redirect | Returns a new `Redirect` object that can be returned or thrown from a route's `beforeLoad` or `loader` to trigger a redirect to a new location. | [redirect.md](./redirect.md) |
| Redirect (type) | Represents a redirect action in TanStack Router. Extends `NavigateOptions`. | [redirect-type.md](./redirect-type.md) |
| Register | A TypeScript interface used to register a route tree with a router instance, unlocking full type safety (including top-level exports from `@tanstack/react-router`). | [register.md](./register.md) |
| retainSearchParams | A search middleware that retains search params across navigations. | [retain-search-params.md](./retain-search-params.md) |
| Route (type) | Describes a route instance. | [route.md](./route.md) |
| RouteApi | An instance providing type-safe versions of common hooks (`useParams`, `useSearch`, `useRouteContext`, `useNavigate`, `useLoaderData`, `useLoaderDeps`) pre-bound to a specific route ID and its registered route types. | [route-api.md](./route-api.md) |
| RouteMask | Extends `ToOptions` with the properties necessary to create a route mask. | [route-mask.md](./route-mask.md) |
| RouteMatch | Represents a single matched route in the router's state. | [route-match.md](./route-match.md) |
| RouteOptions | The type describing options accepted when creating a route (via `createRoute` / `createFileRoute`). | [route-options.md](./route-options.md) |
| Router | The type describing a router instance (returned by `createRouter`) used for navigation and state management. | [router.md](./router.md) |
| RouterEvents (type) | Contains all of the events the router can emit. Each top-level key is an event name; the values are the event payloads. | [router-events.md](./router-events.md) |
| RouterOptions | The type describing all configuration options accepted by `createRouter`. | [router-options.md](./router-options.md) |
| RouterProvider | The root component that mounts a `Router` instance created with `createRouter` and makes routing available throughout the application tree. | [router-provider.md](./router-provider.md) |
| RouterState | The observable state of the router, including the requested and resolved locations, match presentation, and foreground loading status. | [router-state.md](./router-state.md) |
| stripSearchParams | A search middleware that removes search params from the URL. | [strip-search-params.md](./strip-search-params.md) |
| ToMaskOptions | Includes the same destination fields as `ToOptions`, excluding `mask`, and adds options specific to route masking. | [to-mask-options.md](./to-mask-options.md) |
| ToOptions | Properties describing a router destination, including `mask` for route masking. | [to-options.md](./to-options.md) |
| useAwaited | Suspends rendering of a component until an asynchronous promise settles, integrating with React's Suspense mechanism. | [use-awaited.md](./use-awaited.md) |
| useBlocker | Blocks navigation when a condition is met. Currently experimental. | [use-blocker.md](./use-blocker.md) |
| useCanGoBack | Returns a boolean representing whether router history can safely go back without exiting the application. | [use-can-go-back.md](./use-can-go-back.md) |
| useChildMatches | Returns all child `RouteMatch` objects from the closest match down to the leaf-most match, excluding the current match itself. | [use-child-matches.md](./use-child-matches.md) |
| useLinkProps | Accepts link options and returns a `React.AnchorHTMLAttributes<HTMLAnchorElement>` props object suitable for spreading onto an anchor element. | [use-link-props.md](./use-link-props.md) |
| useLoaderData | Returns the loader data from the closest `RouteMatch` in the component tree. | [use-loader-data.md](./use-loader-data.md) |
| useLoaderDeps | Returns an object with the dependencies used to trigger the `loader` for a given route. | [use-loader-deps.md](./use-loader-deps.md) |
| useLocation | Returns the current `location` object. Useful for performing a side effect whenever the current location changes. | [use-location.md](./use-location.md) |
| useMatch | Returns a `RouteMatch` in the component tree. It provides access to the raw route match and powers other hooks like `useParams` and `useLoaderData`. | [use-match.md](./use-match.md) |
| useMatchRoute | Returns a `matchRoute` function used to match a route against either the current or pending location. Subscribes the component to router state changes relevant to matching. | [use-match-route.md](./use-match-route.md) |
| UseMatchRouteOptions | Extends `ToOptions` with additional options available when using the `useMatchRoute` hook. | [use-match-route-options.md](./use-match-route-options.md) |
| useMatches | Retrieves the router's complete presented array of `RouteMatch` objects, regardless of the caller's position in the component tree. The returned array may include still-loading descendants or matches positioned below pending/error/not-found render boundaries. | [use-matches.md](./use-matches.md) |
| useNavigate | Returns a `navigate` function that can be used to navigate to a new location. | [use-navigate.md](./use-navigate.md) |
| useParams | Returns all path parameters parsed for the closest match and all of its parent matches. | [use-params.md](./use-params.md) |
| useParentMatches | Returns all parent `RouteMatch` objects from the root down to (but not including) the immediate parent of the current match. | [use-parent-matches.md](./use-parent-matches.md) |
| useRouteContext | Returns the current context for the current route. | [use-route-context.md](./use-route-context.md) |
| useRouter | Retrieves the current `Router` instance from context. | [use-router.md](./use-router.md) |
| useRouterState | Returns the current internal state of the router. | [use-router-state.md](./use-router-state.md) |
| useSearch | Returns the current search query parameters as an object for the current location. | [use-search.md](./use-search.md) |
| ViewTransitionOptions | Defines a view transition type (see the Chrome documentation on same-document view transition types). | [view-transition-options.md](./view-transition-options.md) |
