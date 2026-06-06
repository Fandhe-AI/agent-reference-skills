# LightProbe

Stores information about light passing through 3D space using spherical harmonics, rather than emitting light directly. Approximates diffuse indirect lighting and is functionally equivalent to an irradiance environment map.

## Signature / Usage

```js
// Typically created via LightProbeGenerator from an environment map
import { LightProbeGenerator } from 'three/addons/lights/LightProbeGenerator.js';

const lightProbe = LightProbeGenerator.fromCubeTexture(cubeTexture);
scene.add(lightProbe);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sh` | `SphericalHarmonics3` | — | Spherical harmonics encoding the lighting data |
| `intensity` | `number` | `1` | The light probe's strength |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.sh` | `SphericalHarmonics3` | The spherical harmonics encoding lighting information |
| `.isLightProbe` | `boolean` (readonly) | Always `true`; use for type testing |

## Notes

- Does not emit visible light — used to influence shading calculations on PBR materials.
- Usually created from an HDR environment map via `LightProbeGenerator`.
- Can be used for AR/VR content to approximate real-world lighting conditions.

## Related

- [Light](./Light.md)
- [AmbientLightProbe](./AmbientLightProbe.md)
- [HemisphereLightProbe](./HemisphereLightProbe.md)
