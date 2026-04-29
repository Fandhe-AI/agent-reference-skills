# Selectors

Selector classes and string syntax for filtering CadQuery geometry (faces, edges, vertices, etc.).

## String Selector Syntax

Selectors can be passed as strings directly to `.faces()`, `.edges()`, `.vertices()`, etc.

### Axis Modifiers

| Symbol | Class | Meaning | Example |
|--------|-------|---------|---------|
| `\|` | `ParallelDirSelector` | Parallel to axis | `\|Z` — faces/edges parallel to Z |
| `#` | `PerpendicularDirSelector` | Perpendicular to axis | `#Z` — faces perpendicular to Z |
| `+` | `DirectionSelector` | Aligned in positive direction | `+X` — faces with +X normal |
| `-` | `DirectionSelector` | Aligned in negative direction | `-Y` — faces with -Y normal |
| `>` | `DirectionMinMaxSelector` | Maximum in direction | `>Z` — topmost face |
| `<` | `DirectionMinMaxSelector` | Minimum in direction | `<Z` — bottommost face |
| `%` | `TypeSelector` | Geometry type | `%Plane` — planar faces only |
| `>>` | `CenterNthSelector` | Nth by center in direction | `>>Z[1]` — 2nd-highest face by center |
| `<<` | `CenterNthSelector` | Nth by center in neg. direction | `<<Z[0]` — lowest face by center |

### Axis References

`X`, `Y`, `Z`, `XY`, `YZ`, `XZ` — or a custom vector `>(1, 1, 0)`

### Combining Selectors

| Operator | Meaning | Example |
|----------|---------|---------|
| `and` | Intersection | `"\|Z and >Y"` |
| `or` | Union | `">Z or <Z"` |
| `not` | Inversion | `"not >Z"` |
| `exc` / `except` | Exclude | `"\|Z exc >Z"` |

## Selector Classes

| Class | Signature | Description |
|-------|-----------|-------------|
| `NearestToPointSelector` | `NearestToPointSelector(pnt)` | Select the object nearest to the provided point |
| `BoxSelector` | `BoxSelector(point0, point1, boundingbox=False)` | Select objects inside a 3D bounding box |
| `BaseDirSelector` | `BaseDirSelector(vector, tolerance=1.0)` | Base class for direction-based selectors |
| `ParallelDirSelector` | `ParallelDirSelector(vector, tolerance=1.0)` | Select objects parallel to the direction |
| `DirectionSelector` | `DirectionSelector(vector, tolerance=1.0)` | Select objects aligned with the direction |
| `DirectionNthSelector` | `DirectionNthSelector(vector, n, directionMax=True, tolerance=0.01)` | Select the Nth object sorted by direction |
| `LengthNthSelector` | `LengthNthSelector(n, directionMax=True, tolerance=1e-3)` | Select the object(s) with Nth length |
| `AreaNthSelector` | `AreaNthSelector(n, directionMax=True, tolerance=1e-3)` | Select the object(s) with Nth area |
| `RadiusNthSelector` | `RadiusNthSelector(n, directionMax=True, tolerance=1e-3)` | Select the object with the Nth radius |
| `PerpendicularDirSelector` | `PerpendicularDirSelector(vector, tolerance=1.0)` | Select objects perpendicular to the direction |
| `TypeSelector` | `TypeSelector(typeString)` | Select objects with the given geometry type |
| `DirectionMinMaxSelector` | `DirectionMinMaxSelector(vector, directionMax=True, tolerance=0.01)` | Select the object closest or farthest in direction |
| `CenterNthSelector` | `CenterNthSelector(vector, n, directionMax=True, tolerance=0.01)` | Sort by center projection and return the Nth object |
| `BinarySelector` | `BinarySelector(left, right)` | Base class for two-selector operations |
| `AndSelector` | `AndSelector(left, right)` | Intersection of two selector results |
| `SumSelector` | `SumSelector(left, right)` | Union of two selector results |
| `SubtractSelector` | `SubtractSelector(left, right)` | Difference of two selector results |
| `InverseSelector` | `InverseSelector(selector)` | Invert a selector's results |
| `StringSyntaxSelector` | `StringSyntaxSelector(selectorString)` | Parse and apply a string-syntax selector |

## Signature / Usage

```python
import cadquery as cq
from cadquery.selectors import NearestToPointSelector, AreaNthSelector

# String selector - top face
result = cq.Workplane("XY").box(4, 4, 4).faces(">Z")

# Select largest face
result = cq.Workplane("XY").box(4, 4, 2).faces(AreaNthSelector(-1))

# Combine string selectors
result = cq.Workplane("XY").box(4, 4, 4).edges("|Z and >Y")

# Use NearestToPointSelector
result = (
    cq.Workplane("XY")
    .box(4, 4, 4)
    .faces(NearestToPointSelector((0, 0, 2)))
)
```

## Face Filtering Examples

| Selector | Returns |
|----------|---------|
| `>Z` | Topmost face (max Z) |
| `<Z` | Bottommost face (min Z) |
| `\|Z` | Faces parallel to XY plane |
| `+Z` | Faces with +Z normal |
| `#Z` | Faces perpendicular to Z (i.e. side faces) |
| `%Plane` | All planar faces |
| `>>Z[1]` | 2nd face from top by center |

## Edge Filtering Examples

| Selector | Returns |
|----------|---------|
| `\|Z` | Edges parallel to Z axis |
| `>Y` | Edge(s) farthest in +Y |
| `#Z` | Edges perpendicular to Z |
| `%Line` | Linear edges only |

## TypeSelector Types

| String | Geometry |
|--------|---------|
| `"Plane"` | Planar faces |
| `"Cylinder"` | Cylindrical faces |
| `"Sphere"` | Spherical faces |
| `"Cone"` | Conical faces |
| `"Line"` | Linear edges |
| `"Circle"` | Circular edges |
| `"Ellipse"` | Elliptical edges |

## Notes

- `DirectionNthSelector` and `CenterNthSelector` use zero-based index `n`; negative indices count from the end.
- `BoxSelector(boundingbox=False)` tests whether the object's center is inside the box; `boundingbox=True` tests whether the bounding box intersects.
- For non-planar faces, direction-based selectors are evaluated at the center of mass.
- Combining selectors via string syntax is often clearer than nesting `AndSelector`/`SumSelector` objects.

## Related

- [Stack and Selector Methods](./stack-selector-methods.md)
- [Cheatsheet](./cheatsheet.md)
