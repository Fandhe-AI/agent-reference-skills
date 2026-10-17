---
source: https://vite.dev/guide/assets#importing-asset-as-url
---

# Importing Asset as URL

Importing a static asset returns the resolved public URL when it is served. Suffixes `?url`, `?inline`, `?no-inline` and `?raw` control URL / inline / string handling.

## Signature / Usage

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

Explicit URL import (asset not in the internal list or `assetsInclude`):

```js
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL)
```

Explicit inline handling:

```js
// prettier-ignore
import imgUrl1 from './img.svg?no-inline'
import imgUrl2 from './img.png?inline'
```

Import as string:

```js
import shaderString from './shader.glsl?raw'
```

SVG URL passed to a manually constructed `url()` must be wrapped in double quotes:

```js
import imgUrl from './img.svg'
document.getElementById('hero-img').style.background = `url("${imgUrl}")`
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `?url` | import suffix | Import an asset not in the internal list or `assetsInclude` as a URL |
| `?inline` | import suffix | Force inlining |
| `?no-inline` | import suffix | Force no inlining |
| `?raw` | import suffix | Import the asset as a string |

## Notes

- `imgUrl` will be `/src/img.png` during development, and become `/assets/img.2d8efhg.png` in the production build.
- Behavior is similar to webpack's `file-loader`; the import can use absolute public paths (based on project root during dev) or relative paths.
- `url()` references in CSS are handled the same way. With the Vue plugin, asset references in Vue SFC templates are automatically converted into imports.
- Common image, media, and font filetypes are detected as assets automatically; extend the internal list with the `assetsInclude` option.
- Referenced assets are part of the build assets graph, get hashed file names, and can be processed by plugins for optimization.
- Assets smaller in bytes than `build.assetsInlineLimit` are inlined as base64 data URLs.
- Git LFS placeholders are excluded from inlining because they do not contain the file content. Download the content via Git LFS before building to get inlining.
- TypeScript does not recognize static asset imports as valid modules by default; include `vite/client`.

## Related

- [asset-worker-imports.md](./asset-worker-imports.md)
- [public-directory.md](./public-directory.md)
- [new-url-import-meta-url.md](./new-url-import-meta-url.md)
- [../config-shared/assets-include.md](../config-shared/assets-include.md)
- [../config-build/build-assets-inline-limit.md](../config-build/build-assets-inline-limit.md)
- Client Types (vite/client)
