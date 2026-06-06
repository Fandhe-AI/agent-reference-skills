# StereoCamera

A dual-camera setup that uses two `PerspectiveCamera` instances for stereoscopic rendering effects such as anaglyph 3D or parallax barrier displays.

## Signature / Usage

```js
const stereoCamera = new THREE.StereoCamera();
stereoCamera.eyeSep = 0.064;
stereoCamera.update(camera); // camera is a PerspectiveCamera
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aspect` | `number` | `1` | Aspect ratio |
| `eyeSep` | `number` | `0.064` | Eye separation distance (in world units) between left and right cameras |
| `cameraL` | `PerspectiveCamera` | — | Left eye camera, added to layer 1 |
| `cameraR` | `PerspectiveCamera` | — | Right eye camera, added to layer 2 |
| `type` | `string` (readonly) | — | Object type identifier |

## Methods

### `update(camera: PerspectiveCamera)`

Updates the left and right sub-cameras based on the given `PerspectiveCamera`.

## Notes

- Objects visible to the left eye must be added to **layer 1**; objects for the right eye to **layer 2**.
- `eyeSep` affects the perceived depth of the stereoscopic effect.

## Related

- [Camera](./Camera.md)
- [PerspectiveCamera](./PerspectiveCamera.md)
