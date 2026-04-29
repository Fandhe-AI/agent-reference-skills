# Concepts

Core concepts required to understand CadQuery's architecture and API. Covers the seven foundational topics from the CadQuery primer.

---

## 1. 3D BREP Topology

CadQuery uses OpenCascade's **Boundary Representation (BREP)** system. Objects are defined by their enclosing surfaces, organized in a strict topology hierarchy (simplest to most complex):

| Type | Description |
|------|-------------|
| `Vertex` | A single point in space |
| `Edge` | A connection between two or more vertices along a path |
| `Wire` | A collection of connected edges |
| `Face` | A set of edges/wires enclosing a surface |
| `Shell` | A collection of connected faces |
| `Solid` | A shell with a closed interior |
| `Compound` | A collection of solids |

Underlying geometric constructs (e.g., a circle referenced by an arc edge) are abstracted away so developers work at the topological level.

---

## 2. API Layers

CadQuery provides three stacked abstraction layers, plus conversion utilities between them.

### Fluent API (primary user layer)

Workplane, Sketch, and Assembly classes with method chaining:

```python
part = Workplane("XY").box(1, 2, 3).faces(">Z").vertices().circle(0.5).cutThruAll()
```

Step-by-step style is equivalent and easier to debug in CQ-Editor:

```python
part = Workplane("XY")
part = part.box(1, 2, 3)
part = part.faces(">Z")
```

### Direct API

Nine classes mirroring BREP topology (`Shape`, `Compound`, `CompSolid`, `Solid`, `Shell`, `Face`, `Wire`, `Edge`, `Vertex`). More verbose but enables bottom-up geometry construction:

```python
circle_wire = Wire.makeCircle(10, Vector(0, 0, 0), Vector(0, 0, 1))
circular_face = Face.makeFromWires(circle_wire, [])
```

### OCCT API (lowest level)

Direct access to OpenCASCADE Technology C++ libraries via OCP Python bindings. Maximum flexibility; requires knowledge of OCCT architecture:

```python
from OCP.BRepPrimAPI import BRepPrimAPI_MakeBox
```

### Converting Between Layers

| Conversion | Method |
|-----------|--------|
| Fluent → Direct | `.val()` (last object) / `.vals()` (all) / `.findSolid()` |
| Direct → Fluent | `Workplane(obj=solid)` or `.newObject([shape])` |
| Direct → OCCT | `.wrapped` attribute on any Direct API shape |
| OCCT → Direct | `Solid(occt_object)` constructor |

```python
# Fluent → Direct
box = Workplane().box(10, 5, 5).val()
# type: cadquery.occ_impl.shapes.Solid

# Direct → Fluent
solid_box = Solid.makeBox(10, 10, 10)
part = Workplane(obj=solid_box).faces(">Z").circle(1).extrude(10)

# Direct → OCCT
occt_equivalent = Solid.makeBox(10, 5, 5).wrapped  # TopoDS_Solid
```

---

## 3. Multimethods

CadQuery uses **multimethod dispatch** — the implementation called depends on the argument types, not just the method name. For example, `arc()` behaves differently with 2 vs. 3 coordinate arguments.

```python
# Correct: use positional arguments
a_sketch.arc((1, 2), (2, 3), (3, 4))

# Incorrect: keyword arguments break dispatch
a_sketch.arc(p1=(1, 2), p2=(2, 3), p3=(3, 4))
```

## Notes

- Always use positional arguments when calling multimethod-dispatched methods. Keyword arguments for positional parameters will cause dispatch failures.
- On dispatch error, CadQuery falls back to the first registered multimethod, which may silently produce wrong behavior.

---

## 4. Selectors

Selectors identify specific topological features (vertices, edges, faces, solids, wires) for subsequent operations. They act like "your hand and mouse in a conventional CAD system."

Common selector strings:

| Selector | Meaning |
|----------|---------|
| `">Z"` | Topmost feature along Z |
| `"<Z"` | Bottommost feature along Z |
| `"\|Z"` | Features parallel to Z axis |
| `"<X"` | Leftmost feature along X |

Example: select top face, then select vertical edges for filleting:

```python
result = (
    Workplane("XY").box(10, 10, 10)
    .faces(">Z").workplane()          # top face
    .edges("|Z").fillet(1.0)          # vertical edges
)
```

---

## 5. Workplane Class

`Workplane` is the primary user-facing class. It holds:

| Attribute | Description |
|-----------|-------------|
| `objects` | Current selection (Shapes, Vectors, or Locations) |
| `ctx` | Modeling context (accumulated solid, pending wires, etc.) |
| methods | All Fluent API operations that modify or query the part |

Typical usage starts with an empty Workplane on a named plane (`"XY"`, `"XZ"`, `"YZ"`) and progressively adds features:

```python
result = cq.Workplane("XY").box(10, 10, 10)
```

---

## 6. Assemblies

Complex models combine multiple parts into nested assemblies. Each component has a location relative to its parent:

```python
from cadquery import Assembly, Location, Vector, Color

assy = (
    Assembly(part1, loc=Location(Vector(-w, 0, h / 2)))
    .add(part2, loc=Location(Vector(1.5 * w, -0.5 * d, h / 2)),
         color=Color(0, 0, 1, 0.5))
    .add(part3, loc=Location(Vector(-0.5 * w, -0.5 * d, 2 * h)),
         color=Color("red"))
)
```

Assemblies support color assignment and export to STEP or OCCT XML formats.

---

## 7. Assemblies with Constraints

Instead of explicit positions, **constraint-based assemblies** let CadQuery solve final locations automatically. Useful when positions depend on part geometry rather than fixed offsets.

### Constraint Types

| Constraint | Description |
|-----------|-------------|
| `Axis` | Two normal vectors are anti-coincident or form a specified angle |
| `Point` | Two points are coincident or separated by a specified distance |
| `Plane` | Combination of Axis + Point constraints |

### Usage

Tag geometry features, then declare constraints and call `.solve()`:

```python
# Tag reference points on each part
part1.faces(">Z").edges("<X").vertices("<Y").tag("pt1")
part3.faces("<Z").edges("<X").vertices("<Y").tag("pt1")

assy1 = (
    Assembly(part1, name="part1", loc=Location(Vector(-w, 0, h / 2)))
    .add(part2, name="part2", color=Color(0, 0, 1, 0.5))
    .add(part3, name="part3", color=Color("red"))
    .constrain("part1?pt1", "part3?pt1", "Point")
    .solve()
)
```

- `"part1?pt1"` references the tagged geometry on the named component.
- `.solve()` computes all component locations satisfying the declared constraints.

## Related

- [Introduction](./introduction.md)
- [Design Principles](./design-principles.md)
- [QuickStart](./quickstart.md)
