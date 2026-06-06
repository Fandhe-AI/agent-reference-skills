# CadQuery Cheatsheet

Quick-reference for CadQuery's most commonly used operations, selectors, and patterns.

## 3D Construction

### Primitives

| Method | Signature | Description |
|--------|-----------|-------------|
| `box` | `box(length, width, height)` | Create a rectangular solid |
| `sphere` | `sphere(radius)` | Create a spherical shape |
| `cylinder` | `cylinder(height, radius)` | Create a cylindrical shape |
| `wedge` | `wedge(dx, dy, dz, xmin, zmin, xmax, zmax)` | Create a wedge/frustum |
| `text` | `text(txt, fontsize, distance)` | Generate 3D extruded text |

### Additive Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `extrude` | `extrude(until)` | Extend a 2D profile into 3D |
| `revolve` | `revolve(angleDegrees)` | Rotate a profile around an axis |
| `loft` | `loft(ruled=False)` | Create a surface between profiles |
| `sweep` | `sweep(path, isFrenet, transitionMode)` | Move a profile along a path |
| `twistExtrude` | `twistExtrude(distance, angleDegrees)` | Extrude while twisting |

### Subtractive Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `cutBlind` | `cutBlind(until)` | Remove material to a specified depth |
| `cutThruAll` | `cutThruAll()` | Cut completely through the object |
| `hole` | `hole(diameter, depth)` | Create a cylindrical hole |
| `cboreHole` | `cboreHole(diameter, cboreDiameter, cboreDepth)` | Counterbored hole |
| `cskHole` | `cskHole(diameter, cskDiameter, cskAngle)` | Countersunk hole |
| `shell` | `shell(thickness)` | Hollow out a solid |

### Boolean Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `union` | `union(toUnion=None)` | Combine shapes |
| `cut` | `cut(toCut)` | Remove one shape from another |
| `intersect` | `intersect(toIntersect)` | Keep only overlapping portions |
| `combine` | `combine(clean=True)` | Combine all stack items |

Use `combine` parameter shorthand on creation methods:
- `combine="a"` — add (union)
- `combine="s"` — subtract
- `combine="i"` — intersect

### Edge Modifications

| Method | Signature | Description |
|--------|-----------|-------------|
| `fillet` | `fillet(radius)` | Round selected edges |
| `chamfer` | `chamfer(length, length2=None)` | Bevel selected edges |

## 2D Construction

### Shapes

| Method | Signature | Description |
|--------|-----------|-------------|
| `rect` | `rect(xLen, yLen, centered=True)` | Rectangle |
| `circle` | `circle(radius)` | Circle |
| `ellipse` | `ellipse(x_radius, y_radius)` | Ellipse |
| `polygon` | `polygon(nSides, diameter)` | Regular polygon |
| `slot2D` | `slot2D(length, diameter, angle=0)` | Rounded slot |
| `polyline` | `polyline(listOfXYTuple)` | Connected line segments |
| `bezier` | `bezier(listOfXYTuple)` | Bézier curve through control points |

### Positioning

| Method | Signature | Description |
|--------|-----------|-------------|
| `center` | `center(x, y)` | Shift the local coordinate origin |
| `moveTo` | `moveTo(x, y)` | Move current point to absolute position |
| `move` | `move(xDist, yDist)` | Move current point by relative distance |

### Lines and Arcs

| Method | Signature | Description |
|--------|-----------|-------------|
| `lineTo` | `lineTo(x, y)` | Line to absolute coordinates |
| `line` | `line(xDist, yDist)` | Relative line |
| `vLine` | `vLine(distance)` | Vertical line |
| `hLine` | `hLine(distance)` | Horizontal line |
| `polarLine` | `polarLine(distance, angle)` | Line by distance and angle |
| `threePointArc` | `threePointArc(point1, point2)` | Arc through midpoint to endpoint |
| `sagittaArc` | `sagittaArc(endPoint, sag)` | Arc by sagitta value |
| `radiusArc` | `radiusArc(endPoint, radius)` | Arc by radius |
| `spline` | `spline(listOfXYTuple)` | Spline through points |
| `close` | `close()` | Close the current wire |

### Arrays

| Method | Signature | Description |
|--------|-----------|-------------|
| `rarray` | `rarray(xSpacing, ySpacing, xCount, yCount)` | Rectangular array of points |
| `polarArray` | `polarArray(radius, startAngle, angle, count)` | Polar array of points |

## Sketch API

### Basic Shapes

| Method | Signature | Description |
|--------|-----------|-------------|
| `rect` | `rect(w, h, angle=0, mode="a")` | Rectangle |
| `circle` | `circle(r, mode="a")` | Circle |
| `ellipse` | `ellipse(a1, a2, angle=0, mode="a")` | Ellipse |
| `trapezoid` | `trapezoid(w, h, a1)` | Trapezoid |
| `regularPolygon` | `regularPolygon(r, n)` | N-sided regular polygon |
| `polygon` | `polygon(pts)` | Custom polygon |
| `slot` | `slot(w, h, angle=0, mode="a")` | Slot-shaped face |

### Sketch Refinement

| Method | Signature | Description |
|--------|-----------|-------------|
| `fillet` | `fillet(d)` | Round sketch corners |
| `chamfer` | `chamfer(d)` | Bevel sketch corners |
| `finalize` | `finalize()` | Complete sketch and return parent |

