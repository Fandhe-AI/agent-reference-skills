---
name: Common Compositing Setups
description: Typical compositor node graph patterns including depth of field, glare/bloom, layer compositing, color grading, and multi-pass file output, with Python construction examples.
---

# Common Compositing Setups

Practical node graph patterns for the most frequent compositing tasks in Blender. Each section includes an equivalent Python construction.

## Overview

All setups use the canonical helpers defined in [compositor-nodes.md](./compositor-nodes.md). Copy both functions (`get_compositor_tree` and `add_output_node`) into your script before using any setup below.

```python
import bpy

scene = bpy.context.scene
tree, links = get_compositor_tree(scene)
nodes = tree.nodes
nodes.clear()  # remove any existing nodes; rebuild explicitly
```

After `nodes.clear()`, always create Render Layers and an output node explicitly — no default nodes remain.

---

## Z-Depth Depth of Field (Defocus)

Uses the Z render pass to drive the Defocus node for a post-process DOF effect.

**Required passes:** `use_pass_z = True`

```python
vl = scene.view_layers["ViewLayer"]
vl.use_pass_z = True

rl    = nodes.new("CompositorNodeRLayers"); rl.location = (0, 0); rl.scene = scene
defoc = nodes.new("CompositorNodeDefocus"); defoc.location = (300, 0)

defoc.use_zbuffer = True
defoc.f_stop      = 5.6
defoc.bokeh       = 'HEXAGON'
defoc.max_blur    = 24.0

links.new(rl.outputs["Image"], defoc.inputs["Image"])
links.new(rl.outputs["Depth"], defoc.inputs["Z"])

add_output_node(tree, defoc.outputs["Image"], location=(600, 0))
```

**Notes:** The Defocus node reads the camera's focal distance from the active scene camera. Set `camera.data.dof.focus_distance` to control focus depth.

---

## Glare / Bloom

Adds a glow or bloom around bright regions (useful for lights, emissive surfaces).

```python
rl    = nodes.new("CompositorNodeRLayers"); rl.location = (0, 0); rl.scene = scene
glare = nodes.new("CompositorNodeGlare");   glare.location = (300, 0)

glare.glare_type = 'FOG_GLOW'   # soft bloom; use 'STREAKS' for lens streaks
glare.quality    = 'HIGH'
glare.threshold  = 0.8
glare.size       = 8             # glow radius exponent (2^size pixels)
glare.mix        = 0.0           # 0 = original + glow; 1 = glow only

links.new(rl.outputs["Image"], glare.inputs["Image"])

add_output_node(tree, glare.outputs["Image"], location=(600, 0))
```

---

## Render Layer Compositing (Alpha Over)

Composites multiple View Layers or objects on separate layers into a single output.

```python
rl_bg = nodes.new("CompositorNodeRLayers"); rl_bg.location = (0, 100); rl_bg.scene = scene
rl_fg = nodes.new("CompositorNodeRLayers"); rl_fg.location = (0, -100); rl_fg.scene = scene
rl_fg.layer = "ForegroundLayer"  # name of the second View Layer

alpha_over = nodes.new("CompositorNodeAlphaOver"); alpha_over.location = (350, 0)

alpha_over.premul = 0.0   # straight alpha (set >0 for premultiplied)

# Background → input 1; Foreground → input 2
links.new(rl_bg.outputs["Image"], alpha_over.inputs[1])
links.new(rl_fg.outputs["Image"], alpha_over.inputs[2])

add_output_node(tree, alpha_over.outputs["Image"], location=(600, 0))
```

---

## Color Grading (Basic Flow)

A simple lift/gamma/gain grade followed by an RGB curves tweak.

```python
rl      = nodes.new("CompositorNodeRLayers");     rl.location = (0, 0); rl.scene = scene
balance = nodes.new("CompositorNodeColorBalance"); balance.location = (250, 0)
curves  = nodes.new("CompositorNodeCurveRGB");    curves.location = (500, 0)

# Lift/Gamma/Gain mode (default)
balance.correction_method = 'LIFT_GAMMA_GAIN'
# Adjust via balance.lift / balance.gamma / balance.gain (Color vectors)

links.new(rl.outputs["Image"],      balance.inputs["Image"])
links.new(balance.outputs["Image"], curves.inputs["Image"])

add_output_node(tree, curves.outputs["Image"], location=(750, 0))
```

---

## File Output Node (Multi-Pass Export)

Writes multiple passes to separate image files (e.g., EXR layers) for external compositing.

```python
vl = scene.view_layers["ViewLayer"]
vl.use_pass_diffuse_direct = True
vl.use_pass_glossy_direct  = True
vl.use_pass_z              = True

rl      = nodes.new("CompositorNodeRLayers");    rl.location = (0, 0); rl.scene = scene
fileout = nodes.new("CompositorNodeOutputFile"); fileout.location = (400, 0)

fileout.base_path              = "/tmp/render/"
fileout.format.file_format     = 'OPEN_EXR_MULTILAYER'

# Add file slots for each pass (Blender ≤ 4.4 API)
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

rl      = nodes.new("CompositorNodeRLayers"); rl.location = (0, 0); rl.scene = scene
denoise = nodes.new("CompositorNodeDenoise"); denoise.location = (300, 0)

denoise.prefilter = 'ACCURATE'
denoise.quality   = 'HIGH'
denoise.use_hdr   = True

links.new(rl.outputs["Noisy Image"],      denoise.inputs["Image"])
links.new(rl.outputs["Denoising Albedo"], denoise.inputs["Albedo"])
links.new(rl.outputs["Denoising Normal"], denoise.inputs["Normal"])

add_output_node(tree, denoise.outputs["Image"], location=(600, 0))
```

## Notes

- **Blender 5.0+:** `scene.use_nodes` / `scene.node_tree` are removed. `CompositorNodeComposite` is also removed. All version branching is handled by `get_compositor_tree()` and `add_output_node()` — do not add `if hasattr(scene, 'compositing_node_group')` in individual setup scripts.
- **Blender ≤ 4.4:** `CompositorNodeComposite` is the required final output node; without it, compositing results are not applied to the render.
- **File Output — Blender 5.0+:** `file_slots`, `layer_slots`, and `base_path` were removed. Use `directory`, `file_name`, and `file_output_items` instead. The exact Python API for `file_output_items` (e.g., `.new()` signature and socket indexing) differs from the `file_slots` pattern shown above; consult the Blender 5.0 release notes for the migration guide.
- When building trees from Python, call `nodes.clear()` and add all required nodes explicitly to avoid stale links or duplicate nodes.
- Access Render Layers pass sockets by **name** (`rl.outputs["Depth"]`), not by index — enabled passes shift socket indices.
- Alpha Over's two image inputs are accessed as `inputs[1]` (Background) and `inputs[2]` (Foreground) in Python.
- The `CompositorNodeOutputFile` requires a valid `base_path` (Blender ≤ 4.4) or `directory` (Blender 5.0+); Blender will not create missing intermediate directories automatically.

## Related

- [compositor-nodes.md](./compositor-nodes.md)
- [render-passes.md](./render-passes.md)
