# FrustumArray

FrustumArray is used to determine if an object is visible in at least one camera from an array of cameras. This is particularly useful for multi-view renderers.

## Signature / Usage

```js
const frustumArray = new THREE.FrustumArray();
frustumArray.setFromArrayCamera( cameraArray ); // must be called once per render
const visible = frustumArray.intersectsObject( object );
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| coordinateSystem | WebGLCoordinateSystem \| WebGPUCoordinateSystem | The coordinate system to use. Default is `WebGLCoordinateSystem`. |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `setFromArrayCamera(cameraArray: ArrayCamera)` | FrustumArray | Computes and caches a frustum for each camera of the given array camera. |
| `containsPoint(point: Vector3)` | boolean | `true` if the point lies within any cached frustum. |
| `intersectsBox(box: Box3)` | boolean | `true` if the bounding box intersects any cached frustum. |
| `intersectsObject(object: Object3D)` | boolean | `true` if the object's bounding sphere intersects any cached frustum. |
| `intersectsSphere(sphere: Sphere)` | boolean | `true` if the bounding sphere intersects any cached frustum. |
| `intersectsSprite(sprite: Sprite)` | boolean | `true` if the sprite intersects any cached frustum. |
| `clone()` | FrustumArray | Returns a new frustum array with copied values. |
| `copy(source: FrustumArray)` | FrustumArray | Copies the values of the given frustum array to this instance. |

## Notes

- `setFromArrayCamera` must be called once per render before `containsPoint` / `intersectsBox` / `intersectsObject` / `intersectsSphere` / `intersectsSprite`.
- Source: `src/math/FrustumArray.js`. Official docs: https://threejs.org/docs/pages/FrustumArray.html

## Related

- [Frustum.md](./Frustum.md)
- [Sphere.md](./Sphere.md)
- [Box3.md](./Box3.md)
