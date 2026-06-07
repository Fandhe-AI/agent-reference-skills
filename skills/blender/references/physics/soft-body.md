---
name: Soft Body
description: Soft body modifier for deformable mesh simulation — goal (sticky vertices), edge springs, self-collision, and aerodynamics.
---

# Soft Body

Soft body simulation makes meshes deform elastically under forces. The **Soft Body modifier** (`type='SOFT_BODY'`) exposes settings via `SoftBodySettings`. Three main subsystems: **Goal** (attraction to rest pose), **Edges** (spring network), and **Self Collision**.

## Overview

- Add via `obj.modifiers.new(name="Softbody", type='SOFT_BODY')`
- Settings accessed via `mod.settings` (`SoftBodySettings`)
- Point cache via `mod.point_cache`

## Key Settings

### Goal — vertices attracted to animated position

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `use_goal` | bool | True | Enable goal forces |
| `goal_default` | float | 0.7 | Default goal weight for all vertices (0–1) |
| `goal_min` | float | 0.0 | Minimum vertex group weight scaling (0–1) |
| `goal_max` | float | 1.0 | Maximum vertex group weight scaling (0–1) |
| `goal_spring` | float | 0.5 | Goal spring stiffness (0–0.999) |
| `goal_friction` | float | 0.0 | Damping on goal forces (0–50) |
| `vertex_group_goal` | str | `""` | Vertex group driving per-vertex goal weight |

### Edges — spring network

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `use_edges` | bool | True | Use edges as springs |
| `pull` | float | 0.5 | Spring stiffness when stretched (0–0.999) |
| `push` | float | 0.5 | Spring stiffness when compressed (0–0.999) |
| `bend` | float | 0.0 | Bending spring stiffness (0–10) |
| `damping` | float | 0.5 | Spring damping (0–10) |
| `use_stiff_quads` | bool | False | Add diagonal springs to quads |
| `shear` | float | 0.0 | Shear resistance for quad diagonals (0–1) |

### Self Collision

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `use_self_collision` | bool | False | Enable vertex-to-vertex self collision |
| `ball_size` | float | 0.49 | Collision ball radius factor (–10 to 10) |
| `ball_stiff` | float | 0.5 | Ball spring stiffness (0.001–100) |
| `ball_damp` | float | 0.5 | Blending factor to inelastic collision (0–1) |

### Aerodynamics & General

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aerodynamics_type` | enum | `'SIMPLE'` | `'SIMPLE'` (drag) / `'LIFT_FORCE'` (lift + drag) |
| `aero` | float | 0.0 | Amount of aerodynamic force (0–30000) |
| `mass` | float | 1.0 | Uniform vertex mass (0–50000) |
| `speed` | float | 1.0 | Adjusts simulation speed (0.01–100) |

## Python API Mapping

```python
import bpy

obj = bpy.context.active_object

# Add Soft Body modifier
mod = obj.modifiers.new(name="Softbody", type='SOFT_BODY')
sb = mod.settings

# Goal: pin the top vertices
sb.use_goal = True
sb.vertex_group_goal = "Top"   # vertex group: weight 1 = pinned
sb.goal_spring = 0.8
sb.goal_friction = 5.0

# Edge springs
sb.use_edges = True
sb.pull = 0.8
sb.push = 0.8
sb.bend = 0.5
sb.damping = 1.0

# Self collision
sb.use_self_collision = True
sb.ball_size = 0.3
sb.ball_stiff = 1.0

# Bake
bpy.ops.ptcache.bake_all(bake=True)
```

## Notes

- `use_goal = False` with `use_edges = True` produces a fully jelly-like object; combining both gives elastic cloth-like behaviour
- Self collision is computationally expensive — keep `ball_size` small and only enable when needed
- `goal_min` / `goal_max` rescale the vertex group weights: a vertex with weight 0.5 maps to `goal_min + 0.5 * (goal_max - goal_min)`
- Aerodynamics requires `use_edges = True` to function

## Related

- [cloth.md](./cloth.md)
- [collision-forces.md](./collision-forces.md)
