---
name: Constraints
description: Object and bone constraints (Copy Location/Rotation/Scale, IK, Track To, Child Of, etc.) and Python API
---

# Constraints

Constraints restrict or direct an object's (or bone's) transformations based on rules or targets. They are evaluated every frame and do not bake data unless explicitly applied.

## Overview

Constraints live in `object.constraints` (object-level) or `pose_bone.constraints` (bone-level). Both collections expose the same `.new()` / `.remove()` interface.

## Key Operations

### Add a constraint

```python
import bpy

obj = bpy.data.objects["Cube"]

# Copy the location of a target object
c = obj.constraints.new(type='COPY_LOCATION')
c.target = bpy.data.objects["Empty"]
c.use_offset = True
c.influence = 1.0
```

### Add a constraint to a pose bone

```python
arm_obj = bpy.data.objects["Armature"]
pb = arm_obj.pose.bones["Hand"]

ik = pb.constraints.new(type='IK')
ik.target = arm_obj
ik.subtarget = "IK_Target"   # name of a bone in the same armature
ik.chain_count = 3            # 0 = full chain to root
ik.pole_target = arm_obj
ik.pole_subtarget = "Pole"
ik.pole_angle = 1.5708        # radians (90°)
```

### Remove a constraint

```python
c = obj.constraints["Copy Location"]
obj.constraints.remove(c)
```

### Iterate constraints

```python
for c in obj.constraints:
    print(c.name, c.type, c.influence)
```

## Common Constraint Types

| Type enum | Description |
|-----------|-------------|
| `COPY_LOCATION` | Match the target's world/local location |
| `COPY_ROTATION` | Match the target's rotation |
| `COPY_SCALE` | Match the target's scale |
| `COPY_TRANSFORMS` | Copy full transform (loc+rot+scale) |
| `LIMIT_LOCATION` | Clamp location to min/max bounds |
| `LIMIT_ROTATION` | Clamp rotation to min/max angles |
| `LIMIT_SCALE` | Clamp scale to min/max values |
| `TRACK_TO` | Point an axis toward the target |
| `DAMPED_TRACK` | Minimize-rotation tracking toward target |
| `CHILD_OF` | Make the object behave as if parented (detachable) |
| `FLOOR` | Prevent penetration below a floor plane |
| `FOLLOW_PATH` | Move along a curve object |
| `IK` | Inverse Kinematics chain solver (pose bones only) |
| `STRETCH_TO` | Stretch and squash toward a target |
| `ACTION` | Map a property range to an Action |

## Options / Props (common to all constraints)

| Property | Type | Description |
|----------|------|-------------|
| `Constraint.name` | `str` | Display name (editable) |
| `Constraint.type` | `str` | Constraint type enum (read-only after creation) |
| `Constraint.influence` | `float` | 0.0–1.0 blend weight |
| `Constraint.mute` | `bool` | Disable without removing |
| `Constraint.target` | `Object` | Primary target object |
| `Constraint.subtarget` | `str` | Bone name when target is an armature |
| `Constraint.owner_space` | enum | `WORLD`, `LOCAL`, `LOCAL_WITH_PARENT`, `POSE` |
| `Constraint.target_space` | enum | Space of the target evaluation |

## Notes

- Constraints are evaluated in list order (top to bottom); use `obj.constraints.move(from_index, to_index)` to reorder.
- The IK constraint requires **Pose Mode** and only works on pose bones, not regular objects.
- `CHILD_OF` has a `set_inverse_pending` property; call `bpy.ops.constraint.childof_set_inverse(...)` after setting the target to compute the offset correctly.
- `influence` is animatable — keyframe it to blend a constraint in/out over time.

## Related

- [armatures.md](./armatures.md)
- [keyframes.md](./keyframes.md)
- [drivers.md](./drivers.md)
