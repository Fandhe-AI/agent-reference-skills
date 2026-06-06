# ImageBitmapLoader

Loads images as `ImageBitmap` objects, providing an asynchronous and resource-efficient path for preparing textures. Unlike `ImageLoader`, it does not use the HTML `Image` element.

## Signature / Usage

```js
const loader = new THREE.ImageBitmapLoader();
loader.setOptions( { imageOrientation: 'flipY' } );
const imageBitmap = await loader.loadAsync( 'image.png' );
const texture = new THREE.Texture( imageBitmap );
texture.needsUpdate = true;
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isImageBitmapLoader` | boolean | `true` | Read-only type flag |
| `options` | Object | `{ premultiplyAlpha: 'none' }` | Options passed to `createImageBitmap()` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load an image as ImageBitmap from URL |
| `loadAsync(url, onProgress)` | Promise\<ImageBitmap\> | Promise-based load |
| `setOptions(options)` | ImageBitmapLoader | Set `createImageBitmap()` options |
| `abort()` | ImageBitmapLoader | Abort ongoing fetch requests |

## Notes

- `Texture#flipY` and `Texture#premultiplyAlpha` are **ignored** with ImageBitmap. Configure these via `setOptions()` before loading instead.
- When Cache is disabled, different options for the same URL may return a stale cached result — the cache key is URL only.
- To match default `TextureLoader` behaviour, use `{ imageOrientation: 'flipY', premultiplyAlpha: 'none' }`.

## Related

- [Loader](./Loader.md)
- [ImageLoader](./ImageLoader.md)
- [TextureLoader](./TextureLoader.md)
