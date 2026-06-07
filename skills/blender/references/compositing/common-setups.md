---
name: Common Compositing Setups
description: Typical compositor node graph patterns including depth of field, glare/bloom, layer compositing, color grading, and multi-pass file output, with Python construction examples.
---

# Common Compositing Setups

Practical node graph patterns for the most frequent compositing tasks in Blender. Each section includes both the UI node approach and an equivalent Python construction.

## Overview

All setups begin with the same boilerplate. The compositor API differs between Blender versions:

```python
import bpy

scene = bpy.context.scene

# Blender ≤ 4.4
scene.use_nodes = True
tree = scene.node_tree

# Blender 5.0+ (scene.use_nodes and scene.node_tree are removed)
tree = bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
scene.compositing_node_group = tree

nodes = tree.nodes
links = tree.links
nodes.clear()  # remove defaults; add required nodes manually
```

For cross-version scripts, use a helper (see [compositor-nodes.md](./compositor-nodes.md) for `get_compositor_tree()`).

The output node also differs by version — each setup below shows both variants.

---

## Z-Depth Depth of Field (Defocus)

Uses the Z render pass to drive the Defocus node for a post-process DOF effect.

**Required passes:** `use_pass_z = True`

```python
vl = scene.view_layers["ViewLayer"]
vl.use_pass_z = True

rl    = nodes.new("CompositorNodeRLayers"); rl.location = (0, 0)
defoc = nodes.new("CompositorNodeDefocus"); defoc.location = (300, 0)

defoc.use_zbuffer = True
defoc.f_stop      = 5.6
defoc.bokeh       = 'HEXAGON'
defoc.max_blur    = 24.0

links.new(rl.outputs["Image"], defoc.inputs["Image"])
links.new(rl.outputs["Depth"], defoc.inputs["Z"])

# Output node — version-dependent
if hasattr(scene, 'compositing_node_group'):
    # Blender 5.0+: Group Output
    out = nodes.new("NodeGroupOutput"); out.location = (600, 0)
    tree.interface.new_socket(name="Image", socket_type='NodeSocketColor', in_out='OUTPUT')
    links.new(defoc.outputs["Image"], out.inputs[0])
else:
    # Blender ≤ 4.4: Composite node
    out = nodes.new("CompositorNodeComposite"); out.location = (600, 0)
    links.new(defoc.outputs["Image"], out.inputs["Image"])
```

**Notes:** The Defocus node reads the camera's focal distance from the active scene camera. Set the camera's depth-of-field focus distance in `camera.data.dof.focus_distance`.

---

## Glare / Bloom

Adds a glow or bloom around bright regions (useful for lights, emissive surfaces).

```python
rl    = nodes.new("CompositorNodeRLayers"); rl.location = (0, 0)
glare = nodes.new("CompositorNodeGlare");   glare.location = (300, 0)

glare.glare_type = 'FOG_GLOW'   # soft bloom; use 'STREAKS' for lens streaks
glare.quality    = 'HIGH'
glare.threshold  = 0.8
glare.size       = 8             # glow radius exponent (2^size pixels)
glare.mix        = 0.0           # 0 = original + glow; 1 = glow only

links.new(rl.outputs["Image"], glare.inputs["Image"])

# Output node — version-dependent
if hasattr(scene, 'compositing_node_group'):
    # Blender 5.0+: Group Output
    out = nodes.new("NodeGroupOutput"); out.location = (600, 0)
    tree.interface.new_socket(name="Image", socket_type='NodeSocketColor', in_out='OUTPUT')
    links.new(glare.outputs["Image"], out.inputs[0])
else:
    # Blender ≤ 4.4: Composite node
    out = nodes.new("CompositorNodeComposite"); out.location = (600, 0)
    links.new(glare.outputs["Image"], out.inputs["Image"])
```

---

## Render Layer Compositing (Alpha Over)

Composites multiple View Layers or objects on separate layers into a single output.

```python
rl_bg = nodes.new("CompositorNodeRLayers"); rl_bg.location = (0, 100)
rl_fg = nodes.new("CompositorNodeRLayers"); rl_fg.location = (0, -100)
rl_fg.layer = "ForegroundLayer"  # name of the second View Layer

alpha_over = nodes.new("CompositorNodeAlphaOver"); alpha_over.location = (350, 0)

alpha_over.premul = 0.0   # straight alpha (set >0 for premultiplied)

# Background → input 1; Foreground → input 2
links.new(rl_bg.outputs["Image"], alpha_over.inputs[1])
links.new(rl_fg.outputs["Image"], alpha_over.inputs[2])

# Output node — version-dependent
if hasattr(scene, 'compositing_node_group'):
    # Blender 5.0+: Group Output
    out = nodes.new("NodeGroupOutput"); out.location = (600, 0)
    tree.interface.new_socket(name="Image", socket_type='NodeSocketColor', in_out='OUTPUT')
    links.new(alpha_over.outputs["Image"], out.inputs[0])
else:
    # Blender ≤ 4.4: Composite node
    out = nodes.new("CompositorNodeComposite"); out.location = (600, 0)
    links.new(alpha_over.outputs["Image"], out.inputs["Image"])
```

