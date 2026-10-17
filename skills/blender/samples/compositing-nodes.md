---
name: Compositing Nodes
description: Build a compositor node tree from Python — Render Layers, Glare, Z-depth defocus, File Output, and multi-pass EXR export.
---

# Compositing Nodes

## Overview

The compositor node tree API changed significantly between versions. Blender ≤ 4.5 used `scene.use_nodes = True` and `scene.node_tree`. Blender 5.0+ deprecated `scene.use_nodes` and replaced `scene.node_tree` with `scene.compositing_node_group`, using a `NodeGroupOutput` node instead of `CompositorNodeComposite`.

The two canonical helpers below encapsulate all version branching. Copy them at the top of any compositor script; the PART A–D examples call these helpers without further branching (except the File Output nodes in PART C/D, which branch on `file_output_items`).

## Complete Example

```python
import bpy

# ═══════════════════════════════════════════════════════════════════════════════
# Canonical helpers — version branching lives here and nowhere else
# ═══════════════════════════════════════════════════════════════════════════════

def get_compositor_tree(scene):
    """Return (tree, links) for the compositor. Idempotent across Blender 4.x / 5.0+.

    On 5.0+: reuses the existing compositing_node_group rather than creating a new
    one each call, preventing orphaned 'Compositor.001', 'Compositor.002' datablocks.
    """
    if hasattr(scene, 'compositing_node_group'):
        # Blender 5.0+
        tree = scene.compositing_node_group
        if tree is None:
            tree = bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
            scene.compositing_node_group = tree
    else:
        # Blender ≤ 4.5
        scene.use_nodes = True
        tree = scene.node_tree
    return tree, tree.links


def add_output_node(tree, source_socket, location=(700, 0)):
    """Create the final output node (version-aware) and link source_socket to it."""
    scene = bpy.context.scene
    if hasattr(scene, 'compositing_node_group'):
        # Blender 5.0+: NodeGroupOutput; ensure a Color OUTPUT socket exists
        out = tree.nodes.new('NodeGroupOutput')
        if not any(
            getattr(s, 'in_out', None) == 'OUTPUT'
            for s in tree.interface.items_tree
        ):
            tree.interface.new_socket(
                name="Image", socket_type='NodeSocketColor', in_out='OUTPUT'
            )
        tree.links.new(source_socket, out.inputs[0])
    else:
        # Blender ≤ 4.5: CompositorNodeComposite
        out = tree.nodes.new('CompositorNodeComposite')
        tree.links.new(source_socket, out.inputs["Image"])
    out.location = location
    return out


# ── Enable render passes needed by the compositor ────────────────────────────
scene = bpy.context.scene
view_layer = bpy.context.view_layer
view_layer.use_pass_z             = True
view_layer.use_pass_combined      = True
view_layer.use_pass_diffuse_color = True

# Obtain the compositor tree (idempotent)
tree, links = get_compositor_tree(scene)
nodes = tree.nodes
nodes.clear()  # remove any existing nodes; all nodes are added explicitly below

# ═══════════════════════════════════════════════════════════════════════════════
# PART A — Render Layers → Glare → Output
# ═══════════════════════════════════════════════════════════════════════════════

# Input: Render Layers — always create explicitly after nodes.clear()
rl = nodes.new('CompositorNodeRLayers')
rl.location = (0, 300)
rl.scene    = scene

# Glare filter
glare = nodes.new('CompositorNodeGlare')
glare.location   = (300, 300)
glare.glare_type = 'GHOSTS'   # 'GHOSTS', 'STREAKS', 'FOG_GLOW', 'BLOOM'
glare.quality    = 'HIGH'     # 'HIGH', 'MEDIUM', 'LOW'
glare.threshold  = 0.8        # apply only to pixels brighter than this
glare.mix        = 0.5        # 0 = original, 1 = full glare

links.new(rl.outputs['Image'], glare.inputs['Image'])

# Output node: version branching handled entirely inside add_output_node()
add_output_node(tree, glare.outputs['Image'], location=(700, 300))

# ═══════════════════════════════════════════════════════════════════════════════
# PART B — Z-depth defocus (Defocus node)
# ═══════════════════════════════════════════════════════════════════════════════

defocus = nodes.new('CompositorNodeDefocus')
defocus.location    = (300, 0)
defocus.use_zbuffer = True
defocus.f_stop      = 2.8    # aperture — lower = more blur
defocus.max_blur    = 32     # pixel cap on blur radius

links.new(rl.outputs['Image'], defocus.inputs['Image'])
links.new(rl.outputs['Depth'], defocus.inputs['Z'])

# (PART B result feeds into the File Output nodes in PART C/D below)

# ═══════════════════════════════════════════════════════════════════════════════
# PART C — File Output node (multi-pass PNG export)
# ═══════════════════════════════════════════════════════════════════════════════
#
# Blender 5.0+: `file_slots`, `layer_slots`, `base_path` were removed; the node has
# `directory`, `file_name`, and `file_output_items.new(socket_type, name)`.
# Blender ≤ 4.5: `base_path` + `file_slots.new(name)` (kept in the else branch).

file_out = nodes.new('CompositorNodeOutputFile')
file_out.location           = (700, 0)
file_out.format.file_format = 'PNG'
file_out.format.color_mode  = 'RGBA'
file_out.format.color_depth = '16'

if hasattr(file_out, 'file_output_items'):
    # Blender 5.0+
    file_out.directory = "//comp_output/"
    file_out.file_name = "combined_####"
    file_out.file_output_items.new('RGBA', "combined")
    file_out.file_output_items.new('FLOAT', "depth")
else:
    # Blender ≤ 4.5
    file_out.base_path = "//comp_output/"
    file_out.file_slots.new("combined")
    file_out.file_slots.new("depth")
    file_out.file_slots["combined"].path = "combined_####"
    file_out.file_slots["depth"].path    = "depth_####"

links.new(glare.outputs['Image'], file_out.inputs["combined"])
links.new(rl.outputs['Depth'],    file_out.inputs["depth"])

# ═══════════════════════════════════════════════════════════════════════════════
# PART D — Multi-layer EXR output (all passes in one file)
# ═══════════════════════════════════════════════════════════════════════════════

exr_out = nodes.new('CompositorNodeOutputFile')
exr_out.location           = (700, -200)
if hasattr(exr_out.format, 'media_type'):  # Blender 5.0+
    exr_out.format.media_type = 'MULTI_LAYER_IMAGE'
exr_out.format.file_format = 'OPEN_EXR_MULTILAYER'
exr_out.format.color_depth = '32'
exr_out.format.exr_codec   = 'DWAA'

if hasattr(exr_out, 'file_output_items'):
    # Blender 5.0+
    exr_out.directory = "//exr_output/"
    exr_out.file_name = "frame_####"
    exr_out.file_output_items.new('RGBA', "Image")
    exr_out.file_output_items.new('FLOAT', "Depth")
else:
    # Blender ≤ 4.5
    exr_out.base_path = "//exr_output/"
    exr_out.file_slots.new("Image")
    exr_out.file_slots.new("Depth")
    exr_out.file_slots["Image"].path = "frame_####"
    exr_out.file_slots["Depth"].path = "frame_####"

links.new(glare.outputs['Image'], exr_out.inputs["Image"])
links.new(rl.outputs['Depth'],    exr_out.inputs["Depth"])

print("Compositor tree built:", [n.type for n in tree.nodes])
```

