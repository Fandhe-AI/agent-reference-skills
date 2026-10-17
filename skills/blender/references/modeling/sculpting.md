---
name: Sculpting
description: Blender Sculpt Mode — brushes, Dyntopo, Remesh, Masks, Face Sets, and Python API access.
---

# Sculpting

Sculpt Mode allows freeform mesh editing using brushes that push, pull, smooth, or otherwise deform geometry. It is accessed by switching the interaction mode to **Sculpt Mode** from the viewport header.

## Overview

Sculpt Mode operates on the active mesh object. Brushes apply strokes using a radius and strength falloff. For dynamic topology changes, **Dyntopo** adds and removes geometry on the fly; alternatively, **Voxel Remesh** regenerates a uniform topology before sculpting.

## Core Brushes

| Brush | Description |
|-------|-------------|
| Draw | Pushes geometry along the surface normal; primary sculpting brush |
| Draw Sharp | Same as Draw but with a sharper falloff; good for creases |
| Clay | Builds up material like clay; useful for blocking out volume |
| Clay Strips | Adds blocky rectangular strokes; great for rough volume blocking |
| Smooth | Averages surrounding vertex positions; removes noise and softens detail |
| Grab | Pulls geometry from a grab point with proportional influence |
| Elastic Deform | Like Grab but the mesh behaves elastically; preserves volume |
| Snake Hook | Pulls geometry outward in a hook-like stroke |
| Inflate | Pushes vertices outward along their normals; expands volume |
| Pinch | Pulls vertices toward the brush center; tightens edges |
| Crease | Pushes vertices apart at the center while pulling the edges in |
| Flatten / Plane | Pushes vertices toward a reference plane |
| Scrape | Scrapes vertices above a plane down to a flat surface |

## Mask

Masks prevent sculpt brushes from affecting masked areas. Masks are stored as a vertex attribute (0 = unmasked, 1 = fully masked).

| Operation | Shortcut | Description |
|-----------|----------|-------------|
| Paint Mask | `M` | Draw mask with brush |
| Erase Mask | `Alt+M` | Remove mask with brush |
| Invert Mask | `Ctrl+I` | Flip mask values |
| Clear Mask | `Alt+M` (menu) | Set all vertices to 0 |
| Box Mask | `B` | Mask a rectangular region |
| Lasso Mask | `Ctrl+` drag | Mask a freehand region |

## Face Sets

Face Sets group polygon regions for isolation, masking, and sculpting workflows. Each face set has a unique integer ID visualized by color.

| Operation | Shortcut | Description |
|-----------|----------|-------------|
| Draw Face Set | Available in brush list | Paints a new face set with LMB |
| Hide Face Set | `H` | Hides the face set under the cursor |
| Show All | `Alt+H` | Unhides all face sets |
| Grow/Shrink Set | Via menu | Expands or contracts face set borders |

## Dyntopo

Dynamic Topology (Dyntopo) adds and removes mesh triangles during sculpting strokes to maintain a target detail level.

- Enable via Sculpt Mode header → **Dyntopo** checkbox
- **Detail Size** — controls the target edge length (Relative Detail mode)
- **Detail Type**: Relative, Constant Detail, Brush Detail
- Dyntopo converts the mesh to triangles; not suitable for production topology

## Voxel Remesh

Generates a new all-quad (via Duals) or voxel-based mesh topology. Use before detail sculpting to get uniform geometry.

- **Voxel Size** — controls grid resolution; smaller = more polygons
- Accessed via right-click header → **Remesh**, or Properties → Data → Remesh
- Preserves volume but discards UV maps and vertex groups

## Python API Mapping

### Accessing Sculpt Settings

```python
import bpy

# Access the sculpt settings
sculpt = bpy.context.scene.tool_settings.sculpt

# Set symmetry
sculpt.use_symmetry_x = True
sculpt.use_symmetry_y = False

# Dyntopo detail settings (use_symmetry_x/y/z are inherited from Paint)
sculpt.detail_type_method = 'CONSTANT'   # 'RELATIVE' (default) | 'CONSTANT' | 'BRUSH' | 'MANUAL'
sculpt.detail_size = 12.0                # pixels, Relative mode (default 12.0)
sculpt.constant_detail_resolution = 9.0  # for Constant Detail mode (default 3.0)
```

