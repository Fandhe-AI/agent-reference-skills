# Basic Box

Create the simplest possible 3D solid — a rectangular box on a named workplane.

```python
import cadquery as cq

result = cq.Workplane("XY").box(2.0, 2.0, 0.5)
```

## Notes

- `Workplane("XY")` is the horizontal plane; `"front"` corresponds to the XZ plane.
- `.box(length, width, height)` centers the box on the workplane origin by default.
- The return value is a `Workplane` object; chain further operations or call `.export()` to save.
