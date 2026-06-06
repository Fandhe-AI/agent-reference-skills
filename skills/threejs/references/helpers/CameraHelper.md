# CameraHelper

Visualizes a camera's frustum as colored line segments. Useful for debugging camera positioning and clipping planes.

## Signature / Usage

```js
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
const helper = new THREE.CameraHelper(camera);
scene.add(helper);

// Call after any camera transform or projection change
helper.update();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `camera` | `Camera` | The camera to visualize |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.camera` | `Camera` | The camera being visualized |
| `.pointMap` | `Object.<string, Array.<number>>` | Internal point indices used to draw the frustum lines |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.update()` | `()` | Recalculates the frustum from the camera's projection matrix |
| `.setColors()` | `(frustum, cone, up, target, cross: Color) → CameraHelper` | Override individual line colors |
| `.dispose()` | `()` | Frees GPU-related resources |

## Notes

- Must be added to the scene (not as a child of the camera) to render correctly.
- Call `.update()` whenever the camera's projection matrix or transform changes.

## Related

- [AxesHelper](./AxesHelper.md)
- [DirectionalLightHelper](./DirectionalLightHelper.md)
