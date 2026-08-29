---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#vercel
---

# Vercel

Deploy a TanStack Start app to Vercel by following the [Nitro](./nitro.md) deployment instructions, then use Vercel's one-click deployment process.

## Signature / Usage

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

- The official doc gives no Vercel-specific config beyond "follow the Nitro instructions" — the snippet above is the Nitro setup that Vercel deployments rely on.
- This page covers deploying a TanStack Start app to Vercel only. The Vercel platform's own API/CLI (`vercel deploy`, project settings, etc.) is out of scope here.

## Related

- [Nitro](./nitro.md)
