---
source: https://tanstack.com/router/latest/docs/framework/react/installation/with-esbuild
---

# Installation with Esbuild

File-based routing setup for Esbuild via the `@tanstack/router-plugin` package.

## Signature / Usage

```ts
// esbuild.config.js (React)
import { tanstackRouter } from '@tanstack/router-plugin/esbuild'

export default {
  plugins: [
    tanstackRouter({ target: 'react' }),
  ],
}
```

```ts
// build.js (Solid)
import * as esbuild from 'esbuild'
import { solidPlugin } from 'esbuild-plugin-solid'
import { tanstackRouter } from '@tanstack/router-plugin/esbuild'

const isDev = process.argv.includes('--dev')
const ctx = await esbuild.context({
  entryPoints: ['src/main.tsx'],
  outfile: 'dist/main.js',
  minify: !isDev,
  bundle: true,
  format: 'esm',
  target: ['esnext'],
  sourcemap: true,
  plugins: [solidPlugin(), tanstackRouter({ target: 'solid' })],
})

if (isDev) {
  await ctx.watch()
  const { host, port } = await ctx.serve({ servedir: '.', port: 3005 })
} else {
  await ctx.rebuild()
  await ctx.dispose()
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

- Automatic code splitting is not available with Esbuild: the plugin throws an error when `autoCodeSplitting` is `true`. Route generation works as usual. To split routes, use manual code splitting (`../data-rendering/code-splitting.md`) or another bundler. (Pin `release-2026-11-08-0104`: `autoCodeSplitting: true` was removed from both examples above; earlier pins showed it.)
- Source: https://github.com/TanStack/router/blob/release-2026-11-08-0104/docs/router/installation/with-esbuild.md (fetched 2026-11-14)
- Ignore the generated `routeTree.gen.ts` in linters/formatters; mark it read-only and exclude it from search/watcher in `.vscode/settings.json`
- Full config options: File-based Routing API Reference (`../api/file-based-routing.md` on the docs site)

## Related

- [Webpack Installation](./installation-with-webpack.md)
- [Router CLI Installation](./installation-with-router-cli.md)
