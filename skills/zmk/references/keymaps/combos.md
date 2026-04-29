# Combos

Combos trigger a behavior when multiple keys are pressed simultaneously within a time window. For example, pressing Q and W together can output Escape.

## Signature / Usage

```devicetree
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

## Options / Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `timeout-ms` | integer | Yes | Time window in milliseconds within which all keys must be pressed |
| `key-positions` | array | Yes | Key position indices (0-based, sequential from top-left) to combine |
| `bindings` | phandle-array | Yes | Behavior triggered when combo activates |
| `layers` | array | No | Restrict combo to specific layer numbers; defaults to all layers |
| `slow-release` | flag | No | When present, releases the binding only after all combo keys are released |
| `require-prior-idle-ms` | integer | No | Prevents combo if a non-modifier key was pressed within this many ms |

## Notes

- Combos are defined in a dedicated `combos { }` node, separate from the `keymap { }` node, both inside the root `/` node
- Any ZMK behavior is valid in `bindings`: `&kp`, `&mo`, `&bt`, `&mt`, `&lt`, etc.
- Overlapping combos (sharing one or more key positions) are supported
- On split keyboards, behaviors that are source-specific always execute on the central side
- Key positions are numbered sequentially starting from 0 across the full keyboard layout

## Related

- [Keymaps Overview](./overview.md)
- [Conditional Layers](./conditional-layers.md)
