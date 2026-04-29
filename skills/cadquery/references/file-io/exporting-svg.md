# Exporting SVG

Exports a 3D shape as a 2D SVG projection. Configurable via `opt` dict for dimensions, projection direction, stroke styles, and hidden-line display.

## Signature / Usage

```python
import cadquery as cq

result = cq.Workplane().box(10, 10, 10)

# Basic export
result.export("/path/to/file/box.svg")

# With custom options
result.export(
    "/path/to/file/box_custom.svg",
    opt={
        "width": 300,
        "height": 300,
        "marginLeft": 10,
        "marginTop": 10,
        "showAxes": False,
        "projectionDir": (0.5, 0.5, 0.5),
        "strokeWidth": 0.25,
        "strokeColor": (255, 0, 0),
        "hiddenColor": (0, 0, 255),
        "showHidden": True,
    },
)

# With perspective (focus distance)
result.export("/path/to/file/box.svg", opt={"focus": 25})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `width` | `int` | SVG canvas width in pixels |
| `height` | `int` | SVG canvas height in pixels |
| `marginLeft` | `int` | Left margin in pixels |
| `marginTop` | `int` | Top margin in pixels |
| `projectionDir` | `tuple[float, float, float]` | View direction vector for projection |
| `showAxes` | `bool` | Whether to render axis indicators |
| `strokeWidth` | `float` | Width of visible edge strokes |
| `strokeColor` | `tuple[int, int, int]` | RGB color of visible edges |
| `hiddenColor` | `tuple[int, int, int]` | RGB color of hidden edges |
| `showHidden` | `bool` | Whether to render hidden edges |
| `focus` | `float` | Perspective focus distance; omit for orthographic projection |

## Notes

- Omitting `focus` produces an orthographic projection.
- `projectionDir` is a 3-tuple representing the view direction vector.

## Related

- [Introduction](./introduction.md)
- [Exporting DXF](./exporting-dxf.md)
- [Exporting Other Formats](./exporting-other.md)
