# getting-started

| Name | Description | Path |
|------|-------------|------|
| Alibaba Cloud Function Compute | Deploy Hono to Alibaba Cloud Function Compute using the `hono-alibaba-cloud-fc3-adapter` third-party adapter. | [ali-function-compute.md](./ali-function-compute.md) |
| AWS Lambda | Deploy Hono to AWS Lambda (Node.js 18+). Use the `@hono/aws-lambda` adapter and CDK for infrastructure. | [aws-lambda.md](./aws-lambda.md) |
| Azure Functions | Deploy Hono to Azure Functions V4 (Node.js 18+) via the `@marplex/hono-azurefunc-adapter` third-party adapter. | [azure-functions.md](./azure-functions.md) |
| Basic | Core concepts for building Hono applications. The same application code works across all supported runtimes; only the entry point and serve call differ. | [basic.md](./basic.md) |
| Bun | Run Hono natively on Bun. No adapter is required; export the app with an optional `port` field. | [bun.md](./bun.md) |
| Tencent CloudBase | Deploy Hono to Tencent CloudBase HTTP Cloud Functions, which run a plain Node.js process listening on port `9000` and started through `scf_bootstrap`. `@hono/node-server` works as-is; no extra Hono adapter is required. | [cloudbase.md](./cloudbase.md) |
| Cloudflare Pages | Deploy Hono to Cloudflare Pages with Vite and JSX support. Supports bindings (KV, R2, etc.) via `wrangler.toml`. | [cloudflare-pages.md](./cloudflare-pages.md) |
| Cloudflare Workers + Vite | Build full-stack Hono applications on Cloudflare Workers using Vite for both server-side rendering (via Hono's JSX renderer) and client-side bundling. | [cloudflare-workers-vite.md](./cloudflare-workers-vite.md) |
| Cloudflare Workers | Deploy Hono to Cloudflare Workers. The app is the default export; the Worker runtime calls `app.fetch` automatically. | [cloudflare-workers.md](./cloudflare-workers.md) |
| Deno | Run Hono on Deno or deploy to Deno Deploy. Uses `Deno.serve()` as the entry point. | [deno.md](./deno.md) |
| Fastly Compute | Deploy Hono to Fastly Compute using `@fastly/hono-fastly-compute`. | [fastly.md](./fastly.md) |
| Google Cloud Run | Deploy a Hono app as a containerized service on Google Cloud Run. Any runtime (Node.js, Bun, Deno) is supported via Dockerfile. | [google-cloud-run.md](./google-cloud-run.md) |
| Lambda@Edge | Deploy Hono to AWS Lambda@Edge (Node.js 18+). Functions run at CloudFront edge locations. | [lambda-edge.md](./lambda-edge.md) |
| Netlify | Deploy Hono to Netlify Edge Functions. Edge Functions run on Deno and are written in TypeScript. | [netlify.md](./netlify.md) |
| Next.js | Embed Hono inside a Next.js application using catch-all routes. Supports both App Router and Pages Router. | [nextjs.md](./nextjs.md) |
| Node.js | Run Hono on Node.js using `@hono/node-server`. Requires Node.js 18.14.1+, 19.7.0+, or 20.0.0+. | [nodejs.md](./nodejs.md) |
| Service Worker | Run Hono inside a browser Service Worker using the `@hono/service-worker` adapter. | [service-worker.md](./service-worker.md) |
| Supabase Functions | Deploy Hono to Supabase Edge Functions, which run on Deno. | [supabase-functions.md](./supabase-functions.md) |
| Vercel | Deploy Hono to Vercel with zero configuration. Export the Hono application as a default export; no adapter import is needed. | [vercel.md](./vercel.md) |
| WebAssembly (w/ WASI) | Run Hono inside a WASI-enabled WebAssembly component using StarlingMonkey and the Bytecode Alliance `jco` toolchain. | [webassembly-wasi.md](./webassembly-wasi.md) |
