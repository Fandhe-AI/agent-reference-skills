# Construction Geometry

Construction geometry consists of features that are not part of the final solid — they exist only to help locate or orient other features. In CadQuery, any 2D drawing method accepts a `forConstruction=True` parameter to mark its result as construction-only.

## Signature / Usage

```python
result = (
    cq.Workplane("XY")
    .rect(2, 2, forConstruction=True)   # construction rectangle — not extruded
    .vertices()                          # select its 4 corners
    .circle(0.1)                         # draw circles at each corner
    .extrude(0.5)                        # extrude only the circles
)
```

## How It Works

When `forConstruction=True` is passed, the resulting wire or edge is placed only in `objects` for selection purposes but is **not** added to `CQContext.pendingWires` or `pendingEdges`. This means 3D operations (extrude, revolve, etc.) will ignore it.

## Methods That Accept `forConstruction`

| Method | Notes |
|--------|-------|
| `rect(xLen, yLen, forConstruction=False)` | Rectangle |
| `circle(radius, forConstruction=False)` | Circle |
| `ellipse(x_radius, y_radius, ..., forConstruction=False)` | Ellipse |
| `line(xDist, yDist, forConstruction=False)` | Relative line |
| `lineTo(x, y, forConstruction=False)` | Absolute line |
| `hLine(distance, forConstruction=False)` | Horizontal line |
| `vLine(distance, forConstruction=False)` | Vertical line |
| `polyline(listOfXYTuple, forConstruction=False)` | Polyline |
| `spline(listOfXYTuple, ..., forConstruction=False)` | Spline |
| `slot2D(length, diameter, ...)` | Does not expose `forConstruction` |
| `wire(forConstruction=False)` | Connect pending edges into a wire |

## Notes

- The typical pattern is: draw a construction shape → select its vertices/edges → place real geometry at those locations → extrude or otherwise build the solid.
- Construction geometry is useful for symmetrically placed holes, bolt circles, or any layout that should not itself become a solid feature.
- After selection methods consume the construction objects from the stack, they leave no trace in `pendingWires`.

## Related

- [2D Construction](./2d-construction.md)
- [Iteration](./iteration.md)
- [Selectors](./selectors.md)
