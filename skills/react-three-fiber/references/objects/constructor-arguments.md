---
source: https://r3f.docs.pmnd.rs/api/objects#constructor-arguments
---

# Constructor arguments (args)

In three.js, objects are classes that are instantiated and receive one-time constructor arguments (`new THREE.SphereGeometry(1, 32)`) and properties (`someObject.visible = true`). In React Three Fiber, constructor arguments are always passed as an array via `args`.

## Signature / Usage

```jsx
<sphereGeometry args={[1, 32]} />
```

## Notes

- If `args` change later on, the object must naturally get reconstructed from scratch.
- Migration (v8 → v9): swapping elements when changing the `args` (or a primitive `object`) prop has been improved for structured children such as arrays or iterators (including async iterators). Previously, primitives sharing an object could update out of order or be removed from the scene along with their children (see pmndrs/react-three-fiber PR 3272).
- Constructor classes are three.js classes; their argument lists are documented by the threejs skill.

## Related

- [Declaring objects](./declaring-objects.md)
- [primitive](./primitive.md)
