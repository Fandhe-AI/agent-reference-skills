---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/test-renderer/markdown/rttr.md#create-advanceframes
---

# advanceFrames() / update() / unmount()

Drive frames, re-render and unmount a test renderer.

## Signature / Usage

```tsx
renderer.advanceFrames(frames, delta)
renderer.update(element)
renderer.unmount()
```

- `advanceFrames(frames, delta)`: Native method to advance the frames (therefore running subscribers to the GL Render loop such as `useFrame`). Requires an amount of frames to advance by & a parameter of delta to pass to the subscribers creating a more controlled testing environment.
- `update(element)`: Rerender the tree with the new root element. This simulates a react update at the update, thus updating the children below. If the new element has the same type and key as the previous element, the tree will be updated.
- `unmount()`: Unmount the tree, triggering the appropriate lifecycle events.

## Related

- [act()](./test-renderer-act.md)
- [create()](./test-renderer-create.md)
