---
source: https://r3f.docs.pmnd.rs/api/events#pointer-capture
---

# Pointer capture

Because events go to all intersected objects, capturing the pointer works differently from the DOM. In the DOM, the capturing object **replaces** the hit test, but in React Three Fiber, the capturing object is **added** to the hit test result: if the capturing object was not hit, then all of the hit objects (and their ancestors) get the event first, followed by the capturing object and its ancestors. The capturing object can also use `event.stopPropagation()` so that objects that really were hit get pointerout events.

## Signature / Usage

```jsx
onPointerDown={e => {
  // Only the mesh closest to the camera will be processed
  e.stopPropagation()
  // You may optionally capture the target
  e.target.setPointerCapture(e.pointerId)
}}
onPointerUp={e => {
  e.stopPropagation()
  // Optionally release capture
  e.target.releasePointerCapture(e.pointerId)
}}
```

## Notes

- `setPointerCapture` and `releasePointerCapture` are accessible **only** via `event.target`: they don't get added to the `Object3D` instances in the scene graph.
- Both take a `pointerId` parameter like in the DOM, but for now they don't have support for multiple active pointers.

## Related

- [Event propagation](./event-propagation.md)
- [Event handlers](./event-handlers.md)
