# EXRLoader

Loader for the OpenEXR texture format. Used for high dynamic range (HDR) images. Extends `DataTextureLoader`.

## Signature / Usage

```js
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';

const loader = new EXRLoader();
const texture = await loader.loadAsync( 'textures/memorial.exr' );
texture.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = texture;
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `outputFormat` | number | `RGBAFormat` | Output texture format (`RGBAFormat`, `RGFormat`, or `RedFormat`) |
| `part` | number | `0` | For multi-part EXR files, the index of the part to load |
| `type` | number | `HalfFloatType` | Texture data type (`HalfFloatType` or `FloatType`) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | DataTexture | Load an EXR file from URL |
| `loadAsync(url, onProgress)` | Promise\<DataTexture\> | Promise-based load |
| `parse(buffer)` | TexData | Parse raw EXR `ArrayBuffer` |
| `setDataType(value)` | EXRLoader | Set texture type |
| `setOutputFormat(value)` | EXRLoader | Set output format |
| `setPart(value)` | EXRLoader | Select which part of a multi-part EXR to load |

## Notes

- Supported compressions: uncompressed, ZIP(S), RLE, PIZ, B44/A, DWA/B.

## Related

- [HDRLoader](./HDRLoader.md)
- [DataTextureLoader](../loaders/DataTextureLoader.md)
