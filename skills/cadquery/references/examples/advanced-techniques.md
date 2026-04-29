# Advanced Techniques

Examples for tagging objects for later reselection, splitting solids with workplanes, and the classic OCC bottle model.

## Tagging Objects

Tag a point in the workplane chain so it can be recalled later with `.workplaneFromTagged()` or used as a face filter, avoiding redundant geometry selectors.

### Signature / Usage

```python
result = (
    cq.Workplane("XY")
    .box(10, 10, 10)
    .faces(">Z")
    .workplane()
    .tag("baseplane")
    .center(-3, 0)
    .circle(1)
    .extrude(3)
    .workplaneFromTagged("baseplane")
    .center(3, 0)
    .circle(1)
    .extrude(2)
)
```

### Key APIs

- `.tag(name)` — tag the current CQ object state with a string name
- `.workplaneFromTagged(name)` — restore the workplane saved under `name`
- `.faces(selector, tag=name)` — filter faces relative to the tagged geometry

**Face filtering with tag:**

```python
result = (
    cq.Workplane("XY")
    .polygon(3, 5)
    .extrude(4)
    .tag("prism")
    .sphere(10)
    .faces("<X", tag="prism")
    .workplane()
    .circle(1)
    .cutThruAll()
)
```

---

## Splitting an Object

Divide a solid at a workplane, keeping one or both halves.

### Signature / Usage

```python
c = cq.Workplane("XY").box(1, 1, 1).faces(">Z").workplane().circle(0.25).cutThruAll()
result = c.faces(">Y").workplane(-0.5).split(keepTop=True)
```

### Key APIs

- `.split(keepTop=True, keepBottom=False)` — split the solid at the current workplane; returns a compound of selected halves
- `keepTop` / `keepBottom` — booleans selecting which side(s) to retain

---

## The Classic OCC Bottle

The canonical OpenCascade tutorial example — a simple bottle shape — reproduced concisely with CadQuery.

### Signature / Usage

```python
(L, w, t) = (20.0, 6.0, 3.0)
s = cq.Workplane("XY")

p = (
    s.center(-L / 2.0, 0)
    .vLine(w / 2.0)
    .threePointArc((L / 2.0, w / 2.0 + t), (L, w / 2.0))
    .vLine(-w / 2.0)
    .mirrorX()
    .extrude(30.0, True)
)

p = p.faces(">Z").workplane(centerOption="CenterOfMass").circle(3.0).extrude(2.0, True)
result = p.faces(">Z").shell(0.3)
```

### Key APIs

- `.mirrorX()` — mirror the wire about the X axis
- `.extrude(distance, both=True)` — extrude in both directions along the workplane normal
- `.shell(thickness)` — shell the solid to produce a hollow bottle

## Notes

- `.split()` with both `keepTop=True` and `keepBottom=True` returns a `Compound`; use `.all()` to iterate the pieces.
- Tags are stored in the CQ object chain; they do not persist across separate `Workplane` instances.
- The bottle example uses `both=True` on `.extrude()` to produce a symmetric body.

## Related

- [workplanes.md](./workplanes.md)
- [shells-lofts-extrusion.md](./shells-lofts-extrusion.md)
- [full-projects.md](./full-projects.md)
