# Exporting STL

Exports a shape as an STL mesh, suitable for additive manufacturing (3D printing). Mesh quality is controlled via `tolerance` and `angularTolerance`.

## Signature / Usage

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)
result.export("/path/to/file/mesh.stl")

# With custom mesh quality
result.export(
    "/path/to/file/mesh.stl",
    tolerance=0.001,
    angularTolerance=0.05,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path |
| `tolerance` | `float` | `0.001` | Linear deflection: maximum distance between a curve and its tessellation |
| `angularTolerance` | `float` | `0.1` | Angular deflection in radians between adjacent polyline segments |
| `ascii` | `bool` | `False` | `True` for ASCII STL; `False` for binary STL |
| `relative` | `bool` | `True` | Scale `tolerance` relative to edge size when `True` |
| `parallel` | `bool` | `True` | Use parallel processing for tessellation |

## Notes

- Lower `tolerance` / `angularTolerance` values produce finer meshes but larger files and longer processing times.
- Binary STL (`ascii=False`) is more compact and generally preferred.
- `relative=True` adapts the linear tolerance to the actual size of each edge, giving uniform mesh quality across features of different sizes.

## Related

- [Exporting AMF and 3MF](./exporting-amf-3mf.md)
- [Exporting VRML](./exporting-vrml.md)
- [Introduction](./introduction.md)
