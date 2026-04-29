# Mirroring

Examples for mirroring 2D geometry, 3D solids across named planes, and mirroring from selected faces.

## Mirroring Symmetric Geometry

Mirror a half-profile 2D wire about the Y axis to produce a symmetric closed profile, then extrude.

### Signature / Usage

```python
r = cq.Workplane("front").hLine(1.0)
r = r.vLine(0.5).hLine(-0.25).vLine(-0.25).hLineTo(0.0)
result = r.mirrorY().extrude(0.25)
```

### Key APIs

- `.hLine(distance)` — draw a horizontal line by relative distance
- `.vLine(distance)` — draw a vertical line by relative distance
- `.hLineTo(xCoord)` — draw a horizontal line to an absolute X coordinate
- `.mirrorY()` — mirror the wire about the Y axis and close

---

## Mirroring 3D Objects

Create mirrored copies of a 3D solid about named planes at specified offsets, then union them.

### Signature / Usage

```python
result0 = (
    cadquery.Workplane("XY")
    .moveTo(10, 0)
    .lineTo(5, 0)
    .threePointArc((3.9393, 0.4393), (3.5, 1.5))
    .threePointArc((3.0, 1.912), (2.5, 2.0))
    .lineTo(0, 2.0)
    .close()
)
result = result0.extrude(100)
result = result.rotate((0, 0, 0), (1, 0, 0), 90)
result = result.translate(result.val().BoundingBox().center.multiply(-1))

mirXY_neg = result.mirror(mirrorPlane="XY", basePointVector=(0, 0, -30))
mirXY_pos = result.mirror(mirrorPlane="XY", basePointVector=(0, 0, 30))
mirZY_neg = result.mirror(mirrorPlane="ZY", basePointVector=(-30, 0, 0))
mirZY_pos = result.mirror(mirrorPlane="ZY", basePointVector=(30, 0, 0))

result = result.union(mirXY_neg).union(mirXY_pos).union(mirZY_neg).union(mirZY_pos)
```

### Key APIs

- `.rotate(axisStartPoint, axisEndPoint, angleDegrees)` — rotate the solid about an axis
- `.translate(vector)` — translate the solid by a vector
- `.mirror(mirrorPlane, basePointVector)` — mirror about a named plane (`"XY"`, `"XZ"`, `"ZY"`) at the given base point
- `.union(other)` — boolean union with another solid

---

## Mirroring From Faces

Mirror a 3D solid about a selected face and immediately union the result with the original.

### Signature / Usage

```python
result = cq.Workplane("XY").line(0, 1).line(1, 0).line(0, -0.5).close().extrude(1)
result = result.mirror(result.faces(">X"), union=True)
```

### Key APIs

- `.faces(selector)` — select faces using a string selector
- `.mirror(mirrorPlane, union=True)` — mirror using a face object as the plane; `union=True` fuses with the original

## Notes

- `mirrorPlane` can be a string (`"XY"`, `"XZ"`, `"ZY"`) or a `Face` / `CQ` object.
- `basePointVector` shifts the mirror plane away from the origin along the plane's normal.
- `.mirrorY()` / `.mirrorX()` work on 2D wires only; use `.mirror()` for 3D solids.

## Related

- [basic-shapes.md](./basic-shapes.md)
- [workplanes.md](./workplanes.md)
