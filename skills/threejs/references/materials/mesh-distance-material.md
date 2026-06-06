# MeshDistanceMaterial

Used internally by Three.js for point-light shadow mapping. Assign to `Object3D#customDistanceMaterial` to customise shadow-casting behaviour.

## Signature / Usage

```js
const distanceMaterial = new THREE.MeshDistanceMaterial({
  alphaMap: alphaTexture,
  displacementMap: dispTexture,
  displacementScale: 0.1,
});
mesh.customDistanceMaterial = distanceMaterial;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `map` | Texture | `null` | Color map; alpha channel used with `transparent`/`alphaTest` |
| `alphaMap` | Texture | `null` | Grayscale opacity map (black = transparent, white = opaque) |
| `displacementMap` | Texture | `null` | Vertex displacement texture (white = max displacement) |
| `displacementScale` | number | `0` | Displacement intensity |
| `displacementBias` | number | `0` | Offset added to scaled displacement values |
| `isMeshDistanceMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Inherits all properties from [Material](./material.md)
- Intended for point-light shadow maps only; directional/spot lights use [MeshDepthMaterial](./mesh-depth-material.md)

## Related

- [Material](./material.md)
- [MeshDepthMaterial](./mesh-depth-material.md)
