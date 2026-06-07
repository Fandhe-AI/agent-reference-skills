---
name: Curves, Surfaces, Metaballs & Text
description: Bezier curves, NURBS, Metaballs, and Text objects in Blender with Python API.
---

# Curves, Surfaces, Metaballs & Text

Blender supports several non-mesh object types for modeling: Bezier and NURBS curves/surfaces, Metaball objects, and Text objects. All can be converted to meshes via `Object > Convert > Mesh`.

## Bezier Curves

Bezier curves are defined by control points, each with two handles that control the tangent direction and curvature on either side.

### Handle Types

| Type | Description |
|------|-------------|
| `FREE` | Handles rotate independently; allows sharp corners |
| `VECTOR` | Handle points toward the adjacent control point; straight segments |
| `ALIGNED` | Both handles stay co-linear; smooth joins |
| `AUTO` | Blender auto-adjusts handles for smooth curves |

### Key Edit Mode Operations

| Operation | Shortcut | Description |
|-----------|----------|-------------|
| Add point | `Ctrl+Click` | Extrude a new control point from selection |
| Subdivide | `W` → Subdivide | Inserts points between selected points |
| Toggle cyclic | `Alt+C` | Closes/opens the curve loop |
| Set handle type | `V` | Choose handle type for selected points |
| Tilt | `Ctrl+T` | Rotates the curve's cross-section at each point |

### Curve Extrusion and Bevel

Curves can be given 3D volume via the curve data properties:

- **Extrude** — extends the curve profile along its normal
- **Bevel Depth** — adds a circular bevel profile around the curve spine
- **Bevel Object** — uses a custom 2D curve shape as the bevel profile

## NURBS Curves and Surfaces

NURBS (Non-Uniform Rational B-Splines) use weighted control points. Blender supports NURBS curves and NURBS surface patches.

- Control point **weight** influences how strongly each point pulls the curve
- **Order** (U and V directions) controls how many points influence any given segment
- NURBS surfaces are useful for precise CAD-like shapes

## Metaballs

Metaball objects are implicit surfaces defined by a scalar field. Objects in the same group blend together organically based on a shared threshold.

### Element Types

| Type | Description |
|------|-------------|
| Ball | Spherical field; creates a rounded blob |
| Capsule | Linear field; cylindrical with rounded caps |
| Plane | Planar field; produces a flat slab with rounded edges |
| Ellipsoid | Ellipsoidal field; a stretched sphere |

**Threshold** controls the isosurface level (0.0–5.0). Lower values produce a smoother, larger merged surface.

## Text Objects

Text objects render 3D extruded text with full control over font, size, alignment, and character spacing. Convert to mesh (`Alt+C`) for further polygon editing.

Key text properties: Font face, Size, Shear, Extrude depth, Bevel, Horizontal/Vertical alignment, Character spacing.

## Python API Mapping

### Creating a Bezier Curve

```python
import bpy

curve_data = bpy.data.curves.new(name="MyCurve", type='CURVE')
curve_data.dimensions = '3D'

spline = curve_data.splines.new('BEZIER')
spline.bezier_points.add(2)  # adds 2 more points (total 3)

# Set control point positions and handle types
p0 = spline.bezier_points[0]
p0.co = (0, 0, 0)
p0.handle_left_type  = 'AUTO'
p0.handle_right_type = 'AUTO'

p1 = spline.bezier_points[1]
p1.co = (1, 1, 0)
p1.handle_left_type  = 'ALIGNED'
p1.handle_right_type = 'ALIGNED'

# Wrap in an object and link to scene
curve_obj = bpy.data.objects.new("MyCurveObj", curve_data)
bpy.context.collection.objects.link(curve_obj)
```

### Curve Extrusion and Bevel via Python

```python
import bpy

curve_data = bpy.data.curves["MyCurve"]
curve_data.extrude = 0.1          # extrusion depth
curve_data.bevel_depth = 0.05     # bevel radius
curve_data.bevel_resolution = 4   # bevel smoothness
curve_data.use_fill_caps = True   # close the ends
```

### Creating a NURBS Curve

```python
import bpy

curve_data = bpy.data.curves.new(name="NurbsCurve", type='CURVE')
curve_data.dimensions = '3D'

spline = curve_data.splines.new('NURBS')
spline.points.add(3)  # total 4 control points

import mathutils
spline.points[0].co = mathutils.Vector((0, 0, 0, 1))   # (x, y, z, weight)
spline.points[1].co = mathutils.Vector((1, 2, 0, 1))
spline.points[2].co = mathutils.Vector((2, 0, 0, 1))
spline.points[3].co = mathutils.Vector((3, 1, 0, 1))

spline.order_u = 4  # cubic NURBS

curve_obj = bpy.data.objects.new("NurbsObj", curve_data)
bpy.context.collection.objects.link(curve_obj)
```

### Creating Metaballs

```python
import bpy

# Each metaball object in the same scene family shares the same global metaball data
mball = bpy.data.metaballs.new("Meta")
mball.threshold = 0.6
mball.resolution = 0.2  # viewport resolution

# Add elements
el = mball.elements.new()
el.type = 'BALL'
el.co = (0.0, 0.0, 0.0)
el.radius = 1.0

el2 = mball.elements.new()
el2.type = 'CAPSULE'
el2.co = (1.5, 0.0, 0.0)
el2.radius = 0.8

meta_obj = bpy.data.objects.new("MetaObj", mball)
bpy.context.collection.objects.link(meta_obj)
```

### Curve-Related Operators

```python
import bpy

# Subdivide selected segments (in Edit Mode)
bpy.ops.curve.subdivide(number_cuts=1)

# Set all selected handle types
bpy.ops.curve.handle_type_set(type='AUTO')

# Toggle cyclic
bpy.ops.curve.cyclic_toggle()

# Convert curve to mesh
bpy.ops.object.convert(target='MESH')
```

## Notes

- NURBS control points use 4D vectors `(x, y, z, weight)`; weight defaults to 1.0
- Metaball objects are grouped by name prefix: e.g., `Meta`, `Meta.001`, `Meta.002` all belong to the same family and blend together
- Converting a Text or Curve object to mesh (`Object > Convert > Mesh`) is destructive; the original curve data is replaced
- `bpy.data.curves` holds both Curve and Surface object data; check `curve_data.type` (`'CURVE'` vs `'SURFACE'`)
- Spline types available via `splines.new()`: `'POLY'`, `'BEZIER'`, `'BSPLINE'`, `'CARDINAL'`, `'NURBS'`

## Related

- [Mesh Basics](./mesh-basics.md)
- [Modifiers](./modifiers.md)
