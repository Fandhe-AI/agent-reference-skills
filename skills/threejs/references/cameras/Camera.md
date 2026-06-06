# Camera

Abstract base class for all Three.js cameras. Not instantiated directly — extend it when building a custom camera type.

## Inheritance

`EventDispatcher` → `Object3D` → `Camera`

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `coordinateSystem` | `WebGLCoordinateSystem \| WebGPUCoordinateSystem` | — | The coordinate system in which the camera operates |
| `isCamera` | `boolean` (readonly) | `true` | Type-testing flag |
| `matrixWorldInverse` | `Matrix4` | — | Inverse of the camera's world matrix |
| `projectionMatrix` | `Matrix4` | — | The camera's projection matrix |
| `projectionMatrixInverse` | `Matrix4` | — | Inverse of the projection matrix |
| `reversedDepth` | `boolean` | `false` | Whether the camera uses a reversed depth buffer |

## Methods

### `getWorldDirection(target: Vector3): Vector3`

Returns a `Vector3` representing the camera's look direction in world space. Cameras look down their local **negative z-axis** by default.

## Notes

- This class overrides `Object3D.getWorldDirection()` because cameras face the negative z-axis rather than positive z.
- All concrete camera classes (`PerspectiveCamera`, `OrthographicCamera`, etc.) inherit from this class.

## Related

- [PerspectiveCamera](./PerspectiveCamera.md)
- [OrthographicCamera](./OrthographicCamera.md)
- [ArrayCamera](./ArrayCamera.md)
- [CubeCamera](./CubeCamera.md)
- [StereoCamera](./StereoCamera.md)
