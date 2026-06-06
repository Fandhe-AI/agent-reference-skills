# MeshLambertMaterial

A non-shiny material using Lambertian reflectance — no specular highlights. Good balance of performance and quality for matte surfaces such as untreated wood or stone.

## Signature / Usage

```js
const material = new THREE.MeshLambertMaterial({
  color: 0x8888ff,
  emissive: 0x000000,
  map: colorTexture,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(1,1,1)` | Material color |
| `map` | Texture | `null` | Color/diffuse map; may include alpha channel |
| `alphaMap` | Texture | `null` | Grayscale opacity map |
| `aoMap` | Texture | `null` | Ambient occlusion map (red channel); requires second UV set |
| `aoMapIntensity` | number | `1` | AO intensity `[0,1]` |
| `bumpMap` | Texture | `null` | Bump map for perceived depth; ignored if `normalMap` set |
| `bumpScale` | number | `1` | Bump intensity `[0,1]` |
| `normalMap` | Texture | `null` | Normal map; does not change actual geometry |
| `normalMapType` | Constant | `TangentSpaceNormalMap` | `TangentSpaceNormalMap` or `ObjectSpaceNormalMap` |
| `normalScale` | Vector2 | `(1,1)` | Normal map influence `[0,1]` |
| `displacementMap` | Texture | `null` | Vertex displacement; displaced vertices cast shadows |
| `displacementScale` | number | `0` | Displacement intensity |
| `displacementBias` | number | `0` | Displacement offset |
| `emissive` | Color | `(0,0,0)` | Emissive color, unaffected by lighting |
| `emissiveIntensity` | number | `1` | Emissive brightness |
| `emissiveMap` | Texture | `null` | Emissive map |
| `envMap` | Texture | `null` | Environment map |
| `envMapIntensity` | number | `1` | Environment map scale |
| `envMapRotation` | Euler | `(0,0,0)` | Environment map rotation |
| `combine` | Constant | `MultiplyOperation` | How surface color combines with env map |
| `reflectivity` | number | `1` | Env map effect strength `[0,1]` |
| `refractionRatio` | number | `0.98` | IOR ratio for refraction mapping |
| `lightMap` | Texture | `null` | Baked light map; requires second UV set |
| `lightMapIntensity` | number | `1` | Baked light intensity |
| `specularMap` | Texture | `null` | Specular map |
| `flatShading` | boolean | `false` | Enable flat shading |
| `fog` | boolean | `true` | Affected by fog |
| `wireframe` | boolean | `false` | Render as wireframe |
| `wireframeLinecap` | string | `'round'` | Wireframe end style (SVGRenderer only) |
| `wireframeLinejoin` | string | `'round'` | Wireframe joint style (SVGRenderer only) |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (SVGRenderer only) |
| `isMeshLambertMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Non-physically based; better performance than `MeshPhongMaterial` or `MeshStandardMaterial`
- Does not produce specular highlights
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [MeshBasicMaterial](./mesh-basic-material.md)
- [MeshPhongMaterial](./mesh-phong-material.md)
- [MeshStandardMaterial](./mesh-standard-material.md)
