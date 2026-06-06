# Workplane Operations

Select faces to place new workplanes, offset them, and apply a rotated transformation for angled features.

```python
import cadquery as cq

# Hole on the top face
result = (
    cq.Workplane("XY")
    .box(3, 2, 0.5)
    .faces(">Z")
    .workplane()
    .hole(0.5)
)

# Angled holes via a rotated workplane
result_angled = (
    cq.Workplane("front")
    .box(4.0, 4.0, 0.25)
    .faces(">Z")
    .workplane()
    .transformed(offset=cq.Vector(0, -1.5, 1.0), rotate=cq.Vector(60, 0, 0))
    .rect(1.5, 1.5, forConstruction=True)
    .vertices()
    .hole(0.25)
)
```

## Notes

- `.faces(">Z").workplane()` centers the new workplane on the face with the largest Z value.
- `.faces("<X").workplane(offset=0.75)` offsets the workplane 0.75 units along the face normal.
- `.transformed(offset, rotate)` shifts and tilts the current workplane; `rotate` is Euler angles in degrees as a `Vector`.
- `centerOption` on `.workplane()` can be `"CenterOfMass"`, `"CenterOfBoundBox"`, or `"ProjectedOrigin"`.
