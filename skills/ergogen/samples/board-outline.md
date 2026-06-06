# Board Outline

Build a PCB-ready board outline from key positions with bound rectangles and rounded corners.

```yaml
outlines:
  # Private helper: keycap visualization layer
  _keycaps:
    - what: rectangle
      where: true
      bound: false
      size: [cx, cy]

  # Main board edge with fillet
  board:
    - what: rectangle
      where: true
      bound: true
      size: [cx, cy]
      expand: 0.5
      fillet: 2

  # Screw hole cutouts at specific points
  _screws:
    - what: circle
      where:
        ref: matrix_inner_top
      radius: 1.1
    - what: circle
      where:
        ref: matrix_pinky_bottom
      radius: 1.1

  # Final outline with screw holes removed
  combo:
    - what: outline
      name: board
    - what: outline
      name: _screws
      operation: subtract
```

## Notes

- `bound: true` makes rectangles extend toward neighbors using `bind`/`autobind` values, filling gaps between keys
- `expand` grows the shape outward (in mm) for clearance; negative values shrink it
- `fillet` rounds corners; applied after `expand`
- Prefixing a name with `_` marks it private: usable in other outlines but not written to output files
- The `where: true` filter selects all defined points; use a point name or tag to filter a subset
