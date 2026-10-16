---
source: https://r3f.docs.pmnd.rs/advanced/pitfalls#avoid-setstate-in-loops
---

# Performance pitfalls: state and loops

Creating objects can be expensive in three.js; share materials and geometries, either in global scope or locally. Fast updates belong in `useFrame` by mutation, not in React state.

## Signature / Usage

Share resources locally:

```jsx
const geom = useMemo(() => new BoxGeometry(), [])
const mat = useMemo(() => new MeshBasicMaterial(), [])
return items.map(i => <mesh geometry={geom} material={mat} ...
```

### Avoid setState in loops

Three.js has a render-loop, it does not work like the DOM does. Fast updates are carried out in `useFrame` by mutation; `useFrame` is your per-component render-loop. You need frame deltas: instead of `position.x += 0.1` consider `position.x += delta`, or your project will run at different speeds depending on the end-user's system. Many updates need update flags (`.needsUpdate = true`) or imperative functions (`.updateProjectionMatrix()`).

Bad:

```jsx
useEffect(() => {
  const interval = setInterval(() => setX((x) => x + 0.1), 1)
  return () => clearInterval(interval)
}, [])
```

```jsx
const [x, setX] = useState(0)
useFrame(() => setX((x) => x + 0.1))
return <mesh position-x={x} />
```

```jsx
<mesh onPointerMove={(e) => setX((x) => e.point.x)} />
```

Instead, just mutate and use deltas:

```jsx
const meshRef = useRef()
useFrame((state, delta) => (meshRef.current.position.x += delta))
return <mesh ref={meshRef} />
```

Same goes for events, use references:

```jsx
<mesh onPointerMove={(e) => (ref.current.position.x = e.point.x)} />
```

If you must use intervals, use references as well, but this is not refresh-rate independent:

```jsx
useEffect(() => {
  const interval = setInterval(() => ref.current.position.x += 0.1, 1)
  return () => clearInterval(interval)
}, [])
```

### Handle animations in loops

The frame loop is where animations belong, for instance using lerp or damp.

```jsx
function Signal({ active }) {
  const meshRef = useRef()
  useFrame((state, delta) => {
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, active ? 100 : 0, 0.1)
  })
  return <mesh ref={meshRef} />
```

Or use animation libraries. React-spring has its own frame-loop and animates outside of React. Framer-motion is another popular alternative.

```jsx
import { a, useSpring } from '@react-spring/three'

function Signal({ active }) {
  const { x } = useSpring({ x: active ? 100 : 0 })
  return <a.mesh position-x={x} />
```

### Do not bind to fast state reactively

State-managers and selective state are fine, but not for updates that happen rapidly.

Bad (assuming x gets animated inside the store at 60fps):

```jsx
import { useSelector } from 'react-redux'

const x = useSelector((state) => state.x)
return <mesh position-x={x} />
```

Instead fetch state directly, for instance using Zustand (same in Redux et al):

```jsx
useFrame(() => (ref.current.position.x = api.getState().x))
return <mesh ref={ref} />
```

## Related

- [pitfalls-mounting-and-objects](./pitfalls-mounting-and-objects.md)
- [on-demand-rendering](./on-demand-rendering.md)
