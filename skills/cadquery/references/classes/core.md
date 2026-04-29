# Core Classes

CadQuery's four primary objects for 2D/3D modeling and assembly.

---

## Sketch

A 2D sketch object for constructing planar geometry using edges, constraints, and faces.

### Signature / Usage

```python
import cadquery as cq

result = (
    cq.Workplane("XY")
    .placeSketch(
        cq.Sketch()
        .rect(2, 2)
        .circle(0.5, mode="s")
    )
    .extrude(1)
)
```

### Constructor

```python
cadquery.Sketch(parent=None, locs=None, obj=None)
```

In practice, `cq.Sketch()` is typically instantiated with no arguments and populated via method chaining.

### Key Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `rect` | `rect(w, h, angle=0, mode='a', tag=None)` | Add a rectangle |
| `circle` | `circle(r, mode='a', tag=None)` | Add a circle |
| `ellipse` | `ellipse(a1, a2, angle=0, mode='a', tag=None)` | Add an ellipse |
| `polygon` | `polygon(n, r, angle=0, mode='a', tag=None)` | Regular polygon by circumradius |
| `regularPolygon` | `regularPolygon(r, n, angle=0, mode='a', tag=None)` | Regular polygon |
| `trapezoid` | `trapezoid(w, h, left_a, right_a=None, angle=0, mode='a', tag=None)` | Trapezoid |
| `slot2D` | `slot2D(w, h, angle=0, mode='a', tag=None)` | Slot shape |
| `segment` | `segment(p1, p2, tag=None)` | Line segment between two points |
| `arc` | `arc(p1, p2, p3, tag=None)` | Three-point arc |
| `bezier` | `bezier(pts, tag=None)` | Bezier curve through control points |
| `spline` | `spline(pts, tangents=None, periodic=False, tag=None)` | Spline through points |
| `close` | `close(tag=None)` | Close the current open wire |
| `hull` | `hull(tags=None, mode='a', tag=None)` | Convex hull of selected/tagged edges |
| `offset` | `offset(d, mode='a', tag=None)` | Offset current edges |
| `fillet` | `fillet(d)` | Fillet selected vertices |
| `chamfer` | `chamfer(d)` | Chamfer selected vertices |
| `rarray` | `rarray(xs, ys, nx, ny)` | Rectangular location array |
| `parray` | `parray(r, a, da, n)` | Polar location array |
| `distribute` | `distribute(n)` | Distribute along wire |
| `each` | `each(callback)` | Apply callback to each location |
| `vertices` | `vertices(s=None, tag=None)` | Select vertices |
| `edges` | `edges(s=None, tag=None)` | Select edges |
| `wires` | `wires(s=None, tag=None)` | Select wires |
| `faces` | `faces(s=None, tag=None)` | Select faces |
| `tag` | `tag(name)` | Tag current selection |
| `val` | `val()` | Return current single value |
| `vals` | `vals()` | Return all current values |
| `add` | `add(obj)` | Add a shape to the sketch |
| `located` | `located(l)` | Return sketch at given Location |
| `moved` | `moved(l)` | Return sketch moved by Location |
| `copy` | `copy()` | Copy the sketch |
| `delete` | `delete()` | Delete selected entities |
| `constrain` | `constrain(tag1, tag2, constraint_type, arg)` | Apply geometric constraint |
| `solve` | `solve()` | Solve constraint system |
| `assemble` | `assemble(tag=None, mode='a')` | Convert edges to faces |
| `finalize` | `finalize()` | Return parent workplane with sketch |
| `export` | `export(path, *args, **kwargs)` | Export sketch geometry |
| `importDXF` | `importDXF(filename, *args, **kwargs)` | Import edges from DXF |
| `reset` | `reset()` | Reset selection |
| `clean` | `clean()` | Remove empty wires/edges |

### Notes

- Most methods return `self` for fluent chaining.
- `mode` parameter controls how geometry is added: `'a'` (add), `'s'` (subtract), `'i'` (intersect), `'c'` (construction).
- Use `finalize()` to return to the parent `Workplane` after building a sketch.
- `solve()` must be called after `constrain()` to compute positions.

### Related

- [topological.md](./topological.md)

---

## Workplane

Defines a coordinate system in 3D space from which 2D and 3D modeling operations are performed. The central class of the CadQuery fluent API.

### Signature / Usage

```python
import cadquery as cq

result = (
    cq.Workplane("XY")
    .box(10, 10, 5)
    .faces(">Z")
    .workplane()
    .hole(2)
)
```

### Constructor

