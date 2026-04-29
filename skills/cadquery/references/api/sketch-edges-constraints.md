# Sketching with Edges and Constraints

Edge-based sketch construction with geometric constraint support in CadQuery.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Sketch.edge` | `Sketch.edge(val, tag=None, forConstruction=False)` | Add an edge object directly to the sketch |
| `Sketch.segment` | `Sketch.segment(p1, p2, tag=None, forConstruction=False)` | Construct a line segment between two points |
| `Sketch.arc` | `Sketch.arc(p1, p2, p3, tag=None, forConstruction=False)` | Construct a three-point arc |
| `Sketch.spline` | `Sketch.spline(pts, tangents=None, periodic=False, tag=None, forConstruction=False)` | Construct a spline through given points |
| `Sketch.close` | `Sketch.close(tag=None)` | Connect the last edge back to the first edge |
| `Sketch.assemble` | `Sketch.assemble(mode="a", tag=None)` | Assemble open edges into closed face(s) |
| `Sketch.constrain` | `Sketch.constrain(tag1, tag2, constraint, arg)` | Add a geometric constraint between tagged edges |
| `Sketch.solve` | `Sketch.solve()` | Solve current constraints and update edge positions |

## Signature / Usage

```python
import cadquery as cq

# Edge-based workflow with constraints
result = (
    cq.Workplane("XY")
    .sketch()
    .segment((0, 0), (1, 0), tag="bottom")
    .segment((1, 0), (1, 1), tag="right")
    .segment((1, 1), (0, 1), tag="top")
    .close()
    .assemble(mode="a")
    .finalize()
    .extrude(0.5)
)
```

## Options / Props

### `Sketch.edge(val, tag, forConstruction)`

| Name | Type | Description |
|------|------|-------------|
| `val` | `Edge` | Edge object to add |
| `tag` | `str \| None` | Tag for the edge |
| `forConstruction` | `bool` | Mark as construction geometry (not included in face) |

### `Sketch.segment(p1, p2, tag, forConstruction)`

| Name | Type | Description |
|------|------|-------------|
| `p1` | `tuple[float, float]` | Start point `(x, y)` |
| `p2` | `tuple[float, float]` | End point `(x, y)` |
| `tag` | `str \| None` | Tag for the segment |
| `forConstruction` | `bool` | Mark as construction geometry |

### `Sketch.arc(p1, p2, p3, tag, forConstruction)`

| Name | Type | Description |
|------|------|-------------|
| `p1` | `tuple[float, float]` | Start point |
| `p2` | `tuple[float, float]` | Midpoint on arc |
| `p3` | `tuple[float, float]` | End point |
| `tag` | `str \| None` | Tag for the arc |
| `forConstruction` | `bool` | Mark as construction geometry |

### `Sketch.spline(pts, tangents, periodic, tag, forConstruction)`

| Name | Type | Description |
|------|------|-------------|
| `pts` | `list[tuple]` | Ordered list of points the spline passes through |
| `tangents` | `list[tuple] \| None` | Tangent vectors at each point |
| `periodic` | `bool` | Create a closed periodic spline |
| `tag` | `str \| None` | Tag for the spline |
| `forConstruction` | `bool` | Mark as construction geometry |

### `Sketch.constrain(tag1, tag2, constraint, arg)`

| Name | Type | Description |
|------|------|-------------|
| `tag1` | `str` | Tag of first edge |
| `tag2` | `str` | Tag of second edge |
| `constraint` | `str` | Constraint type (e.g. `"Coincident"`, `"Angle"`, `"Length"`, `"Distance"`, `"Horizontal"`, `"Vertical"`, `"Tangent"`) |
| `arg` | `float \| None` | Numeric argument for the constraint (e.g. angle degrees, length) |

## Notes

- Edges must form a closed loop before calling `Sketch.assemble()` to build a face.
- `Sketch.close()` is a convenience shortcut that adds the final segment to close the loop.
- `Sketch.solve()` must be called after adding all constraints to update geometry positions.
- Construction edges (forConstruction=True) are used as references for constraints but are not part of the resulting face.
- Constraints are solved using a 2D constraint solver; over- or under-constrained sketches will raise an error.

## Related

- [Sketch Initialization](./sketch-initialization.md)
- [Sketch Selection](./sketch-selection.md)
- [Sketching with Faces](./sketch-faces.md)
