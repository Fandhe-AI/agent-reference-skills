---
name: Particle System
description: Particle system modifier for Emitter (dynamic particles) and Hair (grooming/strand) types — emission, physics, children, and force field interaction.
---

# Particle System

Blender's particle system supports two modes: **Emitter** (dynamically spawned particles) and **Hair** (static or groomed strands). Each object can have multiple particle systems stacked as modifiers.

## Overview

- Add via `obj.modifiers.new(name="ParticleSystem", type='PARTICLE_SYSTEM')`
- The new modifier exposes `mod.particle_system` (`ParticleSystem`)
- Simulation settings are in `psys.settings` (`ParticleSettings`)
- Multiple systems stack on the same object

## Key Settings

### ParticleSettings (`psys.settings`)

#### Emission

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | enum | `'EMITTER'` | `'EMITTER'` or `'HAIR'` |
| `count` | int | 1000 | Total number of particles |
| `frame_start` | float | 1.0 | First frame of emission |
| `frame_end` | float | 200.0 | Last frame of emission |
| `lifetime` | float | 50.0 | Life span of particles in frames |
| `lifetime_random` | float | 0.0 | Random variation of lifetime (0–1) |
| `emit_from` | enum | `'FACE'` | Emission source: `'VERT'`, `'FACE'`, `'VOLUME'` |
| `use_even_distribution` | bool | True | Distribute evenly across faces by area |

#### Velocity

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `normal_factor` | float | 0.0 | Initial velocity along surface normal |
| `tangent_factor` | float | 0.0 | Initial velocity along surface tangent |
| `object_factor` | float | 0.0 | Factor of object velocity added to particles |
| `factor_random` | float | 0.0 | Random velocity multiplier |

#### Physics

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `physics_type` | enum | `'NEWTON'` | `'NEWTON'`, `'KEYED'`, `'BOIDS'`, `'FLUID'` |
| `mass` | float | 1.0 | Particle mass |
| `particle_size` | float | 0.05 | Particle display / collision size |
| `use_dynamic_rotation` | bool | False | Rotate particles during simulation |
| `integrator` | enum | `'MIDPOINT'` | ODE solver: `'EULER'`, `'MIDPOINT'`, `'RK4'` |
| `timestep` | float | 0.04 | Simulation time step |

#### Rendering

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `render_type` | enum | `'HALO'` | `'NONE'`, `'HALO'`, `'LINE'`, `'PATH'`, `'OBJECT'`, `'COLLECTION'` |
| `instance_object` | Object | None | Object to instance at each particle (render_type `'OBJECT'`) |
| `instance_collection` | Collection | None | Collection for instancing (render_type `'COLLECTION'`) |

#### Children

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `child_type` | enum | `'NONE'` | `'NONE'`, `'SIMPLE'`, `'INTERPOLATED'` |
| `child_percent` | int | 10 | Number of children per parent |
| `rendered_child_count` | int | 100 | Children rendered per parent |
| `child_length` | float | 1.0 | Relative child strand length (0–1) |

#### Hair-specific

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `hair_length` | float | 0.1 | Length of hair strands (m) |
| `hair_step` | int | 5 | Number of keys per hair strand |
| `use_hair_bspline` | bool | False | Smooth strands with B-spline interpolation |

## Python API Mapping

### Emitter System

```python
import bpy

obj = bpy.context.active_object

# Add particle system modifier
mod  = obj.modifiers.new(name="EmitterPS", type='PARTICLE_SYSTEM')
psys = mod.particle_system
ps   = psys.settings

# Emitter configuration
ps.type       = 'EMITTER'
ps.count      = 5000
ps.lifetime   = 80
ps.frame_start = 1
ps.frame_end  = 100
ps.emit_from  = 'FACE'

# Initial velocity
ps.normal_factor = 2.0
ps.factor_random = 0.5

# Children (optional, for emitter)
ps.child_type          = 'SIMPLE'
ps.child_percent       = 5
ps.rendered_child_count = 50
```

### Hair System

The Hair system is a separate particle system (or a new modifier slot). The snippet below adds a second modifier; do not run it in the same context as the Emitter snippet above without intending to stack two systems.

```python
import bpy

obj = bpy.context.active_object

# Add a separate particle system modifier for hair
mod  = obj.modifiers.new(name="HairPS", type='PARTICLE_SYSTEM')
psys = mod.particle_system
ps   = psys.settings

# Hair configuration
ps.type       = 'HAIR'
ps.hair_length = 0.5
ps.hair_step  = 8

# Children (interpolated works well for hair)
ps.child_type = 'INTERPOLATED'
```

## Notes

- `effector_weights` on `ParticleSettings` controls which force fields affect the system (see [collision-forces.md](./collision-forces.md))
- Hair dynamics (cloth-like simulation) is enabled via `ps.use_hair_dynamics = True`; this exposes a `ClothSettings`-like subobject
- For GPU rendering with Cycles, `render_type = 'PATH'` is required for hair strands
- Each modifier slot can use a different `ParticleSettings` data-block (reusable via `bpy.data.particles`)

## Related

- [collision-forces.md](./collision-forces.md)
- [cloth.md](./cloth.md)
