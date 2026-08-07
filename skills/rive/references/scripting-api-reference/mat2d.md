# Mat2D

A 2D transformation matrix with components for scaling, rotation, shear, and translation.

## Signature / Usage

```lua
local m = Mat2D.withTranslation(100, 100)
node:decompose(m)

local rot = Mat2D.withRotation(math.pi / 4)
local combined = rot * m -- __mul: matrix multiplication
local p2 = combined * Vector.xy(1, 0) -- __mul: transform a vector
```

## Options / Props

| Member | Description |
| --- | --- |
| `xx`, `xy`, `yx`, `yy` | Scale/skew components |
| `tx`, `ty` | Translation |
| `Mat2D.values(xx, xy, yx, yy, tx, ty) -> Mat2D` | Constructor from components |
| `Mat2D.identity() -> Mat2D` | Identity matrix |
| `Mat2D.withRotation(radians) -> Mat2D` | Rotation matrix |
| `Mat2D.withTranslation(x, y) \| (Vector) -> Mat2D` | Translation matrix |
| `Mat2D.withScale(x, y) \| (Vector) -> Mat2D` | Scale matrix |
| `Mat2D.withScaleAndTranslation(scale, position) -> Mat2D` | Combined scale + translation |
| `invert() -> Mat2D?` | Inverse, or nil if non-invertible |
| `Mat2D.invert(output, input) -> boolean` | Static form; writes inverse into `output` |
| `isIdentity() -> boolean` | Checks against the identity transform |
| `__eq(rhs)` | Equality |
| `__mul(Vector) \| (Mat2D)` | Transforms a vector, or multiplies two matrices |

## Related

- [artboard-node-data.md](./artboard-node-data.md)
- [path.md](./path.md)
- [mat4.md](./mat4.md)
