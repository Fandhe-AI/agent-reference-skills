---
source: https://tanstack.com/router/latest/docs/framework/react/installation/with-vite
---

# Installation with Vite

File-based routing setup for Vite via the `@tanstack/router-plugin` package.

## Signature / Usage

```ts
// vite.config.ts (React)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
})
```

```ts
// vite.config.ts (Solid)
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'solid', autoCodeSplitting: true }),
    solid(),
  ],
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| routesDirectory | string | `./src/routes` | Directory containing route files |
| generatedRouteTree | string | `./src/routeTree.gen.ts` | Output path for the generated route tree |
| routeFileIgnorePrefix | string | `-` | Prefix used to exclude files from route generation |
| quoteStyle | string | `single` | Quote style used in generated code |

## Notes

- `@tanstack/router-plugin` must be listed **before** `@vitejs/plugin-react` in the `plugins` array
- Quickstart Vite example: https://github.com/TanStack/router/tree/main/examples/react/quickstart-file-based
- Ignore the generated `routeTree.gen.ts` in linters/formatters (Prettier/ESLint/Biome ignore files); mark it read-only and exclude it from search/watcher in `.vscode/settings.json`

## Related

- [Manual Setup](./installation-manual.md)
- [Rspack/Rsbuild Installation](./installation-with-rspack.md)
