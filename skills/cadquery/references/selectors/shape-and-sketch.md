# Using Selectors with Shape and Sketch Objects

Selectors can be applied directly to `Shape` and `Sketch` instances (not just `Workplane`), and selector results can be chained.

## Signature / Usage

```python
import cadquery as cq

# Apply a selector to a Solid directly and chain another selector
box = cq.Solid.makeBox(1, 2, 3)
result = box.faces(">Z or <Z").wires()
```

## Notes

- `Shape` subclasses (`Solid`, `Shell`, `Face`, etc.) expose `.faces()`, `.edges()`, `.vertices()` methods that accept the same selector strings as `Workplane`.
- `Sketch` objects also support selectors for filtering construction geometry.
- Chaining is supported: `shape.faces(...).wires()` returns the wires of the selected faces.
- The same combining syntax (`and`, `or`, `not`, `exc`) works identically on `Shape` and `Sketch` selectors.

## Related

- [Combining Selectors](./combining.md)
- [Additional Special Methods](./special-methods.md)
- [Topological Selectors](./topological.md)
