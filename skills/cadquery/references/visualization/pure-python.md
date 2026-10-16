# Pure Python Visualization

Render CadQuery objects interactively using VTK — no external tools required (CadQuery 2.4+). Import `show` from `cadquery.vis` to display any supported object type.

## Signature / Usage

```python
from cadquery import *
from cadquery.vis import show

show(*objects, alpha=None, **kwargs)
```

Supported object types: `Workplane`, `Sketch`, `Assembly`, `Shape`, `Vector`, `Location`, and lists of any of these. Also accepts VTK `vtkProp` objects directly.

```python
from cadquery import *
from cadquery.vis import show

w = Workplane().sphere(1).split(keepBottom=True) - Workplane().sphere(0.5)
r = w.faces('>Z').fillet(0.1)

show(r, alpha=0.5)
```

### Multiple object types and VTK props

```python
from cadquery import *
from cadquery.func import *
from cadquery.vis import show

w = Workplane().sphere(0.5).split(keepTop=True)
sk = Sketch().rect(1.5, 1.5)
sh = torus(5, 0.5)

r = rect(2, 2)
c = circle(2)

N = 50
params = [i/N for i in range(N)]

vecs = r.positions(params)
locs = c.locations(params)

show(w, sk, sh, vecs, locs)
```

```python
from cadquery.vis import show
from cadquery.func import torus
from vtkmodules.vtkRenderingAnnotation import vtkAnnotatedCubeActor

a = vtkAnnotatedCubeActor()
t = torus(5, 1)

show(t, a)
```

## Notes

- The `cadquery.vis.show` function is blocking — execution halts until the viewer window is closed. For non-blocking visualization use `cadquery.fig.show` (see [Non-blocking visualization](./non-blocking.md)).
- Requires the VTK library to be installed.
- v2.8.0: the `fxaa` parameter now defaults to `False` (it was `True` in v2.7.0; PR 2022). New `orthographic: bool = False` parameter sets a parallel (orthographic) projection instead of perspective (PR 1991).
- In v2.8.0 source, `show()` / `ctrlPts()` also accept the experimental `cadquery.occ_impl.nurbs` `Curve` / `Surface` objects (not described in the official docs).

## Related

- [Non-blocking visualization](./non-blocking.md)
- [Screenshots](./screenshots.md)
- [Styling](./styling.md)
- [Control Points](./control-points.md)
- [Jupyter / JupyterLab](./jupyter.md)
