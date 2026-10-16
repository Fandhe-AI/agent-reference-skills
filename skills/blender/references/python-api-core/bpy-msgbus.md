---
name: bpy.msgbus
description: Message bus for receiving notifications when RNA properties of data-blocks change.
---

# bpy.msgbus

The message bus system can be used to receive notifications when properties of Blender data-blocks are changed via the data API.

## Signature / Usage

```python
import bpy

# Any Python object can act as the subscription's owner.
owner = object()

subscribe_to = bpy.context.object.location

def msgbus_callback(*args):
    # This will print:
    # Something changed! (1, 2, 3)
    print("Something changed!", args)

bpy.msgbus.subscribe_rna(
    key=subscribe_to,
    owner=owner,
    args=(1, 2, 3),
    notify=msgbus_callback,
)
```

Some properties are converted to Python objects when retrieved. Avoid this when creating the subscription by using `datablock.path_resolve("property_name", False)`:

```python
subscribe_to = bpy.context.object.path_resolve("name", False)
```

Subscribe to a property of all instances of a type:

```python
subscribe_to = (bpy.types.Object, "location")
```

## Options / Props

### Functions

| Function | Description |
|----------|-------------|
| `bpy.msgbus.subscribe_rna(*, key, owner, args, notify, options=set())` | Register a message bus subscription. Cleared when another blend file is loaded, or explicitly via `clear_by_owner()`. |
| `bpy.msgbus.publish_rna(*, key)` | Notify subscribers of changes to this property. Typically not needed explicitly since changes publish automatically; may be useful with more general keys. |
| `bpy.msgbus.clear_by_owner(owner)` | Clear all subscribers using this owner. `owner` (Any) is the handle passed to `subscribe_rna()`. |

### subscribe_rna parameters

| Name | Type | Description |
|------|------|-------------|
| key | `bpy.types.Property \| bpy.types.Struct \| tuple[bpy.types.Struct, str]` | Type of data subscribed to: a property instance, a struct type, or a (struct, property name) pair. |
| owner | Any | Handle for this subscription (compared by identity). |
| args | tuple | Arguments passed to the callback. |
| notify | `Callable[..., None]` | The callback function. |
| options | `set[Literal['PERSISTENT']]` | `PERSISTENT`: the subscriber is kept when remapping ID data. |

## Notes

- Triggered by RNA updates: Python API changes (e.g. `some_object.location.x += 3`) and changes via UI sliders, fields, and buttons.
- Not triggered by: moving objects in the 3D Viewport, or changes performed by the animation system.
- Changes done from msgbus callbacks are not included in related undo steps, so users can skip their effects with Undo followed by Redo.
- Unlike property update callbacks, msgbus callbacks are postponed until all operators have finished executing. Per property, the callback fires only once per update cycle even if changed multiple times.
- All subscribers are cleared on file-load. Re-register on load, see `bpy.app.handlers.load_post`.

## Related

- [bpy.app](./bpy-app.md)
- [bpy.types](./bpy-types.md)
