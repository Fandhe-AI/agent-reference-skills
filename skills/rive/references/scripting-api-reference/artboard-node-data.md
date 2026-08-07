# NodeData / NodeReadData

Node types representing a node within an [Artboard](./artboard-artboard.md)'s hierarchy: transform properties and parent-child relationships. `NodeData` is the writable transform-decompose form; `NodeReadData` is the general read/write node returned by `artboard:node(name)`.

## Signature / Usage

```lua
local node = self.instance:node('Root')
if node then
  local m = Mat2D.withTranslation(100, 100)
  node:decompose(m) -- updates position, rotation, scale from a world transform
end

-- NodeReadData fields
print(node.position.x, node.position.y, node.rotation, node.scaleX, node.scaleY)
local path = node:asPath()   -- PathData? if this node is a Path
local paint = node:asPaint() -- Paint? if this node is a ShapePaint (coming soon)
```

## Options / Props

| Member | Type | Description |
| --- | --- | --- |
| `children` | `{ NodeReadData }` | Child nodes (NodeData) |
| `parent` | `NodeReadData?` | Parent node, nil if at root |
| `decompose(worldTransform: Mat2D)` | — | Updates position, rotation, and scale from a world transform (NodeData) |
| `position` | `Vector` | Local position (NodeReadData) |
| `rotation` | `number` | Local rotation in radians |
| `scale` | `Vector` | Local scale |
| `x` / `y` | `number` | Local position components |
| `scaleX` / `scaleY` | `number` | Local scale components |
| `worldTransform` | read-only | World transform matrix (`xx, xy, yx, yy, tx, ty`) |
| `paint` | — | Paint trait for Path nodes (coming soon) |
| `asPath() -> PathData?` | — | This node as PathData, if it is a Path |
| `asPaint() -> Paint?` | — | This node as Paint, if it is a ShapePaint (coming soon) |

## Related

- [artboard-artboard.md](./artboard-artboard.md)
- [mat2d.md](./mat2d.md)
- [path.md](./path.md)
