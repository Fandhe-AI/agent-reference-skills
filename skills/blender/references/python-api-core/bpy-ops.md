---
name: bpy.ops
description: Operator execution interface — call Blender's built-in operators from Python.
---

# bpy.ops

Provides access to Blender's operator system. Operators are organized into submodules by category (e.g., `bpy.ops.object`, `bpy.ops.mesh`). All arguments must be passed as keyword arguments.

## Signature / Usage

```python
import bpy

# Basic call
bpy.ops.object.shade_smooth()

# With keyword arguments
bpy.ops.mesh.subdivide(number_cuts=3, smoothness=0.5)

# Poll before calling to avoid errors
if bpy.ops.object.mode_set.poll():
    bpy.ops.object.mode_set(mode='EDIT')

# With execution context (triggers invoke path / shows dialog)
bpy.ops.object.collection_instance_add('INVOKE_DEFAULT')

# Context override via temp_override
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        with bpy.context.temp_override(area=area):
            bpy.ops.object.delete()
        break
```

## Options / Props

### Operator Call Signature

```
bpy.ops.<category>.<name>([execution_context, undo,] **kwargs)
```

| Positional Arg | Type | Description |
|----------------|------|-------------|
| `execution_context` | `str` enum | Controls whether `invoke()` or `execute()` is called (default: `'EXEC_DEFAULT'`) |
| `undo` | `bool` | Whether to push an undo step; overrides operator's default |

### Execution Context Values

| Value | Description |
|-------|-------------|
| `'EXEC_DEFAULT'` | Run `execute()` only (default) |
| `'INVOKE_DEFAULT'` | Run `invoke()` — may show dialogs, use mouse position |
| `'INVOKE_REGION_WIN'` | Invoke in the window region |
| `'EXEC_REGION_WIN'` | Execute in the window region |
| `'INVOKE_AREA'` / `'EXEC_AREA'` | Invoke/execute in the active area |
| `'INVOKE_SCREEN'` / `'EXEC_SCREEN'` | Invoke/execute at screen level |

### Return Values

Operators return a set containing one or more status strings:

| Value | Description |
|-------|-------------|
| `{'FINISHED'}` | Operator completed successfully; undo step pushed |
| `{'CANCELLED'}` | Aborted; no changes, no undo step |
| `{'RUNNING_MODAL'}` | Operator is running modally (e.g., interactive transform) |
| `{'PASS_THROUGH'}` | Event was not handled; passed to next handler |

### Major Operator Categories

| Submodule | Example Operators |
|-----------|-------------------|
| `bpy.ops.object` | `select_all`, `delete`, `duplicate`, `mode_set`, `transform_apply` |
| `bpy.ops.mesh` | `subdivide`, `extrude_region`, `flip_normals`, `separate`, `merge` |
| `bpy.ops.edit` | Undo/redo, clipboard |
| `bpy.ops.armature` | `bone_primitive_add`, `select_all`, `switch_direction` |
| `bpy.ops.render` | `render`, `render_animation`, `opengl` |
| `bpy.ops.transform` | `translate`, `rotate`, `resize`, `edge_slide` |
| `bpy.ops.node` | `add_node`, `link`, `select_all` |
| `bpy.ops.wm` | `open_mainfile`, `save_mainfile`, `append`, `link` |

## Notes

- **All kwargs only**: Operators accept no positional arguments for properties — `bpy.ops.mesh.subdivide(3)` raises `TypeError`.
- **Error reporting**: If the operator logs errors internally, a `RuntimeError` is raised after execution even if it returns `{'FINISHED'}`. Wrap calls in `try/except RuntimeError` when errors are expected.
- **Poll failures**: Calling an operator when `poll()` returns `False` raises `RuntimeError: Operator bpy.ops.xxx.yyy.poll() failed`. Use `.poll()` to check first.
- **Context requirements**: Many operators require a specific area type (e.g., `VIEW_3D`) or mode. Use `bpy.context.temp_override()` to supply the correct context from a script.
- **Operators vs direct API**: Prefer direct data manipulation (`obj.location.x = 1.0`) over operators for performance and reliability in scripts. Operators carry overhead and context constraints. Use operators when undo integration or user-facing side effects are required.

## Related

- [bpy.context](./bpy-context.md)
- [bpy.types](./bpy-types.md)
- [bpy.data](./bpy-data.md)
