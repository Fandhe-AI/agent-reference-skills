# DataTextureLoader

Abstract base class for loaders that decode binary image formats (RGBE, EXR, TGA, etc.) into a `DataTexture`. Concrete subclasses must implement `parse()`.

## Signature / Usage

```js
// Use a concrete subclass — e.g., EXRLoader
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
const loader = new EXRLoader();
const texture = await loader.loadAsync( 'textures/memorial.exr' );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | DataTexture | Load a data texture from URL |
| `loadAsync(url, onProgress)` | Promise\<DataTexture\> | Promise-based load |
| `parse(buffer)` | TexData | Abstract. Decode raw binary data into a texture descriptor |

## TexData structure (returned by `parse()`)

| Field | Type | Description |
|-------|------|-------------|
| `image` | Object | Object with `width`, `height`, and raw pixel `data` |
| `format` | number | Texture format constant |
| `type` | number | Texture type constant |
| `colorSpace` | string | Color space |
| `flipY` | boolean | Flip texture on GPU upload |
| `wrapS` / `wrapT` | number | Wrapping mode (default: `ClampToEdgeWrapping`) |
| `generateMipmaps` | boolean | Whether to generate mipmaps |
| `mipmaps` | Array | Pre-computed mipmap levels |

## Related

- [Loader](./Loader.md)
- [CompressedTextureLoader](./CompressedTextureLoader.md)
