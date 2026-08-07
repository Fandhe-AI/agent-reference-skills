# IESSpotLight

An IES (Illuminating Engineering Society) version of `SpotLight`. Can only be used with `WebGPURenderer`.

## Signature / Usage

```js
const light = new THREE.IESSpotLight(0xffffff, 1);
light.iesMap = iesTexture;
scene.add(light);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0xffffff` | The light's color |
| `intensity` | `number` | `1` | Strength/intensity in candela (cd) |
| `distance` | `number` | `0` | Maximum range of the light; `0` means no limit |
| `angle` | `number` | `Math.PI/3` | Maximum angle of light dispersion from its direction (upper bound `Math.PI/2`) |
| `penumbra` | `number` | `0` | Percent of the cone attenuated due to penumbra, range `[0, 1]` |
| `decay` | `number` | `2` | Amount the light dims along the distance of the light |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `.iesMap` | `Texture` | `null` | Lookup table storing normalized attenuation factors (0.0-1.0) representing the light's intensity at a specific angle |

## Notes

- Inheritance chain: `EventDispatcher` → `Object3D` → `Light` → `SpotLight` → `IESSpotLight`.
- WebGPU only: requires `WebGPURenderer`; not usable with `WebGLRenderer`.

## Related

- [SpotLight](./SpotLight.md)
- [ProjectorLight](./ProjectorLight.md)
