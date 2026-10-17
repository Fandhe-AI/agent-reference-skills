---
source: https://r3f.docs.pmnd.rs/api/events#allow-raycast-without-user-interaction
---

# Allow raycast without user interaction

By default Fiber will only raycast when the user is interacting with the canvas. If, for instance, the camera moves a hoverable object underneath the cursor it will not trigger a hover event. If this is wanted behaviour you can force a raycast by executing `update()`, call it whenever necessary.

## Signature / Usage

```jsx
const events = useThree((state) => state.events)
useEffect(() => {
  // Will trigger a onPointerMove with the last-known pointer event
  events.update()
}, [events])
```

You can abstract this into more complex logic:

```jsx
function RaycastWhenCameraMoves() {
  const matrix = new THREE.Matrix4()
  useFrame((state) => {
    // Act only when the camera has moved
    if (!matrix.equals(state.camera.matrixWorld)) {
      state.events.update()
      matrix.copy(state.camera.matrixWorld)
    }
  })
}
```

## Notes

- The first docs snippet reads `const events =>` and `state.events`; corrected here to a working form. The second snippet is verbatim and partial.

## Related

- [Customizing the event settings](./customizing-events.md)
- [Event handlers](./event-handlers.md)
