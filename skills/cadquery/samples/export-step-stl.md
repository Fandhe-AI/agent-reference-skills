# Export STEP and STL

Save a completed solid to STEP (for CAD interchange) or STL (for 3D printing).

```python
import cadquery as cq

result = (
    cq.Workplane("XY")
    .box(10, 10, 5)
    .faces(">Z")
    .workplane()
    .hole(3)
)

# STEP — full geometry, suitable for CAD tools
result.export("part.step")

# STL — triangulated mesh for 3D printing
result.export(
    "part.stl",
    tolerance=0.001,
    angularTolerance=0.05,
)

# Explicit type for non-standard extension
result.export("part.stp", cq.exporters.ExportTypes.STEP)
```

## Notes

- The export format is inferred from the file extension (`.step`, `.stl`, `.svg`, etc.); use `ExportTypes` explicitly for non-standard extensions such as `.stp`.
- Lower `tolerance` and `angularTolerance` values produce finer STL meshes at the cost of larger files.
- For multi-part assemblies with names and colors, use `Assembly.export("file.step")` instead.
- Binary STL (`ascii=False`, the default) is more compact than ASCII STL.
