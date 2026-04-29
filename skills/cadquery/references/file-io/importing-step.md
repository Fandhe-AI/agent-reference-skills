# Importing STEP

`importers.importStep()` loads a STEP file and returns a `Workplane` containing the imported solid geometry.

## Signature / Usage

```python
import cadquery as cq

result = cq.importers.importStep("/path/to/file.stp")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fileName` | `str` | Path to the STEP file (`.step` or `.stp`) |

## Notes

- The return value is a `Workplane`; you can continue chaining CadQuery operations on it.
- STEP import does not restore parametric feature data — the result is a static B-Rep solid.

## Related

- [Introduction](./introduction.md)
- [Exporting STEP](./exporting-step.md)
- [Importing Assemblies](./importing-assemblies.md)
