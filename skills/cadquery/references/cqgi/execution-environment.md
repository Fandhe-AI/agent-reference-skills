# The Execution Environment Side

The execution environment parses and runs CQGI-compliant scripts, optionally overriding script parameters before build.

## Signature / Usage

```python
from cadquery import cqgi

# Basic execution
build_result = cqgi.parse(user_script).build()

# Execution with parameter overrides
build_result = cqgi.parse(user_script).build(
    build_parameters={"param": 2},
    build_options={}
)
```

## Accessing Script Parameters

Before building, introspect the script's declared parameters:

```python
model = cqgi.parse(SCRIPT)
parameters = model.metadata.parameters  # dict of name -> InputParameter
```

## Notes

- `cqgi.parse()` returns a `CQModel` instance
- `build_parameters` keys must match top-level constant names in the script; invalid keys raise `InvalidParameterError`
- `build_options` is reserved for future use
- `build_result.success` is `False` if an exception occurred; check `build_result.exception` for the traceback

## Related

- [Script Variables](./script-variables.md)
- [Important Methods](./important-methods.md)
- [Complete API](./complete-api.md)
