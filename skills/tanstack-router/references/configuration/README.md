# configuration

| Name | Description | Path |
| --- | --- | --- |
| createRouter | Instantiate the router core; full `RouterOptions` table (preload, cache, basepath, trailingSlash, notFoundMode, etc.) | [creating-a-router.md](./creating-a-router.md) |
| Outlet | Placeholder rendering the next matching child route | [outlets.md](./outlets.md) |
| Router Events | `router.subscribe` lifecycle events (onBeforeNavigate, onResolved, onRendered, ...) | [router-events.md](./router-events.md) |
| Type Safety | Declaration merging, `getParentRoute`, TypeScript performance tips for large route trees | [type-safety.md](./type-safety.md) |
| Type Utilities | `ValidateLinkOptions`, `ValidateLinkOptionsArray`, `ValidateFromPath`, `ValidateRedirectOptions`, `ValidateNavigateOptions` | [type-utilities.md](./type-utilities.md) |
| Router Context | Dependency-injection context passed through the route tree, `createRootRouteWithContext`, `router.invalidate` | [router-context.md](./router-context.md) |
| Not Found Errors | `notFoundMode`, `notFoundComponent`, `notFound()` utility | [not-found-errors.md](./not-found-errors.md) |
| Authenticated Routes | `beforeLoad` guard pattern, `redirect()`, `isRedirect()` | [authenticated-routes.md](./authenticated-routes.md) |
| Static Route Data | `staticData` route option vs. `context` | [static-route-data.md](./static-route-data.md) |
