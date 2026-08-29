# samples

React Router (`react-router`) とは別ライブラリの実例。

| Name | Description | Path |
| --- | --- | --- |
| Basic File-Based Routing | Scaffold a file-based route tree and wire the generated `routeTree.gen.ts` into a `RouterProvider` | [basic-file-routing.md](./basic-file-routing.md) |
| Code-Based Routing | Hand-write `createRoute` calls and compose the route tree with `addChildren()` | [code-based-routing.md](./code-based-routing.md) |
| Search Params Validation with Zod | Validate and type URL search params with `validateSearch`, then read them with `Route.useSearch()` | [search-params-validation.md](./search-params-validation.md) |
| Path Params | Capture a URL segment with the `$name` prefix and read it via `Route.useParams()` | [path-params.md](./path-params.md) |
| Data Loading with `loader` | Preload data in a route's `loader` before the component renders, then read it with `useLoaderData()` | [data-loading.md](./data-loading.md) |
| Deferred Data Loading with `Await` | Return fast data awaited and slow data as an unresolved promise, then stream it in with `Await` | [deferred-data.md](./deferred-data.md) |
| Auth Guard with `beforeLoad` and `redirect` | Guard a route subtree by throwing `redirect()` from `beforeLoad` | [auth-guard.md](./auth-guard.md) |
| Navigation Blocking with `useBlocker` | Prevent navigation away from a dirty form until the user confirms | [navigation-blocking.md](./navigation-blocking.md) |
| TanStack Query Integration | Use the router's `loader` to `ensureQueryData` and the component to read it via `useSuspenseQuery` | [query-integration.md](./query-integration.md) |
| Code Splitting with `createLazyFileRoute` | Split a route's critical config from its non-critical component into a `.lazy.tsx` file | [code-splitting.md](./code-splitting.md) |
| Basic SSR | Share a `createRouter` factory between server and client entries, render with `createRequestHandler`, then hydrate | [basic-ssr.md](./basic-ssr.md) |
| Typed Router Context | Inject dependencies through `createRootRouteWithContext` and `createRouter({ context })` | [router-context.md](./router-context.md) |
