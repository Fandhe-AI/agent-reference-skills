---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/eslint-plugin/docs/rules/no-new-in-loop.md
---

# no-new-in-loop

Disallow instantiating new objects in the frame loop. This can waste large amounts of memory, which is especially bad for large CPU containers such as Three.js classes and any GPU resource as there is no reliable garbage collection. Instead create once in a `useMemo` or a single shared reference outside of the component.

## Signature / Usage

Incorrect (creates a new vector 60+ times a second allocating large amounts of memory):

```js
function MoveTowards({ x, y, z }) {
  const ref = useRef()

  useFrame(() => {
    ref.current.position.lerp(new THREE.Vector3(x, y, z), 0.1)
  })

  return <mesh ref={ref} />
}
```

Correct (vector created outside of the frame loop and reused each frame):

```js
const tempVec = new THREE.Vector3()

function MoveTowards({ x, y, z }) {
  const ref = useRef()

  useFrame(() => {
    ref.current.position.lerp(tempVec.set(x, y, z), 0.1)
  })

  return <mesh ref={ref} />
}
```

Also correct (vector created once inside a `useMemo`):

```js
function MoveTowards({ x, y, z }) {
  const ref = useRef()
  const tempVec = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    ref.current.position.lerp(tempVec.set(x, y, z), 0.1)
  })

  return <mesh ref={ref} />
}
```

## Notes

- The upstream rule docs omit the dependency array in the `useMemo` example; `[]` is added so the vector is actually created once.

## Related

- [no-clone-in-loop](./eslint-no-clone-in-loop.md)
- [@react-three/eslint-plugin](./eslint-plugin.md)
