---
name: bpy.app
description: Application-level constants, event handlers, timers, and translation support.
---

# bpy.app

Provides read-only application metadata (version, build info, runtime flags) and three submodules for event handling (`handlers`), deferred execution (`timers`), and localization (`translations`).

## Signature / Usage

```python
import bpy

# Version check
if bpy.app.version >= (4, 0, 0):
    print("Running Blender 4+")

# Handler with @persistent (survives file loads)
from bpy.app.handlers import persistent

@persistent
def on_load(*args):
    # load_post receives dummy args; read the path from bpy.data
    print("File loaded:", bpy.data.filepath)

bpy.app.handlers.load_post.append(on_load)

# Timer: run once after 2 seconds
def my_timer():
    print("Timer fired")
    return None  # returning None unregisters the timer

bpy.app.timers.register(my_timer, first_interval=2.0)
```

## Options / Props

### Version Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `version` | `tuple[int, int, int]` | Blender version as `(major, minor, micro)` |
| `version_string` | `str` | Human-readable version, e.g. `"5.2.0"` |
| `version_cycle` | `str` | Release status: `'alpha'`, `'beta'`, `'rc'`, `'release'` |
| `version_file` | `tuple[int, int]` | `.blend` file format compatibility version |

### Runtime State Flags

| Attribute | Type | Description |
|-----------|------|-------------|
| `background` | `bool` | `True` when running headless (`--background`) |
| `factory_startup` | `bool` | `True` with `--factory-startup` flag |
| `module` | `bool` | `True` when Blender runs as a Python module |
| `portable` | `bool` | `True` unless built with absolute path references |
| `debug` | `bool` | `True` when `--debug` flag is active |
| `debug_python` | `bool` | Debug mode for Python specifically |

### File Paths

| Attribute | Type | Description |
|-----------|------|-------------|
| `binary_path` | `str` | Path to the Blender executable |
| `tempdir` | `str` | Temporary directory for the session |
| `cachedir` | `str` | Cache directory (temp fallback if unavailable) |

### bpy.app.handlers

Event callback lists. Append callables to subscribe; remove to unsubscribe.

| Handler List | Trigger |
|-------------|---------|
| `frame_change_pre` / `frame_change_post` | Before/after each frame change |
| `depsgraph_update_pre` / `depsgraph_update_post` | Before/after dependency graph update |
| `load_pre` / `load_post` / `load_post_fail` | File load events |
| `save_pre` / `save_post` / `save_post_fail` | File save events |
| `render_pre` / `render_post` / `render_complete` / `render_cancel` | Render lifecycle |
| `render_init` / `render_write` / `render_stats` | Render sub-events |
| `undo_pre` / `undo_post` / `redo_pre` / `redo_post` | Undo/redo events |
| `annotation_pre` / `annotation_post` | Grease Pencil annotation events |
| `animation_playback_pre` / `animation_playback_post` | Playback start/stop |
| `object_bake_pre` / `object_bake_complete` / `object_bake_cancel` | Baking events |
| `composite_pre` / `composite_post` / `composite_cancel` | Compositing events |
| `exit_pre` | Before Blender quits |

**`@persistent` decorator**: by default handlers are freed on file load. Decorate with `@persistent` from `bpy.app.handlers` to keep them active across file loads.

```python
from bpy.app.handlers import persistent

@persistent
def my_handler(scene):
    print("Frame:", scene.frame_current)

bpy.app.handlers.frame_change_pre.append(my_handler)
# Remove:
bpy.app.handlers.frame_change_pre.remove(my_handler)
```

### bpy.app.timers

| Function | Signature | Description |
|----------|-----------|-------------|
| `register(fn, *, first_interval=0, persistent=False)` | `-> None` | Register `fn` to be called after `first_interval` seconds. `fn` returns `None` to stop or a `float` seconds until next call. |
| `unregister(fn)` | `-> None` | Remove a registered timer. |
| `is_registered(fn)` | `-> bool` | Check if `fn` is currently registered. |

```python
def make_countdown(start):
    state = {"n": start}
    def tick():
        print(state["n"])
        if state["n"] <= 0:
            return None  # unregister the timer
        state["n"] -= 1
        return 1.0       # run again in 1 second
    return tick

bpy.app.timers.register(make_countdown(5))
```

### bpy.app.translations

| Attribute / Function | Description |
|----------------------|-------------|
| `locale` | Active locale string (empty if i18n disabled) |
| `contexts` | Predefined context constants (`Operator`, `UI_Events_KeyMaps`, `id_mesh`, …) |
| `register(module_name, translations_dict)` | Register addon translations. `translations_dict`: `{locale: {(ctx, msg): translation}}` |
| `unregister(module_name)` | Remove registered translations |
| `pgettext_iface(msg, ctx='*')` | Translate a UI label string |
| `pgettext_tip(msg, ctx='*')` | Translate a tooltip string |

## Notes

- Handler callbacks for `frame_change_pre`/`post` during rendering are called from the render thread, while viewport updates occur on a different thread. Modifying scene data in these handlers without locking can cause crashes — lock the interface before rendering if handlers mutate data.
- Timer functions run on the main thread between UI events; they are safe for data modifications but should complete quickly to avoid UI stutter.
- `bpy.app.timers.register` with `persistent=True` preserves the timer across file loads, analogous to `@persistent` for handlers.
- The `driver_namespace` dict (`bpy.app.driver_namespace`) is reset on file load; populate it in a `load_post` handler or via a registered text data-block.

## Related

- [bpy.context](./bpy-context.md)
- [bpy.utils](./bpy-utils.md)
- [bpy.info](./bpy-info.md)
