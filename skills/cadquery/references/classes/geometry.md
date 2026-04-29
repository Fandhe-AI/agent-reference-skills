# Geometry Classes

Geometric primitives and spatial data structures used throughout CadQuery.

---

## Vector

A 3-dimensional vector supporting standard mathematical operations.

### Signature / Usage

```python
import cadquery as cq

v = cq.Vector(1, 0, 0)
n = v.normalized()
p = v.projectToPlane(cq.Vector(0, 0, 1))
```

### Constructor

```python
cadquery.Vector(x: float = 0, y: float = 0, z: float = 0)
cadquery.Vector(v: tuple | list)          # From 2- or 3-tuple
cadquery.Vector(v: gp_Vec | gp_Pnt | ...)  # From OCC object
```

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `multiply(scale)` | `Vector` | Scalar multiplication |
| `normalized()` | `Vector` | Unit vector in the same direction |
| `projectToLine(line_vector)` | `Vector` | Project onto a line direction |
| `projectToPlane(plane_normal)` | `Vector` | Project onto a plane by normal |
| `Center()` *(static)* | `Vector` | Center (average) of a list of vectors |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `x` | `float` | X component |
| `y` | `float` | Y component |
| `z` | `float` | Z component |
| `Length` | `float` | Euclidean length |

### Notes

- Supports `+`, `-`, `*`, `/`, `==` operators.
- Interoperable with Python tuples: most CadQuery methods accept `(x, y, z)` tuples in place of `Vector`.

---

## Matrix

A 4×4 homogeneous transformation matrix for 3D affine transforms.

### Signature / Usage

```python
import cadquery as cq

m = cq.Matrix()
row = m[0]          # Access row as list
t = m.transposed_list()
```

### Constructor

```python
cadquery.Matrix()
```

Matrices are typically constructed by CadQuery internally (e.g., from `Plane` or `Location` objects).

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `transposed_list()` | `List[List[float]]` | Return 4×4 matrix as nested lists (column-major) |
| `__getitem__(index)` | `float` | Access element by flat index |

### Notes

- Wraps OpenCASCADE's `gp_Trsf` / `gp_Mat` objects.
- Pickle-serializable via `__getstate__` / `__setstate__`.

---

## Plane

A 2D coordinate system embedded in 3D space, defined by an origin, X direction, and normal.

### Signature / Usage

```python
import cadquery as cq

# Named planes
xy = cq.Plane.named("XY")
xz = cq.Plane.named("XZ")

# Custom plane
p = cq.Plane(origin=(0, 0, 5), xDir=(1, 0, 0), normal=(0, 0, 1))

# Coordinate conversion
world_pt = p.toWorldCoords((1, 2))
local_pt = p.toLocalCoords(cq.Vector(1, 2, 5))
```

### Constructor

```python
cadquery.Plane(
    origin: Vector | tuple,
    xDir: Vector | tuple = (1, 0, 0),
    normal: Vector | tuple = (0, 0, 1)
)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `origin` | `Vector \| tuple` | — | Origin point of the plane |
| `xDir` | `Vector \| tuple` | `(1,0,0)` | X axis direction |
| `normal` | `Vector \| tuple` | `(0,0,1)` | Normal (Z axis) direction |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `named(name)` *(classmethod)* | `Plane` | Create one of the standard named planes |
| `rotated(rotate=(0,0,0))` | `Plane` | Rotate plane around its axes |
| `setOrigin2d(x, y)` | `None` | Shift the 2D origin within the plane |
| `toLocalCoords(obj)` | `Vector \| Shape` | Transform world object to plane-local coordinates |
| `toWorldCoords(localpt)` | `Vector` | Transform local (u,v) or (u,v,w) to world coordinates |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `origin` | `Vector` | Origin point |
| `xDir` | `Vector` | Local X axis direction |
| `yDir` | `Vector` | Local Y axis direction (computed) |
| `zDir` | `Vector` | Normal / Z axis direction |

### Notes

- Named planes: `"XY"`, `"YZ"`, `"XZ"`, `"front"`, `"back"`, `"left"`, `"right"`, `"top"`, `"bottom"`.
- Supports `==` and `!=` for comparison; hashable for use in sets/dicts.

---

## Location

A position and orientation in 3D space (translation + rotation).

### Signature / Usage

```python
import cadquery as cq

# From a translation vector
loc = cq.Location((1, 2, 3))

