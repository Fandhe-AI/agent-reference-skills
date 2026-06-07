---
name: Compositor Nodes
description: Overview of compositing nodes, enabling the compositor, key input/output/color/filter nodes, and Python API for building node trees.
---

# Compositor Nodes

The Blender Compositor is a node-based post-processing system that operates on rendered images, passes, and external images to produce final output.

## Overview

The compositor API changed between Blender 4.x and 5.0. Use the appropriate pattern for the target version.

**Blender ≤ 4.4:** Enable with `scene.use_nodes = True`; access the tree via `scene.node_tree`.

**Blender 5.0+:** `scene.use_nodes` and the "Use Nodes" checkbox were removed. Create a `CompositorNodeTree` node group and assign it to `scene.compositing_node_group` instead.

```python
import bpy

scene = bpy.context.scene

# Blender ≤ 4.4
scene.use_nodes = True
tree = scene.node_tree       # CompositorNodeTree

# Blender 5.0+
tree = bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
scene.compositing_node_group = tree

nodes = tree.nodes
links = tree.links
```

For cross-version scripts, detect the available API at runtime:

```python
def get_compositor_tree(scene):
    """Return (tree, links) compatible with Blender 4.x and 5.0+."""
    if hasattr(scene, 'compositing_node_group'):
        # Blender 5.0+
        tree = bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
        scene.compositing_node_group = tree
    else:
        # Blender ≤ 4.4
        scene.use_nodes = True
        tree = scene.node_tree
    tree.nodes.clear()
    return tree, tree.links
```

## Key Nodes

### Input Nodes

| Node | Python Type | Description |
|------|-------------|-------------|
| Render Layers | `CompositorNodeRLayers` | Reads render passes from a View Layer |
| Image | `CompositorNodeImage` | Loads a static or animated image |
| Movie Clip | `CompositorNodeMovieClip` | Loads a movie clip data-block |
| Mask | `CompositorNodeMask` | Outputs a Mask data-block as a greyscale image |

### Output Nodes

| Node | Python Type | Blender Version | Description |
|------|-------------|-----------------|-------------|
| Composite | `CompositorNodeComposite` | ≤ 4.4 | Final output node; writes result to the render buffer |
| Group Output | `NodeGroupOutput` | 5.0+ | Replaces Composite node; first Color input socket drives render output |
| Viewer | `CompositorNodeViewer` | all | Previews data in the Image Editor during compositing |
| File Output | `CompositorNodeOutputFile` | all | Writes one or more passes to image files on disk |

### Color Nodes

| Node | Python Type | Description |
|------|-------------|-------------|
| Mix | `CompositorNodeMixRGB` | Blends two images using standard blend modes |
| Alpha Over | `CompositorNodeAlphaOver` | Composites a foreground over a background using alpha |
| Color Balance | `CompositorNodeColorBalance` | Lift/Gamma/Gain or Offset/Power/Slope (ASC-CDL) color correction |
| Hue/Saturation/Value | `CompositorNodeHueSat` | Adjusts hue, saturation, and value |
| Bright/Contrast | `CompositorNodeBrightContrast` | Simple brightness and contrast adjustment |
| RGB Curves | `CompositorNodeCurveRGB` | Per-channel tone curve adjustment |
| Invert Color | `CompositorNodeInvert` | Inverts color and/or alpha channels |

### Filter Nodes

| Node | Python Type | Description |
|------|-------------|-------------|
| Blur | `CompositorNodeBlur` | Gaussian and other kernel blurs |
| Glare | `CompositorNodeGlare` | Adds lens flares, fog glow, streaks, or ghosts around bright areas |
| Defocus | `CompositorNodeDefocus` | Z-depth-based depth-of-field blur (bokeh shapes) |
| Denoise | `CompositorNodeDenoise` | Intel OpenImageDenoise; removes Cycles noise in post |
| Despeckle | `CompositorNodeDespeckle` | Smooths noisy or speckled regions |

## Python API Mapping

### Enabling and Accessing the Node Tree

```python
scene = bpy.context.scene

# Blender ≤ 4.4
scene.use_nodes = True           # enable compositor
tree = scene.node_tree           # bpy.types.CompositorNodeTree

# Blender 5.0+: scene.use_nodes and scene.node_tree are removed
tree = bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
scene.compositing_node_group = tree

nodes = tree.nodes               # bpy.types.Nodes collection
links = tree.links               # bpy.types.NodeLinks collection
```

