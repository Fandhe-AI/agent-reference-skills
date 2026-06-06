# MeshDepthMaterial

Renders geometry by depth. White = nearest to camera, black = farthest. Primarily used for shadow mapping and depth-based post-processing.

## Signature / Usage

```js
const depthMaterial = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
});
mesh.customDepthMaterial = depthMaterial;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `depthPacking` | Constant | `BasicDepthPacking` | Depth packing format: `BasicDepthPacking`, `RGBADepthPacking`, `RGBDepthPacking`, `RGDepthPacking` |
| `map` | Texture | `null` | Color map; alpha channel used with `transparent`/`alphaTest` |
| `alphaMap` | Texture | `null` | Grayscale opacity map (black = transparent, white = opaque) |
| `displacementMap` | Texture | `null` | Vertex displacement texture (white = max displacement) |
| `displacementScale` | number | `0` | Displacement intensity `[0,1]` |
| `displacementBias` | number | `0` | Offset added to scaled displacement values |
| `wireframe` | boolean | `false` | Render as wireframe |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (ignored by WebGL/WebGPU, always 1px) |
| `isMeshDepthMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Inherits all properties from [Material](./material.md)
- Assign to `Object3D#customDepthMaterial` to customise shadow casting depth
- `RGBADepthPacking` provides more precision than `BasicDepthPacking`

## Related

- [Material](./material.md)
- [MeshDistanceMaterial](./mesh-distance-material.md)
