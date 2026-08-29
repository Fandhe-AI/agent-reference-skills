---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro
---

# Nitro

Nitro is an agnostic build/deploy layer that lets a TanStack Start app target a wide range of hosting providers. It integrates natively with Vite's Environments API and is the underlying mechanism that Vercel, Railway, Node.js, and Bun deployments build on.

## Signature / Usage

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

- The `nitro/vite` plugin is under active development; report issues with a reproduction.
- Set `nitro({ preset: 'bun' })` when targeting Bun (see [Bun](./bun.md)).
- Performance tip for Node.js/Nitro deployments (uses `srvx` under the hood): install `srvx` and set `globalThis.Response = FastResponse` in the server entry (`src/server.ts`) for a ~5% throughput improvement via an optimized `_toNodeResponse()` path.

```ts
import { FastResponse } from 'srvx'
globalThis.Response = FastResponse
```

## Related

- [Vercel](./vercel.md)
- [Railway](./railway.md)
- [Node.js / Docker](./node-docker.md)
- [Bun](./bun.md)
