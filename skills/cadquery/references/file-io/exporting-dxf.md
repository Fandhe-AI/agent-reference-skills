# Exporting DXF

Exports a 2D section or sketch to DXF format. DXF export is restricted to 2D content: workplane sections or `Sketch` objects.

## Signature / Usage

```python
import cadquery as cq
from cadquery import exporters

# From a workplane section
result = cq.Workplane().box(10, 10, 10).section()
exporters.exportDXF(result, "/path/to/file/object.dxf")

# Equivalent via .export()
result.export("/path/to/file/object.dxf")

# From a Sketch
sketch = cq.Sketch().rect(1, 1)
sketch.export("/path/to/file/object.dxf")

# With custom units (meters)
exporters.exportDXF(result, "/path/to/file/object.dxf", doc_units=6)
# or
result.export("/path/to/file/object.dxf", opt={"doc_units": 6})

# With cubic spline approximation
exporters.exportDXF(result, "/path/to/file/object.dxf", approx="spline")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path (`.dxf`) |
| `approx` | `str \| None` | `None` | Curve approximation strategy: `None` (exact), `"spline"` (cubic spline), `"arc"` (circular arc) |
| `tolerance` | `float` | `0.001` | Approximation tolerance used with `approx` |
| `doc_units` | `int` | `4` | DXF document units code (see table below) |

### `doc_units` Values

| Value | Unit |
|-------|------|
| `0` | Unitless |
| `1` | Inches |
| `2` | Feet |
| `3` | Miles |
| `4` | Millimeters (default) |
| `5` | Centimeters |
| `6` | Meters |

## Notes

- DXF export works **only** with 2D content: call `.section()` on a 3D workplane first, or use a `Sketch` object directly.
- Attempting to export a 3D solid directly will not produce meaningful output.

## Related

- [Importing DXF](./importing-dxf.md)
- [Exporting SVG](./exporting-svg.md)
- [Exporting Other Formats](./exporting-other.md)
