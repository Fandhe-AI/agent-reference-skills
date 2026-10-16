# Turbopack

Turbopack is an incremental bundler for JavaScript/TypeScript, written in Rust and built into Next.js; it is the default bundler for both `dev` and `build`.

## Signature / Usage

```js filename="next.config.js"
module.exports = {
  turbopack: {
    // Example: adding an alias and custom file extension
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| turbopack.rules | object | Additional webpack-loader-based file transformation rules. |
| turbopack.resolveAlias | object | Manual module aliases (like webpack's `resolve.alias`). |
| turbopack.resolveExtensions | `string[]` | Custom/extended file extensions for module resolution. |
| turbopack.ignoreIssue | — | Suppresses specific Turbopack errors/warnings from CLI output and the error overlay. |
| turbopack.root | string | Filesystem root directory Turbopack uses to resolve modules (needed for `npm link`/monorepo setups). |
| experimental.turbopackFileSystemCacheForDev | boolean | Enable filesystem cache for the dev server. Default `true` (dev). |
| experimental.turbopackFileSystemCacheForBuild | boolean | Enable filesystem cache for builds. Default `true` (build); set `false` when the build environment does not preserve `.next/cache` between builds. |
| experimental.turbopackGc | boolean \| object | Remove unreachable work from memory and the persistent cache. Default `false`. |
| experimental.turbopackLazyDynamicImports | boolean | Compile client-side dynamic import targets when the browser first requests them. Default `false` (dev only). |
| experimental.turbopackLazyDynamicImportsSSR | boolean | Compile dynamic import targets when server rendering first reaches them. Default `false` (dev only). |
| experimental.turbopackPluginRuntimeStrategy | `'childProcesses' \| 'workerThreads' \| 'forceWorkerThreads'` | Whether Node.js evaluation (loaders, Babel, PostCSS) runs in child processes or worker threads. Default `'childProcesses'`. |
| experimental.turbopackMinify | boolean \| `{ server, client, edge }` | Enable minification, or configure each environment separately. Default `false` (dev) / `true` (build). |
| experimental.turbopackMangleExportNames | boolean | Shorten the export names modules expose to each other to reduce bundle size; a module whose export names can be observed (escaping namespace object, dynamic `import()`, CommonJS `require()`) keeps its original names. Default `false` (dev) / `true` (build). |
| experimental.turbopackMangleViaMaterializedNamespaceObject | boolean | Allow export mangling through a materialized namespace facade. Default `false`; defaults to `true` when `turbopackMangleExportNames` is explicitly `true`. |
| experimental.turbopackSharedRuntime | boolean | Share the browser runtime across routes in a single `runtime.js` asset. Production builds only; default `true`. |
| experimental.turbopackModuleIds | `'named' \| 'deterministic'` | Module ID strategy. Default `'named'` (dev) / `'deterministic'` (build). |

## Notes

- Version history: `v16.0.0` Turbopack support for `build` is stable and Turbopack becomes the default bundler (automatic Babel support when a config file is found); `v15.5.0` `build` beta; `v15.3.0` experimental `build`; `v15.0.0` `dev` stable.
- `import.meta.glob` (Turbopack only; not available with webpack): a pattern is either relative to the importing file (`./`, `../`) or absolute from the project root (`/`), and result keys follow the pattern (relative patterns give relative keys, root-absolute give root-absolute keys). Keys are always sorted bytewise and identically in dev and production. `node_modules` is matched like any directory (a broad pattern such as `/**/*.js` walks dependencies; `.next` is never traversed). The `base` option is a directory (resolved relative to the importing file) the patterns are resolved against, and result keys become relative to it, e.g. `import.meta.glob('*.md', { base: '../../content' })`.
- `import.meta.glob` `query` is passed through to module rules and has no meaning on its own: Turbopack has no built-in `?raw` / `?url` handling (unlike Vite), so match the query with a rule, e.g. `turbopack.rules: { '*.txt': { condition: { query: '?raw' }, type: 'text' } }`. The `as` option and `import.meta.globEager()` are not supported.
- Linked dependencies outside the project root (`npm link` etc.) are not resolved by default: configure `experimental.turbopackAdditionalRoots` for symlinked dependencies, and use `turbopack.root` when the app directly imports files outside the detected root rather than through symlinks.
- Turbopack is the default bundler since `v16.0.0`; pass `--webpack` (`next dev --webpack` / `next build --webpack`) to opt back into webpack — also required on platforms without native bindings (falls back to WASM, which does not support Turbopack).
- Zero-config support: JS/TS/JSX/TSX, ESNext, CommonJS & ESM, Fast Refresh, React Server Components, global CSS, CSS Modules (via Lightning CSS), CSS nesting, `@import`, PostCSS, Sass (no custom `sassOptions.functions`), static asset & JSON imports, `tsconfig.json` path aliases.
- Automatic root layout creation in the App Router is not supported; Turbopack instructs you to create it manually.
- Webpack plugins are not supported (webpack loaders are, via `turbopack.rules`); `webpack()` config in `next.config.js` is ignored — use the `turbopack` key instead.
- Magic comments `webpackIgnore`, `turbopackIgnore`, `turbopackOptional` apply to dynamic `import()`, `require()`, `require.resolve()`, and `new Worker()` (not static `import`).
- Legacy Sass `~` imports from `node_modules` are not supported; drop the `~` or add a `turbopack.resolveAlias` mapping (`'~*': '*'`).
- Generate a trace file for perf/memory debugging with `NEXT_TURBOPACK_TRACING=1 next dev` (writes `.next/dev/trace-turbopack`).
