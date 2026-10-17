---
name: Animation Keyframes
description: Insert keyframes on object transforms, adjust F-Curve interpolation, and add expression-based drivers.
---

# Animation Keyframes

## Overview

Blender's Python API offers two paths to keyframe animation: `keyframe_insert()` for a quick property-level insert (mirrors the UI button), and `Action.fcurve_ensure_for_datablock()` / channelbag F-Curves for programmatic control. Drivers let you bind a property to an arbitrary Python expression evaluated every frame.

Blender 5.0 removed the legacy Action API (`action.fcurves`, `action.groups`, `action.id_root`). F-Curves now live on an `ActionChannelbag`, one per Action slot.

## Complete Example

```python
import bpy
import math
from bpy_extras import anim_utils

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

# ── 3. Adjust F-Curve interpolation (via the channelbag of the assigned slot) ─
anim_data = obj.animation_data
action = anim_data.action
# keyframe_insert() assigned an action slot to the object; look up its channelbag
channelbag = anim_utils.action_get_channelbag_for_slot(action, anim_data.action_slot)

for fcurve in channelbag.fcurves:
    if fcurve.data_path == "location" and fcurve.array_index == 2:   # Z axis
        for kp in fcurve.keyframe_points:
            kp.interpolation = 'BEZIER'
            kp.handle_left_type  = 'AUTO_CLAMPED'
            kp.handle_right_type = 'AUTO_CLAMPED'
        fcurve.update()

# ── 4. Manual F-Curve — rotation_euler X via fcurve_ensure_for_datablock() ───
# The action must already be assigned to the data-block. Do not assume a slot
# exists on a fresh Action: fcurve_ensure_for_datablock() creates the layer,
# keyframe strip and slot if necessary, and assigns the slot.
if obj.animation_data is None:
    obj.animation_data_create()

if obj.animation_data.action is None:
    obj.animation_data.action = bpy.data.actions.new("CubeAction")
action = obj.animation_data.action

fc_rot = action.fcurve_ensure_for_datablock(
    obj, "rotation_euler", index=0, group_name="Object Transforms"
)  # X axis
for frame in range(1, 61, 10):
    kp = fc_rot.keyframe_points.insert(frame, math.radians(frame * 6))
    kp.interpolation = 'LINEAR'
fc_rot.update()

# ── 5. Driver — Z location driven by a sine of the current frame ──────────────
# Remove previous location animation on Z before adding a driver
channelbag = anim_utils.action_get_channelbag_for_slot(
    action, obj.animation_data.action_slot
)
z_fcurve = channelbag.fcurves.find("location", index=2)
if z_fcurve:
    channelbag.fcurves.remove(z_fcurve)

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
- Blender 5.0+: `action.fcurves`, `action.groups` and `action.id_root` are removed. Get the channelbag with `bpy_extras.anim_utils.action_get_channelbag_for_slot(action, slot)` (returns `None` if the action, slot or channelbag is missing) and use `channelbag.fcurves.find()` / `.ensure()` / `.new()` / `.remove()`.
- `action.fcurve_ensure_for_datablock(datablock, data_path, index=0, group_name='')` returns the existing F-Curve or creates it; the action must already be assigned to the data-block. The `group_name` replaces the legacy `action_group` parameter and is ignored if the F-Curve already exists.
- A fresh `bpy.data.actions.new()` has no slot yet; use `fcurve_ensure_for_datablock()` or `anim_utils.action_ensure_channelbag_for_slot(action, slot)` rather than assuming one exists.
- `FCurve.keyframe_points` accepts `CONSTANT`, `LINEAR`, `BEZIER`, `BACK`, `BOUNCE`, `ELASTIC`, `EXPO`, `SINE` for `interpolation`.
- `FCurve.update()` must be called after manually inserting or modifying points so handles and internal caches are rebuilt.
- Drivers that reference `frame_current` re-evaluate every frame; keep the expression simple (`is_simple_expression == True`) to avoid Python overhead per frame.

## Variations

```python
# Keyframe a custom property
obj["my_prop"] = 0.0
obj.keyframe_insert(data_path='["my_prop"]', frame=1)

# Find an existing F-Curve (5.0+: on the channelbag, not on the action)
channelbag = anim_utils.action_get_channelbag_for_slot(
    obj.animation_data.action, obj.animation_data.action_slot
)
fcurve = channelbag.fcurves.find("location", index=2)

# Constant extrapolation outside keyframe range
for fc in channelbag.fcurves:
    fc.extrapolation = 'CONSTANT'
```

## Related

- [headless-render.md](./headless-render.md) — Render keyframed animation sequences from CLI
- [scene-management.md](./scene-management.md) — Frame range and scene configuration
