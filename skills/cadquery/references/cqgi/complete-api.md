# Complete CQGI API

Full reference for all public classes, methods, and exceptions in `cadquery.cqgi`.

## Module-level Function

| Name | Signature | Description |
|------|-----------|-------------|
| `parse` | `parse(script_source: str) -> CQModel` | Parses a CadQuery script string and returns a `CQModel` |

---

## BuildResult

Represents the outcome of a script execution.

| Member | Type | Description |
|--------|------|-------------|
| `success` | `bool` | `True` if the script executed without error |
| `results` | `list[ShapeResult]` | All shapes returned via `show_object()` |
| `first_result` | `ShapeResult` | Convenience accessor for `results[0]` |
| `exception` | `Exception \| None` | Exception raised during execution, or `None` on success |

---

## CQModel

Represents a parsed CadQuery script.

### Constructor

```python
CQModel(script_source: str)
```

### Members

| Member | Type / Signature | Description |
|--------|-----------------|-------------|
| `metadata` | `ScriptMetadata` | Contains `parameters` dict of detected input variables |
| `build` | `build(build_parameters=None, build_options=None) -> BuildResult` | Executes the script |
| `validate` | `validate(params) -> None` | Validates parameters (not yet implemented) |

---

## InputParameter

Describes a single overridable script variable.

| Property | Type | Description |
|----------|------|-------------|
| `name` | `str` | Variable name as declared in the script |
| `default_value` | `any` | Value assigned in the script |
| `varType` | `str` | `BooleanParameter`, `StringParameter`, or `NumericParameter` |
| `desc` | `str` | Help text (provided via `describe_parameter()`) |
| `valid_values` | `list` | Allowed values (provided via `describe_parameter()`) |

---

## ScriptCallback

Interface injected into the script's execution namespace.

| Method | Signature | Description |
|--------|-----------|-------------|
| `show_object` | `show_object(shape, options={}, **kwargs)` | Returns a shape to the environment |
| `debug` | `debug(obj, args={})` | Outputs a diagnostic object |
| `describe_parameter` | `describe_parameter(var_data)` | Provides parameter descriptions (planned) |
| `add_error` | `add_error(param, field_list)` | Reports input problems (not yet implemented) |

---

## ShapeResult

Encapsulates a single build output.

| Property | Type | Description |
|----------|------|-------------|
| `shape` | CadQuery shape | The shape returned by `show_object()` |
| `options` | `dict` | Options dict passed to `show_object()` |

---

## ScriptMetadata

Holds metadata extracted from a parsed script.

| Property | Type | Description |
|----------|------|-------------|
| `parameters` | `dict[str, InputParameter]` | Map of variable name to `InputParameter` |

---

## Exception Classes

| Class | Description |
|-------|-------------|
| `NoOutputError` | Raised when a script never calls `show_object()` |
| `InvalidParameterError` | Raised when a `build_parameters` key does not match a script variable or the value type is incompatible |
| `ScriptExecutionError` | Raised for syntax or runtime errors in the script; includes line number information |

---

## Internal / Supporting Classes

These are used internally by CQGI and are not typically called directly.

| Class | Description |
|-------|-------------|
| `ConstantAssignmentFinder` | AST visitor that identifies top-level constant assignments (overridable variables) |
| `ParameterDescriptionFinder` | AST visitor that locates `describe_parameter()` calls |
| `EnvironmentBuilder` | Constructs the execution namespace for a script |

## Related

- [Overview](./overview.md)
- [Script Side](./script-side.md)
- [Execution Environment](./execution-environment.md)
- [Script Variables](./script-variables.md)
- [Important Methods](./important-methods.md)
