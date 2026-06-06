# Frustum

A view frustum defined by six `Plane` objects. Used by renderers to determine which objects lie inside the camera's field of view (frustum culling). Primarily intended for internal renderer use.

## Signature / Usage

```js
const frustum = new THREE.Frustum();
// Build from camera's projection-view matrix
frustum.setFromProjectionMatrix(
  new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  )
);

if (frustum.intersectsObject(mesh)) {
  // mesh is (potentially) visible
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| planes | Array\<Plane\> | Array of 6 planes enclosing the frustum |

## Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set(p0, p1, p2, p3, p4, p5)` | Frustum | Sets all six planes |
| `setFromProjectionMatrix(m, coordinateSystem?, reversedDepth?)` | Frustum | Derives planes from a combined projection-view matrix |
| `containsPoint(point)` | boolean | Tests if a point lies inside the frustum |
| `intersectsBox(box)` | boolean | Tests intersection with a Box3 |
| `intersectsSphere(sphere)` | boolean | Tests intersection with a Sphere |
| `intersectsObject(object)` | boolean | Tests using object's bounding sphere (requires geometry) |
| `intersectsSprite(sprite)` | boolean | Tests intersection with a Sprite |
| `clone()` / `copy(frustum)` | Frustum | Clone or copy |

## Notes

- `setFromProjectionMatrix` accepts either `camera.projectionMatrix` or the combined `P * V` matrix.
- `intersectsObject` computes a bounding sphere if one is not already cached.
- See official docs for full method list: https://threejs.org/docs/#api/en/math/Frustum

## Related

- [Plane.md](./Plane.md)
- [Sphere.md](./Sphere.md)
- [Box3.md](./Box3.md)
