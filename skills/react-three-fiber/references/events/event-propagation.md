---
source: https://r3f.docs.pmnd.rs/api/events
---

# Event propagation (bubbling and capture)

Propagation works a bit differently to the DOM because objects can occlude each other in 3D. The `intersections` array in the event includes all objects intersecting the ray, not just the nearest. Only the first intersection with each object is included. The event is first delivered to the object nearest the camera, and then bubbles up through its ancestors like in the DOM. After that, it is delivered to the next nearest object, and then its ancestors, and so on. This means objects are transparent to pointer events by default, even if the object handles the event.

## Signature / Usage

```jsx
onPointerOver={e => {
  e.stopPropagation()
  // ...
}}
```

## Notes

- `event.stopPropagation()` doesn't just stop this event from bubbling up, it also stops it from being delivered to farther objects (objects behind this one). All other objects, nearer or farther, no longer count as being hit while the pointer is over this object. If they were previously delivered pointerover events, they will immediately be delivered pointerout events.
- If you want an object to block pointer events from objects behind it, it needs to have an event handler as above, even if you don't want this object to respond to the pointer event.
- If you do want to handle the event as well as using `stopPropagation()`, remember that the pointerout events will happen **during** the `stopPropagation()` call. You probably want your other event handling to happen after this.
- `pointerenter` and `pointerleave` events work exactly the same as pointerover and pointerout; their semantics are not implemented.

## Related

- [Event handlers](./event-handlers.md)
- [Pointer capture](./pointer-capture.md)
