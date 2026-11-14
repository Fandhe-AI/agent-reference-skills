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

## Notes

- Migration (r186 → r187): `Loader` gained `priority` and `cache` (HTTP cache mode) with `setPriority()` / `setCache()`; `MTLLoader` and its `MaterialCreator` forward them to internal file and texture loading (https://github.com/mrdoob/three.js/pull/34936)
- Source: https://threejs.org/docs/pages/MTLLoader.html (three.js r187, `examples/jsm/loaders/MTLLoader.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [OBJLoader](./OBJLoader.md)
