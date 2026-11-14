# JXLLoader

Loader for HDR JPEG XL images (`.jxl`) that uses the browser's native decoder. Produces half-float `DataTexture`s in linear sRGB. Extends `Loader`.

## Signature / Usage

```js
import { JXLLoader } from 'three/addons/loaders/JXLLoader.js';

const texture = await new JXLLoader().loadAsync( 'image.jxl' );
const material = new THREE.MeshStandardMaterial( { emissive: 0xffffff, emissiveMap: texture } );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | DataTexture | Load a native HDR image; returns a placeholder texture that is populated after decoding |
| `loadAsync(url, onProgress)` | Promise\<DataTexture\> | Promise-based load (inherited from `Loader`) |
| `parse(buffer, onLoad, onError)` | — | Decode JPEG XL bytes (`ArrayBuffer`) using the browser, preserving maximum HDR headroom |
| `parseAsync(buffer)` | Promise\<DataTexture\> | Async version of `parse()`; resolves to a half-float texture in linear sRGB |

## Notes

- Requires Canvas2D float16 storage (`colorType: 'float16'`), the `srgb-linear` canvas color space and `globalHDRHeadroom`; otherwise decoding fails with an error.
- Resulting textures use `HalfFloatType`, `RGBAFormat`, `LinearSRGBColorSpace`, linear min / mag filters and `flipY = true`.
- Not related to `HDRLoader` (RGBE `.hdr` files) or `EXRLoader` (OpenEXR); those decode in JavaScript.
- Migration (r186 → r187): new addon, "Add native HDR image loading" (https://github.com/mrdoob/three.js/pull/35015).
- Source: https://threejs.org/docs/pages/JXLLoader.html (three.js r187, `examples/jsm/loaders/JXLLoader.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [HDRLoader](./HDRLoader.md)
- [EXRLoader](./EXRLoader.md)
