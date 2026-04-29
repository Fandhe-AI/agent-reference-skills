# Keymap Example

A complete annotated keymap file for a 3-key-per-row, 2-row keyboard demonstrating layers, momentary layer switching, modifiers, and transparent bindings.

## Signature / Usage

```devicetree
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    keymap {
        compatible = "zmk,keymap";

        // Layer 0 — default layer, always active
        default_layer {
            display-name = "Base";
            bindings = <
            // ┌────────┬────────┬────────┐
                &kp Z    &kp M    &kp K
            // ├────────┼────────┼────────┤
                &mo 1    &kp LSHIFT  &mo 2
            // └────────┴────────┴────────┘
            >;
        };

        // Layer 1 — activated by holding the first key on row 2
        abc_layer {
            display-name = "ABC";
            bindings = <
                &kp A     &kp B     &kp C
                &trans    &trans    &trans
            >;
        };

        // Layer 2 — activated by holding the third key on row 2
        xyz_layer {
            display-name = "XYZ";
            bindings = <
                &kp X        &kp Y       &kp Z
                &kp LCTRL    &kp LALT    &trans
            >;
        };
    };
};
```

## Notes

- `&mo N` activates layer `N` momentarily while the key is held
- `&trans` falls through to the next lower active layer; omitting a binding or using a gap in the array is not valid — every position must have an explicit binding
- `&kp LSHIFT` sends the Left Shift modifier keycode as a regular key press
- Layer numbers are assigned in order of appearance: `default_layer` = 0, `abc_layer` = 1, `xyz_layer` = 2
- The `display-name` property labels the layer in ZMK Studio and other host-side UI

## Related

- [Keymaps Overview](./overview.md)
- [List of Keycodes](./list-of-keycodes.md)
- [Modifiers](./modifiers.md)
