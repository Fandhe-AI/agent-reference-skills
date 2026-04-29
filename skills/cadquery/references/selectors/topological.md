# Topological Selectors

Topological selectors navigate the **shape hierarchy** based on containment and adjacency relationships rather than geometric properties.

## Signature / Usage

```python
# ancestors(): select all faces that contain the selected edges
result = cq.Workplane("XY").box(10, 10, 10).faces(">Z").edges("<Y")
result = result.ancestors("Face")

# siblings(): select all faces connected to the currently selected faces via shared edges
result = cq.Workplane("XY").box(10, 10, 10).faces(">Z")
result = result.siblings("Edge")
```

## Options / Props

### `ancestors(kind)`

Selects all shapes of the specified type that **contain** (are parents of) the current selection.

| Parameter | Type | Description |
|-----------|------|-------------|
| `kind` | `str` | Shape type to select: `"Vertex"`, `"Edge"`, `"Wire"`, `"Face"`, `"Shell"`, `"Solid"`, `"CompSolid"`, `"Compound"` |

### `siblings(kind, level=1)`

Selects shapes of the same type as the current selection that are **connected** to the current selection via shared shapes of the specified `kind`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `kind` | `str` | The shared shape type that defines connectivity: `"Vertex"`, `"Edge"`, `"Wire"`, `"Face"`, etc. |
| `level` | `int` | Number of adjacency hops (default: `1`) |

## Notes

- `ancestors()` traverses **up** the topology tree (Vertex → Edge → Wire → Face → Shell → Solid).
- `siblings()` traverses **across** the topology tree at the same level via shared sub-shapes.
- Both methods return a new `Workplane` with the resulting selection.
- These methods are available on `Workplane` instances, not as string syntax.

## Related

- [Combining Selectors](./combining.md)
- [Shape and Sketch Usage](./shape-and-sketch.md)
