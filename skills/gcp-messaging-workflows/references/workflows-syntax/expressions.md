---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/expressions
---

# Workflows expressions

Expressions are evaluated by the workflow engine and the output is used at execution time, for example to assign to a variable or to return a value. All expressions must begin with a `$` and be enclosed in curly brackets.

## Signature / Usage

```text
   ${EXPRESSION}
```

### Function expression

Standard library functions such as `len()` can be used in expressions.

```yaml
- initVariables:
    assign:
      - project: ${sys.get_env("GOOGLE_CLOUD_PROJECT_ID")}
```

### Multi-line expression

Generates `"SELECT * from customers\nWHERE id=7"`.

```yaml
- assign:
      assign:
      - table: customers
      - id: 7
      - q: ${
          "SELECT * from " + table +
          "\nWHERE id=" + string(id)
          }
```

## Options / Props

### Where expressions can be used

| Use | Syntax page |
|-----|-------------|
| Assign values to variables | https://docs.cloud.google.com/workflows/docs/reference/syntax/variables#assign-step |
| Form call arguments, including all parameters in the `body`, `header`, `query` and `url` sections | [calls.md](./calls.md) |
| Call subworkflows | [subworkflows.md](./subworkflows.md) |
| Apply conditions | https://docs.cloud.google.com/workflows/docs/reference/syntax/jumps |
| Retry values, including `max_retries` and `multiplier` | https://docs.cloud.google.com/workflows/docs/reference/syntax/retrying |
| Return values from a workflow step | https://docs.cloud.google.com/workflows/docs/reference/syntax/completing#using-return |

### Supported elements

| Element | Meaning |
|---------|---------|
| `[0...9]` | numbers |
| `""` | strings |
| `-` (minus sign) | indicates negative numbers; also arithmetic subtraction and negation |
| `.` (dot) | indicates decimal place |
| `+` | arithmetic addition and string concatenation |
| `*` | arithmetic multiplication |
| `/` | float division |
| `%` | remainder division |
| `//` | floor division |
| `()` | parentheses |
| Logical operators | https://docs.cloud.google.com/workflows/docs/reference/syntax/datatypes#logical-operators |
| `variableName` | reference a variable |
| `object.field` | reference a value in an object |
| `object["field"]` | reference a value in an object |
| `list[index]` | reference an index in a list |
| Expression helpers | Convert data (`int`, `string`), operate on lists, maps and strings (`in`, `keys`), conditionally access data inline (`default`, `if`); https://docs.cloud.google.com/workflows/docs/reference/stdlib/expression-helpers |

### Blocking calls that cannot be used inside an expression

| Function | Reference |
|----------|-----------|
| `events.await_callback` | https://docs.cloud.google.com/workflows/docs/reference/stdlib/events/await_callback |
| `experimental.executions.map` | https://docs.cloud.google.com/workflows/docs/reference/stdlib/experimental.executions/map |
| `experimental.executions.run` | https://docs.cloud.google.com/workflows/docs/reference/stdlib/experimental.executions/run |
| `googleapis.*` (connector calls) | https://docs.cloud.google.com/workflows/docs/reference/stdlib/googleapis/overview |
| `http.*` | https://docs.cloud.google.com/workflows/docs/reference/stdlib/overview#module:-http |
| `sys.log` | https://docs.cloud.google.com/workflows/docs/log-workflow#custom_logs |
| `sys.sleep` | https://docs.cloud.google.com/workflows/docs/sleeping |

## Notes

- Blocking calls that cannot be used inside an expression: Run them from a `call` step instead.
- There is a limit on expression length; the source points to https://docs.cloud.google.com/workflows/quotas#resource_limits (the value is not stated on the expressions page).
- All standard library functions are supported in expressions except blocking calls such as HTTP calls, `sys.sleep` and `sys.log`.
- Blocking calls block a workflow's execution and must be resolved before an execution can complete; `sys.sleep` and `http.get` cannot be used inside an expression.
- Multi-line expressions: string literals must be enclosed in double quotes, colons are allowed inside string literals, and any required whitespace must be added inside the string literal.
- In YAML, an expression containing a colon can be read as a map. Recommended: wrap it in single quotes, `'${"foo: " + myVar}'`; not recommended: `${"foo: " + myVar}`. See https://docs.cloud.google.com/workflows/docs/troubleshooting#expressions-colons.
- The source also shows JSON forms of the samples; they are omitted (the source's JSON function sample shows over-escaped quotes, `\\"`, which is not the right JSON escaping).
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/expressions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [calls.md](./calls.md)
- [conditions.md](./conditions.md)
- [subworkflows.md](./subworkflows.md)
- [steps.md](./steps.md)
