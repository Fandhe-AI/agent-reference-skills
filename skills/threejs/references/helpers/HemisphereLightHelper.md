# HemisphereLightHelper

Displays a spherical mesh to visualize the position and colors of a `HemisphereLight`.

## Signature / Usage

```js
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

const helper = new THREE.HemisphereLightHelper(light, 5);
scene.add(helper);

// After transforming or changing the light:
helper.update();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `light` | `HemisphereLight` | — | The light to visualize |
| `size` | `number` | `1` | Size of the sphere mesh |
| `color` | `number \| Color \| string` | (light color) | Override color; defaults to the light's color |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.light` | `HemisphereLight` | The light being visualized |
| `.color` | `number \| Color \| string` | The override color, if set |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.update()` | `()` | Syncs the helper with the current light state |
| `.dispose()` | `()` | Frees GPU-related resources |

## Related

- [HemisphereLight](../lights/HemisphereLight.md)
- [DirectionalLightHelper](./DirectionalLightHelper.md)
