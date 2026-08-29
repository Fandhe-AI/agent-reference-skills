---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#cloudflare-workers--official-partner
---

# Cloudflare Workers

Official Hosting Partner. Deploys a TanStack Start app to Cloudflare Workers using `@cloudflare/vite-plugin` and `wrangler`.

## Signature / Usage

```bash
pnpm add -D @cloudflare/vite-plugin wrangler
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    viteReact(),
  ],
})
```

```json
// wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "tanstack-start-app",
  "compatibility_date": "2025-09-02",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry"
}
```

```json
// package.json (scripts)
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build && tsc --noEmit",
    "preview": "vite preview",
    "deploy": "npm run build && wrangler deploy",
    "cf-typegen": "wrangler types"
  }
}
```

## Notes

- Authenticate first with `npx wrangler login` (or `pnpm dlx wrangler login`); check the logged-in user with `wrangler whoami`.
- Remove the plain `"start": "node .output/server/index.mjs"` script when switching to Workers.
- Deploy with `pnpm run deploy`.
- A full example is available at `TanStack/router` `examples/react/start-basic-cloudflare`.

## Related

- [Nitro](./nitro.md)
