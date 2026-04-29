# Combining Selectors

Selectors support logical operations through `and`, `or`, `not`, and `exc`/`except` operators, enabling complex multi-criteria filtering in a single string expression.

## Signature / Usage

```python
# AND: edges parallel to Z and farthest in +Y
result = cq.Workplane("XY").box(2, 2, 2).edges("|Z and >Y").chamfer(0.2)

# NOT with OR: inner edges of a shell
result = (
    cq.Workplane("XY")
    .box(2, 2, 2)
    .faces(">Z")
    .shell(-0.2)
    .faces(">Z")
    .edges("not(<X or >X or <Y or >Y)")
    .chamfer(0.1)
)
```

## String Syntax — Full Operator Table

### Logical Operators

| Operator | Alias | Description | Example |
|----------|-------|-------------|---------|
| `and` | | Intersection of two selector results | `\|Z and >Y` |
| `or` | | Union of two selector results | `<X or >X` |
| `not` | | Complement of a selector result | `not >Z` |
| `exc` | `except` | Set difference (A minus B) | `>Z exc %Plane` |

Operator precedence (highest to lowest): `not` > `and` > `or`/`exc`. Use parentheses to override:
```
not(<X or >X or <Y or >Y)
```

### Direction / Orientation Operators

| Operator | Selector Class | Applies To | Description | Example |
|----------|---------------|------------|-------------|---------|
| `+Z` | `DirectionSelector` | Faces, Edges | Normal / alignment in the **positive** axis direction | `+Z` |
| `-X` | `DirectionSelector` | Faces, Edges | Normal / alignment in the **negative** axis direction | `-X` |
| `\|Z` | `ParallelDirSelector` | Faces, Edges | Normal / edge **parallel** to the axis | `\|Z` |
| `#Z` | `PerpendicularDirSelector` | Faces, Edges | Normal / edge **perpendicular** to the axis | `#Z` |

### Extremum Operators

| Operator | Selector Class | Description | Example |
|----------|---------------|-------------|---------|
| `>Y` | `DirectionMinMaxSelector` | Object whose normal / direction is **farthest** in +Y (max projection of normal) | `>Y` |
| `<Y` | `DirectionMinMaxSelector` | Object whose normal / direction is **farthest** in −Y (min projection of normal) | `<Y` |
| `>>Y` | `CenterNthSelector` | Object whose **center** is farthest in +Y | `>>Y` |
| `<<Y` | `CenterNthSelector` | Object whose **center** is farthest in −Y | `<<Y` |

### Nth-index Operators

Append `[n]` to select the Nth match (0-based; negative indices count from the end).

| Operator | Selector Class | Description | Example |
|----------|---------------|-------------|---------|
| `>Y[n]` | `DirectionNthSelector` | Nth face/edge whose normal points most toward +Y | `>Y[-2]` (2nd farthest) |
| `<Y[n]` | `DirectionNthSelector` | Nth face/edge whose normal points most toward −Y | `<Y[0]` (closest) |
| `>>Y[n]` | `CenterNthSelector` | Nth object by center projection in +Y | `>>Y[-2]` |
| `<<Y[n]` | `CenterNthSelector` | Nth object by center projection in −Y | `<<Y[0]` |

### Type Selector

| Operator | Selector Class | Description | Examples |
|----------|---------------|-------------|---------|
| `%<Type>` | `TypeSelector` | Filter by geometry type | `%Plane`, `%Line`, `%Circle`, `%Cylinder`, `%Cone`, `%Sphere`, `%Torus`, `%BSplineSurface` |

### User-defined Direction

| Syntax | Description | Example |
|--------|-------------|---------|
| `>(-1, 1, 0)` | Custom vector for any extremum or direction operator | `edges(">(-1, 1, 0)")` |

### Axis Tokens

`X`, `Y`, `Z` — standard Cartesian axes used as the direction argument for all operators above.

## Notes

- Operator precedence: `not` > `and` > `or` / `exc`
- Parentheses may be used to group sub-expressions
- `exc` and `except` are interchangeable
- All string syntax is parsed by `StringSyntaxSelector(selectorString)`

## Related

- [Filtering Faces](./filtering-faces.md)
- [Filtering Edges](./filtering-edges.md)
- [Filtering Vertices](./filtering-vertices.md)
- [User-defined Directions](./user-directions.md)
- [Topological Selectors](./topological.md)
