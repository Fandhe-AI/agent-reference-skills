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
| `boundingBox` | Box3 | Computed bounding box (`null` until `computeBoundingBox()` called; recompute when instances change) |
| `boundingSphere` | Sphere | Bounding sphere; the engine computes it once when needed. Recompute with `computeBoundingSphere()` when instances change |
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
- `getGeometryRangeAt(geometryId, target): Object` — returns `{ offset, count }`, or throws an error if the geometry is invalid

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
- Bounding box is not automatically computed; call `computeBoundingBox()` explicitly. The bounding sphere is computed once by the engine when it is needed; recompute both after instances change.
- The first geometry added defines the layout of the batch: all later geometries must match its index usage and provide its attributes with the same `itemSize` and `normalized` values. Additional attributes are ignored.
- Migration (r186 → r187): `getGeometryRangeAt()` throws instead of returning `null` for an invalid geometry; `Box3#setFromObject( object, true )` uses the BatchedMesh bounds (https://github.com/mrdoob/three.js/pull/34863); `WebGPURenderer` merges consecutive draws that share a geometry range (https://github.com/mrdoob/three.js/pull/35259) and disposes its previous-matrices texture (new in r187) in `dispose()` (https://github.com/mrdoob/three.js/pull/35272).
- Source: https://threejs.org/docs/pages/BatchedMesh.html (three.js r187, `src/objects/BatchedMesh.js`; JSDoc from tag r187 / commit 7e89746)
- Call `optimize()` after many geometry/instance deletions to reclaim unused buffer space.
- Call `dispose()` when no longer needed to free GPU resources.

## Related

- [InstancedMesh.md](./InstancedMesh.md)
- [Mesh.md](./Mesh.md)
