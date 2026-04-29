# Tap-Dance

Activates different behaviors based on how many times the key is tapped in quick succession.

## Signature / Usage

```dts
/ {
    behaviors {
        td0: tap_dance_0 {
            compatible = "zmk,behavior-tap-dance";
            #binding-cells = <0>;
            tapping-term-ms = <200>;
            bindings = <&kp N1>, <&kp N2>, <&kp N3>;
        };
    };
};

// Usage in keymap: &td0
// 1 tap → N1, 2 taps → N2, 3 taps → N3
```

**Parameters:** None (zero-parameter; behavior is fully defined at the behaviors node).

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `tapping-term-ms` | integer | Max time between taps before a binding is selected (default: 200) |
| `bindings` | phandle-array | Behaviors indexed by tap count (index 0 = 1 tap, index 1 = 2 taps, …) |

## Notes

- Tap-dances resolve immediately when interrupted by another keypress.
- When the maximum tap count is reached, the last binding fires immediately.
- Modifier keys held during a tap-dance remain active until the tap-dance is released, affecting subsequent keypresses.

## Related

- [Hold-Tap](./hold-tap.md)
- [Sticky Key](./sticky-key.md)
- [Mod-Morph](./mod-morph.md)
