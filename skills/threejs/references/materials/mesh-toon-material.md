# MeshToonMaterial

A cel-shading (toon shading) material that quantises shading into discrete steps using a gradient map.

## Signature / Usage

```js
const gradientMap = new THREE.TextureLoader().load('gradients/five-tone.jpg');
gradientMap.minFilter = THREE.NearestFilter;
gradientMap.magFilter = THREE.NearestFilter;

const material = new THREE.MeshToonMaterial({
  color: 0x049ef4,
  gradientMap,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(1,1,1)` | Material color |
| `gradientMap` | Texture | `null` | Toon shading gradient; **must** have `NearestFilter` for both min/mag |
| `map` | Texture | `null` | Color/diffuse map; may include alpha |
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
| `lightMap` | Texture | `null` | Baked light map; requires second UV set |
| `lightMapIntensity` | number | `1` | Baked light intensity |
| `fog` | boolean | `true` | Affected by fog |
| `wireframe` | boolean | `false` | Render as wireframe |
| `wireframeLinecap` | string | `'round'` | Wireframe end style (SVGRenderer only) |
| `wireframeLinejoin` | string | `'round'` | Wireframe joint style (SVGRenderer only) |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (SVGRenderer only) |
| `isMeshToonMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- The `gradientMap` texture **must** use `NearestFilter` for both `minFilter` and `magFilter`; otherwise, shading steps will appear blended
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [MeshPhongMaterial](./mesh-phong-material.md)
- [MeshToonNodeMaterial](./node-materials.md)
