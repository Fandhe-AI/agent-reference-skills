# Control Points

Visualize the control points of spline surfaces and curves using `ctrlPts()`. Pass the result alongside geometry objects to `show()` for overlay display.

## Signature / Usage

```python
from cadquery.vis import ctrlPts

ctrlPts(shape, color: str = ...)
```

```python
from cadquery.func import *
from cadquery.vis import *

c = circle(1).toSplines()
spine = spline([(0, 0, 0), (-3, -3, 5)], tgts=[(0, 0, 1), (0, -1, 0)])
f = sweep(c, spine)

show(
    f,
    ctrlPts(f),
    spine.moved(x=7),
    ctrlPts(spine.moved(x=7), color="green"),
    alpha=0.0,
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shape` | `Shape` | The geometry whose control points should be visualized |
| `color` | `str` | Color name for the control point display (e.g. `"green"`) |

## Notes

- For some geometries, explicit conversion to spline representation is required before calling `ctrlPts()`.
  - `toSplines()` — approximate conversion to spline form.
  - `toNURBS()` — exact conversion to NURBS form.
- `ctrlPts()` returns a displayable object; pass it directly to `show()` alongside the original geometry.
- Setting `alpha=0.0` on the parent geometry makes the surface transparent so control points are clearly visible.

## Related

- [Pure Python](./pure-python.md)
- [Styling](./styling.md)
