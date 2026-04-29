# Sketch Tutorial

The `cq.Sketch()` class provides a 2D sketching API for constructing faces and edges. There are three main construction approaches: face-based, edge-based, and constraint-based. All modifications happen in-place; Sketch does not implement history.

## Signature / Usage

```python
import cadquery as cq

# Face-based: construct faces and combine with boolean modes
result = (
    cq.Sketch()
    .trapezoid(4, 3, 90)
    .vertices()
    .circle(0.5, mode="s")
    .reset()
    .vertices()
    .fillet(0.25)
    .reset()
    .rarray(0.6, 1, 5, 1)
    .slot(1.5, 0.4, mode="s", angle=90)
)
```

## Face-Based API Methods

| Signature | Description |
|-----------|-------------|
| `rect(w, h, angle=0, mode='a', tag=None)` | Construct a rectangular face of width `w` and height `h` |
| `circle(r, mode='a', tag=None)` | Construct a circular face of radius `r` |
| `ellipse(a1, a2, angle=0, mode='a', tag=None)` | Construct an elliptical face with semi-axes `a1` and `a2` |
| `trapezoid(w, h, a1, a2=None, angle=0, mode='a', tag=None)` | Construct a trapezoidal face; `a1` is the left wall angle, `a2` defaults to `a1` for symmetric trapezoid |
| `slot(w, h, angle=0, mode='a', tag=None)` | Construct a slot-shaped face (rectangle with semicircular ends); `w` is total length, `h` is width |
| `regularPolygon(r, n, angle=0, mode='a', tag=None)` | Construct a regular polygon with circumradius `r` and `n` sides |
| `polygon(pts, angle=0, mode='a', tag=None)` | Construct a polygonal face from an iterable of `(x, y)` points |
| `face(b, angle=0, mode='a', tag=None, ignore_selection=False)` | Construct a face from a `Wire`, iterable of `Edge`s, `Shape`, or another `Sketch` |

## Modes

Every face-based method accepts a `mode` parameter:

| mode | Effect |
|------|--------|
| `'a'` | Fuse (add) — default |
| `'s'` | Cut (subtract) |
| `'i'` | Intersect |
| `'r'` | Replace |
| `'c'` | Construction only (must specify `tag`) |

```python
result = (
    cq.Sketch()
    .rect(1, 2, mode="c", tag="base")
    .vertices(tag="base")
    .circle(0.7)
    .reset()
    .edges("|Y", tag="base")
    .ellipse(1.2, 1, mode="i")
    .reset()
    .rect(2, 2, mode="i")
    .clean()
)
```

## Selection & Layout Methods

| Signature | Description |
|-----------|-------------|
| `vertices(s=None, tag=None)` | Select vertices; optionally filter by selector string or tag |
| `edges(s=None, tag=None)` | Select edges; optionally filter by selector string or tag |
| `wires(s=None, tag=None)` | Select wires; optionally filter by selector string or tag |
| `faces(s=None, tag=None)` | Select faces; optionally filter by selector string or tag |
| `reset()` | Clear the current selection |
| `tag(tag)` | Tag the current selection for later reference |
| `select(*tags)` | Set selection to previously tagged objects |
| `push(locs, tag=None)` | Set selection to given `Location` or `(x, y)` point positions |
| `rarray(xs, ys, nx, ny)` | Generate a rectangular array of `nx × ny` locations spaced `xs`, `ys` apart |
| `parray(r, a1, da, n, rotate=True)` | Generate a polar array of `n` locations at radius `r`, starting at angle `a1`, spanning `da` degrees |
| `distribute(n, start=0, stop=1, rotate=True)` | Distribute `n` locations along selected edges/wires |
| `each(callback, mode='a', tag=None, ignore_selection=False)` | Apply a callback returning `Face`/`Sketch`/`Compound` at each current location |

## Modification Methods

| Signature | Description |
|-----------|-------------|
| `fillet(d)` | Add a fillet of radius `d` at selected vertices |
| `chamfer(d)` | Add a chamfer of size `d` at selected vertices |
| `clean()` | Remove internal wires (simplify compound face) |
| `delete()` | Delete selected objects |

## Edge-Based API

Build a sketch from individual edges, then call `assemble()` to convert to faces.

```python
result = (
    cq.Sketch()
    .segment((0.0, 0), (0.0, 2.0))
    .segment((2.0, 0))
    .close()
    .arc((0.6, 0.6), 0.4, 0.0, 360.0)
    .assemble(tag="face")
    .edges("%LINE", tag="face")
    .vertices()
    .chamfer(0.2)
)
```

