---
name: Drivers
description: Drive property values with Python expressions or other properties via the Driver system
---

# Drivers

A Driver is a special F-Curve that computes its value from a Python expression or from another property, rather than from manually placed keyframe points. Drivers enable procedural relationships between object properties.

## Overview

Drivers are stored as F-Curves in `object.animation_data.drivers` (not in an Action). Each driver has a `driver` sub-object (`Driver`) that holds the expression and variables.

## Key Operations

### Add a driver with a simple expression

```python
import bpy

obj = bpy.context.object

# Drive Z location with a sine wave
fc = obj.driver_add("location", 2)          # index 2 = Z axis
fc.driver.type = 'SCRIPTED'
fc.driver.expression = "sin(frame / 10)"
```

`driver_add(data_path, index=-1)` returns an `FCurve` whose `.driver` is the `Driver` object.

### Add a variable referencing another property

```python
fc = obj.driver_add("location", 2)
drv = fc.driver
drv.type = 'SCRIPTED'

var = drv.variables.new()
var.name = "my_x"
var.type = 'SINGLE_PROP'
var.targets[0].id_type = 'OBJECT'
var.targets[0].id = bpy.data.objects["ControlObject"]
var.targets[0].data_path = "location[0]"

drv.expression = "my_x * 2"
```

### Use TRANSFORMS variable type

```python
var = drv.variables.new()
var.name = "rot"
var.type = 'TRANSFORMS'
tgt = var.targets[0]
tgt.id = bpy.data.objects["Ctrl"]
tgt.transform_type = 'ROT_Z'           # LOC_X/Y/Z, ROT_X/Y/Z, SCALE_X/Y/Z
tgt.transform_space = 'LOCAL_SPACE'    # WORLD_SPACE | LOCAL_SPACE
```

### Extend the driver namespace with a custom function

```python
def smooth_step(x):
    return x * x * (3 - 2 * x)

bpy.app.driver_namespace["smooth_step"] = smooth_step
# Expression can now use: smooth_step(var)
```

Register the namespace extension via a `load_post` handler so it persists across file loads.

### Remove a driver

```python
obj.driver_remove("location", 2)
```

### Iterate existing drivers

```python
for fc in obj.animation_data.drivers:
    print(fc.data_path, fc.array_index, fc.driver.expression)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `driver_add(data_path, index)` | method | Add driver; returns FCurve |
| `driver_remove(data_path, index)` | method | Remove driver |
| `Driver.type` | enum | `AVERAGE`, `SUM`, `MIN`, `MAX`, `SCRIPTED` |
| `Driver.expression` | `str` | Python expression (SCRIPTED type) |
| `Driver.use_self` | `bool` | Exposes `self` (the driven object) inside the expression |
| `DriverVariable.name` | `str` | Variable name used in expression |
| `DriverVariable.type` | enum | `SINGLE_PROP`, `TRANSFORMS`, `ROTATION_DIFF`, `LOC_DIFF` |
| `DriverTarget.id_type` | enum | `OBJECT`, `SCENE`, `MESH`, `ARMATURE`, … |
| `DriverTarget.id` | ID | The referenced data-block |
| `DriverTarget.data_path` | `str` | RNA path within that data-block |
| `bpy.app.driver_namespace` | dict | Global namespace for custom driver functions |

## Notes

- **Security**: By default, Blender blocks Python driver execution. Enable **Edit → Preferences → Save & Load → Auto Run Python Scripts** (or run Blender with `--enable-autoexec`) for scripted expressions to evaluate.
- Simple math expressions (no function calls) are optimized and run without the Python interpreter overhead.
- Drivers are re-evaluated every frame; avoid expensive computations in expressions.
- `use_self` (`drv.use_self = True`) makes `self` available in the expression, referencing the object that owns the driver.

## Related

- [keyframes.md](./keyframes.md)
- [actions-nla.md](./actions-nla.md)
- [shape-keys.md](./shape-keys.md)
