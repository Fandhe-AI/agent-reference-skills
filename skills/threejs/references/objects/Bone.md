# Bone

A bone used by a Skeleton, which is in turn used by a SkinnedMesh for skeletal animation. Nearly identical to Object3D.

Inherits from: EventDispatcher → Object3D → Bone

## Signature / Usage

```js
const root = new THREE.Bone();
const child = new THREE.Bone();
root.add(child);
child.position.y = 5;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isBone` | boolean (readonly) | Always `true`; used for type testing |
| `type` | string (readonly) | Always `'Bone'` |

All other properties are inherited from Object3D (position, rotation, scale, matrix, etc.).

## Notes

- Bones are organized in parent-child hierarchies using `add()`.
- All Object3D methods (translate, rotate, etc.) are available.
- Bones are typically created as part of a loaded model (e.g. via GLTFLoader) rather than manually.

## Related

- [Skeleton.md](./Skeleton.md)
- [SkinnedMesh.md](./SkinnedMesh.md)
