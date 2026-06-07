---
name: mathutils
description: Blender's math utility module providing Vector, Matrix, Quaternion, Euler, Color, and noise functions.
---

# mathutils

Provides geometric math types — `Vector`, `Matrix`, `Quaternion`, `Euler`, `Color` — and the `mathutils.noise` submodule for procedural noise.

## Signature / Usage

```python
import mathutils
import math

# Vector
v = mathutils.Vector((1.0, 2.0, 3.0))
n = v.normalized()
d = v.dot(mathutils.Vector((0.0, 1.0, 0.0)))

# Matrix
mat = mathutils.Matrix.Translation((1.0, 2.0, 0.0)) @ \
      mathutils.Matrix.Rotation(math.radians(45), 4, 'Z')
loc, rot, scale = mat.decompose()

# Quaternion
q = mathutils.Quaternion((0.0, 0.0, 1.0), math.radians(90))
euler = q.to_euler('XYZ')

# Euler
e = mathutils.Euler((0.0, 0.0, math.radians(45)), 'XYZ')
mat3 = e.to_matrix()
```

## Vector

Constructor: `Vector(seq)` — accepts 2D, 3D, or 4D sequences.

| Method / Property | Description |
|-------------------|-------------|
| `normalize()` | Normalize in-place |
| `normalized()` | Return unit-length copy |
| `dot(other)` | Scalar dot product |
| `cross(other)` | Cross product (3D only) |
| `lerp(other, factor)` | Linear interpolation |
| `rotate(other)` | Apply Euler / Quaternion / Matrix rotation in-place |
| `project(other)` | Project onto `other` |
| `reflect(mirror)` | Reflection about `mirror` vector |
| `length` | Euclidean length (settable) |
| `length_squared` | Squared length |
| `x`, `y`, `z`, `w` | Component access |
| `xyz`, `zyx`, … | Swizzle access (returns new Vector) |
| `Vector.Fill(size, fill=0.0)` | Repeated-value constructor |
| `Vector.Linspace(start, stop, size)` | Linearly spaced vector |

## Matrix

Supports 2×2 to 4×4. Use 4×4 for 3D transforms. Combine with `@` operator.

| Class Method | Description |
|--------------|-------------|
| `Matrix.Identity(size)` | Identity matrix |
| `Matrix.Translation(vector)` | Translation matrix (4×4) |
| `Matrix.Rotation(angle, size, axis)` | Rotation matrix; `axis` is `'X'`, `'Y'`, `'Z'`, or a `Vector` |
| `Matrix.Scale(factor, size, axis=None)` | Uniform or axis-aligned scale |
| `Matrix.LocRotScale(loc, rot, scale)` | Combined TRS matrix |
| `Matrix.Diagonal(vector)` | Diagonal scaling matrix |

| Method | Description |
|--------|-------------|
| `decompose()` | Returns `(translation, quaternion, scale)` |
| `invert()` / `inverted()` | Matrix inverse |
| `transpose()` / `transposed()` | Transpose |
| `normalize()` / `normalized()` | Normalize column vectors |
| `to_euler(order)` | Convert to `Euler` |
| `to_quaternion()` | Convert to `Quaternion` |
| `to_scale()` | Extract scale as `Vector` |
| `to_translation()` | Extract translation as `Vector` |
| `determinant` | Scalar determinant |
| `translation` | 4×4 translation component (settable) |

## Quaternion

Stored as `(w, x, y, z)`. Represents a rotation.

| Constructor Form | Description |
|-----------------|-------------|
| `Quaternion()` | Identity |
| `Quaternion((w, x, y, z))` | From components |
| `Quaternion((ax, ay, az), angle)` | Axis-angle |
| `Quaternion(exp_map)` | From 3D exponential map |

| Method | Description |
|--------|-------------|
| `normalize()` / `normalized()` | Unit quaternion |
| `invert()` / `inverted()` | Inverse rotation |
| `slerp(other, factor)` | Spherical interpolation |
| `to_matrix()` | 3×3 rotation matrix |
| `to_euler(order='XYZ')` | Euler angles |
| `to_axis_angle()` | `(Vector, float)` axis and angle |
| `rotation_difference(other)` | Quaternion delta |
| `dot(other)` | Dot product (similarity) |
| `w`, `x`, `y`, `z` | Components |
| `angle` | Rotation angle |
| `axis` | Rotation axis `Vector` |

Combine rotations with `@`: `q_combined = q_a @ q_b`.

## Euler

Rotation in three axis angles. Order matters for decomposition.

Rotation orders: `'XYZ'`, `'XZY'`, `'YXZ'`, `'YZX'`, `'ZXY'`, `'ZYX'`

| Method | Description |
|--------|-------------|
| `rotate_axis(axis, angle)` | Rotate around `'X'`, `'Y'`, or `'Z'` |
| `rotate(other)` | Apply Euler / Quaternion / Matrix in-place |
| `make_compatible(other)` | Adjust for shortest-path interpolation |
| `to_matrix()` | 3×3 rotation matrix |
| `to_quaternion()` | Quaternion representation |
| `zero()` | Reset all axes to 0 |
| `x`, `y`, `z` | Component angles (radians) |
| `order` | Rotation order string |

## Color

RGB triplet in `[0, 1]` range with HSV access and color space conversion.

```python
col = mathutils.Color((1.0, 0.5, 0.0))
col.s *= 0.5                         # reduce saturation
linear = col.from_srgb_to_scene_linear()
```

| Property / Method | Description |
|-------------------|-------------|
| `r`, `g`, `b` | RGB components |
| `h`, `s`, `v` | HSV components (settable) |
| `hsv` | `(h, s, v)` tuple |
| `from_srgb_to_scene_linear()` | sRGB → linear |
| `from_scene_linear_to_srgb()` | Linear → sRGB |
| `from_scene_linear_to_xyz_d65()` | CIE XYZ D65 |
| `from_rec709_linear_to_scene_linear()` | Rec.709 linear → scene linear |
| `from_rec2020_linear_to_scene_linear()` | Rec.2020 linear → scene linear |
| `from_aces_to_scene_linear()` | ACES → scene linear |

## mathutils.noise

```python
import mathutils.noise as noise
val = noise.noise((1.0, 2.0, 3.0))          # Perlin noise scalar
vec = noise.noise_vector((1.0, 2.0, 3.0))   # noise Vector
turb = noise.turbulence((1.0, 2.0, 3.0), octaves=4, hard=False)
```

## Notes

- Numeric sequences (tuples, lists) are accepted wherever a Vector is expected
- Use `.copy()` to obtain a mutable copy; `.freeze()` to make an object hashable
- Matrix multiplication uses the `@` operator (not `*`)
- Swizzle attributes (`vec.xyz`, `vec.yx`) return new Vector instances

## Related

- [bmesh.md](./bmesh.md)
