---
source: https://tanstack.com/start/latest/docs/framework/react/guide/path-aliases
---

# Path Aliases

TanStack Start resolves TypeScript `paths` aliases (e.g. `~/*` → `./src/*`) at build time via Vite's built-in `tsconfigPaths` support (Vite 8+) or the `vite-tsconfig-paths` plugin (Vite 7 and earlier), or Rsbuild's `source.tsconfigPath`.

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

### Vite 7 and earlier

```sh
npm install -D vite-tsconfig-paths
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
  ],
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

- Vite 8 has built-in `tsconfigPaths` support (`resolve.tsconfigPaths: true`); earlier Vite versions need the `vite-tsconfig-paths` plugin.
- Rsbuild reads `paths` from the `tsconfigPath` config (defaults to `./tsconfig.json`).

## Related

- [Environment Variables](./environment-variables.md)
