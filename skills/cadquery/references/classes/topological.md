# Topological Classes

Low-level wrappers around OpenCASCADE topology objects. All inherit from `Shape`.

---

## Shape

Base class for all geometric objects in CadQuery. Wraps a `TopoDS_Shape` from OpenCASCADE.

### Constructor

```python
cadquery.Shape(obj: TopoDS_Shape)
```

### Key Methods

**Topology Access**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `Vertices()` | `List[Vertex]` | All vertices |
| `Edges()` | `List[Edge]` | All edges |
| `Wires()` | `List[Wire]` | All wires |
| `Faces()` | `List[Face]` | All faces |
| `Shells()` | `List[Shell]` | All shells |
| `Solids()` | `List[Solid]` | All solids |
| `Compounds()` | `List[Compound]` | All compounds |
| `CompSolids()` | `List[CompSolid]` | All compsolids |

**Geometry Queries**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `Area()` | `float` | Surface area |
| `Volume()` | `float` | Enclosed volume |
| `Center()` | `Vector` | Center of mass |
| `CenterOfBoundBox(tolerance=None)` | `Vector` | Center of bounding box |
| `CombinedCenter(objects)` | `Vector` | Center over multiple shapes |
| `BoundingBox(tolerance=None)` | `BoundBox` | Axis-aligned bounding box |
| `distance(other)` | `float` | Minimum distance to another shape |
| `centerOfMass(obj)` | `Vector` | Center of mass of OCC shape |
| `computeMass(obj)` | `float` | Mass of OCC shape |

**Transformations**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `translate(vector)` | `Shape` | Translate by vector |
| `rotate(startVector, endVector, angleDegrees)` | `Shape` | Rotate around axis |
| `mirror(mirrorPlane, basePointVector)` | `Shape` | Mirror across plane |
| `scale(factor)` | `Shape` | Uniform scale |
| `move(loc)` | `Shape` | Move by Location (in-place) |
| `moved(loc)` | `Shape` | Return moved copy |
| `locate(loc)` | `Shape` | Apply location (in-place) |
| `located(loc)` | `Shape` | Return located copy |

**Boolean Operations**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `cut(*toCut, tol=None)` | `Shape` | Boolean difference |
| `fuse(*toFuse, glue=False, tol=None)` | `Shape` | Boolean union |
| `intersect(*toIntersect, tol=None)` | `Shape` | Boolean intersection |

**Utilities**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `copy()` | `Shape` | Deep copy |
| `isValid()` | `bool` | Check topological validity |
| `isNull()` | `bool` | Check if null/empty |
| `clean()` | `Shape` | Remove redundant geometry |
| `fix()` | `Shape` | Attempt to repair invalid geometry |
| `exportStep(fileName)` | `bool` | Export to STEP file |
| `exportStl(fileName, tolerance, angularTolerance, ascii)` | `bool` | Export to STL |
| `exportBrep(f)` | `bool` | Export to BREP format |
| `export(fileName, exportType, ...)` | `Shape` | Generic export |

### Notes

- `Shape` is not instantiated directly; use the concrete subclasses.
- Transformations return new `Shape` instances; they do not mutate in-place unless explicitly noted.

---

## Vertex

A single point in 3D space.

### Constructor

