# HemisphereLightProbe

A light probe variant that approximates hemisphere indirect lighting (sky color from above, ground color from below) using spherical harmonics. Extends [LightProbe](./LightProbe.md).

## Signature / Usage

```js
const lightProbe = new THREE.HemisphereLightProbe('lightskyblue', 'saddlebrown', 1);
scene.add(lightProbe);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `skyColor` | `number \| Color \| string` | `0x000000` | The sky (upper hemisphere) color |
| `groundColor` | `number \| Color \| string` | `0x000000` | The ground (lower hemisphere) color |
| `intensity` | `number` | `1` | The light probe's strength |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.isHemisphereLightProbe` | `boolean` (readonly) | Always `true`; use for type testing |
| `.sh` | `SphericalHarmonics3` | Spherical harmonics encoding the lighting information (inherited from LightProbe) |

## Notes

- Does not emit light directly; encodes hemisphere lighting into spherical harmonics coefficients.
- More accurate indirect lighting alternative to `HemisphereLight` when combined with PBR materials.

## Related

- [LightProbe](./LightProbe.md)
- [AmbientLightProbe](./AmbientLightProbe.md)
- [HemisphereLight](./HemisphereLight.md)
