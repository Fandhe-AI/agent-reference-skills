---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#netlify--official-partner
---

# Netlify

Official Hosting Partner. Uses `@netlify/vite-plugin-tanstack-start` to configure the build and to provide full Netlify production platform emulation in local dev.

## Signature / Usage

```bash
pnpm add --save-dev @netlify/vite-plugin-tanstack-start
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), netlify(), viteReact()],
})
```

```bash
npx netlify deploy
```

## Options / Props

### Manual configuration (`netlify.toml`)

```toml
[build]
  command = "vite build"
  publish = "dist/client"
[dev]
  command = "vite dev"
  port = 3000
```

## Notes

- New projects are auto-configured by the Netlify CLI on first `netlify deploy`; `netlify.toml` is an alternative manual setup.
- Also supports continuous deployment from a git repo (GitHub/GitLab/etc.), template-based deploys, and AI code-generation tool imports.

## Related

- [Cloudflare Workers](./cloudflare-workers.md)
