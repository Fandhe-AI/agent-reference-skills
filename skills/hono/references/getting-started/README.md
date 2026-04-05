# Getting Started

| Name | Description | Path |
|------|-------------|------|
| Basic | Core app structure; works across all runtimes | [./basic.md](./basic.md) |
| Node.js | `@hono/node-server` adapter; Node.js 18+ | [./nodejs.md](./nodejs.md) |
| Bun | Native Bun support; export app with optional `port` | [./bun.md](./bun.md) |
| Deno | `Deno.serve()` entry point; Deno Deploy compatible | [./deno.md](./deno.md) |
| Cloudflare Workers | Default export; `c.env` for bindings | [./cloudflare-workers.md](./cloudflare-workers.md) |
| Cloudflare Pages | Vite + JSX; `handleMiddleware` for Pages Functions | [./cloudflare-pages.md](./cloudflare-pages.md) |
| Vercel | Zero-config deployment; `hono/vercel` adapter | [./vercel.md](./vercel.md) |
| Netlify | Edge Functions on Deno; JSR import | [./netlify.md](./netlify.md) |
| AWS Lambda | `handle` / `streamHandle` from `hono/aws-lambda` | [./aws-lambda.md](./aws-lambda.md) |
| Lambda@Edge | `hono/lambda-edge`; runs at CloudFront edge | [./lambda-edge.md](./lambda-edge.md) |
| Fastly Compute | `fire()` / `buildFire()` from `@fastly/hono-fastly-compute` | [./fastly.md](./fastly.md) |
| Azure Functions | V4 + third-party `@marplex/hono-azurefunc-adapter` | [./azure-functions.md](./azure-functions.md) |
| Google Cloud Run | Container-based; port must be `8080` | [./google-cloud-run.md](./google-cloud-run.md) |
| Next.js | Catch-all routes; App Router and Pages Router | [./nextjs.md](./nextjs.md) |
| Supabase Functions | Deno-based Edge Functions; JSR import + `basePath` | [./supabase-functions.md](./supabase-functions.md) |
| Service Worker | Browser Service Worker; `hono/service-worker` adapter | [./service-worker.md](./service-worker.md) |
