---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/markdown/rttr.md#act
---

# act() (@react-three/test-renderer)

Prepares a component for assertions, similar to `act()` in `react-test-renderer`.

## Signature / Usage

```tsx
ReactThreeTestRenderer.act(callback)
```

Unlike `react-test-renderer` you do not have to wrap calls to `ReactThreeTestRenderer.create` and `renderer.update`.

Act example (using jest):

```tsx
import ReactThreeTestRenderer from '@react-three/test-renderer'

const Mesh = () => {
  const meshRef = React.useRef()
  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2]} />
      <meshBasicMaterial />
    </mesh>
  )
}

const renderer = await ReactThreeTestRenderer.create(<Mesh />)

expect(renderer.scene.children[0].instance.rotation.x).toEqual(0)

await ReactThreeTestRenderer.act(async () => {
  await renderer.advanceFrames(2, 1)
})

expect(renderer.scene.children[0].instance.rotation.x).toEqual(2)
```

## Notes

- `@react-three/test-renderer` is a scene-graph renderer, not a test runner (see the vitest and playwright skills), and is distinct from `react-test-renderer`.
- Migration (v8 → v9): the v9 migration guide states that `act` is now exported from React itself and can be used for all renderers (`import { act } from 'react'`, e.g. `await act(async () => createRoot(canvas).render(<App />))` with `createRoot` from `@react-three/fiber`). This concerns `@react-three/fiber`; this page's `ReactThreeTestRenderer.act` is documented unchanged in the test-renderer markdown.

## Related

- [advanceFrames / update / unmount](./test-renderer-lifecycle.md)
- [Testing overview](./testing-overview.md)
