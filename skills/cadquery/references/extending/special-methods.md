# Extending CadQuery: Special Methods

Special methods provide an alternative to monkey-patching the `Workplane` class. They accept plain functions and integrate them into the fluent chain without requiring `cq.Workplane.<name> = fn` registration.

## Signature / Usage

```python
# invoke() — call a functional plugin that accepts a Workplane and returns a Workplane
result = wp.invoke(plugin_factory(...))

# map() — apply a transformation to each item on the stack
result = wp.map(fn)

# apply() — execute a function on the current Workplane state
result = wp.apply(fn)
```

Rewriting the `makeCubes` plugin example using `invoke()`:

```python
import cadquery as cq
from cadquery.func import box

def makeCubes(length):
    def callback(wp):
        return wp.eachpoint(box(length, length, length), True)
    return callback

result = (
    cq.Workplane("XY")
    .box(6.0, 8.0, 0.5)
    .faces(">Z")
    .rect(4.0, 4.0, forConstruction=True)
    .vertices()
    .invoke(makeCubes(1.0))
    .combine()
)
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `invoke` | `invoke(fn)` | Calls `fn(self)` and returns the result. `fn` must accept a `Workplane` and return a `Workplane`. |
| `map` | `map(fn)` | Applies `fn` to each item on the stack; returns a new Workplane with the mapped results. |
| `apply` | `apply(fn)` | Executes `fn` on the current Workplane; intended for side-effecting or transforming operations. |

## Notes

- Special methods avoid polluting the `Workplane` class namespace and are therefore preferred when distributing plugins as libraries.
- Functional plugins using `invoke()` work better with static analysis tools and IDEs (auto-completion, type checking) compared to monkey-patched methods.
- `makeCubes(length)` in the example is a factory: calling it returns a callback suitable for `invoke()`.

## Related

- [Plugins](./plugins.md)
- [Linking in your plugin](./linking.md)
- [Plugin Example](./plugin-example.md)
