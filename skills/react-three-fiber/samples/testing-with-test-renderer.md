---
source: https://r3f.docs.pmnd.rs/api/testing
---

# Testing with Test Renderer

Assert on the scene graph and fire events using `@react-three/test-renderer`, without a browser or WebGL.

```bash
npm install @react-three/test-renderer --save-dev
```

```tsx
import ReactThreeTestRenderer from '@react-three/test-renderer'

const renderer = await ReactThreeTestRenderer.create(
  <mesh>
    <boxGeometry args={[2, 2]} />
    <meshStandardMaterial
      args={[
        {
          color: 0x0000ff,
        },
      ]}
    />
  </mesh>,
)

// assertions using the TestInstance & Scene Graph
console.log(renderer.toGraph())
```

```js
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { MyRotatingBox } from './App'

test('mesh to have two children', async () => {
  const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBe(2)
})

test('click event makes box bigger', async () => {
  const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
  const mesh = renderer.scene.children[0]
  expect(mesh.props.scale).toBe(1)
  await renderer.fireEvent(mesh, 'click')
  expect(mesh.props.scale).toBe(1.5)
})
```

## Notes

- `@react-three/test-renderer` renders the Fiber scene graph in node; it is not a test runner and is not `react-test-renderer`. It is testing-library agnostic (jest, jasmine, etc.); the tests above use Jest-style `test` / `expect`.
- `MyRotatingBox` is the component from the events-and-interaction sample (a mesh with `scale` state toggled by `onClick`); the official page tests that sandbox.
- `children` returns child objects such as groups, while `allChildren` also includes geometry and material, hence two for a mesh.
- Sources: the Usage section of `packages/test-renderer/README.md` (tag v9.8.2) and `docs/API/testing.mdx`.
