---
name: Cloth Simulation
description: Cloth modifier for fabric simulation — stiffness, damping, pin groups, object/self collision, and point cache baking.
---

# Cloth Simulation

Cloth simulation is applied via the **Cloth modifier** (`type='CLOTH'`). Settings are split across `ClothSettings` (structural behaviour), `ClothCollisionSettings` (collision), and `PointCache` (caching/baking).

## Overview

- Add the modifier with `obj.modifiers.new(name="Cloth", type='CLOTH')`
- `ClothSettings` is accessed via `mod.settings`
- `ClothCollisionSettings` is accessed via `mod.collision_settings`
- Baking writes to `mod.point_cache`

## Key Settings

### ClothSettings (`mod.settings`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `quality` | int | 5 | Simulation steps per frame (higher = more accurate) |
| `mass` | float | 0.3 | Mass of each vertex (kg, 0–inf) |
| `tension_stiffness` | float | 15.0 | Resistance to stretching (0–10000) |
| `compression_stiffness` | float | 15.0 | Resistance to compression (0–10000) |
| `shear_stiffness` | float | 5.0 | Resistance to shearing (0–10000) |
| `bending_stiffness` | float | 0.5 | Resistance to bending (0–10000) |
| `tension_damping` | float | 5.0 | Stretching damping (0–50) |
| `compression_damping` | float | 5.0 | Compression damping (0–50) |
| `shear_damping` | float | 5.0 | Shear damping (0–50) |
| `bending_damping` | float | 0.5 | Bending damping (0–1000) |
| `air_damping` | float | 1.0 | Air resistance |
| `pin_stiffness` | float | 1.0 | Pin spring stiffness (0–50) |
| `vertex_group_mass` | str | `""` | Vertex group for pinning vertices (Pin Group in the UI; named "mass" for historical reasons) |
| `vertex_group_structural_stiffness` | str | `""` | Vertex group for structural stiffness |
| `vertex_group_bending` | str | `""` | Vertex group for bending stiffness |

### ClothCollisionSettings (`mod.collision_settings`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `use_collision` | bool | False | Enable collision with other objects |
| `distance_min` | float | 0.015 | Minimum distance before collision response |
| `friction` | float | 5.0 | Friction on collision |
| `use_self_collision` | bool | False | Enable self-collision |
| `self_distance_min` | float | 0.015 | Minimum distance for self-collision |
| `self_collision_quality` | int | 2 | Self-collision iterations per step |
| `collision_quality` | int | 2 | Collision iterations per step |
| `damping` | float | 1.0 | Velocity lost on collision |

## Python API Mapping

```python
import bpy

obj = bpy.context.active_object

# Add Cloth modifier
mod = obj.modifiers.new(name="Cloth", type='CLOTH')
settings = mod.settings
coll = mod.collision_settings

# Physical properties
settings.quality = 10
settings.mass = 0.5
settings.tension_stiffness = 20.0
settings.bending_stiffness = 1.0

# Pin group (vertices that stay fixed)
settings.vertex_group_mass = "Pin"    # must exist as a vertex group

# Enable object collision
coll.use_collision = True
coll.distance_min = 0.01
coll.friction = 10.0

# Enable self-collision
coll.use_self_collision = True
coll.self_distance_min = 0.01

# Bake (Blender 3.2+ context override)
with bpy.context.temp_override(
    scene=bpy.context.scene,
    active_object=obj,
    object=obj,
    point_cache=mod.point_cache,
):
    bpy.ops.ptcache.bake(bake=True)
```

## Notes

- Cloth collision with other objects requires those objects to have a **Collision modifier** (see [collision-forces.md](./collision-forces.md))
- Higher `quality` values improve simulation accuracy but increase computation time
- `vertex_group_mass` is the pin group (despite its name): vertices with weight 1.0 are fully pinned; weight 0.0 simulates freely. The property name is a historical artifact — the UI labels it "Pin Group" under Cloth > Shape
- Baked cache is invalidated by any modifier-order change or settings edit; free the bake before re-simulating

## Related

- [collision-forces.md](./collision-forces.md)
- [soft-body.md](./soft-body.md)
