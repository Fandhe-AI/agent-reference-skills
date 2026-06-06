# Extruded Profile

Build a prismatic solid by drawing a 2D profile from lines and arcs and extruding it.

```python
import cadquery as cq

result = (
    cq.Workplane("front")
    .lineTo(2.0, 0)
    .lineTo(2.0, 1.0)
    .threePointArc((1.0, 1.5), (0.0, 1.0))
    .close()
    .extrude(0.25)
)
```

## Notes

- `.lineTo(x, y)` draws to an absolute coordinate; `.line(dx, dy)` uses relative offsets.
- `.threePointArc(midPoint, endPoint)` passes through the mid-point and ends at the end-point.
- `.close()` connects the last point back to the start, forming a closed wire required before `.extrude()`.
- The profile accumulates on the pending-wire stack; `.extrude()` consumes all pending wires at once.
