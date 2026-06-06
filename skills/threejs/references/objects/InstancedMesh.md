# InstancedMesh

A mesh with instanced rendering support. Renders many copies of the same geometry and material in a single draw call, each with its own transformation and optional color.

Inherits from: EventDispatcher → Object3D → Mesh → InstancedMesh

## Signature / Usage

```js
const mesh = new THREE.InstancedMesh(geometry, material, count);

const matrix = new THREE.Matrix4();
for (let i = 0; i < count; i++) {
  matrix.setPosition(Math.random() * 100, Math.random() * 100, Math.random() * 100);
  mesh.setMatrixAt(i, matrix);
}
mesh.instanceMatrix.needsUpdate = true;
scene.add(mesh);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `count` | number | Number of instances to render |
| `instanceMatrix` | BufferAttribute | Per-instance transformation matrices (Float32Array, 16 floats each) |
| `instanceColor` | BufferAttribute \| null | Per-instance colors (`null` until `setColorAt()` is first called) |
| `isInstancedMesh` | boolean (readonly) | Always `true`; used for type testing |
| `boundingBox` | Box3 \| null | Bounding box (not auto-computed) |
| `boundingSphere` | Sphere \| null | Bounding sphere (not auto-computed) |

## Methods

- `getMatrixAt(index, matrix): Matrix4` — copies instance matrix into `matrix`
- `setMatrixAt(index, matrix): void` — sets instance transformation; requires `instanceMatrix.needsUpdate = true` after
- `getColorAt(index, color): Color` — copies instance color into `color`
- `setColorAt(index, color): void` — sets instance color; requires `instanceColor.needsUpdate = true` after
- `computeBoundingBox(): void`
- `computeBoundingSphere(): void`
- `dispose(): void` — frees GPU resources

## Notes

- After calling `setMatrixAt()` or `setColorAt()`, set `instanceMatrix.needsUpdate = true` or `instanceColor.needsUpdate = true` to apply changes.
- Instance `count` cannot be changed after construction. For dynamic counts, use `BatchedMesh`.
- Bounding box and sphere are not automatically computed.
- Use `dispose()` when the mesh is removed from the scene.

## Related

- [BatchedMesh.md](./BatchedMesh.md)
- [Mesh.md](./Mesh.md)
