# PathEffect (interfaces.PathEffect)

The lifecycle-method contract implemented by [Path Effect Scripts](./protocol-path-effect-scripts.md). A scripted effect applied to a path that can change over time even when the underlying path is static.

## Signature / Usage

```lua
function init(self: MyPathEffect, context: Context): boolean
  return true
end

function update(self: MyPathEffect, path: PathData, node: NodeReadData): PathData
  return path
end

function advance(self: MyPathEffect, seconds: number): boolean
  return true
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `init(self, context) -> boolean` | Runs once when created/attached; `true` keeps the effect active |
| `update(self, path: PathData, node: NodeReadData) -> PathData` | Runs whenever inputs change; receives the original `PathData` and returns the path to render |
| `advance(self, seconds) -> boolean` | Runs per frame; `true` keeps the effect active |

## Notes

- For effects that change over time without the source path changing, call `markNeedsAdvance()` on the context inside `advance()`.

## Related

- [protocol-path-effect-scripts.md](./protocol-path-effect-scripts.md)
- [path-measure.md](./path-measure.md)
- [artboard-node-data.md](./artboard-node-data.md)
