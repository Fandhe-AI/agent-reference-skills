---
name: gpu / gpu_extras
description: Blender's GPU rendering module for custom shaders, vertex buffers, batches, and viewport overlay drawing.
---

# gpu / gpu_extras

Provides Python wrappers for Blender's GPU implementation, enabling custom vertex/fragment shaders, vertex buffer objects, index buffers, batches, and viewport overlay drawing via draw handlers.

## Signature / Usage

```python
import gpu
from gpu_extras.batch import batch_for_shader
import bpy

coords = [(0, 0, 0), (1, 0, 0), (0.5, 1, 0)]
colors = [(1, 0, 0, 1), (0, 1, 0, 1), (0, 0, 1, 1)]

shader = gpu.shader.from_builtin('SMOOTH_COLOR')
batch = batch_for_shader(shader, 'TRIS', {"pos": coords, "color": colors})

def draw():
    shader.bind()
    batch.draw(shader)

handle = bpy.types.SpaceView3D.draw_handler_add(draw, (), 'WINDOW', 'POST_VIEW')
# To remove: bpy.types.SpaceView3D.draw_handler_remove(handle, 'WINDOW')
```

## gpu.shader

### Built-in Shaders

`gpu.shader.from_builtin(shader_name)` returns a `GPUShader`.

| Identifier | Description |
|------------|-------------|
| `'UNIFORM_COLOR'` | Single solid color |
| `'FLAT_COLOR'` | Per-vertex flat color |
| `'SMOOTH_COLOR'` | Per-vertex interpolated color |
| `'POINT_UNIFORM_COLOR'` | Point rendering with uniform color |
| `'POLYLINE_UNIFORM_COLOR'` | Line rendering with uniform color |
| `'IMAGE'` | Texture display |
| `'IMAGE_SCENE_LINEAR_TO_REC709_SRGB'` | Texture with color space conversion |

### Custom Shaders

```python
vert_src = """
void main() {
    gl_Position = ModelViewProjectionMatrix * vec4(position, 1.0);
}
"""
frag_src = """
void main() {
    fragColor = vec4(1.0, 0.5, 0.0, 1.0);
}
"""

# Legacy path
shader = gpu.shader.from_builtin('UNIFORM_COLOR')

# Preferred path (Blender 3.x+)
shader_info = gpu.types.GPUShaderCreateInfo()
shader_info.push_constant('MAT4', "ModelViewProjectionMatrix")
shader_info.vertex_in(0, 'VEC3', "position")
shader_info.vertex_source(vert_src)
shader_info.fragment_out(0, 'VEC4', "fragColor")
shader_info.fragment_source(frag_src)
shader = gpu.shader.create_from_info(shader_info)
```

## gpu.types

### GPUVertFormat / GPUVertBuf

```python
fmt = gpu.types.GPUVertFormat()
fmt.attr_add(id="pos", comp_type='F32', len=3, fetch_mode='FLOAT')
fmt.attr_add(id="color", comp_type='F32', len=4, fetch_mode='FLOAT')

vbo = gpu.types.GPUVertBuf(len=len(coords), format=fmt)
vbo.attr_fill(id="pos",   data=coords)
vbo.attr_fill(id="color", data=colors)
```

`comp_type` values: `'F32'`, `'I32'`, `'U32'`, `'F16'`, `'I16'`, `'U16'`, `'I8'`, `'U8'`
`fetch_mode` values: `'FLOAT'`, `'INT'`, `'INT_TO_FLOAT'`, `'INT_TO_FLOAT_UNIT'`

### GPUIndexBuf

```python
indices = ((0, 1, 2), (2, 3, 0))
ibo = gpu.types.GPUIndexBuf(type='TRIS', seq=indices)
```

### GPUBatch

```python
batch = gpu.types.GPUBatch(type='TRIS', buf=vbo)
batch.vertbuf_add(vbo2)           # add extra vertex buffer
batch.draw(shader)                # draw with bound shader
```

Primitive types: `'POINTS'`, `'LINES'`, `'TRIS'`, `'LINE_STRIP'`, `'TRI_STRIP'`, `'LINES_ADJ'`, `'TRIS_ADJ'`, `'LINE_STRIP_ADJ'`

### GPUOffScreen

```python
offscreen = gpu.types.GPUOffScreen(width, height)
with offscreen.bind():
    # draw into offscreen buffer
    ...
offscreen.free()
```

### GPUTexture

```python
tex = gpu.types.GPUTexture((width, height), format='RGBA8')
tex = gpu.texture.from_image(bpy_image)
```

## gpu_extras.batch

### batch_for_shader

```python
from gpu_extras.batch import batch_for_shader

batch = batch_for_shader(
    shader,           # GPUShader
    type,             # primitive type string
    content,          # dict mapping attr names to sequences
    *,
    indices=None      # optional index sequence
)
```

Automatically configures vertex buffer format from the shader's attributes.

## gpu_extras.presets

### draw_texture_2d

```python
from gpu_extras.presets import draw_texture_2d

draw_texture_2d(
    texture,             # gpu.types.GPUTexture
    position,            # (x, y) lower-left corner
    width,               # display width (float)
    height,              # display height (float)
    is_scene_linear_with_rec709_srgb_target=False
)
```

Set `is_scene_linear_with_rec709_srgb_target=True` when drawing image textures inside `POST_VIEW` or `POST_PIXEL` handlers.

### draw_circle_2d

```python
from gpu_extras.presets import draw_circle_2d

draw_circle_2d(
    position,            # (x, y) center
    color,               # (r, g, b, a)
    radius,              # float
    *,
    segments=None        # int; auto-calculated if None
)
```

Requires `gpu.state.blend_set('ALPHA')` for transparency.

## GPU State

```python
gpu.state.blend_set('ALPHA')        # enable alpha blending
gpu.state.depth_test_set('LESS')
gpu.state.line_width_set(2.0)
gpu.state.point_size_set(5.0)
```

## Notes

- Reuse `GPUBatch` objects across frames; re-create only when geometry changes
- On macOS, GLSL is internally translated to MSL; matrix constructors are limited (use diagonal, all-scalar, or column-vector forms only)
- `GPU_BARRIER_*` constants are available for compute shader synchronization
- Register draw callbacks per space type: `SpaceView3D`, `SpaceNodeEditor`, etc.
- Use `'POST_VIEW'` for 3D-space overlays, `'POST_PIXEL'` for 2D screen-space drawing

## Related

- [bpy-extras.md](./bpy-extras.md)
