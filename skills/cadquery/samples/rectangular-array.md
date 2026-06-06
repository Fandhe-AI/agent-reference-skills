# Rectangular Array

Place features at regularly spaced grid positions using `.rarray()` on a workplane.

```python
import cadquery as cq

# 3x2 grid of holes on a plate
result = (
    cq.Workplane("XY")
    .box(30, 20, 3)
    .faces(">Z")
    .workplane()
    .rarray(8, 8, 3, 2, center=True)
    .hole(2)
)

# Lego-style stud pattern
pitch = 8.0
bump_diam = 4.8
bump_height = 1.8
lbumps, wbumps = 4, 2

studs = (
    cq.Workplane("XY")
    .box(pitch * lbumps, pitch * wbumps, 9.6)
    .faces(">Z")
    .workplane()
    .rarray(pitch, pitch, lbumps, wbumps, True)
    .circle(bump_diam / 2.0)
    .extrude(bump_height)
)
```

## Notes

- `.rarray(xSpacing, ySpacing, xCount, yCount, center=True)` pushes `xCount × yCount` points onto the stack.
- Any subsequent feature operation (`.hole()`, `.circle().extrude()`, `.cboreHole()`, etc.) is applied once per point.
- `center=True` centers the grid on the workplane origin; `center=False` starts at the origin.
- Combine with `.parray(radius, startAngle, arc, count)` for polar patterns.
