# Exporting Other Formats

`Workplane.export()` can target any supported format either by auto-detecting the format from the file extension or by passing an explicit `ExportTypes` value.

## Signature / Usage

```python
import cadquery as cq
from cadquery import exporters

result = cq.Workplane().box(10, 10, 10)

# Auto-detect format from extension
result.export("/path/to/file/object.step")

# Explicit export type (required when extension is ambiguous)
result.export(
    "/path/to/file/object.dxf",
    exporters.ExportTypes.DXF,
)
```

## Available ExportTypes

| `ExportTypes` value | Format |
|---------------------|--------|
| `ExportTypes.STEP` | STEP |
| `ExportTypes.STL` | STL |
| `ExportTypes.AMF` | AMF |
| `ExportTypes.SVG` | SVG |
| `ExportTypes.TJS` | Three.js JSON |
| `ExportTypes.VRML` | VRML |
| `ExportTypes.VTP` | VTK PolyData |
| `ExportTypes.DXF` | DXF (2D only) |
| `ExportTypes.GLTF` | glTF / GLB |

## Notes

- `ExportTypes` is importable from `cadquery.exporters`.
- When the file extension unambiguously identifies the format (e.g., `.step`, `.stl`, `.svg`), passing `exportType` is optional.
- For formats where the extension is ambiguous (e.g., `.json` for TJS, `.stp` for STEP), always pass `exportType` explicitly.
- Format-specific options are passed via the `opt` keyword argument as a dict.

## Related

- [Exporting STEP](./exporting-step.md)
- [Exporting STL](./exporting-stl.md)
- [Exporting TJS](./exporting-tjs.md)
- [Introduction](./introduction.md)
