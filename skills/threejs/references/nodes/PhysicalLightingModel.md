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
		dispersion = false
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
| `clearcoatRadiance` / `clearcoatSpecularDirect` / `clearcoatSpecularIndirect` | `Node` | — | Clearcoat lighting terms |
| `iridescenceF0` / `iridescenceF0Dielectric` / `iridescenceF0Metallic` / `iridescenceFresnel` | `Node` | — | Iridescence terms |
| `sheenSpecularDirect` / `sheenSpecularIndirect` | `Node` | — | Sheen lighting terms |

## Methods

| Method | Description |
|--------|-------------|
| `start(builder)` | Prepares node variables for lighting computations |
| `direct(lightData, builder)` / `directRectArea(input, builder)` | Direct lighting terms |
| `indirect(builder)` / `indirectDiffuse(builder)` / `indirectSpecular(builder)` | Indirect lighting terms |
| `ambientOcclusion(builder)` | Ambient occlusion term |
| `finish(builder)` | Final lighting accumulation |

## Related

- [LightingModel](./LightingModel.md)
