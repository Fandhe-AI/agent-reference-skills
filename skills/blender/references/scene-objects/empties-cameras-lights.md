---
name: Empties, Cameras & Lights
description: Empty display types, Camera lens/sensor/DOF/ortho settings, scene.camera, and Light types and properties.
---

# Empties, Cameras & Lights

These three object types share the Object datablock but carry different Object Data: `None` (Empty), `bpy.types.Camera`, or `bpy.types.Light`.

## Overview

| Object Type | Object Data Type | `bpy.data` collection |
|-------------|------------------|-----------------------|
| Empty | `None` | — |
| Camera | `bpy.types.Camera` | `bpy.data.cameras` |
| Light | `bpy.types.Light` | `bpy.data.lights` |

---

## Empty

An Empty has no renderable geometry. It is used as a parent/pivot, a collection instance origin, a custom shape guide, or a motion-path target.

### Properties (on the Object, not data)

| Property | Type | Description |
|----------|------|-------------|
| `empty_display_type` | `str` | Visual shape: `'PLAIN_AXES'`, `'ARROWS'`, `'SINGLE_ARROW'`, `'CIRCLE'`, `'CUBE'`, `'SPHERE'`, `'CONE'`, `'IMAGE'` |
| `empty_display_size` | `float` | Display size in scene units (default `1.0`) |
| `empty_image_offset` | `float[2]` | Image offset (when type is `'IMAGE'`) |
| `instance_type` | `str` | `'NONE'`, `'COLLECTION'`, `'VERTS'`, `'FACES'` |

### Python API

```python
import bpy

# Add an empty and configure it
bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0, 0, 0))
empty = bpy.context.active_object
empty.name = "RigRoot"
empty.empty_display_type = 'CUBE'
empty.empty_display_size = 0.5
```

---

## Camera

The `Camera` datablock holds lens and sensor settings independent of the Object transform.

### Camera Properties (`bpy.types.Camera`)

| Property | Type | Description |
|----------|------|-------------|
| `type` | `str` | `'PERSP'`, `'ORTHO'`, `'PANO'` |
| `lens` | `float` | Focal length in mm (perspective; default `50.0`) |
| `lens_unit` | `str` | `'MILLIMETERS'` or `'FOV'` |
| `angle` | `float` | Horizontal field of view (radians; read-only when using mm) |
| `sensor_width` | `float` | Sensor width in mm (default `36.0`) |
| `sensor_height` | `float` | Sensor height in mm (default `24.0`) |
| `sensor_fit` | `str` | `'AUTO'`, `'HORIZONTAL'`, `'VERTICAL'` |
| `ortho_scale` | `float` | Orthographic zoom / viewport size (default `6.0`) |
| `clip_start` | `float` | Near clip distance (default `0.1`) |
| `clip_end` | `float` | Far clip distance (default `1000.0`) |
| `shift_x` | `float` | Horizontal lens shift (2-point perspective) |
| `shift_y` | `float` | Vertical lens shift |
| `dof` | `CameraDOFSettings` | Depth-of-field sub-object (readonly) |

### Depth of Field (`cam.dof`)

| Property | Type | Description |
|----------|------|-------------|
| `use_dof` | `bool` | Enable DOF |
| `focus_object` | `Object` or `None` | Auto-focus target |
| `focus_distance` | `float` | Manual focus distance in scene units |
| `aperture_fstop` | `float` | F-stop (lower = more blur; default `2.8`) |

### Setting the Active Render Camera

```python
import bpy

scene = bpy.context.scene

# Create a camera and set it as the scene camera
cam_data = bpy.data.cameras.new("MainCam")
cam_data.lens = 35.0
cam_data.clip_end = 5000.0

cam_obj = bpy.data.objects.new("MainCam", cam_data)
scene.collection.objects.link(cam_obj)
scene.camera = cam_obj            # active render camera
```

---

## Light

Light objects illuminate the scene. The `Light` datablock (in `bpy.data.lights`) holds type-specific settings.

### Common Light Properties (`bpy.types.Light`)

| Property | Type | Description |
|----------|------|-------------|
| `type` | `str` | `'POINT'`, `'SUN'`, `'SPOT'`, `'AREA'` |
| `energy` | `float` | Emitted power (Watts for Cycles; default `10.0`) |
| `color` | `Color` (3) | RGB emission color |
| `specular_factor` | `float` | Specular contribution multiplier (default `1.0`) |
| `diffuse_factor` | `float` | Diffuse contribution multiplier (default `1.0`) |
| `use_shadow` | `bool` | Enable shadow casting |
| `shadow_soft_size` | `float` | Source radius for soft shadows (Point/Sun) |
| `cutoff_distance` | `float` | Hard light attenuation cutoff |

### Type-Specific Properties

| Type | Extra Properties |
|------|-----------------|
| `SPOT` | `spot_size` (cone angle, radians), `spot_blend` (softness), `use_square` |
| `AREA` | `shape` (`'SQUARE'`, `'RECTANGLE'`, `'DISK'`, `'ELLIPSE'`), `size`, `size_y` |
| `SUN` | `angle` (angular diameter), `shadow_cascade_count` |

### Python API

```python
import bpy

scene = bpy.context.scene

# Add a point light
light_data = bpy.data.lights.new("Fill", type='POINT')
light_data.energy = 500.0
light_data.color = (1.0, 0.9, 0.8)
light_data.shadow_soft_size = 0.5

light_obj = bpy.data.objects.new("Fill", light_data)
light_obj.location = (3, -2, 4)
scene.collection.objects.link(light_obj)

# Add a sun light
sun_data = bpy.data.lights.new("Sun", type='SUN')
sun_data.energy = 3.0
sun_obj = bpy.data.objects.new("Sun", sun_data)
scene.collection.objects.link(sun_obj)
```

## Notes

- `scene.camera` determines the render-camera; it can point to any camera object in any collection as long as it is linked to the scene.
- Camera lens/sensor settings only affect perspective projection. For orthographic renders, use `type='ORTHO'` and set `ortho_scale`.
- `light_data.energy` units depend on the renderer (Cycles uses physical watts; Eevee uses arbitrary units scaled by the same property).
- Blender's UPBGE API documents `exposure` instead of `energy` for some contexts — in standard Blender scripting, use `energy`.

## Related

- [Objects & Transform](./objects-transform.md)
- [World & Scene Settings](./world-scene.md)
