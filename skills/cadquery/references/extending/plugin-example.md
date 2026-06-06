# Plugin Example

A complete working plugin that creates unit cubes at every point on the current stack.

## Signature / Usage

```python
import cadquery as cq
from cadquery.func import box

def makeCubes(self, length):
    def _singleCube(loc):
        return box(length, length, length).locate(loc)
    return self.eachpoint(_singleCube, True)

# Register as a Workplane method
cq.Workplane.makeCubes = makeCubes

# Usage
result = (
    cq.Workplane("XY")
    .box(6.0, 8.0, 0.5)
    .faces(">Z")
    .rect(4.0, 4.0, forConstruction=True)
    .vertices()
    .makeCubes(1.0)
    .combine()
)
```

Alternatively, pass the shape directly to `eachpoint()` instead of defining a positional callback:

```python
def makeCubes(self, length):
    return self.eachpoint(box(length, length, length), True)

cq.Workplane.makeCubes = makeCubes
```

## Notes

- `self.eachpoint(callback, useLocalCoords)` calls `callback` for each point on the stack and collects the results.
- Passing `True` as the second argument to `eachpoint` passes a `Location` (position + orientation) rather than a raw point, which is needed when the callback must position the created shape.
- A shape object (e.g., `box(l, l, l)`) can be passed directly to `eachpoint()` as a shorthand for a callback that places it at each location.
- `box(l, l, l).locate(loc)` from `cadquery.func` creates a cube and positions it at the given location.
- The final `.combine()` merges all the individual cubes and the base solid into one compound shape.

## Related

- [Plugins](./plugins.md)
- [Linking in your plugin](./linking.md)
- [Special Methods](./special-methods.md)
- [CadQuery Example Plugins](./example-plugins.md)
