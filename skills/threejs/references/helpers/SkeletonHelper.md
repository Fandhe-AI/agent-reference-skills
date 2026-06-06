# SkeletonHelper

Visualizes the bones of a skeleton (typically a `SkinnedMesh`) as a wireframe of line segments.

## Signature / Usage

```js
const helper = new THREE.SkeletonHelper(skinnedMesh);
scene.add(helper);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `object` | `Object3D` | The root of the bone hierarchy to visualize (usually a `SkinnedMesh` or `Bone`) |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.bones` | `Array<Bone>` | The list of bones being visualized |
| `.root` | `Object3D` | The root object passed to the constructor |
| `.isSkeletonHelper` | `boolean` (readonly) | Always `true`; use for type testing |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.setColors()` | `(color1: Color, color2: Color) → SkeletonHelper` | Sets bone line colors; returns `this` |
| `.dispose()` | `()` | Frees GPU-related resources |

## Notes

- Any `Object3D` with a bone hierarchy can be passed, not just `SkinnedMesh`.

## Related

- [AxesHelper](./AxesHelper.md)
- [BoxHelper](./BoxHelper.md)
