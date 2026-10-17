---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/eslint-plugin/docs/rules/no-clone-in-loop.md
---

# no-clone-in-loop

Disallow cloning vectors in the frame loop. Cloning vectors in the frame loop instantiates new objects wasting large amounts of memory, which is especially bad for Three.js classes. Instead create once in a `useMemo` or a single shared reference outside of the component.

## Signature / Usage

Incorrect (creates a new vector 60+ times a second allocating large amounts of memory):

```js
function Direction({ targetPosition }) {
  const ref = useRef()

  useFrame(() => {
    const direction = ref.current.position.clone().sub(targetPosition).normalize()
  })

  return <mesh ref={ref} />
}
```

Correct (vector created outside of the frame loop and reused each frame):

```js
const tempVec = new THREE.Vector3()

function Direction({ targetPosition }) {
  const ref = useRef()

  useFrame(() => {
    const direction = tempVec.copy(ref.current.position).sub(targetPosition).normalize()
  })

  return <mesh ref={ref} />
}
```

Also correct (vector created once inside a `useMemo`):

```js
function Direction({ targetPosition }) {
  const ref = useRef()
  const tempVec = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const direction = tempVec.copy(ref.current.position).sub(targetPosition).normalize()
  })

  return <mesh ref={ref} />
}
```

## Notes

- The upstream rule docs omit the dependency array in the `useMemo` example; `[]` is added so the vector is actually created once.

## Related

- [no-new-in-loop](./eslint-no-new-in-loop.md)
- [@react-three/eslint-plugin](./eslint-plugin.md)
