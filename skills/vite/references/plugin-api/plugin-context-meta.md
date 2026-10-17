---
source: https://vite.dev/guide/api-plugin#plugin-context-meta
---

# Plugin Context Meta / Output Bundle Metadata

Vite exposes extra properties on `this.meta` in plugin hooks with access to the plugin context, and augments Rolldown build output objects with a `viteMetadata` field.

## Signature / Usage

```ts
function versionCheckPlugin(): Plugin {
  return {
    name: 'version-check',
    buildStart() {
      if (this.meta.rolldownVersion) {
        // only do something if running on a Rolldown powered Vite
      } else {
        // do something else if running on a Rollup powered Vite
      }
    },
  }
}
```

```ts
function outputMetadataPlugin(): Plugin {
  return {
    name: 'output-metadata-plugin',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const output of Object.values(bundle)) {
        const css = output.viteMetadata?.importedCss
        const assets = output.viteMetadata?.importedAssets
        if (!css?.size && !assets?.size) continue

        console.log(output.fileName, {
          css: css ? [...css] : [],
          assets: assets ? [...assets] : [],
        })
      }
    },
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `this.meta.viteVersion` | string | Current Vite version string (e.g. `"8.0.0"`). |
| `this.meta.rolldownVersion` | string \| undefined | Only available for Rolldown powered Vite (Vite 8+); use it to detect Rolldown. |
| `viteMetadata.importedCss` | `Set<string>` | Emitted CSS imported by the chunk. |
| `viteMetadata.importedAssets` | `Set<string>` | Emitted static assets imported by the chunk. |

## Notes

- `viteMetadata` is available on `RenderedChunk` (e.g. in `renderChunk` and `augmentChunkHash`) and on `OutputChunk` / `OutputAsset` (e.g. in `generateBundle` and `writeBundle`), during build.
- Useful for inspecting emitted CSS and static assets without relying on `build.manifest`.

## Related

- [Referencing Emitted Assets](./emitted-assets.md)
- [Chunk Import Map Information](./chunk-import-map-info.md)
