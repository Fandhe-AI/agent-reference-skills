---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#vercel
---

# Deploy to Vercel (via Nitro)

Deploy a TanStack Start app to Vercel by adding the `nitro/vite` plugin, then using Vercel's standard one-click deployment.

```bash
npm install nitro
```

```tsx
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), nitro(), viteReact()],
})
```

## Notes

- Vercel has no Vercel-specific TanStack Start config beyond the Nitro setup above — deployment itself uses Vercel's normal Git-import / CLI flow, not a TanStack-specific step.
- Nitro is the shared build/deploy layer underlying Vercel, Railway, plain Node.js, and Bun deployments; the `nitro()` plugin must be registered alongside `tanstackStart()`.
- `nitro/vite` is under active development — pin versions and report reproductions for regressions.
