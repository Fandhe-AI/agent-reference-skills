# Importing DXF

`importers.importDXF()` loads a DXF file into a `Workplane`. All layers are imported by default; a layer include or exclude list may be provided (case-insensitive).

## Signature / Usage

```python
import cadquery as cq

result = (
    cq.importers.importDXF("/path/to/file.dxf")
    .wires()
    .toPending()
    .extrude(10)
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fileName` | `str` | Path to the DXF file |
| `tolerance` | `float` | Import tolerance |
| `include` | `list[str]` | Layer names to include (case-insensitive); all layers if omitted |
| `exclude` | `list[str]` | Layer names to exclude (case-insensitive) |

## Notes

- The imported result is a `Workplane` containing edges.
- Call `.wires().toPending()` to convert edges to wires suitable for further operations such as `extrude()`.
- `include` and `exclude` are mutually exclusive; provide one or neither.

## Related

- [Introduction](./introduction.md)
- [Exporting DXF](./exporting-dxf.md)
