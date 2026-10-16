---
source: https://r3f.docs.pmnd.rs/api/hooks#usethree
---

# useThree

This hook gives you access to the state model which contains the default renderer, the scene, your camera, and so on. It also gives you the current size of the canvas in screen and viewport coordinates.

## Signature / Usage

```jsx
import { useThree } from '@react-three/fiber'

function Foo() {
  const state = useThree()
```

Signature (from `packages/fiber/src/core/hooks.tsx`, tag v9.8.2):

```ts
export function useThree<T = RootState>(
  selector: (state: RootState) => T = (state) => state as unknown as T,
  equalityFn?: <T>(state: T, newState: T) => boolean,
): T
```

The hook is reactive, if you resize the browser for instance, you get fresh measurements, same applies to any of the state objects that may change. See [RootState](./root-state.md) for the state properties.

### Selector

You can also select properties, this allows you to avoid needless re-render for components that are interested only in particulars. Reactivity does not include deeper three.js internals!

```jsx
// Will only trigger re-render when the default camera is exchanged
const camera = useThree((state) => state.camera)
// Will only re-render on resize changes
const viewport = useThree((state) => state.viewport)
// ❌ You cannot expect reactivity from three.js internals!
const zoom = useThree((state) => state.camera.zoom)
```

### Reading state from outside of the component cycle

```jsx
function Foo() {
  const get = useThree((state) => state.get)
  ...
  get() // Get fresh state from anywhere you want
```

### Exchanging defaults

```jsx
function Foo() {
  const set = useThree((state) => state.set)
  ...
  useEffect(() => {
    set({ camera: new THREE.OrthographicCamera(...) })
  }, [])
```

## Notes

- Hooks can only be used inside the Canvas element because they rely on context.
- Using it outside Canvas does not work:

```jsx
import { useThree } from '@react-three/fiber'

function App() {
  const { size } = useThree() // This will just crash
  return (
    <Canvas>
      <mesh>
```

- Do this instead:

```jsx
function Foo() {
  const { size } = useThree()
  ...
}

function App() {
  return (
    <Canvas>
      <Foo />
```

- In `packages/fiber/src/core/hooks.tsx` (v9.8.2) the hook delegates to `useStore()(selector, equalityFn)`; `useStore()` returns the Canvas' Zustand store (`RootStore`) and throws `R3F: Hooks can only be used within the Canvas component!` when no store is in context.
- `THREE.WebGLRenderer`, `THREE.Scene`, `THREE.PerspectiveCamera` and the other three.js classes in the state are documented in the threejs skill; this page covers only the R3F hook.

## Related

- [RootState](./root-state.md)
- [useFrame](./use-frame.md)
