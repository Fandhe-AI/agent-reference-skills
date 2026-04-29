# Important CQGI Methods

Core methods used when integrating CQGI into an execution environment or automation pipeline.

## Signature / Usage

```python
from cadquery import cqgi

# Parse a script string into a CQModel
model = cqgi.parse(script_source)

# Introspect declared parameters
parameters = model.metadata.parameters

# Build with optional parameter overrides
build_result = model.build(build_parameters={"height": 5.0}, build_options={})

# Inspect results
if build_result.success:
    shape = build_result.first_result.shape
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `cqgi.parse` | `parse(script_source: str) -> CQModel` | Parses script source and returns a `CQModel` |
| `CQModel.build` | `build(build_parameters=None, build_options=None) -> BuildResult` | Executes the script with optional overrides |
| `CQModel.validate` | `validate(params) -> None` | Validates parameters (not yet implemented) |
| `ScriptCallback.show_object` | `show_object(shape, options={}, **kwargs)` | Returns a shape to the executing environment |
| `ScriptCallback.debug` | `debug(obj, args={})` | Outputs diagnostic objects |

## Notes

- `cqgi.parse` does not execute the script; execution happens in `build()`
- `build_parameters` must be a `dict` mapping variable names to new values
- `build_result.first_result` is a convenience accessor for `build_result.results[0]`

## Related

- [Overview](./overview.md)
- [Execution Environment](./execution-environment.md)
- [Complete API](./complete-api.md)
