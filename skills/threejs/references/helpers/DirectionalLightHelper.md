# DirectionalLightHelper

Visualizes a `DirectionalLight` as a plane and a target line showing the light's position and direction.

## Signature / Usage

```js
const light = new THREE.DirectionalLight(0xffffff);
scene.add(light);

const helper = new THREE.DirectionalLightHelper(light, 5);
scene.add(helper);

// After transforming the light or its target:
helper.update();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `light` | `DirectionalLight` | — | The light to visualize |
| `size` | `number` | `1` | Size of the plane mesh |
| `color` | `number \| Color \| string` | (light color) | Override color; defaults to the light's color |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.light` | `DirectionalLight` | The light being visualized |
| `.lightPlane` | `Line` | The plane line showing the light's location |
| `.targetLine` | `Line` | The line pointing toward the light target |
| `.color` | `number \| Color \| string` | The override color, if set |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.update()` | `()` | Syncs the helper with the current light position and direction |
| `.dispose()` | `()` | Frees GPU-related resources |

## Notes

- Call `.update()` whenever the light, its target, or light properties change.

## Related

- [DirectionalLight](../lights/DirectionalLight.md)
- [SpotLightHelper](./SpotLightHelper.md)
- [PointLightHelper](./PointLightHelper.md)
- [HemisphereLightHelper](./HemisphereLightHelper.md)