| Signature | Description |
|-----------|-------------|
| `segment(p1, p2, tag=None, forConstruction=False)` | Construct a straight line segment between two `(x, y)` points |
| `arc(p1, p2, p3, tag=None, forConstruction=False)` | Construct an arc through three `(x, y)` points; also accepts `(center, radius, start_angle, end_angle)` form |
| `spline(pts, tangents=None, periodic=False, tag=None, forConstruction=False)` | Construct a spline through `pts`; optional `tangents` at each point |
| `bezier(pts, tag=None, forConstruction=False)` | Construct a Bezier curve through control points |
| `edge(val, tag=None, forConstruction=False)` | Add an existing `Edge` object to the sketch |
| `close(tag=None)` | Connect the last edge back to the first to close the wire |
| `assemble(mode='a', tag=None)` | Assemble placed edges into closed faces |

## Convex Hull

> **Warning:** Convex hull is currently experimental.

```python
result = (
    cq.Sketch()
    .arc((0, 0), 1.0, 0.0, 360.0)
    .arc((1, 1.5), 0.5, 0.0, 360.0)
    .segment((0.0, 2), (-1, 3.0))
    .hull()
)
```

| Signature | Description |
|-----------|-------------|
| `hull(mode='a', tag=None)` | Generate a convex hull from selected segments and circles |

## Constraint-Based Sketches

> **Warning:** Constraint-based sketches are currently experimental. Only segments and arcs are supported.

```python
result = (
    cq.Sketch()
    .segment((0, 0), (0, 3.0), "s1")
    .arc((0.0, 3.0), (1.5, 1.5), (0.0, 0.0), "a1")
    .constrain("s1", "Fixed", None)
    .constrain("s1", "a1", "Coincident", None)
    .constrain("a1", "s1", "Coincident", None)
    .constrain("s1", "a1", "Angle", 45)
    .solve()
    .assemble()
)
```

| Signature | Description |
|-----------|-------------|
| `constrain(tag, constraint, arg)` | Add a constraint of kind `constraint` to tagged entity; for 2-arity constraints: `constrain(tag1, tag2, constraint, arg)` |
| `solve()` | Solve the constraint system and update edge positions |

### Constraint Types

Arguments are passed as one tuple to `constrain()`. `0..1` refers to a float parameterizing position along the entity (0 = start, 1 = end).

| Name | Arity | Entities | Arguments | Description |
|------|-------|----------|-----------|-------------|
| `FixedPoint` | 1 | All | `None` for arc center or `0..1` for point on segment/arc | Specified point is fixed |
| `Coincident` | 2 | All | `None` | Specified points coincide |
| `Angle` | 2 | All | `angle` | Angle between the tangents of the two entities is fixed |
| `Length` | 1 | All | `length` | Specified entity has fixed length |
| `Distance` | 2 | All | `None or 0..1, None or 0..1, distance` | Distance between two points is fixed |
| `Radius` | 1 | Arc | `radius` | Specified entity has a fixed radius |
| `Orientation` | 1 | Segment | `x, y` | Specified entity is parallel to `(x, y)` |
| `ArcAngle` | 1 | Arc | `angle` | Specified entity has a fixed angular span |

## Other Utility Methods

| Signature | Description |
|-----------|-------------|
| `offset(d, mode='a', tag=None)` | Offset selected wires or edges by distance `d` |
| `copy()` | Create a shallow copy of the sketch |
| `located(loc)` | Copy the sketch with a new `Location` |
| `moved(*args, **kwargs)` | Copy the sketch with moved faces |
| `importDXF(filename, tol=1e-6, exclude=[], include=[], angle=0, mode='a', tag=None)` | Import a DXF file and construct face(s) |
| `export(fname, tolerance=0.1, angularTolerance=0.1, opt=None)` | Export the sketch to a file |
| `val()` | Return the single current selection value |
| `vals()` | Return a list of all current selection values |

## Notes

- Selectors are supported but selection must be explicitly reset with `reset()` between operations.
- Construction mode (`mode='c'`) requires a `tag` to reference the object later.
- After `assemble()`, face-based operations (fillet, chamfer, boolean modes) can be applied to the result.
- `clean()` removes internal/redundant wires from a compound face.

## Related

- [workplane-integration.md](./workplane-integration.md)
