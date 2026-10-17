# Pointer Events (Scripting)

Scripts can listen for pointer interaction by implementing `pointerDown`, `pointerMove`, `pointerUp`, or `pointerExit` lifecycle callbacks. Available in [Node Scripts](./protocol-node-scripts.md) and [Layout Scripts](./protocol-layout-scripts.md).

## Signature / Usage

```lua
function handlePointerDown(self: MyNode, event: PointerEvent)
  print(event.position.x, event.position.y) -- local coordinates
  print(event.id) -- pointer identifier (multi-touch)
  event:hit() -- marks the event handled, stops propagation
  -- event:hit(true) -- handled but passes through translucent elements
end

return function(): Node<MyScript>
  return {
    init = init,
    draw = draw,
    pointerDown = handlePointerDown,
  }
end
```

### Scroll

Mouse wheel and trackpad scrolling use a separate handler, `pointerScroll(self, event: ScrollEvent)`; direct touch arrives as pointer events. Call `event:hit()` to claim the scroll, otherwise it passes to whatever lies behind, such as a `ScrollConstraint` view.

```lua
function handlePointerScroll(self: MyZoomView, event: ScrollEvent)
  self.zoom *= math.exp(-event.delta.y * 0.01)
  event:hit()
end
```

## Notes

- Multi-touch: use `event.id` as a table key to track multiple simultaneous pointers independently.
- Nested pointer events: Rive only listens for Pointer Events on the main artboard; to receive them in instantiated artboards, forward them manually to each instance (e.g. `instance:pointerDown(localEvent)`, and `instance:pointerScroll(localEvent)` for scroll). Call `event:hit()` on every event a script owns (press, each move, release); otherwise an enclosing hit target such as a `ScrollConstraint` viewport claims the gesture.
- Rive only dispatches Pointer Events on the main artboard. Events must be forwarded manually (constructing a `PointerEvent.new(id, localPosition)` and calling the child's handler) to reach [instantiated](./protocol-node-scripts.md) nested artboards.

## Related

- [protocol-node-scripts.md](./protocol-node-scripts.md)
- [protocol-layout-scripts.md](./protocol-layout-scripts.md)
- [artboard-events.md](./artboard-events.md)
