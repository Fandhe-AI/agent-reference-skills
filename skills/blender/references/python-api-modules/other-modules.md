---
name: other-modules
description: Blender standalone utility modules — bl_math, blf, aud, imbuf, and idprop.
---

# Other Standalone Modules

Covers `bl_math` (scalar math), `blf` (font/text drawing), `aud` (audio), `imbuf` (image buffers), and `idprop` (custom ID properties).

---

## bl_math

Scalar math utilities for clamping and interpolation.

```python
import bl_math

bl_math.clamp(1.5)              # → 1.0  (default min=0, max=1)
bl_math.clamp(-0.1, 0, 10)     # → 0.0
bl_math.lerp(0.0, 10.0, 0.25)  # → 2.5
bl_math.smoothstep(0, 1, 0.5)  # → 0.5 (smooth S-curve)
```

### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `clamp` | `clamp(value, min=0, max=1)` | Constrain float to `[min, max]` |
| `lerp` | `lerp(from_value, to_value, factor)` | Linear interpolation |
| `smoothstep` | `smoothstep(from_value, to_value, value)` | Hermite smooth interpolation returning `[0, 1]` |

---

## blf

Font and text drawing in the GPU context. Font IDs are integers; use `0` for the default font or load custom fonts with `blf.load()`.

```python
import blf, bpy

def draw_text(context):
    font_id = 0
    blf.position(font_id, 50, 50, 0)
    blf.size(font_id, 24)
    blf.color(font_id, 1.0, 1.0, 1.0, 1.0)
    blf.draw(font_id, "Hello Blender")

handle = bpy.types.SpaceView3D.draw_handler_add(
    draw_text, (None,), 'WINDOW', 'POST_PIXEL'
)
```

### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `blf.load` | `load(filepath)` | Load a font file, returns font ID |
| `blf.position` | `position(fontid, x, y, z)` | Set text origin (z usually 0) |
| `blf.size` | `size(fontid, size)` | Font point size (float) |
| `blf.color` | `color(fontid, r, g, b, a)` | RGBA text color `[0, 1]` |
| `blf.draw` | `draw(fontid, text)` | Render text to GPU context |
| `blf.draw_buffer` | `draw_buffer(fontid, text)` | Render text into bound `imbuf` buffer |
| `blf.shadow` | `shadow(fontid, level, r, g, b, a)` | Shadow blur: `0` (none), `3`, `5`, `6` (outline) |
| `blf.shadow_offset` | `shadow_offset(fontid, x, y)` | Shadow pixel offset |
| `blf.dimensions` | `dimensions(fontid, text)` | Returns `(width, height)` floats |
| `blf.boundbox` | `boundbox(fontid, text)` | Returns `(xmin, ymin, xmax, ymax)` |
| `blf.word_wrap` | `word_wrap(fontid, wrap_width)` | Pixel width for line wrapping |
| `blf.enable` | `enable(fontid, option)` | Enable feature flag |
| `blf.disable` | `disable(fontid, option)` | Disable feature flag |

Feature flags for `enable` / `disable`: `'ROTATION'`, `'CLIPPING'`, `'SHADOW'`, `'MONOCHROME'`, `'WORD_WRAP'`

---

## aud

High-level audio library (Audaspace) for playback, processing, and 3D positional audio.

```python
import aud

device = aud.Device()
sound  = aud.Sound.file("music.ogg")
handle = device.play(sound)
handle.volume = 0.5
handle.stop()
```

### aud.Device

| Method / Property | Description |
|-------------------|-------------|
| `play(sound, keep=False)` | Start playback; returns `Handle` |
| `stopAll()` | Stop all sounds |
| `lock()` / `unlock()` | Synchronize multiple operations |
| `volume` | Master output volume |
| `listener_location` | 3D listener position |
| `listener_orientation` | 3D listener orientation (quaternion) |
| `distance_model` | Attenuation model constant |

### aud.Sound — Factory Methods

| Method | Description |
|--------|-------------|
| `Sound.file(filename)` | Load from disk |
| `Sound.buffer(data, rate)` | Create from raw data array |
| `Sound.sine(frequency, rate)` | Sine wave generator |
| `Sound.silence(rate)` | Silence generator |

### aud.Sound — Processing Methods (chainable)

