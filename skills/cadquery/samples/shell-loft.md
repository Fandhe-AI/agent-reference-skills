# Shell and Loft

Hollow a solid into a thin-walled shell, and loft between two cross-section profiles.

```python
import cadquery as cq

# Hollow box open on top
shell_result = cq.Workplane("front").box(2, 2, 2).shell(-0.1)

# Loft from a circle to a rectangle
loft_result = (
    cq.Workplane("front")
    .box(4.0, 4.0, 0.25)
    .faces(">Z")
    .circle(1.5)
    .workplane(offset=3.0)
    .rect(0.75, 0.5)
    .loft(combine=True)
)
```

## Notes

- `.shell(thickness)` with a negative value hollows inward; a positive value grows outward from all faces.
- Pre-selecting faces with `.faces(selector)` before `.shell()` restricts which faces are offset.
- `.loft(combine=True)` requires at least two closed wires on different workplane levels and fuses the loft with the existing solid.
- The first wire is placed on the current face; the second is placed after `.workplane(offset=...)` shifts the plane.