```python
cadquery.Vertex(obj: TopoDS_Shape, forConstruction: bool = False)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `obj` | `TopoDS_Shape` | — | Underlying OCC vertex |
| `forConstruction` | `bool` | `False` | If `True`, excluded from geometry operations |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `Center()` | `Vector` | Position of this vertex as a Vector |

### Related

- [geometry.md — Vector](./geometry.md)

---

## Edge

A trimmed curve that forms the border of a Face. Inherits `Mixin1D` and `Shape`.

### Constructor

```python
cadquery.Edge(obj: TopoDS_Shape)
```

### Key Methods

**Factory / Creation (classmethods)**

| Method | Description |
|--------|-------------|
| `makeLine(v1, v2)` | Straight line between two Vectors |
| `makeThreePointArc(v1, v2, v3)` | Arc through three points |
| `makeTangentArc(v1, v2, v3)` | Tangent arc |
| `makeSpline(listOfVector, tangents=None, periodic=False, parameters=None, scale=True, tol=1e-6)` | Interpolating spline |
| `makeSplineApprox(listOfVector, tol=0.001, smoothing=None, minDeg=1, maxDeg=6)` | Approximating spline |
| `makeBezier(points)` | Cubic Bezier curve |
| `makeEllipse(x_radius, y_radius, pnt, dir, xdir, angle1=0, angle2=360, sense=1)` | Ellipse or arc of ellipse |

**Instance Methods**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `arcCenter()` | `Vector` | Center of underlying circle or ellipse |
| `hasPCurve(f)` | `bool` | Whether edge has parametric curve on Face `f` |
| `close()` | `Edge` | Close the edge to a loop |
| `trim(pmin, pmax)` | `Edge` | Trim to parameter range |

Curve analysis methods inherited from `Mixin1D` are also available.

### Notes

- Construction edges (`forConstruction=True`) do not participate in face/wire building.

### Related

- [topological.md — Mixin1D](./topological.md)

---

## Wire

A series of connected, ordered Edges that typically bounds a Face. Inherits `Mixin1D` and `Shape`.

### Constructor

```python
cadquery.Wire(obj: TopoDS_Shape)
```

### Key Methods

**Factory / Creation (classmethods)**

| Method | Description |
|--------|-------------|
| `makeCircle(radius, center, normal, angle1=0, angle2=360, sense=1)` | Circular wire |
| `makeEllipse(x_radius, y_radius, pnt, dir, xdir, angle1=0, angle2=360, sense=1)` | Ellipse wire |
| `makePolygon(listOfVectors, forConstruction=False, close=False)` | Polygon wire |
| `makeHelix(pitch, height, radius, center=(0,0,0), dir=(0,0,1), angle=0)` | Helical wire |
| `assembleEdges(edges)` | Wire from an ordered list of edges |

**Instance Methods**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `Vertices()` | `List[Vertex]` | Ordered vertices of the wire |
| `stitch(wires)` | `Wire` | Stitch multiple wires into one |
| `combine(tolerance=1e-9)` | `List[Wire]` | Merge colinear edges |
| `fillet(radius, vertices=None)` | `Wire` | Fillet selected/all vertices |
| `fillet2D(radius, vertices)` | `Wire` | 2D fillet in the XY plane |
| `chamfer2D(length, vertices)` | `Wire` | 2D chamfer in the XY plane |
| `offset2D(d, kind='arc')` | `List[Wire]` | 2D offset |

### Notes

- A closed wire is required to create a `Face`.
- `assembleEdges` automatically orders and joins edges.

---

## Face

A bounded surface representing part of the boundary of a solid. Inherits `Mixin3D` and `Shape`.

### Constructor

```python
cadquery.Face(obj: TopoDS_Shape)
```

### Key Methods

**Factory / Creation (classmethods)**

| Method | Description |
|--------|-------------|
| `makeFromWires(wire, *innerWires)` | Face from outer wire, optionally with holes |
| `makeRuledSurface(edge1, edge2)` | Ruled surface between two edges |
| `makeNSidedSurface(edges, *args)` | N-sided surface (filling) |
| `makeSplineApprox(points, tol=0.01, smoothing=None, minDeg=1, maxDeg=3)` | Surface approximation |

**Query Methods**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `Center()` | `Vector` | Center of the face |
| `normalAt(locationVector=None)` | `Vector` | Normal at given point |
| `positionAt(u, v)` | `Vector` | Point at (u,v) parameters |
| `tangentAt(locationVector=None)` | `Vector` | Tangent at given point |
| `paramAt(pt)` | `Tuple[float, float]` | (u,v) parameters at given point |
| `locationAt(u, v)` | `Location` | Location (pos + normal) at (u,v) |
| `uvBounds()` | `Tuple[float,float,float,float]` | (umin, umax, vmin, vmax) |
| `toPln()` | `gp_Pln` | Convert planar face to OCC plane |
| `isoline(isU, p)` | `Edge` | Isoparametric line on surface |

**Modification Methods**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `fillet2D(radius, vertices)` | `Face` | 2D fillet |
| `chamfer2D(length, vertices)` | `Face` | 2D chamfer |
| `addHole(wire)` | `Face` | Add hole to face |
| `thicken(thickness, solid=True)` | `Solid` | Offset face to create a solid |
| `trim(umin, umax, vmin, vmax)` | `Face` | Trim to parameter range |
| `extend(umin, umax, vmin, vmax)` | `Face` | Extend beyond current bounds |

### Related

- [topological.md — Mixin3D](./topological.md)

---

## Shell

The outer boundary of a surface, formed from a connected set of Faces.

### Constructor

```python
cadquery.Shell(obj: TopoDS_Shape)
```

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `makeShell(listOfFaces)` *(classmethod)* | `Shell` | Create shell from face list |

### Notes

- Shells are rarely created directly; they arise from solid creation operations.

---

## Solid

A single closed 3D volume. Inherits `Mixin3D` and `Shape`.

### Constructor

```python
cadquery.Solid(obj: TopoDS_Shape)
```

### Key Methods

**Factory / Creation (classmethods)**

| Method | Description |
|--------|-------------|
| `makeBox(length, width, height, pnt=(0,0,0), dir=(0,0,1))` | Rectangular box |
| `makeSphere(radius, pnt=(0,0,0), dir=(0,0,1), angle1=-90, angle2=90, angle3=360)` | Sphere |
| `makeCylinder(radius, height, pnt=(0,0,0), dir=(0,0,1), angle=360)` | Cylinder |
| `makeCone(radius1, radius2, height, pnt=(0,0,0), dir=(0,0,1), angle=360)` | Cone |
| `makeTorus(radius1, radius2, pnt=(0,0,0), dir=(0,0,1), angle=360)` | Torus |
| `makeWedge(dx, dy, dz, xmin, zmin, xmax, zmax, pnt=(0,0,0), dir=(0,0,1))` | Wedge |
| `makeLoft(listOfWires, solid=True, ruled=False)` | Loft through wire profiles |
| `makeSolid(shell)` | Create solid from a closed shell |

**Modification (instance methods)**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `extrudeLinear(face, vecNormal, taper=0)` | `Solid` | Linear extrusion |
| `extrudeLinearWithRotation(face, vecCenter, vecNormal, angleDegrees)` | `Solid` | Extrude with twist |
| `revolve(face, angleDegrees, axisStart, axisEnd)` | `Solid` | Revolve face about axis |
| `sweep(profile, path, makeSolid=True, isFrenet=False, mode=None, ...)` | `Solid` | Sweep profile along path |
| `addCavity(tools, tol=None)` | `Solid` | Subtract cavity shapes |

**Query**

| Method | Return Type | Description |
|--------|-------------|-------------|
| `isSolid()` | `bool` | Verify solid topology |
| `outerShell()` | `Shell` | Outer boundary shell |
| `innerShells()` | `List[Shell]` | Inner boundary shells (voids) |

### Related

- [topological.md — Mixin3D](./topological.md)

---

## Compound

A collection of disconnected shapes (solids, wires, edges, etc.). Inherits `Mixin3D` and `Shape`.

### Constructor

```python
cadquery.Compound(obj: TopoDS_Shape)
```

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `makeCompound(listOfShapes)` *(classmethod)* | `Compound` | Create from list of shapes |
| `makeText(text, size, height, font='Arial', fontPath=None, kind='regular', halign='center', valign='center', position=Plane.XY)` *(classmethod)* | `Compound` | 3D extruded text |
| `cut(*toCut, tol=None)` | `Compound` | Boolean difference |
| `fuse(*toFuse, glue=False, tol=None)` | `Compound` | Boolean union |
| `intersect(*toIntersect, tol=None)` | `Compound` | Boolean intersection |
| `remove(*shape)` | `Compound` | Remove shapes from compound |
| `ancestors(shape, kind)` | `Compound` | Find ancestor shapes of given type |
| `siblings(shape, kind, level=1)` | `Compound` | Find topologically related shapes |
| `__bool__()` | `bool` | `False` if compound is empty |

### Notes

- `Compound` is the result type of most multi-shape operations (e.g., arrays, text).

---

## CompSolid

A composite solid — multiple solids sharing boundary faces.

### Constructor

```python
cadquery.CompSolid(obj: TopoDS_Shape)
```

### Notes

- `CompSolid` is rarely used directly in CadQuery; it maps to `TopoDS_CompSolid` in OpenCASCADE.
- Arises from some import operations on STEP files with shared topology.

---

## Mixin1D

Mixin class providing parametric curve analysis methods for 1D shapes (`Edge`, `Wire`).

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `bounds()` | `Tuple[float, float]` | Parameter range (start, end) |
| `startPoint()` | `Vector` | Point at start parameter |
| `endPoint()` | `Vector` | Point at end parameter |
| `paramAt(pt)` | `float` | Parameter at closest point to `pt` |
| `positionAt(d, mode='length')` | `Vector` | 3D position at parameter/distance |
| `locationAt(d, mode='length', frame='frenet', planar=False)` | `Location` | Location frame at parameter/distance |
| `tangentAt(d, mode='length')` | `Vector` | Tangent direction at parameter/distance |
| `normalAt(d, mode='length')` | `Vector` | Normal direction at parameter/distance |
| `curvatureAt(d, mode='length')` | `float` | Signed curvature at parameter/distance |
| `radius()` | `float` | Radius (circular edges only) |
| `arcCenter()` | `Vector` | Center of circle/ellipse |
| `paramsLength()` | `float` | Total arc length |
| `positions(ds, mode='length')` | `List[Vector]` | Positions at multiple parameters |
| `tangents(ds, mode='length')` | `List[Vector]` | Tangents at multiple parameters |
| `normals(ds, mode='length')` | `List[Vector]` | Normals at multiple parameters |
| `curvatures(ds, mode='length')` | `List[float]` | Curvatures at multiple parameters |
| `locations(ds, mode='length', frame='frenet', planar=False)` | `List[Location]` | Locations at multiple parameters |
| `project(pt, d)` | `List[Vector]` | Project external point onto curve |
| `sample(count)` | `List[Vector]` | Evenly spaced sample points |

### Notes

- `mode='length'` interprets `d` as arc length; `mode='parameter'` interprets it as the raw OCC parameter.
- `frame='frenet'` uses Frenet frame; `frame='corrected'` avoids discontinuities on helices.

---

## Mixin3D

Mixin class providing post-processing operations for 3D shapes (`Face`, `Shell`, `Solid`, `Compound`).

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `fillet(radius, edgeList=None)` | `Shape` | Round specified (or all) edges |
| `chamfer(length, length2=None, edgeList=None)` | `Shape` | Bevel specified (or all) edges |
| `hollow(thickness, faceList=None, tolerance=0.0001, kind='arc')` | `Shape` | Hollow solid, removing specified faces |
| `dprism(basis, heights, depths, taper=0, draft=0)` | `Shape` | Draft prism extrusion |
| `isInside(pt, tolerance=1e-6)` | `bool` | Test if point is inside the shape |

### Notes

- `fillet` and `chamfer` operate on `edgeList`; pass `None` to apply to all edges.
- `hollow` is equivalent to `Workplane.shell()`.
