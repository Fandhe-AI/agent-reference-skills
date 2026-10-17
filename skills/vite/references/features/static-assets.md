---
source: https://vite.dev/guide/features#static-assets
---

# Static Assets (feature summary)

Importing a static asset returns the resolved public URL when it is served. Special queries modify how assets are loaded.

## Signature / Usage

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

```js
// Explicitly load assets as URL (automatically inlined depending on the file size)
import assetAsURL from './asset.js?url'

// Load assets as strings
import assetAsString from './shader.glsl?raw'

// Load Web Workers
import Worker from './worker.js?worker'

// Web Workers inlined as base64 strings at build time
import InlineWorker from './worker.js?worker&inline'
```

## Related

- [Asset URL imports](../assets-env/asset-url-imports.md)
- [Web Workers](./web-workers.md)
