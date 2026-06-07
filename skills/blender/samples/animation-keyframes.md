---
name: Animation Keyframes
description: Insert keyframes on object transforms, adjust F-Curve interpolation, and add expression-based drivers.
---

# Animation Keyframes

## Overview

Blender's Python API offers two paths to keyframe animation: `keyframe_insert()` for a quick property-level insert (mirrors the UI button), and manual `FCurve` construction for programmatic control. Drivers let you bind a property to an arbitrary Python expression evaluated every frame.

## Complete Example

```python
import bpy
import math

# ── 1. Create a simple cube to animate ────────────────────────────────────────
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

bpy.ops.mesh.primitive_cube_add(location=(0, 0, 0))
obj = bpy.context.active_object
obj.name = "AnimCube"

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end   = 60

# ── 2. keyframe_insert — location along Z ────────────────────────────────────
keyframes = {
    1:  (0, 0, 0),
    20: (0, 0, 3),
    40: (0, 0, 0),
    60: (0, 0, 4),
}
for frame, loc in keyframes.items():
    scene.frame_set(frame)
    obj.location = loc
    obj.keyframe_insert(data_path="location", frame=frame)

# ── 3. Adjust F-Curve interpolation ──────────────────────────────────────────
action = obj.animation_data.action
for fcurve in action.fcurves:
    if fcurve.data_path == "location" and fcurve.array_index == 2:   # Z axis
        for kp in fcurve.keyframe_points:
            kp.interpolation = 'BEZIER'
            kp.handle_left_type  = 'AUTO_CLAMPED'
            kp.handle_right_type = 'AUTO_CLAMPED'
        fcurve.update()

# ── 4. Manual FCurve — rotation_euler X via action.fcurves.new() ─────────────
if obj.animation_data is None:
    obj.animation_data_create()

action = obj.animation_data.action or bpy.data.actions.new("CubeAction")
obj.animation_data.action = action

fc_rot = action.fcurves.new(data_path="rotation_euler", index=0)  # X axis
for frame in range(1, 61, 10):
    kp = fc_rot.keyframe_points.insert(frame, math.radians(frame * 6))
    kp.interpolation = 'LINEAR'
fc_rot.update()

# ── 5. Driver — Z location driven by a sine of the current frame ──────────────
# Remove previous location animation on Z before adding a driver
action.fcurves.remove(
    next(fc for fc in action.fcurves
         if fc.data_path == "location" and fc.array_index == 2)
)

drv_fc = obj.driver_add("location", 2)        # index 2 = Z
drv    = drv_fc.driver
drv.type = 'SCRIPTED'

var = drv.variables.new()
var.name = "frame"
var.type = "SINGLE_PROP"
var.targets[0].id_type   = 'SCENE'
var.targets[0].id        = bpy.context.scene
var.targets[0].data_path = "frame_current"

drv.expression = "sin(frame / 10.0) * 2"

# ── 6. Scrub to verify ────────────────────────────────────────────────────────
scene.frame_set(30)
print(f"Frame 30 | Z loc = {obj.location.z:.4f}")
```

## Key Points

- `keyframe_insert(data_path, frame)` mirrors the UI insert; the object's current value at `scene.frame_set(frame)` is recorded.
- `FCurve.keyframe_points` accepts `CONSTANT`, `LINEAR`, `BEZIER`, `BACK`, `BOUNCE`, `ELASTIC`, `EXPO`, `SINE` for `interpolation`.
- `FCurve.update()` must be called after manually inserting or modifying points so handles and internal caches are rebuilt.
- Drivers that reference `frame_current` re-evaluate every frame; keep the expression simple (`is_simple_expression == True`) to avoid Python overhead per frame.

## Variations

```python
# Keyframe a custom property
obj["my_prop"] = 0.0
obj.keyframe_insert(data_path='["my_prop"]', frame=1)

# Bake the driver back to regular keyframes
fcurve = obj.animation_data.action.fcurves.find("location", index=2)
if fcurve:
    fcurve.bake(scene.frame_start, scene.frame_end)

# Constant extrapolation outside keyframe range
for fc in action.fcurves:
    fc.extrapolation = 'CONSTANT'
```

## Related

- [headless-render.md](./headless-render.md) — Render keyframed animation sequences from CLI
- [scene-management.md](./scene-management.md) — Frame range and scene configuration
