# CubeTextureLoader

Loads a `CubeTexture` from six separate images representing the faces of a cube. Internally uses `ImageLoader`.

## Signature / Usage

```js
const loader = new THREE.CubeTextureLoader().setPath( 'textures/cubeMaps/' );
const cubeTexture = await loader.loadAsync( [
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
] );
scene.background = cubeTexture;
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(urls, onLoad, onProgress, onError)` | CubeTexture | Load six face images from a URL array |
| `loadAsync(urls, onProgress)` | Promise\<CubeTexture\> | Promise-based load |

## Notes

- `urls` array order: **pos-x, neg-x, pos-y, neg-y, pos-z, neg-z**.
- Progress events (`onProgress`) are not supported.
- Color space defaults to `SRGBColorSpace`.
- Due to coordinate-system differences, pos-x and neg-x are **swapped** when used as an environment map.
- Does not support cross/strip cube map layouts — six separate images are required.

## Related

- [Loader](./Loader.md)
- [TextureLoader](./TextureLoader.md)
