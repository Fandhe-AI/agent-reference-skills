---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#cloudflare-workers--official-partner
---

# Deploy to Cloudflare Workers

Configure `@cloudflare/vite-plugin` + `wrangler` and deploy a TanStack Start app to Cloudflare Workers.

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

```bash
npx wrangler login
npm run build
wrangler deploy
```

## Notes

- Cloudflare Workers is an official TanStack Start hosting partner, deployed independently of the generic Nitro path (unlike Vercel/Railway/Node/Bun).
- Remove the plain `"start": "node .output/server/index.mjs"` script when switching to Workers.
- `wrangler whoami` confirms the authenticated account before `wrangler deploy`.
