# samples

React Router (`react-router`) とは別ライブラリの実例。

| Name | Description | Path |
| --- | --- | --- |
| Auth Guard with `beforeLoad` and `redirect` | Guard a route subtree by throwing `redirect()` from `beforeLoad`, capturing the original location for post-login redirection. | [auth-guard.md](./auth-guard.md) |
| Basic File-Based Routing | Scaffold a file-based route tree and wire the generated `routeTree.gen.ts` into a `RouterProvider`. | [basic-file-routing.md](./basic-file-routing.md) |
| Basic SSR | Share a `createRouter` factory between server and client entries, render on the server with `createRequestHandler`, then hydrate on the client. | [basic-ssr.md](./basic-ssr.md) |
| Code-Based Routing | Hand-write `createRoute` calls and compose the route tree with `addChildren()` instead of using file-based routing. | [code-based-routing.md](./code-based-routing.md) |
| Code Splitting with `createLazyFileRoute` | Split a route's critical config (path, loader, `beforeLoad`) from its non-critical component into a separate `.lazy.tsx` file. | [code-splitting.md](./code-splitting.md) |
| Data Loading with `loader` | Preload data in a route's `loader` before the component renders, then read it with `useLoaderData()`. | [data-loading.md](./data-loading.md) |
| Deferred Data Loading with `Await` | Return fast data awaited and slow data as an unresolved promise from `loader`, then stream the slow part in with `Await`. | [deferred-data.md](./deferred-data.md) |
| Navigation Blocking with `useBlocker` | Prevent navigation away from a dirty form until the user confirms, using `useBlocker`. | [navigation-blocking.md](./navigation-blocking.md) |
| Path Params | Capture a URL segment with the `$name` prefix and read it via `Route.useParams()` inside the owning route. | [path-params.md](./path-params.md) |
| TanStack Query Integration | Use the router's `loader` to call `queryClient.query` (with `staleTime: 'static'`) and the component to read it via `useSuspenseQuery`, so TanStack Query owns caching while the router owns preloading. | [query-integration.md](./query-integration.md) |
| Typed Router Context | Inject dependencies (auth state, a query client, breadcrumb data) through `createRootRouteWithContext` and `createRouter({ context })`. | [router-context.md](./router-context.md) |
| Search Params Validation with Zod | Validate and type URL search params with `validateSearch`, then read them with `Route.useSearch()`. | [search-params-validation.md](./search-params-validation.md) |
