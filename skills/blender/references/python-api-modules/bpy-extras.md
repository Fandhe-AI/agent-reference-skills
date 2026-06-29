---
name: bpy_extras
description: Utility modules associated with bpy — I/O helpers, object creation, viewport coordinate conversion, and more.
---

# bpy_extras

Utility modules that extend `bpy` with common patterns for I/O operators, object creation, 3D viewport coordinate conversion, and other tasks.

## Submodules

| Module | Purpose |
|--------|---------|
| `bpy_extras.io_utils` | Import/Export operator mixins and axis helpers |
| `bpy_extras.object_utils` | Object creation helpers |
| `bpy_extras.view3d_utils` | 2D↔3D viewport coordinate conversion |
| `bpy_extras.anim_utils` | Animation baking utilities |
| `bpy_extras.image_utils` | Image loading helpers |
| `bpy_extras.mesh_utils` | Mesh analysis utilities |
| `bpy_extras.node_utils` | Node tree utilities |
| `bpy_extras.asset_utils` | Asset management utilities |

## bpy_extras.io_utils

### ImportHelper

Mixin for file-import operators. Adds `filepath` property and file-selector `invoke`.

List the mixin **before** `bpy.types.Operator` in the base classes so the helper's
`invoke` (which opens the file selector) wins the MRO regardless of any `invoke`
defined further down the operator hierarchy.

```python
from bpy_extras.io_utils import ImportHelper
import bpy

class MyImportOperator(ImportHelper, bpy.types.Operator):
    bl_idname = "import.my_format"
    bl_label  = "Import My Format"
    filename_ext = ".mf"

    def execute(self, context):
        # self.filepath is set by the file selector
        return {'FINISHED'}
```

| Method | Returns | Description |
|--------|---------|-------------|
| `invoke(context, event)` | `set` | Opens file selector |
| `check(context)` | `bool` | Validates axis conversion settings; `True` if a property changed |
| `invoke_popup(context, confirm_text='')` | `set` | Confirmation dialog if path exists, else file selector |

### ExportHelper

Mixin for file-export operators. Adds `filepath` property and pre-fills it from the current blend file name.

```python
from bpy_extras.io_utils import ExportHelper
import bpy

class MyExportOperator(ExportHelper, bpy.types.Operator):
    bl_idname = "export.my_format"
    bl_label  = "Export My Format"
    filename_ext = ".mf"

    def execute(self, context):
        # self.filepath is validated and ready
        return {'FINISHED'}

    def check(self, context):
        return ExportHelper.check(self, context)
```

| Method | Returns | Description |
|--------|---------|-------------|
| `invoke(context, event)` | `set` | Opens file selector, sets default filename |
| `check(context)` | `bool` | Validates filepath and axis conversion; `True` if modified |

### orientation_helper decorator

```python
from bpy_extras.io_utils import orientation_helper

@orientation_helper(axis_forward='-Z', axis_up='Y')
class MyExportOperator(ExportHelper, bpy.types.Operator):
    ...
```

Adds `axis_forward` and `axis_up` enum properties and provides `axis_conversion()` integration.

## bpy_extras.object_utils

### object_data_add

```python
bpy_extras.object_utils.object_data_add(context, obdata, operator=None, name=None)
```

Creates a new object with the given data block and places it using the current view context and user preferences.

| Parameter | Type | Description |
|-----------|------|-------------|
| `context` | `bpy.types.Context` | Active context |
| `obdata` | `bpy.types.ID \| None` | Mesh, curve, or other data-block (or `None`) |
| `operator` | `bpy.types.Operator \| None` | Optional operator supplying location/rotation overrides |
| `name` | `str \| None` | Optional object name |

Returns: `bpy.types.Object`

```python
import bpy, bmesh
from bpy_extras import object_utils

bm = bmesh.new()
bmesh.ops.create_cube(bm, size=1.0)
mesh = bpy.data.meshes.new("MyCube")
bm.to_mesh(mesh)
bm.free()

obj = object_utils.object_data_add(bpy.context, mesh)
```

## bpy_extras.view3d_utils

Converts between 2D viewport (region) coordinates and 3D world space.

### region_2d_to_vector_3d

```python
bpy_extras.view3d_utils.region_2d_to_vector_3d(region, rv3d, coord)
```

Returns a normalized `Vector` direction from the viewport camera through the given 2D point.

| Parameter | Type | Description |
|-----------|------|-------------|
| `region` | `bpy.types.Region` | Typically `bpy.context.region` |
| `rv3d` | `bpy.types.RegionView3D` | Typically `bpy.context.space_data.region_3d` |
| `coord` | `(float, float)` | Mouse region coordinates `(x, y)` |

### region_2d_to_origin_3d

```python
bpy_extras.view3d_utils.region_2d_to_origin_3d(region, rv3d, coord, *, clamp=None)
```

Returns the 3D viewpoint origin for a 2D region coordinate. The `clamp` parameter limits far-clip distance (useful for orthographic precision).

### region_2d_to_location_3d

```python
bpy_extras.view3d_utils.region_2d_to_location_3d(region, rv3d, coord, depth_location)
```

Projects a 2D screen point to a 3D location at the depth of `depth_location`.

### location_3d_to_region_2d

```python
bpy_extras.view3d_utils.location_3d_to_region_2d(region, rv3d, coord, *, default=None)
```

Projects a 3D world-space `Vector` to 2D region coordinates. Returns `default` (or `None`) if the point is behind the camera.

```python
# Mouse-to-3D ray casting example
import bpy
from bpy_extras import view3d_utils

def mouse_to_ray(context, mouse_pos):
    region = context.region
    rv3d   = context.space_data.region_3d
    origin    = view3d_utils.region_2d_to_origin_3d(region, rv3d, mouse_pos)
    direction = view3d_utils.region_2d_to_vector_3d(region, rv3d, mouse_pos)
    return origin, direction
```

## Notes

- `ImportHelper` / `ExportHelper` must be listed **before** `bpy.types.Operator` in the class bases so their `invoke` is picked up
- `object_data_add` respects the "Align to View" user preference — disable by passing an explicit operator with `location` / `rotation` properties
- `region_2d_to_*` functions require the call to happen inside a valid 3D view context (e.g., inside a modal operator or draw handler)

## Related

- [gpu.md](./gpu.md)
- [bmesh.md](./bmesh.md)
