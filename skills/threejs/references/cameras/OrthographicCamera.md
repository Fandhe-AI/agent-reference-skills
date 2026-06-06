# OrthographicCamera

A camera using orthographic projection. Objects appear the same size regardless of distance from the camera. Useful for 2D scenes and UI elements.

## Signature / Usage

```js
const camera = new THREE.OrthographicCamera(
  width / -2, width / 2,
  height / 2, height / -2,
  1, 1000
);
scene.add(camera);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `left` | `number` | `-1` | Left plane of the frustum |
| `right` | `number` | `1` | Right plane of the frustum |
| `top` | `number` | `1` | Top plane of the frustum |
| `bottom` | `number` | `-1` | Bottom plane of the frustum |
| `near` | `number` | `0.1` | Near clipping plane (can be `0`) |
| `far` | `number` | `2000` | Far clipping plane (must be > near) |
| `zoom` | `number` | `1` | Zoom factor |
| `view` | `Object \| null` | `null` | Frustum window specification; set via `setViewOffset()` |
| `isOrthographicCamera` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `updateProjectionMatrix()` | `void` | Must be called after any property change |
| `setViewOffset(fullWidth, fullHeight, x, y, width, height)` | `void` | Sets a frustum offset for multi-window / multi-display setups |
| `clearViewOffset()` | `void` | Removes the view offset from the projection matrix |

## Notes

- Call `updateProjectionMatrix()` after changing any frustum property.
- Unlike `PerspectiveCamera`, `near` can be `0` for orthographic cameras.

## Related

- [Camera](./Camera.md)
- [PerspectiveCamera](./PerspectiveCamera.md)
