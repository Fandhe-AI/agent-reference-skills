# MeshMatcapMaterial

A material defined by a MatCap (Lit Sphere) texture that encodes both color and shading. Lighting is baked into the matcap image — no dynamic lights are required.

## Signature / Usage

```js
const matcapTexture = new THREE.TextureLoader().load('matcap.png');
const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const mesh = new THREE.Mesh(geometry, material);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `matcap` | Texture | `null` | MatCap texture (required for the effect) |
| `color` | Color | `(1,1,1)` | Material color; modulates the matcap |
| `map` | Texture | `null` | Color map; modulated by `color` |
| `alphaMap` | Texture | `null` | Grayscale opacity map |
| `bumpMap` | Texture | `null` | Bump map; ignored if `normalMap` is set |
| `bumpScale` | number | `1` | Bump intensity `[0,1]` |
| `normalMap` | Texture | `null` | Normal map for per-pixel surface detail |
| `normalMapType` | Constant | `TangentSpaceNormalMap` | `TangentSpaceNormalMap` or `ObjectSpaceNormalMap` |
| `normalScale` | Vector2 | `(1,1)` | Normal map influence `[0,1]` |
| `displacementMap` | Texture | `null` | Vertex displacement texture |
| `displacementScale` | number | `0` | Displacement intensity |
| `displacementBias` | number | `0` | Displacement offset |
| `flatShading` | boolean | `false` | Enable flat shading |
| `fog` | boolean | `true` | Affected by fog |
| `wireframe` | boolean | `false` | Render as wireframe |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (SVGRenderer only) |
| `isMeshMatcapMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Does not self-shadow or receive shadows (though it can cast them onto other shadow-receiving surfaces)
- No dynamic lights needed — all shading is baked into the matcap texture
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [MeshBasicMaterial](./mesh-basic-material.md)
- [MeshNormalMaterial](./mesh-normal-material.md)
