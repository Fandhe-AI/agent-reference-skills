# Node (interfaces.Node)

The lifecycle-method contract implemented by [Node Scripts](./protocol-node-scripts.md): renders shapes, images, text, and content in the node's local transform space.

## Signature / Usage

```lua
return function(): Node<MyNode>
  return {
    init = init,
    advance = advance,
    update = update,
    draw = draw,
    pointerDown = onPointerDown,
  }
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `init(self) -> boolean` | Called once when the node is created; returns success |
| `advance(self, seconds) -> boolean` | Optional per-frame update; returns whether to keep receiving calls |
| `update(self)` | Called when input values change |
| `draw(self, renderer)` | Renders the node via the provided `Renderer` |
| `pointerDown/pointerMove/pointerUp/pointerExit(self, event: PointerEvent)` | Pointer interaction handlers; call `event:hit()` |
| `gamepadConnected/gamepadEvent/gamepadDisconnected(self, event)` | Gamepad interaction handlers |

## Related

- [protocol-node-scripts.md](./protocol-node-scripts.md)
- [artboard-events.md](./artboard-events.md)
