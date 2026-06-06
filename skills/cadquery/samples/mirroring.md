# Mirroring

Mirror a 2D wire profile about an axis, or mirror a 3D solid about a named plane or a selected face.

```python
import cadquery as cq

# Mirror a 2D wire and extrude (symmetric profile)
result_2d = (
    cq.Workplane("front")
    .hLine(1.0)
    .vLine(0.5)
    .hLine(-0.25)
    .vLine(-0.25)
    .hLineTo(0.0)
    .mirrorY()
    .extrude(0.25)
)

# Mirror a 3D solid about a selected face and union
result_3d = (
    cq.Workplane("XY")
    .line(0, 1)
    .line(1, 0)
    .line(0, -0.5)
    .close()
    .extrude(1)
)
result_3d = result_3d.mirror(result_3d.faces(">X"), union=True)
```

## Notes

- `.mirrorY()` and `.mirrorX()` operate on 2D wires only; they do not work on 3D solids.
- `.mirror(mirrorPlane, union=True)` accepts a string (`"XY"`, `"XZ"`, `"ZY"`), a `Face`, or a CQ object as the mirror plane.
- `union=True` fuses the mirror copy with the original in one step.
- Use `basePointVector` to shift a named mirror plane away from the origin.
