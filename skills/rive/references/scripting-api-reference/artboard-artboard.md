# Artboard

Represents a Rive artboard instance: drawing, advancing, interaction handling, and access to named nodes and data.

## Signature / Usage

```lua
local instance = self.enemy:instance() -- create an independent artboard instance
instance:advance(seconds)
instance:draw(renderer)
-- Visitor form: draw only drawables tagged with a custom property
local GLOW = instance:propertyKey("glow")
instance:draw(renderer, function(context, drawable, renderer)
  if drawable:boolean(GLOW) then
    drawable:draw(renderer)
  end
end)
local node = instance:node('Root')
local anim = instance:animation('Idle')
```

## Options / Props

| Member | Description |
| --- | --- |
| `frameOrigin` | Boolean; treats the artboard's origin as the frame origin when enabled |
| `data` | Typed data (`Data.<ViewModel>`) associated with the artboard instance |
| `width` / `height` | Artboard dimensions |
| `draw(renderer, visitor?, context?)` | Renders the artboard. Signature: `draw(renderer: Renderer, visitor: ((context: any, drawable: Drawable, renderer: Renderer) -> ())?, context: any?) -> ()`. With a `visitor`, each drawable that has custom properties is handed to it instead of being drawn; the visitor decides whether to call `drawable:draw(renderer)` and under what renderer state (what it sets on the renderer ends with that visit). Other drawables draw as usual and clipping still applies; `context` is passed through untouched |
| `drawModulated(renderer, key: PropertyKey)` | Draws with color modulation set per drawable from its custom property of this key: a number is a gray level clamped to 0..1, a color is used as is. Drawables without it draw under the renderer's current state. Levels multiply down through tagged drawables that hold others (nested artboard tagged 0.5, shape tagged 0.2 draws at 0.1). Nothing calls back into the script, so it is the cheapest way to draw a pass like emission |
| `propertyKey(name: string) -> PropertyKey` | The key custom properties called `name` are read by; matches nothing (reads return nil) if no property carries that name. Custom properties are added to a drawable in the editor's inspector |
| `advance(seconds) -> boolean` | Advances the artboard; returns whether it should keep receiving advance calls |
| `instance(viewModel?) -> Artboard` | Creates a new independent artboard instance, optionally bound to a view model |
| `animation(name) -> Animation` | Retrieves a named animation |
| `bounds() -> (Vector, Vector)` | Bounding box as min/max points |
| `node(name) -> NodeReadData?` | Fetches a named node, or nil |
| `pointerDown/pointerUp/pointerMove/pointerExit(event)` | Pointer event handlers; return a hit-test result |
| `pointerScroll(event: ScrollEvent) -> number` | Scroll handler; returns a hit-test result (0 = no hit), non-zero when a `ScrollConstraint` view inside the artboard took the scroll. Claim the outer event (`event:hit()`) when it does, so the gesture stays with this node |
| `gamepadConnected/gamepadEvent/gamepadDisconnected(event)` | Gamepad event handlers |
| `addToPath(path, transform?)` | Adds the artboard's geometry into a `Path`, optionally transformed |

## Notes

- This is the Luau scripting-runtime `Artboard` type, distinct from the JS `RiveFile`/`Rive` artboard concepts in `references/runtimes-web/rive-file.md`.

## Related

- [artboard-animation.md](./artboard-animation.md)
- [artboard-node-data.md](./artboard-node-data.md)
- [protocol-node-scripts.md](./protocol-node-scripts.md)
