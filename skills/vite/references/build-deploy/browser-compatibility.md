---
source: https://vite.dev/guide/build#browser-compatibility
---

# Browser Compatibility

By default, the production bundle targets the minimum browser versions compatible with Baseline Widely Available as of a date fixed for each major release.

## Signature / Usage

```js
// vite.config.js — custom target via build.target (lowest target is es2015)
export default defineConfig({
  build: {
    target: 'es2015',
  },
})
```

## Options / Props

Default browser support range for this major:

| Browser | Minimum |
| --- | --- |
| Chrome | >=111 |
| Edge | >=111 |
| Firefox | >=114 |
| Safari | >=16.4 |

Minimum range still required when a lower `build.target` is set (Vite relies on native ESM dynamic import and `import.meta`):

| Browser | Minimum |
| --- | --- |
| Chrome | >=64 |
| Firefox | >=67 |
| Safari | >=11.1 |
| Edge | >=79 |

## Notes

- Custom targets are specified via the `build.target` config option; the lowest target is `es2015`.
- By default Vite only handles syntax transforms and does not cover polyfills. The page points to https://cdnjs.cloudflare.com/polyfill/ , which generates polyfill bundles from the user's UserAgent string.
- Legacy browsers can be supported via `@vitejs/plugin-legacy`, which automatically generates legacy chunks and corresponding ES language feature polyfills. The legacy chunks are conditionally loaded only in browsers without native ESM support (source: https://github.com/vitejs/vite/tree/v8.3.4/packages/plugin-legacy).
- Migration (v7 → v8): the default browser target changed in this major; see the migration pages in migration-troubleshooting.

## Related

- [Public Base Path](./public-base-path.md)
- [Customizing the Build](./customizing-build.md)
