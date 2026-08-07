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

## Notes

- Multi-touch: use `event.id` as a table key to track multiple simultaneous pointers independently.
- Rive only dispatches Pointer Events on the main artboard. Events must be forwarded manually (constructing a `PointerEvent.new(id, localPosition)` and calling the child's handler) to reach [instantiated](./protocol-node-scripts.md) nested artboards.

## Related

- [protocol-node-scripts.md](./protocol-node-scripts.md)
- [protocol-layout-scripts.md](./protocol-layout-scripts.md)
- [artboard-events.md](./artboard-events.md)
