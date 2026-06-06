# GLTFLoader

Loader for the glTF 2.0 format (GL Transmission Format). The recommended format for 3D assets — supports geometry, materials, textures, animations, cameras, and scene hierarchies.

## Signature / Usage

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const gltf = await loader.loadAsync( 'models/duck/duck.gltf' );
scene.add( gltf.scene );

// Animate
const mixer = new THREE.AnimationMixer( gltf.scene );
gltf.animations.forEach( clip => mixer.clipAction( clip ).play() );
```

## Return Value (`gltf` object)

| Field | Type | Description |
|-------|------|-------------|
| `scene` | Group | Default scene |
| `scenes` | Group[] | All scenes in the file |
| `animations` | AnimationClip[] | All animation clips |
| `cameras` | Camera[] | All cameras |
| `asset` | Object | Metadata (version, generator, etc.) |
| `parser` | GLTFParser | Internal parser instance |
| `userData` | Object | Additional user data |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load a glTF file |
| `loadAsync(url, onProgress)` | Promise\<GLTF\> | Promise-based load |
| `parse(data, path, onLoad, onError)` | — | Parse raw glTF data (string or ArrayBuffer) |
| `parseAsync(data, path)` | Promise\<GLTF\> | Async version of parse |
| `setDRACOLoader(loader)` | GLTFLoader | Attach a `DRACOLoader` for mesh compression |
| `setKTX2Loader(loader)` | GLTFLoader | Attach a `KTX2Loader` for compressed textures |
| `setMeshoptDecoder(decoder)` | GLTFLoader | Attach a meshopt decoder |
| `register(callback)` | GLTFLoader | Register a plugin callback |
| `unregister(callback)` | GLTFLoader | Unregister a plugin callback |

## Built-in Extensions

- `KHR_draco_mesh_compression`, `KHR_meshopt_compression`
- `KHR_lights_punctual`
- `KHR_materials_*` (anisotropy, clearcoat, dispersion, emissive_strength, ior, specular, transmission, iridescence, unlit, volume)
- `KHR_mesh_quantization`, `KHR_texture_basisu`, `KHR_texture_transform`
- `EXT_materials_bump`, `EXT_mesh_gpu_instancing`, `EXT_texture_avif`, `EXT_texture_webp`

## Notes

- Image bitmaps created during loading are not automatically garbage collected — dispose them explicitly when no longer needed.
- Always call `setDRACOLoader()` before loading Draco-compressed glTF files.

## Related

- [DRACOLoader](./DRACOLoader.md)
- [KTX2Loader](./KTX2Loader.md)
