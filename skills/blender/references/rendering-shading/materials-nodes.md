---
name: Materials & Shader Nodes
description: Material data-blocks, node trees, Principled BSDF, texture and utility nodes, Python API for node creation and linking
---

# Materials & Shader Nodes

Materials in Blender are data-blocks containing a shader `node_tree`. Node-based shading applies to both Cycles and EEVEE.

## Overview

- Since 5.0, `bpy.data.materials.new()` creates a default node tree; `Material.use_nodes` is deprecated (always `True`, setting it has no effect)
- Nodes are created via `node_tree.nodes.new(type)` and connected via `node_tree.links.new(output, input)`
- The Principled BSDF node models most real-world materials using the OpenPBR / Disney model

## Signature / Usage

```python
import bpy

# Create a new material
mat = bpy.data.materials.new(name="MyMaterial")
# mat.use_nodes = True  # Deprecated since 5.0, no effect; the default node tree already exists

nodes = mat.node_tree.nodes
links = mat.node_tree.links

# Clear default nodes
nodes.clear()

# Add Principled BSDF
bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
bsdf.inputs['Base Color'].default_value = (0.8, 0.2, 0.1, 1.0)  # RGBA
bsdf.inputs['Metallic'].default_value = 0.0
bsdf.inputs['Roughness'].default_value = 0.5

# Add Material Output
output = nodes.new(type='ShaderNodeOutputMaterial')

# Link BSDF → Output
links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])

# Assign to active object
bpy.context.object.data.materials.append(mat)
```

## Shader Nodes

### Principled BSDF — `ShaderNodeBsdfPrincipled`

Combines diffuse, specular, transmission, subsurface, coat, and sheen in one node. Based on OpenPBR Surface (Blender 4.0+).

| Input | Type | Description |
|-------|------|-------------|
| `Base Color` | RGBA | Albedo color |
| `Metallic` | float | 0 = dielectric, 1 = metal |
| `Roughness` | float | Surface microsurface roughness |
| `IOR` | float | Index of refraction (default 1.5) |
| `Transmission Weight` | float | Glass/refraction blend |
| `Subsurface Weight` | float | SSS blend factor |
| `Coat Weight` | float | Clear coat layer |
| `Emission Color` | RGBA | Self-emission color |
| `Emission Strength` | float | Emission intensity |
| `Alpha` | float | Transparency (requires blend mode) |
| `Normal` | Vector | Surface normal override |

### Other Shader Nodes

| Node Type | Description |
|-----------|-------------|
| `ShaderNodeEmission` | Pure emissive surface — color + strength |
| `ShaderNodeBsdfGlass` | Refractive glass BSDF |
| `ShaderNodeBsdfTransparent` | Alpha pass-through |
| `ShaderNodeMixShader` | Blend two shaders by factor |
| `ShaderNodeAddShader` | Additive shader combination |

## Texture Nodes

| Node Type | Key Inputs | Description |
|-----------|-----------|-------------|
| `ShaderNodeTexImage` | `image`, `Vector` | Load image file as texture |
| `ShaderNodeTexNoise` | `Scale`, `Detail`, `Roughness` | Procedural Perlin noise |
| `ShaderNodeTexVoronoi` | `Scale`, `Feature` | Voronoi / cell noise |
| `ShaderNodeTexMusgrave` | `Scale`, `Detail` | Fractal multi-octave noise (merged into Noise 4.1+) |
| `ShaderNodeTexWave` | `Scale`, `Distortion` | Wave / ring pattern |
| `ShaderNodeTexGradient` | `Vector`, `Type` | Linear/spherical/radial gradients |

## Input / Coordinate Nodes

| Node Type | Description |
|-----------|-------------|
| `ShaderNodeTexCoord` | UV, Object, Camera, Generated, Normal, Reflection coordinates |
| `ShaderNodeMapping` | Transform texture coordinates (location, rotation, scale) |
| `ShaderNodeGeometry` | Position, Normal, Tangent, Backface |
| `ShaderNodeFresnel` | IOR-based Fresnel factor |
| `ShaderNodeLayerWeight` | Facing / blend weights for layering |

## Notes

- Deprecated (5.0): `material.use_nodes`, removal planned for 6.0. It always returns `True` and setting it has no effect; `bpy.data.materials.new()` now creates a default node tree (PR#141278). Release-notes Old/New:
  ```python
  # Old way of creating a default material node tree
  mat = bpy.data.materials.new("My new material")
  obj.active_material = mat
  mat.use_nodes = True # Creates a default node tree

  # New way of creating a default material node tree
  mat = bpy.data.materials.new("My new material") # Creates a default node tree
  obj.active_material = mat
  mat.use_nodes = True # Deprecated, has no effect.
  ```
- Before 5.0, `mat.node_tree` was `None` when `use_nodes` was False
- Node type strings use the `bpy.types.*` class name (e.g. `'ShaderNodeBsdfPrincipled'`)
- Inputs/outputs can be referenced by name (`inputs['Base Color']`) or index (`inputs[0]`)
- Setting `mat.blend_method = 'BLEND'` and `mat.shadow_method = 'HASHED'` enables alpha transparency in EEVEE
- Principled BSDF inputs were renamed in Blender 4.0 (e.g., `Specular` → `Specular IOR Level`)
- Image texture node: set `node.image = bpy.data.images.load('/path/to/img.png')`

## Related

- [Lighting](./lighting.md)
- [Cycles](./cycles.md)
- [EEVEE](./eevee.md)
