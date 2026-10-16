# Shape Selection

Select sub-shapes of a `Shape` in the free function API: plural methods return a shape or compound, singular methods return one shape or throw, plus `siblings` / `ancestors` and set operators for combining selections.

## Signature / Usage

```python
# plural: return a Shape (single shape or compound)
Shape.vertices(selector: Selector | str | None = None) -> Shape
Shape.edges(selector: Selector | str | None = None) -> Shape
Shape.wires(selector: Selector | str | None = None) -> Shape
Shape.faces(selector: Selector | str | None = None) -> Shape
Shape.shells(selector: Selector | str | None = None) -> Shape
Shape.solids(selector: Selector | str | None = None) -> Shape

# singular: return exactly one shape, otherwise throw
Shape.vertex(selector: Selector | str | None = None) -> Vertex
Shape.edge(selector: Selector | str | None = None) -> Edge
Shape.wire(selector: Selector | str | None = None) -> Wire
Shape.face(selector: Selector | str | None = None) -> Face
Shape.shell(selector: Selector | str | None = None) -> Shell
Shape.solid(selector: Selector | str | None = None) -> Solid

# relational selectors
Shape.ancestors(ctx: Shape, kind: Shapes) -> Compound
Shape.siblings(ctx: Shape, kind: Shapes, level: int | Iterable[int] = 1) -> Compound

# set operators for combining selection results
Shape.__and__(other) -> Compound   # a & b : intersection
Shape.__or__(other) -> Compound    # a | b : union
Shape.__mod__(other) -> Compound   # a % b : difference
```

Usage with operators (pattern from the history example in the official page):

```python
from cadquery.func import *

base = extrude(plane(5, 3), (0, 0, 1.5))
top = base.face(">Z")                   # single face or throws
vertical = base.edges("|Z")             # compound of edges
bottom_or_top = base.faces("<Z") | base.faces(">Z")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| selector | `Selector \| str \| None` | Optional filter (e.g. `">Z"`, `"\|Z"`); `None` selects all entities of the kind. |
| ctx | `Shape` | Context shape in which `ancestors` / `siblings` search. |
| kind | `Shapes` | Type of shapes to look up within `ctx`. |
| level | `int \| Iterable[int]` | `siblings` only: number of sharing steps (default 1); an iterable collects all requested levels. |

## Notes

- Source: https://github.com/CadQuery/cadquery/blob/v2.8.0/doc/free-func.rst (Shape selection section; rendered at https://cadquery.readthedocs.io/en/latest/free-func.html#shape-selection), https://github.com/CadQuery/cadquery/blob/v2.8.0/cadquery/occ_impl/shapes.py
- `ancestors` yields shapes of type `kind` within `ctx` that contain `self`.
- `siblings` yields shapes within `ctx` that share subshapes of type `kind` with `self`.
- `&`, `|`, `%` combine selection results as sets and return a `Compound`; `%` is the set difference.
- The "Shape selection" section of the official page is prose only; the code above is assembled from the method signatures in `cadquery/occ_impl/shapes.py` (v2.8.0) and the selector usage shown in the official history example.

## Related

- [History](./history.md)
- [Shape Construction](./shape-construction.md)
- [Boolean Operations](./boolean-operations.md)
