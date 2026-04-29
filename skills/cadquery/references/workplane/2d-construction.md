# 2D Construction

Methods for drawing 2D geometry (lines, arcs, curves, shapes, arrays) on the current workplane. 2D constructs become pending wires/edges that are later consumed by 3D operations such as `extrude()`, `revolve()`, or `loft()`.

## Signature / Usage

```python
result = (
    cq.Workplane("XY")
    .rect(2, 1)          # draw a 2-wide, 1-tall rectangle
    .extrude(0.5)        # turn it into a 3D solid
)
```

## Method Reference

### Lines & Movement

| Method | Signature | Description |
|--------|-----------|-------------|
| `center` | `center(x, y)` | Shift local coordinate origin to `(x, y)` |
| `moveTo` | `moveTo(x=0, y=0)` | Move current point to `(x, y)` without drawing |
| `move` | `move(xDist=0, yDist=0)` | Move relative to current point without drawing |
| `lineTo` | `lineTo(x, y, forConstruction=False)` | Line from current point to absolute `(x, y)` |
| `line` | `line(xDist, yDist, forConstruction=False)` | Line from current point by relative offset |
| `vLine` | `vLine(distance, forConstruction=False)` | Vertical line of given length |
| `vLineTo` | `vLineTo(yCoord, forConstruction=False)` | Vertical line to absolute y coordinate |
| `hLine` | `hLine(distance, forConstruction=False)` | Horizontal line of given length |
| `hLineTo` | `hLineTo(xCoord, forConstruction=False)` | Horizontal line to absolute x coordinate |
| `polarLine` | `polarLine(distance, angle, forConstruction=False)` | Line of given length at given angle from current point |
| `polarLineTo` | `polarLineTo(distance, angle, forConstruction=False)` | Line from origin to polar coordinate `(distance, angle)` |

### Arcs & Curves

| Method | Signature | Description |
|--------|-----------|-------------|
| `threePointArc` | `threePointArc(point1, point2, forConstruction=False)` | Arc through current point → `point1` → `point2` |
| `sagittaArc` | `sagittaArc(endPoint, sag, forConstruction=False)` | Arc from current point to `endPoint` with given sagitta |
| `radiusArc` | `radiusArc(endPoint, radius, forConstruction=False)` | Arc from current point to `endPoint` with given radius |
| `tangentArcPoint` | `tangentArcPoint(endpoint, forConstruction=False, relative=True)` | Tangent arc from end of last edge to `endpoint` |
| `spline` | `spline(listOfXYTuple, tangents=None, periodic=False, parameters=None, scale=True, tol=None, forConstruction=False, includeCurrent=False, makeWire=False)` | Interpolated spline through given points (2D or 3D) |
| `parametricCurve` | `parametricCurve(func, N=400, start=0, stop=1, tol=1e-6, minDeg=1, maxDeg=6, smoothing=None, makeWire=True)` | Spline approximating a parametric function `func(t) -> (x,y)` |
| `ellipseArc` | `ellipseArc(x_radius, y_radius, angle1=360, angle2=360, rotation_angle=0, sense=1, startAtCurrent=True, makeWire=False)` | Elliptical arc with given x/y radii |

### Closed Shapes

| Method | Signature | Description |
|--------|-----------|-------------|
| `rect` | `rect(xLen, yLen, centered=True, forConstruction=False)` | Rectangle centered at current point |
| `circle` | `circle(radius, forConstruction=False)` | Circle centered at current point |
| `ellipse` | `ellipse(x_radius, y_radius, rotation_angle=0, forConstruction=False)` | Ellipse centered at current point |
| `slot2D` | `slot2D(length, diameter, angle=0)` | Rounded slot (capsule) at each stack point |
| `polyline` | `polyline(listOfXYTuple, forConstruction=False, includeCurrent=False)` | Polyline through given points |
| `close` | `close()` | Close current open wire back to its start |
| `wire` | `wire(forConstruction=False)` | Connect pending edges into a single Wire object |

### Arrays & Patterns

| Method | Signature | Description |
|--------|-----------|-------------|
| `rarray` | `rarray(xSpacing, ySpacing, xCount, yCount, center=True)` | Rectangular grid of points pushed onto the stack |
| `polarArray` | `polarArray(radius, startAngle, angle, count, fill=True, rotate=True)` | Polar array of points at given radius |

### Mirrors & Offsets

| Method | Signature | Description |
|--------|-----------|-------------|
| `mirrorY` | `mirrorY()` | Mirror all pending edges/wires about the Y axis |
| `mirrorX` | `mirrorX()` | Mirror all pending edges/wires about the X axis |
| `offset2D` | `offset2D(d, kind='arc', forConstruction=False)` | Offset a 2D wire by distance `d` |

### Sketches

| Method | Signature | Description |
|--------|-----------|-------------|
| `parametricSurface` | `parametricSurface(func, N=20, start=0, stop=1, tol=1e-6, minDeg=1, maxDeg=6, smoothing=None)` | Spline surface approximating a 2-parameter function |
| `placeSketch` | `placeSketch(*sketches)` | Place `Sketch` object(s) based on current stack items |

## Notes

- All drawing methods accept `forConstruction=False`. Passing `forConstruction=True` creates geometry that locates other features but does not become part of the final solid.
- After calling drawing methods, the resulting wires/edges are placed in both `objects` and the shared `CQContext.pendingWires`/`pendingEdges`. A subsequent 3D operation consumes and clears them.
- `rarray` and `polarArray` push points onto the stack; subsequent shape methods (e.g., `circle()`) iterate over every point automatically.

## Related

- [Construction Geometry](./construction-geometry.md)
- [3D Construction](./3d-construction.md)
- [Iteration](./iteration.md)
