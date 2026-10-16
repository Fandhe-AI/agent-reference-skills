# KTX2Loader

Loader for KTX 2.0 GPU texture containers using Basis Universal transcoding. Transcodes textures to an optimal GPU-compressed format at runtime based on hardware support.

## Signature / Usage

```js
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

const loader = new KTX2Loader();
loader.setTranscoderPath( 'examples/jsm/libs/basis/' );
loader.detectSupport( renderer );
const texture = await loader.loadAsync( 'diffuse.ktx2' );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load a KTX2 texture from URL |
| `loadAsync(url, onProgress)` | Promise\<CompressedTexture\> | Promise-based load |
| `parse(buffer, onLoad, onError)` | — | Parse raw KTX2 `ArrayBuffer` |
| `detectSupport(renderer)` | KTX2Loader | Detect GPU compressed texture support — **must call before loading** |
| `setTranscoderPath(path)` | KTX2Loader | Optionally sets the path from which the WASM transcoder and JS wrapper files are loaded (e.g. a CDN). By default they are loaded from the `examples/jsm/libs/basis` directory |
| `setWorkerLimit(n)` | KTX2Loader | Maximum number of Web Workers to allocate |
| `dispose()` | — | Free internal resources |

## Notes

- Requires Web Assembly support.
- `detectSupport()` must be called with a `WebGLRenderer` or `WebGPURenderer` before any load.
- Used by `GLTFLoader` automatically when `KHR_texture_basisu` extension is present.

## Related

- [GLTFLoader](./GLTFLoader.md)
- [CompressedTextureLoader](../loaders/CompressedTextureLoader.md)
