# STLLoader

Loader for the STL (Stereolithography) format. Commonly used with CAD output. Supports both binary and ASCII encoded files. Returns a non-indexed `BufferGeometry`.

## Signature / Usage

```js
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const loader = new STLLoader();
const geometry = await loader.loadAsync( 'models/stl/slotted_disk.stl' );
scene.add( new THREE.Mesh( geometry ) );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load an STL file from URL |
| `loadAsync(url, onProgress)` | Promise\<BufferGeometry\> | Promise-based load |
| `parse(data)` | BufferGeometry | Parse raw STL data from an `ArrayBuffer` |

## Notes

- Binary format: supports "Magics" colour extension only; assumes little-endian byte order.
- ASCII format: assumes UTF-8 encoding.
- For binary STL with vertex colours, check `geometry.hasColors` and use `geometry.alpha`.

## Related

- [GLTFLoader](./GLTFLoader.md)
- [OBJLoader](./OBJLoader.md)
