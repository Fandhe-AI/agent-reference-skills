# HDRLoader

Loader for the RGBE HDR texture format (`.hdr` files). Typically used for equirectangular environment maps. Extends `DataTextureLoader`.

## Signature / Usage

```js
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

const loader = new HDRLoader();
const envMap = await loader.loadAsync( 'textures/equirectangular/sunrise_1k.hdr' );
envMap.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = envMap;
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | number | `HalfFloatType` | Texture data type (`HalfFloatType` or `FloatType`) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | DataTexture | Load an HDR file from URL |
| `loadAsync(url, onProgress)` | Promise\<DataTexture\> | Promise-based load |
| `parse(buffer)` | TexData | Parse raw RGBE `ArrayBuffer` |
| `setDataType(value)` | HDRLoader | Set texture data type |

## Related

- [EXRLoader](./EXRLoader.md)
- [DataTextureLoader](../loaders/DataTextureLoader.md)