| Method | Description |
|--------|-------------|
| `cache()` | Buffer entire sound to RAM |
| `loop(count)` | Loop `count` times (-1 = infinite) |
| `pitch(factor)` | Pitch shift |
| `volume(volume)` | Amplitude scale |
| `fadein(start, length)` | Volume fade in |
| `fadeout(start, length)` | Volume fade out |
| `highpass(frequency, Q)` | High-pass filter |
| `lowpass(frequency, Q)` | Low-pass filter |
| `delay(time)` | Prepend silence |
| `reverse()` | Play backwards |
| `join(sound)` | Concatenate |
| `mix(sound)` | Blend two sounds |
| `ADSR(attack, decay, sustain, release)` | Envelope shaping |

### aud.Handle

| Property / Method | Description |
|-------------------|-------------|
| `pause()` / `resume()` / `stop()` | Playback control |
| `position` | Current seek position (seconds) |
| `volume` | Per-handle volume |
| `pitch` | Per-handle pitch |
| `loop_count` | Remaining loops |
| `location` | 3D position |
| `status` | `STATUS_PLAYING`, `STATUS_PAUSED`, `STATUS_STOPPED` |

### Constants

Format: `FORMAT_U8`, `FORMAT_S16`, `FORMAT_S32`, `FORMAT_FLOAT32`, `FORMAT_FLOAT64`  
Channels: `CHANNELS_MONO`, `CHANNELS_STEREO`  
Status: `STATUS_PLAYING`, `STATUS_PAUSED`, `STATUS_STOPPED`

---

## imbuf

Image buffer I/O and manipulation.

```python
import imbuf

# Load
img = imbuf.load("/path/to/image.png")
print(img.size)        # (width, height)

# Create
img = imbuf.new((512, 512), planes=32, buffer_type='FLOAT')

# Save
imbuf.write(img, "/path/to/out.png")
```

### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `imbuf.load` | `load(filepath)` | Load image from disk; returns `ImBuf` |
| `imbuf.new` | `new(size, planes=24, buffer_type='BYTE')` | Create blank image |
| `imbuf.write` | `write(image, filepath=None)` | Save image (uses internal path if `filepath` is `None`) |
| `imbuf.load_from_buffer` | `load_from_buffer(buffer)` | Load from in-memory bytes |
| `imbuf.write_to_buffer` | `write_to_buffer(image)` | Export to bytes (e.g., `io.BytesIO`) |
| `imbuf.file_type_from_buffer` | `file_type_from_buffer(buffer)` | Detect format from binary data |

### ImBuf Properties and Methods

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `size` | `(int, int)` | Width × height in pixels |
| `channels` | `int` | Number of color channels |
| `planes` | `int` | Bits per pixel (8/16/24/32) |
| `filepath` | `str` | Associated file path |
| `buffer_type` | `str` | `'BYTE'` or `'FLOAT'` |
| `file_type` | `str` | Format identifier |
| `ppm` | `(float, float)` | Pixels per meter |
| `copy()` | `ImBuf` | Return a copy |
| `resize(size, method='FAST')` | — | Resize in-place; `method`: `'FAST'` or `'BILINEAR'` |
| `crop(min, max)` | — | Crop in-place by pixel coordinate tuples |
| `convert_buffer_type(buffer_type)` | — | Convert between `'BYTE'` and `'FLOAT'` |
| `with_buffer(write=False, region=None)` | context manager | Yields `memoryview` shaped `(height, width, channels)` |

---

## idprop

Custom property utilities for Blender ID data-blocks.

```python
import idprop

# idprop.types provides array types used internally for custom properties
arr = idprop.types.IDPropertyArray  # e.g. bpy.context.object["my_arr"]
grp = idprop.types.IDPropertyGroup  # dict-like custom property group
```

Custom properties on any ID (Object, Mesh, Bone, etc.) are accessed via `[]` notation:

```python
obj = bpy.context.object
obj["my_float"] = 3.14
obj["my_array"] = [1, 2, 3]
print(obj.id_properties_ui("my_float"))
```

`idprop.types.IDPropertyArray` and `idprop.types.IDPropertyGroup` are the runtime types returned when reading list/dict custom properties; they are not normally instantiated directly.

---

## Notes

- `blf` drawing must occur inside a registered draw handler or a modal operator's `modal()` call in a draw context
- `aud.Device()` with no arguments uses the system default audio backend
- `imbuf` supports common formats (PNG, JPEG, EXR, TIFF); format is detected from the file extension on write
- `bl_math.smoothstep` uses the standard cubic Hermite formula: `t² (3 − 2t)` after clamping

## Related

- [gpu.md](./gpu.md)
- [bmesh.md](./bmesh.md)
