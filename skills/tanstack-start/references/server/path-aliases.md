---
source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases
---

# Path Aliases

TanStack Start resolves TypeScript `paths` aliases (e.g. `~/*` → `./src/*`) at build time via Vite's built-in `tsconfigPaths` support (Vite 8) or Rsbuild's `source.tsconfigPath`.

## Signature / Usage

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

### Vite 8

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    // This enables built-in support for path aliases defined in tsconfig.json
    tsconfigPaths: true,
  },
})
```

### Rsbuild

```ts
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    tsconfigPath: './tsconfig.custom.json',
  },
})
```

### Usage

```ts
// app/routes/posts/$postId/edit.tsx
import { Input } from '~/components/ui/input'

// instead of

import { Input } from '../../../components/ui/input'
```

## Notes

- Vite 8 has built-in `tsconfigPaths` support (`resolve.tsconfigPaths: true`).
- `vite-tsconfig-paths` guidance (Vite 7 and earlier) was removed from the docs in 1.169: Start requires Vite 8 when building with Vite.
- Rsbuild reads `paths` from the `tsconfigPath` config (defaults to `./tsconfig.json`).

## Related

- [Environment Variables](./environment-variables.md)
