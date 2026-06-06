# Tagging and Splitting

Tag a workplane state for later recall, and split a solid into two halves at a workplane.

```python
import cadquery as cq

# Tag a workplane, branch off two extrusions from the same base
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

# Split a solid at a mid-plane and keep one half
box_with_hole = (
    cq.Workplane("XY")
    .box(1, 1, 1)
    .faces(">Z")
    .workplane()
    .circle(0.25)
    .cutThruAll()
)
top_half = box_with_hole.faces(">Y").workplane(-0.5).split(keepTop=True)
```

## Notes

- `.tag(name)` saves the current `Workplane` state; `.workplaneFromTagged(name)` restores it.
- Tags are scoped to the `Workplane` chain; they do not persist across separate `Workplane` instances.
- `.split(keepTop=True, keepBottom=True)` returns a `Compound`; call `.all()` to iterate the two pieces.
- Use `.faces(selector, tag="tagname")` to filter faces relative to tagged geometry rather than the final solid.
