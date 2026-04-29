# Exporting Assemblies

`Assembly.export()` exports a multi-body assembly to STEP, XBF, or XML (XCAF) format. Three export modes control how the hierarchy and metadata are written.

## Signature / Usage

```python
import cadquery as cq

assy = cq.Assembly()
body = cq.Workplane().box(10, 10, 10)
assy.add(body, color=cq.Color(1, 0, 0), name="body")
pin = cq.Workplane().center(2, 2).cylinder(radius=2, height=20)
assy.add(pin, color=cq.Color(0, 1, 0), name="pin")

# Default mode
assy.export("out.step")
assy.export("out.xbf")
assy.export("out.xml")

# Fused mode — merges all shapes into one
assy.export("out.stp", "STEP", mode="fused")
assy.export("out_glue.step", mode="fused", glue=True, write_pcurves=False)
```

**With a custom top-level assembly name:**

```python
assy = cq.Assembly(name="my_assembly")
assy.export(
    "out.stp",
    cq.exporters.ExportTypes.STEP,
    mode=cq.exporters.assembly.ExportModes.FUSED,
)
```

**With per-face metadata via `addSubshape()`:**

```python
from cadquery.occ_impl.exporters.assembly import exportStepMeta

assy = cq.Assembly(name="top-level")
cube_1 = cq.Workplane().box(10.0, 10.0, 10.0)
assy.add(cube_1, name="cube_1", color=cq.Color("green"))

assy.addSubshape(
    cube_1.faces(">Z").val(),
    name="cube_1_top_face",
    color=cq.Color("red"),
    layer="cube_1_top_face",
)

assy.export("out.step")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path |
| `exportType` | `str \| ExportTypes` | auto-detected | Format: `"STEP"`, `ExportTypes.STEP`, etc. |
| `mode` | `str \| ExportModes` | `"default"` | Export mode: `"default"`, `"fused"` |
| `glue` | `bool` | `False` | Fuse with glue (faster, non-manifold); only with `mode="fused"` |
| `write_pcurves` | `bool` | `True` | Write parametric curves on surfaces |

## Export Modes

| Mode | Behavior |
|------|----------|
| `"default"` | Nested structure with auto-generated names; preserves colors only |
| `"fused"` | Merges all shapes into a single compound; attempts to preserve names and colors |

## Notes

- Set `Assembly(name="...")` before export to control the top-level assembly name in STEP output.
- `addSubshape()` attaches name, color, and layer metadata to individual faces/sub-shapes.
- Colors are preserved in all modes; names require `mode="fused"` or explicit metadata via `addSubshape()`.

## Related

- [Exporting STEP](./exporting-step.md)
- [Importing Assemblies](./importing-assemblies.md)
- [Exporting Assemblies to glTF](./exporting-gltf.md)
