# SpotLightHelper

Displays a cone-shaped wireframe visualizing the shape and direction of a `SpotLight`.

## Signature / Usage

```js
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(10, 10, 10);
scene.add(spotLight);

const helper = new THREE.SpotLightHelper(spotLight);
scene.add(helper);

// After transforming the light or its target:
helper.update();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `light` | `SpotLight` | — | The light to visualize |
| `color` | `number \| Color \| string` | (light color) | Override color; defaults to the light's color |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.light` | `SpotLight` | The light being visualized |
| `.color` | `number \| Color \| string` | The override color, if set |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.update()` | `()` | Syncs the cone shape with the current light angle and target |
| `.dispose()` | `()` | Frees GPU-related resources |

## Notes

- Call `.update()` whenever the spot light, its target, or its `angle`/`penumbra` properties change.

## Related

- [SpotLight](../lights/SpotLight.md)
- [DirectionalLightHelper](./DirectionalLightHelper.md)
- [PointLightHelper](./PointLightHelper.md)
