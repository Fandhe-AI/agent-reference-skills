---
source: https://vite.dev/guide/api-plugin#chunk-import-map-information
---

# Chunk Import Map Information

Access the chunk ID to file path mapping when `build.chunkImportMap` is enabled.

## Signature / Usage

```ts
function accessImportMap() {
  let config: ResolvedConfig
  return {
    name: 'access-import-map',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    generateBundle(options, bundle) {
      const chunkImportMap =
        config.build.rolldownOptions.experimental?.chunkImportMap
      if (chunkImportMap) {
        const importMapFilename =
          typeof chunkImportMap === 'object' && chunkImportMap.fileName
            ? chunkImportMap.fileName
            : 'importmap.json'
        const importMap = bundle[importMapFilename]! as OutputAsset
        const mapping = JSON.parse(importMap.source).imports
        console.log(mapping)
        // { "./entry.hash1.js": "./entry.hash2.js" }
      }
    },
  }
}
```

## Notes

- Experimental: this feature may change in the future.
- When `build.chunkImportMap` is enabled, import statements in generated chunks use a unique ID per chunk instead of the file path.
- The import map is emitted to the bundle (read it in `generateBundle` or `writeBundle`) with the name from `build.rolldownOptions.experimental.chunkImportMap.fileName` (defaults to `importmap.json`).

## Related

- [Plugin Context Meta / Output Bundle Metadata](./plugin-context-meta.md)
