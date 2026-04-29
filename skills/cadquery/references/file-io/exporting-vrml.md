# Exporting VRML

Exports a shape to VRML (Virtual Reality Modeling Language) format, a legacy format for 3D scenes on the web.

## Signature / Usage

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)
result.export("/path/to/file/mesh.vrml", tolerance=0.01, angularTolerance=0.1)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path (`.vrml`) |
| `tolerance` | `float` | `0.1` | Linear deflection for tessellation |
| `angularTolerance` | `float` | `0.1` | Angular deflection in radians between polyline segments |

## Notes

- VRML is a mesh-based format; no B-Rep or parametric data is retained.
- Prefer glTF/GLB for modern web-based 3D visualization.

## Related

- [Exporting TJS](./exporting-tjs.md)
- [Exporting Assemblies to glTF](./exporting-gltf.md)
- [Exporting STL](./exporting-stl.md)
