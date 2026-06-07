---
name: Collision & Force Fields
description: Collision modifier for inter-simulation deflection, and Force Field objects (Force, Wind, Vortex, Turbulence, Magnetic, etc.) with effector weights.
---

# Collision & Force Fields

Two independent systems enable objects to affect physics simulations: the **Collision modifier** (passive deflection surface for cloth, soft body, and particles) and **Force Fields** (active forces applied to simulations via `obj.field`).

## Overview

- Collision modifier: add to any mesh that should deflect cloth/soft body/particles
- Force fields: created via `bpy.ops.object.effector_add(type=...)` or by setting `obj.field.type`
- Both systems use **Effector Weights** to control per-simulation influence

## Collision Modifier

Add with `obj.modifiers.new(name="Collision", type='COLLISION')`. Settings via `mod.settings` (`CollisionSettings`).

### CollisionSettings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `use` | bool | True | Enable this object as a collider |
| `damping` | float | 0.5 | Velocity loss on collision (0–1) |
| `damping_factor` | float | 0.5 | Particle collision damping (0–1) |
| `damping_random` | float | 0.0 | Random damping variation (0–1) |
| `friction_factor` | float | 0.0 | Particle collision friction (0–1) |
| `friction_random` | float | 0.0 | Random friction variation (0–1) |
| `cloth_friction` | float | 5.0 | Friction specifically for cloth (0–80) |
| `absorption` | float | 0.0 | Fraction of effector force absorbed (0–1) |
| `permeability` | float | 0.0 | Chance particle passes through mesh (0–1) |
| `stickiness` | float | 0.0 | Surface stickiness on collision (0–10) |
| `thickness_outer` | float | 0.02 | Outer face thickness (0.001–1) |
| `thickness_inner` | float | 0.25 | Inner face thickness for soft body (0.001–1) |
| `use_particle_kill` | bool | False | Kill particles on contact |
| `use_culling` | bool | False | Improve penetration recovery |

## Force Fields

Force fields are configured via `obj.field` (`FieldSettings`). Create a dedicated force field empty with `bpy.ops.object.effector_add(type=...)`.

### FieldSettings (`obj.field`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | enum | `'NONE'` | Force field type (see table below) |
| `strength` | float | 0.0 | Force magnitude (−inf to inf) |
| `use_max_distance` | bool | False | Enable maximum distance falloff |
| `distance_max` | float | 0.0 | Maximum working distance |
| `use_min_distance` | bool | False | Enable minimum distance |
| `distance_min` | float | 0.0 | Minimum distance (force clamped here) |
| `use_radial_max` | bool | False | Radial maximum distance |
| `radial_max` | float | 0.0 | Radial maximum |
| `falloff_type` | enum | `'SPHERE'` | Distance falloff shape: `'SPHERE'`, `'TUBE'`, `'CONE'` |
| `falloff_power` | float | 2.0 | Falloff exponent |
| `flow` | float | 0.0 | Convert force into air-flow velocity |
| `wind_factor` | float | 0.0 | Force reduction parallel to surface (0–1) |
| `noise` | float | 0.0 | Noise amount for turbulence (0–10) |
| `size` | float | 0.0 | Size of turbulence |
| `seed` | int | 1 | Random seed for noise (1–128) |
| `linear_drag` | float | 0.0 | Velocity-proportional drag |
| `quadratic_drag` | float | 0.0 | Velocity-squared drag |
| `inflow` | float | 0.0 | Inwards component for vortex |

### Force Field Types

| `type` | Description |
|--------|-------------|
| `'FORCE'` | Radial attraction/repulsion from origin |
| `'WIND'` | Constant directional force along Z-axis |
| `'VORTEX'` | Spiral force around Z-axis |
| `'TURBULENCE'` | Random noise-based force field |
| `'MAGNETIC'` | Force based on velocity direction (like magnetism) |
| `'DRAG'` | Velocity-damping field (`linear_drag`, `quadratic_drag`) |
| `'CHARGE'` | Repulsion between similarly-charged objects |
| `'LENNARDJ'` | Lennard-Jones (attraction at distance, repulsion close) |
| `'TEXTURE'` | Force driven by a texture map |
| `'GUIDE'` | Curve-based particle guidance |
| `'BOID'` | Boid rule field (for boid physics) |
| `'FLUID_FLOW'` | Derived from a fluid simulation velocity field |

### Effector Weights

Each simulation (cloth, soft body, particles, fluid) exposes an `effector_weights` object to scale per-category force-field influence:

```python
# Example: particle system effector weights
ps = obj.particle_systems[0].settings
ps.effector_weights.gravity = 0.5      # reduce gravity to 50%
ps.effector_weights.wind = 1.0         # full wind effect
ps.effector_weights.vortex = 0.0       # ignore vortex fields
```

## Python API Mapping

```python
import bpy

# Add Collision modifier to a mesh
coll_obj = bpy.data.objects["Ground"]
mod = coll_obj.modifiers.new(name="Collision", type='COLLISION')
mod.settings.cloth_friction = 20.0
mod.settings.damping = 0.8

# Create a Wind force field
bpy.ops.object.effector_add(type='WIND', location=(0, 0, 2))
wind = bpy.context.active_object
wind.field.strength = 5.0
wind.field.noise = 1.5        # add turbulence to wind

# Create a Vortex
bpy.ops.object.effector_add(type='VORTEX', location=(0, 0, 0))
vortex = bpy.context.active_object
vortex.field.strength = 3.0
vortex.field.inflow = 0.5

# Create a Force field with falloff
bpy.ops.object.effector_add(type='FORCE', location=(0, 0, 0))
ff = bpy.context.active_object
ff.field.strength = -10.0     # negative = attraction
ff.field.use_max_distance = True
ff.field.distance_max = 5.0
ff.field.falloff_power = 2.0
```

## Notes

- Collision modifier must be **before** any deforming modifier in the stack to detect the correct shape
- Force fields apply to all simulations in the scene by default; use **Effector Weights** or **Collection** constraints to restrict influence
- `'WIND'` blows along the object's local −Z axis; rotate the empty to change wind direction
- `'TURBULENCE'` uses the `noise`, `size`, and `seed` properties; `'WIND'` uses `wind_factor` for surface-parallel reduction
- For cloth, force fields only work when the cloth has **no bake** (or during interactive simulation playback)

## Related

- [cloth.md](./cloth.md)
- [soft-body.md](./soft-body.md)
- [particles.md](./particles.md)
- [rigid-body.md](./rigid-body.md)
