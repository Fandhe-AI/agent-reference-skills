# Mapping onto Parametric Space

Trim faces using (u,v) space coordinates and map edges, wires, and faces onto curved base surfaces.

## Signature / Usage

### Trimming faces in parametric (u,v) space

```python
from math import pi
from cadquery.func import cylinder, edgeOn, compound, wire

d = 1.5
h = 3

base = cylinder(d, h).faces("%CYLINDER")

# rectangular trim
r1 = base.trim(-pi/2, 0, 0, h/3)

# polyline trim
r2 = base.trim((0,0), (pi,0), (pi/2, h/2))

# construct a pcurve (edge in u,v space)
pcurve = edgeOn(base, [(pi/2, h/4), (pi, h/4), (pi, h/2), (pi/2, h/2)], periodic=True)

# wire-based trim
r3 = base.trim(wire(pcurve))

result = compound(r1, r2.moved(x=2), r3.moved(x=4))
```

### Mapping a wire onto a surface

```python
from cadquery.func import cylinder, loft, wireOn, segment
from math import pi

d = 1.5; h = 3; du = pi; Nturns = 2
base = cylinder(d, h).faces("%CYLINDER")

uv_patch = loft(
    segment((0, 0), (du, 0)),
    segment((Nturns * 2 * pi, h), (Nturns * 2 * pi + du, h))
)

w = wireOn(base, uv_patch)

for e in w:
    assert e.hasPCurve(base), "No p-curve on base present"

result = base.trim(w)
```

### Trimming a periodic face (requires seam + sewing)

```python
from cadquery.func import circle, extrude, spline, edgeOn, segment, wire, shell
from math import pi

r = 5; h = 5
f = extrude(circle(r), (0, 0, -h))

spl    = spline([(0, h), (pi, h/2.5), (2*pi, h)], tgts=[(0.1, 0), (0.1, 0)])
top    = edgeOn(f, spl)
bot    = edgeOn(f, segment((2*pi, 0), (0, 0)))
side1  = edgeOn(f, segment((0, 0), (0, h)))
side2  = edgeOn(f, segment((2*pi, h), (2*pi, 0)))

trim_wire = wire(top, side1, bot, side2)
result = shell(f.trim(trim_wire))
```

### Mapping faces onto a surface

```python
from cadquery.func import sphere, text, faceOn

base = sphere(5).faces()
result = faceOn(base, text("CadQuery", 1))
```

## Options / Props

| Function | Signature | Description |
|----------|-----------|-------------|
| `edgeOn` | `edgeOn(base: Shape, pts: Sequence[Tuple[float, float]], periodic=False, tol=1e-6)` | Build an edge on a face from points in (u,v) space. |
| `edgeOn` | `edgeOn(fbase: Shape, edg: Shape, *edgs, tol=1e-6, N=20)` | Map one or more 3D edges onto a face in (u,v) space by sampling. |
| `wireOn` | `wireOn(base: Shape, w: Shape, tol=1e-6, N=20)` | Map a wire onto a base face in (u,v) space (calls `edgeOn` per edge). |
| `faceOn` | `faceOn(base: Shape, *fcs: Shape, tol=1e-6, N=20)` | Build face(s) on `base` by mapping planar face(s) into its (u,v) space. |
| `Face.trim` | `.trim(u0, v0, u1, v1)` | Rectangular trim in parametric space. |
| `Face.trim` | `.trim(*pts: Tuple[float,float])` | Polyline trim in parametric space. |
| `Face.trim` | `.trim(wire)` | Wire-based trim. |
| `project` | `project(s, base, continuity="C2", degree=3, maxseg=30, tol=1e-4)` | Normal projection of wires onto `base`. |
| `project` | `project(s, base, direction: VectorLike)` | Cylindrical projection of edges onto `base` along a direction. |

## Notes

- Trimming periodic faces (e.g. full cylinders) requires a manual seam edge and an extra `shell()` sewing step.
- `edgeOn` with a sequence of `(u,v)` tuples creates a 2D interpolating spline on the face's parametric domain.
- `wireOn` is a convenience wrapper that calls `edgeOn` on each edge of the wire.
- `faceOn` trims the base face with mapped pcurves derived from the input face's outer and inner wires.
- `project` (normal) uses `BRepAlgo_NormalProjection`; `project` (directional) uses `BRepProj_Projection`.

## Related

- [Shape Construction](./shape-construction.md)
- [Text](./text.md)
- [Operations](./operations.md)
