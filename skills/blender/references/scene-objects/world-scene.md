---
name: World & Scene Settings
description: World datablock (background, HDRI, Sky Texture), Scene frame/unit/fps settings, View Layers, and cross-scene object sharing.
---

# World & Scene Settings

The `Scene` datablock (`bpy.types.Scene`) is the top-level container for the render pipeline. It references a `World`, a root `Collection`, one or more `ViewLayer` objects, and render settings.

## Overview

```
bpy.data.scenes["Scene"]
├── .world      → bpy.data.worlds["World"]  (background environment)
├── .collection → scene.collection           (root collection)
├── .view_layers → [ViewLayer, …]
├── .render     → RenderSettings
└── .unit_settings → UnitSettings
```

---

## Key Concepts / Settings

### World Datablock (`bpy.types.World`)

Controls the background environment visible in renders and the viewport.

| Property | Type | Description |
|----------|------|-------------|
| `color` | `Color` (3) | Solid background color (used when `use_nodes=False`) |
| `use_nodes` | `bool` | Enable node-based environment (Cycles/Eevee shading) |
| `node_tree` | `NodeTree` | Shader node graph for background; `None` if not enabled |
| `light_settings` | `WorldLighting` | Ambient occlusion and irradiance settings (read-only sub-object) |
| `mist_settings` | `WorldMistSettings` | Atmospheric mist/fog (read-only sub-object) |

For HDRI environments, connect an **Environment Texture** node to the **Background** node in the World's node tree:

```python
import bpy

world = bpy.data.worlds.get("World") or bpy.data.worlds.new("World")
bpy.context.scene.world = world
world.use_nodes = True

nt = world.node_tree
nt.nodes.clear()

bg   = nt.nodes.new("ShaderNodeBackground")
env  = nt.nodes.new("ShaderNodeTexEnvironment")
out  = nt.nodes.new("ShaderNodeOutputWorld")

env.image = bpy.data.images.load("/path/to/hdri.hdr")
nt.links.new(env.outputs["Color"], bg.inputs["Color"])
nt.links.new(bg.outputs["Background"], out.inputs["Surface"])
```

For a procedural Sky Texture, replace the Environment Texture node with a **ShaderNodeTexSky** node.

---

### Scene Frame & FPS Settings

| Property (on `scene`) | Type | Description |
|-----------------------|------|-------------|
| `frame_start` | `int` | First frame of playback range |
| `frame_end` | `int` | Last frame of playback range |
| `frame_current` | `int` | Current frame (use `scene.frame_set(n)` to advance with deps update) |
| `frame_step` | `int` | Frame step for playback |
| `render.fps` | `int` | Frames per second numerator (default `24`) |
| `render.fps_base` | `float` | FPS divisor; effective fps = `fps / fps_base` |

```python
scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end   = 250
scene.render.fps  = 30
scene.render.fps_base = 1.0   # exact 30 fps

# Jump to frame and update dependencies
scene.frame_set(50)
```

---

### Unit Settings (`scene.unit_settings`)

| Property | Type | Description |
|----------|------|-------------|
| `system` | `str` | `'NONE'`, `'METRIC'`, `'IMPERIAL'` |
| `length_unit` | `str` | `'ADAPTIVE'`, `'KILOMETERS'`, `'METERS'`, `'CENTIMETERS'`, `'MILLIMETERS'`, `'MILES'`, `'FEET'`, `'INCHES'` |
| `scale_length` | `float` | Multiplier between Blender units and the chosen unit (default `1.0`) |
| `use_separate` | `bool` | Display measurements as compound units (e.g., 1 m 50 cm) |

```python
scene.unit_settings.system = 'METRIC'
scene.unit_settings.length_unit = 'MILLIMETERS'
scene.unit_settings.scale_length = 0.001  # 1 Blender unit = 1 mm
```

---

### View Layers

View Layers control which collections are rendered and allow per-layer compositing passes.

| Property / Method | Description |
|-------------------|-------------|
| `scene.view_layers` | Collection of all view layers |
| `scene.view_layers.new(name)` | Add a new view layer |
| `scene.view_layers.remove(vl)` | Remove a view layer |
| `view_layer.layer_collection` | Root `LayerCollection` mirroring `scene.collection` |
| `view_layer.use` | Enable/disable view layer in rendering |
| `view_layer.use_pass_*` | Enable individual render passes (Z, diffuse, shadow…) |

```python
scene = bpy.context.scene

# Add a new view layer
vl = scene.view_layers.new(name="Shadows")
vl.use_pass_shadow = True

# Access the layer collection tree to exclude a collection
root_lc = vl.layer_collection
# (use find_layer_collection helper — see collections.md)
```

---

### Cross-Scene Object Sharing

Objects cannot be directly shared between scenes, but collections can be linked:

```python
src_scene = bpy.data.scenes["SceneA"]
dst_scene = bpy.data.scenes["SceneB"]

col = bpy.data.collections["SharedProps"]

# Link the same collection into the destination scene
# (objects are shared by reference — same datablock, different scene)
dst_scene.collection.children.link(col)
```

Objects remain a single datablock; modifying `obj.location` from either scene context moves the same object.

---

## Notes

- `scene.frame_set(n)` is preferred over `scene.frame_current = n` because it updates the dependency graph (animation, constraints, drivers).
- `render.fps_base` defaults to `1.0`; NTSC 29.97 fps is represented as `fps=30, fps_base=1.001`.
- World nodes are only effective in Cycles and Eevee; Workbench ignores the World node tree.
- A scene must have at least one view layer; removing all is not permitted.
- `scene.collection` cannot be unlinked or deleted — it is the implicit root.

## Related

- [Collections](./collections.md)
- [Empties, Cameras & Lights](./empties-cameras-lights.md)
- [Data System & Datablocks](./data-system.md)
