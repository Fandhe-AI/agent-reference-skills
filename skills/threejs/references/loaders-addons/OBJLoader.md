# OBJLoader

Loader for the Wavefront OBJ format. Supports vertex positions, UV coordinates, vertex normals, and face definitions.

## Signature / Usage

```js
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const loader = new OBJLoader();
const object = await loader.loadAsync( 'models/monster.obj' );
scene.add( object );
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `materials` | MaterialCreator | `null` | Material creator set via `setMaterials()` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load an OBJ file from URL |
| `loadAsync(url, onProgress)` | Promise\<Group\> | Promise-based load |
| `parse(text)` | Group | Parse raw OBJ text |
| `setMaterials(materials)` | OBJLoader | Set materials from a `MTLLoader` result |

## Notes

- Pair with `MTLLoader` to load associated material definitions.

## Related

- [MTLLoader](./MTLLoader.md)
