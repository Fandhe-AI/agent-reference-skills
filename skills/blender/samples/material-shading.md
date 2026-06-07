---
name: Material and Shading
description: Create node-based materials with Principled BSDF and image textures, then assign them to objects.
---

# Material and Shading

## Overview

Blender materials use a node graph. From Python: create the material, enable `use_nodes`, clear the default nodes, then build the graph manually by creating nodes, setting their inputs, and linking outputs to inputs with `node_tree.links.new()`.

## Complete Example

```python
import bpy

# ── 1. Basic Principled BSDF material ─────────────────────────────────────────
def make_principled_material(name, base_color, roughness=0.5, metallic=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True

    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    # Output node
    out = nodes.new(type='ShaderNodeOutputMaterial')
    out.location = (400, 0)

    # Principled BSDF
    bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    bsdf.location = (0, 0)
    bsdf.inputs['Base Color'].default_value = (*base_color, 1.0)  # RGBA
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = metallic

    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat


mat_gold = make_principled_material(
    "Gold", base_color=(1.0, 0.77, 0.2), roughness=0.1, metallic=1.0
)
mat_rubber = make_principled_material(
    "Rubber", base_color=(0.05, 0.05, 0.05), roughness=0.95, metallic=0.0
)


# ── 2. Add an image texture node ─────────────────────────────────────────────
def add_image_texture(mat, image_path):
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    bsdf = nodes.get("Principled BSDF")
    if bsdf is None:
        raise ValueError("No Principled BSDF node found in material.")

    img_node = nodes.new(type='ShaderNodeTexImage')
    img_node.location = (-350, 0)

    # Load image from disk (raises if file not found)
    img_node.image = bpy.data.images.load(image_path)

    # Connect color output to Base Color
    links.new(img_node.outputs['Color'], bsdf.inputs['Base Color'])
    return img_node


# Uncomment and provide a real path to test:
# add_image_texture(mat_rubber, "/tmp/my_texture.png")


# ── 3. Procedural noise material ─────────────────────────────────────────────
mat_noise = bpy.data.materials.new("NoiseMetal")
mat_noise.use_nodes = True

nodes = mat_noise.node_tree.nodes
links = mat_noise.node_tree.links
nodes.clear()

out      = nodes.new('ShaderNodeOutputMaterial'); out.location      = (600,  0)
bsdf     = nodes.new('ShaderNodeBsdfPrincipled'); bsdf.location     = (200,  0)
ramp     = nodes.new('ShaderNodeValToRGB');       ramp.location     = (-100, 0)
noise    = nodes.new('ShaderNodeTexNoise');       noise.location    = (-400, 0)

noise.inputs['Scale'].default_value   = 20.0
noise.inputs['Detail'].default_value  = 8.0
bsdf.inputs['Metallic'].default_value = 1.0
bsdf.inputs['Roughness'].default_value = 0.15

# Set ColorRamp stops
ramp.color_ramp.elements[0].color = (0.1, 0.1, 0.1, 1.0)
ramp.color_ramp.elements[1].color = (0.9, 0.85, 0.7, 1.0)

links.new(noise.outputs['Fac'],   ramp.inputs['Fac'])
links.new(ramp.outputs['Color'],  bsdf.inputs['Base Color'])
links.new(bsdf.outputs['BSDF'],   out.inputs['Surface'])


# ── 4. Assign materials to objects ───────────────────────────────────────────
bpy.ops.mesh.primitive_uv_sphere_add(location=(0, 0, 0))
sphere = bpy.context.active_object
sphere.data.materials.append(mat_gold)

bpy.ops.mesh.primitive_cube_add(location=(3, 0, 0))
cube = bpy.context.active_object
cube.data.materials.append(mat_noise)

# Replace slot 0 on an existing object
bpy.ops.mesh.primitive_cylinder_add(location=(-3, 0, 0))
cyl = bpy.context.active_object
cyl.data.materials.append(mat_rubber)
# Swap first slot after the fact:
# cyl.material_slots[0].material = mat_gold

print("Materials assigned.")
```

## Key Points

- Always set `mat.use_nodes = True` before accessing `mat.node_tree`; without it the tree does not exist.
- `nodes.clear()` removes the default Principled BSDF + Material Output pair — rebuild both explicitly so their positions and names are predictable.
- Node input values are set via `node.inputs['Input Name'].default_value`; the value type must match (float, tuple for color, etc.).
- `bpy.data.images.load()` loads from disk and caches in `bpy.data.images`; if the same path is loaded twice, call `bpy.data.images.load(path, check_existing=True)`.
- `obj.data.materials.append(mat)` adds the material to the first empty slot. Use `obj.material_slots[i].material = mat` to replace an existing slot.

## Variations

```python
# Emission (glowing) material
mat_emit = bpy.data.materials.new("Glow")
mat_emit.use_nodes = True
nodes = mat_emit.node_tree.nodes
emit = nodes.new('ShaderNodeEmission')
emit.inputs['Color'].default_value = (0.0, 0.8, 1.0, 1.0)
emit.inputs['Strength'].default_value = 5.0
out = nodes.new('ShaderNodeOutputMaterial')
mat_emit.node_tree.links.new(emit.outputs['Emission'], out.inputs['Surface'])

# Transparent / glass
bsdf.inputs['Transmission Weight'].default_value = 1.0
bsdf.inputs['Roughness'].default_value = 0.0
bsdf.inputs['IOR'].default_value = 1.45
```

## Related

- `headless-render.md` — Render the scene with materials applied
- `scene-management.md` — World background and environment lighting
