# Screenshots

Capture a PNG screenshot of the rendered scene by passing screenshot-related parameters to `show()`. The window renders, saves the file, and (optionally) closes without interaction.

## Signature / Usage

```python
show(
    *objects,
    width: int = ...,
    height: int = ...,
    screenshot: str = ...,
    zoom: float = ...,
    roll: float = ...,
    elevation: float = ...,
    interact: bool = True,
    position: tuple = ...,
)
```

### Basic screenshot

```python
from cadquery.vis import show
from cadquery.func import box

b = box(1, 1, 1)

show(b, width=800, height=800, screenshot='img.png',
     zoom=2, roll=-20, elevation=-30, interact=False)
```

### Camera position control

```python
from cadquery.vis import show
from cadquery.func import torus

R = 10
r = 1
h = 2

t = torus(R, r)

show(t, position=(R, -R, R/h), roll=-45, zoom=0.9)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `width` | `int` | Window width in pixels |
| `height` | `int` | Window height in pixels |
| `screenshot` | `str` | Output filename (PNG) |
| `zoom` | `float` | Magnification / zoom level |
| `roll` | `float` | Camera roll angle (degrees) |
| `elevation` | `float` | Camera elevation angle (degrees) |
| `interact` | `bool` | If `False`, close window after saving; default `True` |
| `position` | `tuple` | Camera position as `(x, y, z)` coordinates |

## Notes

- Set `interact=False` to run headlessly (e.g., in CI pipelines).
- Intermittent issues were observed with this functionality; submit detailed bug reports if problems occur.
- `position`, `roll`, and `zoom` can be combined for precise camera framing.

## Related

- [Pure Python](./pure-python.md)
- [Styling](./styling.md)
