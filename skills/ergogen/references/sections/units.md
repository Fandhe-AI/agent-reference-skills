# Units

The `units` section defines named numeric variables (usable as math formulas) throughout the rest of the config. Built-in units cover standard MX and Choc key spacings.

## Signature / Usage

```yaml
units:
  # override or extend built-in units
  a: cy - 7
  b: a * 1.5
```

## Built-in Units

| Name | Value (mm) | Description |
|------|-----------|-------------|
| `U` | 19.05 | MX spacing (exact) |
| `u` | 19 | MX spacing (rounded) |
| `cx` | 18 | Choc X spacing |
| `cy` | 17 | Choc Y spacing |

## Internal Default Variables

These variables set default values for key-level attributes and can be overridden in `units`:

| Name | Default | Description |
|------|---------|-------------|
| `$default_stagger` | 0 | Default column stagger |
| `$default_spread` | `u` | Default column spread |
| `$default_splay` | 0 | Default column splay angle |
| `$default_height` | `u-1` | Default key height |
| `$default_width` | `u-1` | Default key width |
| `$default_padding` | `u` | Default row padding |
| `$default_autobind` | 10 | Default autobind reach |

## Notes

- Any string that is a valid math formula can be used as a unit value.
- Units can reference other units defined earlier in the same block.
- `U` (uppercase) and `u` (lowercase) are distinct: 19.05 vs 19.

## Related

- [Points](./points.md)
