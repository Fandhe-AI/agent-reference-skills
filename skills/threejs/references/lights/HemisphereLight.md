# HemisphereLight

A light positioned above the scene that fades from a sky color (top) to a ground color (bottom). Cannot cast shadows.

## Signature / Usage

```js
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `skyColor` | `number \| Color \| string` | `0xffffff` | Color from the upper hemisphere |
| `groundColor` | `number \| Color \| string` | `0xffffff` | Color from the lower hemisphere |
| `intensity` | `number` | `1` | The light's strength/intensity |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.groundColor` | `Color` | The light's ground color |
| `.isHemisphereLight` | `boolean` (readonly) | Always `true`; use for type testing |

Inherits `.color` (sky color) and `.intensity` from [Light](./Light.md).

## Notes

- Cannot cast shadows.
- Useful for outdoor scenes as a natural-looking ambient fill without harsh directionality.

## Related

- [Light](./Light.md)
- [AmbientLight](./AmbientLight.md)
- [HemisphereLightProbe](./HemisphereLightProbe.md)
- [HemisphereLightHelper](../helpers/HemisphereLightHelper.md)