## Key Points

- `get_compositor_tree()` is idempotent: on Blender 5.0+ it reuses an existing `compositing_node_group` rather than creating a new orphaned datablock on every call.
- `add_output_node()` is the single point of version branching for the output node; individual scripts need no `if hasattr(scene, ...)` checks.
- After `nodes.clear()`, always create Render Layers with `nodes.new('CompositorNodeRLayers')` and set `.scene = scene` — default nodes no longer exist.
- `CompositorNodeRLayers.scene` must point to the scene being rendered, or the node produces no output.
- **Blender 5.0+ — File Output:** `file_slots`, `layer_slots`, and `base_path` are removed. Use `directory`, `file_name`, and `file_output_items` instead. PART C/D branch on `hasattr(node, 'file_output_items')`; the `.new(socket_type, name)` signature and the socket types (`'RGBA'`, `'FLOAT'`, ...) come from the 5.2 API docs. Input sockets are linked by item name here; the 5.0 release notes show `file_output_items[0].name` replacing `file_slots[0].path` for socket naming. Per the 5.0 compositor release notes (b10d767c4e), the File Output node appends the frame number to the image name only when rendering an animation, and a manual `####` in the name is substituted with the frame number even in single renders.
- **Blender 5.0+ — media_type:** `ImageFormatSettings.media_type` must be set to an appropriate type (`'MULTI_LAYER_IMAGE'` for `'OPEN_EXR_MULTILAYER'`) before assigning `file_format`; PART D guards it with `hasattr` so 4.x, which has no `media_type`, still works.
- **Blender 5.0+ — pass names:** many render passes were renamed (e.g. `'Z'` to `'Depth'`, `'DiffCol'` to `'Diffuse Color'`), so Render Layers output sockets use the new names; `rl.outputs['Depth']` above is already the 5.0+ name.

## Variations

```python
# Color Balance node
cb = tree.nodes.new('CompositorNodeColorBalance')
cb.correction_method = 'LIFT_GAMMA_GAIN'
cb.lift  = (1.0, 0.9, 0.9)   # shadows
cb.gamma = (1.0, 1.0, 1.0)   # midtones
cb.gain  = (1.1, 1.0, 0.9)   # highlights

# Lens Distortion (the 5.2 API type name is 'CompositorNodeLensdist')
distort = tree.nodes.new('CompositorNodeLensdist')
distort.inputs['Distort'].default_value    = -0.05
distort.inputs['Dispersion'].default_value = 0.02

# Mix node (alpha over)
mix = tree.nodes.new('CompositorNodeAlphaOver')
mix.premul = 1.0
```

## Related

- [rendering-setup.md](./rendering-setup.md) — Enable render passes / AOVs before compositing
- [headless-render.md](./headless-render.md) — Trigger a render that feeds the compositor
- [material-shading.md](./material-shading.md) — AOV Output node in materials
