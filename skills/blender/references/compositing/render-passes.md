---
name: Render Passes and AOVs
description: View Layer render pass configuration, Cryptomatte, custom AOVs, and their use in the compositor via Python.
---

# Render Passes and AOVs

Render passes split a render into individual shading components (diffuse, glossy, Z-depth, etc.) for flexible compositing. AOVs (Arbitrary Output Variables) add custom shader data as additional passes.

## Overview

Passes are enabled per View Layer in the Render Properties → View Layer panel. Once enabled, they appear as output sockets on the Render Layers compositor node and are accessible in `bpy.types.ViewLayer`.

## Standard Render Passes

### Combined and Utility

| Pass | `ViewLayer` Property | Description |
|------|---------------------|-------------|
| Combined | `use_pass_combined` (default True) | Full RGBA beauty render |
| Z (Depth) | `use_pass_z` | Distance to nearest surface (0.0–∞) |
| Normal | `use_pass_normal` | Surface normal direction |
| Position | `use_pass_position` | World-space surface position |
| UV | `use_pass_uv` | Texture UV coordinates |
| Vector (Motion) | `use_pass_vector` | Per-pixel motion vector |
| Mist | `use_pass_mist` | Distance-based mist factor (0.0–1.0) |
| Ambient Occlusion | `use_pass_ambient_occlusion` | AO contribution |
| Shadow | `use_pass_shadow` | Shadow contribution |
| Object Index | `use_pass_object_index` | Per-object integer mask |
| Material Index | `use_pass_material_index` | Per-material integer mask |
| Emission | `use_pass_emit` | Emissive light contribution |
| Grease Pencil | `use_pass_grease_pencil` | Grease Pencil render in separate pass |

### Diffuse, Glossy, Transmission, Subsurface

Each light interaction type has three sub-passes:

| Suffix | Meaning |
|--------|---------|
| `_direct` | Direct light contribution |
| `_indirect` | Indirect / bounce light contribution |
| `_color` | Albedo / base color |

Examples: `use_pass_diffuse_direct`, `use_pass_glossy_color`, `use_pass_transmission_indirect`, `use_pass_subsurface_direct`.

## Cryptomatte Passes

Cryptomatte encodes per-pixel object/material/asset IDs for accurate mattes in compositing.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `use_pass_cryptomatte_object` | bool | False | Isolate individual objects |
| `use_pass_cryptomatte_material` | bool | False | Isolate individual materials |
| `use_pass_cryptomatte_asset` | bool | False | Isolate objects sharing a parent (asset groups) |
| `use_pass_cryptomatte_accurate` | bool | True | Higher-accuracy cryptomatte (slower) |
| `pass_cryptomatte_depth` | int [2, 16] | 6 | Max unique objects distinguishable per pixel |

Use the Cryptomatte compositor node (`CompositorNodeCryptomatteV2`) to pick mattes interactively from the passes.

## Custom AOVs (Arbitrary Output Variables)

AOVs let shader graphs write arbitrary color or scalar data into named render passes.

### Setup Steps

1. In the View Layer properties → Passes → Shader AOVs panel, click **+** to add an AOV and give it a name (e.g., `"MyColor"`).
2. In a material shader graph, add a **AOV Output** node (`ShaderNodeOutputAOV`), set its name to match, and route a Color or Value into it.
3. After rendering, the named pass appears as an output socket on the Render Layers compositor node.

## Python API Mapping

### Enabling Passes

```python
import bpy

scene = bpy.context.scene
vl = scene.view_layers["ViewLayer"]   # bpy.types.ViewLayer

# Utility passes
vl.use_pass_z            = True
vl.use_pass_normal       = True
vl.use_pass_mist         = True
vl.use_pass_ambient_occlusion = True

# Diffuse / Glossy
vl.use_pass_diffuse_direct   = True
vl.use_pass_diffuse_color    = True
vl.use_pass_glossy_direct    = True

# Emission
vl.use_pass_emit = True

# Cryptomatte
vl.use_pass_cryptomatte_object   = True
vl.use_pass_cryptomatte_material = True
vl.pass_cryptomatte_depth        = 6
```

### Adding an AOV via Python

```python
# Add a custom AOV named "MyColor" to the active view layer
vl = bpy.context.scene.view_layers["ViewLayer"]
aov = vl.aovs.add()
aov.name = "MyColor"
aov.type = 'COLOR'   # 'COLOR' or 'VALUE'
```

### Accessing Pass Sockets in Compositor

```python
scene.use_nodes = True
tree = scene.node_tree

rl = tree.nodes["Render Layers"]
# Access enabled pass outputs by name
z_socket     = rl.outputs["Depth"]
normal_socket = rl.outputs["Normal"]
diffuse_dir  = rl.outputs["DiffDir"]
aov_socket   = rl.outputs["MyColor"]   # custom AOV
```

## Notes

- Pass socket names on the Render Layers node match Blender UI labels, not Python property names (e.g., property `use_pass_z` → socket `"Depth"`).
- Enabling many passes increases render time and memory usage.
- Cryptomatte passes require Cycles or a renderer that supports them; EEVEE support varies by version.
- AOV type must match the shader AOV Output node's data type (Color vs. Value).
- The Denoising Data passes (`use_pass_denoising_data`) enable Albedo and Normal inputs for the Denoise compositor node.

## Related

- [compositor-nodes.md](./compositor-nodes.md)
- [common-setups.md](./common-setups.md)
