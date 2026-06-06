# QuickStart

Build a parametric bearing pillow block — a rectangular block with a central bearing pocket and counter-bored corner screw holes — in under 30 lines of Python.

## Running Without a Local Install

CadQuery can be run via containers without a full local installation:

```bash
# Apptainer
apptainer run oras://ghcr.io/cadquery/cadquery-apptainer:master ipython -i your_script.py

# Docker / Podman (Linux, with display forwarding)
podman run -it -v /tmp:/tmp -e DISPLAY=$DISPLAY -v $(pwd):/data \
    ghcr.io/cadquery/cadquery-docker:master ipython -i /data/your_script.py
```

Or follow the standard [Installation](./installation.md) guide for a local setup.

## Final Result

```python
import cadquery as cq
from cadquery.vis import show

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
    .fillet(10.0)
)

show(result)
```

## Step-by-Step

### 1. Rectangular block

```python
result = cq.Workplane("XY").box(height, width, thickness)
show(result)
```

### 2. Central bearing hole

```python
result = (
    cq.Workplane("XY")
    .box(height, width, thickness)
    .faces(">Z").workplane()
    .hole(diameter)
)
show(result)
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
- `.cboreHole(clearance_dia, cbore_dia, cbore_depth)` — drills counterbored holes at each vertex; the function operates on each of the four points automatically

### 4. Fillet vertical edges

```python
.edges("|Z").fillet(10.0)
```

- `"|Z"` — selects all edges parallel to the Z-axis
- Radius is `10.0` mm for a fully rounded corner appearance

## Exporting

```python
result.export("result.stl")
result.export("result.step")
```

## Notes

- Parameters (`height`, `width`, etc.) can be changed to generate different bearing sizes with zero code changes — that is the point of parametric modeling.
- `show()` from `cadquery.vis` opens an interactive VTK viewer; it is blocking until closed.
- `show_object(result)` displays the model inside CQ-editor during development.

## Related

- [Introduction](./introduction.md)
- [Concepts](./concepts.md)
