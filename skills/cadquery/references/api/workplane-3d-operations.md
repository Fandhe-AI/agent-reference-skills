# 3D Operations (Requiring 2D Workplane)

3D solid creation and Boolean operations that use an active 2D workplane profile in CadQuery.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane.cboreHole` | `cboreHole(diameter, cboreDiameter, cboreDepth, depth=None, clean=True)` | Make a counterbored hole for each item on the stack |
| `Workplane.cskHole` | `cskHole(diameter, cskDiameter, cskAngle, depth=None, clean=True)` | Make a countersunk hole for each item on the stack |
| `Workplane.hole` | `hole(diameter, depth=None, clean=True)` | Make a simple hole for each item on the stack |
| `Workplane.extrude` | `extrude(until, combine=True, clean=True, both=False, taper=None)` | Create a prismatic solid by extruding pending wires |
| `Workplane.cut` | `cut(toCut, clean=True, tol=None)` | Subtract a solid from the current solid |
| `Workplane.cutBlind` | `cutBlind(until, clean=True, both=False, taper=None)` | Create a prismatic cut to a specified depth |
| `Workplane.cutThruAll` | `cutThruAll(clean=True, taper=0)` | Create a prismatic cut completely through the solid |
| `Workplane.box` | `box(length, width, height, centered=True, combine=True, clean=True)` | Create a 3D box |
| `Workplane.sphere` | `sphere(radius, direct=(0,0,1), angle1=-90, angle2=90, angle3=360, centered=True, combine=True, clean=True)` | Create a 3D sphere |
| `Workplane.wedge` | `wedge(dx, dy, dz, xmin, zmin, xmax, zmax, pnt=(0,0,0), dir=(0,1,0), centered=True, combine=True, clean=True)` | Create a 3D wedge |
| `Workplane.cylinder` | `cylinder(height, radius, direct=(0,0,1), angle=360, centered=True, combine=True, clean=True)` | Create a cylinder |
| `Workplane.union` | `union(toUnion=None, clean=True, glue=False, tol=None)` | Union the stack items with the current solid |
| `Workplane.combine` | `combine(clean=True, glue=False, tol=None)` | Combine all stack items into a single solid |
| `Workplane.intersect` | `intersect(toIntersect, clean=True, tol=None)` | Intersect the provided solid with the current solid |
| `Workplane.loft` | `loft(ruled=False, combine=True, clean=True)` | Create a lofted solid through a set of wire profiles |
| `Workplane.sweep` | `sweep(path, multisection=False, makeSolid=True, isFrenet=False, combine=True, clean=True, transition="right", normal=None, auxSpine=None)` | Sweep a profile along a path |
| `Workplane.twistExtrude` | `twistExtrude(distance, angleDegrees, combine=True, clean=True)` | Extrude a profile while twisting by the given angle |
| `Workplane.revolve` | `revolve(angleDegrees=360, axisStart=None, axisEnd=None, combine=True, clean=True)` | Revolve a wire profile around an axis to create a solid |
| `Workplane.text` | `text(txt, fontsize, distance, cut=True, halign="center", valign="center", font="Arial", fontPath=None, kind="regular", combine=False, clean=True)` | Create 3D extruded text |

## Signature / Usage

```python
import cadquery as cq

# Extrude a rectangle
result = cq.Workplane("XY").rect(4, 2).extrude(1)

# Revolve a profile
result = (
    cq.Workplane("XZ")
    .lineTo(2, 0)
    .lineTo(2, 3)
    .lineTo(0, 3)
    .close()
    .revolve(360, (0, 0, 0), (0, 1, 0))
)

# Loft between two profiles
result = (
    cq.Workplane("XY")
    .rect(4, 4)
    .workplane(offset=5)
    .circle(1)
    .loft()
)
```

## Options / Props

### `Workplane.extrude(until, combine, clean, both, taper)`

| Name | Type | Description |
|------|------|-------------|
| `until` | `float \| str` | Distance to extrude, or `"next"` / `"last"` to extrude to the next/last face |
| `combine` | `bool \| str` | `True` = union with existing solid; `"cut"` = subtract; `"a"/"s"/"i"` |
| `clean` | `bool` | Run `clean()` after operation (default `True`) |
| `both` | `bool` | Extrude in both directions |
| `taper` | `float \| None` | Draft angle in degrees |

### `Workplane.hole(diameter, depth, clean)`

| Name | Type | Description |
|------|------|-------------|
| `diameter` | `float` | Hole diameter |
| `depth` | `float \| None` | Depth (`None` = thru-all) |
| `clean` | `bool` | Run `clean()` after operation |

### `Workplane.cboreHole(diameter, cboreDiameter, cboreDepth, depth, clean)`

| Name | Type | Description |
|------|------|-------------|
| `diameter` | `float` | Through-hole diameter |
| `cboreDiameter` | `float` | Counterbore diameter |
| `cboreDepth` | `float` | Counterbore depth |
| `depth` | `float \| None` | Total hole depth (`None` = thru-all) |
| `clean` | `bool` | Run `clean()` after operation |

### `Workplane.sweep(path, multisection, ...)`

| Name | Type | Description |
|------|------|-------------|
| `path` | `Wire \| Workplane` | The path to sweep along |
| `multisection` | `bool` | Use multiple wire profiles from the stack |
| `isFrenet` | `bool` | Use Frenet frame for orientation |
| `transition` | `str` | Transition mode: `"right"`, `"round"`, `"transformed"` |
| `normal` | `Vector \| None` | Fixed normal vector |
| `auxSpine` | `Wire \| None` | Auxiliary spine for orientation |

### `Workplane.revolve(angleDegrees, axisStart, axisEnd, combine, clean)`

| Name | Type | Description |
|------|------|-------------|
| `angleDegrees` | `float` | Angle of revolution (default `360`) |
| `axisStart` | `tuple \| None` | Start point of revolution axis (default: workplane origin) |
| `axisEnd` | `tuple \| None` | End point of revolution axis (default: workplane Y axis) |
| `combine` | `bool` | Union with existing solid |
| `clean` | `bool` | Run `clean()` after operation |

## Notes

- `extrude(until="next")` and `extrude(until="last")` use face topology to determine depth automatically.
- Boolean operations (`cut`, `union`, `intersect`) accept either a `Workplane` or `Shape` argument.
- `combine=True` (default) merges the new solid with the existing one on the stack; `combine=False` leaves separate solids.
- `clean=True` (default) calls `Solid.clean()` to heal the result, which can be slow for complex geometry.
- `loft()` requires at least two wire profiles on the stack (created with `workplane()` calls between them).

## Related

- [2D Operations](./workplane-2d-operations.md)
- [3D Operations (Not Requiring 2D Workplane)](./workplane-3d-non-2d.md)
- [Workplane Initialization](./workplane-initialization.md)
