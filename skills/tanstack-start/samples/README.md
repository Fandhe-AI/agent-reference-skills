# samples

| Name | Description | Path |
| --- | --- | --- |
| API Route (server.handlers on createFileRoute) | File route exposing a raw HTTP endpoint (GET/POST). | [api-route.md](./api-route.md) |
| Auth Middleware (createMiddleware + session cookie) | Session cookie helpers and a createMiddleware loading session into context. | [auth-middleware.md](./auth-middleware.md) |
| Basic App (router + root route + file route) | Minimal app: router, root route, and a server-backed index route. | [basic-app.md](./basic-app.md) |
| Deploy to Cloudflare Workers | Deploy with @cloudflare/vite-plugin and wrangler. | [deploy-cloudflare.md](./deploy-cloudflare.md) |
| Deploy to Vercel (via Nitro) | Deploy to Vercel by adding the nitro/vite plugin. | [deploy-vercel-nitro.md](./deploy-vercel-nitro.md) |
| Environment Functions (createServerOnlyFn / createIsomorphicFn) | Restrict a function to one environment, or give it per-environment implementations. | [environment-functions.md](./environment-functions.md) |
| Selective SSR (per-route ssr option) | Disable loader execution and SSR for one route using browser-only APIs. | [selective-ssr.md](./selective-ssr.md) |
| Server Function CRUD (createServerFn + .validator + .handler) | Read (GET) and write (POST) server functions with input validation. | [server-function-crud.md](./server-function-crud.md) |
| SPA Mode | Static HTML shell (root route only) that bootstraps the app on the client. | [spa-mode.md](./spa-mode.md) |
| SSR Data Loading (route loader + server function) | Fetch server data during SSR via a route loader calling createServerFn. | [ssr-data-loading.md](./ssr-data-loading.md) |
| Static Prerendering | Generate static HTML files at build time for selected pages or routes. | [static-prerendering.md](./static-prerendering.md) |
| Streaming Data from a Server Function | Stream typed chunks from a server function using an async generator. | [streaming.md](./streaming.md) |
| Tailwind CSS Setup (v4, Vite) | Install and wire up Tailwind CSS v4 in a TanStack Start project. | [tailwind-setup.md](./tailwind-setup.md) |
| TanStack Query SSR (request-isolated QueryClient) | Per-router QueryClient via setupRouterSsrQueryIntegration. | [tanstack-query-ssr.md](./tanstack-query-ssr.md) |
