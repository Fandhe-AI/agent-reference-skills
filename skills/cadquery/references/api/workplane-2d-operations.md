# 2D Operations

2D drawing and construction methods on a CadQuery Workplane, used to build wire profiles for subsequent 3D operations.

## Method Summary

| Method | Signature | Description |
|--------|-----------|-------------|
| `Workplane.center` | `center(x, y)` | Shift local coordinates to the specified location |
| `Workplane.lineTo` | `lineTo(x, y, forConstruction=False)` | Draw a line from current point to absolute (x, y) |
| `Workplane.line` | `line(xDist, yDist, forConstruction=False)` | Draw a line by relative distance from current point |
| `Workplane.vLine` | `vLine(distance, forConstruction=False)` | Draw a vertical line by the given distance |
| `Workplane.vLineTo` | `vLineTo(yCoord, forConstruction=False)` | Draw a vertical line to an absolute y coordinate |
| `Workplane.hLine` | `hLine(distance, forConstruction=False)` | Draw a horizontal line by the given distance |
| `Workplane.hLineTo` | `hLineTo(xCoord, forConstruction=False)` | Draw a horizontal line to an absolute x coordinate |
| `Workplane.polarLine` | `polarLine(distance, angle, forConstruction=False)` | Draw a line of given length at the given angle |
| `Workplane.polarLineTo` | `polarLineTo(distance, angle, forConstruction=False)` | Draw a line to given polar coordinates |
| `Workplane.moveTo` | `moveTo(x=0, y=0)` | Move the current point to (x, y) without drawing |
| `Workplane.move` | `move(xDist=0, yDist=0)` | Move the current point by relative distance without drawing |
| `Workplane.spline` | `spline(listOfXYTuple, tangents=None, periodic=False, scale=True, tol=None, forConstruction=False, includeCurrent=False, makeWire=False)` | Create a spline through the provided 2D or 3D points |
| `Workplane.parametricCurve` | `parametricCurve(func, N=400, start=0, stop=1, tol=1e-6, minDeg=1, maxDeg=6, smoothing=None, makeWire=True)` | Create a spline curve approximating a parametric function |
| `Workplane.parametricSurface` | `parametricSurface(func, N=25, start=0, stop=1, tol=1e-3, minDeg=1, maxDeg=6, smoothing=None)` | Create a spline surface approximating a parametric function |
| `Workplane.threePointArc` | `threePointArc(point1, point2, forConstruction=False)` | Draw an arc through point1 (mid), ending at point2 |
| `Workplane.sagittaArc` | `sagittaArc(endPoint, sag, forConstruction=False)` | Draw an arc defined by its sagitta (bulge) value |
| `Workplane.radiusArc` | `radiusArc(endPoint, radius, forConstruction=False)` | Draw an arc defined by radius to the endpoint |
| `Workplane.tangentArcPoint` | `tangentArcPoint(endpoint, forConstruction=False, relative=True)` | Draw an arc tangent to the previous edge ending at endpoint |
| `Workplane.mirrorY` | `mirrorY()` | Mirror all pending edges around the Y axis of the workplane |
| `Workplane.mirrorX` | `mirrorX()` | Mirror all pending edges around the X axis of the workplane |
| `Workplane.wire` | `wire(forConstruction=False)` | Connect pending edges into a single wire |
| `Workplane.rect` | `rect(xLen, yLen, centered=True, forConstruction=False)` | Make a rectangle for each item on the stack |
| `Workplane.circle` | `circle(radius, forConstruction=False)` | Make a circle for each item on the stack |
| `Workplane.ellipse` | `ellipse(x_radius, y_radius, rotation_angle=0, forConstruction=False)` | Make an ellipse for each item on the stack |
| `Workplane.ellipseArc` | `ellipseArc(x_radius, y_radius, angle1=360, angle2=360, rotation_angle=0, sense=1, forConstruction=False, startAtCurrent=True, makeWire=False)` | Draw an elliptical arc |
| `Workplane.polyline` | `polyline(listOfXYTuple, forConstruction=False, includeCurrent=False)` | Create a polyline from a list of points |
| `Workplane.close` | `close()` | Close the current wire by connecting back to the start |
| `Workplane.rarray` | `rarray(xSpacing, ySpacing, xCount, yCount, center=True)` | Create a rectangular array of points on the stack |
| `Workplane.polarArray` | `polarArray(radius, startAngle, angle, count, fill=True, rotate=True)` | Create a polar array of points on the stack |
| `Workplane.slot2D` | `slot2D(length, diameter, angle=0)` | Create a rounded slot for each point on the stack |
| `Workplane.offset2D` | `offset2D(d, kind="arc", forConstruction=False)` | Create a 2D offset wire |
| `Workplane.placeSketch` | `placeSketch(*sketches)` | Place the provided Sketch object(s) based on current stack items |

