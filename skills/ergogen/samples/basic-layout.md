# Basic Layout

Define a minimal single-hand keyboard layout with columns and rows.

```yaml
units:
  u: 19

points:
  key:
    padding: u
  zones:
    matrix:
      anchor:
        shift: [0, 0]
      columns:
        pinky:
        ring:
          key:
            stagger: 5
        middle:
          key:
            stagger: 10
        index:
          key:
            stagger: 5
        inner:
      rows:
        bottom:
        home:
        top:
      key:
        spread: u
```

## Notes

- Column names and row names are arbitrary; they become part of the auto-generated point name (`matrix_pinky_bottom`, etc.)
- `stagger` is a cumulative vertical offset applied per column (in mm or unit expressions)
- `spread` controls the horizontal distance between columns; defaults to `u` if omitted
- `padding` controls the vertical distance between rows; defaults to `u`
