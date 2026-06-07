---
name: bpy.utils
description: Utility functions for class registration, resource paths, previews, and name helpers.
---

# bpy.utils

Utility module providing class registration/unregistration, file-system resource helpers, icon preview management, and miscellaneous string/name utilities.

## Signature / Usage

```python
import bpy

# Register and unregister addon classes
bpy.utils.register_class(MyOperator)
bpy.utils.unregister_class(MyOperator)

# Get user-writable resource directory
scripts_dir = bpy.utils.resource_path('USER')

# Get user-writable extension data directory
ext_dir = bpy.utils.extension_path_user(__package__, path="data", create=True)

# Preview icons
import bpy.utils.previews
pcoll = bpy.utils.previews.new()
preview = pcoll.load("my_icon", "/path/to/icon.png", 'IMAGE')
# Use in UI: layout.operator("my.op", icon_value=preview.icon_id)
bpy.utils.previews.remove(pcoll)
```

## Options / Props

### Class Registration

| Function | Signature | Description |
|----------|-----------|-------------|
| `register_class(cls)` | `(cls: type) -> None` | Register a `Panel`, `Operator`, `Menu`, `PropertyGroup`, `Node`, etc. with Blender. Calls `cls._register()` if defined. |
| `unregister_class(cls)` | `(cls: type) -> None` | Unregister a previously registered class. Calls `cls._unregister()` if defined. |

### Resource Paths

| Function | Signature | Description |
|----------|-----------|-------------|
| `resource_path(type, *, major=None, minor=None)` | `-> str` | Base directory for Blender system files. `type` is `'USER'`, `'LOCAL'`, or `'SYSTEM'`. |
| `extension_path_user(package, *, path='', create=False)` | `-> str` | User-writable path for an extension package; avoids conflicts with system repo. |
| `user_resource(resource_type, *, path='', create=False)` | `-> str` | User home directory path for `'DATAFILES'`, `'CONFIG'`, `'SCRIPTS'`, or `'EXTENSIONS'`. |

### Preview Management (`bpy.utils.previews`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `previews.new()` | `-> ImagePreviewCollection` | Create a new empty preview collection. |
| `previews.remove(pcoll)` | `(pcoll: ImagePreviewCollection) -> None` | Free the collection and all loaded previews. |

#### `ImagePreviewCollection` Methods

| Method | Description |
|--------|-------------|
| `load(name, filepath, file_type, force_reload=False)` | Load an image as a preview. `file_type`: `'IMAGE'`, `'MOVIE'`, `'BLEND'`, `'FONT'`, `'OBJECT_IO'`. Returns `ImagePreview`. |
| `new(name)` | Create an empty named preview slot. |
| `clear()` | Remove all previews from the collection. |
| `close()` | Remove all previews and invalidate the collection. |

Returned `ImagePreview` has `.icon_id` (int) for use in `layout.operator(..., icon_value=preview.icon_id)`.

### Name / String Utilities

| Function | Description |
|----------|-------------|
| `escape_identifier(string)` | Escape a string for use in an animation data-path. |
| `flip_name(name, *, strip_digits=False)` | Mirror bone/object names between `.L`/`.R` or `Left`/`Right` conventions. |
| `smpte_from_frame(frame, *, fps=None, fps_base=None)` | Convert frame number to SMPTE timecode string `"HH:MM:SS:FF"`. |
| `time_from_frame(frame, *, fps=None, fps_base=None)` | Convert frame number to `datetime.timedelta`. |

## Notes

- Classes must be registered in dependency order: `PropertyGroup` subclasses before the classes that reference them via `PointerProperty`.
- When unregistering, reverse the registration order to avoid dangling references.
- Preview collections must be explicitly removed with `previews.remove(pcoll)` when an addon unregisters, or image data will leak.
- Multiple addon preview collections should be stored in a module-level dict (`preview_collections = {}`), keyed by a string identifier, to manage them safely.
- `register_class` validates `bl_idname`, `bl_label`, and required method signatures; missing attributes raise `ValueError` at registration time.

## Related

- [bpy.types](./bpy-types.md)
- [bpy.props](./bpy-props.md)
- [bpy.info](./bpy-info.md)
