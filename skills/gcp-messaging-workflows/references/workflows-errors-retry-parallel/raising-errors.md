---
source: https://docs.cloud.google.com/workflows/docs/reference/syntax/raising-errors
---

# Raise errors in Workflows

Use the `raise` step to raise a custom error from a workflow. An error can be a string or a map with user-defined keys, and it can be caught and handled with a `try/except` block.

## Signature / Usage

### Syntax

```yaml
  - STEP_NAME:
      raise:
          KEY_1: VALUE_1
          KEY_2: VALUE_2
```

### Raise a string

```yaml
  - step_a:
      raise: "Something went wrong."
```

### Raise a map

```yaml
  - step_a:
      raise:
          code: 55
          message: "Something went wrong."
```

## Notes

- Errors can be either a string or a map; map keys are user-defined.
- Re-raise a caught error with `raise: ${e}` inside an `except` block (see the catch-errors page).
- The source also shows the JSON form of every example; it is omitted here.
- Source: https://docs.cloud.google.com/workflows/docs/reference/syntax/raising-errors (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [catching-errors.md](./catching-errors.md)
- [retrying.md](./retrying.md)
- Workflow errors: https://docs.cloud.google.com/workflows/docs/reference/syntax/error-types
