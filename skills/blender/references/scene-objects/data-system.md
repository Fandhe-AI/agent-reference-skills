---
name: Data System & Datablocks
description: Datablock user counts, fake user, linking vs appending external .blend files, Library Override, orphan data purge, and ID/custom properties.
---

# Data System & Datablocks

Every piece of data in a `.blend` file is a **datablock** — an `ID`-derived object stored in one of the `bpy.data.*` collections. Blender uses reference counting to decide which datablocks are saved and which become orphan data.

## Overview

```
bpy.data.objects      ← Object datablocks
bpy.data.meshes       ← Mesh datablocks
bpy.data.materials    ← Material datablocks
bpy.data.images       ← Image datablocks
bpy.data.libraries    ← Linked external .blend libraries
...
```

---

## Key Concepts / Settings

### User Count & Fake User

| Property | Type | Description |
|----------|------|-------------|
| `id.users` | `int` (read-only) | Number of datablocks referencing this one |
| `id.use_fake_user` | `bool` | Forces the user count ≥ 1 so the block survives saves with zero real users |

```python
mat = bpy.data.materials["Unused"]
print(mat.users)           # 0 — will be discarded on next save/purge
mat.use_fake_user = True   # protect it (shows "F" icon in UI)
```

### Orphan Data

A datablock with `users == 0` and `use_fake_user == False` is **orphan data** — it exists in memory but is not saved. Blender prunes orphans on file reload.

**Purge orphan data via Python:**

```python
# Remove all zero-user datablocks
bpy.ops.outliner.orphans_purge(do_local_ids=True, do_linked_ids=True, do_recursive=True)
```

---

### Linking vs Appending from External `.blend`

| Mode | Effect | Editable? |
|------|--------|-----------|
| **Append** (`link=False`) | Copies the datablock into the current file | Yes |
| **Link** (`link=True`) | Creates a live reference to the source file | No (use Library Override) |

```python
import bpy

filepath = "/path/to/assets.blend"

# --- Append objects (independent copy) ---
with bpy.data.libraries.load(filepath, link=False) as (data_src, data_dst):
    data_dst.objects = ["Chair", "Table"]   # select by name

for obj in data_dst.objects:
    bpy.context.scene.collection.objects.link(obj)

# --- Link objects (live reference) ---
with bpy.data.libraries.load(filepath, link=True) as (data_src, data_dst):
    data_dst.objects = [name for name in data_src.objects if name.startswith("Prop_")]

for obj in data_dst.objects:
    bpy.context.scene.collection.objects.link(obj)
```

`bpy.data.libraries.load()` parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `filepath` | `str` | Path to the source `.blend` file |
| `link` | `bool` | `True` = link, `False` = append (default `False`) |
| `relative` | `bool` | Store filepath as relative (default `False`) |
| `assets_only` | `bool` | Limit to asset-marked datablocks (default `False`) |

---

### Library Override

Library Override lets you locally edit linked datablocks without breaking the link. Introduced in Blender 2.91 as the successor to Proxies.

```python
# Make a local override of a linked object
obj = bpy.data.objects["LinkedChar"]
obj.override_create(remap_local_usages=True)

# Or use the operator (requires context)
bpy.ops.object.make_override_library()
```

To override an entire linked hierarchy (e.g., a character rig):

```python
# Select the root of the linked hierarchy, then:
bpy.ops.object.make_override_library()
```

Linked datablocks show `library` attribute pointing to their source:

```python
obj = bpy.data.objects["LinkedChar"]
print(obj.library)          # bpy.data.libraries["assets.blend"]
print(obj.is_library_indirect)  # True if linked indirectly
```

---

### ID Properties (Custom Properties)

Any `ID` subclass supports arbitrary key-value data stored as ID Properties, accessible as dictionary items.

```python
obj = bpy.data.objects["Cube"]

# Set custom properties
obj["hp"] = 100
obj["tag"] = "enemy"
obj["offsets"] = [0.0, 1.0, 2.0]

# Read
print(obj["hp"])            # 100

# Annotate for UI (optional)
obj.id_properties_ui("hp").update(min=0, max=200, description="Hit points")

# Iterate all custom props
for key in obj.keys():
    print(key, obj[key])
```

ID Properties are saved in the `.blend` file, can be animated, and are accessible via drivers.

---

## Notes

- Purging is irreversible in the same session; check `users` before purging.
- Appended datablocks become fully independent — changes to the source file do not propagate. Use Link + Library Override for live-updated assets.
- `bpy.data.libraries.load()` is a context manager; data is populated **after** the `with` block exits.
- Linked datablocks have their `library` property set; local datablocks have `library == None`.
- ID Properties with list values are stored as arrays and can be typed via `id_properties_ui()`.

## Related

- [Objects & Transform](./objects-transform.md)
- [Collections](./collections.md)
- [World & Scene Settings](./world-scene.md)
