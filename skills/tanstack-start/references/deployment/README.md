# Deployment

Vercel プラットフォーム自体の API / CLI は `vercel` スキルを参照。

| Name | Description | Path |
|------|-------------|------|
| Cloudflare Workers | Deploy via `@cloudflare/vite-plugin` and `wrangler` | [cloudflare-workers.md](./cloudflare-workers.md) |
| Netlify | Deploy via `@netlify/vite-plugin-tanstack-start` or `netlify.toml` | [netlify.md](./netlify.md) |
| Railway | Zero-config deploy following the Nitro instructions | [railway.md](./railway.md) |
| Nitro | Agnostic build/deploy layer underlying Vercel/Railway/Node.js/Bun | [nitro.md](./nitro.md) |
| Vercel | One-click deploy following the Nitro instructions | [vercel.md](./vercel.md) |
| Node.js / Docker | Run the built app on plain Node.js (Vite or Rsbuild output) | [node-docker.md](./node-docker.md) |
| Bun | Deploy via the Nitro `bun` preset or a custom Bun server | [bun.md](./bun.md) |
| Appwrite Sites | GitHub-connected deploy with automatic build config | [appwrite-sites.md](./appwrite-sites.md) |
| Observability | Logging/middleware patterns, Sentry, New Relic, OpenTelemetry | [observability.md](./observability.md) |
