# Preprocessing: Inheritance and Parameterization

Reuse config fragments via `$extends` and `$params`/`$args` to avoid repetition.

```yaml
# Parameterized zone template
_templates:
  staggered_matrix:
    columns:
      pinky:
      ring:
        key.stagger: stagger_ring
      middle:
        key.stagger: stagger_mid
      index:
        key.stagger: stagger_idx
    rows:
      bottom:
      home:
      top:
    key:
      spread: spread_val
      padding: pad_val
    $params: [stagger_ring, stagger_mid, stagger_idx, spread_val, pad_val]

points:
  zones:
    # MX layout using the template
    matrix_mx:
      $extends: _templates.staggered_matrix
      $args: [12, 5, -6, u, u]
      anchor:
        shift: [0, 0]

    # Choc layout using the same template with different spacing
    matrix_choc:
      $extends: _templates.staggered_matrix
      $args: [10, 4, -5, cx, cy]
      anchor:
        shift: [200, 0]
```

## Notes

- `$extends` takes the full dot-notation path to the declaration to inherit from
- `$params` declares placeholder names; `$args` supplies values in the same order
- A child can override inherited fields by redefining them after `$extends`
- Use `$skip: true` on intermediate declarations that are only inheritance sources, not real zones
- `$unset` as a value removes an inherited field entirely
