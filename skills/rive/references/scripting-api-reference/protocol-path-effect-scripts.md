# Path Effect Scripts

Modify and transform path geometry in real-time — warping, distortion, and other procedural modifications applied to a stroke.

## Signature / Usage

```lua
function init(self: MyPathEffect): boolean
  return true
end

-- Required. Receives PathData, returns the modified PathData.
function update(self: MyPathEffect, path: PathData): PathData
  return path
end

-- Optional. Called each frame with elapsed seconds; for time-based animation.
function advance(self: MyPathEffect, seconds: number, context: Context)
  -- call context:markNeedsUpdate() to force recompute even if the source path is static
end

return function(): PathEffect<MyPathEffect>
  return { init = init, update = update, advance = advance }
end
```

## Options / Props

| Lifecycle function | Required | Description |
| --- | --- | --- |
| `init(self)` | optional | Sets up initial state; returns a boolean |
| `update(self, path)` | required | Geometry manipulation entry point; receives and returns `PathData` |
| `advance(self, seconds)` | optional | Called per frame with elapsed time for animated effects |

## Notes

- For animated effects, call `markNeedsUpdate()` on the effect context from `advance()`; otherwise the effect appears frozen when the source path is unchanged.
- Attach: select/create a stroke → Options → Effects tab → `+` → **Script Effects** → choose the effect → configure inputs.

## Related

- [path-measure.md](./path-measure.md)
- [interface-path-effect.md](./interface-path-effect.md)
