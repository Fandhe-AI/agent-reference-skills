# Sketch Initialization

Methods and classes for creating and initializing 2D sketch objects in CadQuery.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Sketch` | `Sketch(parent=None, locs=[], obj=None)` | Construct a 2D sketch object |
| `Sketch.importDXF` | `Sketch.importDXF(filename, tol=1e-6, exclude=[], include=[])` | Import a DXF file and construct face(s) |
| `Workplane.sketch` | `Workplane.sketch()` | Initialize and return a new sketch attached to the workplane |
| `Sketch.finalize` | `Sketch.finalize()` | Finish sketch construction and return the parent workplane |
| `Sketch.copy` | `Sketch.copy()` | Create a partial copy of the sketch |
| `Sketch.located` | `Sketch.located(loc)` | Create a partial copy of the sketch at a new location |
| `Sketch.moved` | `Sketch.moved(*args)` | Create a partial copy of the sketch with moved faces |

## Signature / Usage

```python
import cadquery as cq

# Create a sketch via Workplane
result = (
    cq.Workplane("XY")
    .sketch()
    .circle(1)
    .finalize()
    .extrude(1)
)

# Import DXF into a sketch
sketch = cq.Sketch().importDXF("profile.dxf")
```

## Options / Props

### `Sketch(parent, locs, obj)`

| Name | Type | Description |
|------|------|-------------|
| `parent` | `Workplane \| None` | Parent workplane to attach to |
| `locs` | `list[Location]` | Initial locations for repeated placement |
| `obj` | `Shape \| None` | Existing geometry to wrap |

### `Sketch.importDXF(filename, tol, exclude, include)`

| Name | Type | Description |
|------|------|-------------|
| `filename` | `str` | Path to the DXF file |
| `tol` | `float` | Tolerance for geometry reconstruction (default `1e-6`) |
| `exclude` | `list[str]` | Layer names to exclude |
| `include` | `list[str]` | Layer names to include (empty = all) |

### `Sketch.located(loc)`

| Name | Type | Description |
|------|------|-------------|
| `loc` | `Location` | New location for the sketch copy |

## Notes

- `Sketch.finalize()` must be called to return control to the parent `Workplane` after sketch operations.
- `Sketch.copy()` / `Sketch.located()` / `Sketch.moved()` produce shallow copies suitable for reuse in arrays.
- Use `Workplane.sketch()` as the primary entry point when building sketches within a fluent chain.

## Related

- [Sketch Selection](./sketch-selection.md)
- [Sketching with Faces](./sketch-faces.md)
- [Sketching with Edges and Constraints](./sketch-edges-constraints.md)
