# PerspectiveCamera

The most common camera for 3D scenes. Uses perspective projection to mimic human vision, where objects appear smaller as they get farther away.

## Signature / Usage

```js
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
scene.add(camera);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fov` | `number` | `50` | Vertical field of view in degrees |
| `aspect` | `number` | `1` | Aspect ratio (usually canvas width / height) |
| `near` | `number` | `0.1` | Near clipping plane (must be > 0) |
| `far` | `number` | `2000` | Far clipping plane (must be > near) |
| `zoom` | `number` | `1` | Zoom factor |
| `focus` | `number` | `10` | Object distance used for stereoscopy / depth-of-field |
| `filmGauge` | `number` | `35` | Film size in millimeters (used with `setFocalLength`) |
| `filmOffset` | `number` | `0` | Horizontal off-center offset in millimeters |
| `view` | `Object \| null` | `null` | Frustum window specification; set via `setViewOffset()` |
| `isPerspectiveCamera` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `updateProjectionMatrix()` | `void` | Must be called after any property change |
| `getEffectiveFOV()` | `number` | Vertical FOV in degrees considering current `zoom` |
| `setFocalLength(focalLength)` | `void` | Sets `fov` from a focal length (based on `filmGauge`) |
| `getFocalLength()` | `number` | Returns focal length computed from `fov` and `filmGauge` |
| `getFilmWidth()` | `number` | Returns film width based on `filmGauge` and `aspect` |
| `getFilmHeight()` | `number` | Returns film height based on `filmGauge` |
| `getViewBounds(distance, minTarget, maxTarget)` | `void` | Computes 2D bounds of the viewable rectangle at a given distance |
| `getViewSize(distance, target)` | `Vector2` | Returns width and height of the viewable rectangle at a distance |
| `setViewOffset(fullWidth, fullHeight, x, y, width, height)` | `void` | Sets a frustum offset for multi-window / multi-display setups |
| `clearViewOffset()` | `void` | Removes the view offset from the projection matrix |

## Notes

- Call `updateProjectionMatrix()` after changing `fov`, `aspect`, `near`, or `far`.
- When the canvas is resized, update `camera.aspect` and call `updateProjectionMatrix()`.

## Related

- [Camera](./Camera.md)
- [OrthographicCamera](./OrthographicCamera.md)
- [ArrayCamera](./ArrayCamera.md)
