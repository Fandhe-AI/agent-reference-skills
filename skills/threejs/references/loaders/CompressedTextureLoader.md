# CompressedTextureLoader

Abstract base class for loaders that handle compressed GPU texture formats (S3TC, ASTC, ETC, etc.). Concrete subclasses must implement `parse()`. Returns a `CompressedTexture`.

## Signature / Usage

```js
// Use a concrete subclass — e.g., DDSLoader
import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';
const loader = new DDSLoader();
const texture = await loader.loadAsync( 'textures/compressed.dds' );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | CompressedTexture | Load a compressed texture from URL |
| `loadAsync(url, onProgress)` | Promise\<CompressedTexture\> | Promise-based load |
| `parse(buffer)` | TexData | Abstract. Parse raw binary data into mipmap/format descriptor |

## TexData structure (returned by `parse()`)

| Field | Type | Description |
|-------|------|-------------|
| `width` | number | Width of base mip |
| `height` | number | Height of base mip |
| `format` | number | GPU texture format constant |
| `mipmaps` | Array | Array of `{data, width, height}` objects |
| `mipmapCount` | number | Total number of mipmaps |
| `isCubemap` | boolean | Whether the data represents a cubemap |

## Related

- [Loader](./Loader.md)
- [DataTextureLoader](./DataTextureLoader.md)
