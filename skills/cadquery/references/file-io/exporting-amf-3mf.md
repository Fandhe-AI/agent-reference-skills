# Exporting AMF and 3MF

Exports a shape as an AMF or 3MF mesh file, suited for additive manufacturing workflows. Mesh quality is controlled via `tolerance` and `angularTolerance`.

## Signature / Usage

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)

# AMF
result.export("/path/to/file/mesh.amf", tolerance=0.01, angularTolerance=0.1)

# 3MF
result.export("/path/to/file/mesh.3mf", tolerance=0.01, angularTolerance=0.1)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path; extension determines format (`.amf` or `.3mf`) |
| `tolerance` | `float` | `0.1` | Linear deflection for tessellation |
| `angularTolerance` | `float` | `0.1` | Angular deflection in radians between polyline segments |

## Notes

- AMF and 3MF are mesh-based formats well-suited for additive manufacturing.
- Default `tolerance` is `0.1` (coarser than STL default of `0.001`); adjust if higher detail is needed.
- Format is selected automatically from the file extension.

## Related

- [Exporting STL](./exporting-stl.md)
- [Exporting VRML](./exporting-vrml.md)
- [Introduction](./introduction.md)
