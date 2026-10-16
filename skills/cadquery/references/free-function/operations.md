# Operations

Shape-forming operations: extrude, sweep, loft, revolve, offset, hollow, prism, draft, fillet, and chamfer, plus 2D offset/fillet/chamfer helpers. Most operations optionally record modeling history.

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

All operations below except `offset2D`, `fillet2D` and `chamfer2D` accept the trailing `history: History | None = None, name: str | None = None` parameters (see [History](./history.md)).

### `extrude`

```python
extrude(s: Shape, d: VectorLike, both: bool = False,
        history: History | None = None, name: str | None = None) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Vertex, Edge, Wire, or Face to extrude. |
| `d` | `VectorLike` | Direction and distance vector. |
| `both` | `bool` | Extrude in both directions symmetrically. |

---

### `revolve`

```python
revolve(s: Shape, p: VectorLike, d: VectorLike, a: float = 360,
        history: History | None = None, name: str | None = None) -> Shape
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
sweep(s: Shape, path: Shape, aux: Shape | None = None, cap: bool = False,
      transition: Literal["transformed", "round", "right"] = "transformed",
      history: History | None = None, name: str | None = None) -> Shape
sweep(s: Sequence[Shape], path: Shape, aux: Shape | None = None, cap: bool = False,
      transition: Literal["transformed", "round", "right"] = "transformed",
      history: History | None = None, name: str | None = None) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape \| Sequence[Shape]` | Edge, Wire, or Face profile(s). Do not mix faces with other types. |
| `path` | `Shape` | Sweep spine (wire or shape containing a wire). |
| `aux` | `Shape` | Optional auxiliary spine for twist control. |
| `cap` | `bool` | Cap wire sweeps to form a solid. Has no effect when sweeping faces. |
| `transition` | `"transformed" \| "round" \| "right"` | Transition mode at path corners (default `"transformed"`). |

---

### `loft`

```python
loft(*s: Shape, cap=False, ruled=False, continuity="C2",
     parametrization="uniform", degree=3, compat=True,
     smoothing=False, weights=(1,1,1),
     history: History | None = None, name: str | None = None) -> Shape
loft(s: Sequence[Shape], cap=False, ..., history=None, name=None) -> Shape
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
offset(s: Shape, t: float, cap: bool = True, both: bool = False, tol: float = 1e-6,
       history: History | None = None, name: str | None = None) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Face or Shell to offset/thicken. |
| `t` | `float` | Offset distance. |
| `cap` | `bool` | Cap the offset result. |
| `both` | `bool` | Offset in both directions and fuse the results. |
| `tol` | `float` | Tolerance. |

---

### `hollow`

```python
hollow(s: Shape, faces: Shape | None, t: float, tol: float = 1e-3,
       kind: Literal["arc", "intersection"] = "intersection",
       history: History | None = None, name: str | None = None)
hollow(s: Shape, t: float, tol: float = 1e-3,
       kind: Literal["arc", "intersection"] = "intersection",
       history: History | None = None, name: str | None = None) -> Solid
```

Make a hollow solid by removing faces and applying thickness `t`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Solid to hollow out. |
| `faces` | `Shape \| None` | Faces to remove. If `None` (or the overload without `faces` is used), a watertight solid with an internal cavity is constructed. |
| `t` | `float` | Wall thickness. Its sign selects the offset direction. |
| `tol` | `float` | Tolerance (default `1e-3`). |
| `kind` | `"arc" \| "intersection"` | Join type (default `"intersection"`). |

---

### `prism`

```python
prism(ctx: Shape, base: Shape | None, faces: Shape,
      t: Real | Shape | tuple[Shape, Shape] | None,
      angle: Real = 0.0, additive: bool = True,
      history: History | None = None, name: str | None = None) -> Shape
prism(ctx: Shape, base: Shape | None, faces: Shape,
      t: Real | Shape | tuple[Shape, Shape] | None,
      dir: VectorLike, additive: bool = True,
      history: History | None = None, name: str | None = None) -> Shape
```

Build a drafted (`angle`) or potentially tilted (`dir`) prismatic feature that can be additive or subtractive.

