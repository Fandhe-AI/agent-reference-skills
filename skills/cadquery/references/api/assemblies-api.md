# Assemblies

Classes and methods for combining Workplane and Shape objects into hierarchical, constraint-solved assemblies.

## Method Summary

| Method / Class | Signature | Description |
|----------------|-----------|-------------|
| `Assembly` | `Assembly(obj=None, loc=None, name=None, color=None, material=None, metadata=None)` | Create a nested assembly of Workplane/Shape objects |
| `Assembly.add` | `add(obj, loc=None, name=None, color=None, material=None, metadata=None)` | Add a sub-assembly or shape to the assembly |
| `Assembly.save` | `save(path, exportType=None, mode="default", tolerance=0.1, angularTolerance=0.1, **kwargs)` | Save the assembly to a file |
| `Assembly.constrain` | `constrain(q1, q2, kind, param=None)` | Define a constraint between two assembly parts |
| `Assembly.solve` | `solve(verbosity=0)` | Solve all constraints and update component positions |
| `Constraint` | `Constraint(subshapes, sublocs, kind, param=None)` | Low-level constraint specification object |
| `Color` | `Color(r=None, g=None, b=None, a=1.0)` | RGBA color wrapper for assembly components |

## Signature / Usage

```python
import cadquery as cq

# Build an assembly
assy = (
    cq.Assembly()
    .add(cq.Workplane("XY").box(1, 1, 1), name="base", color=cq.Color("red"))
    .add(cq.Workplane("XY").sphere(0.5), name="ball",
         loc=cq.Location((0, 0, 1)))
)

# Constraint-based assembly
assy = (
    cq.Assembly()
    .add(cq.Workplane("XY").box(2, 2, 1), name="bottom")
    .add(cq.Workplane("XY").box(1, 1, 1), name="top")
    .constrain("bottom@faces@>Z", "top@faces@<Z", "Plane")
    .solve()
)

assy.save("assembly.step")
```

## Options / Props

### `Assembly(obj, loc, name, color, material, metadata)`

| Name | Type | Description |
|------|------|-------------|
| `obj` | `Shape \| Workplane \| None` | Root shape for this assembly node |
| `loc` | `Location \| None` | Initial location of the assembly |
| `name` | `str \| None` | Name used to reference this node in constraints |
| `color` | `Color \| None` | Display color |
| `material` | `str \| None` | Material name (informational) |
| `metadata` | `dict \| None` | Arbitrary metadata dictionary |

### `Assembly.add(obj, loc, name, color, material, metadata)`

| Name | Type | Description |
|------|------|-------------|
| `obj` | `Shape \| Workplane \| Assembly` | Component to add |
| `loc` | `Location \| None` | Override location for this component |
| `name` | `str \| None` | Name for the component |
| `color` | `Color \| None` | Display color |

### `Assembly.save(path, exportType, mode, tolerance, angularTolerance)`

| Name | Type | Description |
|------|------|-------------|
| `path` | `str` | Output file path |
| `exportType` | `str \| None` | `"STEP"`, `"XML"`, `"GLTF"`, `"VTKJS"`, `"VRML"` (auto-detected from extension) |
| `mode` | `str` | `"default"` (overwrite), `"append"` |
| `tolerance` | `float` | Linear tessellation tolerance |
| `angularTolerance` | `float` | Angular tessellation tolerance |

### `Assembly.constrain(q1, q2, kind, param)`

| Name | Type | Description |
|------|------|-------------|
| `q1` | `str` | Query string for first component (e.g. `"part1@faces@>Z"`) |
| `q2` | `str` | Query string for second component |
| `kind` | `str` | Constraint type (see table below) |
| `param` | `float \| None` | Numeric parameter for the constraint (e.g. offset distance) |

### `Assembly.solve(verbosity)`

| Name | Type | Description |
|------|------|-------------|
| `verbosity` | `int` | `0` = silent, `1` = print solver output |

## Constraint Types

| Kind | Description |
|------|-------------|
| `"Plane"` | Align two faces coplanar (normal + position) |
| `"Point"` | Coincide two points |
| `"Axis"` | Align two axes (directions) |
| `"PointInPlane"` | Constrain a point to lie on a plane |
| `"PointOnLine"` | Constrain a point to lie on a line |
| `"Fixed"` | Fix a component at its current location |
| `"FixedPoint"` | Fix a point at a specific location |
| `"FixedRotation"` | Fix the rotation of a component |
| `"FixedAxis"` | Fix an axis direction |

## Constraint Query String Syntax

Format: `"<name>@<type>@<selector>"`

- `<name>`: Assembly component name (or `""` for root)
- `<type>`: `faces`, `edges`, `vertices`
- `<selector>`: Any valid selector string (e.g. `>Z`, `<X`, `\|Y`)

Example: `"pin@faces@>Z"` — the topmost face of the component named `"pin"`

## `Color` Usage

```python
# Named colors
cq.Color("red")
cq.Color("green")
cq.Color("blue")

# RGBA
cq.Color(0.8, 0.2, 0.1, 1.0)
```

## Notes

- `Assembly.solve()` must be called after all constraints are defined to compute final positions.
- Component names must be unique within an assembly.
- The constraint system uses a 6-DOF solver; under-constrained assemblies will have remaining degrees of freedom.
- `Location` objects can be created with `cq.Location(cq.Vector(x, y, z))` or `cq.Location((x, y, z))`.
- STEP export preserves assembly hierarchy; STL/GLTF flatten geometry.

## Related

- [File Management and Export](./file-management.md)
- [Stack and Selector Methods](./stack-selector-methods.md)
- [Selectors](./selectors-api.md)
