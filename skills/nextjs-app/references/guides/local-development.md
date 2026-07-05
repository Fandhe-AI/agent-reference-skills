# Development Environment

Optimize local development performance (`next dev`) as an application grows.

## Signature / Usage

```js filename="next.config.js"
module.exports = {
  experimental: {
    optimizePackageImports: ['package-name'],
  },
  logging: {
    fetches: { fullUrl: true },
  },
}
```

## Key topics

- **`next dev` vs production**: dev compiles routes on demand as you navigate (faster startup, less memory); `next build`/`next start` apply extra optimizations (minification, content hashes) not needed locally.
- **Antivirus**: can slow file access; exclude the project folder (Windows Defender) or enable terminal dev mode (macOS Gatekeeper).
- **Turbopack**: default bundler for `next dev`/`next build` since Next.js 16; opt out with `--webpack` if needed.
- **Imports**: avoid importing whole icon libraries/multiple icon sets; avoid barrel files (slow compilation); use `experimental.optimizePackageImports` for packages using barrel files (Turbopack optimizes automatically).
- **Tailwind CSS**: scope the `content` array narrowly to avoid scanning `node_modules` or unrelated directories.
- **Custom webpack config**: reconsider whether it's needed for local dev; prefer Turbopack loaders instead.
- **Memory**: see [Memory Usage](https://nextjs.org/docs/app/guides/memory-usage) for large apps.
- **`serverComponentsHmrCache`** (experimental): caches `fetch` responses in Server Components across HMR refreshes.
- **Docker for development**: filesystem access on Mac/Windows can make HMR much slower; prefer local dev and reserve Docker for production/testing.
- **Turbopack tracing**: run with `NEXT_TURBOPACK_TRACING=1 next dev`, reproduce the issue, stop the server, then inspect `.next/dev/trace-turbopack` via `npx next internal trace <path>` and view at `https://trace.nextjs.org`.

## Notes

- `logging.fetches.fullUrl` in `next.config.js` gives detailed fetch logging during development.
- Share a generated trace file on GitHub Discussions or Discord when reporting performance problems.

## Related

- [Package Bundling](./package-bundling.md)
- [Debugging](./debugging.md)
