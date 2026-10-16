---
source: https://vite.dev/config/shared-options#assetsinclude
---

# assetsInclude

Additional picomatch patterns to treat as static assets.

## Signature / Usage

```js
export default defineConfig({
  assetsInclude: ['**/*.gltf'],
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `assetsInclude` | `string \| RegExp \| (string \| RegExp)[]` | Extra patterns treated as static assets. |

## Notes

- Matching files are excluded from the plugin transform pipeline when referenced from HTML or directly requested over `fetch` or XHR.
- Importing them from JS returns their resolved URL string (can be overridden by an `enforce: 'pre'` plugin that handles the asset type differently).
- The built-in asset type list is in `packages/vite/src/node/constants.ts`.

## Related

- [Asset URL imports](../assets-env/asset-url-imports.md)
- [Static assets](../features/static-assets.md)
