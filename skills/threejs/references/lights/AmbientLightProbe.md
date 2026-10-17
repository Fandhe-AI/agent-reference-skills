# AmbientLightProbe

**Removed in r157** (PR https://github.com/mrdoob/three.js/pull/26715, "Remove AmbientLightProbe, HemisphereLightProbe"). Kept here as a legacy page for code written against r156 or earlier; it does not exist in r186. Use [LightProbe](./LightProbe.md) with `LightProbeGenerator` instead.

A light probe variant that approximated uniform ambient indirect lighting using spherical harmonics, instead of emitting light directly. Extended [LightProbe](./LightProbe.md).

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

- Removed in r157 (https://github.com/mrdoob/three.js/pull/26715): the file exists at r156 and is gone at r157; it is also absent from the r186 docs index. Use `LightProbe` (set `.sh` directly or via `LightProbeGenerator`).
- Does not emit light directly; provides indirect-lighting approximation via spherical harmonics.
- Typically used alongside [LightProbeGenerator](https://threejs.org/docs/pages/LightProbeGenerator.html) to bake environment map lighting.
- Unlike `AmbientLight`, position does not matter.

## Related

- [LightProbe](./LightProbe.md)
- [HemisphereLightProbe](./HemisphereLightProbe.md)
- [AmbientLight](./AmbientLight.md)
