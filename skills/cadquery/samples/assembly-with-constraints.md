# Assembly with Constraints

Combine multiple parts into a positioned assembly using `cq.Assembly`, string-based constraints, and `solve()`.

```python
import cadquery as cq

# Define parts
box = cq.Workplane("XY").box(10, 10, 5)
peg = cq.Workplane("XY").cylinder(8, 1)

# Build the assembly
assy = (
    cq.Assembly()
    .add(box, name="base", color=cq.Color("gray"))
    .add(peg, name="peg", color=cq.Color("goldenrod"))
)

# Constrain peg top face to box top face, aligned on X axis
assy.constrain("base@faces@>Z", "peg@faces@<Z", "Plane")
assy.constrain("base@faces@<X", "peg@faces@<X", "Axis")

# Solve and export
assy.solve()
assy.export("assembly.step")
```

## Notes

- Constraint selector format is `"name@subtype@selector"` — `subtype` is `faces`, `edges`, or `vertices`.
- `"Plane"` aligns two faces coplanarly; `"Axis"` aligns two face normals.
- `solve()` overwrites initial `loc=` positions; initial locations only guide convergence when the system is underconstrained.
- Use `.faces(">Z").tag("top")` and `"name?top"` to reference tagged faces in constraints.
