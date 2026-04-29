# Moving Points and Point-Based Operations

Examples covering workplane center repositioning, point lists, polygons, polylines, and spline edges.

## Moving The Current Working Point

Establish new workplane centers at specific locations to create interior features within a closed profile.

### Signature / Usage

```python
result = cq.Workplane("front").circle(3.0)
result = result.center(1.5, 0.0).rect(0.5, 0.5)
result = result.center(-1.5, 1.5).circle(0.25)
result = result.extrude(0.25)
```

### Key APIs

- `.center(x, y)` — move the current working point by a relative offset

---

## Using Point Lists

Create multiple features at various locations by pushing a list of points onto the stack, avoiding manual workplane repositioning.

### Signature / Usage

```python
r = cq.Workplane("front").circle(2.0)
r = r.pushPoints([(1.5, 0), (0, 1.5), (-1.5, 0), (0, -1.5)])
r = r.circle(0.25)
result = r.extrude(0.125)
```

### Key APIs

- `.pushPoints(pointList)` — push a list of `(x, y)` tuples onto the stack as current points

---

## Polygons

Create regular polygon shapes at stack points. Useful for hex or other polygon hole patterns.

### Signature / Usage

```python
result = (
    cq.Workplane("front")
    .box(3.0, 4.0, 0.25)
    .pushPoints([(0, 0.75), (0, -0.75)])
    .polygon(6, 1.0)
    .cutThruAll()
)
```

### Key APIs

- `.polygon(nSides, diameter)` — draw a regular polygon
- `.cutThruAll()` — cut the pending wires through the entire solid

---

## Polylines

Create shapes from a sequence of connected points. Combine with `.mirrorY()` to build symmetric cross-sections such as an I-beam.

### Signature / Usage

```python
(L, H, W, t) = (100.0, 20.0, 20.0, 1.0)
pts = [
    (0, H / 2.0),
    (W / 2.0, H / 2.0),
    (W / 2.0, (H / 2.0 - t)),
    (t / 2.0, (H / 2.0 - t)),
    (t / 2.0, (t - H / 2.0)),
    (W / 2.0, (t - H / 2.0)),
    (W / 2.0, H / -2.0),
    (0, H / -2.0),
]
result = cq.Workplane("front").polyline(pts).mirrorY().extrude(L)
```

### Key APIs

- `.polyline(listOfXYTuple)` — draw a series of connected line segments
- `.mirrorY()` — mirror the current wire about the Y axis and combine

---

## Defining an Edge with a Spline

Use a spline curve through a collection of points to create a smooth, complex edge profile.

### Signature / Usage

```python
s = cq.Workplane("XY")
sPnts = [
    (2.75, 1.5),
    (2.5, 1.75),
    (2.0, 1.5),
    (1.5, 1.0),
    (1.0, 1.25),
    (0.5, 1.0),
    (0, 1.0),
]
r = s.lineTo(3.0, 0).lineTo(3.0, 1.0).spline(sPnts, includeCurrent=True).close()
result = r.extrude(0.5)
```

### Key APIs

- `.spline(listOfXYTuple, includeCurrent=True)` — draw a spline through the given points; `includeCurrent=True` uses the current point as the start

## Notes

- `.pushPoints()` replaces the stack contents with the supplied points; subsequent 2D operations apply at each point.
- `.mirrorY()` mirrors about the Y axis of the current workplane and fuses the result, producing a closed wire.

## Related

- [basic-shapes.md](./basic-shapes.md)
- [construction-geometry.md](./construction-geometry.md)
