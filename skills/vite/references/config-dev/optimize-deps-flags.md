---
source: https://vite.dev/config/dep-optimization-options#optimizedeps-force
---

# optimizeDeps.force / noDiscovery / holdUntilCrawlEnd / disabled / needsInterop

Boolean/flag-style options of the dependency optimizer.

## Signature / Usage

```js
export default defineConfig({
  optimizeDeps: {
    force: true,
    noDiscovery: false,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `optimizeDeps.force` | `boolean` | — | `true` forces dependency pre-bundling, ignoring previously cached optimized dependencies |
| `optimizeDeps.noDiscovery` | `boolean` | `false` | `true` disables automatic dependency discovery; only dependencies in `optimizeDeps.include` are optimized. CJS-only dependencies must be in `include` during dev |
| `optimizeDeps.holdUntilCrawlEnd` | `boolean` | `true` | Experimental. Holds the first optimized deps results until all static imports are crawled on cold start, avoiding full-page reloads when new dependencies trigger new common chunks |
| `optimizeDeps.disabled` | `boolean \| 'build' \| 'dev'` | `'build'` | Deprecated, Experimental |
| `optimizeDeps.needsInterop` | `string[]` | — | Experimental. Forces ESM interop when importing these dependencies |

## Notes

- None of these are inherited by environments.
- `holdUntilCrawlEnd` (Experimental): if all dependencies are found by the scanner plus those explicitly in `include`, disabling this option lets the browser process more requests in parallel.
- `disabled` (Deprecated, Experimental): as of Vite 5.1, pre-bundling of dependencies during build has been removed. `true` or `'dev'` disables the optimizer; `false` or `'build'` leaves the dev optimizer enabled. To disable the optimizer completely, use `optimizeDeps.noDiscovery: true` and leave `optimizeDeps.include` undefined or empty. Optimizing during build was experimental; projects that tried it and removed `@rollup/plugin-commonjs` via `build.commonjsOptions: { include: [] }` get a warning guiding them to re-enable it for CJS-only packages while bundling.
- `needsInterop` (Experimental): Vite detects interop needs properly, so this is generally not needed. Different dependency combinations can cause some to be prebundled differently; adding such packages here can speed up cold start by avoiding full-page reloads. A warning suggests adding the package name when this applies.

## Related

- [optimize-deps-entries-include-exclude.md](./optimize-deps-entries-include-exclude.md)
- [optimize-deps-rolldown-esbuild-options.md](./optimize-deps-rolldown-esbuild-options.md)
