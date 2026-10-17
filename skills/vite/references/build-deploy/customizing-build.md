---
source: https://vite.dev/guide/build#customizing-the-build
---

# Customizing the Build / Chunking Strategy

The build is customized via build config options; the underlying Rolldown options are adjusted directly through `build.rolldownOptions`.

## Signature / Usage

```js
// vite.config.js
export default defineConfig({
  build: {
    rolldownOptions: {
      // https://rolldown.rs/reference/
    },
  },
})
```

## Notes

- Example from the page: specify multiple Rolldown outputs with plugins that are only applied during build.
- Chunking Strategy: configure how chunks are split with `build.rolldownOptions.output.codeSplitting` (see the Rolldown docs: https://rolldown.rs/reference/OutputOptions.codeSplitting and https://rolldown.rs/in-depth/manual-code-splitting). If you use a framework, refer to its documentation for configuring chunk splitting.
- Migration (v7 → v8): `build.rollupOptions` is deprecated in favor of `build.rolldownOptions`; see config-build/build-rolldown-options.md.

## Related

- [Load Error Handling](./load-error-handling.md)
- [Multi-Page App](./multi-page-app.md)
