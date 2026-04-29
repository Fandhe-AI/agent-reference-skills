# Exporting Assemblies to glTF

`Assembly.export()` supports glTF (text JSON) and GLB (binary) formats for web-based 3D visualization. The format is determined by the file extension.

## Signature / Usage

```python
import cadquery as cq

assy = cq.Assembly()
body = cq.Workplane().box(10, 10, 10)
assy.add(body, color=cq.Color(1, 0, 0), name="body")
pin = cq.Workplane().center(2, 2).cylinder(radius=2, height=20)
assy.add(pin, color=cq.Color(0, 1, 0), name="pin")

# Text glTF
assy.export("out.gltf")

# Binary GLB
assy.export("out.glb")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fileName` | `str` | Output path; `.gltf` = text JSON, `.glb` = binary |

## Notes

- Use `.gltf` extension for the human-readable JSON variant.
- Use `.glb` extension for the compact binary variant.
- Colors set on assembly components are preserved in glTF output.

## Related

- [Exporting Assemblies](./exporting-assemblies.md)
- [Introduction](./introduction.md)
