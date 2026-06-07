---
name: Compositing Nodes
description: Build a compositor node tree from Python — Render Layers, Glare, Z-depth defocus, File Output, and multi-pass EXR export.
---

# Compositing Nodes

## Overview

The compositor node tree API changed significantly between versions. Blender ≤ 4.4 used `scene.use_nodes = True` and `scene.node_tree`. Blender 5.0+ deprecated `scene.use_nodes` and replaced `scene.node_tree` with `scene.compositing_node_group`, using a `NodeGroupOutput` node instead of `CompositorNodeComposite`. Both patterns are shown below. The code detects which API is available at runtime.

## Complete Example

```python
import bpy

scene = bpy.context.scene

# ── Enable render passes needed by the compositor ─────────────────────────────
view_layer = bpy.context.view_layer
view_layer.use_pass_z              = True
view_layer.use_pass_combined       = True
view_layer.use_pass_diffuse_color  = True

# ═══════════════════════════════════════════════════════════════════════════════
# Helper: create the node tree (compatible with Blender 4.x and 5.0+)
# ═══════════════════════════════════════════════════════════════════════════════

def get_compositor_tree(scene):
    """Return (tree, links) for the compositor, compatible across versions."""
    if hasattr(scene, 'compositing_node_group'):
        # Blender 5.0+
        tree = bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
        scene.compositing_node_group = tree
    else:
        # Blender ≤ 4.4
        scene.use_nodes = True
        tree = scene.node_tree
    # Clear default nodes
    tree.nodes.clear()
    return tree, tree.links

tree, links = get_compositor_tree(scene)

# ═══════════════════════════════════════════════════════════════════════════════
# PART A — Render Layers → Glare → Output
# ═══════════════════════════════════════════════════════════════════════════════

# Input: Render Layers
rl = tree.nodes.new('CompositorNodeRLayers')
rl.location = (0, 300)
rl.scene    = scene

# Glare filter
glare = tree.nodes.new('CompositorNodeGlare')
glare.location  = (300, 300)
glare.glare_type = 'GHOSTS'    # 'GHOSTS', 'STREAKS', 'FOG_GLOW', 'BLOOM'
glare.quality    = 'HIGH'      # 'HIGH', 'MEDIUM', 'LOW'
glare.threshold  = 0.8         # apply only to pixels brighter than this
glare.mix        = 0.5         # 0 = original, 1 = full glare

links.new(rl.outputs['Image'], glare.inputs['Image'])

# Output node (version-aware)
if hasattr(scene, 'compositing_node_group'):
    # Blender 5.0+: use NodeGroupOutput; ensure a Color input socket exists
    out = tree.nodes.new('NodeGroupOutput')
    out.location = (700, 300)
    if not tree.interface.items_tree:
        tree.interface.new_socket(name="Image", socket_type='NodeSocketColor',
                                  in_out='OUTPUT')
    links.new(glare.outputs['Image'], out.inputs[0])
else:
    # Blender ≤ 4.4: CompositorNodeComposite
    comp = tree.nodes.new('CompositorNodeComposite')
    comp.location = (700, 300)
    links.new(glare.outputs['Image'], comp.inputs['Image'])

# ═══════════════════════════════════════════════════════════════════════════════
# PART B — Z-depth defocus (Defocus node)
# ═══════════════════════════════════════════════════════════════════════════════

defocus = tree.nodes.new('CompositorNodeDefocus')
defocus.location    = (300, 0)
defocus.use_zbuffer = True
defocus.f_stop      = 2.8     # aperture — lower = more blur
defocus.max_blur    = 32      # pixel cap on blur radius

links.new(rl.outputs['Image'], defocus.inputs['Image'])
links.new(rl.outputs['Depth'], defocus.inputs['Z'])

# ═══════════════════════════════════════════════════════════════════════════════
# PART C — File Output node (multi-pass export)
# ═══════════════════════════════════════════════════════════════════════════════

file_out = tree.nodes.new('CompositorNodeOutputFile')
file_out.location       = (700, 0)
file_out.base_path      = "//comp_output/"
file_out.format.file_format     = 'PNG'
file_out.format.color_mode      = 'RGBA'
file_out.format.color_depth     = '16'

# Add named file slots for separate pass files
file_out.file_slots.new("combined")
file_out.file_slots.new("depth")
file_out.file_slots["combined"].path = "combined_####"
file_out.file_slots["depth"].path    = "depth_####"

links.new(glare.outputs['Image'], file_out.inputs["combined"])
links.new(rl.outputs['Depth'],    file_out.inputs["depth"])

# ═══════════════════════════════════════════════════════════════════════════════
# PART D — Multi-layer EXR output (all passes in one file)
# ═══════════════════════════════════════════════════════════════════════════════

exr_out = tree.nodes.new('CompositorNodeOutputFile')
exr_out.location = (700, -200)
exr_out.base_path = "//exr_output/"
exr_out.format.file_format = 'OPEN_EXR_MULTILAYER'
exr_out.format.color_depth = '32'
exr_out.format.exr_codec   = 'DWAA'

exr_out.file_slots.new("Image")
exr_out.file_slots.new("Depth")
exr_out.file_slots["Image"].path = "frame_####"
exr_out.file_slots["Depth"].path = "frame_####"

links.new(glare.outputs['Image'], exr_out.inputs["Image"])
links.new(rl.outputs['Depth'],    exr_out.inputs["Depth"])

print("Compositor tree built:", [n.type for n in tree.nodes])
```

## Key Points

- In Blender 5.0+ `scene.use_nodes` always returns `True` and setting it has no effect; use `scene.compositing_node_group` instead.
- `CompositorNodeComposite` was removed in Blender 5.0; replace with `NodeGroupOutput` and ensure the tree's interface has an `OUTPUT` Color socket.
- `CompositorNodeRLayers.scene` must point to the scene being rendered, or the node produces no output.
- `FileOutput` node slots must be explicitly created with `file_slots.new(name)` before linking to them.

## Variations

```python
# Color Balance node
cb = tree.nodes.new('CompositorNodeColorBalance')
cb.correction_method = 'LIFT_GAMMA_GAIN'
cb.lift  = (1.0, 0.9, 0.9)   # shadows
cb.gamma = (1.0, 1.0, 1.0)   # midtones
cb.gain  = (1.1, 1.0, 0.9)   # highlights

# Lens Distortion
distort = tree.nodes.new('CompositorNodeLensDist')
distort.inputs['Distort'].default_value = -0.05
distort.inputs['Dispersion'].default_value = 0.02

# Mix node (alpha over)
mix = tree.nodes.new('CompositorNodeAlphaOver')
mix.premul = 1.0
```

## Related

- [rendering-setup.md](./rendering-setup.md) — Enable render passes / AOVs before compositing
- [headless-render.md](./headless-render.md) — Trigger a render that feeds the compositor
- [material-shading.md](./material-shading.md) — AOV Output node in materials
