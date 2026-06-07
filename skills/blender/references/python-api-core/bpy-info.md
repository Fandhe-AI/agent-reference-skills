---
name: bpy.info
description: Quickstart, API overview, best practices, and common gotchas for Blender Python scripting.
---

# bpy.info

Introductory and conceptual documentation for the Blender Python API: how to run scripts, the type system, best practices, and known pitfalls.

## Signature / Usage

```python
# Minimal runnable script (paste in Text Editor, click Run Script)
import bpy

for obj in bpy.data.objects:
    print(obj.name, obj.location)
```

## Quickstart

### Running Scripts

| Method | How |
|--------|-----|
| **Text Editor** | Open the *Scripting* workspace → paste/open `.py` → click *Run Script* |
| **Python Console** | Type expressions directly; supports Tab autocomplete for API discovery |
| **Command Line** | `blender --background --python my_script.py` |
| **Startup Scripts** | Place in `scripts/startup/` to run automatically on launch |

### Enabling Developer Tools

In *Preferences → Interface*:
- **Developer Extras**: reveals Python attribute names in button tooltips
- **Python Tooltips**: shows operator `bl_idname` on hover

### Discovering the API

- Hover over any UI element while *Python Tooltips* is enabled to see the RNA path.
- Right-click → *Online Manual* / *Copy Data Path* on properties.
- Use Tab completion in the Python Console: `bpy.data.objects[0].` + Tab.
- Browse `scripts/startup/bl_ui/` and `scripts/startup/bl_operators/` for official examples.

## API Overview

### Type System and RNA

Blender's Python API is generated from its internal **RNA** (RNA — RNA is Not Acronym) reflection system. Every property, method, and type visible in `bpy.types` is RNA-registered and participates in:

- **Undo**: RNA property changes are automatically recorded.
- **Animation**: RNA properties can be keyed via F-curves.
- **Library overrides**: RNA-registered ID data supports linked-library overrides.

### Module Roles

| Module | Role |
|--------|------|
| `bpy.data` | All ID data-blocks in the `.blend` file |
| `bpy.context` | Current window, area, scene, and selection state |
| `bpy.ops` | Invoke built-in and registered operators |
| `bpy.types` | All RNA types — data, UI classes, nodes |
| `bpy.props` | Property type constructors for RNA extension |
| `bpy.utils` | Class registration, resource paths, icon previews |
| `bpy.app` | App metadata, event handlers, timers, translations |

### Registration Pattern

Every addon or script that adds operators/panels must provide `register()` and `unregister()` functions. Blender calls these when the addon is enabled/disabled.

```python
classes = [MyPropertyGroup, MyOperator, MyPanel]

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    bpy.types.Scene.my_props = bpy.props.PointerProperty(type=MyPropertyGroup)

def unregister():
    del bpy.types.Scene.my_props
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)

if __name__ == "__main__":
    register()
```

## Best Practices

### Operators vs. Direct Data Access

| Situation | Prefer |
|-----------|--------|
| Need undo integration | `bpy.ops.*` with `bl_options = {'UNDO'}` |
| Batch data processing | Direct data API (`mesh.vertices[i].co = ...`) |
| User-facing action with UI feedback | Operator |
| Background/headless script | Direct data API |

Direct data manipulation is faster and has no context constraints. Operators carry overhead and require a valid context.

### Performance

- **Iteration**: use list comprehensions instead of repeated `.append()` in loops.
- **String building**: `"".join(parts)` is faster than repeated concatenation.
- **`try/except` in loops**: slower than an `if` guard; avoid in hot paths.
- **BMesh for mesh editing**: use `bmesh` for algorithmic mesh manipulation instead of modifying `mesh.vertices` directly, then call `bmesh.update_edit_mesh()` or `mesh.update()`.
- **`foreach_set` / `foreach_get`**: for bulk attribute I/O on mesh data, these are orders of magnitude faster than Python loops.

### Code Style

- Follow **PEP 8** (4-space indent, lowercase_with_underscores for modules/functions).
- Class naming conventions: `AREA_TYPE_my_name` (e.g., `VIEW3D_PT_my_panel`, `OBJECT_OT_my_op`).
- Use single quotes for enum identifiers (`'EDIT_MESH'`), double quotes for display strings.

## Gotchas

### Stale / Freed Pointers

Python references to Blender data-blocks can become invalid if the underlying C object is freed (e.g., after `.remove()`, undo, or file load).

```python
mesh = bpy.data.meshes["Cube"]
bpy.data.meshes.remove(mesh)
# mesh is now a stale pointer — accessing mesh.name will crash
```

Always discard Python references after removing the data-block. Do not store data-block references across operators or undo steps.

### Edit Mode and Mesh Data

Mesh topology data (`vertices`, `edges`, `polygons`) reflects **Object Mode** state. Changes made in Edit Mode are not flushed to the mesh until you exit Edit Mode.

```python
# WRONG: accessing mesh.vertices while in Edit Mode gives stale data
bpy.ops.object.mode_set(mode='EDIT')
print(obj.data.vertices[0].co)  # stale!

# CORRECT: use bmesh for Edit Mode mesh access
import bmesh
bm = bmesh.from_edit_mesh(obj.data)
print(bm.verts[0].co)
```

### Context Restrictions for Operators

Operators require a valid context (window, area, mode). Calling them from a script without the right context raises `RuntimeError`.

- Use `bpy.context.temp_override(area=area)` to supply context.
- In background mode (`bpy.app.background == True`), window-dependent operators are unavailable.

### Bone Access by Mode

| Mode | Access via |
|------|-----------|
| Object / Pose Mode | `obj.pose.bones["name"]` (`PoseBone`) |
| Edit Mode (armature) | `obj.data.edit_bones["name"]` (`EditBone`) |

`edit_bones` is empty outside armature Edit Mode. `pose.bones` is unavailable in Edit Mode.

### Python Threads

Blender's internal data is **not thread-safe**. Do not call `bpy.*` APIs from Python threads (`threading.Thread`). Use `bpy.app.timers` for deferred main-thread execution instead.

### Handler Callbacks During Rendering

`frame_change_pre` / `frame_change_post` handlers fire from the render thread. Modifying scene data in these handlers while the viewport updates from another thread can cause crashes. Lock the interface (`bpy.ops.render.render(use_viewport=False)`) or avoid mutations in render handlers.

## Related

- [bpy.data](./bpy-data.md)
- [bpy.context](./bpy-context.md)
- [bpy.ops](./bpy-ops.md)
- [bpy.types](./bpy-types.md)
- [bpy.props](./bpy-props.md)
- [bpy.utils](./bpy-utils.md)
- [bpy.app](./bpy-app.md)
