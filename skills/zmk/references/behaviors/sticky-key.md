# Sticky Key

Keeps a key (typically a modifier) active until the next non-modifier key is pressed, then releases it automatically. Equivalent to QMK "one-shot mods".

## Signature / Usage

```dts
&sk <keycode>
// e.g. &sk LSHIFT
```

**Parameter:** A keycode (typically a modifier such as `LSHIFT`, `LCTRL`, or a chained modifier like `LG(LS(LA(LCTRL)))`).

Custom instance example:

```dts
/ {
    behaviors {
        skq: sticky_key_quick_release {
            compatible = "zmk,behavior-sticky-key";
            #binding-cells = <1>;
            bindings = <&kp>;
            release-after-ms = <1000>;
            quick-release;
            ignore-modifiers;
        };
    };
};
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `release-after-ms` | integer | Auto-deactivate after this ms if no other key is pressed (default: 1000) |
| `quick-release` | flag | Deactivate on next key **press** rather than release; prevents modifier chaining during rapid typing |
| `lazy` | flag | Activate the sticky key immediately before another key press instead of on initial press; avoids unintended menu triggers |
| `ignore-modifiers` | flag | Allow chaining multiple sticky modifiers before they release (enabled by default) |

## Notes

- Sticky keys can be chained: tap `&sk LCTRL`, tap `&sk LSHIFT`, tap `&kp A` → produces Ctrl+Shift+A.
- `lazy` sticky keys don't trigger other behavior releases without additional configuration.

## Related

- [Sticky Layer](./sticky-layer.md)
- [Key Press](./key-press.md)
