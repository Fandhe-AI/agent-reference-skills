---
source: https://r3f.docs.pmnd.rs/api/objects#declaring-objects
---

# Declaring objects

You can use three.js's entire object catalogue and all properties. Define properties declaratively instead of passing pre-built three.js objects, which are re-created on every render.

## Signature / Usage

Anti-pattern (all of these properties will always be re-created):

```jsx
<mesh
  visible
  userData={{ hello: 'world' }}
  position={new THREE.Vector3(1, 2, 3)}
  rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
  geometry={new THREE.SphereGeometry(1, 16, 16)}
  material={new THREE.MeshBasicMaterial({ color: new THREE.Color('hotpink'), transparent: true })}
/>
```

Declarative form:

```jsx
<mesh visible userData={{ hello: 'world' }} position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
  <sphereGeometry args={[1, 16, 16]} />
  <meshStandardMaterial color="hotpink" transparent />
</mesh>
```

## Notes

- The JSX elements here are declarative forms of three.js classes; the class APIs themselves (properties, constructors) belong to the threejs skill.

## Related

- [Constructor arguments (args)](./constructor-arguments.md)
- [Shortcuts (set / setScalar)](./shortcuts.md)
