# Parametric Pillow Block

Build a bearing pillow block with a central hole and four counterbored mounting holes driven by parameters.

```python
import cadquery as cq

height = 60.0
width = 80.0
thickness = 10.0
diameter = 22.0
padding = 12.0

result = (
    cq.Workplane("XY")
    .box(height, width, thickness)
    .faces(">Z")
    .workplane()
    .hole(diameter)
    .faces(">Z")
    .workplane()
    .rect(height - padding, width - padding, forConstruction=True)
    .vertices()
    .cboreHole(2.4, 4.4, 2.1)
    .edges("|Z")
    .fillet(10.0)
)
```

## Notes

- `.rect(..., forConstruction=True).vertices()` locates the four mounting holes at rectangle corners without adding geometry.
- `.cboreHole(diameter, cboreDiameter, cboreDepth)` drills a counterbored hole at each vertex on the stack.
- `.edges("|Z").fillet(10.0)` rounds only the four vertical edges of the box.
- Changing `height`, `width`, or `diameter` automatically recalculates all downstream features.
