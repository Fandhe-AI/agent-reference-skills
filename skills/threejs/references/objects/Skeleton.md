# Skeleton

Manages an array of Bones to form a skeleton for use with SkinnedMesh.

## Signature / Usage

```js
const shoulder = new THREE.Bone();
const elbow = new THREE.Bone();
const hand = new THREE.Bone();

shoulder.add(elbow);
elbow.add(hand);

shoulder.position.y = -5;
elbow.position.y = 0;
hand.position.y = 5;

const skeleton = new THREE.Skeleton([shoulder, elbow, hand]);

const mesh = new THREE.SkinnedMesh(geometry, material);
mesh.add(shoulder); // add root bone to mesh
mesh.bind(skeleton);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `bones` | Bone[] | Copy of the bones array passed to the constructor |
| `boneInverses` | Matrix4[] | Inverse of each bone's `matrixWorld` (auto-computed or provided) |
| `boneMatrices` | Float32Array | Flat buffer of bone matrices sent to the shader |
| `boneTexture` | DataTexture \| null | Texture used to pass bone matrices to the shader (created via `computeBoneTexture()`) |

## Constructor

```js
new THREE.Skeleton(bones?: Bone[], boneInverses?: Matrix4[])
```

- `bones` — array of Bone objects (default: `[]`)
- `boneInverses` — optional precomputed inverse matrices; auto-computed via `calculateInverses()` if omitted

## Methods

- `calculateInverses(): void` — computes `boneInverses` from current bone world matrices
- `computeBoneTexture(): this` — creates a DataTexture for efficient shader transfer
- `pose(): void` — resets skeleton to bind pose
- `update(): void` — refreshes `boneMatrices` and `boneTexture` (called automatically by the renderer)
- `getBoneByName(name): Bone | undefined` — finds a bone by its `name` property
- `clone(): Skeleton`
- `dispose(): void` — releases GPU resources

## Notes

- `bones` is a copy of the input array; modifying the original does not affect the skeleton.
- Call `calculateInverses()` after manually positioning bones before binding to a SkinnedMesh.
- `update()` is called automatically by the renderer each frame when the skeleton is attached to a SkinnedMesh.

## Related

- [Bone.md](./Bone.md)
- [SkinnedMesh.md](./SkinnedMesh.md)
