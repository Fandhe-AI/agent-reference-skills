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
| experimental.turbopackFileSystemCacheForBuild | boolean | Enable filesystem cache for builds. Default `false` (build). |
| experimental.turbopackMinify | boolean | Enable minification. Default `false` (dev) / `true` (build). |
| experimental.turbopackModuleIds | `'named' \| 'deterministic'` | Module ID strategy. Default `'named'` (dev) / `'deterministic'` (build). |

## Notes

- Turbopack is the default bundler since `v16.0.0`; pass `--webpack` (`next dev --webpack` / `next build --webpack`) to opt back into webpack — also required on platforms without native bindings (falls back to WASM, which does not support Turbopack).
- Zero-config support: JS/TS/JSX/TSX, ESNext, CommonJS & ESM, Fast Refresh, React Server Components, global CSS, CSS Modules (via Lightning CSS), CSS nesting, `@import`, PostCSS, Sass (no custom `sassOptions.functions`), static asset & JSON imports, `tsconfig.json` path aliases.
- Automatic root layout creation in the App Router is not supported; Turbopack instructs you to create it manually.
- Webpack plugins are not supported (webpack loaders are, via `turbopack.rules`); `webpack()` config in `next.config.js` is ignored — use the `turbopack` key instead.
- Magic comments `webpackIgnore`, `turbopackIgnore`, `turbopackOptional` apply to dynamic `import()`, `require()`, `require.resolve()`, and `new Worker()` (not static `import`).
- Legacy Sass `~` imports from `node_modules` are not supported; drop the `~` or add a `turbopack.resolveAlias` mapping (`'~*': '*'`).
- Generate a trace file for perf/memory debugging with `NEXT_TURBOPACK_TRACING=1 next dev` (writes `.next/dev/trace-turbopack`).
