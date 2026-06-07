---
name: Compositor Nodes
description: Overview of compositing nodes, enabling the compositor, key input/output/color/filter nodes, and Python API for building node trees.
---

# Compositor Nodes

The Blender Compositor is a node-based post-processing system that operates on rendered images, passes, and external images to produce final output.

## Overview

The compositor API changed between Blender 4.x and 5.0.

**Blender ≤ 4.4:** Enable with `scene.use_nodes = True`; access the tree via `scene.node_tree`.

**Blender 5.0+:** `scene.use_nodes` and the "Use Nodes" checkbox were removed. Create a `CompositorNodeTree` node group and assign it to `scene.compositing_node_group` instead.

For cross-version scripts, use these two canonical helpers. All code examples in this skill call these helpers rather than duplicating the branching logic.

```python
import bpy

def get_compositor_tree(scene):
    """Return (tree, links) for the compositor. Idempotent across Blender 4.x / 5.0+."""
    if hasattr(scene, 'compositing_node_group'):
        # Blender 5.0+: reuse existing group to avoid orphaning datablocks
        tree = scene.compositing_node_group
        if tree is None:
            tree = bpy.data.node_groups.new("Compositor", "CompositorNodeTree")
            scene.compositing_node_group = tree
    else:
        # Blender ≤ 4.4
        scene.use_nodes = True
        tree = scene.node_tree
    return tree, tree.links


def add_output_node(tree, source_socket, location=(700, 0)):
    """Create the final output node (version-aware) and link source_socket to it."""
    scene = bpy.context.scene
    if hasattr(scene, 'compositing_node_group'):
        # Blender 5.0+: NodeGroupOutput; ensure a Color OUTPUT socket exists on the interface
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
        # Blender ≤ 4.4: CompositorNodeComposite
        out = tree.nodes.new('CompositorNodeComposite')
        tree.links.new(source_socket, out.inputs["Image"])
    out.location = location
    return out
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

Use `get_compositor_tree()` defined in the Overview section. It handles both versions and is idempotent — calling it again on a scene that already has a compositor tree reuses the existing group rather than creating a new orphaned datablock.

```python
import bpy

scene = bpy.context.scene
tree, links = get_compositor_tree(scene)
nodes = tree.nodes
```

### Adding and Connecting Nodes

```python
# Clear any existing nodes, then build from scratch
nodes.clear()

# Always create Render Layers explicitly — never rely on default nodes after clear()
rl = nodes.new("CompositorNodeRLayers")
rl.location = (0, 0)
rl.scene = scene

# Add a Blur node
blur = nodes.new("CompositorNodeBlur")
blur.filter_type = 'GAUSS'
blur.size_x = 10
blur.size_y = 10
blur.location = (300, 0)

# Connect: Render Layers Image → Blur → output
links.new(rl.outputs["Image"], blur.inputs["Image"])

# Output node: use add_output_node() to keep version branching in one place
add_output_node(tree, blur.outputs["Image"], location=(600, 0))
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

- **Version branching:** Keep all 4.x / 5.0+ branching inside `get_compositor_tree()` and `add_output_node()`. Never duplicate `if hasattr(scene, 'compositing_node_group')` in individual scripts.
- **Idempotency:** `get_compositor_tree()` reuses an existing `compositing_node_group` rather than calling `bpy.data.node_groups.new()` every time. This prevents orphaned `Compositor.001`, `Compositor.002` … datablocks accumulating in the blend file.
- **Blender 5.0+:** `scene.use_nodes` and `scene.node_tree` are removed. `CompositorNodeComposite` is also removed; use `NodeGroupOutput` instead. The node group's first Color `OUTPUT` interface socket drives the render result.
- **Blender ≤ 4.4:** `CompositorNodeComposite` is required; without it, compositing results are not applied to the final render.
- **After `nodes.clear()`:** All default nodes (Render Layers, Composite) are gone. Always recreate them explicitly with `nodes.new(...)`.
- Use socket names (`outputs["Image"]`) rather than indices — enabled passes shift socket indices on the Render Layers node.
- The Denoise node works best when paired with the Denoising Albedo and Denoising Normal passes (enable via `view_layer.use_pass_denoising_data`).

## Related

- [render-passes.md](./render-passes.md)
- [common-setups.md](./common-setups.md)
