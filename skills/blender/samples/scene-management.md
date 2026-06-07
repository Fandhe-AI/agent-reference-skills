---
name: Scene Management
description: Organise objects with Collections, set up lights and cameras, configure the World background and HDRI environment.
---

# Scene Management

## Overview

A well-structured scene separates objects into named Collections, uses clearly positioned lights and a camera, and sets a World shader for environment lighting. All of this is scriptable via `bpy.data`, `bpy.ops`, and direct property access on data-blocks.

## Complete Example

```python
import bpy
import math

scene = bpy.context.scene

# ── 1. Collections ────────────────────────────────────────────────────────────
def get_or_create_collection(name, parent=None):
    col = bpy.data.collections.get(name)
    if col is None:
        col = bpy.data.collections.new(name)
        if parent is None:
            scene.collection.children.link(col)
        else:
            parent.children.link(col)
    return col

lights_col   = get_or_create_collection("Lights")
geometry_col = get_or_create_collection("Geometry")
cameras_col  = get_or_create_collection("Cameras")


# ── 2. Add geometry and organise ──────────────────────────────────────────────
bpy.ops.mesh.primitive_monkey_add(size=2.0, location=(0, 0, 0))
monkey = bpy.context.active_object
monkey.name = "Suzanne"

# Move from root collection to Geometry collection
scene.collection.objects.unlink(monkey)
geometry_col.objects.link(monkey)


# ── 3. Parent-child relationship ──────────────────────────────────────────────
bpy.ops.mesh.primitive_cube_add(size=0.3, location=(0.8, 0.8, 1.2))
eye = bpy.context.active_object
eye.name = "EyeMarker"
scene.collection.objects.unlink(eye)
geometry_col.objects.link(eye)

# Parent without keeping world transform (object space parenting)
eye.parent = monkey
eye.matrix_parent_inverse = monkey.matrix_world.inverted()


# ── 4. Lights ─────────────────────────────────────────────────────────────────
def add_light(name, light_type, location, energy, color=(1.0, 1.0, 1.0)):
    light_data = bpy.data.lights.new(name=name, type=light_type)
    light_data.energy = energy
    light_data.color  = color
    light_obj = bpy.data.objects.new(name, light_data)
    lights_col.objects.link(light_obj)
    light_obj.location = location
    return light_obj

key_light  = add_light("KeyLight",  'AREA',  ( 4,  -4,  6), energy=500)
fill_light = add_light("FillLight", 'POINT', (-4,   2,  3), energy=200, color=(0.8, 0.9, 1.0))
rim_light  = add_light("RimLight",  'SPOT',  ( 0,   6,  4), energy=300)

# Spot cone settings
rim_light.data.spot_size   = math.radians(45)
rim_light.data.spot_blend  = 0.15

# Point at origin
rim_light.rotation_euler = (math.radians(-45), 0, math.radians(180))

# Sun light (directional, no falloff)
sun = add_light("Sun", 'SUN', (0, 0, 10), energy=2)
sun.rotation_euler = (math.radians(60), 0, math.radians(30))


# ── 5. Camera ─────────────────────────────────────────────────────────────────
cam_data = bpy.data.cameras.new("MainCamera")
cam_data.lens          = 50           # focal length mm
cam_data.clip_start    = 0.1
cam_data.clip_end      = 1000.0

cam_obj = bpy.data.objects.new("MainCamera", cam_data)
cameras_col.objects.link(cam_obj)

cam_obj.location      = (7.36, -6.93, 4.96)
cam_obj.rotation_euler = (math.radians(63.6), 0.0, math.radians(46.7))

scene.camera = cam_obj   # set as active render camera


# ── 6. World background (solid color) ─────────────────────────────────────────
world = bpy.data.worlds.get("World")
if world is None:
    world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True

bg_node = world.node_tree.nodes.get("Background")
if bg_node is None:
    bg_node = world.node_tree.nodes.new("ShaderNodeBackground")
bg_node.inputs['Color'].default_value    = (0.05, 0.05, 0.05, 1.0)
bg_node.inputs['Strength'].default_value = 1.0


# ── 7. HDRI environment texture ───────────────────────────────────────────────
# Uncomment and provide an actual .hdr / .exr file to use:
#
# HDRI_PATH = "/path/to/environment.hdr"
# world.use_nodes = True
# wt_nodes = world.node_tree.nodes
# wt_links = world.node_tree.links
# wt_nodes.clear()
#
# env_tex = wt_nodes.new('ShaderNodeTexEnvironment')
# env_tex.image = bpy.data.images.load(HDRI_PATH)
# env_tex.location = (-300, 0)
#
# bg     = wt_nodes.new('ShaderNodeBackground');          bg.location     = (0, 0)
# out    = wt_nodes.new('ShaderNodeOutputWorld');          out.location    = (300, 0)
# bg.inputs['Strength'].default_value = 1.5
#
# wt_links.new(env_tex.outputs['Color'], bg.inputs['Color'])
# wt_links.new(bg.outputs['Background'], out.inputs['Surface'])

print("Scene management complete.")
print(f"Collections: {[c.name for c in scene.collection.children]}")
print(f"Active camera: {scene.camera.name}")
```

## Key Points

- An object can belong to multiple collections but must be in at least one to be visible. Unlink from the root collection when moving to a sub-collection.
- `obj.parent = parent_obj` sets the parent, but you must also set `obj.matrix_parent_inverse` if you want the child to keep its current world position.
- `bpy.data.lights.new(name, type)` creates the light data; a separate `bpy.data.objects.new()` call wraps it into a scene object — same pattern as meshes.
- Use `ShaderNodeTexEnvironment` (not `ShaderNodeTexImage`) for HDRI environment maps; the mapping is spherical by default, which is correct for HDRIs.
- `scene.camera` must be set to an Object (not a Camera data-block) for the render camera to work.

## Variations

```python
# Lock collection visibility
lights_col.hide_viewport = True   # hide from viewport but still renders
lights_col.hide_render   = False

# Exclude collection from render (e.g. reference objects)
# Access via layer_collection:
layer_col = bpy.context.view_layer.layer_collection
layer_col.children["Lights"].exclude = False   # False = included in render
```

## Related

- `headless-render.md` — Trigger rendering after the scene is configured
- `material-shading.md` — World background node patterns
