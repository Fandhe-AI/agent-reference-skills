# Coordinate Systems

CadQuery users can define workplanes with arbitrary orientations, creating local coordinate systems. Plugin authors must account for this when creating or consuming geometric objects.

## Notes

- All objects and points on the stack are always in **global (world) coordinates**.
- Any objects a plugin creates must also be in global coordinates.
- User-supplied input values (e.g., lengths, positions) may be expressed in local coordinates relative to the active workplane.
- Use the `plane` helper to convert between coordinate systems as needed:

```python
# Convert a user-supplied local point to world coordinates
world_pt = self.plane.toWorldCoords(local_pt)

# Convert a world-coordinate point to local coordinates
local_pt = self.plane.toLocalCoords(world_pt)
```

- Failing to convert coordinates will produce shapes positioned or oriented incorrectly relative to the user's workplane.

## Related

- [The Stack](./stack.md)
- [Helper Methods](./helper-methods.md)
