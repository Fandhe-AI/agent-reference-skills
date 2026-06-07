---
name: Headless Rendering
description: Render still images and animation sequences from a Python script without a GUI, using Blender's background mode.
---

# Headless Rendering

## Overview

Blender can run entirely without a display using `--background` (`-b`). A Python script loaded with `--python` (`-P`) configures the scene and triggers rendering via `bpy.ops.render.render()`. This pattern is suitable for CI pipelines, batch jobs, and AI-driven asset generation.

## Complete Example

### render.py — the script passed to Blender

```python
"""
Usage:
    blender -b scene.blend -P render.py -- --output /tmp/frames/ --engine CYCLES --samples 128
    blender -b -P render.py            # start from a blank file
"""

import bpy
import sys
import os
import argparse

# ── Parse arguments after the `--` separator ─────────────────────────────────
def parse_args():
    argv = sys.argv
    if "--" in argv:
        argv = argv[argv.index("--") + 1:]
    else:
        argv = []

    parser = argparse.ArgumentParser()
    parser.add_argument("--output",  default="//render/",  help="Output directory (// = relative to .blend)")
    parser.add_argument("--engine",  default="BLENDER_EEVEE_NEXT", choices=["CYCLES", "BLENDER_EEVEE_NEXT"])
    parser.add_argument("--samples", default=64, type=int)
    parser.add_argument("--start",   default=1,  type=int)
    parser.add_argument("--end",     default=1,  type=int)
    return parser.parse_args(argv)

args = parse_args()

# ── Scene setup ───────────────────────────────────────────────────────────────
scene = bpy.context.scene

# Engine
scene.render.engine = args.engine
if args.engine == "CYCLES":
    scene.cycles.samples = args.samples
elif args.engine == "BLENDER_EEVEE_NEXT":
    scene.eevee.taa_render_samples = args.samples

# Resolution
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100

# Output format
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
output_dir = args.output
os.makedirs(bpy.path.abspath(output_dir), exist_ok=True)

# ── Ensure a camera exists ────────────────────────────────────────────────────
if scene.camera is None:
    bpy.ops.object.camera_add(location=(7.36, -6.93, 4.96))
    cam_obj = bpy.context.active_object
    cam_obj.rotation_euler = (1.1, 0.0, 0.785)   # approx 63°, 0°, 45°
    scene.camera = cam_obj

# ── Still image render ────────────────────────────────────────────────────────
if args.start == args.end:
    scene.render.filepath = os.path.join(output_dir, "still.png")
    bpy.ops.render.render(write_still=True)
    print(f"Rendered still → {scene.render.filepath}")

# ── Batch / animation render ─────────────────────────────────────────────────
else:
    scene.frame_start = args.start
    scene.frame_end   = args.end

    for frame in range(args.start, args.end + 1):
        scene.frame_set(frame)
        scene.render.filepath = os.path.join(output_dir, f"frame_{frame:04d}.png")
        bpy.ops.render.render(write_still=True)
        print(f"Rendered frame {frame} → {scene.render.filepath}")
```

### CLI invocations

```bash
# Still image, Cycles, 256 samples
blender -b scene.blend -P render.py -- \
  --output /tmp/stills/ --engine CYCLES --samples 256

# Animation frames 1–24
blender -b scene.blend -P render.py -- \
  --output /tmp/frames/ --engine CYCLES --samples 64 \
  --start 1 --end 24

# EEVEE, blank file (useful for fully procedural scenes)
blender -b -P render.py -- --engine BLENDER_EEVEE_NEXT

# Cycles GPU (append after --)
blender -b scene.blend -P render.py -- --engine CYCLES -- --cycles-device OPTIX
```

## Key Points

- Arguments for your script must come **after** the `--` separator on the CLI; everything before it is consumed by Blender itself.
- `//` at the start of `render.filepath` means "relative to the .blend file location"; use `bpy.path.abspath()` to resolve it.
- Use `#` characters in `filepath` when letting Blender name frames automatically (e.g., `"//frames/frame_####"`). Each `#` becomes a zero-padded digit.
- `bpy.ops.render.render(write_still=True)` renders the current frame and writes to disk; omitting `write_still=True` renders but does not save.
- For GPU rendering with Cycles, set `bpy.context.preferences.addons['cycles'].preferences.compute_device_type = 'CUDA'` (or `'OPTIX'`, `'METAL'`) before rendering.

## Variations

```python
# Render to OpenEXR for compositing pipelines
scene.render.image_settings.file_format = 'OPEN_EXR'
scene.render.image_settings.exr_codec = 'DWAA'

# Enable denoising (Cycles)
scene.cycles.use_denoising = True
scene.cycles.denoiser = 'OPENIMAGEDENOISE'

# Transparent background
scene.render.film_transparent = True
scene.render.image_settings.color_mode = 'RGBA'
```

## Related

- `scene-management.md` — Camera and light setup before rendering
- `material-shading.md` — Apply materials that appear in the render
