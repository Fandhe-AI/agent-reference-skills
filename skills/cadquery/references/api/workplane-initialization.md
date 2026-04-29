# Initialization (Workplane)

Creating new Workplanes and starting object chains in CadQuery.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane` | `Workplane(inPlane="XY", origin=(0,0,0), obj=None)` | Define a coordinate system in space for 2D/3D operations |

## Signature / Usage

```python
import cadquery as cq

# Named plane
wp = cq.Workplane("XY")
wp = cq.Workplane("YZ")
wp = cq.Workplane("XZ")
wp = cq.Workplane("front")
wp = cq.Workplane("back")
wp = cq.Workplane("top")
wp = cq.Workplane("bottom")
wp = cq.Workplane("left")
wp = cq.Workplane("right")

# Custom plane with origin offset
wp = cq.Workplane("XY", origin=(0, 0, 10))

# Workplane from an existing Plane object
plane = cq.Plane(origin=(0, 0, 5), xDir=(1, 0, 0), normal=(0, 0, 1))
wp = cq.Workplane(plane)
```

## Options / Props

### `Workplane(inPlane, origin, obj)`

| Name | Type | Description |
|------|------|-------------|
| `inPlane` | `str \| Plane` | Named plane (`"XY"`, `"YZ"`, `"XZ"`, `"front"`, `"back"`, `"top"`, `"bottom"`, `"left"`, `"right"`) or a `Plane` object |
| `origin` | `tuple[float, float, float]` | Origin offset for the workplane in world coordinates (default `(0, 0, 0)`) |
| `obj` | `Shape \| None` | Existing shape to wrap on the stack |

## Named Planes Reference

| Name | Normal Direction | X Direction |
|------|-----------------|-------------|
| `XY` / `front` | `+Z` | `+X` |
| `XZ` / `top` | `+Y` | `+X` |
| `YZ` / `right` | `+X` | `+Y` |
| `back` | `-Z` | `+X` |
| `bottom` | `-Y` | `+X` |
| `left` | `-X` | `+Y` |

## Notes

- The `Workplane` is the primary entry point for all CadQuery fluent API operations.
- Operations are performed in the local 2D coordinate system of the active workplane.
- Use `Workplane.workplane()` (stack method) to create a new workplane offset from an existing face or plane after initial construction.
- All coordinates passed to 2D drawing methods are relative to the active workplane origin and axes.

## Related

- [2D Operations](./workplane-2d-operations.md)
- [3D Operations (Requiring 2D Workplane)](./workplane-3d-operations.md)
- [Stack and Selector Methods](./stack-selector-methods.md)
