# Loading 3D Models

Load external 3D assets into a three.js scene. glTF is the recommended format.

## Signature / Usage

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
loader.load(
  'path/to/model.glb',
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,           // onProgress callback (optional)
  function (error) {
    console.error(error);
  }
);
```

## Notes

- **glTF / GLB** is the strongly recommended format: compact, fast to load, and supports meshes, materials, textures, skins, morph targets, animations, lights, and cameras.
- Alternative formats if glTF is unavailable: FBX, OBJ, COLLADA.
- Loaders for non-glTF formats (FBXLoader, OBJLoader, etc.) are in `three/addons/loaders/`.
- Common troubleshooting steps:
  1. Check browser console for errors; always provide an `onError` callback.
  2. Test the model in the [three.js glTF viewer](https://gltf-viewer.donmccurdy.com/) or [Babylon.js Sandbox](https://sandbox.babylonjs.com/).
  3. If the scene is empty, the camera may be inside the model—try scaling by 1000.
  4. Add lighting; `MeshStandardMaterial` / `MeshPhysicalMaterial` require lights to be visible.
  5. Fix absolute texture paths (e.g., `C:\\textures\\img.jpg`) to relative paths.
- Models must be served from a web server; file:// protocol will fail.

## Related

- [Installation](./installation.md)
- [Creating Text](./creating-text.md)
- [Libraries and Plugins](./libraries-and-plugins.md)
