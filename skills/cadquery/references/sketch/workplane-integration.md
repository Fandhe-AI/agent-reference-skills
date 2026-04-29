# Workplane Integration

A `Sketch` can be attached to a `Workplane` to drive 3D operations. Sketches can be created in-place with a fluent chain or pre-built and placed with `placeSketch()`. Supported 3D operations: `extrude()`, `twistExtrude()`, `revolve()`, `sweep()`, `cutBlind()`, `cutThruAll()`, `loft()`.

## Signature / Usage

```python
import cadquery as cq

# In-place sketch on a face
result = (
    cq.Workplane()
    .box(5, 5, 1)
    .faces(">Z")
    .sketch()
    .regularPolygon(2, 3, tag="outer")
    .regularPolygon(1.5, 3, mode="s")
    .vertices(tag="outer")
    .fillet(0.2)
    .finalize()
    .extrude(0.5)
)
```

## Key Workplane / Sketch Methods

| Signature | Description |
|-----------|-------------|
| `Workplane.sketch()` | Initialize an in-place sketch on the current workplane; returns a `Sketch` instance |
| `Sketch.finalize()` | End sketch construction and return to the parent `Workplane` |
| `Workplane.placeSketch(*sketches)` | Place one or more pre-built `Sketch` objects on the current workplane; each sketch is positioned at the current stack location |

## Sketches In-Place

The `sketch()` / `finalize()` pair wraps sketch construction inside a `Workplane` chain. All sketch methods are available between these two calls.

```python
import cadquery as cq

result = (
    cq.Workplane()
    .box(5, 5, 1)
    .faces(">Z")
    .sketch()
    .regularPolygon(2, 3, tag="outer")
    .regularPolygon(1.5, 3, mode="s")
    .vertices(tag="outer")
    .fillet(0.2)
    .finalize()
    .extrude(0.5)
)
```

## Placing an Existing Sketch

Pre-built sketches can be reused and placed on any workplane with `placeSketch()`.

```python
import cadquery as cq

s = cq.Sketch().trapezoid(3, 1, 110).vertices().fillet(0.2)

result = (
    cq.Workplane()
    .box(5, 5, 5)
    .faces(">X")
    .workplane()
    .transformed((0, 0, -90))
    .placeSketch(s)
    .cutThruAll()
)
```

## Sketches Spanning Multiple Elements

When multiple stack elements are selected before calling `sketch()`, one sketch is created per location.

```python
import cadquery as cq

result = (
    cq.Workplane()
    .box(5, 5, 1)
    .faces(">Z")
    .workplane()
    .rarray(2, 2, 2, 2)
    .rect(1.5, 1.5)
    .extrude(0.5)
    .faces(">Z")
    .sketch()
    .circle(0.4)
    .wires()
    .distribute(6)
    .circle(0.1, mode="a")
    .clean()
    .finalize()
    .cutBlind(-0.5, taper=10)
)
```

## Lofting Between Two Sketches

`loft()` requires two sketches on different workplanes. Pass both to a single `placeSketch()` call (only sketches on the top of stack are considered).

```python
from cadquery import Workplane, Sketch, Vector, Location

s1 = Sketch().trapezoid(3, 1, 110).vertices().fillet(0.2)
s2 = Sketch().rect(2, 1).vertices().fillet(0.2)

result = Workplane().placeSketch(s1, s2.moved(z=3)).loft()
```

## Combining Sketches

Sketches can be combined using `Sketch.face()` or Python boolean operators.

```python
import cadquery as cq

# Using face() with mode
s1 = cq.Sketch().rect(2, 2)
s2 = cq.Sketch().circle(0.5)
result = s1.face(s2, mode="s")

# Using boolean operator (reset() required before operator)
s1 = cq.Sketch().rect(2, 2).vertices().fillet(0.25).reset()
s2 = cq.Sketch().rect(1, 1, angle=45).vertices().chamfer(0.1).reset()
result = s1 - s2
```

## Offsets

Use `copy()` + `wires()` + `offset()` to create an offset version of a sketch without modifying the original.

```python
import cadquery as cq

sketch = (
    cq.Sketch()
    .rect(1.0, 4.0)
    .circle(1.0)
    .clean()
)

# Positive offset (outward)
sketch_offset = sketch.copy().wires().offset(0.25)
result = cq.Workplane("front").placeSketch(sketch_offset).extrude(1.0)
result = result.faces(">Z").workplane().placeSketch(sketch).cutBlind(-0.50)

# Negative offset (inward) — use mode='r' to replace the original face
sketch_offset = sketch.copy().wires().offset(-0.25, mode="r")
```

## Exporting and Importing

```python
# Export sketch to file
sketch.export("output.dxf")

# Import DXF file
sketch = cq.Sketch().importDXF("input.dxf", tol=1e-6)
```

| Signature | Description |
|-----------|-------------|
| `Sketch.export(fname, tolerance=0.1, angularTolerance=0.1, opt=None)` | Export sketch geometry to a file (DXF, SVG, etc.) |
| `Sketch.importDXF(filename, tol=1e-6, exclude=[], include=[], angle=0, mode='a', tag=None)` | Import a DXF file and construct face(s); `exclude`/`include` filter layer names |

## Notes

- `loft()` only considers outer wires; inner wires are silently ignored.
- When lofting or sweeping, all relevant sketches must be added in a single `placeSketch()` call.
- `placeSketch()` positions the sketch at all locations currently on the stack.
- Negative offsets require `mode='r'` (replace) to avoid leaving the original face behind.

## Related

- [tutorial.md](./tutorial.md)
