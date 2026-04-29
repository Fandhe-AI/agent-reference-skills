# Full Projects

Complete parametric examples demonstrating real-world part design with CadQuery.

## A Parametric Bearing Pillow Block

A bearing pillow block with a central bearing hole and four counterbored mounting holes, driven entirely by parameters.

### Signature / Usage

```python
(length, height, bearing_diam, thickness, padding) = (30.0, 40.0, 22.0, 10.0, 8.0)

result = (
    cq.Workplane("XY")
    .box(length, height, thickness)
    .faces(">Z")
    .workplane()
    .hole(bearing_diam)
    .faces(">Z")
    .workplane()
    .rect(length - padding, height - padding, forConstruction=True)
    .vertices()
    .cboreHole(2.4, 4.4, 2.1)
)
```

### Key APIs

- `.hole()`, `.cboreHole()` — bearing and mounting holes
- `.rect(..., forConstruction=True).vertices()` — locate mounting holes at rectangle corners

---

## A Parametric Enclosure

A complete box enclosure with lid, rounded edges, screw posts, and configurable dimensions. Uses `.split()` to separate the lid from the body.

### Signature / Usage

```python
# Key parameters
p_outerWidth, p_outerLength, p_outerHeight = 100.0, 150.0, 50.0
p_thickness, p_sideRadius = 3.0, 10.0

oshell = cq.Workplane("XY").rect(p_outerWidth, p_outerLength).extrude(p_outerHeight + p_lipHeight)
oshell = oshell.edges("|Z").fillet(p_sideRadius)

ishell = (
    oshell.faces("<Z").workplane(p_thickness, True)
    .rect(p_outerWidth - 2*p_thickness, p_outerLength - 2*p_thickness)
    .extrude(p_outerHeight - 2*p_thickness, False)
)
box = oshell.cut(ishell)

(lid, bottom) = box.faces(">Z").workplane(-p_thickness - p_lipHeight).split(keepTop=True, keepBottom=True).all()
```

### Key APIs

- `.cut(solid)` — boolean subtraction to hollow the shell
- `.split(keepTop=True, keepBottom=True).all()` — split into lid and body, return both as a list
- `.cboreHole()` / `.cskHole()` — screw holes in the lid

---

## Lego Brick

A parametric Lego brick with configurable stud count, thin/thick flag, underside hollow shell, and internal support posts.

### Signature / Usage

```python
lbumps, wbumps, thin = 6, 2, True
pitch, bumpDiam, bumpHeight = 8.0, 4.8, 1.8
height = 3.2 if thin else 9.6
t = (pitch - 0.2 - bumpDiam) / 2.0

s = cq.Workplane("XY").box(total_length, total_width, height)
s = s.faces("<Z").shell(-t)

s = (
    s.faces(">Z").workplane()
    .rarray(pitch, pitch, lbumps, wbumps, True)
    .circle(bumpDiam / 2.0)
    .extrude(bumpHeight)
)
```

### Key APIs

- `.rarray(xSpacing, ySpacing, xCount, yCount, center)` — rectangular array of points
- `.shell(-t)` — hollow the underside

---

## Braille Example

Emboss Braille dots onto a plate. Each Braille glyph is mapped to dot positions; spherical-cap dots are placed at each location.

### Signature / Usage

```python
from collections import namedtuple

text_lines = ["⠠ ⠋ ⠗ ⠑ ⠑ ⠠ ⠉ ⠠ ⠁ ⠠ ⠙"]
dot_height = 0.5
dot_diameter = 1.3
base_thickness = 1.5

# Dot positions derived from Unicode Braille bit patterns;
# spherical caps are unioned onto the base plate at each position.
result = make_embossed_plate(text_lines, _cell_geometry)
```

### Key APIs

- Unicode Braille code points parsed to extract dot bit patterns (dots 1-8)
- `.sphere()` / `.union()` — spherical caps fused to the base plate
- `namedtuple` used for geometry parameters

---

## Panel With Various Connector Holes

A mounting panel with systematically placed connector cutouts built from arcs, lines, and circles.

### Signature / Usage

```python
width, height, thickness = 400, 500, 2

result = cq.Workplane("front").box(width, height, thickness)

for idx in range(4):
    result = (
        result.workplane(offset=1, centerOption="CenterOfBoundBox")
        .center(157, 210 - idx * 60)
        .moveTo(-23.5, 0).circle(1.6)
        .moveTo(23.5, 0).circle(1.6)
        .moveTo(-17.038896, -5.7)
        .threePointArc((-19.44306, -4.70416), (-20.438896, -2.3))
        .lineTo(-21.25, 2.3)
        # ... additional arc/line segments ...
        .close()
        .cutThruAll()
    )
```

### Key APIs

- `.moveTo(x, y)` — move the pen without drawing
- `.threePointArc()`, `.lineTo()` — mixed arc/line connector outline
- `.cutThruAll()` — cut the assembled wire profile through the panel

---

## Cycloidal Gear

Generate a helical cycloidal gear profile using parametric hypocycloid/epicycloid mathematics, then twist-extrude it.

### Signature / Usage

```python
from math import sin, cos, pi, floor

def hypocycloid(t, r1, r2):
    return ((r1-r2)*cos(t) + r2*cos(r1/r2*t - t),
            (r1-r2)*sin(t) + r2*sin(-(r1/r2*t - t)))

def epicycloid(t, r1, r2):
    return ((r1+r2)*cos(t) - r2*cos(r1/r2*t + t),
            (r1+r2)*sin(t) - r2*sin(r1/r2*t + t))

def gear(t, r1=4, r2=1):
    if (-1)**(1 + floor(t / 2 / pi * (r1/r2))) < 0:
        return epicycloid(t, r1, r2)
    else:
        return hypocycloid(t, r1, r2)

result = (
    cq.Workplane("XY")
    .parametricCurve(lambda t: gear(t * 2 * pi, 6, 1))
    .twistExtrude(15, 90)
    .faces(">Z").workplane()
    .circle(2).cutThruAll()
)
```

### Key APIs

- `.parametricCurve(func)` — generate a wire from a parametric function `f(t) -> (x, y)` for `t` in [0, 1]
- `.twistExtrude(distance, angleDegrees)` — extrude while rotating by the given angle

## Notes

- The enclosure example uses `.workplane(offset, invert=True)` to move inward from a face.
- `.rarray()` centers the array on the current workplane center when `center=True`.
- `.parametricCurve()` samples `t` from 0 to 1 and automatically closes the wire.

## Related

- [holes-and-fillets.md](./holes-and-fillets.md)
- [advanced-techniques.md](./advanced-techniques.md)
- [shells-lofts-extrusion.md](./shells-lofts-extrusion.md)
