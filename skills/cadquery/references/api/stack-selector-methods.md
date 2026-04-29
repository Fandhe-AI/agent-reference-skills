# Stack and Selector Methods

Methods for navigating, querying, and modifying the object stack and selecting geometry on a CadQuery Workplane.

## Method Summary

### Stack Navigation

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane.all` | `all()` | Return a list of all CQ objects on the stack |
| `Workplane.size` | `size()` | Return the number of objects currently on the stack |
| `Workplane.vals` | `vals()` | Get the raw values (Shapes) in the current list |
| `Workplane.val` | `val()` | Return the first value on the stack |
| `Workplane.first` | `first()` | Return the first item (as Workplane) on the stack |
| `Workplane.item` | `item(i)` | Return the ith item on the stack |
| `Workplane.last` | `last()` | Return the last item on the stack |
| `Workplane.end` | `end(n=1)` | Return the nth parent of this CQ element |
| `Workplane.add` | `add(obj)` | Add an object or list of objects to the stack |

### Geometry Selectors

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane.vertices` | `vertices(selector=None, tag=None)` | Select vertices, optionally filtered |
| `Workplane.faces` | `faces(selector=None, tag=None)` | Select faces, optionally filtered |
| `Workplane.edges` | `edges(selector=None, tag=None)` | Select edges, optionally filtered |
| `Workplane.wires` | `wires(selector=None, tag=None)` | Select wires, optionally filtered |
| `Workplane.solids` | `solids(selector=None, tag=None)` | Select solids, optionally filtered |
| `Workplane.shells` | `shells(selector=None, tag=None)` | Select shells, optionally filtered |
| `Workplane.compounds` | `compounds(selector=None, tag=None)` | Select compounds, optionally filtered |

## Signature / Usage

```python
import cadquery as cq

result = (
    cq.Workplane("XY")
    .box(4, 4, 4)
    .faces(">Z")          # select top face
    .workplane()          # new workplane on that face
    .circle(1)
    .cutBlind(2)
)

# Stack navigation
box = cq.Workplane("XY").box(2, 2, 2)
print(box.size())         # 1
print(type(box.val()))    # <class 'cadquery.occ_impl.shapes.Solid'>

# Traverse parent chain
child = box.faces(">Z")
parent = child.end()       # returns to the box workplane
```

## Options / Props

### Geometry selector methods (`faces`, `edges`, `vertices`, `wires`, `solids`, `shells`, `compounds`)

| Name | Type | Description |
|------|------|-------------|
| `selector` | `str \| Selector \| None` | String selector (e.g. `">Z"`, `"\|X"`) or a `Selector` object |
| `tag` | `str \| None` | Tag name; selects from geometry tagged with `.tag()` |

### `Workplane.end(n)`

| Name | Type | Description |
|------|------|-------------|
| `n` | `int` | Number of levels to go up in the parent chain (default `1`) |

### `Workplane.item(i)`

| Name | Type | Description |
|------|------|-------------|
| `i` | `int` | Zero-based index into the stack |

### `Workplane.add(obj)`

| Name | Type | Description |
|------|------|-------------|
| `obj` | `Shape \| Workplane \| list` | Object(s) to add to the current stack |

## Notes

- `val()` returns the first raw `Shape`; `vals()` returns all raw shapes as a list. Both skip non-shape items.
- `all()` returns a list of `Workplane` objects wrapping each stack item individually.
- Selector strings follow CadQuery's string syntax (see [Selectors](./selectors-api.md)).
- Chaining `.faces(">Z").workplane()` is the standard pattern for placing features on a specific face.
- `end()` is essential in fluent chains: after a `.faces()` selector, call `.end()` to return to the parent solid context.

## Related

- [Selectors](./selectors-api.md)
- [Workplane Initialization](./workplane-initialization.md)
- [Iteration Methods](./iteration-methods.md)
