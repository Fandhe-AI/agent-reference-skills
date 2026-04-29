# Selectors

Selectors filter the geometric sub-elements (Vertices, Edges, Faces, Wires, Solids, Shells, Compounds) returned by methods like `faces()`, `edges()`, `vertices()`, etc. They are the primary way to choose which geometry to work with next in the chain.

## Signature / Usage

```python
# Select the highest face and fillet its edges
result = (
    cq.Workplane("XY")
    .box(1, 2, 3)
    .faces(">Z")          # face farthest in +Z
    .edges()
    .fillet(0.1)
)
```

## String Selector Syntax

Pass a string to any selection method (`faces()`, `edges()`, `vertices()`, `wires()`, `solids()`).

### Direction / Axis Operators

| Syntax | Selects |
|--------|---------|
| `"+X"` / `"+Y"` / `"+Z"` | Elements facing (or aligned with) the positive axis |
| `"-X"` / `"-Y"` / `"-Z"` | Elements facing (or aligned with) the negative axis |
| `"\|Z"` | Elements **parallel** to the given axis |
| `"#Z"` | Elements **perpendicular** to the given axis |
| `">Z"` | Element with center **farthest** in positive Z (max) |
| `"<Z"` | Element with center **farthest** in negative Z (min) |
| `">>Z[n]"` | Nth element sorted by center distance in +Z (0-indexed) |
| `"<<Z[n]"` | Nth element sorted by center distance in -Z (0-indexed; negative index wraps) |

Axis may be `X`, `Y`, `Z`, or a custom vector `">(1, -1, 0)"`.

### Type Selectors

| Syntax | Selects |
|--------|---------|
| `"%Plane"` | Planar faces |
| `"%Line"` | Linear edges |
| `"%Circle"` | Circular edges |

### Nth Selectors (by property)

| Syntax | Selects |
|--------|---------|
| `">>(axis)[n]"` | Nth by center position along axis |
| radius-based | Use `RadiusNthSelector(n)` programmatically |
| length-based | Use `LengthNthSelector(n)` programmatically |
| area-based | Use `AreaNthSelector(n)` programmatically |

### Logical Combinators

| Syntax | Meaning |
|--------|---------|
| `"A and B"` | Intersection of A and B |
| `"A or B"` | Union of A and B |
| `"not A"` | Inverse of A |
| `"A except B"` / `"A exc B"` | Elements in A but not in B |

Example: `"not(<X or >X or <Y or >Y)"` selects faces that are not the four side faces.

## Programmatic Selectors

Importable from `cadquery`:

| Class | Description |
|-------|-------------|
| `NearestToPointSelector(pnt)` | Object nearest to a 3D point |
| `BoxSelector(point0, point1, boundingbox=False)` | Objects inside a 3D bounding box |
| `ParallelDirSelector(vector)` | Objects parallel to vector |
| `DirectionSelector(vector)` | Objects aligned with vector |
| `PerpendicularDirSelector(vector)` | Objects perpendicular to vector |
| `DirectionMinMaxSelector(vector, directionMax=True)` | Closest or farthest in direction |
| `DirectionNthSelector(vector, n, directionMax=True)` | Nth along direction |
| `CenterNthSelector(vector, n)` | Nth by distance of center from origin along vector |
| `LengthNthSelector(n)` | Nth by edge length |
| `AreaNthSelector(n)` | Nth by face area |
| `RadiusNthSelector(n)` | Nth by arc/circle radius |
| `TypeSelector(typeString)` | By geometry type string (e.g., `'CIRCLE'`, `'PLANE'`) |
| `InverseSelector(selector)` | Invert any selector |
| `AndSelector(a, b)` | Intersection of two selectors |
| `SumSelector(a, b)` | Union of two selectors |
| `SubtractSelector(a, b)` | Difference of two selectors |
| `StringSyntaxSelector(selectorString)` | Parse string syntax programmatically |

## Notes

- All selection methods (`faces`, `edges`, `vertices`, `wires`, `solids`, `shells`, `compounds`) accept an optional `selector` argument (string or `Selector` instance) and an optional `tag` argument to operate on a tagged Workplane instead of the current objects.
- Negative indices in `[n]` notation wrap from the end (e.g., `[-1]` is the last).
- `StringSyntaxSelector` is what string arguments are internally parsed into.

## Related

- [The Stack](./stack.md)
- [Chaining](./chaining.md)
- [Iteration](./iteration.md)
