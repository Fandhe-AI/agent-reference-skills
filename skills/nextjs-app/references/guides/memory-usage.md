# Memory Usage

Strategies to reduce and diagnose memory consumption during Next.js development and production builds.

## Signature / Usage

```js filename="next.config.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
  },
  productionBrowserSourceMaps: false,
}
export default nextConfig
```

```bash
next build --experimental-debug-memory-usage
node --heap-prof node_modules/next/dist/bin/next build
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `experimental.webpackMemoryOptimizations` | `boolean` | Reduces max Webpack memory usage; may slightly increase compile time (since v15.0.0) |
| `--experimental-debug-memory-usage` (build flag) | flag | Continuously prints heap/GC stats during build; auto-takes heap snapshots near the memory limit (since 14.2.0) |
| `experimental.webpackBuildWorker` | `boolean` | Runs Webpack compilation in a separate worker to lower memory (default on since v14.1.0 without custom Webpack config) |
| `typescript.ignoreBuildErrors` | `boolean` | Skips the memory-heavy TypeScript check during build (dangerous — may ship type errors) |
| `productionBrowserSourceMaps` / `experimental.serverSourceMaps` / `enablePrerenderSourceMaps` | `boolean` | Disable source map generation to save build memory |
| `experimental.preloadEntriesOnStart` | `boolean` | `false` disables preloading every page's JS at server start, trading a larger upfront memory footprint for faster initial response times |

## Notes

- Use the Bundle Analyzer (see Package Bundling) to find large dependencies inflating memory usage.
- `NODE_OPTIONS=--inspect` (or `--inspect-brk`) exposes the Node inspector for Chrome DevTools heap snapshot analysis; sending `SIGUSR2` during `--experimental-debug-memory-usage` also triggers a snapshot.
- Disabling the Webpack cache (`config.cache = { type: 'memory' }` in a custom webpack config, non-dev only) trades build speed for lower memory.
- Edge runtime memory issue fixed in v14.1.3 — update if affected.
- `--experimental-debug-memory-usage` is not compatible with the Webpack build worker.

## Related

- [Package Bundling](https://nextjs.org/docs/app/guides/package-bundling)
