# Text

Create flat, spine-following, or surface-projected text using the `text()` free function.

## Signature / Usage

```python
from cadquery.func import *
from math import pi

D = 5
H = 2*D
S = H/10
TH = S/10
TXT = "CadQuery"

# base and spine
c = cylinder(D, H).moved(rz=-135)
cf = c.faces("%CYLINDER")
spine = (c * plane().moved(z=D)).edges().trim(pi/2, pi)

# flat text on a planar curve
r1 = text(TXT, 1, spine, planar=True).moved(z=-S)

# text following the spine (normal to surface)
r2 = text(TXT, 1, spine)

# text projected onto a surface
r3 = text(TXT, 1, spine, cf).moved(z=S)

# project and thicken
r4 = offset(r3, TH).moved(z=S)

result = compound(r1, r2, r3, r4)
```

## Options / Props

### Overload 1 — flat text

```python
text(
    txt: str,
    size: Real,
    font: str = "Arial",
    path: str = None,
    kind: Literal["regular", "bold", "italic"] = "regular",
    halign: Literal["center", "left", "right"] = "center",
    valign: Literal["center", "top", "bottom"] = "center",
) -> Shape
```

### Overload 2 — text on a spine

```python
text(
    txt: str,
    size: Real,
    spine: Shape,
    planar: bool = False,
    font: str = "Arial",
    path: str = None,
    kind: Literal["regular", "bold", "italic"] = "regular",
    halign: Literal["center", "left", "right"] = "center",
    valign: Literal["center", "top", "bottom"] = "center",
) -> Shape
```

| Parameter | Description |
|-----------|-------------|
| `spine` | Wire or shape containing a wire used as the text baseline. |
| `planar` | If `True`, keep text in the plane of the spine; otherwise flow normal to the surface. |

### Overload 3 — text on a spine projected onto a surface

```python
text(
    txt: str,
    size: Real,
    spine: Shape,
    base: Shape,
    font: str = "Arial",
    path: str = None,
    kind: Literal["regular", "bold", "italic"] = "regular",
    halign: Literal["center", "left", "right"] = "center",
    valign: Literal["center", "top", "bottom"] = "center",
) -> Shape
```

| Parameter | Description |
|-----------|-------------|
| `base` | Face or shape containing a face onto which each letter is projected along its normal. |

## Notes

- `font` is a font family name (e.g. `"Arial"`). `path` can specify an explicit font file path.
- `kind` selects the font variant: `"regular"`, `"bold"`, or `"italic"`.
- `halign` / `valign` control text anchor alignment.
- To create 3D embossed text, combine `text()` with `offset()` on the result.
- Use `faceOn()` to map flat text onto a curved surface; see [Mapping onto Parametric Space](./parametric-mapping.md).

## Related

- [Operations](./operations.md)
- [Parametric Mapping](./parametric-mapping.md)
