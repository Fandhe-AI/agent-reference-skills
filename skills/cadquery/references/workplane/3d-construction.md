# 3D Construction

Methods for creating and modifying 3D solids. This includes direct primitives (box, sphere, cylinder, wedge), operations that convert 2D pending wires into solids (extrude, revolve, sweep, loft), Boolean operations (cut, union, intersect), and finishing operations (fillet, chamfer, shell).

## Signature / Usage

```python
result = (
    cq.Workplane("XY")
    .box(1, 2, 3)
    .faces(">Z")
    .circle(0.25)
    .extrude(1)
)
```

## Method Reference

### Primitives

| Method | Signature | Description |
|--------|-----------|-------------|
| `box` | `box(length, width, height, centered=True, combine=True, clean=True)` | Rectangular prism at each stack point |
| `sphere` | `sphere(radius, direct=(0,0,1), angle1=-90, angle2=90, angle3=360, centered=True, combine=True, clean=True)` | Sphere at each stack point |
| `cylinder` | `cylinder(height, radius, direct=(0,0,1), angle=360, centered=True, combine=True, clean=True)` | Cylinder at each stack point |
| `wedge` | `wedge(dx, dy, dz, xmin, zmin, xmax, zmax, pnt=(0,0,0), dir=(0,0,1), centered=True, combine=True, clean=True)` | Wedge primitive at each stack point |
| `text` | `text(txt, fontsize, distance, cut=True, combine=False, clean=True, font='Arial', fontPath=None, kind='regular', halign='center', valign='center')` | 3D extruded text |

### Extrusion & Sweeps

| Method | Signature | Description |
|--------|-----------|-------------|
| `extrude` | `extrude(until, combine=True, clean=True, both=False, taper=None)` | Extrude pending wires by distance or to a face/solid |
| `twistExtrude` | `twistExtrude(distance, angleDegrees, combine=True, clean=True)` | Extrude pending wires with helical twist |
| `revolve` | `revolve(angleDegrees=360, axisStart=None, axisEnd=None, combine=True, clean=True)` | Revolve pending wires around an axis |
| `sweep` | `sweep(path, multisection=False, sweepAlongWires=None, makeSolid=True, isFrenet=False, combine=True, clean=True, transition='transformed', normal=None, auxSpine=None)` | Sweep pending wires along a path wire |
| `loft` | `loft(ruled=False, combine=True, clean=True)` | Loft between wires in `pendingWires` |

### Boolean Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `cut` | `cut(toCut, combine=True, clean=True)` | Subtract `toCut` solid from context solid |
| `cutBlind` | `cutBlind(until, both=False, taper=None, clean=True)` | Blind cut using pending wires |
| `cutThruAll` | `cutThruAll(both=False, taper=0, clean=True)` | Through-all cut using pending wires |
| `union` | `union(toUnion=None, glue=False, clean=True)` | Union stack items (or `toUnion`) with context solid |
| `intersect` | `intersect(toIntersect=None, clean=True)` | Intersect stack items (or `toIntersect`) with context solid |
| `combine` | `combine(clean=True, glue=False)` | Combine all stack items into a single solid |

### Holes

| Method | Signature | Description |
|--------|-----------|-------------|
| `hole` | `hole(diameter, depth=None, clean=True)` | Simple cylindrical hole at each stack point |
| `cboreHole` | `cboreHole(diameter, cboreDiameter, cboreDepth, depth=None, clean=True)` | Counterbored hole at each stack point |
| `cskHole` | `cskHole(diameter, cskDiameter, cskAngle, depth=None, clean=True)` | Countersunk hole at each stack point |

### Finishing

| Method | Signature | Description |
|--------|-----------|-------------|
| `fillet` | `fillet(radius)` | Fillet selected edges with given radius |
| `chamfer` | `chamfer(length, length2=None)` | Chamfer selected edges |
| `shell` | `shell(thickness, kind='arc')` | Hollow out solid; removes selected faces |
| `clean` | `clean()` | Run `BRepTools.Upgrade` to simplify/heal the solid |

### Transforms

| Method | Signature | Description |
|--------|-----------|-------------|
| `split` | `split(keepTop=False, keepBottom=False)` | Split context solid using a workplane |
| `rotate` | `rotate(axisStartPoint, axisEndPoint, angleDegrees)` | Rotate all stack objects around an axis |
| `rotateAboutCenter` | `rotateAboutCenter(axisEndPoint, angleDegrees)` | Rotate around object's center |
| `translate` | `translate(vec)` | Translate all stack objects by a vector |
| `mirror` | `mirror(mirrorPlane='XY', basePointVector=(0,0,0), union=False)` | Mirror a solid about a plane |
| `transformed` | `transformed(rotate=(0,0,0), offset=(0,0,0))` | Apply rotation then translation to current workplane, creating a new workplane |
| `section` | `section(height=0.0)` | Return a cross-section of the current solid at the given height on the current workplane |

### Utility Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `cutEach` | `cutEach(fcn, useLocalCoords=False, clean=True)` | Cut a solid from the context solid at each stack point using a callback |
| `interpPlate` | `interpPlate(surf_edges, surf_pts, thickness, combine=True, clean=True, degree=3, nbPtsOnCur=15, nbIter=2, anisotropy=False, tol2d=1e-05, tol3d=1e-04, tolAng=1e-01, tolCurv=1e-01, maxDeg=8, maxSegments=9)` | Create a surface (plate) interpolating through edges and/or points |

## Notes

- `combine=True` (default for most primitives and extrusion methods) automatically Booleans the result into the context solid.
- `clean=True` (default) calls `clean()` after each solid operation, which can be disabled for performance.
- `extrude(until)` accepts a numeric distance **or** the string `'next'` / `'last'` to extrude to the next or last face of the context solid.
- `hole()`, `cboreHole()`, and `cskHole()` use the current stack points as hole centers and the workplane's Z axis as the drill direction.
- `fillet()` and `chamfer()` operate on **selected edges** — select edges first with `edges()` before calling them.

## Related

- [2D Construction](./2d-construction.md)
- [The Context Solid](./context-solid.md)
- [Selectors](./selectors.md)
- [Iteration](./iteration.md)
