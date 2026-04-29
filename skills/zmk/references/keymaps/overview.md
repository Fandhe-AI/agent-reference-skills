# Keymaps Overview

ZMK uses a declarative approach to keymaps, configured via devicetree syntax in a `<keyboard>.keymap` file. Keymaps define key bindings and behaviors, and can be updated dynamically via ZMK Studio over USB or BLE.

## Signature / Usage

```devicetree
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    keymap {
        compatible = "zmk,keymap";

        default_layer {             // Layer 0
            display-name = "Base";
            bindings = <
                &kp Z    &kp M    &kp K
                &mo 1    &kp LSHIFT  &mo 2
            >;
        };

        abc_layer {                 // Layer 1
            display-name = "ABC";
            bindings = <
                &kp A     &kp B     &kp C
                &trans    &trans    &trans
            >;
        };

        xyz_layer {                 // Layer 2
            display-name = "XYZ";
            bindings = <
                &kp X        &kp Y       &kp Z
                &kp LCTRL    &kp LALT    &trans
            >;
        };
    };
};
```

## Options / Props

### Layer Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `bindings` | phandle-array | Required. List of behavior bindings, one per key position |
| `display-name` | string | Optional. Human-readable name shown in ZMK Studio |
| `sensor-bindings` | phandle-array | Optional. Bindings for rotary encoders/sensors |

### Behavior Binding Syntax

| Syntax | Example | Description |
|--------|---------|-------------|
| `&behavior` | `&trans` | Binding with no parameters |
| `&behavior PARAM` | `&kp A` | Binding with one parameter |
| `&behavior PARAM1 PARAM2` | `&mt LSHIFT D` | Binding with two parameters |

## Notes

- Layer 0 is active by default; layers are numbered sequentially by order of appearance in the keymap node
- When a key is pressed, the **highest-valued currently active layer** is used — priority depends on layer number, not activation order
- `&trans` (transparent) passes a key press through to the next lower active layer
- All keyboard definitions ship with a default keymap; during user setup it is copied to the user config directory for customization
- Required includes: `<behaviors.dtsi>` and `<dt-bindings/zmk/keys.h>`

## Related

- [Keymap Example](./keymap-example.md)
- [List of Keycodes](./list-of-keycodes.md)
- [Modifiers](./modifiers.md)
- [Combos](./combos.md)
- [Conditional Layers](./conditional-layers.md)
