# MeshNormalMaterial

Maps surface normal vectors to RGB colors. Useful for debugging normals and geometry orientation.

## Signature / Usage

```js
const material = new THREE.MeshNormalMaterial({
  flatShading: false,
  wireframe: false,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `bumpMap` | Texture | `null` | Bump map for perceived depth; ignored if `normalMap` set |
| `bumpScale` | number | `1` | Bump intensity `[0,1]` |
| `normalMap` | Texture | `null` | Normal map; does not change actual geometry |
| `normalMapType` | Constant | `TangentSpaceNormalMap` | `TangentSpaceNormalMap` or `ObjectSpaceNormalMap` |
| `normalScale` | Vector2 | `(1,1)` | Normal map influence `[0,1]` |
| `displacementMap` | Texture | `null` | Vertex displacement texture |
| `displacementScale` | number | `1` | Displacement intensity |
| `displacementBias` | number | `0` | Displacement offset |
| `flatShading` | boolean | `false` | Enable flat shading |
| `wireframe` | boolean | `false` | Render as wireframe |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (WebGL/WebGPU always 1px) |
| `isMeshNormalMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Map color spaces (r186 docs): `bumpMap` and `normalMap` use `NoColorSpace` (default).
- `displacementMap` repositions vertices: pair it with a matching normal map, since the renderer cannot recompute surface normals from the displaced vertices.

- Does not react to lights; normals are mapped directly to RGB (X→R, Y→G, Z→B)
- Primarily used for debugging or stylized renders
- Inherits all properties from [Material](./material.md)
- Corrected from the JSDoc: `displacementScale` default is `1` (the r186 JSDoc said `0`; the constructor has always set `1`).
- Source: https://threejs.org/docs/pages/MeshNormalMaterial.html (three.js r187, `src/materials/MeshNormalMaterial.js`; JSDoc from tag r187 / commit 7e89746)

## Related

- [Material](./material.md)
- [MeshMatcapMaterial](./mesh-matcap-material.md)
