# Behaviors Overview

Behaviors are the actions assigned to key positions, sensors, and combos in ZMK keymaps. They define what happens when a key is pressed or released, or when an encoder rotates. Behaviors can also invoke other behaviors recursively (e.g., inside macros).

## Signature / Usage

Behaviors are referenced in keymap `bindings` using an ampersand prefix:

```dts
/ {
    keymap {
        compatible = "zmk,keymap";
        default_layer {
            bindings = <
                &kp A   &mo 1   &bt BT_NXT
            >;
        };
    };
};
```

## Behavior Categories

| Category | Bindings | Description |
|----------|----------|-------------|
| Key Press | `&kp` | Send standard HID keycodes |
| Hold-Tap | `&mt`, `&lt` | Different action on hold vs. tap |
| Layers | `&mo`, `&to`, `&tog`, `&sl` | Layer activation and switching |
| Sticky | `&sk`, `&sl` | One-shot key/layer behaviors |
| Tap-Dance | `&td` | Different action per tap count |
| Mod-Morph | `&gresc` | Different action based on held modifier |
| Macros | `&macro_*` | Sequences of behaviors |
| Mouse | `&mkp`, `&mmv`, `&msc` | Mouse button, move, scroll |
| Lighting | `&rgb_ug`, `&bl` | RGB underglow and backlight |
| Bluetooth | `&bt` | BT profile management |
| Output | `&out` | USB/BLE output selection |
| Power | `&ext_power`, `&soft_off` | External power and soft-off |
| Reset | `&sys_reset`, `&bootloader` | Firmware reset and bootloader |
| Misc | `&trans`, `&none` | Transparent passthrough and block |
| Sensor | `zmk,behavior-sensor-rotate` | Encoder rotation handling (standard and variable variants) |

## Notes

- Trigger types: key press/release on a layer, sensor rotation event, combo activation.
- Behaviors requiring multiple parameters (e.g., `&bt BT_SEL 1`) cannot be used directly as hold-tap bindings; use a macro wrapper instead.
- Custom behavior instances (e.g., custom hold-tap flavors) are defined in the devicetree `behaviors {}` block and referenced by their label.

## Related

- [Key Press](./key-press.md)
- [Hold-Tap](./hold-tap.md)
- [Layers](./layers.md)
- [Macros](./macros.md)
