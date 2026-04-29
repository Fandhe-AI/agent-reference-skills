# The Stack

Every CadQuery `Workplane` object maintains a local stack that holds the currently selected geometric objects. Plugin code accesses and manipulates the stack to implement operations.

## Signature / Usage

```python
# Access the current stack items inside a plugin
def myPlugin(self):
    items = self.objects  # list of items currently on the stack
    ...
```

## Notes

- The stack is accessible via `self.objects` inside a plugin.
- Stack items are one of the following types:
  - CadQuery `SolidReference` object (holds a reference to an OCP solid)
  - OCP objects: `Vertex`, `Edge`, `Wire`, `Face`, `Shell`, `Solid`, or `Compound`
- The stack always contains at least one object.
- **All objects and points on the stack are in global coordinates.** Any objects you create must also be expressed in global coordinates.

## Related

- [Coordinate Systems](./coordinate-systems.md)
- [Preserving the Chain](./preserving-chain.md)
- [Helper Methods](./helper-methods.md)
