# PointLightHelper

Displays a sphere mesh at the position of a `PointLight` for scene debugging.

## Signature / Usage

```js
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const helper = new THREE.PointLightHelper(pointLight, 1);
scene.add(helper);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `light` | `PointLight` | — | The light to visualize |
| `sphereSize` | `number` | `1` | Radius of the sphere mesh |
| `color` | `number \| Color \| string` | (light color) | Override color; defaults to the light's color |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.light` | `PointLight` | The light being visualized |
| `.color` | `number \| Color \| string` | The override color, if set |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.update()` | `()` | Syncs the helper position with the light |
| `.dispose()` | `()` | Frees GPU-related resources |

## Related

- [PointLight](../lights/PointLight.md)
- [SpotLightHelper](./SpotLightHelper.md)
- [DirectionalLightHelper](./DirectionalLightHelper.md)
