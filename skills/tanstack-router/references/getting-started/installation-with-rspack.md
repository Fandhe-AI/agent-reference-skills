---
source: https://tanstack.com/router/latest/docs/framework/react/installation/with-rspack
---

# Installation with Rspack

File-based routing setup for Rspack/Rsbuild via the `@tanstack/router-plugin` package.

## Signature / Usage

```ts
// rsbuild.config.ts (React)
import { tanstackRouter } from '@tanstack/router-plugin/rspack'

export default {
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    // ...react plugin
  ],
}
```

Solid projects follow the same pattern but add Babel and Solid-specific plugins instead of the React plugin.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| routesDirectory | string | `./src/routes` | Directory containing route files |
| generatedRouteTree | string | `./src/routeTree.gen.ts` | Output path for the generated route tree |
| routeFileIgnorePrefix | string | `-` | Prefix used to exclude files from route generation |
| quoteStyle | string | `single` | Quote style used in generated code |

## Notes

- If using VSCode, the route tree file may unexpectedly open (with errors) after renaming a route — mark it read-only and exclude it from watcher/search in `.vscode/settings.json`
- Ignore the generated route tree file in linters/formatters (`.prettierignore`, ESLint ignore files, Biome config)

## Related

- [Vite Installation](./installation-with-vite.md)
- [Webpack Installation](./installation-with-webpack.md)
