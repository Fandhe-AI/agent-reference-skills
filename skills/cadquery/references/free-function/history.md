# History

Optional history tracking for free function operations: record which shapes were generated, modified or deleted, and refer to them later by index or by name.

## Signature / Usage

```python
from cadquery.func import *

dx = 5
dy = 3
dz = 1.5

hist = History()

# make a hollow base
base_face = plane(dx, dy)
base = extrude(base_face, (0, 0, dz))
res = fillet(base, base.edges("|Z"), 0.5)
ftop = res.face(">Z")
resh = hollow(res, ftop, -0.2, history=hist, name="hollow")

# add mounting points
mid = resh.face(">Z[-2]")
f = (
    face(circle(0.1), circle(0.05))
    .moved(offset2D(base_face.wire(), -0.5).vertices())
    .moved(mid)
    .moved(z=0)
)
res = prism(resh, mid, f, base.face(">Z"), history=hist, name="mounts")

# add fillet
res = fillet(
    res,
    hist["hollow"].generated().edges("<Z") | hist["mounts"].generated().edges("<Z"),
    0.04,
)

# add a lip
top = hist["hollow"].modified().face(">Z")
top_ow = top.outerWire()

res = prism(
    res,
    top,
    face(top_ow, offset2D(top_ow, -0.1)),
    0.2,
    additive=False,
    history=hist,
    name="lip",
)

# apply chamfers
res = chamfer(res, hist["lip"].modified(top).face().outerWire(), 0.05)
result = chamfer(
    res, compound([f.face().outerWire() for f in hist["mounts"].last()]), 0.02
)
```

## Options / Props

`History`:

| Member | Signature | Description |
|--------|-----------|-------------|
| `ops` | `list[Op]` | Recorded steps in order. |
| `opDict` | `dict[str, Op]` | Named steps. |
| `__getitem__` | `hist[ix: int \| str] -> Op` | Index into `ops`, or look up by name in `opDict`. |
| `pop` | `pop() -> Op` | Remove and return the last step. |
| `append` | `append(op: Op, name: str \| None = None) -> None` | Add a step; registered in `opDict` if `name` is given. |

`Op` (one operation entry):

| Method | Signature | Description |
|--------|-----------|-------------|
| `modified` | `modified(s: Shape \| None = None) -> Shape` | Shapes modified from `s` (all if omitted). |
| `generated` | `generated(s: Shape \| None = None) -> Shape` | Shapes generated from `s` (all if omitted). |
| `deleted` | `deleted() -> Shape` | Deleted shapes. |
| `images` | `images(s: Shape) -> Shape` | Images of `s`. |
| `first` | `first(s: Shape \| None = None) -> Shape` | First shape (e.g. bottom face) or first shape generated from `s`. |
| `last` | `last(s: Shape \| None = None) -> Shape` | Last shape (e.g. top face) or last shape generated from `s`. |

Operations accept `history=` (a `History` instance) and `name=` (string used for name-based queries).

## Notes

- Source: https://github.com/CadQuery/cadquery/blob/v2.8.0/doc/free-func.rst (Boolean operations section, history paragraph; rendered at https://cadquery.readthedocs.io/en/latest/free-func.html#boolean-operations), https://github.com/CadQuery/cadquery/blob/v2.8.0/cadquery/occ_impl/shapes.py (History / Op)
- The history tracking feature of the free function API is experimental and may change (official warning).
- Instantiate `cadquery.occ_impl.shapes.History` and pass it to the operations of interest; boolean operations and most modeling operations support it.
- To use name-based queries (`hist["hollow"]`), specify the `name` parameter when invoking the operation.
- Some operations such as `extrude` or `prism` support referring to the `first` and `last` shape.
- Present in the v2.8.0 sources used for this reference (`History` / `Op` in `cadquery/occ_impl/shapes.py`); not verified for earlier versions.

## Related

- [Boolean Operations](./boolean-operations.md)
- [Operations](./operations.md)
- [Shape Selection](./shape-selection.md)
