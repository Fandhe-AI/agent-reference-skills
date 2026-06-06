# MeshPhysicalMaterial

An extension of [MeshStandardMaterial](./mesh-standard-material.md) with advanced physically based properties: clearcoat, sheen, iridescence, transmission, anisotropy, and more.

## Signature / Usage

```js
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.0,
  transmission: 1.0,   // glass-like
  ior: 1.5,
  thickness: 0.5,
});
```

## Options / Props

### Anisotropy

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `anisotropy` | number | `0` | Anisotropy strength `[0,1]` |
| `anisotropyMap` | Texture | `null` | R/G = direction, B = strength in tangent space |
| `anisotropyRotation` | number | `1` | Rotation (radians CCW from tangent) |

### Clearcoat

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `clearcoat` | number | `0` | Clearcoat intensity `[0,1]` |
| `clearcoatMap` | Texture | `null` | Clearcoat mask (red channel) |
| `clearcoatRoughness` | number | `0` | Clearcoat layer roughness `[0,1]` |
| `clearcoatRoughnessMap` | Texture | `null` | Clearcoat roughness mask (green channel) |
| `clearcoatNormalMap` | Texture | `null` | Clearcoat layer normal map |
| `clearcoatNormalScale` | Vector2 | `(1,1)` | Clearcoat normal intensity `[0,1]` |

### Iridescence

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `iridescence` | number | `0` | Iridescence intensity `[0,1]` |
| `iridescenceIOR` | number | `1.3` | Iridescence layer IOR `[1.0, 2.333]` |
| `iridescenceMap` | Texture | `null` | Iridescence mask (red channel) |
| `iridescenceThicknessMap` | Texture | `null` | Thickness map (green channel) |
| `iridescenceThicknessRange` | number[] | `[100,400]` | Min/max thickness in nm |

### Transmission & Volume

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `transmission` | number | `0` | Optical transparency `[0,1]` |
| `transmissionMap` | Texture | `null` | Transmission mask (red channel) |
| `ior` | number | `1.5` | Index of refraction `[1.0, 2.333]` |
| `thickness` | number | `0` | Volume thickness in mesh coords (0 = thin-walled) |
| `thicknessMap` | Texture | `null` | Thickness map (green channel) |
| `attenuationColor` | Color | `(1,1,1)` | Color at attenuation distance |
| `attenuationDistance` | number | `Infinity` | Average distance before light interaction |
| `dispersion` | number | `0` | Chromatic aberration (≥ 0) |

### Specular / Reflectivity

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `reflectivity` | number | `0.5` | Reflectivity `[0,1]`; non-metallic only |
| `specularIntensity` | number | `1` | Specular reflection scale `[0,1]` |
| `specularIntensityMap` | Texture | `null` | Specular intensity mask (alpha channel) |
| `specularColor` | Color | `(1,1,1)` | Specular tint at normal incidence |
| `specularColorMap` | Texture | `null` | Specular color map (RGB channels) |

### Sheen

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sheen` | number | `0` | Sheen intensity `[0,1]` |
| `sheenColor` | Color | `(0,0,0)` | Sheen tint |
| `sheenColorMap` | Texture | `null` | Sheen color map (RGB channels) |
| `sheenRoughness` | number | `1` | Sheen roughness `[0,1]` |
| `sheenRoughnessMap` | Texture | `null` | Sheen roughness map (alpha channel) |

### Metadata

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isMeshPhysicalMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Inherits all `MeshStandardMaterial` properties (color, metalness, roughness, normalMap, etc.)
- Higher per-pixel cost than other materials; most advanced effects are disabled by default
- When `transmission > 0`, set `opacity = 1`
- `reflectivity` has no effect when `metalness = 1.0`
- Always provide an `envMap` for best results
- Inherits from [MeshStandardMaterial](./mesh-standard-material.md) → [Material](./material.md)

## Related

- [MeshStandardMaterial](./mesh-standard-material.md)
- [Material](./material.md)
- [MeshPhysicalNodeMaterial](./node-materials.md)
