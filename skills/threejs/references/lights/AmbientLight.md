# AmbientLight

Globally illuminates all objects in the scene equally, with no direction. Cannot cast shadows.

## Signature / Usage

```js
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0xffffff` | The light's color |
| `intensity` | `number` | `1` | The light's strength/intensity |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.isAmbientLight` | `boolean` (readonly) | Always `true`; use for type testing |

Inherits `.color` and `.intensity` from [Light](./Light.md).

## Notes

- Has no direction, so it cannot cast shadows.
- Affects all objects uniformly regardless of position or orientation.

## Related

- [Light](./Light.md)
- [HemisphereLight](./HemisphereLight.md)
- [AmbientLightProbe](./AmbientLightProbe.md)
