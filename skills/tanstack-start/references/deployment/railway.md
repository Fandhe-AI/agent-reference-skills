---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#railway--official-partner
---

# Railway

Official Hosting Partner. Provides instant, zero-configuration deployments by following the [Nitro](./nitro.md) deployment instructions, then connecting the repository on railway.com.

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

- Steps: push code to a GitHub repository, connect the repository on railway.com, Railway auto-detects build settings and deploys.
- Automatically provides: automatic deployments on every push, built-in databases (Postgres, MySQL, Redis, MongoDB), preview environments for pull requests, automatic HTTPS and custom domains.

## Related

- [Nitro](./nitro.md)
