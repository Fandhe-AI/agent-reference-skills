---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hosting#bun
---

# Bun

Deploying a TanStack Start app to Bun, either via the Nitro `bun` preset or a custom Bun-native server.

## Signature / Usage

```sh
bun install react@19 react-dom@19
```

```ts
// vite.config.ts
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tanstackStart(), nitro({ preset: 'bun' }), viteReact()],
})
```

```sh
bun run build
bun run server.ts
```

## Options / Props

Environment variables for the reference `server.ts` implementation (`examples/react/start-bun/server.ts`):

| Name | Description | Default |
|------|-------------|---------|
| `PORT` | Server port | `3000` |
| `ASSET_PRELOAD_MAX_SIZE` | Max file size to preload into memory (bytes) | `5242880` (5MB) |
| `ASSET_PRELOAD_INCLUDE_PATTERNS` | Comma-separated glob patterns to include | All files |
| `ASSET_PRELOAD_EXCLUDE_PATTERNS` | Comma-separated glob patterns to exclude | None |
| `ASSET_PRELOAD_VERBOSE_LOGGING` | Enable detailed logging | `false` |
| `ASSET_PRELOAD_ENABLE_ETAG` | Enable ETag generation | `true` |
| `ASSET_PRELOAD_ENABLE_GZIP` | Enable Gzip compression | `true` |
| `ASSET_PRELOAD_GZIP_MIN_SIZE` | Minimum file size for Gzip (bytes) | `1024` (1KB) |
| `ASSET_PRELOAD_GZIP_MIME_TYPES` | MIME types eligible for Gzip | `text/,application/javascript,application/json,application/xml,image/svg+xml` |

## Notes

- Bun-specific deployment currently requires React 19+; React 18 users should follow [Node.js / Docker](./node-docker.md) instead.
- For Vite builds, follow the [Nitro](./nitro.md) instructions with the `'bun'` preset.
- The custom Bun server (`server.ts`, copied from `examples/react/start-bun/server.ts`) is a reference starting point demonstrating static asset serving, hybrid preload/on-demand loading, optional ETag/Gzip, and production caching headers — not a required API.

## Related

- [Nitro](./nitro.md)
- [Node.js / Docker](./node-docker.md)
