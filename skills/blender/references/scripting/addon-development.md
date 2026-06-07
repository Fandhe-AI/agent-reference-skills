---
name: Add-on Development
description: Structure, registration, and UI patterns for Blender Python add-ons and extensions
---

# Add-on Development

Blender add-ons are Python modules (single `.py` or package directory) that extend the editor through registered classes. Blender 4.2+ introduces the **Extensions** system with `blender_manifest.toml` as a replacement for the legacy `bl_info` dict.

## Key Usage

### Minimal add-on skeleton

```python
bl_info = {
    "name": "My Add-on",
    "author": "Author Name",
    "version": (1, 0, 0),
    "blender": (4, 0, 0),
    "location": "View3D > Sidebar > My Tab",
    "description": "Short description shown in Preferences",
    "category": "Object",
}

import bpy

class OBJECT_OT_hello(bpy.types.Operator):
    """Say hello"""
    bl_idname = "object.hello"
    bl_label = "Hello"

    def execute(self, context):
        self.report({'INFO'}, "Hello!")
        return {'FINISHED'}

class VIEW3D_PT_hello(bpy.types.Panel):
    bl_label = "Hello Panel"
    bl_idname = "VIEW3D_PT_hello"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "My Tab"

    def draw(self, context):
        self.layout.operator("object.hello")

_classes = (OBJECT_OT_hello, VIEW3D_PT_hello)

def register():
    for cls in _classes:
        bpy.utils.register_class(cls)

def unregister():
    for cls in reversed(_classes):
        bpy.utils.unregister_class(cls)
```

### Extensions manifest (`blender_manifest.toml`, Blender 4.2+)

```toml
schema_version = "1.0.0"
id = "my_addon"
version = "1.0.0"
name = "My Add-on"
tagline = "Short one-line description"
maintainer = "Author Name <email@example.com>"
type = "add-on"
blender_version_min = "4.2.0"
license = ["SPDX:GPL-2.0-or-later"]
# Optional
tags = ["Mesh", "UV"]
website = "https://example.com"
```

When using the Extensions system, drop `bl_info` from `__init__.py` — metadata comes from the manifest.

### Registering a Scene property

```python
def register():
    bpy.utils.register_class(OBJECT_OT_hello)
    bpy.types.Scene.my_string = bpy.props.StringProperty(name="My String", default="")

def unregister():
    del bpy.types.Scene.my_string
    bpy.utils.unregister_class(OBJECT_OT_hello)
```

## Options / Props

### `bl_info` keys (legacy add-ons)

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `name` | `str` | Yes | Display name in Preferences |
| `author` | `str` | Yes | Author string |
| `version` | `tuple[int,...]` | Yes | Add-on version, e.g. `(1, 0, 0)` |
| `blender` | `tuple[int,int,int]` | Yes | Minimum Blender version |
| `category` | `str` | Yes | Category in Preferences (e.g. `"Object"`, `"Mesh"`) |
| `description` | `str` | No | Shown in Preferences UI |
| `location` | `str` | No | Where the UI lives (informational) |
| `warning` | `str` | No | Warning badge in Preferences |

### `blender_manifest.toml` required keys

| Key | Description |
|-----|-------------|
| `schema_version` | Manifest schema version (`"1.0.0"`) |
| `id` | Unique lowercase identifier (no spaces) |
| `version` | SemVer string |
| `name` | Display name |
| `tagline` | One-line description (no period) |
| `maintainer` | Name and optional email |
| `type` | `"add-on"` or `"theme"` |
| `blender_version_min` | Minimum Blender version string |
| `license` | SPDX license identifier list |

### Operator required attributes

| Attribute | Description |
|-----------|-------------|
| `bl_idname` | Unique ID used for invocation, e.g. `"object.my_op"` |
| `bl_label` | Display name in UI |
| `execute(self, context)` | Main action; must return `{'FINISHED'}` or `{'CANCELLED'}` |

### Panel required attributes

| Attribute | Description |
|-----------|-------------|
| `bl_label` | Panel title |
| `bl_space_type` | Editor type, e.g. `'VIEW_3D'`, `'NODE_EDITOR'` |
| `bl_region_type` | Region, e.g. `'UI'`, `'TOOLS'`, `'HEADER'` |
| `draw(self, context)` | Draws panel contents via `self.layout` |

### `bpy.props` types

| Type | Description |
|------|-------------|
| `bpy.props.IntProperty` | Integer |
| `bpy.props.FloatProperty` | Float |
| `bpy.props.StringProperty` | String |
| `bpy.props.BoolProperty` | Boolean |
| `bpy.props.EnumProperty` | Enum (requires `items`) |
| `bpy.props.PointerProperty` | Reference to another data-block or PropertyGroup |
| `bpy.props.CollectionProperty` | List of PropertyGroup instances |

## Notes

- `register()` and `unregister()` are the only functions Blender calls directly; everything else is a regular Python module.
- Always unregister classes in reverse order to avoid dependency errors.
- Use `bpy.utils.register_classes_factory(_classes)` as a shortcut — it returns `(register, unregister)` callables.
- `bl_idname` naming convention: `CATEGORY_OT_name` for operators, `CATEGORY_PT_name` for panels (e.g., `OBJECT_OT_hello`, `VIEW3D_PT_hello`).
- Properties assigned to `bpy.types.*` must be deleted in `unregister()` to avoid memory leaks on reload.
- Extensions require the `blender_manifest.toml` and `__init__.py` at the package root; single-file add-ons remain supported for legacy installs.

## Related

- [headless-cli.md](./headless-cli.md)
- [extending.md](./extending.md)
- [text-editor.md](./text-editor.md)
