---
source: https://r3f.docs.pmnd.rs/api/objects#shortcuts
---

# Shortcuts (set / setScalar)

Properties whose underlying object has a `.set()` method can directly receive the same arguments that `set` takes. Properties with a `setScalar` method (for instance `Vector3`) accept a single number.

## Signature / Usage

```jsx
<mesh position={[1, 2, 3]}>
  <meshStandardMaterial color="hotpink" />
</mesh>
```

`THREE.Color.set` can take a color string, so instead of `color={new THREE.Color('hotpink')}` write `color="hotpink"`. Some `set` methods take multiple arguments (for instance `THREE.Vector3`); give an array in that case: `position={[100, 0, 0]}`.

SetScalar:

```jsx
// Translates to <mesh scale={[1, 1, 1]} />
<mesh scale={1} />
```

## Notes

- The source (docs/API/objects.mdx, v9.8.2) self-closes `<mesh ... />` before `<meshStandardMaterial>`, which would make the material a sibling instead of attaching it to the mesh; corrected here to nest the material inside the mesh.
- If you link up an existing object to a property (for instance a `THREE.Vector3()` to `position`), this will end up copying the object in most cases, because `.copy()` is called on the target. This only applies to objects that expose both `.set()` and `.copy()` (Vectors, Eulers, Matrix, ...).
- If you link up an existing material or geometry, it will overwrite instead, because these objects do not have a `.set()` method.
- `Color`, `Vector3`, `Euler` and the other value classes are three.js classes documented by the threejs skill.

## Related

- [Declaring objects](./declaring-objects.md)
- [Piercing into nested properties](./piercing-nested-properties.md)