| Parameter | Type | Description |
|-----------|------|-------------|
| `ctx` | `Shape` | Context shape the feature is added to / cut from. |
| `base` | `Shape \| None` | Base face of the feature, or `None`. |
| `faces` | `Shape` | Face(s) used as feature profile. |
| `t` | `Real \| Shape \| tuple[Shape, Shape] \| None` | Distance, "up to" shape, pair of shapes, or `None` for through-all. |
| `angle` | `Real` | Taper angle in degrees (default `0.0`). |
| `dir` | `VectorLike` | Extrusion direction (second overload). |
| `additive` | `bool` | Add material if `True` (default), remove if `False`. |

---

### `draft`

```python
draft(ctx: Shape, base: Shape, faces: Shape, angle: Real,
      history: History | None = None, name: str | None = None) -> Shape
draft(ctx: Shape, base: Shape, faces: Shape, dir: VectorLike, angle: Real,
      history: History | None = None, name: str | None = None) -> Shape
```

Add a draft angle to the specified faces.

| Parameter | Type | Description |
|-----------|------|-------------|
| `ctx` | `Shape` | Shape to modify. |
| `base` | `Shape` | Face defining the neutral plane (and, in the first overload, the pull direction via its normal). |
| `faces` | `Shape` | Faces to draft. A `ValueError` is raised if a face cannot be used. |
| `dir` | `VectorLike` | Explicit pull direction (second overload). |
| `angle` | `Real` | Draft angle in degrees. |

---

### `fillet`

```python
fillet(s: Shape, edges: Shape, r: float,
       history: History | None = None, name: str | None = None) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Shell or Solid to fillet. |
| `edges` | `Shape` | Edge selection (the edges to fillet). |
| `r` | `float` | Fillet radius. |

---

### `chamfer`

```python
chamfer(s: Shape, edges: Shape, d: float,
        history: History | None = None, name: str | None = None) -> Shape
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `s` | `Shape` | Shell or Solid to chamfer. |
| `edges` | `Shape` | Edge selection (the edges to chamfer). |
| `d` | `float` | Chamfer distance. |

---

### `offset2D`

```python
offset2D(s: Shape, t: float, ctx: Shape | None = None,
         kind: Literal["arc", "intersection", "tangent"] = "arc",
         closed: bool = True) -> Shape
```

2D offset of edges or wires. A `ctx` face might be needed for ambiguous wires/edges. Only works with planar geometries.

---

### `fillet2D` / `chamfer2D`

```python
fillet2D(s: Shape, verts: Shape, r: float) -> Shape
chamfer2D(s: Shape, verts: Shape, d: float) -> Shape
```

Apply a 2D fillet (`r`) or chamfer (`d`) at the given vertices of a planar face `s`.

## Notes

- The official Operations list (v2.8.0) enumerates `extrude`, `loft`, `revolve`, `sweep`, `hollow`, `draft`, `prism`, `chamfer` and `fillet`. `offset`, `offset2D`, `fillet2D` and `chamfer2D` are not in that list; `offset2D` is used in the official history example.
- `hollow`, `prism`, `draft`, `offset2D`, `fillet2D`, `chamfer2D` and `History` are exported from `cadquery.func` since v2.8.0 (absent from the v2.7.0 `cadquery.func`).
- Since v2.8.0 the operations gained optional history tracking (`history` / `name`); the history tracking feature is experimental and may change. `extrude` and `prism` also support referring to the `first` / `last` shape of an `Op`.
- v2.8.0: `sweep` gained the `transition` parameter; `fillet` / `chamfer` name their selection parameter `edges`.
- `fillet` and `chamfer` require the base shape to contain the selected edges (use selectors like `.edges()` or `.edges('>Z')` to pick them).
- `loft` with face sections automatically handles inner wires (holes); `cap` has no effect for face lofts.
- `sweep` with face sections automatically handles inner wires (holes); `cap` has no effect for face sweeps.
- `offset` uses `BRepOffset_Skin` mode with `GeomAbs_Intersection` join type.

## Related

- [Primitives](./primitives.md)
- [Shape Construction](./shape-construction.md)
- [Adding Features Manually](./adding-features.md)
- [History](./history.md)
