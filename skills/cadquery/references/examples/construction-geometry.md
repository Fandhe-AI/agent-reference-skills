# Construction Geometry

Use construction geometry shapes (rectangles, circles) as reference scaffolding to precisely locate holes and other features via their vertices or points.

## Using Construction Geometry

Draw a construction rectangle on a face, select its vertices, and drill holes at each vertex location.

### Signature / Usage

```python
result = (
    cq.Workplane("front")
    .box(2, 2, 0.5)
    .faces(">Z")
    .workplane()
    .rect(1.5, 1.5, forConstruction=True)
    .vertices()
    .hole(0.125)
)
```

### Key APIs

- `.rect(xLen, yLen, forConstruction=True)` — draw a rectangle as construction geometry; it is not extruded or cut but its vertices can be used as reference points
- `.vertices()` — select all vertices of the pending construction wires, pushing them onto the stack
- `.hole(diameter)` — drill a hole at each point on the stack

## Notes

- Construction geometry is drawn with `forConstruction=True` and never contributes to the final solid.
- After `.vertices()`, any subsequent feature operation (`.hole()`, `.circle()`, `.cboreHole()`, etc.) is applied once per point on the stack.
- This pattern works with any closed wire: `.rect()`, `.polygon()`, `.circle()`, or custom profiles.

## Related

- [workplanes.md](./workplanes.md)
- [holes-and-fillets.md](./holes-and-fillets.md)
