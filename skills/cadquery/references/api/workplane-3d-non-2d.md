# 3D Operations (Not Requiring 2D Workplane)

3D modification operations that work directly on selected solid geometry without requiring a 2D sketch profile.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane.shell` | `shell(thickness, kind="arc")` | Hollow out a solid by removing selected faces and shelling |
| `Workplane.fillet` | `fillet(radius)` | Fillet selected edges of a solid with the given radius |
| `Workplane.chamfer` | `chamfer(length, length2=None)` | Chamfer selected edges of a solid |
| `Workplane.split` | `split(keepTop=False, keepBottom=False, keepBoth=False)` | Split a solid along the active workplane |
| `Workplane.rotate` | `rotate(axisStartPoint, axisEndPoint, angleDegrees)` | Return a copy of stack items rotated around an axis |
| `Workplane.rotateAboutCenter` | `rotateAboutCenter(axisEndPoint, angleDegrees)` | Rotate stack items around their center by the given angle |
| `Workplane.translate` | `translate(vec)` | Return a copy of stack items moved by a translation vector |
| `Workplane.mirror` | `mirror(mirrorPlane="XY", basePointVector=(0,0,0), union=False)` | Mirror stack items about a plane |

## Signature / Usage

```python
import cadquery as cq

# Fillet all edges of a box
result = (
    cq.Workplane("XY")
    .box(4, 4, 4)
    .edges("|Z")
    .fillet(0.5)
)

# Shell a box (remove top face)
result = (
    cq.Workplane("XY")
    .box(4, 4, 4)
    .faces(">Z")
    .shell(0.2)
)

# Mirror a shape
result = (
    cq.Workplane("XY")
    .box(2, 2, 2)
    .translate((3, 0, 0))
    .mirror("YZ")
)
```

## Options / Props

### `Workplane.shell(thickness, kind)`

| Name | Type | Description |
|------|------|-------------|
| `thickness` | `float` | Wall thickness (positive = inward; negative = outward) |
| `kind` | `str` | Offset type: `"arc"` (default), `"intersection"`, `"tangent"` |

### `Workplane.fillet(radius)`

| Name | Type | Description |
|------|------|-------------|
| `radius` | `float` | Fillet radius |

### `Workplane.chamfer(length, length2)`

| Name | Type | Description |
|------|------|-------------|
| `length` | `float` | Chamfer length |
| `length2` | `float \| None` | Second chamfer length for asymmetric chamfer |

### `Workplane.split(keepTop, keepBottom, keepBoth)`

| Name | Type | Description |
|------|------|-------------|
| `keepTop` | `bool` | Keep only the top portion |
| `keepBottom` | `bool` | Keep only the bottom portion |
| `keepBoth` | `bool` | Return both portions as a compound |

### `Workplane.rotate(axisStartPoint, axisEndPoint, angleDegrees)`

| Name | Type | Description |
|------|------|-------------|
| `axisStartPoint` | `tuple[float, float, float]` | Start point of the rotation axis |
| `axisEndPoint` | `tuple[float, float, float]` | End point of the rotation axis |
| `angleDegrees` | `float` | Rotation angle in degrees |

### `Workplane.mirror(mirrorPlane, basePointVector, union)`

| Name | Type | Description |
|------|------|-------------|
| `mirrorPlane` | `str \| Plane \| Face` | Plane to mirror about: `"XY"`, `"YZ"`, `"XZ"`, or a Face/Plane |
| `basePointVector` | `tuple \| Vector` | Origin of the mirror plane in world space |
| `union` | `bool` | Union the mirrored result with the original |

## Notes

- `fillet()` and `chamfer()` operate on the **selected edges** (set with `.edges()` prior to the call). Without prior selection, all edges are affected.
- `shell()` removes the **selected faces** to create openings; without a selection it attempts to shell with no opening.
- `split()` uses the active workplane as the cutting plane.
- `translate()` and `rotate()` create new objects; they do not modify in-place.
- `mirror(union=True)` automatically unions the mirrored copy back into the original solid.

## Related

- [3D Operations (Requiring 2D Workplane)](./workplane-3d-operations.md)
- [Stack and Selector Methods](./stack-selector-methods.md)
- [Selectors](./selectors-api.md)
