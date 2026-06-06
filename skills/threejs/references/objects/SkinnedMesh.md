# SkinnedMesh

A mesh deformed by a Skeleton using bone transformations. Requires `skinIndex` and `skinWeight` buffer attributes in its geometry.

Inherits from: EventDispatcher → Object3D → Mesh → SkinnedMesh

## Signature / Usage

```js
// Typically loaded via GLTFLoader; manual creation:
const mesh = new THREE.SkinnedMesh(geometry, material);
mesh.add(rootBone);
mesh.bind(skeleton);
scene.add(mesh);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `bindMatrix` | Matrix4 | — | Base matrix used when applying bone transforms |
| `bindMatrixInverse` | Matrix4 | — | Inverse of `bindMatrix` |
| `bindMode` | `AttachedBindMode` \| `DetachedBindMode` | `AttachedBindMode` | `AttachedBindMode`: skeleton shares world space with mesh; `DetachedBindMode`: useful for sharing one skeleton across multiple meshes |
| `boundingBox` | Box3 \| null | `null` | Not auto-computed for animated meshes |
| `boundingSphere` | Sphere \| null | `null` | Auto-computed by renderer when needed |
| `isSkinnedMesh` | boolean (readonly) | `true` | Type testing flag |

## Methods

- `bind(skeleton, bindMatrix?): void` — binds a Skeleton; uses mesh world matrix if `bindMatrix` is omitted
- `applyBoneTransform(index, target): Vector3 | Vector4` — applies bone transform at vertex `index` to `target` (use Vector4 with `w=1` for positions, `w=0` for directions)
- `computeBoundingBox(): void` — must be called manually; call every frame for animated meshes
- `computeBoundingSphere(): void` — auto-computed by renderer, but recompute every frame for accurate frustum culling with animation
- `normalizeSkinWeights(): void` — normalizes skin weight attributes so they sum to 1
- `pose(): void` — resets mesh to bind/rest pose

## Notes

- Geometry must contain `skinIndex` and `skinWeight` buffer attributes; these are usually provided by loaders.
- For animated meshes, recompute `boundingBox` every frame if precise collision detection is needed.
- Use `DetachedBindMode` when sharing one Skeleton across multiple SkinnedMesh instances.
- Typically created by model loaders (GLTFLoader, FBXLoader) rather than built by hand.

## Related

- [Skeleton.md](./Skeleton.md)
- [Bone.md](./Bone.md)
- [Mesh.md](./Mesh.md)
