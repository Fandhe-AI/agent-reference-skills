---
source: https://vite.dev/guide/ssr#generating-preload-directives
---

# Generating Preload Directives

`vite build --ssrManifest` generates an SSR manifest mapping module IDs to chunks and assets, used to render preload directives.

## Signature / Usage

```diff
- "build:client": "vite build --outDir dist/client",
+ "build:client": "vite build --outDir dist/client --ssrManifest",
```

`@vitejs/plugin-vue` registers used component module IDs on the Vue SSR context:

```js
const ctx = {}
const html = await vueServerRenderer.renderToString(app, ctx)
// ctx.modules is now a Set of module IDs that were used during the render
```

## Notes

- The flag generates `dist/client/.vite/ssr-manifest.json` for the client build (generated from the client build because module IDs are mapped to client files). It contains mappings of module IDs to their associated chunks and asset files.
- Frameworks must provide a way to collect module IDs of components used during a server render call.
- In the production branch of `server.js`, read the manifest and pass it to the `render` function exported by `src/entry-server.js` to render preload directives for async-route files. The information can also be used for 103 Early Hints.
- See also `build.ssrManifest` in config-build/build-manifest.md.

## Related

- [Building SSR for Production](./ssr-production-build.md)
- [build.manifest / build.ssrManifest](../config-build/build-manifest.md)