## Import / Export

| Operation | Syntax |
|-----------|--------|
| Import STEP | `importers.importStep("path.step")` |
| Import DXF | `importers.importDXF("path.dxf", tol=1e-6)` |
| Export (auto) | `exporters.export(solid, "path.step")` |
| Export STL | `exporters.export(solid, "path.stl", tolerance=0.01)` |
| Export SVG | `solid.exportSvg("path.svg")` |

Supported formats: `STEP`, `STL`, `AMF`, `SVG`, `VRML`, `GLTF`, `TJS`

## Assemblies

```python
assy = (
    cq.Assembly()
    .add(part1, name="base", color=cq.Color("red"))
    .add(part2, name="lid",  loc=cq.Location((0, 0, 10)))
    .constrain("base@faces@>Z", "lid@faces@<Z", "Plane")
    .solve()
)
assy.save("assembly.step")
```

| Method | Description |
|--------|-------------|
| `Assembly()` | Create a new assembly |
| `.add(obj, loc, name, color)` | Add a component |
| `.constrain(q1, q2, kind)` | Apply a constraint |
| `.solve()` | Resolve constraints |
| `.save(path)` | Export (STEP, XML, GLTF, VTKJS, VRML) |

## BREP Topology

| Term | Description |
|------|-------------|
| **Vertex** | A single point in space |
| **Edge** | A curve between two vertices |
| **Wire** | A collection of connected edges |
| **Face** | A surface bounded by edges/wires |
| **Shell** | A collection of connected faces |
| **Solid** | A closed shell (has interior) |
| **Compound** | A collection of solids |

## Selector String Reference

### Axis Symbols

| Symbol | Class | Meaning |
|--------|-------|---------|
| `\|` | `ParallelDirSelector` | Parallel to axis |
| `#` | `PerpendicularDirSelector` | Perpendicular to axis |
| `+` / `-` | `DirectionSelector` | Positive / negative direction |
| `>` | `DirectionMinMaxSelector` | Maximum in direction |
| `<` | `DirectionMinMaxSelector` | Minimum in direction |
| `%` | `TypeSelector` | Geometry type |
| `>>` | `CenterNthSelector` | Nth by center (high→low) |
| `<<` | `CenterNthSelector` | Nth by center (low→high) |

Axes: `X`, `Y`, `Z`, `XY`, `YZ`, `XZ`, or custom `>(1,1,0)`

### Face Selector Examples

| Selector | Returns |
|----------|---------|
| `>Z` | Top face (max Z) |
| `<Z` | Bottom face (min Z) |
| `\|Z` | Faces parallel to XY (horizontal) |
| `+Z` | Faces with +Z normal |
| `#Z` | Faces perpendicular to Z (side faces) |
| `%Plane` | All planar faces |
| `>>Z[1]` | 2nd highest face by center |

### Edge Selector Examples

| Selector | Returns |
|----------|---------|
| `\|Z` | Vertical edges |
| `\|X` | Edges parallel to X |
| `>Y` | Edge(s) farthest in +Y |
| `#Z` | Horizontal edges (perp. to Z) |
| `%Line` | Straight edges only |
| `%Circle` | Circular edges only |

### Vertex Selector Examples

| Selector | Returns |
|----------|---------|
| `>Y` | Vertices farthest in +Y |
| `<Y` | Vertices closest in -Y |
| `>>Y[-2]` | 2nd farthest vertex in +Y |
| `<<Y[0]` | Closest vertex in -Y |

### Combining Selectors

| Syntax | Meaning |
|--------|---------|
| `"\|Z and >Y"` | Parallel to Z AND farthest in Y |
| `">Z or <Z"` | Top or bottom |
| `"not >Z"` | All faces except the top |
| `"\|Z exc >Z"` | Horizontal faces except the top |

## Workplane Positioning

| Method | Description |
|--------|-------------|
| `translate(Vector(x,y,z))` | Move object |
| `rotateAboutCenter(axisEnd, degrees)` | Rotate around object center |
| `rotate(axisStart, axisEnd, degrees)` | Rotate around arbitrary axis |
| `.faces(">Z").workplane()` | New workplane on a face |
| `Workplane("XY", origin=(0,0,5))` | Offset workplane origin |

## Named Planes

| Name | Normal | Equivalent |
|------|--------|-----------|
| `XY` | +Z | `front` |
| `XZ` | +Y | `top` |
| `YZ` | +X | `right` |
| `back` | -Z | — |
| `bottom` | -Y | — |
| `left` | -X | — |

## Core Classes

| Class | Description |
|-------|-------------|
| `Workplane(inPlane, origin)` | Primary modeling entry point |
| `Sketch(parent, locs)` | 2D sketch builder |
| `Assembly(obj, loc, name)` | Hierarchical assembly |
| `Plane(origin, xDir, normal)` | 2D coordinate system |
| `Vector(x, y, z)` | 3D direction/point |
| `Location(pt)` | 3D position + orientation |
| `Color(r, g, b, a)` | RGBA color |

## Related

- [Workplane 2D Operations](./workplane-2d-operations.md)
- [Workplane 3D Operations](./workplane-3d-operations.md)
- [Selectors](./selectors-api.md)
- [Assemblies](./assemblies-api.md)