```python
cadquery.Workplane(
    inPlane: str | Plane | Face = "XY",
    origin: tuple | Vector = (0, 0, 0),
    obj: Shape | None = None
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `inPlane` | `str \| Plane \| Face` | `"XY"` | Named plane (`"XY"`, `"YZ"`, `"XZ"`, `"front"`, `"back"`, `"left"`, `"right"`, `"top"`, `"bottom"`) or Plane/Face object |
| `origin` | `tuple \| Vector` | `(0,0,0)` | Origin point of the workplane |
| `obj` | `Shape \| None` | `None` | Initial shape to place on the stack |

### Key Methods

**Selection**

| Method | Description |
|--------|-------------|
| `vertices(selector=None, tag=None)` | Select vertices |
| `edges(selector=None, tag=None)` | Select edges |
| `wires(selector=None, tag=None)` | Select wires |
| `faces(selector=None, tag=None)` | Select faces |
| `shells(selector=None, tag=None)` | Select shells |
| `solids(selector=None, tag=None)` | Select solids |
| `compounds(selector=None, tag=None)` | Select compounds |
| `all()` | All objects on stack as list |
| `first()` | First object on stack |
| `last()` | Last object on stack |
| `item(i)` | Object at index `i` |
| `ancestors(kind)` | Ancestor shapes of the given type |

**2D Sketching**

| Method | Description |
|--------|-------------|
| `moveTo(x, y)` | Move to position without drawing |
| `move(xDist, yDist)` | Relative move |
| `lineTo(x, y)` | Line to absolute position |
| `line(xDist, yDist)` | Line to relative position |
| `hLine(xDist)` | Horizontal line |
| `vLine(yDist)` | Vertical line |
| `hLineTo(xCoord)` | Horizontal line to absolute x |
| `vLineTo(yCoord)` | Vertical line to absolute y |
| `polyline(pts, includeCurrent=False, forConstruction=False)` | Polyline through points |
| `spline(pts, tangents=None, periodic=False, parameters=None, scale=True, tol=None)` | Spline through points |
| `bezier(pts, includeCurrent=False, forConstruction=False)` | Bezier curve |
| `close()` | Close current wire to form a loop |
| `circle(radius, forConstruction=False)` | Circle at current point |
| `rect(xLen, yLen, centered=True, forConstruction=False)` | Rectangle |
| `ellipse(x_radius, y_radius, rotation=0, forConstruction=False)` | Ellipse |
| `polygon(nSides, diameter, forConstruction=False, circumscribed=False)` | Regular polygon |
| `slot2D(length, diameter, angle=0)` | Rounded slot |
| `rarray(xSpacing, ySpacing, xCount, yCount, center=True)` | Rectangular array of locations |
| `polarArray(radius, startAngle, angle, count, fill=True, rotate=True)` | Polar array of locations |
| `placeSketch(*sketches)` | Place one or more sketches |

**3D Modeling**

| Method | Description |
|--------|-------------|
| `box(length, width, height, centered=True, combine=True)` | Box primitive |
| `cylinder(height, radius, direct=(0,0,1), angle=360, centered=True, combine=True)` | Cylinder primitive |
| `sphere(radius, direct=(0,0,1), angle1=-90, angle2=90, angle3=360, centered=True, combine=True)` | Sphere primitive |
| `wedge(dx, dy, dz, xmin, zmin, xmax, zmax, pnt=(0,0,0), dir=(0,0,1), centered=True, combine=True)` | Wedge primitive |
| `extrude(distance, combine=True, clean=True, both=False, taper=None)` | Extrude pending wires |
| `revolve(angleDegrees=360, axisStart=(0,0,0), axisEnd=(0,1,0), combine=True, clean=True)` | Revolve pending wires |
| `loft(ruled=False, combine=True, clean=True)` | Loft through pending wires |
| `sweep(path, multisection=False, sweepAlongWires=None, makeSolid=True, isFrenet=False, combine=True, clean=True, transition='right', normal=None, auxSpine=None)` | Sweep along path |
| `hole(diameter, depth=None, clean=True)` | Through or blind hole |
| `cboreHole(diameter, cboreDiameter, cboreDepth, depth=None, clean=True)` | Counterbored hole |
| `cskHole(diameter, cskDiameter, cskAngle, depth=None, clean=True)` | Countersunk hole |
| `cutBlind(distance, clean=True, both=False, taper=None)` | Extrude-cut to depth |
| `cutThruAll(clean=True, both=False)` | Extrude-cut through all |
| `shell(thickness, kind='arc')` | Hollow out a solid |
| `fillet(radius)` | Fillet selected edges |
| `chamfer(length, length2=None)` | Chamfer selected edges |
| `mirror(mirrorPlane='XY', basePointVector=(0,0,0), union=False)` | Mirror shapes |
| `rotate(axisStartPoint, axisEndPoint, angleDegrees)` | Rotate shapes |
| `translate(vec)` | Translate shapes |
| `scale(factor)` | Scale shapes |
| `offset2D(d, kind='arc', forConstruction=False)` | Offset 2D wires |
| `thicken(thickness, clean=True)` | Thicken faces to solids |

**Boolean Operations**

| Method | Description |
|--------|-------------|
| `cut(*toCut, combine=True, clean=True)` | Boolean subtraction |
| `union(*toUnion, glue=False, combine=True, clean=True)` | Boolean union |
| `intersect(*toIntersect, combine=True, clean=True)` | Boolean intersection |

**Navigation & Stack**

| Method | Description |
|--------|-------------|
| `workplane(offset=0, invert=False, centerOption='ProjectedOrigin', origin=None)` | Create child workplane on selected face |
| `workplaneFromTagged(name)` | Restore a tagged workplane |
| `tag(name)` | Tag current state for later recall |
| `end(n=1)` | Pop `n` levels up the chain |
| `newObject(objs)` | Create new WP in chain with given objects |
| `add(obj)` | Add object to current stack |
| `val()` | Return first object on stack |
| `vals()` | Return all objects on stack |
| `findSolid(searchStack=True, searchParents=True)` | Find the active solid |
| `consolidateWires()` | Merge all pending wires into one |
| `combine(clean=True, glue=False)` | Combine all solids on stack |

**Export**

| Method | Description |
|--------|-------------|
| `export(fname, *args, **kwargs)` | Export to file (format inferred) |
| `exportSvg(fileName)` | Export to SVG |
| `toOCC()` | Return underlying OCC object |
| `toPending()` | Add wires/edges to pending list |
| `sketch()` | Switch to Sketch context |

### Notes

- Almost all methods return a new `Workplane` to enable method chaining.
- The string plane name `"XY"` selects a named plane; `"front"`, `"top"`, `"right"` are aliases.
- `selector` arguments accept either a string (parsed by `StringSyntaxSelector`) or a `Selector` instance.
- `combine=True` automatically fuses results into the existing solid on the stack.

### Related

- [selectors.md](./selectors.md)

---

## Assembly

Nested assembly of shapes, sub-assemblies, and relative positioning constraints.

### Signature / Usage

```python
import cadquery as cq

