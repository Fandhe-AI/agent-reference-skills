# ClippingGroup

A specialized Group that encodes clipping state into the scene graph. All descendant objects are affected by the clipping planes defined on the group.

Inherits from: EventDispatcher → Object3D → Group → ClippingGroup

**Note:** Only supported with `WebGPURenderer`.

## Signature / Usage

```js
const clippingGroup = new THREE.ClippingGroup();
clippingGroup.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 1)];
clippingGroup.add(mesh);
scene.add(clippingGroup);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `true` | Whether clipping is active |
| `clippingPlanes` | Plane[] | `[]` | Array of clipping planes applied to all descendants |
| `clipIntersection` | boolean | `false` | Use intersection of planes instead of union |
| `clipShadows` | boolean | `false` | Whether shadows are clipped by the planes |
| `isClippingGroup` | boolean (readonly) | `true` | Type testing flag |

## Notes

- ClippingGroups can be nested; planes accumulate across the hierarchy.
- Unlike material-level or renderer-level clipping, ClippingGroup scopes clipping to its subtree.
- Only works with `WebGPURenderer`; does not function with `WebGLRenderer`.

## Related

- [Group.md](./Group.md)
