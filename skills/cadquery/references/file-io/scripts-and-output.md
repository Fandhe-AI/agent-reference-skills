# CadQuery Scripts and Object Output

CadQuery scripts are pure Python scripts that may follow a few conventions depending on the execution context.

## Usage

**As a library** — no constraints apply.

**Inside an execution environment** (e.g., CQ-editor) — the following conventions apply:

- `cadquery` is usually imported with the alias `cq`
- To return an object to the environment for rendering, call `show_object()`

## Script Structure

Each script generally has three sections:

1. Variable assignments and metadata definitions
2. CadQuery and other Python code
3. Object export or rendering via `show_object()`

## Signature / Usage

```python
import cadquery as cq

# 1. Variable assignments
height = 10
width = 20

# 2. CadQuery operations
result = cq.Workplane().box(width, height, height)

# 3. Output to execution environment
show_object(result)
```

## Notes

- `show_object()` is only required when running inside a CadQuery execution environment (e.g., CQ-editor); it is not available when using CadQuery as a plain library.
- When used as a library, output is handled by the caller directly (e.g., `export()` or `save()`).

## Related

- [Introduction](./introduction.md)
- [Exporting STEP](./exporting-step.md)