## Signature / Usage

```python
import cadquery as cq

# Draw a closed profile and extrude
result = (
    cq.Workplane("XY")
    .moveTo(0, 0)
    .lineTo(2, 0)
    .lineTo(2, 1)
    .lineTo(0, 1)
    .close()
    .extrude(0.5)
)

# Rectangular array of circles
result = (
    cq.Workplane("XY")
    .rarray(1.5, 1.5, 3, 3)
    .circle(0.25)
    .extrude(1)
)
```

## Options / Props

### `Workplane.rect(xLen, yLen, centered, forConstruction)`

| Name | Type | Description |
|------|------|-------------|
| `xLen` | `float` | Length in X direction |
| `yLen` | `float` | Length in Y direction |
| `centered` | `bool \| tuple[bool, bool]` | Center on origin; pass `(True, False)` to center only on one axis (default `True`) |
| `forConstruction` | `bool` | Create as construction geometry |

### `Workplane.spline(listOfXYTuple, tangents, periodic, ...)`

| Name | Type | Description |
|------|------|-------------|
| `listOfXYTuple` | `list[tuple]` | List of 2D or 3D points |
| `tangents` | `list[tuple] \| None` | Tangent vectors at endpoints |
| `periodic` | `bool` | Closed periodic spline |
| `includeCurrent` | `bool` | Include the current point as the first spline point |
| `makeWire` | `bool` | Return as a Wire rather than pending edge |

### `Workplane.rarray(xSpacing, ySpacing, xCount, yCount, center)`

| Name | Type | Description |
|------|------|-------------|
| `xSpacing` | `float` | Spacing between columns |
| `ySpacing` | `float` | Spacing between rows |
| `xCount` | `int` | Number of columns |
| `yCount` | `int` | Number of rows |
| `center` | `bool \| tuple[bool, bool]` | Center the array on the origin |

### `Workplane.polarArray(radius, startAngle, angle, count, fill, rotate)`

| Name | Type | Description |
|------|------|-------------|
| `radius` | `float` | Radius of the polar array |
| `startAngle` | `float` | Starting angle in degrees |
| `angle` | `float` | Total angular span in degrees |
| `count` | `int` | Number of points |
| `fill` | `bool` | Distribute evenly over the full `angle` span |
| `rotate` | `bool` | Rotate each item to face outward |

## Notes

- All coordinate arguments are in the **local workplane coordinate system**.
- `forConstruction=True` creates geometry visible for reference but excluded from faces and wires.
- Drawing methods accumulate "pending edges"; call `close()` or `wire()` to consolidate them before 3D operations.
- `mirrorX()` / `mirrorY()` operate on all pending edges and are useful to draw half a profile.

## Related

- [Workplane Initialization](./workplane-initialization.md)
- [3D Operations (Requiring 2D Workplane)](./workplane-3d-operations.md)
- [Stack and Selector Methods](./stack-selector-methods.md)
