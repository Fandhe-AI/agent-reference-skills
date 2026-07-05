# File-system conventions

| Name | Description | Path |
|------|-------------|------|
| default.js | Fallback UI for unmatched Parallel Routes slots | [default.md](./default.md) |
| Dynamic Segments | `[folderName]` route params, catch-all, optional catch-all | [dynamic-routes.md](./dynamic-routes.md) |
| error.js | Route segment error boundary UI | [error.md](./error.md) |
| forbidden.js (experimental) | 403 UI rendered by the `forbidden()` function | [forbidden.md](./forbidden.md) |
| instrumentation.js | Server observability hooks (`register`, `onRequestError`) | [instrumentation.md](./instrumentation.md) |
| instrumentation-client.js | Client-side observability/analytics hooks | [instrumentation-client.md](./instrumentation-client.md) |
| Intercepting Routes | `(.)`/`(..)`/`(...)` conventions for masked-URL navigation | [intercepting-routes.md](./intercepting-routes.md) |
| layout.js | Shared UI wrapping a route segment; root layout | [layout.md](./layout.md) |
| loading.js | Suspense-based loading UI for a route segment | [loading.md](./loading.md) |
| mdx-components.js | Required MDX component mapping for App Router | [mdx-components.md](./mdx-components.md) |
| not-found.js | UI for `notFound()`; `global-not-found.js` for app-wide 404 | [not-found.md](./not-found.md) |
| page.js | Route-unique UI; leaf of the route subtree | [page.md](./page.md) |
| Parallel Routes | `@slot` convention for simultaneous rendering | [parallel-routes.md](./parallel-routes.md) |
| proxy.js | Server-side request interception (formerly `middleware.js`) | [proxy.md](./proxy.md) |
| public | Static asset serving from `/public` | [public-folder.md](./public-folder.md) |
| route.js | Custom Route Handlers (`GET`/`POST`/etc) | [route.md](./route.md) |
| Route Groups | `(folderName)` organizational convention | [route-groups.md](./route-groups.md) |
| src folder | Move `app`/`pages` under `src/` | [src-folder.md](./src-folder.md) |
| template.js | Layout-like wrapper that remounts on navigation | [template.md](./template.md) |
| unauthorized.js (experimental) | 401 UI rendered by the `unauthorized()` function | [unauthorized.md](./unauthorized.md) |
| Metadata Files (overview) | Static/dynamic metadata file conventions | [metadata.md](./metadata.md) / [metadata/README.md](./metadata/README.md) |
| Route Segment Config (overview) | `dynamicParams`, `runtime`, `preferredRegion`, `maxDuration` | [route-segment-config.md](./route-segment-config.md) / [route-segment-config/README.md](./route-segment-config/README.md) |
