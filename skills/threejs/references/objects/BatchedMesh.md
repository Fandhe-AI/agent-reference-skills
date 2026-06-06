# BatchedMesh

A special version of Mesh with multi-draw batch rendering support. Use when rendering many objects with the same material but different geometries or world transformations to reduce draw calls.

Inherits from: EventDispatcher → Object3D → Mesh → BatchedMesh

## Signature / Usage

```js
const batchedMesh = new THREE.BatchedMesh(
  maxInstanceCount,
  maxVertexCount,
  maxIndexCount,
  material
);

const boxId = batchedMesh.addGeometry(boxGeometry);
const instanceId = batchedMesh.addInstance(boxId);
batchedMesh.setMatrixAt(instanceId, matrix);
scene.add(batchedMesh);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maxInstanceCount` | number | Maximum number of individual instances |
| `maxVertexCount` | number | Maximum number of vertices across all geometries |
| `maxIndexCount` | number | Maximum number of indices (default: `maxVertexCount * 2`) |
| `material` | Material \| Material[] | Material for the batch |
| `boundingBox` | Box3 | Computed bounding box (`null` until `computeBoundingBox()` called) |
| `boundingSphere` | Sphere | Computed bounding sphere (`null` until `computeBoundingSphere()` called) |
| `customSort` | function | Sort function run before render with instance list and camera |
| `instanceCount` | number (readonly) | Current number of instances |
| `isBatchedMesh` | boolean (readonly) | Always `true` |
| `maxInstanceCount` | number (readonly) | Maximum storable instances |
| `perObjectFrustumCulled` | boolean | Enable per-object frustum culling (default: `true`) |
| `sortObjects` | boolean | Enable depth-based object sorting (default: `true`) |
| `unusedIndexCount` | number (readonly) | Unused index count |
| `unusedVertexCount` | number (readonly) | Unused vertex count |

## Methods

**Geometry management:**
- `addGeometry(geometry, reservedVertexCount?, reservedIndexCount?): number` — adds geometry, returns geometry ID
- `deleteGeometry(geometryId): this`
- `setGeometryAt(geometryId, geometry): number` — replaces geometry (requires reserved space)
- `getGeometryIdAt(instanceId): number`
- `getBoundingBoxAt(geometryId, target): Box3`
- `getBoundingSphereAt(geometryId, target): Sphere`
- `getGeometryRangeAt(geometryId, target): Object` — returns `{ offset, count }`

**Instance management:**
- `addInstance(geometryId): number` — creates instance, returns instance ID
- `deleteInstance(instanceId): this`
- `setGeometryIdAt(instanceId, geometryId): this`
- `getVisibleAt(instanceId): boolean`
- `setVisibleAt(instanceId, visible): this`

**Transformation & color:**
- `getMatrixAt(instanceId, matrix): Matrix4`
- `setMatrixAt(instanceId, matrix): this`
- `getColorAt(instanceId, color): Color | Vector4`
- `setColorAt(instanceId, color): this`

**Optimization:**
- `optimize(): this` — repacks geometries to remove space from deletions
- `computeBoundingBox(): void`
- `computeBoundingSphere(): void`
- `setGeometrySize(maxVertexCount, maxIndexCount): void`
- `setInstanceCount(maxInstanceCount): void`
- `dispose(): void`

## Notes

- Negatively scaled matrices are not supported for `setMatrixAt`.
- Bounding box and sphere are not automatically computed; call their respective `compute*` methods explicitly.
- Call `optimize()` after many geometry/instance deletions to reclaim unused buffer space.
- Call `dispose()` when no longer needed to free GPU resources.

## Related

- [InstancedMesh.md](./InstancedMesh.md)
- [Mesh.md](./Mesh.md)
