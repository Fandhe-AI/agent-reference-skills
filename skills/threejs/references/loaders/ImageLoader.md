# ImageLoader

Loads images using the HTML `Image` API. Used internally by `TextureLoader` and `CubeTextureLoader`.

## Signature / Usage

```js
const loader = new THREE.ImageLoader();
const image = await loader.loadAsync( 'image.png' );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | Image | Load an image from URL |
| `loadAsync(url, onProgress)` | Promise\<HTMLImageElement\> | Promise-based load |

## Notes

- Progress events (`onProgress`) are not supported (dropped in r84).
- Returns an `HTMLImageElement` that can be used directly with `new THREE.Texture( image )`.

## Related

- [Loader](./Loader.md)
- [TextureLoader](./TextureLoader.md)
- [ImageBitmapLoader](./ImageBitmapLoader.md)
