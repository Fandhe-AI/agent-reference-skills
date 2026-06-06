# BufferGeometry

Represents mesh, line, or point geometry by storing vertex positions, indices, normals, colors, UVs, and custom attributes in typed-array buffers. More efficient than the legacy `Geometry` because data is passed directly to the GPU.

## Signature / Usage

```js
const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  -1, -1, 1,
   1, -1, 1,
   1,  1, 1,
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
```

## Constructor

```js
new BufferGeometry()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `attributes` | Object | Dictionary of `BufferAttribute`s; use `setAttribute`/`getAttribute` |
| `boundingBox` | Box3 \| null | Computed by `computeBoundingBox()`. Default: `null` |
| `boundingSphere` | Sphere \| null | Computed by `computeBoundingSphere()`. Default: `null` |
| `drawRange` | Object | `{ start, count }` — use `setDrawRange()` |
| `groups` | Array | Material groups; use `addGroup()`/`clearGroups()` |
| `id` | number (readonly) | Unique ID |
| `index` | BufferAttribute \| null | Vertex indices for indexed triangles. Default: `null` |
| `indirect` | BufferAttribute \| null | Indirect draw calls (WebGPURenderer only). Default: `null` |
| `isBufferGeometry` | boolean (readonly) | Type flag |
| `morphAttributes` | Object | Morph target attribute dictionary |
| `morphTargetsRelative` | boolean | Treat morphs as relative offsets. Default: `false` |
| `name` | string | Geometry name |
| `userData` | Object | Custom data storage |
| `uuid` | string (readonly) | UUID |

## Methods

**Attribute management:** `setAttribute(name, attr)`, `getAttribute(name)`, `deleteAttribute(name)`, `hasAttribute(name)`

**Computation:** `computeBoundingBox()`, `computeBoundingSphere()`, `computeVertexNormals()`, `computeTangents()`, `normalizeNormals()`

**Transforms:** `applyMatrix4(m)`, `applyQuaternion(q)`, `rotateX/Y/Z(angle)`, `scale(x,y,z)`, `translate(x,y,z)`, `center()`, `lookAt(vector)`

**Indexing & groups:** `setIndex(index)`, `getIndex()`, `setDrawRange(start, count)`, `addGroup(start, count, materialIndex)`, `clearGroups()`, `toNonIndexed()`

**Utilities:** `setFromPoints(points)`, `clone()`, `copy(source)`, `toJSON()`, `dispose()`

## Notes

- `boundingBox` and `boundingSphere` are `null` until explicitly computed.
- Each vertex in non-indexed geometry must be duplicated if shared by multiple triangles.
- Every vertex/index must belong to exactly one group when using multi-material rendering.
- Morph attribute data cannot change after first render; `dispose()` and recreate the geometry.
- `indirect` / `indirectOffset` are WebGPURenderer-only.
- Call `dispose()` when geometry is no longer needed to free GPU memory.

## Related

- [BufferAttribute](./BufferAttribute.md)
- [InstancedBufferGeometry](./InstancedBufferGeometry.md)
