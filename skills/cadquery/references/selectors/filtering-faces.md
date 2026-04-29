# Filtering Faces

Face selectors operate on the **normal vector** of each face. For non-planar faces the normal is evaluated at the center of mass, which may yield unexpected results.

## Signature / Usage

```python
# Select the top face (farthest in +Z)
result = cq.Workplane("XY").box(2, 2, 2).faces(">Z")

# Select all faces whose normal is parallel to Z
result = cq.Workplane("XY").box(2, 2, 2).faces("|Z")

# Select the 2nd farthest face whose normal points toward +Y
result = cq.Workplane("XY").box(2, 2, 2).faces(">Y[-2]")
```

## Options / Props

| Selector String | Selector Class | Description |
|-----------------|---------------|-------------|
| `+Z` | `DirectionSelector` | Normal in the **positive Z** direction |
| `-X` | `DirectionSelector` | Normal in the **negative X** direction |
| `\|Z` | `ParallelDirSelector` | Normal **parallel** to Z axis |
| `#Z` | `PerpendicularDirSelector` | Normal **orthogonal** to Z axis |
| `%Plane` | `TypeSelector` | Face is of type **Plane** (also: `%Cylinder`, `%Cone`, `%Sphere`, `%Torus`, `%BSplineSurface`) |
| `>Y` | `DirectionMinMaxSelector` | Face whose normal is **farthest in +Y** |
| `<Y` | `DirectionMinMaxSelector` | Face whose normal is **farthest in −Y** |
| `>Y[-2]` | `DirectionNthSelector` | **2nd farthest** face normal to Y (0-based, negative = from end) |
| `<Y[0]` | `DirectionNthSelector` | **1st closest** face normal to Y |
| `>>Y[-2]` | `CenterNthSelector` | **2nd farthest** face by **center** position in Y |
| `<<Y[0]` | `CenterNthSelector` | **1st closest** face by **center** position in Y |

## Notes

- The `+` / `-` operators match faces whose normal aligns with the positive or negative axis. They differ from `>` / `<`, which pick the single extreme face.
- `\|Z` selects *all* faces parallel to Z (i.e., top and bottom of a box), not just the farthest one.
- For curved faces (e.g., cylinders), the normal at the center of mass may not represent the intuitive "direction" of the face.
- Index syntax `[n]` uses 0-based indexing; negative values count from the end of the sorted list.

## Related

- [Combining Selectors](./combining.md)
- [Filtering Edges](./filtering-edges.md)
- [User-defined Directions](./user-directions.md)
