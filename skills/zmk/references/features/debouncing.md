# Debouncing

ZMK uses a cycle-based debounce algorithm where each key is debounced independently. By default a key must remain stable for 5 ms before a state change is registered.

## Signature / Usage

```kconfig
# .conf — global overrides
CONFIG_ZMK_KSCAN_DEBOUNCE_PRESS_MS=5
CONFIG_ZMK_KSCAN_DEBOUNCE_RELEASE_MS=5
```

```dts
/* per-driver devicetree override */
&kscan0 {
    debounce-press-ms = <3>;
    debounce-release-ms = <3>;
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CONFIG_ZMK_KSCAN_DEBOUNCE_PRESS_MS` | int (0–16383) | Global press debounce time in ms (default: 5) |
| `CONFIG_ZMK_KSCAN_DEBOUNCE_RELEASE_MS` | int (0–16383) | Global release debounce time in ms (default: 5) |
| `debounce-press-ms` | int | Per-driver press debounce time in ms |
| `debounce-release-ms` | int | Per-driver release debounce time in ms |
| `debounce-scan-period-ms` | int | Scan frequency while debouncing (default: 1ms) |

## Notes

- Supported by `zmk,kscan-gpio-matrix` and `zmk,kscan-gpio-direct` drivers only.
- Global Kconfig options override per-driver devicetree settings.
- Timers round up to the next multiple of `debounce-scan-period-ms`.
- For minimum latency, set `DEBOUNCE_PRESS_MS=0` or `1` with a higher release value.
- `debounce-period` devicetree property is deprecated.
- Equivalent to QMK's `sym_defer_pk` algorithm; eager mode mirrors `asym_eager_defer_pk`.
