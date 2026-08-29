---
source: https://tanstack.com/router/latest/docs/framework/react/installation/with-webpack
---

# Installation with Webpack

File-based routing setup for Webpack via the `@tanstack/router-plugin` package.

## Signature / Usage

```ts
// webpack.config.ts (React)
import { tanstackRouter } from '@tanstack/router-plugin/webpack'

export default {
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
  ],
}
```

```ts
// webpack.config.ts (Solid)
import { tanstackRouter } from '@tanstack/router-plugin/webpack'

export default {
  plugins: [
    tanstackRouter({ target: 'solid', autoCodeSplitting: true }),
  ],
}
```

```json
// .babelrc (Solid only — SWC doesn't support solid-js)
{
  "presets": ["babel-preset-solid", "@babel/preset-typescript"]
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| routesDirectory | string | `./src/routes` | Directory containing route files |
| generatedRouteTree | string | `./src/routeTree.gen.ts` | Output path for the generated route tree |
| routeFileIgnorePrefix | string | `-` | Prefix used to exclude files from route generation |
| quoteStyle | string | `single` | Quote style used in generated code |

## Notes

- Quickstart Webpack examples: react `quickstart-webpack-file-based`, solid `quickstart-webpack-file-based` under https://github.com/TanStack/router/tree/main/examples
- Ignore the generated `routeTree.gen.ts` in linters/formatters; mark it read-only and exclude it from search/watcher in `.vscode/settings.json`
- Full config options: File-based Routing API Reference (`../api/file-based-routing.md` on the docs site)

## Related

- [Rspack/Rsbuild Installation](./installation-with-rspack.md)
- [Esbuild Installation](./installation-with-esbuild.md)
