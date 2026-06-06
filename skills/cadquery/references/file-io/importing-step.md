# Importing STEP

`importers.importStep()` loads a STEP file and returns a `Workplane` containing the imported solid geometry.

## Signature / Usage

```python
import cadquery as cq

result = cq.importers.importStep("/path/to/file.stp")

# With explicit unit conversion
result = cq.importers.importStep("/path/to/block.stp", unit="M")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fileName` | `str` | — | Path to the STEP file (`.step` or `.stp`) |
| `unit` | `str` | `"MM"` | Target unit for automatic unit conversion. Accepted values: `MM`, `CM`, `M`, `KM`, `INCH`, `FT`, `MI`, `UM`, `NM` |

## Notes

- The return value is a `Workplane`; you can continue chaining CadQuery operations on it.
- STEP import does not restore parametric feature data — the result is a static B-Rep solid.
- Unit conversion is applied automatically; set `unit` to match the target coordinate space of the importing model.

## Related

- [Introduction](./introduction.md)
- [Exporting STEP](./exporting-step.md)
- [Importing Assemblies](./importing-assemblies.md)
