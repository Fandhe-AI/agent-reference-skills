# Key Press

Sends a standard HID keycode on press and releases it on key release. This is the most fundamental ZMK behavior.

## Signature / Usage

```dts
&kp <keycode>
```

**Parameter:** A keycode constant from `dt-bindings/zmk/keys.h` (e.g., `A`, `N1`, `LSHIFT`, `C_VOL_UP`).

```dts
#include <dt-bindings/zmk/keys.h>

/ {
    keymap {
        default_layer {
            bindings = <&kp A &kp LSHIFT &kp C_VOL_UP>;
        };
    };
};
```

## Notes

- Keycodes span multiple HID usage pages: keyboard keys, modifiers, keypad, media/consumer controls, power, and application shortcuts.
- Include `<dt-bindings/zmk/keys.h>` for human-readable constants.
- Raw HID usage IDs can be used directly if the constant is not defined in the header.

## Related

- [Hold-Tap](./hold-tap.md)
- [Sticky Key](./sticky-key.md)
- [Mod-Morph](./mod-morph.md)
