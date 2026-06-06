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

# With unit control
box.export("/path/to/file/box.step", unit="CM")
box.export("/path/to/file/box.step", unit="MM", outputUnit="M")

# With additional options
box.export("/path/to/file/box.step", opt={"write_pcurves": False})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Output file path |
| `exportType` | `ExportTypes` | auto-detected | `ExportTypes.STEP`; required when extension is not `.step` |
| `unit` | `str` | `"MM"` | Internal geometry unit written into the file |
| `outputUnit` | `str` | same as `unit` | Unit written into the STEP header (display unit); useful to write `MM` geometry but report in `M` |
| `opt` | `dict` | `{}` | Additional STEP-writer options |
| `opt.write_pcurves` | `bool` | `True` | Write parametric curves on surfaces; set to `False` to reduce file size |

## Notes

- For assembly STEP export (multi-body with names/colors), use `Assembly.export()` — see [Exporting Assemblies](./exporting-assemblies.md).
- `ExportTypes` is importable from `cadquery.exporters`.
- `unit` controls the geometry scale written into the file; `outputUnit` controls only the STEP header declaration. Both default to `"MM"`. Use `unit="MM", outputUnit="M"` when you need geometry in millimeters but the receiving application expects the header to declare meters.

## Related

- [Importing STEP](./importing-step.md)
- [Exporting Assemblies](./exporting-assemblies.md)
- [Exporting Other Formats](./exporting-other.md)