### Automasking settings (5.2+)

```python
# Brush and Paint (e.g. tool_settings.sculpt) expose a MeshAutomaskingSettings struct
am = bpy.context.scene.tool_settings.sculpt.mesh_automasking_settings
am.use_automasking_topology = True      # was sculpt.use_automasking_topology
am.use_automasking_cavity = True
am.cavity_factor = 0.5                  # was automasking_cavity_factor
```

### Entering Sculpt Mode and Setting the Active Brush

```python
import bpy

obj = bpy.context.active_object
bpy.context.view_layer.objects.active = obj

# Switch to Sculpt Mode
bpy.ops.object.mode_set(mode='SCULPT')

# Set active brush by name
bpy.ops.wm.tool_set_by_id(name="builtin_brush.Draw")
```

### Applying Voxel Remesh

```python
import bpy

obj = bpy.context.active_object
# Set voxel size on the mesh data
obj.data.remesh_voxel_size = 0.05
obj.data.remesh_voxel_adaptivity = 0.0

# Apply the remesh
bpy.ops.object.voxel_remesh()
```

### Mask Operations via Python

```python
import bpy

# Invert mask on active sculpt object
bpy.ops.sculpt.mask_filter(filter_type='INVERT', auto_smooth_iterations=0)

# Smooth mask weights
bpy.ops.sculpt.mask_filter(filter_type='SMOOTH')

# Fill (set all to 1) or clear (set all to 0)
bpy.ops.paint.mask_flood_fill(mode='VALUE', value=1.0)  # fill
bpy.ops.paint.mask_flood_fill(mode='VALUE', value=0.0)  # clear

# Hide a face set by ID
bpy.ops.sculpt.face_set_change_visibility(mode='TOGGLE')
```

### Reading Mask Data from Mesh

```python
import bpy

obj = bpy.context.active_object
mesh = obj.data

# Vertex paint / mask attribute layer
if ".sculpt_mask" in mesh.attributes:
    mask_attr = mesh.attributes[".sculpt_mask"]
    for val in mask_attr.data:
        print(val.value)
```

## Notes

- Changed (5.2): Brush/Sculpt `use_automasking_*` and `automasking_*` properties moved to the `MeshAutomaskingSettings` struct, reached as `brush.mesh_automasking_settings` / `paint.mesh_automasking_settings` (e.g. `automasking_cavity_factor` -> `mesh_automasking_settings.cavity_factor`; `automasking_view_normal_limit` -> `.view_normal_limit`)
- Removed (5.2): `paint.eraser_brush` / `eraser_brush_asset_reference`
- Renamed (5.0): `brush.sculpt_tool` -> `brush.sculpt_brush_type` (all `*_tool` brush type enums became `*_brush_type`)
- Moved (5.0): `tool_settings.unified_paint_settings` -> `tool_settings.sculpt.unified_paint_settings`
- Moved (5.0): radial symmetry `tool_settings.sculpt.radial_symmetry` -> `mesh.radial_symmetry`
- Renamed (5.0): `brush.curve` / `curve_preset` -> `curve_distance_falloff` / `curve_distance_falloff_preset`
- Changed (5.1): `use_airbrush` / `use_anchor` / `use_space` / `use_line` / `use_curve` / `use_restore_mesh` folded into `brush.stroke_method` (`AIRBRUSH` / `ANCHORED` / `SPACE` / `LINE` / `CURVE` / `DRAG_DOT`)
- Removed (5.1): operator `sculpt.sample_color`, merged into `paint.sample_color`
- Sculpt Mode operates on triangle topology internally; Dyntopo always triangulates the mesh
- Face Sets are stored as an integer face attribute named `.sculpt_face_set`; values correspond to the face set ID
- The Mask attribute is stored as a float vertex attribute named `.sculpt_mask` (0.0 = unmasked, 1.0 = masked)
- `bpy.ops.sculpt.*` operators generally require the active mode to be `'SCULPT'`
- Smooth brush shortcut: hold `Shift` while using any brush to temporarily switch to smooth
- Multires modifier preserves subdivided sculpt detail at multiple levels; Dyntopo and Multires are mutually exclusive

## Related

- [Mesh Basics](./mesh-basics.md)
- [Modifiers](./modifiers.md)
