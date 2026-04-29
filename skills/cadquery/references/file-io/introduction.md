# Introduction to CadQuery File I/O

CadQuery enables data interchange with external software through various file formats. Parametric data is not preserved in any exported format — only CadQuery's own Python format is fully parametric.

## Supported Formats

**Import:**

| Format | Notes |
|--------|-------|
| DXF | 2D profiles, layer filtering supported |
| STEP | Solid geometry interchange |
| XML (XCAF) | OpenCASCADE native XML format |
| XBF | OpenCASCADE native binary format |

**Export:**

| Format | Notes |
|--------|-------|
| DXF | 2D sections and sketches only |
| SVG | 2D vector rendering of 3D shapes |
| STEP | Solid geometry interchange |
| STL | Mesh for additive manufacturing |
| AMF | Mesh with metadata |
| TJS | JSON mesh for web visualization |
| VRML | Legacy 3D web format |
| VTP | VTK PolyData format |
| 3MF | Mesh for additive manufacturing |
| glTF / GLB | Binary/text 3D scene format |
| XML (XCAF) | OpenCASCADE native XML |
| XBF | OpenCASCADE native binary |

## Notes

- No exported format preserves parametric (feature-tree) data.
- Python source is the only fully parametric representation of a CadQuery model.

## Related

- [Scripts and Object Output](./scripts-and-output.md)
- [Importing DXF](./importing-dxf.md)
- [Importing STEP](./importing-step.md)
- [Exporting STEP](./exporting-step.md)
