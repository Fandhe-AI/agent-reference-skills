---
name: Mesh Basics
description: Mesh data structure and core Edit Mode operations in Blender.
---

# Mesh Basics

Blender meshes consist of vertices, edges, faces, and loops. Edit Mode exposes tools for extruding, cutting, beveling, and transforming geometry. The bmesh Python module provides low-level programmatic access to these same operations.

## Overview

A mesh object's data block is made of:

- **Vertex** — a point in 3D space; stores position and links to its disk cycle of edges
- **Edge** — a connection between two vertices
- **Face** — a polygon (tri, quad, or n-gon) that references a loop cycle on its boundary
- **Loop** — the per-face-vertex element; stores per-face-vertex data (UVs, vertex colors, etc.)

## Key Operations

### Selection Modes

| Mode | Shortcut | Description |
|------|----------|-------------|
| Vertex Select | `1` | Select individual vertices |
| Edge Select | `2` | Select edges |
| Face Select | `3` | Select faces |
| Multi-mode | `Shift+1/2/3` | Enable multiple modes simultaneously |

### Transform

| Operation | Shortcut | Notes |
|-----------|----------|-------|
| Grab / Move | `G` | Follow with `X`, `Y`, or `Z` to constrain to axis; `Shift+X/Y/Z` to exclude axis |
| Rotate | `R` | Then axis key; type a number for exact degrees |
| Scale | `S` | Then axis key; type a number for exact factor |

### Core Editing Operations

| Operation | Shortcut | Description |
|-----------|----------|-------------|
| Extrude Region | `E` | Extrudes selected faces/edges/vertices outward |
| Inset Faces | `I` | Creates a smaller face within the selected face(s) |
| Loop Cut | `Ctrl+R` | Adds a loop of edges across a mesh ring |
| Knife | `K` | Freehand cutting tool; `Enter` to confirm |
| Bevel | `Ctrl+B` | Rounds edges; scroll wheel sets segment count |
| Bevel Vertices | `Ctrl+Shift+B` | Bevels vertices rather than edges |
| Merge | `M` | Merges selected vertices (At Center, At Cursor, etc.) |
| Dissolve Vertices | `Ctrl+X` (context) | Removes vertices without leaving holes |
| Fill | `F` | Creates a face from selected edges/vertices |
| Grid Fill | `Ctrl+F` → Grid Fill | Fills a loop with a grid of quads |

## Python API Mapping

### Accessing Mesh Data (Object Mode)

```python
import bpy

obj = bpy.context.active_object
mesh = obj.data  # bpy.types.Mesh

for v in mesh.vertices:
    print(v.index, v.co)  # position as mathutils.Vector

for e in mesh.edges:
    print(e.vertices[0], e.vertices[1])

for f in mesh.polygons:
    print(f.vertices[:])  # vertex indices of the face
```

### Accessing Mesh Data via BMesh (Edit Mode)

```python
import bpy, bmesh

obj = bpy.context.edit_object
bm = bmesh.from_edit_mesh(obj.data)

for v in bm.verts:
    print(v.co)
for e in bm.edges:
    print(e.verts[0].index, e.verts[1].index)
for f in bm.faces:
    print([v.index for v in f.verts])

bmesh.update_edit_mesh(obj.data)
```

### BMesh Operations

```python
import bpy, bmesh

obj = bpy.context.edit_object
bm = bmesh.from_edit_mesh(obj.data)

# Extrude selected faces
selected_faces = [f for f in bm.faces if f.select]
result = bmesh.ops.extrude_face_region(bm, geom=selected_faces)
bmesh.ops.translate(bm, vec=(0, 0, 1), verts=[v for v in result['geom'] if isinstance(v, bmesh.types.BMVert)])

# Inset faces
bmesh.ops.inset_region(bm, faces=selected_faces, thickness=0.1, depth=0.0)

# Bevel edges
selected_edges = [e for e in bm.edges if e.select]
bmesh.ops.bevel(bm, geom=selected_edges, offset=0.1, segments=2, affect='EDGES')

bmesh.update_edit_mesh(obj.data)
```

### Using bpy.ops.mesh in Edit Mode

```python
import bpy

bpy.ops.object.mode_set(mode='EDIT')

# Set selection mode
bpy.context.tool_settings.mesh_select_mode = (False, False, True)  # face select

bpy.ops.mesh.extrude_region_move(TRANSFORM_OT_translate={"value": (0, 0, 1)})
bpy.ops.mesh.inset(thickness=0.1, depth=0.0)
bpy.ops.mesh.loopcut(number_cuts=1, smoothness=0.0)
bpy.ops.mesh.bevel(offset=0.1, segments=2, affect='EDGES')
bpy.ops.mesh.merge(type='CENTER')
bpy.ops.mesh.dissolve_verts()
bpy.ops.mesh.fill()
```

## Notes

- Loops store per-face-vertex data (UVs, vertex colors); each edge generally has two loops (one per adjacent face)
- `bmesh.from_edit_mesh()` gives direct access to edit-mode data without toggling modes; call `bmesh.update_edit_mesh()` after modifications
- `bpy.ops.mesh.*` operators require the context to be in Edit Mode and will only affect the active object
- N-gons (faces with more than 4 vertices) can cause shading and subdivision issues; prefer quads where possible
- Knife tool: press `C` to constrain to angles, `Z` to cut through, `Enter` or `Space` to confirm

## Related

- [Modifiers](./modifiers.md)
- [Sculpting](./sculpting.md)
