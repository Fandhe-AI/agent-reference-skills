---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting
---

# Hosting

Overview of deploying a TanStack Start application. Start supports Vite and Rsbuild and is designed to work with any hosting provider; Cloudflare, Netlify, and Railway are the Official Hosting Partners.

## Signature / Usage

```tsx
// vite.config.ts (Nitro-based targets: Railway / Vercel / Node.js / Bun)
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), nitro(), viteReact()],
})
```

## Deployment targets

| Target | Guidance | Page |
| --- | --- | --- |
| `cloudflare-workers` (Official Partner) | Vite with `@cloudflare/vite-plugin` and `wrangler` | [cloudflare-workers.md](./cloudflare-workers.md) |
| `netlify` (Official Partner) | Vite with `@netlify/vite-plugin-tanstack-start` | [netlify.md](./netlify.md) |
| `railway` (Official Partner) | Follow the Nitro instructions, then connect the repository | [railway.md](./railway.md) |
| `nitro` | Agnostic layer for a wide range of hosts via `nitro/vite` | [nitro.md](./nitro.md) |
| `vercel` | Follow the Nitro instructions | [vercel.md](./vercel.md) |
| `node-server` | Node.js / Docker (Vite via Nitro; Rsbuild via a fetch-style server entry) | [node-docker.md](./node-docker.md) |
| `bun` | Nitro `bun` preset or a custom Bun server (React 19 only) | [bun.md](./bun.md) |
| `appwrite-sites` | Connect a GitHub repository in Appwrite Sites | [appwrite-sites.md](./appwrite-sites.md) |

## Notes

- Official Hosting Partners recommended by the docs: Cloudflare, Netlify, Railway.
- The `nitro/vite` plugin integrates natively with the Vite Environments API; the docs warn it is under active development and ask for issue reports with a reproduction.
- Rsbuild production builds emit client assets in `dist/client` and a server bundle in `dist/server/index.js` exporting a fetch-style entry (`{ fetch(request: Request): Response | Promise<Response> }`). The official Cloudflare Workers and Netlify setups currently use Vite.
- The docs list "... and more to come" for additional targets.

## Related

- [Production Checklist](./production-checklist.md)
- [Nitro](./nitro.md)
- [Observability](./observability.md)
