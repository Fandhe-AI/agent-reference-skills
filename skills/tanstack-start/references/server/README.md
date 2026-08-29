# Server

`createServerFn` / `createServerFileRoute` (server routes) は TanStack Start 独自の RPC / HTTP ハンドラ API であり、Next.js の Server Actions / Route Handlers (`nextjs-app`) や `hono` のルーターとは別 API。

| Name | Description | Path |
|------|-------------|------|
| Routing | File-based routing: router factory, root route, file routes | [routing.md](./routing.md) |
| Execution Model | Isomorphic-by-default execution boundary and control APIs | [execution-model.md](./execution-model.md) |
| Code Execution Patterns | Quick-start checklist for environment-control APIs | [code-execution-patterns.md](./code-execution-patterns.md) |
| Import Protection | Build-time deny rules for server/client-only imports | [import-protection.md](./import-protection.md) |
| Path Aliases | `tsconfig.json` `paths` resolution in Vite/Rsbuild | [path-aliases.md](./path-aliases.md) |
| Environment Variables | `process.env` vs `import.meta.env` (`VITE_`/`PUBLIC_`) | [environment-variables.md](./environment-variables.md) |
| Server Functions | `createServerFn()` RPC — validator, middleware, handler | [server-functions.md](./server-functions.md) |
| Streaming Data from Server Functions | `ReadableStream` / async-generator handlers | [streaming-data-from-server-functions.md](./streaming-data-from-server-functions.md) |
| Server Components | RSC support — `renderServerComponent`, `createCompositeComponent` | [server-components.md](./server-components.md) |
| Static Server Functions | Build-time-only server functions via `staticFunctionMiddleware` | [static-server-functions.md](./static-server-functions.md) |
| Environment Functions | `createIsomorphicFn` / `createServerOnlyFn` / `createClientOnlyFn` | [environment-functions.md](./environment-functions.md) |
| Middleware | `createMiddleware()` — request and server-function middleware | [middleware.md](./middleware.md) |
| Error Boundaries | Router `defaultErrorComponent` and per-route `errorComponent` | [error-boundaries.md](./error-boundaries.md) |
| Server Routes | File-route `server.handlers` — raw HTTP endpoints | [server-routes.md](./server-routes.md) |
