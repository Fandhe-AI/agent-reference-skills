# Importing Assemblies

`Assembly.load()` imports an assembly from STEP, XBF, or XML (XCAF) files, reconstructing the multi-body structure.

## Signature / Usage

```python
import cadquery as cq

assy = cq.Assembly.load("/path/to/file.step")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fileName` | `str` | Path to the file; supported extensions: `.step`, `.stp`, `.xbf`, `.xml` |

## Notes

- Supported import formats: STEP (`.step`, `.stp`), XBF, XML (XCAF).
- Parametric data is not restored — the result is a static assembly of B-Rep solids.
- Colors and names may be restored depending on what was embedded in the source file.

## Related

- [Importing STEP](./importing-step.md)
- [Exporting Assemblies](./exporting-assemblies.md)
