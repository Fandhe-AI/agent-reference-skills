---
name: Rigid Body
description: Physics simulation for rigid body dynamics using Bullet physics engine — Active/Passive types, collision shapes, constraints, and baking.
---

# Rigid Body

Rigid body simulation in Blender uses the Bullet physics engine. Objects are added to the **Rigid Body World** and simulated as non-deforming bodies. Active objects are driven by the simulation; Passive objects are controlled by animation.

## Overview

- Rigid Body World is created automatically on first `rigidbody.object_add()`
- Simulation is stored in a point cache and can be baked to keyframes
- Constraints connect rigid body objects (hinge, slider, generic spring, etc.)

## Key Settings

### Rigid Body World (`bpy.context.scene.rigidbody_world`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | bool | True | Enable simulation evaluation |
| `collection` | Collection | — | Objects participating in simulation |
| `substeps_per_frame` | int | 10 | Simulation steps per frame (1–32767) |
| `solver_iterations` | int | 10 | Constraint solver iterations (1–1000) |
| `time_scale` | float | 1.0 | Simulation speed multiplier (0–100) |
| `use_split_impulse` | bool | False | Reduce velocity build-up on collision |

### Rigid Body Object (`obj.rigid_body`)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | enum | `'ACTIVE'` | `'ACTIVE'` (sim-driven) / `'PASSIVE'` (anim-driven) |
| `mass` | float | 1.0 | Object mass in kg (0.001–inf) |
| `friction` | float | 0.5 | Surface resistance (0–inf) |
| `restitution` | float | 0.0 | Bounciness (0 = no bounce, 1 = elastic) |
| `linear_damping` | float | 0.04 | Linear velocity loss over time (0–1) |
| `angular_damping` | float | 0.1 | Angular velocity loss over time (0–1) |
| `collision_shape` | enum | `'CONVEX_HULL'` | Shape used for collision detection |
| `collision_margin` | float | 0.04 | Collision threshold distance (0–1) |
| `collision_collections` | bitmask | — | Which collision groups the body belongs to |
| `enabled` | bool | True | Actively participates in simulation |
| `kinematic` | bool | False | Allow animation system control |
| `use_deactivation` | bool | True | Allow sleeping when below velocity threshold |
| `deactivate_linear_velocity` | float | 0.4 | Linear threshold for sleep |
| `deactivate_angular_velocity` | float | 0.5 | Angular threshold for sleep |

### Collision Shapes

| Value | Description |
|-------|-------------|
| `'BOX'` | Axis-aligned bounding box |
| `'SPHERE'` | Bounding sphere |
| `'CAPSULE'` | Capsule shape |
| `'CYLINDER'` | Cylinder shape |
| `'CONE'` | Cone shape |
| `'CONVEX_HULL'` | Convex hull of mesh (fast, approximate) |
| `'MESH'` | Exact mesh (Passive only for concave) |
| `'COMPOUND'` | Child objects define sub-shapes |

## Python API Mapping

```python
import bpy

# Create Rigid Body World
bpy.ops.rigidbody.world_add()

# Add active rigid body to selected object
bpy.ops.rigidbody.object_add(type='ACTIVE')

obj = bpy.context.active_object
rb = obj.rigid_body

# Configure properties
rb.mass = 5.0
rb.friction = 0.8
rb.restitution = 0.3
rb.collision_shape = 'CONVEX_HULL'

# Passive collider (floor) — must be a SEPARATE object, made active first
bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 0, -2))
floor = bpy.context.active_object
bpy.ops.rigidbody.object_add(type='PASSIVE')   # applies to `floor` (now active)
floor.rigid_body.friction = 1.0

# Bake all physics to cache
bpy.ops.ptcache.bake_all(bake=True)

# Free bake
bpy.ops.ptcache.free_bake_all()

# Bake to keyframes
bpy.ops.rigidbody.bake_to_keyframes(frame_start=1, frame_end=250, step=1)
```

## Notes

- `'MESH'` collision shape is only stable for `PASSIVE` bodies; use `'CONVEX_HULL'` for `ACTIVE` bodies with complex geometry
- `kinematic` mode lets you animate a body while still generating collision contacts
- Baking writes simulation data to a `.blend`-internal cache; re-bake after changing settings
- `substeps_per_frame` and `solver_iterations` directly trade accuracy for performance

## Related

- [collision-forces.md](./collision-forces.md)
