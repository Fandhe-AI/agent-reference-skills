---
source: https://r3f.docs.pmnd.rs/api/testing
---

# Testing (How to test React Three Fiber / Testing interactions)

Unit tests for R3F components use React Three Test Renderer (`@react-three/test-renderer`), which is testing-library agnostic (works with `jest`, `jasmine`, etc.).

## Signature / Usage

```bash
npm install @react-three/test-renderer --save-dev
```

```jsx
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { MyRotatingBox } from './App'

test('mesh to have two children', async () => {
  const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
  const mesh = renderer.scene.children[0].allChildren
  expect(mesh.length).toBe(2)
})
```

Get the scene children from the renderer:

```js
const meshChildren = renderer.scene.children
```

There is also a `children` property, but it is meant for things like groups and does not return the geometry and the materials; for that use `allChildren`.

### Testing interactions

Use the `fireEvent` method of the renderer (test instance):

```js
test('click event makes box bigger', async () => {
  const renderer = await ReactThreeTestRenderer.create(<MyRotatingBox />)
  const mesh = renderer.scene.children[0]
  expect(mesh.props.scale).toBe(1)
  await renderer.fireEvent(mesh, 'click')
  expect(mesh.props.scale).toBe(1.5)
})
```

## Notes

- `@react-three/test-renderer` is a scene-graph renderer for R3F, not a test runner, and is not `react-test-renderer`. Test runners and browser testing belong to the vitest and playwright skills.
- The docs test the sandbox from the "events and interactions" tutorial; the exercises suggested are checking the Box color and checking the rotation with `advanceFrames`.

## Related

- [create()](./test-renderer-create.md)
- [fireEvent()](./test-renderer-fire-event.md)
- [ReactThreeTestInstance](./test-instance.md)
