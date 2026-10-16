---
source: https://r3f.docs.pmnd.rs/api/events
---

# Event handlers

`three.js` objects that implement their own `raycast` method (meshes, lines, etc) can be interacted with by declaring events on them. Pointer events, clicks and wheel-scroll are supported. Events contain the browser event as well as the `three.js` event data (object, point, distance, etc).

## Signature / Usage

```jsx
<mesh
  onClick={(e) => console.log('click')}
  onContextMenu={(e) => console.log('context menu')}
  onDoubleClick={(e) => console.log('double click')}
  onWheel={(e) => console.log('wheel spins')}
  onPointerUp={(e) => console.log('up')}
  onPointerDown={(e) => console.log('down')}
  onPointerOver={(e) => console.log('over')}
  onPointerOut={(e) => console.log('out')}
  onPointerEnter={(e) => console.log('enter')} // see note 1
  onPointerLeave={(e) => console.log('leave')} // see note 1
  onPointerMove={(e) => console.log('move')}
  onPointerMissed={() => console.log('missed')}
  onUpdate={(self) => console.log('props have been updated')}
/>
```

## Notes

- You may want to [polyfill](https://github.com/jquery/PEP) pointer events, if that is a concern.
- `onUpdate` is special: it is called every time the object gets fresh props, which is good for things like `self => (self.verticesNeedUpdate = true)`.
- `onPointerMissed` is also available on the canvas element; it fires on clicks that haven't hit _any_ meshes.
- Note 1: `pointerenter` and `pointerleave` events work exactly the same as pointerover and pointerout; `pointerenter` and `pointerleave` semantics are not implemented.
- Some events (such as `pointerout`) happen when there is no intersection between `eventObject` and the ray. When this happens, the event will contain intersection data from a previous event with this object.
- The JSX elements wrap three.js classes (`Mesh`, `Line`, ...); the class APIs themselves (including `raycast` and `Raycaster`) belong to the threejs skill.

## Related

- [Event data](./event-data.md)
- [Event propagation](./event-propagation.md)
- [Pointer capture](./pointer-capture.md)
