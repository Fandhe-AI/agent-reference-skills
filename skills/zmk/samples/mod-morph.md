# Mod-Morph

Send a different key when a modifier is held alongside the key press.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/modifiers.h>

/ {
    behaviors {
        // ESC normally; GRAVE when GUI or Shift is held
        gresc: grave_escape {
            compatible = "zmk,behavior-mod-morph";
            #binding-cells = <0>;
            bindings = <&kp ESC>, <&kp GRAVE>;
            mods = <(MOD_LGUI|MOD_LSFT|MOD_RGUI|MOD_RSFT)>;
        };

        // Backspace normally; Delete when Shift is held (keep Right Shift active)
        bspc_del: backspace_delete {
            compatible = "zmk,behavior-mod-morph";
            #binding-cells = <0>;
            bindings = <&kp BACKSPACE>, <&kp DELETE>;
            mods = <(MOD_LSFT|MOD_RSFT)>;
            keep-mods = <(MOD_RSFT)>;
        };
    };

    keymap {
        compatible = "zmk,keymap";
        default_layer {
            bindings = <
                &gresc  &bspc_del  &trans
            >;
        };
    };
};
```

## Notes

- `bindings` takes exactly two behaviors: the first fires normally, the second fires when any of the `mods` are active.
- `mods` is a bitmask of modifier flags (`MOD_LGUI`, `MOD_LSFT`, `MOD_LALT`, `MOD_LCTL`, and right-hand equivalents).
- `keep-mods` specifies which modifiers remain active when the morphed binding fires; without it the triggering modifier is consumed.
- Mod-morphs can be nested: use a second mod-morph as the `bindings` target to create three-way modifier logic.
