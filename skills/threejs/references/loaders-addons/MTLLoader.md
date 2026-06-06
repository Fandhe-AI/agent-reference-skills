# MTLLoader

Loader for the MTL (Material Template Library) format, a companion to OBJ files that describes surface shading properties.

## Signature / Usage

```js
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const mtlLoader = new MTLLoader();
const materials = await mtlLoader.loadAsync( 'models/obj/male02/male02.mtl' );
materials.preload();

const objLoader = new OBJLoader();
objLoader.setMaterials( materials );
const object = await objLoader.loadAsync( 'models/obj/male02/male02.obj' );
scene.add( object );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load an MTL file from URL |
| `loadAsync(url, onProgress)` | Promise\<MaterialCreator\> | Promise-based load |
| `parse(text, path)` | MaterialCreator | Parse raw MTL text |
| `setMaterialOptions(value)` | MTLLoader | Set material creation options |

## Material Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `side` | number | `FrontSide` | Rendering side |
| `wrap` | number | `RepeatWrapping` | Texture wrapping mode |
| `normalizeRGB` | boolean | `false` | Normalise RGB values |
| `ignoreZeroRGBs` | boolean | `false` | Ignore zero-value RGB channels |

## Related

- [OBJLoader](./OBJLoader.md)
