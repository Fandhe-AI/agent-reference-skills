---
name: Shape Keys
description: Mesh deformation via shape keys (morph targets), including Basis key, relative keys, value sliders, and driver integration
---

# Shape Keys

Shape Keys (also called morph targets or blend shapes) store per-vertex position offsets relative to a Basis shape. They are commonly used for facial animation and corrective shapes.

## Overview

Shape key data lives on `obj.data.shape_keys` (a `Key` data-block). Each individual shape is a `ShapeKey` accessible via `key_blocks`.

```
Object.data.shape_keys (Key)
  └─ key_blocks[0]  ← "Basis"   (reference shape)
  └─ key_blocks[1]  ← "Smile"   (relative shape)
  └─ key_blocks[2]  ← "Angry"
```

## Key Operations

### Add shape keys

```python
import bpy

obj = bpy.data.objects["Head"]
bpy.context.view_layer.objects.active = obj

# First call creates the Basis key
bpy.ops.object.shape_key_add(from_mix=False)

# Subsequent calls add relative keys
bpy.ops.object.shape_key_add(from_mix=False)
obj.data.shape_keys.key_blocks[-1].name = "Smile"
```

Alternatively, use the data-level method (no operator context required):

```python
basis = obj.shape_key_add(name="Basis")
smile = obj.shape_key_add(name="Smile", from_mix=False)
```

### Set vertex offsets on a shape key

```python
import bmesh

obj.active_shape_key_index = 1   # select "Smile"
bpy.ops.object.mode_set(mode='EDIT')
bm = bmesh.from_edit_mesh(obj.data)
# move a vertex
bm.verts[4].co.x += 0.5
bmesh.update_edit_mesh(obj.data)
bpy.ops.object.mode_set(mode='OBJECT')
```

### Set value (influence slider)

```python
sk = obj.data.shape_keys.key_blocks["Smile"]
sk.value = 0.75    # 0.0 = no influence, 1.0 = full influence
```

### Animate value with keyframes

```python
sk = obj.data.shape_keys.key_blocks["Smile"]
sk.value = 0.0
sk.keyframe_insert(data_path="value", frame=1)
sk.value = 1.0
sk.keyframe_insert(data_path="value", frame=20)
```

### Assign a vertex group (masked blend)

```python
sk = obj.data.shape_keys.key_blocks["Smile"]
sk.vertex_group = "LeftFace"   # only vertices in this group are affected
```

### Drive a shape key from a bone rotation

```python
sk = obj.data.shape_keys.key_blocks["Smile"]
fc = sk.driver_add("value")
drv = fc.driver
drv.type = 'SCRIPTED'

var = drv.variables.new()
var.name = "rot"
var.type = 'TRANSFORMS'
var.targets[0].id = bpy.data.objects["Armature"]
var.targets[0].bone_target = "Jaw"
var.targets[0].transform_type = 'ROT_X'
var.targets[0].transform_space = 'LOCAL_SPACE'

drv.expression = "rot / 0.5"
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `ShapeKey.name` | `str` | Display name |
| `ShapeKey.value` | `float` | Current influence (0.0–1.0) |
| `ShapeKey.relative_key` | `ShapeKey` | The reference key for relative mode |
| `ShapeKey.vertex_group` | `str` | Vertex group name to mask influence |
| `ShapeKey.mute` | `bool` | Disable the shape key |
| `ShapeKey.slider_min` / `.slider_max` | `float` | UI slider range |
| `Key.use_relative` | `bool` | True = relative mode (default); False = absolute |
| `Key.reference_key` | `ShapeKey` | The Basis key in relative mode |
| `shape_key_add(name, from_mix)` | method | `from_mix=True` captures current mixed state |

## Notes

- The **Basis** key is always `key_blocks[0]`. Its `value` is always 1.0 and cannot be changed.
- Modifying the Basis key vertex positions in Object Mode (via `basis.data[i].co`) can desync from the mesh; prefer Edit Mode edits.
- Shape keys only exist on mesh, lattice, curve, and surface objects.
- To remove a shape key: `obj.active_shape_key_index = idx; bpy.ops.object.shape_key_remove()`.
- Shape key animation integrates with the NLA via the Action stored on `obj.data.shape_keys.animation_data`.

## Related

- [keyframes.md](./keyframes.md)
- [drivers.md](./drivers.md)
- [armatures.md](./armatures.md)
