# 3D Case

Extrude outlines into 3D-printable solid geometry using the `cases` section.

```yaml
cases:
  # Top plate (switch cutouts visible in outline)
  top_plate:
    - what: outline
      name: board
      extrude: 1.5

  # Helper: outer wall volume
  _wall_outer:
    - what: outline
      name: board
      extrude: 12

  # Helper: inner cavity (subtract from outer)
  _wall_inner:
    - what: outline
      name: board
      extrude: 11

  # Hollow wall shell
  _wall:
    - what: case
      name: _wall_outer
    - what: case
      name: _wall_inner
      operation: subtract

  # Final assembled case: plate sits on top of wall
  assembled:
    - what: case
      name: top_plate
    - what: case
      name: _wall
      shift: [0, 0, 1.5]
```

## Notes

- `extrude` sets Z-depth in mm; the shape is lifted from the XY plane upward
- `shift: [x, y, z]` translates a part in 3D space after extrusion
- `operation: subtract` performs a boolean difference, carving one solid out of another
- Prefix a case name with `_` to make it a private helper (not written to output)
- Output is a `.jscad` file; open in OpenJSCAD to preview and export STL
