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
- Migration (r186 → r187): `Loader` gained `priority` and `cache` (HTTP cache mode) with `setPriority()` / `setCache()`; `OBJLoader` forwards them to its internal `FileLoader` (https://github.com/mrdoob/three.js/pull/34936)
- r187: OBJ `l` (line) statements are now converted to pairs of vertices (line segments) instead of being read as a flat list, and face / vertex data splitting handles any whitespace separator.
- Source: https://threejs.org/docs/pages/OBJLoader.html (three.js r187, `examples/jsm/loaders/OBJLoader.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [MTLLoader](./MTLLoader.md)
