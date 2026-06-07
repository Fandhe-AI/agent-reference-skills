---
name: Extending the Python Environment
description: Add third-party Python packages to Blender, use bpy as a standalone module, and manage extensions via CLI
---

# Extending the Python Environment

Blender bundles its own CPython interpreter isolated from the system Python. Third-party packages must be installed into Blender's own `python/` tree or bundled with extensions.

## Key Usage

### Install a package into Blender's Python

```sh
# Locate Blender's python binary (Linux/macOS example)
/path/to/blender/python/bin/python3 -m pip install requests

# Windows example
"C:\Program Files\Blender Foundation\Blender 4.2\4.2\python\bin\python.exe" -m pip install requests
```

Packages land in Blender's `python/lib/pythonX.Y/site-packages/`.

### Install inside a script (add-on bootstrap pattern)

```python
import subprocess, sys

def ensure_package(package):
    try:
        __import__(package)
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

ensure_package("requests")
import requests
```

### Use `bpy` as a standalone Python module

The `bpy` package on PyPI lets you run Blender Python scripts without launching the GUI:

```sh
pip install bpy
```

```python
import bpy

bpy.ops.wm.read_factory_settings()
bpy.ops.mesh.primitive_cube_add()
bpy.ops.wm.save_as_mainfile(filepath="/tmp/output.blend")
```

Each `bpy` release targets a specific Blender version and Python version. Check PyPI for the matching combination.

### Build and install an extension (Blender 4.2+)

```sh
# Build a .zip from the current directory (must contain blender_manifest.toml)
blender --command extension build

# Build with platform suffix for multi-platform distribution
blender --command extension build --split-platforms

# Install a local .zip as an extension
blender --command extension install-file --enable ./my_addon-1.0.0.zip

# List installed extensions
blender --command extension list
```

### Enable an add-on at the command line (legacy)

```sh
blender --background --python-expr \
  "import bpy; bpy.ops.preferences.addon_enable(module='my_addon'); bpy.ops.wm.save_userpref()"
```

## Options / Flags

### `blender --command extension` subcommands

| Subcommand | Description |
|------------|-------------|
| `build` | Build a `.zip` from the current directory |
| `build --split-platforms` | Separate zip per platform |
| `install-file <path>` | Install extension from a local file |
| `install-file --enable` | Install and enable immediately |
| `list` | List installed extensions |
| `remove <id>` | Remove an installed extension |
| `repo-add` | Register an extension repository |
| `repo-list` | List configured repositories |

## Notes

- Blender's Python is isolated by design; packages installed system-wide are not available unless `--python-use-system-env` is passed or `PYTHONPATH` is set before launch.
- The recommended pattern for extensions that need third-party packages is to **vendor** (bundle) them inside the extension `.zip` under a `wheels/` directory, declared in `blender_manifest.toml` under `[wheels]`.
- `bpy` on PyPI is for pipeline/scripting use only — it does not support rendering with Cycles GPU or most interactive operators; use the full Blender binary for production renders.
- Each `bpy` PyPI version pinches a narrow Python version; consult https://pypi.org/project/bpy/ for the compatibility matrix.
- The `--python-use-system-env` flag existed before 4.x but had known issues; prefer vendoring or Blender's own pip for reliable dependency management.

## Related

- [addon-development.md](./addon-development.md)
- [headless-cli.md](./headless-cli.md)
