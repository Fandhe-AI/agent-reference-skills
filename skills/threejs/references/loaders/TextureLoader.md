# TextureLoader

Loads a `Texture` from an image file. Internally uses `ImageLoader`. The most common loader for standard image formats (JPEG, PNG, etc.).

## Signature / Usage

```js
const loader = new THREE.TextureLoader();
const texture = await loader.loadAsync( 'textures/land_ocean_ice_cloud_2048.jpg' );
const material = new THREE.MeshBasicMaterial( { map: texture } );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad?, onProgress?, onError?)` | Texture | Load a texture from URL; all callbacks are optional |
| `loadAsync(url, onProgress)` | Promise\<Texture\> | Promise-based load |

## Notes

- Progress events (`onProgress`) are not supported (dropped in r84).
- The returned `Texture` object can be assigned immediately; the texture data appears in the scene once loading completes.
- For HDR / EXR images use `HDRLoader` / `EXRLoader` instead.
- Migration (r186 → r187): the `onLoad`, `onProgress` and `onError` callbacks are documented as optional (https://github.com/mrdoob/three.js/pull/34730).
- Source: https://threejs.org/docs/pages/TextureLoader.html (three.js r187, `src/loaders/TextureLoader.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [Loader](./Loader.md)
- [CubeTextureLoader](./CubeTextureLoader.md)
- [ImageBitmapLoader](./ImageBitmapLoader.md)
