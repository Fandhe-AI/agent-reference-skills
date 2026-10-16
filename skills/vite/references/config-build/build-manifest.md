---
source: https://vite.dev/config/build-options#build-manifest
---

# build.manifest / build.ssrManifest

Generate manifest files mapping asset filenames to hashed versions, or SSR style/preload info.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    manifest: true,
    ssrManifest: true,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.manifest` | `boolean \| string` | `false` | Generate a manifest mapping non-hashed asset filenames to hashed versions, for a server framework to render correct asset links. A string is the manifest path relative to `build.outDir`; `true` means `.vite/manifest.json` |
| `build.ssrManifest` | `boolean \| string` | `false` | Generate an SSR manifest for determining style links and asset preload directives in production. A string is the path relative to `build.outDir`; `true` means `.vite/ssr-manifest.json` |

## Notes

- For plugins that need to inspect each output chunk or asset's related CSS and static assets during the build, the `viteMetadata` output bundle metadata API can also be used.
- Related guides: Backend Integration (`build.manifest`), Server-Side Rendering (`build.ssrManifest`).

## Related

- [build-ssr-emit-assets.md](./build-ssr-emit-assets.md)
- [build-output-dirs.md](./build-output-dirs.md)
