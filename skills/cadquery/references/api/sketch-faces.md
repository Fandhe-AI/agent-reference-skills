# Sketching with Faces

Face-based sketch construction API — create closed-face primitives, arrays, and perform local modifications within a CadQuery sketch.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Sketch.face` | `Sketch.face(b, angle=0, mode="a", tag=None, ignore_selection=False)` | Construct a face from a wire or edges |
| `Sketch.rect` | `Sketch.rect(w, h, angle=0, mode="a", tag=None)` | Construct a rectangular face |
| `Sketch.circle` | `Sketch.circle(r, mode="a", tag=None)` | Construct a circular face |
| `Sketch.ellipse` | `Sketch.ellipse(a1, a2, angle=0, mode="a", tag=None)` | Construct an elliptical face |
| `Sketch.trapezoid` | `Sketch.trapezoid(w, h, a1, a2=None, angle=0, mode="a", tag=None)` | Construct a trapezoidal face |
| `Sketch.slot` | `Sketch.slot(w, h, angle=0, mode="a", tag=None)` | Construct a slot-shaped face |
| `Sketch.regularPolygon` | `Sketch.regularPolygon(r, n, angle=0, mode="a", tag=None)` | Construct a regular N-sided polygonal face |
| `Sketch.polygon` | `Sketch.polygon(pts, angle=0, mode="a", tag=None)` | Construct a polygonal face from points |
| `Sketch.rarray` | `Sketch.rarray(xs, ys, nx, ny)` | Generate a rectangular array of locations |
| `Sketch.parray` | `Sketch.parray(r, a1, da, n, rotate=True)` | Generate a polar array of locations |
| `Sketch.distribute` | `Sketch.distribute(n, start=0, stop=1, rotate=True)` | Distribute locations along selected edges or wires |
| `Sketch.each` | `Sketch.each(callback, mode="a", tag=None, ignore_selection=False)` | Apply a callback on all applicable entities |
| `Sketch.push` | `Sketch.push(locs, tag=None)` | Set current selection to given locations or points |
| `Sketch.hull` | `Sketch.hull(mode="a", tag=None)` | Generate a convex hull from the current selection or all objects |
| `Sketch.offset` | `Sketch.offset(d, mode="a", tag=None)` | Offset selected wires or edges by distance `d` |
| `Sketch.fillet` | `Sketch.fillet(d)` | Add a fillet to the current selection |
| `Sketch.chamfer` | `Sketch.chamfer(d)` | Add a chamfer to the current selection |
| `Sketch.clean` | `Sketch.clean()` | Remove internal wires from faces |

## Signature / Usage

```python
import cadquery as cq

result = (
    cq.Workplane("XY")
    .sketch()
    .rect(4, 2)                        # outer rectangle face
    .rarray(1.5, 0.75, 2, 2)           # 2x2 grid of locations
    .circle(0.25, mode="s")            # subtract circles at each location
    .reset()
    .vertices()
    .fillet(0.25)
    .finalize()
    .extrude(0.5)
)
```

## Options / Props

### Common `mode` parameter

| Value | Meaning |
|-------|---------|
| `"a"` | Add (union) to the sketch |
| `"s"` | Subtract from the sketch |
| `"i"` | Intersect with the sketch |
| `"c"` | Construction (not included in final face) |

### `Sketch.rect(w, h, angle, mode, tag)`

| Name | Type | Description |
|------|------|-------------|
| `w` | `float` | Width |
| `h` | `float` | Height |
| `angle` | `float` | Rotation angle in degrees (default `0`) |
| `mode` | `str` | Boolean mode (default `"a"`) |
| `tag` | `str \| None` | Tag assigned to the result |

### `Sketch.rarray(xs, ys, nx, ny)`

| Name | Type | Description |
|------|------|-------------|
| `xs` | `float` | X spacing between elements |
| `ys` | `float` | Y spacing between elements |
| `nx` | `int` | Number of elements in X |
| `ny` | `int` | Number of elements in Y |

### `Sketch.parray(r, a1, da, n, rotate)`

| Name | Type | Description |
|------|------|-------------|
| `r` | `float` | Radius of the polar array |
| `a1` | `float` | Starting angle in degrees |
| `da` | `float` | Angular spacing in degrees |
| `n` | `int` | Number of elements |
| `rotate` | `bool` | Rotate each element to face outward (default `True`) |

### `Sketch.distribute(n, start, stop, rotate)`

| Name | Type | Description |
|------|------|-------------|
| `n` | `int` | Number of locations to distribute |
| `start` | `float` | Parameter start along edge/wire (0–1, default `0`) |
| `stop` | `float` | Parameter stop along edge/wire (0–1, default `1`) |
| `rotate` | `bool` | Align elements tangent to the edge (default `True`) |

### `Sketch.offset(d, mode, tag)`

| Name | Type | Description |
|------|------|-------------|
| `d` | `float` | Offset distance (positive = outward) |
| `mode` | `str` | Boolean mode (default `"a"`) |
| `tag` | `str \| None` | Tag assigned to the result |

## Notes

- Array methods (`rarray`, `parray`, `distribute`, `push`) set the current location context; subsequent face-creation calls are placed at each location.
- `mode="s"` is the primary way to create holes/cutouts within a sketch.
- `Sketch.clean()` removes leftover internal wires that can interfere with extrusion.
- `Sketch.hull()` wraps all selected geometry in a convex hull face.

## Related

- [Sketch Initialization](./sketch-initialization.md)
- [Sketch Selection](./sketch-selection.md)
- [Sketching with Edges and Constraints](./sketch-edges-constraints.md)
