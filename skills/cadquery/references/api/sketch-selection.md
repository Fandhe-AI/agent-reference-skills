# Sketch Selection

Methods for selecting, tagging, and manipulating elements within a CadQuery sketch.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Sketch.tag` | `Sketch.tag(tag)` | Tag the current selection for later recall |
| `Sketch.select` | `Sketch.select(*tags)` | Select elements based on previously assigned tags |
| `Sketch.reset` | `Sketch.reset()` | Clear the current selection |
| `Sketch.delete` | `Sketch.delete()` | Delete the currently selected objects |
| `Sketch.faces` | `Sketch.faces(s=None, tag=None)` | Select faces, optionally filtered |
| `Sketch.edges` | `Sketch.edges(s=None, tag=None)` | Select edges, optionally filtered |
| `Sketch.vertices` | `Sketch.vertices(s=None, tag=None)` | Select vertices, optionally filtered |

## Signature / Usage

```python
import cadquery as cq

result = (
    cq.Workplane("XY")
    .sketch()
    .circle(2).tag("outer")
    .circle(1).tag("inner")
    .select("outer")          # re-select the outer circle
    .faces()                  # work with face selection
    .finalize()
)
```

## Options / Props

### `Sketch.tag(tag)`

| Name | Type | Description |
|------|------|-------------|
| `tag` | `str` | Label to assign to the current selection |

### `Sketch.select(*tags)`

| Name | Type | Description |
|------|------|-------------|
| `*tags` | `str` | One or more tag names to select |

### `Sketch.faces(s, tag)` / `Sketch.edges(s, tag)` / `Sketch.vertices(s, tag)`

| Name | Type | Description |
|------|------|-------------|
| `s` | `str \| Selector \| None` | Optional selector string or object to filter results |
| `tag` | `str \| None` | Tag whose elements are selected as the starting set |

## Notes

- Tags survive subsequent operations and can be referenced at any later point in the sketch chain.
- `Sketch.reset()` restores selection to "all objects" — useful before starting a new selection sequence.
- `Sketch.delete()` permanently removes the selected geometry from the sketch; use with care.
- All three geometry-type selectors (`faces`, `edges`, `vertices`) accept the same `s` and `tag` arguments.

## Related

- [Sketch Initialization](./sketch-initialization.md)
- [Sketching with Faces](./sketch-faces.md)
- [Sketching with Edges and Constraints](./sketch-edges-constraints.md)
