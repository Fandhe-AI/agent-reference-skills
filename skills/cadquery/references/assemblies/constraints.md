# Constraints

Constraint types available for `Assembly.constrain()`. Each defines a cost function that `solve()` minimizes.

## Signature / Usage

```python
# String-selector form
assy.constrain("part1@faces@>Z", "part2@faces@<Z", "Plane")
assy.constrain("part1@faces@<X", "part2@faces@<X", "Axis", param=0)

# Shape-object form (for BoxSelector or custom selectors)
assy.constrain("part1", part1.faces(">Z").val(), "part2", part2.faces("<Z").val(), "Axis")

# Single-object constraints (Fixed family)
assy.constrain("part1", "Fixed")
assy.constrain("part1@faces@>Z", "FixedAxis", (1, 0, 0))
assy.constrain("part1", "FixedPoint", (0, 0, 5))
assy.constrain("part1", "FixedRotation", (45, 0, 90))
```

## Constraint Types

### Two-object constraints

| Constraint | `param` default | Description |
|-----------|----------------|-------------|
| `"Point"` | `0` | Minimizes distance between centers of the two objects. `param` sets target distance; use a dummy `Vertex` for directional offsets. |
| `"Axis"` | `180` | Minimizes angle between direction vectors. `180` → mate (surfaces touch, normals opposite). `0` → same direction (pin through hole). Direction is extracted via `normalAt()` for Face, `normal()` for circular Edge, `tangentAt()` for other Edge. |
| `"Plane"` | `180` (Axis part) | Shortcut combining Point + Axis. Use for face-to-face mating. `param` applies to the Axis component. |
| `"PointInPlane"` | `0` | Centers first object on the plane defined by second object. `param` offsets the plane along its normal. |
| `"PointOnLine"` | `0` | Centers first object on the line defined by second object. `param` sets the distance from the line. |

### Single-object constraints

| Constraint | `param` | Description |
|-----------|---------|-------------|
| `"Fixed"` | — | Locks all 6 degrees of freedom (3 translation + 3 rotation). |
| `"FixedPoint"` | `(x, y, z)` | Locks all translational DOF; pins center to the given point. |
| `"FixedRotation"` | `(rx, ry, rz)` | Locks all rotational DOF; pins orientation to given Euler angles (degrees). |
| `"FixedAxis"` | `(ax, ay, az)` | Locks 2 rotational DOF by fixing the normal/tangent of the selected face/edge to the given direction. |

## Notes

- The string selector syntax is `"partName@subtype@directionSelector"` (e.g., `"left@faces@<Z"`) or `"partName?tagName"` for tagged shapes.
- `"Plane"` is equivalent to applying `"Point"` + `"Axis"` together and is the most common mating constraint.
- Only `Face`, circular `Edge`, and non-circular `Edge` are valid for `"Axis"`; other types raise `ValueError`.
- Systems can be underconstrained (solver may not move unconstrained parts) or overconstrained (solver finds best fit).

## Related

- [tutorial.md](./tutorial.md)
- [locations.md](./locations.md)
