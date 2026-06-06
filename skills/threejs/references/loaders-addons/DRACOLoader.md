# DRACOLoader

Loader for the Draco compressed geometry format. Draco files can be significantly smaller than uncompressed equivalents. Supports vertex positions, normals, colors, and other attributes.

## Signature / Usage

```js
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const loader = new DRACOLoader();
loader.setDecoderPath( '/examples/jsm/libs/draco/' );
const geometry = await loader.loadAsync( 'models/draco/bunny.drc' );
geometry.computeVertexNormals();
loader.dispose();
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load a `.drc` file from URL |
| `loadAsync(url, onProgress)` | Promise\<BufferGeometry\> | Promise-based load |
| `parse(buffer, onLoad, onError)` | — | Parse raw Draco `ArrayBuffer` directly |
| `setDecoderPath(path)` | DRACOLoader | Path to the WASM/JS decoder files |
| `setDecoderConfig(config)` | DRACOLoader | Configure decoder (must be set before decoding) |
| `setWorkerLimit(n)` | DRACOLoader | Max number of Web Workers for decoding |
| `dispose()` | — | Free decoder resources and workers |

## Notes

- Draco files contain **geometry only** — no materials, textures, animation, or node hierarchy. For a complete solution, embed Draco compression inside glTF.
- Create **one** `DRACOLoader` instance and reuse it to avoid loading the decoder multiple times.
- The decoder automatically uses WASM or JS based on browser support.
- When used with `GLTFLoader`, call `gltfLoader.setDRACOLoader( dracoLoader )`.

## Related

- [GLTFLoader](./GLTFLoader.md)
