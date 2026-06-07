---
name: Add-on Template
description: Minimal fully-working Blender add-on with Operator, Panel, properties, and Modal Operator pattern. Includes Blender 4.2+ blender_manifest.toml format.
---

# Add-on Template

## Overview

A Blender add-on is a Python module that registers classes (Operators, Panels, Properties) on load and unregisters them on disable. This template shows the complete boilerplate needed to distribute a working add-on, including a Modal Operator that runs until the user presses Escape.

## Complete Example

### `__init__.py` (or a single `.py` file)

```python
# SPDX-License-Identifier: GPL-3.0-or-later

bl_info = {
    "name":        "My Procedural Tool",
    "author":      "Your Name",
    "version":     (1, 0, 0),
    "blender":     (4, 0, 0),
    "location":    "View3D > Sidebar > My Tool",
    "description": "Procedurally adds and tweaks mesh objects.",
    "category":    "Object",
}

import bpy
from bpy.props import IntProperty, FloatProperty, EnumProperty, FloatVectorProperty
from bpy.types import Operator, Panel, PropertyGroup


# ── Properties stored on the Scene ────────────────────────────────────────────
class MyToolSettings(PropertyGroup):
    subdivisions: IntProperty(
        name="Subdivisions",
        description="Number of subdivision cuts",
        default=2, min=0, max=6,
    )
    size: FloatProperty(
        name="Size",
        description="Object size",
        default=1.0, min=0.01, max=100.0,
    )
    shape: EnumProperty(
        name="Shape",
        items=[
            ('CUBE',   "Cube",   "Add a cube"),
            ('SPHERE', "Sphere", "Add a UV sphere"),
            ('TORUS',  "Torus",  "Add a torus"),
        ],
        default='CUBE',
    )
    color: FloatVectorProperty(
        name="Color",
        subtype='COLOR',
        size=4,
        default=(0.2, 0.6, 1.0, 1.0),
        min=0.0, max=1.0,
    )


# ── Main Operator ─────────────────────────────────────────────────────────────
class MYTOOL_OT_add_object(Operator):
    """Add a procedural object with the current tool settings"""
    bl_idname      = "mytool.add_object"
    bl_label       = "Add Procedural Object"
    bl_options     = {'REGISTER', 'UNDO'}

    @classmethod
    def poll(cls, context):
        return context.mode == 'OBJECT'

    def execute(self, context):
        settings = context.scene.my_tool_settings

        if settings.shape == 'CUBE':
            bpy.ops.mesh.primitive_cube_add(size=settings.size)
        elif settings.shape == 'SPHERE':
            bpy.ops.mesh.primitive_uv_sphere_add(radius=settings.size / 2)
        elif settings.shape == 'TORUS':
            bpy.ops.mesh.primitive_torus_add(major_radius=settings.size / 2)

        obj = context.active_object

        # Apply color as a simple material
        mat = bpy.data.materials.new("ProceduralMat")
        mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get("Principled BSDF")
        if bsdf:
            bsdf.inputs['Base Color'].default_value = settings.color

        obj.data.materials.append(mat)

        self.report({'INFO'}, f"Added {settings.shape} with {settings.subdivisions} subdivisions")
        return {'FINISHED'}


# ── Modal Operator (runs until ESC) ──────────────────────────────────────────
class MYTOOL_OT_interactive_move(Operator):
    """Move object interactively with the mouse; confirm with LMB, cancel with ESC/RMB"""
    bl_idname  = "mytool.interactive_move"
    bl_label   = "Interactive Move"
    bl_options = {'REGISTER', 'UNDO'}

    @classmethod
    def poll(cls, context):
        return context.active_object is not None

    def invoke(self, context, event):
        self._init_x    = event.mouse_x
        self._init_loc  = context.active_object.location.x
        context.window_manager.modal_handler_add(self)
        return {'RUNNING_MODAL'}

    def modal(self, context, event):
        if event.type == 'MOUSEMOVE':
            delta = (event.mouse_x - self._init_x) * 0.01
            context.active_object.location.x = self._init_loc + delta

        elif event.type == 'LEFTMOUSE' and event.value == 'RELEASE':
            return {'FINISHED'}

        elif event.type in {'RIGHTMOUSE', 'ESC'}:
            # Restore original position on cancel
            context.active_object.location.x = self._init_loc
            return {'CANCELLED'}

        return {'RUNNING_MODAL'}

    def execute(self, context):
        return {'FINISHED'}


# ── Panel ─────────────────────────────────────────────────────────────────────
class MYTOOL_PT_panel(Panel):
    bl_label      = "My Procedural Tool"
    bl_idname     = "MYTOOL_PT_panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category   = 'My Tool'

    def draw(self, context):
        layout  = self.layout
        settings = context.scene.my_tool_settings

        layout.prop(settings, "shape")
        layout.prop(settings, "size")
        layout.prop(settings, "subdivisions")
        layout.prop(settings, "color")
        layout.separator()
        layout.operator("mytool.add_object", icon='ADD')
        layout.separator()
        layout.operator("mytool.interactive_move", icon='MOUSE_MOVE')


# ── Registration ──────────────────────────────────────────────────────────────
_classes = (
    MyToolSettings,
    MYTOOL_OT_add_object,
    MYTOOL_OT_interactive_move,
    MYTOOL_PT_panel,
)

def register():
    for cls in _classes:
        bpy.utils.register_class(cls)
    bpy.types.Scene.my_tool_settings = bpy.props.PointerProperty(type=MyToolSettings)

def unregister():
    for cls in reversed(_classes):
        bpy.utils.unregister_class(cls)
    del bpy.types.Scene.my_tool_settings

if __name__ == "__main__":
    register()
```

### `blender_manifest.toml` (Blender 4.2+ Extensions system)

```toml
schema_version = "1.0.0"

id      = "my_procedural_tool"
version = "1.0.0"
name    = "My Procedural Tool"
tagline = "Procedurally add and tweak mesh objects"
maintainer = "Your Name <you@example.com>"

type = "add-on"

blender_version_min = "4.2.0"

[build]
paths = ["__init__.py"]

[[permissions]]
# No special permissions needed for this add-on

[tags]
category = "Object"
```

## Key Points

- `bl_idname` for Operators must follow `module.operator_name` dot notation and be globally unique.
- `bl_options = {'REGISTER', 'UNDO'}` makes the operator appear in the Undo history and Operator panel for repeat.
- `@classmethod poll()` gates operator availability — return `False` to grey-out the button without an error.
- Modal operators must call `context.window_manager.modal_handler_add(self)` in `invoke()` before returning `{'RUNNING_MODAL'}`.
- `PropertyGroup` fields attached to `bpy.types.Scene` persist across operator calls; remember to delete the pointer property in `unregister()`.
- Blender 4.2+ `blender_manifest.toml` replaces `bl_info` for the new Extensions platform; both can coexist for backward compatibility.

## Variations

```python
# File selector operator
class MYTOOL_OT_open_file(Operator):
    bl_idname  = "mytool.open_file"
    bl_label   = "Open File"
    filepath: bpy.props.StringProperty(subtype='FILE_PATH')

    def execute(self, context):
        print(f"Selected: {self.filepath}")
        return {'FINISHED'}

    def invoke(self, context, event):
        context.window_manager.fileselect_add(self)
        return {'RUNNING_MODAL'}
```

## Related

- `object-creation.md` — Object and mesh creation used inside operators
- `scene-management.md` — Collections and scene data manipulated via add-ons
