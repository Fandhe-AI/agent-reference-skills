---
name: EEVEE
description: EEVEE real-time rasterization render engine — shadows, global illumination, reflections, and EEVEE Next (4.2+)
---

# EEVEE

Real-time rasterization engine. Fast interactive rendering suited for animation, NPR, and previsualization. As of Blender 4.2, EEVEE Next replaces the legacy EEVEE with a fully rewritten pipeline.

## Overview

- Rasterizer with screen-space techniques for lighting and shadows
- EEVEE Next (Blender 4.2 LTS): virtual shadow maps, screen-space ray tracing (SSRT) for reflections/refraction, real-time global illumination

## Key Settings

### Engine Activation

```python
import bpy
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT'  # Blender 4.2+
# scene.render.engine = 'BLENDER_EEVEE'     # Legacy (pre-4.2)
```

### Shadows (EEVEE Next)

EEVEE Next uses **Virtual Shadow Maps** — high-resolution shadow rendering that allocates pages on-demand, reducing bias and artifacts.

| Property | Type | Description |
|----------|------|-------------|
| `scene.eevee.shadow_pool_size` | enum | Shadow map memory budget (`'16'`–`'4096'` MB) |
| `scene.eevee.shadow_ray_count` | int | Shadow rays per pixel for soft shadows |
| `scene.eevee.shadow_step_count` | int | Steps for shadow ray marching |

### Global Illumination (EEVEE Next)

Screen-space ray tracing provides indirect lighting and replaces the old Irradiance Volume baking workflow.

| Property | Type | Description |
|----------|------|-------------|
| `scene.eevee.ray_tracing_method` | enum | `'NONE'`, `'SCREEN'` |
| `scene.eevee.ray_tracing_options.resolution_scale` | float | SSRT resolution scale (0.5 = half-res) |
| `scene.eevee.use_shadow_jitter_viewport` | bool | Temporal jitter for smoother shadows |

### Ambient Occlusion

In EEVEE Next, AO is computed via screen-space ray tracing and visible in real-time.

| Property | Type | Description |
|----------|------|-------------|
| `scene.eevee.use_gtao` | bool | Enable ground truth ambient occlusion |
| `scene.eevee.gtao_distance` | float | AO distance (world units) |
| `scene.eevee.gtao_factor` | float | AO strength multiplier |

### Bloom (Legacy EEVEE only — removed in 4.2)

Bloom was removed in EEVEE Next. Use the **Compositor** Glare node with `Bloom` type instead.

```python
# Legacy EEVEE only (pre-4.2)
scene.eevee.use_bloom = True
scene.eevee.bloom_threshold = 0.8
scene.eevee.bloom_intensity = 0.1
```

### Screen Space Reflections (Legacy EEVEE)

In EEVEE Next, reflections are handled by SSRT automatically.

```python
# Legacy EEVEE only (pre-4.2)
scene.eevee.use_ssr = True
scene.eevee.use_ssr_refraction = True
scene.eevee.ssr_quality = 0.25  # 0.0–1.0
```

### Volumetrics

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scene.eevee.volumetric_start` | float | 0.1 | Volume render start distance |
| `scene.eevee.volumetric_end` | float | 100.0 | Volume render end distance |
| `scene.eevee.volumetric_samples` | int | 64 | Volume sample steps |

## Python API Mapping

```python
import bpy

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT'

# Ambient occlusion
scene.eevee.use_gtao = True
scene.eevee.gtao_distance = 0.2
scene.eevee.gtao_factor = 1.0

# Shadows
scene.eevee.shadow_pool_size = '512'

# Ray tracing (reflections / GI)
scene.eevee.ray_tracing_method = 'SCREEN'
```

## Notes

- EEVEE Next (4.2+) engine ID is `'BLENDER_EEVEE_NEXT'`; legacy is `'BLENDER_EEVEE'`
- Bloom is no longer a render property in 4.2+; apply the Glare node in Compositor
- Virtual Shadow Maps in EEVEE Next support much higher resolution than the old cube-size approach
- For Light Probes (Irradiance Volume / Reflection Cubemap), use `bpy.ops.object.lightprobe_cache_bake()`

## Related

- [Cycles](./cycles.md)
- [Lighting](./lighting.md)
- [Render Output](./render-output.md)
