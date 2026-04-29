# Automating Export to STL

CQGI enables batch/automated export of CadQuery scripts to STL without an interactive environment.

## Signature / Usage

```python
import cadquery.cqgi as cqgi
import cadquery as cq

model = cqgi.parse(open("example.py").read())
build_result = model.build()

if build_result.success:
    for i, result in enumerate(build_result.results):
        cq.exporters.export(result.shape, f"example_output{i}.stl")
else:
    print(f"BUILD FAILED: {build_result.exception}")
```

## Notes

- `build_result.results` is a list of `ShapeResult` objects; each has a `.shape` attribute
- `cq.exporters.export` handles the actual STL serialization
- Check `build_result.success` before iterating results; on failure the list may be empty
- This pattern works for any script that calls `show_object()`

## Related

- [Execution Environment](./execution-environment.md)
- [Important Methods](./important-methods.md)
- [Complete API](./complete-api.md)
