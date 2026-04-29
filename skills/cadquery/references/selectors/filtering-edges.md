# Filtering Edges

Edge selectors operate on the **direction vector** of each edge. Non-linear edges (arcs, splines, etc.) are excluded from direction-based selectors; only the type (`%`) and center (`>>` / `<<`) selectors apply to them.

## Signature / Usage

```python
# Select edges parallel to Z
result = cq.Workplane("XY").box(2, 2, 2).edges("|Z")

# Chamfer edges parallel to Z and farthest in +Y
result = cq.Workplane("XY").box(2, 2, 2).edges("|Z and >Y").chamfer(0.2)

# Select the 2nd closest linear edge parallel to Y
result = cq.Workplane("XY").box(2, 2, 2).edges(">Y[1]")
```

## Options / Props

| Selector String | Selector Class | Description |
|-----------------|---------------|-------------|
| `+Z` | `DirectionSelector` | Edge **aligned in the positive Z** direction |
| `-X` | `DirectionSelector` | Edge **aligned in the negative X** direction |
| `\|Z` | `ParallelDirSelector` | Edge **parallel** to Z axis |
| `#Z` | `PerpendicularDirSelector` | Edge **perpendicular** to Z axis |
| `%Line` | `TypeSelector` | Edge is a **straight line** (also: `%Circle`, `%Ellipse`, `%Hyperbola`, `%Parabola`, `%BSplineCurve`, `%OffsetCurve`) |
| `>Y` | `DirectionMinMaxSelector` | Edge **farthest in +Y** direction |
| `<Y` | `DirectionMinMaxSelector` | Edge **farthest in −Y** direction |
| `>Y[1]` | `DirectionNthSelector` | **2nd closest** edge parallel to Y (0-based index) |
| `<Y[-2]` | `DirectionNthSelector` | **2nd farthest** edge parallel to −Y |
| `>>Y[-2]` | `CenterNthSelector` | **2nd farthest** edge by **center** position in Y |
| `<<Y[0]` | `CenterNthSelector` | **1st closest** edge by **center** position in Y |

## Notes

- Direction-based selectors (`+`, `-`, `|`, `#`, `>`, `<`) only match **linear** edges. Curves are skipped.
- `%` (TypeSelector) and `>>` / `<<` (CenterNthSelector) work on all edge types including arcs and splines.
- Index syntax `[n]` is 0-based; negative values count from the end.

## Related

- [Combining Selectors](./combining.md)
- [Filtering Faces](./filtering-faces.md)
- [Filtering Vertices](./filtering-vertices.md)
- [User-defined Directions](./user-directions.md)
