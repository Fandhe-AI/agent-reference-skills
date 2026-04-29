# User-defined Directions

Any extremum or direction operator can accept a **custom vector** instead of a standard axis token (`X`, `Y`, `Z`), enabling selection along arbitrary directions.

## Signature / Usage

```python
# Chamfer edges farthest in the direction (-1, 1, 0)
result = cq.Workplane("XY").box(10, 10, 10)
result = result.edges(">(-1, 1, 0)").chamfer(1)
```

## Options / Props

| Syntax | Description |
|--------|-------------|
| `>(x, y, z)` | Farthest object in the custom +direction |
| `<(x, y, z)` | Farthest object in the custom −direction |
| `\|(x, y, z)` | Objects parallel to the custom direction |
| `#(x, y, z)` | Objects perpendicular to the custom direction |
| `+(x, y, z)` | Objects whose normal / alignment is in the custom positive direction |
| `-(x, y, z)` | Objects whose normal / alignment is in the custom negative direction |

The vector components are floating-point values separated by commas inside parentheses. The vector does not need to be unit-length; CadQuery normalizes it internally.

## Notes

- All operators that accept an axis token also accept the `(x, y, z)` vector form.
- The vector is normalized internally, so `>(1, 1, 0)` and >(0.707, 0.707, 0)` select the same objects.
- Nth-index syntax works with custom vectors: `>(-1, 1, 0)[1]` selects the 2nd match.

## Related

- [Combining Selectors](./combining.md)
- [Filtering Faces](./filtering-faces.md)
- [Filtering Edges](./filtering-edges.md)
- [Filtering Vertices](./filtering-vertices.md)
