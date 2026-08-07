# Vector

A three-component vector (`x`, `y`, `z`; `z` is 0 for 2D vectors from `Vector.xy`) used throughout the scripting drawing/geometry API.

## Signature / Usage

```lua
local a = Vector.xy(10, 20)
local b = Vector.xyz(1, 2, 3)
local mid = Vector.lerp(a, b, 0.5)
local d = Vector.distance(a, b)
```

## Options / Props

| Member | Description |
| --- | --- |
| `x`, `y`, `z` | Read-only components |
| `Vector.xy(x, y) -> Vector` | 2D constructor |
| `Vector.xyz(x, y, z) -> Vector` | 3D constructor |
| `Vector.origin() -> Vector` | Zero vector `(0, 0)` |
| `Vector.cross3(a, b)` | 3D cross product |
| `Vector.scaleAndAdd(a, b, scale)` | `a + b * scale` |
| `Vector.scaleAndSub(a, b, scale)` | `a - b * scale` |
| `Vector.lerp(from, to, t)` | Linear interpolation |
| `Vector.normalized(v)` | Normalized copy |
| `Vector.distance(a, b)` / `distanceSquared(a, b)` | Distance between vectors |
| `Vector.dot(a, b)` | Dot product |
| `Vector.cross(a, b)` | 2D cross product (z-component) |
| `Vector.length(v)` / `lengthSquared(v)` | Magnitude |
| `==`, unary `-`, `+`, `-`, `*`, `/` | Operators |
| `writeToBuffer(buf, offset)` | Writes x/y/z as 12 bytes |
| `writeVec4(buf, offset, w)` | Writes x/y/z/w as 16 bytes |

## Notes

- Instance methods `length()`, `lengthSquared()`, `normalized()`, `distance()`, `distanceSquared()`, `dot()`, `lerp()` are deprecated in favor of the static `Vector.*` forms.
- This `Vector` class (`vector/vector.md`) is distinct from Luau's built-in `vector` type (see [luau-types.md](./luau-types.md)).

## Related

- [mat2d.md](./mat2d.md)
- [path.md](./path.md)
- [luau-types.md](./luau-types.md)
