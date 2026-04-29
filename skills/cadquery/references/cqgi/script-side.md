# The Script Side

CQGI-compliant containers automatically inject the following into the script's execution environment:

- The `cadquery` library imported as `cq`
- `show_object()` — returns shapes to the executing environment
- `debug()` — outputs diagnostic objects

Scripts must invoke `show_object()` at least once; omitting it raises `NoOutputError`.

## Signature / Usage

```python
show_object(shape, options={}, **kwargs)
```

Returns an object to the executing environment with optional metadata.

```python
debug(obj, args={})
```

Outputs objects for diagnostic/debugging purposes with optional arguments.

### Example Script

```python
base_cube = cq.Workplane("XY").rect(1.0, 1.0).extrude(1.0)
top_of_cube_plane = base_cube.faces(">Z").workplane()
debug(top_of_cube_plane, {"color": "yellow"})
circle = top_of_cube_plane.circle(0.5)
show_object(circle.extrude(1.0))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shape` | CadQuery shape | The shape to return to the environment |
| `options` | dict | Metadata dict (e.g. `{'name': 'door'}`) |
| `**kwargs` | any | Additional keyword arguments passed through |

## Notes

- `show_object` and `debug` are injected by the CQGI container; do not import them
- Future additions planned: `add_error(param, field_list)` and `describe_parameter()`

## Related

- [Overview](./overview.md)
- [Execution Environment](./execution-environment.md)
- [Complete API](./complete-api.md)
