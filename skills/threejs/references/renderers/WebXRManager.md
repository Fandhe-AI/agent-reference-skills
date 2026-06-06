# WebXRManager

Abstracts the WebXR Device API for use inside `WebGLRenderer`. Accessed via `renderer.xr`. Manages XR sessions, cameras, controllers, and frame rendering.

## Signature / Usage

```js
// Enable XR on the renderer
renderer.xr.enabled = true;

// Add VR button
document.body.appendChild(VRButton.createButton(renderer));

// Get controllers
const controller = renderer.xr.getController(0);
scene.add(controller);

// In animation loop
renderer.xr.getCamera(); // returns ArrayCamera with per-eye views
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `false` | Set `true` to notify the renderer to prepare for XR rendering. |
| `isPresenting` | boolean (readonly) | `false` | Whether an XR session is currently active. |
| `cameraAutoUpdate` | boolean | `true` | Whether the XR camera is automatically updated each frame. |

## Methods

### Session Management

| Method | Returns | Description |
|--------|---------|-------------|
| `setSession(session)` | `Promise` | Inject an XR session to begin XR rendering. |
| `getSession()` | `XRSession \| null` | Returns the current XR session, or `null` if not in session. |
| `getReferenceSpace()` | `XRReferenceSpace` | Returns the current XR reference space. |
| `setReferenceSpaceType(type)` | void | Set spatial relationship. Default: `'local-floor'`. |

### Camera & Frame

| Method | Returns | Description |
|--------|---------|-------------|
| `getCamera()` | `ArrayCamera` | Returns the XR camera with per-view sub-cameras for each eye. |
| `getFrame()` | `XRFrame` | Returns the current XR frame (valid only inside animation loop). |
| `updateCamera(camera)` | void | Manually update XR camera state. Use when `cameraAutoUpdate` is `false`. |

### Controllers

| Method | Returns | Description |
|--------|---------|-------------|
| `getController(index)` | `Group` | Returns the `target ray` space Group for pointer/selection tasks. |
| `getControllerGrip(index)` | `Group` | Returns the `grip` space Group for attaching hand-held 3D objects. |
| `getHand(index)` | `Group` | Returns the `hand` space Group for hand tracking. |

### Rendering

| Method | Returns | Description |
|--------|---------|-------------|
| `getBaseLayer()` | `XRWebGLLayer \| XRProjectionLayer` | Returns the current XR base layer. |
| `getBinding()` | `XRWebGLBinding` | Returns the XR WebGL binding (creates one if needed). |
| `setFramebufferScaleFactor(value)` | void | Set framebuffer scale factor for resolution control. |
| `setFoveation(value)` | void | Set foveation level (0 = disabled, 1 = maximum). |
| `getFoveation()` | `number \| undefined` | Get current foveation level. |

### Depth Sensing

| Method | Returns | Description |
|--------|---------|-------------|
| `hasDepthSensing()` | boolean | Check if depth sensing is supported in current session. |
| `getDepthTexture()` | `Texture` | Returns the depth sensing texture. |
| `getDepthSensingMesh()` | `Mesh` | Returns the depth sensing visualization mesh. |

### Other

| Method | Returns | Description |
|--------|---------|-------------|
| `getEnvironmentBlendMode()` | `'opaque' \| 'additive' \| 'alpha-blend' \| undefined` | Returns blend mode of current XR session. |
| `getCameraTexture(xrCamera)` | `Texture` | Returns opaque texture from XR camera (call inside animation loop only). |

## Notes

- Access via `renderer.xr` — do not instantiate directly.
- Set `renderer.xr.enabled = true` before starting an XR session.
- Always use `renderer.setAnimationLoop(callback)` instead of `requestAnimationFrame` when XR is enabled.
- `getController(0)` / `getController(1)` return target-ray spaces; use `getControllerGrip` for attaching virtual objects.

## Related

- [WebGLRenderer](./WebGLRenderer.md)
- [WebXRDepthSensing](./WebXRDepthSensing.md)
