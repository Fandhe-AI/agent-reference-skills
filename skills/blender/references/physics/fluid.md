---
name: Fluid Simulation (Mantaflow)
description: Mantaflow-based fluid simulation — Domain/Flow/Effector roles, Liquid and Gas (smoke/fire) types, resolution, cache, and baking.
---

# Fluid Simulation (Mantaflow)

Blender's fluid system (since 2.82) is powered by **Mantaflow**. Three modifier roles define the simulation: **Domain** (volume where simulation occurs), **Flow** (fluid emitter/inflow/outflow), and **Effector** (collision or guide object).

## Overview

- All objects use a single **Fluid modifier** (`type='FLUID'`); the role is set via `mod.fluid_type`
- Domain supports `'LIQUID'` (FLIP solver) and `'GAS'` (smoke/fire)
- Baking is modular: particles, mesh, and noise can be baked independently

## Key Settings

### Domain — `mod.domain_settings` (`FluidDomainSettings`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `domain_type` | enum | `'LIQUID'` | `'LIQUID'` or `'GAS'` |
| `resolution_max` | int | 32 | Maximum grid resolution (6–10000) |
| `cache_type` | enum | `'MODULAR'` | `'REPLAY'`, `'MODULAR'`, `'ALL'` |
| `cache_directory` | str | `"//"` | Path to cache files |
| `cache_frame_start` | int | 1 | First frame of bake range |
| `cache_frame_end` | int | 250 | Last frame of bake range |
| `cache_data_format` | enum | `'UNI'` | `'UNI'`, `'OPENVDB'`, `'RAW'` |
| `cache_resumable` | bool | False | Save intermediate states for resumable bake |
| `time_scale` | float | 1.0 | Simulation speed multiplier |
| `simulation_method` | enum | `'FLIP'` | `'FLIP'` (splashy) / `'APIC'` (stable) |
| `gravity` | Vector | (0,0,−9.81) | Gravity direction and magnitude |

#### Gas-specific (`domain_type = 'GAS'`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `alpha` | float | −0.001 | Smoke buoyancy based on density (−5 to 5) |
| `beta` | float | 0.1 | Smoke buoyancy based on heat (−5 to 5) |
| `vorticity` | float | 0.0 | Rotational turbulence intensity |
| `dissolve_speed` | int | 25 | Frames for smoke to fully dissolve (1–10000) |
| `use_dissolve_smoke` | bool | False | Enable smoke dissolving over time |

#### Liquid-specific (`domain_type = 'LIQUID'`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `flip_ratio` | float | 0.97 | PIC/FLIP blending (0 = smooth PIC, 1 = splashy FLIP) |
| `particle_scale` | float | 1.0 | Particle radius scale |
| `use_mesh` | bool | False | Generate a mesh from the liquid particles |
| `mesh_concave_upper` | float | 3.5 | Upper concavity for mesh generation |

### Flow — `mod.flow_settings` (`FluidFlowSettings`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `flow_type` | enum | `'LIQUID'` | `'SMOKE'`, `'FIRE'`, `'BOTH'`, `'LIQUID'` |
| `flow_behavior` | enum | `'INFLOW'` | `'INFLOW'`, `'OUTFLOW'`, `'GEOMETRY'` |
| `use_inflow` | bool | True | Enable/disable this flow source |
| `density` | float | 1.0 | Emission density/strength (0–10) |
| `smoke_color` | Color | (0.7, 0.7, 0.7) | Color of emitted smoke |
| `surface_distance` | float | 1.5 | Emission height above mesh surface |
| `velocity_factor` | float | 1.0 | Multiplier on source object velocity (−100–100) |
| `velocity_normal` | float | 0.0 | Normal directional velocity component |
| `subframes` | int | 0 | Extra samples between frames for fast flows (0–200) |
| `particle_size` | float | 1.0 | Particle size in simulation cells (for particle flows) |

### Effector — `mod.effector_settings` (`FluidEffectorSettings`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `effector_type` | enum | `'COLLISION'` | `'COLLISION'` (deflect fluid) / `'GUIDE'` (direct flow) |
| `use_effector` | bool | True | Enable this effector |
| `surface_distance` | float | 0.0 | Extra surface margin (0–10) |
| `velocity_factor` | float | 1.0 | Obstacle velocity multiplier (−100–100) |
| `guide_mode` | enum | `'MAXIMUM'` | Guide velocity blending: `'OVERRIDE'`, `'MAXIMUM'`, `'MINIMUM'`, `'AVERAGED'` |
| `subframes` | int | 0 | Extra samples for fast-moving effectors |

## Python API Mapping

```python
import bpy

# --- Domain ---
domain_obj = bpy.data.objects["FluidDomain"]
mod = domain_obj.modifiers.new(name="Fluid", type='FLUID')
mod.fluid_type = 'DOMAIN'
ds = mod.domain_settings
ds.domain_type = 'LIQUID'
ds.resolution_max = 64
ds.cache_directory = "//cache/fluid"
ds.cache_type = 'ALL'

# --- Flow (inflow) ---
flow_obj = bpy.data.objects["FluidFlow"]
mod_f = flow_obj.modifiers.new(name="Fluid", type='FLUID')
mod_f.fluid_type = 'FLOW'
fs = mod_f.flow_settings
fs.flow_type = 'LIQUID'
fs.flow_behavior = 'INFLOW'

# --- Effector (collision) ---
eff_obj = bpy.data.objects["Collider"]
mod_e = eff_obj.modifiers.new(name="Fluid", type='FLUID')
mod_e.fluid_type = 'EFFECTOR'
mod_e.effector_settings.effector_type = 'COLLISION'

# Bake (requires context with domain object active)
bpy.ops.fluid.bake_all()
```

## Notes

- All objects that participate in the simulation must be inside the Domain object's bounding box
- `cache_type = 'MODULAR'` allows baking particles, mesh, and noise separately; `'ALL'` bakes everything at once
- Gas simulations (smoke/fire) require `domain_type = 'GAS'`; liquid and gas cannot coexist in one domain
- `use_mesh = True` (liquid) generates a surface mesh from particles using a marching-cubes-like algorithm — bake mesh separately after baking particles
- OpenVDB (`cache_data_format = 'OPENVDB'`) gives smaller cache files with lossless compression

## Related

- [collision-forces.md](./collision-forces.md)
- [rigid-body.md](./rigid-body.md)
