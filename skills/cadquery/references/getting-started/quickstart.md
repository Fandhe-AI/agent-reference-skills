# QuickStart

Build a parametric bearing pillow block — a rectangular block with a central bearing pocket and counter-bored corner screw holes — in under 30 lines of Python.

## Final Result

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
    .faces(">Z").workplane()
    .hole(diameter)
    .faces(">Z").workplane()
    .rect(height - padding, width - padding, forConstruction=True)
    .vertices()
    .cboreHole(2.4, 4.4, 2.1)
    .edges("|Z")
    .fillet(2.0)
)
```

## Step-by-Step

### 1. Rectangular block

```python
result = cq.Workplane("XY").box(height, width, thickness)
```

### 2. Central bearing hole

```python
result = (
    cq.Workplane("XY")
    .box(height, width, thickness)
    .faces(">Z").workplane()
    .hole(diameter)
)
```

- `.faces(">Z")` — selects the topmost face
- `.workplane()` — creates a work surface on that face
- `.hole(diameter)` — drills a through-hole centered on the workplane

### 3. Counter-bored corner holes

```python
.faces(">Z").workplane()
.rect(height - padding, width - padding, forConstruction=True)
.vertices()
.cboreHole(2.4, 4.4, 2.1)
```

- `forConstruction=True` — the rectangle is a layout guide, not a solid feature
- `.vertices()` — selects the four corners of the construction rectangle
- `.cboreHole(clearance_dia, cbore_dia, cbore_depth)` — drills counterbored holes at each vertex

### 4. Fillet vertical edges

```python
.edges("|Z").fillet(2.0)
```

- `"|Z"` — selects all edges parallel to the Z-axis

## Exporting

```python
cq.exporters.export(result, "result.stl")
cq.exporters.export(result.section(), "result.dxf")
cq.exporters.export(result, "result.step")
```

## Notes

- Parameters (`height`, `width`, etc.) can be changed to generate different bearing sizes with zero code changes — that is the point of parametric modeling.
- `show_object(result)` displays the model inside CQ-editor during development.

## Related

- [Introduction](./introduction.md)
- [Concepts](./concepts.md)
