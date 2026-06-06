# WebXRDepthSensing

Provides access to the WebXR Depth Sensing API within three.js. Used internally by `WebXRManager` to expose depth data from the user's physical environment during AR sessions.

## Properties

| Name | Type | Description |
|------|------|-------------|
| `depthNear` | number | The near plane value for depth sensing. |
| `depthFar` | number | The far plane value for depth sensing. |
| `texture` | ExternalTexture | Opaque texture representing the depth of the user's environment. |
| `mesh` | Mesh | A plane mesh for visualizing the depth texture. |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getDepthTexture()` | `ExternalTexture` | Returns the depth texture from the current XR session. |
| `getMesh(cameraXR)` | `Mesh` | Returns a visualization mesh for the depth texture. Requires an `ArrayCamera` as argument. |
| `init(depthData, renderState)` | void | Initialize the depth sensing module with XR depth data and render state. |
| `reset()` | void | Reset the depth sensing module state. |

## Notes

- Not instantiated directly. Access via `renderer.xr` depth sensing helpers (`hasDepthSensing()`, `getDepthTexture()`, `getDepthSensingMesh()`).
- Requires the WebXR session to be started with depth sensing features enabled.

## Related

- [WebXRManager](./WebXRManager.md)
