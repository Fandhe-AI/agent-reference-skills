# Assembly Tutorial

Step-by-step guide to building a multi-part assembly using `cq.Assembly`, constraints, and `solve()`.

## Signature / Usage

```python
import cadquery as cq

# Instantiate an assembly and add parts
assy = (
    cq.Assembly()
    .add(shape_or_workplane, name="part_name", color=cq.Color("black"), loc=cq.Location(...))
    .add(...)
)

# Define constraints between parts
assy.constrain("part1@faces@>Z", "part2@faces@<Z", "Plane")
assy.constrain("part1@faces@<X", "part2@faces@<X", "Axis")

# Run the constraint solver
assy.solve()

# Export
assy.export("result.step")  # STEP format
assy.export("result.xml")   # OCCT XML format
```

## Options / Props

### `Assembly()` constructor

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `str` | `None` | Optional name for the root assembly |
| `loc` | `Location` | identity | Initial location of the root assembly |
| `color` | `Color` | `None` | Default color for the assembly |

### `.add(obj, ...)`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `obj` | `Shape` / `Workplane` / `Assembly` | required | Shape to add |
| `name` | `str` | auto-generated | Unique identifier for the part |
| `color` | `Color` | `None` | Display color |
| `loc` | `Location` | identity | Initial placement; overwritten by `solve()` |

### `.constrain(selector1, selector2, kind, param=...)`

| Argument | Description |
|----------|-------------|
| `selector1` | String `"name@subtype@selector"` or `"name?tag"`, or `(name, Shape)` pair |
| `selector2` | Same as `selector1` |
| `kind` | Constraint type string: `"Plane"`, `"Axis"`, `"Point"`, etc. |
| `param` | Numeric parameter; meaning depends on constraint type |

## Notes

- Tagged faces (`rv.faces(">X").tag("X")`) can be referenced with `"part?tag"` syntax.
- `solve()` overwrites initial locations set with `loc=`; initial locations only influence convergence in underconstrained or multi-solution systems.
- Shape objects can be passed directly instead of string selectors: `.constrain("p1", shape1, "p2", shape2, "Axis")` — use `.val()` to extract a single `Shape` from a `Workplane`.

## Related

- [locations.md](./locations.md)
- [constraints.md](./constraints.md)
- [colors.md](./colors.md)
