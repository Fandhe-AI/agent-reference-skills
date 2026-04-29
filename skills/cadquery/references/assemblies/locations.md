# Object Locations

`cq.Location` specifies translation and rotation when adding parts to an assembly.

## Signature / Usage

```python
import cadquery as cq

cone = cq.Solid.makeCone(1, 0, 2)

assy = cq.Assembly()
# Add with explicit location: translation tuple, axis tuple, angle (degrees)
assy.add(
    cone,
    loc=cq.Location((0, 0, 0), (1, 0, 0), 180),
    name="cone0",
    color=cq.Color("green"),
)
# Add at default location (origin, no rotation)
assy.add(cone, name="cone1", color=cq.Color("blue"))

show_object(assy)
```

### `cq.Location(translation, axis, angle)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `translation` | `tuple[float, float, float]` | (x, y, z) offset |
| `axis` | `tuple[float, float, float]` | Rotation axis vector |
| `angle` | `float` | Rotation angle in degrees |

## Notes

- Locations set via `loc=` in `.add()` are **overwritten** by `solve()` when constraints are present.
- In underconstrained systems the solver may not move an object that doesn't contribute to any cost function; its initial location is then preserved.
- For complicated assemblies, supplying approximately correct initial locations can reduce solver computation time.
- Use constraints + `solve()` as the preferred alternative to manually computing locations.

## Related

- [tutorial.md](./tutorial.md)
- [constraints.md](./constraints.md)
