# Using OpenCascade Methods

The simplest way to extend CadQuery is to use OpenCascade (OCP) scripting directly within build methods. CadQuery's high-level API is built on top of OCP, so any CadQuery operation has an equivalent OCP implementation.

## Signature / Usage

```python
# CadQuery high-level equivalent
import cadquery as cq
result = cq.Workplane("XY").box(1.0, 2.0, 3.0).val()

# Equivalent OCP implementation
from OCP.BRepPrimAPI import BRepPrimAPI_MakeBox
from OCP.gp import gp_Ax2, gp_Dir, gp_Pnt

result = cq.Shape.cast(
    BRepPrimAPI_MakeBox(
        gp_Ax2(gp_Pnt(-0.5, -1.0, -1.5), gp_Dir(0, 0, 1)), 1.0, 2.0, 3.0
    ).Shape()
)
```

## Notes

- CadQuery and OCP methods can be freely mixed within the same script.
- Use `cq.Shape.cast()` to wrap OCP shape objects into CadQuery `Shape` instances.
- After obtaining a CadQuery `Shape`, you can call CadQuery selectors and methods on it normally.

```python
box1 = cq.Shape.cast(
    BRepPrimAPI_MakeBox(
        gp_Ax2(gp_Pnt(-0.5, -1.0, -1.5), gp_Dir(0, 0, 1)), 1.0, 2.0, 3.0
    ).Shape()
)
area = box1.faces(">X").Area()  # returns 6.0
```

## Related

- [Plugins](./plugins.md)
- [Plugin Example](./plugin-example.md)
