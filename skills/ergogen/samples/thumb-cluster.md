# Thumb Cluster

Add a thumb key zone anchored relative to an existing key position.

```yaml
points:
  zones:
    matrix:
      columns:
        pinky:
        ring:
          key.stagger: 12
        middle:
          key.stagger: 5
        index:
          key.stagger: -6
        inner:
          key.stagger: -2
      rows:
        bottom:
        home:
        top:
      key:
        spread: u
        padding: u
    thumbfan:
      anchor:
        ref: matrix_inner_bottom
        shift: [-u/2, -u*1.5]
        rotate: -15
      columns:
        near:
        home:
        far:
      rows:
        thumb:
      key:
        spread: u
        padding: u
  mirror:
    ref: matrix_inner_top
    distance: 250
```

## Notes

- `anchor.ref` attaches the thumb zone origin to an existing point in the matrix zone
- `anchor.shift` and `anchor.rotate` fine-tune the relative position and angle of the thumb cluster
- Thumb columns/rows follow the same naming rules: point names become `thumbfan_near_thumb`, etc.
- Use `asym: source` on a thumb key to exclude it from the mirrored side
