# Custom Units

Define named numeric variables to parameterize spacing and sizing across the entire config.

```yaml
units:
  # Choc-spacing base
  kx: cx
  ky: cy
  # Derived measurements
  cap_gap: ky - 7
  plate_expand: 0.5
  # Override global defaults for key size
  $default_spread: cx
  $default_padding: cy
  $default_width: cx - 1
  $default_height: cy - 1

points:
  zones:
    matrix:
      columns:
        pinky:
        ring:
          key.stagger: ky * 0.5
        middle:
          key.stagger: ky * 0.75
        index:
          key.stagger: ky * 0.4
      rows:
        bottom:
        home:
        top:
```

## Notes

- Built-in units: `U` = 19.05 mm (MX exact), `u` = 19 mm (MX rounded), `cx` = 18 mm (Choc X), `cy` = 17 mm (Choc Y)
- Any string that is a valid math expression is automatically evaluated (e.g., `cy - 7` → 10)
- Units can reference other units defined earlier in the same `units` block
- `$default_*` variables override the global key attribute defaults without repeating them per column/row
