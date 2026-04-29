# CQGI Overview

The CadQuery Gateway Interface (CQGI) standardizes the interface between execution environments and CadQuery scripts. It enables tools such as CQ-editor and sphinx-doc directives to execute scripts and render results visually.

## Signature / Usage

```python
from cadquery import cqgi

model = cqgi.parse(script_source)
build_result = model.build()
```

## Notes

- CQGI is distributed with CadQuery
- It defines a contract between script authors and the tools that run those scripts
- Scripts must call `show_object()` at least once or a `NoOutputError` is raised
- The executing environment provides the `cq` import, `show_object`, and `debug` automatically

## Related

- [Script Side](./script-side.md)
- [Execution Environment](./execution-environment.md)
- [Script Variables](./script-variables.md)
- [STL Automation](./stl-automation.md)
- [Important Methods](./important-methods.md)
- [Complete API](./complete-api.md)
