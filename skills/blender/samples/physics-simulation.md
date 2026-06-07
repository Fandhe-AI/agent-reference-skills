---
name: Physics Simulation
description: Set up Rigid Body, Cloth, and Particle System simulations from Python, and bake the cache.
---

# Physics Simulation

## Overview

Blender's physics pipeline (Rigid Body, Cloth, Particles) is configured through object properties and modifier settings. Operators under `bpy.ops.rigidbody.*` add objects to the Rigid Body World, while Cloth and Particle systems are added as modifiers. Cache baking is handled by `bpy.ops.ptcache.*`.

## Complete Example

```python
import bpy

# ── 0. Clean slate ────────────────────────────────────────────────────────────
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end   = 120

# ═══════════════════════════════════════════════════════════════════════════════
# PART A — Rigid Body: falling cube + static floor
# ═══════════════════════════════════════════════════════════════════════════════

# Floor (passive rigid body)
bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 0, 0))
floor = bpy.context.active_object
floor.name = "Floor"
bpy.ops.rigidbody.object_add()
floor.rigid_body.type             = 'PASSIVE'
floor.rigid_body.collision_shape  = 'BOX'
floor.rigid_body.friction         = 0.8

# Falling cube (active rigid body)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 5))
cube = bpy.context.active_object
cube.name = "FallingCube"
bpy.ops.rigidbody.object_add()
cube.rigid_body.type             = 'ACTIVE'
cube.rigid_body.mass             = 2.0
cube.rigid_body.collision_shape  = 'BOX'
cube.rigid_body.restitution      = 0.4   # bounciness
cube.rigid_body.linear_damping   = 0.04
cube.rigid_body.angular_damping  = 0.1

# Enable Rigid Body World on the scene
if scene.rigidbody_world is None:
    bpy.ops.rigidbody.world_add()
scene.rigidbody_world.time_scale      = 1.0
scene.rigidbody_world.steps_per_second = 60
scene.rigidbody_world.solver_iterations = 10

# ═══════════════════════════════════════════════════════════════════════════════
# PART B — Cloth: subdivided plane as cloth
# ═══════════════════════════════════════════════════════════════════════════════

bpy.ops.mesh.primitive_plane_add(size=4, location=(5, 0, 3))
cloth_obj = bpy.context.active_object
cloth_obj.name = "ClothPlane"

# Subdivide for cloth resolution
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.subdivide(number_cuts=15)
bpy.ops.object.mode_set(mode='OBJECT')

# Add Cloth modifier
cloth_mod = cloth_obj.modifiers.new("Cloth", 'CLOTH')
settings   = cloth_mod.settings

settings.quality              = 10       # steps per frame
settings.mass                 = 0.3      # kg per vertex
settings.tension_stiffness    = 15.0
settings.compression_stiffness = 15.0
settings.bending_stiffness    = 0.5
settings.air_damping          = 1.0

# Collision with floor
cloth_mod.collision_settings.use_collision      = True
cloth_mod.collision_settings.distance_min       = 0.015

# Pin the top-left vertex group
vg_pin = cloth_obj.vertex_groups.new(name="Pin")
mesh   = cloth_obj.data
for v in mesh.vertices:
    if v.co.y > 1.9:      # top edge
        vg_pin.add([v.index], 1.0, 'REPLACE')

settings.vertex_group_mass = "Pin"
settings.pin_stiffness     = 1.0

# ═══════════════════════════════════════════════════════════════════════════════
# PART C — Particle System: emitter on a plane
# ═══════════════════════════════════════════════════════════════════════════════

bpy.ops.mesh.primitive_plane_add(size=4, location=(-5, 0, 0))
emitter = bpy.context.active_object
emitter.name = "ParticleEmitter"

# Add particle system via modifier
bpy.ops.object.particle_system_add()
psys     = emitter.particle_systems[0]
psettings = psys.settings

psettings.count       = 500
psettings.frame_start = 1
psettings.frame_end   = 60
psettings.lifetime    = 50
psettings.emit_from   = 'FACE'         # 'VERT', 'FACE', or 'VOLUME'
psettings.physics_type = 'NEWTON'

# Gravity and velocity
psettings.effector_weights.gravity = 1.0
psettings.normal_factor            = 2.0   # initial emit velocity
psettings.factor_random            = 0.5   # random velocity spread

# ═══════════════════════════════════════════════════════════════════════════════
# PART D — Bake all physics caches
# ═══════════════════════════════════════════════════════════════════════════════

# Select scene range first
scene.frame_set(1)
bpy.ops.ptcache.bake_all(bake=True)

print("Physics setup complete. Cache baked for frames", scene.frame_start, "–", scene.frame_end)
```

## Key Points

- `bpy.ops.rigidbody.object_add()` requires the target object to be active and selected; it also initialises the Rigid Body World automatically if one doesn't exist.
- `rigid_body.type` must be `'PASSIVE'` for static colliders; `'ACTIVE'` objects are simulated.
- Cloth `settings.vertex_group_mass` pins vertices with weight 1.0; partial weights give softer pinning.
- `bpy.ops.ptcache.bake_all(bake=True)` bakes all caches in the scene. Use `bpy.ops.ptcache.free_bake_all()` to clear them before re-baking.

## Variations

```python
# Soft Body instead of Cloth
sb_mod = obj.modifiers.new("SoftBody", 'SOFT_BODY')
sb_mod.settings.mass = 1.0
sb_mod.settings.pull = 0.9   # goal strength

# Force field (wind)
bpy.ops.object.effector_add(type='WIND', location=(0, -5, 1))
wind = bpy.context.active_object
wind.field.strength   = 3.0
wind.field.flow       = 1.0

# Free and re-bake only the cloth cache
bpy.context.view_layer.objects.active = cloth_obj
cloth_obj.select_set(True)
bpy.ops.ptcache.free_bake_all()
bpy.ops.ptcache.bake_all(bake=True)
```

## Related

- [scene-management.md](./scene-management.md) — Frame range setup
- [modifier-workflow.md](./modifier-workflow.md) — General modifier patterns
