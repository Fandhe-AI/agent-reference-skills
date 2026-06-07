---
name: bmesh
description: Blender's internal mesh editing API providing geometry connectivity data and editing operations.
---

# bmesh

Provides access to Blender's internal mesh editing API with geometry connectivity data and mesh editing operations such as split, separate, collapse, and dissolve.

## Signature / Usage

```python
import bmesh

# Standalone mesh editing
bm = bmesh.new()
bm.from_mesh(mesh)
# modify geometry ...
bm.to_mesh(mesh)
bm.free()

# Edit mode mesh
bm = bmesh.from_edit_mesh(mesh)
# modify geometry ...
bmesh.update_edit_mesh(mesh, loop_triangles=True, destructive=True)
```

## Core Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `bmesh.new` | `new(use_operators=True)` | Create an empty BMesh |
| `bmesh.from_edit_mesh` | `from_edit_mesh(mesh)` | Get BMesh from edit-mode mesh |
| `bmesh.update_edit_mesh` | `update_edit_mesh(mesh, loop_triangles, destructive)` | Write edit-mode changes back |

## BMesh Element Types

### BMVert

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `co` | `Vector` | 3D coordinates |
| `normal` | `Vector` | Vertex normal |
| `select` | `bool` | Selection state |
| `hide` | `bool` | Visibility |
| `index` | `int` | Index in `bm.verts` |
| `link_edges` | sequence | Connected edges (read-only) |
| `link_faces` | sequence | Adjacent faces (read-only) |
| `link_loops` | sequence | Associated loops (read-only) |
| `calc_edge_angle()` | `float` | Angle between two connected edges |
| `calc_shell_factor()` | `float` | Scaling factor along normal |
| `select_set(select)` | — | Set selection with flushing |

### BMEdge

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `verts` | sequence (len=2) | Two endpoint vertices |
| `seam` | `bool` | UV seam flag |
| `smooth` | `bool` | Smooth shading flag |
| `select` | `bool` | Selection state |
| `link_faces` | sequence | Adjacent faces |
| `link_loops` | sequence | Associated loops |
| `calc_length()` | `float` | Edge length |
| `calc_face_angle()` | `float` | Angle between adjacent faces |
| `other_vert(vert)` | `BMVert` | Other endpoint given one vert |

### BMFace

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `verts` | sequence | Vertices of the face |
| `edges` | sequence | Edges of the face |
| `loops` | sequence | Loops (face corners) |
| `normal` | `Vector` | Face normal |
| `material_index` | `int` | Material slot index |
| `select` | `bool` | Selection state |
| `smooth` | `bool` | Smooth shading flag |
| `calc_area()` | `float` | Face area |
| `calc_center_median()` | `Vector` | Center point |
| `calc_perimeter()` | `float` | Perimeter length |
| `normal_flip()` | — | Flip normal direction |

### BMLoop

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `vert` | `BMVert` | Corner vertex |
| `edge` | `BMEdge` | Corner edge |
| `face` | `BMFace` | Owning face |
| `link_loop_next` | `BMLoop` | Next loop in face |
| `link_loop_prev` | `BMLoop` | Previous loop in face |
| `link_loop_radial_next` | `BMLoop` | Next loop around shared edge |
| `calc_angle()` | `float` | Corner angle |
| `calc_normal()` | `Vector` | Loop normal |
| `calc_tangent()` | `Vector` | Loop tangent |

## BMesh.ops Operations

All ops are called as `bmesh.ops.<op_name>(bm, **kwargs)` and return a dict of output geometry.

```python
# Extrude faces
ret = bmesh.ops.extrude_face_region(bm, geom=bm.faces[:], use_keep_orig=False)
extruded = ret["geom"]

# Subdivide edges
bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=2, use_grid_fill=True)

# Bevel edges
bmesh.ops.bevel(bm, geom=bm.edges[:], offset=0.1, segments=2, affect='EDGES')

# Bisect
bmesh.ops.bisect_plane(
    bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:],
    plane_co=(0, 0, 0), plane_no=(0, 0, 1),
    clear_inner=True
)

# Triangulate
bmesh.ops.triangulate(bm, faces=bm.faces[:])

# Dissolve
bmesh.ops.dissolve_edges(bm, edges=bm.edges[:], use_verts=True)

# Inset
bmesh.ops.inset_region(bm, faces=bm.faces[:], thickness=0.05, depth=0.01)

# Mirror
bmesh.ops.mirror(bm, geom=bm.verts[:] + bm.edges[:] + bm.faces[:], axis='X')

# Spin
bmesh.ops.spin(
    bm, geom=bm.faces[:],
    cent=(0, 0, 0), axis=(0, 0, 1),
    angle=3.14159, steps=8
)
```

## Custom Data Layers (UV / Vertex Color / Normals)

```python
bm = bmesh.new()
bm.from_mesh(mesh)

# Access or create UV layer
uv_layer = bm.loops.layers.uv.verify()

# Read/write UV per loop
for face in bm.faces:
    for loop in face.loops:
        uv = loop[uv_layer].uv
        loop[uv_layer].uv = (uv.x * 2, uv.y)

bm.to_mesh(mesh)
bm.free()
```

`BMLayerCollection` methods: `get(name)`, `new(name)`, `remove(layer)`, `verify()`, `keys()`, `values()`, `items()`.

Available layer types per element:
- `bm.verts.layers`: `float`, `int`, `string`, `float_vector`, `float_color`, `shape`
- `bm.edges.layers`: `float`, `int`, `string`, `float_vector`, `bevel_weight`, `crease`
- `bm.faces.layers`: `float`, `int`, `string`, `float_vector`, `float_color`
- `bm.loops.layers`: `uv`, `float_color`, `float_vector`, `float`, `int`, `string`

## Selection

```python
bm.verts.ensure_lookup_table()
# Select a specific vertex
bm.verts[0].select_set(True)
# Select all faces
for f in bm.faces:
    f.select_set(True)
# Flush selection from faces to edges/verts
bm.select_flush(True)
# Or flush from verts/edges to faces
bm.select_flush_mode()
```

## Notes

- Always call `bm.free()` after standalone usage to release memory
- After adding/removing geometry, call `bm.verts.ensure_lookup_table()` / `bm.edges.ensure_lookup_table()` / `bm.faces.ensure_lookup_table()` before index access
- When a face is selected, its edges and vertices must also be selected (flushing enforces this)
- `bmesh.ops.*` functions operate on the BMesh directly; they do not return modified elements in place — use the returned dict keys (e.g., `"geom"`, `"verts"`)
- In edit mode, use `bmesh.from_edit_mesh()` + `bmesh.update_edit_mesh()` instead of `from_mesh()` / `to_mesh()`

## Related

- [mathutils.md](./mathutils.md)
