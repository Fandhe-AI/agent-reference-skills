# Styling

Apply appearance overrides to CadQuery objects before passing them to `show()` using the `style()` function. Controls color, transparency, wireframe/mesh overlay, line widths, and mesh resolution.

## Signature / Usage

```python
from cadquery.vis import style

style(
    shape,
    color: str = ...,
    alpha: float = ...,
    tubes: bool = ...,
    linewidth: float = ...,
    mesh: bool = ...,
    meshcolor: str = ...,
    meshlinewidth: float = ...,
    tolerance: float = ...,
    markersize: float = ...,
)
```

```python
from cadquery.vis import *
from cadquery.func import *

show(
    style(
        torus(10, 2),
        color="crimson",
        tubes=True,
        linewidth=5,
        mesh=True,
        meshcolor="blue",
        tolerance=0.1,
    ),
    style(box(3, 3, 3), color="green", markersize=0.1, alpha=0.5),
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shape` | `Shape` | The geometry to style |
| `color` | `str` | Surface color name (e.g. `"crimson"`, `"green"`) |
| `alpha` | `float` | Transparency: `0.0` = fully transparent, `1.0` = opaque |
| `tubes` | `bool` | Render edges as tubes instead of lines |
| `linewidth` | `float` | Width of edge lines (or tube diameter) |
| `mesh` | `bool` | Overlay the tessellation mesh |
| `meshcolor` | `str` | Color name for the mesh overlay |
| `meshlinewidth` | `float` | Line width of the mesh overlay |
| `tolerance` | `float` | Tessellation tolerance — lower values produce finer meshes |
| `markersize` | `float` | Size of vertex/point markers |

## Notes

- `style()` returns a styled wrapper; pass it directly to `show()`.
- Multiple styled objects can be passed to a single `show()` call.
- `alpha` can also be set at the `show()` level as a global default for all objects.

## Related

- [Pure Python](./pure-python.md)
- [Control Points](./control-points.md)
- [Screenshots](./screenshots.md)
