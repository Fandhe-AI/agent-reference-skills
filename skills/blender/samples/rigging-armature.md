---
name: Rigging Armature
description: Create an armature, add bones in Edit Mode, bind a mesh with an Armature modifier, assign vertex weights, and rotate bones in Pose Mode.
---

# Rigging Armature

## Overview

Blender bones exist in three separate data contexts: **Edit Bones** (geometry, Edit Mode only), **Bones** (read-only Object Mode metadata), and **Pose Bones** (animation transforms, Pose Mode). Python must switch between these modes explicitly; stale Edit Bone references after mode change will crash Blender.

## Complete Example

```python
import bpy
import math
from mathutils import Vector

# ── 0. Clean slate ────────────────────────────────────────────────────────────
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# ── 1. Create a mesh to rig (a subdivided plane acting as a ribbon) ───────────
bpy.ops.mesh.primitive_plane_add(size=2, location=(0, 0, 1))
bpy.ops.object.subdivision_set(level=4)
bpy.ops.object.modifier_apply(modifier="Subdivision")
mesh_obj = bpy.context.active_object
mesh_obj.name = "RiggedMesh"

# ── 2. Create the armature data and object ────────────────────────────────────
arm_data = bpy.data.armatures.new("MyArmature")
arm_obj  = bpy.data.objects.new("Armature", arm_data)
bpy.context.collection.objects.link(arm_obj)

# ── 3. Add bones in Edit Mode ─────────────────────────────────────────────────
bpy.context.view_layer.objects.active = arm_obj
bpy.ops.object.mode_set(mode='EDIT')

edit_bones = arm_data.edit_bones

root = edit_bones.new("Root")
root.head = Vector((0, 0, 0))
root.tail = Vector((0, 0, 1))

mid = edit_bones.new("Mid")
mid.head   = Vector((0, 0, 1))
mid.tail   = Vector((0, 0, 2))
mid.parent = root           # parent before leaving Edit Mode
mid.use_connect = True      # connected chain

tip = edit_bones.new("Tip")
tip.head   = Vector((0, 0, 2))
tip.tail   = Vector((0, 0, 3))
tip.parent = mid
tip.use_connect = True

# IMPORTANT: do NOT keep references to edit_bones after mode_set
bpy.ops.object.mode_set(mode='OBJECT')

# ── 4. Bind the mesh with an Armature modifier ────────────────────────────────
bpy.context.view_layer.objects.active = mesh_obj
arm_mod = mesh_obj.modifiers.new("Armature", 'ARMATURE')
arm_mod.object           = arm_obj
arm_mod.use_vertex_groups = True

# ── 5. Create vertex groups and assign weights ────────────────────────────────
# Simple weight: lower half → Root, upper half → Mid
mesh = mesh_obj.data

vg_root = mesh_obj.vertex_groups.new(name="Root")
vg_mid  = mesh_obj.vertex_groups.new(name="Mid")
vg_tip  = mesh_obj.vertex_groups.new(name="Tip")

for vert in mesh.vertices:
    z = vert.co.z
    if z < 0.5:
        vg_root.add([vert.index], 1.0, 'REPLACE')
    elif z < 1.5:
        # blend at boundary
        t = (z - 0.5)
        vg_root.add([vert.index], 1.0 - t, 'REPLACE')
        vg_mid.add( [vert.index], t,       'REPLACE')
    else:
        vg_mid.add([vert.index], 1.0, 'REPLACE')

# ── 6. Pose Mode — rotate bones ───────────────────────────────────────────────
bpy.context.view_layer.objects.active = arm_obj
bpy.ops.object.mode_set(mode='POSE')

pose_bones = arm_obj.pose.bones

# Rotate Mid bone 45° around local X
pose_bones["Mid"].rotation_mode = 'XYZ'
pose_bones["Mid"].rotation_euler = (math.radians(45), 0, 0)

# Insert a keyframe on the pose bone
pose_bones["Mid"].keyframe_insert(data_path="rotation_euler", frame=1)

bpy.ops.object.mode_set(mode='OBJECT')

print("Rig created with bones:", [b.name for b in arm_data.bones])
```

## Key Points

- Never access `edit_bones` after calling `mode_set(mode='OBJECT')` — the C data is freed and Python references are dangling.
- Bones must be parented **inside Edit Mode**; `use_connect=True` makes head snap to parent's tail.
- Vertex group names must match bone names exactly for the Armature modifier to apply deformation.
- `PoseBone.rotation_euler` only works when `rotation_mode` is set to `'XYZ'` (or another Euler mode); default is `'QUATERNION'`.

## Variations

```python
# Apply the armature pose as rest pose
bpy.ops.object.mode_set(mode='POSE')
bpy.ops.pose.armature_apply()

# Copy bone constraints (e.g., Inverse Kinematics)
ik = pose_bones["Tip"].constraints.new('IK')
ik.chain_count = 2

# Read bone head/tail in Object Mode (world space)
import mathutils
bone = arm_obj.data.bones["Mid"]
head_world = arm_obj.matrix_world @ bone.head_local
```

## Related

- [animation-keyframes.md](./animation-keyframes.md) — Keyframe pose bone transforms over time
- [modifier-workflow.md](./modifier-workflow.md) — General modifier add/apply patterns
