# Combos

Configuration for key combos, which trigger a single action when multiple keys are pressed simultaneously within a time window.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_COMBO_MAX_PRESSED_COMBOS` | int | 4 | Maximum number of combos that can be active at the same time |

## Devicetree

**Compatible:** `zmk,combos`

The parent node has no properties itself; it contains child nodes for each combo.

### Combo Child Node Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `bindings` | phandle-array | required | Behavior to execute when the combo triggers |
| `key-positions` | array | required | Key position indices that activate the combo |
| `timeout-ms` | int | 50 | Time window (ms) within which all keys must be pressed |
| `require-prior-idle-ms` | int | -1 | Prevents combo if a non-modifier key was pressed recently; -1 disables |
| `slow-release` | bool | false | Release combo when all keys release (vs. any single key) |
| `layers` | array | all layers | Specific layer indices where the combo is active |

### Example

```dts
/ {
    combos {
        compatible = "zmk,combos";
        combo_esc {
            timeout-ms = <50>;
            key-positions = <0 1>;
            bindings = <&kp ESC>;
        };
    };
};
```

## Notes

- Omitting `layers` enables the combo on all layers.
- `require-prior-idle-ms` is useful to prevent accidental combo activation during fast typing.

## Related

- [Behaviors](./behaviors.md)
- [Keymap](./keymap.md)
