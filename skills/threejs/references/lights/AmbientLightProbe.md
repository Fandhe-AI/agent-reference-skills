# AmbientLightProbe

A light probe variant that approximates uniform ambient indirect lighting using spherical harmonics, instead of emitting light directly. Extends [LightProbe](./LightProbe.md).

## Signature / Usage

```js
const lightProbe = new THREE.AmbientLightProbe('lightskyblue', 1);
scene.add(lightProbe);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0x000000` | The ambient light color encoded into spherical harmonics |
| `intensity` | `number` | `1` | The light probe's strength |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.isAmbientLightProbe` | `boolean` (readonly) | Always `true`; use for type testing |
| `.sh` | `SphericalHarmonics3` | Spherical harmonics encoding the lighting information (inherited from LightProbe) |

## Notes

- Does not emit light directly; provides indirect-lighting approximation via spherical harmonics.
- Typically used alongside [LightProbeGenerator](https://threejs.org/docs/pages/LightProbeGenerator.html) to bake environment map lighting.
- Unlike `AmbientLight`, position does not matter.

## Related

- [LightProbe](./LightProbe.md)
- [HemisphereLightProbe](./HemisphereLightProbe.md)
- [AmbientLight](./AmbientLight.md)
