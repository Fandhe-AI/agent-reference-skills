---
name: bpy.path
description: Path utility functions for dealing with paths in Blender, similar in scope to os.path.
---

# bpy.path

This module has a similar scope to `os.path`, containing utility functions for dealing with paths in Blender.

## Signature / Usage

```python
import bpy

abs_path = bpy.path.abspath("//textures/wood.png")
rel_path = bpy.path.relpath(abs_path)
name = bpy.path.basename(rel_path)
safe = bpy.path.clean_name("My Object.001")
```

## Options / Props

| Function | Signature | Returns | Description |
|----------|-----------|---------|-------------|
| `is_autoexec` | `(path, *, canonicalize=False, strip_filename=False)` | bool | False when a directory is excluded from running scripts automatically (`bpy.types.PreferencesFilePaths.autoexec_paths`). `path` (str \| bytes) is expected to end with a path separator. `canonicalize`: resolve the path first. `strip_filename`: use the directory of path. |
| `abspath` | `(path, *, start=None, library=None)` | str | Absolute path relative to the current blend file using the "//" prefix. `start`: relative to this path, default current filename. `library` (`bpy.types.Library \| None`): when not None its path replaces start. |
| `basename` | `(path)` | str | Equivalent to `os.path.basename`, but skips a "//" prefix. Use for Windows compatibility. |
| `clean_name` | `(name, *, replace='_')` | str | Replaces all characters besides A-Z/a-z, 0-9 with "_" or `replace`. |
| `display_name` | `(name, *, has_ext=True, title_case=True)` | str | Display string for menus and UI. `has_ext`: remove file extension. `title_case`: convert lowercase names to title case. |
| `display_name_to_filepath` | `(name)` | str | Reverse of `display_name` using literal versions of characters unsupported in a filepath. |
| `display_name_from_filepath` | `(name)` | str | Path stripped of directory and extension, ensured UTF-8 compatible. |
| `ensure_ext` | `(filepath, ext, *, case_sensitive=False)` | str | Path with the extension added if not already set. `ext` can be compound and should start with a dot (`.blend`, `.tar.gz`). |
| `is_subdir` | `(path, directory)` | bool | True if path is in a subdirectory of directory. Both paths must be absolute. |
| `module_names` | `(path, *, recursive=False, package='')` | list[tuple[str, str]] | Modules importable from path, as (module_name, module_file) pairs. `package`: prefix for module names (without trailing "."). |
| `native_pathsep` | `(path)` | str | Replace the path separator with the system's native `os.sep`. |
| `reduce_dirs` | `(dirs)` | list[str] | Remove duplicates and directories nested in other paths from a sequence of directories. |
| `relpath` | `(path, *, start=None)` | str | Path relative to the current blend file using the "//" prefix. `path` should be absolute. |
| `resolve_ncase` | `(path)` | str | Resolve a case-insensitive path on a case-sensitive system; returns the original path if not found. |

## Notes

- `is_autoexec` does not check the preference to enable automatic script execution (`bpy.types.PreferencesFilePaths.use_scripts_auto_execute`).

## Related

- [bpy.utils](./bpy-utils.md)
- [bpy.data](./bpy-data.md)
