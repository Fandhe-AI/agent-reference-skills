# Exporting STEP

Export a `Workplane` or shape to STEP format using `.export()`. The format is inferred from the file extension; use `ExportTypes.STEP` explicitly for non-standard extensions (e.g., `.stp`).

## Signature / Usage

```python
import cadquery as cq

box = cq.Workplane().box(10, 10, 10)

# Inferred from .step extension
box.export("/path/to/file/box.step")

# Explicit type for .stp extension
box.export("/path/to/file/box.stp", cq.exporters.ExportTypes.STEP)

# With additional options
box.export("/path/to/file/box.step", opt={"write_pcurves": False})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path |
| `exportType` | `ExportTypes` | auto-detected | `ExportTypes.STEP`; required when extension is not `.step` |
| `opt` | `dict` | `{}` | Additional STEP-writer options |
| `opt.write_pcurves` | `bool` | `True` | Write parametric curves on surfaces; set to `False` to reduce file size |

## Notes

- For assembly STEP export (multi-body with names/colors), use `Assembly.export()` — see [Exporting Assemblies](./exporting-assemblies.md).
- `ExportTypes` is importable from `cadquery.exporters`.

## Related

- [Importing STEP](./importing-step.md)
- [Exporting Assemblies](./exporting-assemblies.md)
- [Exporting Other Formats](./exporting-other.md)
