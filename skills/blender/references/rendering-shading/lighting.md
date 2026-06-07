---
name: Lighting
description: Light types (Point, Sun, Spot, Area), World HDRI/Sky lighting, Light Probes, Python API for light creation and configuration
---

# Lighting

Blender lights are objects whose data-block is a `Light` subtype. World lighting provides environment and ambient illumination via a node tree.

## Overview

- Four light types: `POINT`, `SUN`, `SPOT`, `AREA`
- Accessed via `bpy.data.lights` or the linked object's `.data`
- World (`bpy.data.worlds`) provides global environment lighting through a shader node tree

## Signature / Usage

```python
import bpy

# Create a point light
light_data = bpy.data.lights.new(name="MyLight", type='POINT')
light_data.energy = 1000.0   # Watts
light_data.color = (1.0, 0.9, 0.8)

light_obj = bpy.data.objects.new(name="MyLight", object_data=light_data)
bpy.context.collection.objects.link(light_obj)
light_obj.location = (2.0, -2.0, 4.0)
```

## Light Types

| Type Enum | `bpy.types` | Description |
|-----------|-------------|-------------|
| `'POINT'` | `PointLight` | Omnidirectional point source |
| `'SUN'` | `SunLight` | Infinite parallel rays (directional) |
| `'SPOT'` | `SpotLight` | Directional cone light |
| `'AREA'` | `AreaLight` | Rectangular / disk area source |

## Common Light Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `light.color` | float[3] | `(1, 1, 1)` | RGB color |
| `light.energy` | float | 10.0 | Power in Watts (radiant flux) |
| `light.use_shadow` | bool | True | Cast shadows |
| `light.diffuse_factor` | float | 1.0 | Diffuse contribution multiplier |
| `light.specular_factor` | float | 1.0 | Specular contribution multiplier |
| `light.volume_factor` | float | 1.0 | Volume contribution multiplier |
| `light.use_custom_distance` | bool | False | Use custom cutoff distance |
| `light.cutoff_distance` | float | 40.0 | Distance beyond which light = 0 |
| `light.use_temperature` | bool | False | Use Kelvin color temperature |
| `light.temperature` | float | 6500.0 | Color temperature in K (800–20000) |

## Type-Specific Properties

### PointLight

```python
light = bpy.data.lights.new("Point", type='POINT')
light.energy = 1000.0   # Watts
light.shadow_soft_size = 0.1  # Radius for soft shadows
```

### SunLight

```python
light = bpy.data.lights.new("Sun", type='SUN')
light.energy = 5.0         # Irradiance W/m²
light.angle = 0.00918      # Angular diameter (radians; default ≈ 0.526°)
```

| Property | Description |
|----------|-------------|
| `angle` | Angular diameter of the sun disc — controls shadow softness |
| `energy` | Strength in W/m² |

### SpotLight

```python
light = bpy.data.lights.new("Spot", type='SPOT')
light.energy = 500.0
light.spot_size = 0.785398  # 45 degrees in radians
light.spot_blend = 0.15     # Softness of cone edge (0 = hard, 1 = soft)
```

| Property | Description |
|----------|-------------|
| `spot_size` | Cone angle in radians |
| `spot_blend` | Penumbra softness (0–1) |
| `show_cone` | Visualize the cone in viewport |

### AreaLight

```python
light = bpy.data.lights.new("Area", type='AREA')
light.energy = 200.0
light.shape = 'RECTANGLE'  # 'SQUARE', 'DISK', 'ELLIPSE'
light.size = 1.0    # X dimension
light.size_y = 0.5  # Y dimension (RECTANGLE/ELLIPSE only)
```

| Property | Description |
|----------|-------------|
| `shape` | `'SQUARE'`, `'RECTANGLE'`, `'DISK'`, `'ELLIPSE'` |
| `size` | Width (X) |
| `size_y` | Height (Y) for non-square shapes |
| `spread` | Cone spread angle (Cycles) |

## World Lighting (HDRI / Sky)

```python
import bpy

world = bpy.context.scene.world
world.use_nodes = True

nodes = world.node_tree.nodes
links = world.node_tree.links
nodes.clear()

# Environment texture (HDRI)
tex_node = nodes.new('ShaderNodeTexEnvironment')
tex_node.image = bpy.data.images.load('/path/to/hdri.hdr')

bg_node = nodes.new('ShaderNodeBackground')
bg_node.inputs['Strength'].default_value = 1.0

out_node = nodes.new('ShaderNodeOutputWorld')

links.new(tex_node.outputs['Color'], bg_node.inputs['Color'])
links.new(bg_node.outputs['Background'], out_node.inputs['Surface'])
```

For a procedural sky, replace `ShaderNodeTexEnvironment` with `ShaderNodeTexSky`:

```python
sky = nodes.new('ShaderNodeTexSky')
sky.sky_type = 'NISHITA'   # 'PREETHAM', 'HOSEK_WILKIE', 'NISHITA'
```

## Notes

- All energies in Blender use physically based units (Watts, W/m²) — match real-world values for accuracy
- `use_shadow` disabling on a light skips shadow computation entirely for that light (performance gain in EEVEE)
- World `Strength` (background node) acts as exposure multiplier for HDRI
- For EEVEE Light Probes (irradiance baking), use `bpy.ops.object.lightprobe_cache_bake()`
- SunLight's `angle` controls both soft shadows (Cycles) and the apparent size of the sun disc

## Related

- [Cycles](./cycles.md)
- [EEVEE](./eevee.md)
- [Materials & Shader Nodes](./materials-nodes.md)
