---
name: bpy.data
description: Access to Blender's internal data-block database (BlendData).
---

# bpy.data

The primary interface for accessing and managing all Blender data-blocks from Python. Backed by `bpy.types.BlendData`, it provides typed collections for every ID type in a `.blend` file.

## Signature / Usage

```python
import bpy

# Iterate all objects
for obj in bpy.data.objects:
    print(obj.name)

# Key-based lookup
cube = bpy.data.objects["Cube"]

# Safe lookup
mat = bpy.data.materials.get("MyMaterial")  # None if missing

# Create a new data-block
mesh = bpy.data.meshes.new(name="MyMesh")

# Remove a data-block
bpy.data.meshes.remove(mesh)

# Current .blend file path
print(bpy.data.filepath)
```

## Options / Props

### Main Collections

| Attribute | Type | Description |
|-----------|------|-------------|
| `actions` | `BlendDataActions` | Action data-blocks |
| `armatures` | `BlendDataArmatures` | Armature data-blocks |
| `brushes` | `BlendDataBrushes` | Brush data-blocks |
| `cameras` | `BlendDataCameras` | Camera data-blocks |
| `collections` | `BlendDataCollections` | Collection data-blocks |
| `curves` | `BlendDataCurves` | Curve data-blocks |
| `fonts` | `BlendDataFonts` | Vector font data-blocks |
| `grease_pencils` | `BlendDataGreasePencilsV3` | Grease Pencil data-blocks |
| `hair_curves` | `BlendDataHairCurves` | Hair curve data-blocks |
| `images` | `BlendDataImages` | Image data-blocks |
| `lights` | `BlendDataLights` | Light data-blocks |
| `materials` | `BlendDataMaterials` | Material data-blocks |
| `meshes` | `BlendDataMeshes` | Mesh data-blocks |
| `node_groups` | `BlendDataNodeTrees` | Node group data-blocks |
| `objects` | `BlendDataObjects` | Object data-blocks |
| `scenes` | `BlendDataScenes` | Scene data-blocks |
| `texts` | `BlendDataTexts` | Text data-blocks |
| `worlds` | `BlendDataWorlds` | World data-blocks |

### File Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `filepath` | `str` | Absolute path of the current `.blend` file |
| `is_dirty` | `bool` | True if there are unsaved changes |
| `is_saved` | `bool` | True if the file has been saved at least once |

### Collection Methods (common to all collections)

| Method | Description |
|--------|-------------|
| `new(name)` | Create a new data-block with the given name |
| `remove(datablock, do_unlink=True)` | Delete a data-block; `do_unlink` removes all references first |
| `get(name, default=None)` | Safe key lookup; returns `default` if not found |
| `find(name)` | Returns the index of the named data-block, or `-1` |
| `keys()` / `values()` / `items()` | Standard dict-like iteration |

## Notes

- Data-blocks with zero users are not automatically deleted; call `.remove()` explicitly or use `do_unlink=True`.
- Modifying a data-block directly (e.g., `mesh.vertices`) requires the object not to be in Edit Mode — use `bpy.ops.object.mode_set(mode='OBJECT')` first.
- Linked data-blocks (from external `.blend` files) appear in the same collections but have `library` set to a `Library` object. They cannot be edited directly without making them local.
- Library overrides allow editing linked data: use `datablock.override_create(remap_local_usages=True)`.

## Related

- [bpy.context](./bpy-context.md)
- [bpy.types](./bpy-types.md)
- [bpy.ops](./bpy-ops.md)
