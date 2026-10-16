# Non-blocking Visualization

For non-blocking visualization, one can use the `cadquery.fig.show` function from the `cadquery.fig` module. It relies on VTK/Trame and opens a web browser window. To programmatically remove previously added shapes one can use the `cadquery.fig.clear` function. This function is very handy for interactive work and debugging. Alternatively one can use the `cadquery.fig.Figure` class for more fine-grained control.

## Signature / Usage

```python
from cadquery import *
from cadquery.fig import show, clear, fit

show(*args, name=None, **kwargs)   # show objects without blocking
clear(*args)                       # clear given objects; no arguments clears all
fit()                              # update view to fit all objects
```

Usage sketch (call signatures from `cadquery/fig.py`; the object passed to `show` is illustrative):

```python
from cadquery import *
from cadquery.fig import show, clear

w = Workplane().sphere(1)

show(w, name="sphere")   # returns immediately; the view opens in a web browser
clear(w)                 # remove only this object
clear()                  # remove everything
```

### Figure class

```python
class Figure:
    def __new__(cls, *args, **kwargs): ...   # singleton: one shared instance
    def __init__(self, port: int = 18081): ...

    def show(self, *showables, name: Optional[str] = None, **kwargs)
    def fit(self)      # update view to fit all objects
    def iso(self)
    def up(self)
    def front(self)
    def side(self)
    def clear(self, *shapes)   # no arguments clears all objects
    def pop(self)              # clear the selected showable
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `*args` / `*showables` | `Showable`, `vtkProp3D`, `list[vtkProp3D]` | Objects to display (`show`) |
| `name` | `Optional[str]` | Label for the entry; if omitted the type name of the first object is used |
| `**kwargs` | styling options | Forwarded to the styling function; for shapes `markersize` defaults to `0` (no markers) unless given |
| `port` | `int` (default `18081`) | `Figure.__init__` only |

## Notes

- Relies on VTK/Trame and opens a web browser window.
- Unlike `cadquery.vis.show`, which blocks, `cadquery.fig.show` returns without blocking.
- `Figure` is a singleton (created via `__new__`); the module-level `show`, `clear` and `fit` all operate on that same instance. `Figure.show`, `iso`, `up`, `front`, `side`, `clear` and `pop` return the figure.
- The first object shown triggers a zoom-to-fit.
- The module-level `show` and `clear` functions were added in v2.8.0; the Figure GUI elements were experimental in 2.7.0.
- Installation requirements for Trame are not stated in the docs page and are not covered here.

## Related

- [Pure Python Visualization](./pure-python.md)
- [Styling](./styling.md)
- [Jupyter / JupyterLab](./jupyter.md)