# From a plane (sets orientation)
loc = cq.Location(cq.Plane.XY)

# From vector + rotation axis + angle
loc = cq.Location(cq.Vector(0, 0, 10), cq.Vector(0, 0, 1), 45)

t = loc.toTuple()  # ((x,y,z), (rx,ry,rz))
```

### Constructor

```python
cadquery.Location(t: Any)
```

Accepts: `(x,y,z)` tuple, `Vector`, `Plane`, OCC `TopLoc_Location`, or `(translation, rotation)` tuple.

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `toTuple()` | `Tuple[Tuple[float,float,float], Tuple[float,float,float]]` | `((x,y,z), (rx,ry,rz))` Euler angles in degrees |

### Notes

- `Location` supports `*` operator for composition and `**-1` for inversion.
- Used extensively in `Assembly` and `Sketch` for positioning.
- Pickle-serializable.

---

## BoundBox

An axis-aligned bounding box for shapes or point sets.

### Signature / Usage

```python
import cadquery as cq

shape = cq.Workplane("XY").box(10, 5, 3).val()
bb = shape.BoundingBox()
print(bb.xmin, bb.xmax, bb.ymin, bb.ymax, bb.zmin, bb.zmax)
```

### Constructor

```python
cadquery.BoundBox(bb: Bnd_Box)
```

Typically obtained from `Shape.BoundingBox()`, not constructed directly.

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `add(obj, tol=None)` | `BoundBox` | Expand to include a point, Vector, or another BoundBox |
| `enlarge(tol)` | `BoundBox` | Expand uniformly in all directions by `tol` |
| `isInside(b2)` | `bool` | Check whether another BoundBox lies inside this one |
| `findOutsideBox2D(bb1, bb2)` *(static)* | `BoundBox \| None` | Return the larger of two 2D bounding boxes |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `xmin` | `float` | Minimum X |
| `xmax` | `float` | Maximum X |
| `ymin` | `float` | Minimum Y |
| `ymax` | `float` | Maximum Y |
| `zmin` | `float` | Minimum Z |
| `zmax` | `float` | Maximum Z |
| `xsize` | `float` | Width in X |
| `ysize` | `float` | Width in Y |
| `zsize` | `float` | Width in Z |
| `center` | `Vector` | Center point |
| `DiagonalLength` | `float` | Length of the space diagonal |

---

## Color

An RGBA color wrapper around OpenCASCADE's `Quantity_ColorRGBA`.

### Signature / Usage

```python
import cadquery as cq

c1 = cq.Color("red")               # Named color
c2 = cq.Color(1.0, 0.5, 0.0)       # RGB, alpha=0
c3 = cq.Color(0.0, 1.0, 0.0, 0.5)  # RGBA
rgba = c2.toTuple()                 # (1.0, 0.5, 0.0, 0.0)
```

### Constructor

```python
cadquery.Color(name: str)
cadquery.Color(r: float, g: float, b: float, a: float = 0, srgb: bool = True)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | `str` | — | CSS/OCC named color string |
| `r, g, b` | `float` | — | Red, green, blue in [0, 1] |
| `a` | `float` | `0` | Alpha in [0, 1] (0 = opaque) |
| `srgb` | `bool` | `True` | Whether values are in sRGB color space |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `toTuple()` | `Tuple[float, float, float, float]` | Return `(r, g, b, a)` |

### Notes

- Supports `==` and is hashable.
- Alpha convention: `0` = fully opaque, `1` = fully transparent (OCC convention).

---

## Material

Material properties used in `Assembly` for simulation or export metadata.

### Signature / Usage

```python
import cadquery as cq

mat = cq.Material()
mat.name = "steel"
mat.density = 7850.0
mat.densityUnit = "kg/m^3"
mat.description = "Carbon steel"
```

### Constructor

```python
cadquery.Material()
```

### Properties

| Name | Type | Description |
|------|------|-------------|
| `name` | `str` | Material name |
| `density` | `float` | Material density |
| `densityUnit` | `str` | Unit string (e.g., `"kg/m^3"`) |
| `description` | `str` | Free-text description |

### Key Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `toTuple()` | `tuple` | Serialize to tuple |

### Notes

- Supports `==`, hashing, and pickle serialization.
- Passed to `Assembly` or `Shape` metadata; not used for physical simulation by CadQuery itself.
