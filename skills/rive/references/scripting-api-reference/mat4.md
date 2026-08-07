# Mat4

A 4x4 column-major transformation matrix for 3D transforms and GPU uniform buffers, used with the [WGSL shader](./wgsl-shaders.md) / [GPU](./gpu-core.md) scripting surface.

## Signature / Usage

```lua
local proj = Mat4.perspective(math.rad(60), 16 / 9, 0.1, 1000)
local view = Mat4.lookAt(Vector.xyz(0, 0, 5), Vector.xyz(0, 0, 0), Vector.xyz(0, 1, 0))
local mvp = Mat4.multiply(Mat4.identity(), proj, view)
mvp:writeToBuffer(buf, 0)
```

## Options / Props

| Member | Description |
| --- | --- |
| `m11`..`m44` | 16 elements, row-column notation (1-indexed) |
| `Mat4.identity() -> Mat4` | Identity matrix |
| `Mat4.values(...)` | 16 components, column-major |
| `Mat4.fromTranslation(x, y, z)` | Translation matrix |
| `Mat4.fromScale(x, y?, z?)` | Scale matrix; omitting y/z applies uniform scale |
| `Mat4.fromRotationX/Y/Z(radians)` | Axis rotation matrices |
| `Mat4.perspective(fovY, aspect, near, far)` | Right-handed perspective projection, z in `[0,1]` |
| `Mat4.perspectiveReverseZ(fovY, aspect, near)` | Reverse-Z perspective, infinite far plane |
| `Mat4.lookAt(eye, center, up)` | Right-handed view matrix |
| `Mat4.ortho(left, right, bottom, top, near, far)` | Orthographic projection |
| `Mat4.multiply(output, a, b)` / `multiplyAffine(output, a, b)` | Computes `a * b` into `output` (affine variant is faster) |
| `Mat4.invert(output, input)` / `invertAffine(output, input)` | Static inverse, returns success boolean |
| `invert()` / `invertAffine()` | Instance inverse, or nil if singular |
| `transpose()` | Returns the transpose |
| `transformPoint(x, y, z) -> Vector` | Transforms a 3D point with perspective divide |
| `transformVec4(x, y, z, w) -> (number, number, number, number)` | Transforms a 4D vector, no divide |
| `writeToBuffer(buf, byteOffset)` | Writes 64 bytes column-major |
| `__eq(rhs)` / `__mul(rhs)` | Equality / matrix multiplication |

## Related

- [mat2d.md](./mat2d.md)
- [wgsl-shaders.md](./wgsl-shaders.md)
- [gpu-buffers.md](./gpu-buffers.md)
