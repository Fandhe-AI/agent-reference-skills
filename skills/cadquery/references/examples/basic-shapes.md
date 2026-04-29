# Basic Shapes

Foundational examples for creating simple 3D solids: rectangular plates, holes, extrusions, and profiles built from lines and arcs.

## Simple Rectangular Plate

Create the simplest possible 3D solid — a rectangular box.

### Signature / Usage

```python
result = cadquery.Workplane("front").box(2.0, 2.0, 0.5)
```

### Key APIs

- `Workplane(plane)` — establish a working plane
- `.box(length, width, height)` — create a rectangular solid

---

## Plate with Hole

A rectangular box with a through-hole added to the top face.

### Signature / Usage

```python
length = 80.0
height = 60.0
thickness = 10.0
center_hole_dia = 22.0

result = (
    cq.Workplane("XY")
    .box(length, height, thickness)
    .faces(">Z")
    .workplane()
    .hole(center_hole_dia)
)
```

### Key APIs

- `.box()` — rectangular solid
- `.faces(">Z")` — select the top face
- `.workplane()` — place a new workplane on the selected face
- `.hole(diameter)` — drill a through-hole at the current center

---

## Extruded Prismatic Solid

Build a prismatic solid by drawing 2D profiles (circles, rectangles) and extruding them. The center of the previously drawn object becomes the reference for subsequent operations.

### Signature / Usage

```python
result = cq.Workplane("front").circle(2.0).rect(0.5, 0.75).extrude(0.5)
```

### Key APIs

- `.circle(radius)` — draw a circle on the current workplane
- `.rect(xLen, yLen)` — draw a rectangle
- `.extrude(distance)` — extrude all pending wires into a solid

---

## Building Profiles Using Lines and Arcs

Create complex 2D profiles with chained line and arc operations, then extrude into a 3D solid.

### Signature / Usage

```python
result = (
    cq.Workplane("front")
    .lineTo(2.0, 0)
    .lineTo(2.0, 1.0)
    .threePointArc((1.0, 1.5), (0.0, 1.0))
    .close()
    .extrude(0.25)
)
```

### Key APIs

- `.lineTo(x, y)` — draw a line to an absolute point
- `.threePointArc(midPoint, endPoint)` — draw an arc through three points
- `.close()` — close the open wire back to the start point
- `.extrude(distance)` — extrude the closed profile

## Notes

- `Workplane("front")` corresponds to the XZ plane; `"XY"` is the horizontal plane.
- `.faces(">Z")` selects the face with the largest Z coordinate (top face of a box).
- Profiles must be closed before extrusion; use `.close()` to close an open wire.

## Related

- [moving-points.md](./moving-points.md)
- [workplanes.md](./workplanes.md)
