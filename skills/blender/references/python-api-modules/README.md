# Python API Modules

Standalone Blender Python API modules — independent of `bpy` operators and callable from scripts, add-ons, or the Python console.

| Name | Description | Path |
|------|-------------|------|
| bmesh | Internal mesh editing API: BMVert / BMEdge / BMFace operations, bmesh.ops (extrude, bevel, bisect, …), UV / vertex-color layers | [bmesh.md](./bmesh.md) |
| mathutils | Geometric math types: Vector, Matrix, Quaternion, Euler, Color, noise | [mathutils.md](./mathutils.md) |
| gpu / gpu_extras | Custom GPU shaders, GPUBatch / GPUVertBuf, viewport overlay drawing, draw_texture_2d | [gpu.md](./gpu.md) |
| bpy_extras | I/O operator mixins (ImportHelper / ExportHelper), object_data_add, view3d coordinate conversion | [bpy-extras.md](./bpy-extras.md) |
| bl_math / blf / aud / imbuf / idprop | Scalar math (clamp, lerp, smoothstep), text drawing, audio playback, image buffers, custom properties | [other-modules.md](./other-modules.md) |
