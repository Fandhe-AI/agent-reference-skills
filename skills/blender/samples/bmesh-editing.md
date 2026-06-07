---
name: BMesh Editing
description: Low-level mesh construction and editing with the bmesh module — vertices, faces, extrude, subdivide, UV layers, and Edit Mode.
---

# BMesh Editing

## Overview

`bmesh` gives direct access to mesh topology without going through the slower `bpy.ops` path. The module owns the data while in use; you must call `to_mesh()` + `free()` (or `update_edit_mesh()` in Edit Mode) to persist changes.

## Complete Example

```python
import bpy
import bmesh
import math

# ── 1. Build a mesh from scratch with bmesh ───────────────────────────────────
bm = bmesh.new()

# Create vertices
v0 = bm.verts.new((0.0,  0.0, 0.0))
v1 = bm.verts.new((1.0,  0.0, 0.0))
v2 = bm.verts.new((1.0,  1.0, 0.0))
v3 = bm.verts.new((0.0,  1.0, 0.0))

# Create a face (winding order determines normal direction)
bm.faces.new([v0, v1, v2, v3])

# Extrude the face upward
face = bm.faces[0]
ret = bmesh.ops.extrude_face_region(bm, geom=[face])
extruded_verts = [g for g in ret['geom'] if isinstance(g, bmesh.types.BMVert)]
bmesh.ops.translate(bm, verts=extruded_verts, vec=(0.0, 0.0, 1.5))

# Subdivide all edges
bmesh.ops.subdivide_edges(
    bm,
    edges=bm.edges[:],
    cuts=1,
    use_grid_fill=True,
)

# Write to a real Mesh data-block and link an Object
mesh = bpy.data.meshes.new("ExtrudedQuad")
bm.to_mesh(mesh)
bm.free()   # release bmesh memory
mesh.update()

obj = bpy.data.objects.new("ExtrudedQuad", mesh)
bpy.context.scene.collection.objects.link(obj)


# ── 2. Edit existing mesh geometry ────────────────────────────────────────────
# Add a plain cube to modify
bpy.ops.mesh.primitive_cube_add(location=(3.0, 0.0, 0.0))
target = bpy.context.active_object

bm2 = bmesh.new()
bm2.from_mesh(target.data)

# Scale every vertex on Z by 2
for v in bm2.verts:
    v.co.z *= 2.0

bm2.to_mesh(target.data)
bm2.free()
target.data.update()


# ── 3. UV layer access ────────────────────────────────────────────────────────
bm3 = bmesh.new()
bm3.from_mesh(target.data)

uv_layer = bm3.loops.layers.uv.verify()   # create if not present

for face in bm3.faces:
    for i, loop in enumerate(face.loops):
        # Simple box-map UVs from XY position
        uv = loop[uv_layer].uv
        uv.x = loop.vert.co.x * 0.5 + 0.5
        uv.y = loop.vert.co.y * 0.5 + 0.5

bm3.to_mesh(target.data)
bm3.free()
target.data.update()


# ── 4. Edit Mode pattern ──────────────────────────────────────────────────────
# Must be called only when an object is active and in Edit Mode.
# (Run this block separately after entering Edit Mode via the UI or ops.)
#
# bpy.ops.object.mode_set(mode='EDIT')
# bm4 = bmesh.from_edit_mesh(bpy.context.active_object.data)
# for v in bm4.verts:
#     if v.select:
#         v.co.z += 0.5
# bmesh.update_edit_mesh(bpy.context.active_object.data, loop_triangles=False, destructive=False)
# bpy.ops.object.mode_set(mode='OBJECT')

print("BMesh editing complete.")
```

## Key Points

- `bmesh.new()` creates a standalone BMesh not attached to any mesh data — always call `bm.free()` after `to_mesh()` to avoid memory leaks.
- `bmesh.ops.extrude_face_region()` returns a dictionary; the new geometry is in `ret['geom']`. Filter by type to get just verts, edges, or faces.
- `bmesh.ops.translate()` moves vertices in-place and returns nothing; apply it to the extruded verts immediately after extrusion.
- `bm.loops.layers.uv.verify()` either retrieves the first UV layer or creates one — safer than `.new()` when the layer may already exist.
- In Edit Mode, use `bmesh.from_edit_mesh()` + `bmesh.update_edit_mesh()` instead of `from_mesh()` + `to_mesh()`; never call `bm.free()` on an edit-mesh BMesh.

## Variations

```python
# Spin geometry to create a lathe shape
import math
bmesh.ops.spin(
    bm,
    geom=bm.faces[:] + bm.edges[:] + bm.verts[:],
    cent=(0.0, 0.0, 0.0),
    axis=(0.0, 0.0, 1.0),
    angle=math.radians(360),
    steps=16,
    use_duplicate=False,
)

# Smooth subdivide
bmesh.ops.subdivide_edges(
    bm,
    edges=bm.edges[:],
    cuts=2,
    smooth=1.0,
    use_grid_fill=True,
    use_sphere=True,
)
```

## Related

- `object-creation.md` — Create the host Object and link it to a collection
- `modifier-workflow.md` — Subdivision Surface as a non-destructive alternative
