---
name: Keyframes
description: Keyframe insertion, deletion, interpolation modes, F-Curve access via Python API
---

# Keyframes

A keyframe stores the value of a property at a specific point in time. Blender interpolates between keyframes on an F-Curve to produce smooth animation.

## Overview

Animation data is organized in a hierarchy:

```
Object.animation_data → Action → FCurves → Keyframe points
```

Each F-Curve (`FCurve`) represents one channel of one property (e.g., `location[0]` = X position).

## Key Operations

### Insert a keyframe

```python
import bpy

obj = bpy.context.object
bpy.context.scene.frame_set(1)
obj.location = (0, 0, 0)
obj.keyframe_insert(data_path="location", frame=1)

obj.location = (2, 0, 0)
obj.keyframe_insert(data_path="location", frame=24)
```

`data_path` accepts any animatable property path (e.g., `"rotation_euler"`, `"scale"`, `"["my_prop"]"`).  
The optional `index` parameter targets a specific axis (`0=X, 1=Y, 2=Z`); omit it to key all axes.

### Delete a keyframe

```python
obj.keyframe_delete(data_path="location", frame=24)
```

### Low-level F-Curve creation

```python
anim = obj.animation_data_create()
action = bpy.data.actions.new(name="MyAction")
anim.action = action

fc = action.fcurves.new(data_path="location", index=0)  # X axis
fc.keyframe_points.insert(frame=1,  value=0.0)
fc.keyframe_points.insert(frame=24, value=2.0)
fc.update()
```

### Access existing F-Curves

```python
action = obj.animation_data.action
for fc in action.fcurves:
    print(fc.data_path, fc.array_index)
    for kp in fc.keyframe_points:
        print(f"  frame={kp.co[0]:.1f}  value={kp.co[1]:.4f}  interp={kp.interpolation}")
```

### Set interpolation mode

```python
for fc in obj.animation_data.action.fcurves:
    for kp in fc.keyframe_points:
        kp.interpolation = 'BEZIER'   # 'CONSTANT' | 'LINEAR' | 'BEZIER'
        kp.easing = 'AUTO'            # 'AUTO' | 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_OUT'
```

### Evaluate an F-Curve at a frame

```python
fc = obj.animation_data.action.fcurves.find("location", index=0)
value_at_frame_10 = fc.evaluate(10)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `keyframe_insert(data_path, frame, index, group)` | method | Insert keyframe on object property |
| `keyframe_delete(data_path, frame, index)` | method | Remove keyframe |
| `FCurve.data_path` | `str` | RNA path of driven property |
| `FCurve.array_index` | `int` | Axis index (0/1/2 for X/Y/Z) |
| `Keyframe.co` | `Vector2` | (frame, value) coordinate |
| `Keyframe.interpolation` | enum | `CONSTANT`, `LINEAR`, `BEZIER`, `SINE`, `QUAD`, … |
| `Keyframe.easing` | enum | `AUTO`, `EASE_IN`, `EASE_OUT`, `EASE_IN_OUT` |
| `FCurve.extrapolation` | enum | `CONSTANT` (hold) or `LINEAR` (extend slope) |

## Notes

- Always call `fc.update()` after inserting points manually to rebuild the curve handles.
- `keyframe_insert()` reads the property's **current value at the current frame** unless `frame` is given explicitly.
- The Graph Editor and Dope Sheet are the UI counterparts; they visualize the same `Action` / `FCurve` data.
- Easing types (SINE, QUAD, CUBIC, BACK, BOUNCE, ELASTIC, …) apply additional easing to BEZIER interpolation.

## Related

- [actions-nla.md](./actions-nla.md)
- [drivers.md](./drivers.md)
- [shape-keys.md](./shape-keys.md)
