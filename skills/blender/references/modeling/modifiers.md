---
name: Modifiers
description: Blender modifier stack — Generate, Deform, and Physics modifier types with Python API.
---

# Modifiers

Modifiers are non-destructive operations that transform an object's geometry. They are evaluated from top to bottom in the stack; each modifier receives the output of the modifier above it.

## Overview

Modifiers are added via the wrench icon in the Properties panel, or via Python through `obj.modifiers.new(name, type)`. They can be applied (made permanent) or removed without affecting the base mesh.

## Generate Modifiers

| Name | Type Enum | Description |
|------|-----------|-------------|
| Array | `ARRAY` | Creates copies of a mesh along an axis, curve, or offset |
| Bevel | `BEVEL` | Bevels edges or vertices; supports segments and profile |
| Boolean | `BOOLEAN` | Cuts, joins, or intersects with another mesh object |
| Build | `BUILD` | Animates mesh faces appearing or disappearing over time |
| Decimate | `DECIMATE` | Reduces polygon count; modes: Collapse, Un-Subdivide, Planar |
| Remesh | `REMESH` | Regenerates topology; modes: Blocks, Smooth, Sharp, Voxel |
| Screw | `SCREW` | Revolves a profile around an axis to create a screw/helix |
| Solidify | `SOLIDIFY` | Adds thickness to a surface mesh |
| Subdivision Surface | `SUBSURF` | Subdivides and smooths the mesh; Catmull-Clark or Simple |
| Mirror | `MIRROR` | Mirrors geometry across one or more local axes |

## Deform Modifiers

| Name | Type Enum | Description |
|------|-----------|-------------|
| Armature | `ARMATURE` | Deforms mesh using an armature (skeleton) |
| Cast | `CAST` | Shifts the shape toward sphere, cylinder, or cuboid |
| Curve | `CURVE` | Bends a mesh along a curve object |
| Displace | `DISPLACE` | Displaces vertices using a texture |
| Lattice | `LATTICE` | Deforms mesh using a lattice control cage |
| Simple Deform | `SIMPLE_DEFORM` | Twist, bend, taper, or stretch operations |
| Shrinkwrap | `SHRINKWRAP` | Projects vertices onto the surface of another mesh |
| Warp | `WARP` | Warps geometry between two objects |

## Physics Modifiers (Overview)

| Name | Type Enum | Notes |
|------|-----------|-------|
| Cloth | `CLOTH` | Simulates cloth dynamics |
| Soft Body | `SOFT_BODY` | Simulates elastic/soft deformations |
| Particle System | `PARTICLE_SYSTEM` | Emitters or hair particles |
| Fluid | `FLUID` | Domain, Flow, or Effector role in fluid simulation |

## Python API Mapping

### Adding a Modifier

```python
import bpy

obj = bpy.context.active_object

# Add a Subdivision Surface modifier
mod = obj.modifiers.new(name="Subdivision", type='SUBSURF')
mod.levels = 2          # viewport subdivision level
mod.render_levels = 3   # render subdivision level

# Add a Mirror modifier
mirror = obj.modifiers.new(name="Mirror", type='MIRROR')
mirror.use_axis[0] = True   # mirror on X
mirror.use_bisect_axis[0] = True

# Add a Boolean modifier
bool_mod = obj.modifiers.new(name="Boolean", type='BOOLEAN')
bool_mod.operation = 'DIFFERENCE'
bool_mod.object = bpy.data.objects["Cutter"]
```

### Applying a Modifier

```python
import bpy

obj = bpy.context.active_object
bpy.context.view_layer.objects.active = obj

# Apply by modifier name
bpy.ops.object.modifier_apply(modifier="Subdivision")

# Apply all modifiers on the object (snapshot names first; applying mutates the stack)
for mod_name in [m.name for m in obj.modifiers]:
    bpy.ops.object.modifier_apply(modifier=mod_name)
```

### Configuring Common Modifiers

```python
import bpy

obj = bpy.context.active_object

# Array modifier — 3 copies along X with 2-unit offset
arr = obj.modifiers.new(name="Array", type='ARRAY')
arr.count = 3
arr.relative_offset_displace[0] = 1.5  # X offset multiplier

# Bevel modifier
bev = obj.modifiers.new(name="Bevel", type='BEVEL')
bev.width = 0.05
bev.segments = 3
bev.limit_method = 'ANGLE'

# Decimate modifier — reduce to 50% of original polygons
dec = obj.modifiers.new(name="Decimate", type='DECIMATE')
dec.ratio = 0.5

# Solidify modifier
sol = obj.modifiers.new(name="Solidify", type='SOLIDIFY')
sol.thickness = 0.02
sol.offset = -1.0  # grow inward
```

## Notes

- Stack order matters: Boolean before Subdivision Surface avoids topology artifacts; Mirror before Subdivision Surface can cause seam issues if the order is reversed
- `bpy.ops.object.modifier_apply()` requires the object to be active and in Object Mode
- To apply a modifier without `bpy.ops`, use `obj.to_mesh()` (read-only evaluated mesh) or `bpy.ops.object.convert(target='MESH')` to destructively apply all modifiers
- The `NODES` modifier type is the Geometry Nodes modifier — it holds a `node_group` pointer
- Physics modifiers (Cloth, Soft Body, Fluid) require baking via `bpy.ops.ptcache.bake()` or the Cache panel

## Related

- [Mesh Basics](./mesh-basics.md)
- [Geometry Nodes](./geometry-nodes.md)
