---
source: https://r3f.docs.pmnd.rs/api/objects#putting-already-existing-objects-into-the-scene-graph
---

# primitive (Putting already existing objects into the scene-graph)

The `primitive` placeholder puts an already existing object into the scene-graph. You can still give it properties or attach nodes to it.

## Signature / Usage

```jsx
const mesh = new THREE.Mesh(geometry, material)

function Component() {
  return <primitive object={mesh} position={[10, 0, 0]} />
```

## Notes

- Never add the same object multiple times; this is not allowed in three.js.
- Primitives will not dispose of the object they carry on unmount; you are responsible for disposing of it.
- Scene objects can only ever be added once in three.js. If one and the same object is added in two places, three.js removes the first instance automatically. This also happens with `primitive`. To re-use an existing object, clone it first.
- Migration (v8 → v9): swapping elements when changing the primitive `object` prop (or `args`) has been improved for structured children like arrays or iterators. Previously, primitives sharing an object could update out of order or be removed from the scene along with their children.
- The wrapped objects are three.js classes; see the threejs skill for their APIs.

## Related

- [Constructor arguments (args)](./constructor-arguments.md)
- [Disposal](./disposal.md)
