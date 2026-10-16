# Deployment

Vercel プラットフォーム自体の API / CLI は `vercel` スキルを参照。

| Name | Description | Path |
|------|-------------|------|
| Appwrite Sites | GitHub-connected deployment of a TanStack Start app to Appwrite Sites, with automatic build configuration. | [appwrite-sites.md](./appwrite-sites.md) |
| Bun | Deploying a TanStack Start app to Bun, either via the Nitro `bun` preset or a custom Bun-native server. | [bun.md](./bun.md) |
| Cloudflare Workers | Official Hosting Partner. Deploys a TanStack Start app to Cloudflare Workers using `@cloudflare/vite-plugin` and `wrangler`. | [cloudflare-workers.md](./cloudflare-workers.md) |
| Hosting | Overview of deploying a TanStack Start application. | [hosting.md](./hosting.md) |
| Netlify | Official Hosting Partner. Uses `@netlify/vite-plugin-tanstack-start` to configure the build and provide Netlify production platform emulation in local dev. | [netlify.md](./netlify.md) |
| Nitro | Nitro is an agnostic build/deploy layer that lets a TanStack Start app target a wide range of hosting providers. | [nitro.md](./nitro.md) |
| Node.js / Docker | Running a built TanStack Start app on a plain Node.js server or in a Docker container. The shape depends on Vite or Rsbuild. | [node-docker.md](./node-docker.md) |
| Observability | Monitoring, tracing, and debugging patterns for a TanStack Start app: built-in logging/middleware patterns plus integration points for external tools. | [observability.md](./observability.md) |
| Production Checklist | Checks to run against the production build and the public hostname; a passing dev server does not verify the adapter, runtime environment, or CDN. | [production-checklist.md](./production-checklist.md) |
| Railway | Official Hosting Partner. Instant, zero-configuration deployments by following the Nitro instructions, then connecting the repository on railway.com. | [railway.md](./railway.md) |
| Vercel | Deploy a TanStack Start app to Vercel by following the Nitro instructions, then using Vercel's one-click deployment. | [vercel.md](./vercel.md) |
