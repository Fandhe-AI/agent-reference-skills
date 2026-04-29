# Iteration Methods

Methods for applying a function to each item on the CadQuery stack.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane.each` | `each(callback, useLocalCoordinates=False, combine=False, clean=True)` | Run a function on each stack value, collect return values |
| `Workplane.eachpoint` | `eachpoint(arg, useLocalCoordinates=False, combine=False, clean=True)` | Like `each()`, but the callback receives a `Location`-translated copy |

## Signature / Usage

```python
import cadquery as cq

# Use each() to apply a custom operation at every stack point
def make_pillar(loc):
    return cq.Workplane("XY").circle(0.25).extrude(2).val().located(loc)

result = (
    cq.Workplane("XY")
    .rarray(2, 2, 3, 3)
    .each(make_pillar, combine=True)
)

# eachpoint: callback receives translated location objects
def make_pin(loc):
    return cq.Workplane("XY").circle(0.1).extrude(1).val().located(loc)

result = (
    cq.Workplane("XY")
    .rarray(1, 1, 4, 4)
    .eachpoint(make_pin, useLocalCoordinates=True, combine=True)
)
```

## Options / Props

### `Workplane.each(callback, useLocalCoordinates, combine, clean)`

| Name | Type | Description |
|------|------|-------------|
| `callback` | `Callable[[Shape], Shape]` | Function called for each stack item; receives the shape and must return a `Shape` |
| `useLocalCoordinates` | `bool` | Transform the shape into the current workplane's local coordinate system before passing to callback (default `False`) |
| `combine` | `bool \| str` | `True` = union all results; `"cut"` = subtract; `False` = leave on stack separately |
| `clean` | `bool` | Run `clean()` on the result (default `True`) |

### `Workplane.eachpoint(arg, useLocalCoordinates, combine, clean)`

| Name | Type | Description |
|------|------|-------------|
| `arg` | `Callable[[Location], Shape]` | Function called for each stack location; receives a `Location` object |
| `useLocalCoordinates` | `bool` | Use local coordinate system for the location (default `False`) |
| `combine` | `bool \| str` | Combine strategy (same as `each()`) |
| `clean` | `bool` | Run `clean()` on the result (default `True`) |

## Notes

- `each()` is suited for operating on existing shapes; `eachpoint()` is better when generating new geometry at each location.
- The callback must return a `Shape` (or `Compound`), not a `Workplane`.
- Use `.val()` inside the callback to extract the `Shape` from a `Workplane` builder.
- `useLocalCoordinates=True` transforms coordinates into the workplane frame, enabling consistent relative placement.

## Related

- [Stack and Selector Methods](./stack-selector-methods.md)
- [2D Operations](./workplane-2d-operations.md)
- [3D Operations (Requiring 2D Workplane)](./workplane-3d-operations.md)
