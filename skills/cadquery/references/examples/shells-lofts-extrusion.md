# Shells, Lofts, and Extrusion Variants

Examples for creating thin-walled shells, lofted sections between profiles, and extruding up to a target face.

## Shelling To Create Thin Features

Convert a solid into a uniform-thickness shell. A negative thickness hollows inward; a positive thickness grows outward. Optionally restrict shelling to specific faces.

### Signature / Usage

```python
# Hollow box (open top)
result = cq.Workplane("front").box(2, 2, 2).shell(-0.1)

# Shell only selected faces
result = cq.Workplane("front").box(2, 2, 2).faces("+Z or -X or +X").shell(0.1)
```

### Key APIs

- `.shell(thickness)` — offset all faces (or selected faces) by `thickness`; negative value hollows the solid
- `.faces(selector)` — optional face pre-selection before `.shell()`

---

## Making Lofts

Loft between two or more wire profiles at different workplane heights to sweep through varying cross-sections.

### Signature / Usage

```python
result = (
    cq.Workplane("front")
    .box(4.0, 4.0, 0.25)
    .faces(">Z")
    .circle(1.5)
    .workplane(offset=3.0)
    .rect(0.75, 0.5)
    .loft(combine=True)
)
```

### Key APIs

- `.loft(combine=True)` — create a lofted solid from all pending wires; `combine=True` fuses it with the existing solid
- Multiple workplane levels are implied by the chain: the first wire is on the current face, the second on the offset workplane

---

## Extruding Until a Given Face

Extrude a wire up to the next or last face of an existing solid (including non-planar surfaces) without knowing the exact distance.

### Signature / Usage

```python
# Extrude to the next face
result = (
    cq.Workplane(origin=(20, 0, 0))
    .circle(2)
    .revolve(180, (-20, 0, 0), (-20, -1, 0))
    .center(-20, 0)
    .workplane()
    .rect(20, 4)
    .extrude("next")
)
```

### Key APIs

- `.extrude("next")` — extrude until the next face of the current solid
- `.extrude("last")` — extrude until the last (farthest) face
- `.extrude(face_object)` — extrude until a specific `Face` object (supports non-planar targets)
- `.revolve(angleDegrees, axisStart, axisEnd)` — revolve a wire around an axis to create a solid
- `.cutBlind("last")` — cut to the last face; analogous syntax for boolean subtraction

## Notes

- `"next"` and `"last"` are string literals passed to `.extrude()` or `.cutBlind()`.
- `.shell()` with a positive thickness grows outward from all faces; selecting specific faces restricts which faces are offset.
- Loft requires at least two closed wires on different workplane levels.

## Related

- [basic-shapes.md](./basic-shapes.md)
- [holes-and-fillets.md](./holes-and-fillets.md)
