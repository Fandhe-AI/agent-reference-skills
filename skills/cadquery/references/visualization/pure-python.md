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

- The `show` function is currently **blocking** — execution halts until the viewer window is closed.
- Requires the VTK library to be installed.

## Related

- [Screenshots](./screenshots.md)
- [Styling](./styling.md)
- [Control Points](./control-points.md)
- [Jupyter / JupyterLab](./jupyter.md)
