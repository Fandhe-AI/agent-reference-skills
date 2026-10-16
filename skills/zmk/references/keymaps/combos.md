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
| `timeout-ms` | integer | No (default 50) | Time window in milliseconds within which all keys must be pressed |
| `key-positions` | array | Yes | Key position indices (0-based, sequential from top-left) to combine |
| `bindings` | phandle-array | Yes | Behavior triggered when combo activates |
| `layers` | array | No | Restrict combo to specific layer numbers; defaults to all layers |
| `slow-release` | flag | No | When present, releases the binding only after all combo keys are released |
| `require-prior-idle-ms` | integer | No | Prevents combo if a non-modifier key was pressed within this many ms |

## Notes

- Combos are defined in a dedicated `combos { }` node, separate from the `keymap { }` node, both inside the root `/` node
- Any ZMK behavior is valid in `bindings`: `&kp`, `&mo`, `&bt`, `&mt`, `&lt`, etc.
- Combos are processed before the normal keymap
- By default the combo binding is released as soon as any of the keys in the combo is released; `slow-release` changes this to when all key positions are released
- Partially overlapping combos (e.g. `0 1` and `0 2`) and fully overlapping combos (e.g. `0 1` and `0 1 2`) are supported
- If a key position that has a hold-tap assigned is also used in combos, the hold-tap's `hold-while-undecided` is not immediate on key-down but waits until all those combo timeouts have expired
- See config/combos for `CONFIG_ZMK_COMBO_MAX_PRESSED_COMBOS` (default 4, maximum number of combos active at the same time)
- On split keyboards, behaviors that are source-specific always execute on the central side
- Key positions are numbered sequentially starting from 0 across the full keyboard layout

## Related

- [Keymaps Overview](./overview.md)
- [Conditional Layers](./conditional-layers.md)
