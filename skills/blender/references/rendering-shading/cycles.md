---
name: Cycles
description: Cycles ray-tracing render engine — sampling, denoising, device, and light path settings
---

# Cycles

Physically-based path-tracing render engine. Produces photorealistic results by simulating light transport. Supports CPU and GPU rendering (CUDA, OptiX, HIP, Metal).

## Overview

- Path tracer: each pixel fires rays that bounce through the scene accumulating light
- Adaptive sampling stops rays once a per-pixel noise threshold is reached
- Denoising (OpenImageDenoise or OptiX) removes residual noise after sampling

## Key Settings

### Engine Activation

```python
import bpy
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
```

### Sampling

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scene.cycles.samples` | int | 128 | Max samples per pixel |
| `scene.cycles.use_adaptive_sampling` | bool | True | Stop early when noise threshold is met |
| `scene.cycles.adaptive_threshold` | float | 0.01 | Noise threshold (0.001 = high quality) |
| `scene.cycles.adaptive_min_samples` | int | 0 | Min samples before adaptive sampling kicks in (0 = auto) |
| `scene.cycles.time_limit` | float | 0.0 | Render time limit in seconds (0 = disabled) |

### Denoising

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scene.cycles.use_denoising` | bool | True | Enable denoising on final render |
| `scene.cycles.denoiser` | enum | `'OPENIMAGEDENOISE'` | `'OPENIMAGEDENOISE'` (CPU/GPU, default) or `'OPTIX'` (NVIDIA only) |
| `scene.cycles.denoising_input_passes` | enum | `'RGB_ALBEDO_NORMAL'` | Passes fed to denoiser |
| `scene.cycles.denoising_prefilter` | enum | `'ACCURATE'` | Prefilter quality for OIDN |

### Device

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scene.cycles.device` | enum | `'CPU'` | `'CPU'` or `'GPU'` |

GPU device backend is set via preferences:

```python
prefs = bpy.context.preferences.addons["cycles"].preferences
prefs.compute_device_type = 'OPTIX'   # 'CUDA', 'OPTIX', 'HIP', 'ONEAPI', 'METAL'
prefs.get_devices()
scene.cycles.device = 'GPU'
```

### Light Paths / Bounces

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scene.cycles.max_bounces` | int | 12 | Total maximum bounces |
| `scene.cycles.diffuse_bounces` | int | 4 | Diffuse bounce limit |
| `scene.cycles.glossy_bounces` | int | 4 | Glossy bounce limit |
| `scene.cycles.transmission_bounces` | int | 12 | Transmission bounce limit |
| `scene.cycles.volume_bounces` | int | 0 | Volume scatter bounce limit |
| `scene.cycles.transparent_max_bounces` | int | 8 | Transparency bounce limit |

## Python API Mapping

```python
import bpy

scene = bpy.context.scene
scene.render.engine = 'CYCLES'

# Sampling
scene.cycles.samples = 256
scene.cycles.use_adaptive_sampling = True
scene.cycles.adaptive_threshold = 0.005

# Denoising
scene.cycles.use_denoising = True
scene.cycles.denoiser = 'OPENIMAGEDENOISE'

# GPU
scene.cycles.device = 'GPU'

# Light paths
scene.cycles.max_bounces = 8
scene.cycles.diffuse_bounces = 4
scene.cycles.glossy_bounces = 4
```

## Notes

- OptiX denoiser requires an NVIDIA GPU and driver >= 535
- OpenImageDenoise (OIDN) runs on CPU or GPU and is the default in Blender 4.x
- Adaptive sampling threshold: lower value = higher quality, longer render (typical range 0.001–0.1)
- `transparent_max_bounces` is separate from `max_bounces` and controls glass/alpha transparency
- GPU memory overflow falls back to system RAM automatically (slower but functional)

## Related

- [EEVEE](./eevee.md)
- [Render Output](./render-output.md)
- [Lighting](./lighting.md)
