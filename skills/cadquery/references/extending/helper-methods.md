# Helper Methods

`Workplane` exposes a set of internal helper methods intended for use inside plugin implementations. These provide common operations needed when building plugins.

## Signature / Usage

```python
# newObject — return a new Workplane with a given stack, parent set to self
new_wp = self.newObject(objects)

# findSolid — locate the first Solid in the chain (traverses parents)
solid = self.findSolid()

# _makeWireAtPoints — invoke a factory for each point on the stack
result = self._makeWireAtPoints(makeWire)

# _addPendingWire — register a wire for later use by base class operations
self._addPendingWire(wire)

# wire — collect drawn edges into a single Wire
w = self.wire()

# plane coordinate conversion helpers
world_pt = self.plane.toWorldCoords(local_pt)
local_pt = self.plane.toLocalCoords(world_pt)
```

## Options / Props

| Method | Returns | Description |
|--------|---------|-------------|
| `newObject(objects)` | `Workplane` | New Workplane with the given stack; parent is set to `self`. Preferred over `return self` for chain preservation. |
| `findSolid()` | `Solid` | Returns the first `Solid` found by traversing upward through the parent chain. |
| `_makeWireAtPoints(makeWire)` | `Workplane` | Invokes the `makeWire` factory function for each point on the stack and returns a properly constructed CadQuery object. |
| `_addPendingWire(wire)` | `None` | Registers a wire with the base class for tracking; must be called when adding wires so they are picked up by subsequent operations. |
| `wire()` | `Wire` | Gathers all drawn edges into a single `Wire` object. |
| `plane.toWorldCoords(pt)` | `Vector` | Converts a point from the workplane's local coordinate system to global (world) coordinates. |
| `plane.toLocalCoords(pt)` | `Vector` | Converts a point from global coordinates to the workplane's local coordinate system. |

## Notes

- `_addPendingWire()` must be called whenever a plugin creates a wire that should participate in subsequent solid-building operations.
- Use `plane.toWorldCoords()` / `plane.toLocalCoords()` to handle coordinate conversion when the user is working on a non-default workplane.

## Related

- [The Stack](./stack.md)
- [Coordinate Systems](./coordinate-systems.md)
- [Preserving the Chain](./preserving-chain.md)
