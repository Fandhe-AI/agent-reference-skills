---
source: https://vite.dev/guide/performance
---

# Performance

Guide to identifying and fixing slow server starts, slow page loads and slow builds.

## Signature / Usage

Warm up frequently used files with `server.warmup`:

```js
export default defineConfig({
  server: {
    warmup: {
      clientFiles: [
        './src/components/BigComponent.vue',
        './src/utils/big-utils.js',
      ],
    },
  },
})
```

Find frequently used files from the transform logs:

```bash
vite --debug transform
```

## Notes

- Browser setup: extensions may slow startup and reload for large apps; use a dev-only profile without extensions or incognito mode. Ensure "Disable Cache" is not enabled in browser dev tools, since the dev server hard-caches pre-bundled dependencies and serves fast 304 responses for source code.
- Plugins: internal and official plugins are optimized (e.g. regex transforms in dev, full parse in build). For community plugins: dynamically import large dependencies used only in some cases; keep `buildStart`, `config` and `configResolved` short (awaited during dev server startup); in `resolveId`, `load` and `transform`, check `code` for a keyword or `id` for an extension before a full transform. Inspect durations with `vite --debug plugin-transform` or vite-plugin-inspect (timings of async operations are rough estimates).
- Profiling: run `vite --profile`, visit the site, press `p + enter` to record a `.cpuprofile`, and inspect it with a tool like speedscope.
- Resolve operations: `resolve.extensions` defaults to `['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']`; `import './Component'` for `./Component.jsx` takes 6 filesystem checks. Prefer explicit imports (`import './Component.jsx'`) or narrow `resolve.extensions` (it must still work for `node_modules`). Plugin authors should call `this.resolve` only when needed. With TypeScript, enable `"moduleResolution": "bundler"` and `"allowImportingTsExtensions": true` to use `.ts` / `.tsx` extensions directly.
- Barrel files (e.g. `export * from './color.js'` in `src/utils/index.js`) force all re-exported files to be fetched and transformed on `import { slash } from './utils'`; import individual APIs directly (`./utils/slash.js`). See vitejs/vite#8237.
- Warm up: the dev server transforms files only as requested, so waterfalls may occur (e.g. `main.js -> BigComponent.vue -> big-utils.js -> large-data.json`). Only warm up frequently used files to avoid overloading startup. `--open` or `server.open` also warms up the app entry point or the URL to open.
- Use lesser or native tooling: use CSS instead of Sass / Less / Stylus when possible (nesting via PostCSS / Lightning CSS); do not transform SVGs into UI framework components (import as strings or URLs). Native tooling: try the experimental support for LightningCSS.

## Related

- [troubleshooting-others.md](./troubleshooting-others.md)
- [../config-dev/server-warmup.md](../config-dev/server-warmup.md)
- [../config-shared/resolve-options.md](../config-shared/resolve-options.md)
