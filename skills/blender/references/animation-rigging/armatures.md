---
name: Armatures
description: Armature/bone creation, Pose Mode, weight painting, IK setup, and rigging Python API
---

# Armatures

An Armature is a skeleton-like object consisting of Bones. It deforms meshes (via the Armature Modifier) and stores pose animation data. Blender uses three distinct bone data structures depending on the active mode.

## Overview

| Bone type | Access path | Mode required | Purpose |
|-----------|-------------|---------------|---------|
| `EditBone` | `obj.data.edit_bones` | Edit Mode | Create / reshape bones |
| `Bone` | `obj.data.bones` | Object / Pose Mode | Read-only shape; deform flags |
| `PoseBone` | `obj.pose.bones` | Pose Mode | Animation, constraints, IK |

**Critical**: Do not hold references to `EditBone` objects after leaving Edit Mode — this crashes Blender.

## Key Operations

### Create an armature and add bones

```python
import bpy
from mathutils import Vector

# Create armature data-block and object
arm_data = bpy.data.armatures.new("MyArmature")
arm_obj  = bpy.data.objects.new("MyArmature", arm_data)
bpy.context.collection.objects.link(arm_obj)

# Activate and enter Edit Mode
bpy.context.view_layer.objects.active = arm_obj
bpy.ops.object.mode_set(mode='EDIT')

# Add bones
root = arm_obj.data.edit_bones.new("Root")
root.head = Vector((0, 0, 0))
root.tail = Vector((0, 0, 1))

child = arm_obj.data.edit_bones.new("Child")
child.head = Vector((0, 0, 1))
child.tail = Vector((0, 0, 2))
child.parent = root
child.use_connect = True   # connect child head to parent tail

bpy.ops.object.mode_set(mode='OBJECT')
# -- Do NOT use root/child references after this line --
```

### Access pose bones and transform

```python
bpy.ops.object.mode_set(mode='POSE')
pb = arm_obj.pose.bones["Child"]
pb.location = (0.1, 0, 0)
pb.rotation_mode = 'XYZ'
pb.rotation_euler = (0.2, 0, 0)
```

### Add an IK constraint via Python

```python
import math
bpy.ops.object.mode_set(mode='POSE')

hand_pb = arm_obj.pose.bones["Hand"]
ik = hand_pb.constraints.new(type='IK')
ik.target      = arm_obj
ik.subtarget   = "IK_Target"
ik.chain_count = 3
ik.pole_target    = arm_obj
ik.pole_subtarget = "Pole"
ik.pole_angle     = math.radians(90)
```

### Parent a mesh to the armature with automatic weights

```python
mesh_obj = bpy.data.objects["Body"]
mesh_obj.parent = arm_obj
mod = mesh_obj.modifiers.new(name="Armature", type='ARMATURE')
mod.object = arm_obj
mod.use_vertex_groups = True
# Then use Weight Paint mode or bpy.ops.object.parent_set(type='ARMATURE_AUTO')
```

### Inspect bone names and hierarchy

```python
for bone in arm_obj.data.bones:
    parent_name = bone.parent.name if bone.parent else "None"
    print(f"{bone.name} -> parent: {parent_name}, deform: {bone.use_deform}")
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `EditBone.head` / `.tail` | `Vector` | Start/end positions in armature space |
| `EditBone.roll` | `float` | Roll angle (radians) around the bone Y axis |
| `EditBone.parent` | `EditBone` | Parent bone reference |
| `EditBone.use_connect` | `bool` | Connect head to parent tail |
| `Bone.use_deform` | `bool` | Include in deformation calculations |
| `PoseBone.location` | `Vector` | Local pose-space location offset |
| `PoseBone.rotation_euler` | `Euler` | Local rotation (when `rotation_mode='XYZ'`) |
| `PoseBone.constraints` | collection | Bone-level constraints |
| `Armature.display_type` | enum | Viewport display: `OCTAHEDRAL`, `STICK`, `BBONE`, `ENVELOPE` |

## Notes

- **Mode switching is required**: edit bones are only available in Edit Mode; pose data is only actionable in Pose Mode.
- Always call `bpy.ops.object.mode_set(mode='OBJECT')` to finalize edits before accessing `obj.data.bones` or `obj.pose.bones`.
- The **Armature Modifier** on a mesh uses vertex groups whose names match bone names to drive deformation weights.
- For programmatic weight painting, set vertex group weights via `mesh_obj.vertex_groups["BoneName"].add([vert_index], weight, 'REPLACE')`.
- B-Bones (Bendy Bones) add curvature along a single bone; controlled via `EditBone.bbone_segments`, `.bbone_x`, `.bbone_z`.

## Related

- [constraints.md](./constraints.md)
- [shape-keys.md](./shape-keys.md)
- [keyframes.md](./keyframes.md)
