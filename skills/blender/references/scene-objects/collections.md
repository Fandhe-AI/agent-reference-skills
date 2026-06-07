---
name: Collections
description: Collection datablock hierarchy, scene linking, object membership, instancing, and view layer visibility.
---

# Collections

Collections (`bpy.types.Collection`) organize objects into named groups without imposing a transform relationship. They nest hierarchically and map to the Outliner's tree structure.

## Overview

All objects belong to at least one collection. The root is `scene.collection` (the Scene Collection). User-created collections are children of this root or nested further.

```
scene.collection                    ← root (always exists)
├── bpy.data.collections["Props"]
│   ├── bpy.data.objects["Chair"]
│   └── bpy.data.objects["Table"]
└── bpy.data.collections["Lights"]
    └── bpy.data.objects["Sun"]
```

## Key Concepts / Settings

### Collection Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `str` | Collection name (unique in `bpy.data.collections`) |
| `objects` | `CollectionObjects` | Direct object members (read-only view; use link/unlink) |
| `all_objects` | `bpy_prop_collection` | Objects including those in child collections (read-only) |
| `children` | `CollectionChildren` | Immediate child collections (read-only view) |
| `color_tag` | `str` | Outliner color: `'NONE'`, `'COLOR_01'` … `'COLOR_08'` |
| `hide_viewport` | `bool` | Globally hide in all viewports |
| `hide_render` | `bool` | Globally exclude from renders |
| `hide_select` | `bool` | Prevent viewport selection |
| `instance_offset` | `Vector` (3) | Pivot offset used when instancing this collection |

### ViewLayer / LayerCollection Visibility

Visibility per view layer is controlled via `LayerCollection`, not `Collection` directly. Accessed through `view_layer.layer_collection`.

| Property | Type | Description |
|----------|------|-------------|
| `exclude` | `bool` | Exclude collection from this view layer entirely |
| `hide_viewport` | `bool` | Temporarily hide in this view layer's viewport |
| `holdout` | `bool` | Mask objects from the view layer (compositing) |
| `indirect_only` | `bool` | Objects only contribute via shadows/reflections |
| `is_visible` | `bool` (read-only) | Effective visibility considering parent state |

## Python API Mapping

```python
import bpy

scene = bpy.context.scene

# Create a new collection and link to scene root
col = bpy.data.collections.new("Props")
scene.collection.children.link(col)

# Link an object into the collection
obj = bpy.data.objects["Chair"]
col.objects.link(obj)

# Remove object from the collection
col.objects.unlink(obj)

# Nest a sub-collection
sub = bpy.data.collections.new("SmallProps")
col.children.link(sub)

# Remove a collection from scene (does not delete objects)
scene.collection.children.unlink(col)

# Delete collection and its objects
bpy.data.collections.remove(col)
```

### Collection Instance (Instancing)

A Collection Instance places all objects of a collection at the position of an Empty-like object.

```python
# Create an empty that instances a collection
bpy.ops.object.collection_instance_add(
    collection="Props",
    location=(2, 0, 0)
)

# Or via Python directly
obj = bpy.data.objects.new("PropsInstance", None)  # None = empty
obj.instance_type = 'COLLECTION'
obj.instance_collection = bpy.data.collections["Props"]
scene.collection.objects.link(obj)
```

### Per-View-Layer Exclusion

```python
view_layer = scene.view_layers["ViewLayer"]

# Walk the layer collection tree to find a collection
def find_layer_collection(layer_coll, name):
    if layer_coll.name == name:
        return layer_coll
    for child in layer_coll.children:
        result = find_layer_collection(child, name)
        if result:
            return result
    return None

lc = find_layer_collection(view_layer.layer_collection, "Props")
if lc:
    lc.exclude = True        # exclude from this view layer
    lc.hide_viewport = True  # hide in viewport only
```

## Notes

- Objects can belong to multiple collections simultaneously.
- `scene.collection` is the implicit root and cannot be renamed or deleted.
- `Collection.objects` and `Collection.children` are read-only views; use `.link()` / `.unlink()` to modify membership.
- `instance_offset` shifts all instanced geometry relative to the Empty's origin — set it to the collection's geometric center for intuitive placement.
- `hide_viewport`/`hide_render` on the Collection datablock are global overrides; per-layer control lives on `LayerCollection`.

## Related

- [Objects & Transform](./objects-transform.md)
- [World & Scene Settings](./world-scene.md)
