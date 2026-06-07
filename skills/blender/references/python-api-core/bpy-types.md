---
name: bpy.types
description: All RNA-registered Blender types — data-blocks, UI classes, nodes, and base structs.
---

# bpy.types

The namespace for every type registered in Blender's RNA system. Includes data-blocks (`Object`, `Mesh`, `Material`, …), UI extension base classes (`Panel`, `Operator`, `Menu`), node types, and internal structs. Types here are used for isinstance checks, subclassing, and `PointerProperty` / `CollectionProperty` targets.

## Signature / Usage

```python
import bpy

# isinstance check
if isinstance(bpy.context.active_object.data, bpy.types.Mesh):
    print("It's a mesh")

# Subclassing for custom Operator
class OBJECT_OT_my_op(bpy.types.Operator):
    bl_idname = "object.my_op"
    bl_label = "My Operator"

    def execute(self, context):
        return {'FINISHED'}

# Subclassing for custom Panel
class VIEW3D_PT_my_panel(bpy.types.Panel):
    bl_label = "My Panel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "Tool"

    def draw(self, context):
        self.layout.label(text="Hello")
```

## Options / Props

### Core Data-Block Types (inherit from `ID`)

| Type | Key Attributes | Description |
|------|---------------|-------------|
| `Object` | `name`, `location`, `rotation_euler`, `scale`, `data`, `parent`, `modifiers`, `constraints`, `collections` | Scene entity; wraps mesh/curve/armature/etc. |
| `Mesh` | `vertices`, `edges`, `loops`, `polygons`, `uv_layers`, `vertex_colors`, `materials` | Polygonal geometry data |
| `Material` | `name`, `use_nodes`, `node_tree`, `diffuse_color`, `roughness`, `metallic` | Surface shading definition |
| `Scene` | `name`, `frame_current`, `frame_start`, `frame_end`, `camera`, `world`, `collection`, `render` | Root container for render and world settings |
| `Collection` | `name`, `objects`, `children`, `color_tag`, `hide_viewport` | Hierarchical object grouping |
| `Armature` | `name`, `bones`, `edit_bones` | Skeletal rig data; `edit_bones` available only in Edit Mode |
| `Camera` | `lens`, `type`, `clip_start`, `clip_end` | Camera projection settings |
| `Light` | `type`, `color`, `energy`, `shadow_soft_size` | Light source data |
| `Image` | `name`, `filepath`, `size`, `pixels`, `file_format` | Raster image data |
| `NodeTree` | `name`, `type`, `nodes`, `links`, `inputs`, `outputs` | Node graph container (shader/geo/compositor) |

### Bone Types

| Type | Description |
|------|-------------|
| `Bone` | Pose-mode bone; read-only structure within `Armature.bones` |
| `EditBone` | Editable bone; available only when armature is in Edit Mode via `Armature.edit_bones` |
| `PoseBone` | Pose-mode bone with transform/constraint data; via `Object.pose.bones` |

### Shape Key Types

| Type | Key Attributes | Description |
|------|---------------|-------------|
| `Key` | `reference_key`, `key_blocks`, `use_relative` | Shape key data-block attached to a mesh/curve |
| `ShapeKey` | `name`, `value`, `data`, `relative_key`, `slider_min`, `slider_max` | Individual shape key (morph target) |

### Node Types

| Type | Description |
|------|-------------|
| `Node` | Base class for all nodes; has `inputs`, `outputs`, `location`, `name` |
| `NodeSocket` | Input/output socket on a node; has `type`, `links`, `default_value` |
| `ShaderNode` | Base for shader nodes (e.g., `ShaderNodeBsdfPrincipled`) |
| `GeometryNode` | Base for geometry nodes |
| `CompositorNode` | Base for compositor nodes |

### UI Extension Base Classes

| Type | Required `bl_` Attributes | Description |
|------|--------------------------|-------------|
| `Operator` | `bl_idname`, `bl_label` | Custom operator; implement `execute(self, context)` |
| `Panel` | `bl_label`, `bl_space_type`, `bl_region_type` | Custom UI panel; implement `draw(self, context)` |
| `Menu` | `bl_label` | Custom menu; implement `draw(self, context)` |
| `PropertyGroup` | — | Container for grouped custom properties |
| `AddonPreferences` | `bl_idname` | Addon-level persistent preferences |
| `RenderEngine` | `bl_idname`, `bl_label` | Custom render engine integration |

### Operator Class Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `bl_idname` | `str` | Unique identifier: `"category.name"` (lowercase, underscores) |
| `bl_label` | `str` | Display name shown in UI |
| `bl_description` | `str` | Tooltip text |
| `bl_options` | `set` | Flags: `'REGISTER'`, `'UNDO'`, `'INTERNAL'`, `'BLOCKING'`, etc. |

### Panel Class Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `bl_space_type` | `str` | Editor type: `'VIEW_3D'`, `'NODE_EDITOR'`, `'PROPERTIES'`, etc. |
| `bl_region_type` | `str` | Region: `'UI'`, `'TOOLS'`, `'HEADER'`, `'WINDOW'`, etc. |
| `bl_category` | `str` | Sidebar tab name (N-panel) |
| `bl_order` | `int` | Sort order among panels |
| `bl_parent_id` | `str` | `bl_idname` of a parent panel for nesting |

## Notes

- Types in `bpy.types` cannot be instantiated directly with `bpy.types.Object()`. Data-blocks are created via the corresponding `bpy.data.<collection>.new()` method.
- `EditBone` is only valid while the armature is in Edit Mode. Accessing `edit_bones` outside Edit Mode returns an empty collection or raises an error.
- `ShapeKey.data` is a collection of per-vertex positions; its length equals `len(mesh.vertices)`.
- Custom `Operator` subclasses must define at minimum `bl_idname` and `bl_label`, and the `execute` method must return a set (`{'FINISHED'}` or `{'CANCELLED'}`).
- `Panel.poll(cls, context)` is an optional `@classmethod` that controls visibility; return `False` to hide the panel.

## Related

- [bpy.data](./bpy-data.md)
- [bpy.props](./bpy-props.md)
- [bpy.utils](./bpy-utils.md)
