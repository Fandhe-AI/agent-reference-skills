---
name: Actions & NLA
description: Action data-blocks, NLA (Non-Linear Animation) tracks and strips, push-down, and reuse of animation clips
---

# Actions & NLA

An **Action** is a named data-block that stores F-Curves (keyframe animation) for one object or one armature pose. The **NLA Editor** (Non-Linear Animation) layers and blends multiple Actions as reusable strips.

## Overview

```
Object.animation_data
  ├─ action           ← currently active Action (editable in Graph/Dope Sheet)
  └─ nla_tracks[]
       └─ strips[]    ← each strip references an Action and a frame range
```

An Action becomes a reusable clip once pushed down to the NLA stack.

## Key Operations

### Create and assign an Action manually

```python
import bpy

obj = bpy.context.object
anim = obj.animation_data_create()

action = bpy.data.actions.new(name="Walk")
anim.action = action

# Add keyframes to the active action as usual
obj.location = (0, 0, 0)
obj.keyframe_insert("location", frame=1)
obj.location = (5, 0, 0)
obj.keyframe_insert("location", frame=24)
```

### Push action down to NLA (operator)

```python
# Object must be active and have an action assigned
bpy.context.view_layer.objects.active = obj
bpy.ops.nla.action_pushdown(channel_index=0)
```

After push-down, `obj.animation_data.action` becomes `None` and a new NLA strip is created.

### Add an NLA strip via data API

```python
anim = obj.animation_data_create()
track = anim.nla_tracks.new()
track.name = "Walk Track"

walk_action = bpy.data.actions["Walk"]
strip = track.strips.new(name="Walk", start=1, action=walk_action)

strip.action_frame_start = 1
strip.action_frame_end   = 24
strip.frame_start        = 1
strip.frame_end          = 24
strip.blend_type         = 'REPLACE'   # or 'ADD', 'COMBINE', 'SUBTRACT', 'MULTIPLY'
strip.influence          = 1.0
strip.extrapolation      = 'HOLD'      # 'NOTHING' | 'HOLD' | 'HOLD_FORWARD'
```

### Blend two actions additively

```python
base_track = anim.nla_tracks.new()
base_strip = base_track.strips.new("Idle", 1, bpy.data.actions["Idle"])
base_strip.blend_type = 'REPLACE'

add_track = anim.nla_tracks.new()
add_strip = add_track.strips.new("Breathe", 1, bpy.data.actions["Breathe"])
add_strip.blend_type = 'ADD'
add_strip.influence = 0.5
```

### Iterate all actions in the file

```python
for action in bpy.data.actions:
    print(action.name, len(action.fcurves))
```

### Remove an NLA strip

```python
track = anim.nla_tracks["Walk Track"]
strip = track.strips["Walk"]
track.strips.remove(strip)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `AnimData.action` | `Action` | Currently active action (editable on Graph/Dope Sheet) |
| `AnimData.nla_tracks` | collection | All NLA tracks for this object |
| `NlaTrack.name` | `str` | Track display name |
| `NlaTrack.mute` | `bool` | Disable the track |
| `NlaStrip.action` | `Action` | Action referenced by this strip |
| `NlaStrip.frame_start` / `.frame_end` | `float` | Strip timeline position |
| `NlaStrip.action_frame_start` / `.action_frame_end` | `float` | Portion of action to play |
| `NlaStrip.blend_type` | enum | `REPLACE`, `ADD`, `COMBINE`, `SUBTRACT`, `MULTIPLY` |
| `NlaStrip.influence` | `float` | 0.0–1.0 mix weight |
| `NlaStrip.extrapolation` | enum | `NOTHING`, `HOLD`, `HOLD_FORWARD` |
| `NlaStrip.blend_in` / `.blend_out` | `float` | Frames to fade in/out |
| `NlaStrip.scale` | `float` | Time-scale the action playback |
| `NlaStrip.repeat` | `float` | Loop count (1.0 = play once) |

## Notes

- While `AnimData.action` is set (i.e., the active action is not pushed down), the NLA tracks are in a "tweaking" state and NLA evaluation may be bypassed for that object.
- `bpy.ops.nla.action_pushdown()` requires an active object with a non-None `action` and an NLA Editor area in the UI context; prefer the data API (`track.strips.new()`) in headless scripts.
- Actions are shared data-blocks: multiple objects can reference the same Action. Use `action.copy()` before modifying if independent copies are needed.
- `COMBINE` blend type handles additive vs. multiplicative blending automatically per channel type (e.g., quaternion rotations blend with quaternion math).

## Related

- [keyframes.md](./keyframes.md)
- [drivers.md](./drivers.md)
- [shape-keys.md](./shape-keys.md)
