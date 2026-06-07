---
name: Object Creation
description: Create mesh objects via primitives or from raw vertex/face data and link them to the scene.
---

# Object Creation

## Overview

Covers two creation patterns: `bpy.ops` primitives for quick prototyping, and the lower-level `bpy.data.meshes.new()` + `mesh.from_pydata()` path for programmatic geometry. Both end with the object linked to a collection so it appears in the scene.

## Complete Example

```python
import bpy
import math

# ── 1. Primitive via ops ──────────────────────────────────────────────────────
# Clear existing mesh objects for a clean start
bpy.ops.object.select_all(action='DESELECT')
for obj in list(bpy.data.objects):
    if obj.type == 'MESH':
        bpy.data.objects.remove(obj, do_unlink=True)

# Add a UV sphere at the origin
bpy.ops.mesh.primitive_uv_sphere_add(
    radius=1.0,
    segments=32,
    ring_count=16,
    location=(0.0, 0.0, 0.0),
)
sphere = bpy.context.active_object
sphere.name = "MySphere"

# Add a cube offset on X
bpy.ops.mesh.primitive_cube_add(size=2.0, location=(4.0, 0.0, 0.0))
cube = bpy.context.active_object
cube.name = "MyCube"

# ── 2. Custom mesh from raw data ──────────────────────────────────────────────
verts = [
    (0.0, 0.0, 0.0),
    (1.0, 0.0, 0.0),
    (1.0, 1.0, 0.0),
    (0.0, 1.0, 0.0),
    (0.5, 0.5, 1.0),   # apex
]
faces = [
    (0, 1, 2, 3),   # base quad
    (0, 1, 4),       # side triangles
    (1, 2, 4),
    (2, 3, 4),
    (3, 0, 4),
]

mesh = bpy.data.meshes.new("PyramidMesh")
mesh.from_pydata(verts, [], faces)
mesh.update()

obj = bpy.data.objects.new("Pyramid", mesh)

# Link to the scene root collection
bpy.context.scene.collection.objects.link(obj)

# ── 3. Transform ──────────────────────────────────────────────────────────────
obj.location = (-4.0, 0.0, 0.0)
obj.rotation_euler = (0.0, 0.0, math.radians(45))
obj.scale = (1.5, 1.5, 1.5)

# ── 4. Move to a named collection ────────────────────────────────────────────
col = bpy.data.collections.get("MyCollection")
if col is None:
    col = bpy.data.collections.new("MyCollection")
    bpy.context.scene.collection.children.link(col)

# Re-link pyramid to the named collection (unlink from root first)
bpy.context.scene.collection.objects.unlink(obj)
col.objects.link(obj)

print("Done: sphere, cube, pyramid created.")
```

## Key Points

- `bpy.ops.mesh.primitive_*_add()` sets `bpy.context.active_object` to the new object — capture it immediately after the call.
- `mesh.from_pydata(verts, edges, faces)` accepts empty `[]` for edges; Blender infers them from faces.
- Always call `mesh.update()` after `from_pydata()` to recalculate normals and validate the mesh.
- An object must be linked to at least one collection to be visible; `bpy.context.scene.collection` is always available as the root.

## Variations

```python
# Cylinder with caps
bpy.ops.mesh.primitive_cylinder_add(
    radius=0.5, depth=2.0, end_fill_type='NGON', location=(0, 3, 0)
)

# Torus
bpy.ops.mesh.primitive_torus_add(
    major_radius=1.0, minor_radius=0.3, location=(0, 6, 0)
)
```

## Related

- `bmesh-editing.md` — Low-level vertex/face manipulation after creation
- `modifier-workflow.md` — Apply modifiers to primitives
- `scene-management.md` — Collection hierarchy and parenting
