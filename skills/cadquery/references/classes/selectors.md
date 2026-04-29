# Selector Classes

Selectors filter lists of topological objects (vertices, edges, faces, solids, etc.) returned by `Workplane` selection methods. They can be composed using binary operators.

---

## Selector (Abstract Base)

Base class for all selectors. Defines the interface.

### Signature / Usage

```python
# Selectors are passed to Workplane selection methods:
result = cq.Workplane("XY").box(1,1,1).faces(cq.selectors.NearestToPointSelector((0,0,1)))
```

### Constructor

```python
cadquery.selectors.Selector()
```

### Key Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `filter` | `filter(objectList: List[Shape]) -> List[Shape]` | Return the subset of objects passing the selector |

### Notes

- Subclass and override `filter()` to implement custom selectors.
- Selectors support `|`, `&`, `-`, `!` operators for composition (see Binary Selectors).

---

## NearestToPointSelector

Selects the single object (vertex, edge, face, or solid) whose center is nearest to a given point.

### Constructor

```python
cadquery.selectors.NearestToPointSelector(pnt: tuple | Vector)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `pnt` | `tuple \| Vector` | Reference point in world coordinates |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `filter(objectList)` | `List[Shape]` | Returns the single nearest object |

### Notes

- Returns exactly one object: the closest by center-of-mass distance.

---

## BoxSelector

Selects objects whose bounding box center lies within a 3D box defined by two corner points.

### Constructor

```python
cadquery.selectors.BoxSelector(
    point0: tuple | Vector,
    point1: tuple | Vector,
    boundingbox: bool = False
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `point0` | `tuple \| Vector` | — | First corner of box |
| `point1` | `tuple \| Vector` | — | Opposite corner of box |
| `boundingbox` | `bool` | `False` | If `True`, select objects whose bounding box overlaps the region |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `filter(objectList)` | `List[Shape]` | Objects inside the box |

---

## BaseDirSelector

Abstract base class for direction-based selectors.

### Constructor

```python
cadquery.selectors.BaseDirSelector(
    vector: Vector | tuple,
    tolerance: float = 0.0001
)
```

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `filter(objectList)` | `List[Shape]` | Objects passing the directional test |
| `test(vec)` | `bool` | Test a single direction vector |

### Notes

- Override `test(vec)` in subclasses to define the directional criterion.

---

## DirectionSelector

Selects edges or faces whose normal/direction is aligned with (within tolerance of) the given vector.

### Constructor

```python
cadquery.selectors.DirectionSelector(
    vector: Vector | tuple,
    tolerance: float = 0.0001
)
```

**String syntax:** `"+X"`, `"-Y"`, `"+Z"` etc. (positive/negative axis directions).

### Notes

- For edges: selects edges parallel to the vector.
- For faces: selects faces whose normal matches the vector.

---

## ParallelDirSelector

Selects objects whose direction is parallel (regardless of sign) to the given vector.

### Constructor

```python
cadquery.selectors.ParallelDirSelector(
    vector: Vector | tuple,
    tolerance: float = 0.0001
)
```

**String syntax:** `"|X"`, `"|Y"`, `"|Z"`.

### Notes

- Differs from `DirectionSelector` in that anti-parallel (`180°`) also matches.

---

## PerpendicularDirSelector

Selects objects whose direction is perpendicular to the given vector.

### Constructor

```python
cadquery.selectors.PerpendicularDirSelector(
    vector: Vector | tuple,
    tolerance: float = 0.0001
)
```

**String syntax:** `"#X"`, `"#Y"`, `"#Z"`.

---

## DirectionMinMaxSelector

Selects the object(s) that are farthest (`directionMax=True`) or closest (`directionMax=False`) along a given direction.

### Constructor

```python
cadquery.selectors.DirectionMinMaxSelector(
    vector: Vector | tuple,
    directionMax: bool = True,
    tolerance: float = 0.0001
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `vector` | `Vector \| tuple` | — | Direction vector |
| `directionMax` | `bool` | `True` | `True` = farthest (max), `False` = closest (min) |
| `tolerance` | `float` | `0.0001` | Grouping tolerance |

**String syntax:** `">X"`, `">Y"`, `">Z"` (max); `"<X"`, `"<Y"`, `"<Z"` (min).

### Notes

- Uses center of mass for distance calculation.
- Multiple objects at the same extremal position are all returned.

---

## DirectionNthSelector

Selects the Nth group of objects when sorted by their projection onto a direction vector.

### Constructor

```python
cadquery.selectors.DirectionNthSelector(
    vector: Vector | tuple,
    n: int,
    directionMax: bool = True,
    tolerance: float = 0.0001
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `vector` | `Vector \| tuple` | — | Sorting direction |
| `n` | `int` | — | Index (0 = farthest if `directionMax=True`) |
| `directionMax` | `bool` | `True` | Sort order direction |
| `tolerance` | `float` | `0.0001` | Grouping tolerance |

**String syntax:** `">X[0]"`, `"<Z[-1]"` etc.

---

## TypeSelector

Selects objects of a specific topological type.

### Constructor

```python
cadquery.selectors.TypeSelector(typeString: str)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `typeString` | `str` | One of: `"Vertex"`, `"Edge"`, `"Wire"`, `"Face"`, `"Shell"`, `"Solid"`, `"Compound"` |

**String syntax:** `"%Plane"` (planar faces), `"%Line"` (linear edges), `"%Circle"` (circular edges).

---

## RadiusNthSelector

Selects the object(s) with the Nth smallest or largest radius among arc/circle edges.

### Constructor

```python
cadquery.selectors.RadiusNthSelector(
    n: int,
    directionMax: bool = True,
    tolerance: float = 0.0001
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `n` | `int` | — | Rank index (0 = largest radius when `directionMax=True`) |
| `directionMax` | `bool` | `True` | `True` = descending sort |
| `tolerance` | `float` | `0.0001` | Grouping tolerance |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `key(obj)` | `float` | Returns radius of the object (for sorting) |

---

## CenterNthSelector

Selects the Nth object when sorted by the projection of its center onto a given direction.

### Constructor

```python
cadquery.selectors.CenterNthSelector(
    vector: Vector | tuple,
    n: int,
    directionMax: bool = True,
    tolerance: float = 0.0001
)
```

**String syntax:** `">>X[0]"`, `"<<Z[-1]"` etc.

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `key(obj)` | `float` | Projected center distance along `vector` |

---

## LengthNthSelector

Selects the Nth object when sorted by arc length (for edges/wires).

### Constructor

```python
cadquery.selectors.LengthNthSelector(
    n: int,
    directionMax: bool = True,
    tolerance: float = 0.0001
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `n` | `int` | — | Rank index |
| `directionMax` | `bool` | `True` | `True` = descending (longest first) |
| `tolerance` | `float` | `0.0001` | Grouping tolerance |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `key(obj)` | `float` | Arc length of the object |

---

## AreaNthSelector

Selects the Nth object when sorted by surface area (for faces).

### Constructor

```python
cadquery.selectors.AreaNthSelector(
    n: int,
    directionMax: bool = True,
    tolerance: float = 0.0001
)
```

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `key(obj)` | `float` | Surface area of the object |

---

## BinarySelector

Abstract base class for selectors that combine two child selectors.

### Constructor

```python
cadquery.selectors.BinarySelector(left: Selector, right: Selector)
```

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `filter(objectList)` | `List[Shape]` | Apply both selectors and combine results |

---

## AndSelector

Returns the intersection of two selectors (objects matching both).

### Constructor

```python
cadquery.selectors.AndSelector(left: Selector, right: Selector)
```

**String syntax:** `"<selectorA> and <selectorB>"` or `"<selectorA> & <selectorB>"`.

### Signature / Usage

```python
import cadquery as cq

result = (
    cq.Workplane("XY").box(1, 1, 1)
    .edges(cq.selectors.AndSelector(
        cq.selectors.ParallelDirSelector((0, 0, 1)),
        cq.selectors.LengthNthSelector(0)
    ))
)
```

---

## SumSelector

Returns the union of two selectors (objects matching either).

### Constructor

```python
cadquery.selectors.SumSelector(left: Selector, right: Selector)
```

**String syntax:** `"<selectorA> or <selectorB>"` or `"<selectorA> | <selectorB>"`.

---

## SubtractSelector

Returns objects matching the left selector but not the right.

### Constructor

```python
cadquery.selectors.SubtractSelector(left: Selector, right: Selector)
```

**String syntax:** `"<selectorA> exc <selectorB>"` or `"<selectorA> except <selectorB>"`.

---

## InverseSelector

Returns all objects that do NOT match a given selector.

### Constructor

```python
cadquery.selectors.InverseSelector(selector: Selector)
```

**String syntax:** `"not(<selectorString>)"`.

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `filter(objectList)` | `List[Shape]` | Objects that fail the wrapped selector |

---

## StringSyntaxSelector

Parses and evaluates a compact string-based selector expression. Used internally by `Workplane` selection methods when a string argument is provided.

### Signature / Usage

```python
import cadquery as cq

# Equivalent pairs — string and explicit selector:
cq.Workplane("XY").box(1,1,1).faces(">Z")
cq.Workplane("XY").box(1,1,1).faces(cq.selectors.StringSyntaxSelector(">Z"))
```

### Constructor

```python
cadquery.selectors.StringSyntaxSelector(selectorString: str)
```

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `filter(objectList)` | `List[Shape]` | Evaluate string expression and return matching objects |

### String Syntax Reference

**Direction / alignment tokens**

| Token | Meaning |
|-------|---------|
| `+X`, `+Y`, `+Z` | Faces/edges aligned with positive axis |
| `-X`, `-Y`, `-Z` | Faces/edges aligned with negative axis |
| `\|X`, `\|Y`, `\|Z` | Parallel to axis (either direction) |
| `#X`, `#Y`, `#Z` | Perpendicular to axis |
| `>X`, `>Y`, `>Z` | Farthest object in positive axis direction |
| `<X`, `<Y`, `<Z` | Closest object (farthest in negative direction) |
| `>>X[n]` | Nth object sorted by center projection (max direction) |
| `<<X[n]` | Nth object sorted by center projection (min direction) |
| `>(x,y,z)` | Farthest in custom direction vector |

**Type tokens**

| Token | Meaning |
|-------|---------|
| `%Plane` | Planar faces |
| `%Line` | Linear (straight) edges |
| `%Circle` | Circular edges |

**Indexed variants (ordinal selection)**

```
>Z[0]    # farthest (same as >Z)
>Z[-1]   # second-farthest from negative end = second-closest
<Y[1]    # second-closest in Y
```

**Composite operators**

| Operator | Meaning |
|----------|---------|
| `A and B` or `A & B` | Intersection (AndSelector) |
| `A or B` or `A \| B` | Union (SumSelector) |
| `A exc B` or `A except B` | Difference (SubtractSelector) |
| `not(A)` | Inversion (InverseSelector) |

### Notes

- String selectors are parsed at runtime; invalid tokens raise a `ValueError`.
- Custom direction vectors can be used: `">(1, 1, 0)"`.
- Index notation `[n]` supports negative indices (Python-style).
- `StringSyntaxSelector` is the default when passing a plain string to `faces()`, `edges()`, etc.
