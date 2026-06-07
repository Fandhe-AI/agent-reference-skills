---
name: bpy.context
description: Read-only access to the current window-manager and editor context (bpy.types.Context).
---

# bpy.context

Provides read-only access to the active window, area, scene, and selection state. Values depend on which editor area is currently active. All context values are read-only; modify them via the data API or by running operators.

## Signature / Usage

```python
import bpy

# Common access patterns
obj = bpy.context.active_object
selected = bpy.context.selected_objects
scene = bpy.context.scene
mode = bpy.context.mode  # e.g. 'OBJECT', 'EDIT_MESH'

# Temporary context override
with bpy.context.temp_override(area=my_area):
    bpy.ops.view3d.view_all()
```

## Options / Props

### Core Context Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `active_object` | `Object \| None` | The single active (highlighted) object |
| `selected_objects` | `Sequence[Object]` | All currently selected objects |
| `scene` | `Scene` | The active scene |
| `view_layer` | `ViewLayer` | The active view layer |
| `mode` | `str` | Current mode enum: `'OBJECT'`, `'EDIT_MESH'`, `'POSE'`, etc. |
| `area` | `Area \| None` | The active editor area; `None` in background mode |
| `space_data` | `Space \| None` | Data for the current space type; `None` in background mode |
| `region` | `Region \| None` | Active region within the area |
| `window` | `Window \| None` | Active window |
| `screen` | `Screen \| None` | Current screen layout |
| `workspace` | `WorkSpace \| None` | Active workspace |

### Object Collection Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `visible_objects` | `Sequence[Object]` | All visible objects in the view layer |
| `selectable_objects` | `Sequence[Object]` | Objects that can be selected |
| `editable_objects` | `Sequence[Object]` | Objects that can be edited |
| `selected_editable_objects` | `Sequence[Object]` | Selected objects that can be edited |
| `objects_in_mode` | `Sequence[Object]` | Objects in the current mode (e.g., all mesh objects in Edit Mode) |

### Bone / Pose Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `active_bone` | `EditBone \| Bone` | Active bone in Edit Mode or Pose Mode |
| `active_pose_bone` | `PoseBone` | Active pose bone |
| `selected_bones` | `Sequence[EditBone]` | Selected bones in Edit Mode |
| `selected_pose_bones` | `Sequence[PoseBone]` | Selected pose bones |

### Methods

| Method | Description |
|--------|-------------|
| `temp_override(**kwargs)` | Context manager; temporarily replaces context members and restores on exit |
| `evaluated_depsgraph_get()` | Returns an up-to-date `Depsgraph` with modifiers and animations applied |
| `copy()` | Returns current context members as a plain `dict` |
| `path_resolve(path, coerce=True)` | Resolves a property from an RNA path string |

## Notes

- **Read-only constraint**: Assigning to `bpy.context.active_object = obj` raises `AttributeError`. Use `bpy.context.view_layer.objects.active = obj` instead.
- **Area-dependent members**: Some attributes (e.g., `space_data`) are only available when the appropriate editor area is active. Accessing them outside that context returns `None` or raises an error.
- **temp_override usage**: Pass keyword arguments matching `bpy.types.Context` attribute names. Commonly used to supply a valid `area` or `region` when calling operators from a script:

  ```python
  # Force operator to run in a VIEW_3D area
  for area in bpy.context.screen.areas:
      if area.type == 'VIEW_3D':
          with bpy.context.temp_override(area=area):
              bpy.ops.view3d.view_all()
          break
  ```

- **Background mode**: `area`, `space_data`, and `region` are `None` when Blender runs headless (`--background`). Operators that require a window context will fail.

## Related

- [bpy.data](./bpy-data.md)
- [bpy.ops](./bpy-ops.md)
- [bpy.types](./bpy-types.md)
