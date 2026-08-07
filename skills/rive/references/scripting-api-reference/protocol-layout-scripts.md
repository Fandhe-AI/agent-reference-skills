# Layout Scripts

Layout Scripts extend [Node Scripts](./protocol-node-scripts.md), giving programmatic control over Layout components: measurement, sizing, and geometry-change reactions. Useful for masonry grids, carousels, and custom spacing logic.

## Signature / Usage

```lua
-- Measure: only affects layouts with Hug Fit; proposes an ideal size
function measure(self: MyLayout): Vec2D
  return Vec2D.xy(100, 100)
end

-- Resize: runs whenever the Layout receives a new size from its parent
function resize(self: MyLayout, size: Vec2D)
  print("New size:", size.x, size.y)
end
```

## Options / Props

| Lifecycle function | Required | Description |
| --- | --- | --- |
| `measure(self)` | optional | Proposes an ideal size; only affects Hug Fit layouts |
| `resize(self, size)` | required | Runs when the Layout receives a new size from its parent; position children / recalc flow here |

## Notes

- Add a Layout Script by first adding a Layout to the scene, creating a script with type **Layout**, then adding the script as a child of the Layout.

## Related

- [protocol-node-scripts.md](./protocol-node-scripts.md)
