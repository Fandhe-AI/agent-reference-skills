# Assembly Colors

`cq.Color` assigns display colors to assembly parts. Accepts RGBA tuples or named color strings.

## Signature / Usage

```python
import cadquery as cq

# Named color
cq.Color("black")
cq.Color("yellow")
cq.Color("green")

# RGBA tuple (values 0.0–1.0; alpha controls transparency)
cq.Color(0, 0, 1, 0.2)   # semi-transparent blue
cq.Color(1, 0, 0, 1.0)   # opaque red

# Used in Assembly.add()
assy.add(shape, name="part", color=cq.Color("steelblue"))
assy.add(panel, name="panel", color=cq.Color(0, 0, 1, 0.2))
```

## Options / Props

### `cq.Color(r, g, b, a=0, srgb=True)` or `cq.Color(name)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `r, g, b` | `float` (0–1) | Red, green, blue channels |
| `a` | `float` (0–1) | Alpha in OCC convention: `0` = fully opaque, `1` = fully transparent (default `0`) |
| `srgb` | `bool` | Whether values are in sRGB color space (default `True`) |
| `name` | `str` | Named color string (OCCT color names) |

## Notes

- Over 700 named colors are available (OCCT X11 color set).
- Common names: `"red"`, `"green"`, `"blue"`, `"black"`, `"white"`, `"yellow"`, `"gray"`, `"steelblue"`, `"orange"`, `"cyan"`, `"magenta"`, `"gold"`, `"pink"`, `"violet"`, `"brown"`, `"coral"`, `"ivory"`, `"khaki"`, `"lavender"`, `"salmon"`, `"silver"`, `"tan"`, `"teal"`, `"turquoise"`.
- Gray variants are available as `"gray0"` through `"gray99"`.
- Alpha convention follows OCC: `0` = fully opaque, `1` = fully transparent.
- Color is a display property only; it does not affect geometry or solver behavior.

## Related

- [tutorial.md](./tutorial.md)
