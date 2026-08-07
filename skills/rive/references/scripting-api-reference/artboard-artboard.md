# Artboard

Represents a Rive artboard instance: drawing, advancing, interaction handling, and access to named nodes and data.

## Signature / Usage

```lua
local instance = self.enemy:instance() -- create an independent artboard instance
instance:advance(seconds)
instance:draw(renderer)
local node = instance:node('Root')
local anim = instance:animation('Idle')
```

## Options / Props

| Member | Description |
| --- | --- |
| `frameOrigin` | Boolean; treats the artboard's origin as the frame origin when enabled |
| `data` | Typed data (`Data.<ViewModel>`) associated with the artboard instance |
| `width` / `height` | Artboard dimensions |
| `draw(renderer)` | Renders the artboard |
| `advance(seconds) -> boolean` | Advances the artboard; returns whether it should keep receiving advance calls |
| `instance(viewModel?) -> Artboard` | Creates a new independent artboard instance, optionally bound to a view model |
| `animation(name) -> Animation` | Retrieves a named animation |
| `bounds() -> (Vector, Vector)` | Bounding box as min/max points |
| `node(name) -> NodeReadData?` | Fetches a named node, or nil |
| `pointerDown/pointerUp/pointerMove/pointerExit(event)` | Pointer event handlers; return a hit-test result |
| `gamepadConnected/gamepadEvent/gamepadDisconnected(event)` | Gamepad event handlers |
| `addToPath(path, transform?)` | Adds the artboard's geometry into a `Path`, optionally transformed |

## Notes

- This is the Luau scripting-runtime `Artboard` type, distinct from the JS `RiveFile`/`Rive` artboard concepts in `references/runtimes-web/rive-file.md`.

## Related

- [artboard-animation.md](./artboard-animation.md)
- [artboard-node-data.md](./artboard-node-data.md)
- [protocol-node-scripts.md](./protocol-node-scripts.md)