assy = (
    cq.Assembly()
    .add(cq.Workplane("XY").box(1, 1, 1), name="box")
    .add(cq.Workplane("XY").sphere(0.5), name="ball", loc=cq.Location((0, 0, 1.5)))
)
assy.save("assembly.step")
```

### Constructor

```python
cadquery.Assembly(
    obj: Shape | Workplane | None = None,
    loc: Location | None = None,
    name: str | None = None,
    color: Color | None = None,
    material: Material | None = None,
    metadata: Dict[str, Any] | None = None
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `obj` | `Shape \| Workplane \| None` | `None` | Root geometry of the assembly |
| `loc` | `Location \| None` | `None` | Position/orientation (identity if `None`) |
| `name` | `str \| None` | `None` | Unique identifier (auto-UUID if `None`) |
| `color` | `Color \| None` | `None` | Visual color for the assembly |
| `material` | `Material \| None` | `None` | Material properties |
| `metadata` | `Dict[str, Any] \| None` | `None` | Custom key/value data |

### Key Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `add` | `add(obj, loc=None, name=None, color=None, material=None)` | Add a child shape or sub-assembly |
| `addSubshape` | `addSubshape(s, name=None, color=None, layer=None)` | Add shape with metadata |
| `constrain` | `constrain(q1, q2=None, kind=None, param=None)` | Add positional constraint between two parts |
| `solve` | `solve()` | Solve all constraints and compute final positions |
| `remove` | `remove(name)` | Remove a child by name |
| `toCompound` | `toCompound()` | Return unified `Compound` with transformations applied |
| `traverse` | `traverse()` | Generator yielding `(name, assembly)` pairs |
| `save` | `save(path, exportType=None, ...)` | Save to STEP, GLTF, VRML, STL, etc. |
| `export` | `export(path, *args, **kwargs)` | Alias for `save` |
| `importStep` | `importStep(path)` *(classmethod)* | Load assembly from STEP file |
| `load` | `load(path)` *(classmethod)* | Load from STEP, XML, or XBF |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `shapes` | `List[Shape]` | Geometric objects in this assembly level |

### Notes

- Constraint kinds include `"Plane"`, `"Point"`, `"Axis"`, `"Fixed"` among others.
- `solve()` must be called before `toCompound()` or `save()` when constraints are used.
- Assembly `name` values must be unique within the hierarchy.
- Sub-assemblies can be nested arbitrarily deep via repeated `add()` calls.

### Related

- [geometry.md](./geometry.md)

---

## Constraint

An alias for `ConstraintSpec`, used internally by `Assembly.constrain()` to define positional relationships between components.

### Signature / Usage

```python
# Constraints are added via Assembly.constrain(), not instantiated directly:
assy.constrain("box?top_face", "ball?bottom_face", "Plane")
assy.solve()
```

### Notes

- `Constraint` is an alias of `ConstraintSpec` — direct instantiation is rarely needed.
- Constraints are resolved by calling `Assembly.solve()`.
- The query strings passed to `Assembly.constrain()` use the form `"<name>?<selector>"`.

### Related

- [core.md — Assembly](./core.md)
