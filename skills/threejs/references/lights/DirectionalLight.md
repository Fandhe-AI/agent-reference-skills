# DirectionalLight

Emits light in a specific direction as if from an infinitely distant source (parallel rays). Commonly used to simulate sunlight. Can cast shadows.

## Signature / Usage

```js
const light = new THREE.DirectionalLight(0xffffff, 0.5);
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
| `.isDirectionalLight` | `boolean` (readonly) | Always `true`; use for type testing |
| `.shadow` | `DirectionalLightShadow` | Shadow configuration |
| `.target` | `Object3D` | The point the light points toward. Light direction = `position → target.position`. Must be added to scene to change from default |

## Notes

- Direction is computed from `.position` to `.target.position`; setting `.rotation` has no effect.
- To move the target: `scene.add(light.target); light.target.position.set(x, y, z);`
- See `DirectionalLightShadow` for shadow camera frustum configuration.

## Related

- [Light](./Light.md)
- [SpotLight](./SpotLight.md)
- [DirectionalLightHelper](../helpers/DirectionalLightHelper.md)
