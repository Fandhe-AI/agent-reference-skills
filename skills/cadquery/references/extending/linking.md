# Linking in your plugin

To make a standalone function available as a CadQuery plugin, attach it to the `Workplane` (or `CQ`) class after definition.

## Signature / Usage

```python
import cadquery as cq

def _yourFunction(self, arg1, arg2):
    # self is the Workplane instance
    # implementation using self.objects, self.newObject(), etc.
    return self.newObject([...])

# Register the function as a plugin method
cq.Workplane.yourPlugin = _yourFunction
```

After registration, the plugin is callable in any chain:

```python
result = cq.Workplane("XY").box(1, 1, 1).yourPlugin(arg1, arg2)
```

## Notes

- The function must accept `self` as its first parameter.
- Assign the function to `cq.Workplane.<name>` (and/or `cq.CQ.<name>`) to make it available everywhere.
- The plugin name used in the chain is the attribute name assigned on the class, not the Python function name.
- Place the registration call at module import time so the plugin is available as soon as the module is imported.

## Related

- [Plugins](./plugins.md)
- [Plugin Example](./plugin-example.md)
- [Special Methods](./special-methods.md)
