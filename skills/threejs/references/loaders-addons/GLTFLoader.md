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
- `KHR_materials_*` (anisotropy, diffuse_roughness, clearcoat, dispersion, emissive_strength, ior, specular, transmission, iridescence, unlit, volume)
- `KHR_mesh_quantization`, `KHR_texture_basisu`, `KHR_texture_transform`
- `EXT_materials_bump`, `EXT_mesh_gpu_instancing`, `EXT_texture_avif`, `EXT_texture_webp`

## Extensions via Separately Registered Plugins

- `KHR_gaussian_splatting`, `KHR_materials_variants`, `MSFT_texture_dds`, `KHR_animation_pointer`, `NEEDLE_progressive` (the r186 docs list `KHR_gaussian_splatting` first; the others are third-party plugins)

## Notes

- Image bitmaps created during loading are not automatically garbage collected — dispose them explicitly when no longer needed.
- Always call `setDRACOLoader()` before loading Draco-compressed glTF files.
- Migration (r186 → r187): `GLTFLoader` forwards `priority`, `cache` and `withCredentials` to the internal buffer / texture / bitmap loaders, so credentials also reach buffers and `ImageBitmapLoader` textures (https://github.com/mrdoob/three.js/pull/35025; `Loader` priority / cache: https://github.com/mrdoob/three.js/pull/34936).
- Migration (r186 → r187): when `KTX2Loader` is used for an image stored in a `bufferView`, the data is passed to `KTX2Loader#parse()` directly instead of via a Blob / object URL (https://github.com/mrdoob/three.js/pull/35193).
- Source: https://threejs.org/docs/pages/GLTFLoader.html (three.js r187, `examples/jsm/loaders/GLTFLoader.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [DRACOLoader](./DRACOLoader.md)
- [KTX2Loader](./KTX2Loader.md)
