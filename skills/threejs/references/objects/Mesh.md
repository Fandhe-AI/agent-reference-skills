# Mesh

The fundamental renderable object in Three.js, combining a `BufferGeometry` with a `Material` to display 3D geometry.

Inherits from: EventDispatcher → Object3D → Mesh

## Signature / Usage

```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `geometry` | BufferGeometry | Shape of the mesh |
| `material` | Material \| Material[] | Visual appearance; array for multi-material groups |
| `castShadow` | boolean | Whether the mesh casts shadows (default: `false`) |
| `receiveShadow` | boolean | Whether the mesh receives shadows (default: `false`) |
| `isMesh` | boolean (readonly) | Always `true`; used for type testing |
| `morphTargetDictionary` | Object | Dictionary of morph targets by name |
| `morphTargetInfluences` | number[] | Weights for each morph target (0–1) |

## Methods

- `getVertexPosition(index, target): Vector3` — returns the position of vertex at `index` (including morph targets and skinning)
- `raycast(raycaster, intersects): void` — intersect test against raycaster
- `updateMorphTargets(): void` — updates `morphTargetDictionary` and `morphTargetInfluences` from geometry

## Notes

- Pass an array of materials to apply different materials to geometry groups defined in `BufferGeometry.groups`.
- For many identical meshes, prefer `InstancedMesh` for performance.
- `castShadow` and `receiveShadow` must be `true` on both the mesh and the relevant light for shadows to work.

## Related

- [InstancedMesh.md](./InstancedMesh.md)
- [BatchedMesh.md](./BatchedMesh.md)
- [SkinnedMesh.md](./SkinnedMesh.md)