---

## Color Grading (Basic Flow)

A simple lift/gamma/gain grade followed by an RGB curves tweak.

```python
rl      = nodes.new("CompositorNodeRLayers");     rl.location = (0, 0)
balance = nodes.new("CompositorNodeColorBalance"); balance.location = (250, 0)
curves  = nodes.new("CompositorNodeCurveRGB");    curves.location = (500, 0)

# Lift/Gamma/Gain mode (default)
balance.correction_method = 'LIFT_GAMMA_GAIN'
# Adjust via balance.lift / balance.gamma / balance.gain (Color vectors)

links.new(rl.outputs["Image"],      balance.inputs["Image"])
links.new(balance.outputs["Image"], curves.inputs["Image"])

# Output node — version-dependent
if hasattr(scene, 'compositing_node_group'):
    # Blender 5.0+: Group Output
    out = nodes.new("NodeGroupOutput"); out.location = (750, 0)
    tree.interface.new_socket(name="Image", socket_type='NodeSocketColor', in_out='OUTPUT')
    links.new(curves.outputs["Image"], out.inputs[0])
else:
    # Blender ≤ 4.4: Composite node
    out = nodes.new("CompositorNodeComposite"); out.location = (750, 0)
    links.new(curves.outputs["Image"], out.inputs["Image"])
```

---

## File Output Node (Multi-Pass Export)

Writes multiple passes to separate image files (e.g., EXR layers) for external compositing.

```python
vl = scene.view_layers["ViewLayer"]
vl.use_pass_diffuse_direct = True
vl.use_pass_glossy_direct  = True
vl.use_pass_z              = True

rl      = nodes.new("CompositorNodeRLayers");       rl.location = (0, 0)
fileout = nodes.new("CompositorNodeOutputFile");    fileout.location = (400, 0)

fileout.base_path    = "/tmp/render/"
fileout.format.file_format = 'OPEN_EXR_MULTILAYER'

# Add file slots for each pass
fileout.file_slots.new("Beauty")
fileout.file_slots.new("DiffDir")
fileout.file_slots.new("GlossDir")
fileout.file_slots.new("Depth")

links.new(rl.outputs["Image"],   fileout.inputs["Beauty"])
links.new(rl.outputs["DiffDir"], fileout.inputs["DiffDir"])
links.new(rl.outputs["GlossDir"],fileout.inputs["GlossDir"])
links.new(rl.outputs["Depth"],   fileout.inputs["Depth"])
```

---

## Denoise Setup

Denoises a Cycles render using albedo and normal auxiliary passes for best quality.

**Required passes:** Denoising Data (`use_pass_denoising_data = True`)

```python
vl = scene.view_layers["ViewLayer"]
vl.use_pass_denoising_data = True

rl      = nodes.new("CompositorNodeRLayers"); rl.location = (0, 0)
denoise = nodes.new("CompositorNodeDenoise"); denoise.location = (300, 0)

denoise.prefilter = 'ACCURATE'
denoise.quality   = 'HIGH'
denoise.use_hdr   = True

links.new(rl.outputs["Noisy Image"],      denoise.inputs["Image"])
links.new(rl.outputs["Denoising Albedo"], denoise.inputs["Albedo"])
links.new(rl.outputs["Denoising Normal"], denoise.inputs["Normal"])

# Output node — version-dependent
if hasattr(scene, 'compositing_node_group'):
    # Blender 5.0+: Group Output
    out = nodes.new("NodeGroupOutput"); out.location = (600, 0)
    tree.interface.new_socket(name="Image", socket_type='NodeSocketColor', in_out='OUTPUT')
    links.new(denoise.outputs["Image"], out.inputs[0])
else:
    # Blender ≤ 4.4: Composite node
    out = nodes.new("CompositorNodeComposite"); out.location = (600, 0)
    links.new(denoise.outputs["Image"], out.inputs["Image"])
```

## Notes

- **Blender 5.0+:** `scene.use_nodes` / `scene.node_tree` are removed. Use `scene.compositing_node_group` with a `NodeGroupOutput` node. `CompositorNodeComposite` is undefined in 5.0.
- **Blender ≤ 4.4:** `CompositorNodeComposite` is the required final output node; without it, compositing results are not applied to the render.
- When building trees from Python, clear the default nodes with `nodes.clear()` and add everything explicitly to avoid duplicate links.
- Access Render Layers pass sockets by **name** (`rl.outputs["Depth"]`), not by index — enabled passes shift socket indices.
- The `CompositorNodeOutputFile` requires a valid `base_path`; Blender will not create missing intermediate directories automatically.
- For animated renders, `file_format = 'OPEN_EXR_MULTILAYER'` with `file_slots` is the standard pipeline export format.
- Alpha Over's two image inputs are accessed as `inputs[1]` (Background) and `inputs[2]` (Foreground) in Python.

## Related

- [compositor-nodes.md](./compositor-nodes.md)
- [render-passes.md](./render-passes.md)
