# ArrayCamera

A camera that contains an array of sub-cameras (`PerspectiveCamera`) for efficiently rendering a scene multiple times per frame. Primarily used for VR rendering.

## Signature / Usage

```js
const cameras = [
  new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000),
  new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000),
];
cameras[0].viewport = new THREE.Vector4(0, 0, window.innerWidth / 2, window.innerHeight);
cameras[1].viewport = new THREE.Vector4(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);

const arrayCamera = new THREE.ArrayCamera(cameras);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cameras` | `Array<PerspectiveCamera>` | `[]` | Array of perspective sub-cameras; each must have a `viewport` property |
| `isArrayCamera` | `boolean` (readonly) | `true` | Type-testing flag |
| `isMultiViewCamera` | `boolean` (readonly) | `false` | Whether the camera uses multiview rendering |

## Notes

- Each sub-camera must have a `viewport` (`Vector4`) set to define which portion of the output it renders to.
- Inherits from `PerspectiveCamera`, which inherits from `Camera`.

## Related

- [Camera](./Camera.md)
- [PerspectiveCamera](./PerspectiveCamera.md)
