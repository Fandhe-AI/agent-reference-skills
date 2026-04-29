# Holes and Fillets

Examples for counterbored and countersunk holes, 2D wire offsetting, and edge filleting.

## Making Counter-Bored and Counter-Sunk Holes

Place counterbored (`cboreHole`) or countersunk (`cskHole`) holes in a single operation. Supports multiple locations by combining with construction geometry vertices.

### Signature / Usage

```python
result = (
    cq.Workplane(cq.Plane.XY())
    .box(4, 2, 0.5)
    .faces(">Z")
    .workplane()
    .rect(3.5, 1.5, forConstruction=True)
    .vertices()
    .cboreHole(0.125, 0.25, 0.125, depth=None)
)
```

### Key APIs

| Method | Parameters | Description |
|--------|-----------|-------------|
| `.cboreHole(diameter, cboreDiameter, cboreDepth, depth=None)` | hole dia, counterbore dia, counterbore depth, total depth | Counterbored hole |
| `.cskHole(diameter, cskDiameter, cskAngle, depth=None)` | hole dia, countersink dia, countersink angle, total depth | Countersunk hole |

- `depth=None` drills all the way through.

---

## Offsetting Wires in 2D

Transform a 2D wire inward or outward using different corner-extension modes. Also supports using the outer edges of an existing face as the source wire.

### Signature / Usage

```python
# Offset a pentagon outward with arc corners
arc = cq.Workplane().polygon(5, 10).offset2D(1, "arc").extrude(0.1)

# Offset the top face edges inward, use vertices for bolt holes
result = (
    cq.Workplane()
    .box(4, 2, 0.5)
    .faces(">Z")
    .edges()
    .toPending()
    .offset2D(-0.25, forConstruction=True)
    .vertices()
    .cboreHole(0.125, 0.25, 0.125, depth=None)
)
```

### Key APIs

- `.offset2D(distance, kind="arc")` — offset the current wire; `kind` can be `"arc"`, `"intersection"`, or `"tangent"`
- `.edges().toPending()` — push the selected edges onto the pending wire stack for use with `.offset2D()`
- `forConstruction=True` in `.offset2D()` — treat the offset wire as construction geometry

---

## Rounding Corners with Fillet

Apply a fillet radius to selected edges of a solid to produce rounded corners.

### Signature / Usage

```python
result = cq.Workplane("XY").box(3, 3, 0.5).edges("|Z").fillet(0.125)
```

### Key APIs

- `.edges(selector)` — select edges; `"|Z"` selects edges parallel to the Z axis (vertical edges of a box)
- `.fillet(radius)` — round the selected edges with the given radius

## Notes

- `depth=None` in hole operations causes the hole to go through the entire solid.
- `.offset2D()` distance is positive for outward offset, negative for inward.
- `.fillet()` must be called after edge selection; omitting `.edges()` attempts to fillet all edges.

## Related

- [construction-geometry.md](./construction-geometry.md)
- [shells-lofts-extrusion.md](./shells-lofts-extrusion.md)
- [full-projects.md](./full-projects.md)
