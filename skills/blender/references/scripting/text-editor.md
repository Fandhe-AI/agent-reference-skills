---
name: Text Editor and Python Console
description: In-editor scripting tools — Text Editor for full scripts and Python Console for interactive inspection
---

# Text Editor and Python Console

Blender ships two built-in scripting environments accessible without any external setup: the **Text Editor** for writing and running complete scripts, and the **Python Console** for interactive one-liners and API exploration.

## Key Usage

### Text Editor — run a script

1. Open the **Scripting** workspace (Topbar tab) or add a Text Editor area manually.
2. Click **New** (or open an existing `.py` file via **Open**).
3. Write or paste your Python code.
4. Press **Run Script** (▶ button) or use the shortcut **Alt+P**.

```python
import bpy

# Example: print all object names in the scene
for obj in bpy.data.objects:
    print(obj.name)
```

Output appears in the terminal from which Blender was launched (stdout).

### Python Console — interactive inspection

Open via **Scripting** workspace or add a Python Console editor pane.

```python
# Shorthand aliases available in the console
C   # → bpy.context
D   # → bpy.data

# Inspect the active object
C.active_object
D.objects['Cube'].location
```

- Press **Tab** or **Ctrl+Space** to autocomplete.
- Use **Up/Down** arrow keys to recall history.

### Startup scripts

Scripts placed in Blender's `scripts/startup/` directory are imported automatically on every launch:

| Platform | Path |
|----------|------|
| Linux | `~/.config/blender/<version>/scripts/startup/` |
| macOS | `~/Library/Application Support/Blender/<version>/scripts/startup/` |
| Windows | `%APPDATA%\Blender Foundation\Blender\<version>\scripts\startup\` |

A Text Editor data-block with **Register** enabled is also executed on file load (useful for per-file startup logic).

### Debugging with print

```python
import sys

print("debug:", bpy.context.active_object, file=sys.stdout)
sys.stdout.flush()
```

Stdout/stderr are visible in the terminal that launched Blender. On Windows, launch from a command prompt to see output.

## Notes

- The Text Editor does not support breakpoints; use `print()`, `sys.stdout`, or an external IDE plugin (e.g., VS Code + Blender Development extension) for debugging.
- Modules imported in the Text Editor are cached; use `importlib.reload(module)` after editing an external file to pick up changes without restarting Blender.
- The Python Console shares the same interpreter session as the Text Editor — variables defined in one are visible in the other.
- `--python-use-system-env` flag (CLI) allows the Blender Python interpreter to pick up `PYTHONPATH` from the shell, enabling system-installed packages.
- Security: automatic script execution is disabled by default. Enable in **Preferences → Save & Load → Blend Files → Auto Run Python Scripts** for development convenience.
- The Scripting workspace layout includes a Text Editor, Python Console, Info editor (showing operator calls as Python), and a 3D Viewport by default.

## Related

- [addon-development.md](./addon-development.md)
- [headless-cli.md](./headless-cli.md)
- [extending.md](./extending.md)
