---
name: Headless CLI
description: Run Blender in background mode for scripting and rendering without a GUI
---

# Headless CLI

Run Blender without a graphical display using `--background` (`-b`). Essential for automation, CI pipelines, remote rendering, and script-driven workflows.

## Key Usage

### Basic background script execution

```sh
blender --background scene.blend --python script.py
```

### One-liner with `--python-expr`

```sh
blender --background --python-expr "import bpy; bpy.ops.wm.quit_blender()"
```

### Render a single frame

```sh
blender --background scene.blend --render-output /tmp/frame --render-frame 1
```

### Render full animation

```sh
blender --background scene.blend --render-output /tmp/frame_### --render-anim
```

### Open a file, run a script, then quit

```sh
blender --background scene.blend --python export.py
```

Argument order matters — flags are processed left-to-right. Set `--render-output` before `--render-frame`.

## Options / Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--background` | `-b` | Run without GUI (headless mode) |
| `--python <file>` | `-P` | Execute a Python script after startup |
| `--python-expr <expr>` | | Execute a Python expression (inline) |
| `--render-frame <N>` | `-f` | Render frame N (also accepts ranges like `1..10`) |
| `--render-anim` | `-a` | Render all frames of the animation |
| `--render-output <path>` | `-o` | Set output path/pattern (use `#` for frame padding) |
| `--factory-startup` | | Skip user `startup.blend`; use factory defaults |
| `--no-addons` | | Do not load any add-ons on startup |
| `--python-use-system-env` | | Allow Python to use system `PYTHONPATH` |
| `--python-exit-code <N>` | | Exit with code N if a Python exception is raised (0 = disabled) |

### Output path tokens

- `#` characters → zero-padded frame number (e.g., `frame_###` → `frame_001`)
- `//` prefix → relative to the blend file location
- `{blend_name}` → expanded to the blend file's base name

## Notes

- In `--background` mode Blender exits automatically after the render or script completes; explicit `bpy.ops.wm.quit_blender()` is only needed when no render flag is used and the script must force an exit.
- `sys.exit(code)` can be used inside scripts to set the process exit code for shell pipelines.
- Stdout/stderr from Python scripts are forwarded to the terminal unchanged; redirect with standard shell operators (`>`, `2>&1`).
- `--factory-startup` does not disable user preferences; use `--no-addons` in addition to prevent add-on side-effects.
- Argument order is significant: `blender --background file.blend --render-output /out --render-frame 1` (output must precede frame).

## Related

- [addon-development.md](./addon-development.md)
- [extending.md](./extending.md)
