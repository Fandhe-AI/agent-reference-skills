# More About Script Variables

CQGI identifies overridable input variables by scanning the script's AST for top-level constant assignments to local names.

## Rules for Overridable Variables

- Must be **top-level** statements (not inside functions, classes, or blocks)
- Must be **constant assignments** to simple local names

```python
h = 1.0          # overridable
w = 2.0          # overridable
foo = "bar"      # overridable

def some_function():
    x = 1        # NOT overridable — inside a function
```

## Accessing Parameters

```python
model = cqgi.parse(script_source)
parameters = model.metadata.parameters  # dict[str, InputParameter]
```

Each value is an `InputParameter` object with:

| Property | Description |
|----------|-------------|
| `name` | Variable name as it appears in the script |
| `default_value` | Value assigned in the script |
| `varType` | `BooleanParameter`, `StringParameter`, or `NumericParameter` |
| `desc` | Help text (set via `describe_parameter()`) |
| `valid_values` | Allowed values (set via `describe_parameter()`) |

## Notes

- Type inference (`varType`) is derived from the literal value's Python type
- Variables inside comprehensions, lambdas, or nested scopes are not detected
- `describe_parameter()` injection is planned but not yet fully implemented

## Related

- [Execution Environment](./execution-environment.md)
- [Complete API](./complete-api.md)
