# PointLight

Emits light in all directions from a single point, like a bare light bulb. Can cast shadows.

## Signature / Usage

```js
const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `number \| Color \| string` | `0xffffff` | The light's color |
| `intensity` | `number` | `1` | Strength in candela (cd) |
| `distance` | `number` | `0` | Maximum range; `0` = no limit (inverse-square law) |
| `decay` | `number` | `2` | How fast light dims with distance |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.decay` | `number` | Light attenuation along distance |
| `.distance` | `number` | Cutoff range; `0` means infinite |
| `.isPointLight` | `boolean` (readonly) | Always `true`; use for type testing |
| `.power` | `number` | Luminous power in lumens (lm); changing also updates `.intensity` |
| `.shadow` | `PointLightShadow` | Shadow configuration |

## Notes

- Keep `decay` at `2` for physically correct rendering.
- Non-zero `distance` is not physically accurate but can be useful for performance.

## Related

- [Light](./Light.md)
- [SpotLight](./SpotLight.md)
- [PointLightHelper](../helpers/PointLightHelper.md)
