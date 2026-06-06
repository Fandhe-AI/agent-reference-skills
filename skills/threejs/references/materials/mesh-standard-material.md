# MeshStandardMaterial

Physically based rendering (PBR) material using the Metallic-Roughness workflow. Provides realistic results across all lighting scenarios.

## Signature / Usage

```js
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 1.0,
  map: colorTexture,
  envMap: pmremTexture,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(1,1,1)` | Diffuse color |
| `metalness` | number | `0` | Metal-like appearance: 0 = non-metallic, 1 = fully metallic |
| `roughness` | number | `1` | Surface roughness: 0 = mirror, 1 = fully diffuse |
| `map` | Texture | `null` | Color/diffuse map; modulated by `color` |
| `metalnessMap` | Texture | `null` | Metalness map (blue channel) |
| `roughnessMap` | Texture | `null` | Roughness map (green channel) |
| `alphaMap` | Texture | `null` | Grayscale opacity map |
| `aoMap` | Texture | `null` | Ambient occlusion map (red channel); requires second UV set |
| `aoMapIntensity` | number | `1` | AO intensity `[0,1]` |
| `bumpMap` | Texture | `null` | Bump map; ignored if `normalMap` set |
| `bumpScale` | number | `1` | Bump intensity `[0,1]` |
| `normalMap` | Texture | `null` | Normal map |
| `normalMapType` | Constant | `TangentSpaceNormalMap` | `TangentSpaceNormalMap` or `ObjectSpaceNormalMap` |
| `normalScale` | Vector2 | `(1,1)` | Normal map influence `[0,1]` |
| `displacementMap` | Texture | `null` | Vertex displacement texture |
| `displacementScale` | number | `0` | Displacement intensity |
| `displacementBias` | number | `0` | Displacement offset |
| `emissive` | Color | `(0,0,0)` | Emissive color, unaffected by lighting |
| `emissiveIntensity` | number | `1` | Emissive brightness |
| `emissiveMap` | Texture | `null` | Emissive map |
| `envMap` | Texture | `null` | Environment map (pre-process with `PMREMGenerator`) |
| `envMapIntensity` | number | `1` | Environment map scale |
| `envMapRotation` | Euler | `(0,0,0)` | Environment map rotation |
| `lightMap` | Texture | `null` | Baked light map; requires second UV set |
| `lightMapIntensity` | number | `1` | Baked light intensity |
| `flatShading` | boolean | `false` | Enable flat shading |
| `fog` | boolean | `true` | Affected by fog |
| `wireframe` | boolean | `false` | Render as wireframe |
| `wireframeLinecap` | string | `'round'` | Wireframe end style (SVGRenderer only) |
| `wireframeLinejoin` | string | `'round'` | Wireframe joint style (SVGRenderer only) |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (SVGRenderer only) |
| `isMeshStandardMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- More expensive per-pixel than `MeshLambertMaterial` or `MeshPhongMaterial`
- Always specify an `envMap` for physically correct results
- Base class for [MeshPhysicalMaterial](./mesh-physical-material.md)
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [MeshPhysicalMaterial](./mesh-physical-material.md)
- [MeshPhongMaterial](./mesh-phong-material.md)
- [MeshStandardNodeMaterial](./node-materials.md)
