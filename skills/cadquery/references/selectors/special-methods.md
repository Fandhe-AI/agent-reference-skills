# Additional Special Methods

`Workplane` and `Sketch` provide utility methods for quick, ad-hoc selection and sorting without requiring a custom `Selector` subclass.

## Signature / Usage

```python
import cadquery as cq

# filter(): keep only objects whose volume is <= 3
result = (
    cq.Workplane()
    .add([cq.Solid.makeBox(1, 1, i + 1).moved(cq.Location(cq.Vector(2 * i, 0, 0))) for i in range(5)])
)
result = result.filter(lambda s: s.Volume() <= 3)

# sort() + slice: keep the 3 smallest objects by volume
result = result.sort(lambda s: s.Volume())[:3]

# __getitem__: select by index
first = result[0]
```

## Options / Props

### `Workplane.filter(f)` / `Sketch.filter(f)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `f` | `Callable[[Shape], bool]` | Predicate; objects for which `f` returns `True` are kept |

### `Workplane.sort(f)` / `Sketch.sort(f)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `f` | `Callable[[Shape], Any]` | Key function; objects are sorted in ascending order by the returned value |

Returns a new `Workplane` / `Sketch` with the sorted selection. Supports standard Python slice notation after the call.

### `Workplane.__getitem__(i)` / `Sketch.__getitem__(i)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `i` | `int` or `slice` | Index or slice into the current selection |

## Notes

- These methods are primarily intended for rapid prototyping and exploration; for reusable logic, subclass `Selector` instead.
- `sort()` returns all objects in sorted order; combine with a slice (`[:n]`) to select the N smallest/largest.
- `filter()` and `sort()` operate on the **current stack** (the objects selected so far in the chain).

## Related

- [Shape and Sketch Usage](./shape-and-sketch.md)
- [Combining Selectors](./combining.md)
