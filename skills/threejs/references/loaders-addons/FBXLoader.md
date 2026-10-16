# FBXLoader

Loader for the FBX 3D file format. Returns a `Group` containing meshes, materials, and animations.

## Signature / Usage

```js
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const loader = new FBXLoader();
const object = await loader.loadAsync( 'models/fbx/stanford-bunny.fbx' );
scene.add( object );
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `trimAnimationClips` | boolean | `false` | Whether to trim animation clips to the time range of their animation stacks and shift them to start at time zero. Useful for assets that define multiple clips on a single timeline |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load an FBX file from URL |
| `loadAsync(url, onProgress)` | Promise\<Group\> | Promise-based load |
| `parse(buffer, path)` | Group | Parse raw FBX data from an `ArrayBuffer` |

## Notes

- Supports ASCII FBX version 7.0+ and binary FBX version 6400+. Lower versions may partially load with errors.
- Since r184, `FBXLoader` automatically converts +Z-up models into +Y-up; manual rotations at application level can be removed.
- Morph normals / blend shape normals are not yet supported.

## Related

- [GLTFLoader](./GLTFLoader.md)
- [OBJLoader](./OBJLoader.md)
