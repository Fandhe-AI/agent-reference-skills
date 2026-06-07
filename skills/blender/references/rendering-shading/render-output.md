---
name: Render Output
description: Resolution, frame rate, file format (PNG/EXR/FFmpeg), color management, output path, and render execution via Python API
---

# Render Output

Render output settings control the final image/video size, format, color pipeline, and file destination. All settings are on `scene.render` (`RenderSettings`) and `scene.view_settings` (`ColorManagedViewSettings`).

## Overview

- `scene.render` — resolution, fps, output path, file format
- `scene.render.image_settings` — file format and bit depth
- `scene.view_settings` — display / output color transform (Filmic, AgX, etc.)
- `bpy.ops.render.render()` — trigger a render

## Signature / Usage

```python
import bpy

scene = bpy.context.scene
render = scene.render

# Resolution
render.resolution_x = 1920
render.resolution_y = 1080
render.resolution_percentage = 100  # 50 = render at half size

# Frame rate
render.fps = 24
render.fps_base = 1.0   # fps / fps_base = actual FPS

# Output path
render.filepath = '/tmp/render/frame_'

# File format
render.image_settings.file_format = 'PNG'
render.image_settings.color_mode = 'RGBA'  # 'BW', 'RGB', 'RGBA'
render.image_settings.color_depth = '16'   # '8', '16'
render.image_settings.compression = 15     # 0–100 (PNG deflate level)

# Render still
bpy.ops.render.render(write_still=True)

# Render animation
bpy.ops.render.render(animation=True)
```

## Key Settings

### Resolution & Frame

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `render.resolution_x` | int | 1920 | Horizontal pixel count |
| `render.resolution_y` | int | 1080 | Vertical pixel count |
| `render.resolution_percentage` | int | 100 | Scale factor (%) |
| `render.fps` | int | 24 | Frames per second numerator |
| `render.fps_base` | float | 1.0 | FPS denominator |
| `render.frame_map_old` | int | 100 | Time remapping old rate |
| `render.frame_map_new` | int | 100 | Time remapping new rate |

### File Format — `render.image_settings`

| `file_format` value | Description |
|--------------------|-------------|
| `'PNG'` | Lossless, supports alpha, 8/16-bit |
| `'JPEG'` | Lossy, no alpha, 8-bit |
| `'OPEN_EXR'` | HDR floating-point, 16/32-bit, multi-layer capable |
| `'OPEN_EXR_MULTILAYER'` | Multi-layer EXR with render passes |
| `'TIFF'` | 8/16/32-bit, lossless |
| `'BMP'` | 8-bit, no alpha |
| `'FFMPEG'` | Video container (MP4, MKV, etc.) |

### FFmpeg Video Output

```python
render.image_settings.file_format = 'FFMPEG'
render.ffmpeg.format = 'MPEG4'          # 'AVI', 'MKV', 'MPEG4', 'WEBM', ...
render.ffmpeg.codec = 'H264'            # 'H264', 'H265', 'VP9', 'AV1', ...
render.ffmpeg.constant_rate_factor = 'MEDIUM'  # Quality preset
render.ffmpeg.ffmpeg_preset = 'GOOD'    # Encode speed preset
render.ffmpeg.audio_codec = 'AAC'
```

### Color Management

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scene.view_settings.view_transform` | str | `'AgX'` (4.0+) | Display transform: `'AgX'`, `'Filmic'`, `'Standard'`, `'Raw'` |
| `scene.view_settings.look` | str | `'None'` | Creative look LUT applied on top of view transform |
| `scene.view_settings.exposure` | float | 0.0 | Exposure offset in stops |
| `scene.view_settings.gamma` | float | 1.0 | Display gamma correction |
| `scene.sequencer_colorspace_settings.name` | str | `'sRGB'` | Sequencer color space |

```python
# Apply AgX with high-contrast look
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - High Contrast'
scene.view_settings.exposure = 0.0
```

### Output Path & File Naming

```python
# Frame number padding: #### = 4-digit zero-padded
render.filepath = '//renders/frame_####'
render.use_file_extension = True   # Auto-append .png, .exr, etc.
render.use_overwrite = True        # Overwrite existing frames
render.use_placeholder = False     # Reserve filenames for farm rendering
```

## Render Operators

| Operator | Description |
|----------|-------------|
| `bpy.ops.render.render(write_still=True)` | Render current frame and save |
| `bpy.ops.render.render(animation=True)` | Render full animation range |
| `bpy.ops.render.opengl(animation=True)` | Viewport OpenGL render |
| `bpy.ops.render.view_show()` | Show render result window |

## Notes

- AgX replaced Filmic as the default view transform in Blender 4.0
- `view_transform` affects display and saved 8/16-bit images; EXR always saves linear data
- `resolution_percentage` is applied before rendering; actual pixel dimensions = `resolution_x * resolution_percentage / 100`
- For batch/headless renders use `blender --background file.blend --render-anim`
- Multi-layer EXR (`OPEN_EXR_MULTILAYER`) preserves all render passes (Diffuse, Specular, Shadow, etc.)

## Related

- [Cycles](./cycles.md)
- [EEVEE](./eevee.md)
- [Freestyle](./freestyle.md)
