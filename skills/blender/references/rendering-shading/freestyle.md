---
name: Freestyle
description: Freestyle NPR line-based rendering — Line Set, Line Style, edge detection types, Python API
---

# Freestyle

Edge- and line-based non-photorealistic rendering (NPR). Freestyle draws lines over rendered frames by detecting edges in mesh geometry and depth. Compatible with Cycles and EEVEE.

## Overview

- Enabled per View Layer via `scene.render.use_freestyle`
- **Line Set**: selects which edges to draw (by type or group)
- **Line Style**: defines how lines are rendered (color, thickness, dashes, modifiers)
- Modes: `EDITOR` (parameter GUI) or `SCRIPT` (Python style modules)

## Signature / Usage

```python
import bpy

scene = bpy.context.scene

# Enable Freestyle on active view layer
scene.render.use_freestyle = True

view_layer = bpy.context.view_layer
freestyle = view_layer.freestyle_settings

# Set mode
freestyle.mode = 'EDITOR'   # 'EDITOR' or 'SCRIPT'
freestyle.crease_angle = 2.617994  # ~150 degrees in radians

# Access line sets
line_sets = freestyle.linesets
ls = line_sets[0]  # First line set (default: "LineSet")

# Edge type selection
ls.select_silhouette = True
ls.select_crease = True
ls.select_border = False
ls.select_contour = True
ls.select_suggestive_contour = False
ls.select_ridge_valley = False

# Line style color
ls.linestyle.color = (0.0, 0.0, 0.0)   # Black
ls.linestyle.alpha = 1.0
ls.linestyle.thickness = 2.0
```

## Key Settings

### FreestyleSettings (`view_layer.freestyle_settings`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | enum | `'EDITOR'` | `'EDITOR'` or `'SCRIPT'` |
| `crease_angle` | float | 2.617994 | Crease detection threshold (radians) |
| `use_culling` | bool | False | Cull back-facing edges |
| `use_smoothness` | bool | False | Use face smoothness for silhouette |
| `use_material_boundaries` | bool | False | Draw material boundary edges |
| `linesets` | collection | — | Collection of `FreestyleLineSet` |

### FreestyleLineSet Edge Selection

| Property | Type | Description |
|----------|------|-------------|
| `select_silhouette` | bool | Boundary between visible and hidden faces |
| `select_crease` | bool | Edges where adjacent face angle < `crease_angle` |
| `select_border` | bool | Boundary edges (one adjacent face) |
| `select_contour` | bool | Outer contour of each object |
| `select_suggestive_contour` | bool | Potential silhouette edges |
| `select_ridge_valley` | bool | Convex/concave surface boundaries |
| `select_edge_mark` | bool | Manually marked edges (`Edge Mark` in Edit Mode) |
| `select_by_visibility` | bool | Filter edges by visibility (visible, hidden, or all) |
| `exclude_*` | bool | Exclude variants for each selection type |

### FreestyleLineStyle

| Property | Type | Description |
|----------|------|-------------|
| `color` | float[3] | Base line color |
| `alpha` | float | Opacity (0–1) |
| `thickness` | float | Base thickness in pixels |
| `use_dashed_line` | bool | Enable dashed line pattern |
| `dash1`/`gap1` | int | First dash and gap lengths |
| `chaining` | enum | `'PLAIN'` or `'SKETCHY'` chaining method |
| `caps` | enum | `'BUTT'`, `'ROUND'`, `'SQUARE'` |

## Notes

- Freestyle renders as a post-process pass composited over the base render
- `select_edge_mark` edges are set in Edit Mode via `Ctrl+E` → Mark Freestyle Edge
- Crease angle: edges between faces forming an angle *smaller* than this value are selected
- In SCRIPT mode, custom Python style modules can be written for full procedural control
- Freestyle is separate from the Compositor Line Art / Grease Pencil Line Art modifier

## Related

- [Render Output](./render-output.md)
- [Cycles](./cycles.md)
- [EEVEE](./eevee.md)
