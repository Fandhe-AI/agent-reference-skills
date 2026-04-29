# Filtering Vertices

Vertex selectors operate on the **spatial location** of each vertex. Only position-based (extremum and center) selectors are meaningful for vertices.

## Signature / Usage

```python
# Select the vertex farthest in +Y
result = cq.Workplane("XY").box(2, 2, 2).vertices(">Y")

# Select the 2nd farthest vertex by center position in Y
result = cq.Workplane("XY").box(2, 2, 2).vertices(">>Y[-2]")
```

## Options / Props

| Selector String | Selector Class | Description |
|-----------------|---------------|-------------|
| `>Y` | `DirectionMinMaxSelector` | Vertex **farthest in +Y** |
| `<Y` | `DirectionMinMaxSelector` | Vertex **farthest in −Y** |
| `>>Y[-2]` | `CenterNthSelector` | **2nd farthest** vertex by position in Y |
| `<<Y[0]` | `CenterNthSelector` | **1st closest** vertex by position in Y |

## Notes

- Direction operators (`+`, `-`, `|`, `#`) do not apply to vertices since vertices have no direction vector.
- TypeSelector (`%`) does not apply to vertices.
- Index syntax `[n]` is 0-based; negative values count from the end.
- `X`, `Y`, `Z` axes and user-defined vectors (e.g., `>(-1, 1, 0)`) can all be used as the direction argument.

## Related

- [Combining Selectors](./combining.md)
- [Filtering Faces](./filtering-faces.md)
- [Filtering Edges](./filtering-edges.md)
- [User-defined Directions](./user-directions.md)
