---
name: Compositor Nodes
description: Overview of compositing nodes, enabling the compositor, key input/output/color/filter nodes, and Python API for building node trees.
---

# Compositor Nodes

The Blender Compositor is a node-based post-processing system that operates on rendered images, passes, and external images to produce final output.

## Overview

To enable compositing, set `scene.use_nodes = True`. This creates a default node tree (`scene.node_tree`) with a Render Layers node and a Composite node already connected.

```python
import bpy

scene = bpy.context.scene
scene.use_nodes = True
tree = scene.node_tree  # CompositorNodeTree
nodes = tree.nodes
links = tree.links
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

| Node | Python Type | Description |
|------|-------------|-------------|
| Composite | `CompositorNodeComposite` | Final output node; writes result to the render buffer |
| Viewer | `CompositorNodeViewer` | Previews data in the Image Editor during compositing |
| File Output | `CompositorNodeOutputFile` | Writes one or more passes to image files on disk |

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
scene.use_nodes = True           # enable compositor
tree = scene.node_tree           # bpy.types.CompositorNodeTree
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
out = nodes["Composite"]

# Connect: Render Layers Image → Blur → Composite
links.new(rl.outputs["Image"], blur.inputs["Image"])
links.new(blur.outputs["Image"], out.inputs["Image"])
```

### Removing All Nodes and Starting Fresh

```python
nodes.clear()
rl  = nodes.new("CompositorNodeRLayers")
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

- The Composite output node must be present; without it, compositing results are not applied to the final render.
- Use socket names (e.g., `outputs["Image"]`) rather than indices — enabled passes alter socket indices on the Render Layers node.
- `nodes.clear()` removes the default Render Layers and Composite nodes; add them back manually when rebuilding a tree from scratch.
- The Denoise node works best when paired with the Denoising Albedo and Denoising Normal passes (enable via `view_layer.use_pass_denoising_data`).

## Related

- [render-passes.md](./render-passes.md)
- [common-setups.md](./common-setups.md)
