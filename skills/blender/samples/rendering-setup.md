---
name: Rendering Setup
description: Configure Cycles and EEVEE render engines, sampling, denoising, color management, render passes, and GPU devices from Python.
---

# Rendering Setup

## Overview

All render configuration lives under `bpy.context.scene.render`, `scene.cycles`, `scene.eevee`, and `bpy.context.view_layer`. GPU device selection for Cycles requires accessing `bpy.context.preferences.addons['cycles'].preferences`.

## Complete Example

```python
import bpy

scene = bpy.context.scene
render = scene.render

# ═══════════════════════════════════════════════════════════════════════════════
# PART A — Engine selection
# ═══════════════════════════════════════════════════════════════════════════════

# Choose engine: 'CYCLES' or 'BLENDER_EEVEE_NEXT' (Blender 4.2+)
render.engine = 'CYCLES'

# ═══════════════════════════════════════════════════════════════════════════════
# PART B — Cycles settings
# ═══════════════════════════════════════════════════════════════════════════════

cycles = scene.cycles

# Sampling
cycles.samples              = 256      # render samples per pixel
cycles.preview_samples      = 32       # viewport samples
cycles.adaptive_threshold   = 0.01     # stop early when noise < threshold
cycles.use_adaptive_sampling = True

# Denoising
cycles.use_denoising  = True
cycles.denoiser       = 'OPENIMAGEDENOISE'   # or 'OPTIX' for NVIDIA
cycles.denoising_input_passes = 'RGB_ALBEDO_NORMAL'

# Light paths
cycles.max_bounces            = 12
cycles.diffuse_bounces        = 4
cycles.glossy_bounces         = 4
cycles.transmission_bounces   = 12
cycles.volume_bounces         = 0
cycles.transparent_max_bounces = 8

# ═══════════════════════════════════════════════════════════════════════════════
# PART C — EEVEE settings (switch engine first to inspect)
# ═══════════════════════════════════════════════════════════════════════════════

render.engine = 'BLENDER_EEVEE_NEXT'
eevee = scene.eevee

eevee.taa_render_samples    = 64   # temporal anti-aliasing samples
eevee.use_shadows            = True
eevee.shadow_ray_count       = 1
eevee.use_gtao               = True   # ambient occlusion
eevee.gtao_distance          = 0.2

# Switch back to Cycles for the rest of this example
render.engine = 'CYCLES'

# ═══════════════════════════════════════════════════════════════════════════════
# PART D — Color management
# ═══════════════════════════════════════════════════════════════════════════════

cm = scene.view_settings
cm.view_transform  = 'AgX'         # 'Filmic', 'AgX', 'Standard', 'Raw'
cm.look            = 'None'        # 'AgX - High Contrast', etc.
cm.exposure        = 0.0
cm.gamma           = 1.0

scene.sequencer_colorspace_settings.name = 'sRGB'

# ═══════════════════════════════════════════════════════════════════════════════
# PART E — Render passes (AOVs) on the active View Layer
# ═══════════════════════════════════════════════════════════════════════════════

view_layer = bpy.context.view_layer

# Built-in passes
view_layer.use_pass_combined       = True
view_layer.use_pass_z              = True    # depth
view_layer.use_pass_normal         = True
view_layer.use_pass_diffuse_color  = True
view_layer.use_pass_glossy_color   = True
view_layer.use_pass_shadow         = True

# Cycles-only passes
view_layer.use_pass_ambient_occlusion = True

# Custom AOV (Arbitrary Output Variable)
aov = view_layer.aovs.add()
aov.name = "CustomColor"
aov.type = 'COLOR'

# ═══════════════════════════════════════════════════════════════════════════════
# PART F — GPU device configuration (Cycles only)
# ═══════════════════════════════════════════════════════════════════════════════

cycles.device = 'GPU'    # 'CPU' or 'GPU'

cprefs = bpy.context.preferences.addons['cycles'].preferences

# Select backend: 'CUDA', 'OPTIX' (NVIDIA), 'HIP' (AMD), 'METAL' (Apple)
cprefs.compute_device_type = 'CUDA'

# Refresh device list so Blender detects available GPUs
cprefs.get_devices()

for device in cprefs.devices:
    if device.type == 'CUDA':
        device.use = True     # enable all CUDA GPUs
    else:
        device.use = False    # disable CPU to use GPU only

# ═══════════════════════════════════════════════════════════════════════════════
# PART G — Output settings
# ═══════════════════════════════════════════════════════════════════════════════

render.resolution_x          = 1920
render.resolution_y          = 1080
render.resolution_percentage = 100
render.fps                   = 24

render.image_settings.file_format = 'OPEN_EXR_MULTILAYER'  # preserves all passes
render.image_settings.color_depth = '32'
render.filepath = "//renders/frame_####"

print("Render engine:", render.engine)
print("Samples:", cycles.samples)
print("View transform:", scene.view_settings.view_transform)
print("Active passes: Z =", view_layer.use_pass_z,
      "| Normal =", view_layer.use_pass_normal)
```

## Key Points

- `BLENDER_EEVEE_NEXT` is the correct engine identifier from Blender 4.2+; older builds used `BLENDER_EEVEE`.
- `cprefs.get_devices()` must be called before iterating `cprefs.devices`; in background mode the list can be empty until refreshed.
- `use_pass_*` flags are per `ViewLayer`; a scene with multiple view layers needs each configured separately.
- `OPEN_EXR_MULTILAYER` is the only format that stores all render passes in a single file; use `PNG` when only the Combined pass is needed.

## Variations

```python
# Transparent background (Cycles & EEVEE)
render.film_transparent = True
render.image_settings.color_mode = 'RGBA'

# Motion blur (Cycles)
render.use_motion_blur = True
scene.cycles.motion_blur_position = 'CENTER'

# Render border (crop region)
render.use_border      = True
render.border_min_x    = 0.25
render.border_max_x    = 0.75
render.border_min_y    = 0.25
render.border_max_y    = 0.75
render.use_crop_to_border = True

# Tile size (Cycles — manual override, usually auto)
scene.cycles.tile_size = 2048
```

## Related

- [headless-render.md](./headless-render.md) — Trigger renders from CLI / background mode
- [compositing-nodes.md](./compositing-nodes.md) — Consume render passes in the compositor
- [scene-management.md](./scene-management.md) — Camera and light configuration
