# Split Keyboard Mirror

Generate both halves of a split keyboard from a single-hand zone definition using `mirror`.

```yaml
points:
  zones:
    matrix:
      anchor:
        rotate: 5
      columns:
        pinky:
        ring:
          key:
            stagger: 12
            splay: -5
            origin: [-u/2, -u/2]
        middle:
          key:
            stagger: 5
        index:
          key:
            stagger: -6
        inner:
          key:
            stagger: -2
      rows:
        bottom:
        home:
        top:
      key:
        spread: u
        padding: u
  mirror:
    ref: matrix_inner_top
    distance: 250
```

## Notes

- `mirror.ref` specifies a point on the axis; the axis passes through that point perpendicular to X
- `mirror.distance` sets the gap (in mm) between the two halves
- Points mirrored from source get the prefix `mirror_` added to their names (e.g., `mirror_matrix_pinky_home`)
- `rotate: 5` at the zone anchor tilts the entire half; adjust for your desired tenting angle
- Omit `mirror` to produce only the source (left) half
