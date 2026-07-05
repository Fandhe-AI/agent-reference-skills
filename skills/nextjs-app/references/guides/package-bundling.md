# Package Bundling

Analyze and optimize an application's server and client bundles with the Next.js Bundle Analyzer for Turbopack, and `@next/bundle-analyzer` for Webpack.

## Signature / Usage

```bash filename="Terminal"
npx next experimental-analyze
npx next experimental-analyze --output   # writes to .next/diagnostics/analyze
```

```js filename="next.config.js"
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
```

## Key topics

- **Next.js Bundle Analyzer (experimental, v16.1+)**: `npx next experimental-analyze` opens an interactive treemap integrated with Turbopack's module graph; filter by route/environment/type, inspect import chains, and write output to disk for diffing.
- **`@next/bundle-analyzer` for Webpack**: install, wrap `next.config.js` with `withBundleAnalyzer`, then run `ANALYZE=true next build` to open a visual report.
- **Optimizing large bundles**:
  - Packages with many exports (icon/utility libraries) → `experimental.optimizePackageImports: ['package-name']` in `next.config.js` (some libraries are optimized automatically).
  - Heavy client-only rendering work (syntax highlighting, chart rendering, markdown parsing) → move it into a Server Component so the library isn't shipped to the client.
  - Opt specific server-side packages out of bundling with `serverExternalPackages: ['package-name']`.

## Notes

- Bundling combines application code and dependencies via code splitting and tree-shaking automatically; manual optimization is only needed in specific cases.

## Related

- [Production Checklist](./production-checklist.md)
- [Development Environment](./local-development.md)
