# MeshBasicMaterial

A material for rendering geometry with a simple flat color. Not affected by lights.

## Signature / Usage

```js
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  map: texture,
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, material);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(1,1,1)` | Material color; modulated by `map` if set |
| `map` | Texture | `null` | Color map; may include alpha channel |
| `alphaMap` | Texture | `null` | Grayscale opacity map (black = transparent, white = opaque) |
| `aoMap` | Texture | `null` | Ambient occlusion map (red channel); requires second UV set |
| `aoMapIntensity` | number | `1` | AO effect intensity `[0,1]` |
| `envMap` | Texture | `null` | Environment map |
| `envMapRotation` | Euler | `(0,0,0)` | Environment map rotation in radians |
| `combine` | Constant | `MultiplyOperation` | How to combine surface color with env map |
| `reflectivity` | number | `1` | Environment map effect strength `[0,1]` |
| `refractionRatio` | number | `0.98` | IOR(air)/IOR(material) for refraction mapping |
| `lightMap` | Texture | `null` | Baked light map; requires second UV set |
| `lightMapIntensity` | number | `1` | Baked light intensity |
| `specularMap` | Texture | `null` | Specular map |
| `fog` | boolean | `true` | Whether material is affected by fog |
| `wireframe` | boolean | `false` | Render geometry as wireframe |
| `wireframeLinecap` | string | `'round'` | Wireframe end style (SVGRenderer only) |
| `wireframeLinejoin` | string | `'round'` | Wireframe joint style (SVGRenderer only) |
| `wireframeLinewidth` | number | `1` | Wireframe thickness (SVGRenderer only) |
| `isMeshBasicMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Does **not** respond to lights — use for unlit objects, overlays, or wireframes
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [MeshLambertMaterial](./mesh-lambert-material.md)
- [MeshStandardMaterial](./mesh-standard-material.md)
- [MeshBasicNodeMaterial](./node-materials.md)
