# Operations

Shape-forming operations: extrude, sweep, loft, revolve, offset, fillet, and chamfer.

## Signature / Usage

```python
from cadquery.func import *

r = rect(1, 0.5)
f = face(r, circle(0.2).moved(0.2), rect(0.2, 0.4).moved(-0.2))
c = circle(0.2)
p = spline([(0,0,0), (0,-1,2)], [(0,0,1), (0,-1,1)])

# extrude
s1 = extrude(r, (0,0,2))
s2 = extrude(fill(r), (0,0,1))

# sweep
s3 = sweep(r, p)
s4 = sweep(f, p)

# loft
s5 = loft(r, c.moved(z=2))
s6 = loft(r, c.moved(z=1), cap=True)

# revolve
s7 = revolve(fill(r), (0.5, 0, 0), (0, 1, 0), 90)
```

## Options / Props

### `extrude`

```python
extrude(s: Shape, d: VectorLike, both: bool = False) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Vertex, Edge, Wire, or Face to extrude. |
| `d` | `VectorLike` | Direction and distance vector. |
| `both` | `bool` | Extrude in both directions symmetrically. |

---

### `revolve`

```python
revolve(s: Shape, p: VectorLike, d: VectorLike, a: float = 360) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Vertex, Edge, Wire, or Face to revolve. |
| `p` | `VectorLike` | Point on the revolution axis. |
| `d` | `VectorLike` | Direction of the revolution axis. |
| `a` | `float` | Angle in degrees (default 360). |

---

### `sweep`

```python
sweep(s: Shape, path: Shape, aux: Shape = None, cap: bool = False) -> Shape
sweep(s: Sequence[Shape], path: Shape, aux: Shape = None, cap: bool = False) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape \| Sequence[Shape]` | Edge, Wire, or Face profile(s). Do not mix faces with other types. |
| `path` | `Shape` | Sweep spine (wire or shape containing a wire). |
| `aux` | `Shape` | Optional auxiliary spine for twist control. |
| `cap` | `bool` | Cap wire sweeps to form a solid. Has no effect when sweeping faces. |

---

### `loft`

```python
loft(*s: Shape, cap=False, ruled=False, continuity="C2",
     parametrization="uniform", degree=3, compat=True,
     smoothing=False, weights=(1,1,1)) -> Shape
loft(s: Sequence[Shape], cap=False, ...) -> Shape
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `s` | `Shape` / `Sequence` | — | Edges, Wires, or Faces to loft through. Do not mix types. |
| `cap` | `bool` | `False` | Close loft at both ends to form a solid (wires only). |
| `ruled` | `bool` | `False` | Use ruled (linear) loft instead of smooth. |
| `continuity` | `"C1"\|"C2"\|"C3"` | `"C2"` | Continuity of the loft surface. |
| `parametrization` | `"uniform"\|"chordal"\|"centripetal"` | `"uniform"` | Parametrization type. |
| `degree` | `int` | `3` | Maximum polynomial degree. |
| `compat` | `bool` | `True` | Check wire compatibility. |
| `smoothing` | `bool` | `False` | Enable smoothing. |
| `weights` | `(float,float,float)` | `(1,1,1)` | Smoothing criterion weights. |

---

### `offset`

```python
offset(s: Shape, t: float, cap: bool = True, both: bool = False, tol: float = 1e-6) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Face or Shell to offset/thicken. |
| `t` | `float` | Offset distance. |
| `cap` | `bool` | Cap the offset result. |
| `both` | `bool` | Offset in both directions and fuse the results. |
| `tol` | `float` | Tolerance. |

---

### `fillet`

```python
fillet(s: Shape, e: Shape, r: float) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Shell or Solid to fillet. |
| `e` | `Shape` | Edge selection (the edges to fillet). |
| `r` | `float` | Fillet radius. |

---

### `chamfer`

```python
chamfer(s: Shape, e: Shape, d: float) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Shell or Solid to chamfer. |
| `e` | `Shape` | Edge selection (the edges to chamfer). |
| `d` | `float` | Chamfer distance. |

## Notes

- `fillet` and `chamfer` require the base shape to contain the selected edges (use selectors like `.edges()` or `.edges('>Z')` to pick them).
- `loft` with face sections automatically handles inner wires (holes); `cap` has no effect for face lofts.
- `sweep` with face sections automatically handles inner wires (holes); `cap` has no effect for face sweeps.
- `offset` uses `BRepOffset_Skin` mode with `GeomAbs_Intersection` join type.

## Related

- [Primitives](./primitives.md)
- [Shape Construction](./shape-construction.md)
- [Adding Features Manually](./adding-features.md)
