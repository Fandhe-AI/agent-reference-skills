# File Management and Export

Importing and exporting CAD files in CadQuery. Supports STEP, STL, DXF, SVG, AMF, VRML, GLTF, and more.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane.toSvg` | `Workplane.toSvg(opts=None)` | Return SVG text representing the first stack item |
| `Workplane.exportSvg` | `Workplane.exportSvg(fileName)` | Export the first stack item as an SVG file |
| `importers.importStep` | `importers.importStep(fileName)` | Load a STEP file into a CadQuery Workplane |
| `importers.importDXF` | `importers.importDXF(filename, tol=1e-6, exclude=[], include=[])` | Load a DXF file into a Workplane |
| `exporters.export` | `exporters.export(w, fname, exportType=None, tolerance=0.1, angularTolerance=0.1, opt=None)` | Export a Workplane or Shape to a file |
| `DxfDocument` | `occ_impl.exporters.dxf.DxfDocument(approx=None, tolerance=1e-3)` | Create a DXF document from CadQuery objects |

## Signature / Usage

```python
import cadquery as cq
from cadquery import exporters, importers

# Import a STEP file
result = importers.importStep("model.step")

# Export to STEP
exporters.export(result, "output.step")

# Export to STL with tolerance
exporters.export(result, "output.stl", tolerance=0.01, angularTolerance=0.1)

# Export to SVG
result.exportSvg("output.svg")

# Import DXF
profile = importers.importDXF("profile.dxf", tol=1e-6)
```

## Options / Props

### `exporters.export(w, fname, exportType, tolerance, angularTolerance, opt)`

| Name | Type | Description |
|------|------|-------------|
| `w` | `Workplane \| Shape` | The object to export |
| `fname` | `str` | Output file path |
| `exportType` | `str \| None` | Override format: `"STEP"`, `"STL"`, `"AMF"`, `"SVG"`, `"VRML"`, `"GLTF"`, `"TJS"` (auto-detected from extension if `None`) |
| `tolerance` | `float` | Linear tessellation tolerance for mesh-based formats (default `0.1`) |
| `angularTolerance` | `float` | Angular tessellation tolerance in radians (default `0.1`) |
| `opt` | `dict \| None` | Format-specific options |

### `importers.importDXF(filename, tol, exclude, include)`

| Name | Type | Description |
|------|------|-------------|
| `filename` | `str` | Path to the DXF file |
| `tol` | `float` | Geometry reconstruction tolerance (default `1e-6`) |
| `exclude` | `list[str]` | Layer names to exclude |
| `include` | `list[str]` | Layer names to include (empty = all layers) |

### `Workplane.toSvg(opts)`

| Name | Type | Description |
|------|------|-------------|
| `opts` | `dict \| None` | SVG options: `width`, `height`, `marginLeft`, `marginTop`, `projectionDir`, `showAxes`, `strokeWidth`, `strokeColor`, `hiddenColor`, `showHidden` |

### `DxfDocument(approx, tolerance)`

| Name | Type | Description |
|------|------|-------------|
| `approx` | `str \| None` | Approximation method: `"spline"` or `"arc"` |
| `tolerance` | `float` | Approximation tolerance (default `1e-3`) |

## Supported Export Formats

| Format | Extension | Notes |
|--------|-----------|-------|
| STEP | `.step`, `.stp` | Standard geometry exchange; preserves topology |
| STL | `.stl` | Tessellated mesh; controlled by `tolerance` |
| AMF | `.amf` | XML-based additive manufacturing format |
| SVG | `.svg` | 2D projection for documentation |
| VRML | `.vrml`, `.wrl` | Virtual Reality scene format |
| GLTF | `.gltf`, `.glb` | Modern 3D web/viewer format |
| TJS | `.json` | Three.js JSON format |

## Notes

- `exporters.export()` auto-detects the format from the file extension when `exportType` is `None`.
- Lower `tolerance` values produce finer STL/AMF meshes but larger files and slower export.
- `importers.importStep()` returns a `Workplane` with the imported shape on the stack.
- DXF import creates wire/face geometry from 2D DXF entities; 3D DXF is not supported.

## Related

- [Workplane Initialization](./workplane-initialization.md)
- [Assemblies](./assemblies-api.md)
