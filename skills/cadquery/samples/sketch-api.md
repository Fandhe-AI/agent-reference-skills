# Sketch API

Construct a 2D face using the `cq.Sketch` API with face-based boolean modes, arrays, and edge-based assembly.

```python
import cadquery as cq

# Face-based: trapezoid with corner circles subtracted and slot array
sketch_face = (
    cq.Sketch()
    .trapezoid(4, 3, 90)
    .vertices()
    .circle(0.5, mode="s")
    .reset()
    .vertices()
    .fillet(0.25)
    .reset()
    .rarray(0.6, 1, 5, 1)
    .slot(1.5, 0.4, mode="s", angle=90)
)

# Edge-based: assemble edges into a face, then chamfer
sketch_edge = (
    cq.Sketch()
    .segment((0.0, 0), (0.0, 2.0))
    .segment((2.0, 0))
    .close()
    .arc((0.6, 0.6), 0.4, 0.0, 360.0)
    .assemble(tag="face")
    .edges("%LINE", tag="face")
    .vertices()
    .chamfer(0.2)
)

# Use a sketch as an extrusion profile
result = (
    cq.Workplane("XY")
    .placeSketch(sketch_face)
    .extrude(2)
)
```

## Notes

- `mode="s"` subtracts the shape; `mode="a"` (default) fuses it; `mode="i"` intersects.
- `.reset()` clears the selection between operations — omitting it causes unexpected multi-selection.
- `.rarray(xs, ys, nx, ny)` places `nx × ny` copies; `.parray(r, a1, da, n)` places a polar array.
- Edge-based sketches require `.assemble()` to convert the wire collection into faces before applying fillets or chamfers.
