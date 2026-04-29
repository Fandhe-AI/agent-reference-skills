# Placement

Positioning shapes and creating patterns using the `.move()` and `.moved()` method overloads on `Shape`.

## Signature / Usage

```python
from cadquery.func import *

locs = [(0,-1,0), (0,1,0)]

s = sphere(1).moved(locs)                    # Compound of two spheres
c = cylinder(1,2).move(rx=15).moved(*locs)   # Rotated, then duplicated

result = compound(s, c.moved(2))
```

## Options / Props

### `.move()` — mutate in place

| Overload | Description |
|----------|-------------|
| `move(loc: Location)` | Apply a `Location` in relative sense (updates current location). |
| `move(x=0, y=0, z=0, rx=0, ry=0, rz=0)` | Translate and rotate by named keyword arguments. |
| `move(loc: VectorLike)` | Translate by a vector tuple. |
| `move(s: Shape)` | Apply the first location of `s` as a relative move. |

### `.moved()` — return a copy

| Overload | Returns | Description |
|----------|---------|-------------|
| `moved(loc: Location)` | `T` | Single copy at the given location. |
| `moved(x=0, y=0, z=0, rx=0, ry=0, rz=0)` | `T` | Single copy with translation/rotation. |
| `moved(loc: VectorLike)` | `T` | Single copy translated by vector. |
| `moved(loc1, loc2, *locs)` | `Compound` | Multiple copies — one per `Location` or `VectorLike`. |
| `moved(locs: Sequence[Location])` | `Compound` | Multiple copies from a sequence of `Location`s. |
| `moved(locs: Sequence[VectorLike])` | `Compound` | Multiple copies from a sequence of vector tuples. |
| `moved(s: Shape)` | `Shape` | Apply all locations stored in `s`. |

### `.locate()` / `.located()` — absolute placement

| Method | Description |
|--------|-------------|
| `locate(loc: Location)` | Set location absolutely (mutates). |
| `located(loc: Location)` | Return a copy with the given absolute location. |

## Notes

- `move()` / `moved()` work in *relative* sense (they compose with the current location).
- `locate()` / `located()` work in *absolute* sense (they replace the current location).
- Passing multiple `VectorLike` arguments to `moved()` returns a `Compound` of copies — the primary mechanism for creating arrays and patterns.
- `Location` can be constructed as `Location(x, y, z, rx, ry, rz)` or from a `VectorLike`.
- The keyword arguments `rx`, `ry`, `rz` represent rotation angles in degrees around the respective axes.

## Related

- [Primitives](./primitives.md)
- [Tutorial](./tutorial.md)
