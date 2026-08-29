# samples

Next.js (`nextjs-app`) とは別フレームワークの実例。

| Name | Description | Path |
| --- | --- | --- |
| Basic App (router + root route + file route) | Minimal TanStack Start app: `src/router.tsx`, `src/routes/__root.tsx`, and a server-backed index route | [basic-app.md](./basic-app.md) |
| Server Function CRUD (createServerFn + .validator + .handler) | Read (`GET`) and write (`POST`) server functions with input validation, called from a route loader and a component | [server-function-crud.md](./server-function-crud.md) |
| API Route (server.handlers on createFileRoute) | A file route exposing a raw HTTP endpoint (GET/POST) instead of, or alongside, a UI `component` | [api-route.md](./api-route.md) |
| Auth Middleware (createMiddleware + session) | Session-backed login server function, a middleware that loads the session into `context`, and route-level protection with `beforeLoad` | [auth-middleware.md](./auth-middleware.md) |
| SSR Data Loading (route loader + server function) | Fetch server data during SSR via a route `loader` calling a `createServerFn`, then read it in the component with `useLoaderData()` | [ssr-data-loading.md](./ssr-data-loading.md) |
| Streaming Data from a Server Function | Stream typed chunks from a server function to the client using an async generator, consumed with `for await...of` | [streaming.md](./streaming.md) |
| SPA Mode | Ship a static HTML shell (root route only) that bootstraps the app fully on the client, for static-host deployment without SSR | [spa-mode.md](./spa-mode.md) |
| Selective SSR (per-route ssr option) | Disable server-side loader execution and server rendering for a single route that depends on browser-only APIs | [selective-ssr.md](./selective-ssr.md) |
| Static Prerendering | Generate static HTML files at build time for specific pages or the whole crawlable route tree | [static-prerendering.md](./static-prerendering.md) |
| Deploy to Cloudflare Workers | Configure `@cloudflare/vite-plugin` + `wrangler` and deploy a TanStack Start app to Cloudflare Workers | [deploy-cloudflare.md](./deploy-cloudflare.md) |
| Deploy to Vercel (via Nitro) | Deploy a TanStack Start app to Vercel by adding the `nitro/vite` plugin, then using Vercel's standard one-click deployment | [deploy-vercel-nitro.md](./deploy-vercel-nitro.md) |
| Tailwind CSS Setup (v4, Vite) | Install and wire up Tailwind CSS v4 in a TanStack Start project using the Vite plugin | [tailwind-setup.md](./tailwind-setup.md) |
| Environment Functions (createServerOnlyFn / createIsomorphicFn) | Restrict a function to one execution environment, or give it a different implementation per environment, without creating an RPC boundary | [environment-functions.md](./environment-functions.md) |
