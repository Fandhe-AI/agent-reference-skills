---
source: https://r3f.docs.pmnd.rs/advanced/pitfalls#useloader-instead-of-plain-loaders
---

# Performance pitfalls: mounting and objects

In three.js it is very common to not re-mount at all, because buffers and materials get re-initialized/compiled, which can be expensive. Re-pool objects to spare the garbage collector, and cache assets with `useLoader`.

## Signature / Usage

### Don't mount indiscriminately

Avoid mounting at runtime:

```jsx
{
  stage === 1 && <Stage1 />
}
{
  stage === 2 && <Stage2 />
}
{
  stage === 3 && <Stage3 />
}
```

Consider using visibility instead:

```jsx
<Stage1 visible={stage === 1} />
<Stage2 visible={stage === 2} />
<Stage3 visible={stage === 3} />

function Stage1(props) {
  return (
    <group {...props}>
      ...
```

### Use `startTransition` for expensive ops

React 18 introduces the `startTransition` and `useTransition` APIs to defer and schedule work and state updates. Use these to de-prioritize expensive operations. Since version 8 of Fiber canvases use concurrent mode by default, which means React will schedule and defer expensive operations.

```jsx
import { useTransition } from 'react'
import { Points } from '@react-three/drei'

const [isPending, startTransition] = useTransition()
const [radius, setRadius] = useState(1)
const positions = calculatePositions(radius)
const colors = calculateColors(radius)
const sizes = calculateSizes(radius)

<Points
  positions={positions}
  colors={colors}
  sizes={sizes}
  onPointerOut={() => {
    startTransition(() => {
      setRadius(prev => prev + 1)
    })
  }}
>
  <meshBasicMaterial vertexColors />
</Points>
```

### Don't re-create objects in loops

Bad news for the GC: this creates a new vector 60 times a second.

```jsx
useFrame(() => {
  ref.current.position.lerp(new THREE.Vector3(x, y, z), 0.1)
})
```

Better, re-use the object:

```jsx
function Foo(props) {
  const vec = new THREE.Vector3()
  useFrame(() => {
    ref.current.position.lerp(vec.set(x, y, z), 0.1)
  })
}
```

### `useLoader` instead of plain loaders

Not re-using assets is bad for perf; this re-fetches and re-parses for every component instance:

```jsx
function Component() {
  const [texture, set] = useState()
  useEffect(() => void new TextureLoader().load(url, set), [])
  return texture ? (
    <mesh>
      <sphereGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  ) : null
}
```

`useLoader` caches assets and makes them available throughout the scene:

```jsx
function Component() {
  const texture = useLoader(TextureLoader, url)
  return (
    <mesh>
      <sphereGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
```

For GLTFs, try to use GLTFJSX as much as you can; it creates immutable JSX graphs which allow you to re-use full models.

## Notes

- `Points` is from `@react-three/drei`, a separate package not covered by this skill.
- The official docs write `new THREE.Vector()` and omit the `{` after `function Foo(props)`; here it is corrected to `THREE.Vector3` with braces added.
- `TextureLoader` and `Vector3` class APIs belong to the threejs skill.

## Related

- [pitfalls-state-and-loops](./pitfalls-state-and-loops.md)
- [concurrency](./concurrency.md)
- [reusing-geometries-materials](./reusing-geometries-materials.md)
