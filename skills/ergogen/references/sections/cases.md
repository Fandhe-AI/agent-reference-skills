# Cases

The `cases` section extrudes 2D outlines and composes them in 3D space to produce JSCAD solid geometry (`.jscad` output).

## Signature / Usage

```yaml
cases:
  top_plate:
    - what: outline
      name: board
      extrude: 1.5
  _wall:
    - what: outline
      name: board
      extrude: 12
    - what: outline
      name: board
      extrude: 11
      operation: subtract
  assembled:
    - what: case
      name: top_plate
    - what: case
      name: _wall
      shift: [0, 0, 1.5]
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `what` | string | — | Component type: `outline` (import 2D outline onto XY plane) or `case` (reference a previously defined case). |
| `name` | string | — | Name of the outline or case to use. |
| `extrude` | number | 1 | Extrusion depth along the Z axis. Only applies when `what: outline`. |
| `shift` | [x, y, z] | [0, 0, 0] | 3D translation of the part. |
| `rotate` | [ax, ay, az] | [0, 0, 0] | Rotation angles around each axis. |
| `operation` | string | `add` | Boolean operation: `add` (union), `subtract` (difference), `intersect` (intersection). |

## Notes

- Parts accept both array and object formats.
- Prefix a case name with `_` to make it private (available for reference but not exported).
- Shorthand notation `[+, -, ~]` followed by a name is also accepted; Ergogen searches cases first, then outlines.
- Cases reference other cases by name, enabling layered 3D composition.
- Output is un-routed JSCAD solid geometry.

## Related

- [Outlines](./outlines.md)
