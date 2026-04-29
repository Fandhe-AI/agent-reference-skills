# Exporting TJS

Exports a shape to Three.js JSON (TJS) format, used for web-based 3D visualization. Because `.json` is not uniquely associated with TJS, the export type must be specified explicitly.

## Signature / Usage

```python
import cadquery as cq
from cadquery import exporters

result = cq.Workplane().box(10, 10, 10)
result.export(
    "/path/to/file/mesh.json",
    tolerance=0.01,
    angularTolerance=0.1,
    exportType=exporters.ExportTypes.TJS,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path (typically `.json`) |
| `tolerance` | `float` | `0.1` | Linear deflection for tessellation |
| `angularTolerance` | `float` | `0.1` | Angular deflection in radians between polyline segments |
| `exportType` | `ExportTypes` | — | Must be `ExportTypes.TJS`; required because `.json` is ambiguous |

## Notes

- `ExportTypes.TJS` must be specified explicitly since `.json` does not uniquely identify the format.
- TJS format is used internally to render 3D shapes in the CadQuery documentation.

## Related

- [Exporting VRML](./exporting-vrml.md)
- [Exporting STL](./exporting-stl.md)
- [Exporting Other Formats](./exporting-other.md)
