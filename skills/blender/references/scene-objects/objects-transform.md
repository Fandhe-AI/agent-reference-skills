---
name: Objects & Transform
description: Object datablock, transform properties, matrices, delta transforms, parenting, and origin settings.
---

# Objects & Transform

An `Object` is a datablock (`bpy.types.Object`) that positions and orients an **Object Data** datablock (mesh, curve, camera, light, etc.) in the scene. The object holds the transform; the data holds the geometry or settings.

## Overview

Every visible item in the scene is an Object. The relationship is:

```
bpy.data.objects["Cube"]        ← Object datablock (transform, parenting, modifiers…)
  └─ .data → bpy.data.meshes["Cube"]  ← Object Data (geometry)
```

Multiple objects can share the same data (`obj.data = other_obj.data`), creating a **linked duplicate**.

## Key Concepts / Settings

### Location / Rotation / Scale

| Property | Type | Description |
|----------|------|-------------|
| `location` | `Vector` (3) | World-space position (before parent) |
| `rotation_euler` | `Euler` (3) | Euler rotation (order set by `rotation_mode`) |
| `rotation_quaternion` | `Quaternion` (4) | Quaternion rotation (active when `rotation_mode == 'QUATERNION'`) |
| `rotation_axis_angle` | `float[4]` | Axis-angle rotation (active when `rotation_mode == 'AXIS_ANGLE'`) |
| `rotation_mode` | `str` | `'XYZ'`, `'XZY'`, … `'QUATERNION'`, `'AXIS_ANGLE'` |
| `scale` | `Vector` (3) | Scale factors |

### Delta Transforms

Delta transforms layer additional offset on top of the base transform without changing the base values — useful for non-destructive animation overrides.

| Property | Type |
|----------|------|
| `delta_location` | `Vector` (3) |
| `delta_rotation_euler` | `Euler` (3) |
| `delta_rotation_quaternion` | `Quaternion` (4) |
| `delta_scale` | `Vector` (3) |

### Transformation Matrices

| Property | Description |
|----------|-------------|
| `matrix_world` | Object-to-world transform (read/write; Blender auto-updates dependencies) |
| `matrix_local` | Transform relative to parent (or world if no parent) |
| `matrix_basis` | Location + rotation + scale + deltas, before constraints |
| `matrix_parent_inverse` | Inverse of parent's world matrix at the time of parenting; preserves child position on parent assignment |

Writing `matrix_world` directly updates internal location/rotation/scale after calling `bpy.context.view_layer.update()` or `bpy.ops.object.transform_apply()`.

### Origin

The origin (pivot point) is embedded in `matrix_world` as the translation column. To reposition it:

```python
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
# options: ORIGIN_GEOMETRY | ORIGIN_CURSOR | ORIGIN_CENTER_OF_MASS | GEOMETRY_ORIGIN
```

## Python API Mapping

```python
import bpy
import mathutils

obj = bpy.data.objects["Cube"]

# Read transform
print(obj.location)           # Vector((0, 0, 0))
print(obj.matrix_world)       # 4×4 Matrix

# Set location via property
obj.location = (1.0, 0.0, 0.5)

# Set via matrix_world
obj.matrix_world = mathutils.Matrix.Translation((2, 0, 0))

# Decompose matrix
loc, rot, sca = obj.matrix_world.decompose()

# Parent object
child = bpy.data.objects["Child"]
child.parent = obj
child.matrix_parent_inverse = obj.matrix_world.inverted()

# Unparent keeping world transform
bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
```

### Parenting

| Property | Type | Description |
|----------|------|-------------|
| `parent` | `Object` or `None` | Parent object |
| `parent_type` | `str` | `'OBJECT'`, `'ARMATURE'`, `'LATTICE'`, `'VERTEX'`, `'BONE'`, `'CURVE'` |
| `parent_bone` | `str` | Bone name (when `parent_type == 'BONE'`) |
| `parent_vertices` | `int[3]` | Vertex indices (when `parent_type == 'VERTEX'`) |
| `matrix_parent_inverse` | `Matrix` | Captured at parenting time to keep child in place |

## Notes

- After setting `matrix_world` in a script, call `bpy.context.view_layer.update()` to propagate changes to children.
- `matrix_local` for bone-parented objects is relative to the armature object, not the specific bone.
- `matrix_basis` reflects only the object's own loc/rot/sca — constraints and parent transforms are not included.
- Use `obj.convert_space(matrix=m, from_space='WORLD', to_space='LOCAL')` to convert between spaces.

## Related

- [Collections](./collections.md)
- [Data System & Datablocks](./data-system.md)
