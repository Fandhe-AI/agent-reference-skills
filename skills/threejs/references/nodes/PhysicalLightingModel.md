# PhysicalLightingModel

Lighting model for PBR (physically based rendering) materials, e.g. `MeshPhysicalNodeMaterial`. Extends `LightingModel`.

## Signature / Usage

```js
class PhysicalLightingModel extends LightingModel {
	constructor(
		clearcoat = false,
		sheen = false,
		iridescence = false,
		anisotropy = false,
		transmission = false,
		dispersion = false,
		retroreflection = false
	) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `clearcoat` | `boolean` | `false` | Whether clearcoat is supported |
| `sheen` | `boolean` | `false` | Whether sheen is supported |
| `iridescence` | `boolean` | `false` | Whether iridescence is supported |
| `anisotropy` | `boolean` | `false` | Whether anisotropy is supported |
| `transmission` | `boolean` | `false` | Whether transmission is supported |
| `dispersion` | `boolean` | `false` | Whether dispersion is supported |
| `retroreflection` | `boolean` | `false` | Whether retroreflection is supported (7th constructor argument, r186) |
| `dfg` | `Node` | `null` | The sampled DFG LUT value, shared by the direct and indirect lighting paths |
| `multiScatteringCompensation` | `Node` | `null` | Multi-scattering energy compensation for direct lighting |
| `clearcoatRadiance` / `clearcoatSpecularDirect` / `clearcoatSpecularIndirect` | `Node` | — | Clearcoat lighting terms |
| `iridescenceF0Dielectric` / `iridescenceF0Metallic` / `iridescenceFresnel` | `Node` | — | Iridescence terms |
| `sheenSpecularDirect` / `sheenSpecularIndirect` | `Node` | — | Sheen lighting terms |

## Methods

| Method | Description |
|--------|-------------|
| `start(builder)` | Prepares node variables for lighting computations |
| `direct(lightData, builder)` / `directRectArea(input, builder)` | Direct lighting terms |
| `indirect(builder)` / `indirectDiffuse(builder)` / `indirectSpecular(builder)` | Indirect lighting terms |
| `ambientOcclusion(builder)` | Ambient occlusion term |
| `finish(builder)` | Final lighting accumulation |

## Notes

- `iridescenceF0` is removed in r186: it is absent from the r186 docs, which list only `iridescenceF0Dielectric`, `iridescenceF0Metallic` and `iridescenceFresnel` (r184 listed `iridescenceF0`).

## Related

- [LightingModel](./LightingModel.md)