### Adding and Connecting Nodes

```python
# Add a Blur node
blur = nodes.new("CompositorNodeBlur")
blur.filter_type = 'GAUSS'
blur.size_x = 10
blur.size_y = 10
blur.location = (300, 0)

# Get existing default nodes
rl  = nodes["Render Layers"]

# Output node differs by version:
# Blender ≤ 4.4
out = nodes["Composite"]                  # CompositorNodeComposite
# Blender 5.0+
out = nodes.new("NodeGroupOutput")
tree.interface.new_socket(name="Image", socket_type='NodeSocketColor', in_out='OUTPUT')

# Connect: Render Layers Image → Blur → output
links.new(rl.outputs["Image"], blur.inputs["Image"])
links.new(blur.outputs["Image"], out.inputs["Image"])
```

### Rebuilding a Tree from Scratch (version-aware)

```python
nodes.clear()
rl = nodes.new("CompositorNodeRLayers")
rl.location = (0, 0)

if hasattr(scene, 'compositing_node_group'):
    # Blender 5.0+: Group Output node
    out = nodes.new("NodeGroupOutput")
    out.location = (400, 0)
    if not tree.interface.items_tree:
        tree.interface.new_socket(name="Image", socket_type='NodeSocketColor', in_out='OUTPUT')
    links.new(rl.outputs["Image"], out.inputs[0])
else:
    # Blender ≤ 4.4: Composite node
    out = nodes.new("CompositorNodeComposite")
    out.location = (400, 0)
    links.new(rl.outputs["Image"], out.inputs["Image"])
```

## Key Node Properties

### CompositorNodeBlur

| Property | Type | Values / Default | Description |
|----------|------|-----------------|-------------|
| `filter_type` | enum | `'FLAT'`, `'GAUSS'`, `'FAST_GAUSS'`, `'CATROM'`, … / `'FLAT'` | Kernel type |
| `size_x` | int | [0, 2048] / 0 | Horizontal blur radius |
| `size_y` | int | [0, 2048] / 0 | Vertical blur radius |
| `use_bokeh` | bool | False | Circular (bokeh) kernel |

### CompositorNodeGlare

| Property | Type | Values / Default | Description |
|----------|------|-----------------|-------------|
| `glare_type` | enum | `'FOG_GLOW'`, `'GHOSTS'`, `'STREAKS'`, `'SIMPLE_STAR'` / `'STREAKS'` | Glare effect type |
| `quality` | enum | `'HIGH'`, `'MEDIUM'`, `'LOW'` | Trade quality for speed |
| `threshold` | float | [0, inf] / 1.0 | Minimum brightness to apply glare |
| `mix` | float | [-1, 1] / 0.0 | Blend between original and glare |

### CompositorNodeDefocus

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `use_zbuffer` | bool | True | Use Z input as depth map (vs. greyscale mask) |
| `f_stop` | float | 128.0 | Simulated aperture f-stop |
| `bokeh` | enum | `'CIRCLE'` | Bokeh shape (CIRCLE, TRIANGLE, SQUARE, PENTAGON, HEXAGON, HEPTAGON, OCTAGON) |
| `max_blur` | float | 16.0 | Maximum blur radius in pixels |

### CompositorNodeDenoise

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `prefilter` | enum | `'ACCURATE'` | Prefilter mode: NONE, FAST, ACCURATE |
| `quality` | enum | `'HIGH'` | Quality: HIGH, BALANCED, LOW |
| `use_hdr` | bool | False | Preserve values outside 0–1 range |

## Notes

- **Blender 5.0+:** `scene.use_nodes` and `scene.node_tree` are removed. Use `scene.compositing_node_group` with a `NodeGroupOutput` node instead of `CompositorNodeComposite`.
- **Blender 5.0+:** `CompositorNodeComposite` is undefined. The Group Output node's first Color input socket drives the render output; other inputs are ignored.
- **Blender ≤ 4.4:** The Composite output node must be present; without it, compositing results are not applied to the final render.
- Use socket names (e.g., `outputs["Image"]`) rather than indices — enabled passes alter socket indices on the Render Layers node.
- `nodes.clear()` removes any default nodes; add Render Layers and an output node back manually when rebuilding from scratch.
- The Denoise node works best when paired with the Denoising Albedo and Denoising Normal passes (enable via `view_layer.use_pass_denoising_data`).

## Related

- [render-passes.md](./render-passes.md)
- [common-setups.md](./common-setups.md)
