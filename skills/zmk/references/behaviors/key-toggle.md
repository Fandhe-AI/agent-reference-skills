# Key Toggle

Toggles a key between pressed and released state. Pressing when the key is up holds it down; pressing again releases it. Useful for shift-lock or sustained modifier keys.

## Signature / Usage

```dts
&kt <keycode>
// e.g. &kt LALT
```

**Parameter:** Any keycode compatible with `&kp` (e.g., `LALT`, `DOWN_ARROW`).

Custom one-directional instance:

```dts
/ {
    behaviors {
        kt_on: key_toggle_on_only {
            compatible = "zmk,behavior-key-toggle";
            #binding-cells = <1>;
            display-name = "Key Toggle On";
            toggle-mode = "on";
        };
    };
};
// Usage: &kt_on LSHIFT
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `toggle-mode` | string (`"on"` / `"off"`) | Restrict to only toggle on or only toggle off instead of alternating |

## Notes

- Modified keys like `LA(A)` toggle based on the base keycode only; the modifier wrapper is disregarded when checking press state.

## Related

- [Key Press](./key-press.md)
- [Sticky Key](./sticky-key.md)
