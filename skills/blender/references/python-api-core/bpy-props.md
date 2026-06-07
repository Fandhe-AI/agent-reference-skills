---
name: bpy.props
description: Property type definitions for extending Blender data via RNA — used in PropertyGroup and Operator classes.
---

# bpy.props

Defines RNA property types for attaching custom data to Blender types. Properties registered this way integrate with Blender's undo system, animation, and UI. **All parameters must be passed as keyword arguments.**

## Signature / Usage

```python
import bpy

# Attach a float property to Scene
bpy.types.Scene.my_value = bpy.props.FloatProperty(
    name="My Value",
    description="A custom float on every scene",
    default=0.5,
    min=0.0,
    max=1.0,
)

# Access it
bpy.context.scene.my_value = 0.8

# Remove when done (e.g., in unregister())
del bpy.types.Scene.my_value
```

## Options / Props

### Property Types

| Function | RNA Type | Description |
|----------|----------|-------------|
| `BoolProperty()` | `BOOLEAN` | Single boolean toggle |
| `BoolVectorProperty()` | `BOOLEAN[n]` | Array of booleans |
| `IntProperty()` | `INT` | Integer value |
| `IntVectorProperty()` | `INT[n]` | Integer array |
| `FloatProperty()` | `FLOAT` | Single-precision float |
| `FloatVectorProperty()` | `FLOAT[n]` | Float array (vectors, colors, …) |
| `StringProperty()` | `STRING` | Text value |
| `EnumProperty()` | `ENUM` | Dropdown selection |
| `PointerProperty()` | `POINTER` | Reference to another RNA struct |
| `CollectionProperty()` | `COLLECTION` | Dynamic array of a `PropertyGroup` |

### Common Parameters (all types)

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `str` | UI label |
| `description` | `str` | Tooltip text |
| `options` | `set` | Flags: `'ANIMATABLE'`, `'HIDDEN'`, `'SKIP_SAVE'`, `'SKIP_PRESET'` |
| `override` | `set` | Library override flags |
| `tags` | `set` | Custom tags for tooling |
| `update` | `callable` | Callback `fn(self, context)` called on value change |
| `get` | `callable` | Custom getter `fn(self) -> value` |
| `set` | `callable` | Custom setter `fn(self, value)` |

### Numeric Parameters (Int / Float)

| Parameter | Description |
|-----------|-------------|
| `default` | Default value |
| `min` / `max` | Hard clamp limits |
| `soft_min` / `soft_max` | UI slider range (user can type outside) |
| `step` | Increment step |
| `precision` | Float decimal places |
| `subtype` | `'PIXEL'`, `'UNSIGNED'`, `'PERCENTAGE'`, `'ANGLE'`, `'DISTANCE'`, `'FACTOR'`, `'NONE'` |
| `unit` | `'LENGTH'`, `'AREA'`, `'ROTATION'`, `'TIME'`, `'VELOCITY'`, `'MASS'`, `'NONE'` |

### StringProperty Parameters

| Parameter | Description |
|-----------|-------------|
| `default` | Default string |
| `maxlen` | Maximum character length (0 = unlimited) |
| `subtype` | `'FILE_PATH'`, `'DIR_PATH'`, `'FILE_NAME'`, `'BYTE_STRING'`, `'PASSWORD'`, `'NONE'` |
| `search` | Callback for autocomplete: `fn(self, context, edit_text)` |

### EnumProperty Parameters

| Parameter | Description |
|-----------|-------------|
| `items` | List/tuple of `(identifier, name, description[, icon, number])` tuples, or a callback `fn(self, context)` returning same |
| `default` | Identifier string (or set for `'ENUM_FLAG'` options) |

```python
bpy.types.Scene.my_enum = bpy.props.EnumProperty(
    name="Mode",
    items=[
        ("ADD",  "Add",  "Additive blending"),
        ("MULT", "Multiply", "Multiplicative blending"),
    ],
    default="ADD",
)
```

### FloatVectorProperty / IntVectorProperty

| Parameter | Description |
|-----------|-------------|
| `size` | Number of elements (1–32, or tuple for multi-dimensional) |
| `subtype` | `'COLOR'`, `'TRANSLATION'`, `'DIRECTION'`, `'XYZ'`, `'EULER'`, `'QUATERNION'`, `'LAYER'`, etc. |

### PointerProperty Parameters

| Parameter | Description |
|-----------|-------------|
| `type` | Target `PropertyGroup` or ID type (e.g., `bpy.types.Object`) |

### CollectionProperty Parameters

| Parameter | Description |
|-----------|-------------|
| `type` | `PropertyGroup` subclass for each element |

## Addon Registration Pattern

```python
class MySettings(bpy.types.PropertyGroup):
    count: bpy.props.IntProperty(name="Count", default=1, min=1)
    label: bpy.props.StringProperty(name="Label", default="")

classes = [MySettings, OBJECT_OT_MyOp, VIEW3D_PT_MyPanel]

def register():
    for cls in classes:
        bpy.utils.register_class(cls)
    bpy.types.Scene.my_settings = bpy.props.PointerProperty(type=MySettings)

def unregister():
    del bpy.types.Scene.my_settings
    for cls in reversed(classes):
        bpy.utils.unregister_class(cls)
```

## Notes

- Properties defined with annotation syntax (`prop: bpy.props.FloatProperty()`) inside a class body are only effective for `PropertyGroup` and `Operator` subclasses that Blender registers. For other classes use direct assignment (`MyClass.prop = bpy.props.FloatProperty()`).
- Defining `get` without `set` makes the property read-only in the UI.
- `update` and `get`/`set` callbacks may execute in a threaded context during rendering. Avoid modifying unrelated scene data inside them.
- To remove a dynamically added property: `del bpy.types.SomeType.prop_name` or `bpy.props.RemoveProperty(cls, attr="prop_name")`.
- `CollectionProperty` elements are accessed like a list: `.add()`, `.remove(index)`, `.clear()`, and iteration.

## Related

- [bpy.types](./bpy-types.md)
- [bpy.utils](./bpy-utils.md)
- [bpy.info](./bpy-info.md)
